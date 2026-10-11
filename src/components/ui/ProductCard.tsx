"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, ShoppingCart, ChevronRight, GraduationCap, Shirt, Footprints } from "lucide-react";
import type { Product, SuitSize } from "@/lib/types";
import { formatRupiah } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  onBook: () => void;
}

export function ProductCard({ product, onBook }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState<SuitSize | null>(null);

  return (
    <motion.article
      className="group relative flex flex-col rounded-[16px] bg-white border border-[#E5E7EB] hover:border-[#F97316]/50 shadow-xs hover:shadow-md transition-all overflow-hidden h-full"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#FEFBE8]/50">
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Placeholder when no image */}
          <div className="opacity-30 text-[#b48c28]">
            {product.category === "selempang" ? (
              <GraduationCap size={48} />
            ) : product.category === "paket-lengkap" ? (
              <Shirt size={48} />
            ) : (
              <Footprints size={48} />
            )}
          </div>
        </div>

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 z-10">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/95 backdrop-blur-sm text-[#111827] border border-[#E5E7EB] shadow-xs">
              {product.badge}
            </span>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="text-[#111827] font-serif font-bold text-base leading-tight mb-2">
          {product.name}
        </h3>
        <p className="text-[#4B5563] text-xs leading-relaxed mb-4 flex-1">
          {product.description}
        </p>

        {/* Size selector */}
        {product.availableSizes && (
          <div className="mb-4">
            <p className="text-xs text-[#4B5563] font-medium mb-2">Pilih Ukuran:</p>
            <div className="flex gap-1.5 flex-wrap">
              {product.availableSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-9 h-9 rounded-[6px] text-xs font-bold border transition-all ${
                    selectedSize === size
                      ? "border-[#F97316] bg-orange-50 text-[#F97316]"
                      : "border-[#E5E7EB] bg-white text-[#4B5563] hover:border-[#F97316]/50 hover:text-[#111827]"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Price & CTA */}
        <div className="flex items-center justify-between gap-3 pt-3 border-t border-[#E5E7EB]">
          <div>
            <p className="text-[#F97316] font-bold text-base leading-tight">
              {product.priceLabel}
            </p>
          </div>
          <button
            onClick={onBook}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#F97316] hover:bg-[#FB923C] text-white text-xs font-semibold transition-all active:scale-95 flex-shrink-0 shadow-xs"
          >
            <ShoppingCart size={13} />
            Booking
          </button>
        </div>
      </div>
    </motion.article>
  );
}
