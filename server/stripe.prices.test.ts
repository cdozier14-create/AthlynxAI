import { describe, it, expect } from "vitest";
import Stripe from "stripe";

const PRICE_IDS = [
  "STRIPE_PRICE_PRO_MONTHLY",
  "STRIPE_PRICE_PRO_YEARLY",
  "STRIPE_PRICE_ELITE_MONTHLY",
  "STRIPE_PRICE_ELITE_YEARLY",
  "STRIPE_PRICE_NIL_MONTHLY",
  "STRIPE_PRICE_NIL_YEARLY",
  "STRIPE_PRICE_CREDITS_100",
  "STRIPE_PRICE_CREDITS_500",
  "STRIPE_PRICE_CREDITS_1000",
];

describe("Stripe Price IDs", () => {
  it("all price ID env vars are set and non-empty", () => {
    for (const key of PRICE_IDS) {
      const val = process.env[key];
      expect(val, `${key} must be set`).toBeTruthy();
      expect(val, `${key} must start with price_`).toMatch(/^price_/);
    }
  });

  it("Stripe secret key is set", () => {
    expect(process.env.STRIPE_SECRET_KEY).toBeTruthy();
    expect(process.env.STRIPE_SECRET_KEY).toMatch(/^sk_/);
  });

  it("can retrieve a Stripe price from the API", async () => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2024-06-20",
    });
    const priceId = process.env.STRIPE_PRICE_PRO_MONTHLY!;
    const price = await stripe.prices.retrieve(priceId);
    expect(price.id).toBe(priceId);
    expect(price.unit_amount).toBe(999); // $9.99
    expect(price.currency).toBe("usd");
    expect(price.recurring?.interval).toBe("month");
  }, 15000);
});
