import type { NextConfig } from "next";
const config: NextConfig = {
  output: "standalone",
  devIndicators: false,
  async rewrites() {
    return [
      ...(process.env.MRP_DEMO_URL ? [{ source: "/api/mrp/:path*", destination: `${process.env.MRP_DEMO_URL}/warehouse/:path*` }] : []),
      {
        source: "/api/:path*",
        destination: `${process.env.API_INTERNAL_URL || "http://127.0.0.1:3001"}/api/:path*`,
      },
    ];
  },
};
export default config;
