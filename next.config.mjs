/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: "http://localhost:5000/api/v1",
    // API_URL: "https://api.bauvth.com/api/v1",
  },
  images: {
    domains: ["storage.googleapis.com"],
  },
};

export default nextConfig;
