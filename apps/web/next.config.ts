import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@mindvault/ui", "@mindvault/types", "@mindvault/config"],
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }]
  }
};

export default nextConfig;
