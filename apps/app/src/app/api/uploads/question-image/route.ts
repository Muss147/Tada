import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "Aucun fichier envoyé" },
        { status: 400 }
      );
    }

    // 💾 Dossier cible : tu peux le changer si tu veux
    const uploadDir =
      process.env.SURVEY_IMAGE_UPLOAD_DIR || "public/uploads/surveys";

    const absoluteUploadDir = path.join(process.cwd(), uploadDir);

    // On s'assure que le dossier existe
    await fs.mkdir(absoluteUploadDir, { recursive: true });

    // Nom de fichier safe
    const originalName = file.name || "survey-image";
    const safeName = originalName.replace(/\s+/g, "-").toLowerCase();
    const ext =
      safeName.includes(".") ? `.${safeName.split(".").pop()}` : ".png";

    const filename = `survey-${Date.now()}-${Math.random()
      .toString(36)
      .slice(2)}${ext}`;

    const filepath = path.join(absoluteUploadDir, filename);

    // Écriture sur le disque
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await fs.writeFile(filepath, buffer);

    // URL publique (public/ est la racine statique)
    const publicPath =
      "/" +
      path
        .join(uploadDir.replace(/^public[\\/]/, ""), filename)
        .replace(/\\/g, "/");

    return NextResponse.json({ url: publicPath });
  } catch (error) {
    console.error("Erreur upload survey image :", error);
    return NextResponse.json(
      { error: "Erreur lors de l'upload de l'image" },
      { status: 500 }
    );
  }
}
