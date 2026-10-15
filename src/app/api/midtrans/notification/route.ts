import { NextResponse } from "next/server";
import { orderStore } from "@/lib/db/orderStore";
import { MidtransService } from "@/lib/services/midtransService";

export async function POST(request: Request) {
  try {
    const notification = await request.json();

    const {
      order_id,
      status_code,
      gross_amount,
      signature_key,
      transaction_status,
      fraud_status,
      payment_type,
      settlement_time,
    } = notification || {};

    if (!order_id || !status_code || !gross_amount || !signature_key) {
      return NextResponse.json(
        { success: false, message: "Payload notifikasi tidak lengkap." },
        { status: 400 }
      );
    }

    // 1. Verify Midtrans SHA512 Signature
    const isValidSignature = MidtransService.verifyNotificationSignature(
      order_id,
      status_code,
      gross_amount,
      signature_key
    );

    if (!isValidSignature) {
      console.warn("[Midtrans Webhook] Signature verification FAILED for order_id:", order_id);
      return NextResponse.json(
        { success: false, message: "Signature verification failed." },
        { status: 403 }
      );
    }

    // 2. Locate Matching Transaction in Database
    const allOrders = await orderStore.getAllOrders();
    let matchingOrder = null;
    let matchingTx = null;

    for (const ord of allOrders) {
      const tx = ord.transactions.find((t) => t.midtransOrderId === order_id);
      if (tx) {
        matchingOrder = ord;
        matchingTx = tx;
        break;
      }
    }

    if (!matchingOrder || !matchingTx) {
      console.warn("[Midtrans Webhook] Order tidak ditemukan untuk Midtrans Order ID:", order_id);
      return NextResponse.json(
        { success: false, message: "Order not found in database." },
        { status: 404 }
      );
    }

    // 3. Verify Nominal matches expected gross amount
    const expectedAmount = matchingTx.grossAmount;
    const notifiedAmount = Math.round(parseFloat(gross_amount));

    if (Math.abs(expectedAmount - notifiedAmount) > 1) {
      console.error(
        `[Midtrans Webhook] Amount mismatch! Expected ${expectedAmount}, received ${notifiedAmount}`
      );
      return NextResponse.json(
        { success: false, message: "Amount mismatch detected." },
        { status: 400 }
      );
    }

    // 4. Determine Payment State (Idempotent processing)
    let isSuccess = false;
    let isPending = false;
    let isFailed = false;

    if (transaction_status === "capture") {
      if (fraud_status === "accept") {
        isSuccess = true;
      } else {
        isPending = true;
      }
    } else if (transaction_status === "settlement") {
      isSuccess = true;
    } else if (transaction_status === "pending") {
      isPending = true;
    } else if (
      transaction_status === "deny" ||
      transaction_status === "expire" ||
      transaction_status === "cancel"
    ) {
      isFailed = true;
    }

    // Record or update transaction status
    await orderStore.recordTransaction(matchingOrder.id, {
      paymentPhase: matchingTx.paymentPhase,
      midtransOrderId: order_id,
      grossAmount: expectedAmount,
      paymentMethod: payment_type || matchingTx.paymentMethod,
      transactionStatus: isSuccess ? "settlement" : isPending ? "pending" : "cancel",
      paidAt: isSuccess ? settlement_time || new Date().toISOString() : undefined,
      rawNotification: JSON.stringify(notification),
    });

    // 5. Update Order Status
    if (isSuccess) {
      if (matchingTx.paymentPhase === "dp") {
        // DP payment success -> NOT fully paid! Marks deposit_paid & in_production
        await orderStore.updateStatus(matchingOrder.id, {
          paymentStatus: "deposit_paid",
          productionStatus: "in_production",
          adminUser: "midtrans_webhook",
          reason: `Pembayaran DP 50% terverifikasi via Midtrans (${payment_type || "online"})`,
        });
      } else if (matchingTx.paymentPhase === "pelunasan") {
        // Pelunasan payment success -> Order is now fully paid!
        await orderStore.updateStatus(matchingOrder.id, {
          paymentStatus: "paid",
          adminUser: "midtrans_webhook",
          reason: `Pelunasan 50% terverifikasi via Midtrans (${payment_type || "online"})`,
        });
      }
    } else if (isFailed) {
      if (matchingTx.paymentPhase === "dp") {
        await orderStore.updateStatus(matchingOrder.id, {
          paymentStatus: "failed",
          adminUser: "midtrans_webhook",
          reason: `Transaksi Midtrans ${transaction_status}`,
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: "Notifikasi Midtrans berhasil diproses.",
    });
  } catch (err: unknown) {
    console.error("[Midtrans Webhook] Exception processing notification:", err);
    return NextResponse.json({ success: false, message: "Internal server error." }, { status: 500 });
  }
}
