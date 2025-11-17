import { revalidatePath } from "next/cache";
import { PrismaClient } from "@prisma/client";
import Stripe from "stripe";

const prisma = new PrismaClient();

export async function handleCheckoutCompleted(
  session: Stripe.Checkout.Session
) {
  console.log("Checkout session completed", session.metadata?.organizationId);

  const organizationId = session.metadata?.organizationId;

  if (!organizationId) return;

  if (session.mode === "payment") {
    const credits = parseInt(session.metadata?.credits || "0");

    await prisma.billingInfo.upsert({
      where: { organizationId },
      update: {
        credits: { increment: credits },
      },
      create: {
        organizationId,
        credits,
        country: session.customer_details?.address?.country || "",
        company: session.customer_details?.name || "",
        firstName: "",
        lastName: "",
        civility: "",
        acceptTerms: true,
      },
    });

    await prisma.payment.create({
      data: {
        subscriptionId: "",
        amount: (session.amount_total || 0) / 100,
        currency: session.currency || "EUR",
        status: "paid",
        description: `Achat de ${credits} crédits`,
        paidAt: new Date(),
        stripePaymentIntentId: session.payment_intent as string,
      },
    });
  }

  revalidatePath("/api/billing/get-one");
}

// 2. CHECKOUT SESSION EXPIRED
export async function handleCheckoutExpired(session: Stripe.Checkout.Session) {
  console.log("Checkout session expired", session);

  // Actions possibles :
  // - Logger l'abandon de panier
  // - Envoyer un email de relance

  const organizationId = session.metadata?.organizationId;
  if (organizationId) {
    console.log(`Organization ${organizationId} abandoned checkout`);
  }
}

// 3. SUBSCRIPTION CREATED
export async function handleSubscriptionCreated(
  subscription: Stripe.Subscription
) {
  console.log("Subscription created", subscription);

  const organizationId = subscription.metadata?.organizationId;
  if (!organizationId) return;

  const planId = subscription.metadata?.planId;
  if (!planId) return;

  await prisma.subscription.create({
    data: {
      organizationId,
      planId,
      stripeCustomerId: subscription.customer as string,
      stripeSubscriptionId: subscription.id,
      stripePriceId: subscription.items.data[0]?.price.id,
      status: subscription.status,
      currentPeriodStart: new Date(subscription.start_date * 1000),
      currentPeriodEnd: subscription.ended_at
        ? new Date(subscription.ended_at * 1000).toISOString()
        : new Date().toISOString(),
      trialEnd: subscription.trial_end
        ? new Date(subscription.trial_end * 1000)
        : null,
      metadata: subscription.metadata as any,
    },
  });

  revalidatePath("/api/billing/get-one");
}

// 4. SUBSCRIPTION UPDATED
export async function handleSubscriptionUpdated(
  subscription: Stripe.Subscription
) {
  console.log("Subscription updated", subscription.id);

  await prisma.subscription.updateMany({
    where: { stripeSubscriptionId: subscription.id },
    data: {
      status: subscription.status,
      currentPeriodStart: subscription.start_date
        ? new Date(subscription.start_date * 1000).toISOString()
        : new Date().toISOString(),
      currentPeriodEnd: subscription.ended_at
        ? new Date(subscription.ended_at * 1000).toISOString()
        : new Date().toISOString(),
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
      stripePriceId: subscription.items.data[0]?.price.id,
      metadata: subscription.metadata as any,
    },
  });

  // Si le statut change vers 'active', réactiver les fonctionnalités
  if (subscription.status === "active") {
    // Réactiver l'accès aux missions, permettre la création de nouvelles missions, etc.
  }

  // Si le statut change vers 'canceled' ou 'unpaid'
  if (["canceled", "unpaid", "past_due"].includes(subscription.status)) {
    // Limiter l'accès, désactiver certaines fonctionnalités
  }

  revalidatePath("/api/billing/get-one");
}

// 5. SUBSCRIPTION DELETED
export async function handleSubscriptionDeleted(
  subscription: Stripe.Subscription
) {
  console.log("Subscription deleted", subscription.id);

  await prisma.subscription.updateMany({
    where: { stripeSubscriptionId: subscription.id },
    data: {
      status: "canceled",
      cancelAtPeriodEnd: false,
    },
  });

  // - Envoyer un email de confirmation d'annulation

  revalidatePath("/api/billing/get-one");
}

// 6. INVOICE PAID
export async function handleInvoicePaid(invoice: Stripe.Invoice) {
  console.log("Invoice paid", invoice?.metadata?.organizationId as string);

  const subscriptionId = await getSubscriptionId(
    invoice?.metadata?.organizationId as string
  );

  if (!subscriptionId) return;

  await prisma.payment.create({
    data: {
      subscriptionId,
      stripeInvoiceId: invoice.id,
      stripePaymentIntentId: invoice?.id as string,
      amount: (invoice.amount_paid || 0) / 100,
      currency: invoice.currency,
      status: "paid",
      description: invoice.description || "Paiement d'abonnement",
      paidAt: new Date(invoice.status_transitions.paid_at! * 1000),
    },
  });

  // Actions possibles :
  // - Réactiver les services si ils étaient suspendus
  // - Mettre à jour les limites d'usage
  // - Envoyer un reçu personnalisé
  // - Réinitialiser les compteurs mensuels

  revalidatePath("/api/billing/get-one");
}

// 7. INVOICE PAYMENT FAILED
export async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  console.log(
    "Invoice payment failed",
    invoice?.metadata?.organizationId as string
  );

  const subscriptionId = await getSubscriptionId(
    invoice?.metadata?.organizationId as string
  );

  if (!subscriptionId) return;

  await prisma.payment.create({
    data: {
      subscriptionId,
      stripeInvoiceId: invoice.id,
      amount: (invoice.amount_due || 0) / 100,
      currency: invoice.currency,
      status: "failed",
      description: invoice.description || "Tentative de paiement échouée",
    },
  });

  // Actions possibles :
  // - Envoyer un email d'alerte à l'utilisateur
  // - Proposer de mettre à jour le moyen de paiement
  // - Limiter l'accès aux fonctionnalités premium après X tentatives
  // - Programmer des relances automatiques
  // - Logger pour le support client

  // Exemple : récupérer l'organisation pour notifier
  const subscription = await prisma.subscription.findUnique({
    where: { id: subscriptionId },
    include: { organization: true },
  });

  if (subscription) {
    console.log(
      `Payment failed for organization: ${subscription.organization.name}`
    );
    // Envoyer notification...
  }
}

export async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
  console.log("Invoice payment succeeded", invoice);
  const orgId = invoice?.metadata?.organizationId;

  if (!orgId) {
    console.log("Invoice not linked to subscription, skipping");
    return;
  }

  const subscription = await prisma.subscription.findUnique({
    where: { id: orgId },
  });

  if (!subscription) {
    console.log(`Subscription ${orgId} not found in database`);
    return;
  }

  const existingPayment = await prisma.payment.findFirst({
    where: { stripeInvoiceId: invoice.id },
  });

  if (existingPayment) {
    await prisma.payment.update({
      where: { id: existingPayment.id },
      data: {
        status: "paid",
        paidAt: invoice.status_transitions?.paid_at
          ? new Date(invoice.status_transitions.paid_at * 1000)
          : new Date(),
      },
    });
    console.log(`Updated existing payment ${existingPayment.id}`);
  } else {
    const newPayment = await prisma.payment.create({
      data: {
        subscriptionId: orgId,
        stripeInvoiceId: invoice.id,
        stripePaymentIntentId: null,
        amount: (invoice.amount_paid || 0) / 100,
        currency: invoice.currency,
        status: "paid",
        description: invoice.description || "Paiement d'abonnement réussi",
        paidAt: invoice.status_transitions?.paid_at
          ? new Date(invoice.status_transitions.paid_at * 1000)
          : new Date(),
      },
    });

    console.log(`Created new payment ${newPayment.id}`);
  }

  // Actions possibles :
  // - Réactiver tous les services
  // - Réinitialiser les compteurs d'usage pour la nouvelle période
  // - Envoyer un email de confirmation

  revalidatePath("/api/billing/get-one");
}

// Fonction utilitaire pour récupérer l'ID de subscription depuis Stripe
export async function getSubscriptionId(
  stripeSubscriptionId: string
): Promise<string | null> {
  const subscription = await prisma.subscription.findFirst({
    where: { stripeSubscriptionId },
  });
  return subscription?.id || null;
}
