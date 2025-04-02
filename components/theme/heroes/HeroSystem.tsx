'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import { motion, useInView, AnimatePresence, MotionProps } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

// Type definitions for hero variants and styles
export type HeroLayout = 'split' | 'centered' | 'asymmetric' | 'stacked' | 'overlay';
export type HeroTheme = 'primary' | 'secondary' | 'accent' | 'neutral' | 'gradient' | 'minimal' | 'brand' | 'dark' | 'custom';
export type AnimationStyle = 'fade' | 'slide' | 'zoom' | 'reveal' | 'sequential' | 'minimal' | 'none';
export type DividerStyle = 'wave' | 'angle' | 'curve' | 'slope' | 'zigzag' | 'bubbles' | 'none';
export type TagBadgeStyle = 'pill' | 'rectangle' | 'underline' | 'accent' | 'floating' | 'minimal' | 'none';
export type BackgroundStyle = 'dots' | 'grid' | 'waves' | 'geometric' | 'blur' | 'particles' | 'gradient' | 'none';
export type PageContext = 'home' | 'product' | 'service' | 'about' | 'blog' | 'contact' | 'generic';

// Metric type definition for displaying stats
export interface Metric {
  label: string;
  value: string | number;
  prefix?: string;
  suffix?: string;
  color?: 'primary' | 'secondary' | 'accent' | 'success' | 'info' | 'warning';
  icon?: ReactNode;
}

// CTA button type
export interface CTAButton {
  text: string;
  href: string;
  onClick?: () => void;
  icon?: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'text' | 'accent' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
}

// Main props interface
export interface HeroSystemProps {
  // Essential content
  tagline: string;
  title: ReactNode;
  description: string;
  visualComponent?: ReactNode;
  
  // Call to actions
  primaryCTA?: CTAButton;
  secondaryCTA?: CTAButton;
  
  // Layout and theming
  layout?: HeroLayout;
  theme?: HeroTheme;
  animation?: AnimationStyle;
  divider?: DividerStyle;
  badge?: TagBadgeStyle;
  background?: BackgroundStyle;
  
  // Context and purpose
  pageContext?: PageContext;
  purpose?: 'conversion' | 'information' | 'navigation' | 'branding' | 'announcement';
  
  // Additional content
  metrics?: Metric[];
  socialProof?: ReactNode;
  headerElements?: ReactNode;
  footerElements?: ReactNode;
  additionalContent?: ReactNode; // Add this line for custom content
  backgroundVideo?: {
    src: string;
    poster?: string;
    muted?: boolean;
    loop?: boolean;
    overlay?: boolean;
  };
  
  // Custom styling overrides
  customBackgroundClass?: string;
  customTextColorClass?: string;
  customMaxWidthClass?: string;
  className?: string;
  
  // Performance and accessibility options
  reducedMotion?: boolean;
  highPerformance?: boolean;
  accessibilityLabels?: {
    regionLabel?: string;
    ctaAriaLabel?: string;
    backgroundVideoAriaLabel?: string;
  };
}

export default function HeroSystem({
  // Essential content with defaults
  tagline,
  title,
  description,
  visualComponent,
  
  // CTAs
  primaryCTA,
  secondaryCTA,
  
  // Layout and theming with defaults
  layout = 'split',
  theme = 'primary',
  animation = 'fade',
  divider = 'none',
  badge = 'pill',
  background = 'none',
  
  // Context and purpose
  pageContext = 'generic',
  purpose = 'information',
  
  // Additional content
  metrics = [],
  socialProof,
  headerElements,
  footerElements,
  backgroundVideo,
  additionalContent,
  
  // Custom styling overrides
  customBackgroundClass,
  customTextColorClass,
  customMaxWidthClass = 'max-w-[550px]',
  className = '',
  
  // Performance and accessibility options
  reducedMotion = false,
  highPerformance = false,
  accessibilityLabels = {},
}: HeroSystemProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const inView = useInView(heroRef, {
    once: true,
    amount: 0.1
  });

  // Check for user's motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(reducedMotion);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches || reducedMotion);
      
      const handleChange = () => setPrefersReducedMotion(mediaQuery.matches || reducedMotion);
      mediaQuery.addEventListener('change', handleChange);
      
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [reducedMotion]);
  
  // Adjust animation based on performance settings and motion preferences
  const effectiveAnimation = prefersReducedMotion ? 'minimal' : highPerformance ? 'fade' : animation;
  
  // Context-aware default settings
  useEffect(() => {
    // Automatically adjust settings based on context if not explicitly set
    // This allows for opinionated defaults while still allowing prop overrides
  }, [pageContext, purpose]);
  
  // Theme-based styling with enhanced brand-specific themes
  const getThemeClasses = () => {
    switch (theme) {
      case 'primary':
        return {
          background: customBackgroundClass || 'bg-gradient-to-br from-primary-light/10 via-primary/20 to-primary-dark/10 dark:from-primary-dark/20 dark:via-primary/30 dark:to-primary-light/20',
          text: customTextColorClass || 'text-gray-900 dark:text-white',
          badge: 'bg-primary/10 border-primary/20 dark:bg-primary/20 dark:border-primary/30',
          indicator: 'bg-primary',
          buttonHighlight: 'from-primary-dark to-primary'
        };
      case 'secondary':
        return {
          background: customBackgroundClass || 'bg-gradient-to-br from-secondary-light/10 via-secondary/20 to-secondary-dark/10 dark:from-secondary-dark/20 dark:via-secondary/30 dark:to-secondary-light/20',
          text: customTextColorClass || 'text-gray-900 dark:text-white',
          badge: 'bg-secondary/10 border-secondary/20 dark:bg-secondary/20 dark:border-secondary/30',
          indicator: 'bg-secondary',
          buttonHighlight: 'from-secondary-dark to-secondary'
        };
      case 'accent':
        return {
          background: customBackgroundClass || 'bg-gradient-to-br from-accent/5 via-accent/10 to-accent/5 dark:from-accent/10 dark:via-accent/20 dark:to-accent/10',
          text: customTextColorClass || 'text-gray-900 dark:text-white',
          badge: 'bg-accent/10 border-accent/20 dark:bg-accent/20 dark:border-accent/30',
          indicator: 'bg-accent',
          buttonHighlight: 'from-accent-dark to-accent'
        };
      case 'neutral':
        return {
          background: customBackgroundClass || 'bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900',
          text: customTextColorClass || 'text-gray-900 dark:text-white',
          badge: 'bg-gray-200/60 border-gray-300/60 dark:bg-gray-700/60 dark:border-gray-600/60',
          indicator: 'bg-gray-500 dark:bg-gray-400',
          buttonHighlight: 'from-gray-700 to-gray-600 dark:from-gray-600 dark:to-gray-700'
        };
      case 'gradient':
        return {
          background: customBackgroundClass || 'bg-gradient-to-br from-primary-light/20 via-secondary/20 to-accent/20 dark:from-primary/30 dark:via-secondary/30 dark:to-accent/30 animate-gradient',
          text: customTextColorClass || 'text-gray-900 dark:text-white',
          badge: 'bg-white/20 backdrop-blur-sm border-white/30 dark:bg-white/10 dark:border-white/20',
          indicator: 'bg-white',
          buttonHighlight: 'from-primary to-secondary'
        };
      case 'minimal':
        return {
          background: customBackgroundClass || 'bg-white dark:bg-gray-950',
          text: customTextColorClass || 'text-gray-900 dark:text-white',
          badge: 'bg-gray-100 border-gray-200 dark:bg-gray-800 dark:border-gray-700',
          indicator: 'bg-primary',
          buttonHighlight: 'from-gray-900 to-gray-800 dark:from-white dark:to-gray-200'
        };
      case 'brand':
        return {
          background: customBackgroundClass || 'bg-gradient-to-br from-primary-light/5 to-secondary/10 dark:from-primary/10 dark:to-secondary/20',
          text: customTextColorClass || 'text-gray-900 dark:text-white',
          badge: 'bg-primary/10 border-primary/20 dark:bg-primary/20 dark:border-primary/30',
          indicator: 'bg-primary',
          buttonHighlight: 'from-primary to-secondary'
        };
      case 'dark':
        return {
          background: customBackgroundClass || 'bg-[#141927]',
          text: customTextColorClass || 'text-white',
          badge: 'bg-blue-600/20 border-blue-600/30',
          indicator: 'bg-blue-500',
          buttonHighlight: 'from-blue-600 to-blue-500'
        };
      case 'custom':
        return {
          background: customBackgroundClass || 'bg-white dark:bg-gray-900',
          text: customTextColorClass || 'text-gray-900 dark:text-white',
          badge: 'bg-primary/10 border-primary/20',
          indicator: 'bg-primary',
          buttonHighlight: 'from-primary-dark to-primary'
        };
      default:
        return {
          background: customBackgroundClass || 'bg-white dark:bg-gray-900',
          text: customTextColorClass || 'text-gray-900 dark:text-white',
          badge: 'bg-primary/10 border-primary/20',
          indicator: 'bg-primary',
          buttonHighlight: 'from-primary-dark to-primary'
        };
    }
  };
  
  const themeClasses = getThemeClasses();
  
  // Enhanced animation variants with more sophisticated options
  const getAnimationVariants = () => {
    // Use reduced variants for performance mode or reduced motion
    if (prefersReducedMotion || highPerformance) {
      return {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.4 } }
      };
    }
    
    switch (effectiveAnimation) {
      case 'fade':
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
        };
      case 'slide':
        return {
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
        };
      case 'zoom':
        return {
          hidden: { opacity: 0, scale: 0.95 },
          visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
        };
      case 'reveal':
        return {
          hidden: { opacity: 0, y: 20, clipPath: 'inset(0 0 100% 0)' },
          visible: { 
            opacity: 1, 
            y: 0, 
            clipPath: 'inset(0 0 0% 0)', 
            transition: { 
              duration: 0.9, 
              ease: [0.25, 1, 0.5, 1],
              clipPath: { duration: 0.8, ease: [0.25, 1, 0.5, 1] },
            } 
          }
        };
      case 'sequential':
        return {
          hidden: { opacity: 0, y: 30 },
          visible: { 
            opacity: 1, 
            y: 0, 
            transition: { 
              duration: 0.8, 
              ease: [0.22, 1, 0.36, 1],
            } 
          }
        };
      case 'minimal':
        return {
          hidden: { opacity: 0, y: 10 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
        };
      case 'none':
        return {
          hidden: { opacity: 1 },
          visible: { opacity: 1 }
        };
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.6 } }
        };
    }
  };
  
  // Staggered animation for children with enhanced settings
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: effectiveAnimation === 'sequential' ? 0.15 : 0.08,
        delayChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };
  
  const childVariants = getAnimationVariants();
  
  // Utility function to prevent text from breaking into two lines
  const preventTextBreak = (text: string | React.ReactNode): React.ReactNode => {
    if (typeof text !== 'string') return text;
    
    // Find common terms that shouldn't break and wrap them in non-breaking spans
    const terms = ['customer retention', 'data integration', 'business intelligence', 
                   'revenue growth', 'data strategy', 'data analytics', 'data pipeline',
                   'data warehouse', 'data lake', 'machine learning'];
    
    let processedText = text;
    terms.forEach(term => {
      if (text.toLowerCase().includes(term.toLowerCase())) {
        const regex = new RegExp(`(${term})`, 'gi');
        processedText = processedText.replace(regex, '<span class="whitespace-nowrap">$1</span>');
      }
    });
    
    // If no replacements were made, return the original text
    if (processedText === text) return text;
    
    // Otherwise, return the processed text as HTML
    return <span dangerouslySetInnerHTML={{ __html: processedText }} />;
  };

  // Layout classes based on layout type with enhanced options
  const getLayoutClasses = () => {
    switch (layout) {
      case 'centered':
        return {
          container: 'text-center flex flex-col items-center',
          grid: 'grid-cols-1',
          content: 'max-w-3xl mx-auto text-center items-center',
          visual: 'mt-8 mx-auto max-w-3xl',
          metrics: 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-8 justify-center',
          contentPadding: 'px-4 md:px-8'
        };
      case 'asymmetric':
        return {
          container: 'items-start',
          grid: 'grid-cols-1 lg:grid-cols-5',
          content: 'col-span-1 lg:col-span-2 pr-0 lg:pr-12',
          visual: 'col-span-1 lg:col-span-3 mt-8 lg:mt-0',
          metrics: 'grid grid-cols-2 gap-4 mt-6',
          contentPadding: 'px-4 md:px-6'
        };
      case 'stacked':
        return {
          container: '',
          grid: 'grid-cols-1',
          content: 'max-w-4xl',
          visual: 'mt-12 max-w-5xl mx-auto',
          metrics: 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-8',
          contentPadding: 'px-4 md:px-6'
        };
      case 'overlay':
        return {
          container: 'relative',
          grid: 'grid-cols-1',
          content: 'relative z-10 max-w-2xl',
          visual: 'absolute inset-0 -z-10',
          metrics: 'grid grid-cols-2 gap-4 mt-6',
          contentPadding: 'px-4 md:px-8 py-12 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl'
        };
      case 'split':
      default:
        return {
          container: '',
          grid: 'grid-cols-1 lg:grid-cols-2',
          content: 'pr-0 lg:pr-8',
          visual: 'mt-8 lg:mt-0',
          metrics: 'grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6',
          contentPadding: 'px-0'
        };
    }
  };
  
  const layoutClasses = getLayoutClasses();
  
  // Badge style based on badge type
  const getBadgeClasses = () => {
    const baseClasses = `inline-flex items-center ${themeClasses.badge}`;
    
    switch (badge) {
      case 'pill':
        return `${baseClasses} px-4 py-2 rounded-full border`;
      case 'rectangle':
        return `${baseClasses} px-3 py-1.5 rounded-md border`;
      case 'underline':
        return `${baseClasses} px-0 py-1 border-b-2 border-t-0 border-x-0`;
      case 'accent':
        return `${baseClasses} px-3 py-1.5 rounded-md bg-primary/90 dark:bg-primary/80 text-white border-0`;
      case 'floating':
        return `${baseClasses} px-4 py-2 rounded-full border shadow-sm hover:shadow-md transition-shadow duration-300`;
      case 'minimal':
        return `${baseClasses} px-0 py-0 border-0`;
      case 'none':
        return 'hidden';
      default:
        return `${baseClasses} px-4 py-2 rounded-full border`;
    }
  };
  
  // Enhanced background pattern component
  const BackgroundPattern = () => {
    switch (background) {
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
      case 'geometric':
        return (
          <div className="absolute inset-0 opacity-10 overflow-hidden" aria-hidden="true">
            <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-current opacity-5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-1/2 h-1/2 bg-current opacity-5 rounded-full blur-3xl"></div>
            <div className="absolute top-1/4 right-0 w-48 h-48 bg-current opacity-10 rounded-lg rotate-12 blur-2xl"></div>
            <div className="absolute bottom-1/4 left-0 w-48 h-48 bg-current opacity-10 rounded-lg -rotate-12 blur-2xl"></div>
          </div>
        );
      case 'blur':
        return (
          <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className="absolute -top-20 -left-20 w-72 h-72 bg-primary/10 dark:bg-primary/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-secondary/10 dark:bg-secondary/20 rounded-full blur-3xl"></div>
            <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-accent/10 dark:bg-accent/20 rounded-full blur-2xl"></div>
          </div>
        );
      case 'particles':
        return (
          <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className="absolute inset-0">
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div 
                  key={i}
                  className="absolute w-1 h-1 lg:w-2 lg:h-2 rounded-full bg-current opacity-20"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.2, 0.5, 0.2],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 3,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          </div>
        );
      case 'gradient':
        return (
          <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 dark:from-primary/20 dark:via-secondary/20 dark:to-accent/20"></div>
            <div className="absolute inset-0 backdrop-blur-[100px]"></div>
          </div>
        );
      default:
        return null;
    }
  };
  
  // Enhanced divider component with more options
  const Divider = () => {
    switch (divider) {
      case 'wave':
        return (
          <div className="absolute bottom-0 left-0 w-full overflow-hidden z-[1]">
            <svg className="w-full h-16 md:h-24" preserveAspectRatio="none" viewBox="0 0 1440 100" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,50 C200,100 400,0 600,50 C800,100 1000,0 1200,50 C1300,75 1440,60 1440,60 L1440,100 L0,100 Z" className="fill-white dark:fill-gray-900"></path>
            </svg>
          </div>
        );
      case 'angle':
        return (
          <div className="absolute bottom-0 left-0 w-full z-[1]">
            <svg className="w-full h-12 md:h-24" preserveAspectRatio="none" viewBox="0 0 1440 100" fill="white" xmlns="http://www.w3.org/2000/svg">
              <polygon points="0,100 0,0 1440,100" className="fill-white dark:fill-gray-900"></polygon>
            </svg>
          </div>
        );
      case 'curve':
        return (
          <div className="absolute bottom-0 left-0 w-full z-[1]">
            <svg className="w-full h-16 md:h-24" preserveAspectRatio="none" viewBox="0 0 1440 100" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,100 C600,50 1200,100 1440,80 L1440,100 L0,100 Z" className="fill-white dark:fill-gray-900"></path>
            </svg>
          </div>
        );
      case 'slope':
        return (
          <div className="absolute bottom-0 left-0 w-full z-[1]">
            <svg className="w-full h-16 md:h-24" preserveAspectRatio="none" viewBox="0 0 1440 100" fill="white" xmlns="http://www.w3.org/2000/svg">
              <polygon points="0,100 1440,0 1440,100" className="fill-white dark:fill-gray-900"></polygon>
            </svg>
          </div>
        );
      case 'zigzag':
        return (
          <div className="absolute bottom-0 left-0 w-full z-[1]">
            <svg className="w-full h-12 md:h-20" preserveAspectRatio="none" viewBox="0 0 1440 100" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,100 L144,50 L288,100 L432,50 L576,100 L720,50 L864,100 L1008,50 L1152,100 L1296,50 L1440,100 L1440,100 L0,100 Z" className="fill-white dark:fill-gray-900"></path>
            </svg>
          </div>
        );
      case 'bubbles':
        return (
          <div className="absolute bottom-0 left-0 w-full z-[1] overflow-hidden">
            <div className="relative h-24">
              <svg className="w-full absolute bottom-0" preserveAspectRatio="none" viewBox="0 0 1440 100" fill="white" xmlns="http://www.w3.org/2000/svg">
                <path d="M0,100 L1440,100 L1440,0 L0,0 Z" className="fill-white dark:fill-gray-900"></path>
              </svg>
              {Array.from({ length: 12 }).map((_, i) => (
                <div 
                  key={i}
                  className="absolute bottom-0 rounded-full bg-white dark:bg-gray-900"
                  style={{
                    left: `${(i * 8) + Math.random() * 4}%`,
                    width: `${20 + Math.random() * 40}px`,
                    height: `${20 + Math.random() * 40}px`,
                    transform: `translateY(${Math.random() * 50}%)`,
                  }}
                ></div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Render CTA button with enhanced styling
  const renderCTA = (cta?: CTAButton) => {
    if (!cta) return null;
    
    const getButtonClasses = () => {
      const baseClasses = "group relative overflow-hidden font-semibold rounded-full transition transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary";
      
      switch (cta.variant || 'primary') {
        case 'primary':
          return `${baseClasses} px-6 py-3 bg-primary text-white shadow-lg hover:shadow-xl focus:ring-primary`;
        case 'secondary':
          return `${baseClasses} px-6 py-3 bg-secondary text-white shadow-lg hover:shadow-xl focus:ring-secondary`;
        case 'outline':
          return `${baseClasses} px-6 py-3 border-2 border-primary text-primary dark:text-primary-light hover:bg-primary hover:text-white focus:ring-primary`;
        case 'text':
          return `group relative font-semibold text-primary dark:text-primary-light transition transform hover:-translate-y-1 focus:outline-none`;
        case 'accent':
          return `${baseClasses} px-6 py-3 bg-accent text-white shadow-lg hover:shadow-xl focus:ring-accent`;
        case 'minimal':
          return `${baseClasses} px-5 py-2.5 bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 focus:ring-gray-400`;
        default:
          return `${baseClasses} px-6 py-3 bg-primary text-white shadow-lg hover:shadow-xl focus:ring-primary`;
      }
    };
    
    return (
      <Link 
        href={cta.href} 
        className={getButtonClasses()}
        onClick={cta.onClick}
        aria-label={cta.text}
        prefetch={true}
      >
        <span className="relative z-10 flex items-center">
          {cta.text}
          {cta.icon || (cta.variant !== 'text' && cta.variant !== 'minimal' ? (
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 ml-2 transform transition duration-300 group-hover:translate-x-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          ) : null)}
        </span>
        {(cta.variant === 'primary' || cta.variant === 'secondary' || cta.variant === 'accent') && (
          <span 
            className={`absolute inset-0 bg-gradient-to-r ${themeClasses.buttonHighlight} z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
            aria-hidden="true"
          ></span>
        )}
      </Link>
    );
  };
  
  // Render metrics component
  const renderMetrics = () => {
    if (!metrics || metrics.length === 0) return null;
    
    // Special case for dark theme with the specific layout shown in the screenshot
    if ((theme === 'dark' || theme === 'custom') && layout === 'centered') {
      return (
        metrics.map((metric, index) => (
          <motion.div 
            key={index}
            variants={childVariants}
            className="text-center"
          >
            <div className={`text-5xl font-bold ${theme === 'custom' ? 'text-blue-600' : 'text-blue-400'} mb-2`}>
              {metric.value}
            </div>
            <div className={`text-sm ${theme === 'custom' ? 'text-gray-600' : 'text-gray-400'}`}>
              {metric.label}
            </div>
          </motion.div>
        ))
      );
    }
    
    // Standard metrics rendering
    return (
      <motion.div 
        variants={childVariants}
        className={`${layoutClasses.metrics}`}
      >
        {metrics.map((metric, index) => {
          // Determine color classes based on metric color
          const getColorClasses = () => {
            switch (metric.color) {
              case 'primary': return 'text-primary dark:text-primary-light';
              case 'secondary': return 'text-secondary dark:text-secondary-light';
              case 'accent': return 'text-accent dark:text-accent-light';
              case 'success': return 'text-green-600 dark:text-green-400';
              case 'info': return 'text-blue-600 dark:text-blue-400';
              case 'warning': return 'text-amber-600 dark:text-amber-400';
              default: return 'text-primary dark:text-primary-light';
            }
          };
          
          return (
            <div 
              key={index} 
              className="metric group relative overflow-hidden bg-white dark:bg-gray-800 shadow-md rounded-xl p-4 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1"
              role="group"
            >
              <div className={`absolute -right-4 -top-4 w-16 h-16 bg-${metric.color || 'primary'}/10 dark:bg-${metric.color || 'primary'}/20 rounded-full transition-all duration-500 group-hover:scale-150`} aria-hidden="true"></div>
              <div className="relative">
                <div className="flex items-center gap-1.5">
                  {metric.icon && <span className="text-gray-500 dark:text-gray-400">{metric.icon}</span>}
                  <div className="flex items-baseline">
                    {metric.prefix && <span className="text-sm mr-0.5">{metric.prefix}</span>}
                    <span className={`text-2xl font-bold ${getColorClasses()}`}>
                      {metric.value}
                    </span>
                    {metric.suffix && <span className="text-sm ml-0.5">{metric.suffix}</span>}
                  </div>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{metric.label}</div>
              </div>
            </div>
          );
        })}
      </motion.div>
    );
  };
  
  // Background video component
  const renderBackgroundVideo = () => {
    if (!backgroundVideo) return null;
    
    return (
      <div className="absolute inset-0 overflow-hidden z-0" aria-hidden={!backgroundVideo.backgroundVideoAriaLabel}>
        {backgroundVideo.backgroundVideoAriaLabel && (
          <span className="sr-only">{backgroundVideo.backgroundVideoAriaLabel}</span>
        )}
        
        <video 
          autoPlay 
          muted={backgroundVideo.muted !== false} 
          loop={backgroundVideo.loop !== false}
          playsInline
          poster={backgroundVideo.poster}
          className="absolute w-full h-full object-cover"
        >
          <source src={backgroundVideo.src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {backgroundVideo.overlay && (
          <div className="absolute inset-0 bg-black/40 dark:bg-black/60 z-[1]"></div>
        )}
      </div>
    );
  };

  return (
    <section
      ref={heroRef} 
      className={cn(
        "relative py-16 md:py-24 lg:py-28 overflow-hidden", 
        themeClasses.background, 
        themeClasses.text, 
        className
      )}
      aria-labelledby="hero-heading"
      aria-label={accessibilityLabels.regionLabel || "Page introduction"}
    >
      {/* Background elements */}
      {renderBackgroundVideo()}
      <BackgroundPattern />
      
      {/* Custom header elements if provided */}
      {headerElements && (
        <div className="container mx-auto px-4 relative z-10 mb-10">
          {headerElements}
        </div>
      )}
      
      {/* Main Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className={`grid gap-x-8 gap-y-10 ${layoutClasses.grid} ${layoutClasses.container}`}>
          {/* Content Column */}
          <motion.div 
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={containerVariants}
            className={`flex flex-col gap-6 ${layoutClasses.content} ${layoutClasses.contentPadding}`}
          >
            {/* Badge */}
            <motion.div 
              variants={childVariants}
              className={`${getBadgeClasses()} space-x-2 self-start ${layout === 'centered' ? 'mx-auto' : ''}`}
            >
              <div className={`w-2 h-2 ${themeClasses.indicator} rounded-full animate-pulse`} aria-hidden="true"></div>
              <span className="text-sm font-semibold tracking-wider uppercase">
                {tagline}
              </span>
            </motion.div>
            
            {/* Headline */}
            <motion.h1 
              id="hero-heading"
              variants={childVariants}
              className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight ${layout === 'centered' ? 'text-center' : ''}`}
            >
              {typeof title === 'string' ? preventTextBreak(title) : title}
            </motion.h1>

            {/* Description */}
            <motion.p 
              variants={childVariants}
              className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600 dark:text-gray-300'} mb-2 ${customMaxWidthClass} ${layout === 'centered' ? 'mx-auto text-center' : ''}`}
            >
              {typeof description === 'string' ? preventTextBreak(description) : description}
            </motion.p>
            
            {/* Metrics display */}
            {metrics.length > 0 && (
              <div className={`mt-12 ${layout === 'centered' ? 'flex justify-center gap-16' : ''}`}>
                {renderMetrics()}
              </div>
            )}
            
            {/* Additional content */}
            {additionalContent && (
              <motion.div
                variants={childVariants}
                className="mt-12"
              >
                {additionalContent}
              </motion.div>
            )}
            
            {/* CTA Buttons */}
            {(primaryCTA || secondaryCTA) && (
              <motion.div 
                variants={childVariants}
                className={`flex flex-wrap gap-4 mt-6 ${layout === 'centered' ? 'justify-center' : ''}`}
              >
                {primaryCTA && renderCTA(primaryCTA)}
                {secondaryCTA && renderCTA(secondaryCTA)}
              </motion.div>
            )}
            
            {/* Social proof or additional content */}
            {socialProof && (
              <motion.div
                variants={childVariants}
                className={`mt-6 ${layout === 'centered' ? 'mx-auto' : ''}`}
              >
                {socialProof}
              </motion.div>
            )}
          </motion.div>
          
          {/* Visual/Right Column */}
          {visualComponent && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className={`${layoutClasses.visual}`}
            >
              {visualComponent}
            </motion.div>
          )}
        </div>
        
        {/* Footer elements if provided */}
        {footerElements && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12"
          >
            {footerElements}
          </motion.div>
        )}
      </div>
      
      {/* Divider */}
      <Divider />
    </section>
  );
}
