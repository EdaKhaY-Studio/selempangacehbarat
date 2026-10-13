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
        source: "/:path*",
        has: [{ type: "host", value: "www.selempangacehbarat.com" }],
        destination: "https://selempangacehbarat.com/:path*",
        permanent: true,
      },
      {
        source: "/katalog-produk",
        destination: "/produk",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
