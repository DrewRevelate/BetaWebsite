'use client';

import { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import BaseHero from './BaseHero';
import OptimizedImage from '@/components/ui/OptimizedImage';

export default function AboutHero() {
  const [inViewRef, setInViewRef] = useState<HTMLDivElement | null>(null);
  const inView = useInView(inViewRef, { once: true, amount: 0.3 });
  
  return (
    <div ref={setInViewRef}>
      <BaseHero
        className="pt-24 pb-32"
        tagline="Our Story & People"
        taglineBadgeColor="bg-white/10 backdrop-blur-sm border border-white/20"
        title={
          <>
            Leadership That <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-200 via-indigo-200 to-blue-200 inline-block">Empowers</span> Your Success
          </>
        }
        description="Meet the team behind Revelate Operations who are committed to understanding your business challenges and transforming them into opportunities for growth."
        primaryCTA={{
          text: "Meet Our Team",
          href: "#team"
        }}
        secondaryCTA={{
          text: "Contact Us",
          href: "/contact"
        }}
        socialProof={
          <div className="mt-8">
            <p className="text-white/80 text-sm font-medium mb-4">TRUSTED BY INDUSTRY LEADERS</p>
            <div className="flex flex-wrap items-center gap-3">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-sky-500/20 backdrop-blur-sm px-4 py-2 rounded-md"
              >
                <div className="h-8 relative flex items-center justify-center">
                  <span className="text-white font-semibold">Enterprise Solutions</span>
                </div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-indigo-500/20 backdrop-blur-sm px-4 py-2 rounded-md"
              >
                <div className="h-8 relative flex items-center justify-center">
                  <span className="text-white font-semibold">Strategic Advisory</span>
                </div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-blue-500/20 backdrop-blur-sm px-4 py-2 rounded-md"
              >
                <div className="h-8 relative flex items-center justify-center">
                  <span className="text-white font-semibold">Data Architecture</span>
                </div>
              </motion.div>
            </div>
          </div>
        }
        backgroundColorClass="bg-primary text-white"
        backgroundPattern="circles"
        dividerType="wave"
        textColorClass="text-white"
        children={
          <div className="relative w-full max-w-lg">
            <div className="absolute -inset-4 bg-white/5 backdrop-blur-sm rounded-2xl"></div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="relative z-30 w-full rounded-lg overflow-hidden shadow-2xl"
            >
              <div className="relative bg-white dark:bg-gray-800 p-6 border-2 border-blue-200 dark:border-blue-800 rounded-xl">
                <div className="flex justify-between items-center mb-6">
                  <div className="relative">
                    <h3 className="text-primary dark:text-primary-light font-bold text-xl">Our Leadership Approach</h3>
                  </div>
                </div>
                
                {/* Team Values & Approach - Grid layout */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    {
                      title: 'Team Collaboration',
                      desc: 'We work as an extension of your team, ensuring seamless integration.',
                      bgClass: 'bg-indigo-100 dark:bg-indigo-900/50',
                      borderClass: 'border-indigo-100 dark:border-indigo-800'
                    },
                    {
                      title: 'Strategic Vision',
                      desc: 'We focus on long-term growth while delivering immediate value.',
                      bgClass: 'bg-sky-100 dark:bg-sky-900/50',
                      borderClass: 'border-sky-100 dark:border-sky-800'
                    },
                    {
                      title: 'Trust & Partnership',
                      desc: 'We build relationships based on trust and genuine commitment.',
                      bgClass: 'bg-blue-100 dark:bg-blue-900/50',
                      borderClass: 'border-blue-100 dark:border-blue-800'
                    },
                    {
                      title: 'Empowering Growth',
                      desc: 'We enable your team with knowledge and tools for success.',
                      bgClass: 'bg-indigo-100 dark:bg-indigo-900/50',
                      borderClass: 'border-indigo-100 dark:border-indigo-800'
                    }
                  ].map((item, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                      transition={{ duration: 0.5, delay: 0.4 + (i * 0.1) }}
                      className={`bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md border ${item.borderClass}`}
                    >
                      <div className={`w-10 h-10 ${item.bgClass} rounded-full flex items-center justify-center mb-3`}>
                        <svg className="w-5 h-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                          {i === 0 && <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 005 10a6 6 0 0012 0c0-.35-.035-.691-.1-1.021A5 5 0 0010 11z" clipRule="evenodd" />}
                          {i === 1 && <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />}
                          {i === 2 && <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />}
                          {i === 3 && <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />}
                        </svg>
                      </div>
                      <h4 className="text-gray-800 dark:text-white font-semibold mb-2">{item.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
                
                {/* Founder quote */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-100 dark:border-blue-800 rounded-lg"
                >
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-white dark:bg-gray-700 shadow-md rounded-full flex items-center justify-center mr-4 border border-blue-100 dark:border-blue-700">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                      </svg>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 italic text-sm">"Our success is measured by your success. We're committed to building lasting relationships that drive real business value."</p>
                  </div>
                  <div className="ml-16 mt-2 text-primary dark:text-primary-light font-medium">
                    - Drew, Founder
                  </div>
                </motion.div>
              </div>
              
              {/* Subtle shadow effect */}
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-4/5 h-4 bg-blue-500/20 blur-xl rounded-full"></div>
            </motion.div>
          </div>
        }
      />
    </div>
  );
}
