/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    staticFolder: '/assets',
  },
  images: {
    // domains: ['http://10.10.10.23:8080', 'http://30.30.30.11:8080'],
    unoptimized: true,
  },
};

module.exports = nextConfig;
