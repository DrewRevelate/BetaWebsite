import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

// Utility types for sitemap
type ChangeFrequency = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';

interface SitemapEntry {
  url: string;
  lastModified: Date;
  changeFrequency: ChangeFrequency;
  priority: number;
}

/**
 * Dynamic sitemap generator that includes:
 * - Static pages
 * - Blog posts (dynamically discovered)
 * - Service detail pages
 * - Approach sections
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.BASE_URL || 'https://revelateops.com';
  const currentDate = new Date();
  
  // Static pages with their configurations
  const staticPages: SitemapEntry[] = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/approach`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];
  
  // Get blog posts dynamically
  const blogPosts = await getBlogPosts();
  const blogEntries = blogPosts.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as ChangeFrequency,
    priority: 0.7,
  }));
  
  // Get service pages dynamically
  const servicePages = [
    'crm-management',
    'data-integration',
    'business-intelligence',
    'customer-retention',
    'data-analytics',
    'revenue-operations'
  ];
  
  const serviceEntries = servicePages.map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as ChangeFrequency,
    priority: 0.8,
  }));
  
  // Combine all entries
  return [...staticPages, ...blogEntries, ...serviceEntries];
}

/**
 * Get all blog post slugs by scanning the blog directory
 */
async function getBlogPosts(): Promise<string[]> {
  const blogDir = path.join(process.cwd(), 'app/blog');
  
  try {
    // Check if blog directory exists
    if (!fs.existsSync(blogDir)) {
      console.warn('Blog directory not found');
      return [];
    }
    
    // Read blog directory to get list of posts
    const directories = fs.readdirSync(blogDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory() && !dirent.name.startsWith('.'))
      .map(dirent => dirent.name);
    
    return directories;
  } catch (error) {
    console.error('Error reading blog directory:', error);
    return [];
  }
}