/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: process.env.DB_HOST, port: '' },
    ],
  },
}

export default nextConfig
