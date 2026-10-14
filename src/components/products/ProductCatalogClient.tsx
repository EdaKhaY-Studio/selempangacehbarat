"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Tag,
  Star,
  CheckCircle2,
  ArrowRight,
  Search,
  Sparkles,
  ShoppingBag,
  SlidersHorizontal,
  Shirt,
  Award,
  Layers,
  MessageCircle,
} from "lucide-react";
import { DetailedProduct } from "@/lib/products-data";

interface ProductCatalogClientProps {
  products: DetailedProduct[];
}

type CategoryFilter = "all" | "selempang" | "sewa-outfit" | "apparel-pdh";

const TABS: { id: CategoryFilter; label: string; icon: typeof Tag }[] = [
  { id: "all", label: "Semua Produk & Jasa", icon: Layers },
  { id: "selempang", label: "Selempang Wisuda", icon: Sparkles },
  { id: "sewa-outfit", label: "Sewa Outfit & Jas", icon: Shirt },
  { id: "apparel-pdh", label: "Apparel & Atribut", icon: Award },
];

export function ProductCatalogClient({ products }: ProductCatalogClientProps) {
  const [activeTab, setActiveTab] = useState<CategoryFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        activeTab === "all" || product.category === activeTab;
      const matchesSearch =
        searchQuery.trim() === "" ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, activeTab, searchQuery]);

  return (
    <div className="w-full">
      {/* Search and Category Filter Bar */}
      <div className="bg-white rounded-2xl border border-[#cbd5e1]/60 p-4 sm:p-6 shadow-xs mb-10">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#0f172a] text-white shadow-sm ring-2 ring-[#0f172a]/20"
                      : "bg-[#f4f3f1] text-[#475569] hover:bg-[#efeeeb] hover:text-[#0f172a]"
                  }`}
                >
                  <Icon
                    size={15}
                    className={isActive ? "text-[#fdce64]" : "text-[#75777d]"}
                  />
                  <span>{tab.label}</span>
                  {isActive && (
                    <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-white/20 text-white font-bold">
                      {filteredProducts.length}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full lg:w-72">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#75777d]"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari produk, jas, bahan..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#cbd5e1]/80 text-xs sm:text-sm bg-[#faf9f6] text-[#0f172a] placeholder-[#94a3b8] focus:outline-hidden focus:ring-2 focus:ring-[#b48c28] focus:border-transparent transition-all"
            />
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-[#cbd5e1] p-8">
          <ShoppingBag size={40} className="mx-auto text-[#94a3b8] mb-3" />
          <h3 className="font-serif text-lg font-bold text-[#0f172a] mb-1">
            Produk Tidak Ditemukan
          </h3>
          <p className="text-sm text-[#475569] max-w-md mx-auto mb-4">
            Tidak ada produk yang cocok dengan kata kunci &quot;{searchQuery}&quot;. Coba ganti filter atau cari kata kunci lain.
          </p>
          <button
            onClick={() => {
              setActiveTab("all");
              setSearchQuery("");
            }}
            className="px-4 py-2 rounded-xl bg-[#0f172a] text-white text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Reset Semua Filter
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <article
              key={product.id}
              className="group bg-white rounded-2xl border border-[#cbd5e1]/60 hover:border-[#b48c28]/60 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              <div>
                {/* Image Container with Badges */}
                <div className="relative aspect-[4/3] w-full bg-slate-100 overflow-hidden">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-white/95 text-[#0f172a] backdrop-blur-sm border border-[#cbd5e1]/60 shadow-xs">
                      {product.categoryLabel}
                    </span>

                    {product.badge && (
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-[#b48c28] text-white shadow-xs">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  {/* Price Tag Overlay on Bottom Image */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-white/90 bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs">
                      {product.priceType}
                    </span>
                    <span className="text-xs font-bold text-amber-300 bg-black/70 px-2.5 py-0.5 rounded-full border border-amber-400/40 backdrop-blur-xs">
                      {product.priceLabel}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 sm:p-6">
                  {/* Rating & SKU */}
                  <div className="flex items-center justify-between gap-2 text-xs text-[#475569] mb-2.5">
                    <div className="flex items-center gap-1.5" title="Rating 5.0 Google Reviews Selempang Aceh Barat">
                      <Star size={13} className="text-amber-500 fill-amber-500" />
                      <span className="font-bold text-[#0f172a]">{product.rating.toFixed(1)}</span>
                      <span className="text-[#94a3b8]">(Google Reviews)</span>
                    </div>
                    <span className="text-[10px] font-mono text-[#94a3b8] uppercase">
                      {product.sku}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-lg font-bold text-[#0f172a] group-hover:text-[#b48c28] transition-colors leading-snug mb-2">
                    <Link href={`/produk/${product.slug}`} className="hover:underline">
                      {product.name}
                    </Link>
                  </h3>

                  {/* Short Description */}
                  <p className="text-xs text-[#475569] leading-relaxed line-clamp-2 mb-4">
                    {product.shortDescription}
                  </p>

                  {/* Color Swatches if available */}
                  {product.colors && product.colors.length > 0 && (
                    <div className="mb-4 pt-3 border-t border-[#cbd5e1]/40">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[11px] font-semibold text-[#475569]">
                          Pilihan Warna ({product.colors.length}):
                        </span>
                        <span className="text-[10px] text-[#94a3b8]">Bisa custom</span>
                      </div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {product.colors.slice(0, 6).map((color, cIdx) => (
                          <div
                            key={cIdx}
                            title={color.name}
                            className="w-4 h-4 rounded-full border border-slate-300 shadow-2xs"
                            style={{ backgroundColor: color.hex }}
                          />
                        ))}
                        {product.colors.length > 6 && (
                          <span className="text-[10px] text-[#475569] font-semibold">
                            +{product.colors.length - 6} lagi
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Highlights (First 2 features) */}
                  <div className="space-y-1.5 mb-2">
                    {product.features.slice(0, 2).map((feature, fIdx) => (
                      <div
                        key={fIdx}
                        className="flex items-start gap-1.5 text-[11px] text-[#475569]"
                      >
                        <CheckCircle2
                          size={12}
                          className="text-[#b48c28] shrink-0 mt-0.5"
                        />
                        <span className="line-clamp-1">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons Footer */}
              <div className="p-5 sm:p-6 pt-0 border-t border-[#cbd5e1]/40 bg-[#faf9f6]/50 mt-2 flex flex-col sm:flex-row gap-2">
                <Link
                  href={`/produk/${product.slug}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0f172a] hover:bg-slate-800 text-white font-semibold text-xs tracking-wide transition-all shadow-xs group/btn active:scale-95 text-center"
                >
                  <span>Detail &amp; Pesan</span>
                  <ArrowRight
                    size={14}
                    className="group-hover/btn:translate-x-1 transition-transform"
                  />
                </Link>

                <a
                  href={`https://wa.me/${
                    product.category === "sewa-outfit" || product.slug.startsWith("sewa-")
                      ? "6282276027590"
                      : "6282299256343"
                  }?text=Halo%20Selempang%20Aceh%20Barat,%20saya%20tertarik%20dengan%20produk%20${encodeURIComponent(
                    product.name
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center p-2.5 rounded-xl bg-white hover:bg-emerald-50 text-emerald-700 border border-emerald-300 font-semibold text-xs transition-all active:scale-95"
                  title="Tanya WhatsApp"
                  aria-label="Tanya WhatsApp"
                >
                  <MessageCircle size={16} />
                </a>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
