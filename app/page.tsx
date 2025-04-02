import type { Metadata } from 'next';
import HomePage from '@/components/home/HomePage';
import JsonLdSchema from '@/components/JsonLdSchema';
import { generateMetadata } from '@/components/SEO';
import { LazyLoad } from '@/components';
import ErrorBoundary from '@/components/ErrorBoundary';

// Import data statically
import { 
  serviceData, 
  expertisePoints, 
  processSteps, 
  resultCards, 
  testimonials 
} from '@/lib/homeData';

// Use the SEO component to generate metadata
export const metadata: Metadata = generateMetadata({
  title: 'Revelate Operations | Data-Driven SaaS Consulting',
  description: 'Transform your raw data into strategic wealth. Data integration, CRM management, business intelligence, and customer retention solutions for SaaS companies.',
  path: '/',
  ogImage: {
    url: '/images/og-home.jpg',
    width: 1200,
    height: 630,
    alt: 'Revelate Operations - Data-Driven SaaS Consulting'
  }
});

// Define organization data for structured data
const organizationData = {
  name: 'Revelate Operations',
  description: 'Data-driven SaaS consulting for businesses looking to optimize their operations and drive growth through data integration and analytics.',
  url: 'https://www.revelateoperations.com',
  logo: 'https://www.revelateoperations.com/images/logo.png',
  sameAs: [
    'https://www.linkedin.com/company/revelate-operations',
    'https://twitter.com/revelateops'
  ],
  address: {
    streetAddress: '123 Data Drive',
    addressLocality: 'San Francisco',
    addressRegion: 'CA',
    postalCode: '94105',
    addressCountry: 'US'
  },
  contactPoint: {
    type: 'ContactPoint',
    telephone: '+1-800-123-4567',
    email: 'info@revelateoperations.com',
    contactType: 'customer service'
  }
};

// Define professional service data
const servicePageData = {
  '@type': 'ProfessionalService',
  name: 'Revelate Operations',
  description: 'Data-driven SaaS consulting for businesses looking to optimize their operations and drive growth through data integration and analytics.',
  image: 'https://www.revelateoperations.com/images/og-home.jpg',
  url: 'https://www.revelateoperations.com',
  telephone: '+1-800-123-4567',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '123 Data Drive',
    addressLocality: 'San Francisco',
    addressRegion: 'CA',
    postalCode: '94105',
    addressCountry: 'US'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 37.7749,
    longitude: -122.4194
  },
  priceRange: '$$',
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday'
    ],
    opens: '09:00',
    closes: '17:00'
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'SaaS Consulting Services',
    itemListElement: serviceData.map(service => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: service.title,
        description: service.description
      }
    }))
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    ratingCount: '89',
    bestRating: '5',
    worstRating: '1'
  }
};

export default function Home() {
  return (
    <>
      {/* JSON-LD structured data */}
      <JsonLdSchema type="Organization" data={organizationData} scriptId="org-schema" />
      <JsonLdSchema type="WebPage" data={servicePageData} scriptId="service-schema" />
      
      <ErrorBoundary componentName="HomePage">
        <main>
          {/* Render the home page content */}
          <HomePage 
            serviceData={serviceData}
            expertisePoints={expertisePoints}
            processSteps={processSteps}
            resultCards={resultCards}
            testimonials={testimonials}
          />
        </main>
      </ErrorBoundary>
    </>
  );
}
