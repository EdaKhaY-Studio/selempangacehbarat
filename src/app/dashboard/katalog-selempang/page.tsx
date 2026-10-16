"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Layers,
  Sparkles,
  Database,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Tag,
  AlertCircle,
  ArrowRight,
  Info,
  Check,
  RefreshCw,
} from "lucide-react";
import {
  getMockSashModels,
  MOCK_OPTION_GROUPS,
  MOCK_CUSTOM_OPTIONS,
  MOCK_MODEL_OPTIONS,
  getMockOptionsForModel,
  OptionGroupEntity,
  CustomOptionEntity,
} from "@/lib/catalog/mock-sash-catalog";

function formatIDR(val: number): string {
  return "Rp" + val.toLocaleString("id-ID");
}

export default function DashboardKatalogSelempangPage() {
  const models = getMockSashModels();
  const optionGroups: OptionGroupEntity[] = MOCK_OPTION_GROUPS;
  const customOptions: CustomOptionEntity[] = MOCK_CUSTOM_OPTIONS;
  const relations = MOCK_MODEL_OPTIONS;

  const [activeModelTab, setActiveModelTab] = useState<number>(models[0]?.id || 1);
  const activeModel = models.find((m) => m.id === activeModelTab) || models[0];
  const activeModelOptions = getMockOptionsForModel(activeModel.id);

  return (
    <div className="space-y-8 text-slate-200">
      {/* 1. Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#242938]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#D4AF37]/10 text-[#FDE68A] border border-[#D4AF37]/30">
              Fase 2: Isi Data Katalog
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-300 border border-amber-500/30">
              Mode Draft Aman
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Katalog Model &amp; Opsi Selempang Dinamis
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-light mt-1">
            Data model selempang, aturan batas grup, dan relasi opsi kustom yang bersumber dari skema database relasional (data tiruan draft).
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <Link
            href="/katalog-selempang"
            target="_blank"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#141721] hover:bg-[#1E2230] text-slate-200 border border-[#242938] text-xs font-semibold transition-all shadow-xs"
          >
            <span>Pratinjau Publik</span>
            <ExternalLink size={13} className="text-[#D4AF37]" />
          </Link>
          <Link
            href="/produk/custom-selempang"
            target="_blank"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#c29e2e] text-[#090A0F] text-xs font-bold transition-all shadow-xs"
          >
            <span>Buka Showcase Pelanggan</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>

      {/* 2. Stat Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-[#141721] border border-[#242938] shadow-xs">
          <span className="text-[11px] text-slate-400 block font-medium">Model Selempang:</span>
          <div className="text-2xl font-bold font-mono text-white mt-1">
            {models.length} <span className="text-xs text-slate-400 font-sans font-normal">Model</span>
          </div>
          <span className="text-[10px] text-emerald-400 mt-1 inline-block">Nama Lengkap Resmi</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#141721] border border-[#242938] shadow-xs">
          <span className="text-[11px] text-slate-400 block font-medium">Grup Aturan Opsi:</span>
          <div className="text-2xl font-bold font-mono text-white mt-1">
            {optionGroups.length} <span className="text-xs text-slate-400 font-sans font-normal">Grup</span>
          </div>
          <span className="text-[10px] text-[#FDE68A] mt-1 inline-block">Termasuk Renda Eksklusif (1)</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#141721] border border-[#242938] shadow-xs">
          <span className="text-[11px] text-slate-400 block font-medium">Total Opsi Kustom:</span>
          <div className="text-2xl font-bold font-mono text-white mt-1">
            {customOptions.length} <span className="text-xs text-slate-400 font-sans font-normal">Pilihan</span>
          </div>
          <span className="text-[10px] text-slate-400 mt-1 inline-block">Status: Draft Terverifikasi</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#141721] border border-[#242938] shadow-xs">
          <span className="text-[11px] text-slate-400 block font-medium">Relasi Model ↔ Opsi:</span>
          <div className="text-2xl font-bold font-mono text-[#D4AF37] mt-1">
            {relations.length} <span className="text-xs text-slate-400 font-sans font-normal">Koneksi</span>
          </div>
          <span className="text-[10px] text-emerald-400 mt-1 inline-block">5 Opsi Leher Bersama</span>
        </div>
      </div>

      {/* 3. Models Showcase Tabs */}
      <div className="p-5 rounded-2xl bg-[#141721] border border-[#242938] shadow-xs space-y-5">
        <div className="flex items-center justify-between border-b border-[#242938] pb-3">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-[#D4AF37]" />
            <h2 className="text-base font-bold text-white">
              Daftar Model Selempang Resmi (sc_product_models)
            </h2>
          </div>
          <span className="text-xs text-slate-400">
            Daftar ditampilkan dengan nama lengkap (bukan kode A/B/C)
          </span>
        </div>

        {/* Model Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {models.map((m) => {
            const isActive = m.id === activeModel.id;
            return (
              <button
                key={m.id}
                onClick={() => setActiveModelTab(m.id)}
                className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#1E2230] border-[#D4AF37] ring-1 ring-[#D4AF37]/50 shadow-sm"
                    : "bg-[#0F1117] border-[#242938] hover:border-slate-700 text-slate-300"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#FDE68A] bg-[#D4AF37]/10 px-2 py-0.5 rounded-full border border-[#D4AF37]/20">
                    {m.shortName}
                  </span>
                  <span className="text-xs font-mono font-bold text-white">
                    {formatIDR(m.harga_dasar)}
                  </span>
                </div>
                <div className="font-serif font-bold text-sm text-white line-clamp-1">
                  {m.nama}
                </div>
                <div className="text-[11px] text-slate-400 line-clamp-2 mt-1 font-light">
                  {m.deskripsi}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Model Deep Dive */}
        <div className="p-4 rounded-xl bg-[#0F1117] border border-[#242938] grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-4 relative aspect-4/3 rounded-xl overflow-hidden bg-slate-900 border border-[#242938]">
            <Image
              src={activeModel.photos.main}
              alt={activeModel.nama}
              fill
              className="object-cover"
            />
            <div className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold bg-black/70 text-[#FDE68A] border border-[#242938]">
              Foto Asli Butik
            </div>
          </div>

          <div className="lg:col-span-8 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-serif font-bold text-white">
                  {activeModel.nama}
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  Status: {activeModel.status}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-light mb-3">
                {activeModel.deskripsi}
              </p>

              <div className="space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#D4AF37] block">
                  Fitur &amp; Keunggulan Resmi:
                </span>
                {activeModel.features.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-300">
                    <Check size={12} className="text-[#D4AF37] mt-0.5 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-[#242938] flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="text-slate-400">
                Opsi Terhubung: <strong className="text-white font-mono">{activeModelOptions.flatMap((g) => g.options).length} Opsi</strong> dalam {activeModelOptions.length} Grup
              </span>
              <span className="text-[#D4AF37] font-semibold">
                Harga Dasar: {formatIDR(activeModel.harga_dasar)} / unit
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Option Groups & Custom Options Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Option Groups (sc_option_groups) */}
        <div className="p-5 rounded-2xl bg-[#141721] border border-[#242938] shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#242938] pb-3">
            <div className="flex items-center gap-2">
              <Layers size={16} className="text-[#D4AF37]" />
              <h2 className="text-base font-bold text-white">
                Aturan Grup Opsi (sc_option_groups)
              </h2>
            </div>
            <span className="text-[11px] text-slate-400">Batas maks_pilih</span>
          </div>

          <div className="space-y-3">
            {optionGroups.map((grp) => (
              <div
                key={grp.id}
                className="p-3.5 rounded-xl bg-[#0F1117] border border-[#242938] flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-white">
                      {grp.nama_grup}
                    </span>
                    <span className="font-mono text-[10px] text-slate-500">
                      [{grp.slug}]
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-light">
                    {grp.deskripsi}
                  </p>
                </div>

                <div className="text-right shrink-0 ml-3">
                  {grp.max_pilih === 1 ? (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30 block">
                      Maks. 1 Pilihan
                    </span>
                  ) : grp.max_pilih !== null ? (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30 block">
                      Maks. {grp.max_pilih} Pilihan
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700 block">
                      Bebas Pilih (Unlimited)
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Custom Options (sc_custom_options) */}
        <div className="p-5 rounded-2xl bg-[#141721] border border-[#242938] shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#242938] pb-3">
            <div className="flex items-center gap-2">
              <Tag size={16} className="text-[#D4AF37]" />
              <h2 className="text-base font-bold text-white">
                Daftar Opsi Kustom (sc_custom_options)
              </h2>
            </div>
            <span className="text-[11px] text-slate-400">10 Opsi Standar</span>
          </div>

          <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
            {customOptions.map((opt) => {
              const grp = optionGroups.find((g) => g.id === opt.group_id);
              return (
                <div
                  key={opt.id}
                  className="p-3 rounded-xl bg-[#0F1117] border border-[#242938] flex items-center justify-between text-xs"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white">{opt.nama}</span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        ({grp?.nama_grup})
                      </span>
                    </div>
                    {opt.deskripsi && (
                      <span className="text-[11px] text-slate-400 font-light block">
                        {opt.deskripsi}
                      </span>
                    )}
                  </div>

                  <span className="font-mono font-bold text-[#D4AF37] ml-2 shrink-0">
                    {formatIDR(opt.harga)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 5. Relation Matrix (sc_model_custom_options) */}
      <div className="p-5 rounded-2xl bg-[#141721] border border-[#242938] shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#242938] pb-3">
          <div className="flex items-center gap-2">
            <Database size={16} className="text-[#D4AF37]" />
            <h2 className="text-base font-bold text-white">
              Matriks Relasi &amp; Harga Override (sc_model_custom_options)
            </h2>
          </div>
          <span className="text-xs text-slate-400 hidden sm:inline-block">
            Mendukung 5 opsi yang sama pada model leher tanpa duplikasi definisi
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-[#242938] text-slate-400 uppercase text-[10px] tracking-wider">
                <th className="py-2.5 px-3">Opsi Kustom</th>
                <th className="py-2.5 px-3">Grup Opsi</th>
                <th className="py-2.5 px-3">Harga Default</th>
                <th className="py-2.5 px-3 text-center">Model Biasa</th>
                <th className="py-2.5 px-3 text-center">Model Leher / Syal</th>
                <th className="py-2.5 px-3 text-center">Model Timbal Balik</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#242938]/60">
              {customOptions.map((opt) => {
                const grp = optionGroups.find((g) => g.id === opt.group_id);
                const relBiasa = relations.find((r) => r.model_id === 1 && r.option_id === opt.id);
                const relSyal = relations.find((r) => r.model_id === 2 && r.option_id === opt.id);
                const relTimbal = relations.find((r) => r.model_id === 3 && r.option_id === opt.id);

                return (
                  <tr key={opt.id} className="hover:bg-[#1E2230]/40 transition-colors">
                    <td className="py-2.5 px-3 font-semibold text-white">
                      {opt.nama}
                    </td>
                    <td className="py-2.5 px-3 text-slate-400">
                      {grp?.nama_grup}
                    </td>
                    <td className="py-2.5 px-3 font-mono text-slate-300">
                      {formatIDR(opt.harga)}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      {relBiasa ? (
                        <span className="inline-flex items-center gap-1 text-emerald-400 font-mono text-[11px]">
                          <Check size={12} />
                          {relBiasa.harga_override !== null
                            ? formatIDR(relBiasa.harga_override)
                            : "Default"}
                        </span>
                      ) : (
                        <span className="text-slate-600">—</span>
                      )}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      {relSyal ? (
                        <span className="inline-flex items-center gap-1 text-[#FDE68A] font-mono text-[11px]">
                          <Check size={12} />
                          {relSyal.harga_override !== null
                            ? `${formatIDR(relSyal.harga_override)} (Override)`
                            : "Default"}
                        </span>
                      ) : (
                        <span className="text-slate-600">—</span>
                      )}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      {relTimbal ? (
                        <span className="inline-flex items-center gap-1 text-sky-400 font-mono text-[11px]">
                          <Check size={12} />
                          {relTimbal.harga_override === 0
                            ? "Termasuk (Rp0)"
                            : relTimbal.harga_override !== null
                            ? formatIDR(relTimbal.harga_override)
                            : "Default"}
                        </span>
                      ) : (
                        <span className="text-slate-600">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
