/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["plus.unsplash.com", "images.unsplash.com"],
    unoptimized: true, // Nonaktifkan Image Optimization API
  },
  output: "export",
};

export default nextConfig;
