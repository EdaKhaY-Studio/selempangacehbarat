import { NextResponse } from "next/server";
import {
  validateModelAndOptionGroupLimits,
  assertCatalogPublishedForLiveTransaction,
} from "@/lib/validation/catalogValidator";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { model, options = [], requirePublished = true } = body;

    if (!model) {
      return NextResponse.json(
        { success: false, message: "Field 'model' wajib disertakan." },
        { status: 400 }
      );
    }

    const validation = await validateModelAndOptionGroupLimits(
      model,
      Array.isArray(options) ? options : [],
      { requirePublished }
    );

    if (!validation.isValid) {
      return NextResponse.json(
        {
          success: false,
          isBlockedFromLiveTransactions: validation.statusCode === 403,
          statusCode: validation.statusCode,
          message: validation.message,
        },
        { status: validation.statusCode }
      );
    }

    return NextResponse.json({
      success: true,
      canProceedLive: !validation.isDraft,
      isDraft: validation.isDraft,
      draftItems: validation.draftItems,
      model: validation.model,
      options: validation.validatedOptions,
      unitPrice: validation.unitPrice,
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

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const model = searchParams.get("model") || "biasa";
  const optionsParam = searchParams.get("options");
  const options = optionsParam ? optionsParam.split(",") : [];

  const check = await assertCatalogPublishedForLiveTransaction(model, options);

  return NextResponse.json({
    endpoint: "/api/catalog/validate-status",
    description: "Endpoint penjaga status draft & pemblokiran transaksi nyata untuk katalog selempang",
    model,
    options,
    canProceedLive: check.canProceed,
    message: check.canProceed
      ? "Semua item berstatus published dan aman untuk transaksi nyata."
      : check.error,
  });
}
