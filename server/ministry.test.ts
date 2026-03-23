import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import { SignJWT } from "jose";

const jwtSecret = new TextEncoder().encode(process.env.JWT_SECRET || "fallback-secret-key");

async function createTestAdminToken() {
  return new SignJWT({ email: "theoton100@gmail.com", role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .sign(jwtSecret);
}

async function createAdminContext(): Promise<TrpcContext> {
  const token = await createTestAdminToken();
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
      cookies: { admin_session: token },
    } as unknown as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
      cookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {}, cookies: {} } as unknown as TrpcContext["req"],
    res: { clearCookie: vi.fn(), cookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

describe("Blog Router", () => {
  it("listPublished returns posts and total count", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.blog.listPublished({ limit: 10, offset: 0 });
    expect(result).toHaveProperty("posts");
    expect(result).toHaveProperty("total");
    expect(Array.isArray(result.posts)).toBe(true);
    expect(typeof result.total).toBe("number");
  });

  it("getBySlug returns null for non-existent post", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.blog.getBySlug({ slug: "non-existent-post-slug-xyz" });
    expect(result).toBeNull();
  });

  it("listAll requires admin auth", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(caller.blog.listAll()).rejects.toThrow();
  });

  it("admin can list all blog posts", async () => {
    const ctx = await createAdminContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.blog.listAll();
    expect(Array.isArray(result)).toBe(true);
  });

  it("create requires admin auth", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.blog.create({ title: "Test", slug: "test", content: "Content" })
    ).rejects.toThrow();
  });

  it("admin can create and delete a blog post", async () => {
    const ctx = await createAdminContext();
    const caller = appRouter.createCaller(ctx);
    const slug = `test-post-${Date.now()}`;
    const { id } = await caller.blog.create({
      title: "Test Post",
      slug,
      excerpt: "A test excerpt",
      content: "Test content body",
      published: false,
    });
    expect(typeof id).toBe("number");

    const post = await caller.blog.getById({ id });
    expect(post).toBeTruthy();
    expect(post!.title).toBe("Test Post");
    expect(post!.slug).toBe(slug);

    await caller.blog.update({ id, title: "Updated Title", published: true });
    const updated = await caller.blog.getById({ id });
    expect(updated!.title).toBe("Updated Title");
    expect(updated!.published).toBe(true);

    const deleteResult = await caller.blog.delete({ id });
    expect(deleteResult.success).toBe(true);
  });
});

describe("Sermon Router", () => {
  it("list returns sermons array", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.sermon.list({ limit: 10, offset: 0 });
    expect(Array.isArray(result)).toBe(true);
  });

  it("featured returns sermon or null", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.sermon.featured();
    expect(result === null || typeof result === "object").toBe(true);
  });

  it("create requires admin auth", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.sermon.create({ title: "Test Sermon", youtubeVideoId: "abc123" })
    ).rejects.toThrow();
  });

  it("admin can create and delete a sermon", async () => {
    const ctx = await createAdminContext();
    const caller = appRouter.createCaller(ctx);
    const { id } = await caller.sermon.create({
      title: "Test Sermon",
      youtubeVideoId: "dQw4w9WgXcQ",
      description: "A test sermon",
      featured: false,
    });
    expect(typeof id).toBe("number");

    await caller.sermon.update({ id, title: "Updated Sermon", featured: true });

    const deleteResult = await caller.sermon.delete({ id });
    expect(deleteResult.success).toBe(true);
  });
});

describe("Podcast Router", () => {
  it("list returns episodes array", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.podcast.list({ limit: 10, offset: 0 });
    expect(Array.isArray(result)).toBe(true);
  });

  it("create requires admin auth", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.podcast.create({ title: "Test Episode" })
    ).rejects.toThrow();
  });

  it("admin can create and delete a podcast episode", async () => {
    const ctx = await createAdminContext();
    const caller = appRouter.createCaller(ctx);
    const { id } = await caller.podcast.create({
      title: "Test Episode",
      description: "A test episode",
      spotifyEpisodeId: "4rOoJ6Egrf8K2IrywzwOMk",
    });
    expect(typeof id).toBe("number");

    await caller.podcast.update({ id, title: "Updated Episode" });

    const deleteResult = await caller.podcast.delete({ id });
    expect(deleteResult.success).toBe(true);
  });
});

describe("Newsletter Router", () => {
  it("subscribe accepts valid email", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const email = `test-${Date.now()}@example.com`;
    const result = await caller.newsletter.subscribe({
      email,
      firstName: "Test",
      lastName: "User",
    });
    expect(result.success).toBe(true);
  });

  it("subscribe rejects invalid email", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.newsletter.subscribe({ email: "not-an-email" })
    ).rejects.toThrow();
  });
});

describe("Settings Router", () => {
  it("get returns undefined for non-existent key", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.settings.get({ key: "non_existent_key_xyz" });
    expect(result).toBeUndefined();
  });

  it("set requires admin auth", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.settings.set({ key: "test", value: "value" })
    ).rejects.toThrow();
  });

  it("admin can set and get a setting", async () => {
    const ctx = await createAdminContext();
    const caller = appRouter.createCaller(ctx);
    const key = `test_setting_${Date.now()}`;
    await caller.settings.set({ key, value: "hello world" });
    const result = await caller.settings.get({ key });
    expect(result).toBe("hello world");
  });
});
