// next.config.js
const { withContentlayer } = require("next-contentlayer");

//nextra docs
const withNextra = require("nextra")({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.js",
  basePath: "/docs",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  // images: {
  //   domains: ["lh3.googleusercontent.com", "vercel.com"],
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**google**.com",
        port: "",
        pathname: "/**",
      },

      {
        protocol: "https",
        hostname: "vercel.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/github",
        destination: "https://github.com/steven-tey/precedent",
        permanent: false,
      },
    ];
  },
};

// module.exports = withContentlayer(nextConfig);
module.exports = withNextra(withContentlayer(nextConfig));
