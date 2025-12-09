// src/app/api/uploads/organization-logo/route.ts
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const orgId = (formData.get("orgId") as string | null) ?? "unknown";

    if (!file) {
      return NextResponse.json(
        { error: "Aucun fichier reçu" },
        { status: 400 },
      );
    }

    const uploadDir =
      process.env.ORGANIZATION_LOGO_UPLOAD_DIR ||
      "public/uploads/organizations";

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const extension = file.name.split(".").pop() || "png";
    const safeName = file.name
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9.\-_]/g, "_");
    const filename = `${orgId}_${Date.now()}.${extension}`;

    const dirPath = path.join(process.cwd(), uploadDir);
    await fs.mkdir(dirPath, { recursive: true });

    const filePath = path.join(dirPath, filename);
    await fs.writeFile(filePath, buffer);

    // URL publique (car tout ce qui est dans /public est servi à la racine)
    const publicBasePath = uploadDir.replace(/^public\//, "");
    const publicUrl = `/${publicBasePath}/${filename}`;

    return NextResponse.json({ url: publicUrl });
  } catch (error) {
    console.error("[UPLOAD_ORGANIZATION_LOGO_ERROR]", error);
    return NextResponse.json(
      { error: "Erreur lors de l'upload du logo" },
      { status: 500 },
    );
  }
}
