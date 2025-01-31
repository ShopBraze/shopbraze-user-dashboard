import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: process.env.NODE_ENV === 'production',
  images: {
    domains: ["res.cloudinary.com", "shopbraze-store.s3.ap-south-1.amazonaws.com"],
  },
};

export default nextConfig;
