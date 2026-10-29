import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Proxy API requests sang backend (tránh CORS issue khi dev)
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3001/:path*',
      },
    ];
  },
};

export default nextConfig;

