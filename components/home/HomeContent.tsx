'use client';

import React from 'react';
import Link from 'next/link';
import OptimizedImage from '@/components/ui/OptimizedImage';
import LazyLoad from '@/components/ui/lazy-load';
import { ResultsSection } from './ResultsSection';

// Define types for props
interface HomeContentProps {
  serviceData: any[];
  expertisePoints: any[];
  processSteps: any[];
  resultCards: any[];
  testimonials: any[];
}

export default function HomeContent({
  serviceData,
  expertisePoints,
  processSteps,
  resultCards,
  testimonials
}: HomeContentProps) {
  return (
    <>
      {/* Services Section - Lazy loaded */}
      <LazyLoad>
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Services</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Comprehensive data services to optimize your operations and drive growth
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {serviceData.map((service, index) => (
                <div key={index} className="service-card transition-all hover:-translate-y-2 duration-300">
                  <div className="flex flex-col h-full">
                    <div className="mb-4 w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center text-primary dark:text-primary-light">
                    <i className={service.icon}></i>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">{service.description}</p>
                    <Link href={service.link} className="text-primary dark:text-primary-light hover:text-primary-dark dark:hover:text-primary inline-flex items-center group">
                      Learn more
                      <i className="fas fa-arrow-right ml-2 transition-transform group-hover:translate-x-1"></i>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </LazyLoad>

      {/* Expertise Section */}
      <LazyLoad rootMargin="300px 0px">
        <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="inline-block text-sm font-semibold tracking-wider text-primary uppercase mb-3 relative pb-2 after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-0.5 after:w-10 after:bg-primary">
                Our Expertise
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Revelate Operations?</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                We bring a unique combination of technical expertise and business acumen to every engagement.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div className="expertise-content">
                <div className="flex flex-col md:flex-row md:items-center gap-6 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md dark:shadow-gray-900/30">
                  <div className="bg-primary/10 dark:bg-primary/20 rounded-full p-4 flex-shrink-0">
                    <div className="text-5xl font-bold text-primary">35%</div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Average Increase</h3>
                    <p className="text-gray-600 dark:text-gray-300">In client conversion rates after implementing our data-driven strategies</p>
                  </div>
                </div>
                
                <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md dark:shadow-gray-900/30">
                  <h3 className="text-2xl font-bold mb-4">Data That Works For You</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Our comprehensive approach ensures that your data ecosystem is unified, providing actionable insights that drive growth.
                  </p>
                  <div className="flex items-center gap-2 text-primary dark:text-primary-light font-semibold">
                    <span>Learn more about our approach</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-xl dark:shadow-gray-900/30">
                <h3 className="text-xl font-bold border-b border-gray-200 dark:border-gray-700 pb-4 mb-6">
                  Why Our Clients Choose Us
                </h3>
                
                <div className="space-y-6">
                  {expertisePoints.map((point, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="text-primary dark:text-primary-light flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                          <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-lg font-bold mb-1">{point.title}</h4>
                        <p className="text-gray-600 dark:text-gray-300">{point.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-600 pb-2 mb-2">
                    <span className="font-medium">Client Satisfaction</span>
                    <span className="font-bold text-primary">96%</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-600 pb-2 mb-2">
                    <span className="font-medium">Data Improvement</span>
                    <span className="font-bold text-primary">85%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">ROI Average</span>
                    <span className="font-bold text-primary">450%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </LazyLoad>

      {/* Process Section - Lazy loaded with increased margin for earlier loading */}
      <LazyLoad rootMargin="400px 0px">
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="inline-block text-sm font-semibold tracking-wider text-primary dark:text-primary-light uppercase mb-3 relative pb-2 after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-0.5 after:w-10 after:bg-primary dark:after:bg-primary-light">
                Our Methodology
              </span>
              <h2 className="text-3xl font-bold mb-4">Our Process</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                A systematic approach to turning your raw data into actionable insights
              </p>
            </div>
            
            <div className="process-steps">
              <div className="grid md:grid-cols-4 gap-8">
                {processSteps.map((step, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md dark:shadow-gray-900/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700 relative">
                    <div className="flex flex-col md:items-center gap-4 md:text-center">
                      <div className="step-number">{index + 1}</div>
                      <div>
                        <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </LazyLoad>

      {/* Results Section - Lazy loaded */}
      {resultCards.length > 0 && (
        <LazyLoad rootMargin="400px 0px">
          <ResultsSection resultCards={resultCards} />
        </LazyLoad>
      )}

      {/* CTA Section - Lazy loaded */}
      <LazyLoad rootMargin="400px 0px">
        <section className="py-20 bg-gradient-to-br from-primary to-secondary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Data?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Let's discuss how our data-driven solutions can help your business achieve its growth objectives.
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-white text-primary font-bold rounded-full hover:bg-gray-100 transition transform hover:-translate-y-1 hover:shadow-xl"
            >
              Get Started Today
            </Link>
          </div>
        </section>
      </LazyLoad>
    </>
  );
}
