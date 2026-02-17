/** @type {import('next').NextConfig} */

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Keeping 'export' for static site, but we'll use Client-side Firebase for admin
  output: 'export',
}

export default nextConfig
