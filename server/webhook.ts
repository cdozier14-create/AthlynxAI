/**
 * ATHLYNX Stripe Webhook Handler
 * A DOZIER HOLDINGS GROUP COMPANY
 * 
 * Handles Stripe webhook events for:
 * - Checkout session completion
 * - Subscription updates
 * - Payment processing
 * - Credit purchases
 */

import Stripe from "stripe";
import { Request, Response } from "express";
import * as db from "../db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-12-15.clover" as const,
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

/**
 * Stripe Webhook Handler
 */
export async function handleStripeWebhook(req: Request, res: Response) {
  const sig = req.headers["stripe-signature"] as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err: any) {
    console.error("[Stripe Webhook] Signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle test events
  if (event.id.startsWith("evt_test_")) {
    console.log("[Webhook] Test event detected, returning verification response");
    return res.json({
      verified: true,
    });
  }

  console.log(`[Stripe Webhook] Received event: ${event.type} (${event.id})`);

  try {
    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session);
        break;

      case "customer.subscription.created":
        await handleSubscriptionCreated(event.data.object as Stripe.Subscription);
        break;

      case "customer.subscription.updated":
        await handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
        break;

      case "customer.subscription.deleted":
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
        break;

      case "invoice.paid":
        await handleInvoicePaid(event.data.object as Stripe.Invoice);
        break;

      case "invoice.payment_failed":
        await handleInvoicePaymentFailed(event.data.object as Stripe.Invoice);
        break;

      case "payment_intent.succeeded":
        await handlePaymentIntentSucceeded(event.data.object as Stripe.PaymentIntent);
        break;

      case "payment_intent.payment_failed":
        await handlePaymentIntentFailed(event.data.object as Stripe.PaymentIntent);
        break;

      default:
        console.log(`[Stripe Webhook] Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error(`[Stripe Webhook] Error processing ${event.type}:`, error);
    res.status(500).json({ error: "Webhook handler failed" });
  }
}

/**
 * Handle checkout.session.completed
 */
async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  console.log(`[Webhook] Checkout session completed: ${session.id}`);

  const userId = session.metadata?.user_id;
  const customerEmail = session.metadata?.customer_email || session.customer_email;

  if (!userId) {
    console.error("[Webhook] No user_id in session metadata");
    return;
  }

  // Get line items to determine what was purchased
  const lineItems = await stripe.checkout.sessions.listLineItems(session.id);

  for (const item of lineItems.data) {
    const priceId = item.price?.id;
    const productId = item.price?.product as string;

    // Check if this is a subscription or one-time purchase
    if (session.mode === "subscription") {
      // Subscription purchase
      console.log(`[Webhook] Subscription purchase for user ${userId}`);

      // Create subscription record
      await db.createSubscription({
        userId: parseInt(userId),
        stripeSubscriptionId: session.subscription as string,
        stripeCustomerId: session.customer as string,
        tierId: priceId || "",
        status: "active",
        currentPeriodStart: new Date(),
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      });

      // Update user's subscription tier
      const tierName = getTierFromPriceId(priceId || "");
      if (tierName) {
        await db.updateUserSubscriptionTier(parseInt(userId), tierName);
      }
    } else if (session.mode === "payment") {
      // One-time purchase (credits)
      console.log(`[Webhook] One-time purchase for user ${userId}`);

      // Check if this is a credit purchase
      const creditAmount = getCreditAmountFromPriceId(priceId || "");
      if (creditAmount > 0) {
        await db.addUserCredits(parseInt(userId), creditAmount);
      }

      // Record payment
      await db.recordPayment({
        userId: parseInt(userId),
        stripePaymentIntentId: session.payment_intent as string,
        amount: String((session.amount_total || 0) / 100),
        currency: session.currency || "usd",
        status: "succeeded",
      });
    }
  }
}

/**
 * Handle customer.subscription.created
 */
async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  console.log(`[Webhook] Subscription created: ${subscription.id}`);

  const customerId = subscription.customer as string;
  const user = await db.getUserByStripeCustomerId(customerId);

  if (!user) {
    console.error(`[Webhook] No user found for customer ${customerId}`);
    return;
  }

  // Create or update subscription record
  await db.createSubscription({
    userId: user.id,
    stripeSubscriptionId: subscription.id,
    stripeCustomerId: customerId,
    tierId: subscription.items.data[0]?.price.id || "",
    status: subscription.status,
    currentPeriodStart: new Date((subscription as any).current_period_start * 1000),
    currentPeriodEnd: new Date((subscription as any).current_period_end * 1000),
  });
}

/**
 * Handle customer.subscription.updated
 */
async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  console.log(`[Webhook] Subscription updated: ${subscription.id}`);

  await db.updateSubscription(subscription.id, {
    status: subscription.status,
    tierId: subscription.items.data[0]?.price.id || "",
    currentPeriodStart: new Date((subscription as any).current_period_start * 1000),
    currentPeriodEnd: new Date((subscription as any).current_period_end * 1000),
    cancelAtPeriodEnd: subscription.cancel_at_period_end,
  });

  // Update user tier if needed
  const customerId = subscription.customer as string;
  const user = await db.getUserByStripeCustomerId(customerId);

  if (user) {
    const tierName = getTierFromPriceId(subscription.items.data[0]?.price.id || "");
    if (tierName) {
      await db.updateUserSubscriptionTier(user.id, tierName);
    }
  }
}

/**
 * Handle customer.subscription.deleted
 */
async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  console.log(`[Webhook] Subscription deleted: ${subscription.id}`);

  await db.updateSubscription(subscription.id, {
    status: "canceled",
  });

  // Downgrade user to free tier
  const customerId = subscription.customer as string;
  const user = await db.getUserByStripeCustomerId(customerId);

  if (user) {
    await db.updateUserSubscriptionTier(user.id, "free");
  }
}

/**
 * Handle invoice.paid
 */
async function handleInvoicePaid(invoice: Stripe.Invoice) {
  console.log(`[Webhook] Invoice paid: ${invoice.id}`);

  const customerId = invoice.customer as string;
  const user = await db.getUserByStripeCustomerId(customerId);

  if (user) {
    await db.recordPayment({
      userId: user.id,
      stripePaymentIntentId: (invoice as any).payment_intent as string,
      stripeInvoiceId: invoice.id,
      amount: String(invoice.amount_paid / 100),
      currency: invoice.currency,
      status: "succeeded",
    });
  }
}

/**
 * Handle invoice.payment_failed
 */
async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  console.log(`[Webhook] Invoice payment failed: ${invoice.id}`);

  const customerId = invoice.customer as string;
  const user = await db.getUserByStripeCustomerId(customerId);

  if (user) {
    await db.recordPayment({
      userId: user.id,
      stripePaymentIntentId: (invoice as any).payment_intent as string,
      stripeInvoiceId: invoice.id,
      amount: String(invoice.amount_due / 100),
      currency: invoice.currency,
      status: "failed",
    });

    // TODO: Send notification to user about failed payment
  }
}

/**
 * Handle payment_intent.succeeded
 */
async function handlePaymentIntentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  console.log(`[Webhook] Payment intent succeeded: ${paymentIntent.id}`);

  // Payment already handled in checkout.session.completed for most cases
  // This is a backup for direct payment intents
}

/**
 * Handle payment_intent.payment_failed
 */
async function handlePaymentIntentFailed(paymentIntent: Stripe.PaymentIntent) {
  console.log(`[Webhook] Payment intent failed: ${paymentIntent.id}`);

  // TODO: Handle failed payment notification
}

/**
 * Helper: Get tier name from price ID
 */
function getTierFromPriceId(priceId: string): string | null {
  // Map price IDs to tier names
  const priceToTier: Record<string, string> = {
    // These would be your actual Stripe price IDs
    // For now, return based on metadata or default
  };

  return priceToTier[priceId] || null;
}

/**
 * Helper: Get credit amount from price ID
 */
function getCreditAmountFromPriceId(priceId: string): number {
  // Map price IDs to credit amounts
  const priceToCredits: Record<string, number> = {
    // These would be your actual Stripe price IDs
    // For now, return 0
  };

  return priceToCredits[priceId] || 0;
}

export { stripe };
