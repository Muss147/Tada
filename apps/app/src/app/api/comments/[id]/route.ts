// app/api/comments/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/current-user";

type RouteParams = {
  params: { id: string };
};

export async function PATCH(req: Request, { params }: RouteParams) {
  const user = await getCurrentUser();
  if (!user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { id } = params;
  const body = await req.json();
  const { content, mentions } = body as {
    content?: string;
    mentions?: string[];
  };

  const existing = await prisma.comment.findUnique({
    where: { id },
    select: {
      id: true,
      content: true,
      createdById: true,
    },
  });

  if (!existing) {
    return new NextResponse("Not found", { status: 404 });
  }

  const isAuthor = existing.createdById === user.id;
  const isAdmin = (user as any).role === "admin";

  if (!isAuthor && !isAdmin) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  const result = await prisma.$transaction(async (tx) => {
    const updated = await tx.comment.update({
      where: { id },
      data: {
        content: content?.trim() ?? existing.content,
        editedAt: new Date(),
      },
    });

    // on reset les mentions et on les recrée
    if (Array.isArray(mentions)) {
      await tx.commentMention.deleteMany({
        where: { commentId: id },
      });

      await Promise.all(
        mentions.map((userId) =>
          tx.commentMention.create({
            data: { commentId: id, userId },
          })
        )
      );
    }

    await tx.commentEvent.create({
      data: {
        commentId: id,
        type: "edited",
        payload: {
          previousContent: existing.content,
          newContent: content?.trim() ?? existing.content,
        },
        createdById: user.id,
      },
    });

    const fullComment = await tx.comment.findUnique({
      where: { id },
      include: {
        createdBy: {
          select: { id: true, name: true, email: true, image: true },
        },
        mentions: {
          include: {
            user: {
              select: { id: true, name: true, email: true, image: true },
            },
          },
        },
      },
    });

    return fullComment;
  });

  return NextResponse.json(result);
}

export async function DELETE(req: Request, { params }: RouteParams) {
  const user = await getCurrentUser();
  if (!user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { id } = params;

  const existing = await prisma.comment.findUnique({
    where: { id },
    select: {
      id: true,
      createdById: true,
    },
  });

  if (!existing) {
    return new NextResponse("Not found", { status: 404 });
  }


  const isAuthor = existing.createdById === user.id;
  const isAdmin = (user as any).role === "admin";

  if (!isAuthor && !isAdmin) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  await prisma.$transaction(async (tx) => {
    await tx.comment.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    await tx.commentEvent.create({
      data: {
        commentId: id,
        type: "deleted",
        payload: null,
        createdById: user.id,
      },
    });
  });

  return new NextResponse(null, { status: 204 });
}
