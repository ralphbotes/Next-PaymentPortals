/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  env: {
    NEXT_PUBLIC_HOST: process.env.NEXT_PUBLIC_HOST,
    NEXT_PUBLIC_NODE_ENV: process.env.NEXT_PUBLIC_NODE_ENV,
    NEXT_PUBLIC_PAYGATE_SECRET: process.env.NEXT_PUBLIC_PAYGATE_SECRET,
    NEXT_PUBLIC_PAYGATE_MERCHANT: process.env.NEXT_PUBLIC_PAYGATE_MERCHANT
  }
}

module.exports = nextConfig
