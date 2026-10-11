import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getSizeRecommendation(
  heightCm: number,
  weightKg: number
): { size: string; chest: number; sleeve: number; note: string } {
  const bmi = weightKg / ((heightCm / 100) ** 2);

  if (heightCm < 160 || bmi < 18.5) {
    return {
      size: "S",
      chest: 88,
      sleeve: 60,
      note: "Potongan ramping, pas di bahu dan badan.",
    };
  } else if (heightCm <= 168 && bmi < 25) {
    return {
      size: "M",
      chest: 92,
      sleeve: 62,
      note: "Ukuran paling umum. Jatuh rapi dan proporsional.",
    };
  } else if (heightCm <= 175 && bmi < 28) {
    return {
      size: "L",
      chest: 96,
      sleeve: 64,
      note: "Sedikit longgar di dada, nyaman untuk hari wisuda panjang.",
    };
  } else if (heightCm <= 183 || bmi < 32) {
    return {
      size: "XL",
      chest: 100,
      sleeve: 66,
      note: "Potongan generous, tetap terlihat formal dan berkarakter.",
    };
  } else {
    return {
      size: "XXL",
      chest: 106,
      sleeve: 68,
      note: "Ekstra lega, cocok untuk postur besar dan gagah.",
    };
  }
}
