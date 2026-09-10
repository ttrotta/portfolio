import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  transpilePackages: ["three"],
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
