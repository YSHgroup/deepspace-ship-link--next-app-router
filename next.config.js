/** @type {import('next').NextConfig} */

const nextConfig = {
  //output: 'export',
  images: {
    unoptimized: true,
  },
  compiler: {},
  productionBrowserSourceMaps: true,  
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
}

module.exports = nextConfig
