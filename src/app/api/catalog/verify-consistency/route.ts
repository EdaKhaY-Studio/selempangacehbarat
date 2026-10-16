import { NextResponse } from "next/server";
import { runCatalogConsistencyCheck } from "@/lib/validation/catalogConsistencyCheck";

export async function GET() {
  try {
    const report = runCatalogConsistencyCheck();
    return NextResponse.json({
      endpoint: "/api/catalog/verify-consistency",
      description: "Verifikasi kesesuaian data katalog selempang dinamis dengan pricing engine & kode legacy",
      success: report.discrepancies.length === 0,
      report,
    });
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
