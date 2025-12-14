import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthenticatedUser } from "@/lib/auth";
import { z } from "zod";

// GET /missions → afficher les missions
// GET /api/v1/missions

export async function GET(request: NextRequest) {
  const user = await getAuthenticatedUser(request);

  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(request.url);

  const page = Number(searchParams.get("page") ?? 1);
  const limit = Number(searchParams.get("limit") ?? 10);
  const skip = (page - 1) * limit;

  const missions = await prisma.mission.findMany({
    where: {
      status: "open",
      isPublic: true,
    },
    select: {
      id: true,
      name: true,
      type: true,
      sampleSummary: true,
      objectives: true,
      status: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    skip,
    take: limit,
  });

  return NextResponse.json({
    data: missions,
    pagination: {
      page,
      limit,
    },
  });
}

// POST /missions → créer une mission (ex: admin / system)
// POST /api/v1/submissions

const createMissionSchema = z.object({
  name: z.string().min(3),
  sampleSummary: z.string().min(10),
  objectives: z.string().min(10),
  isPublic: z.boolean().default(true),
});

export async function POST(request: NextRequest) {
  const user = await getAuthenticatedUser(request);

  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const body = await request.json();
  const parsed = createMissionSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const mission = await prisma.mission.create({
    data: {
      name: parsed.data.name,
      sampleSummary: parsed.data.sampleSummary,
      objectives: parsed.data.objectives,
      isPublic: parsed.data.isPublic,
      status: "open",
      createdBy: user.id,
    },
  });

  return NextResponse.json({ data: mission }, { status: 201 });
}