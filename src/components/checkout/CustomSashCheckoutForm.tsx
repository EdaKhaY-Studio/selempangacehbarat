"use client";

import { useState, useEffect, useId, useRef, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Sparkles,
  User,
  Phone,
  Mail,
  GraduationCap,
  Calendar,
  Truck,
  Store,
  Upload,
  AlertCircle,
  CheckCircle2,
  Plus,
  Trash2,
  Lock,
  ArrowRight,
  Loader2,
  Info,
  Check,
  MessageCircle,
} from "lucide-react";
import {
  SASH_MODELS,
  ADDONS_BIASA,
  ADDONS_SYAL,
  SashModelType,
  calculateOrderTotals,
  sanitizeAddons,
} from "@/lib/pricing/calculator";
import { getProductBySlug, DetailedProduct } from "@/lib/products-data";
import { STORE_INFO } from "@/lib/types";

function formatIDR(val: number): string {
  return "Rp" + val.toLocaleString("id-ID");
}

export interface CheckoutItemState {
  id: string;
  productId?: string;
  productSlug?: string;
  modelType: SashModelType;
  material: "bludru" | "satin";
  clothColor: string;
  edgeTapeColor: string;
  threadColor: string;
  customText: string;
  hasLogo: boolean;
  logoUrl?: string;
  logoFilename?: string;
  decorations: string[];
  designNotes?: string;
  quantity: number;
}

const CLOTH_COLORS = [
  "Hitam",
  "Maron",
  "Navy / Biru Dongker",
  "Hijau Botol",
  "Pink",
  "Ungu",
  "Merah",
  "Putih",
];

const EDGE_TAPE_COLORS = [
  "Gold (Emas)",
  "Silver (Perak)",
  "Polos (Tanpa Pita)",
];

const THREAD_COLORS = [
  "Gold (Benang Emas Metalik)",
  "Silver (Benang Perak Metalik)",
  "Putih Bersih",
];

export function CustomSashCheckoutForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Find verified product from searchParams if navigated from product detail
  const productParam =
    searchParams.get("slug") ||
    searchParams.get("productId") ||
    searchParams.get("product") ||
    searchParams.get("id");
  const verifiedProduct: DetailedProduct | undefined =
    (productParam ? getProductBySlug(productParam) : undefined) ||
    getProductBySlug("custom-selempang");

  // Generate a stable idempotency key for this checkout attempt
  const [idempotencyKey, setIdempotencyKey] = useState<string>("");

  useEffect(() => {
    // Generate UUID once per browser session for idempotency
    const key = "sab_idem_" + Math.random().toString(36).substring(2) + Date.now().toString(36);
    setIdempotencyKey(key);
  }, []);

  // Pre-seed from searchParams or verified product
  const initialModel =
    (searchParams.get("model") as SashModelType) ||
    verifiedProduct?.sashModel ||
    "biasa";
  const initialAddonsParam = searchParams.get("addons");
  const initialCloth = searchParams.get("clothColor") || searchParams.get("cloth");
  const initialEdge = searchParams.get("edgeTapeColor") || searchParams.get("edge");
  const initialThread = searchParams.get("threadColor") || searchParams.get("thread");
  const rawMaterial = searchParams.get("material");
  const initialMaterial: "bludru" | "satin" =
    rawMaterial && rawMaterial.toLowerCase().includes("satin") ? "satin" : "bludru";
  const initialText = searchParams.get("text") || "";
  const parsedQty = parseInt(searchParams.get("quantity") || "1", 10);
  const initialQuantity = isNaN(parsedQty) || parsedQty < 1 ? 1 : Math.min(parsedQty, 500);

  const initialAddons = initialAddonsParam
    ? sanitizeAddons(initialModel, initialAddonsParam.split(","))
    : verifiedProduct?.defaultAddons && verifiedProduct.defaultAddons.length > 0
    ? sanitizeAddons(initialModel, verifiedProduct.defaultAddons)
    : [];

  // Customer Contact State
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerInstitution, setCustomerInstitution] = useState("");

  // Delivery & Schedule State
  const todayStr = new Date().toISOString().split("T")[0];
  const defaultEventDate = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];
  const defaultTargetDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  const [eventDate, setEventDate] = useState(defaultEventDate);
  const [targetDate, setTargetDate] = useState(defaultTargetDate);
  const [deliveryMethod, setDeliveryMethod] = useState<"pickup" | "delivery">("pickup");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [deliveryCity, setDeliveryCity] = useState("Meulaboh, Aceh Barat");
  const [deliveryPostalCode, setDeliveryPostalCode] = useState("23615");
  const [scheduleNotes, setScheduleNotes] = useState("");

  // Items State (supports ordering for multiple items with distinct names)
  const [items, setItems] = useState<CheckoutItemState[]>([
    {
      id: "item-1",
      productId: verifiedProduct?.id,
      productSlug: verifiedProduct?.slug,
      modelType: initialModel,
      material: initialMaterial,
      clothColor: initialCloth || "Hitam",
      edgeTapeColor: initialEdge || "Gold (Emas)",
      threadColor: initialThread || "Gold (Benang Emas Metalik)",
      customText: initialText,
      hasLogo: initialAddons.includes("bordir_logo"),
      decorations: initialAddons,
      quantity: initialQuantity,
    },
  ]);

  // Submission State
  const [submitState, setSubmitState] = useState<"idle" | "submitting" | "success" | "error">("idle");

  // Restore draft state from sessionStorage if returning to form
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("sab_checkout_draft");
      if (saved) {
        const draft = JSON.parse(saved);
        if (draft.customerName) setCustomerName(draft.customerName);
        if (draft.customerPhone) setCustomerPhone(draft.customerPhone);
        if (draft.customerEmail) setCustomerEmail(draft.customerEmail);
        if (draft.customerInstitution) setCustomerInstitution(draft.customerInstitution);
        if (draft.eventDate) setEventDate(draft.eventDate);
        if (draft.targetDate) setTargetDate(draft.targetDate);
        if (draft.deliveryMethod) setDeliveryMethod(draft.deliveryMethod);
        if (draft.deliveryAddress) setDeliveryAddress(draft.deliveryAddress);
        if (draft.deliveryCity) setDeliveryCity(draft.deliveryCity);
        if (draft.deliveryPostalCode) setDeliveryPostalCode(draft.deliveryPostalCode);
        if (draft.scheduleNotes) setScheduleNotes(draft.scheduleNotes);

        if (draft.items && Array.isArray(draft.items) && draft.items.length > 0) {
          if (productParam || searchParams.get("model")) {
            const updatedItems = [...draft.items];
            updatedItems[0] = {
              ...updatedItems[0],
              productId: verifiedProduct?.id || updatedItems[0].productId,
              productSlug: verifiedProduct?.slug || updatedItems[0].productSlug,
              modelType: initialModel,
              decorations: initialAddons.length > 0 ? initialAddons : updatedItems[0].decorations,
              clothColor: initialCloth || updatedItems[0].clothColor,
              edgeTapeColor: initialEdge || updatedItems[0].edgeTapeColor,
              threadColor: initialThread || updatedItems[0].threadColor,
              material: initialMaterial || updatedItems[0].material,
              customText: initialText || updatedItems[0].customText,
              quantity: initialQuantity > 1 ? initialQuantity : updatedItems[0].quantity,
            };
            setItems(updatedItems);
          } else {
            setItems(draft.items);
          }
        }
      }
    } catch {
      // ignore parsing error
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-save form draft to sessionStorage on state change
  useEffect(() => {
    try {
      if (submitState !== "success") {
        const draft = {
          selectedProductSlug: verifiedProduct?.slug,
          customerName,
          customerPhone,
          customerEmail,
          customerInstitution,
          eventDate,
          targetDate,
          deliveryMethod,
          deliveryAddress,
          deliveryCity,
          deliveryPostalCode,
          scheduleNotes,
          items,
        };
        sessionStorage.setItem("sab_checkout_draft", JSON.stringify(draft));
      } else {
        sessionStorage.removeItem("sab_checkout_draft");
      }
    } catch {
      // ignore storage error
    }
  }, [
    customerName,
    customerPhone,
    customerEmail,
    customerInstitution,
    eventDate,
    targetDate,
    deliveryMethod,
    deliveryAddress,
    deliveryCity,
    deliveryPostalCode,
    scheduleNotes,
    items,
    submitState,
    verifiedProduct?.slug,
  ]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [uploadingLogoIdx, setUploadingLogoIdx] = useState<number | null>(null);

  // Pemeriksaan Status Publikasi Katalog di Server (Mencegah pengisian checkout jika berstatus draft)
  const [serverStatusCheck, setServerStatusCheck] = useState<{
    isChecking: boolean;
    isDraftBlocked: boolean;
    message?: string;
    draftItems?: string[];
  }>({
    isChecking: true,
    isDraftBlocked: false,
    draftItems: [],
  });

  useEffect(() => {
    let isMounted = true;
    const checkServerStatus = async () => {
      try {
        const res = await fetch("/api/catalog/validate-status", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: items.map((it) => ({
              model: it.modelType,
              options: it.decorations,
            })),
            requirePublished: true,
          }),
        });
        const data = await res.json();
        if (!isMounted) return;

        if (res.status === 403 || data.isBlockedFromLiveTransactions || !data.success) {
          setServerStatusCheck({
            isChecking: false,
            isDraftBlocked: true,
            message:
              data.message ||
              "Pemesanan online untuk spesifikasi kustom ini sedang dalam tahap finalisasi harga oleh butik FHD dan belum dibuka otomatis.",
            draftItems: data.draftItems || [],
          });
        } else {
          setServerStatusCheck({
            isChecking: false,
            isDraftBlocked: false,
            draftItems: [],
          });
        }
      } catch {
        if (isMounted) {
          setServerStatusCheck({
            isChecking: false,
            isDraftBlocked: false,
          });
        }
      }
    };

    checkServerStatus();
    return () => {
      isMounted = false;
    };
  }, [items]);

  // Check deadline proximity
  const isUrgentDeadline = () => {
    if (!targetDate) return false;
    const targetMs = new Date(targetDate).getTime();
    const nowMs = new Date().getTime();
    const diffDays = (targetMs - nowMs) / (1000 * 60 * 60 * 24);
    return diffDays < 2;
  };

  // Add Item Handler
  const handleAddItem = () => {
    const newItem: CheckoutItemState = {
      id: "item-" + (items.length + 1) + "-" + Date.now().toString(36),
      modelType: "biasa",
      material: "bludru",
      clothColor: "Hitam",
      edgeTapeColor: "Gold (Emas)",
      threadColor: "Gold (Benang Emas Metalik)",
      customText: "",
      hasLogo: false,
      decorations: [],
      quantity: 1,
    };
    setItems([...items, newItem]);
  };

  // Remove Item Handler
  const handleRemoveItem = (index: number) => {
    if (items.length <= 1) return;
    setItems(items.filter((_, idx) => idx !== index));
  };

  // Update Item Field Handler
  const handleUpdateItem = (index: number, updates: Partial<CheckoutItemState>) => {
    const copy = [...items];
    const updatedItem = { ...copy[index], ...updates };

    // If changing model type, reset pilihan opsi tambahan agar sesuai spesifikasi model baru
    if (updates.modelType && updates.modelType !== copy[index].modelType) {
      updatedItem.decorations = [];
      updatedItem.hasLogo = false;
    }

    // Synchronize bordir_logo with hasLogo
    if (updates.hasLogo !== undefined) {
      if (updates.hasLogo && !updatedItem.decorations.includes("bordir_logo")) {
        updatedItem.decorations = [...updatedItem.decorations, "bordir_logo"];
      } else if (!updates.hasLogo) {
        updatedItem.decorations = updatedItem.decorations.filter((d) => d !== "bordir_logo");
      }
    }

    copy[index] = updatedItem;
    setItems(copy);
  };

  // Toggle Addon for Specific Item
  const handleToggleItemAddon = (index: number, addonId: string) => {
    const item = items[index];

    let newDecorations: string[] = [];

    if (item.modelType === "biasa") {
      const addon = ADDONS_BIASA[addonId];
      if (!addon) return;

      if (addon.group === "renda") {
        if (item.decorations.includes(addonId)) {
          newDecorations = item.decorations.filter((id) => id !== addonId);
        } else {
          const nonLace = item.decorations.filter((id) => ADDONS_BIASA[id]?.group !== "renda");
          newDecorations = [...nonLace, addonId];
        }
      } else {
        if (item.decorations.includes(addonId)) {
          newDecorations = item.decorations.filter((id) => id !== addonId);
        } else {
          newDecorations = [...item.decorations, addonId];
        }
      }

      const updates: Partial<CheckoutItemState> = { decorations: newDecorations };
      if (addonId === "bordir_logo") {
        updates.hasLogo = newDecorations.includes("bordir_logo");
      }
      handleUpdateItem(index, updates);
      return;
    } else if (item.modelType === "syal" || item.modelType === "timbal_balik") {
      if (item.decorations.includes(addonId)) {
        newDecorations = item.decorations.filter((id) => id !== addonId);
      } else {
        newDecorations = [...item.decorations, addonId];
      }
      const updates: Partial<CheckoutItemState> = { decorations: newDecorations };
      if (addonId === "bordir_logo") {
        updates.hasLogo = newDecorations.includes("bordir_logo");
      }
      handleUpdateItem(index, updates);
      return;
    }

    handleUpdateItem(index, { decorations: newDecorations });
  };

  // Upload Logo Handler for specific item
  const handleLogoUpload = async (index: number, file: File) => {
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Ukuran file logo maksimal 5 MB.");
      return;
    }

    setUploadingLogoIdx(index);

    const formData = new FormData();
    formData.append("logo", file);

    try {
      const res = await fetch("/api/upload/logo", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        alert(data.message || "Gagal mengunggah logo.");
      } else {
        handleUpdateItem(index, {
          hasLogo: true,
          logoUrl: data.url,
          logoFilename: file.name,
        });
      }
    } catch {
      alert("Terjadi kesalahan jaringan saat mengunggah file logo.");
    } finally {
      setUploadingLogoIdx(null);
    }
  };

  // Live Price Calculation using Server Engine Logic
  const pricingSummary = calculateOrderTotals(
    items.map((it) => ({
      modelType: it.modelType,
      addons: it.decorations,
      quantity: it.quantity,
    }))
  );

  // URL WhatsApp Konsultasi Resmi Butik FHD (0822-9925-6343)
  const whatsappConsultationUrl = useMemo(() => {
    const waPhone = STORE_INFO.accounts.selempang.whatsappRaw; // 6282299256343
    const itemsDesc = items
      .map((it, idx) => {
        const modelLabel = SASH_MODELS[it.modelType]?.name || it.modelType;
        const addonsLabel =
          it.decorations && it.decorations.length > 0
            ? it.decorations.join(", ")
            : "Tanpa tambahan (standar)";
        const textNote = it.customText.trim() ? `\n   - Tulisan Bordir: "${it.customText.trim()}"` : "";
        return `Item #${idx + 1} (${it.quantity} pcs):\n   - Model: ${modelLabel}\n   - Bahan/Warna: ${it.material} / ${it.clothColor}\n   - Opsi: ${addonsLabel}${textNote}`;
      })
      .join("\n");

    const text = encodeURIComponent(
      `Halo Butik Selempang Aceh Barat (FHD),\nsaya ingin memesan custom selempang dengan rincian berikut:\n\n` +
      `${itemsDesc}\n\n` +
      `• Estimasi Total: ${formatIDR(pricingSummary.totalProduct)}\n` +
      (customerName.trim() ? `• Nama Pemesan: ${customerName.trim()}\n` : "") +
      `\nMohon info ketersediaan slot pengerjaan dan konfirmasi pemesanan manual. Terima kasih!`
    );

    return `https://wa.me/${waPhone}?text=${text}`;
  }, [items, pricingSummary.totalProduct, customerName]);

  // Form Submit Handler with Double-Submit Protection
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitState === "submitting" || submitState === "success") return;

    setErrorMessage(null);

    // Kunci Draft Status: Mencegah pemesanan online jika katalog belum published
    if (serverStatusCheck.isDraftBlocked) {
      setErrorMessage(
        "Pemesanan online otomatis untuk spesifikasi ini belum dibuka karena masih dalam tahap finalisasi harga butik. Silakan gunakan tombol WhatsApp resmi untuk pemesanan langsung."
      );
      return;
    }

    // Frontend Validations
    if (!customerName.trim() || !customerPhone.trim()) {
      setErrorMessage("Harap lengkapi nama dan nomor WhatsApp pemesan.");
      return;
    }

    if (deliveryMethod === "delivery" && !deliveryAddress.trim()) {
      setErrorMessage("Harap lengkapi alamat tujuan pengiriman.");
      return;
    }

    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      if (!it.customText.trim()) {
        setErrorMessage(`Harap isi tulisan nama/gelar pada Item #${i + 1}.`);
        return;
      }
      if (it.hasLogo && !it.logoUrl) {
        setErrorMessage(
          `Item #${i + 1} memilih bordir logo kampus/sekolah, harap unggah file logonya terlebih dahulu.`
        );
        return;
      }
    }

    // Set submitting immediately
    setSubmitState("submitting");

    try {
      const payload = {
        idempotencyKey,
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        customerEmail: customerEmail.trim() || undefined,
        customerInstitution: customerInstitution.trim() || undefined,
        eventDate,
        targetDate,
        deliveryMethod,
        deliveryAddress: deliveryAddress.trim() || undefined,
        deliveryCity: deliveryCity.trim() || undefined,
        deliveryPostalCode: deliveryPostalCode.trim() || undefined,
        scheduleNotes: scheduleNotes.trim() || undefined,
        items: items.map((it) => ({
          productId: it.productId || verifiedProduct?.id,
          productSlug: it.productSlug || verifiedProduct?.slug,
          modelType: it.modelType,
          material: it.material,
          clothColor: it.clothColor,
          edgeTapeColor: it.edgeTapeColor,
          threadColor: it.threadColor,
          customText: it.customText.trim(),
          hasLogo: Boolean(it.hasLogo),
          logoUrl: it.logoUrl,
          decorations: it.decorations,
          designNotes: it.designNotes?.trim() || undefined,
          quantity: it.quantity,
        })),
      };

      const res = await fetch("/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        if (res.status === 403 || data.isDraftBlocked) {
          setServerStatusCheck({
            isChecking: false,
            isDraftBlocked: true,
            message: data.message,
          });
        }
        setErrorMessage(data.message || "Gagal membuat pesanan.");
        setSubmitState("error");
        return;
      }

      setSubmitState("success");

      // Redirect ke halaman pembayaran resmi FHD
      router.push(`/checkout/pembayaran/${encodeURIComponent(data.orderNumber)}`);
    } catch {
      setErrorMessage("Terjadi gangguan koneksi internet. Silakan coba kembali.");
      setSubmitState("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Form Column (7 cols on lg) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Customer-Friendly Draft Status Notice Banner */}
          {serverStatusCheck.isDraftBlocked && (
            <div className="p-5 sm:p-6 rounded-3xl bg-amber-50/90 border-2 border-[#b48c28]/60 shadow-xs space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-[#b48c28] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <MessageCircle size={22} />
                </div>
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#0f172a] text-[#D4AF37]">
                      Tahap Finalisasi Harga
                    </span>
                    <span className="text-xs font-bold text-[#0f172a]">
                      Pemesanan Online Belum Dibuka
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    Spesifikasi kustom yang Anda pilih saat ini masih dalam tahap finalisasi harga resmi oleh Butik Selempang Aceh Barat (FHD).
                    Anda <strong>tidak perlu repot mengisi formulir checkout ini</strong>—silakan langsung gunakan tombol WhatsApp di bawah untuk konsultasi cepat dan pemesanan manual bersama tim kami.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 border-t border-amber-300/40">
                <a
                  href={whatsappConsultationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm tracking-wide bg-[#b48c28] hover:bg-[#9a751e] text-white shadow-md transition-all active:scale-98 text-center cursor-pointer"
                >
                  <MessageCircle size={18} />
                  <span>Pesan Sekarang via WhatsApp ({STORE_INFO.accounts.selempang.whatsappDisplay})</span>
                </a>
                <div className="flex items-center justify-center gap-1.5 text-xs text-slate-600">
                  <ShieldCheck size={14} className="text-[#b48c28] shrink-0" />
                  <span>Konsultasi gratis &amp; fast response via admin resmi</span>
                </div>
              </div>
            </div>
          )}

          {/* Showcase Produk Terpilih dari Katalog Resmi */}
          {verifiedProduct && (
            <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-amber-50/80 via-white to-amber-50/40 border border-[#b48c28]/40 shadow-xs flex flex-col sm:flex-row items-center gap-5">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-white border border-slate-200/80 shrink-0 flex items-center justify-center shadow-2xs">
                <Image
                  src={verifiedProduct.images[0]}
                  alt={verifiedProduct.name}
                  fill
                  sizes="112px"
                  className="object-contain p-2"
                />
              </div>
              <div className="flex-1 space-y-1.5 text-center sm:text-left">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-[#0f172a] text-white">
                    Produk Terpilih
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-[#b48c28] border border-amber-300/60">
                    {verifiedProduct.categoryLabel}
                  </span>
                  <span className="font-mono text-[10px] text-slate-400 uppercase">
                    SKU: {verifiedProduct.sku}
                  </span>
                </div>
                <h2 className="font-serif text-lg font-bold text-[#0f172a] leading-snug">
                  {verifiedProduct.name}
                </h2>
                <div className="text-xs text-[#475569]">
                  {verifiedProduct.price > 0 ? (
                    <span>
                      Harga Dasar Resmi: <strong className="text-[#b48c28] font-bold font-mono">{formatIDR(verifiedProduct.price)}</strong> / unit (sebelum tambahan dekorasi).
                    </span>
                  ) : (
                    <span className="text-amber-800 font-semibold">
                      Status Harga: {verifiedProduct.priceLabel} (Perlu konfirmasi spesifikasi &amp; kuantiti).
                    </span>
                  )}
                </div>
                <div className="pt-1">
                  <Link
                    href={`/produk/${verifiedProduct.slug}`}
                    className="inline-flex items-center gap-1 text-xs text-[#b48c28] hover:text-[#9a751e] font-semibold hover:underline"
                  >
                    <span>&larr; Lihat detail produk atau ganti produk lain</span>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* SECTION A: Customer Identity */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-5">
            <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
              <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-[#b48c28]">
                <User size={16} />
              </div>
              <div>
                <h2 className="text-base font-bold text-[#0f172a]">A. Identitas Pemesan</h2>
                <p className="text-xs text-slate-500">
                  Data konfirmasi pesanan dan update status produksi bordir.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#0f172a] mb-1.5">
                  Nama Lengkap Pemesan <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Cut Sarah Maulida"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#b48c28]/40 focus:border-[#b48c28] bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0f172a] mb-1.5">
                  Nomor WhatsApp Aktif <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Contoh: 085260118842"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#b48c28]/40 focus:border-[#b48c28] bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0f172a] mb-1.5">
                  Email Aktif <span className="text-slate-400 font-normal">(opsional)</span>
                </label>
                <input
                  type="email"
                  placeholder="sarah@example.com"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#b48c28]/40 focus:border-[#b48c28] bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0f172a] mb-1.5">
                  Kampus / Sekolah / Instansi
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Universitas Teuku Umar (UTU)"
                  value={customerInstitution}
                  onChange={(e) => setCustomerInstitution(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#b48c28]/40 focus:border-[#b48c28] bg-slate-50/50"
                />
              </div>
            </div>
          </div>

          {/* SECTION B: Custom Sash Items Specification */}
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-[#0f172a]">B. Detail Spesifikasi Selempang</h2>
                <p className="text-xs text-slate-500">
                  Masukkan teks nama, gelar, bahan, dan dekorasi untuk setiap item pesanan.
                </p>
              </div>

              <button
                type="button"
                onClick={handleAddItem}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0f172a] text-xs font-bold transition-all cursor-pointer"
              >
                <Plus size={14} />
                <span>Tambah Item Selempang</span>
              </button>
            </div>

            {items.map((item, idx) => {
              const model = SASH_MODELS[item.modelType];
              return (
                <div
                  key={item.id}
                  className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-5 relative"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-[#b48c28] text-white flex items-center justify-center text-xs font-bold">
                        {idx + 1}
                      </span>
                      <span className="text-sm font-bold text-[#0f172a]">
                        Item #{idx + 1}: {model.name}
                      </span>
                    </div>

                    {items.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(idx)}
                        className="text-slate-400 hover:text-rose-500 p-1.5 rounded-lg hover:bg-rose-50 transition-colors"
                        title="Hapus Item Ini"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>

                  {/* Model Selector */}
                  <div>
                    <label className="block text-xs font-bold text-[#0f172a] mb-1.5">
                      Pilihan Model Selempang:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {(["biasa", "syal", "timbal_balik"] as SashModelType[]).map((mKey) => (
                        <button
                          key={mKey}
                          type="button"
                          onClick={() => handleUpdateItem(idx, { modelType: mKey })}
                          className={`p-2.5 rounded-xl border text-xs text-left transition-all cursor-pointer ${
                            item.modelType === mKey
                              ? "bg-amber-50/70 border-[#b48c28] ring-1 ring-[#b48c28] font-bold text-[#0f172a]"
                              : "border-slate-200 hover:border-slate-300 text-slate-700 bg-white"
                          }`}
                        >
                          <div className="text-[10px] text-[#b48c28] uppercase font-bold">
                            {formatIDR(SASH_MODELS[mKey].basePrice)}
                          </div>
                          <div className="font-semibold text-xs leading-tight text-[#0f172a]">
                            {SASH_MODELS[mKey].name}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom Text (Nama & Gelar) */}
                  <div>
                    <label className="block text-xs font-bold text-[#0f172a] mb-1.5">
                      Tulisan Nama Lengkap & Gelar (Bordir) <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={2}
                      placeholder="Contoh: Cut Sarah Maulida, S.E.&#10;Baris 2 (jika ada): Universitas Teuku Umar"
                      value={item.customText}
                      onChange={(e) => handleUpdateItem(idx, { customText: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#b48c28]/40 focus:border-[#b48c28] bg-slate-50/50"
                    />
                    <span className="text-[11px] text-slate-500 mt-1 block">
                      Pastikan ejaan nama, huruf kapital, titik, koma, dan gelar sudah benar.
                    </span>
                  </div>

                  {/* Material & Colors */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#0f172a] mb-1.5">
                        Pilihan Bahan Kain:
                      </label>
                      <select
                        value={item.material}
                        onChange={(e) =>
                          handleUpdateItem(idx, { material: e.target.value as "bludru" | "satin" })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50/50 font-medium"
                      >
                        <option value="bludru">Kain Bludru (Velvet Mewah)</option>
                        <option value="satin">Kain Satin (Kilap Elegan)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0f172a] mb-1.5">
                        Warna Kain:
                      </label>
                      <select
                        value={item.clothColor}
                        onChange={(e) => handleUpdateItem(idx, { clothColor: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50/50 font-medium"
                      >
                        {CLOTH_COLORS.map((col) => (
                          <option key={col} value={col}>
                            {col}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0f172a] mb-1.5">
                        Warna Pita Pinggiran (List):
                      </label>
                      <select
                        value={item.edgeTapeColor}
                        onChange={(e) => handleUpdateItem(idx, { edgeTapeColor: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50/50 font-medium"
                      >
                        {EDGE_TAPE_COLORS.map((col) => (
                          <option key={col} value={col}>
                            {col}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0f172a] mb-1.5">
                        Warna Benang Bordir:
                      </label>
                      <select
                        value={item.threadColor}
                        onChange={(e) => handleUpdateItem(idx, { threadColor: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50/50 font-medium"
                      >
                        {THREAD_COLORS.map((col) => (
                          <option key={col} value={col}>
                            {col}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Addon Decorations (Itemized) */}
                  {item.modelType === "biasa" && (
                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-[#0f172a]">
                          Tambahan Dekorasi (Model Biasa):
                        </label>
                        <span className="text-[10px] text-slate-500">*Renda saling eksklusif</span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {Object.values(ADDONS_BIASA).map((add) => {
                          const isChecked = item.decorations.includes(add.id);
                          return (
                            <button
                              key={add.id}
                              type="button"
                              onClick={() => handleToggleItemAddon(idx, add.id)}
                              className={`p-2 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                                isChecked
                                  ? "bg-amber-50/70 border-[#b48c28] ring-1 ring-[#b48c28] text-[#0f172a] font-bold"
                                  : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                              }`}
                            >
                              <div className="flex items-center justify-between text-[11px]">
                                <span>{add.label}</span>
                                {isChecked && <Check size={12} className="text-[#b48c28]" />}
                              </div>
                              <div className="text-[10px] text-[#b48c28] font-bold">
                                +{formatIDR(add.price)}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {(item.modelType === "syal" || item.modelType === "timbal_balik") && (
                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-[#0f172a]">
                          Tambahan Dekorasi ({item.modelType === "syal" ? "Selempang Model Leher / Syal" : "Selempang Model Leher Timbal Balik"}):
                        </label>
                        <span className="text-[10px] text-slate-500">*Bisa dikombinasikan</span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {Object.values(ADDONS_SYAL)
                          .filter((add, i, arr) => arr.findIndex((a) => a.id === add.id) === i && add.id !== "renda")
                          .map((add) => {
                            const isChecked = item.decorations.includes(add.id) || (add.id === "renda_syal" && item.decorations.includes("renda"));
                            return (
                              <button
                                key={add.id}
                                type="button"
                                onClick={() => handleToggleItemAddon(idx, add.id)}
                                className={`p-2 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                                  isChecked
                                    ? "bg-amber-50/70 border-[#b48c28] ring-1 ring-[#b48c28] text-[#0f172a] font-bold"
                                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                                }`}
                              >
                                <div className="flex items-center justify-between text-[11px]">
                                  <span>{add.label}</span>
                                  {isChecked && <Check size={12} className="text-[#b48c28]" />}
                                </div>
                                <div className="text-[10px] text-[#b48c28] font-bold">
                                  +{formatIDR(add.price)}
                                </div>
                              </button>
                            );
                          })}
                      </div>
                    </div>
                  )}

                  {/* Logo Upload Widget */}
                  <div className="pt-2 border-t border-slate-100 space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-[#0f172a]">
                        Gunakan Logo Kampus / Sekolah:
                      </label>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleUpdateItem(idx, { hasLogo: false, logoUrl: undefined })}
                          className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                            !item.hasLogo
                              ? "bg-slate-800 text-white"
                              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                          }`}
                        >
                          Tanpa Logo
                        </button>
                        <button
                          type="button"
                          onClick={() => handleUpdateItem(idx, { hasLogo: true })}
                          className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                            item.hasLogo
                              ? "bg-[#b48c28] text-white"
                              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                          }`}
                        >
                          Pakai Logo
                        </button>
                      </div>
                    </div>

                    {item.hasLogo && (
                      <div className="p-3.5 rounded-2xl bg-amber-50/50 border border-amber-200/80 space-y-2">
                        <div className="text-[11px] text-[#b48c28] font-bold flex items-center gap-1.5">
                          <Info size={12} className="shrink-0" />
                          <span>Bordir logo resmi kampus/organisasi (+Rp10.000 / unit).</span>
                        </div>

                        <div className="text-xs text-[#0f172a] font-semibold flex items-center justify-between">
                          <span>Unggah File Logo Kampus / Organisasi (PNG / JPG / PDF maks 5MB):</span>
                          {item.logoUrl && (
                            <span className="text-emerald-600 flex items-center gap-1 text-[11px]">
                              <CheckCircle2 size={13} /> Terunggah
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-3">
                          <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-300 hover:border-[#b48c28] text-xs font-bold text-slate-700 cursor-pointer shadow-2xs transition-all">
                            {uploadingLogoIdx === idx ? (
                              <Loader2 size={14} className="animate-spin text-[#b48c28]" />
                            ) : (
                              <Upload size={14} className="text-[#b48c28]" />
                            )}
                            <span>{item.logoUrl ? "Ganti Logo" : "Pilih File Logo"}</span>
                            <input
                              type="file"
                              accept="image/png,image/jpeg,image/webp,application/pdf"
                              disabled={uploadingLogoIdx === idx}
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleLogoUpload(idx, file);
                              }}
                              className="hidden"
                            />
                          </label>

                          {item.logoFilename && (
                            <span className="text-xs text-slate-600 truncate max-w-xs font-mono">
                              {item.logoFilename}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Quantity & Item Subtotal */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#0f172a]">Jumlah Unit:</span>
                      <input
                        type="number"
                        min={1}
                        max={100}
                        value={item.quantity}
                        onChange={(e) =>
                          handleUpdateItem(idx, { quantity: Math.max(1, parseInt(e.target.value) || 1) })
                        }
                        className="w-16 px-2.5 py-1.5 rounded-lg border border-slate-200 text-center text-xs font-bold bg-slate-50"
                      />
                    </div>

                    <div className="text-right">
                      <span className="text-[11px] text-slate-500 block">Subtotal Item:</span>
                      <span className="text-sm font-bold text-[#0f172a] font-mono">
                        {formatIDR(pricingSummary.items[idx]?.subtotal || 0)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* SECTION C: Schedule & Delivery */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-5">
            <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
              <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-[#b48c28]">
                <Calendar size={16} />
              </div>
              <div>
                <h2 className="text-base font-bold text-[#0f172a]">C. Jadwal & Metode Serah Terima</h2>
                <p className="text-xs text-slate-500">
                  Tentukan tanggal acara dan opsi ambil langsung atau pengiriman.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#0f172a] mb-1.5">
                  Tanggal Acara Wisuda / Yudisium <span className="text-rose-500">*</span>
                </label>
                <input
                  type="date"
                  required
                  min={todayStr}
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0f172a] mb-1.5">
                  Target Pesanan Selesai / Diambil <span className="text-rose-500">*</span>
                </label>
                <input
                  type="date"
                  required
                  min={todayStr}
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-slate-50/50"
                />
              </div>
            </div>

            {/* Urgent Deadline Warning */}
            {isUrgentDeadline() && (
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-2.5 text-xs text-amber-900">
                <AlertCircle size={16} className="text-amber-600 mt-0.5 shrink-0" />
                <div>
                  <span className="font-bold">Peringatan Jadwal Mepet (&lt; 48 jam):</span> Pesanan memerlukan konfirmasi pengerjaan oleh admin sebelum dapat dijanjikan selesai pada tanggal target.
                </div>
              </div>
            )}

            {/* Delivery Method Selector */}
            <div>
              <label className="block text-xs font-bold text-[#0f172a] mb-2">
                Metode Pengambilan / Penyerahan:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setDeliveryMethod("pickup")}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                    deliveryMethod === "pickup"
                      ? "bg-amber-50/70 border-[#b48c28] ring-1 ring-[#b48c28]"
                      : "border-slate-200 hover:border-slate-300 bg-white"
                  }`}
                >
                  <Store size={20} className="text-[#b48c28] mt-0.5 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-[#0f172a]">Ambil Langsung di Toko</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Jln Alpen, Gampong Gunung Kleng, Meureubo, Aceh Barat (Gratis).
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryMethod("delivery")}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                    deliveryMethod === "delivery"
                      ? "bg-amber-50/70 border-[#b48c28] ring-1 ring-[#b48c28]"
                      : "border-slate-200 hover:border-slate-300 bg-white"
                  }`}
                >
                  <Truck size={20} className="text-[#b48c28] mt-0.5 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-[#0f172a]">Pengiriman Kurir Lokal</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Diantar ke alamat di Meulaboh &amp; Aceh Barat. Biaya kirim dibayar terpisah saat pengiriman.
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Address fields if delivery chosen */}
            {deliveryMethod === "delivery" && (
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <div>
                  <label className="block text-xs font-bold text-[#0f172a] mb-1.5">
                    Alamat Lengkap Tujuan <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={2}
                    placeholder="Nama jalan, nomor rumah, lorong, atau patokan lokasi..."
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-slate-50/50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#0f172a] mb-1">
                      Kecamatan / Kota
                    </label>
                    <input
                      type="text"
                      value={deliveryCity}
                      onChange={(e) => setDeliveryCity(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#0f172a] mb-1">
                      Kode Pos
                    </label>
                    <input
                      type="text"
                      value={deliveryPostalCode}
                      onChange={(e) => setDeliveryPostalCode(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50/50"
                    />
                  </div>
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-[#0f172a] mb-1.5">
                Catatan Tambahan Jadwal / Permintaan Desain (Opsional)
              </label>
              <input
                type="text"
                placeholder="Contoh: Butuh fitting atau konfirmasi draft bordir via WhatsApp"
                value={scheduleNotes}
                onChange={(e) => setScheduleNotes(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-slate-50/50"
              />
            </div>
          </div>
        </div>

        {/* Right Order & Pricing Summary Column (5 cols on lg) */}
        <div className="lg:col-span-5">
          <div className="sticky top-28 p-6 sm:p-7 rounded-3xl bg-[#0f172a] text-white shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] text-[#b48c28] uppercase font-bold tracking-wider font-mono">
                  Ringkasan Pemesanan
                </span>
                <h3 className="font-serif text-xl font-bold text-white">Rincian Pembayaran</h3>
              </div>
              <Lock size={16} className="text-slate-400" />
            </div>

            {/* Items Breakdown */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {pricingSummary.items.map((it, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-1"
                >
                  <div className="flex justify-between items-center text-slate-200 font-bold">
                    <span>
                      Item #{idx + 1}: {it.modelName} ({it.quantity}x)
                    </span>
                    <span className="font-mono text-[#D4AF37]">{formatIDR(it.subtotal)}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 truncate">
                    Bordir: {items[idx]?.customText || "(Belum diisi)"}
                  </div>
                  {it.selectedAddons.length > 0 && (
                    <div className="text-[10px] text-slate-400">
                      Dekorasi: {it.selectedAddons.map((a) => a.label).join(", ")}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Total Financial Summary */}
            <div className="space-y-2.5 pt-4 border-t border-slate-800 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Total Nilai Produk ({items.length} item):</span>
                <span className="font-mono font-bold text-white">
                  {formatIDR(pricingSummary.totalProduct)}
                </span>
              </div>

              {/* DP 50% Obligation */}
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 space-y-1">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span>DP 50% Wajib Dibayar Sekarang:</span>
                  <span className="text-base font-mono font-extrabold text-[#D4AF37]">
                    {formatIDR(pricingSummary.dpAmount)}
                  </span>
                </div>
                <div className="text-[11px] text-amber-200/80">
                  Pembayaran DP aman diverifikasi otomatis via Midtrans.
                </div>
              </div>

              {/* Settlement 50% */}
              <div className="flex justify-between text-slate-400 text-xs pt-1">
                <span>Sisa Pelunasan (50%):</span>
                <span className="font-mono font-bold text-slate-200">
                  {formatIDR(pricingSummary.balanceAmount)}
                </span>
              </div>
              <div className="text-[11px] text-slate-500">
                *Sisa pelunasan 50% dibayar saat pesanan selesai dibuat dan siap diambil / diserahterimakan.
              </div>

              {deliveryMethod === "delivery" && (
                <div className="text-[11px] text-amber-200/70 pt-1">
                  *Biaya ongkos kirim belum dimasukkan ke total dan akan dikonfirmasi langsung sesuai alamat pengiriman.
                </div>
              )}
            </div>

            {/* Error Message Box */}
            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2">
                <AlertCircle size={15} className="text-rose-400 mt-0.5 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Submit Area: WhatsApp Consultation when in Draft, or Online Order when Published */}
            <div className="pt-2 space-y-3">
              {serverStatusCheck.isDraftBlocked ? (
                <>
                  <a
                    href={whatsappConsultationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 px-6 rounded-xl font-bold text-sm sm:text-base tracking-wide bg-[#b48c28] hover:bg-[#9a751e] text-white shadow-md flex items-center justify-center gap-2.5 transition-all active:scale-98 cursor-pointer text-center"
                  >
                    <MessageCircle size={18} />
                    <span>Pesan via WhatsApp Resmi ({STORE_INFO.accounts.selempang.whatsappDisplay})</span>
                  </a>

                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-center text-xs text-slate-400 space-y-1">
                    <div className="flex items-center justify-center gap-1.5 font-semibold text-amber-300">
                      <Info size={14} className="text-[#D4AF37]" />
                      <span>Pemesanan Online Otomatis Belum Dibuka</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Konfigurasi selempang ini dalam tahap finalisasi harga butik FHD. Pemesanan dan konfirmasi manual dilayani langsung via admin WhatsApp di atas.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <button
                    type="submit"
                    disabled={submitState === "submitting" || submitState === "success"}
                    className={`w-full py-4 px-6 rounded-xl font-bold text-sm tracking-wide transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                      submitState === "submitting"
                        ? "bg-slate-700 text-slate-400 cursor-not-allowed"
                        : submitState === "success"
                        ? "bg-emerald-600 text-white cursor-not-allowed"
                        : "bg-[#b48c28] hover:bg-[#9a751e] text-white active:scale-98"
                    }`}
                  >
                    {submitState === "submitting" ? (
                      <>
                        <Loader2 size={18} className="animate-spin text-amber-300" />
                        <span>Sedang Memproses Pesanan...</span>
                      </>
                    ) : submitState === "success" ? (
                      <>
                        <CheckCircle2 size={18} />
                        <span>Pesanan Berhasil Dibuat</span>
                      </>
                    ) : (
                      <>
                        <span>Pesan Sekarang • Bayar DP 50% ({formatIDR(pricingSummary.dpAmount)})</span>
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>

                  <div className="mt-3 text-center text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
                    <ShieldCheck size={13} className="text-[#b48c28]" />
                    <span>Proteksi sistem anti-duplikasi aktif.</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
