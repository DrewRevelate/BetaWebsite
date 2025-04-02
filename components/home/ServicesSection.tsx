'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';

interface ServiceProps {
  title: string;
  description: string;
  icon: string;
  link: string;
}

interface ServicesSectionProps {
  services: ServiceProps[];
}

export function ServicesSection({ services }: ServicesSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };
  
  return (
    <section 
      ref={sectionRef}
      className="py-24 bg-gray-50 dark:bg-gray-900 overflow-hidden"
      id="services"
    >
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm font-semibold rounded-full mb-6">
            OUR EXPERTISE
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-900 via-indigo-800 to-gray-900 dark:from-white dark:via-indigo-200 dark:to-white bg-clip-text text-transparent">
              Comprehensive Data Services
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We optimize your operations and drive sustainable growth through data-driven strategies
          </p>
        </motion.div>
        
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {services.map((service, index) => (
            <motion.div 
              key={index} 
              className="service-card group relative bg-white dark:bg-gradient-to-br dark:from-[#1a2033] dark:to-[#141927] p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700/50"
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white dark:from-indigo-900/15 dark:to-purple-900/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Corner decorative elements */}
              <div 
                className="absolute -top-10 -right-10 w-20 h-20 bg-indigo-50 dark:bg-indigo-600/20 rounded-full transform scale-0 group-hover:scale-100 transition-all duration-500 ease-out"
                style={{ transitionDelay: '50ms' }}
              ></div>
              <div 
                className="absolute -bottom-10 -left-10 w-16 h-16 bg-purple-50 dark:bg-purple-600/20 rounded-full transform scale-0 group-hover:scale-100 transition-all duration-500 ease-out"
                style={{ transitionDelay: '100ms' }}
              ></div>
              <div 
                className="hidden dark:block absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-indigo-500/40 to-purple-500/40 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
              ></div>
              
              <div className="relative z-10">
                {/* Icon with improved styling */}
                <div className="mb-8 w-16 h-16 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-600/30 dark:to-purple-600/30 rounded-2xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300 border border-transparent dark:border-indigo-500/20">
                  <i className={`text-2xl ${service.icon} text-indigo-600 dark:text-indigo-300`} aria-hidden="true"></i>
                </div>
                
                {/* Content with better typographic hierarchy */}
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-indigo-700 dark:group-hover:text-indigo-400 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-8 min-h-[4.5rem] text-sm leading-relaxed">
                  {service.description}
                </p>
                
                {/* Enhanced call to action */}
                <Link 
                  href={service.link}
                  className="relative inline-flex items-center text-indigo-600 dark:text-indigo-400 font-medium transition-all duration-200"
                  aria-label={`Learn more about ${service.title}`}
                >
                  <span className="relative z-10">Explore Service</span>
                  <span className="ml-2 w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center transform group-hover:translate-x-1 transition-transform duration-300">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Improved CTA section */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Link 
            href="/services"
            className="inline-flex items-center px-8 py-4 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 group"
          >
            <span>View All Services</span>
            <span className="relative ml-2 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-3.5 w-3.5 text-white transform group-hover:translate-x-5 transition-all duration-300" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-3.5 w-3.5 text-white absolute -left-6 transform group-hover:translate-x-5 transition-all duration-300" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </Link>
        </motion.div>
      </div>
      
      {/* Subtle divider wave */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden" style={{ zIndex: 1 }}>
        <svg className="w-full h-12 md:h-16" preserveAspectRatio="none" viewBox="0 0 1440 100" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,50 C200,100 400,0 600,50 C800,100 1000,0 1200,50 C1300,75 1440,60 1440,60 L1440,100 L0,100 Z" className="fill-white dark:fill-gray-800"></path>
        </svg>
      </div>
    </section>
  );
}
