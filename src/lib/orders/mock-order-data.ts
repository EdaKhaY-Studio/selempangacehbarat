/**
 * Data Tiruan (Mock Data) untuk Pelacakan Status & Rincian Pesanan
 * Ref Task: kustomisasi-selempang-dinamis/rincian-pesanan-tersimpan/bangun-halaman-pelacakan-rincian-pesanan-dengan-da
 * Usaha: Selempang Aceh Barat (FHD)
 */

import { OrderRecord } from "@/lib/db/orderStore";

export function getMockOrderRecord(queryIdOrNumber?: string): OrderRecord {
  const now = new Date();
  const eventDateObj = new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000);
  const targetDateObj = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
  const paidAtObj = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  const displayOrderNumber =
    queryIdOrNumber && queryIdOrNumber.startsWith("#")
      ? queryIdOrNumber
      : queryIdOrNumber && queryIdOrNumber.toUpperCase().startsWith("SAB")
      ? `#${queryIdOrNumber.toUpperCase()}`
      : "#SAB-MOCK-2634";

  return {
    id: "ord_mock_2634",
    orderNumber: displayOrderNumber,
    idempotencyKey: "mock_idem_key_2634",
    customerName: "Cut Sarah Maulida, S.E.",
    customerPhone: "082299256343",
    customerEmail: "cut.sarah@contoh.id",
    customerInstitution: "Fakultas Ekonomi & Bisnis — Universitas Teuku Umar (UTU)",
    eventDate: eventDateObj.toISOString().split("T")[0],
    targetDate: targetDateObj.toISOString().split("T")[0],
    deliveryMethod: "pickup",
    deliveryAddress: "Workshop Butik FHD Meureubo",
    deliveryCity: "Meulaboh, Aceh Barat",
    deliveryPostalCode: "23615",
    scheduleNotes: "Pesanan bordir komputer wisuda UTU. Mohon font gelar tegak bersambung resmi, siap diserahkan H-2 yudisium.",
    totalProductAmount: 260000,
    dpAmount: 130000,
    balanceAmount: 130000,
    shippingCost: 0,
    paymentStatus: "deposit_paid",
    productionStatus: "ready_for_pickup",
    createdAt: paidAtObj.toISOString(),
    updatedAt: now.toISOString(),
    items: [
      {
        id: "item_mock_1",
        orderId: "ord_mock_2634",
        modelType: "syal",
        modelName: "Model Leher / Syal (Dua Sisi Simetris)",
        material: "bludru",
        clothColor: "Hitam Pekat",
        edgeTapeColor: "Pita Lis Emas (Gold)",
        threadColor: "Gold (Benang Emas Metalik)",
        customText: "Cut Sarah Maulida, S.E.\nUniversitas Teuku Umar",
        hasLogo: true,
        logoUrl: "/Gambar/Maira-sartika.png",
        decorations: ["motif_ujung", "motif_tengah", "les_pinggir", "rumbai_ujung", "bordir_logo"],
        selectedOptions: [
          { slug: "motif_ujung", name: "Motif Ujung", groupName: "Motif Bordir", price: 5000 },
          { slug: "motif_tengah", name: "Motif Tengah", groupName: "Motif Bordir", price: 5000 },
          { slug: "les_pinggir", name: "Les Pinggir", groupName: "Aksen Pinggir & Rumbai", price: 10000 },
          { slug: "rumbai_ujung", name: "Rumbai Ujung Syal", groupName: "Aksen Pinggir & Rumbai", price: 15000 },
          { slug: "bordir_logo", name: "Bordir Logo", groupName: "Logo", price: 10000 },
        ],
        designNotes: "Bordir 2 sisi simetris dada kiri dan kanan",
        basePrice: 85000,
        addonsPrice: 45000,
        unitPrice: 130000,
        quantity: 2,
        subtotal: 260000,
        createdAt: paidAtObj.toISOString(),
      },
    ],
    transactions: [
      {
        id: "tx_mock_dp_1",
        orderId: "ord_mock_2634",
        paymentPhase: "dp",
        midtransOrderId: "SAB-MOCK-2634-DP-1",
        grossAmount: 130000,
        paymentMethod: "qris_bca",
        transactionStatus: "settlement",
        snapToken: "snap_mock_token_dp_1",
        snapRedirectUrl: "https://app.sandbox.midtrans.com/snap/v2/vtweb/mock-dp-1",
        paidAt: paidAtObj.toISOString(),
        rawNotification: '{"status_code":"200","transaction_status":"settlement"}',
        createdAt: paidAtObj.toISOString(),
        updatedAt: paidAtObj.toISOString(),
      },
    ],
  };
}
