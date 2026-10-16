import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "image.pollinations.ai",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/:path((?!sitemap\\.xml|robots\\.txt|favicon\\.ico).*)",
        has: [{ type: "host", value: "www.selempangacehbarat.com" }],
        destination: "https://selempangacehbarat.com/:path*",
        permanent: true,
      },
      {
        source: "/pilih-model",
        destination: "/pilih-model-selempang",
        permanent: true,
      },
      {
        source: "/katalog-produk",
        destination: "/produk",
        permanent: true,
      },
      {
        source: "/produk/selempang-2lapis-1",
        destination: "/produk/id-card-medali-wisuda",
        permanent: true,
      },
      {
        source: "/produk/selempang-:slug*",
        destination: "/produk/custom-selempang",
        permanent: true,
      },
      {
        source: "/produk/fhd-slmp-:slug*",
        destination: "/produk/custom-selempang",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
