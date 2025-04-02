import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ClientScrollHandler from '@/components/ClientScrollHandler';
import BackToTopButton from '@/components/BackToTopButton';
import FloatingCTA from '@/components/ui/FloatingCTA';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import PerformanceMonitor from '@/components/ui/PerformanceMonitor';

import Script from 'next/script';

// Optimize font loading - Load variable fonts with proper strategy
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap', // Ensures text remains visible during font loading
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
  preload: true, // Ensure the font is preloaded
  weight: ['400', '500', '600', '700'], // Load only the weights we use
  adjustFontFallback: true, // Automatically adjust the fallback font to better match the web font
});

export const metadata: Metadata = {
  title: {
    template: '%s | Revelate Operations',
    default: 'Revelate Operations | Data-Driven SaaS Consulting',
  },
  description: 'Revelate Operations provides data-driven SaaS consulting services, helping businesses optimize their CRM, enhance data analytics, and develop revenue operations strategies.',
  keywords: 'SaaS consulting, data analytics, business intelligence, CRM management, revenue operations',
  metadataBase: new URL(process.env.BASE_URL || 'https://revelateops.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Revelate Operations',
    title: 'Revelate Operations | Data-Driven SaaS Consulting',
    description: 'Revelate Operations provides data-driven SaaS consulting services, helping businesses optimize their CRM, enhance data analytics, and develop revenue operations strategies.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Revelate Operations',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Revelate Operations | Data-Driven SaaS Consulting',
    description: 'Revelate Operations provides data-driven SaaS consulting services, helping businesses optimize their CRM, enhance data analytics, and develop revenue operations strategies.',
    images: ['/images/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Inline theme script to prevent flash of incorrect theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const storedTheme = localStorage.getItem('theme');
                  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  const theme = storedTheme || 'system';
                  const resolvedTheme = theme === 'system' ? systemTheme : theme;
                  document.documentElement.classList.add(resolvedTheme);
                } catch (e) {
                  console.warn('Error setting theme:', e);
                  document.documentElement.classList.add('light');
                }
              })();
            `,
          }}
        />
        
        {/* Preconnect to external domains to improve loading performance */}
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="anonymous" />
        
        {/* DNS prefetch for third-party resources */}
        <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
        
        {/* Preload critical assets */}
        <link 
          rel="preload" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
          as="style" 
        />
        
        {/* Preload critical fonts to improve LCP */}
        <link
          rel="preload"
          href="/fonts/inter-400.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        
        <link
          rel="preload"
          href="/fonts/inter-700.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        
        {/* Font Awesome with fallback for no-JS environments - Optimized loading */}
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" 
          crossOrigin="anonymous" 
          referrerPolicy="no-referrer" 
          media="print" 
          onLoad={(e) => {
            const target = e.currentTarget as HTMLLinkElement;
            target.media = 'all';
          }}
        />
        
        {/* Add core web vitals real user monitoring */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Core Web Vitals RUM tracking
              addEventListener('DOMContentLoaded', () => {
                // Only in production and only for a sample of users
                if (navigator.sendBeacon && Math.random() < 0.1) {
                  try {
                    const webVitals = () => {
                      const t = 'revelate-rum';
                      const r = document.createElement('script');
                      r.src = 'https://unpkg.com/web-vitals@3/dist/web-vitals.attribution.iife.js';
                      r.onload = () => {
                        // @ts-ignore - Web Vitals global
                        webVitals.getCLS(m => {
                          // Send Core Web Vitals data to your analytics
                          if (navigator.sendBeacon) {
                            navigator.sendBeacon('/api/vitals', JSON.stringify({metric: 'cls', value: m.value, id: m.id}));
                          }
                        });
                        // @ts-ignore - Web Vitals global
                        webVitals.getFID(m => {
                          if (navigator.sendBeacon) {
                            navigator.sendBeacon('/api/vitals', JSON.stringify({metric: 'fid', value: m.value, id: m.id}));
                          }
                        });
                        // @ts-ignore - Web Vitals global
                        webVitals.getLCP(m => {
                          if (navigator.sendBeacon) {
                            navigator.sendBeacon('/api/vitals', JSON.stringify({metric: 'lcp', value: m.value, id: m.id}));
                          }
                        });
                      };
                      document.head.appendChild(r);
                    };
                    webVitals();
                  } catch (e) {
                    console.warn('Error loading web-vitals', e);
                  }
                }
              });
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider defaultTheme="system" storageKey="theme">
        {/* Accessibility Skip Link */}
        <a href="#main-content" className="skip-link">Skip to main content</a>
        
        <Navigation />
        
        <main id="main-content">
          {children}
        </main>
        
        <Footer />
        
        {/* Back to top button */}
        <BackToTopButton />
        
        {/* Floating CTA */}
        <FloatingCTA 
          primaryText="Get Free Consultation"
          primaryLink="/contact"
          secondaryText="See Services"
          secondaryLink="/services"
          showAfterScroll={800}
          position="bottom-right"
        />
        
        {/* Performance Monitoring */}
        <PerformanceMonitor 
          shouldTrackRouteChanges={true}
          shouldTrackInteractions={true}
        />
        
        {/* Scroll to hash functionality */}
        <ClientScrollHandler />
        
        {/* Structured data for organization */}
        <Script
          id="schema-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Revelate Operations',
              url: process.env.BASE_URL || 'https://revelateops.com',
              logo: `${process.env.BASE_URL || 'https://revelateops.com'}/images/logo.png`,
              description: 'Data-driven SaaS consulting services helping businesses optimize their operations and drive growth.',
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+1-555-123-4567',
                contactType: 'customer service',
                email: 'info@revelateops.com'
              },
              sameAs: [
                'https://www.linkedin.com/company/revelateops'
              ]
            })
          }}
        />
        </ThemeProvider>
      </body>
    </html>
  );
}
