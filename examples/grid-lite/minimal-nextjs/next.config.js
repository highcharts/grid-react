/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    '@highcharts/grid-lite-react',
    '@highcharts/grid-shared-react',
    '@highcharts/grid-lite'
  ],
};

module.exports = nextConfig;

