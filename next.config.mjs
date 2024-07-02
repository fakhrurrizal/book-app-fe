/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'localhost',
      'book-app-7byxnfjj7-fakhrurrizals-projects.vercel.app',
      'res.cloudinary.com',
    ],
    deviceSizes: [320, 420, 768, 1024, 1200],
    imageSizes: [16, 32, 48, 64, 96],
  },
};

export default nextConfig;
