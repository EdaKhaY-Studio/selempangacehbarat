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
  Layers,
  HelpCircle,
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
  const [activeModelId, setActiveModelId] = useState<number>(() => initialModel?.id || models[0]?.id || 1);
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

  // Sync hanya saat parameter ?model di URL berubah dari luar (misal back/forward)
  const currentQueryModel = searchParams?.get("model");
  useEffect(() => {
    if (!currentQueryModel) return;
    const found = models.find(
      (m) =>
        m.slug === currentQueryModel ||
        m.shortName.toLowerCase().includes(currentQueryModel.toLowerCase())
    );
    if (found) {
      setActiveModelId(found.id);
      setPreviewImage(found.photos.main);
    }
  }, [currentQueryModel, models]);

  // Handler ganti model (seluruh model: biasa, syal, timbal_balik)
  const handleModelChange = (model: SashModelEntity) => {
    setActiveModelId(model.id);
    setSelectedAddonSlugs([]);
    setPreviewImage(model.photos.main);

    // Update query string di URL secara halus tanpa reload halaman
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("model", model.slug);
      window.history.replaceState({}, "", url.toString());
    }
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

    const draftItems: string[] = [];
    if (activeModel.status === "draft") {
      draftItems.push(`Model ${activeModel.nama}`);
    }
    for (const mo of matchedOptions) {
      if (mo.option.status === "draft") {
        draftItems.push(`Opsi ${mo.option.nama}`);
      }
    }
    const isDraft = draftItems.length > 0;

    return {
      isValid: true,
      error: undefined,
      basePrice,
      optionsTotal,
      unitPrice,
      totalPrice,
      breakdown,
      isDraft,
      draftItems,
    };
  }, [activeModel, groupedOptions, selectedAddonSlugs, quantity]);

  // WhatsApp consultation link menggunakan nomor resmi FHD (0822-9925-6343)
  const whatsappInquiry = useMemo(() => {
    const addonsList =
      calculation.breakdown && calculation.breakdown.length > 0
        ? calculation.breakdown.map((b) => b.name).join(", ")
        : "Tanpa tambahan (standar)";
    const totalStr = formatIDR(calculation.totalPrice);

    return encodeURIComponent(
      `Halo Butik Selempang Aceh Barat (FHD),\nsaya ingin konsultasi pemesanan custom selempang:\n\n` +
        `• Model: ${activeModel.nama}\n` +
        `• Opsi Terpilih: ${addonsList}\n` +
        `• Jumlah: ${quantity} pcs\n` +
        `• Estimasi Total: ${totalStr}\n\n` +
        `Mohon info ketersediaan slot pengerjaan dan konfirmasi pemesanan langsung. Terima kasih!`
    );
  }, [activeModel.nama, calculation.breakdown, calculation.totalPrice, quantity]);

  const whatsappUrl = `https://wa.me/6282299256343?text=${whatsappInquiry}`;

  const checkoutUrl = `/checkout/custom-selempang?productId=selempang-custom-1&slug=custom-selempang&model=${activeModel.slug}${
    selectedAddonSlugs.length > 0 ? `&addons=${selectedAddonSlugs.join(",")}` : ""
  }${quantity > 1 ? `&quantity=${quantity}` : ""}`;

  return (
    <div className="w-full">
      {/* 1. Jaminan Kualitas Butik FHD */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-amber-50/50 border border-amber-200/60 text-xs text-amber-950 shadow-2xs">
        <div className="flex items-center gap-2">
          <Sparkles size={15} className="text-[#b48c28] shrink-0" />
          <span className="font-semibold text-[#0f172a]">Kustomisasi Selempang Butik FHD</span>
          <span className="text-slate-400 hidden sm:inline">•</span>
          <span className="text-slate-600 hidden sm:inline">Pilihan model presisi, bahan bludru &amp; satin premium dua lapis</span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#b48c28]">
          <ShieldCheck size={14} className="text-[#b48c28]" />
          <span>Garansi 100% Bebas Typo Ganti Baru</span>
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
              isDraft={calculation.isDraft}
              draftItems={calculation.draftItems}
              whatsappUrl={whatsappUrl}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
