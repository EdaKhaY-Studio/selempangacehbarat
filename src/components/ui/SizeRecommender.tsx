"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Check, ArrowRight, ShieldCheck, UserCheck } from "lucide-react";
import { getSizeRecommendation } from "@/lib/utils";

export function SizeRecommender() {
  const [height, setHeight] = useState<string>("172");
  const [weight, setWeight] = useState<string>("65");
  const [result, setResult] = useState<ReturnType<typeof getSizeRecommendation> | null>(() =>
    getSizeRecommendation(172, 65)
  );

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const h = parseFloat(height);
    const w = parseFloat(weight);
    if (!isNaN(h) && !isNaN(w) && h > 0 && w > 0) {
      setResult(getSizeRecommendation(h, w));
    }
  };

  return (
    <div className="rounded-2xl bg-white border border-[#cbd5e1]/80 p-6 sm:p-8 relative overflow-hidden shadow-xs">
      {/* Top subtle gold line */}
      <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#b48c28] to-transparent" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-5 border-b border-[#cbd5e1]/70">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 border border-[#fde68a] flex items-center justify-center text-[#b48c28]">
            <UserCheck size={20} />
          </div>
          <div>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#0f172a]">
              Personal Fitting Assistant
            </h3>
            <p className="text-xs text-[#475569] font-normal">
              Algoritma rekomendasi ukuran jas presisi khusus postur pria Indonesia
            </p>
          </div>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f8fafc] border border-[#cbd5e1] text-[11px] text-[#475569] self-start sm:self-auto">
          <ShieldCheck size={12} className="text-emerald-700" />
          <span>Garansi Pas &amp; Bebas Tukar</span>
        </div>
      </div>

      {/* Inputs Form */}
      <form onSubmit={handleCalculate} className="grid grid-cols-1 sm:grid-cols-12 gap-4 mb-6">
        <div className="sm:col-span-5">
          <label className="block text-xs uppercase tracking-wider text-[#475569] mb-2 font-semibold">
            Tinggi Badan (cm)
          </label>
          <input
            type="number"
            min="145"
            max="210"
            placeholder="Contoh: 172"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-[#f8fafc] border border-[#cbd5e1] focus:border-[#b48c28] text-[#0f172a] text-sm outline-none transition-colors font-mono shadow-2xs font-medium"
            required
          />
        </div>

        <div className="sm:col-span-5">
          <label className="block text-xs uppercase tracking-wider text-[#475569] mb-2 font-semibold">
            Berat Badan (kg)
          </label>
          <input
            type="number"
            min="40"
            max="160"
            placeholder="Contoh: 65"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-[#f8fafc] border border-[#cbd5e1] focus:border-[#b48c28] text-[#0f172a] text-sm outline-none transition-colors font-mono shadow-2xs font-medium"
            required
          />
        </div>

        <div className="sm:col-span-2 flex items-end">
          <button
            type="submit"
            className="w-full py-3 px-4 rounded-lg bg-[#0f172a] hover:bg-slate-800 text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-xs active:scale-95 flex items-center justify-center gap-1.5"
          >
            <span>Hitung</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </form>

      {/* Recommendation Result Card */}
      <AnimatePresence mode="wait">
        {result && (
          <motion.div
            key={result.size}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-amber-50/60 via-white to-amber-50/30 border border-[#fde68a] flex flex-col sm:flex-row items-center sm:items-start gap-6 shadow-xs"
          >
            {/* Big Size Badge */}
            <div className="text-center sm:text-left shrink-0">
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#b48c28] font-bold block mb-1">
                Rekomendasi Ukuran
              </span>
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#0f172a] text-white flex items-center justify-center shadow-sm">
                <span className="font-mono text-4xl sm:text-5xl font-bold">
                  {result.size}
                </span>
              </div>
            </div>

            {/* Fitting Description & Specs */}
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
                  <Check size={12} />
                  Tingkat Kecocokan: 98%
                </span>
                <span className="text-xs text-[#475569]">
                  Berdasarkan tinggi {height} cm &amp; berat {weight} kg
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#0f172a] font-normal leading-relaxed mb-4">
                {result.note}
              </p>

              {/* Precise Measurements Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-[#cbd5e1]/60">
                <div className="p-2.5 rounded-xl bg-white border border-[#cbd5e1] shadow-2xs">
                  <p className="text-[10px] uppercase tracking-wider text-[#475569]">
                    Lingkar Dada
                  </p>
                  <p className="font-mono text-xs sm:text-sm font-bold text-[#0f172a]">
                    {result.chest} cm
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-[#cbd5e1] shadow-2xs">
                  <p className="text-[10px] uppercase tracking-wider text-[#475569]">
                    Panjang Lengan
                  </p>
                  <p className="font-mono text-xs sm:text-sm font-bold text-[#0f172a]">
                    {result.sleeve} cm
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-[#cbd5e1] shadow-2xs col-span-2 sm:col-span-1">
                  <p className="text-[10px] uppercase tracking-wider text-[#475569]">
                    Fitting Tempat
                  </p>
                  <p className="text-[11px] font-bold text-emerald-700">
                    Tersedia di Toko
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
