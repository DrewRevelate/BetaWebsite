/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Enable standalone output for Docker deployments
  output: 'standalone',
  images: {
    domains: ['cdnjs.cloudflare.com', 'fonts.googleapis.com', 'ui.aceternity.com', 'cdn.sanity.io'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdnjs.cloudflare.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'fonts.googleapis.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'ui.aceternity.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '**',
      },
    ],
    // Define image breakpoints for better responsive image optimization
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Image format configuration - only include supported options
    formats: ['image/webp', 'image/avif'],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Environment variables that should be exposed to the browser
  env: {
    BASE_URL: process.env.BASE_URL || 'http://localhost:3000',
  },
    // Performance improvements
  swcMinify: true,
  // Disable Next.js telemetry in production
  poweredByHeader: false,
  // Experimental features
  experimental: {
    optimizeCss: true, // Re-enable now that critters is installed
    scrollRestoration: true,
    // Enable memory optimization for improved build performance
    memoryOptimizer: {
      enabled: true,
    },
    // Optimize builds by caching across builds
    turbotrace: {
      enabled: true,
      memoryLimit: 4000,
    },
    // Improve font loading performance
    fontLoaders: [
      { loader: '@next/font/google', options: { subsets: ['latin'] } },
    ],
    // Image optimization improvements
    images: {
      allowFutureImage: true,
      dangerouslyAllowSVG: true,
      contentDispositionType: 'attachment',
      contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**',
        },
      ],
    },
    // Performance optimization features
    optimizePackageImports: ['lucide-react', 'framer-motion', 'tailwind-merge', 'clsx'],
    serverComponentsExternalPackages: ['sharp'],
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  // Add HTTP/2 server push for critical assets
  compress: true,
  // Add security headers
  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          }
        ],
      },
    ];
  },
  // Add Sanity Studio at /studio route
  async rewrites() {
    return [
      {
        source: '/studio/:path*',
        destination: '/studio/index.html',
      },
    ]
  },
};

// Add bundle analyzer in non-production environments if needed
if (process.env.ANALYZE === 'true') {
  const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: true,
  });
  module.exports = withBundleAnalyzer(nextConfig);
} else {
  module.exports = nextConfig;
}
