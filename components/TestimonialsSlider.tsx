'use client';

import { useState, useEffect } from 'react';

interface Testimonial {
  quote: string;
  name: string;
  title: string;
  company: string;
  image?: string;
}

// Empty testimonials array until client approval is received
const testimonials: Testimonial[] = [];

const TestimonialsSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto-rotate testimonials
  useEffect(() => {
    // Only set up auto-rotation if there are testimonials
    if (testimonials.length === 0) return;
    
    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextTestimonial = () => {
    if (isAnimating || testimonials.length === 0) return;
    
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const prevTestimonial = () => {
    if (isAnimating || testimonials.length === 0) return;
    
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const goToTestimonial = (index: number) => {
    if (isAnimating || index === currentIndex || testimonials.length === 0) return;
    
    setIsAnimating(true);
    setCurrentIndex(index);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  // If there are no testimonials, show a placeholder message
  if (testimonials.length === 0) {
    return (
      <div className="relative max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="p-8 text-center">
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Client testimonials coming soon.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative max-w-3xl mx-auto">
      <div className="overflow-hidden">
        <div 
          className="transition-transform duration-500 ease-in-out flex"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {testimonials.map((testimonial, index) => (
            <div key={index} className="w-full flex-shrink-0">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                <div className="p-8">
                  <div className="mb-6">
                    <p className="text-lg text-gray-700 dark:text-gray-300 italic">
                      "{testimonial.quote}"
                    </p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-300 dark:bg-gray-700 rounded-full mr-4 flex items-center justify-center text-gray-500 dark:text-gray-400">
                      {testimonial.image ? (
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold">{testimonial.name}</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {testimonial.title}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Controls */}
      {testimonials.length > 1 && (
        <div className="flex items-center justify-center mt-6">
          <button 
            className="w-10 h-10 rounded-full flex items-center justify-center bg-white dark:bg-gray-700 shadow-md text-gray-700 dark:text-gray-300 mr-4 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            onClick={prevTestimonial}
            aria-label="Previous testimonial"
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          
          <div className="flex space-x-2">
            {testimonials.map((_, index) => (
              <button 
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentIndex === index 
                    ? 'bg-primary' 
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                }`}
                onClick={() => goToTestimonial(index)}
                aria-label={`Go to testimonial ${index + 1}`}
                aria-current={currentIndex === index}
              ></button>
            ))}
          </div>
          
          <button 
            className="w-10 h-10 rounded-full flex items-center justify-center bg-white dark:bg-gray-700 shadow-md text-gray-700 dark:text-gray-300 ml-4 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            onClick={nextTestimonial}
            aria-label="Next testimonial"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default TestimonialsSlider;
