import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true
  },
  // Use static export for deployment
  output: 'export',
  trailingSlash: true,
  distDir: 'out'
};

export default nextConfig;