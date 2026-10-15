import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import crypto from "crypto";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

const ALLOWED_MIME_TYPES: Record<string, string> = {
  "image/png": ".png",
  "image/jpeg": ".jpg",
  "image/jpg": ".jpg",
  "image/webp": ".webp",
  "application/pdf": ".pdf",
};

/**
 * Validates magic numbers (byte signatures) to ensure the file is genuinely an image/PDF
 */
function isValidFileSignature(buffer: Buffer, mime: string): boolean {
  if (buffer.length < 4) return false;

  // PNG: 89 50 4E 47
  if (mime === "image/png") {
    return buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47;
  }
  // JPEG: FF D8 FF
  if (mime === "image/jpeg" || mime === "image/jpg") {
    return buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
  }
  // WebP: RIFF ... WEBP
  if (mime === "image/webp") {
    return (
      buffer.toString("ascii", 0, 4) === "RIFF" &&
      buffer.toString("ascii", 8, 12) === "WEBP"
    );
  }
  // PDF: %PDF
  if (mime === "application/pdf") {
    return buffer.toString("ascii", 0, 4) === "%PDF";
  }

  return false;
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("logo") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, message: "File logo tidak ditemukan dalam permintaan." },
        { status: 400 }
      );
    }

    if (file.size <= 0) {
      return NextResponse.json(
        { success: false, message: "File logo kosong (0 bytes)." },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          success: false,
          message: `Ukuran file logo melebihi batas maksimum 5 MB (${(file.size / (1024 * 1024)).toFixed(2)} MB).`,
        },
        { status: 400 }
      );
    }

    const mimeType = file.type.toLowerCase();
    if (!ALLOWED_MIME_TYPES[mimeType]) {
      return NextResponse.json(
        {
          success: false,
          message: "Format file tidak didukung. Harap unggah file PNG, JPG, JPEG, WebP, atau PDF.",
        },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Verify magic bytes
    if (!isValidFileSignature(buffer, mimeType)) {
      return NextResponse.json(
        {
          success: false,
          message: "Isi file tidak sesuai dengan format yang diizinkan (signature invalid).",
        },
        { status: 400 }
      );
    }

    // Save to protected persistent folder (outside public directory)
    const ext = ALLOWED_MIME_TYPES[mimeType];
    const safeFilename = `logo_${Date.now()}_${crypto.randomUUID().replace(/-/g, "")}${ext}`;
    const uploadDir = path.join(process.cwd(), "storage", "uploads", "logos");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const destinationPath = path.join(uploadDir, safeFilename);
    fs.writeFileSync(destinationPath, buffer);

    // Secure streaming URL (no direct raw public URL)
    const secureUrl = `/api/uploads/logo/${safeFilename}`;

    return NextResponse.json({
      success: true,
      message: "File logo berhasil diunggah dengan aman.",
      url: secureUrl,
      filename: safeFilename,
      size: file.size,
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Terjadi kesalahan upload logo.";
    return NextResponse.json(
      { success: false, message: errorMsg },
      { status: 500 }
    );
  }
}
