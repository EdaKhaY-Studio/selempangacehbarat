"use client";

import Link from "next/link";
import Image from "next/image";
import { Images, ArrowRight, ExternalLink, Instagram, Sparkles } from "lucide-react";

import { GALLERY_ITEMS } from "@/lib/gallery-data";

export default function AdminGaleriPage() {
  const sampleGallery = GALLERY_ITEMS.map((item) => ({
    src: item.image,
    caption: item.title,
    badge: item.badge,
    objectPosition: item.objectPosition,
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#D4AF37]/10 text-[#FDE68A] border border-[#D4AF37]/30">
            Media &amp; Dokumentasi
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
            Galeri Foto &amp; Portofolio Wisuda
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-light mt-1">
            Koleksi dokumentasi foto pemakaian jas dan hasil bordir selempang nyata klien di Meulaboh.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/galeri"
            target="_blank"
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#141721] hover:bg-[#1E2230] text-slate-200 border border-[#242938] text-xs font-semibold transition-all"
          >
            <span>Lihat Galeri Publik</span>
            <ExternalLink size={13} className="text-[#D4AF37]" />
          </Link>
        </div>
      </div>

      {/* Instagram Feed Sync Banner */}
      <div className="p-6 rounded-2xl bg-[#141721] border border-[#242938] flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 to-purple-600 flex items-center justify-center text-white shrink-0">
            <Instagram size={24} />
          </div>
          <div>
            <h3 className="font-semibold text-white text-sm">
              Tersinkronisasi Instagram @selempang_acehbarat &amp; @sewajassepatu_acehbarat
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Feed foto real testimoni diunggah berkala untuk meyakinkan calon wisudawan.
            </p>
          </div>
        </div>

        <a
          href="https://instagram.com/selempang_acehbarat"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2.5 rounded-xl bg-[#242938] hover:bg-slate-700 text-xs text-white font-semibold flex items-center gap-2 transition-colors whitespace-nowrap"
        >
          <span>Buka Akun Instagram</span>
          <ExternalLink size={13} />
        </a>
      </div>

      {/* Grid Photos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sampleGallery.map((item, idx) => (
          <div
            key={idx}
            className="rounded-2xl bg-[#141721] border border-[#242938] overflow-hidden group p-3 space-y-2.5"
          >
            <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-800">
              <Image
                src={item.src}
                alt={item.caption}
                fill
                unoptimized
                sizes="(max-width: 768px) 100vw, 33vw"
                style={{ objectPosition: item.objectPosition || "center" }}
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <p className="text-xs text-slate-300 font-light truncate">
              {item.caption}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
