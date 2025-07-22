import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['res.cloudinary.com'], // kosong karena pakai gambar lokal dari /public
  },
};

export default nextConfig;
