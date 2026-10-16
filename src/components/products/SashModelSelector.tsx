"use client";

import Image from "next/image";
import { Check, Sparkles, Tag, ShieldCheck } from "lucide-react";
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
            <div
              key={model.id}
              role="radio"
              aria-checked={isSelected}
              tabIndex={0}
              onClick={() => onSelectModel(model)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelectModel(model);
                }
              }}
              className={`relative flex flex-col justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 select-none outline-hidden ${
                isSelected
                  ? "bg-white border-[#b48c28] shadow-md ring-2 ring-[#b48c28]/20 scale-[1.01]"
                  : "bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white text-slate-700 shadow-xs"
              }`}
            >
              {/* Header: Badge & Status */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      isSelected
                        ? "bg-amber-100 text-[#b48c28]"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    <Tag size={10} />
                    {model.shortName}
                  </span>

                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                      isSelected
                        ? "bg-[#b48c28] text-white shadow-xs"
                        : "border border-slate-300 bg-white"
                    }`}
                  >
                    {isSelected && <Check size={12} strokeWidth={3} />}
                  </div>
                </div>

                {/* Model Title (Full Official Name) */}
                <h4 className="font-serif font-bold text-sm text-[#0f172a] leading-snug mb-1">
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
                  <span className="text-base font-bold text-[#0f172a] font-mono">
                    {formatIDR(model.harga_dasar)}
                  </span>
                </div>

                <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-slate-200 bg-slate-50 shrink-0">
                  <Image
                    src={model.photos.main}
                    alt={model.nama}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Active Highlight Stripe */}
              {isSelected && (
                <div className="absolute top-0 inset-x-0 h-1 bg-[#b48c28] rounded-t-2xl" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
