import Link from 'next/link';
import { ArrowRight, CheckCircle, Zap, TrendingUp, Shield } from 'lucide-react';
import type { Metadata } from 'next';
import PerformanceLayout from '@/components/PerformanceLayout';
import ServicesClientComponent from './ServicesClientComponent';
import ServicesGrid from './ServicesGrid';
import ServicesStatistics from './ServicesStatistics';
import AlaCarteServicesSection from './AlaCarteServicesSection';

import ServicesTestimonialSection from './ServicesTestimonialSection';

export const metadata: Metadata = {
  title: 'Enterprise Revenue Operations | Revelate Operations',
  description: 'Transform complex revenue challenges into strategic advantages through data-driven insights and precision technology integration.',
};

export default function ServicesPage() {
  return (
    <PerformanceLayout 
      enableWebVitals={true}
      enableMobileOptimization={true}
      primeCache={true}
      optimizeImages={true}
      pageName="services"
      criticalPages={['/', '/services', '/approach', '/contact']}
    >
      {/* Services Header & Main Section */}
      <ServicesClientComponent />

      {/* Services Grid - Main Service Categories */}
      <section id="service-categories" className="py-14 relative overflow-hidden">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-white dark:from-dark-light/50 dark:to-dark z-0"></div>
        
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/30 dark:bg-blue-900/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl z-0"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-100/30 dark:bg-indigo-900/10 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl z-0"></div>
        
        {/* Mesh Grid Background */}
        <div className="absolute inset-0 z-0 opacity-10" style={{ 
          backgroundImage: `radial-gradient(circle at 20px 20px, rgba(67, 97, 238, 0.1) 1px, transparent 0)`, 
          backgroundSize: '40px 40px' 
        }}></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-10">
            <div className="inline-flex items-center space-x-2 mb-3 bg-blue-100/50 dark:bg-blue-900/30 backdrop-blur-md px-3 py-1.5 rounded-full">
              <div className="w-1.5 h-1.5 bg-blue-500 dark:bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium tracking-wide text-blue-700 dark:text-blue-300 uppercase">Core Services</span>
            </div>
            <h2 className="text-3xl font-bold mb-3">Our Service Categories</h2>
            <p className="text-base max-w-2xl mx-auto text-gray-600 dark:text-gray-200">
              Comprehensive revenue operations solutions tailored to your business needs
            </p>
          </div>
          <ServicesGrid />
        </div>
      </section>

      {/* Services Statistics Section */}
      <ServicesStatistics />

      {/* A La Carte Services Section */}
      <AlaCarteServicesSection />


      {/* Testimonials Section */}
      <ServicesTestimonialSection />


    </PerformanceLayout>
  );
}
