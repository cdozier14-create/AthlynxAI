import Stripe from "stripe";
import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../_core/trpc";
import { STRIPE_PLANS, CREDIT_PACKS } from "./products";
import { getUserById } from "../db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2026-03-25.dahlia",
});

export const stripeRouter = router({
  /** Return all available plans for the frontend */
  getPlans: publicProcedure.query(() => {
    return STRIPE_PLANS.map(plan => ({
      id: plan.id,
      name: plan.name,
      description: plan.description,
      priceMonthly: plan.priceMonthly,
      priceYearly: plan.priceYearly,
      features: plan.features,
      badge: plan.badge,
      color: plan.color,
    }));
  }),

  /** Return all credit packs */
  getCreditPacks: publicProcedure.query(() => {
    return CREDIT_PACKS.map(p => ({
      id: p.id,
      name: p.name,
      credits: p.credits,
      price: p.price,
    }));
  }),

  /** Create a Stripe Checkout Session for a subscription plan */
  createSubscriptionCheckout: protectedProcedure
    .input(
      z.object({
        planId: z.string(),
        interval: z.enum(["month", "year"]),
        origin: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const plan = STRIPE_PLANS.find(p => p.id === input.planId);
      if (!plan) throw new Error("Plan not found");

      const priceId =
        input.interval === "month"
          ? plan.stripePriceIdMonthly
          : plan.stripePriceIdYearly;

      // If no Stripe price ID configured yet, create an inline price
      const lineItem = priceId
        ? { price: priceId, quantity: 1 }
        : {
            price_data: {
              currency: "usd",
              product_data: { name: plan.name, description: plan.description },
              unit_amount: input.interval === "month" ? plan.priceMonthly : plan.priceYearly,
              recurring: { interval: input.interval },
            },
            quantity: 1,
          };

      const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        line_items: [lineItem],
        customer_email: ctx.user.email ?? undefined,
        client_reference_id: ctx.user.id.toString(),
        metadata: {
          user_id: ctx.user.id.toString(),
          customer_email: ctx.user.email ?? "",
          customer_name: ctx.user.name ?? "",
          plan_id: input.planId,
          interval: input.interval,
        },
        // 7-day free trial — card required upfront, no charge until day 8
        subscription_data: {
          trial_period_days: 7,
          trial_settings: {
            end_behavior: { missing_payment_method: "cancel" },
          },
          metadata: {
            user_id: ctx.user.id.toString(),
            plan_id: input.planId,
          },
        },
        payment_method_collection: "always",
        payment_method_types: ["card", "paypal", "cashapp", "link"],
        allow_promotion_codes: true,
        success_url: `${input.origin}/billing?success=1&plan=${input.planId}&trial=1`,
        cancel_url: `${input.origin}/pricing?cancelled=1`,
      });

      return { url: session.url };
    }),

  /** Create a Stripe Checkout Session for a credit pack (one-time payment) */
  createCreditsCheckout: protectedProcedure
    .input(
      z.object({
        packId: z.string(),
        origin: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const pack = CREDIT_PACKS.find(p => p.id === input.packId);
      if (!pack) throw new Error("Credit pack not found");

      const lineItem = pack.stripePriceId
        ? { price: pack.stripePriceId, quantity: 1 }
        : {
            price_data: {
              currency: "usd",
              product_data: { name: pack.name },
              unit_amount: pack.price,
            },
            quantity: 1,
          };

      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items: [lineItem],
        customer_email: ctx.user.email ?? undefined,
        client_reference_id: ctx.user.id.toString(),
        metadata: {
          user_id: ctx.user.id.toString(),
          customer_email: ctx.user.email ?? "",
          pack_id: input.packId,
          credits: pack.credits.toString(),
        },
        payment_method_types: ["card", "paypal", "cashapp", "link"],
        allow_promotion_codes: true,
        success_url: `${input.origin}/billing?success=1&credits=${pack.credits}`,
        cancel_url: `${input.origin}/pricing?cancelled=1`,
      });

      return { url: session.url };
    }),

  /** Open Stripe Customer Portal for managing billing */
  createBillingPortal: protectedProcedure
    .input(z.object({ origin: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const user = await getUserById(ctx.user.id);
    if (!user?.stripeCustomerId) {
        throw new Error("No billing account found. Please subscribe first.");
      }

      const session = await stripe.billingPortal.sessions.create({
        customer: user.stripeCustomerId,
        return_url: `${input.origin}/billing`,
      });

      return { url: session.url };
    }),

  /** Create a one-time product checkout session for Marketplace purchases */
  createProductCheckout: protectedProcedure
    .input(
      z.object({
        productName: z.string(),
        productDescription: z.string(),
        priceInCents: z.number().int().positive(),
        quantity: z.number().int().positive().default(1),
        origin: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: input.productName,
                description: input.productDescription,
              },
              unit_amount: input.priceInCents,
            },
            quantity: input.quantity,
          },
        ],
        customer_email: ctx.user.email ?? undefined,
        client_reference_id: ctx.user.id.toString(),
        metadata: {
          user_id: ctx.user.id.toString(),
          customer_email: ctx.user.email ?? "",
          customer_name: ctx.user.name ?? "",
          product_name: input.productName,
        },
        payment_method_types: ["card", "paypal", "cashapp", "link"],
        allow_promotion_codes: true,
        success_url: `${input.origin}/marketplace?success=1&product=${encodeURIComponent(input.productName)}`,
        cancel_url: `${input.origin}/marketplace`,
      });
      return { url: session.url };
    }),

  /** Get current subscription status */
  getSubscription: protectedProcedure.query(async ({ ctx }) => {
    const user = await getUserById(ctx.user.id);
    if (!user?.stripeCustomerId || !user?.stripeSubscriptionId) {
      return { status: "none", plan: null };
    }

    try {
      const subscription = await stripe.subscriptions.retrieve(
        user.stripeSubscriptionId
      );
      return {
        status: subscription.status,
        plan: user.stripePlanId ?? null,
        currentPeriodEnd: (subscription as any).current_period_end,
        cancelAtPeriodEnd: (subscription as any).cancel_at_period_end,
      };
    } catch {
      return { status: "none", plan: null };
    }
  }),
});
