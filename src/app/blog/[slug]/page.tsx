import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AIChatbot } from "@/components/ui/AIChatbot";
import { blogService } from "@/lib/services/blogService";
import { BlogDetailClient } from "@/components/blog/BlogDetailClient";

export const revalidate = 86400; // ISR: 24 jam

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = blogService.getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogService.getPostBySlug(slug);

  if (!post) {
    return {
      title: "Artikel Tidak Ditemukan | Blog Selempang Aceh Barat",
      description: "Artikel panduan wisuda tidak ditemukan.",
    };
  }

  const canonicalUrl = `https://selempangacehbarat.com/blog/${post.slug}`;

  return {
    title: `${post.title} | Blog Selempang Aceh Barat`,
    description: post.excerpt,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "article",
      title: `${post.title} | Blog Selempang Aceh Barat`,
      description: post.excerpt,
      url: canonicalUrl,
      siteName: "Selempang Aceh Barat",
      publishedTime: post.publishedAt,
      authors: [post.author],
      images: [
        {
          url: post.thumbnail,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Blog Selempang Aceh Barat`,
      description: post.excerpt,
      images: [post.thumbnail],
    },
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = blogService.getPostBySlug(slug);

  // Schema JSON-LD BlogPosting
  const jsonLd = post
    ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        image: [post.thumbnail],
        datePublished: post.publishedAt,
        dateModified: post.publishedAt,
        author: {
          "@type": "Person",
          name: post.author,
          url: "https://selempangacehbarat.com/tentang-kami",
        },
        publisher: {
          "@type": "Organization",
          name: "Selempang Aceh Barat",
          logo: {
            "@type": "ImageObject",
            url: "https://selempangacehbarat.com/Gambar/LOGOFHD.png",
          },
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `https://selempangacehbarat.com/blog/${post.slug}`,
        },
      }
    : null;

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f6] text-[#0f172a] selection:bg-[#b48c28] selection:text-white">
      {/* Schema JSON-LD Script Injection */}
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      {/* 1. Header & Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col pb-16">
        {/* 2. Interactive Client Blog Reader & Breadcrumbs */}
        <BlogDetailClient slug={slug} initialPost={post || null} />
      </main>

      {/* 3. Footer & Chatbot */}
      <Footer />
      <AIChatbot />
    </div>
  );
}
