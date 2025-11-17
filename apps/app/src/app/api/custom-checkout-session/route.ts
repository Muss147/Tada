import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-06-30.basil",
});

export async function POST(req: NextRequest) {
  try {
    const {
      credits,
      organizationId,
      unitPrice,
      currency = "eur",
      user,
      metadata,
    } = await req.json();

    if (!credits || credits <= 0) {
      return NextResponse.json(
        { error: "Invalid credits amount" },
        { status: 400 }
      );
    }

    if (!organizationId) {
      return NextResponse.json(
        { error: "Organization ID is required" },
        { status: 400 }
      );
    }

    const totalAmount = Math.round(credits * unitPrice * 100);

    let customer: Stripe.Customer;
    const existingCustomers = await stripe.customers.list({
      email: user.email,
      limit: 1,
    });

    if (existingCustomers.data.length > 0) {
      customer = existingCustomers.data[0]!;
    } else {
      customer = await stripe.customers.create({
        email: user.email,
        name: user.name || undefined,
        metadata: {
          userId: user?.id || user.id || "",
          organizationId,
        },
      });
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      customer: customer.id,
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: currency.toLowerCase(),
            product_data: {
              name: `${credits} crédits de recherche`,
              description: `Achat de ${credits} crédits à ${unitPrice}€ l'unité`,
              metadata: {
                type: "credits",
                organizationId,
              },
            },
            unit_amount: Math.round(unitPrice * 100),
          },
          quantity: credits,
        },
      ],
      metadata: {
        organizationId,
        planId: "credit",
        userId: user?.id || user.id || "",
        userEmail: user.email,
        credits: credits.toString(),
        unitPrice: unitPrice.toString(),
        ...metadata,
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/billing/custom-billing-success?session_id={CHECKOUT_SESSION_ID}&type=credits`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/billing/cancel`,

      invoice_creation: {
        enabled: true,
        invoice_data: {
          description: `Achat de ${credits} crédits de recherche`,
          metadata: {
            organizationId,
            credits: credits.toString(),
          },
        },
      },

      customer_update: {
        address: "auto",
        name: "auto",
      },
    });

    return NextResponse.json({
      sessionId: checkoutSession.id,
      url: checkoutSession.url,
      amount: totalAmount,
      credits,
    });
  } catch (error) {
    console.error("Error creating custom payment session:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
