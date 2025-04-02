'use client';

import { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import BaseHero from './BaseHero';
import OptimizedImage from '@/components/ui/OptimizedImage';

interface MetricCardProps {
  label: string;
  value: number;
  suffix?: string;
  color: string;
  inView: boolean;
  delay?: number;
}

const MetricCard: React.FC<MetricCardProps> = ({ label, value, suffix = '%', color, inView, delay = 0 }) => {
  const [countValue, setCountValue] = useState(0);
  
  useEffect(() => {
    if (inView) {
      const interval = setInterval(() => {
        setCountValue(prev => {
          const newValue = prev >= value ? value : prev + 1;
          if (newValue === value) {
            clearInterval(interval);
          }
          return newValue;
        });
      }, 30);
      
      return () => clearInterval(interval);
    }
  }, [inView, value]);
  
  return (
    <div 
      className={`metric group relative overflow-hidden bg-white dark:bg-gray-800 shadow-md rounded-xl p-4 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1`}
      role="figure"
      aria-label={`${label} metric`}
    >
      <div 
        className={`absolute -right-4 -top-4 w-16 h-16 ${color === 'primary' ? 'bg-primary/10 dark:bg-primary/20' : 'bg-secondary/10 dark:bg-secondary/20'} rounded-full transition-all duration-500 group-hover:scale-150`}
        aria-hidden="true"
      ></div>
      <div className="relative">
        <span 
          className={`text-4xl font-bold ${color === 'primary' ? 'text-primary' : 'text-secondary'}`}
          aria-hidden="true"
        >{countValue}{suffix}</span>
        <span className="sr-only">{value} {suffix}</span>
        <span className="block text-sm text-gray-500 dark:text-gray-400 mt-1">{label}</span>
      </div>
    </div>
  );
};

// Social proof component with improved design
const SocialProof = ({ inView }: { inView: boolean }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: 0.6 }}
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

// Featured client logos component with improved design
const ClientLogos = ({ inView }: { inView: boolean }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ duration: 0.5, delay: 0.7 }}
      className="flex flex-wrap items-center gap-6 mt-8"
    >
      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">TRUSTED BY:</p>
      <div className="flex flex-wrap gap-6">
        {['TechCorp', 'DataSphere', 'InsightIQ', 'OptimizeNow'].map((name, i) => (
          <div key={i} className="text-gray-500 dark:text-gray-400 font-medium">
            {name}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default function HomeHero() {
  const [inViewRef, setInViewRef] = useState<HTMLDivElement | null>(null);
  const inView = useInView(inViewRef, { once: true, amount: 0.3 });
  
  // Key metrics to showcase
  const metrics = [
    { label: 'Average Revenue Growth', value: 40, color: 'primary' },
    { label: 'Increase in Data Utilization', value: 85, color: 'secondary' }
  ];
  
  return (
    <div ref={setInViewRef}>
      <BaseHero
        tagline="Data-Driven SaaS Consulting"
        title={
          <>
            Transform Raw Data Into <span className="relative">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Strategic Wealth
              </span>
              <svg className="absolute -bottom-2 left-0 w-full h-2 text-secondary/30 dark:text-secondary/50" viewBox="0 0 200 8" preserveAspectRatio="none">
                <path d="M0,5 C40,2 60,8 100,5 C140,2 160,8 200,5" fill="none" stroke="currentColor" strokeWidth="2"></path>
              </svg>
            </span>
          </>
        }
        description="Stop drowning in data without insights. We transform your fragmented data landscape into a unified system driving revenue growth and operational excellence."
        primaryCTA={{
          text: "Book Free Consultation",
          href: "/contact",
          onClick: () => {
            // Track CTA click
            if (typeof window !== 'undefined' && (window as any).gtag) {
              (window as any).gtag('event', 'cta_click', {
                event_category: 'engagement',
                event_label: 'hero_primary_cta'
              });
            }
          }
        }}
        secondaryCTA={{
          text: "Explore Services",
          href: "/services"
        }}
        socialProof={
          <>
            <div className="flex flex-wrap gap-6 mb-6">
              {metrics.map((metric, index) => (
                <MetricCard
                  key={index}
                  label={metric.label}
                  value={metric.value}
                  color={metric.color}
                  inView={inView}
                  delay={index * 0.2}
                />
              ))}
            </div>
            <SocialProof inView={inView} />
            <ClientLogos inView={inView} />
          </>
        }
        backgroundPattern="dots"
        dividerType="curve"
      >
        {/* Right column content - Dashboard visualization with purpose */}
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/5 dark:from-primary/10 dark:via-secondary/10 dark:to-primary/10 rounded-2xl"></div>
          
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
                
                {/* Dashboard visualization */}
                <div className="relative mb-6">
                  <OptimizedImage 
                    src="/images/dashboard-illustration.svg" 
                    alt="Data Dashboard Visualization showing key business metrics and analytics" 
                    width={500} 
                    height={400}
                    priority={true}
                    imagePriority="critical"
                    className="rounded-lg shadow-md"
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjFmNWY5Ii8+PC9zdmc+"
                  />
                </div>
                
                {/* Simple metrics in dashboard */}
                <div className="grid grid-cols-2 gap-4">
                  <div 
                    className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg overflow-hidden"
                    role="group"
                    aria-labelledby="conversion-rate-label"
                  >
                    <div id="conversion-rate-label" className="text-xs text-gray-500 dark:text-gray-400">Conversion Rate</div>
                    <div className="text-xl font-bold text-primary dark:text-primary-light" aria-live="polite">
                      {inView && <span>37.8%</span>}
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
                      {inView && <span>92.5%</span>}
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
              </div>
            </div>
          </div>
        </div>
      </BaseHero>
    </div>
  );
}
