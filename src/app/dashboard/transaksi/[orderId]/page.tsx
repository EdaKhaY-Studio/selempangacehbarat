"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronLeft,
  CheckCircle2,
  Clock,
  AlertCircle,
  Truck,
  Store,
  CreditCard,
  Phone,
  Calendar,
  Sparkles,
  Download,
  ExternalLink,
  ShieldCheck,
  Tag,
  User,
  Scissors,
  Check,
  Loader2,
  Lock,
} from "lucide-react";
import { authService } from "@/lib/services/authService";
import { resolveSelectedOptions } from "@/lib/catalog/mock-sash-catalog";

function formatIDR(val: number): string {
  return "Rp" + (val || 0).toLocaleString("id-ID");
}

export default function AdminOrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = (params?.orderId as string) || "";

  const [order, setOrder] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  // Status Form
  const [newProductionStatus, setNewProductionStatus] = useState("");
  const [newPaymentStatus, setNewPaymentStatus] = useState("");
  const [statusReason, setStatusReason] = useState("");

  const fetchOrderDetail = useCallback(async () => {
    try {
      const res = await fetch(`/api/admin/orders/${encodeURIComponent(orderId)}`);
      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || "Pesanan tidak ditemukan.");
      } else {
        setOrder(data.order);
        setNewProductionStatus(data.order.productionStatus);
        setNewPaymentStatus(data.order.paymentStatus);
      }
    } catch {
      setError("Gagal memuat rincian pesanan dari server.");
    } finally {
      setLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      router.replace("/dashboard/login");
      return;
    }
    fetchOrderDetail();
  }, [fetchOrderDetail, router]);

  const handleUpdateStatus = async (recordManualSettlement: boolean = false) => {
    if (!order) return;
    setUpdatingStatus(true);

    try {
      const res = await fetch(`/api/admin/orders/${order.id}/status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productionStatus: newProductionStatus,
          paymentStatus: newPaymentStatus,
          recordManualSettlement,
          reason: statusReason.trim() || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        alert(data.message || "Gagal memperbarui status.");
      } else {
        alert("Status pesanan berhasil diperbarui.");
        setStatusReason("");
        fetchOrderDetail();
      }
    } catch {
      alert("Terjadi kesalahan koneksi.");
    } finally {
      setUpdatingStatus(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#090A0F] text-slate-200 flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-[#D4AF37]" />
        <span className="ml-3 text-sm">Memuat detail pesanan admin...</span>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-[#090A0F] text-slate-200 p-8">
        <div className="max-w-2xl mx-auto py-12 text-center space-y-4">
          <AlertCircle size={36} className="text-rose-500 mx-auto" />
          <h2 className="text-xl font-bold text-white">Pesanan Tidak Ditemukan</h2>
          <p className="text-sm text-slate-400">{error || "Data pesanan tidak tersedia."}</p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/dashboard/transaksi"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1E2230] text-slate-200 text-xs font-semibold hover:bg-[#2A3042]"
            >
              <ChevronLeft size={16} />
              Kembali ke Daftar Transaksi
            </Link>
            <Link
              href="/dashboard/transaksi/demo"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-semibold hover:bg-amber-500/20"
            >
              <Sparkles size={14} className="text-[#D4AF37]" />
              Buka Panel Demo (Data Tiruan)
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Calculate verified amount paid
  const verifiedPaid =
    order.transactions
      ?.filter(
        (t: any) =>
          t.transactionStatus === "settlement" || t.transactionStatus === "capture"
      )
      .reduce((sum: number, t: any) => sum + (t.grossAmount || 0), 0) || 0;

  const remainingBalance = Math.max(0, order.totalProductAmount - verifiedPaid);

  const isMockOrder =
    order.isMock ||
    order.id?.toLowerCase().includes("mock") ||
    order.orderNumber?.toUpperCase().includes("MOCK") ||
    orderId?.toLowerCase().includes("demo");

  return (
    <div className="min-h-screen bg-[#090A0F] text-slate-200 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Mock Order Demo Banner */}
        {isMockOrder && (
          <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 flex items-start gap-3.5 shadow-xs">
            <div className="p-2 rounded-xl bg-amber-500/20 text-[#D4AF37] shrink-0 mt-0.5">
              <Sparkles size={16} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                  Panel Rincian Pesanan Admin — Mode Data Tiruan (Mock Demo)
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-200 font-mono">
                  #SAB-MOCK-2634
                </span>
              </div>
              <p className="text-xs text-amber-200/80 mt-1 leading-relaxed">
                Panel ini memvalidasi inspeksi rincian pesanan kustom, spesifikasi model selempang resmi, snapshot harga dasar &amp; opsi bordir, serta simulasi operasional admin dan verifikasi pelunasan DP 50%.
              </p>
            </div>
          </div>
        )}

        {/* Top Breadcrumb & Action Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#242938]">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard/transaksi"
              className="p-2 rounded-xl bg-[#141721] border border-[#242938] text-slate-400 hover:text-white transition-colors"
            >
              <ChevronLeft size={18} />
            </Link>
            <div>
              <span className="text-[11px] font-mono text-[#D4AF37] font-bold uppercase tracking-wider block">
                ADMIN ORDER DETAIL
              </span>
              <h1 className="text-2xl font-serif font-bold text-white">
                {order.orderNumber}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/${order.customerPhone.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-xs"
            >
              <Phone size={14} />
              <span>Hubungi Klien via WA</span>
            </a>
          </div>
        </div>

        {/* 2-Column Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Customer & Items (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Customer Identity Card */}
            <div className="p-6 rounded-3xl bg-[#141721] border border-[#242938] space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-[#242938] pb-3 flex items-center gap-2">
                <User size={16} className="text-[#D4AF37]" />
                Identitas Pemesan
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 block">Nama Lengkap:</span>
                  <span className="font-bold text-white text-sm">{order.customerName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Nomor WhatsApp:</span>
                  <span className="font-bold text-[#D4AF37]">{order.customerPhone}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Email:</span>
                  <span>{order.customerEmail || "-"}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Kampus / Instansi:</span>
                  <span>{order.customerInstitution || "-"}</span>
                </div>
              </div>
            </div>

            {/* Items Breakdown Card */}
            <div className="p-6 rounded-3xl bg-[#141721] border border-[#242938] space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-[#242938] pb-3 flex items-center gap-2">
                <Scissors size={16} className="text-[#D4AF37]" />
                Rincian Spesifikasi Selempang ({order.items.length} item)
              </h3>

              <div className="space-y-4">
                {order.items.map((it: any, idx: number) => {
                  const officialModelName =
                    it.modelName ||
                    (it.modelType === "biasa"
                      ? "Model Biasa Menyamping"
                      : it.modelType === "syal"
                      ? "Model Leher / Syal (Dua Sisi Simetris)"
                      : "Model Leher Timbal Balik (Bolak-Balik 2 Sisi)");

                  const basePrice =
                    it.basePrice ||
                    (it.modelType === "biasa" ? 50000 : it.modelType === "syal" ? 85000 : 120000);

                  const optionsToDisplay =
                    it.selectedOptions && it.selectedOptions.length > 0
                      ? it.selectedOptions
                      : Array.isArray(it.decorations) && it.decorations.length > 0
                      ? resolveSelectedOptions(it.modelType, it.decorations)
                      : [];

                  return (
                    <div
                      key={it.id || idx}
                      className="p-5 rounded-2xl bg-[#090A0F] border border-[#242938] text-xs space-y-4"
                    >
                      {/* Header Snapshot Model & Harga Dasar */}
                      <div className="p-4 rounded-xl bg-[#141721] border border-[#D4AF37]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40 flex items-center gap-1">
                              <Sparkles size={11} />
                              Snapshot Model
                            </span>
                            <span className="text-slate-400 font-mono text-[11px]">
                              Item #{idx + 1}
                            </span>
                          </div>
                          <h4 className="font-serif text-base font-bold text-white">
                            {officialModelName}
                          </h4>
                          <span className="text-[11px] text-slate-400 block">
                            Kuantitas: <span className="text-white font-semibold">{it.quantity || 1} pcs</span>
                          </span>
                        </div>

                        <div className="sm:text-right shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#242938]">
                          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                            Harga Dasar Model:
                          </span>
                          <span className="font-mono text-base font-bold text-[#D4AF37] block">
                            {formatIDR(basePrice)}
                          </span>
                          <span className="text-[10px] text-slate-400 block">
                            Subtotal Item: {formatIDR(it.subtotal)}
                          </span>
                        </div>
                      </div>

                      {/* Tulisan Bordir */}
                      <div className="p-3 rounded-xl bg-[#141721] border border-[#242938]">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                          Tulisan Bordir:
                        </span>
                        <p className="font-serif text-sm font-bold text-amber-200 whitespace-pre-line mt-0.5">
                          {it.customText}
                        </p>
                      </div>

                      {/* Spesifikasi Kain */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-slate-400">
                        <div>
                          <span className="text-slate-500 block">Bahan:</span>
                          <span className="text-slate-200 capitalize">{it.material}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block">Warna Kain:</span>
                          <span className="text-slate-200">{it.clothColor}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block">Pita Pinggiran:</span>
                          <span className="text-slate-200">{it.edgeTapeColor}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block">Benang Bordir:</span>
                          <span className="text-slate-200">{it.threadColor}</span>
                        </div>
                      </div>

                      {/* Panel Opsi Tambahan Terpilih */}
                      <div className="p-3.5 rounded-xl bg-[#141721] border border-[#242938] space-y-2">
                        <div className="flex items-center justify-between pb-1.5 border-b border-[#242938]/60">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                            <Sparkles size={11} className="text-[#D4AF37]" />
                            Opsi Tambahan Terpilih ({optionsToDisplay.length})
                          </span>
                          <span className="font-mono text-[11px] font-bold text-[#D4AF37]">
                            Total Opsi: {formatIDR(it.addonsPrice || optionsToDisplay.reduce((s: number, o: any) => s + (o.price || 0), 0))}
                          </span>
                        </div>

                        {optionsToDisplay.length > 0 ? (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                            {optionsToDisplay.map((opt: any, optIdx: number) => (
                              <div
                                key={optIdx}
                                className="flex items-center justify-between p-2 rounded-lg bg-[#090A0F] border border-[#242938] text-xs"
                              >
                                <div className="space-y-0.5">
                                  <span className="text-[9px] uppercase font-bold text-slate-500 block">
                                    {opt.groupName || "Opsi"}
                                  </span>
                                  <span className="text-white font-medium block">
                                    {opt.name}
                                  </span>
                                </div>
                                <span className="font-mono text-xs text-[#D4AF37] font-semibold pl-2">
                                  {opt.price === 0 ? "Termasuk (Rp0)" : formatIDR(opt.price)}
                                </span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-[11px] text-slate-500 italic">
                            Tanpa opsi tambahan (polos standar).
                          </p>
                        )}
                      </div>

                      {/* Logo Preview */}
                      {it.hasLogo && (
                        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between text-xs">
                          <span className="text-amber-300 font-semibold flex items-center gap-1.5">
                            <CheckCircle2 size={14} /> Logo Kampus / Organisasi Digunakan
                          </span>
                          {it.logoUrl && (
                            <a
                              href={it.logoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#b48c28] text-white font-bold text-[11px]"
                            >
                              <ExternalLink size={12} />
                              Lihat File Logo
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Handover & Schedule Card */}
            <div className="p-6 rounded-3xl bg-[#141721] border border-[#242938] space-y-4 text-xs">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-[#242938] pb-3 flex items-center gap-2">
                <Calendar size={16} className="text-[#D4AF37]" />
                Jadwal &amp; Pengiriman
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-slate-400 block">Target Selesai:</span>
                  <span className="font-bold text-white">{order.targetDate}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Tanggal Acara:</span>
                  <span className="font-bold text-white">{order.eventDate}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Metode Serah Terima:</span>
                  <span className="font-semibold text-[#D4AF37]">
                    {order.deliveryMethod === "pickup" ? "Ambil Langsung di Toko Alpen" : "Pengiriman Kurir Lokal"}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block">Alamat / Wilayah:</span>
                  <span>{order.deliveryAddress ? `${order.deliveryAddress}, ${order.deliveryCity}` : "Toko Alpen Meulaboh"}</span>
                </div>
              </div>

              {order.scheduleNotes && (
                <div className="p-3 rounded-xl bg-[#090A0F] border border-[#242938] text-[11px] text-slate-300">
                  <span className="text-slate-500 font-bold block mb-1">Catatan Klien:</span>
                  {order.scheduleNotes}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Financial Breakdown & Status Controls (5 cols on lg) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Financial Status Card */}
            <div className="p-6 rounded-3xl bg-[#141721] border border-[#242938] space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-[#242938] pb-3 flex items-center gap-2">
                <CreditCard size={16} className="text-[#D4AF37]" />
                Rincian Keuangan &amp; Pembayaran
              </h3>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Total Nilai Produk:</span>
                  <span className="font-mono font-bold text-white text-sm">
                    {formatIDR(order.totalProductAmount)}
                  </span>
                </div>

                <div className="flex justify-between text-slate-400">
                  <span>DP 50% Diwajibkan:</span>
                  <span className="font-mono text-amber-300 font-bold">
                    {formatIDR(order.dpAmount)}
                  </span>
                </div>

                <div className="flex justify-between text-emerald-400 font-bold pt-1 border-t border-[#242938]">
                  <span>Total Pembayaran Terverifikasi:</span>
                  <span className="font-mono text-sm">{formatIDR(verifiedPaid)}</span>
                </div>

                <div className="flex justify-between text-rose-400 font-bold">
                  <span>Sisa Pelunasan:</span>
                  <span className="font-mono text-sm">{formatIDR(remainingBalance)}</span>
                </div>
              </div>

              {/* Status Badge */}
              <div className="pt-2 border-t border-[#242938] flex items-center justify-between text-xs">
                <span className="text-slate-400">Status Pembayaran:</span>
                <span className="font-bold uppercase tracking-wider px-2.5 py-1 rounded-full text-[11px] bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  {order.paymentStatus}
                </span>
              </div>

              {/* Manual Cash Settlement Button if remaining */}
              {remainingBalance > 0 && (
                <div className="pt-3 border-t border-[#242938]">
                  <button
                    onClick={() => {
                      if (confirm(`Konfirmasi penerimaan pelunasan tunai sebesar ${formatIDR(remainingBalance)} di kasir toko?`)) {
                        handleUpdateStatus(true);
                      }
                    }}
                    disabled={updatingStatus}
                    className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <CheckCircle2 size={15} />
                    <span>Catat Pelunasan Tunai di Toko ({formatIDR(remainingBalance)})</span>
                  </button>
                </div>
              )}
            </div>

            {/* Production & Status Control Panel */}
            <div className="p-6 rounded-3xl bg-[#141721] border border-[#242938] space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-[#242938] pb-3 flex items-center gap-2">
                <Tag size={16} className="text-[#D4AF37]" />
                Perbarui Status Operasional
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">
                    Status Pengerjaan / Produksi:
                  </label>
                  <select
                    value={newProductionStatus}
                    onChange={(e) => setNewProductionStatus(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#090A0F] border border-[#242938] text-white text-xs"
                  >
                    <option value="awaiting_confirmation">Menunggu Konfirmasi Desain</option>
                    <option value="in_production">Dalam Pengerjaan Bordir</option>
                    <option value="ready_for_pickup">Siap Diambil di Toko / Diserahkan</option>
                    <option value="completed">Pesanan Selesai / Diserahkan</option>
                    <option value="cancelled">Dibatalkan</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">
                    Status Pembayaran:
                  </label>
                  <select
                    value={newPaymentStatus}
                    onChange={(e) => setNewPaymentStatus(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#090A0F] border border-[#242938] text-white text-xs"
                  >
                    <option value="awaiting_deposit">Menunggu Pembayaran DP</option>
                    <option value="deposit_pending">Pembayaran DP Diproses</option>
                    <option value="deposit_paid">DP Lunas (50%)</option>
                    <option value="balance_due">Menunggu Pelunasan</option>
                    <option value="balance_pending">Pelunasan Diproses</option>
                    <option value="paid">Lunas Penuh (100%)</option>
                    <option value="cancelled">Dibatalkan</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">
                    Alasan Perubahan / Catatan Admin:
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Bordir selesai, siap diambil klien"
                    value={statusReason}
                    onChange={(e) => setStatusReason(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#090A0F] border border-[#242938] text-white text-xs"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => handleUpdateStatus(false)}
                  disabled={updatingStatus}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#b48c28] hover:bg-[#9a751e] text-white font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs mt-2"
                >
                  {updatingStatus ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
                  <span>Simpan Perubahan Status</span>
                </button>
              </div>
            </div>

            {/* Midtrans Transactions History */}
            <div className="p-6 rounded-3xl bg-[#141721] border border-[#242938] space-y-3 text-xs">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-[#242938] pb-2">
                Riwayat Transaksi Finansial
              </h3>

              {order.transactions && order.transactions.length > 0 ? (
                <div className="space-y-2">
                  {order.transactions.map((tx: any, tIdx: number) => (
                    <div
                      key={tx.id || tIdx}
                      className="p-3 rounded-xl bg-[#090A0F] border border-[#242938] space-y-1"
                    >
                      <div className="flex justify-between items-center font-semibold text-white">
                        <span className="uppercase text-[11px] font-mono">
                          {tx.paymentPhase === "dp" ? "Fase 1: DP 50%" : "Fase 2: Pelunasan 50%"}
                        </span>
                        <span className="font-mono text-[#D4AF37]">{formatIDR(tx.grossAmount)}</span>
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono truncate">
                        ID: {tx.midtransOrderId}
                      </div>
                      <div className="flex justify-between text-[10px] text-slate-400 pt-1">
                        <span>Status: <strong className="text-slate-200">{tx.transactionStatus}</strong></span>
                        <span>{tx.paidAt ? new Date(tx.paidAt).toLocaleDateString("id-ID") : "-"}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 text-xs italic">Belum ada riwayat transaksi pembayaran.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
