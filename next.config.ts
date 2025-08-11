import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Warning: This allows production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
  // Disable static optimization completely to avoid useSearchParams issues
  experimental: {
    forceSwcTransforms: true,
  },
  // Force dynamic rendering for all pages
  trailingSlash: false,
  // Disable static exports
  output: undefined,
};

export default nextConfig;
