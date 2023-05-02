/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_ENV: process.env.NEXT_PUBLIC_ENV !== "dev" ? "prod" : "dev",
  },
};

module.exports = nextConfig;
