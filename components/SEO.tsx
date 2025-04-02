import { Metadata } from 'next';
import { generateSeoTitle, generateSeoDescription, generateCanonicalUrl } from '@/lib/utils';

interface SeoProps {
  title?: string;
  description?: string;
  path?: string;
  ogImage?: {
    url: string;
    width?: number;
    height?: number;
    alt?: string;
  };
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    authors?: string[];
    tags?: string[];
  };
  noIndex?: boolean;
}

/**
 * Helper function to generate metadata for Next.js pages
 * 
 * Usage in page.tsx files:
 * ```
 * export const metadata = generateMetadata({
 *   title: 'Page Title',
 *   description: 'Page description',
 *   path: '/page-path'
 * });
 * ```
 */
export function generateMetadata({
  title,
  description,
  path = '',
  ogImage,
  article,
  noIndex = false
}: SeoProps): Metadata {
  // Default site information
  const siteName = 'Revelate Operations';
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://revelateops.com';
  
  // Generate SEO-friendly title and description
  const seoTitle = generateSeoTitle(title || '', siteName);
  const seoDescription = generateSeoDescription(description || 'Revelate Operations provides data-driven SaaS consulting services, helping businesses optimize their CRM, enhance data analytics, and develop revenue operations strategies.');
  
  // Generate canonical URL
  const canonicalUrl = generateCanonicalUrl(path);
  
  // Default OG image
  const defaultOgImage = {
    url: `${baseUrl}/images/og-image.jpg`,
    width: 1200,
    height: 630,
    alt: 'Revelate Operations'
  };
  
  // Combine default with custom OG image if provided
  const finalOgImage = ogImage ? {
    url: ogImage.url.startsWith('http') ? ogImage.url : `${baseUrl}${ogImage.url}`,
    width: ogImage.width || 1200,
    height: ogImage.height || 630,
    alt: ogImage.alt || 'Revelate Operations'
  } : defaultOgImage;
  
  // Build metadata object
  const metadata: Metadata = {
    title: {
      absolute: seoTitle,
      template: '%s | Revelate Operations',
      default: 'Revelate Operations | Data-Driven SaaS Consulting'
    },
    description: seoDescription,
    keywords: 'SaaS consulting, data analytics, business intelligence, CRM management, revenue operations',
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: article ? 'article' : 'website',
      locale: 'en_US',
      url: canonicalUrl,
      siteName: siteName,
      title: title || siteName,
      description: seoDescription,
      images: [finalOgImage]
    },
    twitter: {
      card: 'summary_large_image',
      title: title || siteName,
      description: seoDescription,
      images: [finalOgImage.url]
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-image-preview': 'large',
        'max-video-preview': -1,
        'max-snippet': -1,
      },
    }
  };
  
  // Add article-specific metadata if this is an article
  if (article) {
    metadata.openGraph = {
      ...metadata.openGraph,
      type: 'article',
      publishedTime: article.publishedTime,
      modifiedTime: article.modifiedTime,
      authors: article.authors,
      tags: article.tags
    };
  }
  
  return metadata;
}
