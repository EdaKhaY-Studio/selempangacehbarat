"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  Truck,
  Store,
  CreditCard,
  MessageCircle,
  Copy,
  ChevronRight,
  ExternalLink,
  Loader2,
  Calendar,
  Sparkles,
} from "lucide-react";

function formatIDR(val: number): string {
  return "Rp" + (val || 0).toLocaleString("id-ID");
}

export function CustomerOrderStatusView({ orderId }: { orderId: string }) {
  const [order, setOrder] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isProcessingPelunasan, setIsProcessingPelunasan] = useState(false);

  const fetchOrder = useCallback(async () => {
    try {
      const res = await fetch(`/api/orders/${encodeURIComponent(orderId)}`);
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.message || "Pesanan tidak ditemukan.");
      } else {
        setOrder(data.order);
      }
    } catch {
      setError("Gagal memuat status pesanan.");
    } finally {
      setLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  const copyOrderNumber = () => {
    if (order?.orderNumber) {
      navigator.clipboard.writeText(order.orderNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Trigger Pelunasan 50%
  const handlePayPelunasan = async () => {
    if (!order) return;
    setIsProcessingPelunasan(true);
    try {
      const res = await fetch(`/api/orders/${order.id}/settlement`, { method: "POST" });
      const data = await res.json();

      if (!res.ok || !data.success) {
        alert(data.message || "Gagal membuat transaksi pelunasan.");
      } else if (data.snapRedirectUrl) {
        window.location.href = data.snapRedirectUrl;
      } else {
        alert("Transaksi pelunasan telah dicatat. Silakan hubungi admin untuk verifikasi pembayaran.");
        fetchOrder();
      }
    } catch {
      alert("Terjadi kesalahan jaringan.");
    } finally {
      setIsProcessingPelunasan(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-center">
        <Loader2 size={36} className="animate-spin text-[#b48c28] mb-4" />
        <p className="text-sm text-slate-600">Mengambil status pesanan resmi...</p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="max-w-xl mx-auto py-16 text-center space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-200 text-rose-500 flex items-center justify-center mx-auto">
          <AlertCircle size={28} />
        </div>
        <h2 className="text-xl font-bold text-[#0f172a]">Pesanan Tidak Ditemukan</h2>
        <p className="text-sm text-slate-600">
          Nomor pesanan atau ID yang Anda tuju tidak valid. Harap periksa kembali tautan yang Anda terima.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0f172a] text-white text-xs font-bold"
        >
          Kembali ke Beranda
        </Link>
      </div>
    );
  }

  // Status mapping helpers
  const getPaymentBadge = (status: string) => {
    switch (status) {
      case "deposit_paid":
        return {
          label: "DP 50% Terverifikasi",
          bg: "bg-emerald-50 text-emerald-700 border-emerald-200",
          icon: CheckCircle2,
        };
      case "paid":
        return {
          label: "Lunas Penuh (100%)",
          bg: "bg-indigo-50 text-indigo-700 border-indigo-200",
          icon: CheckCircle2,
        };
      case "deposit_pending":
      case "awaiting_deposit":
        return {
          label: "Menunggu Pembayaran DP 50%",
          bg: "bg-amber-50 text-amber-700 border-amber-200",
          icon: Clock,
        };
      case "balance_pending":
      case "balance_due":
        return {
          label: "Menunggu Pelunasan 50%",
          bg: "bg-blue-50 text-blue-700 border-blue-200",
          icon: Clock,
        };
      default:
        return {
          label: status,
          bg: "bg-slate-100 text-slate-700 border-slate-200",
          icon: AlertCircle,
        };
    }
  };

  const getProductionBadge = (status: string) => {
    switch (status) {
      case "awaiting_confirmation":
        return { label: "Menunggu Konfirmasi Jadwal", color: "text-amber-600" };
      case "in_production":
        return { label: "Dalam Pengerjaan Bordir", color: "text-blue-600" };
      case "ready_for_pickup":
        return { label: "Siap Diambil di Toko / Diserahkan", color: "text-purple-600" };
      case "completed":
        return { label: "Pesanan Selesai / Diserahkan", color: "text-emerald-600" };
      default:
        return { label: status, color: "text-slate-600" };
    }
  };

  const payBadge = getPaymentBadge(order.paymentStatus);
  const prodBadge = getProductionBadge(order.productionStatus);

  const PayIcon = payBadge.icon;

  const whatsappInquiry = encodeURIComponent(
    `Halo Admin Selempang Aceh Barat, saya ingin konfirmasi pesanan:
Nomor Pesanan: *${order.orderNumber}*
Atas Nama: *${order.customerName}*
Status DP: ${payBadge.label}
Status Pengerjaan: ${prodBadge.label}
Mohon info update pengerjaan selempang saya. Terima kasih!`
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* 1. Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono text-slate-500 block mb-1">
            STATUS PESANAN RESMI
          </span>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#0f172a]">
              {order.orderNumber}
            </h1>
            <button
              onClick={copyOrderNumber}
              className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-[#b48c28] hover:border-[#b48c28] transition-colors cursor-pointer"
              title="Salin Nomor Pesanan"
            >
              <Copy size={16} />
            </button>
            {copied && <span className="text-xs text-emerald-600 font-bold">Tersalin!</span>}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Dibuat pada: {new Date(order.createdAt).toLocaleDateString("id-ID", { dateStyle: "long" })}
          </p>
        </div>

        <div className="flex flex-col items-start sm:items-end gap-2">
          <div
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${payBadge.bg}`}
          >
            <PayIcon size={14} />
            <span>{payBadge.label}</span>
          </div>
          <div className={`text-xs font-bold ${prodBadge.color}`}>
            • {prodBadge.label}
          </div>
        </div>
      </div>

      {/* 2. Grid: Financial Summary & Schedule Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Financial Card */}
        <div className="p-6 rounded-3xl bg-[#0f172a] text-white shadow-md space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="font-serif text-lg font-bold">Rincian Finansial</h3>
            <span className="text-xs text-[#b48c28] font-bold">DP 50% Skema</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-slate-300">
              <span>Total Nilai Produk:</span>
              <span className="font-mono font-bold text-white">
                {formatIDR(order.totalProductAmount)}
              </span>
            </div>

            <div className="flex justify-between text-amber-300 font-semibold pt-1">
              <span>DP 50% Diwajibkan:</span>
              <span className="font-mono">{formatIDR(order.dpAmount)}</span>
            </div>

            <div className="flex justify-between text-slate-300">
              <span>Sisa Pelunasan (50%):</span>
              <span className="font-mono">{formatIDR(order.balanceAmount)}</span>
            </div>

            {order.shippingCost > 0 && (
              <div className="flex justify-between text-slate-300">
                <span>Ongkos Kirim:</span>
                <span className="font-mono">{formatIDR(order.shippingCost)}</span>
              </div>
            )}
          </div>

          {/* Action Button: Pay DP or Pelunasan */}
          {(order.paymentStatus === "awaiting_deposit" ||
            order.paymentStatus === "deposit_pending") && (
            <div className="pt-3 border-t border-slate-800">
              {order.transactions?.[0]?.snapRedirectUrl ? (
                <a
                  href={order.transactions[0].snapRedirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#b48c28] hover:bg-[#9a751e] text-white font-bold text-xs transition-all shadow-md text-center"
                >
                  <CreditCard size={15} />
                  <span>Bayar DP Sekarang ({formatIDR(order.dpAmount)})</span>
                </a>
              ) : (
                <div className="text-xs text-amber-300 bg-amber-500/10 p-3 rounded-xl border border-amber-500/20">
                  Pembayaran DP menunggu verifikasi admin atau tautan pembayaran.
                </div>
              )}
            </div>
          )}

          {/* Settle Balance Button if Ready */}
          {order.paymentStatus === "deposit_paid" &&
            order.productionStatus === "ready_for_pickup" && (
              <div className="pt-3 border-t border-slate-800">
                <button
                  onClick={handlePayPelunasan}
                  disabled={isProcessingPelunasan}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-all cursor-pointer shadow-md"
                >
                  {isProcessingPelunasan ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <CreditCard size={15} />
                  )}
                  <span>Bayar Pelunasan 50% ({formatIDR(order.balanceAmount)})</span>
                </button>
              </div>
            )}
        </div>

        {/* Schedule & Handover Details */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4 text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-serif text-lg font-bold text-[#0f172a]">Jadwal & Serah Terima</h3>
            <span className="text-[#b48c28] font-bold">
              {order.deliveryMethod === "pickup" ? "Ambil di Toko" : "Pengiriman"}
            </span>
          </div>

          <div className="space-y-2.5 text-slate-600">
            <div>
              <span className="font-bold text-[#0f172a] block">Pemesan:</span>
              <span>{order.customerName} ({order.customerPhoneMasked})</span>
              {order.customerInstitution && <div>{order.customerInstitution}</div>}
            </div>

            <div>
              <span className="font-bold text-[#0f172a] block">Target Selesai / Acara:</span>
              <span>Target: {order.targetDate} | Acara: {order.eventDate}</span>
            </div>

            <div>
              <span className="font-bold text-[#0f172a] block">Metode Serah Terima:</span>
              {order.deliveryMethod === "pickup" ? (
                <div className="flex items-start gap-1.5 text-slate-700 mt-1">
                  <Store size={15} className="text-[#b48c28] shrink-0 mt-0.5" />
                  <span>Alpen Store: Jln Alpen, Gampong Gunung Kleng, Meureubo, Aceh Barat</span>
                </div>
              ) : (
                <div className="flex items-start gap-1.5 text-slate-700 mt-1">
                  <Truck size={15} className="text-[#b48c28] shrink-0 mt-0.5" />
                  <span>{order.deliveryAddress || "-"}, {order.deliveryCity}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Items Breakdown */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-5">
        <h3 className="font-serif text-lg font-bold text-[#0f172a] pb-3 border-b border-slate-100">
          Spesifikasi Selempang Dipesan ({order.items.length} item)
        </h3>

        <div className="space-y-4">
          {order.items.map((it: any, idx: number) => (
            <div
              key={it.id || idx}
              className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/90 text-xs space-y-2"
            >
              <div className="flex justify-between items-center text-sm font-bold text-[#0f172a]">
                <span>
                  #{idx + 1}: {it.modelType === "biasa" ? "Model Biasa Menyamping" : it.modelType === "syal" ? "Model Leher / Syal" : "Model Leher Timbal Balik"}
                </span>
                <span className="font-mono text-[#b48c28]">{formatIDR(it.subtotal)}</span>
              </div>

              <div className="p-3 rounded-xl bg-white border border-slate-200">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                  Tulisan Bordir:
                </span>
                <p className="font-serif text-sm font-bold text-[#0f172a] whitespace-pre-line mt-0.5">
                  {it.customText}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px] text-slate-600">
                <div>
                  <span className="text-slate-400 block">Bahan:</span>
                  <span className="font-semibold capitalize">{it.material}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Warna Kain:</span>
                  <span className="font-semibold">{it.clothColor}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Pita Pinggiran:</span>
                  <span className="font-semibold">{it.edgeTapeColor}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Benang Bordir:</span>
                  <span className="font-semibold">{it.threadColor}</span>
                </div>
              </div>

              {it.decorations && it.decorations.length > 0 && (
                <div className="text-[11px] text-slate-600">
                  <span className="text-slate-400">Dekorasi: </span>
                  <span className="font-medium">{it.decorations.join(", ")}</span>
                </div>
              )}

              {it.hasLogo && (
                <div className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 size={13} />
                  <span>Disertai Logo Kampus / Organisasi</span>
                  {it.logoUrl && (
                    <a
                      href={it.logoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#b48c28] underline ml-1"
                    >
                      (Lihat Logo)
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 4. Contact Admin WhatsApp Bar */}
      <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-xs font-bold text-[#0f172a]">Butuh Bantuan atau Konfirmasi Khusus?</h4>
          <p className="text-[11px] text-slate-600 mt-0.5">
            Admin Selempang Aceh Barat siap membantu verifikasi pesanan atau pertanyaan desain Anda.
          </p>
        </div>

        <a
          href={`https://wa.me/6282299256343?text=${whatsappInquiry}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#b48c28] hover:bg-[#9a751e] text-white text-xs font-bold transition-all shadow-xs shrink-0 cursor-pointer"
        >
          <MessageCircle size={15} />
          <span>Hubungi Admin WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
