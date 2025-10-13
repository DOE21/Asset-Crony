import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true
  },
  // Explicitly disable static export
  output: undefined,
  distDir: undefined
};

export default nextConfig;