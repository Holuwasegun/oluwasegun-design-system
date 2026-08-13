import type { NextConfig } from "next";

// Static export is required for Capacitor mobile delivery (webDir: "out").
// On Vercel the auth/subscribe API routes need a server runtime, so Vercel
// builds in default server mode instead of exporting to static files.
const nextConfig: NextConfig = {
  output: process.env.VERCEL ? undefined : "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
