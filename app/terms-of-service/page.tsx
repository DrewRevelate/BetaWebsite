import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import termsOfServiceSchema from './schema';
import Script from 'next/script';
import { headers } from 'next/headers';
import { getTermsOfServiceData } from '@/lib/terms-config';
import PerformanceLayout from '@/components/PerformanceLayout';

// Import ErrorBoundary for catching rendering errors
const ErrorBoundary = dynamic(() => import('@/components/ErrorBoundary'), { ssr: false });

// Import MobileOptimizer for better mobile experience
const MobileOptimizer = dynamic(() => import('@/components/MobileOptimizer'), { ssr: true });

// Import the client component with loading optimization
const TermsOfServiceClientComponent = dynamic(() => import('./TermsOfServiceClientComponent'), { 
  ssr: false,
  loading: () => (
    <div className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-gray-200 text-white rounded-full shadow-lg flex items-center justify-center animate-pulse">
      <span className="sr-only">Loading interactive components...</span>
    </div>
  )
});

export const metadata: Metadata = {
  title: 'Terms of Service | Revelate Operations',
  description: 'Learn about the terms and conditions governing your use of Revelate Operations services and website.',
  keywords: 'terms of service, terms and conditions, legal terms, user agreement, service terms, Revelate Operations, SaaS consulting terms',
  alternates: {
    canonical: 'https://revelateops.com/terms-of-service',
    types: {
      'application/pdf': 'https://revelateops.com/terms-of-service/revelate-terms-of-service.pdf',
    },
  },
  openGraph: {
    title: 'Terms of Service | Revelate Operations',
    description: 'Learn about the terms and conditions governing your use of Revelate Operations services and website.',
    url: 'https://revelateops.com/terms-of-service',
    type: 'website',
    images: [
      {
        url: 'https://revelateops.com/images/terms-of-service-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Revelate Operations Terms of Service',
      },
    ],
    siteName: 'Revelate Operations',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service | Revelate Operations',
    description: 'Learn about the terms and conditions governing your use of Revelate Operations services and website.',
    images: ['https://revelateops.com/images/terms-of-service-og.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  category: 'Legal',
};

const TermsOfServicePage = () => {
  // Get the user's preferred language from request headers
  const headersList = headers();
  const userAgent = headersList.get('user-agent') || '';
  const isMobile = /Mobile|Android|iPhone|iPad|iPod/i.test(userAgent);
  
  // Get terms of service data from configuration
  const termsData = getTermsOfServiceData();
  
  return (
    <>
      {/* JSON-LD structured data for SEO */}
      <Script
        id="terms-of-service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(termsOfServiceSchema) }}
        strategy="afterInteractive"
      />
      
      {/* Wrap content in PerformanceLayout for better performance */}
      <PerformanceLayout 
        enableWebVitals={true}
        enableMobileOptimization={true}
        primeCache={true}
        optimizeImages={true}
        pageName="terms-of-service"
      >
        
      {/* Include the client component wrapped in ErrorBoundary */}
      <ErrorBoundary>
        <TermsOfServiceClientComponent />
      </ErrorBoundary>
      
      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-r from-primary to-primary-light text-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Terms of Service
            </h1>
            <p className="text-xl opacity-90 mb-6">
              Conditions for using our website and services
            </p>
            <p className="text-sm opacity-75">
              Last Updated: {termsData.lastUpdated}
            </p>
          </div>
        </div>
        
        {/* Wave SVG */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full">
            <path d="M0,32L60,37.3C120,43,240,53,360,53.3C480,53,600,43,720,42.7C840,43,960,53,1080,53.3C1200,53,1320,43,1380,37.3L1440,32L1440,100L1380,100C1320,100,1200,100,1080,100C960,100,840,100,720,100C600,100,480,100,360,100C240,100,120,100,60,100L0,100Z" fill="#f8f9fa"></path>
          </svg>
        </div>
      </section>
      
      {/* Skip to main content link for accessibility */}
      <a href="#main-content" className="skip-to-content">Skip to main content</a>
      
      {/* Main Content Section */}
      <section className="py-12 md:py-20" id="main-content" aria-labelledby="terms-main-heading">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Table of Contents Sidebar - Enhanced for SEO and accessibility */}
            <div className="lg:w-1/4 hidden lg:block">
              <div className="sticky top-24 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-xl font-bold mb-4" id="toc-heading">Table of Contents</h2>
                <nav className="toc-nav" aria-labelledby="toc-heading">
                  <ul className="space-y-2">
                    {termsData.sections.map((section) => (
                      <li key={section.id}>
                        <a 
                          href={`#${section.id}`} 
                          className="toc-link block text-gray-700 dark:text-gray-300 hover:text-primary transition-colors py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          data-section-id={section.id}
                          aria-label={`Navigate to ${section.title} section`}
                        >
                          {section.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="lg:w-3/4" role="region" aria-labelledby="terms-content-heading">
              <h2 id="terms-content-heading" className="sr-only">Terms of Service Content</h2>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 md:p-8">
                {/* Dynamically generate sections from data */}
                {termsData.sections.map((section) => (
                  <section 
                    id={section.id} 
                    key={section.id} 
                    className="terms-section mb-12 animate-on-scroll"
                    tabIndex={-1}
                  >
                    <h2 className="text-2xl font-bold mb-4 text-primary">{section.title}</h2>
                    <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: section.content }} />
                  </section>
                ))}
                
                {/* Document Download and Print Options */}
                <div className="text-center mt-12 flex flex-col md:flex-row items-center justify-center gap-4">
                  <Link 
                    href="/terms-of-service/revelate-terms-of-service.pdf" 
                    className="btn bg-primary text-white hover:bg-primary-dark px-6 py-3 rounded-md font-semibold transition inline-flex items-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary mb-4 md:mb-0"
                    aria-label="Download Terms of Service document as PDF"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
                    </svg>
                    Download PDF
                  </Link>
                  
                  <button 
                    onClick={() => {}} // Will be handled by client component
                    className="btn bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 px-6 py-3 rounded-md font-semibold transition inline-flex items-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    aria-label="Print Terms of Service document"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd" />
                    </svg>
                    Print Terms of Service
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800" aria-labelledby="questions-heading">
        <h2 id="questions-heading" className="sr-only">Additional Help</h2>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Still Have Questions?</h2>
            <p className="text-lg mb-8 text-gray-700 dark:text-gray-300">
              If you have any questions about our terms of service or need additional information, our team is here to help.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/contact" 
                className="btn bg-primary text-white hover:bg-primary-dark px-6 py-3 rounded-md font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                aria-label="Contact our team with questions"
              >
                Contact Us
              </Link>
              <Link 
                href="/privacy-policy" 
                className="btn border border-primary text-primary hover:bg-primary hover:text-white px-6 py-3 rounded-md font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                aria-label="View our privacy policy"
              >
                View Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      </PerformanceLayout>
    </>
  );
};

export default TermsOfServicePage;
