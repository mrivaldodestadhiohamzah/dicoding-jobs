import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    const backendUrl = (process.env.BACKEND_URL ?? "http://127.0.0.1:8000").replace(/\/$/, "");
    return [{
      source: "/backend-api/:path*",
      destination: `${backendUrl}/api/:path*`,
    }];
  },
  cacheComponents: true,
  partialPrefetching: true,
};

export default nextConfig;
