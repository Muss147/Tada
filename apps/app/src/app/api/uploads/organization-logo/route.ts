import { NextResponse } from "next/server";
import { uploadFileToSupabase } from "@/lib/uploads";

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

    // Upload centralisé sur Supabase
    const { publicUrl } = await uploadFileToSupabase({
      file,
      category: "organizationLogo",
      baseName: orgId,
    });

    // On retourne l’URL publique qui sera stockée dans organization.logo
    return NextResponse.json({ url: publicUrl }, { status: 200 });
  } catch (error) {
    console.error("[UPLOAD_ORGANIZATION_LOGO_ERROR]", error);
    return NextResponse.json(
      { error: "Erreur lors de l'upload du logo" },
      { status: 500 },
    );
  }
}
