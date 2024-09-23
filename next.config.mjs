/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["plus.unsplash.com", "images.unsplash.com"],
    unoptimized: true, // Nonaktifkan Image Optimization API
  },
  output: "export",
  webpack: (config) => {
    config.module.rules.push({
      test: /\.did$/,
      use: 'raw-loader',
    });
    return config;
  },
};

export default nextConfig;
