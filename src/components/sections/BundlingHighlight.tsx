"use client";

import { motion } from "framer-motion";
import {
  Check,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Tag,
  Plus,
  Equal,
} from "lucide-react";
import Image from "next/image";
import { formatRupiah } from "@/lib/utils";

const LOOK_PIECES = [
  {
    title: "Jas Pria + Dasi",
    desc: "Warna: Hitam, Cream, Abu-Abu, Coklat, Maron (Ukuran S - XXL)",
    image: "/Gambar/male-graduate-suit-full.jpg",
    priceNormal: "Sewa Rp 50.000",
  },
  {
    title: "Sepatu Pantofel",
    desc: "Sewa Sepatu Pria (35k) & Wanita (30k) Kulit Kilap",
    image: "/Gambar/stitch/shoes_oxford.jpg",
    priceNormal: "Rp 30k - 35k",
  },
  {
    title: "Selempang Wisuda",
    desc: "Bludru (7 Warna) & Satin (12 Warna) Bordir Komputer",
    image: "/Gambar/04-selempang-hitam-emas-rumbai.jpeg",
    priceNormal: "Mulai Rp 50k",
  },
];

const INCLUDED_DETAILS = [
  "Jas Pria + Dasi (Pilihan Hitam, Cream, Abu-Abu, Coklat, Maron)",
  "Jas Wanita (Pilihan Hitam, Cream, Abu-Abu, Coklat, Maron)",
  "Kemeja Putih Formal Pria & Wanita Siap Pakai",
  "Celana Bahan Formal & Rok Formal Rapi",
  "Dasi Formal Panjang / Kupu-Kupu",
  "Sepatu Pantofel Kilap Pria & Wanita (Sol Empuk)",
  "Selempang Wisuda Bludru & Satin Bordir Komputer Presisi",
  "Penyediaan Baju PDH, Kaos, Almamater, ID Card & Medali",
  "Garansi Busana Higienis & Pas di Badan",
];

export function BundlingHighlight() {
  return (
    <section
      id="bundling-sultan"
      className="py-16 sm:py-24 bg-white relative overflow-hidden border-b border-[#cbd5e1]/60"
    >
      {/* Subtle warm background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#b48c28]/6 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-16"
        >
          <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#b48c28] mb-3 inline-block">
            THE COMPLETE GRADUATION LOOK
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-5xl font-bold text-[#0f172a] tracking-tight">
            Satu Set Sempurna,{" "}
            <span className="text-[#b48c28] italic font-serif">
              Dari Ujung Kepala Hingga Kaki
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#475569] max-w-xl mx-auto font-normal leading-relaxed">
            Tak perlu repot mencari jas di satu toko dan selempang di toko lain. Dapatkan paket bundling sultan dengan jaminan keselarasan gaya dan harga lebih hemat.
          </p>
        </motion.div>

        {/* The Equation Showcase (Jas + Sepatu + Selempang = Complete Set) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center mb-14">
          {LOOK_PIECES.map((piece, idx) => {
            const floatStyles = [
              "float-slow float-delay-200",
              "float-medium float-delay-700",
              "float-drift float-delay-1200",
            ];

            return (
              <motion.div
                key={piece.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className={`relative rounded-2xl bg-[#f8fafc] border border-[#cbd5e1]/80 p-4 flex flex-col justify-between group hover:border-[#b48c28] hover:shadow-xl transition-all shadow-xs hover:-translate-y-1 antigravity antigravity-pause-hover ${floatStyles[idx % floatStyles.length]}`}
              >
                <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-zinc-100 mb-4">
                  <Image
                    src={piece.image}
                    alt={piece.title}
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent opacity-60" />
                  <span className="absolute bottom-3 right-3 text-[11px] font-mono text-[#0f172a] font-bold bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-md border border-[#cbd5e1]/60 shadow-xs antigravity float-bob float-delay-300">
                    {piece.priceNormal}
                  </span>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-[#b48c28] font-bold mb-1">
                    Bagian 0{idx + 1}
                  </p>
                  <h3 className="font-serif text-lg font-bold text-[#0f172a] group-hover:text-[#b48c28] transition-colors">
                    {piece.title}
                  </h3>
                  <p className="text-xs text-[#475569] mt-1 font-normal">
                    {piece.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Campaign Featured Banner (Stitch Champagne Aesthetic) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl bg-gradient-to-br from-amber-50/70 via-white to-amber-50/40 border border-[#fde68a] p-8 sm:p-12 relative overflow-hidden shadow-md antigravity float-gentle float-delay-500 antigravity-shadow"
        >
          {/* Subtle gold top line */}
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#b48c28] to-transparent opacity-75" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Campaign copy & inclusion list (7 cols) */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-[#0f172a] border border-[#fde68a] mb-4">
                <Tag size={12} className="text-[#b48c28]" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#0f172a]">
                  Hemat Rp 25.000 vs Sewa Terpisah
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0f172a] mb-4">
                PAKET BUNDLING SULTAN WISUDA <span className="text-[#b48c28]">2-IN-1</span>
              </h3>
              <p className="text-sm text-[#475569] font-normal leading-relaxed mb-6">
                Gabungkan sewa perlengkapan jas formal head-to-toe lengkap dengan pesanan kustom selempang bludru nama &amp; gelar emas Anda sendiri. Nikmati potongan langsung tanpa ribet cari vendor terpisah di Meulaboh!
              </p>

              {/* Grid of included items */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
                {INCLUDED_DETAILS.map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-[#0f172a]">
                    <Check size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="https://wa.me/6282299256343?text=Halo%20Selempang%20Aceh%20Barat,%20saya%20mau%20booking%20Paket%20Bundling%20Wisuda"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg bg-[#0f172a] hover:bg-slate-800 text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-md active:scale-95 text-center"
                >
                  <Sparkles size={15} className="text-[#b48c28]" />
                  <span>Booking Bundling Sultan</span>
                  <ArrowRight size={14} />
                </a>

                <span className="text-xs text-[#475569] text-center sm:text-left flex items-center justify-center gap-1 font-normal">
                  <ShieldCheck size={14} className="text-emerald-600" />
                  Garansi pas &amp; anti double-booking
                </span>
              </div>
            </div>

            {/* Right: Pricing Box (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-center items-center lg:items-end">
              <div className="w-full max-w-sm p-6 sm:p-8 rounded-2xl bg-white border border-[#fde68a] text-center lg:text-right shadow-md">
                <p className="text-xs uppercase tracking-widest text-[#475569] mb-1 font-semibold">
                  Harga Bundling Lengkap
                </p>
                <div className="flex items-baseline justify-center lg:justify-end gap-2 mb-1">
                  <span className="text-sm text-[#475569]/70 line-through font-mono">
                    Rp 200.000
                  </span>
                  <span className="font-mono text-3xl sm:text-4xl font-bold text-[#0f172a]">
                    {formatRupiah(175000)}
                  </span>
                </div>
                <div className="flex justify-center lg:justify-end mb-6">
                  <span className="text-[11px] text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full font-bold border border-emerald-200">
                    Hemat Rp 25.000 Langsung!
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#f8fafc] border border-[#cbd5e1]/70 text-left text-xs text-[#475569] space-y-2 font-normal">
                  <div className="flex justify-between">
                    <span>Durasi Sewa:</span>
                    <strong className="text-[#0f172a]">3 Hari Penuh</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Proses Selempang:</span>
                    <strong className="text-[#0f172a]">1 – 2 Hari Kilat</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Jaminan Deposit:</span>
                    <strong className="text-[#0f172a]">KTM / KTP Asli</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
