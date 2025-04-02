'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);
  const [currentYear, setCurrentYear] = useState('');

  // Set current year on client side only to avoid hydration mismatch
  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
  }, []);

  // Add animation on scroll for footer elements
  useEffect(() => {
    const animateFooter = () => {
      const footer = footerRef.current;
      if (!footer) return;
      
      // Get all animatable elements
      const elements = footer.querySelectorAll('.animate-element');
      
      // Apply staggered animation
      elements.forEach((el, index) => {
        setTimeout(() => {
          el.classList.add('animated');
        }, 100 * index);
      });
    };
    
    // Create the observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateFooter();
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
      }
    );
    
    // Start observing the footer
    if (footerRef.current) {
      observer.observe(footerRef.current);
    }
    
    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  return (
    <footer ref={footerRef} className="bg-gradient-to-br from-gray-900 to-gray-800 text-white pt-16 pb-8 relative overflow-hidden">
      {/* Abstract patterns - similar to the ServicesHeader */}
      <div className="absolute inset-0 opacity-5 z-0">
        <div className="absolute w-full h-full" style={{ backgroundImage: 'url("/images/patterns/grid-pattern.svg")', backgroundSize: '30px' }}></div>
      </div>
      
      {/* 3D Geometric Elements */}
      <div className="absolute top-1/4 right-10 w-32 h-32 rounded-xl bg-primary/10 backdrop-blur-sm rotate-12 opacity-20"></div>
      <div className="absolute bottom-1/4 left-10 w-24 h-24 rounded-full bg-accent/10 backdrop-blur-sm opacity-20"></div>
      
      {/* Mesh Grid */}
      <div className="absolute inset-0 z-0 opacity-10" style={{ 
        backgroundImage: `radial-gradient(circle at 30px 30px, rgba(255, 255, 255, 0.2) 2px, transparent 0)`, 
        backgroundSize: '60px 60px' 
      }}></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="animate-element opacity-0 transform translate-y-4 transition-all duration-700 ease-out">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 relative mr-3">
                <Image 
                  src="/images/revelate-spiral-logo.png" 
                  alt="Revelate Logo" 
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-2xl">REVELATE</span>
                <span className="text-xs text-gray-300">OPERATIONS</span>
              </div>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              Revelate Operations transforms your raw data into actionable insights, 
              driving revenue growth and operational excellence through innovative, 
              data-driven solutions.
            </p>
            
            <div className="flex space-x-4 mb-6">
              <a 
                href="https://www.linkedin.com/company/revelateops/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="LinkedIn"
                className="w-10 h-10 bg-white/10 hover:bg-primary rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
          
          {/* Services Links */}
          <div className="animate-element opacity-0 transform translate-y-4 transition-all duration-700 ease-out delay-100">
            <h3 className="text-xl font-semibold mb-6 relative inline-block">
              Services
              <span className="absolute -bottom-1 left-0 w-12 h-1 bg-primary rounded-full"></span>
            </h3>
            
            <ul className="space-y-3">
              <li className="transition-transform hover:translate-x-2 duration-300">
                <Link href="/services#crm" className="text-gray-300 hover:text-white flex items-center">
                  <i className="fas fa-chevron-right text-xs text-primary mr-2"></i>
                  CRM Management
                </Link>
              </li>
              <li className="transition-transform hover:translate-x-2 duration-300">
                <Link href="/services#bi" className="text-gray-300 hover:text-white flex items-center">
                  <i className="fas fa-chevron-right text-xs text-primary mr-2"></i>
                  Business Intelligence
                </Link>
              </li>
              <li className="transition-transform hover:translate-x-2 duration-300">
                <Link href="/services#integration" className="text-gray-300 hover:text-white flex items-center">
                  <i className="fas fa-chevron-right text-xs text-primary mr-2"></i>
                  Data Integration
                </Link>
              </li>
              <li className="transition-transform hover:translate-x-2 duration-300">
                <Link href="/services#lead-gen" className="text-gray-300 hover:text-white flex items-center">
                  <i className="fas fa-chevron-right text-xs text-primary mr-2"></i>
                  Lead Generation
                </Link>
              </li>
              <li className="transition-transform hover:translate-x-2 duration-300">
                <Link href="/services#gtm" className="text-gray-300 hover:text-white flex items-center">
                  <i className="fas fa-chevron-right text-xs text-primary mr-2"></i>
                  GTM Strategy
                </Link>
              </li>
              <li className="transition-transform hover:translate-x-2 duration-300">
                <Link href="/services#retention" className="text-gray-300 hover:text-white flex items-center">
                  <i className="fas fa-chevron-right text-xs text-primary mr-2"></i>
                  Customer Retention
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Company Links */}
          <div className="animate-element opacity-0 transform translate-y-4 transition-all duration-700 ease-out delay-200">
            <h3 className="text-xl font-semibold mb-6 relative inline-block">
              Company
              <span className="absolute -bottom-1 left-0 w-12 h-1 bg-primary rounded-full"></span>
            </h3>
            
            <ul className="space-y-3">
              <li className="transition-transform hover:translate-x-2 duration-300">
                <Link href="/about" className="text-gray-300 hover:text-white flex items-center">
                  <i className="fas fa-chevron-right text-xs text-primary mr-2"></i>
                  About Us
                </Link>
              </li>
              <li className="transition-transform hover:translate-x-2 duration-300">
                <Link href="/approach" className="text-gray-300 hover:text-white flex items-center">
                  <i className="fas fa-chevron-right text-xs text-primary mr-2"></i>
                  Our Process
                </Link>
              </li>
              <li className="transition-transform hover:translate-x-2 duration-300">
                <Link href="/blog" className="text-gray-300 hover:text-white flex items-center">
                  <i className="fas fa-chevron-right text-xs text-primary mr-2"></i>
                  Blog
                </Link>
              </li>
              <li className="transition-transform hover:translate-x-2 duration-300">
                <Link href="/contact" className="text-gray-300 hover:text-white flex items-center">
                  <i className="fas fa-chevron-right text-xs text-primary mr-2"></i>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div className="animate-element opacity-0 transform translate-y-4 transition-all duration-700 ease-out delay-300">
            <h3 className="text-xl font-semibold mb-6 relative inline-block">
              Contact Us
              <span className="absolute -bottom-1 left-0 w-12 h-1 bg-primary rounded-full"></span>
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mr-3">
                  <i className="fas fa-envelope text-primary"></i>
                </div>
                <span className="text-gray-300">info@revelateops.com</span>
              </div>
              
              <div className="flex items-center">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mr-3">
                  <i className="fas fa-calendar text-primary"></i>
                </div>
                <div>
                  <p className="text-gray-300">Available Monday - Friday<br />9:00 AM - 5:00 PM EST</p>
                </div>
              </div>
              
              <Link 
                href="/contact" 
                className="inline-flex items-center mt-2 bg-primary hover:bg-primary-dark text-white py-3 px-6 rounded-full transition-all duration-300 group"
              >
                Get in Touch
                <i className="fas fa-arrow-right ml-2 transition-transform duration-300 group-hover:translate-x-1"></i>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Divider with gradient */}
        <div className="my-10 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
        
        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row md:justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {currentYear} Revelate Operations, LLC. All rights reserved.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
            <Link href="/privacy-policy" className="hover:text-white transition-colors duration-300">
              Privacy Policy
            </Link>
            <span className="text-gray-600">|</span>
            <Link href="/terms-of-service" className="hover:text-white transition-colors duration-300">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
