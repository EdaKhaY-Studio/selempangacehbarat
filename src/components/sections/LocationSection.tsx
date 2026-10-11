"use client";

import { motion } from "framer-motion";
import {
  MapPin,
  Clock,
  MessageCircle,
  Instagram,
  Navigation,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export function LocationSection() {
  const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=Selempang+Aceh+Barat";
  const mapsEmbedUrl = "https://maps.google.com/maps?q=Selempang+Aceh+Barat&t=&z=16&ie=UTF8&iwloc=&output=embed";

  return (
    <section
      id="lokasi-workshop"
      className="w-full bg-white py-16 lg:py-24 px-4 sm:px-6 lg:px-12 border-t border-[#cbd5e1]/60 relative"
    >
      <span id="contact" className="absolute -top-24" />
      <span id="lokasi" className="absolute -top-24" />

      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#cbd5e1]/60 pb-8">
          <div className="flex flex-col gap-2 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-[#b48c28] tracking-widest uppercase font-bold flex items-center gap-1.5 bg-amber-50 px-2.5 py-0.5 rounded-full border border-[#fde68a]">
                <Sparkles size={11} className="text-[#b48c28]" />
                LOKASI WORKSHOP RESMI
              </span>
              <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1.5 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Workshop Aktif Meureubo
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0f172a] tracking-tight">
              Kunjungi Toko Selempang Aceh Barat
            </h2>
            <p className="text-sm sm:text-base text-[#475569] font-light leading-relaxed">
              Workshop resmi kami siap melayani pembuatan selempang wisuda bordir komputer kilat serta fitting langsung sewa setelan jas formal dan sepatu pantofel di Meulaboh.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-[#0f172a] hover:bg-slate-800 text-white font-serif text-xs font-bold shadow-md transition-all flex items-center gap-2 active:scale-95 group"
            >
              <Navigation size={15} className="text-[#fde68a] group-hover:rotate-12 transition-transform" />
              <span>Buka di Google Maps</span>
              <ExternalLink size={13} className="text-slate-400" />
            </a>
          </div>
        </div>

        {/* Highlight Address & Operating Hours Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#faf9f6] border border-[#cbd5e1]/80 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start gap-3.5 max-w-2xl">
            <div className="w-11 h-11 rounded-xl bg-amber-50 border border-[#fde68a] flex items-center justify-center text-[#b48c28] shrink-0 mt-0.5 shadow-2xs">
              <MapPin size={22} />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-bold text-[#b48c28] uppercase tracking-wider">
                Alamat Resmi Workshop
              </span>
              <p className="font-serif text-base sm:text-lg font-bold text-[#0f172a] leading-snug">
                Selempang Aceh Barat - Jln Alpen, Gampong Gunong Kleng, Kec. Meureubo, Kab. Aceh Barat
              </p>
              <span className="text-xs text-[#475569] font-light">
                (Akses hanya 2 menit dari kampus Universitas Teuku Umar &amp; STAIN Meulaboh)
              </span>
            </div>
          </div>

          <div className="flex items-start sm:items-center gap-3.5 bg-white p-4 sm:p-5 rounded-xl border border-[#cbd5e1]/70 shadow-2xs shrink-0">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
              <Clock size={20} />
            </div>
            <div className="flex flex-col text-xs">
              <span className="font-bold text-[#0f172a] uppercase tracking-wide">
                Jam Operasional Toko
              </span>
              <span className="text-[#475569] mt-0.5">
                • <strong>Pagi:</strong> 08:00 - 18:00 WIB <em className="text-[11px] text-slate-500">(Waktu sholat toko tutup)</em>
              </span>
              <span className="text-[#475569]">
                • <strong>Malam:</strong> 20:00 - 23:00 WIB
              </span>
            </div>
          </div>
        </div>

        {/* Google Maps Embed Iframe Section */}
        <div className="w-full rounded-2xl overflow-hidden border border-[#cbd5e1]/80 shadow-md bg-slate-100 relative">
          <div className="relative w-full h-[360px] sm:h-[420px]">
            <iframe
              title="Google Maps Selempang Aceh Barat"
              src={mapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full filter contrast-[1.02]"
            />
          </div>

          {/* Floating Map Action Badge */}
          <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:left-4 z-10">
            <div className="bg-white/95 backdrop-blur-md p-3.5 sm:p-4 rounded-xl border border-[#cbd5e1]/80 shadow-lg flex items-center justify-between gap-4">
              <div className="flex flex-col">
                <span className="text-[10px] text-[#b48c28] font-bold uppercase tracking-wider">
                  Entitas Resmi Google Maps
                </span>
                <span className="font-serif text-sm font-bold text-[#0f172a]">
                  Selempang Aceh Barat
                </span>
                <span className="text-[11px] text-[#475569] font-light">
                  Jln Alpen, Gampong Gunong Kleng
                </span>
              </div>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-lg bg-[#b48c28] hover:bg-amber-600 text-white font-semibold text-xs transition-colors shrink-0 flex items-center gap-1.5 shadow-xs"
              >
                <span>Buka di Google Maps</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>

        {/* 2 Big Location / Service Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Akun 1: Selempang Aceh Barat */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 sm:p-8 rounded-2xl bg-white border border-[#cbd5e1]/80 shadow-xs flex flex-col justify-between gap-6 hover:shadow-md hover:border-[#b48c28] transition-all group"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] bg-amber-50 text-[#b48c28] border border-[#fde68a] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  Layanan 1 • Produksi Selempang &amp; Konveksi
                </span>
                <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Bordir Kilat 1 Hari
                </span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0f172a] group-hover:text-[#b48c28] transition-colors">
                Selempang Aceh Barat
              </h3>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed font-light">
                Spesialis selempang wisuda bahan bludru &amp; satin bordir komputer (Rp 50k - 135k), seragam Baju PDH, Kaos event, Almamater kampus, ID Card &amp; Medali wisuda resmi.
              </p>
              <div className="flex flex-col gap-2.5 pt-2 text-xs text-[#475569]">
                <div className="flex items-start gap-2.5">
                  <MapPin size={17} className="text-[#b48c28] shrink-0 mt-0.5" />
                  <span className="text-[#0f172a] font-medium leading-relaxed">
                    Selempang Aceh Barat - Jln Alpen, Gampong Gunong Kleng, Kec. Meureubo, Kab. Aceh Barat
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-1">
                  <a
                    className="flex items-center gap-1.5 text-emerald-700 font-semibold hover:underline"
                    href="https://wa.me/6282299256343"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle size={15} />
                    <span className="font-mono">WhatsApp: 0822-9925-6343</span>
                  </a>
                  <a
                    className="flex items-center gap-1.5 text-[#0f172a] font-semibold hover:text-[#b48c28]"
                    href="https://instagram.com/selempang_acehbarat"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Instagram size={15} className="text-amber-500" />
                    <span>@selempang_acehbarat</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#cbd5e1]/60 flex items-center justify-between text-xs">
              <span className="text-[#475569] font-medium">Bahan Bludru &amp; Satin Lengkap</span>
              <a
                className="inline-flex items-center gap-1 font-bold text-[#0f172a] hover:text-[#b48c28] transition-colors"
                href="https://instagram.com/selempang_acehbarat"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Instagram Resmi</span>
                <ArrowRight size={13} />
              </a>
            </div>
          </motion.div>

          {/* Akun 2: Sewa Jas & Sepatu Aceh Barat */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-6 sm:p-8 rounded-2xl bg-white border border-[#fde68a] shadow-xs flex flex-col justify-between gap-6 hover:shadow-md hover:border-[#b48c28] transition-all relative overflow-hidden group"
          >
            <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-amber-100/50 blur-2xl pointer-events-none" />
            <div className="flex flex-col gap-3 relative z-10">
              <div className="flex items-center justify-between">
                <span className="text-[11px] bg-amber-100 text-[#0f172a] border border-[#fde68a] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  Layanan 2 • Sewa Jas &amp; Sepatu
                </span>
                <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Fitting Pas &amp; Steril
                </span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0f172a] group-hover:text-[#b48c28] transition-colors">
                Sewa Jas &amp; Sepatu Aceh Barat
              </h3>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed font-light">
                Persewaan Jas Pria + Dasi (50k), Jas Wanita (35k-40k), Kemeja Pria/Wanita (25k), Celana (25k), Rok (30k), Dasi (15k), Sepatu Pria (35k), Sepatu Wanita (30k). Pilihan Warna Jas: Hitam, Cream, Abu-Abu, Coklat, Maron.
              </p>
              <div className="flex flex-col gap-2.5 pt-2 text-xs text-[#475569]">
                <div className="flex items-start gap-2.5">
                  <MapPin size={17} className="text-[#b48c28] shrink-0 mt-0.5" />
                  <span className="text-[#0f172a] font-medium leading-relaxed">
                    Selempang Aceh Barat - Jln Alpen, Gampong Gunong Kleng, Kec. Meureubo, Kab. Aceh Barat
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-1">
                  <a
                    className="flex items-center gap-1.5 text-emerald-700 font-semibold hover:underline"
                    href="https://wa.me/6282276027590"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle size={15} />
                    <span className="font-mono">WhatsApp: 0822-7602-7590</span>
                  </a>
                  <a
                    className="flex items-center gap-1.5 text-[#0f172a] font-semibold hover:text-[#b48c28]"
                    href="https://instagram.com/sewajassepatu_acehbarat"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Instagram size={15} className="text-amber-500" />
                    <span>@sewajassepatu_acehbarat</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#cbd5e1]/60 flex items-center justify-between text-xs relative z-10">
              <span className="text-[#b48c28] font-bold">Layanan Fitting &amp; Sewa</span>
              <a
                className="inline-flex items-center gap-1 font-bold text-[#0f172a] hover:text-[#b48c28] transition-colors"
                href="https://instagram.com/sewajassepatu_acehbarat"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Lihat Katalog Sewa</span>
                <ArrowRight size={13} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
