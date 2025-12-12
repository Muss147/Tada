import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/current-user";
import { assertWorkspaceAdmin } from "@/lib/workspaces";
import { uploadFileToSupabase, deleteFromSupabase } from "@/lib/uploads.server";

export const runtime = "nodejs";

/**
 * Utilitaire pour récupérer bucket + path depuis une publicUrl Supabase
 */
function extractSupabasePathFromPublicUrl(publicUrl: string) {
  const marker = "/storage/v1/object/public/";
  const idx = publicUrl.indexOf(marker);
  if (idx === -1) return null;

  const rest = publicUrl.slice(idx + marker.length);
  const parts = rest.split("/");
  if (parts.length < 2) return null;

  return {
    bucket: parts[0],
    path: parts.slice(1).join("/"),
  };
}

/**
 * GET /api/workspaces/[workspaceId]
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ workspaceId: string }> },
) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { workspaceId } = await params;

  const workspace = await prisma.workspace.findUnique({
    where: { id: workspaceId },
    include: {
      members: { include: { user: true } },
      invitations: true,
    },
  });

  if (!workspace) {
    return NextResponse.json(
      { error: "Workspace not found" },
      { status: 404 },
    );
  }

  return NextResponse.json(workspace);
}

/**
 * PATCH /api/workspaces/[workspaceId]
 * - update name / slug
 * - upload logo to Supabase
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ workspaceId: string }> },
) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { workspaceId } = await params;

  try {
    await assertWorkspaceAdmin(workspaceId, user.id);
  } catch {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const existing = await prisma.workspace.findUnique({
    where: { id: workspaceId },
  });

  if (!existing) {
    return NextResponse.json(
      { error: "Workspace introuvable" },
      { status: 404 },
    );
  }

  const contentType = req.headers.get("content-type") || "";

  let name: string | undefined;
  let slug: string | undefined;
  let logoFile: File | null = null;

  if (contentType.includes("multipart/form-data")) {
    const formData = await req.formData();
    const rawName = formData.get("name");
    const rawSlug = formData.get("slug");
    const rawLogo = formData.get("logo");

    if (typeof rawName === "string") name = rawName.trim();
    if (typeof rawSlug === "string") slug = rawSlug.trim();
    if (rawLogo instanceof File) logoFile = rawLogo;
  } else {
    const body = await req.json().catch(() => ({}));
    if (typeof body.name === "string") name = body.name.trim();
    if (typeof body.slug === "string") slug = body.slug.trim();
  }

  const finalName = name && name.length > 0 ? name : existing.name;

  let finalSlug = existing.slug || undefined;

  if (slug && slug.length > 0) {
    const base = slug
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    let normalized = base || `workspace-${Date.now()}`;

    const clash = await prisma.workspace.findFirst({
      where: {
        slug: normalized,
        NOT: { id: workspaceId },
      },
    });

    if (clash) normalized = `${base}-${Date.now()}`;

    finalSlug = normalized;
  }

  let finalLogo: string | null = existing.logo ?? null;

  if (logoFile && logoFile.size > 0) {
    const uploaded = await uploadFileToSupabase({
      file: logoFile,
      category: "workspaceLogo",
      baseName: finalSlug ?? finalName,
    });

    if (existing.logo) {
      await deleteFromSupabase({ category: "workspaceLogo", path: existing.logo });
    }

    finalLogo = uploaded.path;
  }


  const updated = await prisma.workspace.update({
    where: { id: workspaceId },
    data: {
      name: finalName,
      ...(finalSlug ? { slug: finalSlug } : {}),
      logo: finalLogo,
    },
  });

  return NextResponse.json(updated);
}

/**
 * DELETE /api/workspaces/[workspaceId]
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ workspaceId: string }> },
) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { workspaceId } = await params;

  try {
    await assertWorkspaceAdmin(workspaceId, user.id);
  } catch {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const workspace = await prisma.workspace.findUnique({
    where: { id: workspaceId },
  });

  if (!workspace) {
    return NextResponse.json(
      { error: "Workspace introuvable" },
      { status: 404 },
    );
  }

  const body = await req.json().catch(() => ({}));
  const confirmationName = body?.confirmationName ?? "";

  if (confirmationName !== workspace.name) {
    return NextResponse.json(
      { error: "Confirmation incorrecte" },
      { status: 400 },
    );
  }

  // Supprimer logo Supabase
  if (workspace.logo) {
    await deleteFromSupabase({ category: "workspaceLogo", path: workspace.logo });
  }

  await prisma.$transaction(async (tx) => {
    await tx.mission.updateMany({
      where: { workspaceId },
      data: { workspaceId: null },
    });

    await tx.workspace.delete({
      where: { id: workspaceId },
    });
  });

  return NextResponse.json({
    success: true,
    deletedWorkspaceId: workspaceId,
  });
}
