/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["next-mdx-remote"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol:"https",
        hostname: "flowbite.s3.amazonaws.com",
        pathname:"/**"
      },
      {
        protocol: "https",
        hostname: "www.canva.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "priyalakshmi.in",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.priyalakshmi.in", // Add www.priyalakshmi.in in case images are served from there
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "photography.priyalakshmi.in", // Add subdomain if images are served here
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
