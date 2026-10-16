import { NextRequest, NextResponse } from "next/server";
import { SashPricingService } from "@/lib/services/sashPricingService";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { model, options = [], quantity = 1 } = body;

    if (!model) {
      return NextResponse.json(
        { success: false, error: "Parameter 'model' wajib disertakan." },
        { status: 400 }
      );
    }

    const result = await SashPricingService.calculate({
      modelSlugOrId: model,
      optionSlugs: Array.isArray(options) ? options : [],
      quantity: Number(quantity) || 1,
    });

    if (!result.isValid) {
      return NextResponse.json(
        {
          success: false,
          error: result.error,
        },
        { status: result.statusCode || 400 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result,
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

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const model = searchParams.get("model") || "biasa";
  const optionsParam = searchParams.get("options");
  const quantityParam = searchParams.get("quantity") || "1";
  const options = optionsParam ? optionsParam.split(",") : [];

  const result = await SashPricingService.calculate({
    modelSlugOrId: model,
    optionSlugs: options,
    quantity: parseInt(quantityParam, 10) || 1,
  });

  return NextResponse.json({
    endpoint: "/api/pricing/calculate",
    description: "Kalkulasi otomatis harga selempang di sisi server berdasarkan database dan relasi opsi",
    result,
  });
}
