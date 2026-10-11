"use client";

export type TransactionStatus = "Pending DP" | "Lunas Fitting" | "Selesai" | "Batal";

export type ServiceCategory = "Selempang" | "Sewa Outfit" | "Apparel PDH" | "Paket Wisuda";

export interface Transaction {
  id: string; // misal "#SAB-2632"
  clientName: string;
  clientPhone: string;
  university: string;
  serviceCategory: ServiceCategory;
  items: string;
  size?: string;
  color?: string;
  startDate: string;
  endDate: string;
  dateRange: string;
  totalAmount: number;
  dpAmount: number;
  paymentMethod: string;
  status: TransactionStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTransactionInput {
  clientName: string;
  clientPhone: string;
  university: string;
  serviceCategory: ServiceCategory;
  items: string;
  size?: string;
  color?: string;
  startDate: string;
  endDate: string;
  totalAmount: number;
  dpAmount: number;
  paymentMethod: string;
  status: TransactionStatus;
  notes?: string;
}

export interface TransactionStats {
  totalCount: number;
  pendingCount: number;
  lunasCount: number;
  selesaiCount: number;
  batalCount: number;
  totalRevenue: number;
  pendingRevenue: number;
}

// 22+ Data Transaksi Awal (Seeding Realistis Aceh Barat & Meulaboh)
export const INITIAL_MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "#SAB-2632",
    clientName: "Cut Sarah Maulida",
    clientPhone: "0852-6011-8842",
    university: "Universitas Teuku Umar (UTU)",
    serviceCategory: "Selempang",
    items: "Selempang Bludru 2 Lapis + Lis Renda Rumbai Emas (Nama & Gelar: Cut Sarah Maulida, S.E.)",
    color: "Hitam",
    startDate: "2026-10-14",
    endDate: "2026-10-15",
    dateRange: "14 Okt - 15 Okt 2026",
    totalAmount: 135000,
    dpAmount: 50000,
    paymentMethod: "Midtrans Snap QRIS",
    status: "Pending DP",
    notes: "Request font Monotype Corsiva benang metalik gold. Ambil di Alpen Store.",
    createdAt: "2026-10-11T08:30:00Z",
    updatedAt: "2026-10-11T08:30:00Z",
  },
  {
    id: "#SAB-2631",
    clientName: "M. Zaki Al-Farisi",
    clientPhone: "0822-7744-1190",
    university: "Universitas Teuku Umar (UTU)",
    serviceCategory: "Paket Wisuda",
    items: "Paket Bundling Sultan: Sewa Jas Pria Slim Fit + Dasi + Selempang Bordir Komputer Bludru",
    size: "Size L (Jas)",
    color: "Jas Hitam / Selempang Maron",
    startDate: "2026-10-15",
    endDate: "2026-10-18",
    dateRange: "15 Okt - 18 Okt 2026",
    totalAmount: 165000,
    dpAmount: 165000,
    paymentMethod: "Transfer Bank BSI",
    status: "Lunas Fitting",
    notes: "Fitting tanggal 14 Okt sore sudah pas. Siap ambil H-1 wisuda.",
    createdAt: "2026-10-10T14:20:00Z",
    updatedAt: "2026-10-10T16:00:00Z",
  },
  {
    id: "#SAB-2630",
    clientName: "Dara Mutia Sari",
    clientPhone: "0813-9820-4412",
    university: "STAIN Teungku Dirundeng Meulaboh",
    serviceCategory: "Sewa Outfit",
    items: "Sewa Blazer Wanita Formal Kancing Dua + Kemeja Putih Berkerah",
    size: "Size M",
    color: "Hitam Pekat",
    startDate: "2026-10-12",
    endDate: "2026-10-15",
    dateRange: "12 Okt - 15 Okt 2026",
    totalAmount: 75000,
    dpAmount: 75000,
    paymentMethod: "Midtrans Snap QRIS",
    status: "Selesai",
    notes: "Sudah dikembalikan dalam kondisi bersih dan wangi. Transaksi tuntas.",
    createdAt: "2026-10-09T09:10:00Z",
    updatedAt: "2026-10-11T07:45:00Z",
  },
  {
    id: "#SAB-2629",
    clientName: "Teuku Ryan Pratama",
    clientPhone: "0853-7019-3381",
    university: "Universitas Teuku Umar (UTU)",
    serviceCategory: "Sewa Outfit",
    items: "Sewa Jas Pria Regular Fit + Sepatu Pantofel Kulit Kilap",
    size: "Size XL / Sepatu Size 42",
    color: "Hitam",
    startDate: "2026-10-16",
    endDate: "2026-10-19",
    dateRange: "16 Okt - 19 Okt 2026",
    totalAmount: 85000,
    dpAmount: 40000,
    paymentMethod: "Cash di Alpen Store",
    status: "Pending DP",
    notes: "Sisa pelunasan Rp 45.000 saat pengambilan barang.",
    createdAt: "2026-10-10T17:15:00Z",
    updatedAt: "2026-10-10T17:15:00Z",
  },
  {
    id: "#SAB-2628",
    clientName: "Nadia Ulfah, S.Pt.",
    clientPhone: "0812-6340-9921",
    university: "Universitas Syiah Kuala (USK)",
    serviceCategory: "Selempang",
    items: "Selempang Bordir Satin Silk Kilap Double Layer + Lis Emas Metalik",
    color: "Maron Silk",
    startDate: "2026-10-13",
    endDate: "2026-10-14",
    dateRange: "13 Okt - 14 Okt 2026",
    totalAmount: 85000,
    dpAmount: 85000,
    paymentMethod: "Transfer Bank BSI",
    status: "Selesai",
    notes: "Kirim via kurir kilat Meulaboh ke alamat kosan Alue Peunyareng.",
    createdAt: "2026-10-08T11:00:00Z",
    updatedAt: "2026-10-10T12:30:00Z",
  },
  {
    id: "#SAB-2627",
    clientName: "Iqbal Ramadhan",
    clientPhone: "0823-6110-5543",
    university: "STAIN Teungku Dirundeng Meulaboh",
    serviceCategory: "Sewa Outfit",
    items: "Sewa Jas Pria Formal + Dasi Hitam Panjang",
    size: "Size S",
    color: "Hitam",
    startDate: "2026-10-14",
    endDate: "2026-10-17",
    dateRange: "14 Okt - 17 Okt 2026",
    totalAmount: 50000,
    dpAmount: 50000,
    paymentMethod: "Midtrans Snap QRIS",
    status: "Lunas Fitting",
    notes: "Fitting oke, kancing jas sudah diperiksa kencang.",
    createdAt: "2026-10-09T13:40:00Z",
    updatedAt: "2026-10-10T15:00:00Z",
  },
  {
    id: "#SAB-2626",
    clientName: "Rahmat Hidayatullah",
    clientPhone: "0852-7100-8899",
    university: "Universitas Teuku Umar (UTU)",
    serviceCategory: "Apparel PDH",
    items: "Pembuatan Baju PDH Organisasi Himpunan Mahasiswa (24 Pcs) + Bordir Logo Kampus",
    size: "Campur (S - XXL)",
    color: "Navy Kombinasi Abu",
    startDate: "2026-10-05",
    endDate: "2026-10-20",
    dateRange: "05 Okt - 20 Okt 2026",
    totalAmount: 2640000,
    dpAmount: 1500000,
    paymentMethod: "Transfer Bank BSI",
    status: "Lunas Fitting",
    notes: "Proses jahit bordir komputer sedang berjalan di workshop Meulaboh.",
    createdAt: "2026-10-05T10:00:00Z",
    updatedAt: "2026-10-07T14:00:00Z",
  },
  {
    id: "#SAB-2625",
    clientName: "Fathimah Az-Zahra",
    clientPhone: "0821-6543-2210",
    university: "Poltekkes Kemenkes Aceh",
    serviceCategory: "Selempang",
    items: "Selempang Wisuda Bludru Hijau Tua Bordir Emas Logo Prodi Kebidanan",
    color: "Hijau",
    startDate: "2026-10-18",
    endDate: "2026-10-19",
    dateRange: "18 Okt - 19 Okt 2026",
    totalAmount: 90000,
    dpAmount: 45000,
    paymentMethod: "Midtrans Snap QRIS",
    status: "Pending DP",
    notes: "Menunggu konfirmasi ejaan gelar Profesi Bidan dari kampus.",
    createdAt: "2026-10-11T09:15:00Z",
    updatedAt: "2026-10-11T09:15:00Z",
  },
  {
    id: "#SAB-2624",
    clientName: "Ahmad Dani Syahputra",
    clientPhone: "0852-6633-1188",
    university: "Universitas Teuku Umar (UTU)",
    serviceCategory: "Sewa Outfit",
    items: "Sewa Sepatu Pantofel Pria Kulit Mengkilap (Insole Lembut)",
    size: "Size 43",
    color: "Hitam Kilap",
    startDate: "2026-10-11",
    endDate: "2026-10-14",
    dateRange: "11 Okt - 14 Okt 2026",
    totalAmount: 35000,
    dpAmount: 35000,
    paymentMethod: "Cash di Alpen Store",
    status: "Selesai",
    notes: "Sepatu sudah disemir ulang dan siap dipakai wisudawan.",
    createdAt: "2026-10-07T16:20:00Z",
    updatedAt: "2026-10-11T10:00:00Z",
  },
  {
    id: "#SAB-2623",
    clientName: "Putri Amanda",
    clientPhone: "0813-7555-4422",
    university: "STAIN Teungku Dirundeng Meulaboh",
    serviceCategory: "Selempang",
    items: "Selempang Bludru Double Layer List Renda Perak (Nama: Putri Amanda, S.Pd.)",
    color: "Hitam",
    startDate: "2026-10-10",
    endDate: "2026-10-11",
    dateRange: "10 Okt - 11 Okt 2026",
    totalAmount: 90000,
    dpAmount: 0,
    paymentMethod: "Midtrans Snap QRIS",
    status: "Batal",
    notes: "Klien membatalkan jadwal sidang munaqasyah diundur bulan depan.",
    createdAt: "2026-10-06T08:00:00Z",
    updatedAt: "2026-10-08T11:00:00Z",
  },
  {
    id: "#SAB-2622",
    clientName: "Budi Santoso",
    clientPhone: "0823-9090-3321",
    university: "Universitas Teuku Umar (UTU)",
    serviceCategory: "Paket Wisuda",
    items: "Paket Sultan Komplit: Jas Pria L + Kemeja + Dasi + Celana Formal + Selempang Bordir Bludru",
    size: "Size L / Celana 32",
    color: "Hitam",
    startDate: "2026-10-19",
    endDate: "2026-10-22",
    dateRange: "19 Okt - 22 Okt 2026",
    totalAmount: 185000,
    dpAmount: 100000,
    paymentMethod: "Transfer Bank BSI",
    status: "Lunas Fitting",
    notes: "Pelunasan sisa Rp 85.000 saat serah terima barang.",
    createdAt: "2026-10-09T15:30:00Z",
    updatedAt: "2026-10-10T09:00:00Z",
  },
  {
    id: "#SAB-2621",
    clientName: "Nurul Aini",
    clientPhone: "0852-8812-7744",
    university: "Universitas Teuku Umar (UTU)",
    serviceCategory: "Selempang",
    items: "Selempang Satin Ungu Bordir Komputer Benang Perak + Renda Satin",
    color: "Ungu",
    startDate: "2026-10-13",
    endDate: "2026-10-14",
    dateRange: "13 Okt - 14 Okt 2026",
    totalAmount: 65000,
    dpAmount: 65000,
    paymentMethod: "Midtrans Snap QRIS",
    status: "Selesai",
    notes: "Sudah diserahkan langsung di workshop Meulaboh.",
    createdAt: "2026-10-07T12:00:00Z",
    updatedAt: "2026-10-09T16:00:00Z",
  },
  {
    id: "#SAB-2620",
    clientName: "Alif Maulana",
    clientPhone: "0812-3344-9988",
    university: "AKN Aceh Barat",
    serviceCategory: "Sewa Outfit",
    items: "Sewa Jas Pria Modern Slim Fit Warna Navy + Dasi Kupu-Kupu",
    size: "Size M",
    color: "Navy",
    startDate: "2026-10-16",
    endDate: "2026-10-19",
    dateRange: "16 Okt - 19 Okt 2026",
    totalAmount: 60000,
    dpAmount: 30000,
    paymentMethod: "Cash di Alpen Store",
    status: "Pending DP",
    notes: "Booking ukuran aman, fitting jadwal besok sore.",
    createdAt: "2026-10-11T07:20:00Z",
    updatedAt: "2026-10-11T07:20:00Z",
  },
  {
    id: "#SAB-2619",
    clientName: "Rina Kusuma Dewi",
    clientPhone: "0853-4455-6677",
    university: "Universitas Teuku Umar (UTU)",
    serviceCategory: "Selempang",
    items: "Selempang Bludru Maron Bordir Emas List Rumbai (Nama: Rina Kusuma Dewi, S.Kel.)",
    color: "Maron",
    startDate: "2026-10-15",
    endDate: "2026-10-16",
    dateRange: "15 Okt - 16 Okt 2026",
    totalAmount: 85000,
    dpAmount: 85000,
    paymentMethod: "Transfer Bank BSI",
    status: "Lunas Fitting",
    notes: "Garansi anti-typo dicek oke. Siap bordir komputer kilat.",
    createdAt: "2026-10-10T11:45:00Z",
    updatedAt: "2026-10-10T14:10:00Z",
  },
  {
    id: "#SAB-2618",
    clientName: "Hafiz Ridwan",
    clientPhone: "0822-1234-5678",
    university: "Universitas Teuku Umar (UTU)",
    serviceCategory: "Sewa Outfit",
    items: "Sewa Jas Pria Jumbo Size XXL + Celana Bahan Formal Size 38",
    size: "Size XXL / Celana 38",
    color: "Hitam",
    startDate: "2026-10-17",
    endDate: "2026-10-20",
    dateRange: "17 Okt - 20 Okt 2026",
    totalAmount: 70000,
    dpAmount: 70000,
    paymentMethod: "Midtrans Snap QRIS",
    status: "Lunas Fitting",
    notes: "Sudah dicoba dan pas di lingkar dada 116 cm.",
    createdAt: "2026-10-09T10:15:00Z",
    updatedAt: "2026-10-09T18:00:00Z",
  },
  {
    id: "#SAB-2617",
    clientName: "Siti Rahmah, S.Ag.",
    clientPhone: "0852-9988-7766",
    university: "STAIN Teungku Dirundeng Meulaboh",
    serviceCategory: "Selempang",
    items: "Selempang Bludru Hitam Bordir Benang Emas Full Logo STAIN Meulaboh",
    color: "Hitam",
    startDate: "2026-10-12",
    endDate: "2026-10-13",
    dateRange: "12 Okt - 13 Okt 2026",
    totalAmount: 90000,
    dpAmount: 90000,
    paymentMethod: "Transfer Bank BSI",
    status: "Selesai",
    notes: "Tuntas diserahkan, klien puas dengan kerapian logo kampus.",
    createdAt: "2026-10-06T14:00:00Z",
    updatedAt: "2026-10-08T17:00:00Z",
  },
  {
    id: "#SAB-2616",
    clientName: "Wahyu Ilahi",
    clientPhone: "0813-2211-0099",
    university: "Universitas Teuku Umar (UTU)",
    serviceCategory: "Apparel PDH",
    items: "Id Card Panitia PVC Tebal 0.76mm (50 Pcs) + Tali Lanyard Cetak Logo UTU",
    color: "Tali Kuning UTU",
    startDate: "2026-10-08",
    endDate: "2026-10-12",
    dateRange: "08 Okt - 12 Okt 2026",
    totalAmount: 750000,
    dpAmount: 750000,
    paymentMethod: "Transfer Bank BSI",
    status: "Selesai",
    notes: "Selesai cetak sebelum gladi bersih acara yudisium.",
    createdAt: "2026-10-04T09:00:00Z",
    updatedAt: "2026-10-07T16:30:00Z",
  },
  {
    id: "#SAB-2615",
    clientName: "Indra Gunawan",
    clientPhone: "0823-7766-5544",
    university: "Universitas Teuku Umar (UTU)",
    serviceCategory: "Sewa Outfit",
    items: "Sewa Jas Pria Size M + Kemeja Putih Lengan Panjang",
    size: "Size M",
    color: "Hitam",
    startDate: "2026-10-15",
    endDate: "2026-10-18",
    dateRange: "15 Okt - 18 Okt 2026",
    totalAmount: 65000,
    dpAmount: 20000,
    paymentMethod: "Cash di Alpen Store",
    status: "Pending DP",
    notes: "DP titip teman, fitting besok siang jam istirahat kampus.",
    createdAt: "2026-10-11T06:00:00Z",
    updatedAt: "2026-10-11T06:00:00Z",
  },
  {
    id: "#SAB-2614",
    clientName: "Fitria Handayani",
    clientPhone: "0812-4499-1122",
    university: "Poltekkes Kemenkes Aceh",
    serviceCategory: "Paket Wisuda",
    items: "Paket Wisuda: Blazer Formal Wanita + Selempang Bludru Pink Bordir Emas",
    size: "Size S",
    color: "Pink",
    startDate: "2026-10-18",
    endDate: "2026-10-21",
    dateRange: "18 Okt - 21 Okt 2026",
    totalAmount: 140000,
    dpAmount: 140000,
    paymentMethod: "Midtrans Snap QRIS",
    status: "Lunas Fitting",
    notes: "Siap diambil di Alpen Store Meureubo.",
    createdAt: "2026-10-10T13:00:00Z",
    updatedAt: "2026-10-11T08:00:00Z",
  },
  {
    id: "#SAB-2613",
    clientName: "Reza Pahlevi",
    clientPhone: "0853-9900-2211",
    university: "Universitas Teuku Umar (UTU)",
    serviceCategory: "Sewa Outfit",
    items: "Sewa Jas Pria Size L",
    size: "Size L",
    color: "Hitam",
    startDate: "2026-10-11",
    endDate: "2026-10-14",
    dateRange: "11 Okt - 14 Okt 2026",
    totalAmount: 50000,
    dpAmount: 0,
    paymentMethod: "Cash di Alpen Store",
    status: "Batal",
    notes: "Jadwal sidang skripsi ditunda karena dosen penguji dinas luar.",
    createdAt: "2026-10-07T10:00:00Z",
    updatedAt: "2026-10-08T09:00:00Z",
  },
  {
    id: "#SAB-2612",
    clientName: "Maulana Malik",
    clientPhone: "0822-5566-7788",
    university: "Universitas Teuku Umar (UTU)",
    serviceCategory: "Selempang",
    items: "Selempang Wisuda Bordir Komputer Bludru Navy Benang Perak (Nama: Maulana Malik, S.T.)",
    color: "Navy",
    startDate: "2026-10-14",
    endDate: "2026-10-15",
    dateRange: "14 Okt - 15 Okt 2026",
    totalAmount: 80000,
    dpAmount: 80000,
    paymentMethod: "Midtrans Snap QRIS",
    status: "Lunas Fitting",
    notes: "Pengerjaan bordir kilat 1 hari selesai tepat waktu.",
    createdAt: "2026-10-10T15:00:00Z",
    updatedAt: "2026-10-11T09:00:00Z",
  },
  {
    id: "#SAB-2611",
    clientName: "Cut Intan Permata",
    clientPhone: "0813-8899-0011",
    university: "STAIN Teungku Dirundeng Meulaboh",
    serviceCategory: "Selempang",
    items: "Selempang Bludru Maron Bordir Emas 2 Sisi (Nama + Cum Laude)",
    color: "Maron",
    startDate: "2026-10-12",
    endDate: "2026-10-13",
    dateRange: "12 Okt - 13 Okt 2026",
    totalAmount: 95000,
    dpAmount: 95000,
    paymentMethod: "Transfer Bank BSI",
    status: "Selesai",
    notes: "Bordir predikat 'Cum Laude' di sisi kiri dan nama lengkap di sisi kanan.",
    createdAt: "2026-10-05T11:00:00Z",
    updatedAt: "2026-10-07T18:00:00Z",
  },
];

const STORAGE_KEY = "sab_admin_transactions_v1";

/**
 * Transaction Service - Dual Mode Architecture
 * - Pre-Database Mode: Membaca dan memutasi state secara instan di LocalStorage client-side.
 * - Post-Database Mode: Cukup ubah implementasi fungsi di bawah ini ke Prisma/MySQL query tanpa perlu merombak komponen UI.
 */
export const transactionService = {
  /**
   * Mengambil semua transaksi dari LocalStorage atau default mock
   */
  getAll(): Transaction[] {
    if (typeof window === "undefined") {
      return INITIAL_MOCK_TRANSACTIONS;
    }

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_MOCK_TRANSACTIONS));
        return INITIAL_MOCK_TRANSACTIONS;
      }
      return JSON.parse(stored);
    } catch (e) {
      console.warn("Gagal membaca transaksi dari localStorage, fallback ke data mock:", e);
      return INITIAL_MOCK_TRANSACTIONS;
    }
  },

  /**
   * Mengambil transaksi berdasarkan ID
   */
  getById(id: string): Transaction | null {
    const all = this.getAll();
    return all.find((item) => item.id.toLowerCase() === id.toLowerCase()) || null;
  },

  /**
   * Menambahkan transaksi baru
   */
  create(input: CreateTransactionInput): Transaction {
    const all = this.getAll();
    
    // Generate nomor REG baru berurutan misal #SAB-2633
    const maxNum = all.reduce((max, t) => {
      const num = parseInt(t.id.replace(/\D/g, ""), 10);
      return isNaN(num) ? max : Math.max(max, num);
    }, 2632);

    const newId = `#SAB-${maxNum + 1}`;
    const now = new Date().toISOString();

    const newTx: Transaction = {
      ...input,
      id: newId,
      dateRange: `${input.startDate} s/d ${input.endDate}`,
      createdAt: now,
      updatedAt: now,
    };

    const updatedList = [newTx, ...all];
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
      } catch (e) {
        console.error("Gagal menyimpan transaksi baru ke localStorage:", e);
      }
    }

    return newTx;
  },

  /**
   * Memperbarui transaksi (sebagian atau seluruh field)
   */
  update(id: string, updates: Partial<Transaction>): Transaction | null {
    const all = this.getAll();
    const index = all.findIndex((t) => t.id.toLowerCase() === id.toLowerCase());
    if (index === -1) return null;

    const updatedTx: Transaction = {
      ...all[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    all[index] = updatedTx;

    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
      } catch (e) {
        console.error("Gagal update transaksi ke localStorage:", e);
      }
    }

    return updatedTx;
  },

  /**
   * Memperbarui status transaksi saja secara kilat
   */
  updateStatus(id: string, status: TransactionStatus): Transaction | null {
    return this.update(id, { status });
  },

  /**
   * Menghapus baris transaksi
   */
  delete(id: string): boolean {
    const all = this.getAll();
    const filtered = all.filter((t) => t.id.toLowerCase() !== id.toLowerCase());

    if (filtered.length === all.length) return false;

    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
      } catch (e) {
        console.error("Gagal menghapus transaksi dari localStorage:", e);
      }
    }

    return true;
  },

  /**
   * Menghitung statistik ringkas transaksi untuk Dashboard cards
   */
  getStats(transactions?: Transaction[]): TransactionStats {
    const list = transactions || this.getAll();
    return {
      totalCount: list.length,
      pendingCount: list.filter((t) => t.status === "Pending DP").length,
      lunasCount: list.filter((t) => t.status === "Lunas Fitting").length,
      selesaiCount: list.filter((t) => t.status === "Selesai").length,
      batalCount: list.filter((t) => t.status === "Batal").length,
      totalRevenue: list
        .filter((t) => t.status === "Lunas Fitting" || t.status === "Selesai")
        .reduce((sum, t) => sum + t.totalAmount, 0),
      pendingRevenue: list
        .filter((t) => t.status === "Pending DP")
        .reduce((sum, t) => sum + (t.totalAmount - t.dpAmount), 0),
    };
  },

  /**
   * Reset data kembali ke mock awal jika diperlukan
   */
  resetToMock(): Transaction[] {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_MOCK_TRANSACTIONS));
      } catch {
        // ignore
      }
    }
    return INITIAL_MOCK_TRANSACTIONS;
  },

  /**
   * Export data transaksi ke format CSV string untuk download laporan
   */
  exportToCSV(transactions?: Transaction[]): string {
    const list = transactions || this.getAll();
    const headers = [
      "ID REG",
      "Nama Klien",
      "No Telepon",
      "Kampus",
      "Kategori",
      "Layanan/Barang",
      "Ukuran",
      "Warna",
      "Tanggal Mulai",
      "Tanggal Selesai",
      "Total Biaya (IDR)",
      "DP Terbayar (IDR)",
      "Metode Pembayaran",
      "Status",
      "Catatan",
    ];

    const rows = list.map((t) => [
      t.id,
      `"${t.clientName.replace(/"/g, '""')}"`,
      `"${t.clientPhone}"`,
      `"${t.university.replace(/"/g, '""')}"`,
      `"${t.serviceCategory}"`,
      `"${t.items.replace(/"/g, '""')}"`,
      `"${t.size || "-"}"`,
      `"${t.color || "-"}"`,
      t.startDate,
      t.endDate,
      t.totalAmount,
      t.dpAmount,
      `"${t.paymentMethod}"`,
      `"${t.status}"`,
      `"${(t.notes || "").replace(/"/g, '""')}"`,
    ]);

    return [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
  },
};
