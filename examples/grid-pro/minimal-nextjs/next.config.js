/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    '@highcharts/grid-pro-react',
    '@highcharts/grid-shared-react',
    '@highcharts/grid-pro'
  ],
};

module.exports = nextConfig;

