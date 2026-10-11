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
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAr-e_rGospVQPboskLeppHkkNvw5cKBoMLWiQszAbmnwrL97XVB2IdbN0DrYgXfXz481mZdol_oz8khfUPE402EnxDq9kdwu14H62QLVw2hE_mlI_LNlhgu5pWisITMYtDSjZlyhNNH6VkNmK-Ou1wNkk8ZMyeijmYTIpx5UrybfLltwi-Zo4SN4Oc2VSWcAEDWrkY4P-Jed-KLg-WL34fvMAH7dCL2CEJvC0S-GGAzQqLboF5dNf4",
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
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBQ2rnP9Qui1nPXu3S5X6n1ewNiFQYmeHwr9yK46CEziVy3OpEnWyPoQBwOFi8pyXJNeyrfQJygx63YSFYdX3inFoVBlvLOrJ9DEHf44JdXhz9SJA_IuZK0MVo30NrtjZ9rReVeC_38kGEtwcrVJ5AryOU-vggX1mcNVBphwqTAhJT0QB_2QfLlTFZkZ5VXdhpuITOvZ6MhLs1lkOTYYQ4n1E6gJOa1RyYtxokvs4e1n-be4NjkreYx",
    icon: Layers,
  },
  {
    id: "cat-3",
    title: "Sepatu Pantofel Pria & Wanita",
    subtitle: "Sewa Sepatu Pria (Rp 35.000), Sepatu Wanita (Rp 30.000) & Penjualan Baru",
    price: "Rp 30.000 - 35.000",
    badge: "Sewa & Jual",
    href: "#katalog",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDyPYkVj9Hlt7dMpjNZkYtmyjmxcN3Zo_gOfJcvOC-dkEugOpLMdXKVPP7f09Gw14LWrg37G61DN_hbI_f-SBl8Dz6CQH7dLnWalW9w6QNM7ekE2SASgw5VfTP0jJs7rEUdmVZBNZv-gKnzqWiUtxkYIVuwJ0j6-2n38XzBxJ7MDLOxfiCDCl44DtQ2j_V_DQ5iOJaQ_jV1JrpJWvIslAjAuTu9sIw1eNIL6asVqa9UkmBYlXZRfjb2",
    icon: Footprints,
  },
  {
    id: "cat-4",
    title: "Selempang Wisuda Bludru & Satin",
    subtitle: "Range Rp 50.000 - 135.000. Pilihan Bludru 7 Warna & Satin 12 Warna. Bordir Presisi",
    price: "Rp 50.000 – 135.000 / pcs",
    badge: "Custom Kilat",
    href: "#customizer",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuACGb4x2T6Ey5MqMf2FS15rYdtYlVPM8sNxUDMnOd8Dkmxa1jBs_eT9IXzl8LfSgXjDDgve0S5qx5Bo28kSB5YtdCeVGKnTbBqABt7KtrvyDb5dvXHZ0coHthBjU5CpW1KwCuV0PBNo-9LBzXhQeZgBS9pKYjbosSCshPwBoHR2PV7wZ5AW_n6I_cf02YXECTjF7BPV1EdTp_z-ekTKmvvP9WH-Sm6KejQYPeGhlfRtjw5ShwR9hugT",
    icon: Award,
  },
  {
    id: "cat-5",
    title: "Konveksi PDH, Kaos, Almamater & Medali",
    subtitle: "Baju PDH, Baju Kaos, Baju Almamater, Id Card, Medali, Jas, Dasi, Kemeja Putih & Celana Formal",
    price: "Partai & Satuan (Dijual)",
    badge: "Produk Lengkap",
    href: "#bundling-sultan",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBgHlOgF4V7Xj8MQJpl8f_Qx7xqQWcUIwazxGf-CmHA322OfVhRNbRk-xjnZiYlcAOPL6T-h8rClR7o3ZvPfPeNHYa01jvg42L7hsSgxkKCJe0HTvJpDaE2Fhwa60luzortUrfBQZ8_wYSs85qKPvVXQx9bo2pHaOJkqQizWkgbPWBhBI8S9OBegJi9seU6mngFGVF8Z1FTip2p945sRq_4TLGOAaLbRFaWIiPJxCh4vqQfiqQa3tNe",
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
                    unoptimized
                    sizes="(max-width: 768px) 100vw, 50vw"
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
