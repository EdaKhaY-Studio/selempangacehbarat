import { NextResponse } from "next/server";
import { orderStore } from "@/lib/db/orderStore";
import { calculateOrderTotals, SashModelType } from "@/lib/pricing/calculator";
import { MidtransService } from "@/lib/services/midtransService";

interface IncomingOrderItem {
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

    // 2. Validate Items & Logo Requirement
    for (let i = 0; i < items.length; i++) {
      const it = items[i];
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
        designNotes: it.designNotes,
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
