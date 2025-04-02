'use client';

import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import HeroSystem from '../HeroSystem';

// Fluid, less boxy service visual representation of a la carte services
const ServiceVisual = () => {
  const serviceHighlights = [
    { 
      title: 'RevOps Assessment', 
      description: 'Comprehensive Analysis',
      details: 'A complete review of your current revenue operations with actionable recommendations.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      gradient: 'from-blue-500 to-blue-700',
      iconColor: 'text-blue-600 dark:text-blue-300'
    },
    { 
      title: 'Analytics & Reporting', 
      description: 'Data-Driven Insights',
      details: 'Transform your data into actionable insights with custom dashboards and reporting solutions.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      gradient: 'from-purple-500 to-purple-700',
      iconColor: 'text-purple-600 dark:text-purple-300'
    },
    { 
      title: 'Integration Services', 
      description: 'Seamless Connection',
      details: 'Connect your critical systems for unified data flow and automated workflows.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      ),
      gradient: 'from-indigo-500 to-indigo-700',
      iconColor: 'text-indigo-600 dark:text-indigo-300'
    }
  ];

  return (
    <div className="relative w-full max-w-6xl mx-auto px-4 pt-2 sm:pt-4 md:pt-0">
      <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8 relative z-10">
        {serviceHighlights.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ 
              opacity: 0, 
              y: 30,
              scale: 0.95
            }}
            animate={{ 
              opacity: 1, 
              y: 0,
              scale: 1,
              transition: {
                delay: index * 0.2,
                type: "spring",
                stiffness: 100,
                damping: 12
              }
            }}
            whileHover={{
              y: -10,
              transition: { 
                duration: 0.3,
                type: "spring",
                stiffness: 300
              }
            }}
            className="touch-none" // Prevents sticky hover states on mobile
            className={`
              relative w-full max-w-xs sm:max-w-sm md:w-72 p-4 sm:p-5 rounded-xl sm:rounded-3xl 
              bg-gradient-to-br ${service.gradient}
              text-white 
              shadow-2xl 
              transform transition-all duration-300
              hover:shadow-3xl
              overflow-hidden
            `}
          >
            {/* Subtle background effect */}
            <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-white to-transparent"></div>
            
            <div className="relative z-10">
              <div className={`
                w-12 h-12 sm:w-14 sm:h-14 mb-3 sm:mb-4 rounded-full 
                flex items-center justify-center 
                ${service.iconColor}
                bg-white/20 backdrop-blur-sm
                shadow-md
              `}>
                {service.icon}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-1.5 sm:mb-2">
                {service.title}
              </h3>
              <p className="text-sm opacity-80 mb-2 sm:mb-3">
                {service.description}
              </p>
              <p className="text-xs opacity-70 line-clamp-3 sm:line-clamp-none">
                {service.details}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Subtle background decorative elements */}
      <div className="absolute -top-20 sm:-top-10 left-0 right-0 h-80 sm:h-96 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 opacity-50 blur-3xl"></div>
    </div>
  );
};

export default function ServiceHero() {
  // We'll handle mobile responsiveness through CSS only
  return (
    <HeroSystem 
      tagline="A La Carte RevOps Services"
      title={
        <>
          Tailored Solutions for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-700 dark:from-blue-500 dark:to-indigo-500">Your Business</span>
        </>
      }
      description="Choose only the services you need with our flexible a la carte approach. From assessments to integration, we customize solutions to your specific requirements and budget."
      primaryCTA={{
        text: "Strategic Consultation",
        href: "/contact",
        variant: "primary",
        icon: <ArrowRight className="ml-2 h-4 w-4" />
      }}
      secondaryCTA={{
        text: "Our Solutions",
        href: "#service-categories",
        variant: "outline"
      }}
      layout="centered"
      theme="minimal"
      animation="subtle"
      background="subtle"
      badge="none"
      divider="none"
      pageContext="service"
      purpose="conversion"
      visualComponent={<ServiceVisual />}
      accessibilityLabels={{
        regionLabel: "Revenue operations services overview",
      }}
      className="bg-white dark:bg-slate-900 overflow-hidden py-6 sm:py-8 md:py-12"
    />
  );
}
