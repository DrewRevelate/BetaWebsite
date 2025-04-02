import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import Script from 'next/script';
import { Suspense } from 'react';
import { ImageOptimizer } from '@/components/ImageOptimizer';
import PerformanceLayout from '@/components/PerformanceLayout';
import { getAllBlogPosts, getAllCategories, getAllTags } from '@/lib/blog';
import { formatDate } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Blog | Revelate Operations',
  description: 'Explore our articles and guides on Revenue Operations, CRM management, business intelligence, and data-driven strategies for business growth.',
  keywords: 'revenue operations blog, revops articles, salesforce tips, data analytics guides, business intelligence insights',
  alternates: {
    canonical: 'https://revelateops.com/blog',
  },
  openGraph: {
    title: 'Revenue Operations Blog | Revelate Operations',
    description: 'Expert articles and guides on RevOps, CRM management, business intelligence, and data integration.',
    url: 'https://revelateops.com/blog',
    siteName: 'Revelate Operations',
    images: [
      {
        url: '/images/og-blog.jpg',
        width: 1200,
        height: 630,
        alt: 'Revelate Operations Blog'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Revenue Operations Blog | Revelate Operations',
    description: 'Expert articles and guides on RevOps, CRM management, business intelligence, and data integration.',
    images: ['/images/twitter-blog.jpg'],
  },
};

export default function BlogPage({ 
  searchParams 
}: { 
  searchParams: { 
    category?: string; 
    tag?: string; 
    page?: string;
  }
}) {
  // Get all blog posts
  const allPosts = getAllBlogPosts();
  
  // Get all categories and tags
  const categories = getAllCategories();
  const tags = getAllTags();
  
  // Extract query parameters
  const categoryFilter = searchParams.category;
  const tagFilter = searchParams.tag;
  const currentPage = Number(searchParams.page) || 1;
  const postsPerPage = 9;
  
  // Filter posts based on category and tag
  let filteredPosts = allPosts;
  
  if (categoryFilter) {
    filteredPosts = filteredPosts.filter(post => 
      post.category.slug === categoryFilter
    );
  }
  
  if (tagFilter) {
    filteredPosts = filteredPosts.filter(post => 
      post.tags.some(tag => tag.toLowerCase().replace(/\s+/g, '-') === tagFilter)
    );
  }
  
  // Calculate pagination
  const totalPosts = filteredPosts.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);
  
  // Get featured posts (first 3 posts)
  const featuredPosts = allPosts.slice(0, 3);
  
  return (
    <>
      {/* Add JSON-LD structured data for SEO */}
      <Script
        id="blog-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Blog',
            name: 'Revelate Operations Blog',
            description: 'Expert articles and guides on Revenue Operations, CRM management, business intelligence, and data integration.',
            url: 'https://revelateops.com/blog',
            publisher: {
              '@type': 'Organization',
              name: 'Revelate Operations',
              logo: {
                '@type': 'ImageObject',
                url: 'https://revelateops.com/images/logo.png',
              },
            },
            blogPost: allPosts.slice(0, 10).map(post => ({
              '@type': 'BlogPosting',
              headline: post.title,
              description: post.excerpt,
              datePublished: post.publishedAt,
              dateModified: post.updatedAt || post.publishedAt,
              author: {
                '@type': 'Person',
                name: post.author.name,
              },
              url: `https://revelateops.com/blog/${post.slug}`,
            })),
          }),
        }}
        strategy="afterInteractive"
      />
      
      <PerformanceLayout
        enableWebVitals={true}
        enableMobileOptimization={true}
        primeCache={true}
        optimizeImages={true}
        pageName="blog"
      >
        {/* Hero Section */}
        <section className="relative py-24 bg-gradient-to-br from-primary to-secondary text-white overflow-hidden">
          {/* Abstract patterns */}
          <div className="absolute inset-0 opacity-10 z-0">
            <div className="absolute w-full h-full" style={{ backgroundImage: 'url("/images/patterns/grid-pattern.svg")', backgroundSize: '30px' }}></div>
          </div>
          
          {/* Mesh Grid */}
          <div className="absolute inset-0 z-0 opacity-20" style={{ 
            backgroundImage: `radial-gradient(circle at 30px 30px, rgba(255, 255, 255, 0.2) 2px, transparent 0)`, 
            backgroundSize: '60px 60px' 
          }}></div>
          
          {/* 3D Geometric Elements */}
          <div className="absolute top-1/4 right-10 w-32 h-32 rounded-xl bg-white/10 backdrop-blur-md rotate-12"></div>
          <div className="absolute bottom-1/4 left-10 w-24 h-24 rounded-full bg-accent/20 backdrop-blur-sm"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center space-x-2 mb-6 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                <span className="text-sm font-medium tracking-wide uppercase">RevOps Knowledge Center</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Insights for Data-Driven Revenue Growth
              </h1>
              
              <p className="text-xl text-white/90 mb-8">
                Expert articles and practical guides to help you optimize your revenue operations and drive sustainable business growth.
              </p>
              
              <div className="max-w-xl mx-auto">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search articles..."
                    className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white text-primary hover:bg-gray-100 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                  >
                    <i className="fas fa-search"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Wave divider */}
          <div className="absolute bottom-0 left-0 w-full z-10">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full h-16 md:h-24" fill="#ffffff">
              <path d="M0,64 C480,128 960,0 1440,64 L1440,120 L0,120 Z" />
            </svg>
          </div>
        </section>
        
        {/* Featured Posts Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between mb-12">
              <h2 className="text-3xl font-bold">Featured Articles</h2>
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                <Link href="/blog/category/revops" className="text-primary hover:underline">
                  RevOps
                </Link>
                <Link href="/blog/category/salesforce" className="text-primary hover:underline">
                  Salesforce
                </Link>
                <Link href="/blog/category/analytics" className="text-primary hover:underline">
                  Analytics
                </Link>
                <Link href="/blog/category/integrations" className="text-primary hover:underline">
                  Integrations
                </Link>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {featuredPosts.map((post, index) => (
                <div 
                  key={post.slug} 
                  className={`rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 transform hover:-translate-y-2 ${
                    index === 0 ? 'md:col-span-2 md:row-span-2' : ''
                  }`}
                >
                  <Link href={`/blog/${post.slug}`} className="block relative">
                    <div className={`relative ${index === 0 ? 'h-80' : 'h-60'}`}>
                      <ImageOptimizer
                        src={post.coverImage || '/images/blog/default-cover.jpg'}
                        alt={post.title}
                        fill
                        sizes={index === 0 ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'}
                        className="object-cover"
                        priority={index === 0}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent"></div>
                      
                      {/* Category badge */}
                      <div className="absolute top-4 left-4 px-3 py-1 bg-primary/90 text-white text-xs font-medium rounded-full">
                        {post.category.name}
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className={`font-bold mb-3 hover:text-primary transition-colors ${
                        index === 0 ? 'text-2xl' : 'text-xl'
                      }`}>
                        {post.title}
                      </h3>
                      
                      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                          <ImageOptimizer
                            src={post.author.avatar || '/images/authors/default-avatar.jpg'}
                            alt={post.author.name}
                            width={32}
                            height={32}
                            className="object-cover"
                          />
                        </div>
                        <span>{post.author.name}</span>
                        <span className="mx-2">•</span>
                        <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Main Blog Content Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-10">
              {/* Posts Grid */}
              <div className="lg:w-2/3">
                {/* Category/Tag title if filtered */}
                {(categoryFilter || tagFilter) && (
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">
                      {categoryFilter && categories.find(cat => cat.slug === categoryFilter)?.name}
                      {tagFilter && `Tag: ${tagFilter.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}`}
                    </h2>
                    <Link href="/blog" className="text-primary hover:underline flex items-center">
                      <i className="fas fa-arrow-left mr-2"></i>
                      Back to all posts
                    </Link>
                  </div>
                )}
                
                {currentPosts.length > 0 ? (
                  <>
                    <div className="grid md:grid-cols-2 gap-8">
                      {currentPosts.map((post) => (
                        <div 
                          key={post.slug}
                          className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 transform hover:-translate-y-2"
                        >
                          <Link href={`/blog/${post.slug}`} className="block">
                            <div className="relative h-48">
                              <ImageOptimizer
                                src={post.coverImage || '/images/blog/default-cover.jpg'}
                                alt={post.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover"
                              />
                              
                              {/* Category badge */}
                              <div className="absolute top-4 left-4 px-3 py-1 bg-primary/90 text-white text-xs font-medium rounded-full">
                                {post.category.name}
                              </div>
                            </div>
                            
                            <div className="p-6">
                              <h3 className="text-xl font-bold mb-3 hover:text-primary transition-colors line-clamp-2">
                                {post.title}
                              </h3>
                              
                              <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                                {post.excerpt}
                              </p>
                              
                              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                                <span className="mx-2">•</span>
                                <span>{Math.max(1, Math.ceil(post.content.split(/\s+/).length / 200))} min read</span>
                              </div>
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
                    
                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="mt-12 flex justify-center">
                        <nav className="inline-flex items-center space-x-2">
                          {/* Previous button */}
                          <Link
                            href={{
                              pathname: '/blog',
                              query: {
                                ...(categoryFilter && { category: categoryFilter }),
                                ...(tagFilter && { tag: tagFilter }),
                                ...(currentPage > 1 && { page: currentPage - 1 }),
                              },
                            }}
                            className={`p-2 rounded-md border ${
                              currentPage === 1
                                ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                                : 'border-gray-200 hover:border-primary text-gray-700 dark:text-gray-300 hover:text-primary'
                            }`}
                            aria-disabled={currentPage === 1}
                            tabIndex={currentPage === 1 ? -1 : 0}
                          >
                            <i className="fas fa-chevron-left"></i>
                          </Link>
                          
                          {/* Page numbers */}
                          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <Link
                              key={page}
                              href={{
                                pathname: '/blog',
                                query: {
                                  ...(categoryFilter && { category: categoryFilter }),
                                  ...(tagFilter && { tag: tagFilter }),
                                  ...(page > 1 && { page }),
                                },
                              }}
                              className={`px-4 py-2 rounded-md ${
                                currentPage === page
                                  ? 'bg-primary text-white'
                                  : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                              }`}
                              aria-current={currentPage === page ? 'page' : undefined}
                            >
                              {page}
                            </Link>
                          ))}
                          
                          {/* Next button */}
                          <Link
                            href={{
                              pathname: '/blog',
                              query: {
                                ...(categoryFilter && { category: categoryFilter }),
                                ...(tagFilter && { tag: tagFilter }),
                                ...(currentPage < totalPages && { page: currentPage + 1 }),
                              },
                            }}
                            className={`p-2 rounded-md border ${
                              currentPage === totalPages
                                ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                                : 'border-gray-200 hover:border-primary text-gray-700 dark:text-gray-300 hover:text-primary'
                            }`}
                            aria-disabled={currentPage === totalPages}
                            tabIndex={currentPage === totalPages ? -1 : 0}
                          >
                            <i className="fas fa-chevron-right"></i>
                          </Link>
                        </nav>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl">
                    <div className="text-6xl mb-4">😢</div>
                    <h3 className="text-2xl font-bold mb-2">No Posts Found</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      We couldn't find any blog posts matching your criteria.
                    </p>
                    <Link
                      href="/blog"
                      className="btn inline-flex items-center px-6 py-3 bg-primary text-white rounded-full"
                    >
                      <i className="fas fa-arrow-left mr-2"></i>
                      Back to All Posts
                    </Link>
                  </div>
                )}
              </div>
              
              {/* Sidebar */}
              <aside className="lg:w-1/3">
                {/* Categories */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-8 shadow-md">
                  <h3 className="text-xl font-bold mb-4">Categories</h3>
                  <ul className="space-y-3">
                    {categories.map((category) => (
                      <li key={category.slug}>
                        <Link
                          href={`/blog?category=${category.slug}`}
                          className={`flex items-center justify-between text-gray-700 dark:text-gray-300 hover:text-primary ${
                            categoryFilter === category.slug ? 'text-primary font-medium' : ''
                          }`}
                        >
                          <span>{category.name}</span>
                          <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full text-xs">
                            {category.count}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Popular Tags */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-8 shadow-md">
                  <h3 className="text-xl font-bold mb-4">Popular Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Link
                        key={tag.slug}
                        href={`/blog?tag=${tag.slug}`}
                        className={`px-3 py-1 rounded-full text-sm ${
                          tagFilter === tag.slug
                            ? 'bg-primary text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-primary hover:text-white'
                        } transition-colors`}
                      >
                        {tag.name}
                      </Link>
                    ))}
                  </div>
                </div>
                
                {/* Newsletter Signup */}
                <div className="bg-gradient-to-br from-primary to-primary-light text-white rounded-xl p-6 shadow-md">
                  <h3 className="text-xl font-bold mb-2">Subscribe to Our Newsletter</h3>
                  <p className="mb-4 text-white/90">Get the latest RevOps insights delivered to your inbox</p>
                  <form className="space-y-3">
                    <div>
                      <input
                        type="email"
                        placeholder="Your email address"
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-white text-primary hover:bg-gray-100 py-3 rounded-lg font-medium transition-colors"
                    >
                      Subscribe
                    </button>
                  </form>
                  <p className="text-xs mt-3 text-white/70">
                    We respect your privacy. Unsubscribe at any time.
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary to-primary-light text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Revenue Operations?</h2>
            <p className="text-lg mb-8 max-w-3xl mx-auto">
              Schedule a free consultation to discuss how our RevOps services can help your business grow.
            </p>
            <Link
              href="/contact"
              className="btn relative overflow-hidden group bg-white text-primary hover:bg-gray-100 py-4 px-8 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:translate-y-[-2px]"
            >
              <span className="relative z-10 flex items-center">
                <span>Schedule Free Consultation</span>
                <i className="fas fa-arrow-right ml-2 transition-transform group-hover:translate-x-1"></i>
              </span>
              <span className="absolute w-0 h-full bg-gray-100 left-0 top-0 transition-all duration-300 group-hover:w-full -z-0"></span>
            </Link>
          </div>
        </section>
      </PerformanceLayout>
    </>
  );
}