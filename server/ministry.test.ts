import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAdminContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "admin-user",
    email: "admin@example.com",
    name: "Admin User",
    loginMethod: "manus",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };
  return {
    user,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

function createRegularUserContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 2,
    openId: "regular-user",
    email: "user@example.com",
    name: "Regular User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };
  return {
    user,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
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

  it("listAll requires admin role", async () => {
    const caller = appRouter.createCaller(createRegularUserContext());
    await expect(caller.blog.listAll()).rejects.toThrow();
  });

  it("admin can list all blog posts", async () => {
    const caller = appRouter.createCaller(createAdminContext());
    const result = await caller.blog.listAll();
    expect(Array.isArray(result)).toBe(true);
  });

  it("create requires admin role", async () => {
    const caller = appRouter.createCaller(createRegularUserContext());
    await expect(
      caller.blog.create({ title: "Test", slug: "test", content: "Content" })
    ).rejects.toThrow();
  });

  it("admin can create and delete a blog post", async () => {
    const caller = appRouter.createCaller(createAdminContext());
    const slug = `test-post-${Date.now()}`;
    const { id } = await caller.blog.create({
      title: "Test Post",
      slug,
      excerpt: "A test excerpt",
      content: "Test content body",
      published: false,
    });
    expect(typeof id).toBe("number");

    // Verify it exists
    const post = await caller.blog.getById({ id });
    expect(post).toBeTruthy();
    expect(post!.title).toBe("Test Post");
    expect(post!.slug).toBe(slug);

    // Update it
    await caller.blog.update({ id, title: "Updated Title", published: true });
    const updated = await caller.blog.getById({ id });
    expect(updated!.title).toBe("Updated Title");
    expect(updated!.published).toBe(true);

    // Delete it
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

  it("featured returns sermon or undefined", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.sermon.featured();
    // Can be undefined if no sermons exist
    expect(result === undefined || typeof result === "object").toBe(true);
  });

  it("create requires admin role", async () => {
    const caller = appRouter.createCaller(createRegularUserContext());
    await expect(
      caller.sermon.create({ title: "Test Sermon", youtubeVideoId: "abc123" })
    ).rejects.toThrow();
  });

  it("admin can create and delete a sermon", async () => {
    const caller = appRouter.createCaller(createAdminContext());
    const { id } = await caller.sermon.create({
      title: "Test Sermon",
      youtubeVideoId: "dQw4w9WgXcQ",
      description: "A test sermon",
      featured: false,
    });
    expect(typeof id).toBe("number");

    // Update
    await caller.sermon.update({ id, title: "Updated Sermon", featured: true });

    // Delete
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

  it("create requires admin role", async () => {
    const caller = appRouter.createCaller(createRegularUserContext());
    await expect(
      caller.podcast.create({ title: "Test Episode" })
    ).rejects.toThrow();
  });

  it("admin can create and delete a podcast episode", async () => {
    const caller = appRouter.createCaller(createAdminContext());
    const { id } = await caller.podcast.create({
      title: "Test Episode",
      description: "A test episode",
      spotifyEpisodeId: "4rOoJ6Egrf8K2IrywzwOMk",
    });
    expect(typeof id).toBe("number");

    // Update
    await caller.podcast.update({ id, title: "Updated Episode" });

    // Delete
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

  it("set requires admin role", async () => {
    const caller = appRouter.createCaller(createRegularUserContext());
    await expect(
      caller.settings.set({ key: "test", value: "value" })
    ).rejects.toThrow();
  });

  it("admin can set and get a setting", async () => {
    const caller = appRouter.createCaller(createAdminContext());
    const key = `test_setting_${Date.now()}`;
    await caller.settings.set({ key, value: "hello world" });
    const result = await caller.settings.get({ key });
    expect(result).toBe("hello world");
  });
});
