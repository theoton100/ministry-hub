import { eq, desc, and, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  InsertUser, users,
  blogPosts, InsertBlogPost, BlogPost,
  sermons, InsertSermon,
  podcastEpisodes, InsertPodcastEpisode,
  newsletterSubscribers,
  siteSettings,
  adminCredentials,
  books, InsertBook,
  orders, InsertOrder,
} from "../drizzle/schema";
import bcrypt from "bcryptjs";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }
  try {
    const values: InsertUser = { openId: user.openId };
    const updateSet: Record<string, unknown> = {};
    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];
    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };
    textFields.forEach(assignNullable);
    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }
    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }
    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }
    await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// ─── Blog Posts ───────────────────────────────────────────────

export async function getPublishedBlogPosts(limit = 20, offset = 0) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(blogPosts)
    .where(eq(blogPosts.published, true))
    .orderBy(desc(blogPosts.publishedAt))
    .limit(limit).offset(offset);
}

export async function getBlogPostBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
  return result[0];
}

export async function getBlogPostById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(blogPosts).where(eq(blogPosts.id, id)).limit(1);
  return result[0];
}

export async function getAllBlogPosts() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
}

export async function createBlogPost(post: InsertBlogPost) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(blogPosts).values(post);
  return result[0].insertId;
}

export async function updateBlogPost(id: number, data: Partial<InsertBlogPost>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(blogPosts).set(data).where(eq(blogPosts.id, id));
}

export async function deleteBlogPost(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(blogPosts).where(eq(blogPosts.id, id));
}

export async function getPublishedBlogPostCount() {
  const db = await getDb();
  if (!db) return 0;
  const result = await db.select({ count: sql<number>`count(*)` }).from(blogPosts).where(eq(blogPosts.published, true));
  return result[0]?.count ?? 0;
}

// ─── Sermons ──────────────────────────────────────────────────

export async function getSermons(limit = 20, offset = 0) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(sermons).orderBy(desc(sermons.publishedAt)).limit(limit).offset(offset);
}

export async function getFeaturedSermon() {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(sermons)
    .where(eq(sermons.featured, true))
    .orderBy(desc(sermons.publishedAt))
    .limit(1);
  if (result.length > 0) return result[0];
  const latest = await db.select().from(sermons).orderBy(desc(sermons.publishedAt)).limit(1);
  return latest[0];
}

export async function createSermon(sermon: InsertSermon) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(sermons).values(sermon);
  return result[0].insertId;
}

export async function updateSermon(id: number, data: Partial<InsertSermon>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(sermons).set(data).where(eq(sermons.id, id));
}

export async function deleteSermon(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(sermons).where(eq(sermons.id, id));
}

export async function getAllSermons() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(sermons).orderBy(desc(sermons.publishedAt));
}

// ─── Podcast Episodes ─────────────────────────────────────────

export async function getPodcastEpisodes(limit = 20, offset = 0) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(podcastEpisodes).orderBy(desc(podcastEpisodes.publishedAt)).limit(limit).offset(offset);
}

export async function createPodcastEpisode(ep: InsertPodcastEpisode) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(podcastEpisodes).values(ep);
  return result[0].insertId;
}

export async function updatePodcastEpisode(id: number, data: Partial<InsertPodcastEpisode>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(podcastEpisodes).set(data).where(eq(podcastEpisodes.id, id));
}

export async function deletePodcastEpisode(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(podcastEpisodes).where(eq(podcastEpisodes.id, id));
}

export async function getAllPodcastEpisodes() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(podcastEpisodes).orderBy(desc(podcastEpisodes.publishedAt));
}

// ─── Newsletter ───────────────────────────────────────────────

export async function addNewsletterSubscriber(email: string, firstName?: string, lastName?: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(newsletterSubscribers).values({ email, firstName: firstName ?? null, lastName: lastName ?? null })
    .onDuplicateKeyUpdate({ set: { firstName: firstName ?? null, lastName: lastName ?? null } });
}

// ─── Site Settings ────────────────────────────────────────────

export async function getSetting(key: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(siteSettings).where(eq(siteSettings.settingKey, key)).limit(1);
  return result[0]?.settingValue;
}

export async function setSetting(key: string, value: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(siteSettings).values({ settingKey: key, settingValue: value })
    .onDuplicateKeyUpdate({ set: { settingValue: value } });
}

// ─── Admin Credentials ───────────────────────────────────────

export async function getAdminByEmail(email: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(adminCredentials).where(eq(adminCredentials.email, email)).limit(1);
  return result[0];
}

export async function createAdminCredential(email: string, password: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const passwordHash = await bcrypt.hash(password, 12);
  await db.insert(adminCredentials).values({ email, passwordHash })
    .onDuplicateKeyUpdate({ set: { passwordHash } });
}

export async function verifyAdminPassword(email: string, password: string): Promise<boolean> {
  const admin = await getAdminByEmail(email);
  if (!admin) return false;
  return bcrypt.compare(password, admin.passwordHash);
}

// ─── Newsletter Subscribers (all) ────────────────────────────

export async function getAllNewsletterSubscribers() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(newsletterSubscribers).orderBy(desc(newsletterSubscribers.subscribedAt));
}

// ─── Books ───────────────────────────────────────────────────

export async function getPublishedBooks() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(books).where(eq(books.published, true)).orderBy(desc(books.createdAt));
}

export async function getAllBooks() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(books).orderBy(desc(books.createdAt));
}

export async function getBookById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(books).where(eq(books.id, id)).limit(1);
  return result[0];
}

export async function createBook(book: InsertBook) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(books).values(book);
  return result[0].insertId;
}

export async function updateBook(id: number, data: Partial<InsertBook>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(books).set(data).where(eq(books.id, id));
}

export async function deleteBook(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(books).where(eq(books.id, id));
}

// ─── Orders ──────────────────────────────────────────────────

export async function createOrder(order: InsertOrder) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(orders).values(order);
  return result[0].insertId;
}

export async function updateOrderBySessionId(sessionId: string, data: Partial<InsertOrder>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(orders).set(data).where(eq(orders.stripeSessionId, sessionId));
}

export async function getOrders(limit = 50) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(orders).orderBy(desc(orders.createdAt)).limit(limit);
}

// ─── Contact Messages ────────────────────────────────────────

export async function createContactMessage(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create contact message: database not available");
    return;
  }
  try {
    // For now, we'll just log the contact message since we don't have a dedicated table
    // In production, you'd want to store this in a database table
    console.log("[Contact Message]", {
      timestamp: new Date().toISOString(),
      ...data,
    });
  } catch (error) {
    console.error("[Database] Failed to create contact message:", error);
  }
}
