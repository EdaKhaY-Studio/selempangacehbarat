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

      // 2c. Validate Decorations/Addons against official approved catalog
      if (Array.isArray(it.decorations)) {
        if (it.modelType === "biasa") {
          let laceCount = 0;
          for (const decor of it.decorations) {
            if (!ADDONS_BIASA[decor]) {
              return NextResponse.json(
                {
                  success: false,
                  message: `Tambahan dekorasi "${decor}" tidak tersedia untuk model biasa pada item #${i + 1}.`,
                },
                { status: 400 }
              );
            }
            if (ADDONS_BIASA[decor].group === "renda") {
              laceCount++;
            }
          }
          if (laceCount > 1) {
            return NextResponse.json(
              {
                success: false,
                message: `Pilihan renda pada model biasa saling eksklusif. Hanya boleh memilih salah satu dari renda biasa, mahkota, atau Marsyanda.`,
              },
              { status: 400 }
            );
          }
        } else if (it.modelType === "syal") {
          for (const decor of it.decorations) {
            if (!ADDONS_SYAL[decor]) {
              return NextResponse.json(
                {
                  success: false,
                  message: `Tambahan dekorasi "${decor}" tidak tersedia untuk model syal pada item #${i + 1}.`,
                },
                { status: 400 }
              );
            }
          }
        } else if (it.modelType === "timbal_balik") {
          if (it.decorations.length > 0) {
            return NextResponse.json(
              {
                success: false,
                message: `Model leher timbal balik adalah paket Rp135.000 tanpa tambahan dekorasi lain yang belum disepakati.`,
              },
              { status: 400 }
            );
          }
        }
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
        if (it.modelType === "biasa") {
          if (it.hasLogo && !decors.includes("bordir_logo")) {
            decors.push("bordir_logo");
          } else if (!it.hasLogo) {
            decors = decors.filter((d) => d !== "bordir_logo");
          }
        } else {
          // Model syal & timbal_balik: logo does NOT incur any automated charge
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

    // 5. Save Order Persistently in Database
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
    });

    // 6. Generate Midtrans Snap Transaction for DP 50%
    const midtransOrderId = `${newOrder.orderNumber.replace(/[^A-Za-z0-9]/g, "")}-DP-${Date.now()}`;
    let snapToken: string | undefined;
    let snapRedirectUrl: string | undefined;

    if (MidtransService.isConfigured()) {
      const snapRes = await MidtransService.createSnapTransaction({
        orderId: midtransOrderId,
        grossAmount: newOrder.dpAmount,
        customerName: newOrder.customerName,
        customerPhone: newOrder.customerPhone,
        customerEmail: newOrder.customerEmail,
        itemDescription: `DP 50% ${newOrder.orderNumber}`,
      });

      if (snapRes) {
        snapToken = snapRes.token;
        snapRedirectUrl = snapRes.redirectUrl;

        await orderStore.recordTransaction(newOrder.id, {
          paymentPhase: "dp",
          midtransOrderId,
          grossAmount: newOrder.dpAmount,
          transactionStatus: "pending",
          snapToken,
          snapRedirectUrl,
        });

        await orderStore.updateStatus(newOrder.id, {
          paymentStatus: "deposit_pending",
        });
      }
    } else {
      // Record transaction placeholder so record is visible
      await orderStore.recordTransaction(newOrder.id, {
        paymentPhase: "dp",
        midtransOrderId,
        grossAmount: newOrder.dpAmount,
        transactionStatus: "pending",
      });
    }

    return NextResponse.json({
      success: true,
      orderId: newOrder.id,
      orderNumber: newOrder.orderNumber,
      dpAmount: newOrder.dpAmount,
      balanceAmount: newOrder.balanceAmount,
      totalProductAmount: newOrder.totalProductAmount,
      paymentStatus: newOrder.paymentStatus,
      productionStatus: newOrder.productionStatus,
      snapToken,
      snapRedirectUrl,
      message: "Pesanan berhasil dibuat.",
    });
  } catch (err: unknown) {
    console.error("[Orders API] Error creating order:", err);
    const errorMsg = err instanceof Error ? err.message : "Terjadi kesalahan saat memproses pesanan.";
    return NextResponse.json({ success: false, message: errorMsg }, { status: 500 });
  }
}
