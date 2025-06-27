import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["tejmhyfgfednyjkjsnpf.supabase.co", "lh3.googleusercontent.com"], // Add this line to allow external images
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true, // ✅ disables TS type checks on build
  },
};

export default nextConfig;

/*
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tejmhyfgfednyjkjsnpf.supabase.co",
        port: "", // Optional, only add if needed.
        pathname: "/storage/v1/object/public/men/*", // Using * for any path under 'men'
        search: "", // You can leave this empty, or specify query parameters if necessary
      },
    ],
  },
};

export default nextConfig;

*/
