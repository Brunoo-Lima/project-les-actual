import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3333",
        pathname: "/images/*",
      },
    ],
  },

  /* config options here */
  // async redirects() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/produtos',
  //       permanent: true,
  //     },
  //   ];
  // },
};

export default nextConfig;
