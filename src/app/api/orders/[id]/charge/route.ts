import { NextResponse } from "next/server";
import { orderStore } from "@/lib/db/orderStore";
import { MidtransService, CorePaymentMethod } from "@/lib/services/midtransService";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function POST(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json().catch(() => ({}));
    const { paymentMethod, paymentPhase } = body || {};

    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID pesanan tidak valid." },
        { status: 400 }
      );
    }

    const order = await orderStore.getOrderById(id);
    if (!order) {
      return NextResponse.json(
        { success: false, message: "Pesanan tidak ditemukan di database." },
        { status: 404 }
      );
    }

    if (order.paymentStatus === "paid") {
      return NextResponse.json(
        { success: false, message: "Pesanan ini sudah berstatus lunas penuh." },
        { status: 400 }
      );
    }

    // Tentukan fase pembayaran yang sah
    const isDpPhase =
      paymentPhase === "dp" ||
      order.paymentStatus === "awaiting_deposit" ||
      order.paymentStatus === "deposit_pending";

    const isPelunasanPhase =
      paymentPhase === "pelunasan" ||
      order.paymentStatus === "deposit_paid" ||
      order.paymentStatus === "balance_due" ||
      order.paymentStatus === "balance_pending";

    if (!isDpPhase && !isPelunasanPhase) {
      return NextResponse.json(
        { success: false, message: "Fase pembayaran tidak valid untuk status pesanan saat ini." },
        { status: 400 }
      );
    }

    const phase: "dp" | "pelunasan" = isDpPhase ? "dp" : "pelunasan";
    const chargeAmount = phase === "dp" ? order.dpAmount : order.balanceAmount;

    // Validasi pilihan metode pembayaran
    const allowedMethods: CorePaymentMethod[] = [
      "bca_va",
      "bni_va",
      "bri_va",
      "cimb_va",
      "permata_va",
      "mandiri_bill",
      "qris",
      "gopay",
    ];

    const selectedMethod: CorePaymentMethod = allowedMethods.includes(paymentMethod)
      ? paymentMethod
      : "bca_va"; // default ke BCA VA jika belum spesifik

    // 1. Anti-Duplicate / Idempotency Check:
    // Periksa apakah transaksi aktif dengan metode yang sama sudah pernah dibuat dan masih berlaku
    const existingTx = order.transactions.find(
      (tx) => tx.paymentPhase === phase && tx.paymentMethod === selectedMethod && tx.transactionStatus === "pending"
    );

    if (existingTx && (existingTx.vaNumber || existingTx.qrString || existingTx.qrUrl || existingTx.billKey)) {
      return NextResponse.json({
        success: true,
        isExistingTransaction: true,
        orderId: order.id,
        orderNumber: order.orderNumber,
        paymentPhase: phase,
        paymentMethod: selectedMethod,
        grossAmount: chargeAmount,
        midtransOrderId: existingTx.midtransOrderId,
        vaNumber: existingTx.vaNumber,
        bank: existingTx.bank,
        billKey: existingTx.billKey,
        billerCode: existingTx.billerCode,
        qrString: existingTx.qrString,
        qrUrl: existingTx.qrUrl,
        deepLinkUrl: existingTx.deepLinkUrl,
        expiryTime: existingTx.expiryTime,
        transactionStatus: "pending",
        message: "Melanjutkan transaksi pembayaran aktif sebelumnya.",
      });
    }

    // 2. Periksa Ketersediaan Kredensial Midtrans Sandbox
    if (!MidtransService.isConfigured()) {
      return NextResponse.json(
        {
          success: false,
          isConfigured: false,
          orderNumber: order.orderNumber,
          paymentPhase: phase,
          grossAmount: chargeAmount,
          message:
            "Kredensial Midtrans Sandbox belum dikonfigurasi pada environment server. Transaksi Core API otomatis belum dapat diproses. Anda dapat melakukan pembayaran transfer manual dan mengonfirmasi ke admin WhatsApp.",
        },
        { status: 503 }
      );
    }

    // 3. Eksekusi Charge API ke Midtrans Core API
    const cleanNumber = order.orderNumber.replace(/[^A-Za-z0-9]/g, "");
    const midtransOrderId = `${cleanNumber}-${phase.toUpperCase()}-${Date.now()}`;
    const phaseLabel = phase === "dp" ? "DP 50%" : "Pelunasan 50%";

    const chargeResult = await MidtransService.chargeCoreApi({
      orderId: midtransOrderId,
      grossAmount: chargeAmount,
      paymentMethod: selectedMethod,
      customerName: order.customerName,
      customerPhone: order.customerPhone,
      customerEmail: order.customerEmail,
      itemDescription: `${phaseLabel} ${order.orderNumber} - Slempang FHD`,
    });

    if (!chargeResult) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Gagal membuat instruksi pembayaran dengan Midtrans Core API. Pastikan saluran pembayaran aktif di Sandbox Midtrans.",
        },
        { status: 400 }
      );
    }

    // 4. Catat Transaksi ke Database sab_payment_transactions
    await orderStore.recordTransaction(order.id, {
      paymentPhase: phase,
      midtransOrderId,
      grossAmount: chargeAmount,
      paymentMethod: selectedMethod,
      transactionStatus: chargeResult.transactionStatus,
      rawNotification: JSON.stringify(chargeResult.rawResponse),
    });

    // 5. Perbarui Status Pesanan ke pending yang sesuai
    const nextPaymentStatus = phase === "dp" ? "deposit_pending" : "balance_pending";
    await orderStore.updateStatus(order.id, {
      paymentStatus: nextPaymentStatus,
      adminUser: "core_api",
      reason: `Membuat transaksi Core API ${selectedMethod} (${phaseLabel})`,
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
      orderNumber: order.orderNumber,
      paymentPhase: phase,
      paymentMethod: selectedMethod,
      grossAmount: chargeAmount,
      midtransOrderId,
      vaNumber: chargeResult.vaNumber,
      bank: chargeResult.bank,
      billKey: chargeResult.billKey,
      billerCode: chargeResult.billerCode,
      qrString: chargeResult.qrString,
      qrUrl: chargeResult.qrUrl,
      deepLinkUrl: chargeResult.deepLinkUrl,
      expiryTime: chargeResult.expiryTime,
      transactionStatus: chargeResult.transactionStatus,
      message: "Instruksi pembayaran Core API berhasil dibuat.",
    });
  } catch (err: unknown) {
    console.error("[Core API Charge] Exception:", err);
    const errorMsg = err instanceof Error ? err.message : "Terjadi kesalahan sistem.";
    return NextResponse.json({ success: false, message: errorMsg }, { status: 500 });
  }
}
