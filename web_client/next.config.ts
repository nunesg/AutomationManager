import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
      "http://192.168.1.19", // your phone
      "http://192.168.1.22", // your phone
      "http://192.168.1.100", // your computer (optional)
      "http://localhost",
      'local-origin.dev', '*.local-origin.dev',
  ],
};

export default nextConfig;
