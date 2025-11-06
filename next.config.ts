import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // async headers() {
  //   return [
  //     {
  //       source: "/(.*)",
  //       headers: [
  //         {
  //           key: "Cross-Origin-Opener-Policy",
  //           value: "same-origin-allow-popups", // "same-origin-allow-popups"
  //         },
  //       ],
  //     },
  //   ];
  // },
  async headers() {
    return [
      {
        source: "/:path*", //
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin-allow-popups",
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "unsafe-none",
          },
        ],
      },
    ];
  },

  // async rewrites() {
  //   return [
  //     {
  //       source: '/__/auth/:path*',
  //       destination: `https://${process.env.NEXT_PUBLIC_AUTH_DOMAIN}/__/auth/:path*`,
  //     },
  //   ];
  // },
};

export default nextConfig;