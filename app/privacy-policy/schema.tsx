// JSON-LD structured data for SEO

export const privacyPolicySchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Privacy Policy | Revelate Operations",
  "description": "Learn about how Revelate Operations collects, uses, and protects your personal information.",
  "url": "https://revelateops.com/privacy-policy",
  "mainEntity": {
    "@type": "WebContent",
    "about": {
      "@type": "Thing",
      "name": "Privacy Policy",
      "description": "Information about how Revelate Operations handles user data and privacy."
    },
    "text": "This Privacy Policy explains how Revelate Operations collects, uses, discloses, and safeguards your information when you visit our website or use our services.",
    "datePublished": "2025-03-22",
    "dateModified": "2025-03-22",
    "author": {
      "@type": "Organization",
      "name": "Revelate Operations",
      "url": "https://revelateops.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Revelate Operations",
      "logo": {
        "@type": "ImageObject",
        "url": "https://revelateops.com/logo.png"
      }
    }
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
        "name": "Privacy Policy",
        "item": "https://revelateops.com/privacy-policy"
      }
    ]
  }
};

export default privacyPolicySchema;
