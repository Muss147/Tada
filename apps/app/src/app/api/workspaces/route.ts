import { NextRequest, NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/current-user";
import { assertWorkspaceAdmin, getUserWorkspaces } from "@/lib/workspaces";
import { prisma } from "@/lib/prisma";

import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";

import { transporter } from "@/lib/transporter";
const APP_URL = process.env.APP_URL ?? "http://localhost:3000";

export async function GET(req: NextRequest) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const workspaces = await getUserWorkspaces(user.id);
  return NextResponse.json(workspaces);
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const contentType = req.headers.get("content-type") || "";

    let name = "";
    let slug = "";
    let organizationId: string | null = null;
    let invitedEmails: string[] = [];
    let logoFile: File | null = null;

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();

      name = String(formData.get("name") ?? "").trim();
      slug = String(formData.get("slug") ?? "").trim();
      organizationId = (formData.get("organizationId") as string) || null;

      invitedEmails = formData
        .getAll("invitedEmails[]")
        .map((e) => String(e).toLowerCase().trim())
        .filter(Boolean);

      logoFile = (formData.get("logo") as File) || null;
    } else {

      const body = await req.json();
      name = String(body.name ?? "").trim();
      slug = String(body.slug ?? "").trim();
      organizationId = body.organizationId ?? null;

      // Invitations en JSON :
      if (Array.isArray(body.invitedEmails)) {
        invitedEmails = body.invitedEmails
          .map((e: string) => e.toLowerCase().trim())
          .filter(Boolean);
      }

    }

    if (!name) {
      return NextResponse.json(
        { error: "Le nom du workspace est obligatoire" },
        { status: 400 }
      );
    }

    // Normalisation du slug : si non fourni, on repart du name
    const sourceForSlug = slug || name;

    const slugBase = sourceForSlug
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    let finalSlug = slugBase || `workspace-${Date.now()}`;

    let logo: string | null = null;

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

      // En BDD : on stocke juste le filename (simple)
      logo = filename;
    }


    // On s'assure que le slug est unique
    const existingWithSameSlug = await prisma.workspace.findUnique({
      where: { slug: finalSlug },
    });

    if (existingWithSameSlug) {
      finalSlug = `${slugBase}-${Date.now()}`;
    }

    // On mémorise les invitations pour envoyer les emails après la transaction
    const invitationsForEmail: {
      email: string;
      token: string;
      expiresAt: Date;
      workspaceName: string;
    }[] = [];

    // Création du workspace + membership owner + invitations
    const workspace = await prisma.$transaction(async (tx) => {
      const created = await tx.workspace.create({
        data: {
          name,
          slug: finalSlug,
          organizationId,
          ownerId: user.id,
          logo,
          members: {
            create: {
              userId: user.id,
              role: "owner",
              status: "active",
              invitedById: user.id,
            },
          },
        },
      });

      for (const emailRaw of invitedEmails) {
        const email = emailRaw.toLowerCase().trim();
        if (!email || email === user.email) continue;

        const existingUser = await tx.user.findUnique({
          where: { email },
        });

        if (existingUser) {
          const alreadyMember = await tx.workspaceMember.findFirst({
            where: {
              workspaceId: created.id,
              userId: existingUser.id,
              status: "active",
            },
          });

          if (!alreadyMember) {
            await tx.workspaceMember.create({
              data: {
                workspaceId: created.id,
                userId: existingUser.id,
                role: "member",
                status: "active",
                invitedById: user.id,
              },
            });
          }
        } else {
          const token = crypto.randomUUID();
          const expiresAt = new Date();
          expiresAt.setDate(expiresAt.getDate() + 7);

          await tx.workspaceInvitation.create({
            data: {
              workspaceId: created.id,
              email,
              role: "member",
              token,
              status: "pending",
              expiresAt,
              invitedById: user.id,
            },
          });

          console.log(
            "[WORKSPACE_INVITE_DEV]",
            email,
            "invited with token",
            token
          );
        }
      }

      return created;
    });

    // Envoi des emails d'invitation (hors transaction)
    for (const invite of invitationsForEmail) {
      const inviteUrl = `${APP_URL}/fr/workspaces/invitations/accept?token=${invite.token}`;

      try {
        await transporter.sendMail({
          from: "no-reply@monrezo.net",
          to: [invite.email],
          subject: `[Tada] Invitation à rejoindre un workspace`,
          html: `
            <p>Bonjour,</p>
            <p>${user.name || user.email} vous a invité à rejoindre le workspace <b>${invite.workspaceName}</b> sur Tada.</p>
            <p>Cliquez sur le lien ci-dessous pour accepter l'invitation :</p>
            <p><a href="${inviteUrl}">${inviteUrl}</a></p>
            <p>Ce lien expire le ${invite.expiresAt.toLocaleDateString("fr-FR")}.</p>
          `,
        });
      } catch (error) {
        console.error(
          "Erreur lors de l'envoi de l'email d'invitation (create workspace):",
          error,
        );
      }
    }

    return NextResponse.json(workspace, { status: 201 });
  } catch (error) {
    console.error("[CREATE_WORKSPACE_API_ERROR]", error);
    return NextResponse.json(
      {
        error: "Erreur interne du serveur",
        message:
          error instanceof Error ? error.message : "Unknown server error",
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/workspaces/[workspaceId]
 * Vérifie :
 *  - user connecté
 *  - user admin/owner via assertWorkspaceAdmin
 *  - body.confirmationName === workspace.name
 *  - puis supprime le workspace (et détache les missions)
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: { workspaceId: string } },
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { workspaceId } = params;

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
    const confirmationName = (body?.confirmationName as string | undefined) ?? "";

    if (confirmationName !== workspace.name) {
      return NextResponse.json(
        {
          error:
            "Le nom saisi ne correspond pas au nom du workspace. Suppression annulée.",
        },
        { status: 400 },
      );
    }

    // STRATÉGIE DE DELETE :
    // 1) détacher les missions (workspaceId -> null)
    // 2) supprimer le workspace (members + invitations en cascade)

    await prisma.$transaction(async (tx) => {
      await tx.mission.updateMany({
        where: { workspaceId },
        data: { workspaceId: null },
      });

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
