import { supabaseAdmin } from "@/lib/supabase";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const file = await req.arrayBuffer();
    const contentType = req.headers.get("content-type") || "application/octet-stream";

    // Generar nombre único para el archivo
    const fileExtension = contentType.split("/")[1] || "bin";
    const filename = `${nanoid()}.${fileExtension}`;
    const filePath = `uploads/${filename}`;

    // Subir archivo a Supabase Storage
    const { data, error } = await supabaseAdmin.storage
      .from('uploads')
      .upload(filePath, file, {
        contentType,
        upsert: false
      });

    if (error) {
      console.error('Supabase storage error:', error);
      return new Response(`Upload failed: ${error.message}`, {
        status: 500
      });
    }

    // Obtener URL pública del archivo
    const { data: publicUrlData } = supabaseAdmin.storage
      .from('uploads')
      .getPublicUrl(filePath);

    return NextResponse.json({
      url: publicUrlData.publicUrl,
      path: filePath,
      size: file.byteLength,
      type: contentType
    });

  } catch (error) {
    console.error('Upload error:', error);
    return new Response("Upload failed", {
      status: 500
    });
  }
}
