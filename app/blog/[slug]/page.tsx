import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import Script from 'next/script';
import { Suspense } from 'react';
import { ImageOptimizer } from '@/components/ImageOptimizer';
import PerformanceLayout from '@/components/PerformanceLayout';
import { getBlogPostBySlug, getAllBlogPosts, getRelatedPosts } from '@/lib/blog';
import { formatDate } from '@/lib/utils';
import BlogHeader from '../BlogHeader';

export const dynamicParams = true; // Allow dynamic routes not in generateStaticParams

// Generate static params for all blog posts at build time
export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for each blog post
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found | Revelate Operations Blog',
      description: 'The blog post you are looking for does not exist.',
    };
  }
  
  return {
    title: `${post.title} | Revelate Operations Blog`,
    description: post.excerpt,
    keywords: post.tags?.join(', '),
    authors: [{ name: post.author.name, url: `/blog/author/${post.author.slug}` }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://revelateops.com/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      authors: [post.author.name],
      images: [
        {
          url: post.coverImage || '/images/blog/default-cover.jpg',
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage || '/images/blog/default-cover.jpg'],
    },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPostBySlug(params.slug);
  
  // If post not found, redirect to 404
  if (!post) {
    notFound();
  }
  
  // Get related posts
  const relatedPosts = getRelatedPosts(post.slug, 3);
  
  // Format the published date
  const formattedDate = formatDate(post.publishedAt);
  
  // Calculate reading time
  const readingTime = Math.max(1, Math.ceil(post.content.split(/\s+/).length / 200));
  
  return (
    <>
      {/* Add JSON-LD structured data for SEO */}
      <Script
        id="blog-post-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.excerpt,
            image: post.coverImage || '/images/blog/default-cover.jpg',
            datePublished: post.publishedAt,
            dateModified: post.updatedAt || post.publishedAt,
            author: {
              '@type': 'Person',
              name: post.author.name,
              url: `https://revelateops.com/blog/author/${post.author.slug}`,
            },
            publisher: {
              '@type': 'Organization',
              name: 'Revelate Operations',
              logo: {
                '@type': 'ImageObject',
                url: 'https://revelateops.com/images/logo.png',
              },
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `https://revelateops.com/blog/${post.slug}`,
            },
          }),
        }}
        strategy="afterInteractive"
      />
      
      <PerformanceLayout
        enableWebVitals={true}
        enableMobileOptimization={true}
        primeCache={true}
        optimizeImages={true}
        pageName={`blog-post-${post.slug}`}
      >
        {/* New Blog Hero */}
        <BlogHeader
          title={post.title}
          description={post.excerpt}
          coverImage={post.coverImage || '/images/blog/default-cover.jpg'}
          author={{
            name: post.author.name,
            avatar: post.author.avatar || '/images/authors/default-avatar.jpg',
            role: post.author.bio
          }}
          date={formattedDate}
          readTime={`${readingTime} min read`}
          categories={post.tags}
        />
        
        {/* Main Content Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-10">
              {/* Article Content */}
              <article className="lg:w-2/3">
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
                </div>
                
                {/* Tags Section */}
                {post.tags && post.tags.length > 0 && (
                  <div className="mt-10">
                    <h3 className="text-lg font-semibold mb-3">Tags:</h3>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Link
                          key={tag}
                          href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm hover:bg-primary hover:text-white transition-colors"
                        >
                          {tag}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Author Section */}
                <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                    <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
                      <ImageOptimizer
                        src={post.author.avatar || '/images/authors/default-avatar.jpg'}
                        alt={post.author.name}
                        width={96}
                        height={96}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{post.author.name}</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">{post.author.bio}</p>
                      <div className="flex space-x-3">
                        {post.author.twitter && (
                          <a
                            href={`https://twitter.com/${post.author.twitter}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-primary"
                            aria-label={`${post.author.name} on Twitter`}
                          >
                            <i className="fab fa-twitter"></i>
                          </a>
                        )}
                        {post.author.linkedin && (
                          <a
                            href={post.author.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-primary"
                            aria-label={`${post.author.name} on LinkedIn`}
                          >
                            <i className="fab fa-linkedin"></i>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Share Section */}
                <div className="mt-10">
                  <h3 className="text-lg font-semibold mb-3">Share this article:</h3>
                  <div className="flex space-x-4">
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://revelateops.com/blog/${post.slug}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-primary hover:text-white transition-colors"
                      aria-label="Share on Twitter"
                    >
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a
                      href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`https://revelateops.com/blog/${post.slug}`)}&title=${encodeURIComponent(post.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-primary hover:text-white transition-colors"
                      aria-label="Share on LinkedIn"
                    >
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://revelateops.com/blog/${post.slug}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-primary hover:text-white transition-colors"
                      aria-label="Share on Facebook"
                    >
                      <i className="fab fa-facebook-f"></i>
                    </a>
                  </div>
                </div>
              </article>
              
              {/* Sidebar */}
              <aside className="lg:w-1/3">
                {/* Related Posts */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 mb-8">
                  <h3 className="text-xl font-bold mb-4">Related Articles</h3>
                  <div className="space-y-6">
                    {relatedPosts.length > 0 ? (
                      relatedPosts.map((relatedPost) => (
                        <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`} className="flex items-start group">
                          <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 mr-4">
                            <ImageOptimizer
                              src={relatedPost.coverImage || '/images/blog/default-cover.jpg'}
                              alt={relatedPost.title}
                              width={80}
                              height={80}
                              className="object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                          </div>
                          <div>
                            <h4 className="font-medium mb-1 group-hover:text-primary transition-colors line-clamp-2">
                              {relatedPost.title}
                            </h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {formatDate(relatedPost.publishedAt)}
                            </p>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400">No related posts found.</p>
                    )}
                  </div>
                </div>
                
                {/* Categories */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 mb-8">
                  <h3 className="text-xl font-bold mb-4">Categories</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link
                        href="/blog/category/revops"
                        className="flex items-center justify-between text-gray-700 dark:text-gray-300 hover:text-primary"
                      >
                        <span>RevOps</span>
                        <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full text-xs">12</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/blog/category/salesforce"
                        className="flex items-center justify-between text-gray-700 dark:text-gray-300 hover:text-primary"
                      >
                        <span>Salesforce</span>
                        <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full text-xs">8</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/blog/category/analytics"
                        className="flex items-center justify-between text-gray-700 dark:text-gray-300 hover:text-primary"
                      >
                        <span>Analytics</span>
                        <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full text-xs">6</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/blog/category/integrations"
                        className="flex items-center justify-between text-gray-700 dark:text-gray-300 hover:text-primary"
                      >
                        <span>Integrations</span>
                        <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full text-xs">4</span>
                      </Link>
                    </li>
                  </ul>
                </div>
                
                {/* Newsletter Signup */}
                <div className="bg-gradient-to-br from-primary to-primary-light text-white rounded-xl p-6">
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
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Revenue Operations?</h2>
            <p className="text-lg max-w-3xl mx-auto mb-8 text-gray-600 dark:text-gray-300">
              Schedule a free consultation to discuss how our RevOps services can help your business grow.
            </p>
            <Link
              href="/contact"
              className="btn relative overflow-hidden group bg-primary text-white hover:bg-primary-dark py-4 px-8 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:translate-y-[-2px]"
            >
              <span className="relative z-10 flex items-center">
                <span>Book a Free Consultation</span>
                <i className="fas fa-arrow-right ml-2 transition-transform group-hover:translate-x-1"></i>
              </span>
              <span className="absolute w-0 h-full bg-primary-dark left-0 top-0 transition-all duration-300 group-hover:w-full -z-0"></span>
            </Link>
          </div>
        </section>
      </PerformanceLayout>
    </>
  );
}