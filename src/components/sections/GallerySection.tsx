"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  GraduationCap,
  Sparkles,
  Maximize2,
  CheckCircle2,
  X,
} from "lucide-react";
import Image from "next/image";
import { CategoryFilter } from "@/components/ui/CategoryFilter";

interface GalleryItem {
  id: string;
  title: string;
  category: "selempang" | "jas" | "wisudawan";
  campus: string;
  image: string;
  badge: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g1",
    title: "Selempang Bludru Maroon Gold Bordir 2 Sisi",
    category: "selempang",
    campus: "Universitas Teuku Umar (UTU)",
    image:
      "https://image.pollinations.ai/prompt/custom%20wine%20red%20maroon%20velvet%20graduation%20sash%20selempang%20wisuda%20with%20metallic%20gold%20embroidery%20lettering%20and%20gold%20lace%20fringe%20border%20luxury%20craftsmanship%20macro%20shot?width=800&height=600&nologo=true",
    badge: "Best Seller",
  },
  {
    id: "g2",
    title: "Setelan Jas Tuxedo Hitam Slim Fit & Dasi Kupu",
    category: "jas",
    campus: "Wisudawan STAIN Meulaboh",
    image:
      "https://image.pollinations.ai/prompt/elegant%20black%20slimfit%20suit%20tuxedo%20for%20male%20university%20graduation%20with%20white%20shirt%20and%20black%20tie%20studio%20mannequin%20display%20dark%20aesthetic?width=800&height=600&nologo=true",
    badge: "Ready Fitting",
  },
  {
    id: "g3",
    title: "Momen Wisuda Angkatan 2025 UTU Meulaboh",
    category: "wisudawan",
    campus: "Alumni Teknik UTU",
    image:
      "https://image.pollinations.ai/prompt/happy%20Indonesian%20male%20university%20graduate%20wearing%20black%20academic%20gown%20toga%20with%20custom%20embroidered%20gold%20selempang%20sash%20smiling%20holding%20degree%20scroll%20celebration?width=800&height=600&nologo=true",
    badge: "Momen Bersejarah",
  },
  {
    id: "g4",
    title: "Selempang Hitam Bludru Silver Bordir Presisi",
    category: "selempang",
    campus: "STAIN Teungku Dirundeng",
    image:
      "https://image.pollinations.ai/prompt/black%20velvet%20graduation%20sash%20selempang%20with%20silver%20metallic%20embroidery%20arabic%20and%20latin%20calligraphy%20elegant%20detail?width=800&height=600&nologo=true",
    badge: "Custom Font",
  },
  {
    id: "g5",
    title: "Paket Lengkap Jas Formal + Kemeja + Rompi",
    category: "jas",
    campus: "Fakultas Ekonomi UTU",
    image:
      "https://image.pollinations.ai/prompt/fullset%20three%20piece%20navy%20blue%20mens%20suit%20blazer%20vest%20formal%20attire%20on%20hanger%20clean%20luxury%20wardrobe?width=800&height=600&nologo=true",
    badge: "Paket Sultan",
  },
  {
    id: "g6",
    title: "Pose Percaya Diri Wisudawan Bergelar Sarjana",
    category: "wisudawan",
    campus: "Wisudawan STAIN Meulaboh",
    image:
      "https://image.pollinations.ai/prompt/portrait%20of%20handsome%20Indonesian%20man%20in%20graduation%20suit%20with%20prestigious%20gold%20sash%20standing%20proudly%20in%20front%20of%20university%20building?width=800&height=600&nologo=true",
    badge: "Alumni Favorite",
  },
];

const CATEGORIES = [
  { id: "all", label: "Semua Koleksi" },
  { id: "selempang", label: "Selempang Custom" },
  { id: "jas", label: "Sewa Jas Formal" },
  { id: "wisudawan", label: "Momen Kelulusan" },
];

export function GallerySection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeModalItem, setActiveModalItem] = useState<GalleryItem | null>(null);

  const filteredItems =
    activeCategory === "all"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

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
            Dokumentasi foto dan portofolio wisuda bersumber langsung dari akun Instagram resmi{" "}
            <a href="https://instagram.com/selempang_acehbarat" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#b48c28] hover:underline">@selempang_acehbarat</a>{" "}
            dan{" "}
            <a href="https://instagram.com/sewajassepatu_acehbarat" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#b48c28] hover:underline">@sewajassepatu_acehbarat</a>.
          </p>

          {/* Filter Pills (Single-Row Horizontal Slider with Touch & Navigation Buttons) */}
          <div className="max-w-xl mx-auto mt-8">
            <CategoryFilter
              categories={CATEGORIES}
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
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
                className="group relative rounded-xl bg-white border border-[#cbd5e1]/60 hover:border-[#b48c28]/60 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-95 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-transparent opacity-50" />

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
                    className="absolute bottom-3 right-3 p-2 rounded-lg bg-white/90 border border-[#cbd5e1]/60 text-[#0f172a] opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-[#0f172a] hover:text-white shadow-xs"
                    aria-label="Perbesar foto"
                  >
                    <Maximize2 size={14} />
                  </button>
                </div>

                {/* Card Content */}
                <div className="p-5">
                  <p className="text-[11px] font-semibold text-[#b48c28] mb-1 flex items-center gap-1.5">
                    <GraduationCap size={13} />
                    {item.campus}
                  </p>
                  <h3 className="font-serif text-base font-medium text-[#0f172a] group-hover:text-[#b48c28] transition-colors line-clamp-1">
                    {item.title}
                  </h3>
                  <div className="mt-3 pt-3 border-t border-[#cbd5e1]/40 flex items-center justify-between text-xs text-[#475569]">
                    <span className="flex items-center gap-1 font-normal text-[11px]">
                      <CheckCircle2 size={12} className="text-emerald-600" />
                      Original Quality
                    </span>
                    <a
                      href="#product"
                      className="text-[#b48c28] hover:text-[#96741f] font-semibold text-[11px] uppercase tracking-wider transition-colors"
                    >
                      Pesan Serupa &rarr;
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
            onClick={() => setActiveModalItem(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full rounded-2xl bg-white border border-[#cbd5e1]/60 overflow-hidden shadow-2xl"
            >
              <button
                onClick={() => setActiveModalItem(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 text-[#475569] hover:text-[#0f172a] border border-[#cbd5e1]/60 shadow-xs"
              >
                <X size={16} />
              </button>
              <div className="relative aspect-[4/3] w-full bg-zinc-100">
                <Image
                  src={activeModalItem.image}
                  alt={activeModalItem.title}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <span className="text-[10px] font-semibold text-[#b48c28] uppercase tracking-widest block mb-1">
                  {activeModalItem.campus}
                </span>
                <h3 className="font-serif text-xl font-medium text-[#0f172a]">
                  {activeModalItem.title}
                </h3>
                <div className="mt-5 flex items-center gap-3">
                  <a
                    href="#product"
                    onClick={() => setActiveModalItem(null)}
                    className="px-6 py-2.5 rounded-lg bg-[#0f172a] hover:bg-[#1e293b] text-white font-semibold text-xs uppercase tracking-wider transition-all shadow-sm"
                  >
                    Pesan Model Ini
                  </a>
                  <button
                    onClick={() => setActiveModalItem(null)}
                    className="px-5 py-2.5 rounded-lg bg-[#f8fafc] border border-[#cbd5e1]/60 text-[#475569] hover:text-[#0f172a] text-xs font-medium uppercase tracking-wider"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
