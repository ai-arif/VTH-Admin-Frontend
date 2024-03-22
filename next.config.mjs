/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env:{
    API_URL:"http://localhost:5000/api/admin"
  }
};

export default nextConfig;
