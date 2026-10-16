import { NextResponse } from "next/server";
import { seedCatalogDraftSafe } from "@/lib/db/seedCatalogDraft";

export async function POST() {
  try {
    const result = await seedCatalogDraftSafe();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    endpoint: "/api/admin/catalog/seed",
    description: "Kirim POST untuk memicu inisialisasi struktur dan data draft katalog selempang",
    status: "draft_mode_ready",
  });
}
