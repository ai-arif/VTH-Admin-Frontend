/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: "http://api.bauvth.com/api/v1",
  },
  images: {
    domains: ["storage.googleapis.com"],
  },
};

export default nextConfig;
