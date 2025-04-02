import { Metadata } from 'next';

// JSON-LD structured data for better SEO
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Revelate Operations',
  description: 'SaaS consulting focusing on data-driven business transformation',
  url: 'https://revelateops.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Business Location',
    addressCountry: 'US'
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Business Transformation Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Data-Driven Business Transformation',
          description: 'A systematic 4-stage approach to transforming business data into strategic wealth',
        }
      }
    ]
  },
  sameAs: [
    'https://twitter.com/revelateops',
    'https://linkedin.com/company/revelateops'
  ]
};

export const metadata: Metadata = {
  title: 'Our Approach | Revelate Operations - Business Transformation Partners',
  description: "Discover how Revelate Operations partners with executives to transform business challenges into revenue opportunities with our proven methodology.",
  keywords: 'business transformation, executive consulting, RevOps, data-driven strategy, SaaS consulting, revenue operations, business process optimization',
  authors: [{ name: 'Revelate Operations Team' }],
  robots: 'index, follow',
  alternates: {
    canonical: 'https://revelateops.com/approach',
  },
  openGraph: {
    title: 'Our Approach | Revelate Operations',
    description: "Discover how Revelate Operations partners with executives to transform business challenges into revenue opportunities with our proven methodology.",
    url: 'https://revelateops.com/approach',
    siteName: 'Revelate Operations',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/approach-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Revelate Operations Methodology'
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Approach | Revelate Operations',
    description: "Discover how Revelate Operations partners with executives to transform business challenges into revenue opportunities with our proven methodology.",
    images: ['/images/approach-og.jpg'],
  },
  category: 'SaaS Consulting',
  other: {
    // Add structured data directly to metadata
    'application-ld+json': JSON.stringify(structuredData)
  }
};
