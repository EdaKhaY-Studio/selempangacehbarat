import { NextResponse } from "next/server";
import {
  validateModelAndOptionGroupLimits,
  assertCatalogPublishedForLiveTransaction,
} from "@/lib/validation/catalogValidator";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { model, options = [], items, requirePublished = true } = body;

    // Mendukung validasi beberapa item sekaligus (misal pada formulir checkout)
    if (Array.isArray(items) && items.length > 0) {
      const allDraftItems: string[] = [];
      for (let i = 0; i < items.length; i++) {
        const it = items[i];
        const validation = await validateModelAndOptionGroupLimits(
          it.modelType || it.model,
          Array.isArray(it.decorations || it.options) ? (it.decorations || it.options) : [],
          { requirePublished }
        );

        if (!validation.isValid) {
          return NextResponse.json(
            {
              success: false,
              isBlockedFromLiveTransactions: validation.statusCode === 403,
              statusCode: validation.statusCode,
              itemIndex: i,
              message: validation.message,
            },
            { status: validation.statusCode }
          );
        }

        if (validation.draftItems && validation.draftItems.length > 0) {
          allDraftItems.push(...validation.draftItems);
        }
      }

      return NextResponse.json({
        success: true,
        canProceedLive: allDraftItems.length === 0,
        isDraft: allDraftItems.length > 0,
        draftItems: allDraftItems,
      });
    }

    if (!model) {
      return NextResponse.json(
        { success: false, message: "Field 'model' atau 'items' wajib disertakan." },
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
