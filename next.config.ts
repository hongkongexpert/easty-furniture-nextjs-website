import type { NextConfig } from "next";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  turbopack: { root: projectRoot },
  images: {
    remotePatterns: [
      { protocol: "http", hostname: "aihks13.sg-host.com" },
      { protocol: "https", hostname: "aihks13.sg-host.com" }
    ]
  }
};

export default nextConfig;
