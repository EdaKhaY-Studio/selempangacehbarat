"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { blogService, BlogPost } from "@/lib/services/blogService";
import {
  Calendar,
  Clock,
  ChevronRight,
  ArrowRight,
  User,
  ArrowLeft,
  Sparkles,
  Tag,
  Share2,
  Lightbulb,
  CheckCircle2,
} from "lucide-react";

interface BlogDetailClientProps {
  slug: string;
  initialPost?: BlogPost | null;
}

export function BlogDetailClient({ slug, initialPost }: BlogDetailClientProps) {
  const [post, setPost] = useState<BlogPost | null>(() => {
    if (initialPost) return initialPost;
    return blogService.getPostBySlug(slug) || null;
  });

  const [mounted, setMounted] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    setMounted(true);
    // 1. Check if client localStorage has newer or newly created post
    const clientPost = blogService.getPostBySlug(slug);
    if (clientPost) {
      setPost(clientPost);
      blogService.incrementViews(slug);
    }

    // 2. Listen to real-time updates
    const handleUpdate = () => {
      const updated = blogService.getPostBySlug(slug);
      if (updated) setPost(updated);
    };

    window.addEventListener("sab_blog_updated", handleUpdate);
    return () => window.removeEventListener("sab_blog_updated", handleUpdate);
  }, [slug]);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  if (!post) {
    if (!mounted) {
      return (
        <div className="pt-32 pb-24 max-w-4xl mx-auto px-4 animate-pulse">
          <div className="h-4 w-32 bg-slate-200 rounded mb-4" />
          <div className="h-10 w-3/4 bg-slate-200 rounded mb-6" />
          <div className="aspect-[16/9] w-full bg-slate-200 rounded-2xl mb-8" />
        </div>
      );
    }

    return (
      <div className="pt-32 pb-24 text-center max-w-md mx-auto px-4">
        <h2 className="font-serif text-2xl font-bold text-[#0f172a] mb-2">
          Artikel Tidak Ditemukan
        </h2>
        <p className="text-sm text-[#475569] mb-6">
          Artikel dengan tautan &quot;{slug}&quot; mungkin telah dihapus atau belum dipublikasikan.
        </p>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0f172a] text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Kembali ke Halaman Blog</span>
        </Link>
      </div>
    );
  }

  // Helper untuk merender konten string dengan parsing heading, list, dan callout tip
  const renderFormattedContent = (content: string) => {
    const blocks = content.split(/\n\n+/);

    return blocks.map((block, idx) => {
      const trimmed = block.trim();

      // Heading H2
      if (trimmed.startsWith("## ")) {
        return (
          <h2
            key={idx}
            className="font-serif text-xl sm:text-2xl font-bold text-[#0f172a] tracking-tight mt-8 mb-4"
          >
            {trimmed.replace(/^##\s+/, "")}
          </h2>
        );
      }

      // Heading H3
      if (trimmed.startsWith("### ")) {
        return (
          <h3
            key={idx}
            className="font-serif text-lg sm:text-xl font-bold text-[#0f172a] tracking-tight mt-6 mb-3"
          >
            {trimmed.replace(/^###\s+/, "")}
          </h3>
        );
      }

      // Blockquote / Tips
      if (trimmed.startsWith(">")) {
        const text = trimmed.replace(/^>\s*/, "").replace(/\*\*/g, "");
        return (
          <div
            key={idx}
            className="my-5 p-4 rounded-xl bg-amber-50/80 border-l-4 border-[#b48c28] text-xs sm:text-sm text-[#785a00] flex items-start gap-3 shadow-2xs"
          >
            <Lightbulb size={18} className="text-[#b48c28] mt-0.5 shrink-0" />
            <div>
              <strong className="font-semibold block mb-0.5">
                Tips Ahli Selempang Aceh Barat:
              </strong>
              <span>{text}</span>
            </div>
          </div>
        );
      }

      // Unordered list
      if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        const items = trimmed.split("\n").map((item) => item.replace(/^[-*]\s+/, ""));
        return (
          <div
            key={idx}
            className="my-4 p-4 rounded-xl bg-white border border-[#cbd5e1]/60 shadow-2xs space-y-2"
          >
            {items.map((item, itemIdx) => (
              <div
                key={itemIdx}
                className="flex items-start gap-2 text-xs sm:text-sm text-[#0f172a]"
              >
                <CheckCircle2 size={14} className="text-[#b48c28] mt-0.5 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        );
      }

      // Ordered list
      if (/^\d+\.\s/.test(trimmed)) {
        const items = trimmed.split("\n").map((item) => item.replace(/^\d+\.\s+/, ""));
        return (
          <div
            key={idx}
            className="my-4 p-4 rounded-xl bg-white border border-[#cbd5e1]/60 shadow-2xs space-y-2"
          >
            {items.map((item, itemIdx) => (
              <div
                key={itemIdx}
                className="flex items-start gap-2 text-xs sm:text-sm text-[#0f172a]"
              >
                <span className="w-5 h-5 rounded-full bg-amber-100 text-[#b48c28] text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {itemIdx + 1}
                </span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        );
      }

      // Normal paragraph
      return (
        <p key={idx} className="text-[#334155] leading-relaxed text-sm sm:text-base mb-4 font-light">
          {trimmed}
        </p>
      );
    });
  };

  const allPublished = blogService.getPublishedPosts();
  const relatedPosts = allPublished.filter((p) => p.slug !== post.slug);

  return (
    <>
      {/* Breadcrumb Navigation Bar */}
      <div className="pt-20 sm:pt-24 bg-white border-b border-[#cbd5e1]/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between text-xs">
          <nav className="flex items-center gap-1.5 text-[#475569] truncate">
            <Link href="/" className="hover:text-[#0f172a] transition-colors shrink-0">
              Beranda
            </Link>
            <ChevronRight size={13} className="text-[#94a3b8] shrink-0" />
            <Link
              href="/blog"
              className="hover:text-[#0f172a] transition-colors shrink-0"
            >
              Blog
            </Link>
            <ChevronRight size={13} className="text-[#94a3b8] shrink-0" />
            <span className="font-semibold text-[#0f172a] truncate">
              {post.category}
            </span>
          </nav>

          <Link
            href="/blog"
            className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-[#b48c28] hover:text-[#96741f] shrink-0"
          >
            <ArrowLeft size={13} />
            <span>Semua Artikel</span>
          </Link>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14">
        {/* Header Meta */}
      <header className="mb-8">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-amber-50 text-[#785a00] border border-[#fde68a]">
              {post.category}
            </span>
            <span className="text-xs text-[#94a3b8]">•</span>
            <span className="text-xs text-[#75777d]">Panduan Resmi</span>
          </div>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 text-xs text-[#75777d] hover:text-[#0f172a] transition-colors px-2 py-1 rounded-md hover:bg-slate-100 cursor-pointer"
          >
            <Share2 size={13} />
            <span>{copiedLink ? "Link Tersalin!" : "Bagikan"}</span>
          </button>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0f172a] tracking-tight leading-tight sm:leading-[1.18] mb-6">
          {post.title}
        </h1>

        {/* Author Badge & Publishing Info */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-[#cbd5e1]/40 text-xs text-[#475569]">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-100 border border-slate-300 shadow-2xs shrink-0">
              <Image
                src="/Gambar/LOGOFHD.png"
                alt="Avatar Penulis"
                fill
                className="object-contain p-1"
              />
            </div>
            <div>
              <div className="font-bold text-[#0f172a] text-sm flex items-center gap-1.5">
                <span>{post.author}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" title="Penulis Resmi Terverifikasi" />
              </div>
              <div className="text-[11px] text-[#75777d]">Selempang Aceh Barat</div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[#75777d]">
            <span className="flex items-center gap-1.5">
              <Calendar size={13} className="text-[#b48c28]" />
              {post.publishedAt}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={13} className="text-[#b48c28]" />
              4 menit baca
            </span>
          </div>
        </div>
      </header>

      {/* 16:9 Header Thumbnail Image */}
      <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-md bg-slate-100 mb-10 border border-[#cbd5e1]/60">
        <Image
          src={post.thumbnail}
          alt={post.title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 896px"
          className="object-cover"
        />
      </div>

      {/* Structured Lead Excerpt */}
      {post.excerpt && (
        <div className="text-base sm:text-lg text-[#1e293b] leading-relaxed font-light mb-8 italic border-l-4 border-[#b48c28] pl-5 bg-amber-50/30 py-3 rounded-r-xl">
          {post.excerpt}
        </div>
      )}

      {/* Content Body */}
      <div className="prose prose-slate max-w-none">
        {renderFormattedContent(post.content)}
      </div>

      {/* Author Bio Box */}
      <div className="mt-12 p-6 rounded-2xl bg-white border border-[#cbd5e1]/60 shadow-xs flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
        <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 border border-slate-300 shrink-0">
          <Image
            src="/Gambar/LOGOFHD.png"
            alt={post.author}
            fill
            className="object-contain p-2"
          />
        </div>
        <div className="flex-1">
          <div className="text-xs font-bold uppercase tracking-wider text-[#b48c28] mb-0.5">
            Ditulis Oleh
          </div>
          <h3 className="font-serif text-lg font-bold text-[#0f172a]">
            {post.author}
          </h3>
          <p className="text-xs text-[#475569] mt-1.5 leading-relaxed">
            Pengelola &amp; praktisi busana wisuda resmi Selempang Aceh Barat di Meulaboh. Berpengalaman mendampingi wisudawan Universitas Teuku Umar (UTU) &amp; STAIN Meulaboh tampil berwibawa di hari kelulusan.
          </p>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="mt-14 pt-10 border-t border-[#cbd5e1]/60">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#b48c28]">
                Bacaan Lainnya
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0f172a]">
                Artikel Rekomendasi Selanjutnya
              </h3>
            </div>

            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0f172a] hover:text-[#b48c28] transition-colors"
            >
              <span>Lihat Semua</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedPosts.slice(0, 2).map((rel) => (
              <Link
                key={rel.id}
                href={`/blog/${rel.slug}`}
                className="group rounded-2xl bg-white border border-[#cbd5e1]/60 hover:border-[#b48c28]/60 p-4 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-slate-100 mb-3">
                    <Image
                      src={rel.thumbnail}
                      alt={rel.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold bg-white/95 text-[#0f172a] shadow-xs">
                      {rel.category}
                    </span>
                  </div>

                  <div className="text-[11px] text-[#75777d] mb-1">
                    {rel.publishedAt}
                  </div>

                  <h4 className="font-serif text-base font-bold text-[#0f172a] group-hover:text-[#b48c28] transition-colors line-clamp-2 leading-snug mb-2">
                    {rel.title}
                  </h4>

                  <p className="text-xs text-[#75777d] line-clamp-2">
                    {rel.excerpt}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs text-[#b48c28] font-semibold">
                  <span>Baca Artikel</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
      </article>
    </>
  );
}
