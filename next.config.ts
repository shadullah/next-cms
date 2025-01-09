import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    domains:["res.cloudinary.com"]
  },
  async rewrites(){
    return [
      {
        source:"/api/:path*",
        // destination:"http://localhost:8000/api/:path*"
        destination:"https://cms-backend-two-flax.vercel.app/api/:path*"
      }
    ]
  }
};

export default nextConfig;
