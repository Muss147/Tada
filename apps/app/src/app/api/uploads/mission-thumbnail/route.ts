import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export const runtime = "nodejs"; // on force le runtime Node pour fs

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

    // 1. Récupérer le dossier cible depuis l'env ou fallback
    const uploadDir =
      process.env.MISSION_THUMBNAIL_UPLOAD_DIR || "public/uploads/missions";

    const absoluteUploadDir = path.join(process.cwd(), uploadDir);

    // 2. Créer le dossier s'il n'existe pas
    await fs.mkdir(absoluteUploadDir, { recursive: true });

    // 3. Créer un nom de fichier "safe"
    const originalName = file.name || "mission-thumbnail";
    const safeName = originalName.replace(/\s+/g, "-").toLowerCase();
    const ext =
      safeName.includes(".") ? `.${safeName.split(".").pop()}` : ".png";

    const filename = `mission-${Date.now()}-${Math.random()
      .toString(36)
      .slice(2)}${ext}`;

    const filepath = path.join(absoluteUploadDir, filename);

    // 4. Convertir le File en Buffer & écrire sur le disque
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    await fs.writeFile(filepath, buffer);

    // 5. Construire l'URL publique (public/ est la racine statique)
    // ex : public/uploads/missions/mission-...png => /uploads/missions/mission-...png
    const publicPath = "/" + path.join(uploadDir.replace(/^public[\\/]/, ""), filename).replace(/\\/g, "/");

    return NextResponse.json({ url: publicPath });
  } catch (error) {
    console.error("Erreur upload mission thumbnail :", error);
    return NextResponse.json(
      { error: "Erreur lors de l'upload de l'image" },
      { status: 500 }
    );
  }
}
