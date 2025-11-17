import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: Request,
  { params }: { params: { orgId: string } }
) {
  try {
    const { orgId } = params;

    const subscription = await prisma.subscription.findUnique({
      where: { organizationId: orgId },
      include: {
        plan: true,
      },
    });

    if (!subscription) {
      return NextResponse.json(
        { subscription: null, plan: null },
        { status: 404 }
      );
    }

    return NextResponse.json(subscription);
  } catch (err) {
    console.error("Subscription lookup failed", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
