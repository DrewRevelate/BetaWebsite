// JSON-LD structured data for SEO

export const termsOfServiceSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Terms of Service | Revelate Operations",
  "description": "Learn about the terms and conditions governing your use of Revelate Operations services and website.",
  "url": "https://revelateops.com/terms-of-service",
  "isPartOf": {
    "@type": "WebSite",
    "url": "https://revelateops.com",
    "name": "Revelate Operations",
    "description": "Data-driven SaaS consulting services to optimize your business operations."
  },
  "mainEntity": {
    "@type": "WebContent",
    "headline": "Terms of Service",
    "about": {
      "@type": "Thing",
      "name": "Terms of Service",
      "description": "Legal terms and conditions for using Revelate Operations services and website."
    },
    "text": "This Terms of Service agreement outlines the rules and regulations for the use of Revelate Operations' website and services.",
    "datePublished": "2025-03-22",
    "dateModified": "2025-03-22",
    "author": {
      "@type": "Organization",
      "name": "Revelate Operations",
      "url": "https://revelateops.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://revelateops.com/images/logo.png",
        "width": "180",
        "height": "60"
      }
    },
    "publisher": {
      "@type": "Organization",
      "name": "Revelate Operations",
      "logo": {
        "@type": "ImageObject",
        "url": "https://revelateops.com/images/logo.png",
        "width": "180",
        "height": "60"
      }
    },
    "hasPart": [
      {
        "@type": "WebPageElement",
        "isPartOf": {
          "@id": "https://revelateops.com/terms-of-service"
        },
        "name": "Introduction",
        "description": "Introduction to the Terms of Service."
      },
      {
        "@type": "WebPageElement",
        "isPartOf": {
          "@id": "https://revelateops.com/terms-of-service"
        },
        "name": "Acceptance of Terms",
        "description": "Information about acceptance of the Terms of Service."
      },
      {
        "@type": "WebPageElement",
        "isPartOf": {
          "@id": "https://revelateops.com/terms-of-service"
        },
        "name": "Services Description",
        "description": "Description of the services provided by Revelate Operations."
      }
    ]
  },
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://revelateops.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Legal",
        "item": "https://revelateops.com/legal"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Terms of Service",
        "item": "https://revelateops.com/terms-of-service"
      }
    ]
  },
  "potentialAction": [
    {
      "@type": "ReadAction",
      "target": [
        "https://revelateops.com/terms-of-service"
      ]
    },
    {
      "@type": "DownloadAction",
      "target": [
        "https://revelateops.com/terms-of-service/revelate-terms-of-service.pdf"
      ]
    }
  ],
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": [".terms-section h2", ".terms-section p:first-of-type"]
  },
  "accessibilityFeature": [
    "alternativeText",
    "aria",
    "highContrastDisplay"
  ],
  "accessibilityControl": [
    "fullKeyboardControl",
    "fullMouseControl",
    "fullTouchControl"
  ],
  "accessMode": [
    "textual",
    "visual"
  ]
};

export default termsOfServiceSchema;
