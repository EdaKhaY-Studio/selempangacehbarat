import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const MIME_MAP: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".pdf": "application/pdf",
};

interface RouteParams {
  params: Promise<{ filename: string }>;
}

export async function GET(request: Request, context: RouteParams) {
  try {
    const { filename } = await context.params;

    if (!filename || typeof filename !== "string") {
      return NextResponse.json({ success: false, message: "Nama file tidak valid." }, { status: 400 });
    }

    // Strict path traversal and naming pattern check
    // Allows only alphanumeric characters, underscores, and supported extensions
    const isSafeName = /^[a-zA-Z0-9_-]+\.(png|jpg|jpeg|webp|pdf)$/i.test(filename);
    if (!isSafeName || filename.includes("..") || filename.includes("/") || filename.includes("\\")) {
      return NextResponse.json({ success: false, message: "Akses ditolak: nama file mencurigakan." }, { status: 403 });
    }

    // 1. Primary lookup: Protected storage directory (outside public)
    const primaryPath = path.join(process.cwd(), "storage", "uploads", "logos", filename);

    // 2. Fallback lookup for legacy uploads in public directory
    const legacyPath = path.join(process.cwd(), "public", "uploads", "logos", filename);

    let filePathToServe: string | null = null;

    if (fs.existsSync(primaryPath)) {
      filePathToServe = primaryPath;
    } else if (fs.existsSync(legacyPath)) {
      filePathToServe = legacyPath;
    }

    if (!filePathToServe) {
      return NextResponse.json({ success: false, message: "File logo tidak ditemukan." }, { status: 404 });
    }

    const ext = path.extname(filename).toLowerCase();
    const contentType = MIME_MAP[ext] || "application/octet-stream";
    const fileBuffer = fs.readFileSync(filePathToServe);

    return new Response(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "private, max-age=86400, no-transform",
        "X-Content-Type-Options": "nosniff",
        "Content-Disposition": ext === ".pdf" ? "inline" : `inline; filename="${filename}"`,
      },
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Gagal membaca file logo.";
    return NextResponse.json({ success: false, message: errorMsg }, { status: 500 });
  }
}
