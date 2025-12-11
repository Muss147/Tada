// lib/uploads.ts
import crypto from "crypto";
import { supabaseAdmin } from "./supabase-server";

export type UploadCategory =
  | "workspaceLogo"
  | "userAvatar"
  | "organizationLogo"
  | "surveyImage";

const UPLOAD_CONFIG: Record<
  UploadCategory,
  { bucket: string; folder: string }
> = {
  workspaceLogo: {
    bucket: "tada",
    folder: "workspace-logos",
  },
  userAvatar: {
    bucket: "tada",
    folder: "user-avatars",
  },
  organizationLogo: {
    bucket: "tada",
    folder: "organization-logos",
  },
  surveyImage: {
    bucket: "tada",
    folder: "surveys",
  },
};


export async function uploadFileToSupabase(options: {
  file: File;
  category: UploadCategory;
  /**
   * Permet de stabiliser un peu le nom (slug, id workspace, id user, etc.)
   */
  baseName?: string;
}) {
  const { file, category, baseName } = options;

  const config = UPLOAD_CONFIG[category];

  const ext =
    file.name.split(".").pop()?.toLowerCase() ||
    file.type.split("/").pop() ||
    "bin";

  const random = crypto.randomUUID();
  const safeBase = (baseName || "file")
    .toLowerCase()
    .replace(/[^a-z0-9-_]+/g, "-")
    .slice(0, 50);

  const path = `${config.folder}/${safeBase}-${Date.now()}-${random}.${ext}`;

  // Supabase accepte Buffer / Blob / File. En route handler Node :
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const { data, error } = await supabaseAdmin.storage
    .from(config.bucket)
    .upload(path, buffer, {
      contentType: file.type || "application/octet-stream",
      upsert: false,
    });

  if (error) {
    console.error("[SUPABASE_UPLOAD_ERROR]", error);
    throw error;
  }

  // URL publique (si le bucket est en "public")
  const { data: publicUrlData } = supabaseAdmin.storage
    .from(config.bucket)
    .getPublicUrl(data.path);

  return {
    bucket: config.bucket,
    path: data.path,
    publicUrl: publicUrlData.publicUrl,
  };
}


export async function deleteFromSupabase(options: {
  category: UploadCategory;
  path: string;
}) {
  const { category, path } = options;
  const config = UPLOAD_CONFIG[category];

  const { error } = await supabaseAdmin.storage
    .from(config.bucket)
    .remove([path]);

  if (error) {
    console.error("[SUPABASE_DELETE_ERROR]", error);
    throw error;
  }
}

