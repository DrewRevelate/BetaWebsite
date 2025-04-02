'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useInView } from 'framer-motion';

interface Testimonial {
  quote: string;
  author: string;
  position: string;
  company: string;
  imageUrl?: string;
  rating: number;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  
  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };
  
  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };
  
  // Auto advance testimonials every 8 seconds
  React.useEffect(() => {
    if (testimonials.length <= 1) return;
    
    const timer = setInterval(() => {
      handleNext();
    }, 8000);
    
    return () => clearInterval(timer);
  }, [activeIndex, testimonials.length]);
  
  return (
    <section 
      ref={sectionRef}
      className="py-24 bg-white dark:bg-gray-900 overflow-hidden"
      id="testimonials"
    >
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-3 py-1 bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light text-sm font-semibold rounded-full mb-4">
            CLIENT SUCCESS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 relative inline-block">
            What Our Clients Say
            <div className="absolute left-0 bottom-0 w-full h-1 bg-gradient-to-r from-primary/50 to-secondary/50 rounded-full transform -translate-y-2"></div>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Don't just take our word for it. Hear directly from businesses we've helped transform.
          </p>
        </motion.div>
        
        <div className="max-w-5xl mx-auto relative">
          {/* Testimonial slider */}
          <div className="mb-8 relative">
            <div className="relative min-h-[360px] md:min-h-[300px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 md:p-10 shadow-lg relative z-10"
                >
                  {/* Background gradient accent */}
                  <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/10 dark:bg-primary/20 rounded-full opacity-70 z-0"></div>
                  <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-secondary/10 dark:bg-secondary/20 rounded-full opacity-70 z-0"></div>
                  
                  {/* Rating stars */}
                  <div className="flex mb-6 relative z-10">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i} 
                        className={`w-5 h-5 ${i < testimonials[activeIndex].rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  
                  {/* Quote */}
                  <blockquote className="relative z-10">
                    <div className="absolute -top-2 -left-2 text-primary/20 dark:text-primary/30">
                      <svg className="w-10 h-10 transform -scale-x-100" fill="currentColor" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 8c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 14c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6zm22-8c0-4.4-3.6-8-8-8s-8 3.6-8 8 3.6 8 8 8 8-3.6 8-8zm-8 6c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6z" />
                      </svg>
                    </div>
                    <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-200 leading-relaxed mb-6 mt-2 pl-7">
                      {testimonials[activeIndex].quote}
                    </p>
                  </blockquote>
                  
                  {/* Author info */}
                  <div className="flex items-center gap-4 relative z-10">
                    <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex-shrink-0 relative">
                      {testimonials[activeIndex].imageUrl ? (
                        <Image
                          src={testimonials[activeIndex].imageUrl}
                          alt={testimonials[activeIndex].author}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary text-xl font-bold">
                          {testimonials[activeIndex].author.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 dark:text-white">
                        {testimonials[activeIndex].author}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {testimonials[activeIndex].position}, {testimonials[activeIndex].company}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          
          {/* Navigation controls */}
          <div className="flex justify-between items-center">
            {/* Pagination indicators */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? 'bg-primary w-6'
                      : 'bg-gray-300 dark:bg-gray-700 hover:bg-primary/50'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            {/* Previous/Next buttons */}
            <div className="flex space-x-3">
              <button
                onClick={handlePrev}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-primary/10 dark:hover:bg-primary/20 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light transition-colors duration-300"
                aria-label="Previous testimonial"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={handleNext}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-primary/10 dark:hover:bg-primary/20 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light transition-colors duration-300"
                aria-label="Next testimonial"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Client logos */}
        <motion.div 
          className="mt-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Trusted by innovative companies</h3>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-70">
            {/* Client logos would go here - using placeholders */}
            {[1, 2, 3, 4, 5].map((i) => (
              <div 
                key={i}
                className="grayscale hover:grayscale-0 transition-all duration-300 hover:opacity-100"
              >
                <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
                  <span className="text-gray-500 dark:text-gray-400 font-semibold">CLIENT {i}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
