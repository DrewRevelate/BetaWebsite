'use client';

import { useEffect, useRef, useCallback, memo } from "react";
import Link from "next/link";
import Image from "next/image";

export const Hero = memo(function Hero() {
  const countersAnimated = useRef(false);

  // Animate counter from 0 to target value with performance optimizations
  const animateCounter = useCallback((element: HTMLElement, target: number) => {
    if (countersAnimated.current) return;
    
    let startTime: number | null = null;
    const duration = 2000; // 2 seconds
    
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);
      const currentValue = Math.floor(easedProgress * target);
      
      element.textContent = currentValue.toString();
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        element.textContent = target.toString();
      }
    };
    
    window.requestAnimationFrame(step);
  }, []);
  
  // Easing function for smoother animation
  const easeOutCubic = (x: number): number => {
    return 1 - Math.pow(1 - x, 3);
  };

  // Initialize counter animations with IntersectionObserver
  useEffect(() => {
    const metrics = document.querySelectorAll('.metric');
    if (!metrics.length) return;
    
    const observer = new IntersectionObserver((entries) => {
      if (countersAnimated.current) return;
      
      const isIntersecting = entries.some(entry => entry.isIntersecting);
      
      if (isIntersecting) {
        metrics.forEach(metric => {
          const counter = metric.querySelector('.counter') as HTMLElement;
          if (counter) {
            const target = parseInt(metric.getAttribute('data-value') || '0');
            animateCounter(counter, target);
          }
        });
        
        countersAnimated.current = true;
        observer.disconnect();
      }
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -10% 0px'
    });
    
    metrics.forEach(metric => observer.observe(metric));
    
    return () => observer.disconnect();
  }, [animateCounter]);

  return (
    <section 
      className="min-h-screen flex items-center pt-24 pb-20 relative overflow-hidden bg-white dark:bg-gray-900 dark:text-white"
      aria-label="Hero section"
    >
      {/* Simple background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 dark:bg-primary/10 rounded-bl-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-secondary/5 dark:bg-secondary/10 rounded-tr-[100px]"></div>
      </div>
      <div className="container mx-auto px-4 z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="hero-content max-w-xl">
            <span className="inline-block text-sm font-semibold tracking-wider text-primary uppercase mb-3 relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-10 after:bg-primary">
              Data-Driven SaaS Consulting
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              Transform Raw Data Into <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent animate-gradient">Strategic Wealth</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
              Stop drowning in data without insights. We convert your fragmented data landscape into a unified system driving revenue growth and operational excellence.
            </p>
            
            <div className="flex flex-wrap gap-6 mb-6">
              <div className="metric" data-value="40" aria-label="40% Average Revenue Growth">
                <span className="text-4xl font-bold text-primary dark:text-primary-light"><span className="counter" aria-hidden="true">0</span>%</span>
                <span className="block text-sm text-gray-500 dark:text-gray-400">Average Revenue Growth</span>
              </div>
              <div className="metric" data-value="85" aria-label="85% Increase in Data Utilization">
                <span className="text-4xl font-bold text-primary dark:text-primary-light"><span className="counter" aria-hidden="true">0</span>%</span>
                <span className="block text-sm text-gray-500 dark:text-gray-400">Increase in Data Utilization</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/contact" 
                className="px-6 py-3 bg-primary text-white font-semibold rounded-full shadow-lg hover:bg-primary-dark transition transform hover:-translate-y-1 hover:shadow-xl"
                aria-label="Get Started with Revelate Operations"
              >
                Get Started
              </Link>
              <Link 
                href="/services" 
                className="px-6 py-3 border-2 border-primary text-primary dark:text-primary-light font-semibold rounded-full hover:bg-primary hover:text-white transition transform hover:-translate-y-1"
                aria-label="Explore our services"
              >
                Explore Services
              </Link>
            </div>
          </div>
          
          <div className="relative flex justify-center items-center">
            <div className="relative z-10 animate-float">
              <Image 
                src="/images/dashboard-illustration.svg" 
                alt="Data Dashboard Visualization showing analytics charts and business metrics" 
                width={600} 
                height={500}
                className="drop-shadow-2xl"
                loading="eager"
                priority
              />
            </div>
            <div className="absolute w-full h-full bg-primary/5 dark:bg-primary/10 rounded-xl z-0" aria-hidden="true"></div>
          </div>
        </div>
      </div>
      
      {/* Simplified bottom border */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-100 dark:bg-gray-800" aria-hidden="true"></div>
    </section>
  );
});
