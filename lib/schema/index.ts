/**
 * Schema.org structured data implementation for SEO
 * 
 * This module provides structured JSON-LD data schemas for search engines
 * to better understand and represent our website content in search results.
 */

export interface Organization {
  name: string;
  description: string;
  url: string;
  logo: string;
  address?: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  contactPoint?: {
    telephone: string;
    contactType: string;
    email?: string;
    areaServed?: string[];
  };
  sameAs?: string[];
}

export interface Service {
  name: string;
  description: string;
  provider?: Organization;
  serviceArea?: string | string[];
  offers?: {
    price?: number;
    priceCurrency?: string;
    availability?: string;
    validFrom?: string;
    url?: string;
  };
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BreadcrumbItem {
  name: string;
  item: string;
  position: number;
}

// Base organization data
const organizationData: Organization = {
  name: "Revelate Operations",
  description: "Data-driven SaaS consulting for businesses looking to optimize their operations and drive growth through data integration and analytics.",
  url: "https://www.revelateoperations.com",
  logo: "https://www.revelateoperations.com/images/logo.png",
  contactPoint: {
    telephone: "+1-800-123-4567",
    contactType: "customer service",
    email: "contact@revelateoperations.com",
    areaServed: ["US", "CA", "UK", "AU"]
  },
  sameAs: [
    "https://www.linkedin.com/company/revelate-operations"
  ]
};

/**
 * Generate Organization JSON-LD schema
 */
export function getOrganizationSchema(orgData: Partial<Organization> = {}): any {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    ...organizationData,
    ...orgData
  };
}

/**
 * Generate LocalBusiness JSON-LD schema
 */
export function getLocalBusinessSchema(orgData: Partial<Organization> = {}): any {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    ...organizationData,
    ...orgData,
    priceRange: "$$",
    geo: {
      "@type": "GeoCoordinates",
      latitude: 37.7749,
      longitude: -122.4194
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      opens: "09:00",
      closes: "17:00"
    }
  };
}

/**
 * Generate Service JSON-LD schema
 */
export function getServiceSchema(service: Service): any {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    provider: organizationData,
    ...service
  };
}

/**
 * Generate FAQ JSON-LD schema
 */
export function getFAQSchema(items: FAQItem[]): any {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(item => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };
}

/**
 * Generate BreadcrumbList JSON-LD schema
 */
export function getBreadcrumbSchema(items: BreadcrumbItem[]): any {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map(item => ({
      "@type": "ListItem",
      position: item.position,
      name: item.name,
      item: item.item
    }))
  };
}

/**
 * Generate WebSite JSON-LD schema
 */
export function getWebsiteSchema(siteData: {
  name?: string;
  url?: string;
  description?: string;
  searchUrl?: string;
} = {}): any {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteData.name || organizationData.name,
    url: siteData.url || organizationData.url,
    description: siteData.description || organizationData.description,
    ...(siteData.searchUrl ? {
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: siteData.searchUrl
        },
        "query-input": "required name=search_term"
      }
    } : {})
  };
}

/**
 * Generate full site schema bundle
 */
export function getSiteSchema(path: string = ""): any[] {
  // Base schemas that should be on every page
  const baseSchemas = [
    getOrganizationSchema(),
    getWebsiteSchema()
  ];
  
  // Add page-specific schemas based on path
  if (path === "/" || path === "") {
    // Homepage
    baseSchemas.push(getLocalBusinessSchema({
      name: "Revelate Operations - Data-Driven SaaS Consulting",
      description: "Transform your raw data into strategic wealth with our expert SaaS consulting services."
    }));
  } else if (path.startsWith("/services")) {
    // Services pages
    baseSchemas.push(getServiceSchema({
      name: "Data Integration and Analytics Services",
      description: "Comprehensive data services to optimize your operations and drive growth"
    }));
  } else if (path.startsWith("/contact")) {
    // Contact page
    baseSchemas.push(
      getBreadcrumbSchema([
        { name: "Home", item: "https://www.revelateoperations.com", position: 1 },
        { name: "Contact", item: "https://www.revelateoperations.com/contact", position: 2 }
      ])
    );
  }
  
  return baseSchemas;
}

export default {
  getOrganizationSchema,
  getLocalBusinessSchema,
  getServiceSchema,
  getFAQSchema,
  getBreadcrumbSchema,
  getWebsiteSchema,
  getSiteSchema
};
