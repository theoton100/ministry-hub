import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, adminProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";
import { storagePut } from "./storage";
import { nanoid } from "nanoid";

export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  // ─── Blog ─────────────────────────────────────────────────
  blog: router({
    listPublished: publicProcedure
      .input(z.object({ limit: z.number().min(1).max(50).default(20), offset: z.number().min(0).default(0) }).optional())
      .query(async ({ input }) => {
        const { limit = 20, offset = 0 } = input ?? {};
        const posts = await db.getPublishedBlogPosts(limit, offset);
        const count = await db.getPublishedBlogPostCount();
        return { posts, total: count };
      }),

    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        const post = await db.getBlogPostBySlug(input.slug);
        if (!post || (!post.published)) return null;
        return post;
      }),

    // Admin routes
    listAll: adminProcedure.query(async () => {
      return db.getAllBlogPosts();
    }),

    getById: adminProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return db.getBlogPostById(input.id);
      }),

    create: adminProcedure
      .input(z.object({
        title: z.string().min(1),
        slug: z.string().min(1),
        excerpt: z.string().optional(),
        content: z.string().optional(),
        featuredImageUrl: z.string().optional(),
        published: z.boolean().default(false),
        driveFileId: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        const id = await db.createBlogPost({
          ...input,
          authorId: ctx.user.id,
          publishedAt: input.published ? new Date() : undefined,
          excerpt: input.excerpt ?? null,
          content: input.content ?? null,
          featuredImageUrl: input.featuredImageUrl ?? null,
          driveFileId: input.driveFileId ?? null,
        });
        return { id };
      }),

    update: adminProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().min(1).optional(),
        slug: z.string().min(1).optional(),
        excerpt: z.string().optional(),
        content: z.string().optional(),
        featuredImageUrl: z.string().optional(),
        published: z.boolean().optional(),
        driveFileId: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        if (data.published === true) {
          const existing = await db.getBlogPostById(id);
          if (existing && !existing.published) {
            (data as any).publishedAt = new Date();
          }
        }
        await db.updateBlogPost(id, data as any);
        return { success: true };
      }),

    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.deleteBlogPost(input.id);
        return { success: true };
      }),

    uploadImage: adminProcedure
      .input(z.object({ base64: z.string(), filename: z.string(), contentType: z.string() }))
      .mutation(async ({ input }) => {
        const buffer = Buffer.from(input.base64, "base64");
        const key = `blog-images/${nanoid()}-${input.filename}`;
        const { url } = await storagePut(key, buffer, input.contentType);
        return { url };
      }),
  }),

  // ─── Sermons ──────────────────────────────────────────────
  sermon: router({
    list: publicProcedure
      .input(z.object({ limit: z.number().min(1).max(50).default(20), offset: z.number().min(0).default(0) }).optional())
      .query(async ({ input }) => {
        const { limit = 20, offset = 0 } = input ?? {};
        return db.getSermons(limit, offset);
      }),

    featured: publicProcedure.query(async () => {
      const sermon = await db.getFeaturedSermon();
      return sermon ?? null;
    }),

    listAll: adminProcedure.query(async () => {
      return db.getAllSermons();
    }),

    create: adminProcedure
      .input(z.object({
        title: z.string().min(1),
        description: z.string().optional(),
        youtubeVideoId: z.string().min(1),
        thumbnailUrl: z.string().optional(),
        featured: z.boolean().default(false),
        publishedAt: z.date().optional(),
      }))
      .mutation(async ({ input }) => {
        const id = await db.createSermon({
          ...input,
          description: input.description ?? null,
          thumbnailUrl: input.thumbnailUrl ?? `https://img.youtube.com/vi/${input.youtubeVideoId}/maxresdefault.jpg`,
          publishedAt: input.publishedAt ?? new Date(),
        });
        return { id };
      }),

    update: adminProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().min(1).optional(),
        description: z.string().optional(),
        youtubeVideoId: z.string().optional(),
        thumbnailUrl: z.string().optional(),
        featured: z.boolean().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        await db.updateSermon(id, data as any);
        return { success: true };
      }),

    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.deleteSermon(input.id);
        return { success: true };
      }),
  }),

  // ─── Podcast ──────────────────────────────────────────────
  podcast: router({
    list: publicProcedure
      .input(z.object({ limit: z.number().min(1).max(50).default(20), offset: z.number().min(0).default(0) }).optional())
      .query(async ({ input }) => {
        const { limit = 20, offset = 0 } = input ?? {};
        return db.getPodcastEpisodes(limit, offset);
      }),

    listAll: adminProcedure.query(async () => {
      return db.getAllPodcastEpisodes();
    }),

    create: adminProcedure
      .input(z.object({
        title: z.string().min(1),
        description: z.string().optional(),
        spotifyEpisodeId: z.string().optional(),
        spotifyShowUrl: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const id = await db.createPodcastEpisode({
          ...input,
          description: input.description ?? null,
          spotifyEpisodeId: input.spotifyEpisodeId ?? null,
          spotifyShowUrl: input.spotifyShowUrl ?? null,
        });
        return { id };
      }),

    update: adminProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().min(1).optional(),
        description: z.string().optional(),
        spotifyEpisodeId: z.string().optional(),
        spotifyShowUrl: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        await db.updatePodcastEpisode(id, data as any);
        return { success: true };
      }),

    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.deletePodcastEpisode(input.id);
        return { success: true };
      }),
  }),

  // ─── Newsletter ───────────────────────────────────────────
  newsletter: router({
    subscribe: publicProcedure
      .input(z.object({
        email: z.string().email(),
        firstName: z.string().optional(),
        lastName: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        await db.addNewsletterSubscriber(input.email, input.firstName, input.lastName);
        return { success: true };
      }),
  }),

  // ─── Settings ─────────────────────────────────────────────
  settings: router({
    get: publicProcedure
      .input(z.object({ key: z.string() }))
      .query(async ({ input }) => {
        return db.getSetting(input.key);
      }),

    set: adminProcedure
      .input(z.object({ key: z.string(), value: z.string() }))
      .mutation(async ({ input }) => {
        await db.setSetting(input.key, input.value);
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
