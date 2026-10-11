---
version: alpha
name: Executive Heritage Atelier
description: Distinctive luxury dark aesthetic blending master tailoring craftsmanship with prestigious academic graduation heritage.
colors:
  primary: "#D4AF37"
  primary-hover: "#F59E0B"
  primary-light: "#FDE68A"
  secondary: "#161922"
  secondary-hover: "#1E2230"
  neutral-dark: "#090A0F"
  neutral-surface: "#0F1117"
  neutral-card: "#141721"
  neutral-border: "#242938"
  neutral-muted: "#94A3B8"
  neutral-light: "#F8FAFC"
  accent-success: "#10B981"
  accent-warning: "#F59E0B"
  accent-danger: "#EF4444"
typography:
  h1:
    fontFamily: Plus Jakarta Sans, sans-serif
    fontSize: 3.5rem
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.03em"
  h2:
    fontFamily: Plus Jakarta Sans, sans-serif
    fontSize: 2.25rem
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  h3:
    fontFamily: Plus Jakarta Sans, sans-serif
    fontSize: 1.5rem
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  body-lg:
    fontFamily: Plus Jakarta Sans, sans-serif
    fontSize: 1.125rem
    fontWeight: 400
    lineHeight: 1.6
  body-md:
    fontFamily: Plus Jakarta Sans, sans-serif
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.5
  body-sm:
    fontFamily: Plus Jakarta Sans, sans-serif
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.4
  mono-price:
    fontFamily: JetBrains Mono, monospace
    fontSize: 1.25rem
    fontWeight: 700
    lineHeight: 1.2
rounded:
  sm: 6px
  md: 10px
  lg: 16px
  xl: 24px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral-dark}"
    rounded: "{rounded.md}"
    padding: 14px
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.neutral-dark}"
    rounded: "{rounded.md}"
    padding: 14px
  button-secondary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.neutral-light}"
    rounded: "{rounded.md}"
    padding: 14px
  button-secondary-hover:
    backgroundColor: "{colors.secondary-hover}"
    textColor: "{colors.primary-light}"
    rounded: "{rounded.md}"
    padding: 14px
  badge-status:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.primary}"
    rounded: "{rounded.full}"
    padding: 8px
  badge-success:
    backgroundColor: "{colors.accent-success}"
    textColor: "{colors.neutral-dark}"
    rounded: "{rounded.full}"
    padding: 6px
  badge-warning:
    backgroundColor: "{colors.accent-warning}"
    textColor: "{colors.neutral-dark}"
    rounded: "{rounded.full}"
    padding: 6px
  badge-danger:
    backgroundColor: "{colors.accent-danger}"
    textColor: "{colors.neutral-light}"
    rounded: "{rounded.full}"
    padding: 6px
  input-field:
    backgroundColor: "{colors.neutral-dark}"
    textColor: "{colors.neutral-light}"
    rounded: "{rounded.md}"
    padding: 12px
  card-product:
    backgroundColor: "{colors.neutral-card}"
    textColor: "{colors.neutral-light}"
    rounded: "{rounded.lg}"
    padding: 20px
  checkout-card:
    backgroundColor: "{colors.neutral-surface}"
    textColor: "{colors.neutral-light}"
    rounded: "{rounded.xl}"
    padding: 24px
---

## Overview

Executive Heritage Atelier adalah sistem desain resmi untuk platform terpadu **Sewa Jas, Sepatu & Custom Selempang Aceh Barat** (Bg Fardi, Meulaboh). Sistem ini menolak template generic putih dan AI-slop pasaran, dengan menghadirkan identitas visual yang maskulin, prestisius, berwibawa, dan tajam.

Karakter visual memadukan dua esensi utama:
1. **The Master Tailor Craftsmanship:** Nuansa atelier penjahit jas klasik, pencahayaan dramatis studio (warm rim light & dark textures), serta potongan setelan jas formal berkualitas tinggi.
2. **Academic Graduation Prestige:** Kilau bordir benang emas di atas kain bludru mewah, merepresentasikan kebanggaan momen sakral kelulusan mahasiswa Universitas Teuku Umar (UTU) dan STAIN Meulaboh.

### Hero Section Background & Visual Atmosphere
Khusus pada bagian **Hero Section Landing Page**, latar belakang menggunakan gambar sinematik berkualitas tinggi yang memperlihatkan setelan jas formal premium berpadu dengan selempang wisuda bludru berbenang emas dalam pencahayaan atelier gelap. 

Latar belakang visual ini dilapisi dengan **Multi-Layer Radial & Linear Dark Mask (`#090A0F/85` to `#090A0F/95`)** sehingga seluruh teks headline, badge promosi, dan tombol aksi utama tetap memiliki kontras sempurna (WCAG AAA) dan keterbacaan yang tajam tanpa terdistraksi oleh gambar.

---

## Colors

Pewarnaan menerapkan aturan **60-30-10 Rule** untuk menjamin keseimbangan estetika dan fokus konversi:

- **Dominant Base (60%):** `#090A0F` (Deep Obsidian) dan `#0F1117` (Neutral Surface). Memberikan kanvas gelap pekat yang mewah, tenang, dan berfokus pada produk.
- **Structural & Container (30%):** `#161922` (Deep Slate Navy), `#141721` (Card Neutral), dan `#242938` (Subtle Metallic Border). Memberikan kedalaman layer antar section dan komponen interaktif.
- **Accent & Interaction (10%):** `#D4AF37` (Royal Gold) dan `#F59E0B` (Amber Gold). Mengarahkan perhatian mata pengguna ke titik konversi krusial: tombol booking, tag harga, status stok tersedia, dan highlight paket bundling.

| Token | Hex | Rasio Penggunaan | Makna & Penggunaan |
| :--- | :--- | :--- | :--- |
| `colors.neutral-dark` | `#090A0F` | 60% (Base) | Background utama body dan backdrop gelap hero section. |
| `colors.secondary` | `#161922` | 30% (Structure) | Latar belakang kartu, container katalog, dan filter size. |
| `colors.primary` | `#D4AF37` | 10% (Action) | Aksen emas prestise: CTA utama, bintang rating, border aktif, harga. |
| `colors.neutral-light` | `#F8FAFC` | Teks Primer | Teks judul dan deskripsi utama (kontras tinggi, anti blur). |
| `colors.neutral-muted` | `#94A3B8` | Teks Sekunder | Label bantuan, size guide note, dan metadata timestamp. |

---

## Typography

Sistem tipografi dirancang untuk ketegasan, kredibilitas, dan keterbacaan tinggi di layar smartphone:

- **Primary Display & Headings:** `Plus Jakarta Sans` (Font modern dengan geometri geometris tegas, bobot 700/800 untuk judul besar dan 600 untuk subjudul).
- **Body & Interactive Labels:** `Plus Jakarta Sans` (Bobot 400 untuk kenyamanan membaca paragraf deskripsi dan 500 untuk form input).
- **Price Tags & Size Codes:** `JetBrains Mono` (Font monospace modern untuk angka harga Rp, countdown timer pembayaran, dan kode ukuran S/M/L/XL).
- **Selempang Customizer Preview:** Mendukung 4 font bordir khas wisuda: `Monotype Corsiva`, `Cinzel`, `Times New Roman`, dan `Arial Bold`.

---

## Layout

- **Container Max Width:** `1280px` (`max-w-7xl`) untuk desktop, dengan padding horizontal responsif `px-4 sm:px-6 lg:px-8`.
- **Grid System:**
  - Hero Section: Single-column centered high-impact with spotlight overlay.
  - Katalog Produk: Responsive Grid `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`.
  - Bundling Calculator: 2-Column interactive split `grid-cols-1 lg:grid-cols-12 gap-8`.
  - Custom Checkout: 2-Column split `grid-cols-1 lg:grid-cols-7 gap-8` (Summary col-4, Payment Form col-3).
- **Spacing Scale:** Berbasis kelipatan 8px (`sm: 8px`, `md: 16px`, `lg: 24px`, `xl: 32px`, `3xl: 64px`) untuk ritme vertikal yang konsisten.

---

## Elevation & Depth

- **Surface Layering:**
  - Level 0 (Backdrop): `#090A0F`
  - Level 1 (Section Container): `#0F1117`
  - Level 2 (Interactive Card): `#141721` dengan border `1px solid #242938`
  - Level 3 (Active Modal / Popup Drawer): `#1A1D2B` dengan shadow glowing emas lembut `0 10px 30px -10px rgba(212, 175, 55, 0.15)`
- **Border Glow Interaction:** Komponen kartu katalog dan QRIS payment memiliki efek *hover border glow* menggunakan aksen emas lembut `#D4AF37`.

---

## Shapes

- **Radius Scale:**
  - `rounded.sm` (6px): Tag label, badge ukuran, checkbox filter.
  - `rounded.md` (10px): Tombol CTA utama, form input, selector dropdown.
  - `rounded.lg` (16px): Kartu produk katalog, size guide card.
  - `rounded.xl` (24px): Kartu checkout utama, container bundling calculator.
  - `rounded.full` (9999px): Badge ketersediaan stok, avatar testimoni, floating WA button.

---

## Components

### 1. Hero Section Banner with Character Background
```html
<section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-neutral-dark">
  <!-- Background Image with Character Overlay -->
  <div className="absolute inset-0 z-0">
    <img 
      src="/images/hero-atelier-tailor-sash.webp" 
      alt="Sewa Jas dan Selempang Wisuda Aceh Barat" 
      className="w-full h-full object-cover object-center scale-105 transform motion-safe:animate-subtle-zoom"
    />
    <!-- Multi-Layer Vignette & Gradient Mask -->
    <div className="absolute inset-0 bg-gradient-to-t from-neutral-dark via-neutral-dark/85 to-neutral-dark/60" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-neutral-dark/70 to-neutral-dark" />
  </div>

  <!-- Interactive Spotlight (React Bits) & Content -->
  <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/80 border border-primary/30 backdrop-blur-md mb-6">
      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
      <span className="text-xs font-semibold uppercase tracking-wider text-primary">Ready Stock Wisuda UTU & STAIN 2026</span>
    </div>
    <h1 className="text-4xl sm:text-6xl font-extrabold text-neutral-light tracking-tight mb-6">
      Tampil Berwibawa & Prestisius <br className="hidden sm:inline"/>
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-light to-primary">
        Di Hari Bersejarah Anda
      </span>
    </h1>
    <p className="text-lg sm:text-xl text-neutral-muted max-w-2xl mx-auto mb-10">
      Pusat persewaan paket jas formal lengkap, sepatu pantofel kilap, dan custom selempang wisuda bludru bordir emas nomor 1 di Meulaboh, Aceh Barat.
    </p>
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
      <a href="#katalog" className="w-full sm:w-auto px-8 py-4 rounded-md bg-primary hover:bg-primary-hover text-neutral-dark font-bold text-base transition-all transform active:scale-95 shadow-lg shadow-primary/20">
        Lihat Katalog & Booking Sekarang
      </a>
      <a href="#custom-selempang" className="w-full sm:w-auto px-8 py-4 rounded-md bg-secondary hover:bg-secondary-hover text-neutral-light border border-neutral-border font-semibold text-base transition-all">
        Custom Selempang Nama/Gelar
      </a>
    </div>
  </div>
</section>
```

### 2. Live Customizer Preview Card (Selempang Bludru)
- Komponen interaktif dengan visualisasi kain selempang real-time.
- Memungkinkan pengguna mengetik nama/gelar dan melihat langsung rendering font bordir emas pada kain bludru hitam/navy/maroon.

### 3. Custom Midtrans Dark Checkout Card
- Card kontainer gelap `#141721` dengan border emas halus.
- QRIS Box dengan dynamic glowing border dan countdown timer digital.
- Tombol *“Simulate Payment Success”* (Sandbox Demo Mode) yang memicu animasi confetti Framer Motion.

---

## Do's and Don'ts

### Do's
- **DO** gunakan background visual atelier gelap pada hero section dengan masking gradient tebal agar kontras teks tetap tajam (WCAG AAA).
- **DO** prioritaskan hierarki warna 60-30-10 (Dominan Hitam Obsidian, Struktur Slate Navy, Aksen Emas Royal).
- **DO** tampilkan harga sewa transparan dengan font monospace (`JetBrains Mono`).
- **DO** sediakan opsi Sandbox Switch pada checkout demo agar Bg Fardi dapat melihat langsung alur pembayaran sukses saat presentasi tatap muka.

### Don'ts
- **DON'T** gunakan template putih standar pop-up Midtrans Snap yang merusak estetika website luxury.
- **DON'T** gunakan font default generic (seperti Inter atau Roboto murni tanpa styling khusus).
- **DON'T** letakkan gambar hero section tanpa dark overlay mask (teks akan tenggelam dan sulit dibaca di HP).
- **DON'T** gunakan gradien ungu/pink AI-slop pasaran yang tidak relevan dengan karakter maskulin jas formal dan wisuda Aceh.
