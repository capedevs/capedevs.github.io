/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      { hostname: "www.w3schools.com" },
      { hostname: "learnxinyminutes.com" },
      { hostname: "www.sololearn.com" },
      { hostname: "www.freecodecamp.org" },
      { hostname: "docs.microsoft.com" },
      { hostname: "www.shecodes.io" },
      { hostname: "exercism.org" },
      { hostname: "static-assets.codecademy.com" },
      { hostname: "www.codewars.com" },
      { hostname: "news.ycombinator.com" },
      { hostname: "sololearn.com" },
    ],
  },
  output: 'export',
  basePath: '/capedevs.github.io',
  assetPrefix: '/capedevs.github.io/',
  trailingSlash: true,
};

module.exports = nextConfig;

