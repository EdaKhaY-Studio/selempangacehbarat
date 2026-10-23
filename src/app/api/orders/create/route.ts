import { NextResponse } from "next/server";
import { orderStore } from "@/lib/db/orderStore";
import {
  calculateOrderTotals,
  SashModelType,
  ADDONS_BIASA,
  ADDONS_SYAL,
  SASH_MODELS,
} from "@/lib/pricing/calculator";
import { getProductBySlug } from "@/lib/products-data";
import { MidtransService } from "@/lib/services/midtransService";
import { validateModelAndOptionGroupLimits } from "@/lib/validation/catalogValidator";
import {
  saveOrderCustomizationSnapshot,
  saveOrderItemOptionsSnapshot,
} from "@/lib/db/orderSnapshotsStore";
import {
  MOCK_SASH_MODELS,
  MOCK_CUSTOM_OPTIONS,
  MOCK_OPTION_GROUPS,
} from "@/lib/catalog/mock-sash-catalog";

interface IncomingOrderItem {
  productId?: string;
  productSlug?: string;
  modelType: SashModelType;
  material: "bludru" | "satin";
  clothColor: string;
  edgeTapeColor: string;
  threadColor: string;
  customText: string;
  hasLogo: boolean;
  logoUrl?: string;
  decorations: string[];
  designNotes?: string;
  quantity: number;
}

interface IncomingOrderPayload {
  idempotencyKey: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  customerInstitution?: string;
  eventDate: string;
  targetDate: string;
  deliveryMethod: "pickup" | "delivery";
  deliveryAddress?: string;
  deliveryCity?: string;
  deliveryPostalCode?: string;
  scheduleNotes?: string;
  items: IncomingOrderItem[];
}

export async function POST(request: Request) {
  try {
    const body: IncomingOrderPayload = await request.json();

    const {
      idempotencyKey,
      customerName,
      customerPhone,
      customerEmail,
      customerInstitution,
      eventDate,
      targetDate,
      deliveryMethod,
      deliveryAddress,
      deliveryCity,
      deliveryPostalCode,
      scheduleNotes,
      items,
    } = body || {};

    // 1. Mandatory Validations
    if (!idempotencyKey || typeof idempotencyKey !== "string") {
      return NextResponse.json(
        { success: false, message: "Kunci idempotensi (idempotencyKey) wajib disertakan." },
        { status: 400 }
      );
    }

    if (!customerName?.trim() || !customerPhone?.trim()) {
      return NextResponse.json(
        { success: false, message: "Nama lengkap dan nomor WhatsApp pemesan wajib diisi." },
        { status: 400 }
      );
    }

    if (!eventDate || !targetDate) {
      return NextResponse.json(
        { success: false, message: "Tanggal acara dan target tanggal selesai wajib dipilih." },
        { status: 400 }
      );
    }

    if (deliveryMethod === "delivery" && !deliveryAddress?.trim()) {
      return NextResponse.json(
        { success: false, message: "Alamat lengkap pengiriman wajib diisi untuk metode antar." },
        { status: 400 }
      );
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, message: "Pesanan harus memuat minimal 1 item selempang." },
        { status: 400 }
      );
    }

    // 2. Validate Items, Products & Approved Addons (Server-side validation)
    for (let i = 0; i < items.length; i++) {
      const it = items[i];

      // 2a. Validate Product Slug or ID if provided
      if (it.productId || it.productSlug) {
        const query = (it.productSlug || it.productId) as string;
        const matchedProduct = getProductBySlug(query);
        if (!matchedProduct) {
          return NextResponse.json(
            {
              success: false,
              message: `Produk "${query}" tidak terdaftar dalam katalog resmi Selempang Aceh Barat.`,
            },
            { status: 400 }
          );
        }
      }

      // 2b. Validate Model Type
      if (!it.modelType || !SASH_MODELS[it.modelType]) {
        return NextResponse.json(
          {
            success: false,
            message: `Model selempang "${it.modelType}" pada item #${i + 1} tidak valid. Pilihan yang diizinkan: biasa, syal, timbal_balik.`,
          },
          { status: 400 }
        );
      }

      // 2c. Validasi Model, Opsi, Batas Grup, dan Penguncian Status Publikasi Katalog
      // Memastikan pelanggan tidak dapat membuat pesanan berbayar jika model/harga masih berstatus "draft"
      const validation = await validateModelAndOptionGroupLimits(
        it.modelType,
        Array.isArray(it.decorations) ? it.decorations : [],
        { requirePublished: true }
      );
      if (!validation.isValid) {
        const isDraftBlock = validation.statusCode === 403;
        const customerMessage = isDraftBlock
          ? "Pemesanan online untuk spesifikasi kustom ini sedang dalam tahap finalisasi harga oleh butik FHD dan belum dapat diproses otomatis. Silakan hubungi butik FHD via WhatsApp untuk konsultasi langsung."
          : `Item #${i + 1}: ${validation.message}`;

        return NextResponse.json(
          {
            success: false,
            isDraftBlocked: isDraftBlock,
            message: customerMessage,
          },
          { status: validation.statusCode || 400 }
        );
      }

      // 2d. Validate Custom Text & Logo File
      if (!it.customText || !it.customText.trim()) {
        return NextResponse.json(
          { success: false, message: `Tulisan nama/gelar pada item #${i + 1} wajib diisi.` },
          { status: 400 }
        );
      }
      if (it.hasLogo && (!it.logoUrl || !it.logoUrl.trim())) {
        return NextResponse.json(
          {
            success: false,
            message: `Item #${i + 1} memilih menggunakan logo, tetapi file logo belum diunggah.`,
          },
          { status: 400 }
        );
      }
      if (!it.quantity || it.quantity < 1) {
        return NextResponse.json(
          { success: false, message: `Jumlah unit pada item #${i + 1} minimal 1.` },
          { status: 400 }
        );
      }
    }

    // 3. Backend Anti-Double-Submit Check (Idempotency)
    const existingOrder = await orderStore.findByIdempotencyKey(idempotencyKey);
    if (existingOrder) {
      // Find latest pending or settlement transaction
      const latestTx = existingOrder.transactions[existingOrder.transactions.length - 1];
      return NextResponse.json({
        success: true,
        isIdempotentReplay: true,
        orderId: existingOrder.id,
        orderNumber: existingOrder.orderNumber,
        dpAmount: existingOrder.dpAmount,
        balanceAmount: existingOrder.balanceAmount,
        totalProductAmount: existingOrder.totalProductAmount,
        paymentStatus: existingOrder.paymentStatus,
        productionStatus: existingOrder.productionStatus,
        snapToken: latestTx?.snapToken,
        snapRedirectUrl: latestTx?.snapRedirectUrl,
      });
    }

    // 4. Server-Side Recalculate Prices
    const pricingCalc = calculateOrderTotals(
      items.map((it) => {
        let decors = Array.isArray(it.decorations) ? [...it.decorations] : [];
        if (it.hasLogo && !decors.includes("bordir_logo")) {
          decors.push("bordir_logo");
        } else if (!it.hasLogo) {
          decors = decors.filter((d) => d !== "bordir_logo");
        }
        return {
          modelType: it.modelType,
          addons: decors,
          quantity: it.quantity,
        };
      })
    );

    // Build finalized items with recalculated server values
    const finalizedItems = items.map((it, idx) => {
      const calculated = pricingCalc.items[idx];
      const matchedProduct = it.productSlug || it.productId
        ? getProductBySlug((it.productSlug || it.productId) as string)
        : undefined;
      const productNote = matchedProduct ? `[Produk: ${matchedProduct.name} (${matchedProduct.sku})]` : "";
      const combinedNotes = [productNote, it.designNotes?.trim()].filter(Boolean).join(" | ") || undefined;

      return {
        modelType: it.modelType,
        material: it.material,
        clothColor: it.clothColor,
        edgeTapeColor: it.edgeTapeColor,
        threadColor: it.threadColor,
        customText: it.customText.trim(),
        hasLogo: Boolean(it.hasLogo),
        logoUrl: it.logoUrl,
        decorations: calculated.selectedAddons.map((a) => a.id),
        designNotes: combinedNotes,
        basePrice: calculated.basePrice,
        addonsPrice: calculated.addonsPricePerUnit,
        unitPrice: calculated.unitPrice,
        quantity: calculated.quantity,
        subtotal: calculated.subtotal,
      };
    });

    // Siapkan data snapshot kustomisasi model
    const firstItem = finalizedItems[0];
    const modelInfo = SASH_MODELS[firstItem.modelType];
    const mockModel = MOCK_SASH_MODELS.find((m) => m.slug === firstItem.modelType);

    const customizationSnapshot = {
      model_slug: firstItem.modelType,
      model_name: mockModel?.nama || modelInfo?.name || firstItem.modelType,
      base_price: firstItem.basePrice,
      total_options_price: firstItem.addonsPrice,
      unit_price: firstItem.unitPrice,
      quantity: firstItem.quantity,
      total_price: firstItem.subtotal,
      custom_text: firstItem.customText,
      cloth_material: firstItem.material,
      cloth_color: firstItem.clothColor,
      thread_color: firstItem.threadColor,
      options_snapshot_json: JSON.stringify(firstItem.decorations),
    };

    // Siapkan data snapshot tiap opsi tambahan per item
    const itemOptionsSnapshots: Array<{
      order_item_index: number;
      option_id?: number | null;
      option_slug: string;
      option_name: string;
      group_name: string;
      price: number;
    }> = [];

    finalizedItems.forEach((it, idx) => {
      (it.decorations || []).forEach((decSlug) => {
        const optFromMock = MOCK_CUSTOM_OPTIONS.find((o) => o.slug === decSlug);
        const optGroup = optFromMock
          ? MOCK_OPTION_GROUPS.find((g) => g.id === optFromMock.group_id)
          : null;
        const optInfo = ADDONS_BIASA[decSlug] || ADDONS_SYAL[decSlug];
        itemOptionsSnapshots.push({
          order_item_index: idx,
          option_slug: decSlug,
          option_name: optFromMock?.nama || optInfo?.label || decSlug,
          group_name: optGroup?.nama_grup || optInfo?.group || "dekorasi",
          price: optFromMock ? optFromMock.harga : optInfo?.price || 0,
        });
      });
    });

    // 5. Simpan Pesanan & Snapshot dalam Transaksi Database Atomik
    const newOrder = await orderStore.createOrder({
      idempotencyKey,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      customerEmail: customerEmail?.trim(),
      customerInstitution: customerInstitution?.trim(),
      eventDate,
      targetDate,
      deliveryMethod,
      deliveryAddress: deliveryAddress?.trim(),
      deliveryCity: deliveryCity?.trim(),
      deliveryPostalCode: deliveryPostalCode?.trim(),
      scheduleNotes: scheduleNotes?.trim(),
      totalProductAmount: pricingCalc.totalProduct,
      dpAmount: pricingCalc.dpAmount,
      balanceAmount: pricingCalc.balanceAmount,
      shippingCost: 0,
      items: finalizedItems,
      customizationSnapshot,
      itemOptionsSnapshots,
    });

    // 6. Inisialisasi Rekaman Pembayaran DP 50% di Database sab_payment_transactions
    const midtransOrderId = `${newOrder.orderNumber.replace(/[^A-Za-z0-9]/g, "")}-DP-${Date.now()}`;
    await orderStore.recordTransaction(newOrder.id, {
      paymentPhase: "dp",
      midtransOrderId,
      grossAmount: newOrder.dpAmount,
      transactionStatus: "pending",
    });

    return NextResponse.json({
      success: true,
      orderId: newOrder.id,
      orderNumber: newOrder.orderNumber,
      dpAmount: newOrder.dpAmount,
      balanceAmount: newOrder.balanceAmount,
      totalProductAmount: newOrder.totalProductAmount,
      paymentStatus: newOrder.paymentStatus,
      productionStatus: newOrder.productionStatus,
      message: "Pesanan berhasil dibuat.",
    });
  } catch (err: unknown) {
    console.error("[Orders API] Error creating order:", err);
    const rawMsg = err instanceof Error ? err.message : "";
    const isSensitive =
      rawMsg.includes("MySQL") ||
      rawMsg.includes("u911912137") ||
      rawMsg.includes("SELECT") ||
      rawMsg.includes("INSERT") ||
      rawMsg.includes("database") ||
      rawMsg.includes("ECONNREFUSED") ||
      rawMsg.includes("ETIMEDOUT") ||
      rawMsg.includes("PROTOCOL") ||
      rawMsg.includes("ER_") ||
      rawMsg.includes("terkonfigurasi");

    const customerMessage =
      isSensitive || !rawMsg
        ? "Maaf, pemesanan online sedang mengalami gangguan. Pesanan Anda belum berhasil dibuat. Silakan coba kembali beberapa saat lagi atau hubungi tim FHD."
        : rawMsg;

    return NextResponse.json({ success: false, message: customerMessage }, { status: 500 });
  }
}
