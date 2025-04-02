'use client';

import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Script from 'next/script';
import ContactForm from './ContactForm';

export function ContactPage() {
  const [selectedOption, setSelectedOption] = useState('contact');
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.1 });
  
  // Handle form submission success
  const handleFormSuccess = (data: any) => {
    // You can implement additional tracking or analytics here
    console.log('Form submitted successfully:', data);
  };
  
  return (
    <div className="min-h-screen">
      {/* Google Maps Script */}
      <Script
        id="google-maps"
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
        strategy="lazyOnload"
      />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-16 px-4 md:py-24 lg:py-32 overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Ready to <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Transform Your Data</span> Strategy?
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Get in touch with our team to discuss how we can help optimize your data operations and drive business growth.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <button
                  onClick={() => setSelectedOption('contact')}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    selectedOption === 'contact'
                      ? 'bg-primary text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  Contact Us
                </button>
                <button
                  onClick={() => setSelectedOption('demo')}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    selectedOption === 'demo'
                      ? 'bg-primary text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  Request a Demo
                </button>
                <button
                  onClick={() => setSelectedOption('support')}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    selectedOption === 'support'
                      ? 'bg-primary text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  Customer Support
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section 
        ref={sectionRef}
        className="py-16 px-4 bg-white dark:bg-gray-900"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.7 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700"
            >
              <h2 className="text-2xl font-bold mb-6">
                {selectedOption === 'contact' && 'Contact Us'}
                {selectedOption === 'demo' && 'Request a Demo'}
                {selectedOption === 'support' && 'Customer Support'}
              </h2>
              
              <ContactForm 
                onSuccess={handleFormSuccess}
                submitButtonText={
                  selectedOption === 'contact' ? 'Send Message' :
                  selectedOption === 'demo' ? 'Request Demo' :
                  'Submit Support Request'
                }
              />
            </motion.div>
            
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Information Card */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700">
                <h3 className="text-xl font-bold mb-4">Our Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400">Email</h4>
                      <a href="mailto:contact@revelateoperations.com" className="text-primary dark:text-primary-light hover:underline">
                        contact@revelateoperations.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400">Phone</h4>
                      <a href="tel:+18001234567" className="text-gray-800 dark:text-gray-200 hover:text-primary dark:hover:text-primary-light">
                        +1 (800) 123-4567
                      </a>
                    </div>
                  </div>
                  
                  {/* Location information removed as requested */}
                  
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400">Business Hours</h4>
                      <p className="text-gray-800 dark:text-gray-200">
                        Monday-Friday: 9AM-5PM PST
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Social Media */}
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 rounded-2xl p-8">
                <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Follow us on social media for the latest updates, insights, and data trends.
                </p>
                
                <div className="flex space-x-4">
                  <a 
                    href="https://www.linkedin.com/company/revelate-operations" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light transition-colors duration-300"
                    aria-label="LinkedIn"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                    </svg>
                  </a>
                </div>
              </div>
              
              {/* FAQ Teaser */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700">
                <h3 className="text-xl font-bold mb-4">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                    <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">How quickly can you implement a data solution?</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Implementation timelines vary based on complexity, but most clients see initial results within 2-4 weeks.
                    </p>
                  </div>
                  <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                    <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Do you offer ongoing support?</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Yes, we provide comprehensive ongoing support with various service level options to meet your needs.
                    </p>
                  </div>
                  <a 
                    href="/faq" 
                    className="inline-flex items-center text-primary dark:text-primary-light hover:underline"
                  >
                    <span>View all FAQs</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Visit Our Office</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Schedule an in-person consultation at our headquarters.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden">
            {/* This would be replaced with actual Google Maps implementation */}
            <div className="h-96 w-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <p className="text-gray-500 dark:text-gray-400">Interactive map would load here</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContactPage;
