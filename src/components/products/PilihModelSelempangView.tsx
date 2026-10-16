"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Check,
  ArrowRight,
  ShieldCheck,
  Tag,
  Layers,
  ChevronRight,
  Sliders,
  Award,
  Scissors,
  CheckCircle2,
  Info,
} from "lucide-react";
import {
  getMockSashModels,
  getMockOptionsForModel,
  SashModelEntity,
} from "@/lib/catalog/mock-sash-catalog";

function formatIDR(val: number): string {
  return "Rp" + val.toLocaleString("id-ID");
}

export function PilihModelSelempangView() {
  const models = useMemo(() => getMockSashModels(), []);
  const [selectedModelId, setSelectedModelId] = useState<number>(models[0]?.id || 1);

  const selectedModel =
    models.find((m) => m.id === selectedModelId) || models[0];

  const modelOptions = useMemo(() => {
    return getMockOptionsForModel(selectedModel.id);
  }, [selectedModel.id]);

  const customizeUrl = `/produk/custom-selempang?model=${selectedModel.slug}`;
  const checkoutDirectUrl = `/checkout/custom-selempang?productId=selempang-custom-1&slug=custom-selempang&model=${selectedModel.slug}`;

  return (
    <div className="space-y-10">
      {/* 1. Model Selector Cards (3 Columns) */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#0f172a]">
              Pilih Model Potongan Resmi
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Pilih satu dari 3 model resmi kami (nama lengkap butik, tanpa kode singkatan A/B/C)
            </p>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-[#b48c28] text-xs font-semibold">
            <Sparkles size={13} />
            <span>3 Model Standar Butik FHD</span>
          </div>
        </div>

        <div
          role="radiogroup"
          aria-label="Pilihan Model Selempang"
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {models.map((model) => {
            const isSelected = model.id === selectedModelId;
            return (
              <div
                key={model.id}
                role="radio"
                aria-checked={isSelected}
                tabIndex={0}
                onClick={() => setSelectedModelId(model.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedModelId(model.id);
                  }
                }}
                className={`relative flex flex-col justify-between rounded-2xl border-2 p-5 cursor-pointer transition-all duration-200 select-none outline-hidden ${
                  isSelected
                    ? "bg-white border-[#b48c28] shadow-lg ring-2 ring-[#b48c28]/20 scale-[1.01]"
                    : "bg-white/90 border-slate-200 hover:border-slate-300 hover:bg-white text-slate-700 shadow-sm"
                }`}
              >
                {/* Active Top Stripe */}
                {isSelected && (
                  <div className="absolute top-0 inset-x-0 h-1.5 bg-[#b48c28] rounded-t-2xl" />
                )}

                <div>
                  {/* Badge & Check Icon */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                        isSelected
                          ? "bg-amber-100 text-[#b48c28]"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      <Tag size={11} />
                      {model.shortName}
                    </span>

                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                        isSelected
                          ? "bg-[#b48c28] text-white shadow-xs"
                          : "border border-slate-300 bg-white"
                      }`}
                    >
                      {isSelected ? (
                        <Check size={14} strokeWidth={3} />
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-slate-200" />
                      )}
                    </div>
                  </div>

                  {/* Image Card */}
                  <div className="relative aspect-4/3 w-full rounded-xl overflow-hidden bg-slate-50 border border-slate-100 mb-4">
                    <Image
                      src={model.photos.main}
                      alt={model.nama}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute bottom-2 left-2 bg-[#0f172a]/80 backdrop-blur-xs text-white text-[10px] px-2 py-0.5 rounded font-medium">
                      Foto Asli FHD
                    </div>
                  </div>

                  {/* Model Official Title */}
                  <h3 className="font-serif font-bold text-base text-[#0f172a] mb-2 leading-snug">
                    {model.nama}
                  </h3>

                  {/* Model Description */}
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                    {model.deskripsi}
                  </p>

                  {/* Bullet features */}
                  <ul className="space-y-1.5 text-xs text-slate-700 mb-5">
                    {model.features.slice(0, 3).map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <Check size={13} className="text-[#b48c28] mt-0.5 shrink-0" />
                        <span className="line-clamp-1">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer Pricing & Quick Button */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase tracking-wider font-semibold">
                      Harga Dasar
                    </span>
                    <span className="text-lg font-bold text-[#0f172a] font-mono">
                      {formatIDR(model.harga_dasar)}
                    </span>
                  </div>

                  <span
                    className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
                      isSelected
                        ? "bg-[#b48c28] text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {isSelected ? "Terpilih" : "Pilih"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Detailed Focus on Selected Model */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Preview Image */}
          <div className="lg:col-span-5 relative aspect-square sm:aspect-4/3 rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 shadow-inner">
            <Image
              src={selectedModel.photos.main}
              alt={selectedModel.nama}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-contain p-3"
            />
            <div className="absolute top-3 left-3 bg-[#0f172a]/90 text-white text-xs px-2.5 py-1 rounded-md font-semibold">
              {selectedModel.shortName}
            </div>
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 text-white text-xs">
              {selectedModel.photos.caption}
            </div>
          </div>

          {/* Right Detailed Specs & Options Preview */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-[#b48c28] text-xs font-bold uppercase tracking-wider mb-2">
                <Scissors size={12} />
                <span>Model Aktif Terpilih</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#0f172a]">
                {selectedModel.nama}
              </h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                {selectedModel.deskripsi}
              </p>
            </div>

            {/* Price Box */}
            <div className="flex items-baseline gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-xs text-slate-500 font-medium">Tarif Mulai Dari:</span>
              <span className="text-2xl font-bold font-mono text-[#0f172a]">
                {formatIDR(selectedModel.harga_dasar)}
              </span>
              <span className="text-xs text-slate-400">/ lembar</span>
              {selectedModel.slug === "timbal_balik" && (
                <span className="ml-auto text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Flat All-Inclusive
                </span>
              )}
            </div>

            {/* Available Option Groups via Database Relations */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5 flex items-center gap-1.5">
                <Sliders size={13} className="text-[#b48c28]" />
                <span>Opsi Dekorasi yang Didukung Model Ini:</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {modelOptions.map((item) => (
                  <div
                    key={item.group.id}
                    className="p-3 rounded-xl bg-white border border-slate-200 text-xs shadow-2xs"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-[#0f172a]">{item.group.nama_grup}</span>
                      <span className="text-[10px] text-slate-400">
                        {item.group.max_pilih === 1 ? "Maks 1 opsi" : "Bebas pilih"}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 line-clamp-1">
                      {item.options.map((o) => o.option.nama).join(", ")}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <Link
                href={customizeUrl}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#b48c28] hover:bg-[#9a7620] text-white text-sm font-bold shadow-md hover:shadow-lg transition-all"
              >
                <span>Kustomisasi Model Ini</span>
                <ArrowRight size={16} />
              </Link>
              <Link
                href={checkoutDirectUrl}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 text-sm font-semibold shadow-xs transition-colors"
              >
                <span>Langsung Formulir Checkout</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Comparison Matrix Table */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm overflow-hidden">
        <h3 className="text-lg font-serif font-bold text-[#0f172a] mb-2 flex items-center gap-2">
          <Layers size={18} className="text-[#b48c28]" />
          <span>Tabel Perbandingan 3 Model Selempang Resmi</span>
        </h3>
        <p className="text-xs text-slate-500 mb-6">
          Rangkuman spesifikasi model untuk memudahkan penyesuaian dengan kebutuhan acara Anda
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="py-3 px-4 font-bold text-slate-700">Fitur &amp; Karakteristik</th>
                {models.map((m) => (
                  <th
                    key={m.id}
                    className={`py-3 px-4 font-bold ${
                      m.id === selectedModelId ? "text-[#b48c28] bg-amber-50/50" : "text-slate-800"
                    }`}
                  >
                    {m.shortName}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-3 px-4 font-medium text-slate-500">Harga Dasar</td>
                {models.map((m) => (
                  <td key={m.id} className="py-3 px-4 font-mono font-bold text-slate-900">
                    {formatIDR(m.harga_dasar)}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-slate-500">Gaya Pemakaian</td>
                <td className="py-3 px-4 text-slate-700">Menyamping (Bahu kanan ke pinggul)</td>
                <td className="py-3 px-4 text-slate-700">Melingkar leher V-neck simetris</td>
                <td className="py-3 px-4 text-slate-700">Dua sisi bolak-balik serbaguna</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-slate-500">Pilihan Bahan Kain</td>
                <td className="py-3 px-4 text-slate-700">Bludru 2 lapis tebal / Satin kilap</td>
                <td className="py-3 px-4 text-slate-700">Bludru 2 lapis tebal / Satin kilap</td>
                <td className="py-3 px-4 text-slate-700">Bludru ganda 2 lapis luar-dalam</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-slate-500">Kombinasi Renda / Rumbai</td>
                <td className="py-3 px-4 text-slate-700">Didukung (Renda biasa, mahkota, Marsyanda)</td>
                <td className="py-3 px-4 text-slate-700">Didukung (Renda syal &amp; rumbai ujung)</td>
                <td className="py-3 px-4 text-slate-700">All-Inclusive (Bebas pilih varian renda)</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-slate-500">Jumlah Sisi Bordir</td>
                <td className="py-3 px-4 text-slate-700">1 Sisi</td>
                <td className="py-3 px-4 text-slate-700">2 Sayap (Kiri &amp; Kanan)</td>
                <td className="py-3 px-4 text-slate-700">4 Bidang Bordir (Depan &amp; Belakang)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
