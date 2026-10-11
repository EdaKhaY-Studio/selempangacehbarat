"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Calendar,
  User,
  Phone,
  Building,
  CheckCircle2,
  ArrowRight,
  ChevronLeft,
  Copy,
  Check,
  QrCode,
  Landmark,
  Wallet,
  Timer,
  PartyPopper,
  MessageCircle,
  PackageCheck,
  GraduationCap,
  Clock,
  ShieldCheck,
} from "lucide-react";
import type { Product, SuitSize } from "@/lib/types";
import { formatRupiah } from "@/lib/utils";

/* ─── Types ──────────────────────────────────────────────────────────── */
interface BookingModalProps {
  product: Product;
  onClose: () => void;
}
type Step = "details" | "schedule" | "confirm" | "payment";

const STEP_ORDER: Step[] = ["details", "schedule", "confirm", "payment"];
const STEP_LABELS: Record<Step, string> = {
  details: "Data Diri",
  schedule: "Jadwal Sewa",
  confirm: "Konfirmasi",
  payment: "Pembayaran",
};

/* ─── Field component ────────────────────────────────────────────────── */
function Field({
  icon: Icon,
  placeholder,
  value,
  onChange,
  type = "text",
}: {
  icon: React.ElementType;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div className="relative">
      <Icon
        size={14}
        strokeWidth={2}
        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#475569] pointer-events-none"
      />
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-4 py-3 rounded-lg bg-white border border-[#cbd5e1]/60 focus:border-[#0f172a] focus:outline-none text-[#0f172a] text-sm placeholder:text-[#475569]/50 transition-colors shadow-2xs font-light"
      />
    </div>
  );
}

/* ─── Progress bar ───────────────────────────────────────────────────── */
function ProgressBar({ step }: { step: Step }) {
  const idx = STEP_ORDER.indexOf(step);
  return (
    <div className="flex gap-2 px-6 py-3 border-b border-[#cbd5e1]/50 bg-[#f8fafc]">
      {STEP_ORDER.map((s, i) => (
        <div key={s} className="flex-1 flex flex-col gap-1">
          <div
            className={`h-1 rounded-full transition-all duration-300 ${
              i <= idx ? "bg-[#b48c28]" : "bg-[#cbd5e1]"
            }`}
          />
          <p
            className={`text-[10px] uppercase tracking-wider transition-colors ${
              i <= idx ? "text-[#b48c28] font-bold" : "text-[#475569]"
            }`}
          >
            {STEP_LABELS[s]}
          </p>
        </div>
      ))}
    </div>
  );
}

/* ─── MAIN MODAL ─────────────────────────────────────────────────────── */
export function BookingModal({ product, onClose }: BookingModalProps) {
  const [step, setStep] = useState<Step>("details");
  const [size, setSize] = useState<SuitSize | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [institution, setInstitution] = useState("");
  const [eventDate, setEventDate] = useState("");

  const idx = STEP_ORDER.indexOf(step);
  const next = () => idx < STEP_ORDER.length - 1 && setStep(STEP_ORDER[idx + 1]);
  const back = () => idx > 0 && setStep(STEP_ORDER[idx - 1]);

  const fmtDate = (iso: string) =>
    new Date(iso).toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  const pickupDate = eventDate
    ? fmtDate(new Date(new Date(eventDate).getTime() - 86400000).toISOString().split("T")[0])
    : "—";
  const returnDate = eventDate
    ? fmtDate(new Date(new Date(eventDate).getTime() + 86400000).toISOString().split("T")[0])
    : "—";
  const eventDateFmt = eventDate ? fmtDate(eventDate) : "—";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs"
        onClick={onClose}
      />

      {/* Sheet / Modal Box */}
      <motion.div
        initial={{ y: "100%", opacity: 0.8 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ type: "spring", damping: 28, stiffness: 280 }}
        className="relative z-10 w-full sm:max-w-lg rounded-t-2xl sm:rounded-2xl bg-white border border-[#cbd5e1]/80 overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
      >
        {/* Top Gold Accent Line */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#b48c28] to-transparent opacity-80" />

        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 pb-4 border-b border-[#cbd5e1]/60">
          <div>
            <p className="text-[10px] font-semibold text-[#b48c28] uppercase tracking-[0.16em]">
              Reservasi Busana Formal
            </p>
            <h3 className="font-serif text-lg font-medium text-[#0f172a]">
              {product.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-[#f8fafc] border border-[#cbd5e1]/60 text-[#475569] hover:text-[#0f172a] transition-colors"
            aria-label="Tutup modal"
          >
            <X size={16} />
          </button>
        </div>

        {/* Progress bar */}
        <ProgressBar step={step} />

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          <AnimatePresence mode="wait">
            {/* ── STEP 1: Details ── */}
            {step === "details" && (
              <motion.div
                key="details"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#475569] mb-1 font-medium">
                    Nama Lengkap Penyewa *
                  </label>
                  <Field
                    icon={User}
                    placeholder="Contoh: Muhammad Farhan"
                    value={name}
                    onChange={setName}
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#475569] mb-1 font-medium">
                    Nomor WhatsApp Aktif *
                  </label>
                  <Field
                    icon={Phone}
                    placeholder="Contoh: 0852-XXXX-XXXX"
                    value={phone}
                    onChange={setPhone}
                    type="tel"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#475569] mb-1 font-medium">
                    Kampus / Instansi (Opsional)
                  </label>
                  <Field
                    icon={Building}
                    placeholder="Contoh: Universitas Teuku Umar (UTU)"
                    value={institution}
                    onChange={setInstitution}
                  />
                </div>

                {/* Size selector if product has sizes */}
                {product.availableSizes && (
                  <div className="pt-2">
                    <label className="block text-[11px] uppercase tracking-wider text-[#475569] mb-2 font-medium">
                      Pilih Ukuran Jas: {size ? <strong className="text-[#b48c28] font-bold">{size}</strong> : "(Wajib pilih)"}
                    </label>
                    <div className="grid grid-cols-5 gap-2">
                      {product.availableSizes.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setSize(s)}
                          className={`py-2.5 rounded-lg font-mono font-bold text-xs border transition-all ${
                            size === s
                              ? "border-[#0f172a] bg-[#0f172a] text-white"
                              : "border-[#cbd5e1]/60 bg-white text-[#475569] hover:text-[#0f172a] hover:border-[#b48c28]/40 shadow-2xs"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-4">
                  <button
                    onClick={next}
                    disabled={!name || !phone || (Boolean(product.availableSizes) && !size)}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-lg bg-[#0f172a] hover:bg-[#1e293b] text-white font-semibold text-xs tracking-wider uppercase transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98] shadow-xs"
                  >
                    <span>Lanjut ke Pilih Tanggal</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── STEP 2: Schedule (Anti Double-Booking Calendar) ── */}
            {step === "schedule" && (
              <motion.div
                key="schedule"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.2 }}
                className="space-y-5"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-[11px] uppercase tracking-wider text-[#475569] font-medium">
                      Pilih Tanggal Acara (Hari-H) *
                    </label>
                    <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      AVAILABLE (Stok Tersedia)
                    </span>
                  </div>

                  <div className="relative">
                    <Calendar
                      size={14}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#475569] pointer-events-none"
                    />
                    <input
                      type="date"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full pl-10 pr-4 py-3 rounded-lg bg-white border border-[#cbd5e1]/60 focus:border-[#0f172a] focus:outline-none text-[#0f172a] text-sm font-mono transition-colors shadow-2xs font-light"
                    />
                  </div>
                </div>

                {/* Real-time 3-Day Breakdown */}
                <AnimatePresence>
                  {eventDate && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-xl bg-[#f8fafc] border border-[#cbd5e1]/60 space-y-2.5"
                    >
                      <p className="text-[10px] text-[#b48c28] font-semibold uppercase tracking-[0.14em] mb-2">
                        Jadwal Sewa 3 Hari Penuh
                      </p>
                      {[
                        { Icon: PackageCheck, label: "H-1 · Pengambilan Jas", value: pickupDate },
                        { Icon: GraduationCap, label: "Hari-H · Acara Wisuda", value: eventDateFmt },
                        { Icon: Clock, label: "H+1 · Pengembalian (max 20:00)", value: returnDate },
                      ].map((r) => {
                        const Icon = r.Icon;
                        return (
                          <div
                            key={r.label}
                            className="flex items-center justify-between py-1.5 border-b border-[#cbd5e1]/40 last:border-0 text-xs gap-3"
                          >
                            <span className="text-[#475569] flex items-center gap-1.5 font-light">
                              <Icon size={13} className="text-[#b48c28]" />
                              {r.label}
                            </span>
                            <span className="text-[#0f172a] font-medium text-right">{r.value}</span>
                          </div>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={back}
                    className="flex items-center gap-1.5 px-4 py-3 rounded-lg border border-[#cbd5e1]/60 text-[#475569] hover:text-[#0f172a] bg-white text-xs font-medium uppercase tracking-wider transition-all shadow-2xs"
                  >
                    <ChevronLeft size={14} />
                    <span>Kembali</span>
                  </button>
                  <button
                    onClick={next}
                    disabled={!eventDate}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-[#0f172a] hover:bg-[#1e293b] text-white font-semibold text-xs tracking-wider uppercase transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98] shadow-xs"
                  >
                    <span>Lanjut ke Ringkasan</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── STEP 3: Confirm ── */}
            {step === "confirm" && (
              <motion.div
                key="confirm"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.2 }}
                className="space-y-5"
              >
                <div className="p-5 rounded-xl bg-[#f8fafc] border border-[#cbd5e1]/60 space-y-3">
                  {[
                    ["Penyewa", name],
                    ["WhatsApp", phone],
                    ["Instansi", institution || "Pribadi / Umum"],
                    ["Produk", product.name],
                    ["Ukuran Jas", size ?? "Standar / All Size"],
                    ["Tanggal Acara", eventDateFmt],
                    ["Durasi Sewa", "3 Hari (H-1 s/d H+1)"],
                  ].map(([lbl, val]) => (
                    <div key={lbl} className="flex justify-between text-xs gap-4">
                      <span className="text-[#475569] font-light">{lbl}</span>
                      <span className="text-[#0f172a] font-medium text-right">{val}</span>
                    </div>
                  ))}

                  <div className="flex justify-between pt-3 border-t border-[#cbd5e1]/60">
                    <span className="text-xs uppercase tracking-wider text-[#0f172a] font-semibold">
                      Total Biaya
                    </span>
                    <span className="font-mono font-bold text-lg text-[#b48c28]">
                      {formatRupiah(product.price)}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3.5 rounded-lg bg-[#fef3c7]/60 border border-[#fde68a] text-xs text-[#475569]">
                  <ShieldCheck size={16} className="text-[#b48c28] shrink-0 mt-0.5" />
                  <span>
                    Jaminan deposit: Mohon membawa <strong className="text-[#0f172a]">KTM / KTP Asli</strong> saat pengambilan jas di workshop kami.
                  </span>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={back}
                    className="flex items-center gap-1.5 px-4 py-3 rounded-lg border border-[#cbd5e1]/60 text-[#475569] hover:text-[#0f172a] bg-white text-xs font-medium uppercase tracking-wider transition-all shadow-2xs"
                  >
                    <ChevronLeft size={14} />
                    <span>Kembali</span>
                  </button>
                  <button
                    onClick={next}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-[#0f172a] hover:bg-[#1e293b] text-white font-semibold text-xs tracking-wider uppercase transition-all active:scale-[0.98] shadow-xs"
                  >
                    <span>Lanjut ke Pembayaran</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── STEP 4: Payment (Custom Light Midtrans UI) ── */}
            {step === "payment" && (
              <motion.div
                key="payment"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.2 }}
              >
                <PaymentStep
                  product={product}
                  name={name}
                  phone={phone}
                  eventDate={eventDateFmt}
                  onBack={back}
                  onClose={onClose}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Custom Dark Midtrans Checkout Engine (FR-4)
   ──────────────────────────────────────────────────────────────────────── */
const PAYMENT_METHODS = [
  { id: "qris", label: "QRIS", Icon: QrCode },
  { id: "va-bca", label: "VA BCA", Icon: Landmark },
  { id: "va-bsi", label: "VA BSI Aceh", Icon: Landmark },
  { id: "va-mandiri", label: "VA Mandiri", Icon: Landmark },
  { id: "gopay", label: "GoPay / E-Wallet", Icon: Wallet },
];

function PaymentStep({
  product,
  name,
  phone,
  eventDate,
  onBack,
  onClose,
}: {
  product: Product;
  name: string;
  phone: string;
  eventDate: string;
  onBack: () => void;
  onClose: () => void;
}) {
  const [method, setMethod] = useState("qris");
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15:00 minutes
  const [isPaid, setIsPaid] = useState(false);
  const [isSandbox, setIsSandbox] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const mins = Math.floor(timeLeft / 60).toString().padStart(2, "0");
  const secs = (timeLeft % 60).toString().padStart(2, "0");
  const VA_NUMBER = "988 2381 0492 8812";

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(VA_NUMBER.replace(/\s/g, ""));
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }, [VA_NUMBER]);

  const simulateSuccess = async () => {
    try {
      const confetti = (await import("canvas-confetti")).default;
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#F97316", "#FB923C", "#FBBF24", "#FEFBE8"],
      });
    } catch {
      // fallback
    }
    setIsPaid(true);
  };

  /* ── Success state (LUNAS) ── */
  if (isPaid) {
    const waText = encodeURIComponent(
      `Halo Selempang Aceh Barat, saya sudah menyelesaikan pembayaran sewa:\n\n` +
        `• Produk: ${product.name}\n` +
        `• Nama Penyewa: ${name}\n` +
        `• Tanggal Acara: ${eventDate}\n` +
        `• Status: LUNAS (${formatRupiah(product.price)})\n\n` +
        `Mohon verifikasi invoice digital saya. Terima kasih!`
    );

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-6"
      >
        <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto mb-4 text-emerald-600">
          <CheckCircle2 size={32} />
        </div>

        <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-2">
          Status: LUNAS &amp; TERKONFIRMASI
        </span>

        <h3 className="font-serif text-2xl font-medium text-[#0f172a] mb-2">
          Pembayaran Sukses
        </h3>
        <p className="text-xs text-[#475569] max-w-xs mx-auto font-light leading-relaxed mb-6">
          Pesanan rental Anda telah tercatat otomatis ke sistem inventaris. Bukti sewa digital dikirimkan ke nomor WhatsApp Anda.
        </p>

        <div className="space-y-3 max-w-xs mx-auto">
          <a
            href={`https://wa.me/6282299256343?text=${waText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95"
          >
            <MessageCircle size={15} />
            <span>Kirim Bukti ke WhatsApp Toko</span>
          </a>

          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-lg border border-[#cbd5e1]/60 bg-white text-[#475569] hover:text-[#0f172a] text-xs uppercase tracking-wider font-medium shadow-2xs"
          >
            Tutup Jendela
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-5">
      {/* 15:00 Countdown Timer Bar */}
      <div className="flex items-center justify-between px-4 py-3 rounded-lg bg-[#f8fafc] border border-[#cbd5e1]/60">
        <div className="flex items-center gap-2 text-xs text-[#475569]">
          <Timer size={14} className="text-[#b48c28]" />
          <span>Sisa Waktu Pembayaran</span>
        </div>
        <span
          className={`font-mono font-bold text-sm tabular-nums ${
            timeLeft < 180 ? "text-rose-500" : "text-[#b48c28]"
          }`}
        >
          {mins}:{secs}
        </span>
      </div>

      {/* Amount Display */}
      <div className="text-center py-1">
        <p className="text-[10px] text-[#475569] uppercase tracking-widest font-medium mb-1">
          Total Yang Harus Dibayar
        </p>
        <p className="font-mono text-3xl font-bold text-[#b48c28]">
          {formatRupiah(product.price)}
        </p>
      </div>

      {/* Payment Method Selector */}
      <div>
        <p className="text-[10px] uppercase tracking-wider text-[#475569] font-medium mb-2.5">
          Pilih Jalur Pembayaran
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {PAYMENT_METHODS.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setMethod(id)}
              className={`flex items-center justify-center gap-2 p-2.5 rounded-lg text-xs font-medium border transition-all ${
                method === id
                  ? "border-[#0f172a] bg-[#0f172a] text-white font-semibold"
                  : "border-[#cbd5e1]/60 bg-white text-[#475569] hover:text-[#0f172a] shadow-2xs"
              }`}
            >
              <Icon size={13} className={method === id ? "text-[#b48c28]" : "text-[#475569]"} />
              <span className="truncate">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* QRIS / VA Display */}
      <AnimatePresence mode="wait">
        {method === "qris" && (
          <motion.div
            key="qris"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="p-5 rounded-xl bg-[#f8fafc] border border-[#cbd5e1]/60 text-center shadow-xs"
          >
            <p className="text-[10px] text-[#b48c28] font-semibold uppercase tracking-widest mb-3">
              QRIS Statis &amp; Dinamis
            </p>

            {/* QR Code Container */}
            <div className="w-36 h-36 mx-auto rounded-lg bg-white p-2.5 mb-3 border border-[#cbd5e1]/60 shadow-xs">
              <div className="w-full h-full bg-[repeating-linear-gradient(0deg,#111_0px,#111_3px,white_3px,white_6px),repeating-linear-gradient(90deg,#111_0px,#111_3px,white_3px,white_6px)] rounded" />
            </div>

            <p className="text-xs text-[#475569] font-light">
              Mendukung BCA Mobile, BSI, Mandiri Livin, GoPay, OVO, ShopeePay, Dana
            </p>
          </motion.div>
        )}

        {method.startsWith("va-") && (
          <motion.div
            key="va"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="p-5 rounded-xl bg-[#f8fafc] border border-[#cbd5e1]/60"
          >
            <p className="text-[10px] text-[#b48c28] font-semibold uppercase tracking-widest mb-2">
              Nomor Rekening Virtual Account
            </p>
            <div className="flex items-center justify-between gap-3">
              <p className="font-mono text-lg font-bold text-[#0f172a] tracking-wider">
                {VA_NUMBER}
              </p>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-zinc-50 border border-[#cbd5e1]/60 text-xs font-semibold text-[#0f172a] transition-colors shadow-2xs"
              >
                {copied ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                <span>{copied ? "Tersalin" : "Salin"}</span>
              </button>
            </div>
            <p className="text-[11px] text-[#475569] font-light mt-3">
              Transfer tepat sesuai nominal hingga 3 digit terakhir untuk verifikasi instan.
            </p>
          </motion.div>
        )}

        {method === "gopay" && (
          <motion.div
            key="ewallet"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="p-5 rounded-xl bg-[#f8fafc] border border-[#cbd5e1]/60 text-center"
          >
            <Wallet size={24} className="text-[#b48c28] mx-auto mb-2" />
            <p className="text-xs text-[#475569] font-light mb-3">
              Buka aplikasi e-wallet Anda untuk konfirmasi pembayaran instan.
            </p>
            <button
              onClick={simulateSuccess}
              className="py-2.5 px-6 rounded-lg bg-[#0f172a] hover:bg-[#1e293b] text-white text-xs font-semibold uppercase tracking-wider shadow-xs"
            >
              Buka Aplikasi E-Wallet
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FR-4.2 Sandbox Demo Mode Switch for testing */}
      <div className="pt-3 border-t border-[#cbd5e1]/60">
        <label className="flex items-center gap-2 text-[10px] text-[#475569] cursor-pointer select-none mb-2">
          <input
            type="checkbox"
            checked={isSandbox}
            onChange={(e) => setIsSandbox(e.target.checked)}
            className="rounded accent-[#b48c28]"
          />
          <span>Sandbox Demo Mode (Simulate Payment)</span>
        </label>
        <AnimatePresence>
          {isSandbox && (
            <motion.button
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              onClick={simulateSuccess}
              className="w-full py-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold hover:bg-emerald-100 transition-all flex items-center justify-center gap-2"
            >
              <PartyPopper size={13} />
              <span>Simulate Midtrans Payment Success</span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-[#cbd5e1]/60 bg-white text-[#475569] hover:text-[#0f172a] text-xs font-medium uppercase tracking-wider transition-all shadow-2xs"
        >
          <ChevronLeft size={14} />
          <span>Kembali</span>
        </button>
      </div>
    </div>
  );
}
