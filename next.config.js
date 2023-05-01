/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_ENV: "prod",
  },
};

module.exports = nextConfig;
