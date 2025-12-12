// src/app/api/uploads/question-image/route.ts
import { NextResponse } from "next/server";
import { uploadFileToSupabase } from "@/lib/uploads.server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "Aucun fichier envoyé" }, { status: 400 });
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Le fichier doit être une image" }, { status: 400 });
    }

    // Optionnel : tagger par missionId / questionId
    const missionId = (formData.get("missionId") as string | null) ?? "generic";

    const { path } = await uploadFileToSupabase({
      file,
      category: "surveyImage",
      baseName: missionId,
    });

    // On retourne le PATH (à stocker en DB)
    return NextResponse.json({ path }, { status: 200 });
  } catch (error) {
    console.error("[UPLOAD_QUESTION_IMAGE_ERROR]", error);
    return NextResponse.json(
      { error: "Erreur lors de l'upload de l'image" },
      { status: 500 },
    );
  }
}
