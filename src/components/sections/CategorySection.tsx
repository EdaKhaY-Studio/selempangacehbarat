"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Shirt, Footprints, Award, Layers } from "lucide-react";
import Image from "next/image";

interface CategoryCardItem {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  badge: string;
  href: string;
  image: string;
  icon: typeof Shirt;
  featured?: boolean;
}

const CATEGORIES: CategoryCardItem[] = [
  {
    id: "cat-1",
    title: "Sewa Jas Pria + Dasi Formal",
    subtitle: "Jas Pria + Dasi (Pilihan warna jas: Hitam, Cream, Abu-Abu, Coklat, Maron)",
    price: "Rp 50.000 / Sewa",
    badge: "Paling Populer",
    href: "#katalog",
    image: "/Gambar/male-graduate-suit-full.jpg",
    icon: Shirt,
    featured: true,
  },
  {
    id: "cat-2",
    title: "Sewa Jas Wanita & Busana Formal",
    subtitle: "Jas Wanita (Rp 35.000 - 40.000), Kemeja Pria/Wanita (25k), Celana (25k), Rok (30k), Dasi (15k)",
    price: "Rp 35.000 - 40.000",
    badge: "Sewa Formal",
    href: "#katalog",
    image: "/Gambar/stitch/blazer_charcoal.jpg",
    icon: Layers,
  },
  {
    id: "cat-3",
    title: "Sepatu Pantofel Pria & Wanita",
    subtitle: "Sewa Sepatu Pria (Rp 35.000), Sepatu Wanita (Rp 30.000) & Penjualan Baru",
    price: "Rp 30.000 - 35.000",
    badge: "Sewa & Jual",
    href: "#katalog",
    image: "/Gambar/stitch/shoes_oxford.jpg",
    icon: Footprints,
  },
  {
    id: "cat-4",
    title: "Selempang Wisuda Bludru & Satin",
    subtitle: "Range Rp 50.000 - 135.000. Pilihan Bludru 7 Warna & Satin 12 Warna. Bordir Presisi",
    price: "Rp 50.000 – 135.000 / pcs",
    badge: "Custom Kilat",
    href: "#customizer",
    image: "/images/portfolio/selempang-cumlaude-navy.png",
    icon: Award,
  },
  {
    id: "cat-5",
    title: "Konveksi PDH, Kaos, Almamater & Medali",
    subtitle: "Baju PDH, Baju Kaos, Baju Almamater, Id Card, Medali, Jas, Dasi, Kemeja Putih & Celana Formal",
    price: "Partai & Satuan (Dijual)",
    badge: "Produk Lengkap",
    href: "#bundling-sultan",
    image: "/Gambar/05-medali-wisuda-custom-hijau.jpeg",
    icon: Sparkles,
    featured: true,
  },
];

export function CategorySection() {
  return (
    <section id="kategori" className="py-16 sm:py-24 bg-[#faf9f6] relative border-b border-[#cbd5e1]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#b48c28] mb-3 block">
              KOLEKSI &amp; KATEGORI PILIHAN
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0f172a] tracking-tight">
              Eksplorasi Busana Formal &amp; Aksesoris
            </h2>
          </div>
          <p className="text-sm text-[#475569] max-w-md font-normal leading-relaxed">
            Pilihan setelan jas presisi, sepatu pantofel kilap, selempang wisuda custom, dan konveksi resmi untuk menunjang penampilan berwibawa di hari bersejarah.
          </p>
        </div>

        {/* Asymmetric Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((item, idx) => {
            const Icon = item.icon;
            const isWide = item.featured && (idx === 0 || idx === 4);

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                className={`group relative rounded-2xl bg-white border border-[#cbd5e1]/80 overflow-hidden hover:border-[#b48c28] hover:shadow-xl transition-all duration-300 flex flex-col justify-between shadow-xs hover:-translate-y-1.5 antigravity antigravity-pause-hover ${
                  idx % 3 === 0
                    ? "float-slow float-delay-200"
                    : idx % 3 === 1
                    ? "float-medium float-delay-600"
                    : "float-drift float-delay-1000"
                } ${isWide ? "lg:col-span-2" : "col-span-1"}`}
              >
                {/* Visual Image Container */}
                <div
                  className={`relative w-full overflow-hidden bg-zinc-100 ${
                    isWide ? "aspect-[16/9] sm:aspect-[21/9]" : "aspect-[4/3]"
                  }`}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    priority={idx < 2}
                    loading={idx < 2 ? "eager" : "lazy"}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-95 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-60" />

                  {/* Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 border border-[#cbd5e1]/70 backdrop-blur-md text-[11px] font-bold text-[#0f172a] shadow-xs antigravity float-bob float-delay-300">
                      <Icon size={12} className="text-[#b48c28]" />
                      {item.badge}
                    </span>
                  </div>
                </div>

                {/* Card Content & Action */}
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0f172a] group-hover:text-[#b48c28] transition-colors">
                        {item.title}
                      </h3>
                      <span className="font-mono text-xs font-bold text-[#0f172a] shrink-0">
                        {item.price}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#475569] font-normal leading-relaxed mb-6">
                      {item.subtitle}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#cbd5e1]/60 flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-wider text-[#475569] font-medium">
                      Tersedia Fitting Langsung
                    </span>
                    <a
                      href={item.href}
                      className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0f172a] group-hover:text-[#b48c28] transition-colors"
                    >
                      <span>Lihat Detail</span>
                      <ArrowRight
                        size={13}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
