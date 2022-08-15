/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_WEB3STORAGE_TOKEN: process.env.NEXT_PUBLIC_WEB3STORAGE_TOKEN,
  },
};

module.exports = nextConfig;
