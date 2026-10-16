"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Check,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Info,
  Database,
  Layers,
  HelpCircle,
  AlertCircle,
} from "lucide-react";
import {
  getMockSashModels,
  getMockOptionsForModel,
  toggleOptionWithGroupLimits,
  SashModelEntity,
  ResolvedOption,
  GroupedResolvedOptions,
} from "@/lib/catalog/mock-sash-catalog";
import type { HydratedCatalogModel } from "@/lib/db/productModelsStore";
import { SashModelSelector } from "@/components/products/SashModelSelector";
import { SashOptionGroupList } from "@/components/products/SashOptionGroupList";
import { SashPriceSummary } from "@/components/products/SashPriceSummary";

function formatIDR(val: number): string {
  return "Rp" + val.toLocaleString("id-ID");
}

export interface CustomSashShowcaseProps {
  initialModels?: HydratedCatalogModel[];
}

export function CustomSashShowcase({ initialModels }: CustomSashShowcaseProps = {}) {
  const models: SashModelEntity[] = useMemo(() => {
    if (initialModels && initialModels.length > 0) {
      return initialModels;
    }
    return getMockSashModels();
  }, [initialModels]);

  const searchParams = useSearchParams();

  // Model awal berdasarkan query param ?model=
  const initialModel = useMemo(() => {
    const qModel = searchParams?.get("model");
    if (qModel) {
      const found = models.find(
        (m) =>
          m.slug === qModel ||
          m.shortName.toLowerCase().includes(qModel.toLowerCase())
      );
      if (found) return found;
    }
    return models[0];
  }, [models, searchParams]);

  // State: model yang aktif
  const [activeModelId, setActiveModelId] = useState<number>(initialModel?.id || 1);
  const activeModel: SashModelEntity =
    models.find((m) => m.id === activeModelId) || models[0];

  // Ambil opsi yang tersedia untuk model aktif lewat relasi database (model_options)
  const groupedOptions: GroupedResolvedOptions[] = useMemo(() => {
    if (initialModels && initialModels.length > 0) {
      const found = initialModels.find((m) => m.id === activeModel.id);
      if (found?.optionGroups && found.optionGroups.length > 0) {
        return found.optionGroups;
      }
    }
    return getMockOptionsForModel(activeModel.id);
  }, [initialModels, activeModel.id]);

  // State: opsi tambahan terpilih (menyimpan slug opsi)
  const [selectedAddonSlugs, setSelectedAddonSlugs] = useState<string[]>(() => {
    const qAddons = searchParams?.get("addons");
    if (!qAddons) return [];
    const requested = qAddons.split(",").map((s) => s.trim()).filter(Boolean);
    const validSlugs = new Set<string>();
    groupedOptions.forEach((g) => g.options.forEach((o) => validSlugs.add(o.option.slug)));
    return requested.filter((slug) => validSlugs.has(slug));
  });

  // State: jumlah kuantitas pesanan
  const [quantity, setQuantity] = useState<number>(() => {
    const qQty = parseInt(searchParams?.get("quantity") || "1", 10);
    return isNaN(qQty) || qQty < 1 ? 1 : Math.min(qQty, 500);
  });

  // State: gambar pratinjau utama
  const [previewImage, setPreviewImage] = useState<string>(activeModel.photos.main);

  // Sync saat initialModel berubah lewat query param
  useEffect(() => {
    if (initialModel && initialModel.id !== activeModelId) {
      setActiveModelId(initialModel.id);
      setPreviewImage(initialModel.photos.main);
    }
  }, [initialModel, activeModelId]);

  // Handler ganti model
  const handleModelChange = (model: SashModelEntity) => {
    setActiveModelId(model.id);
    setSelectedAddonSlugs([]);
    setPreviewImage(model.photos.main);
  };

  // Handler toggle opsi tambahan dengan penegakan aturan batas grup (maks_pilih)
  const handleToggleOption = (resolved: ResolvedOption) => {
    const result = toggleOptionWithGroupLimits(
      selectedAddonSlugs,
      resolved,
      groupedOptions
    );
    setSelectedAddonSlugs(result.newSelectedSlugs);
  };

  // Kalkulasi harga realtime menggunakan opsi yang dibaca dari MySQL
  const calculation = useMemo(() => {
    const safeQty = Math.max(1, Math.floor(quantity || 1));
    const allResolvedOptions: ResolvedOption[] = [];
    groupedOptions.forEach((g) => allResolvedOptions.push(...g.options));

    const matchedOptions: ResolvedOption[] = [];
    for (const slug of selectedAddonSlugs) {
      const found = allResolvedOptions.find(
        (ro) =>
          ro.option.slug === slug ||
          ro.option.id.toString() === slug
      );
      if (found && !matchedOptions.some((m) => m.option.id === found.option.id)) {
        matchedOptions.push(found);
      }
    }

    // Validasi batas per grup (max_pilih) dinamis
    for (const grp of groupedOptions) {
      if (grp.group.max_pilih !== null && grp.group.max_pilih > 0) {
        const countInGroup = matchedOptions.filter(
          (mo) => mo.group.id === grp.group.id
        ).length;
        if (countInGroup > grp.group.max_pilih) {
          return {
            isValid: false,
            error: `Grup ${grp.group.nama_grup} dibatasi maksimal ${grp.group.max_pilih} pilihan.`,
            basePrice: activeModel.harga_dasar,
            optionsTotal: 0,
            unitPrice: activeModel.harga_dasar,
            totalPrice: activeModel.harga_dasar * safeQty,
            breakdown: [],
          };
        }
      }
    }

    const basePrice = Number(activeModel.harga_dasar);
    const optionsTotal = matchedOptions.reduce(
      (sum, item) => sum + item.effectivePrice,
      0
    );
    const unitPrice = basePrice + optionsTotal;
    const totalPrice = unitPrice * safeQty;

    const breakdown = matchedOptions.map((mo) => ({
      name: mo.option.nama,
      group: mo.group.nama_grup,
      price: mo.effectivePrice,
    }));

    return {
      isValid: true,
      error: undefined,
      basePrice,
      optionsTotal,
      unitPrice,
      totalPrice,
      breakdown,
    };
  }, [activeModel, groupedOptions, selectedAddonSlugs, quantity]);

  const checkoutUrl = `/checkout/custom-selempang?productId=selempang-custom-1&slug=custom-selempang&model=${activeModel.slug}${
    selectedAddonSlugs.length > 0 ? `&addons=${selectedAddonSlugs.join(",")}` : ""
  }${quantity > 1 ? `&quantity=${quantity}` : ""}`;

  return (
    <div className="w-full">
      {/* 1. Database Badge Notification */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 px-4 py-3 rounded-xl bg-slate-900 text-slate-200 border border-slate-800 text-xs shadow-xs">
        <div className="flex items-center gap-2.5">
          <Database size={16} className="text-[#b48c28]" />
          <div>
            <div className="font-semibold text-white flex items-center gap-2">
              <span>Katalog MySQL Hostinger Terhubung</span>
              <span className="hidden sm:inline px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300 font-mono">
                u911912137_Selempag4ceh
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Model, grup opsi, dan harga dibaca dari database katalog terpisah tanpa mengganggu sistem pesanan.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-500/15 text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
            <AlertCircle size={12} className="text-amber-400" />
            Status: Draft Peninjauan
          </span>
        </div>
      </div>

      {/* 2. Model Selector (Nama Lengkap Resmi, Bukan A/B/C) */}
      <SashModelSelector
        models={models}
        selectedModelId={activeModel.id}
        onSelectModel={handleModelChange}
        className="mb-8"
      />

      {/* 3. Main Grid: Showcase & Add-ons */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column: Photo & Specifications (5 cols on lg) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Main Photo Card */}
          <div className="relative aspect-4/5 w-full rounded-2xl overflow-hidden bg-[#f8fafc] border border-slate-200/90 shadow-sm flex items-center justify-center">
            <Image
              src={previewImage}
              alt={activeModel.photos.caption}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-contain p-2 transition-all duration-300"
            />
            <div className="absolute top-4 left-4 bg-[#0f172a]/90 backdrop-blur-xs text-white px-3 py-1 rounded-lg text-xs font-semibold shadow-xs">
              Foto Asli Produk FHD
            </div>
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 text-white text-xs">
              {activeModel.photos.caption}
            </div>
          </div>

          {/* Thumbnail Gallery */}
          <div className="flex items-center gap-3 overflow-x-auto pb-1">
            {activeModel.photos.gallery.map((imgSrc, idx) => (
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
              Spesifikasi Resmi:
            </div>
            {activeModel.features.map((feat, fIdx) => (
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
                Model Terpilih: {activeModel.nama}
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0f172a] mb-2">
                {activeModel.nama}
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {activeModel.deskripsi}
              </p>
            </div>

            {/* Base Price & Addon Notice */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs text-slate-500 block">Harga Dasar Model:</span>
                <span className="text-2xl font-bold text-[#0f172a]">
                  {formatIDR(activeModel.harga_dasar)}
                </span>
                <span className="text-xs text-slate-500 ml-1">/ unit</span>
              </div>
              <div className="text-xs text-slate-500 sm:text-right max-w-xs">
                <span className="text-[#b48c28] font-medium flex items-center sm:justify-end gap-1">
                  <Info size={13} />
                  Pilihan opsi tambahan di bawah diakumulasi otomatis ke total harga.
                </span>
              </div>
            </div>

            {/* Dynamic Option Groups Rendered via Database Relations */}
            <SashOptionGroupList
              groupedOptions={groupedOptions}
              selectedOptionSlugs={selectedAddonSlugs}
              onToggleOption={handleToggleOption}
              modelName={activeModel.nama}
            />

            {/* Price Estimation Summary & Action CTA */}
            <SashPriceSummary
              modelName={activeModel.nama}
              basePrice={activeModel.harga_dasar}
              breakdown={calculation.breakdown || []}
              unitPrice={calculation.unitPrice}
              totalPrice={calculation.totalPrice}
              quantity={quantity}
              onQuantityChange={setQuantity}
              isValid={calculation.isValid}
              error={calculation.error}
              checkoutUrl={checkoutUrl}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
