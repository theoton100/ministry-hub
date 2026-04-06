import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, adminProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";
import { storagePut, storageGet } from "./storage";
import { nanoid } from "nanoid";
import { SignJWT, jwtVerify } from "jose";
import { ENV } from "./_core/env";
import { TRPCError } from "@trpc/server";
import { parse as parseCookieHeader } from "cookie";

const ADMIN_COOKIE = "admin_session";

function getAdminCookie(req: { headers: { cookie?: string }; cookies?: Record<string, string> }): string | undefined {
  // Try req.cookies first (if cookie-parser is installed)
  if (req.cookies?.[ADMIN_COOKIE]) return req.cookies[ADMIN_COOKIE];
  // Fallback: parse from raw cookie header
  if (req.headers.cookie) {
    const parsed = parseCookieHeader(req.headers.cookie);
    return parsed[ADMIN_COOKIE];
  }
  return undefined;
}
const jwtSecret = new TextEncoder().encode(ENV.cookieSecret || "fallback-secret-key");

async function createAdminToken(email: string) {
  return new SignJWT({ email, role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(jwtSecret);
}

async function verifyAdminToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, jwtSecret);
    return payload as { email: string; role: string };
  } catch {
    return null;
  }
}

// Middleware to check admin session via cookie
const adminAuthProcedure = publicProcedure.use(async ({ ctx, next }) => {
  const token = getAdminCookie(ctx.req);
  if (!token) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Not authenticated" });
  }
  const payload = await verifyAdminToken(token);
  if (!payload || payload.role !== "admin") {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid session" });
  }
  return next({ ctx: { ...ctx, adminEmail: payload.email } });
});

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

  // ─── Admin Auth ──────────────────────────────────────────
  adminAuth: router({
    login: publicProcedure
      .input(z.object({ email: z.string().email(), password: z.string().min(1) }))
      .mutation(async ({ input, ctx }) => {
        const valid = await db.verifyAdminPassword(input.email, input.password);
        if (!valid) {
          throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid email or password" });
        }
        const token = await createAdminToken(input.email);
        const cookieOptions = getSessionCookieOptions(ctx.req);
        ctx.res.cookie(ADMIN_COOKIE, token, {
          ...cookieOptions,
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        return { success: true };
      }),

    check: publicProcedure.query(async ({ ctx }) => {
      const token = getAdminCookie(ctx.req);
      if (!token) return { authenticated: false };
      const payload = await verifyAdminToken(token);
      if (!payload) return { authenticated: false };
      return { authenticated: true, email: payload.email };
    }),

    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(ADMIN_COOKIE, { ...cookieOptions, maxAge: -1 });
      return { success: true };
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
    listAll: adminAuthProcedure.query(async () => {
      return db.getAllBlogPosts();
    }),

    getById: adminAuthProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return db.getBlogPostById(input.id);
      }),

    create: adminAuthProcedure
      .input(z.object({
        title: z.string().min(1),
        slug: z.string().min(1),
        excerpt: z.string().optional(),
        content: z.string().optional(),
        featuredImageUrl: z.string().optional(),
        published: z.boolean().default(false),
        driveFileId: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const id = await db.createBlogPost({
          ...input,
          authorId: 1,
          publishedAt: input.published ? new Date() : undefined,
          excerpt: input.excerpt ?? null,
          content: input.content ?? null,
          featuredImageUrl: input.featuredImageUrl ?? null,
          driveFileId: input.driveFileId ?? null,
        });
        return { id };
      }),

    update: adminAuthProcedure
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

    delete: adminAuthProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.deleteBlogPost(input.id);
        return { success: true };
      }),

    uploadImage: adminAuthProcedure
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

    listAll: adminAuthProcedure.query(async () => {
      return db.getAllSermons();
    }),

    create: adminAuthProcedure
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

    update: adminAuthProcedure
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

    delete: adminAuthProcedure
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

    listAll: adminAuthProcedure.query(async () => {
      return db.getAllPodcastEpisodes();
    }),

    create: adminAuthProcedure
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

    update: adminAuthProcedure
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

    delete: adminAuthProcedure
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
        // Save to local database
        await db.addNewsletterSubscriber(input.email, input.firstName, input.lastName);

        // Sync to Mailchimp
        const mcApiKey = process.env.MAILCHIMP_API_KEY;
        const mcAudienceId = process.env.MAILCHIMP_AUDIENCE_ID;
        if (mcApiKey && mcAudienceId) {
          try {
            const dc = mcApiKey.split("-").pop();
            await fetch(`https://${dc}.api.mailchimp.com/3.0/lists/${mcAudienceId}/members`, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${mcApiKey}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email_address: input.email,
                status: "subscribed",
                merge_fields: {
                  FNAME: input.firstName || "",
                  LNAME: input.lastName || "",
                },
              }),
            });
          } catch (err) {
            console.error("[Mailchimp] Failed to sync subscriber:", err);
          }
        }

        return { success: true };
      }),
  }),

  // ─── Books ────────────────────────────────────────────────
  book: router({
    listPublished: publicProcedure.query(async () => {
      return db.getPublishedBooks();
    }),

    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        const book = await db.getBookById(input.id);
        if (!book || !book.published) return null;
        return book;
      }),

    listAll: adminAuthProcedure.query(async () => {
      return db.getAllBooks();
    }),

    create: adminAuthProcedure
      .input(z.object({
        title: z.string().min(1),
        description: z.string().optional(),
        priceInCents: z.number().min(0),
        coverImageUrl: z.string().optional(),
        pdfFileKey: z.string().optional(),
        pdfFileName: z.string().optional(),
        published: z.boolean().default(false),
      }))
      .mutation(async ({ input }) => {
        const id = await db.createBook({
          ...input,
          description: input.description ?? null,
          coverImageUrl: input.coverImageUrl ?? null,
          pdfFileKey: input.pdfFileKey ?? null,
          pdfFileName: input.pdfFileName ?? null,
        });
        return { id };
      }),

    update: adminAuthProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().min(1).optional(),
        description: z.string().optional(),
        priceInCents: z.number().min(0).optional(),
        coverImageUrl: z.string().optional(),
        pdfFileKey: z.string().optional(),
        pdfFileName: z.string().optional(),
        published: z.boolean().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        await db.updateBook(id, data as any);
        return { success: true };
      }),

    delete: adminAuthProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.deleteBook(input.id);
        return { success: true };
      }),

    uploadCover: adminAuthProcedure
      .input(z.object({ base64: z.string(), filename: z.string(), contentType: z.string() }))
      .mutation(async ({ input }) => {
        const buffer = Buffer.from(input.base64, "base64");
        const key = `book-covers/${nanoid()}-${input.filename}`;
        const { url } = await storagePut(key, buffer, input.contentType);
        return { url };
      }),

    uploadPdf: adminAuthProcedure
      .input(z.object({ base64: z.string(), filename: z.string() }))
      .mutation(async ({ input }) => {
        const buffer = Buffer.from(input.base64, "base64");
        const key = `book-pdfs/${nanoid()}-${input.filename}`;
        const { url } = await storagePut(key, buffer, "application/pdf");
        return { key, url, filename: input.filename };
      }),

    getDownloadUrl: publicProcedure
      .input(z.object({ bookId: z.number(), reference: z.string() }))
      .query(async ({ input }) => {
        // Verify payment first
        const paystackSecret = process.env.PAYSTACK_SECRET_KEY;
        if (!paystackSecret) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Payment not configured" });

        const res = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(input.reference)}`, {
          headers: { Authorization: `Bearer ${paystackSecret}` },
        });
        const body = await res.json();
        if (!body.status || body.data?.status !== "success") {
          throw new TRPCError({ code: "FORBIDDEN", message: "Payment not verified. Please complete payment first." });
        }

        // Check that the payment metadata matches this book
        const metadata = body.data?.metadata;
        if (metadata?.book_id !== input.bookId && String(metadata?.book_id) !== String(input.bookId)) {
          throw new TRPCError({ code: "FORBIDDEN", message: "This payment is not for this book." });
        }

        // Get the book's PDF
        const book = await db.getBookById(input.bookId);
        if (!book || !book.pdfFileKey) {
          throw new TRPCError({ code: "NOT_FOUND", message: "Digital file not available for this book." });
        }

        const { url } = await storageGet(book.pdfFileKey);
        return { downloadUrl: url, fileName: book.pdfFileName || `${book.title}.pdf` };
      }),
  }),

  // ─── Paystack Payments ────────────────────────────────────
  payment: router({
    initializeDonation: publicProcedure
      .input(z.object({
        email: z.string().email(),
        amountInCents: z.number().min(100),
        customerName: z.string().optional(),
        callbackUrl: z.string(),
      }))
      .mutation(async ({ input }) => {
        const paystackSecret = process.env.PAYSTACK_SECRET_KEY;
        if (!paystackSecret) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Payment not configured" });

        const res = await fetch("https://api.paystack.co/transaction/initialize", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${paystackSecret}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: input.email,
            amount: input.amountInCents,
            currency: "GHS",
            callback_url: input.callbackUrl,
            metadata: {
              type: "donation",
              customer_name: input.customerName || "",
            },
          }),
        });

        const body = await res.json();
        if (!body.status) {
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: body.message || "Payment initialization failed" });
        }

        await db.createOrder({
          email: input.email,
          customerName: input.customerName ?? null,
          type: "donation",
          amountInCents: input.amountInCents,
          stripeSessionId: body.data.reference,
          status: "pending",
        });

        return { authorizationUrl: body.data.authorization_url, reference: body.data.reference };
      }),

    initializeBookPurchase: publicProcedure
      .input(z.object({
        email: z.string().email(),
        bookId: z.number(),
        customerName: z.string().optional(),
        callbackUrl: z.string(),
      }))
      .mutation(async ({ input }) => {
        const paystackSecret = process.env.PAYSTACK_SECRET_KEY;
        if (!paystackSecret) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Payment not configured" });

        const book = await db.getBookById(input.bookId);
        if (!book || !book.published) {
          throw new TRPCError({ code: "NOT_FOUND", message: "Book not found" });
        }

        const res = await fetch("https://api.paystack.co/transaction/initialize", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${paystackSecret}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: input.email,
            amount: book.priceInCents,
            currency: "GHS",
            callback_url: input.callbackUrl,
            metadata: {
              type: "book",
              book_id: book.id,
              book_title: book.title,
              customer_name: input.customerName || "",
            },
          }),
        });

        const body = await res.json();
        if (!body.status) {
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: body.message || "Payment initialization failed" });
        }

        await db.createOrder({
          email: input.email,
          customerName: input.customerName ?? null,
          type: "book",
          bookId: book.id,
          amountInCents: book.priceInCents,
          stripeSessionId: body.data.reference,
          status: "pending",
        });

        return { authorizationUrl: body.data.authorization_url, reference: body.data.reference };
      }),

    initializeStructuredWalkPurchase: publicProcedure
      .input(z.object({
        email: z.string().email(),
        name: z.string(),
        whatsappNumber: z.string(),
        callbackUrl: z.string(),
      }))
      .mutation(async ({ input }) => {
        const paystackSecret = process.env.PAYSTACK_SECRET_KEY;
        if (!paystackSecret) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Payment not configured" });

        const systemPrice = 9999; // ₵99.99 in cents

        const res = await fetch("https://api.paystack.co/transaction/initialize", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${paystackSecret}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: input.email,
            amount: systemPrice,
            currency: "GHS",
            callback_url: input.callbackUrl,
            metadata: {
              type: "structured-walk-system",
              customer_name: input.name,
              whatsapp_number: input.whatsappNumber,
            },
          }),
        });

        const body = await res.json();
        if (!body.status) {
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: body.message || "Payment initialization failed" });
        }

        await db.createOrder({
          email: input.email,
          customerName: input.name,
          type: "donation",
          amountInCents: systemPrice,
          stripeSessionId: body.data.reference,
          status: "pending",
        });

        return { authorizationUrl: body.data.authorization_url, reference: body.data.reference };
      }),

    verifyPayment: publicProcedure
      .input(z.object({ reference: z.string() }))
      .query(async ({ input }) => {
        const paystackSecret = process.env.PAYSTACK_SECRET_KEY;
        if (!paystackSecret) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Payment not configured" });

        const res = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(input.reference)}`, {
          headers: { Authorization: `Bearer ${paystackSecret}` },
        });

        const body = await res.json();
        if (!body.status) {
          return { verified: false, message: body.message, bookId: null };
        }

        const txn = body.data;
        if (txn.status === "success") {
          await db.updateOrderBySessionId(input.reference, {
            status: "completed",
            stripePaymentIntentId: txn.id?.toString(),
          });
          const bookId = txn.metadata?.book_id ? Number(txn.metadata.book_id) : null;
          return { verified: true, status: "success", amount: txn.amount, currency: txn.currency, bookId };
        }

        return { verified: false, status: txn.status, message: "Payment not completed", bookId: null };
      }),

    listOrders: adminAuthProcedure.query(async () => {
      return db.getOrders(100);
    }),
  }),

  // ─── Settings ─────────────────────────────────────────────
  settings: router({
    get: publicProcedure
      .input(z.object({ key: z.string() }))
      .query(async ({ input }) => {
        return db.getSetting(input.key);
      }),

    set: adminAuthProcedure
      .input(z.object({ key: z.string(), value: z.string() }))
      .mutation(async ({ input }) => {
        await db.setSetting(input.key, input.value);
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
