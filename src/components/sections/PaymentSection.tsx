"use client";

import { motion } from "framer-motion";
import { QrCode, Landmark, Wallet, Banknote, ShieldCheck, CheckCircle2, Send } from "lucide-react";

export function PaymentSection() {
  return (
    <section
      className="w-full bg-[#faf9f6] py-16 lg:py-24 px-4 sm:px-6 lg:px-12 border-t border-b border-[#cbd5e1]/60"
      id="metode-pembayaran"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-2 max-w-2xl mx-auto">
          <span className="font-mono text-xs text-[#b48c28] tracking-widest uppercase font-bold">
            Kemudahan Transaksi &amp; Booking
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0f172a] tracking-tight">
            Pembayaran Cepat &amp; Aman
          </h2>
          <p className="text-sm text-[#475569] font-light">
            Didukung QRIS Instan, Virtual Account Bank Syariah Indonesia (BSI), Bank Aceh, BCA, Mandiri, dan BRI.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="max-w-5xl mx-auto w-full flex flex-col gap-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1: QRIS */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-white border border-[#fde68a]/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-all duration-200"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 border border-[#fde68a] flex items-center justify-center text-[#b48c28]">
                    <QrCode size={24} />
                  </div>
                  <span className="text-[10px] bg-amber-100 text-[#0f172a] font-bold px-2 py-0.5 rounded-full border border-[#fde68a] uppercase tracking-wide">
                    Instan Realtime
                  </span>
                </div>
                <div>
                  <h3 className="font-serif text-base font-bold text-[#0f172a]">
                    QRIS &amp; QR Internasional
                  </h3>
                  <p className="text-[11px] text-[#475569] mt-1 leading-relaxed font-light">
                    Standar Nasional BI &amp; QR Cross-Border Malaysia (DuitNow), Singapore (NETS), &amp; Thailand (PromptPay).
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {["QRIS", "GoPay", "OVO", "Dana", "ShopeePay"].map((w) => (
                    <span
                      key={w}
                      className="px-2 py-0.5 rounded bg-[#f1f5f9] text-[11px] font-semibold text-[#0f172a] border border-[#cbd5e1]/60"
                    >
                      {w}
                    </span>
                  ))}
                </div>
              </div>
              <div className="pt-4 mt-3 border-t border-[#cbd5e1]/40 flex items-center gap-1.5 text-emerald-700 text-xs font-semibold">
                <CheckCircle2 size={15} />
                <span>Bebas Biaya Admin</span>
              </div>
            </motion.div>

            {/* Card 2: Transfer Bank & VA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="p-6 rounded-2xl bg-white border border-[#cbd5e1]/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-all duration-200"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-[#f1f5f9] border border-[#cbd5e1]/70 flex items-center justify-center text-[#0f172a]">
                    <Landmark size={24} />
                  </div>
                  <span className="text-[10px] bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-200 uppercase tracking-wide">
                    Syariah &amp; Konven
                  </span>
                </div>
                <div>
                  <h3 className="font-serif text-base font-bold text-[#0f172a]">
                    Transfer Bank &amp; VA
                  </h3>
                  <p className="text-[11px] text-[#475569] mt-1 leading-relaxed font-light">
                    Verifikasi otomatis lewat Virtual Account dan konfirmasi transfer rekening resmi Selempang Aceh Barat.
                  </p>
                </div>
                <div className="flex flex-col gap-1.5 pt-1">
                  <div className="flex items-center justify-between py-1 px-2 rounded bg-[#f8fafc] border border-[#cbd5e1]/50 text-[11px]">
                    <span className="font-bold text-[#0f172a]">BSI (Bank Syariah)</span>
                    <span className="font-mono font-semibold text-[#b48c28]">900 8123 4455</span>
                  </div>
                  <div className="flex items-center justify-between py-1 px-2 rounded bg-[#f8fafc] border border-[#cbd5e1]/50 text-[11px]">
                    <span className="font-bold text-[#0f172a]">Bank Aceh Syariah</span>
                    <span className="font-mono font-semibold text-[#b48c28]">501 0244 8899</span>
                  </div>
                  <div className="flex items-center justify-between py-1 px-2 rounded bg-[#f8fafc] border border-[#cbd5e1]/50 text-[11px]">
                    <span className="font-bold text-[#0f172a]">BCA / Mandiri / BRI</span>
                    <span className="text-[#475569]">Tersedia VA</span>
                  </div>
                </div>
              </div>
              <div className="pt-4 mt-3 border-t border-[#cbd5e1]/40 flex items-center gap-1.5 text-[#0f172a] text-xs font-semibold">
                <CheckCircle2 size={15} className="text-[#b48c28]" />
                <span>Rekening Resmi Terdaftar</span>
              </div>
            </motion.div>

            {/* Card 3: E-Wallet */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.16 }}
              className="p-6 rounded-2xl bg-white border border-[#cbd5e1]/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-all duration-200"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-[#f1f5f9] border border-[#cbd5e1]/70 flex items-center justify-center text-[#0f172a]">
                    <Wallet size={24} />
                  </div>
                  <span className="text-[10px] bg-slate-100 text-slate-800 font-bold px-2 py-0.5 rounded-full border border-[#cbd5e1]/60 uppercase tracking-wide">
                    Serba Praktis
                  </span>
                </div>
                <div>
                  <h3 className="font-serif text-base font-bold text-[#0f172a]">
                    Dompet Digital / E-Wallet
                  </h3>
                  <p className="text-[11px] text-[#475569] mt-1 leading-relaxed font-light">
                    Terima direct transfer atau tap transaksi cepat melalui platform dompet digital favorit Anda.
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {["Dana", "OVO Cash", "GoPay Wallet", "LinkAja", "AstraPay"].map((ew) => (
                    <span
                      key={ew}
                      className="px-2 py-0.5 rounded bg-[#f8fafc] text-[11px] font-semibold text-[#0f172a] border border-[#cbd5e1]/60"
                    >
                      {ew}
                    </span>
                  ))}
                </div>
              </div>
              <div className="pt-4 mt-3 border-t border-[#cbd5e1]/40 flex items-center gap-1.5 text-[#0f172a] text-xs font-semibold">
                <CheckCircle2 size={15} className="text-[#b48c28]" />
                <span>Konfirmasi &lt; 3 Menit</span>
              </div>
            </motion.div>

            {/* Card 4: Tunai / Cash */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.24 }}
              className="p-6 rounded-2xl bg-white border border-[#cbd5e1]/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-all duration-200"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 border border-[#fde68a] flex items-center justify-center text-[#b48c28]">
                    <Banknote size={24} />
                  </div>
                  <span className="text-[10px] bg-amber-50 text-amber-800 font-bold px-2 py-0.5 rounded-full border border-amber-200 uppercase tracking-wide">
                    Fitting On-Site
                  </span>
                </div>
                <div>
                  <h3 className="font-serif text-base font-bold text-[#0f172a]">
                    Tunai / Cash di Workshop
                  </h3>
                  <p className="text-[11px] text-[#475569] mt-1 leading-relaxed font-light">
                    Bayar langsung tunai di kasir toko saat datang ukur fitting atau pengambilan perlengkapan wisuda.
                  </p>
                </div>
                <div className="p-2.5 rounded-lg bg-[#f8fafc] border border-[#cbd5e1]/50 text-[11px] text-[#475569] flex flex-col gap-1 font-light">
                  <span className="font-semibold text-[#0f172a]">• Toko &amp; Workshop Jln Alpen, Meureubo</span>
                  <span>Tersedia struk nota fisik bermaterai &amp; kuitansi resmi.</span>
                </div>
              </div>
              <div className="pt-4 mt-3 border-t border-[#cbd5e1]/40 flex items-center gap-1.5 text-emerald-700 text-xs font-semibold">
                <CheckCircle2 size={15} />
                <span>Nota Fisik &amp; Garansi Pas</span>
              </div>
            </motion.div>
          </div>

          {/* Security Banner */}
          <div className="p-4 lg:p-6 rounded-2xl bg-white border border-[#cbd5e1]/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0">
                <ShieldCheck size={22} />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-sm font-bold text-[#0f172a]">
                  Jaminan Keamanan Pembayaran &amp; Perlindungan Deposit 100%
                </span>
                <span className="text-xs text-[#475569] font-light">
                  Setiap pembayaran terenkripsi standar Bank Indonesia. Deposit sewa dikembalikan utuh tepat saat pengembalian jas.
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <a
                className="inline-flex items-center gap-1 px-4 py-2 rounded-lg bg-[#0f172a] text-white font-serif text-xs font-semibold hover:bg-slate-800 transition-colors shadow-xs"
                href="https://wa.me/6282299256343?text=Halo%20Selempang%20Aceh%20Barat,%20saya%20ingin%20konfirmasi%20pembayaran"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Send size={14} />
                <span>Konfirmasi Bukti Transfer</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
