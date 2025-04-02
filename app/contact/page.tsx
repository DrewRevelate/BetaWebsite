import type { Metadata } from 'next';
import Script from 'next/script';
import ContactPage from '@/components/contact/ContactPage';
import { getSiteSchema, getBreadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Contact Us | Revelate Operations',
  description: 'Get in touch with Revelate Operations for data-driven consulting services to transform your business and drive revenue growth.',
  keywords: 'contact revelate, data consulting, SaaS consulting, contact form, business inquiries, data strategy consultation',
  openGraph: {
    title: 'Contact Us | Revelate Operations',
    description: 'Get in touch with Revelate Operations for data-driven consulting services to transform your business and drive revenue growth.',
    url: 'https://revelateoperations.com/contact',
    siteName: 'Revelate Operations',
    images: [
      {
        url: '/images/og-contact.jpg',
        width: 1200,
        height: 630,
        alt: 'Revelate Operations - Contact Us'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us | Revelate Operations',
    description: 'Get in touch with Revelate Operations for data-driven consulting services to transform your business and drive revenue growth.',
    images: ['/images/og-contact.jpg'],
  },
  alternates: {
    canonical: 'https://www.revelateoperations.com/contact',
  },
  verification: {
    google: 'google-site-verification-code',
  },
};

// JSON-LD structured data
const contactStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact Revelate Operations',
  description: 'Contact our team for data-driven SaaS consulting services and solutions',
  url: 'https://www.revelateoperations.com/contact',
  mainEntity: {
    '@type': 'Organization',
    name: 'Revelate Operations',
    telephone: '+1-800-123-4567',
    email: 'contact@revelateoperations.com',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-800-123-4567',
      contactType: 'customer service',
      areaServed: ['US', 'CA', 'UK', 'AU'],
      availableLanguage: ['English']
    }
  }
};

// Breadcrumb schema
const breadcrumbData = getBreadcrumbSchema([
  { name: 'Home', item: 'https://www.revelateoperations.com', position: 1 },
  { name: 'Contact', item: 'https://www.revelateoperations.com/contact', position: 2 }
]);

export default function Contact() {
  return (
    <>
      {/* JSON-LD structured data */}
      <Script 
        id="contact-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactStructuredData) }}
      />
      
      {/* Breadcrumb structured data */}
      <Script 
        id="breadcrumb-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      
      {/* Contact Page Component */}
      <ContactPage />
    </>
  );
}
