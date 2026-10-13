"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  CheckCircle2,
  ShieldCheck,
  Clock,
  Sparkles,
  Truck,
  MessageCircle,
  CreditCard,
  Share2,
  ArrowRight,
  ChevronRight,
  Info,
} from "lucide-react";
import { DetailedProduct } from "@/lib/products-data";

interface ProductDetailInteractiveProps {
  product: DetailedProduct;
  relatedProducts: DetailedProduct[];
}

export function ProductDetailInteractive({
  product,
  relatedProducts,
}: ProductDetailInteractiveProps) {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [selectedColor, setSelectedColor] = useState(
    product.colors && product.colors.length > 0 ? product.colors[0].name : ""
  );
  const [selectedMaterial, setSelectedMaterial] = useState(
    product.materialOptions && product.materialOptions.length > 0
      ? product.materialOptions[0]
      : ""
  );
  const [selectedSize, setSelectedSize] = useState(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : ""
  );
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Halo Admin Selempang Aceh Barat, saya ingin memesan/tanya produk:
*${product.name}*
- Kategori: ${product.categoryLabel}
- Estimasi Harga: ${product.priceLabel}
${selectedMaterial ? `- Pilihan Bahan: ${selectedMaterial}\n` : ""}${
      selectedColor ? `- Pilihan Warna: ${selectedColor}\n` : ""
    }${selectedSize ? `- Pilihan Ukuran: ${selectedSize}\n` : ""}
Mohon info ketersediaan slot dan alur pemesanannya. Terima kasih!`
  );

  const waTargetPhone =
    product.category === "sewa-outfit" || product.slug.startsWith("sewa-")
      ? "6282276027590"
      : "6282299256343";

  return (
    <div className="w-full">
      {/* 2-Column Responsive Product View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
        {/* Left Column: Media Gallery & Specifications (5 cols on lg) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Main Hero Image */}
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-100 border border-[#cbd5e1]/60 shadow-sm">
            <Image
              src={selectedImage}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover transition-all duration-300"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-[#b48c28] text-white shadow-md">
                {product.badge}
              </span>
            )}
          </div>

          {/* Thumbnail Strip (if multiple images) */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                    selectedImage === img
                      ? "border-[#b48c28] shadow-sm scale-105"
                      : "border-slate-200 opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} foto ${idx + 1}`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Atelier Guarantee Badges Box */}
          <div className="rounded-2xl bg-white border border-[#cbd5e1]/60 p-5 shadow-2xs space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0f172a] flex items-center gap-1.5">
              <ShieldCheck size={16} className="text-[#b48c28]" />
              Jaminan Layanan Selempang Aceh Barat
            </h4>
            <div className="grid grid-cols-2 gap-3 text-xs text-[#475569]">
              <div className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-emerald-600 mt-0.5 shrink-0" />
                <span>Garansi 100% Anti-Typo Bordir Komputer</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-emerald-600 mt-0.5 shrink-0" />
                <span>Laundry Higienis &amp; Wangi Siap Pakai</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-emerald-600 mt-0.5 shrink-0" />
                <span>Pengerjaan Kilat 24 Jam di Meulaboh</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-emerald-600 mt-0.5 shrink-0" />
                <span>Bebas Fitting Langsung di Alpen Store</span>
              </div>
            </div>
          </div>

          {/* Specifications Table */}
          {product.specifications && Object.keys(product.specifications).length > 0 && (
            <div className="rounded-2xl bg-white border border-[#cbd5e1]/60 p-5 shadow-2xs">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#0f172a] mb-3 flex items-center gap-1.5">
                <Info size={15} className="text-[#0f172a]" />
                Spesifikasi Teknis
              </h4>
              <div className="divide-y divide-slate-100 text-xs">
                {Object.entries(product.specifications).map(([key, val], sIdx) => (
                  <div key={sIdx} className="py-2 flex justify-between gap-4">
                    <span className="text-[#75777d]">{key}</span>
                    <span className="font-semibold text-[#0f172a] text-right">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Pricing, Selector & Purchase Action (7 cols on lg) */}
        <div className="lg:col-span-7 flex flex-col justify-start">
          {/* Top Category, Stock Status & SKU */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-slate-100 text-[#0f172a] border border-slate-200">
                {product.categoryLabel}
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Ready Stock / Siap Pesan
              </span>
            </div>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 text-xs text-[#75777d] hover:text-[#0f172a] transition-colors cursor-pointer px-2 py-1 rounded-md hover:bg-slate-100"
            >
              <Share2 size={13} />
              <span>{copiedLink ? "Link Tersalin!" : "Bagikan"}</span>
            </button>
          </div>

          {/* Product Title */}
          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0f172a] tracking-tight leading-tight mb-3">
            {product.name}
          </h1>

          {/* Rating, Reviews & SKU */}
          <div className="flex items-center gap-4 text-xs text-[#475569] mb-6 pb-4 border-b border-[#cbd5e1]/40">
            <div className="flex items-center gap-1">
              <Star size={14} className="text-amber-500 fill-amber-500" />
              <span className="font-bold text-[#0f172a] text-sm">{product.rating}</span>
              <span className="text-[#94a3b8]">({product.reviewCount} ulasan pelanggan)</span>
            </div>
            <span className="text-[#cbd5e1]">|</span>
            <span className="font-mono text-[#94a3b8] text-[11px] uppercase">
              SKU: {product.sku}
            </span>
          </div>

          {/* Price Box */}
          <div className="rounded-2xl bg-gradient-to-r from-amber-50/70 via-white to-amber-50/40 border border-amber-200/80 p-5 mb-6">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#785a00] mb-1">
              {product.priceType}
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-3xl sm:text-4xl font-black text-[#b48c28]">
                {product.priceLabel}
              </span>
              <span className="text-xs text-[#75777d] font-medium">
                {product.priceUnit}
              </span>
            </div>
            <p className="text-[11px] text-[#75777d] mt-2">
              *Harga transparan tanpa biaya tersembunyi. Termasuk konsultasi gratis dan sesi fitting langsung di toko.
            </p>
          </div>

          {/* Short Description */}
          <div className="text-sm text-[#475569] leading-relaxed mb-6 font-light">
            <p>{product.description}</p>
          </div>

          {/* Option: Material Selector */}
          {product.materialOptions && product.materialOptions.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0f172a]">
                  Pilihan Bahan / Varian:
                </span>
                <span className="text-xs text-[#b48c28] font-semibold">
                  {selectedMaterial}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.materialOptions.map((mat, mIdx) => (
                  <button
                    key={mIdx}
                    onClick={() => setSelectedMaterial(mat)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                      selectedMaterial === mat
                        ? "bg-[#0f172a] text-white shadow-xs ring-2 ring-[#0f172a]/20"
                        : "bg-white text-[#475569] border border-slate-200 hover:border-slate-400"
                    }`}
                  >
                    {mat}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Option: Color Swatches Selector */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0f172a]">
                  Pilihan Warna Kain:
                </span>
                <span className="text-xs text-[#b48c28] font-semibold">
                  {selectedColor}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2.5">
                {product.colors.map((color, cIdx) => {
                  const isSelected = selectedColor === color.name;
                  return (
                    <button
                      key={cIdx}
                      onClick={() => setSelectedColor(color.name)}
                      className={`group/color flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs transition-all cursor-pointer ${
                        isSelected
                          ? "border-[#b48c28] bg-amber-50/50 shadow-xs ring-1 ring-[#b48c28]"
                          : "border-slate-200 bg-white hover:border-slate-300"
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full border border-black/20 shrink-0 shadow-2xs"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span className="font-medium text-[#0f172a]">
                        {color.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Option: Size Selector if sizes exist */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0f172a]">
                  Pilihan Ukuran Jas / Pakaian:
                </span>
                <span className="text-xs text-[#b48c28] font-semibold">
                  Size {selectedSize}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((sz, szIdx) => (
                  <button
                    key={szIdx}
                    onClick={() => setSelectedSize(sz)}
                    className={`w-12 h-10 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                      selectedSize === sz
                        ? "bg-[#0f172a] text-white shadow-xs"
                        : "bg-white text-[#475569] border border-slate-200 hover:border-slate-400"
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Key Features List */}
          <div className="mb-8 p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div className="text-xs font-bold uppercase tracking-wider text-[#0f172a] mb-2.5">
              Keunggulan Produk Ini:
            </div>
            <div className="space-y-2">
              {product.features.map((feat, fIdx) => (
                <div key={fIdx} className="flex items-start gap-2 text-xs text-[#475569]">
                  <CheckCircle2 size={13} className="text-[#b48c28] mt-0.5 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-[#cbd5e1]/40">
            <a
              href={`https://wa.me/${waTargetPhone}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-[#b48c28] hover:bg-[#9a751e] text-white font-semibold text-sm tracking-wide transition-all shadow-md active:scale-95 text-center cursor-pointer"
            >
              <MessageCircle size={18} />
              <span>Pesan via WhatsApp Sekarang</span>
            </a>

            <Link
              href="/checkout"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#0f172a] hover:bg-slate-800 text-white font-semibold text-sm tracking-wide transition-all shadow-sm active:scale-95 text-center"
            >
              <CreditCard size={17} />
              <span>Bayar / Checkout</span>
            </Link>
          </div>

          {/* Lokasi & Ambil Langsung */}
          <div className="mt-4 flex items-center gap-2 text-xs text-[#75777d]">
            <Truck size={14} className="text-[#b48c28] shrink-0" />
            <span>
              Bisa ambil langsung di Alpen Store Meulaboh atau dikirim kurir lokal ke seluruh Aceh Barat.
            </span>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts && relatedProducts.length > 0 && (
        <section className="pt-12 border-t border-[#cbd5e1]/60">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#b48c28]">
                Koleksi Terkait
              </span>
              <h2 className="font-serif text-2xl font-bold text-[#0f172a]">
                Produk &amp; Layanan Lainnya
              </h2>
            </div>

            <Link
              href="/produk"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0f172a] hover:text-[#b48c28] transition-colors"
            >
              <span>Lihat Semua Katalog</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.slice(0, 3).map((rel) => (
              <Link
                key={rel.id}
                href={`/produk/${rel.slug}`}
                className="group rounded-2xl bg-white border border-[#cbd5e1]/60 hover:border-[#b48c28]/60 p-4 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-slate-100 mb-3">
                    <Image
                      src={rel.images[0]}
                      alt={rel.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold bg-black/60 text-white backdrop-blur-xs">
                      {rel.priceLabel}
                    </span>
                  </div>
                  <h3 className="font-serif text-sm font-bold text-[#0f172a] group-hover:text-[#b48c28] transition-colors line-clamp-2 mb-1">
                    {rel.name}
                  </h3>
                  <p className="text-[11px] text-[#75777d] line-clamp-2">
                    {rel.shortDescription}
                  </p>
                </div>

                <div className="pt-3 mt-2 border-t border-slate-100 flex items-center justify-between text-xs text-[#b48c28] font-semibold">
                  <span>Lihat Detail</span>
                  <ChevronRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
