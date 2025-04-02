'use client';

import { ReactNode, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export interface BaseHeroProps {
  className?: string;
  tagline: string;
  taglineBadgeColor?: string;
  title: ReactNode;
  description: string;
  primaryCTA?: {
    text: string;
    href: string;
    onClick?: () => void;
  };
  secondaryCTA?: {
    text: string;
    href: string;
    onClick?: () => void;
  };
  socialProof?: ReactNode;
  backgroundPattern?: 'dots' | 'grid' | 'waves' | 'circles' | 'none';
  backgroundColorClass?: string;
  textColorClass?: string;
  dividerType?: 'wave' | 'angle' | 'curve' | 'none';
  children?: ReactNode;
  contentAlignment?: 'left' | 'center' | 'right';
  maxWidth?: string;
}

export default function BaseHero({
  className = '',
  tagline,
  taglineBadgeColor = 'bg-primary/10 border-primary/20',
  title,
  description,
  primaryCTA,
  secondaryCTA,
  socialProof,
  backgroundPattern = 'dots',
  backgroundColorClass = 'bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 dark:from-gray-900 dark:via-gray-850 dark:to-gray-900',
  textColorClass = 'text-gray-900 dark:text-white',
  dividerType = 'none',
  children,
  contentAlignment = 'left',
  maxWidth = 'max-w-[550px]'
}: BaseHeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {
    once: true,
    amount: 0.1
  });
  
  // Animation variants
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 } 
    }
  };
  
  const fadeInDelayedVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        delay: 0.1 * i
      } 
    })
  };
  
  // Get alignment class
  const getAlignmentClass = () => {
    switch (contentAlignment) {
      case 'center': return 'text-center items-center';
      case 'right': return 'text-right items-end';
      default: return 'text-left items-start';
    }
  };
  
  // Background pattern component
  const BackgroundPattern = () => {
    switch (backgroundPattern) {
      case 'dots':
        return (
          <div className="absolute inset-0 opacity-10" aria-hidden="true">
            <div className="absolute w-full h-full" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
          </div>
        );
      case 'grid':
        return (
          <div className="absolute inset-0 opacity-10" aria-hidden="true">
            <div className="absolute w-full h-full" style={{ backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
          </div>
        );
      case 'waves':
        return (
          <div className="absolute inset-0 opacity-5" aria-hidden="true">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" fill="currentColor"></path>
            </svg>
          </div>
        );
      case 'circles':
        return (
          <div className="absolute inset-0 overflow-hidden opacity-10" aria-hidden="true">
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full border-8 border-current"></div>
            <div className="absolute top-1/3 -left-12 w-40 h-40 rounded-full border-4 border-current"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full border-2 border-current"></div>
          </div>
        );
      default:
        return null;
    }
  };
  
  // Divider component
  const Divider = () => {
    switch (dividerType) {
      case 'wave':
        return (
          <div className="absolute bottom-0 left-0 w-full overflow-hidden" style={{ zIndex: 1 }}>
            <svg className="w-full h-16 md:h-24" preserveAspectRatio="none" viewBox="0 0 1440 100" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,50 C200,100 400,0 600,50 C800,100 1000,0 1200,50 C1300,75 1440,60 1440,60 L1440,100 L0,100 Z" className="fill-white dark:fill-gray-900"></path>
            </svg>
          </div>
        );
      case 'angle':
        return (
          <div className="absolute bottom-0 left-0 w-full" style={{ zIndex: 1 }}>
            <svg className="w-full h-12 md:h-24" preserveAspectRatio="none" viewBox="0 0 1440 100" fill="white" xmlns="http://www.w3.org/2000/svg">
              <polygon points="0,100 0,0 1440,100" className="fill-white dark:fill-gray-900"></polygon>
            </svg>
          </div>
        );
      case 'curve':
        return (
          <div className="absolute bottom-0 left-0 w-full" style={{ zIndex: 1 }}>
            <svg className="w-full h-16 md:h-24" preserveAspectRatio="none" viewBox="0 0 1440 100" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,100 C600,50 1200,100 1440,80 L1440,100 L0,100 Z" className="fill-white dark:fill-gray-900"></path>
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section
      ref={ref} 
      className={`relative overflow-hidden py-16 md:py-24 lg:py-28 ${backgroundColorClass} ${textColorClass} ${className}`}
    >
      {/* Background elements */}
      <BackgroundPattern />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-16">
          {/* Content Column */}
          <motion.div 
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className={`flex flex-col gap-6 md:w-1/2 ${getAlignmentClass()}`}
          >
            {/* Badge */}
            <motion.div 
              variants={fadeInUpVariants}
              className={`inline-flex items-center space-x-2 px-4 py-2 ${taglineBadgeColor} backdrop-blur-sm rounded-full border self-start`}
            >
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold tracking-wider text-gray-700 dark:text-gray-200 uppercase">
                {tagline}
              </span>
            </motion.div>
            
            {/* Headline */}
            <motion.h1 
              variants={fadeInUpVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
            >
              {title}
            </motion.h1>

            {/* Description */}
            <motion.p 
              variants={fadeInUpVariants}
              className={`text-xl text-gray-600 dark:text-gray-300 mb-6 ${maxWidth}`}
            >
              {description}
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div 
              variants={fadeInUpVariants}
              className="flex flex-wrap gap-4 mt-2"
            >
              {primaryCTA && (
                <Link 
                  href={primaryCTA.href} 
                  className="group relative overflow-hidden px-6 py-3 bg-primary text-white font-semibold rounded-full shadow-lg transition transform hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  onClick={primaryCTA.onClick}
                  prefetch={true}
                >
                  <span className="relative z-10 flex items-center">
                    {primaryCTA.text}
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 ml-2 transform transition duration-300 group-hover:translate-x-1" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-primary-dark to-primary z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </Link>
              )}
              
              {secondaryCTA && (
                <Link 
                  href={secondaryCTA.href} 
                  className="group relative overflow-hidden px-6 py-3 border-2 border-primary text-primary dark:text-primary-light font-semibold rounded-full transition transform hover:-translate-y-1 hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  onClick={secondaryCTA.onClick}
                  prefetch={true}
                >
                  <span className="relative z-10 group-hover:text-white transition-colors duration-300">{secondaryCTA.text}</span>
                </Link>
              )}
            </motion.div>
            
            {/* Social proof or additional content */}
            {socialProof && (
              <motion.div
                variants={fadeInUpVariants}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-6"
              >
                {socialProof}
              </motion.div>
            )}
          </motion.div>
          
          {/* Visual/Right Column */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="md:w-1/2 flex justify-center items-center"
          >
            {children}
          </motion.div>
        </div>
      </div>
      
      {/* Divider */}
      <Divider />
    </section>
  );
}
