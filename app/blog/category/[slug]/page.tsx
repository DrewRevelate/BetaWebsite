import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Suspense } from 'react';
import PerformanceLayout from '@/components/PerformanceLayout';
import { ImageOptimizer } from '@/components/ImageOptimizer';
import { getAllCategories, getPostsByCategory, getAllTags } from '@/lib/blog';
import { formatDate } from '@/lib/utils';

// Generate static params for all categories
export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

// Generate metadata for each category page
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const categories = getAllCategories();
  const category = categories.find((c) => c.slug === params.slug);
  
  if (!category) {
    return {
      title: 'Category Not Found | Revelate Operations Blog',
      description: 'The blog category you are looking for does not exist.',
    };
  }
  
  return {
    title: `${category.name} | Revelate Operations Blog`,
    description: category.description || `Explore our articles about ${category.name} and learn how to improve your revenue operations.`,
    keywords: [`${category.name.toLowerCase()} blog`, 'revenue operations', 'revops articles', 'business intelligence'],
    openGraph: {
      title: `${category.name} Articles | Revelate Operations Blog`,
      description: category.description || `Explore our articles about ${category.name} and learn how to improve your revenue operations.`,
      url: `https://revelateops.com/blog/category/${category.slug}`,
      type: 'website',
      images: [
        {
          url: `/images/blog/categories/${category.slug}.jpg`,
          width: 1200,
          height: 630,
          alt: `${category.name} - Revelate Operations Blog`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${category.name} Articles | Revelate Operations Blog`,
      description: category.description || `Explore our articles about ${category.name} and learn how to improve your revenue operations.`,
      images: [`/images/blog/categories/${category.slug}.jpg`],
    },
  };
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const categories = getAllCategories();
  const category = categories.find((c) => c.slug === params.slug);
  
  // If category not found, return 404
  if (!category) {
    notFound();
  }
  
  // Get posts by category
  const posts = getPostsByCategory(params.slug);
  
  // Get all tags for sidebar
  const tags = getAllTags();
  
  return (
    <PerformanceLayout
      enableWebVitals={true}
      enableMobileOptimization={true}
      primeCache={true}
      optimizeImages={true}
      pageName={`blog-category-${params.slug}`}
    >
      {/* Category Header */}
      <section className="relative py-20 bg-gradient-to-br from-primary to-secondary text-white overflow-hidden">
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
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center space-x-2 mb-5 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
            <span className="text-sm font-medium tracking-wide uppercase">Blog Category</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {category.name}
          </h1>
          
          {category.description && (
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              {category.description}
            </p>
          )}
          
          <div className="flex justify-center space-x-4">
            <Link 
              href="/blog" 
              className="btn border border-white/70 text-white hover:bg-white/10 py-2 px-4 rounded-full"
            >
              <i className="fas fa-arrow-left mr-2"></i>
              All Articles
            </Link>
          </div>
        </div>
        
        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 w-full z-10">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full h-16 md:h-24" fill="#ffffff">
            <path d="M0,64 C480,128 960,0 1440,64 L1440,120 L0,120 Z" />
          </svg>
        </div>
      </section>
      
      {/* Posts Grid Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Posts Grid */}
            <div className="lg:w-2/3">
              {posts.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-8">
                  {posts.map((post) => (
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
                        </div>
                        
                        <div className="p-6">
                          <h3 className="text-xl font-bold mb-3 hover:text-primary transition-colors line-clamp-2">
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
              ) : (
                <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl">
                  <div className="text-6xl mb-4">😢</div>
                  <h3 className="text-2xl font-bold mb-2">No Posts Found</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    We couldn't find any blog posts in this category.
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
                  {categories.map((cat) => (
                    <li key={cat.slug}>
                      <Link
                        href={`/blog/category/${cat.slug}`}
                        className={`flex items-center justify-between text-gray-700 dark:text-gray-300 hover:text-primary ${
                          cat.slug === params.slug ? 'text-primary font-medium' : ''
                        }`}
                      >
                        <span>{cat.name}</span>
                        <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full text-xs">
                          {cat.count}
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
                      href={`/blog/tag/${tag.slug}`}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm hover:bg-primary hover:text-white transition-colors"
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
  );
}