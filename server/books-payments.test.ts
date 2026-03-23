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

describe("Book Router", () => {
  it("listPublished returns an array", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.book.listPublished();
    expect(Array.isArray(result)).toBe(true);
  });

  it("getById returns null for non-existent book", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.book.getById({ id: 999999 });
    expect(result).toBeNull();
  });

  it("listAll requires admin auth", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(caller.book.listAll()).rejects.toThrow();
  });

  it("create requires admin auth", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.book.create({ title: "Test Book", priceInCents: 999 })
    ).rejects.toThrow();
  });

  it("admin can create, update, and delete a book", async () => {
    const ctx = await createAdminContext();
    const caller = appRouter.createCaller(ctx);

    // Create
    const { id } = await caller.book.create({
      title: "Test Book",
      description: "A test book for vitest",
      priceInCents: 1499,
      published: false,
    });
    expect(typeof id).toBe("number");

    // Verify it's in listAll
    const allBooks = await caller.book.listAll();
    const found = allBooks.find((b: any) => b.id === id);
    expect(found).toBeTruthy();
    expect(found!.title).toBe("Test Book");
    expect(found!.priceInCents).toBe(1499);
    expect(found!.published).toBe(false);

    // Should NOT appear in public list (not published)
    const publicCaller = appRouter.createCaller(createPublicContext());
    const published = await publicCaller.book.listPublished();
    expect(published.find((b: any) => b.id === id)).toBeFalsy();

    // Update: publish it and change price
    await caller.book.update({ id, published: true, priceInCents: 1999 });

    // Now it should appear in public list
    const publishedAfter = await publicCaller.book.listPublished();
    const pubBook = publishedAfter.find((b: any) => b.id === id);
    expect(pubBook).toBeTruthy();
    expect(pubBook!.priceInCents).toBe(1999);

    // Delete
    const deleteResult = await caller.book.delete({ id });
    expect(deleteResult.success).toBe(true);

    // Verify deleted
    const afterDelete = await caller.book.listAll();
    expect(afterDelete.find((b: any) => b.id === id)).toBeFalsy();
  });

  it("delete requires admin auth", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(caller.book.delete({ id: 1 })).rejects.toThrow();
  });

  it("admin can create a book with pdfFileKey and pdfFileName", async () => {
    const ctx = await createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const { id } = await caller.book.create({
      title: "Digital Book Test",
      priceInCents: 500,
      pdfFileKey: "book-pdfs/test-file.pdf",
      pdfFileName: "my-ebook.pdf",
      published: true,
    });
    expect(typeof id).toBe("number");

    const allBooks = await caller.book.listAll();
    const found = allBooks.find((b: any) => b.id === id);
    expect(found).toBeTruthy();
    expect(found!.pdfFileKey).toBe("book-pdfs/test-file.pdf");
    expect(found!.pdfFileName).toBe("my-ebook.pdf");

    // Clean up
    await caller.book.delete({ id });
  });

  it("getDownloadUrl rejects invalid payment reference", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.book.getDownloadUrl({ bookId: 1, reference: "fake_ref_123" })
    ).rejects.toThrow();
  });

  it("uploadPdf requires admin auth", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.book.uploadPdf({ base64: "dGVzdA==", filename: "test.pdf" })
    ).rejects.toThrow();
  });
});

describe("Payment Router", () => {
  it("listOrders requires admin auth", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(caller.payment.listOrders()).rejects.toThrow();
  });

  it("admin can list orders", async () => {
    const ctx = await createAdminContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.payment.listOrders();
    expect(Array.isArray(result)).toBe(true);
  });

  it("verifyPayment returns not verified for invalid reference", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.payment.verifyPayment({ reference: "invalid_ref_xyz_123" });
    expect(result.verified).toBe(false);
  });

  it("initializeDonation rejects invalid email", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.payment.initializeDonation({
        email: "not-an-email",
        amountInCents: 1000,
        callbackUrl: "https://example.com/verify",
      })
    ).rejects.toThrow();
  });

  it("initializeDonation rejects amount below minimum", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.payment.initializeDonation({
        email: "test@example.com",
        amountInCents: 50,
        callbackUrl: "https://example.com/verify",
      })
    ).rejects.toThrow();
  });

  it("initializeBookPurchase rejects non-existent book", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.payment.initializeBookPurchase({
        email: "test@example.com",
        bookId: 999999,
        callbackUrl: "https://example.com/verify",
      })
    ).rejects.toThrow();
  });
});
