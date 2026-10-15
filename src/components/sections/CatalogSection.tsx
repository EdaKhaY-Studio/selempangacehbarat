"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { PRODUCTS } from "@/lib/types";
import { CategoryFilter } from "@/components/ui/CategoryFilter";
import type { Product } from "@/lib/types";
import Image from "next/image";
import { Palette, Sparkles, Check, ArrowRight } from "lucide-react";

const PRODUCT_SLUGS: Record<string, string> = {
  "selempang-custom-1": "selempang-wisuda-bludru-satin",
  "paket-lengkap-1": "sewa-jas-pria-dasi-formal",
  "bundling-sultan-1": "sewa-jas-wanita-busana-formal",
  "sepatu-pantofel-1": "sewa-sepatu-pantofel",
  "jas-satuan-1": "baju-pdh-kaos-almamater",
  "selempang-2lapis-1": "id-card-medali-wisuda",
};

type CatalogFilterType = "all" | "beli-selempang" | "sewa-outfit" | "paket-organisasi";

interface CatalogColorSwatch {
  name: string;
  hex: string;
}

interface CatalogItemMeta {
  badgeBottomRight?: string;
  subType: string;
  stockStatus: string;
  stockType?: "safe" | "ready" | "premium";
  priceType: "Biaya Sewa" | "Harga Pembuatan";
  priceUnit: "/ 3 Hari" | "/ pcs" | "/ Sewa";
  ctaPrimaryText: string;
  ctaPrimaryType: "book" | "link";
  ctaPrimaryHref?: string;
  ctaSecondaryText: string;
  filterCat: "beli-selempang" | "sewa-outfit" | "paket-organisasi";
  colors?: CatalogColorSwatch[];
  materialOptions?: string[];
}

const PRODUCT_META: Record<string, CatalogItemMeta> = {
  "selempang-custom-1": {
    badgeBottomRight: "Rp 50k - 135k",
    subType: "Bludru & Satin (Dijual)",
    stockStatus: "Bordir Presisi",
    stockType: "premium",
    priceType: "Harga Pembuatan",
    priceUnit: "/ pcs",
    ctaPrimaryText: "Custom / Order",
    ctaPrimaryType: "book",
    ctaSecondaryText: "Pilihan Warna",
    filterCat: "beli-selempang",
    materialOptions: ["Bludru Premium (7 Warna)", "Satin Kilap (12 Warna)", "Benang Emas & Perak"],
    colors: [
      { name: "Hitam", hex: "#0f172a" },
      { name: "Maron", hex: "#7f1d1d" },
      { name: "Merah", hex: "#dc2626" },
      { name: "Navy", hex: "#1e3a8a" },
      { name: "Hijau", hex: "#15803d" },
      { name: "Ungu", hex: "#6b21a8" },
      { name: "Pink", hex: "#ec4899" },
    ],
  },
  "paket-lengkap-1": {
    badgeBottomRight: "Ready S - XXL",
    subType: "Jas Pria + Dasi (Disewakan)",
    stockStatus: "Ready S - XXL",
    stockType: "safe",
    priceType: "Biaya Sewa",
    priceUnit: "/ Sewa",
    ctaPrimaryText: "Sewa Jas Pria",
    ctaPrimaryType: "book",
    ctaSecondaryText: "Detail Set",
    filterCat: "sewa-outfit",
    materialOptions: ["Bahan Wool Blend Anti Kusut", "Full Furing", "Free Dasi Formal"],
    colors: [
      { name: "Hitam", hex: "#0f172a" },
      { name: "Cream", hex: "#d6c7a1" },
      { name: "Abu-Abu", hex: "#64748b" },
      { name: "Coklat", hex: "#5c3d2e" },
      { name: "Maron", hex: "#7f1d1d" },
    ],
  },
  "bundling-sultan-1": {
    badgeBottomRight: "Rp 35k - 40k",
    subType: "Jas Wanita & Outfit Formal",
    stockStatus: "Pilihan 5 Warna",
    stockType: "ready",
    priceType: "Biaya Sewa",
    priceUnit: "/ Sewa",
    ctaPrimaryText: "Sewa Jas Wanita",
    ctaPrimaryType: "book",
    ctaSecondaryText: "Detail Set",
    filterCat: "sewa-outfit",
    materialOptions: ["Jas Wanita (35k-40k)", "Kemeja (25k)", "Celana (25k)", "Rok (30k)"],
    colors: [
      { name: "Hitam", hex: "#0f172a" },
      { name: "Cream", hex: "#d6c7a1" },
      { name: "Abu-Abu", hex: "#64748b" },
      { name: "Coklat", hex: "#5c3d2e" },
      { name: "Maron", hex: "#7f1d1d" },
    ],
  },
  "sepatu-pantofel-1": {
    badgeBottomRight: "Size 35 - 44",
    subType: "Pria (35k) & Wanita (30k)",
    stockStatus: "Sewa & Jual",
    stockType: "ready",
    priceType: "Biaya Sewa",
    priceUnit: "/ Sewa",
    ctaPrimaryText: "Sewa / Beli Sepatu",
    ctaPrimaryType: "book",
    ctaSecondaryText: "Pilihan Ukuran",
    filterCat: "sewa-outfit",
    materialOptions: ["Kulit Formal Kilap", "Insole Empuk Nyaman", "Size 35 - 44"],
    colors: [
      { name: "Hitam Formal", hex: "#0f172a" },
      { name: "Coklat Kilap", hex: "#3e2723" },
    ],
  },
  "jas-satuan-1": {
    badgeBottomRight: "Custom Bordir",
    subType: "Konveksi Resmi (Dijual)",
    stockStatus: "Partai & Satuan",
    stockType: "premium",
    priceType: "Harga Pembuatan",
    priceUnit: "/ pcs",
    ctaPrimaryText: "Order Konveksi",
    ctaPrimaryType: "book",
    ctaSecondaryText: "Konsultasi Bahan",
    filterCat: "paket-organisasi",
    materialOptions: ["Baju PDH Kampus/Dinas", "Baju Kaos Katun", "Jaket Almamater"],
    colors: [
      { name: "Navy", hex: "#1e3a8a" },
      { name: "Hitam", hex: "#0f172a" },
      { name: "Maroon", hex: "#7f1d1d" },
      { name: "Hijau Army", hex: "#3f4f34" },
    ],
  },
  "selempang-2lapis-1": {
    badgeBottomRight: "Hubungi Admin",
    subType: "Atribut Wisuda & Formal (Dijual)",
    stockStatus: "Ready Produksi",
    stockType: "ready",
    priceType: "Harga Pembuatan",
    priceUnit: "/ pcs",
    ctaPrimaryText: "Pesan Atribut",
    ctaPrimaryType: "book",
    ctaSecondaryText: "Spesifikasi",
    filterCat: "paket-organisasi",
    materialOptions: ["ID Card Tebal Anti Patah", "Medali Logam / Resin Kilap", "Tali Pita Kampus"],
    colors: [
      { name: "Gold", hex: "#b48c28" },
      { name: "Silver", hex: "#94a3b8" },
      { name: "Tali Kampus", hex: "#0f172a" },
    ],
  },
};

const FILTER_TABS: { id: CatalogFilterType; label: string }[] = [
  { id: "beli-selempang", label: "Beli Selempang" },
  { id: "sewa-outfit", label: "Sewa Outfit" },
  { id: "paket-organisasi", label: "Paket Organisasi" },
  { id: "all", label: "Semua Produk" },
];

export function CatalogSection() {
  const [activeTab, setActiveTab] = useState<CatalogFilterType>("beli-selempang");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = PRODUCTS.filter((p) => {
    if (activeTab === "all") return true;
    const meta = PRODUCT_META[p.id];
    return meta?.filterCat === activeTab;
  });

  return (
    <section className="w-full bg-[#faf9f6] py-14 lg:py-20 px-4 sm:px-6 lg:px-12 border-b border-[#cbd5e1]/50 relative" id="katalog">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        {/* Header and Filter Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-1.5 max-w-xl">
            <span className="font-mono text-[11px] text-[#b48c28] tracking-widest uppercase font-bold flex items-center gap-1.5">
              <Sparkles size={13} className="text-[#b48c28]" />
              Katalog Produk Interaktif
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0f172a] tracking-tight">
              Pilihan Koleksi Wisuda &amp; Busana Formal
            </h2>
            <p className="text-sm text-[#475569] leading-relaxed font-light">
              Pilih kategori yang Anda butuhkan: pesan selempang wisuda bordir presisi, persewaan outfit jas lengkap, atau konveksi seragam organisasi resmi.
            </p>
          </div>

          {/* Interactive Category Switcher (Tab Switch: [Beli Selempang] | [Sewa Outfit] | [Paket Organisasi]) */}
          <div className="w-full md:w-auto max-w-full md:max-w-xl">
            <CategoryFilter<CatalogFilterType>
              categories={FILTER_TABS}
              activeCategory={activeTab}
              onSelectCategory={setActiveTab}
              ariaLabel="Kategori Pilihan Wisuda"
              variant="pill"
            />
          </div>
        </div>

        {/* Product Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, idx) => {
              const meta = PRODUCT_META[product.id] || {
                badgeBottomRight: "Ready",
                subType: "Pilihan Koleksi",
                stockStatus: "Ready Stock",
                priceType: "Biaya Sewa",
                priceUnit: "/ 3 Hari",
                ctaPrimaryText: "Sewa Sekarang",
                ctaPrimaryType: "book",
                ctaSecondaryText: "Detail Set",
                filterCat: "sewa-outfit",
              };

              const floatVariants = [
                "float-slow float-delay-100",
                "float-medium float-delay-400",
                "float-drift float-delay-700",
                "float-slow float-delay-1000",
                "float-medium float-delay-1300",
                "float-drift float-delay-1600",
              ];

              return (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25 }}
                  className={`p-4 sm:p-5 rounded-2xl bg-white border border-[#cbd5e1]/80 flex flex-col justify-between hover:shadow-xl hover:border-[#b48c28]/70 transition-all duration-300 group antigravity antigravity-pause-hover ${floatVariants[idx % floatVariants.length]}`}
                >
                  <div className="flex flex-col gap-4">
                    {/* Card Image + Price Badge Overlay - uncropped aspect ratio */}
                    <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden bg-[#f8fafc] flex items-center justify-center border border-[#cbd5e1]/40">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        unoptimized
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Top Left Badge */}
                      {product.badge && (
                        <span
                          className={`absolute top-3 left-3 text-white text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-xs antigravity float-bob float-delay-200 ${
                            product.badge.includes("Favorit") || product.badge.includes("Hak Milik")
                              ? "bg-amber-600"
                              : "bg-[#0f172a]"
                          }`}
                        >
                          {product.badge}
                        </span>
                      )}

                      {/* Bottom Right Price Badge */}
                      {meta.badgeBottomRight && (
                        <span className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm text-[#0f172a] font-mono text-[11px] px-2.5 py-1 rounded-md border border-[#cbd5e1]/60 font-bold shadow-xs">
                          {meta.badgeBottomRight}
                        </span>
                      )}
                    </div>

                    {/* Meta Row: SubType & Stock Status */}
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] text-[#b48c28] uppercase font-bold tracking-wide">
                          {meta.subType}
                        </span>
                        <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          {meta.stockStatus}
                        </span>
                      </div>
                      <h3 className="font-serif text-lg sm:text-xl font-bold text-[#0f172a] leading-snug group-hover:text-[#b48c28] transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#475569] leading-relaxed line-clamp-2 font-light">
                        {product.description}
                      </p>

                      {/* Opsi Warna & Bahan Display */}
                      <div className="pt-2 flex flex-col gap-1.5 border-t border-[#f1f5f9]">
                        {/* Swatches if available */}
                        {meta.colors && meta.colors.length > 0 && (
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-[#475569] font-medium flex items-center gap-1 shrink-0">
                              <Palette size={11} className="text-[#b48c28]" />
                              Warna:
                            </span>
                            <div className="flex items-center gap-1.5 flex-wrap">
                              {meta.colors.map((c) => (
                                <span
                                  key={c.name}
                                  title={c.name}
                                  className="w-3.5 h-3.5 rounded-full border border-slate-300 shadow-2xs shrink-0 cursor-help"
                                  style={{ backgroundColor: c.hex }}
                                />
                              ))}
                              <span className="text-[10px] text-[#475569] font-mono pl-0.5">
                                ({meta.colors.length} pilihan)
                              </span>
                            </div>
                          </div>
                        )}

                        {/* Material Pills */}
                        {meta.materialOptions && meta.materialOptions.length > 0 && (
                          <div className="flex items-center gap-1 flex-wrap pt-0.5">
                            {meta.materialOptions.map((mat) => (
                              <span
                                key={mat}
                                className="px-2 py-0.5 bg-[#f8fafc] text-[10px] text-[#475569] rounded border border-[#cbd5e1]/60 font-light"
                              >
                                {mat}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Price & Action Button: Hanya Lihat Detail (Sesuai Alur: Katalog -> Detail -> Formulir) */}
                  <div className="flex flex-col gap-3.5 pt-4 mt-3 border-t border-[#cbd5e1]/50">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs text-[#475569]">
                        {meta.priceType}
                      </span>
                      <div className="text-right">
                        {product.price > 0 ? (
                          <>
                            <span className="font-mono text-xl text-[#0f172a] font-bold">
                              Rp {product.price.toLocaleString("id-ID")}
                            </span>
                            <span className="text-xs text-[#475569]">
                              {" "}
                              {meta.priceUnit}
                            </span>
                          </>
                        ) : (
                          <span className="font-serif text-sm text-[#b48c28] font-bold">
                            {product.priceLabel}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="w-full">
                      <Link
                        href={`/produk/${PRODUCT_SLUGS[product.id] || "custom-selempang"}`}
                        className="w-full py-2.5 rounded-xl bg-[#0f172a] hover:bg-slate-800 text-white text-xs font-semibold transition-all duration-200 text-center shadow-xs flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                      >
                        <span>Lihat Detail</span>
                        <ArrowRight size={13} className="text-[#fdce64]" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
