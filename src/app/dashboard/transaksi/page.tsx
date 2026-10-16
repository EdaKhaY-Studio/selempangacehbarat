"use client";

import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import {
  transactionService,
  Transaction,
  TransactionStatus,
  ServiceCategory,
  CreateTransactionInput,
} from "@/lib/services/transactionService";
import {
  Search,
  Plus,
  Download,
  Calendar,
  Filter,
  Eye,
  Trash2,
  CheckCircle2,
  Clock,
  XCircle,
  Sparkles,
  Phone,
  GraduationCap,
  ChevronDown,
  X,
  CreditCard,
  FileSpreadsheet,
  AlertCircle,
  Tag,
  ArrowUpDown,
  RefreshCw,
  ShoppingBag,
  ExternalLink,
} from "lucide-react";

export default function TransaksiPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  // Modal States
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [txToDelete, setTxToDelete] = useState<Transaction | null>(null);
  const [txToEditStatus, setTxToEditStatus] = useState<Transaction | null>(null);

  // Form State untuk Buat Transaksi Baru
  const [createForm, setCreateForm] = useState<CreateTransactionInput>({
    clientName: "",
    clientPhone: "",
    university: "Universitas Teuku Umar (UTU)",
    serviceCategory: "Selempang",
    items: "",
    size: "Size L",
    color: "Hitam",
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    totalAmount: 135000,
    dpAmount: 50000,
    paymentMethod: "Midtrans Snap QRIS",
    status: "Pending DP",
    notes: "",
  });

  // Load transactions on mount (merges persistent custom orders from server + legacy)
  const refreshTransactions = async () => {
    setLoading(true);
    const list = await transactionService.getAllAsync();
    setTransactions(list);
    setLoading(false);
  };

  useEffect(() => {
    refreshTransactions();
  }, []);

  // Filtered list
  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      // 0. Service Category Filter
      if (categoryFilter !== "all" && tx.serviceCategory !== categoryFilter) {
        return false;
      }

      // 1. Status Filter
      if (statusFilter !== "all" && tx.status !== statusFilter) {
        return false;
      }

      // 2. Search Query (Nama, ID REG, No HP, Layanan, Kampus, Notes)
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const matchName = tx.clientName.toLowerCase().includes(query);
        const matchId = tx.id.toLowerCase().includes(query);
        const matchPhone = tx.clientPhone.toLowerCase().includes(query);
        const matchItems = tx.items.toLowerCase().includes(query);
        const matchUni = tx.university.toLowerCase().includes(query);
        const matchNotes = (tx.notes || "").toLowerCase().includes(query);
        if (!matchName && !matchId && !matchPhone && !matchItems && !matchUni && !matchNotes) {
          return false;
        }
      }

      // 3. Date Filter (Quick presets)
      if (dateFilter === "today") {
        const todayStr = new Date().toISOString().split("T")[0];
        if (tx.startDate !== todayStr && tx.endDate !== todayStr) return false;
      }

      return true;
    });
  }, [transactions, categoryFilter, statusFilter, searchQuery, dateFilter]);

  // Stats calculation
  const stats = useMemo(() => {
    return transactionService.getStats(transactions);
  }, [transactions]);

  // Handler: Status Badges helper
  const getStatusBadge = (status: TransactionStatus) => {
    switch (status) {
      case "Pending DP":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            Pending DP
          </span>
        );
      case "Lunas Fitting":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
            Lunas Fitting
          </span>
        );
      case "Selesai":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 whitespace-nowrap">
            <CheckCircle2 size={12} className="text-emerald-400" />
            Selesai
          </span>
        );
      case "Batal":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/30 whitespace-nowrap">
            <XCircle size={12} className="text-rose-400" />
            Batal
          </span>
        );
    }
  };

  // Handler: Buat Transaksi Baru
  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTx = transactionService.create(createForm);
    setTransactions(transactionService.getAll());
    setIsCreateModalOpen(false);
    // Reset Form
    setCreateForm({
      clientName: "",
      clientPhone: "",
      university: "Universitas Teuku Umar (UTU)",
      serviceCategory: "Selempang",
      items: "",
      size: "Size L",
      color: "Hitam",
      startDate: new Date().toISOString().split("T")[0],
      endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      totalAmount: 135000,
      dpAmount: 50000,
      paymentMethod: "Midtrans Snap QRIS",
      status: "Pending DP",
      notes: "",
    });
  };

  // Handler: Update Status
  const handleUpdateStatusConfirm = (newStatus: TransactionStatus) => {
    if (!txToEditStatus) return;
    transactionService.updateStatus(txToEditStatus.id, newStatus);
    setTransactions(transactionService.getAll());
    setIsStatusModalOpen(false);
    setTxToEditStatus(null);
  };

  // Handler: Hapus Baris
  const handleDeleteConfirm = () => {
    if (!txToDelete) return;
    transactionService.delete(txToDelete.id);
    setTransactions(transactionService.getAll());
    setIsDeleteModalOpen(false);
    setTxToDelete(null);
  };

  // Handler: Export CSV
  const handleExportCSV = () => {
    const csvContent = transactionService.exportToCSV(filteredTransactions);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `laporan-transaksi-selempang-aceh-barat-${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Formatter mata uang IDR
  const formatIDR = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="space-y-6">
      {/* 1. Page Header with Title & Top Action Buttons */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#D4AF37]/10 text-[#FDE68A] border border-[#D4AF37]/30">
              Manajemen Operasional
            </span>
            <span className="text-xs text-slate-500">•</span>
            <span className="text-xs text-slate-400">Total {transactions.length} Registrasi</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Riwayat Sewa &amp; Transaksi
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-light mt-1">
            Pantau pesanan bordir kilat selempang, persewaan jas wisuda, dan status fitting pelanggan Meulaboh.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Date Preset Filter */}
          <div className="relative">
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="appearance-none bg-[#141721] border border-[#242938] text-xs text-slate-300 py-2.5 pl-8 pr-8 rounded-xl focus:outline-hidden focus:border-[#D4AF37] cursor-pointer"
            >
              <option value="all">Semua Waktu</option>
              <option value="today">Hari Ini</option>
            </select>
            <Calendar
              size={14}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#D4AF37] pointer-events-none"
            />
            <ChevronDown
              size={13}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
          </div>

          {/* Export Laporan Button */}
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#141721] hover:bg-[#1E2230] text-slate-200 border border-[#242938] text-xs font-semibold transition-all cursor-pointer shadow-xs active:scale-95"
            title="Download file CSV laporan transaksi"
          >
            <Download size={14} className="text-[#D4AF37]" />
            <span>Export Laporan</span>
          </button>

          {/* Pratinjau Demo Data Tiruan Button */}
          <Link
            href="/dashboard/transaksi/demo"
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold transition-all cursor-pointer shadow-xs active:scale-95"
            title="Buka panel rincian pesanan dengan data tiruan"
          >
            <Sparkles size={14} className="text-[#D4AF37]" />
            <span>Pesanan Demo</span>
          </Link>

          {/* Buat Transaksi Baru Button */}
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#F59E0B] text-[#090A0F] text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-md shadow-[#D4AF37]/20 cursor-pointer active:scale-95"
          >
            <Plus size={15} />
            <span>Buat Transaksi Baru</span>
          </button>
        </div>
      </div>

      {/* 2. Top Statistic KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Transaksi */}
        <div className="p-4 rounded-2xl bg-[#141721] border border-[#242938] relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Total Transaksi</span>
            <span className="p-1.5 rounded-lg bg-slate-800 text-[#D4AF37]">
              <FileSpreadsheet size={14} />
            </span>
          </div>
          <div className="text-2xl font-bold font-mono text-white mb-0.5">
            {stats.totalCount}
          </div>
          <div className="text-[11px] text-slate-500 font-light truncate">
            {stats.selesaiCount} pesanan selesai
          </div>
        </div>

        {/* Pending DP */}
        <div className="p-4 rounded-2xl bg-[#141721] border border-amber-500/20 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-amber-400/90 mb-1">
            <span>Pending DP</span>
            <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
              <Clock size={14} />
            </span>
          </div>
          <div className="text-2xl font-bold font-mono text-amber-400 mb-0.5">
            {stats.pendingCount}
          </div>
          <div className="text-[11px] text-amber-500/80 font-light truncate">
            Sisa tagihan: {formatIDR(stats.pendingRevenue)}
          </div>
        </div>

        {/* Lunas Fitting */}
        <div className="p-4 rounded-2xl bg-[#141721] border border-indigo-500/20 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-indigo-400/90 mb-1">
            <span>Lunas Fitting</span>
            <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
              <Sparkles size={14} />
            </span>
          </div>
          <div className="text-2xl font-bold font-mono text-indigo-400 mb-0.5">
            {stats.lunasCount}
          </div>
          <div className="text-[11px] text-indigo-400/80 font-light truncate">
            Siap ambil H-1 wisuda
          </div>
        </div>

        {/* Total Omset Selesai (Hanya Omset Riil Terverifikasi MySQL) */}
        <div className="p-4 rounded-2xl bg-[#141721] border border-emerald-500/20 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-emerald-400/90 mb-1">
            <span>Omset Riil Terverifikasi</span>
            <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
              <CreditCard size={14} />
            </span>
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-400 mb-0.5 truncate">
            {formatIDR(stats.realRevenue)}
          </div>
          <div className="text-[11px] text-emerald-500/80 font-light truncate">
            {stats.realOrdersCount} Pesanan Online (MySQL)
          </div>
          <div className="text-[10px] text-slate-500 mt-1">
            Arsip Offline: {formatIDR(stats.mockRevenue)}
          </div>
        </div>
      </div>

      {/* 3. Filter Bar: Live Search & Category Tabs */}
      <div className="bg-[#141721] rounded-2xl border border-[#242938] p-3 sm:p-4 space-y-3">
        {/* Category Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
          <span className="text-slate-400 font-semibold shrink-0">Layanan:</span>
          {[
            { id: "all", label: "Semua Layanan" },
            { id: "Selempang", label: "Custom Selempang" },
            { id: "Sewa Outfit", label: "Sewa Outfit" },
            { id: "Paket Wisuda", label: "Paket Wisuda" },
            { id: "Apparel PDH", label: "Apparel PDH" },
          ].map((cat) => {
            const isCatActive = categoryFilter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setCategoryFilter(cat.id)}
                className={`px-3 py-1.5 rounded-xl font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  isCatActive
                    ? "bg-[#D4AF37] text-black shadow-xs font-bold"
                    : "bg-[#090A0F] text-slate-400 hover:text-white hover:bg-[#1E2230]"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        <div className="flex flex-col lg:flex-row gap-3 items-center justify-between pt-2 border-t border-[#242938]">
          {/* Status Tabs Switcher */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full lg:w-auto pb-1 lg:pb-0 scrollbar-none">
            {[
              { id: "all", label: "Semua Status", count: transactions.length },
              { id: "Pending DP", label: "Pending DP", count: stats.pendingCount },
              { id: "Lunas Fitting", label: "Lunas Fitting / DP Lunas", count: stats.lunasCount },
              { id: "Selesai", label: "Selesai", count: stats.selesaiCount },
              { id: "Batal", label: "Batal", count: stats.batalCount },
            ].map((tab) => {
              const isActive = statusFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setStatusFilter(tab.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? "bg-slate-200 text-black shadow-xs font-bold"
                      : "bg-[#090A0F] text-slate-400 hover:text-white hover:bg-[#1E2230]"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                      isActive ? "bg-black/20 text-black font-bold" : "bg-[#141721] text-slate-400"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Live Search Input & Refresh Button */}
          <div className="flex items-center gap-2 w-full lg:w-auto">
            <div className="relative w-full lg:w-80">
              <Search
                size={15}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari ID (#SAB...), nama, no WA, teks custom..."
                className="w-full pl-9 pr-8 py-2 rounded-xl bg-[#090A0F] border border-[#242938] text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-[#D4AF37] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            <button
              onClick={refreshTransactions}
              disabled={loading}
              className="p-2 rounded-xl bg-[#090A0F] hover:bg-[#1E2230] text-slate-300 hover:text-white border border-[#242938] transition-colors"
              title="Perbarui Data Transaksi"
            >
              <RefreshCw size={15} className={loading ? "animate-spin text-[#D4AF37]" : ""} />
            </button>
          </div>
        </div>
      </div>

      {/* 4. Data Table Container */}
      <div className="bg-[#141721] rounded-2xl border border-[#242938] overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#090A0F] border-b border-[#242938] text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
              <tr>
                <th className="py-3.5 px-4">ID Pesanan</th>
                <th className="py-3.5 px-4">Nama Klien</th>
                <th className="py-3.5 px-4">Produk / Layanan</th>
                <th className="py-3.5 px-4">Tanggal Acara / Pengerjaan</th>
                <th className="py-3.5 px-4">Total Biaya &amp; Pembayaran</th>
                <th className="py-3.5 px-4 text-center">Status Pesanan</th>
                <th className="py-3.5 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#242938]/60">
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500">
                    <ShoppingBag size={36} className="mx-auto mb-2 text-slate-600" />
                    <p className="text-sm font-semibold text-slate-400">
                      Tidak ada transaksi yang cocok
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      Coba ganti filter status, kategori, atau bersihkan kata kunci pencarian.
                    </p>
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setStatusFilter("all");
                        setCategoryFilter("all");
                      }}
                      className="mt-3 px-3 py-1.5 rounded-lg bg-[#242938] hover:bg-slate-700 text-xs text-slate-200 transition-colors"
                    >
                      Reset Semua Filter
                    </button>
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((tx) => (
                  <tr
                    key={tx.id}
                    className="hover:bg-[#1A1D27]/70 transition-colors group"
                  >
                    {/* ID Pesanan */}
                    <td className="py-4 px-4 font-mono font-bold whitespace-nowrap">
                      <div className="text-[#FDE68A]">{tx.id}</div>
                      {tx.isVerifiedDatabase ? (
                        <span className="inline-block mt-0.5 text-[9px] px-1.5 py-0.2 rounded font-sans font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                          Pesanan Nyata (MySQL)
                        </span>
                      ) : (
                        <span className="inline-block mt-0.5 text-[9px] px-1.5 py-0.2 rounded font-sans font-medium bg-slate-500/10 text-slate-400 border border-slate-500/30">
                          Arsip Offline / Demo
                        </span>
                      )}
                    </td>

                    {/* Nama Klien & Kampus */}
                    <td className="py-4 px-4 min-w-[180px]">
                      <div className="font-semibold text-white group-hover:text-[#D4AF37] transition-colors">
                        {tx.clientName}
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-0.5">
                        <GraduationCap size={12} className="text-[#D4AF37] shrink-0" />
                        <span className="truncate">{tx.university}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono mt-0.5">
                        <a
                          href={`https://wa.me/${tx.clientPhone.replace(/\D/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-semibold"
                        >
                          <Phone size={10} />
                          <span>{tx.clientPhone}</span>
                        </a>
                      </div>
                    </td>

                    {/* Produk / Layanan */}
                    <td className="py-4 px-4 min-w-[220px]">
                      <div className="line-clamp-2 text-slate-200 leading-relaxed font-light">
                        {tx.items}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#090A0F] text-slate-400 border border-[#242938]">
                          {tx.serviceCategory}
                        </span>
                        {tx.hasLogo && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30">
                            Disertai Logo
                          </span>
                        )}
                        {tx.size && (
                          <span className="text-[10px] text-slate-500">
                            {tx.size}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Tanggal Acara / Target */}
                    <td className="py-4 px-4 whitespace-nowrap text-slate-300">
                      <div className="font-mono text-xs">{tx.dateRange}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        Target: {tx.endDate}
                      </div>
                    </td>

                    {/* Total Biaya & Pembayaran */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="font-mono font-bold text-white text-xs">
                        {formatIDR(tx.totalAmount)}
                      </div>
                      {tx.isCustomSash ? (
                        <div className="text-[10px] font-mono mt-0.5 space-y-0.5">
                          <div className="text-slate-400">DP: {formatIDR(tx.dpAmount)}</div>
                          <div className="text-emerald-400 font-bold">Terbayar: {formatIDR(tx.verifiedPaid || 0)}</div>
                          <div className="text-rose-400">Sisa: {formatIDR(tx.balanceAmount || 0)}</div>
                          {tx.paymentStatus === "deposit_paid" && (
                            <div className="text-amber-300 font-semibold text-[9px]">
                              DP Lunas — Sisa {formatIDR(tx.balanceAmount || 0)}
                            </div>
                          )}
                        </div>
                      ) : (
                        tx.dpAmount > 0 && tx.status === "Pending DP" && (
                          <div className="text-[10px] text-amber-400/90 font-mono">
                            DP: {formatIDR(tx.dpAmount)}
                          </div>
                        )
                      )}
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        {tx.paymentMethod}
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-4 text-center">
                      {getStatusBadge(tx.status)}
                    </td>

                    {/* Aksi */}
                    <td className="py-4 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Detail View: if custom sash order, navigates to dedicated page; otherwise modal */}
                        {tx.isCustomSash && tx.customOrderId ? (
                          <Link
                            href={`/dashboard/transaksi/${encodeURIComponent(tx.customOrderId)}`}
                            className="p-1.5 rounded-lg bg-[#090A0F] hover:bg-[#1E2230] text-slate-300 hover:text-[#D4AF37] border border-[#242938] transition-colors"
                            title="Lihat Detail Pesanan Lengkap"
                          >
                            <Eye size={14} />
                          </Link>
                        ) : (
                          <button
                            onClick={() => {
                              setSelectedTx(tx);
                              setIsDetailModalOpen(true);
                            }}
                            className="p-1.5 rounded-lg bg-[#090A0F] hover:bg-[#1E2230] text-slate-300 hover:text-[#D4AF37] border border-[#242938] transition-colors"
                            title="Lihat Detail Transaksi"
                          >
                            <Eye size={14} />
                          </button>
                        )}

                        {/* Edit Status Quick */}
                        <button
                          onClick={() => {
                            setTxToEditStatus(tx);
                            setIsStatusModalOpen(true);
                          }}
                          className="p-1.5 rounded-lg bg-[#090A0F] hover:bg-[#1E2230] text-slate-300 hover:text-indigo-400 border border-[#242938] transition-colors"
                          title="Ubah Status Transaksi"
                        >
                          <Tag size={14} />
                        </button>

                        {/* Hapus Baris */}
                        <button
                          onClick={() => {
                            setTxToDelete(tx);
                            setIsDeleteModalOpen(true);
                          }}
                          className="p-1.5 rounded-lg bg-[#090A0F] hover:bg-rose-500/10 text-slate-400 hover:text-rose-400 border border-[#242938] hover:border-rose-500/20 transition-colors"
                          title="Hapus Transaksi"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table Bottom Footer Summary */}
        <div className="p-4 bg-[#090A0F] border-t border-[#242938] flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
          <div>
            Menampilkan <span className="font-bold text-white">{filteredTransactions.length}</span> dari{" "}
            <span className="font-bold text-white">{transactions.length}</span> total transaksi
          </div>
          <div className="text-[11px] text-slate-500 font-mono">
            Mode Pre-Database (LocalStorage Client Mutation Aktif)
          </div>
        </div>
      </div>

      {/* ================= MODAL: DETAIL TRANSAKSI ================= */}
      {isDetailModalOpen && selectedTx && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-xs"
            onClick={() => setIsDetailModalOpen(false)}
          />
          <div className="relative w-full max-w-lg rounded-3xl bg-[#141721] border border-[#242938] p-6 sm:p-7 shadow-2xl z-10 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#242938] mb-5">
              <div>
                <span className="text-[10px] font-mono text-[#D4AF37] font-bold uppercase tracking-wider">
                  Rincian Pesanan
                </span>
                <h3 className="font-serif text-xl font-bold text-white">
                  {selectedTx.id}
                </h3>
              </div>
              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="p-1.5 rounded-xl bg-[#090A0F] border border-[#242938] text-slate-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="space-y-4 text-xs">
              {/* Status Box */}
              <div className="p-3.5 rounded-2xl bg-[#090A0F] border border-[#242938] flex items-center justify-between">
                <span className="text-slate-400 font-medium">Status Saat Ini:</span>
                <div>{getStatusBadge(selectedTx.status)}</div>
              </div>

              {/* Client Info */}
              <div className="p-4 rounded-2xl bg-[#090A0F] border border-[#242938] space-y-2">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Data Pelanggan
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Nama Lengkap:</span>
                  <span className="font-semibold text-white">{selectedTx.clientName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Nomor Kontak:</span>
                  <a
                    href={`https://wa.me/${selectedTx.clientPhone.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[#D4AF37] hover:underline flex items-center gap-1"
                  >
                    <Phone size={11} />
                    <span>{selectedTx.clientPhone}</span>
                  </a>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Universitas / Instansi:</span>
                  <span className="text-slate-200">{selectedTx.university}</span>
                </div>
              </div>

              {/* Items & Service */}
              <div className="p-4 rounded-2xl bg-[#090A0F] border border-[#242938] space-y-2">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Item Busana &amp; Spesifikasi
                </div>
                <div>
                  <span className="text-slate-400 block mb-1">Rincian Order:</span>
                  <p className="text-white leading-relaxed font-light">
                    {selectedTx.items}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#242938]">
                  <div>
                    <span className="text-slate-500 text-[10px]">Ukuran:</span>
                    <div className="font-medium text-slate-200">{selectedTx.size || "-"}</div>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px]">Warna Bahan:</span>
                    <div className="font-medium text-slate-200">{selectedTx.color || "-"}</div>
                  </div>
                </div>
              </div>

              {/* Financial & Schedule */}
              <div className="p-4 rounded-2xl bg-[#090A0F] border border-[#242938] space-y-2">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Biaya &amp; Jadwal
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Rentang Tanggal Sewa:</span>
                  <span className="font-mono text-white">{selectedTx.dateRange}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Metode Pembayaran:</span>
                  <span className="text-slate-200">{selectedTx.paymentMethod}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#242938]">
                  <span className="text-slate-400 font-semibold">Total Biaya:</span>
                  <span className="font-mono font-bold text-[#FDE68A] text-sm">
                    {formatIDR(selectedTx.totalAmount)}
                  </span>
                </div>
                {selectedTx.dpAmount > 0 && (
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-500">Uang Muka (DP):</span>
                    <span className="font-mono text-emerald-400">{formatIDR(selectedTx.dpAmount)}</span>
                  </div>
                )}
              </div>

              {/* Notes */}
              {selectedTx.notes && (
                <div className="p-3.5 rounded-2xl bg-[#090A0F] border border-[#242938]">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                    Catatan Khusus Klien
                  </span>
                  <p className="text-slate-300 italic font-light">{selectedTx.notes}</p>
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="mt-6 pt-4 border-t border-[#242938] flex items-center justify-between gap-3">
              <button
                onClick={() => {
                  setTxToEditStatus(selectedTx);
                  setIsDetailModalOpen(false);
                  setIsStatusModalOpen(true);
                }}
                className="flex-1 py-2.5 px-4 rounded-xl bg-[#242938] hover:bg-slate-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Tag size={14} className="text-[#D4AF37]" />
                <span>Ubah Status</span>
              </button>
              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="py-2.5 px-5 rounded-xl bg-[#D4AF37] hover:bg-[#F59E0B] text-black font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: BUAT TRANSAKSI BARU ================= */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-xs"
            onClick={() => setIsCreateModalOpen(false)}
          />
          <div className="relative w-full max-w-xl rounded-3xl bg-[#141721] border border-[#242938] p-6 sm:p-7 shadow-2xl z-10 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#242938] mb-5">
              <div>
                <span className="text-[10px] font-mono text-[#D4AF37] font-bold uppercase tracking-wider">
                  Entri Transaksi Baru
                </span>
                <h3 className="font-serif text-xl font-bold text-white">
                  Registrasi Sewa / Custom Selempang
                </h3>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1.5 rounded-xl bg-[#090A0F] border border-[#242938] text-slate-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Nama Lengkap Klien *
                  </label>
                  <input
                    type="text"
                    required
                    value={createForm.clientName}
                    onChange={(e) =>
                      setCreateForm({ ...createForm, clientName: e.target.value })
                    }
                    placeholder="Contoh: Cut Sarah Maulida"
                    className="w-full px-3 py-2.5 rounded-xl bg-[#090A0F] border border-[#242938] text-white focus:outline-hidden focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Nomor WhatsApp / HP *
                  </label>
                  <input
                    type="text"
                    required
                    value={createForm.clientPhone}
                    onChange={(e) =>
                      setCreateForm({ ...createForm, clientPhone: e.target.value })
                    }
                    placeholder="0822-XXXX-XXXX"
                    className="w-full px-3 py-2.5 rounded-xl bg-[#090A0F] border border-[#242938] text-white focus:outline-hidden focus:border-[#D4AF37] font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Universitas / Instansi
                  </label>
                  <select
                    value={createForm.university}
                    onChange={(e) =>
                      setCreateForm({ ...createForm, university: e.target.value })
                    }
                    className="w-full px-3 py-2.5 rounded-xl bg-[#090A0F] border border-[#242938] text-white focus:outline-hidden focus:border-[#D4AF37]"
                  >
                    <option value="Universitas Teuku Umar (UTU)">Universitas Teuku Umar (UTU)</option>
                    <option value="STAIN Teungku Dirundeng Meulaboh">STAIN Teungku Dirundeng Meulaboh</option>
                    <option value="Universitas Syiah Kuala (USK)">Universitas Syiah Kuala (USK)</option>
                    <option value="Poltekkes Kemenkes Aceh">Poltekkes Kemenkes Aceh</option>
                    <option value="AKN Aceh Barat">AKN Aceh Barat</option>
                    <option value="Instansi / Umum">Instansi / Umum</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Kategori Layanan
                  </label>
                  <select
                    value={createForm.serviceCategory}
                    onChange={(e) =>
                      setCreateForm({
                        ...createForm,
                        serviceCategory: e.target.value as ServiceCategory,
                      })
                    }
                    className="w-full px-3 py-2.5 rounded-xl bg-[#090A0F] border border-[#242938] text-white focus:outline-hidden focus:border-[#D4AF37]"
                  >
                    <option value="Selempang">Selempang Wisuda</option>
                    <option value="Sewa Outfit">Sewa Outfit &amp; Jas</option>
                    <option value="Apparel PDH">Apparel PDH / Atribut</option>
                    <option value="Paket Wisuda">Paket Wisuda Bundling</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Deskripsi Barang &amp; Detail Nama Gelar *
                </label>
                <textarea
                  required
                  rows={2}
                  value={createForm.items}
                  onChange={(e) =>
                    setCreateForm({ ...createForm, items: e.target.value })
                  }
                  placeholder="Misal: Selempang Bludru Hitam Renda Emas (Nama: Teuku Ryan, S.T.) + Jas Pria Slim Fit Size L"
                  className="w-full px-3 py-2.5 rounded-xl bg-[#090A0F] border border-[#242938] text-white focus:outline-hidden focus:border-[#D4AF37]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Ukuran (Jas / Pakaian)
                  </label>
                  <input
                    type="text"
                    value={createForm.size}
                    onChange={(e) =>
                      setCreateForm({ ...createForm, size: e.target.value })
                    }
                    placeholder="Size L / 42"
                    className="w-full px-3 py-2.5 rounded-xl bg-[#090A0F] border border-[#242938] text-white focus:outline-hidden focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Pilihan Warna
                  </label>
                  <input
                    type="text"
                    value={createForm.color}
                    onChange={(e) =>
                      setCreateForm({ ...createForm, color: e.target.value })
                    }
                    placeholder="Hitam / Maron / Navy"
                    className="w-full px-3 py-2.5 rounded-xl bg-[#090A0F] border border-[#242938] text-white focus:outline-hidden focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Tanggal Pengambilan / Mulai *
                  </label>
                  <input
                    type="date"
                    required
                    value={createForm.startDate}
                    onChange={(e) =>
                      setCreateForm({ ...createForm, startDate: e.target.value })
                    }
                    className="w-full px-3 py-2.5 rounded-xl bg-[#090A0F] border border-[#242938] text-white focus:outline-hidden focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Tanggal Pengembalian / Selesai *
                  </label>
                  <input
                    type="date"
                    required
                    value={createForm.endDate}
                    onChange={(e) =>
                      setCreateForm({ ...createForm, endDate: e.target.value })
                    }
                    className="w-full px-3 py-2.5 rounded-xl bg-[#090A0F] border border-[#242938] text-white focus:outline-hidden focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Total Biaya (Rp) *
                  </label>
                  <input
                    type="number"
                    required
                    value={createForm.totalAmount}
                    onChange={(e) =>
                      setCreateForm({
                        ...createForm,
                        totalAmount: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2.5 rounded-xl bg-[#090A0F] border border-[#242938] text-white font-mono focus:outline-hidden focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    DP Terbayar (Rp)
                  </label>
                  <input
                    type="number"
                    value={createForm.dpAmount}
                    onChange={(e) =>
                      setCreateForm({
                        ...createForm,
                        dpAmount: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2.5 rounded-xl bg-[#090A0F] border border-[#242938] text-white font-mono focus:outline-hidden focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Status Awal
                  </label>
                  <select
                    value={createForm.status}
                    onChange={(e) =>
                      setCreateForm({
                        ...createForm,
                        status: e.target.value as TransactionStatus,
                      })
                    }
                    className="w-full px-3 py-2.5 rounded-xl bg-[#090A0F] border border-[#242938] text-white focus:outline-hidden focus:border-[#D4AF37]"
                  >
                    <option value="Pending DP">Pending DP</option>
                    <option value="Lunas Fitting">Lunas Fitting</option>
                    <option value="Selesai">Selesai</option>
                    <option value="Batal">Batal</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Metode Pembayaran
                </label>
                <select
                  value={createForm.paymentMethod}
                  onChange={(e) =>
                    setCreateForm({ ...createForm, paymentMethod: e.target.value })
                  }
                  className="w-full px-3 py-2.5 rounded-xl bg-[#090A0F] border border-[#242938] text-white focus:outline-hidden focus:border-[#D4AF37]"
                >
                  <option value="Midtrans Snap QRIS">Midtrans Snap QRIS</option>
                  <option value="Transfer Bank BSI">Transfer Bank BSI</option>
                  <option value="Cash di Alpen Store">Cash di Alpen Store</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Catatan Tambahan
                </label>
                <input
                  type="text"
                  value={createForm.notes}
                  onChange={(e) =>
                    setCreateForm({ ...createForm, notes: e.target.value })
                  }
                  placeholder="Misal: fitting sore hari, bordir rumbai emas"
                  className="w-full px-3 py-2.5 rounded-xl bg-[#090A0F] border border-[#242938] text-white focus:outline-hidden focus:border-[#D4AF37]"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-[#242938] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-[#242938] hover:bg-slate-700 text-white font-semibold transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#F59E0B] text-black font-bold uppercase tracking-wider transition-all duration-200 shadow-md cursor-pointer active:scale-95"
                >
                  Simpan Transaksi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: EDIT STATUS QUICK ================= */}
      {isStatusModalOpen && txToEditStatus && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-xs"
            onClick={() => setIsStatusModalOpen(false)}
          />
          <div className="relative w-full max-w-sm rounded-3xl bg-[#141721] border border-[#242938] p-6 shadow-2xl z-10">
            <h3 className="font-serif text-lg font-bold text-white mb-1">
              Ubah Status Transaksi
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Pilih status operasional terbaru untuk <span className="text-[#D4AF37] font-mono">{txToEditStatus.id}</span> ({txToEditStatus.clientName}):
            </p>

            <div className="space-y-2">
              {(["Pending DP", "Lunas Fitting", "Selesai", "Batal"] as TransactionStatus[]).map(
                (st) => (
                  <button
                    key={st}
                    onClick={() => handleUpdateStatusConfirm(st)}
                    className={`w-full p-3 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                      txToEditStatus.status === st
                        ? "bg-[#D4AF37]/20 border-[#D4AF37] text-[#FDE68A]"
                        : "bg-[#090A0F] border-[#242938] text-slate-300 hover:border-slate-600"
                    }`}
                  >
                    <span>{st}</span>
                    {getStatusBadge(st)}
                  </button>
                )
              )}
            </div>

            <button
              onClick={() => setIsStatusModalOpen(false)}
              className="mt-4 w-full py-2.5 rounded-xl bg-[#242938] hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
            >
              Batal
            </button>
          </div>
        </div>
      )}

      {/* ================= MODAL: KONFIRMASI HAPUS ================= */}
      {isDeleteModalOpen && txToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-xs"
            onClick={() => setIsDeleteModalOpen(false)}
          />
          <div className="relative w-full max-w-sm rounded-3xl bg-[#141721] border border-[#242938] p-6 shadow-2xl z-10 text-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto mb-3">
              <AlertCircle size={24} />
            </div>
            <h3 className="font-serif text-lg font-bold text-white mb-1">
              Hapus Data Transaksi?
            </h3>
            <p className="text-xs text-slate-400 mb-5 leading-relaxed">
              Anda akan menghapus riwayat pesanan <span className="font-mono text-[#D4AF37]">{txToDelete.id}</span> atas nama <strong className="text-white">{txToDelete.clientName}</strong>. Tindakan ini tidak dapat dibatalkan.
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-[#242938] hover:bg-slate-700 text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
