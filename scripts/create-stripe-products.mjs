/**
 * ATHLYNX Stripe Product Setup Script
 * Run: node scripts/create-stripe-products.mjs
 * Creates all products and prices in Stripe, outputs env vars to set.
 */
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20",
});

const PLANS = [
  {
    envMonthly: "STRIPE_PRICE_PRO_MONTHLY",
    envYearly: "STRIPE_PRICE_PRO_YEARLY",
    name: "ATHLYNX Athlete Pro",
    description: "Full access to all 10 ATHLYNX apps, NIL deal tools, and recruiting suite.",
    priceMonthly: 999,   // $9.99
    priceYearly: 9588,   // $79.99/yr
  },
  {
    envMonthly: "STRIPE_PRICE_ELITE_MONTHLY",
    envYearly: "STRIPE_PRICE_ELITE_YEARLY",
    name: "ATHLYNX Athlete Elite",
    description: "Everything in Pro plus AI Sales automation, NIL Vault, and brand management.",
    priceMonthly: 2999,  // $29.99
    priceYearly: 28788,  // $239.99/yr
  },
  {
    envMonthly: "STRIPE_PRICE_NIL_MONTHLY",
    envYearly: "STRIPE_PRICE_NIL_YEARLY",
    name: "ATHLYNX NIL Vault",
    description: "Enterprise NIL management for agencies, coaches, and institutions.",
    priceMonthly: 4999,  // $49.99
    priceYearly: 47988,  // $399.99/yr
  },
];

const CREDIT_PACKS = [
  { env: "STRIPE_PRICE_CREDITS_100", name: "ATHLYNX 100 AI Credits", price: 999 },
  { env: "STRIPE_PRICE_CREDITS_500", name: "ATHLYNX 500 AI Credits", price: 3999 },
  { env: "STRIPE_PRICE_CREDITS_1000", name: "ATHLYNX 1,000 AI Credits", price: 6999 },
];

async function main() {
  console.log("🚀 Creating ATHLYNX Stripe products...\n");
  const envVars = {};

  for (const plan of PLANS) {
    // Create product
    const product = await stripe.products.create({
      name: plan.name,
      description: plan.description,
      metadata: { platform: "athlynx" },
    });
    console.log(`✅ Product: ${plan.name} (${product.id})`);

    // Monthly price
    const monthly = await stripe.prices.create({
      product: product.id,
      unit_amount: plan.priceMonthly,
      currency: "usd",
      recurring: { interval: "month" },
      nickname: `${plan.name} - Monthly`,
    });
    envVars[plan.envMonthly] = monthly.id;
    console.log(`   Monthly: ${monthly.id} ($${(plan.priceMonthly/100).toFixed(2)}/mo)`);

    // Yearly price
    const yearly = await stripe.prices.create({
      product: product.id,
      unit_amount: plan.priceYearly,
      currency: "usd",
      recurring: { interval: "year" },
      nickname: `${plan.name} - Yearly`,
    });
    envVars[plan.envYearly] = yearly.id;
    console.log(`   Yearly:  ${yearly.id} ($${(plan.priceYearly/100).toFixed(2)}/yr)\n`);
  }

  for (const pack of CREDIT_PACKS) {
    const product = await stripe.products.create({
      name: pack.name,
      metadata: { platform: "athlynx", type: "credits" },
    });
    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: pack.price,
      currency: "usd",
      nickname: pack.name,
    });
    envVars[pack.env] = price.id;
    console.log(`✅ Credits: ${pack.name} → ${price.id} ($${(pack.price/100).toFixed(2)})`);
  }

  console.log("\n\n📋 ENVIRONMENT VARIABLES TO SET:\n");
  for (const [key, val] of Object.entries(envVars)) {
    console.log(`${key}=${val}`);
  }
  console.log("\n✅ All done! Set these in Settings → Secrets in the Manus Management UI.");
}

main().catch(e => {
  console.error("❌ Error:", e.message);
  process.exit(1);
});
