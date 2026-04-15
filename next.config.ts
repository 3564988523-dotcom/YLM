import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.dev.coze.site',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;