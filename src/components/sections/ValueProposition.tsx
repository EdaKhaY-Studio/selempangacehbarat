"use client";

import { motion } from "framer-motion";
import { Zap, Clock, MapPin, Sparkles, CheckCircle2 } from "lucide-react";

const STORE_ADVANTAGES = [
  {
    icon: Zap,
    stepBadge: "PRODUKSI KILAT",
    title: "Kilat 1 Hari",
    subtitle: "Solusi Deadline Mendesak",
    desc: "Pengerjaan selempang kilat siap 1 hari untuk kebutuhan mendesak sidang atau wisuda. Bordir komputer benang emas tetap rapi, tajam, dan presisi tinggi tanpa kompromi kualitas.",
    feature: "Bordir Komputer Super Cepat",
  },
  {
    icon: Clock,
    stepBadge: "OPERASIONAL PANJANG",
    title: "Buka Sampai 23:00",
    subtitle: "Fleksibel untuk Mahasiswa",
    desc: "Buka Pagi 08:00 - 18:00 WIB & Malam 20:00 - 23:00 WIB (rehat waktu sholat). Sangat leluasa untuk fitting jas, ambil pesanan, atau konsultasi desain sepulang kuliah/kerja.",
    feature: "Tersedia Sesi Malam Hari",
  },
  {
    icon: MapPin,
    stepBadge: "LOKASI STRATEGIS",
    title: "2 Menit dari Kampus",
    subtitle: "Dekat UTU & STAIN Meulaboh",
    desc: "Workshop berlokasi di Jln Alpen, Gampong Gunong Kleng, Meureubo. Hanya 2 menit perjalanan dari Universitas Teuku Umar (UTU) dan STAIN Teungku Dirundeng.",
    feature: "Akses Super Mudah & Cepat",
  },
  {
    icon: Sparkles,
    stepBadge: "STANDAR ATELIER",
    title: "Ready to Wear",
    subtitle: "Steril, Wangi & Siap Pakai",
    desc: "Semua setelan jas disetrika uap rapi, wangi, steril higienis, serta sepatu pantofel disemir kilap pekat. Langsung siap dipakai ke panggung wisuda dan studio foto.",
    feature: "Garansi Pas & Bersih 100%",
  },
];

export function ValueProposition() {
  return (
    <section
      id="keunggulan"
      className="w-full bg-[#faf9f6] py-16 lg:py-24 px-4 sm:px-6 lg:px-12 border-b border-[#cbd5e1]/60 relative"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-2 max-w-2xl mx-auto">
          <span className="font-mono text-xs text-[#b48c28] tracking-widest uppercase font-bold flex items-center gap-1.5 bg-amber-50 px-3 py-1 rounded-full border border-[#fde68a]">
            <Sparkles size={12} className="text-[#b48c28]" />
            KEUNGGULAN TOKO KAMI
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0f172a] tracking-tight">
            Mengapa Memilih Selempang Aceh Barat?
          </h2>
          <p className="text-sm sm:text-base text-[#475569] font-light leading-relaxed">
            Dedikasi penuh untuk memastikan hari kelulusan Anda berlangsung berwibawa, sempurna, dan berkesan seumur hidup.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STORE_ADVANTAGES.map((item, idx) => {
            const Icon = item.icon;
            const floatClasses = [
              "float-slow float-delay-100",
              "float-medium float-delay-300",
              "float-drift float-delay-600",
              "float-slow float-delay-900",
            ];

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.45 }}
                className={`p-6 sm:p-7 rounded-2xl bg-white border border-[#cbd5e1]/80 shadow-xs flex flex-col justify-between gap-5 hover:border-[#b48c28] hover:shadow-xl transition-all duration-300 group antigravity antigravity-pause-hover ${floatClasses[idx]}`}
              >
                <div className="flex flex-col gap-3.5">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-amber-50 border border-[#fde68a]/70 flex items-center justify-center text-[#b48c28] group-hover:scale-110 group-hover:bg-[#0f172a] group-hover:text-[#fde68a] transition-all duration-300 shadow-2xs">
                      <Icon size={24} />
                    </div>
                    <span className="text-[10px] font-bold text-[#b48c28] bg-amber-50/80 px-2 py-0.5 rounded border border-[#fde68a]/60 uppercase tracking-wider">
                      {item.stepBadge}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#0f172a] group-hover:text-[#b48c28] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#b48c28] font-medium tracking-wide mt-0.5">
                      {item.subtitle}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-[#475569] leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#f1f5f9] flex items-center gap-1.5 text-xs text-[#0f172a] font-medium">
                  <CheckCircle2 size={13} className="text-[#b48c28] shrink-0" />
                  <span>{item.feature}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
