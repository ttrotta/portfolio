import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  transpilePackages: ["three"],
  turbopack: {
    root: process.cwd(),
  },
  env: {
    // Reads LIGHTBULB from .env files and exposes it to the client bundle.
    // Defaults to enabled when the variable is not set.
    LIGHTBULB: process.env.LIGHTBULB ?? "true",
  },
};

export default nextConfig;
