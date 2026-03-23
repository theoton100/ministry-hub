import { describe, expect, it } from "vitest";

describe("Paystack integration", () => {
  it("validates the Paystack secret key by fetching the balance endpoint", async () => {
    const secretKey = process.env.PAYSTACK_SECRET_KEY;
    expect(secretKey).toBeTruthy();

    const res = await fetch("https://api.paystack.co/balance", {
      headers: {
        Authorization: `Bearer ${secretKey}`,
      },
    });

    // Paystack returns 200 for valid keys
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.status).toBe(true);
  });

  it("has the Paystack public key configured", () => {
    const publicKey = process.env.VITE_PAYSTACK_PUBLIC_KEY;
    expect(publicKey).toBeTruthy();
    expect(publicKey).toMatch(/^pk_(test|live)_/);
  });
});
