"use client";

import Link from "next/link";
import {
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Layers,
  Plus,
  Minus,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from "lucide-react";

function formatIDR(val: number): string {
  return "Rp" + val.toLocaleString("id-ID");
}

export interface PriceBreakdownItem {
  name: string;
  group: string;
  price: number;
}

export interface SashPriceSummaryProps {
  modelName: string;
  basePrice: number;
  breakdown: PriceBreakdownItem[];
  unitPrice: number;
  totalPrice: number;
  quantity: number;
  onQuantityChange: (qty: number) => void;
  isValid: boolean;
  error?: string;
  checkoutUrl: string;
  className?: string;
}

export function SashPriceSummary({
  modelName,
  basePrice,
  breakdown,
  unitPrice,
  totalPrice,
  quantity,
  onQuantityChange,
  isValid,
  error,
  checkoutUrl,
  className = "",
}: SashPriceSummaryProps) {
  const dpEstimate = Math.floor(totalPrice * 0.5);
  const balanceEstimate = totalPrice - dpEstimate;

  const handleDecrease = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrease = () => {
    onQuantityChange(quantity + 1);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Group rule error notification if any */}
      {!isValid && error && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2.5 shadow-xs">
          <AlertCircle size={16} className="text-rose-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Main Estimation Box */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#0f172a] text-white space-y-4 shadow-md border border-slate-800">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Model Potongan:</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#b48c28]/20 text-[#D4AF37] border border-[#b48c28]/40">
              Preview Mock
            </span>
          </div>
          <span className="text-xs font-bold text-white max-w-[200px] sm:max-w-none truncate text-right">
            {modelName}
          </span>
        </div>

        {/* Base Price Line */}
        <div className="flex items-center justify-between text-xs text-slate-300">
          <span>Harga Dasar Model</span>
          <span className="font-mono text-slate-200 font-semibold">
            {formatIDR(basePrice)}
          </span>
        </div>

        {/* Selected Options Breakdown */}
        {breakdown.length > 0 && (
          <div className="space-y-1.5 border-t border-slate-800 pt-3 text-xs">
            <div className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider mb-1">
              Rincian Opsi Tambahan Terpilih:
            </div>
            {breakdown.map((item, idx) => (
              <div key={idx} className="flex justify-between text-slate-300 text-xs">
                <span className="truncate pr-2">
                  • {item.name} <span className="text-slate-500 text-[11px]">({item.group})</span>
                </span>
                <span className="font-mono text-[#D4AF37] shrink-0">
                  {item.price === 0 ? "Termasuk" : `+${formatIDR(item.price)}`}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Quantity Controls & Direct Input */}
        <div className="pt-3 border-t border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-300 font-medium">Jumlah Pesanan:</span>
            <div className="flex items-center gap-1.5 bg-slate-900 px-2 py-1 rounded-xl border border-slate-800">
              <button
                type="button"
                onClick={handleDecrease}
                disabled={quantity <= 1}
                aria-label="Kurangi jumlah"
                className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 flex items-center justify-center text-white transition-all cursor-pointer"
              >
                <Minus size={12} />
              </button>
              <input
                type="number"
                min={1}
                max={500}
                value={quantity}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  if (!isNaN(val) && val >= 1) {
                    onQuantityChange(Math.min(val, 500));
                  } else if (e.target.value === "") {
                    onQuantityChange(1);
                  }
                }}
                className="w-12 text-center font-mono font-bold text-xs text-white bg-transparent border-0 focus:outline-hidden [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <button
                type="button"
                onClick={handleIncrease}
                aria-label="Tambah jumlah"
                className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-white transition-all cursor-pointer"
              >
                <Plus size={12} />
              </button>
            </div>
          </div>

          {/* Quick Quantity Shortcuts */}
          <div className="flex items-center justify-end gap-1.5">
            {[1, 5, 10, 20].map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => onQuantityChange(preset)}
                className={`px-2 py-0.5 rounded text-[10px] font-mono transition-all cursor-pointer ${
                  quantity === preset
                    ? "bg-[#b48c28] text-white font-bold"
                    : "bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200"
                }`}
              >
                {preset} pcs
              </button>
            ))}
          </div>
        </div>

        {/* Unit Price & Total Price */}
        <div className="pt-3 border-t border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Harga Satuan (Dasar + Opsi):</span>
            <span className="font-mono">{formatIDR(unitPrice)}</span>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
            <span>Kalkulasi:</span>
            <span>{formatIDR(unitPrice)} × {quantity} unit</span>
          </div>
          <div className="flex items-center justify-between text-sm sm:text-base pt-1">
            <span className="text-slate-200 font-bold">Total Akhir ({quantity} pcs):</span>
            <span className="text-xl sm:text-2xl font-bold text-[#FDE68A] font-mono">
              {formatIDR(totalPrice)}
            </span>
          </div>
        </div>

        {/* 50% DP and 50% Balance Breakdown */}
        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-800 text-xs">
          <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
            <span className="text-slate-400 block text-[11px] mb-0.5">DP 50% Saat Pesan:</span>
            <span className="text-sm sm:text-base font-bold text-[#D4AF37] font-mono">
              {formatIDR(dpEstimate)}
            </span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
            <span className="text-slate-400 block text-[11px] mb-0.5">Pelunasan 50% Saat Siap:</span>
            <span className="text-sm sm:text-base font-bold text-slate-200 font-mono">
              {formatIDR(balanceEstimate)}
            </span>
          </div>
        </div>
      </div>

      {/* Action CTA: Navigates to Standalone Checkout Page */}
      <div className="pt-2">
        <Link
          href={isValid ? checkoutUrl : "#"}
          className={`w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-base tracking-wide transition-all shadow-md active:scale-98 text-center cursor-pointer ${
            isValid
              ? "bg-[#b48c28] hover:bg-[#9a751e] text-white"
              : "bg-slate-300 text-slate-500 cursor-not-allowed pointer-events-none"
          }`}
        >
          <span>Pesan Model Ini ({formatIDR(dpEstimate)} DP)</span>
          <ArrowRight size={18} />
        </Link>

        <div className="mt-3 flex items-center justify-center gap-2 text-xs text-slate-500">
          <ShieldCheck size={14} className="text-[#b48c28]" />
          <span>Model, opsi, dan estimasi otomatis diteruskan ke formulir checkout resmi.</span>
        </div>
      </div>
    </div>
  );
}
