import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['@vercel/geist'],
  },
  transpilePackages: ['@vercel/geist'],
  modularizeImports: {
    '@vercel/geist/icons': {
      transform: '@vercel/geist/icons/{{ kebabCase member }}',
      skipDefaultConversion: true,
    },
  },
};

export default nextConfig;
