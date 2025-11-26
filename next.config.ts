import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // media
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "media1.tenor.com" },
      { protocol: "https", hostname: "cdn.ncbi.nlm.nih.gov" },
    ],
  },
};

export default nextConfig;
