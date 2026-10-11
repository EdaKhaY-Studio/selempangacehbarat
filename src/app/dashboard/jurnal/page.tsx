"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  blogService,
  BlogPost,
  PostStatus,
  CreatePostInput,
  generateSlug,
} from "@/lib/services/blogService";
import {
  BookOpenText,
  Plus,
  Search,
  ExternalLink,
  Edit,
  Trash2,
  Eye,
  CheckCircle2,
  Clock,
  Sparkles,
  X,
  AlertCircle,
  FileText,
  Tag,
  Calendar,
  Layers,
  Heading,
  List,
  Quote,
  Lightbulb,
} from "lucide-react";

export default function DashboardJurnalPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Modal States
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [postToEdit, setPostToEdit] = useState<BlogPost | null>(null);
  const [postToDelete, setPostToDelete] = useState<BlogPost | null>(null);

  // Form Editor State
  const [formData, setFormData] = useState<CreatePostInput>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "Tips Wisuda",
    thumbnail:
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=1200&h=630&auto=format&fit=crop&q=80",
    author: "Fardi hd, S.P.",
    status: "PUBLISHED",
    tags: ["Wisuda Meulaboh", "Tips Busana"],
  });

  // Load posts on mount
  useEffect(() => {
    setPosts(blogService.getAllPosts());

    const handleUpdate = () => {
      setPosts(blogService.getAllPosts());
    };

    window.addEventListener("sab_blog_updated", handleUpdate);
    return () => window.removeEventListener("sab_blog_updated", handleUpdate);
  }, []);

  // Filtered posts
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      if (statusFilter !== "all" && post.status !== statusFilter) {
        return false;
      }
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const matchTitle = post.title.toLowerCase().includes(query);
        const matchSlug = post.slug.toLowerCase().includes(query);
        const matchCat = post.category.toLowerCase().includes(query);
        const matchExcerpt = post.excerpt.toLowerCase().includes(query);
        if (!matchTitle && !matchSlug && !matchCat && !matchExcerpt) {
          return false;
        }
      }
      return true;
    });
  }, [posts, statusFilter, searchQuery]);

  // Stats
  const stats = useMemo(() => {
    const published = posts.filter((p) => p.status === "PUBLISHED").length;
    const drafts = posts.filter((p) => p.status === "DRAFT").length;
    const totalViews = posts.reduce((sum, p) => sum + (p.views || 0), 0);
    return { total: posts.length, published, drafts, totalViews };
  }, [posts]);

  // Open Create Modal
  const handleOpenCreate = () => {
    setPostToEdit(null);
    setFormData({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      category: "Tips Wisuda",
      thumbnail:
        "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=1200&h=630&auto=format&fit=crop&q=80",
      author: "Fardi hd, S.P.",
      status: "PUBLISHED",
      tags: ["Wisuda Meulaboh"],
    });
    setIsEditorOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (post: BlogPost) => {
    setPostToEdit(post);
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      thumbnail: post.thumbnail,
      author: post.author,
      status: post.status,
      tags: post.tags || [],
    });
    setIsEditorOpen(true);
  };

  // Handle Title Change (auto slug)
  const handleTitleChange = (val: string) => {
    setFormData((prev) => ({
      ...prev,
      title: val,
      // Auto generate slug if we are creating new post or slug is empty
      slug: !postToEdit || !prev.slug ? generateSlug(val) : prev.slug,
    }));
  };

  // Insert helper text into content
  const insertContentSnippet = (snippet: string) => {
    setFormData((prev) => ({
      ...prev,
      content: prev.content ? `${prev.content}\n\n${snippet}` : snippet,
    }));
  };

  // Submit Save
  const handleSaveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (postToEdit) {
      blogService.updatePost(postToEdit.id, formData);
    } else {
      blogService.createPost(formData);
    }
    setPosts(blogService.getAllPosts());
    setIsEditorOpen(false);
  };

  // Delete Confirm
  const handleDeleteConfirm = () => {
    if (!postToDelete) return;
    blogService.deletePost(postToDelete.id);
    setPosts(blogService.getAllPosts());
    setIsDeleteOpen(false);
    setPostToDelete(null);
  };

  return (
    <div className="space-y-6">
      {/* 1. Header with Title & Action Buttons */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#D4AF37]/10 text-[#FDE68A] border border-[#D4AF37]/30">
              CMS Jurnal &amp; Artikel
            </span>
            <span className="text-xs text-slate-500">•</span>
            <span className="text-xs text-slate-400">Terhubung Langsung ke /blog Publik</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Pengelolaan Jurnal &amp; Panduan
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-light mt-1">
            Tulis tips wisuda, perbandingan bahan selempang, dan panduan ukuran jas. Artikel terbit langsung muncul di halaman publik.
          </p>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-2.5">
          <Link
            href="/blog"
            target="_blank"
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#141721] hover:bg-[#1E2230] text-slate-200 border border-[#242938] text-xs font-semibold transition-all cursor-pointer shadow-xs active:scale-95"
          >
            <ExternalLink size={14} className="text-[#D4AF37]" />
            <span>Lihat Halaman /blog</span>
          </Link>

          <button
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#F59E0B] text-[#090A0F] text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-md shadow-[#D4AF37]/20 cursor-pointer active:scale-95"
          >
            <Plus size={15} />
            <span>Tulis Jurnal Baru</span>
          </button>
        </div>
      </div>

      {/* 2. Stat Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-2xl bg-[#141721] border border-[#242938]">
          <div className="text-xs text-slate-400 mb-1 flex items-center justify-between">
            <span>Total Artikel</span>
            <BookOpenText size={14} className="text-[#D4AF37]" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">
            {stats.total}
          </div>
          <div className="text-[11px] text-slate-500 font-light truncate">
            Di database CMS
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#141721] border border-emerald-500/20">
          <div className="text-xs text-emerald-400/90 mb-1 flex items-center justify-between">
            <span>Diterbitkan (Live)</span>
            <CheckCircle2 size={14} className="text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-400">
            {stats.published}
          </div>
          <div className="text-[11px] text-emerald-500/80 font-light truncate">
            Tampil di /blog publik
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#141721] border border-amber-500/20">
          <div className="text-xs text-amber-400/90 mb-1 flex items-center justify-between">
            <span>Draft Disimpan</span>
            <Clock size={14} className="text-amber-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-amber-400">
            {stats.drafts}
          </div>
          <div className="text-[11px] text-amber-500/80 font-light truncate">
            Belum dipublikasikan
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#141721] border border-[#242938]">
          <div className="text-xs text-slate-400 mb-1 flex items-center justify-between">
            <span>Total Pembaca</span>
            <Eye size={14} className="text-[#D4AF37]" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">
            {stats.totalViews.toLocaleString("id-ID")}
          </div>
          <div className="text-[11px] text-slate-500 font-light truncate">
            Akumulasi pembaca
          </div>
        </div>
      </div>

      {/* 3. Filter Bar */}
      <div className="bg-[#141721] rounded-2xl border border-[#242938] p-3 sm:p-4 flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="flex items-center gap-1.5 w-full sm:w-auto">
          {[
            { id: "all", label: "Semua", count: posts.length },
            { id: "PUBLISHED", label: "Diterbitkan", count: stats.published },
            { id: "DRAFT", label: "Draft", count: stats.drafts },
          ].map((tab) => {
            const isActive = statusFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? "bg-[#D4AF37] text-black shadow-xs font-bold"
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

        <div className="relative w-full sm:w-72">
          <Search
            size={15}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari judul artikel, kategori..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#090A0F] border border-[#242938] text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-[#D4AF37]"
          />
        </div>
      </div>

      {/* 4. Table Listing */}
      <div className="bg-[#141721] rounded-2xl border border-[#242938] overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#090A0F] border-b border-[#242938] text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
              <tr>
                <th className="py-3.5 px-4">Artikel / Judul</th>
                <th className="py-3.5 px-4">Kategori</th>
                <th className="py-3.5 px-4">Tanggal Rilis</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-center">Pembaca</th>
                <th className="py-3.5 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#242938]/60">
              {filteredPosts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    <FileText size={36} className="mx-auto mb-2 text-slate-600" />
                    <p className="text-sm font-semibold text-slate-400">
                      Tidak ada artikel yang ditemukan
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      Klik &quot;Tulis Jurnal Baru&quot; untuk membuat artikel edukasi pertama.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredPosts.map((post) => (
                  <tr
                    key={post.id}
                    className="hover:bg-[#1A1D27]/70 transition-colors group"
                  >
                    {/* Thumbnail & Title */}
                    <td className="py-4 px-4 min-w-[280px]">
                      <div className="flex items-start gap-3">
                        <div className="relative w-16 h-11 rounded-lg overflow-hidden bg-slate-800 shrink-0 border border-[#242938]">
                          <Image
                            src={post.thumbnail}
                            alt={post.title}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-serif text-sm font-bold text-white group-hover:text-[#D4AF37] transition-colors line-clamp-2 leading-snug">
                            {post.title}
                          </h3>
                          <div className="font-mono text-[10px] text-slate-500 truncate mt-1">
                            /blog/{post.slug}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-semibold bg-[#090A0F] text-[#FDE68A] border border-[#242938]">
                        {post.category}
                      </span>
                    </td>

                    {/* Published Date */}
                    <td className="py-4 px-4 whitespace-nowrap text-slate-400">
                      <div className="flex items-center gap-1.5 text-xs">
                        <Calendar size={13} className="text-[#D4AF37]" />
                        <span>{post.publishedAt}</span>
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        Oleh: {post.author}
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-4 text-center whitespace-nowrap">
                      {post.status === "PUBLISHED" ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                          <CheckCircle2 size={12} className="text-emerald-400" />
                          Published
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                          <Clock size={12} className="text-amber-400" />
                          Draft
                        </span>
                      )}
                    </td>

                    {/* Views */}
                    <td className="py-4 px-4 text-center font-mono text-slate-300">
                      {post.views?.toLocaleString("id-ID") || 0}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Lihat Publik */}
                        {post.status === "PUBLISHED" && (
                          <Link
                            href={`/blog/${post.slug}`}
                            target="_blank"
                            className="p-1.5 rounded-lg bg-[#090A0F] hover:bg-[#1E2230] text-slate-300 hover:text-[#D4AF37] border border-[#242938] transition-colors"
                            title="Lihat Tampilan Publik di /blog"
                          >
                            <ExternalLink size={14} />
                          </Link>
                        )}

                        {/* Edit */}
                        <button
                          onClick={() => handleOpenEdit(post)}
                          className="p-1.5 rounded-lg bg-[#090A0F] hover:bg-[#1E2230] text-slate-300 hover:text-indigo-400 border border-[#242938] transition-colors"
                          title="Edit Artikel"
                        >
                          <Edit size={14} />
                        </button>

                        {/* Hapus */}
                        <button
                          onClick={() => {
                            setPostToDelete(post);
                            setIsDeleteOpen(true);
                          }}
                          className="p-1.5 rounded-lg bg-[#090A0F] hover:bg-rose-500/10 text-slate-400 hover:text-rose-400 border border-[#242938] hover:border-rose-500/20 transition-colors"
                          title="Hapus Artikel"
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
      </div>

      {/* ================= MODAL FORM EDITOR ================= */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-xs"
            onClick={() => setIsEditorOpen(false)}
          />
          <div className="relative w-full max-w-2xl rounded-3xl bg-[#141721] border border-[#242938] p-6 sm:p-7 shadow-2xl z-10 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#242938] mb-5">
              <div>
                <span className="text-[10px] font-mono text-[#D4AF37] font-bold uppercase tracking-wider">
                  Editor Jurnal Wisuda
                </span>
                <h3 className="font-serif text-xl font-bold text-white">
                  {postToEdit ? "Sunting Artikel Jurnal" : "Tulis Artikel Baru"}
                </h3>
              </div>
              <button
                onClick={() => setIsEditorOpen(false)}
                className="p-1.5 rounded-xl bg-[#090A0F] border border-[#242938] text-slate-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            {/* Editor Form */}
            <form onSubmit={handleSaveSubmit} className="space-y-4 text-xs">
              {/* Title & Slug */}
              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Judul Artikel *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Misal: 5 Tips Memilih Jas Wisuda Pria..."
                  className="w-full px-3 py-2.5 rounded-xl bg-[#090A0F] border border-[#242938] text-white focus:outline-hidden focus:border-[#D4AF37] text-sm font-semibold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Slug URL Ramah SEO *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData({ ...formData, slug: generateSlug(e.target.value) })
                    }
                    placeholder="tips-memilih-jas-wisuda"
                    className="w-full px-3 py-2 rounded-xl bg-[#090A0F] border border-[#242938] text-white font-mono focus:outline-hidden focus:border-[#D4AF37] text-[11px]"
                  />
                  <span className="text-[10px] text-slate-500 mt-0.5 block truncate">
                    Preview: /blog/{formData.slug || "judul-artikel"}
                  </span>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Kategori Jurnal *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-[#090A0F] border border-[#242938] text-white focus:outline-hidden focus:border-[#D4AF37]"
                  >
                    <option value="Tips Wisuda">Tips Wisuda</option>
                    <option value="Info Toko">Info Toko</option>
                    <option value="Seputar Kampus">Seputar Kampus</option>
                    <option value="Panduan Busana">Panduan Busana</option>
                    <option value="Bahan Selempang">Bahan Selempang</option>
                  </select>
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Ringkasan Artikel (Excerpt untuk Card &amp; SEO Meta) *
                </label>
                <textarea
                  required
                  rows={2}
                  value={formData.excerpt}
                  onChange={(e) =>
                    setFormData({ ...formData, excerpt: e.target.value })
                  }
                  placeholder="Ringkasan singkat maksimal 160 karakter untuk ditampilkan di katalog blog..."
                  className="w-full px-3 py-2 rounded-xl bg-[#090A0F] border border-[#242938] text-white focus:outline-hidden focus:border-[#D4AF37]"
                />
              </div>

              {/* Thumbnail Cover URL */}
              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  URL Gambar Cover Thumbnail (Rasio 16:9) *
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    required
                    value={formData.thumbnail}
                    onChange={(e) =>
                      setFormData({ ...formData, thumbnail: e.target.value })
                    }
                    placeholder="https://..."
                    className="flex-1 px-3 py-2 rounded-xl bg-[#090A0F] border border-[#242938] text-white font-mono text-[11px] focus:outline-hidden focus:border-[#D4AF37]"
                  />
                  {formData.thumbnail && (
                    <div className="relative w-12 h-9 rounded-lg overflow-hidden bg-slate-800 shrink-0 border border-[#242938]">
                      <Image
                        src={formData.thumbnail}
                        alt="Preview"
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
                {/* Preset Tombol Cepat Foto */}
                <div className="flex items-center gap-1.5 mt-1.5 overflow-x-auto pb-1 text-[10px] text-slate-400">
                  <span className="shrink-0 text-slate-500">Preset Foto:</span>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        thumbnail:
                          "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=1200&h=630&auto=format&fit=crop&q=80",
                      })
                    }
                    className="px-2 py-0.5 rounded bg-[#090A0F] hover:bg-[#242938] border border-[#242938] shrink-0"
                  >
                    Jas Formal
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        thumbnail:
                          "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&h=630&auto=format&fit=crop&q=80",
                      })
                    }
                    className="px-2 py-0.5 rounded bg-[#090A0F] hover:bg-[#242938] border border-[#242938] shrink-0"
                  >
                    Selempang Bludru
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        thumbnail:
                          "https://images.unsplash.com/photo-1627556704290-2b1f5853ff78?w=1200&h=630&auto=format&fit=crop&q=80",
                      })
                    }
                    className="px-2 py-0.5 rounded bg-[#090A0F] hover:bg-[#242938] border border-[#242938] shrink-0"
                  >
                    Wisuda Kampus
                  </button>
                </div>
              </div>

              {/* Rich Content Editor */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-slate-300 font-medium">
                    Konten Isi Artikel (Markdown / Teks Terstruktur) *
                  </label>
                  {/* Formatting Shortcuts */}
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => insertContentSnippet("## Judul Bagian Baru")}
                      className="p-1 rounded bg-[#090A0F] hover:bg-[#242938] text-slate-400 hover:text-white border border-[#242938]"
                      title="Tambah Sub-heading H2"
                    >
                      <Heading size={12} />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        insertContentSnippet("- Poin penting 1\n- Poin penting 2")
                      }
                      className="p-1 rounded bg-[#090A0F] hover:bg-[#242938] text-slate-400 hover:text-white border border-[#242938]"
                      title="Tambah Daftar Poin"
                    >
                      <List size={12} />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        insertContentSnippet(
                          "> **Tips Ahli Selempang Aceh Barat:** Teks tips bermanfaat..."
                        )
                      }
                      className="p-1 rounded bg-[#090A0F] hover:bg-[#242938] text-[#D4AF37] border border-[#242938]"
                      title="Tambah Kotak Tips Ahli"
                    >
                      <Lightbulb size={12} />
                    </button>
                  </div>
                </div>
                <textarea
                  required
                  rows={8}
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  placeholder="Tulis artikel dengan format markdown rapi..."
                  className="w-full px-3 py-2.5 rounded-xl bg-[#090A0F] border border-[#242938] text-white font-mono text-xs focus:outline-hidden focus:border-[#D4AF37] leading-relaxed"
                />
              </div>

              {/* Status Toggle & Author */}
              <div className="p-3.5 rounded-2xl bg-[#090A0F] border border-[#242938] flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-4">
                  <span className="text-slate-300 font-medium">Status Publikasi:</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, status: "PUBLISHED" })}
                      className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                        formData.status === "PUBLISHED"
                          ? "bg-emerald-500 text-black font-bold shadow-xs"
                          : "bg-[#141721] text-slate-400 hover:text-white"
                      }`}
                    >
                      Terbitkan (Publish)
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, status: "DRAFT" })}
                      className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                        formData.status === "DRAFT"
                          ? "bg-amber-400 text-black font-bold shadow-xs"
                          : "bg-[#141721] text-slate-400 hover:text-white"
                      }`}
                    >
                      Simpan Draft
                    </button>
                  </div>
                </div>

                <div className="text-slate-400 text-[11px]">
                  Penulis: <span className="text-white font-semibold">{formData.author}</span>
                </div>
              </div>

              {/* Modal Action Buttons */}
              <div className="pt-4 border-t border-[#242938] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditorOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-[#242938] hover:bg-slate-700 text-white font-semibold transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#F59E0B] text-black font-bold uppercase tracking-wider transition-all duration-200 shadow-md cursor-pointer active:scale-95"
                >
                  {postToEdit ? "Simpan Perubahan" : "Terbitkan Jurnal"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: KONFIRMASI HAPUS ================= */}
      {isDeleteOpen && postToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-xs"
            onClick={() => setIsDeleteOpen(false)}
          />
          <div className="relative w-full max-w-sm rounded-3xl bg-[#141721] border border-[#242938] p-6 shadow-2xl z-10 text-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto mb-3">
              <AlertCircle size={24} />
            </div>
            <h3 className="font-serif text-lg font-bold text-white mb-1">
              Hapus Artikel Jurnal?
            </h3>
            <p className="text-xs text-slate-400 mb-5 leading-relaxed">
              Artikel &quot;<strong className="text-white">{postToDelete.title}</strong>&quot; akan dihapus dari sistem dan halaman publik /blog.
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsDeleteOpen(false)}
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
