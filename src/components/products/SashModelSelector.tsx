"use client";

import Image from "next/image";
import { Sparkles, Tag } from "lucide-react";
import { SashModelEntity } from "@/lib/catalog/mock-sash-catalog";

function formatIDR(val: number): string {
  return "Rp" + val.toLocaleString("id-ID");
}

export interface SashModelSelectorProps {
  models: SashModelEntity[];
  selectedModelId: number;
  onSelectModel: (model: SashModelEntity) => void;
  className?: string;
}

export function SashModelSelector({
  models,
  selectedModelId,
  onSelectModel,
  className = "",
}: SashModelSelectorProps) {
  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold uppercase tracking-wider text-[#0f172a] flex items-center gap-1.5">
          <Sparkles size={14} className="text-[#b48c28]" />
          <span>Pilih Model Potongan Selempang:</span>
        </label>
        <span className="text-[11px] text-slate-500">
          *Nama lengkap resmi sesuai standar butik FHD
        </span>
      </div>

      <div
        role="radiogroup"
        aria-label="Pilihan Model Selempang"
        className="grid grid-cols-1 md:grid-cols-3 gap-3.5"
      >
        {models.map((model) => {
          const isSelected = model.id === selectedModelId;

          return (
            <button
              key={model.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              aria-label={`${model.nama}, harga dasar ${formatIDR(model.harga_dasar)}`}
              onClick={() => onSelectModel(model)}
              className={`w-full text-left relative flex flex-col justify-between p-4 sm:p-4.5 rounded-2xl cursor-pointer transition-all duration-200 select-none outline-hidden ${
                isSelected
                  ? "bg-gradient-to-b from-amber-50/40 via-white to-amber-50/15 border border-[#b48c28] shadow-sm ring-1 ring-[#b48c28]/25"
                  : "bg-white border border-slate-200/90 hover:border-[#b48c28]/40 hover:bg-slate-50/40 text-slate-700 shadow-2xs"
              }`}
            >
              {/* Header: Short Name / Tag */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors ${
                      isSelected
                        ? "bg-[#b48c28]/10 text-[#b48c28] border border-[#b48c28]/30"
                        : "bg-slate-100 text-slate-600 border border-slate-200/60"
                    }`}
                  >
                    <Tag size={10} />
                    {model.shortName}
                  </span>

                  <span
                    className={`text-[10px] font-semibold uppercase tracking-wider transition-colors ${
                      isSelected ? "text-[#b48c28]" : "text-slate-400"
                    }`}
                  >
                    {isSelected ? "Terpilih" : "Pilih Model"}
                  </span>
                </div>

                {/* Model Title (Full Official Name) */}
                <h4
                  className={`font-serif font-bold text-sm sm:text-base leading-snug mb-1.5 transition-colors ${
                    isSelected ? "text-[#0f172a]" : "text-slate-800"
                  }`}
                >
                  {model.nama}
                </h4>

                {/* Short excerpt description */}
                <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed mb-3">
                  {model.deskripsi}
                </p>
              </div>

              {/* Footer: Base Price & Photo thumbnail preview */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Harga Dasar:</span>
                  <span
                    className={`text-base font-bold font-mono transition-colors ${
                      isSelected ? "text-[#b48c28]" : "text-[#0f172a]"
                    }`}
                  >
                    {formatIDR(model.harga_dasar)}
                  </span>
                </div>

                <div
                  className={`relative w-12 h-12 rounded-lg overflow-hidden border bg-slate-50 shrink-0 transition-colors ${
                    isSelected ? "border-[#b48c28]/40" : "border-slate-200"
                  }`}
                >
                  <Image
                    src={model.photos.main}
                    alt={model.nama}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
