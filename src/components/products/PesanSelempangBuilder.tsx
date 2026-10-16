"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Sparkles,
  Check,
  Info,
  ShieldCheck,
  Layers,
  ArrowRight,
  Database,
  Type,
  Palette,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import {
  getMockSashModels,
  getMockOptionsForModel,
  toggleOptionWithGroupLimits,
  calculateMockSashPrice,
  SashModelEntity,
  ResolvedOption,
} from "@/lib/catalog/mock-sash-catalog";
import { SashModelSelector } from "./SashModelSelector";
import { SashOptionGroupList } from "./SashOptionGroupList";
import { SashPriceSummary } from "./SashPriceSummary";

const CLOTH_MATERIALS = [
  {
    id: "bludru",
    name: "Kain Bludru Beludru Tebal (2 Lapis)",
    desc: "Tekstur lembut berbulu halus, tebal, tidak tembus pandang, dan sangat elegan untuk wisuda.",
    badge: "Paling Populer",
  },
  {
    id: "satin",
    name: "Kain Satin Kilap Mewah",
    desc: "Permukaan halus berkilau memantulkan cahaya panggung, ringan, dan anggun.",
    badge: "Eksklusif",
  },
];

const CLOTH_COLORS = [
  { name: "Hitam", hex: "#0f172a" },
  { name: "Maron", hex: "#7f1d1d" },
  { name: "Navy", hex: "#1e3a8a" },
  { name: "Hijau Botol", hex: "#14532d" },
  { name: "Ungu", hex: "#581c87" },
  { name: "Merah", hex: "#b91c1c" },
  { name: "Pink", hex: "#db2777" },
  { name: "Putih", hex: "#f8fafc" },
];

const THREAD_COLORS = [
  { name: "Gold (Benang Emas Metalik)", hex: "#D4AF37" },
  { name: "Silver (Benang Perak Metalik)", hex: "#C0C0C0" },
  { name: "Putih Bersih", hex: "#FFFFFF" },
];

function formatIDR(val: number): string {
  return "Rp" + val.toLocaleString("id-ID");
}

export function PesanSelempangBuilder() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const models = useMemo(() => getMockSashModels(), []);

  const initialModel = useMemo(() => {
    const qModel = searchParams?.get("model");
    if (qModel) {
      const found = models.find((m) => m.slug === qModel || m.shortName.toLowerCase().includes(qModel.toLowerCase()));
      if (found) return found;
    }
    return models[0];
  }, [models, searchParams]);

  // Selected State
  const [activeModelId, setActiveModelId] = useState<number>(initialModel?.id || 1);
  const activeModel = models.find((m) => m.id === activeModelId) || models[0];

  const [selectedMaterial, setSelectedMaterial] = useState<string>(CLOTH_MATERIALS[0].name);
  const [selectedClothColor, setSelectedClothColor] = useState<string>(CLOTH_COLORS[0].name);
  const [selectedThreadColor, setSelectedThreadColor] = useState<string>(THREAD_COLORS[0].name);
  const [customText, setCustomText] = useState<string>("");
  const [designNotes, setDesignNotes] = useState<string>("");

  // Grouped options for active model
  const groupedOptions = useMemo(() => {
    return getMockOptionsForModel(activeModel.id);
  }, [activeModel.id]);

  const [selectedAddonSlugs, setSelectedAddonSlugs] = useState<string[]>(() => {
    const qAddons = searchParams?.get("addons");
    if (!qAddons) return [];
    const requested = qAddons.split(",").map((s) => s.trim()).filter(Boolean);
    const validSlugs = new Set<string>();
    groupedOptions.forEach((g) => g.options.forEach((o) => validSlugs.add(o.option.slug)));
    return requested.filter((slug) => validSlugs.has(slug));
  });

  const [quantity, setQuantity] = useState<number>(() => {
    const qQty = parseInt(searchParams?.get("quantity") || "1", 10);
    return isNaN(qQty) || qQty < 1 ? 1 : Math.min(qQty, 500);
  });

  const [previewImage, setPreviewImage] = useState<string>(activeModel.photos.main);
  const [validationNotice, setValidationNotice] = useState<string | null>(null);

  // Sync saat initialModel berubah via query param
  useEffect(() => {
    if (initialModel && initialModel.id !== activeModelId) {
      setActiveModelId(initialModel.id);
      setPreviewImage(initialModel.photos.main);
    }
  }, [initialModel]);

  // Model change handler (Reset pilihan opsi saat model diganti)
  const handleModelChange = (model: SashModelEntity) => {
    setActiveModelId(model.id);
    setPreviewImage(model.photos.main);
    setSelectedAddonSlugs([]);
    setValidationNotice(
      `Model diubah ke "${model.nama}". Pilihan opsi tambahan di-reset agar sesuai spesifikasi model baru.`
    );
  };

  // Option toggle handler enforcing group limits
  const handleToggleOption = (resolved: ResolvedOption) => {
    const result = toggleOptionWithGroupLimits(
      selectedAddonSlugs,
      resolved,
      groupedOptions
    );
    setSelectedAddonSlugs(result.newSelectedSlugs);

    if (result.swappedFrom) {
      const oldOpt = groupedOptions
        .flatMap((g) => g.options)
        .find((o) => o.option.slug === result.swappedFrom);
      setValidationNotice(
        `Aturan batas ${resolved.group.nama_grup}: Pilihan "${oldOpt?.option.nama || result.swappedFrom}" dialihkan ke "${resolved.option.nama}".`
      );
    }
  };

  // Live calculation from server-mock engine
  const calculation = useMemo(() => {
    return calculateMockSashPrice(activeModel.id, selectedAddonSlugs, quantity);
  }, [activeModel.id, selectedAddonSlugs, quantity]);

  // Checkout redirect URL
  const checkoutUrl = `/checkout/custom-selempang?productId=selempang-custom-1&slug=custom-selempang&model=${activeModel.slug}${
    selectedAddonSlugs.length > 0 ? `&addons=${selectedAddonSlugs.join(",")}` : ""
  }&material=${encodeURIComponent(selectedMaterial)}&clothColor=${encodeURIComponent(
    selectedClothColor
  )}&threadColor=${encodeURIComponent(selectedThreadColor)}${
    customText.trim() ? `&text=${encodeURIComponent(customText.trim())}` : ""
  }${quantity > 1 ? `&quantity=${quantity}` : ""}`;

  return (
    <div className="space-y-10">
      {/* 1. Model Selector Header */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="w-6 h-6 rounded-full bg-[#b48c28] text-white text-xs font-bold flex items-center justify-center">
            1
          </span>
          <h2 className="text-lg sm:text-xl font-bold font-serif text-[#0f172a]">
            Pilih Model Selempang Resmi (Nama Lengkap)
          </h2>
        </div>
        <SashModelSelector
          models={models}
          selectedModelId={activeModel.id}
          onSelectModel={handleModelChange}
        />
      </div>

      {/* 2. Main Builder Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        {/* Left Column: Visual Showcase & Specifications (5 cols on lg) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Main Photo Card */}
          <div className="relative aspect-4/5 w-full rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm flex items-center justify-center">
            <Image
              src={previewImage}
              alt={activeModel.photos.caption}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-contain p-2"
            />
            <div className="absolute top-4 left-4 bg-[#0f172a]/90 backdrop-blur-xs text-white px-3 py-1 rounded-lg text-xs font-semibold shadow-xs">
              Foto Asli FHD Meulaboh
            </div>
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-4 text-white text-xs">
              <span className="font-semibold block text-sm mb-0.5">{activeModel.nama}</span>
              <span className="text-slate-300 font-light">{activeModel.photos.caption}</span>
            </div>
          </div>

          {/* Thumbnail Gallery */}
          <div className="flex items-center gap-2.5 overflow-x-auto pb-1">
            {activeModel.photos.gallery.map((imgSrc, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setPreviewImage(imgSrc)}
                className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                  previewImage === imgSrc
                    ? "border-[#b48c28] ring-2 ring-[#b48c28]/40 shadow-xs"
                    : "border-slate-200 opacity-75 hover:opacity-100"
                }`}
              >
                <Image
                  src={imgSrc}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>

          {/* Guarantee & Specs */}
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-950 space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-[#b48c28] uppercase tracking-wider">
              <ShieldCheck size={15} />
              <span>Garansi Kualitas FHD:</span>
            </div>
            <p className="leading-relaxed">
              100% garansi anti-typo. Jika terdapat kekeliruan penulisan nama atau gelar dari pihak kami, selempang akan diganti baru tanpa biaya tambahan.
            </p>
          </div>
        </div>

        {/* Right Column: Customization Controls & Calculator (7 cols on lg) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Step 2: Bahan Kain */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#b48c28] text-white text-xs font-bold flex items-center justify-center">
                2
              </span>
              <h3 className="text-base font-bold text-[#0f172a]">
                Pilih Bahan Kain Utama
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CLOTH_MATERIALS.map((mat) => {
                const isSelected = selectedMaterial === mat.name;
                return (
                  <div
                    key={mat.id}
                    onClick={() => setSelectedMaterial(mat.name)}
                    className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all select-none ${
                      isSelected
                        ? "border-[#b48c28] bg-amber-50/60 ring-1 ring-[#b48c28]"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-xs font-bold text-[#0f172a]">
                        {mat.name}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-[#b48c28]/10 text-[#b48c28]">
                        {mat.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-light leading-relaxed">
                      {mat.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 3: Pilihan Warna Kain & Benang */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#b48c28] text-white text-xs font-bold flex items-center justify-center">
                3
              </span>
              <h3 className="text-base font-bold text-[#0f172a]">
                Warna Kain &amp; Benang Bordir
              </h3>
            </div>

            {/* Cloth Color Grid */}
            <div>
              <span className="text-xs text-slate-500 block mb-2 font-medium">
                Warna Dasar Kain: <strong className="text-[#0f172a]">{selectedClothColor}</strong>
              </span>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {CLOTH_COLORS.map((c) => {
                  const isSelected = selectedClothColor === c.name;
                  return (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setSelectedClothColor(c.name)}
                      className={`flex flex-col items-center gap-1 p-2 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? "border-[#b48c28] bg-amber-50/50 shadow-xs"
                          : "border-slate-200 bg-white hover:border-slate-300"
                      }`}
                    >
                      <span
                        className="w-5 h-5 rounded-full border border-slate-300 shadow-xs shrink-0"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span className="text-[10px] font-medium text-slate-700 truncate max-w-full">
                        {c.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Thread Color */}
            <div>
              <span className="text-xs text-slate-500 block mb-2 font-medium">
                Warna Benang Bordir: <strong className="text-[#0f172a]">{selectedThreadColor}</strong>
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {THREAD_COLORS.map((tc) => {
                  const isSelected = selectedThreadColor === tc.name;
                  return (
                    <button
                      key={tc.name}
                      type="button"
                      onClick={() => setSelectedThreadColor(tc.name)}
                      className={`flex items-center gap-2 p-2.5 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? "border-[#b48c28] bg-amber-50/50 shadow-xs"
                          : "border-slate-200 bg-white hover:border-slate-300"
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full border border-slate-300 shadow-xs shrink-0"
                        style={{ backgroundColor: tc.hex }}
                      />
                      <span className="text-xs font-semibold text-[#0f172a] truncate">
                        {tc.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Step 4: Opsi Tambahan Dinamis & Aturan Grup */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#b48c28] text-white text-xs font-bold flex items-center justify-center">
                  4
                </span>
                <h3 className="text-base font-bold text-[#0f172a]">
                  Kustomisasi Dekorasi &amp; Opsi Tambahan
                </h3>
              </div>
              <span className="text-xs text-[#b48c28] font-bold">
                Otomatis Sesuai Model
              </span>
            </div>

            {/* Live Feedback Validation Message */}
            {validationNotice && (
              <div className="flex items-center justify-between p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs shadow-xs animate-in fade-in duration-200">
                <div className="flex items-center gap-2">
                  <AlertCircle size={15} className="text-[#b48c28] shrink-0" />
                  <span>{validationNotice}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setValidationNotice(null)}
                  className="text-amber-800 hover:text-amber-950 text-xs font-bold px-1.5 py-0.5 rounded-sm cursor-pointer"
                >
                  ✕
                </button>
              </div>
            )}

            <SashOptionGroupList
              groupedOptions={groupedOptions}
              selectedOptionSlugs={selectedAddonSlugs}
              onToggleOption={handleToggleOption}
              modelName={activeModel.nama}
            />
          </div>

          {/* Step 5: Input Tulisan Nama & Gelar */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#b48c28] text-white text-xs font-bold flex items-center justify-center">
                5
              </span>
              <h3 className="text-base font-bold text-[#0f172a]">
                Tulisan Nama &amp; Gelar Bordir
              </h3>
            </div>
            <div className="space-y-2">
              <input
                type="text"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder="Contoh: Teuku Zulkarnain, S.Kom., M.T."
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 focus:border-[#b48c28] focus:ring-1 focus:ring-[#b48c28] text-xs sm:text-sm text-[#0f172a] transition-all outline-hidden"
              />
              <span className="text-[11px] text-slate-500 font-light block">
                Tuliskan nama lengkap beserta tanda baca titik, koma, dan gelar akademik secara teliti.
              </span>
            </div>
          </div>

          {/* Step 6: Server-side Pricing Estimation Summary */}
          <div className="pt-2">
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
