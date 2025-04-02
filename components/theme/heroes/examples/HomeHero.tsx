'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import HeroSystem from '../HeroSystem';
import { useTheme } from '@/components/theme/ThemeProvider';
import { TrendingUp, Database, LineChart, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// Rotating text component for the hero section with optimized performance
const RotatingBenefit = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { theme } = useTheme();
  const isLightTheme = theme === 'light';
  
  const benefits = [
    "Strategic Wealth",
    "Actionable Insights",
    "Competitive Advantage",
    "Revenue Growth",
    "Business Intelligence",
    "Predictive Analytics"
  ];

  // Only rotate when component is visible
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  useEffect(() => {
    if (isPaused || !inView) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % benefits.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isPaused, inView, benefits.length]);

  // Pause rotation on hover/focus for accessibility
  const handleMouseEnter = useCallback(() => setIsPaused(true), []);
  const handleMouseLeave = useCallback(() => setIsPaused(false), []);
  
  return (
    <span 
      ref={ref}
      className="block h-[1.25em] relative overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
      tabIndex={0}
      aria-label={`Rotating benefits: ${benefits.join(', ')}`}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          className={isLightTheme ? "absolute inset-0 text-blue-600" : "absolute inset-0 text-blue-400"}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {benefits[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

// Enhanced metrics component with responsive design
const EnhancedMetrics = () => {
  const { theme } = useTheme();
  const isLightTheme = theme === 'light';
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };
  
  // Only animate when in view
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  
  // Counter animation hook with performance optimization
  const useCounter = (end, duration = 2000) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
      if (!inView) return;
      
      let startTime = null;
      let animationFrame = null;
      
      const updateCount = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const percentage = Math.min(progress / duration, 1);
        
        // Easing function for smoother counting at the end
        const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
        setCount(Math.floor(easeOutQuart * end));
        
        if (percentage < 1) {
          animationFrame = requestAnimationFrame(updateCount);
        }
      };
      
      animationFrame = requestAnimationFrame(updateCount);
      
      return () => {
        if (animationFrame) {
          cancelAnimationFrame(animationFrame);
        }
      };
    }, [end, duration, inView]);
    
    return count;
  };
  
  const revenueGrowth = useCounter(40);
  const dataUtilization = useCounter(85);
  
  return (
    <motion.div 
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="flex flex-col md:flex-row justify-center md:gap-16 lg:gap-24 mt-10 md:mt-16 content-visibility-auto will-change-transform"
    >
      <motion.div variants={itemVariants} className="relative mb-8 md:mb-0">
        <div className="text-center">
          <div className={`text-4xl md:text-6xl font-bold ${isLightTheme ? 'text-blue-600' : 'text-blue-400'} mb-1 relative`}>
            {revenueGrowth}%
            <div 
              className={`absolute -bottom-1 left-0 h-1 rounded-full ${isLightTheme ? 'bg-blue-600/30' : 'bg-blue-400/30'}`}
              style={{ width: `${revenueGrowth}%` }}
            ></div>
          </div>
          <div className={`text-xs md:text-sm ${isLightTheme ? 'text-gray-600' : 'text-gray-400'} font-medium tracking-wide uppercase mt-2`}>
            Average Revenue Growth
          </div>
        </div>
      </motion.div>
      
      <motion.div variants={itemVariants} className="relative">
        <div className="text-center">
          <div className={`text-4xl md:text-6xl font-bold ${isLightTheme ? 'text-indigo-600' : 'text-indigo-400'} mb-1 relative`}>
            {dataUtilization}%
            <div 
              className={`absolute -bottom-1 left-0 h-1 rounded-full ${isLightTheme ? 'bg-indigo-600/30' : 'bg-indigo-400/30'}`}
              style={{ width: `${dataUtilization}%` }}
            ></div>
          </div>
          <div className={`text-xs md:text-sm ${isLightTheme ? 'text-gray-600' : 'text-gray-400'} font-medium tracking-wide uppercase mt-2`}>
            Increase in Data Utilization
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Floating icon component with minimal repainting
const FloatingIcon = ({ icon, color, delay, duration = 6, x = 10, y = 20 }) => {
  return (
    <motion.div
      className={`absolute will-change-transform text-${color}`}
      animate={{
        y: [-y, 0, -y],
        x: [-x/2, x, -x/2]
      }}
      transition={{
        duration,
        ease: "easeInOut",
        repeat: Infinity,
        delay
      }}
    >
      {icon}
    </motion.div>
  );
};

// Custom visual element for hero background
const HeroBackgroundVisual = () => {
  const { theme } = useTheme();
  const isLightTheme = theme === 'light';
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Abstract data illustration */}
      <div className="absolute top-20 right-10 md:right-40 opacity-40 md:opacity-60">
        <FloatingIcon
          icon={<Database className="w-12 h-12 md:w-16 md:h-16" />}
          color={isLightTheme ? "blue-500/30" : "blue-400/20"}
          delay={0}
        />
      </div>
      
      <div className="absolute bottom-40 left-10 md:left-20 opacity-40 md:opacity-60">
        <FloatingIcon
          icon={<LineChart className="w-10 h-10 md:w-14 md:h-14" />}
          color={isLightTheme ? "indigo-500/30" : "indigo-400/20"}
          delay={1.5}
          duration={7}
        />
      </div>
      
      <div className="absolute top-40 left-20 md:left-60 opacity-30 md:opacity-50">
        <FloatingIcon
          icon={<TrendingUp className="w-8 h-8 md:w-12 md:h-12" />}
          color={isLightTheme ? "purple-500/30" : "purple-400/20"}
          delay={1}
          duration={5}
          x={15}
          y={15}
        />
      </div>
      
      {/* Decorative gradient blobs */}
      <div 
        className={cn(
          "absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-20 blur-3xl",
          isLightTheme ? "bg-blue-400" : "bg-blue-600"
        )}
      />
      
      <div 
        className={cn(
          "absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-20 blur-3xl",
          isLightTheme ? "bg-indigo-400" : "bg-indigo-600"
        )}
      />
    </div>
  );
};

// Main HomeHero component with responsive improvements
export default function HomeHero() {
  const { theme } = useTheme();
  const isLightTheme = theme === 'light';
  
  // Check for reduced motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
      
      const handleChange = (e) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener('change', handleChange);
      
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);
  
  return (
    <section 
      className={cn(
        "relative w-full overflow-hidden",
        isLightTheme 
          ? "bg-gradient-to-b from-gray-50 to-white text-gray-900" 
          : "bg-gradient-to-b from-[#141927] to-[#1a2033] text-white"
      )}
      aria-label="Revelate Operations data consulting introduction"
    >
      {/* Background visual elements */}
      {!prefersReducedMotion && <HeroBackgroundVisual />}
      
      <div className="container mx-auto px-4 pt-20 pb-24 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full mb-4 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 dark:from-blue-500/20 dark:to-indigo-500/20">
            <TrendingUp className={`h-4 w-4 mr-2 ${isLightTheme ? 'text-blue-600' : 'text-blue-400'}`} />
            <span className={`text-sm font-medium ${isLightTheme ? 'text-blue-600' : 'text-blue-400'}`}>
              Data-Driven Growth
            </span>
          </div>
          
          {/* Hero Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Transform Raw Data Into<br className="hidden md:block" />
            <RotatingBenefit />
          </h1>
          
          {/* Hero Description */}
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed text-gray-700 dark:text-gray-300">
            Stop drowning in data without insights. We convert your fragmented data landscape into a unified system driving revenue growth and operational excellence.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Link 
              href="/contact" 
              className={cn(
                "px-6 py-3 rounded-lg font-medium text-center transition-all",
                "bg-gradient-to-r from-blue-600 to-indigo-600 text-white",
                "hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg",
                "flex items-center justify-center space-x-2"
              )}
            >
              <span>Get Started</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            
            <Link 
              href="/services" 
              className={cn(
                "px-6 py-3 rounded-lg font-medium text-center transition-all",
                isLightTheme 
                  ? "bg-white text-gray-800 border border-gray-200 hover:bg-gray-50"
                  : "bg-gray-800 text-white border border-gray-700 hover:bg-gray-700"
              )}
            >
              Explore Services
            </Link>
          </div>
          
          {/* Metrics Section */}
          <EnhancedMetrics />
          
          {/* Trusted By Section */}
          <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
            <p className={`text-sm ${isLightTheme ? 'text-gray-500' : 'text-gray-400'} mb-6`}>
              Trusted by industry leaders
            </p>
            
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              {['company1.svg', 'company2.svg', 'company3.svg', 'company4.svg'].map((logo, index) => (
                <div 
                  key={index} 
                  className={`h-6 md:h-8 opacity-70 hover:opacity-100 transition-opacity ${isLightTheme ? 'grayscale' : 'grayscale brightness-150'} hover:grayscale-0`}
                >
                  {/* Replace with actual company logos */}
                  <div className={`h-full w-24 md:w-32 bg-${isLightTheme ? 'gray-300' : 'gray-700'} rounded`}></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
