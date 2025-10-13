import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  distDir: 'out',
  generateBuildId: async () => {
    return 'build-' + Date.now()
  }
};

export default nextConfig;
