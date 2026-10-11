"use client";

import Link from "next/link";
import Image from "next/image";
import { getAllProducts } from "@/lib/products-data";
import { ShoppingBag, ArrowRight, ExternalLink, CheckCircle2, Star, ShieldCheck } from "lucide-react";

export default function AdminProdukPage() {
  const products = getAllProducts();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#D4AF37]/10 text-[#FDE68A] border border-[#D4AF37]/30">
            Inventaris Toko
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
            Katalog Produk &amp; Manajemen Stok
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-light mt-1">
            Pantau ketersediaan jas sewa (S - 3XL), kain selempang bludru &amp; satin, serta stok atribut wisuda.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/produk"
            target="_blank"
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#141721] hover:bg-[#1E2230] text-slate-200 border border-[#242938] text-xs font-semibold transition-all"
          >
            <span>Lihat di Toko Publik</span>
            <ExternalLink size={13} className="text-[#D4AF37]" />
          </Link>
        </div>
      </div>

      {/* Grid List of Products with Stock Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((p) => (
          <div
            key={p.id}
            className="rounded-2xl bg-[#141721] border border-[#242938] overflow-hidden flex flex-col justify-between p-4 space-y-3"
          >
            <div>
              <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-slate-800 mb-3">
                <Image
                  src={p.images[0]}
                  alt={p.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold bg-[#090A0F]/80 text-[#FDE68A] border border-[#242938]">
                  {p.categoryLabel}
                </span>
                <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/90 text-white">
                  Stok Siap
                </span>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span className="font-mono text-[10px] text-slate-500">{p.sku}</span>
                <span className="text-[#D4AF37] font-semibold">{p.priceLabel}</span>
              </div>

              <h3 className="font-serif text-sm font-bold text-white line-clamp-1">
                {p.name}
              </h3>
              <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 font-light">
                {p.shortDescription}
              </p>
            </div>

            <div className="pt-3 border-t border-[#242938] flex items-center justify-between text-xs">
              <span className="text-emerald-400 flex items-center gap-1 text-[11px]">
                <CheckCircle2 size={12} />
                <span>Ready di Alpen Store</span>
              </span>

              <Link
                href={`/produk/${p.slug}`}
                target="_blank"
                className="text-[#D4AF37] hover:underline flex items-center gap-1 text-[11px] font-semibold"
              >
                <span>Halaman Klien</span>
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
