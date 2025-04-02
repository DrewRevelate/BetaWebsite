'use client';

import Link from "next/link";
import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { motion, useInView, AnimatePresence } from 'framer-motion';
import OptimizedImage from "@/components/ui/OptimizedImage";
import { useThrottle } from "@/hooks/useThrottle";
import { useThrottleValue } from "@/hooks/useThrottleValue";

// Simplified hero background component
const SimpleHeroBackground = () => {
  return (
    <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 overflow-hidden">
      {/* Simple decorative element */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 dark:bg-primary/10 rounded-bl-full" aria-hidden="true"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-secondary/5 dark:bg-secondary/10 rounded-tr-full" aria-hidden="true"></div>
    </div>
  );
};

// Dashboard metrics component with animation
const DashboardMetrics = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  return (
    <div ref={ref} className="grid grid-cols-2 gap-4">
      <div 
        className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg overflow-hidden"
        role="group"
        aria-labelledby="conversion-rate-label"
      >
        <div id="conversion-rate-label" className="text-xs text-gray-500 dark:text-gray-400">Conversion Rate</div>
        <div className="text-xl font-bold text-primary dark:text-primary-light" aria-live="polite">
          <AnimatePresence>
            {inView && (
              <motion.span
                key="conversion-rate"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                37.8%
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        <div 
          className="w-full h-1.5 bg-gray-200 dark:bg-gray-600 rounded-full mt-2 overflow-hidden"
          role="progressbar"
          aria-valuenow={37.8}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <motion.div 
            className="h-full bg-primary rounded-full"
            initial={{ width: 0 }}
            animate={inView ? { width: '37.8%' } : { width: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            aria-hidden="true"
          />
        </div>
      </div>
      <div 
        className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg overflow-hidden"
        role="group"
        aria-labelledby="data-quality-label"
      >
        <div id="data-quality-label" className="text-xs text-gray-500 dark:text-gray-400">Data Quality</div>
        <div className="text-xl font-bold text-secondary dark:text-secondary-light" aria-live="polite">
          <AnimatePresence>
            {inView && (
              <motion.span
                key="data-quality"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                92.5%
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        <div 
          className="w-full h-1.5 bg-gray-200 dark:bg-gray-600 rounded-full mt-2 overflow-hidden"
          role="progressbar"
          aria-valuenow={92.5}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <motion.div 
            className="h-full bg-secondary rounded-full"
            initial={{ width: 0 }}
            animate={inView ? { width: '92.5%' } : { width: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
};

// Separate animated data points component with Framer Motion
const AnimatedDataPoints = () => {
  const dataPoints = useMemo(() => 
    [...Array(5)].map((_, i) => ({
      id: i,
      left: 10 + (i * 20),
      top: 70 + (Math.sin(i) * 10),
      delay: i * 0.5
    })),
  []);

  return (
    <>
      {dataPoints.map((point) => (
        <motion.div 
          key={point.id}
          className="absolute z-20 w-3 h-3 rounded-full bg-primary"
          style={{
            left: `${point.left}%`,
            top: `${point.top}%`,
            opacity: 0
          }}
          animate={{
            y: [-20, -80, -20],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 3,
            delay: point.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          aria-hidden="true"
        />
      ))}
    </>
  );
};

// Separate connection lines component
const ConnectionLines = () => {
  // Reduce the number of lines for better performance
  const lines = useMemo(() => 
    [...Array(6)].map((_, i) => ({
      id: i,
      x1: Math.random() * 100,
      y1: Math.random() * 100,
      x2: Math.random() * 100,
      y2: Math.random() * 100,
      delay: i * 0.5
    })),
  []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg className="w-full h-full opacity-20 dark:opacity-30" aria-hidden="true">
        <defs>
          <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.1" />
            <stop offset="100%" stopColor="var(--secondary)" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        {lines.map((line) => (
          <line 
            key={line.id}
            x1={`${line.x1}%`} 
            y1={`${line.y1}%`} 
            x2={`${line.x2}%`} 
            y2={`${line.y2}%`} 
            stroke="url(#line-gradient)"
            strokeWidth="1"
            strokeDasharray="5,5"
            className="motion-safe:animate-pulse-slow"
            style={{ animationDelay: `${line.delay}s` }}
          />
        ))}
      </svg>
    </div>
  );
};

// Featured client logos component
const ClientLogos = () => {
  return (
    <div className="flex flex-wrap items-center gap-6 mt-8">
      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">TRUSTED BY:</p>
      <div className="flex flex-wrap gap-6">
        {['TechCorp', 'DataSphere', 'InsightIQ', 'OptimizeNow'].map((name, i) => (
          <div key={i} className="text-gray-400 dark:text-gray-500 font-medium">
            {name}
          </div>
        ))}
      </div>
    </div>
  );
};

// Social proof component
const SocialProof = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="mt-8 px-4 py-3 bg-primary/5 dark:bg-primary/10 border border-primary/10 rounded-lg"
    >
      <div className="flex items-center">
        <div className="flex -space-x-2 mr-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-gray-800" />
          ))}
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          <span className="font-semibold">200+ businesses</span> transformed their data strategy with us
        </p>
      </div>
    </motion.div>
  );
};

export function HeroSection() {
  // Use inView hook from framer-motion for better animation control
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
    amount: 0.1
  });

  // Raw mouse position
  const [rawMousePosition, setRawMousePosition] = useState({ x: 0.5, y: 0.5 });
  
  // Throttle the value that triggers re-renders to improve performance
  const mousePosition = useThrottleValue(rawMousePosition, 50);
  
  // Throttle mouse move handler to improve performance
  const handleMouseMove = useThrottle((e: MouseEvent) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    
    const heroElement = document.getElementById('hero-section');
    if (!heroElement) return;
    
    const { left, top, width, height } = heroElement.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    setRawMousePosition({ x, y });
  }, 50);
  
  // Calculate value for countUp animation
  const [countValue, setCountValue] = useState({ revenue: 0, utilization: 0 });
  
  useEffect(() => {
    if (inView) {
      // Animate the metrics when in view
      const interval = setInterval(() => {
        setCountValue(prev => {
          const newRevenue = prev.revenue >= 40 ? 40 : prev.revenue + 1;
          const newUtilization = prev.utilization >= 85 ? 85 : prev.utilization + 2;
          
          if (newRevenue === 40 && newUtilization === 85) {
            clearInterval(interval);
          }
          
          return { revenue: newRevenue, utilization: newUtilization };
        });
      }, 30);
      
      return () => clearInterval(interval);
    }
  }, [inView]);
  
  // Attach event listener with cleanup
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);
  
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
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  return (
    <section 
      id="hero-section"
      ref={ref}
      className="relative bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-16 px-4 md:py-24 lg:py-32 overflow-hidden"
    >
      {/* Simplified hero background */}
      <SimpleHeroBackground />
      
      {/* Main Content */}
      <div className="relative mx-auto max-w-7xl z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text and CTAs */}
          <motion.div 
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="flex flex-col gap-6"
          >
            {/* Badge */}
            <motion.div 
              variants={fadeInUpVariants}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/10 dark:bg-primary/20 backdrop-blur-sm rounded-full border border-primary/20 self-start"
              role="text"
            >
              <div 
                className="w-2 h-2 bg-primary rounded-full animate-pulse"
                aria-hidden="true"
              ></div>
              <span className="text-sm font-semibold tracking-wider text-primary uppercase">
                Data-Driven SaaS Consulting
              </span>
            </motion.div>
            
            {/* Headline */}
            <motion.h1 
              variants={fadeInUpVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
            >
              Transform Raw Data Into <span className="relative">
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Strategic Wealth
                </span>
                <svg className="absolute -bottom-2 left-0 w-full h-2 text-secondary/30 dark:text-secondary/50" viewBox="0 0 200 8" preserveAspectRatio="none">
                  <path d="M0,5 C40,2 60,8 100,5 C140,2 160,8 200,5" fill="none" stroke="currentColor" strokeWidth="2"></path>
                </svg>
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p 
              variants={fadeInUpVariants}
              className="text-xl text-gray-600 dark:text-gray-300 mb-6 max-w-[550px]"
            >
              Stop drowning in data without insights. We transform your fragmented data landscape into a unified system driving revenue growth and operational excellence.
            </motion.p>
            
            {/* Key stats with animated counters */}
            <motion.div 
              variants={fadeInUpVariants}
              className="flex flex-wrap gap-6 mb-8"
            >
              {/* Revenue Growth Stat */}
              <div 
                className="metric group relative overflow-hidden bg-white dark:bg-gray-800 shadow-md rounded-xl p-4 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1"
                role="figure"
                aria-label="Average revenue growth metric"
              >
                <div 
                  className="absolute -right-4 -top-4 w-16 h-16 bg-primary/10 dark:bg-primary/20 rounded-full transition-all duration-500 group-hover:scale-150"
                  aria-hidden="true"
                ></div>
                <div className="relative">
                  <span 
                    className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent"
                    aria-hidden="true" // Hide gradient text from screen readers
                  >{countValue.revenue}%</span>
                  <span className="sr-only">{countValue.revenue} percent</span> {/* Screen reader text */}
                  <span className="block text-sm text-gray-500 dark:text-gray-400 mt-1">Average Revenue Growth</span>
                </div>
              </div>
              
              {/* Data Utilization Stat */}
              <div 
                className="metric group relative overflow-hidden bg-white dark:bg-gray-800 shadow-md rounded-xl p-4 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1"
                role="figure"
                aria-label="Increase in data utilization metric"
              >
                <div 
                  className="absolute -right-4 -top-4 w-16 h-16 bg-secondary/10 dark:bg-secondary/20 rounded-full transition-all duration-500 group-hover:scale-150"
                  aria-hidden="true"
                ></div>
                <div className="relative">
                  <span 
                    className="text-4xl font-bold bg-gradient-to-r from-secondary to-secondary-dark bg-clip-text text-transparent"
                    aria-hidden="true" // Hide gradient text from screen readers
                  >{countValue.utilization}%</span>
                  <span className="sr-only">{countValue.utilization} percent</span> {/* Screen reader text */}
                  <span className="block text-sm text-gray-500 dark:text-gray-400 mt-1">Increase in Data Utilization</span>
                </div>
              </div>
            </motion.div>
            
            {/* Benefits list with icons */}
            <motion.ul
              variants={staggerContainer}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="space-y-3 mb-6"
            >
              {[
                "Integrate all your disparate data sources",
                "Build actionable insights dashboards",
                "Automate reporting workflows"
              ].map((item, i) => (
                <motion.li 
                  key={i}
                  custom={i}
                  variants={fadeInDelayedVariants}
                  className="flex items-center space-x-2 text-gray-700 dark:text-gray-300"
                >
                  <svg className="w-5 h-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>{item}</span>
                </motion.li>
              ))}
            </motion.ul>
            
            {/* CTA Buttons */}
            <motion.div 
              variants={fadeInUpVariants}
              className="flex flex-wrap gap-4"
            >
              {/* Primary CTA */}
              <Link 
                href="/contact" 
                className="group relative overflow-hidden px-6 py-3 bg-primary text-white font-semibold rounded-full shadow-lg transition transform hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                aria-label="Get started with a free consultation"
                prefetch={true}
                onClick={() => {
                  // Track CTA click
                  if (typeof window !== 'undefined' && (window as any).gtag) {
                    (window as any).gtag('event', 'cta_click', {
                      event_category: 'engagement',
                      event_label: 'hero_primary_cta'
                    });
                  }
                }}
              >
                <span className="relative z-10 flex items-center">
                  Book Free Consultation
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
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-primary-dark to-primary z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true"></span>
              </Link>
              
              {/* Secondary CTA */}
              <Link 
                href="/services" 
                className="group relative overflow-hidden px-6 py-3 border-2 border-primary text-primary dark:text-primary-light font-semibold rounded-full transition transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                aria-label="Explore our services"
                prefetch={true}
              >
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">Explore Services</span>
                <span className="absolute inset-0 bg-primary scale-x-0 origin-left transform transition-transform duration-300 group-hover:scale-x-100" aria-hidden="true"></span>
              </Link>
            </motion.div>
            
            {/* Social proof component */}
            <SocialProof />
          </motion.div>
          
          {/* Right Column - Dashboard visualization */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative flex justify-center items-center"
          >
            {/* Dynamic data flow visualization */}
            <div className="relative">
              {/* Simple background */}
              <div className="absolute -inset-4 bg-primary/10 dark:bg-primary/20 rounded-full"></div>
              
              {/* Main visualization */}
              <div className="relative z-10 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700 transition-all duration-500 hover:shadow-primary/20 hover:-translate-y-1">
                <div className="relative p-1">
                  <div className="absolute top-4 left-4 flex space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  
                  <div className="pt-10 pb-8 px-8">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-gray-800 dark:text-gray-200 font-bold">Strategic Data Pipeline</h3>
                      <div className="px-2 py-1 bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100 text-xs font-medium rounded-full flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></span>
                        LIVE
                      </div>
                    </div>
                    
                    {/* Animated data flow visualization */}
                    <div className="relative mb-6">
                      <div 
                        className="relative z-10 rounded-lg shadow-lg transform transition-all duration-500"
                        style={{
                          transform: `perspective(1000px) rotateY(${(mousePosition.x - 0.5) * 5}deg) rotateX(${(mousePosition.y - 0.5) * -5}deg)`,
                          willChange: 'transform', // Optimize for hardware acceleration
                          backfaceVisibility: 'hidden', // Prevent rendering of back face
                          WebkitBackfaceVisibility: 'hidden'
                        }}>
                        {/* Use our enhanced OptimizedImage component */}
                        <OptimizedImage 
                          src="/images/dashboard-illustration.svg" 
                          alt="Data Dashboard Visualization" 
                          width={500} 
                          height={400}
                          priority={true}
                          imagePriority="critical" // This is an LCP image
                          trackLoadPerformance={true}
                          loadingStrategy="eager"
                          className="rounded-lg"
                          placeholderType="shimmer"
                          fadeInDuration={300}
                          connectionAwareQuality={true} // New feature - adjust quality based on connection
                          preloadStrategy="eager" // New feature - preload critical images
                          // Mobile-specific optimization
                          mobileSrc="/images/dashboard-illustration-mobile.svg"
                          mobileWidth={320}
                          mobileHeight={280}
                          // Responsive size configuration
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, (max-width: 1024px) 50vw, 500px"
                          // Improved performance attributes
                          style={{ willChange: 'transform' }}
                          fetchPriority="high"
                          retryStrategy={{ enabled: true, maxRetries: 2 }} // New feature - auto retry on error
                          performanceOptions={{
                            trackLCP: true,
                            trackINP: true,
                            debugMode: false
                          }}
                          onLoadSuccess={(data) => {
                            // Report LCP metric if available
                            if (data?.isLCP && window.performance && 'mark' in window.performance) {
                              window.performance.mark('lcp-hero-loaded');
                            }
                          }}
                        />
                      </div>
                      
                      {/* Removed animated data points */}
                    </div>
                    
                    {/* Animated metrics in dashboard */}
                    <DashboardMetrics />
                  </div>
                </div>
              </div>
              
              {/* Removed connection lines */}
            </div>
          </motion.div>
        </div>
        
        {/* Client logos section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <ClientLogos />
        </motion.div>
      </div>
    </section>
  );
}
