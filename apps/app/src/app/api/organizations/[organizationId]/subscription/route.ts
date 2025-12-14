import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: Request,
  { params }: { params: { organizationId: string } }
) {
  try {
    const { organizationId } = params;

    const subscription = await prisma.subscription.findUnique({
      where: { organizationId },
      include: { plan: true },
    });

    if (!subscription) {
      return NextResponse.json({ subscription: null, plan: null }, { status: 200 });
    }

    // renvoyer le shape attendu par le client
    return NextResponse.json(
      { subscription, plan: subscription.plan },
      { status: 200 }
    );
  } catch (err) {
    console.error("Subscription lookup failed", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
