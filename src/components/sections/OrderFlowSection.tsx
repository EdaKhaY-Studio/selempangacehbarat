"use client";

import { motion } from "framer-motion";
import { PenTool, CreditCard, Store, ArrowRight, CheckCircle2, ShieldCheck, Sparkles, MapPin } from "lucide-react";

interface StepItem {
  step: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  icon: typeof PenTool;
  tags: string[];
}

const ORDER_STEPS: StepItem[] = [
  {
    step: "01",
    badge: "Langkah Pertama",
    title: "Pilih & Custom",
    subtitle: "Nama, Gelar & Ukuran",
    description:
      "Tentukan jenis bahan selempang (Bludru / Satin), pilih kombinasi warna kain & list pita, lalu input nama lengkap beserta gelar akademik untuk bordir komputer. Untuk sewa outfit, tentukan size jas (S–XXL) & sepatu pantofel.",
    icon: PenTool,
    tags: ["Input Nama & Gelar", "Pilihan 12 Warna", "Size Fitting S–XXL"],
  },
  {
    step: "02",
    badge: "Langkah Kedua",
    title: "Bayar Instan",
    subtitle: "Midtrans Snap Otomatis",
    description:
      "Selesaikan pembayaran secara otomatis, instan, dan aman melalui sistem Midtrans Snap. Didukung pembayaran QRIS (semua e-wallet), Virtual Account BSI, BCA, Mandiri, dan BRI dengan verifikasi otomatis tanpa perlu kirim bukti transfer.",
    icon: CreditCard,
    tags: ["QRIS Semua E-Wallet", "Virtual Account BSI & BCA", "Konfirmasi Otomatis"],
  },
  {
    step: "03",
    badge: "Langkah Ketiga",
    title: "Ambil di Toko / Kirim",
    subtitle: "Workshop Jln Alpen Meureubo",
    description:
      "Ambil langsung pesanan di workshop Selempang Aceh Barat (Jln Alpen, Gampong Gunong Kleng, Meureubo) dengan fasilitas fitting gratis di tempat. Anda juga dapat memilih opsi pengiriman kurir kilat langsung sampai di rumah.",
    icon: Store,
    tags: ["Fitting Gratis di Toko", "Kirim Kurir Cepat", "Jaminan Siap Pakai"],
  },
];

export function OrderFlowSection() {
  return (
    <section id="alur-order" className="w-full bg-white py-16 lg:py-24 px-4 sm:px-6 lg:px-12 border-b border-[#cbd5e1]/60 relative">
      <div className="max-w-7xl mx-auto flex flex-col gap-14">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-3 max-w-2xl mx-auto">
          <span className="font-mono text-xs text-[#b48c28] tracking-widest uppercase font-bold flex items-center gap-1.5 bg-amber-50 px-3 py-1 rounded-full border border-[#fde68a]">
            <Sparkles size={12} className="text-[#b48c28]" />
            PROSES MUDAH &amp; TRANSPARAN
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0f172a] tracking-tight">
            3-Step Alur Order Cepat &amp; Praktis
          </h2>
          <p className="text-sm sm:text-base text-[#475569] font-light leading-relaxed">
            Hanya 3 langkah sederhana untuk mengamankan selempang wisuda bordir presisi atau paket sewa jas formal Anda di Meulaboh.
          </p>
        </div>

        {/* 3 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {ORDER_STEPS.map((item, idx) => {
            const Icon = item.icon;
            const floatClasses = [
              "float-slow float-delay-100",
              "float-medium float-delay-400",
              "float-drift float-delay-700",
            ];

            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className={`relative p-6 sm:p-8 rounded-2xl bg-[#faf9f6] border border-[#cbd5e1]/80 hover:border-[#b48c28] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group antigravity antigravity-pause-hover ${floatClasses[idx]}`}
              >
                {/* Step Watermark Number */}
                <div className="absolute top-4 right-5 font-serif text-5xl font-extrabold text-slate-200/70 select-none group-hover:text-[#fde68a]/60 transition-colors pointer-events-none">
                  {item.step}
                </div>

                <div className="flex flex-col gap-4 relative z-10">
                  {/* Icon & Step Badge */}
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-white border border-[#cbd5e1]/80 shadow-xs flex items-center justify-center text-[#b48c28] group-hover:scale-110 group-hover:bg-[#0f172a] group-hover:text-[#fde68a] transition-all duration-300">
                      <Icon size={22} />
                    </div>
                    <span className="text-[11px] font-bold text-[#b48c28] tracking-wider uppercase">
                      {item.badge}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0f172a] group-hover:text-[#b48c28] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#b48c28] font-medium tracking-wide mt-0.5">
                      {item.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#475569] leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>

                {/* Feature Tags List */}
                <div className="pt-6 mt-6 border-t border-[#cbd5e1]/60 flex flex-col gap-2 relative z-10">
                  {item.tags.map((tag) => (
                    <div key={tag} className="flex items-center gap-2 text-xs text-[#0f172a] font-medium">
                      <CheckCircle2 size={13} className="text-[#b48c28] shrink-0" />
                      <span>{tag}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA Bar */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0f172a] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl shadow-[#0f172a]/15">
          <div className="flex flex-col gap-1 text-center sm:text-left">
            <h4 className="font-serif text-lg sm:text-xl font-bold text-white">
              Siap Memesan untuk Momen Wisuda Mendatang?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 font-light max-w-xl">
              Konsultasikan nama bordir, gelar sarjana, atau tanggal sewa jas Anda bersama tim Selempang Aceh Barat sekarang juga.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
            <a
              href="#katalog"
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[#b48c28] hover:bg-amber-600 text-white font-semibold text-xs tracking-wider uppercase transition-colors text-center shadow-md flex items-center justify-center gap-2 active:scale-98"
            >
              <span>Pilih Produk di Katalog</span>
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
