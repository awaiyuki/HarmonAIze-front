/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [process.env.DB_HOST],
  },
}

export default nextConfig
