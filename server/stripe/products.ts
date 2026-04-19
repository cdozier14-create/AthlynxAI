/**
 * ATHLYNX Stripe Products & Pricing Configuration
 * All prices are in USD cents.
 */

export const STRIPE_PLANS = [
  {
    id: "athlete_pro",
    name: "Athlete Pro",
    description: "Full access to all 10 ATHLYNX apps, NIL deal tools, and recruiting suite.",
    priceMonthly: 999, // $9.99/mo
    priceYearly: 9588, // $79.99/yr (~33% off)
    features: [
      "All 10 ATHLYNX Apps",
      "NIL Deal Marketplace",
      "Transfer Portal Access",
      "AI Recruiting Tools",
      "Diamond Grind Training",
      "Priority Support",
    ],
    stripePriceIdMonthly: process.env.STRIPE_PRICE_PRO_MONTHLY ?? "",
    stripePriceIdYearly: process.env.STRIPE_PRICE_PRO_YEARLY ?? "",
    badge: "Most Popular",
    color: "#0066ff",
  },
  {
    id: "athlete_elite",
    name: "Athlete Elite",
    description: "Everything in Pro plus AI Sales automation, NIL Vault, and brand management.",
    priceMonthly: 2999, // $29.99/mo
    priceYearly: 28788, // $239.99/yr (~33% off)
    features: [
      "Everything in Pro",
      "AI Sales Automation",
      "NIL Vault (Contract Archive)",
      "Brand Deal Negotiation AI",
      "Warriors Playbook",
      "Dedicated Account Manager",
    ],
    stripePriceIdMonthly: process.env.STRIPE_PRICE_ELITE_MONTHLY ?? "",
    stripePriceIdYearly: process.env.STRIPE_PRICE_ELITE_YEARLY ?? "",
    badge: "Best Value",
    color: "#00c2ff",
  },
  {
    id: "nil_vault",
    name: "NIL Vault",
    description: "Enterprise NIL management for agencies, coaches, and institutions.",
    priceMonthly: 4999, // $49.99/mo
    priceYearly: 47988, // $399.99/yr (~33% off)
    features: [
      "Everything in Elite",
      "Multi-athlete Management",
      "Legal Document Storage",
      "Tax Document Generation",
      "White-label Branding",
      "API Access",
    ],
    stripePriceIdMonthly: process.env.STRIPE_PRICE_NIL_MONTHLY ?? "",
    stripePriceIdYearly: process.env.STRIPE_PRICE_NIL_YEARLY ?? "",
    badge: "Enterprise",
    color: "#7c3aed",
  },
] as const;

export type PlanId = (typeof STRIPE_PLANS)[number]["id"];

export const CREDIT_PACKS = [
  { id: "credits_100", name: "100 Credits", credits: 100, price: 999, stripePriceId: process.env.STRIPE_PRICE_CREDITS_100 ?? "" },
  { id: "credits_500", name: "500 Credits", credits: 500, price: 3999, stripePriceId: process.env.STRIPE_PRICE_CREDITS_500 ?? "" },
  { id: "credits_1000", name: "1,000 Credits", credits: 1000, price: 6999, stripePriceId: process.env.STRIPE_PRICE_CREDITS_1000 ?? "" },
] as const;
