import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: process.env.NODE_ENV === 'production',
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allows all domains
      },
    ],
  },
};

export default nextConfig;
