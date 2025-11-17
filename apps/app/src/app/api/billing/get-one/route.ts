import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const GetBillingInfoSchema = z.object({
  organizationId: z.string(),
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const organizationId = searchParams.get("organizationId");

  const parsed = GetBillingInfoSchema.safeParse({ organizationId });

  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        error: "Paramètres invalides",
        issues: parsed.error.format(),
      },
      { status: 400 }
    );
  }

  try {
    const billingInfo = await prisma.billingInfo.findUnique({
      where: { organizationId: parsed.data.organizationId },
    });

    return NextResponse.json(
      {
        success: true,
        data: billingInfo,
      },
      {
        headers: {
          "Cache-Control": "no-cache",
        },
      }
    );
  } catch (error) {
    console.error("[GET_BILLING_INFO_ERROR]", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Erreur inconnue",
      },
      { status: 500 }
    );
  }
}
