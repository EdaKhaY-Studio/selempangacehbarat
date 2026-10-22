"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  Sparkles,
  Maximize2,
  CheckCircle2,
  X,
  MessageCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CategoryFilter } from "@/components/ui/CategoryFilter";
import {
  GALLERY_CATEGORIES,
  GALLERY_ITEMS,
  type GalleryCategoryId,
  type GalleryItem,
} from "@/lib/gallery-data";

export function GallerySection() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategoryId>("all");
  const [activeModalItem, setActiveModalItem] = useState<GalleryItem | null>(null);

  const filteredItems =
    activeCategory === "all"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) =>
          item.categories
            ? item.categories.includes(activeCategory)
            : item.category === activeCategory
        );

  return (
    <section id="gallery" className="section-padding bg-[#faf9f6] relative border-b border-[#cbd5e1]/60">
      <span id="galeri" className="absolute -top-24" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#b48c28] mb-3 inline-block">
            Dokumentasi &amp; Portofolio
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#0f172a] tracking-tight">
            Galeri Wisuda &amp; Hasil Bordir Nyata
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#475569] max-w-2xl mx-auto font-light leading-relaxed">
            Dokumentasi foto dan portofolio wisuda nyata klien Meulaboh, bersumber langsung dari akun Instagram resmi{" "}
            <a href="https://instagram.com/selempang_acehbarat" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#b48c28] hover:underline">@selempang_acehbarat</a>{" "}
            dan{" "}
            <a href="https://instagram.com/sewajassepatu_acehbarat" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#b48c28] hover:underline">@sewajassepatu_acehbarat</a>.
          </p>

          {/* Filter Pills (Single-Row Horizontal Slider with Touch & Navigation Buttons) */}
          <div className="max-w-2xl mx-auto mt-8">
            <CategoryFilter
              categories={GALLERY_CATEGORIES}
              activeCategory={activeCategory}
              onSelectCategory={(catId) => setActiveCategory(catId as GalleryCategoryId)}
              ariaLabel="Kategori Portofolio Wisuda"
              variant="pill"
            />
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                className="group relative rounded-xl bg-white border border-[#cbd5e1]/60 hover:border-[#b48c28]/60 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-100">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectPosition: item.objectPosition || "center" }}
                    className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-95 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-30 group-hover:opacity-10 transition-opacity" />

                  {/* Badge */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white/95 border border-[#cbd5e1]/60 backdrop-blur-md text-[11px] font-medium text-[#0f172a] shadow-xs">
                      <Sparkles size={11} className="text-[#b48c28]" />
                      {item.badge}
                    </span>
                  </div>

                  {/* Zoom Overlay Trigger */}
                  <button
                    onClick={() => setActiveModalItem(item)}
                    className="absolute bottom-3 right-3 p-2 rounded-lg bg-white/90 border border-[#cbd5e1]/60 text-[#0f172a] opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-[#0f172a] hover:text-white shadow-xs cursor-pointer"
                    aria-label={`Perbesar foto ${item.title}`}
                  >
                    <Maximize2 size={14} />
                  </button>
                </div>

                {/* Card Content */}
                <div className="p-5 flex flex-col flex-1 justify-between">
                  <div>
                    <p className="text-[11px] font-semibold text-[#b48c28] mb-1 flex items-center gap-1.5">
                      <GraduationCap size={13} />
                      {item.campus}
                    </p>
                    <h3 className="font-serif text-base font-semibold text-[#0f172a] group-hover:text-[#b48c28] transition-colors line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs text-[#475569] font-light leading-relaxed line-clamp-2">
                      {item.shortText}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#cbd5e1]/40 flex items-center justify-between text-xs text-[#475569]">
                    <span className="flex items-center gap-1 font-normal text-[11px] text-slate-600">
                      <CheckCircle2 size={12} className="text-emerald-600 shrink-0" />
                      Dokumentasi Nyata
                    </span>
                    <a
                      href={`https://wa.me/6282299256343?text=${encodeURIComponent(
                        `Halo Selempang Aceh Barat, saya melihat portofolio "${item.title}" dan tertarik konsultasi pemesanan.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#b48c28] hover:text-[#96741f] font-semibold text-[11px] uppercase tracking-wider transition-colors inline-flex items-center gap-0.5"
                    >
                      <span>Konsultasi</span>
                      <span>&rarr;</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox / Zoom Modal */}
      <AnimatePresence>
        {activeModalItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs overflow-y-auto"
            onClick={() => setActiveModalItem(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full rounded-2xl bg-white border border-[#cbd5e1]/60 overflow-hidden shadow-2xl my-auto"
            >
              <button
                onClick={() => setActiveModalItem(null)}
                className="absolute top-3.5 right-3.5 z-20 p-2 rounded-full bg-white/90 hover:bg-white text-[#475569] hover:text-[#0f172a] border border-[#cbd5e1]/60 shadow-xs cursor-pointer transition-colors"
                aria-label="Tutup modal foto"
              >
                <X size={16} />
              </button>

              <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full bg-slate-900 overflow-hidden">
                <Image
                  src={activeModalItem.image}
                  alt={activeModalItem.alt}
                  fill
                  unoptimized
                  style={{ objectPosition: activeModalItem.objectPosition || "center" }}
                  className="object-contain"
                />
              </div>

              <div className="p-5 sm:p-6">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-semibold text-[#b48c28] uppercase tracking-widest flex items-center gap-1.5">
                    <GraduationCap size={13} />
                    {activeModalItem.campus}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-[10px] font-bold text-[#b48c28] uppercase tracking-wider">
                    {activeModalItem.badge}
                  </span>
                </div>

                <h3 className="font-serif text-lg sm:text-2xl font-bold text-[#0f172a] leading-snug">
                  {activeModalItem.title}
                </h3>

                <p className="mt-3 text-xs sm:text-sm text-[#475569] font-light leading-relaxed">
                  {activeModalItem.description}
                </p>

                <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                    <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                    <span>Foto Asli Dokumentasi Klien Meulaboh</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`https://wa.me/6282299256343?text=${encodeURIComponent(
                        `Halo Selempang Aceh Barat, saya melihat portofolio "${activeModalItem.title}" dan ingin pesan model ini.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#b48c28] hover:bg-[#9a751e] text-white font-semibold text-xs uppercase tracking-wider transition-all shadow-xs text-center"
                    >
                      <MessageCircle size={14} />
                      <span>Pesan via WA</span>
                    </a>
                    <Link
                      href="/produk"
                      onClick={() => setActiveModalItem(null)}
                      className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-[#0f172a] hover:bg-slate-800 text-white font-semibold text-xs uppercase tracking-wider transition-all text-center"
                    >
                      Lihat Katalog
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
