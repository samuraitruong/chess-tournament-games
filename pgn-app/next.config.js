/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
};

if (process.env.NEXT_PUBLIC_BASE_PATH) {
  nextConfig.basePath = process.env.NEXT_PUBLIC_BASE_PATH;
}

module.exports = nextConfig;
