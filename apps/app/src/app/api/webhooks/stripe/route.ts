import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import Stripe from "stripe";
import {
  handleCheckoutCompleted,
  handleCheckoutExpired,
  handleInvoicePaid,
  handleInvoicePaymentFailed,
  handleInvoicePaymentSucceeded,
  handleSubscriptionCreated,
  handleSubscriptionDeleted,
  handleSubscriptionUpdated,
} from "./event-handlers";

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-06-30.basil",
});

export async function POST(req: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
  const sig = req.headers.get("stripe-signature")!;
  const body = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutCompleted(session);
        break;

      case "checkout.session.expired":
        const expiredSession = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutExpired(expiredSession);
        break;

      case "customer.subscription.created":
        const subscriptionCreated = event.data.object as Stripe.Subscription;
        await handleSubscriptionCreated(subscriptionCreated);
        break;

      case "customer.subscription.updated":
        const subscriptionUpdated = event.data.object as Stripe.Subscription;
        await handleSubscriptionUpdated(subscriptionUpdated);
        break;

      case "customer.subscription.deleted":
        const subscriptionDeleted = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeleted(subscriptionDeleted);
        break;

      case "invoice.paid":
        const invoicePaid = event.data.object as Stripe.Invoice;
        await handleInvoicePaid(invoicePaid);
        break;

      case "invoice.payment_failed":
        const invoicePaymentFailed = event.data.object as Stripe.Invoice;
        await handleInvoicePaymentFailed(invoicePaymentFailed);
        break;

      case "invoice.payment_succeeded":
        const invoicePaymentSucceeded = event.data.object as Stripe.Invoice;
        await handleInvoicePaymentSucceeded(invoicePaymentSucceeded);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
  } catch (error) {
    console.error("[STRIPE_EVENT_HANDLER_ERROR]", error);
    return NextResponse.json(
      { error: "Webhook event handling failed." },
      { status: 500 }
    );
  }

  return NextResponse.json({ received: true });
}
