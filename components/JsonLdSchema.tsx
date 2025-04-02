'use client';

import { useMemo } from 'react';
import Script from 'next/script';
import { usePathname } from 'next/navigation';

interface OrganizationSchema {
  name: string;
  url: string;
  logo: string;
  description: string;
  sameAs: string[];
  address?: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  contactPoint?: {
    type: string;
    telephone: string;
    email: string;
    contactType: string;
  };
}

interface WebsiteSchema {
  name: string;
  url: string;
  description: string;
  potentialAction?: {
    target: string;
  };
}

interface BreadcrumbSchema {
  items: Array<{
    name: string;
    url: string;
  }>;
}

interface FAQSchema {
  questions: Array<{
    question: string;
    answer: string;
  }>;
}

interface ServiceSchema {
  name: string;
  description: string;
  provider: string;
  serviceType: string;
  areaServed?: string;
  price?: string;
  priceCurrency?: string;
}

interface JsonLdSchemaProps {
  type: 'Organization' | 'Website' | 'Breadcrumb' | 'FAQ' | 'Service' | 'LocalBusiness' | 'Article' | 'Product' | 'WebPage';
  data: OrganizationSchema | WebsiteSchema | BreadcrumbSchema | FAQSchema | ServiceSchema | Record<string, any>;
  scriptId?: string;
}

/**
 * JSON-LD Schema Component
 * 
 * Creates structured data for better SEO and rich snippets in search results
 */
export default function JsonLdSchema({ type, data, scriptId }: JsonLdSchemaProps) {
  const pathname = usePathname();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://revelateops.com';

  // Generate schema data based on type
  const schemaData = useMemo(() => {
    const baseSchema = {
      '@context': 'https://schema.org',
      '@type': type,
    };

    switch (type) {
      case 'Organization':
        const orgData = data as OrganizationSchema;
        return {
          ...baseSchema,
          name: orgData.name,
          url: orgData.url,
          logo: orgData.logo,
          description: orgData.description,
          sameAs: orgData.sameAs,
          ...(orgData.address && { address: {
            '@type': 'PostalAddress',
            ...orgData.address
          }}),
          ...(orgData.contactPoint && { contactPoint: {
            '@type': 'ContactPoint',
            ...orgData.contactPoint
          }})
        };

      case 'Website':
        const websiteData = data as WebsiteSchema;
        return {
          ...baseSchema,
          name: websiteData.name,
          url: websiteData.url,
          description: websiteData.description,
          ...(websiteData.potentialAction && { 
            potentialAction: {
              '@type': 'SearchAction',
              target: websiteData.potentialAction.target,
              'query-input': 'required name=search_term_string'
            }
          })
        };

      case 'Breadcrumb':
        const breadcrumbData = data as BreadcrumbSchema;
        return {
          ...baseSchema,
          '@type': 'BreadcrumbList',
          itemListElement: breadcrumbData.items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url.startsWith('http') ? item.url : `${baseUrl}${item.url}`
          }))
        };

      case 'FAQ':
        const faqData = data as FAQSchema;
        return {
          ...baseSchema,
          '@type': 'FAQPage',
          mainEntity: faqData.questions.map(item => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.answer
            }
          }))
        };

      case 'Service':
        const serviceData = data as ServiceSchema;
        return {
          ...baseSchema,
          name: serviceData.name,
          description: serviceData.description,
          provider: {
            '@type': 'Organization',
            name: serviceData.provider
          },
          serviceType: serviceData.serviceType,
          ...(serviceData.areaServed && { areaServed: serviceData.areaServed }),
          ...(serviceData.price && serviceData.priceCurrency && { 
            offers: {
              '@type': 'Offer',
              price: serviceData.price,
              priceCurrency: serviceData.priceCurrency
            }
          })
        };

      // For other types, just pass the data through as-is
      default:
        return { ...baseSchema, ...data };
    }
  }, [type, data, baseUrl]);

  // Generate a unique ID for the script if not provided
  const id = scriptId || `jsonld-${type.toLowerCase()}-${pathname.replace(/[^a-z0-9]/gi, '-')}`;

  return (
    <Script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      strategy="afterInteractive"
    />
  );
}
