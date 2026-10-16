"use client";

import { Check, Info, Sparkles, Layers, ShieldCheck, AlertCircle } from "lucide-react";
import {
  GroupedResolvedOptions,
  ResolvedOption,
} from "@/lib/catalog/mock-sash-catalog";

function formatIDR(val: number): string {
  return "Rp" + val.toLocaleString("id-ID");
}

export interface SashOptionGroupListProps {
  groupedOptions: GroupedResolvedOptions[];
  selectedOptionSlugs: string[];
  onToggleOption: (option: ResolvedOption) => void;
  modelName: string;
  className?: string;
}

export function SashOptionGroupList({
  groupedOptions,
  selectedOptionSlugs,
  onToggleOption,
  modelName,
  className = "",
}: SashOptionGroupListProps) {
  if (groupedOptions.length === 0) {
    return (
      <div className={`p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 ${className}`}>
        <div className="flex items-center gap-2 font-semibold text-[#0f172a] mb-1">
          <Info size={14} className="text-[#b48c28]" />
          <span>Tidak ada opsi tambahan untuk model ini</span>
        </div>
        <p className="leading-relaxed">
          {modelName} sudah dikonfigurasi lengkap secara standar atelier tanpa opsi kustomisasi tambahan.
        </p>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {groupedOptions.map((groupData) => {
        const grp = groupData.group;
        const isExclusive = grp.max_pilih === 1;
        const selectedCountInGroup = groupData.options.filter((o) =>
          selectedOptionSlugs.includes(o.option.slug)
        ).length;

        return (
          <div
            key={grp.id}
            className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3.5 transition-all"
          >
            {/* Group Header & Rule Badges */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pb-2.5 border-b border-slate-100">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="w-2 h-2 rounded-full bg-[#b48c28]" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#0f172a]">
                  {grp.nama_grup}
                </h3>

                {isExclusive ? (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                      selectedCountInGroup > 0
                        ? "bg-amber-100 text-amber-900 border-amber-300"
                        : "bg-amber-50 text-amber-800 border-amber-200"
                    }`}
                  >
                    Maks. 1 Pilihan (Eksklusif) • {selectedCountInGroup}/1 Terpilih
                  </span>
                ) : grp.max_pilih !== null ? (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                    Maks. {grp.max_pilih} Pilihan • {selectedCountInGroup}/{grp.max_pilih} Terpilih
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                    Bebas Pilih (Opsional){" "}
                    {selectedCountInGroup > 0 ? `• ${selectedCountInGroup} Terpilih` : ""}
                  </span>
                )}
              </div>

              {grp.deskripsi && (
                <span className="text-[11px] text-slate-500 font-light">
                  {grp.deskripsi}
                </span>
              )}
            </div>

            {/* Validation Notice for Exclusive Groups (e.g. Renda Max 1) */}
            {isExclusive && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-50/80 border border-amber-200/80 text-amber-900 text-[11px] leading-relaxed">
                <AlertCircle size={14} className="text-[#b48c28] shrink-0" />
                <span>
                  <strong>Aturan Pilihan Tunggal ({grp.nama_grup}):</strong> Hanya diperbolehkan memilih maksimal 1 opsi renda keliling. Memilih opsi lain akan otomatis menggantikan pilihan sebelumnya (sifat eksklusif).
                </span>
              </div>
            )}

            {/* Grid of Options for this Group */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {groupData.options.map((resolved) => {
                const isChecked = selectedOptionSlugs.includes(resolved.option.slug);
                const hasPriceOverride =
                  resolved.effectivePrice !== resolved.option.harga;

                return (
                  <div
                    key={resolved.option.id}
                    role="checkbox"
                    aria-checked={isChecked}
                    tabIndex={0}
                    onClick={() => onToggleOption(resolved)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        onToggleOption(resolved);
                      }
                    }}
                    className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all cursor-pointer select-none outline-hidden ${
                      isChecked
                        ? "bg-amber-50/70 border-[#b48c28] ring-1 ring-[#b48c28] text-[#0f172a] shadow-xs"
                        : "bg-white border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50/60"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 pr-2">
                      <div
                        className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 transition-all ${
                          isChecked
                            ? "bg-[#b48c28] border-[#b48c28] text-white shadow-xs"
                            : "border-slate-300 bg-white"
                        }`}
                      >
                        {isChecked && <Check size={12} strokeWidth={3} />}
                      </div>

                      <div className="min-w-0">
                        <div className="text-xs font-semibold truncate">
                          {resolved.option.nama}
                        </div>
                        {resolved.option.deskripsi && (
                          <div className="text-[10px] text-slate-400 truncate">
                            {resolved.option.deskripsi}
                          </div>
                        )}
                        {!isChecked && isExclusive && selectedCountInGroup > 0 && (
                          <span className="text-[9px] text-[#b48c28] font-bold uppercase tracking-wider block mt-0.5">
                            Ganti Pilihan
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-bold text-[#b48c28] font-mono">
                        {resolved.effectivePrice === 0
                          ? "Termasuk"
                          : `+${formatIDR(resolved.effectivePrice)}`}
                      </span>
                      {hasPriceOverride && resolved.effectivePrice > 0 && (
                        <span className="block text-[9px] text-slate-400 font-medium">
                          Tarif khusus model
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
