'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import OptimizedImage from '@/components/ui/OptimizedImage';

interface ExpertisePoint {
  title: string;
  description: string;
  icon: string;
}

interface ExpertiseSectionProps {
  expertisePoints: ExpertisePoint[];
}

export function ExpertiseSection({ expertisePoints }: ExpertiseSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };
  
  return (
    <section 
      ref={sectionRef}
      className="py-24 bg-gray-50 dark:bg-gray-800 overflow-hidden"
      id="expertise"
    >
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side: Image and visualization */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative z-10">
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/10 dark:bg-primary/20 rounded-full mix-blend-multiply dark:mix-blend-screen"></div>
              <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-secondary/10 dark:bg-secondary/20 rounded-full mix-blend-multiply dark:mix-blend-screen"></div>
              
              <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">Data Flow Analysis</h3>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  </div>
                </div>
                
                <OptimizedImage
                  src="/images/data-flow-diagram.svg"
                  alt="Data Flow Visualization"
                  width={500}
                  height={400}
                  className="rounded-lg mb-6"
                  placeholderType="shimmer"
                  loadingStrategy="lazy"
                  sizes="(max-width: 768px) 100vw, 500px"
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">Data Quality Score</h4>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-primary dark:text-primary-light">94.7%</span>
                      <span className="text-green-500 text-sm flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                        +12.4%
                      </span>
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">Efficiency Rating</h4>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-secondary dark:text-secondary-light">87.2%</span>
                      <span className="text-green-500 text-sm flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                        +8.9%
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Code-like element */}
                <div className="mt-6 bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-hidden">
                  <div className="flex items-center mb-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                    <span className="text-green-400">Connection established</span>
                  </div>
                  <div className="opacity-70">
                    <span className="text-blue-400">import</span> <span className="text-green-400">DataPipeline</span> <span className="text-blue-400">from</span> <span className="text-yellow-400">'revelate/core'</span>;<br />
                    <br />
                    <span className="text-purple-400">const</span> pipeline = <span className="text-blue-400">new</span> <span className="text-green-400">DataPipeline</span>();<br />
                    pipeline.<span className="text-blue-400">connect</span>(<span className="text-yellow-400">'salesforce'</span>);<br />
                    pipeline.<span className="text-blue-400">transform</span>(data =&gt; data.<span className="text-blue-400">optimize</span>());<br />
                    <span className="text-purple-400">const</span> result = <span className="text-blue-400">await</span> pipeline.<span className="text-blue-400">analyze</span>();<br />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Right side: Expertise points */}
          <div>
            <motion.div 
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-3 py-1 bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light text-sm font-semibold rounded-full mb-4">
                OUR EXPERTISE
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Data Mastery for Business Growth
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Our data experts bring decades of experience helping SaaS companies overcome complex data challenges and achieve remarkable growth.
              </p>
            </motion.div>
            
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="space-y-8"
            >
              {expertisePoints.map((point, index) => (
                <motion.div 
                  key={index}
                  variants={itemVariants}
                  className="flex gap-5"
                >
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary dark:text-primary-light">
                    <i className={`text-2xl ${point.icon}`} aria-hidden="true"></i>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-100">
                      {point.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {point.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            {/* CTA Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-12 bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center text-green-600 dark:text-green-400 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">Ready to transform your data strategy?</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Schedule a free consultation with our data experts to discuss your specific needs.
                  </p>
                  <a 
                    href="/contact"
                    className="inline-flex items-center text-primary dark:text-primary-light font-semibold"
                  >
                    <span>Book a consultation</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
