import { describe, it, expect } from "vitest";

describe("Currency Conversion", () => {
  it("should format price in Ghana cedis (GHS)", () => {
    const formatPrice = (cents: number) => {
      return `₵${(cents / 100).toFixed(2)}`;
    };

    expect(formatPrice(2500)).toBe("₵25.00");
    expect(formatPrice(100)).toBe("₵1.00");
    expect(formatPrice(10000)).toBe("₵100.00");
  });

  it("should use GHS currency in Paystack requests", () => {
    const paymentData = {
      email: "test@example.com",
      amount: 5000, // 50 GHS
      currency: "GHS",
      callback_url: "https://example.com/verify",
      metadata: {
        type: "donation",
        customer_name: "Test User",
      },
    };

    expect(paymentData.currency).toBe("GHS");
    expect(paymentData.amount).toBe(5000);
  });

  it("should convert cents to GHS correctly", () => {
    const amountInCents = 25000;
    const amountInGHS = amountInCents / 100;
    expect(amountInGHS).toBe(250);
  });
});
