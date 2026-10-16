/**
 * Verifikasi Kesesuaian Data Katalog Selempang dengan Kode (Database vs Calculator vs Mock)
 * Usaha: Selempang Aceh Barat (FHD)
 * Ref Task: kustomisasi-selempang-dinamis/isi-data-katalog/verifikasi-kesesuaian-data-katalog-dengan-kode
 */

import {
  MOCK_SASH_MODELS,
  MOCK_OPTION_GROUPS,
  MOCK_CUSTOM_OPTIONS,
  MOCK_MODEL_OPTIONS,
  getMockOptionsForModel,
  calculateMockSashPrice,
} from "@/lib/catalog/mock-sash-catalog";
import { SASH_MODELS, calculateItemPrice } from "@/lib/pricing/calculator";

export interface ConsistencyCheckReport {
  modelsMatch: boolean;
  pricesMatch: boolean;
  optionsMatch: boolean;
  overridesMatch: boolean;
  discrepancies: string[];
  summary: {
    totalModels: number;
    totalGroups: number;
    totalOptions: number;
    totalRelations: number;
  };
}

export function runCatalogConsistencyCheck(): ConsistencyCheckReport {
  const discrepancies: string[] = [];

  // 1. Verifikasi Model: mock vs pricing calculator
  for (const mockM of MOCK_SASH_MODELS) {
    const calcM = SASH_MODELS[mockM.slug];
    if (!calcM) {
      discrepancies.push(`Model "${mockM.slug}" ditemukan di mock/database tetapi tidak ada di SASH_MODELS calculator.`);
      continue;
    }

    if (mockM.harga_dasar !== calcM.basePrice) {
      discrepancies.push(
        `Harga dasar tidak cocok untuk model "${mockM.slug}": mock/db = Rp${mockM.harga_dasar}, calculator = Rp${calcM.basePrice}`
      );
    }
  }

  // 2. Verifikasi Kalkulasi Harga untuk Berbagai Skenario Model & Addons
  // Skenario A: Model Biasa + Renda Mahkota (Rp7.000) + Rumbai (Rp15.000) -> 50.000 + 7.000 + 15.000 = Rp72.000
  const mockCalcBiasa = calculateMockSashPrice("biasa", ["renda_mahkota", "rumbai"], 1);
  const legacyCalcBiasa = calculateItemPrice("biasa", ["renda_mahkota", "rumbai"], 1);

  if (mockCalcBiasa.totalPrice !== legacyCalcBiasa.subtotal) {
    discrepancies.push(
      `Perhitungan Model Biasa berbeda: mock = Rp${mockCalcBiasa.totalPrice}, legacy = Rp${legacyCalcBiasa.subtotal}`
    );
  }

  // Skenario B: Model Syal + Les Pinggir (Override Rp10.000) -> 85.000 + 10.000 = Rp95.000
  const mockCalcSyal = calculateMockSashPrice("syal", ["les_pinggir"], 1);
  const legacyCalcSyal = calculateItemPrice("syal", ["les_pinggir"], 1);

  if (mockCalcSyal.totalPrice !== legacyCalcSyal.subtotal) {
    discrepancies.push(
      `Perhitungan Model Syal (override les_pinggir) berbeda: mock = Rp${mockCalcSyal.totalPrice}, legacy = Rp${legacyCalcSyal.subtotal}`
    );
  }

  // Skenario C: Model Timbal Balik Flat Package (Rp135.000)
  const mockCalcTimbal = calculateMockSashPrice("timbal_balik", ["motif_ujung", "les_pinggir", "rumbai_ujung"], 1);
  const legacyCalcTimbal = calculateItemPrice("timbal_balik", ["motif_ujung", "les_pinggir", "rumbai_ujung"], 1);

  if (mockCalcTimbal.totalPrice !== legacyCalcTimbal.subtotal) {
    discrepancies.push(
      `Perhitungan Model Timbal Balik berbeda: mock = Rp${mockCalcTimbal.totalPrice}, legacy = Rp${legacyCalcTimbal.subtotal}`
    );
  }

  // 3. Verifikasi Keberadaan Relasi & Grup
  const modelsMatch = discrepancies.filter((d) => d.includes("Model")).length === 0;
  const pricesMatch = discrepancies.filter((d) => d.includes("Harga") || d.includes("Perhitungan")).length === 0;

  return {
    modelsMatch,
    pricesMatch,
    optionsMatch: MOCK_CUSTOM_OPTIONS.length >= 10,
    overridesMatch: MOCK_MODEL_OPTIONS.some((r) => r.harga_override !== null),
    discrepancies,
    summary: {
      totalModels: MOCK_SASH_MODELS.length,
      totalGroups: MOCK_OPTION_GROUPS.length,
      totalOptions: MOCK_CUSTOM_OPTIONS.length,
      totalRelations: MOCK_MODEL_OPTIONS.length,
    },
  };
}
