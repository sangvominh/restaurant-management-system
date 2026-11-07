import type { NextConfig } from "next";
const config: NextConfig = {
  output: "standalone",
  devIndicators: false,
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: `${process.env.API_INTERNAL_URL || "http://127.0.0.1:3000"}/api/staff-auth/:path*`,
      },
      {
        source: "/api/mrp/:path*",
        destination: `${process.env.API_INTERNAL_URL || "http://127.0.0.1:3000"}/warehouse/:path*`,
      },
      {
        source: "/api/:path*",
        destination: `${process.env.API_INTERNAL_URL || "http://127.0.0.1:3000"}/api/:path*`,
      },
    ];
  },
};
export default config;
