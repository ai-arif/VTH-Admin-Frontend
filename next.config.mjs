/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env:{
    API_URL:"http://localhost:8080/api/v1"
  }
};

export default nextConfig;
