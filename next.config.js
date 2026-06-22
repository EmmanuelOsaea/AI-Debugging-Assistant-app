/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow environment variables to be accessed in client code
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  },
  
  // Enable experimental features for better TypeScript support
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ['openai'],
  },
  
  // Security headers
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'X-DNS-Prefetch-Control',
          value: 'on',
        },
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=63072000; includeSubDomains; preload',
        },
      ],
    },
  ],
  
  // Optional: Disable webpack caching for faster local dev
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.cache = false;
    }
    return config;
  },
};

module.exports = nextConfig;
