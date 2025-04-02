'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { reportCustomMetric } from '@/lib/performance/webVitals';

export type CTAStyle = 'primary' | 'secondary' | 'accent' | 'gradient' | 'outline';
export type CTASize = 'small' | 'medium' | 'large';
export type CTAShape = 'rounded' | 'pill' | 'square';
export type CTAPosition = 'left' | 'center' | 'right';

interface CallToActionProps {
  // Core props
  text: string;
  href: string;
  
  // Styling props
  style?: CTAStyle;
  size?: CTASize;
  shape?: CTAShape;
  fullWidth?: boolean;
  icon?: string | React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  
  // Container props
  containerClassName?: string;
  subtext?: string;
  headline?: string;
  position?: CTAPosition;
  highlight?: boolean;
  animate?: boolean;
  
  // Advanced props
  openInNewTab?: boolean;
  attributes?: Record<string, string>;
  trackingId?: string;
  trackingCategory?: string;
  trackImpressions?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export function CallToAction({
  // Core props
  text,
  href,
  
  // Styling props
  style = 'primary',
  size = 'medium',
  shape = 'pill',
  fullWidth = false,
  icon,
  iconPosition = 'right',
  className = '',
  
  // Container props
  containerClassName = '',
  subtext,
  headline,
  position = 'center',
  highlight = false,
  animate = true,
  
  // Advanced props
  openInNewTab = false,
  attributes = {},
  trackingId = '',
  trackingCategory = 'conversion',
  trackImpressions = true,
  onClick,
}: CallToActionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.5 });
  const [wasImpressed, setWasImpressed] = useState(false);
  
  // Get CTA style classes
  const getStyleClasses = (): string => {
    switch (style) {
      case 'primary':
        return 'bg-primary text-white hover:bg-primary-dark';
      case 'secondary':
        return 'bg-secondary text-white hover:bg-secondary-dark';
      case 'accent':
        return 'bg-accent text-white hover:bg-accent-dark';
      case 'gradient':
        return 'bg-gradient-to-r from-primary to-secondary text-white hover:from-primary-dark hover:to-secondary-dark';
      case 'outline':
        return 'bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white';
      default:
        return 'bg-primary text-white hover:bg-primary-dark';
    }
  };
  
  // Get CTA size classes
  const getSizeClasses = (): string => {
    switch (size) {
      case 'small':
        return 'py-1.5 px-4 text-sm';
      case 'medium':
        return 'py-2.5 px-6 text-base';
      case 'large':
        return 'py-3.5 px-8 text-lg';
      default:
        return 'py-2.5 px-6 text-base';
    }
  };
  
  // Get CTA shape classes
  const getShapeClasses = (): string => {
    switch (shape) {
      case 'rounded':
        return 'rounded-md';
      case 'pill':
        return 'rounded-full';
      case 'square':
        return 'rounded-none';
      default:
        return 'rounded-full';
    }
  };
  
  // Get position classes
  const getPositionClasses = (): string => {
    switch (position) {
      case 'left':
        return 'items-start text-left';
      case 'center':
        return 'items-center text-center';
      case 'right':
        return 'items-end text-right';
      default:
        return 'items-center text-center';
    }
  };
  
  // Track CTA impression when it comes into view
  useEffect(() => {
    if (isInView && trackImpressions && !wasImpressed) {
      // Mark as impressed to prevent duplicate tracking
      setWasImpressed(true);
      
      // Track the impression
      if (typeof window !== 'undefined' && (window as any).gtag) {
        try {
          (window as any).gtag('event', 'cta_impression', {
            event_category: trackingCategory,
            event_label: trackingId || text,
            cta_text: text,
            cta_url: href,
            non_interaction: true,
          });
          
          // Also track as a custom metric
          reportCustomMetric('cta_impression', 1, {
            label: 'CTA Impression',
            cta_text: text,
            cta_url: href,
            page_path: window.location.pathname
          });
        } catch (e) {
          console.error('Failed to track CTA impression:', e);
        }
      }
    }
  }, [isInView, trackImpressions, wasImpressed, text, href, trackingId, trackingCategory]);
  
  // Handle CTA click
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Track the click
    if (typeof window !== 'undefined' && (window as any).gtag) {
      try {
        (window as any).gtag('event', 'cta_click', {
          event_category: trackingCategory,
          event_label: trackingId || text,
          cta_text: text,
          cta_url: href,
        });
      } catch (e) {
        console.error('Failed to track CTA click:', e);
      }
    }
    
    // Call the custom onClick handler if provided
    if (onClick) {
      onClick(e);
    }
  };
  
  // Construct the CTA button
  const ctaButton = (
    <Link
      href={href}
      className={`
        inline-flex items-center justify-center font-semibold transition-all duration-300
        ${getStyleClasses()}
        ${getSizeClasses()}
        ${getShapeClasses()}
        ${fullWidth ? 'w-full' : ''}
        ${highlight ? 'shadow-lg hover:shadow-xl transform hover:-translate-y-1' : 'shadow-md hover:shadow-lg'}
        ${className}
      `}
      target={openInNewTab ? '_blank' : undefined}
      rel={openInNewTab ? 'noopener noreferrer' : undefined}
      onClick={handleClick}
      {...attributes}
      aria-label={text}
    >
      {icon && iconPosition === 'left' && (
        <span className="mr-2">{typeof icon === 'string' ? <i className={icon}></i> : icon}</span>
      )}
      
      <span>{text}</span>
      
      {icon && iconPosition === 'right' && (
        <span className="ml-2">{typeof icon === 'string' ? <i className={icon}></i> : icon}</span>
      )}
    </Link>
  );
  
  // If no container elements are needed, just return the button
  if (!subtext && !headline && !containerClassName) {
    return animate ? (
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.5 }}
      >
        {ctaButton}
      </motion.div>
    ) : (
      <div ref={containerRef}>
        {ctaButton}
      </div>
    );
  }
  
  // With container elements
  return (
    <div
      className={`flex flex-col ${getPositionClasses()} ${containerClassName}`}
      ref={containerRef}
    >
      {headline && (
        <motion.h3
          className="text-xl font-bold mb-2"
          initial={animate ? { opacity: 0, y: 10 } : undefined}
          animate={animate && isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {headline}
        </motion.h3>
      )}
      
      {subtext && (
        <motion.p
          className="text-gray-600 dark:text-gray-300 mb-4"
          initial={animate ? { opacity: 0, y: 10 } : undefined}
          animate={animate && isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {subtext}
        </motion.p>
      )}
      
      <motion.div
        initial={animate ? { opacity: 0, y: 10 } : undefined}
        animate={animate && isInView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {ctaButton}
      </motion.div>
    </div>
  );
}

export default CallToAction;
