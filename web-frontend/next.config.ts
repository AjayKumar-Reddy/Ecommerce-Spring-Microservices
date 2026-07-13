import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/users/:path*',
        destination: 'http://localhost:8080/api/users/:path*',
      },
      {
        source: '/api/products/:path*',
        destination: 'http://localhost:8080/api/products/:path*',
      },
    ];
  },
};

export default nextConfig;
