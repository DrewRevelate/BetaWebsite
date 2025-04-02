'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface Testimonial {
  quote: string;
  name: string;
  title: string;
  company: string;
  position: string;
  image?: string;
  serviceType: 'crm' | 'bi' | 'integration' | 'retention' | 'general';
}

// Empty testimonials array until client permission is received
const testimonials: Testimonial[] = [];

interface ServiceTestimonialsSliderProps {
  serviceType?: 'crm' | 'bi' | 'integration' | 'retention' | 'general';
}

const ServiceTestimonialsSlider = ({
  serviceType = 'general'
}: ServiceTestimonialsSliderProps) => {
  // Filter testimonials by service type or get general ones
  const filteredTestimonials = testimonials.filter(
    test => test.serviceType === serviceType || test.serviceType === 'general' || serviceType === 'general'
  );

  // If no testimonials, return a placeholder
  if (filteredTestimonials.length === 0) {
    return (
      <div className="bg-white/70 dark:bg-gray-800/40 backdrop-blur-md rounded-2xl shadow-xl p-8 text-center border-2 border-blue-100/80 dark:border-blue-600/30">
        <p className="text-gray-600 dark:text-gray-300">
          Client testimonials coming soon.
        </p>
      </div>
    );
  }

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Set up auto-rotation
  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        goToNextSlide();
      }, 6000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentIndex, isPaused]);

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentIndex) return;

    setIsAnimating(true);
    setCurrentIndex(index);

    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const goToPrevSlide = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? filteredTestimonials.length - 1 : prevIndex - 1
    );

    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const goToNextSlide = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === filteredTestimonials.length - 1 ? 0 : prevIndex + 1
    );

    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  // Add pause on hover
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  // For accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      goToPrevSlide();
    } else if (e.key === 'ArrowRight') {
      goToNextSlide();
    }
  };

  // For swipe navigation on mobile
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50; // minimum distance to be considered as swipe

    if (diff > threshold) {
      // Swipe left, go to next
      goToNextSlide();
    } else if (diff < -threshold) {
      // Swipe right, go to previous
      goToPrevSlide();
    }
  };

  // Add controls for larger screens
  const showControls = filteredTestimonials.length > 1;

  return (
    <div
      className="testimonial-carousel relative rounded-xl overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Testimonials carousel"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className={`transition-transform duration-500 ${isAnimating ? 'ease-out' : 'ease-in-out'} flex`}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {filteredTestimonials.map((testimonial, index) => (
          <div
            key={index}
            className="w-full flex-shrink-0 px-1"
          >
            <div className="p-8">
              <div className="mb-6 relative">
                <i className="fas fa-quote-left absolute -top-2 -left-1 text-3xl text-primary opacity-20"></i>
                <p className="text-lg text-gray-700 dark:text-gray-300 italic relative z-10 pl-6">
                  {testimonial.quote}
                </p>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-300 dark:bg-gray-700 rounded-full mr-4 flex items-center justify-center text-gray-500 dark:text-gray-400 overflow-hidden">
                  {testimonial.image ? (
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
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
                    {testimonial.position}, {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showControls && (
        <div className="flex items-center justify-center mt-6">
          <button
            className="w-10 h-10 rounded-full flex items-center justify-center bg-white dark:bg-gray-700 shadow-md text-gray-700 dark:text-gray-300 mr-4 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            onClick={goToPrevSlide}
            aria-label="Previous testimonial"
          >
            <i className="fas fa-chevron-left"></i>
          </button>

          <div className="flex space-x-2">
            {filteredTestimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentIndex === index
                    ? 'bg-primary scale-125'
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to testimonial ${index + 1}`}
                aria-current={currentIndex === index}
              ></button>
            ))}
          </div>

          <button
            className="w-10 h-10 rounded-full flex items-center justify-center bg-white dark:bg-gray-700 shadow-md text-gray-700 dark:text-gray-300 ml-4 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            onClick={goToNextSlide}
            aria-label="Next testimonial"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      )}

      {/* Progress bar for auto-rotation */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700">
        <div
          className="bg-primary h-full transition-all duration-300 ease-linear"
          style={{
            width: `${(currentIndex / (filteredTestimonials.length - 1)) * 100}%`,
            animation: isPaused ? 'none' : 'progress 6s linear infinite'
          }}
        ></div>
      </div>
    </div>
  );
};

export default ServiceTestimonialsSlider;
