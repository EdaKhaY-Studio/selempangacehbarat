"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, User, BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { blogService, BlogPost } from "@/lib/services/blogService";

export function BlogSection() {
  const [posts, setPosts] = useState<BlogPost[]>(() => blogService.getPublishedPosts());

  useEffect(() => {
    // Initial fetch from client storage
    setPosts(blogService.getPublishedPosts());

    const handleUpdate = () => {
      setPosts(blogService.getPublishedPosts());
    };

    window.addEventListener("sab_blog_updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("sab_blog_updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  return (
    <section id="blog" className="section-padding bg-white relative border-b border-[#cbd5e1]/60">
      <span id="artikel" className="absolute -top-24" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#b48c28] mb-3 inline-block">
            Edukasi &amp; Panduan Busana
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#0f172a] tracking-tight">
            Artikel &amp; Tips Wisuda Meulaboh
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#475569] max-w-xl mx-auto font-light leading-relaxed">
            Wawasan praktis untuk memastikan momen wisuda Anda berjalan lancar, berkesan, dan terlihat elegan di setiap dokumentasi.
          </p>
        </div>

        {/* Editorial Post Cards */}
        {posts.length === 0 ? (
          <div className="text-center py-12 bg-[#faf9f6] rounded-2xl border border-dashed border-[#cbd5e1] p-8 max-w-md mx-auto">
            <BookOpen size={36} className="mx-auto text-slate-400 mb-2" />
            <h3 className="font-serif text-base font-bold text-[#0f172a]">
              Belum Ada Artikel yang Diterbitkan
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Buka menu Pengelolaan Jurnal di dashboard admin untuk mempublikasikan artikel baru.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, idx) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="group rounded-xl bg-white border border-[#cbd5e1]/60 hover:border-[#b48c28]/60 overflow-hidden shadow-xs hover:shadow-md flex flex-col justify-between transition-all duration-300"
              >
                <div>
                  {/* Thumbnail Image */}
                  <Link
                    href={`/blog/${post.slug}`}
                    className="block relative aspect-[16/9] w-full overflow-hidden bg-zinc-100"
                  >
                    <Image
                      src={post.thumbnail}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-60" />
                    <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded bg-white/95 text-[#0f172a] text-[10px] uppercase tracking-wider font-semibold border border-[#cbd5e1]/60 shadow-xs backdrop-blur-sm">
                      {post.category}
                    </span>
                  </Link>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-xs text-[#475569] mb-3">
                      <span className="flex items-center gap-1 font-light">
                        <Calendar size={12} className="text-[#475569]" />
                        {post.publishedAt}
                      </span>
                      <span className="flex items-center gap-1 font-light">
                        <Clock size={12} className="text-[#475569]" />
                        4 menit baca
                      </span>
                    </div>

                    <h3 className="font-serif text-lg font-medium text-[#0f172a] group-hover:text-[#b48c28] transition-colors leading-snug mb-3">
                      <Link href={`/blog/${post.slug}`} className="hover:underline">
                        {post.title}
                      </Link>
                    </h3>

                    <p className="text-xs text-[#475569] font-light leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                {/* Author & Action Link */}
                <div className="px-6 pb-6 pt-3 border-t border-[#cbd5e1]/40 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs text-[#475569] font-light">
                    <User size={13} className="text-[#b48c28]" />
                    {post.author}
                  </span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-[#b48c28] hover:text-[#96741f] transition-colors group/link"
                  >
                    <span>Baca Artikel</span>
                    <ArrowRight
                      size={12}
                      className="group-hover/link:translate-x-0.5 transition-transform"
                    />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
