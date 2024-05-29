/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  env: {
    HOST: process.env.HOST
  }
}

module.exports = nextConfig
