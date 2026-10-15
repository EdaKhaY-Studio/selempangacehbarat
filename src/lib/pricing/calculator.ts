/**
 * Official Pricing Engine for Custom Selempang Wisuda - Selempang Aceh Barat (FHD)
 * Source of truth for server-side and client-side estimation.
 */

export type SashModelType = "biasa" | "syal" | "timbal_balik";

export interface ModelConfig {
  id: SashModelType;
  name: string;
  shortName: string;
  basePrice: number;
  description: string;
  features: string[];
}

export const SASH_MODELS: Record<SashModelType, ModelConfig> = {
  biasa: {
    id: "biasa",
    name: "Selempang Model Biasa (Menyamping)",
    shortName: "Model Biasa (Menyamping)",
    basePrice: 50000,
    description:
      "Selempang model klasik yang dikenakan menyamping dari bahu ke pinggang. Cocok untuk wisuda, yudisium, kegiatan organisasi, dan acara penghargaan. Model polos dapat ditambahkan dekorasi berdasarkan pilihan pelanggan.",
    features: [
      "Bordir komputer nama dan gelar presisi",
      "Kain bludru atau satin premium",
      "Model klasik selempang bahu ke pinggang",
    ],
  },
  syal: {
    id: "syal",
    name: "Selempang Model Leher / Syal",
    shortName: "Model Leher / Syal",
    basePrice: 85000,
    description:
      "Selempang bergaya syal yang dikenakan di leher, cocok untuk wisuda, yudisium, organisasi, dan acara formal. Pelanggan dapat memilih beberapa tambahan dekorasi untuk menyesuaikan tampilannya.",
    features: [
      "Dikenakan melingkar leher jatuh simetris ke dada",
      "Bordir nama di dua sisi leher",
      "Pilihan motif ujung, motif tengah & rumbai",
    ],
  },
  timbal_balik: {
    id: "timbal_balik",
    name: "Selempang Model Leher Timbal Balik",
    shortName: "Model Leher Timbal Balik",
    basePrice: 135000,
    description:
      "Selempang model leher dengan desain timbal balik yang menampilkan dua sisi. Cocok untuk wisuda, organisasi, dan acara khusus yang membutuhkan tampilan personal.",
    features: [
      "Desain dua sisi bolak-balik eksklusif",
      "Kerapian jahitan & furing ganda atelier",
      "Tampilan mewah untuk momen wisuda bergengsi",
    ],
  },
};

// ─── Add-on Definitions ───────────────────────────────────────────────────────

export interface AddonOption {
  id: string;
  label: string;
  price: number;
  group?: "renda" | "other"; // for mutually exclusive validation
}

export const ADDONS_BIASA: Record<string, AddonOption> = {
  renda_biasa: { id: "renda_biasa", label: "Renda Biasa", price: 5000, group: "renda" },
  renda_mahkota: { id: "renda_mahkota", label: "Renda Mahkota", price: 7000, group: "renda" },
  renda_marsyanda: { id: "renda_marsyanda", label: "Renda Marsyanda", price: 7000, group: "renda" },
  les_pinggir: { id: "les_pinggir", label: "Les Pinggir", price: 5000, group: "other" },
  bordir_logo: { id: "bordir_logo", label: "Bordir Logo", price: 10000, group: "other" },
  rumbai: { id: "rumbai", label: "Rumbai", price: 15000, group: "other" },
};

export const ADDONS_SYAL: Record<string, AddonOption> = {
  motif_ujung: { id: "motif_ujung", label: "Motif Ujung", price: 5000 },
  motif_tengah: { id: "motif_tengah", label: "Motif Tengah", price: 5000 },
  les_pinggir: { id: "les_pinggir", label: "Les Pinggir", price: 10000 },
  renda: { id: "renda", label: "Renda", price: 15000 },
  rumbai_ujung: { id: "rumbai_ujung", label: "Rumbai Ujung", price: 15000 },
};

export interface LogoPolicy {
  allowed: boolean;
  price: number;
  note: string;
}

export function getLogoPolicy(modelType: SashModelType): LogoPolicy {
  if (modelType === "biasa") {
    return {
      allowed: true,
      price: 10000,
      note: "Bordir logo kampus/sekolah (+Rp10.000)",
    };
  }
  return {
    allowed: true,
    price: 0,
    note: "Biaya bordir logo model leher/syal & timbal balik belum ditetapkan (+Rp0 di web / konfirmasi via CS).",
  };
}

export interface CalculatedItem {
  modelType: SashModelType;
  modelName: string;
  basePrice: number;
  selectedAddons: { id: string; label: string; price: number }[];
  addonsPricePerUnit: number;
  unitPrice: number;
  quantity: number;
  subtotal: number;
}

export interface CalculationResult {
  items: CalculatedItem[];
  totalProduct: number;
  dpAmount: number; // Exactly 50% rounded
  balanceAmount: number; // totalProduct - dpAmount
  shippingCost: number;
  grandTotal: number;
}

/**
 * Validates and sanitizes addons according to business rules:
 * - For model biasa: only ONE lace type allowed ("renda_biasa" | "renda_mahkota" | "renda_marsyanda").
 * - For model timbal_balik: NO addons allowed (flat Rp135.000).
 */
export function sanitizeAddons(modelType: SashModelType, requestedAddons: string[]): string[] {
  if (modelType === "timbal_balik") {
    return [];
  }

  if (modelType === "syal") {
    return requestedAddons.filter((id) => id in ADDONS_SYAL);
  }

  if (modelType === "biasa") {
    const valid = requestedAddons.filter((id) => id in ADDONS_BIASA);
    // Enforce mutual exclusivity of lace (renda): pick only the first lace encountered
    let laceChosen = false;
    const result: string[] = [];

    for (const addonId of valid) {
      const addon = ADDONS_BIASA[addonId];
      if (addon.group === "renda") {
        if (!laceChosen) {
          result.push(addonId);
          laceChosen = true;
        }
      } else {
        result.push(addonId);
      }
    }
    return result;
  }

  return [];
}

/**
 * Calculates a single item subtotal with validated addons and quantity
 */
export function calculateItemPrice(
  modelType: SashModelType,
  requestedAddons: string[],
  quantity: number = 1
): CalculatedItem {
  const model = SASH_MODELS[modelType] || SASH_MODELS.biasa;
  const safeQty = Math.max(1, Math.floor(quantity || 1));
  const sanitized = sanitizeAddons(modelType, requestedAddons);

  let addonsPrice = 0;
  const selectedAddons: { id: string; label: string; price: number }[] = [];

  if (modelType === "biasa") {
    for (const id of sanitized) {
      const addon = ADDONS_BIASA[id];
      if (addon) {
        addonsPrice += addon.price;
        selectedAddons.push({ id: addon.id, label: addon.label, price: addon.price });
      }
    }
  } else if (modelType === "syal") {
    for (const id of sanitized) {
      const addon = ADDONS_SYAL[id];
      if (addon) {
        addonsPrice += addon.price;
        selectedAddons.push({ id: addon.id, label: addon.label, price: addon.price });
      }
    }
  }

  const unitPrice = model.basePrice + addonsPrice;
  const subtotal = unitPrice * safeQty;

  return {
    modelType,
    modelName: model.name,
    basePrice: model.basePrice,
    selectedAddons,
    addonsPricePerUnit: addonsPrice,
    unitPrice,
    quantity: safeQty,
    subtotal,
  };
}

/**
 * Calculates full order totals, DP 50%, and settlement balance 50%
 */
export function calculateOrderTotals(
  items: { modelType: SashModelType; addons: string[]; quantity: number }[],
  shippingCost: number = 0
): CalculationResult {
  const calculatedItems = items.map((item) =>
    calculateItemPrice(item.modelType, item.addons, item.quantity)
  );

  const totalProduct = calculatedItems.reduce((acc, curr) => acc + curr.subtotal, 0);

  // Exact 50% DP and 50% Balance calculation
  const dpAmount = Math.floor(totalProduct * 0.5);
  const balanceAmount = totalProduct - dpAmount;

  const safeShipping = Math.max(0, Math.floor(shippingCost || 0));
  const grandTotal = totalProduct + safeShipping;

  return {
    items: calculatedItems,
    totalProduct,
    dpAmount,
    balanceAmount,
    shippingCost: safeShipping,
    grandTotal,
  };
}
