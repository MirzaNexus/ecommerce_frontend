import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allows high-quality 90% optimization
    qualities: [75, 90],

    // Whitelist for external providers
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  /* Your other config options here */
};

export default nextConfig;
