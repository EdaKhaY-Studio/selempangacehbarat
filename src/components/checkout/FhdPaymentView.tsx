"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import {
  CreditCard,
  CheckCircle2,
  Clock,
  AlertCircle,
  Copy,
  ExternalLink,
  ShieldCheck,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Loader2,
  Sparkles,
  RefreshCw,
  Store,
  Truck,
  MessageCircle,
  QrCode,
  Building2,
  Smartphone,
  Check,
} from "lucide-react";

function formatIDR(val: number): string {
  return "Rp" + (val || 0).toLocaleString("id-ID");
}

type CorePaymentMethod =
  | "bca_va"
  | "bni_va"
  | "bri_va"
  | "mandiri_bill"
  | "permata_va"
  | "qris"
  | "gopay";

interface PaymentInstruction {
  paymentMethod: string;
  midtransOrderId?: string;
  grossAmount: number;
  vaNumber?: string;
  bank?: string;
  billKey?: string;
  billerCode?: string;
  qrString?: string;
  qrUrl?: string;
  deepLinkUrl?: string;
  expiryTime?: string;
}

export function FhdPaymentView({ orderId }: { orderId: string }) {
  const [order, setOrder] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Core API State
  const [selectedMethod, setSelectedMethod] = useState<CorePaymentMethod>("bca_va");
  const [isCharging, setIsCharging] = useState(false);
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [activeInstruction, setActiveInstruction] = useState<PaymentInstruction | null>(null);
  const [openGuideIndex, setOpenGuideIndex] = useState<number>(0);
  const [showMethodSelector, setShowMethodSelector] = useState<boolean>(false);

  // Polling ref to prevent concurrent poll calls
  const isPollingRef = useRef(false);

  // 1. Fetch Order Data
  const fetchOrder = useCallback(async (silent = false) => {
    try {
      if (!silent) setLoading(true);
      setError(null);
      const res = await fetch(`/api/orders/${encodeURIComponent(orderId)}`);
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.message || "Pesanan tidak ditemukan di database.");
      } else {
        const ord = data.order;
        setOrder(ord);

        // Cari transaksi aktif terbaru yang sudah memiliki nomor VA atau QR
        const pendingTx = ord.transactions?.find(
          (t: any) =>
            t.transactionStatus === "pending" &&
            (t.vaNumber || t.qrString || t.qrUrl || t.billKey)
        );

        if (pendingTx && !activeInstruction) {
          setActiveInstruction({
            paymentMethod: pendingTx.paymentMethod || "bca_va",
            midtransOrderId: pendingTx.midtransOrderId,
            grossAmount: pendingTx.grossAmount,
            vaNumber: pendingTx.vaNumber,
            bank: pendingTx.bank,
            billKey: pendingTx.billKey,
            billerCode: pendingTx.billerCode,
            qrString: pendingTx.qrString,
            qrUrl: pendingTx.qrUrl,
            deepLinkUrl: pendingTx.deepLinkUrl,
            expiryTime: pendingTx.expiryTime,
          });
        }
      }
    } catch {
      setError("Gagal memuat rincian pesanan dari database.");
    } finally {
      if (!silent) setLoading(false);
    }
  }, [orderId, activeInstruction]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  // 2. Auto-polling saat instruksi aktif dan pesanan belum terverifikasi DP
  useEffect(() => {
    if (!order || order.paymentStatus === "deposit_paid" || order.paymentStatus === "paid") {
      return;
    }

    if (!activeInstruction) return;

    const interval = setInterval(async () => {
      if (isPollingRef.current) return;
      isPollingRef.current = true;
      try {
        const res = await fetch(`/api/orders/${encodeURIComponent(order.id)}/check-payment`, {
          method: "POST",
        });
        const data = await res.json();
        if (data.success && (data.paymentStatus === "deposit_paid" || data.paymentStatus === "paid")) {
          // Status terverifikasi! Refresh pesanan penuh
          await fetchOrder(true);
        }
      } catch {
        // ignore polling failure
      } finally {
        isPollingRef.current = false;
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [order, activeInstruction, fetchOrder]);

  const copyToClipboard = (text: string, fieldName: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const isDepositPaid =
    order?.paymentStatus === "deposit_paid" || order?.paymentStatus === "paid";
  const isFullyPaid = order?.paymentStatus === "paid";

  // 3. Eksekusi Core API Charge
  const handleProceedCharge = async () => {
    if (!order) return;
    setPaymentError(null);
    setIsCharging(true);

    const phase = isDepositPaid ? "pelunasan" : "dp";

    try {
      const res = await fetch(`/api/orders/${encodeURIComponent(order.id)}/charge`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentMethod: selectedMethod,
          paymentPhase: phase,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setPaymentError(
          data.message ||
            "Gagal menghasilkan instruksi pembayaran Core API. Kredensial Midtrans Sandbox belum aktif atau terjadi gangguan."
        );
        return;
      }

      // Berhasil mendapatkan instruksi pembayaran Core API
      setActiveInstruction({
        paymentMethod: data.paymentMethod || selectedMethod,
        midtransOrderId: data.midtransOrderId,
        grossAmount: data.grossAmount,
        vaNumber: data.vaNumber,
        bank: data.bank,
        billKey: data.billKey,
        billerCode: data.billerCode,
        qrString: data.qrString,
        qrUrl: data.qrUrl,
        deepLinkUrl: data.deepLinkUrl,
        expiryTime: data.expiryTime,
      });
      setShowMethodSelector(false);

      // Refresh order secara silent
      await fetchOrder(true);
    } catch {
      setPaymentError("Terjadi gangguan jaringan saat menghubungi server.");
    } finally {
      setIsCharging(false);
    }
  };

  // 4. Tombol Manual "Cek Status Pembayaran"
  const handleManualCheckStatus = async () => {
    if (!order) return;
    setIsCheckingStatus(true);
    try {
      const res = await fetch(`/api/orders/${encodeURIComponent(order.id)}/check-payment`, {
        method: "POST",
      });
      const data = await res.json();
      if (data.success) {
        await fetchOrder(true);
      }
    } catch {
      // ignore
    } finally {
      setIsCheckingStatus(false);
    }
  };

  if (loading) {
    return (
      <div className="py-24 flex flex-col items-center justify-center text-center">
        <Loader2 size={36} className="animate-spin text-[#b48c28] mb-4" />
        <p className="text-sm text-slate-600 font-medium">
          Memuat rincian pesanan dari database resmi FHD...
        </p>
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
        <p className="text-sm text-slate-600 leading-relaxed">
          {error || "Nomor pesanan yang dituju tidak valid atau belum tersimpan di database."}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <Link
            href="/checkout/custom-selempang"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0f172a] text-white text-xs font-bold"
          >
            Kembali ke Formulir Checkout
          </Link>
          <button
            onClick={() => fetchOrder()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 hover:border-slate-400 text-xs font-bold text-slate-700 cursor-pointer"
          >
            <RefreshCw size={13} />
            Coba Muat Ulang
          </button>
        </div>
      </div>
    );
  }

  // Teks nama metode yang dipilih
  const getMethodLabel = (m: string) => {
    switch (m) {
      case "bca_va":
        return "BCA Virtual Account";
      case "bni_va":
        return "BNI Virtual Account";
      case "bri_va":
        return "BRI Virtual Account";
      case "cimb_va":
        return "CIMB Niaga Virtual Account";
      case "permata_va":
        return "Permata Bank Virtual Account";
      case "mandiri_bill":
        return "Mandiri Bill Payment (E-Channel)";
      case "qris":
        return "QRIS (Semua Bank & E-Wallet)";
      case "gopay":
        return "GoPay (QR & Deep Link)";
      default:
        return "Virtual Account";
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header Bar */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-[#b48c28] border border-amber-300/60 font-mono">
              Database MySQL Resmi FHD
            </span>
            <span className="text-[11px] text-slate-500 font-medium">
              {new Date(order.createdAt).toLocaleDateString("id-ID", { dateStyle: "long" })}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#0f172a]">
              {order.orderNumber}
            </h1>
            <button
              type="button"
              onClick={() => copyToClipboard(order.orderNumber, "orderNumber")}
              className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-[#b48c28] hover:border-[#b48c28] transition-colors cursor-pointer"
              title="Salin Nomor Pesanan"
            >
              {copiedField === "orderNumber" ? (
                <Check size={16} className="text-emerald-600" />
              ) : (
                <Copy size={16} />
              )}
            </button>
            {copiedField === "orderNumber" && (
              <span className="text-xs text-emerald-600 font-bold">Tersalin!</span>
            )}
          </div>
          <p className="text-xs text-slate-500">
            Pemesan: <strong className="text-slate-800">{order.customerName}</strong> ({order.customerPhoneMasked})
            {order.customerInstitution && <span> • {order.customerInstitution}</span>}
          </p>
        </div>

        <div className="sm:text-right shrink-0">
          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider mb-1">
            Status Pembayaran
          </span>
          <div
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${
              isFullyPaid
                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                : isDepositPaid
                ? "bg-blue-50 text-blue-700 border-blue-200"
                : "bg-amber-50 text-amber-800 border-amber-200"
            }`}
          >
            {isFullyPaid ? (
              <>
                <CheckCircle2 size={13} />
                <span>Lunas Penuh (100%)</span>
              </>
            ) : isDepositPaid ? (
              <>
                <CheckCircle2 size={13} />
                <span>DP 50% Terverifikasi (Produksi Aktif)</span>
              </>
            ) : (
              <>
                <Clock size={13} />
                <span>Menunggu Pembayaran DP 50%</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left: Financial & Core API Custom UI (7 cols) */}
        <div className="md:col-span-7 p-6 sm:p-7 rounded-3xl bg-[#0f172a] text-white shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <span className="text-[10px] text-[#b48c28] uppercase font-bold tracking-wider font-mono block">
                Midtrans Core API (Native FHD Interface)
              </span>
              <h3 className="font-serif text-xl font-bold">Tagihan &amp; Pembayaran DP</h3>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-[#b48c28]/20 text-[#e6ca65] border border-[#b48c28]/40 font-bold">
              {isDepositPaid ? "Tahap Pelunasan" : "Tahap 1: DP 50%"}
            </span>
          </div>

          {/* Total Breakdown */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between items-center text-slate-300">
              <span>Total Nilai Pesanan ({order.items.length} item):</span>
              <span className="font-mono font-bold text-base text-white">
                {formatIDR(order.totalProductAmount)}
              </span>
            </div>
            {order.shippingCost > 0 && (
              <div className="flex justify-between items-center text-slate-400">
                <span>Ongkos Kirim:</span>
                <span className="font-mono font-medium">{formatIDR(order.shippingCost)}</span>
              </div>
            )}
          </div>

          {/* Stepper DP 50% vs Sisa 50% */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* DP 50% Card */}
            <div
              className={`p-4 rounded-2xl border space-y-1.5 ${
                isDepositPaid
                  ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-200"
                  : "bg-gradient-to-br from-amber-500/20 to-amber-600/10 border-amber-400/40 text-amber-200"
              }`}
            >
              <div className="flex items-center justify-between text-amber-300">
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  Tahap 1: DP 50%
                </span>
                {isDepositPaid ? (
                  <CheckCircle2 size={14} className="text-emerald-400" />
                ) : (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-200">
                    Wajib Sekarang
                  </span>
                )}
              </div>
              <div className="text-2xl font-mono font-extrabold text-[#D4AF37]">
                {formatIDR(order.dpAmount)}
              </div>
              <p className="text-[11px] opacity-90 leading-tight">
                {isDepositPaid
                  ? "✓ DP 50% telah diterima & diverifikasi."
                  : "Wajib dibayar untuk memulai proses produksi bordir komputer."}
              </p>
            </div>

            {/* Pelunasan 50% Card */}
            <div
              className={`p-4 rounded-2xl border space-y-1.5 ${
                isFullyPaid
                  ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-200"
                  : "bg-slate-900 border-slate-800 text-slate-300"
              }`}
            >
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  Tahap 2: Sisa (50%)
                </span>
                {isFullyPaid ? (
                  <CheckCircle2 size={14} className="text-emerald-400" />
                ) : (
                  <Clock size={14} className="text-slate-500" />
                )}
              </div>
              <div className="text-2xl font-mono font-bold text-slate-200">
                {formatIDR(order.balanceAmount)}
              </div>
              <p className="text-[11px] text-slate-400 leading-tight">
                {isFullyPaid
                  ? "✓ Lunas penuh."
                  : "Dibayar saat bordir selesai dan selempang siap diserahkan."}
              </p>
            </div>
          </div>

          {/* Pesan Kesalahan jika ada */}
          {paymentError && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2">
              <AlertCircle size={15} className="text-rose-400 mt-0.5 shrink-0" />
              <span>{paymentError}</span>
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────────── */}
          {/* TAMPILAN INSTRUKSI PEMBAYARAN AKTIF (CORE API RESULT)               */}
          {/* ─────────────────────────────────────────────────────────────────── */}
          {activeInstruction && !showMethodSelector && !isDepositPaid ? (
            <div className="space-y-4 pt-2">
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-amber-400/40 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="p-2 rounded-xl bg-[#b48c28]/20 text-[#D4AF37]">
                      {activeInstruction.vaNumber || activeInstruction.billKey ? (
                        <Building2 size={18} />
                      ) : (
                        <QrCode size={18} />
                      )}
                    </span>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                        Metode Pembayaran Dipilih
                      </span>
                      <h4 className="font-bold text-sm text-white">
                        {getMethodLabel(activeInstruction.paymentMethod)}
                      </h4>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowMethodSelector(true)}
                    className="text-[11px] font-bold text-amber-300 hover:text-amber-200 underline cursor-pointer"
                  >
                    Ganti Metode
                  </button>
                </div>

                {/* Case 1: Virtual Account (BCA, BNI, BRI, Permata) */}
                {activeInstruction.vaNumber && (
                  <div className="space-y-2">
                    <span className="text-xs text-slate-400 block">Nomor Virtual Account:</span>
                    <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3">
                      <span className="font-mono text-xl sm:text-2xl font-bold tracking-widest text-[#D4AF37] select-all">
                        {activeInstruction.vaNumber}
                      </span>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(activeInstruction.vaNumber || "", "vaNumber")}
                        className="px-3 py-1.5 rounded-lg bg-[#b48c28] hover:bg-[#9a751e] text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        {copiedField === "vaNumber" ? (
                          <>
                            <Check size={14} />
                            <span>Tersalin</span>
                          </>
                        ) : (
                          <>
                            <Copy size={14} />
                            <span>Salin VA</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {/* Case 2: Mandiri Bill Payment (Biller Code + Bill Key) */}
                {activeInstruction.billerCode && activeInstruction.billKey && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                      <span className="text-[10px] uppercase text-slate-400 font-bold block">
                        Kode Perusahaan (Biller Code)
                      </span>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-base font-bold text-white">
                          {activeInstruction.billerCode}
                        </span>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(activeInstruction.billerCode || "", "billerCode")}
                          className="p-1 text-slate-400 hover:text-white"
                          title="Salin"
                        >
                          <Copy size={14} />
                        </button>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                      <span className="text-[10px] uppercase text-slate-400 font-bold block">
                        Nomor Tagihan (Bill Key)
                      </span>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-base font-bold text-[#D4AF37]">
                          {activeInstruction.billKey}
                        </span>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(activeInstruction.billKey || "", "billKey")}
                          className="p-1 text-slate-400 hover:text-white"
                          title="Salin"
                        >
                          <Copy size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Case 3: QRIS (QR Image & String) */}
                {(activeInstruction.qrUrl || activeInstruction.qrString) && (
                  <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-white text-slate-900 space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                      Pindai Kode QRIS untuk Membayar DP 50%
                    </span>
                    {activeInstruction.qrUrl ? (
                      <div className="p-2 border-2 border-slate-900 rounded-2xl bg-white shadow-sm">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={activeInstruction.qrUrl}
                          alt="QRIS Midtrans Code"
                          className="w-56 h-56 object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-56 h-56 border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-center p-4 text-center">
                        <span className="text-xs text-slate-500 font-mono break-all">
                          {activeInstruction.qrString?.slice(0, 80)}...
                        </span>
                      </div>
                    )}
                    <span className="text-[11px] text-slate-500 text-center max-w-xs">
                      Bisa dipindai menggunakan BCA Mobile, Livin Mandiri, BRImo, BNI Mobile, GoPay, OVO, Dana, ShopeePay, atau aplikasi QRIS lainnya.
                    </span>
                  </div>
                )}

                {/* Case 4: GoPay Deeplink */}
                {activeInstruction.deepLinkUrl && (
                  <a
                    href={activeInstruction.deepLinkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-4 rounded-xl bg-[#00AED6] hover:bg-[#0092B3] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                  >
                    <Smartphone size={16} />
                    <span>Buka Aplikasi GoPay untuk Menyelesaikan Pembayaran</span>
                    <ExternalLink size={14} />
                  </a>
                )}

                {/* Expiry & Nominal */}
                <div className="flex flex-wrap items-center justify-between text-xs pt-1 text-slate-400 border-t border-slate-800 gap-2">
                  <div className="flex items-center gap-1.5">
                    <Clock size={14} className="text-amber-400" />
                    <span>
                      {activeInstruction.expiryTime
                        ? `Batas Bayar: ${activeInstruction.expiryTime}`
                        : "Selesaikan pembayaran dalam 24 jam"}
                    </span>
                  </div>
                  <div>
                    Nominal Transfer:{" "}
                    <strong className="text-white font-mono font-bold">
                      {formatIDR(activeInstruction.grossAmount)}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Action Buttons for Active Instruction */}
              <div className="space-y-2.5">
                <button
                  type="button"
                  onClick={handleManualCheckStatus}
                  disabled={isCheckingStatus}
                  className="w-full py-3.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs tracking-wide flex items-center justify-center gap-2 border border-slate-700 cursor-pointer transition-colors"
                >
                  {isCheckingStatus ? (
                    <>
                      <Loader2 size={16} className="animate-spin text-amber-400" />
                      <span>Memverifikasi status dengan server...</span>
                    </>
                  ) : (
                    <>
                      <RefreshCw size={15} className="text-amber-400" />
                      <span>Sudah Bayar? Cek Status Pembayaran Sekarang</span>
                    </>
                  )}
                </button>
                <p className="text-[10px] text-slate-400 text-center">
                  Sistem otomatis memperbarui status pembayaran setiap beberapa detik setelah Anda mentransfer.
                </p>
              </div>
            </div>
          ) : null}

          {/* ─────────────────────────────────────────────────────────────────── */}
          {/* PEMILIH METODE PEMBAYARAN (JIKA BELUM MEMILIH ATAU GANTI METODE)    */}
          {/* ─────────────────────────────────────────────────────────────────── */}
          {(!activeInstruction || showMethodSelector) && !isDepositPaid ? (
            <div className="space-y-4 pt-2">
              <span className="text-xs font-bold text-slate-300 block uppercase tracking-wider">
                Pilih Metode Pembayaran DP 50% ({formatIDR(order.dpAmount)}):
              </span>

              {/* Group 1: Virtual Account */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1.5">
                  <Building2 size={13} className="text-[#b48c28]" />
                  <span>Transfer Bank (Virtual Account Otomatis)</span>
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {[
                    { id: "bca_va", name: "BCA Virtual Account", desc: "BCA Mobile & KlikBCA" },
                    { id: "bni_va", name: "BNI Virtual Account", desc: "BNI Mobile & ATM" },
                    { id: "bri_va", name: "BRI Virtual Account", desc: "BRImo & ATM" },
                    { id: "mandiri_bill", name: "Mandiri Bill Payment", desc: "Livin by Mandiri" },
                    { id: "permata_va", name: "Permata VA", desc: "PermataMobile & ATM" },
                    { id: "cimb_va", name: "CIMB Niaga VA", desc: "OCTO Mobile & ATM" },
                  ].map((bank) => (
                    <button
                      key={bank.id}
                      type="button"
                      onClick={() => setSelectedMethod(bank.id as CorePaymentMethod)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                        selectedMethod === bank.id
                          ? "bg-[#b48c28]/20 border-amber-400 text-white shadow-xs"
                          : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700"
                      }`}
                    >
                      <div>
                        <div className="font-bold text-xs">{bank.name}</div>
                        <div className="text-[10px] text-slate-400">{bank.desc}</div>
                      </div>
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                          selectedMethod === bank.id
                            ? "border-[#b48c28] bg-[#b48c28]"
                            : "border-slate-600"
                        }`}
                      >
                        {selectedMethod === bank.id && (
                          <div className="w-1.5 h-1.5 rounded-full bg-white" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Group 2: QRIS & E-Wallet */}
              <div className="space-y-2 pt-1">
                <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1.5">
                  <QrCode size={13} className="text-[#b48c28]" />
                  <span>QRIS &amp; E-Wallet</span>
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {[
                    { id: "qris", name: "QRIS", desc: "Scan semua bank & e-wallet" },
                    { id: "gopay", name: "GoPay", desc: "Buka app GoPay / Scan QR" },
                  ].map((ew) => (
                    <button
                      key={ew.id}
                      type="button"
                      onClick={() => setSelectedMethod(ew.id as CorePaymentMethod)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                        selectedMethod === ew.id
                          ? "bg-[#b48c28]/20 border-amber-400 text-white shadow-xs"
                          : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700"
                      }`}
                    >
                      <div>
                        <div className="font-bold text-xs">{ew.name}</div>
                        <div className="text-[10px] text-slate-400">{ew.desc}</div>
                      </div>
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                          selectedMethod === ew.id
                            ? "border-[#b48c28] bg-[#b48c28]"
                            : "border-slate-600"
                        }`}
                      >
                        {selectedMethod === ew.id && (
                          <div className="w-1.5 h-1.5 rounded-full bg-white" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Button Submit Charge */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleProceedCharge}
                  disabled={isCharging}
                  className={`w-full py-4 px-6 rounded-xl font-bold text-sm tracking-wide transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer ${
                    isCharging
                      ? "bg-slate-700 text-slate-400 cursor-not-allowed"
                      : "bg-[#b48c28] hover:bg-[#9a751e] text-white active:scale-98"
                  }`}
                >
                  {isCharging ? (
                    <>
                      <Loader2 size={18} className="animate-spin text-amber-300" />
                      <span>Menyiapkan Kode Pembayaran Core API...</span>
                    </>
                  ) : (
                    <>
                      <CreditCard size={18} />
                      <span>
                        Dapatkan Nomor Pembayaran DP ({formatIDR(order.dpAmount)})
                      </span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : null}

          {/* Status DP Sudah Lunas */}
          {isDepositPaid && (
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2.5">
              <CheckCircle2 size={20} className="text-emerald-400 shrink-0" />
              <span>
                Pembayaran DP 50% berhasil terverifikasi. Pesanan sedang dalam antrean pengerjaan bordir komputer.
              </span>
            </div>
          )}

          {/* Footer Card Navigation */}
          <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800">
            <Link
              href={`/pesanan/${encodeURIComponent(order.orderNumber)}`}
              className="inline-flex items-center gap-1.5 text-slate-300 hover:text-[#b48c28] transition-colors"
            >
              <span>Buka Halaman Pelacakan Pesanan</span>
              <ChevronRight size={14} />
            </Link>

            <div className="flex items-center gap-1 text-[11px] text-slate-400 font-mono">
              <ShieldCheck size={13} className="text-[#b48c28]" />
              <span>Midtrans Core API Sandbox</span>
            </div>
          </div>
        </div>

        {/* Right Column: Order Detail & Assistance (5 cols) */}
        <div className="md:col-span-5 space-y-6">
          {/* Order Item Specifications Card */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-serif text-base font-bold text-[#0f172a]">
                Rincian Pesanan
              </h3>
              <span className="text-[11px] px-2 py-0.5 rounded-md bg-amber-50 text-[#b48c28] font-bold border border-amber-200 font-mono">
                {order.items.length} Item
              </span>
            </div>

            <div className="space-y-3">
              {order.items.map((it: any, idx: number) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
                  <div className="flex justify-between items-start">
                    <strong className="text-slate-900 font-serif text-sm">
                      {it.modelName || it.modelType}
                    </strong>
                    <span className="font-mono font-bold text-slate-800">
                      {formatIDR(it.subtotal)}
                    </span>
                  </div>

                  <div className="text-[11px] text-slate-600 space-y-1">
                    <div>
                      <span className="text-slate-400">Tulisan: </span>
                      <strong className="text-slate-800 font-medium whitespace-pre-line">
                        {it.customText}
                      </strong>
                    </div>
                    <div>
                      <span className="text-slate-400">Bahan &amp; Warna: </span>
                      <span>{it.material} • Kain: {it.clothColor} • Pita: {it.edgeTapeColor}</span>
                    </div>
                    {it.selectedOptions && it.selectedOptions.length > 0 && (
                      <div>
                        <span className="text-slate-400">Opsi Tambahan: </span>
                        <span className="text-amber-800 font-medium">
                          {it.selectedOptions.map((o: any) => o.name).join(", ")}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Schedule Info */}
            <div className="pt-2 border-t border-slate-100 space-y-2 text-slate-600 text-[11px]">
              <div>
                <span className="font-bold text-[#0f172a] block">Target Selesai:</span>
                <span>{order.targetDate} (Acara: {order.eventDate})</span>
              </div>
              <div>
                <span className="font-bold text-[#0f172a] block">Metode Pengambilan:</span>
                {order.deliveryMethod === "pickup" ? (
                  <div className="flex items-start gap-1.5 text-slate-700 mt-0.5">
                    <Store size={14} className="text-[#b48c28] shrink-0 mt-0.5" />
                    <span>Alpen Store: Jln Alpen, Meureubo, Aceh Barat</span>
                  </div>
                ) : (
                  <div className="flex items-start gap-1.5 text-slate-700 mt-0.5">
                    <Truck size={14} className="text-[#b48c28] shrink-0 mt-0.5" />
                    <span>{order.deliveryAddress || "-"}, {order.deliveryCity}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Assistance & WhatsApp Fallback */}
          <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200/80 text-xs space-y-2.5">
            <div className="flex items-center gap-2 font-bold text-[#0f172a]">
              <MessageCircle size={15} className="text-[#b48c28]" />
              <span>Bantuan Admin &amp; Konfirmasi Manual</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Jika mengalami kendala teknis atau ingin melakukan transfer manual langsung ke rekening bank usaha, silakan hubungi admin WhatsApp resmi Selempang Aceh Barat.
            </p>
            <a
              href={`https://wa.me/6282299256343?text=${encodeURIComponent(
                `Halo Admin Selempang Aceh Barat, saya ingin konfirmasi pembayaran untuk nomor pesanan: ${order.orderNumber} (DP ${formatIDR(
                  order.dpAmount
                )})`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#b48c28] font-bold hover:underline text-[11px] pt-1"
            >
              <span>Hubungi Admin WhatsApp (+62 822-9925-6343)</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
