// app/api/workspaces/[workspaceId]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/current-user";
import { assertWorkspaceAdmin, getUserWorkspaces } from "@/lib/workspaces";

import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";

export async function GET(
  req: NextRequest,
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
      members: {
        include: { user: true },
      },
      invitations: true,
    },
  });

  if (!workspace) {
    return NextResponse.json(
      { error: "Workspace not found" },
      { status: 404 },
    );
  }

  // (optionnel) vérifier que user est bien membre du workspace

  return NextResponse.json(workspace);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ workspaceId: string }> },
) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { workspaceId } = await params; 

  // Vérif admin/owner
  try {
    await assertWorkspaceAdmin(workspaceId, user.id);
  } catch {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // On récupère le workspace existant (pour garder ancien nom/slug/logo si non fournis)
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

    if (typeof rawName === "string") {
      name = rawName.trim();
    }
    if (typeof rawSlug === "string") {
      slug = rawSlug.trim();
    }

    if (rawLogo instanceof File) {
      logoFile = rawLogo;
    }
  } else {
    const body = await req.json().catch(() => ({} as any));
    if (typeof body.name === "string") {
      name = body.name.trim();
    }
    if (typeof body.slug === "string") {
      slug = body.slug.trim();
    }
  }

  const finalName = name && name.length > 0 ? name : existing.name;

  let finalSlug: string | undefined = existing.slug || undefined;

  if (slug && slug.length > 0) {
    const slugBase = slug
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    let normalizedSlug = slugBase || `workspace-${Date.now()}`;

    // Vérifier l'unicité du slug (hors workspace courant)
    const existingWithSameSlug = await prisma.workspace.findFirst({
      where: {
        slug: normalizedSlug,
        NOT: { id: workspaceId },
      },
    });

    if (existingWithSameSlug) {
      normalizedSlug = `${slugBase}-${Date.now()}`;
    }

    finalSlug = normalizedSlug;
  }

  let finalLogo: string | null = existing.logo ?? null;

  if (logoFile && logoFile.size > 0) {
    const bytes = await logoFile.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext =
      logoFile.name.split(".").pop()?.toLowerCase() || "png";
    const filename = `${crypto.randomUUID()}.${ext}`;

    const uploadDirEnv =
      process.env.WORKSPACE_LOGO_UPLOAD_DIR || "public/uploads/workspaces";

    const uploadDir = path.isAbsolute(uploadDirEnv)
      ? uploadDirEnv
      : path.join(process.cwd(), uploadDirEnv);

    await fs.mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, filename);
    await fs.writeFile(filePath, buffer);

    // Optionnel : supprimer l'ancien logo si c’est juste un filename local
    if (existing.logo) {
      const oldPath = path.join(uploadDir, existing.logo);
      fs.unlink(oldPath).catch(() => {
        // on ignore l'erreur si le fichier n'existe plus
      });
    }

    finalLogo = filename;
  }

  const updated = await prisma.workspace.update({
    where: { id: workspaceId },
    data: {
      name: finalName,
      // on ne touche au slug que si on en a recalculé un
      ...(finalSlug ? { slug: finalSlug } : {}),
      logo: finalLogo,
    },
  });

  return NextResponse.json(updated, { status: 200 });
}

/**
 * DELETE /api/workspaces/[workspaceId]
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ workspaceId: string }> },
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { workspaceId } = await params;

    // Vérif admin/owner
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
    const confirmationName =
      (body?.confirmationName as string | undefined) ?? "";

    if (confirmationName !== workspace.name) {
      return NextResponse.json(
        {
          error:
            "Le nom saisi ne correspond pas au nom du workspace. Suppression annulée.",
        },
        { status: 400 },
      );
    }

    await prisma.$transaction(async (tx) => {
      await tx.mission.updateMany({
        where: { workspaceId },
        data: { workspaceId: null },
      });

      // Supprime le workspace (les relations en cascade selon ton schema)
      await tx.workspace.delete({
        where: { id: workspaceId },
      });
    });

    return NextResponse.json(
      { success: true, deletedWorkspaceId: workspaceId },
      { status: 200 },
    );
  } catch (error) {
    console.error("[WORKSPACE_DELETE] error", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 },
    );
  }
}
