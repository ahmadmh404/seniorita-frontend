import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  cacheComponents: true,
  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "legendary-nurture-5fa7e4a07f.media.strapiapp.com",
      },
    ],
  },
};

export default nextConfig;
