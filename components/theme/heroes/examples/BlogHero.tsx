'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { CalendarDays, Clock, Tag, Share2, BookOpen } from 'lucide-react';
import HeroSystem from '../HeroSystem';

interface BlogHeroProps {
  title: string;
  description: string;
  coverImage: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  date: string;
  readTime: string;
  categories: string[];
}

export default function BlogHero({ 
  title, 
  description, 
  coverImage, 
  author, 
  date, 
  readTime, 
  categories 
}: BlogHeroProps) {
  // Format categories for metadata
  const formattedCategories = categories.map(category => category.trim()).join(', ');
  
  // Immersive blog post visual with artistic elements
  const BlogPostVisual = () => {
    return (
      <div className="relative w-full max-w-4xl mx-auto">
        {/* Main image with artistic frame */}
        <div className="relative rounded-2xl overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-gradient-to-br from-amber-200 to-amber-100 dark:from-amber-800 dark:to-amber-900 opacity-70 blur-xl"></div>
          <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-gradient-to-br from-emerald-200 to-emerald-100 dark:from-emerald-800 dark:to-emerald-900 opacity-70 blur-xl"></div>
          
          {/* Image container with artistic border */}
          <div className="relative z-10 p-2 bg-white dark:bg-slate-800 rounded-2xl shadow-xl">
            <div className="relative aspect-[16/9] overflow-hidden rounded-xl">
              <Image
                src={coverImage}
                alt={`Cover image for ${title}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                priority
              />
              
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
            </div>
            
            {/* Categories as floating pills */}
            <div className="absolute top-6 left-6 flex flex-wrap gap-2 z-20">
              {categories.map((category, index) => (
                <motion.span 
                  key={index} 
                  className="px-3 py-1.5 bg-white/90 dark:bg-slate-800/90 text-slate-900 dark:text-slate-100 text-xs font-medium rounded-full shadow-md backdrop-blur-sm"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                >
                  {category}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
        
        {/* Author card - artistic design */}
        <div className="absolute bottom-4 right-8 z-30">
          <motion.div 
            className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-xl overflow-hidden shadow-lg flex items-center gap-3 p-2 pl-1 border border-slate-100 dark:border-slate-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="relative w-12 h-12 rounded-xl overflow-hidden">
              <Image
                src={author.avatar}
                alt={author.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="pr-3">
              <div className="font-medium text-slate-900 dark:text-white text-sm">{author.name}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">{author.role}</div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  };
  
  // Post metadata with more visual interest
  const PostMetadata = () => {
    return (
      <div className="flex flex-wrap items-center justify-center gap-6 mt-6">
        <motion.div 
          className="flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-800/70 rounded-full shadow-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <CalendarDays size={16} className="text-amber-500 dark:text-amber-400" />
          <span className="text-sm text-slate-700 dark:text-slate-300">{date}</span>
        </motion.div>
        
        <motion.div 
          className="flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-800/70 rounded-full shadow-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Clock size={16} className="text-emerald-500 dark:text-emerald-400" />
          <span className="text-sm text-slate-700 dark:text-slate-300">{readTime}</span>
        </motion.div>
        
        <motion.div 
          className="flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-800/70 rounded-full shadow-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <BookOpen size={16} className="text-blue-500 dark:text-blue-400" />
          <span className="text-sm text-slate-700 dark:text-slate-300">Article</span>
        </motion.div>
      </div>
    );
  };
  
  // Social sharing with artistic elements
  const SocialSharing = () => {
    const platforms = [
      { name: 'Twitter', icon: <Share2 size={16} />, color: 'bg-[#1DA1F2]/10 text-[#1DA1F2]' },
      { name: 'LinkedIn', icon: <Share2 size={16} />, color: 'bg-[#0077B5]/10 text-[#0077B5]' },
      { name: 'Facebook', icon: <Share2 size={16} />, color: 'bg-[#4267B2]/10 text-[#4267B2]' }
    ];
    
    return (
      <div className="flex flex-col items-center mt-8">
        <span className="text-sm text-slate-500 dark:text-slate-400 mb-3">Share this article</span>
        <div className="flex gap-3">
          {platforms.map((platform, index) => (
            <motion.button 
              key={index}
              className={`p-3 rounded-full ${platform.color} hover:ring-2 hover:ring-offset-2 hover:ring-slate-200 dark:hover:ring-slate-700 transition-all`}
              aria-label={`Share on ${platform.name}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              whileHover={{ y: -3 }}
            >
              {platform.icon}
            </motion.button>
          ))}
        </div>
      </div>
    );
  };
  
  return (
    <HeroSystem 
      tagline="Blog"
      title={title}
      description={description}
      layout="stacked"
      theme="minimal"
      animation="fade"
      background="none"
      badge="minimal"
      pageContext="blog"
      purpose="information"
      visualComponent={<BlogPostVisual />}
      socialProof={<PostMetadata />}
      footerElements={<SocialSharing />}
      customMaxWidthClass="max-w-3xl"
      accessibilityLabels={{
        regionLabel: "Blog post introduction",
      }}
      className="bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 pt-8 pb-16"
    />
  );
}
