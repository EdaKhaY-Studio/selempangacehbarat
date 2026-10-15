"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Check,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Info,
  Layers,
  HelpCircle,
  Truck,
  Scissors,
} from "lucide-react";
import {
  SASH_MODELS,
  ADDONS_BIASA,
  ADDONS_SYAL,
  SashModelType,
  calculateItemPrice,
} from "@/lib/pricing/calculator";

function formatIDR(val: number): string {
  return "Rp" + val.toLocaleString("id-ID");
}

const MODEL_PHOTOS: Record<SashModelType, { main: string; gallery: string[]; caption: string }> = {
  biasa: {
    main: "/Gambar/01-selempang-wisuda-hitam-silver-nama.jpeg",
    gallery: [
      "/Gambar/01-selempang-wisuda-hitam-silver-nama.jpeg",
      "/Gambar/03-selempang-beige-bordir-pink.jpeg",
      "/Gambar/04-selempang-hitam-emas-rumbai.jpeg",
    ],
    caption: "Contoh Desain Foto Asli: Model A — Biasa Menyamping",
  },
  syal: {
    main: "/Gambar/02-selempang-hitam-bordir-emas-instansi.jpeg",
    gallery: [
      "/Gambar/02-selempang-hitam-bordir-emas-instansi.jpeg",
      "/Gambar/04-selempang-hitam-emas-rumbai.jpeg",
      "/Gambar/01-selempang-wisuda-hitam-silver-nama.jpeg",
    ],
    caption: "Contoh Desain Foto Asli: Model B — Leher / Syal",
  },
  timbal_balik: {
    main: "/Gambar/04-selempang-hitam-emas-rumbai.jpeg",
    gallery: [
      "/Gambar/04-selempang-hitam-emas-rumbai.jpeg",
      "/Gambar/01-selempang-wisuda-hitam-silver-nama.jpeg",
      "/Gambar/02-selempang-hitam-bordir-emas-instansi.jpeg",
    ],
    caption: "Contoh Desain Foto Asli: Model C — Leher Timbal Balik (Dua Sisi)",
  },
};

export function CustomSashShowcase() {
  const [activeModel, setActiveModel] = useState<SashModelType>("biasa");
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [previewImage, setPreviewImage] = useState<string>(MODEL_PHOTOS.biasa.main);

  const modelInfo = SASH_MODELS[activeModel];
  const photoData = MODEL_PHOTOS[activeModel];

  // Switch Model Handler
  const handleModelChange = (model: SashModelType) => {
    setActiveModel(model);
    setSelectedAddons([]);
    setPreviewImage(MODEL_PHOTOS[model].main);
  };

  // Toggle Addon Handler
  const handleToggleAddon = (addonId: string) => {
    if (activeModel === "timbal_balik") return;

    if (activeModel === "biasa") {
      const addon = ADDONS_BIASA[addonId];
      if (!addon) return;

      if (addon.group === "renda") {
        // Mutually exclusive: if clicking the currently selected lace, unselect it.
        // Otherwise replace any selected lace with this one.
        if (selectedAddons.includes(addonId)) {
          setSelectedAddons(selectedAddons.filter((id) => id !== addonId));
        } else {
          const otherAddons = selectedAddons.filter((id) => ADDONS_BIASA[id]?.group !== "renda");
          setSelectedAddons([...otherAddons, addonId]);
        }
      } else {
        if (selectedAddons.includes(addonId)) {
          setSelectedAddons(selectedAddons.filter((id) => id !== addonId));
        } else {
          setSelectedAddons([...selectedAddons, addonId]);
        }
      }
    } else if (activeModel === "syal") {
      if (selectedAddons.includes(addonId)) {
        setSelectedAddons(selectedAddons.filter((id) => id !== addonId));
      } else {
        setSelectedAddons([...selectedAddons, addonId]);
      }
    }
  };

  // Live Price Calculation
  const calculation = calculateItemPrice(activeModel, selectedAddons, 1);
  const dpEstimate = Math.floor(calculation.unitPrice * 0.5);
  const balanceEstimate = calculation.unitPrice - dpEstimate;

  const checkoutUrl = `/checkout/custom-selempang?productId=selempang-custom-1&slug=custom-selempang&model=${activeModel}${
    selectedAddons.length > 0 ? `&addons=${selectedAddons.join(",")}` : ""
  }`;

  return (
    <div className="w-full">
      {/* Model Selector Pills */}
      <div className="flex flex-wrap gap-2.5 p-1.5 bg-slate-100/90 rounded-2xl mb-8 border border-slate-200/80">
        {(["biasa", "syal", "timbal_balik"] as SashModelType[]).map((mKey) => {
          const m = SASH_MODELS[mKey];
          const isActive = activeModel === mKey;
          return (
            <button
              key={mKey}
              onClick={() => handleModelChange(mKey)}
              className={`flex-1 min-w-[200px] py-3 px-4 rounded-xl text-left transition-all cursor-pointer ${
                isActive
                  ? "bg-white text-[#0f172a] shadow-sm border border-slate-200/90 ring-1 ring-[#b48c28]"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#b48c28]">
                  {mKey === "biasa" ? "Model A" : mKey === "syal" ? "Model B" : "Model C"}
                </span>
                <span className="text-xs font-bold text-[#0f172a]">
                  {formatIDR(m.basePrice)}
                </span>
              </div>
              <div className="text-sm font-bold text-[#0f172a] truncate">{m.shortName}</div>
            </button>
          );
        })}
      </div>

      {/* Main Grid: Showcase & Add-ons */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column: Photo & Specifications (5 cols on lg) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Main Photo Card */}
          <div className="relative aspect-4/5 w-full rounded-2xl overflow-hidden bg-[#f8fafc] border border-slate-200/90 shadow-sm flex items-center justify-center">
            <Image
              src={previewImage}
              alt={photoData.caption}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-contain p-2 transition-all duration-300"
            />
            <div className="absolute top-4 left-4 bg-[#0f172a]/90 backdrop-blur-xs text-white px-3 py-1 rounded-lg text-xs font-semibold shadow-xs">
              Foto Asli Produk FHD
            </div>
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 text-white text-xs">
              {photoData.caption}
            </div>
          </div>

          {/* Thumbnail Gallery */}
          <div className="flex items-center gap-3 overflow-x-auto pb-1">
            {photoData.gallery.map((imgSrc, idx) => (
              <button
                key={idx}
                onClick={() => setPreviewImage(imgSrc)}
                className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                  previewImage === imgSrc
                    ? "border-[#b48c28] ring-2 ring-[#b48c28]/40 shadow-xs"
                    : "border-slate-200 hover:border-slate-300 opacity-75 hover:opacity-100"
                }`}
              >
                <Image
                  src={imgSrc}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>

          {/* Feature Highlights */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 space-y-2">
            <div className="font-bold text-[#0f172a] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Sparkles size={14} className="text-[#b48c28]" />
              Spesifikasi Model Ini:
            </div>
            {modelInfo.features.map((feat, fIdx) => (
              <div key={fIdx} className="flex items-start gap-2">
                <Check size={14} className="text-[#b48c28] mt-0.5 shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Pricing & Addon Selection Engine (7 cols on lg) */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div className="space-y-6">
            {/* Model Title & Price Summary */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-amber-50 border border-amber-200 text-[#b48c28] text-xs font-bold uppercase tracking-wider mb-2">
                Pilihan Model: {modelInfo.shortName}
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0f172a] mb-2">
                {modelInfo.name}
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {modelInfo.description}
              </p>
            </div>

            {/* Base Price & Addon Notice */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs text-slate-500 block">Harga Dasar Produk:</span>
                <span className="text-2xl font-bold text-[#0f172a]">
                  {formatIDR(modelInfo.basePrice)}
                </span>
                <span className="text-xs text-slate-500 ml-1">/ unit</span>
              </div>
              <div className="text-xs text-slate-500 sm:text-right max-w-xs">
                {activeModel === "timbal_balik" ? (
                  <span className="text-slate-600 font-medium">
                    Model dua sisi bolak-balik dengan harga dasar flat Rp135.000 tanpa tambahan.
                  </span>
                ) : (
                  <span className="text-[#b48c28] font-medium flex items-center sm:justify-end gap-1">
                    <Info size={13} />
                    Tambahan dekorasi di bawah akan memengaruhi total harga.
                  </span>
                )}
              </div>
            </div>

            {/* Addons Selection List */}
            {activeModel === "biasa" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-[#0f172a] uppercase tracking-wider">
                    Pilihan Tambahan Dekorasi (Model Biasa):
                  </h3>
                  <span className="text-[11px] text-slate-500">
                    *Renda saling eksklusif (pilih salah satu)
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {Object.values(ADDONS_BIASA).map((addon) => {
                    const isChecked = selectedAddons.includes(addon.id);
                    return (
                      <button
                        key={addon.id}
                        type="button"
                        onClick={() => handleToggleAddon(addon.id)}
                        className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          isChecked
                            ? "bg-amber-50/70 border-[#b48c28] ring-1 ring-[#b48c28] text-[#0f172a]"
                            : "bg-white border-slate-200 hover:border-slate-300 text-slate-700"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all ${
                              isChecked
                                ? "bg-[#b48c28] border-[#b48c28] text-white"
                                : "border-slate-300 bg-white"
                            }`}
                          >
                            {isChecked && <Check size={12} strokeWidth={3} />}
                          </div>
                          <span className="text-xs font-semibold">{addon.label}</span>
                        </div>
                        <span className="text-xs font-bold text-[#b48c28]">
                          +{formatIDR(addon.price)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {activeModel === "syal" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-[#0f172a] uppercase tracking-wider">
                    Pilihan Tambahan Dekorasi (Model Leher / Syal):
                  </h3>
                  <span className="text-[11px] text-slate-500">
                    *Dapat digabungkan sesuai kebutuhan
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {Object.values(ADDONS_SYAL).map((addon) => {
                    const isChecked = selectedAddons.includes(addon.id);
                    return (
                      <button
                        key={addon.id}
                        type="button"
                        onClick={() => handleToggleAddon(addon.id)}
                        className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          isChecked
                            ? "bg-amber-50/70 border-[#b48c28] ring-1 ring-[#b48c28] text-[#0f172a]"
                            : "bg-white border-slate-200 hover:border-slate-300 text-slate-700"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all ${
                              isChecked
                                ? "bg-[#b48c28] border-[#b48c28] text-white"
                                : "border-slate-300 bg-white"
                            }`}
                          >
                            {isChecked && <Check size={12} strokeWidth={3} />}
                          </div>
                          <span className="text-xs font-semibold">{addon.label}</span>
                        </div>
                        <span className="text-xs font-bold text-[#b48c28]">
                          +{formatIDR(addon.price)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {activeModel === "timbal_balik" && (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
                Model Leher Timbal Balik menggunakan harga dasar pasti Rp135.000 per unit dengan jahitan presisi dua sisi bolak-balik tanpa biaya dekorasi tersembunyi.
              </div>
            )}

            {/* Estimation Summary Box */}
            <div className="p-5 rounded-2xl bg-[#0f172a] text-white space-y-3.5 shadow-md">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs text-slate-400">Model Dipilih:</span>
                <span className="text-xs font-bold text-white">{modelInfo.shortName}</span>
              </div>

              {calculation.selectedAddons.length > 0 && (
                <div className="space-y-1.5 border-b border-slate-800 pb-3 text-xs">
                  <div className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider">
                    Tambahan Terpilih:
                  </div>
                  {calculation.selectedAddons.map((add) => (
                    <div key={add.id} className="flex justify-between text-slate-300 text-xs">
                      <span>• {add.label}</span>
                      <span className="font-mono text-[#D4AF37]">+{formatIDR(add.price)}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-300 font-medium">Estimasi Harga per Unit:</span>
                <span className="text-lg font-bold text-white font-mono">
                  {formatIDR(calculation.unitPrice)}
                </span>
              </div>

              {/* 50% DP and 50% Balance split */}
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">DP 50% Saat Pesan:</span>
                  <span className="text-sm font-bold text-[#D4AF37] font-mono">
                    {formatIDR(dpEstimate)}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">Pelunasan 50% Saat Siap:</span>
                  <span className="text-sm font-bold text-slate-200 font-mono">
                    {formatIDR(balanceEstimate)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action CTA: Navigates to Standalone Checkout Page */}
          <div className="pt-6">
            <Link
              href={checkoutUrl}
              className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[#b48c28] hover:bg-[#9a751e] text-white font-bold text-base tracking-wide transition-all shadow-md active:scale-98 text-center cursor-pointer"
            >
              <span>Pesan Model Ini</span>
              <ArrowRight size={18} />
            </Link>

            <div className="mt-3 flex items-center justify-center gap-2 text-xs text-slate-500">
              <ShieldCheck size={14} className="text-[#b48c28]" />
              <span>Model yang dipilih otomatis diteruskan ke formulir checkout.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
