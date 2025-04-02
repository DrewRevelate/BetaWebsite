'use client';

import { useState } from 'react';
import ServiceTestimonialsSlider from './ServiceTestimonialsSlider';
import { testimonials } from '@/lib/servicesData';

const ServicesTestimonialSection = () => {
  const [activeServiceTab, setActiveServiceTab] = useState<'crm' | 'bi' | 'integration' | 'retention' | 'general'>('general');
  
  // If no testimonials, don't render the section
  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-dark dark:to-dark-light opacity-80 z-0"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/20 dark:bg-blue-900/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl z-0"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200/20 dark:bg-purple-900/10 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl z-0"></div>
      
      {/* Mesh Grid Background */}
      <div className="absolute inset-0 z-0 opacity-20" style={{ 
        backgroundImage: `radial-gradient(circle at 20px 20px, rgba(67, 97, 238, 0.05) 2px, transparent 0)`, 
        backgroundSize: '40px 40px' 
      }}></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 mb-4 bg-blue-100/50 dark:bg-blue-900/30 backdrop-blur-md px-4 py-2 rounded-full">
            <div className="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium tracking-wide text-blue-700 dark:text-blue-300 uppercase">Client Testimonials</span>
          </div>
          <h2 className="text-3xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-lg max-w-3xl mx-auto text-gray-600 dark:text-gray-300 mb-6">
            Real results from businesses that transformed their operations with our help
          </p>
          
          {/* Service type filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <button 
              className={`px-4 py-2 mx-1 my-1 rounded-full transition-all backdrop-blur-md ${
                activeServiceTab === 'general' 
                ? 'bg-blue-600 text-white shadow-lg border border-blue-400/50' 
                : 'bg-white/70 dark:bg-gray-800/40 hover:bg-white/90 dark:hover:bg-gray-700/60 border border-blue-100/50 dark:border-blue-600/20'
              }`}
              onClick={() => setActiveServiceTab('general')}
            >
              All Services
            </button>
            <button 
              className={`px-4 py-2 mx-1 my-1 rounded-full transition-all backdrop-blur-md ${
                activeServiceTab === 'crm' 
                ? 'bg-blue-600 text-white shadow-lg border border-blue-400/50' 
                : 'bg-white/70 dark:bg-gray-800/40 hover:bg-white/90 dark:hover:bg-gray-700/60 border border-blue-100/50 dark:border-blue-600/20'
              }`}
              onClick={() => setActiveServiceTab('crm')}
            >
              CRM Management
            </button>
            <button 
              className={`px-4 py-2 mx-1 my-1 rounded-full transition-all backdrop-blur-md ${
                activeServiceTab === 'bi' 
                ? 'bg-blue-600 text-white shadow-lg border border-blue-400/50' 
                : 'bg-white/70 dark:bg-gray-800/40 hover:bg-white/90 dark:hover:bg-gray-700/60 border border-blue-100/50 dark:border-blue-600/20'
              }`}
              onClick={() => setActiveServiceTab('bi')}
            >
              Business Intelligence
            </button>
            <button 
              className={`px-4 py-2 mx-1 my-1 rounded-full transition-all backdrop-blur-md ${
                activeServiceTab === 'integration' 
                ? 'bg-blue-600 text-white shadow-lg border border-blue-400/50' 
                : 'bg-white/70 dark:bg-gray-800/40 hover:bg-white/90 dark:hover:bg-gray-700/60 border border-blue-100/50 dark:border-blue-600/20'
              }`}
              onClick={() => setActiveServiceTab('integration')}
            >
              Data Integration
            </button>
            <button 
              className={`px-4 py-2 mx-1 my-1 rounded-full transition-all backdrop-blur-md ${
                activeServiceTab === 'retention' 
                ? 'bg-blue-600 text-white shadow-lg border border-blue-400/50' 
                : 'bg-white/70 dark:bg-gray-800/40 hover:bg-white/90 dark:hover:bg-gray-700/60 border border-blue-100/50 dark:border-blue-600/20'
              }`}
              onClick={() => setActiveServiceTab('retention')}
            >
              Customer Retention
            </button>
          </div>
        </div>
        
        {/* Testimonials slider */}
        <ServiceTestimonialsSlider serviceType={activeServiceTab} />
      </div>
    </section>
  );
};

export default ServicesTestimonialSection;
