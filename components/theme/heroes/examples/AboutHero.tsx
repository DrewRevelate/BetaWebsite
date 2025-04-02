'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import HeroSystem from '../HeroSystem';

// Modern team visual that aligns with brand guidelines
const TeamVisual = () => {
  const [activeValue, setActiveValue] = useState(0);
  const companyValues = [
    { name: 'Precision', description: 'Meticulous, accurate work with attention to detail' },
    { name: 'Transparency', description: 'Building trust through open communication' },
    { name: 'Innovation', description: 'Continuously exploring new approaches to solve complex challenges' },
    { name: 'Expertise', description: 'Specialized knowledge and experience in every engagement' },
    { name: 'Results-Focus', description: 'Measuring success by tangible outcomes' }
  ];
  
  // Auto-rotate through values
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveValue((prev) => (prev + 1) % companyValues.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [companyValues.length]);

  return (
    <div className="relative h-[500px] w-full flex items-center justify-center">
      {/* Professional gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 mix-blend-normal"></div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 z-0 opacity-10" style={{ 
          backgroundImage: `radial-gradient(circle at 20px 20px, rgba(59, 85, 227, 0.1) 1px, transparent 0)`, 
          backgroundSize: '40px 40px' 
        }}></div>
        
        {/* Modern flowing shapes */}
        <svg viewBox="0 0 800 800" className="absolute w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b55e3" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#6a0dad" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="gradient2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#6a0dad" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#f72585" stopOpacity="0.05" />
            </linearGradient>
          </defs>
          <motion.path
            d="M0,400 C100,300 200,600 400,500 C600,400 700,100 800,300 L800,800 L0,800 Z"
            fill="url(#gradient1)"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
          <motion.path
            d="M0,500 C150,450 300,650 500,600 C700,550 750,450 800,400 L800,800 L0,800 Z"
            fill="url(#gradient2)"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
          />
        </svg>
      </div>
      
      {/* Team Visual Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Abstract team representation with brand colors */}
        <div className="w-64 h-64 relative mb-8">
          <motion.div 
            className="absolute w-32 h-32 rounded-xl bg-gradient-to-br from-primary to-primary-dark dark:from-primary-light dark:to-primary opacity-80"
            initial={{ scale: 0, x: -50, y: -50, rotate: -5 }}
            animate={{ scale: 1, x: 0, y: 0, rotate: 5 }}
            transition={{ duration: 0.8, type: "spring" }}
          />
          <motion.div 
            className="absolute top-6 right-0 w-24 h-24 rounded-xl bg-gradient-to-br from-secondary to-purple-700 dark:from-secondary dark:to-purple-600 opacity-80"
            initial={{ scale: 0, x: 50, y: -50, rotate: 5 }}
            animate={{ scale: 1, x: 0, y: 0, rotate: -5 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
          />
          <motion.div 
            className="absolute bottom-0 left-4 w-28 h-28 rounded-xl bg-gradient-to-br from-blue-500 to-sky-500 dark:from-blue-500 dark:to-sky-400 opacity-80"
            initial={{ scale: 0, x: -50, y: 50, rotate: 8 }}
            animate={{ scale: 1, x: 0, y: 0, rotate: -8 }}
            transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
          />
          <motion.div 
            className="absolute bottom-10 right-2 w-20 h-20 rounded-xl bg-gradient-to-br from-accent to-pink-600 dark:from-accent dark:to-pink-500 opacity-80"
            initial={{ scale: 0, x: 50, y: 50, rotate: -8 }}
            animate={{ scale: 1, x: 0, y: 0, rotate: 8 }}
            transition={{ duration: 0.8, delay: 0.6, type: "spring" }}
          />
          
          {/* Central logo element */}
          <motion.div 
            className="absolute top-1/2 left-1/2 w-20 h-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-xl flex items-center justify-center z-10"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <motion.div
              className="w-12 h-12 relative"
              initial={{ opacity: 0, rotate: -30 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              {/* Simple spiral icon representing "Revelate" */}
              <svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
                <path 
                  d="M25,10 C35,10 40,15 40,25 C40,35 35,40 25,40 C15,40 10,35 10,25" 
                  fill="none" 
                  stroke="#3b55e3" 
                  strokeWidth="3" 
                  strokeLinecap="round" 
                  className="dark:stroke-primary-light"
                />
                <circle cx="10" cy="25" r="3" fill="#3b55e3" className="dark:fill-primary-light" />
              </svg>
            </motion.div>
          </motion.div>
          
          {/* Connection lines */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 256 256">
            <motion.path
              d="M128,128 L64,64 M128,128 L192,64 M128,128 L64,192 M128,128 L192,192"
              stroke="#3b55e3"
              strokeOpacity="0.3"
              strokeWidth="1"
              strokeDasharray="5,5"
              className="dark:stroke-primary-light"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, delay: 1 }}
            />
          </svg>
        </div>
        
        {/* Values showcase - modernized with brand colors */}
        <div className="text-center h-28">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeValue}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md px-8 py-4 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                <span className="text-primary dark:text-primary-light">{companyValues[activeValue].name}</span>
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {companyValues[activeValue].description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Value indicators - using brand colors */}
        <div className="flex space-x-3 mt-6">
          {companyValues.map((_, index) => (
            <button
              key={index}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                index === activeValue 
                  ? 'bg-primary dark:bg-primary-light scale-125' 
                  : 'bg-gray-300 dark:bg-gray-600'
              }`}
              onClick={() => setActiveValue(index)}
              aria-label={`Show value ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Modern company journey visualization
const CompanyJourney = () => {
  return (
    <div className="relative mt-16">
      {/* Timeline track */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-primary via-indigo-500 to-secondary dark:from-primary-light dark:via-indigo-400 dark:to-secondary"></div>
      
      <div className="relative z-10 grid gap-8 md:grid-cols-3">
        {/* Foundation stage */}
        <motion.div 
          className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-6 shadow-lg relative border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-primary dark:bg-primary-light shadow-lg flex items-center justify-center">
            <span className="text-white dark:text-gray-900 text-sm font-bold">1</span>
          </div>
          <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Foundation</h4>
          <p className="text-gray-600 dark:text-gray-300">
            Established with a mission to transform how businesses harness their operational data for strategic advantage
          </p>
        </motion.div>
        
        {/* Growth stage */}
        <motion.div 
          className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-6 shadow-lg relative md:mt-12 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-indigo-500 dark:bg-indigo-400 shadow-lg flex items-center justify-center">
            <span className="text-white dark:text-gray-900 text-sm font-bold">2</span>
          </div>
          <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Growth</h4>
          <p className="text-gray-600 dark:text-gray-300">
            Expanded our expertise and methodology to deliver comprehensive revenue operations solutions for enterprise clients
          </p>
        </motion.div>
        
        {/* Innovation stage */}
        <motion.div 
          className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-6 shadow-lg relative border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-secondary dark:bg-secondary shadow-lg flex items-center justify-center">
            <span className="text-white dark:text-gray-900 text-sm font-bold">3</span>
          </div>
          <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Today</h4>
          <p className="text-gray-600 dark:text-gray-300">
            Leading the industry with precision technology integration and data-driven insights that deliver measurable business impact
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default function AboutHero() {
  return (
    <HeroSystem 
      tagline="About Revelate Operations"
      title={
        <>
          Transforming Revenue Operations Through <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary dark:from-primary-light dark:to-secondary">Data Innovation</span>
        </>
      }
      description="We transform complex revenue operations challenges into strategic advantages through data-driven insights and precision technology integration."
      primaryCTA={{
        text: "Meet Our Team",
        href: "#team",
        variant: "primary"
      }}
      secondaryCTA={{
        text: "Our Approach",
        href: "/approach",
        variant: "outline"
      }}
      layout="stacked"
      theme="professional"
      animation="reveal"
      background="none"
      badge="floating"
      pageContext="about"
      purpose="branding"
      visualComponent={<TeamVisual />}
      footerElements={<CompanyJourney />}
      accessibilityLabels={{
        regionLabel: "About Revelate Operations",
      }}
      className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800"
    />
  );
}
