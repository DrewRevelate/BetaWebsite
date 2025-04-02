'use client';

import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { validateContact } from '@/lib/validation';

interface FormState {
  name: string;
  email: string;
  phone: string;
  company: string;
  interest: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  interest?: string;
  message?: string;
}

export default function ContactForm() {
  // Form steps: 1-Basic Info, 2-Interest & Message, 3-Thank You/Error
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    company: '',
    interest: 'General Inquiry',
    message: '',
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  
  // Progress percentage based on fields completed
  const [progressPercentage, setProgressPercentage] = useState(0);
  
  // Calculate form progress whenever form data changes
  useEffect(() => {
    const totalFields = 6; // name, email, phone, company, interest, message
    const requiredFields = 4; // name, email, interest, message
    
    // Count completed required fields
    let completedRequired = 0;
    if (formData.name) completedRequired++;
    if (formData.email) completedRequired++;
    if (formData.interest) completedRequired++;
    if (formData.message) completedRequired++;
    
    // Count completed optional fields
    let completedOptional = 0;
    if (formData.phone) completedOptional++;
    if (formData.company) completedOptional++;
    
    // Calculate progress percentage (required fields count more)
    const requiredWeight = 0.8;
    const optionalWeight = 0.2;
    
    const requiredProgress = (completedRequired / 4) * requiredWeight * 100;
    const optionalProgress = (completedOptional / 2) * optionalWeight * 100;
    
    setProgressPercentage(Math.round(requiredProgress + optionalProgress));
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Mark field as touched
    setTouchedFields(prev => ({
      ...prev,
      [name]: true
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
    
    // Validate field immediately for improved user feedback
    const fieldToValidate = { [name]: value } as any;
    const singleFieldValidation = name === 'email' ? validateEmail(value) : undefined;
    
    if (singleFieldValidation) {
      setErrors(prev => ({
        ...prev,
        [name]: singleFieldValidation
      }));
    }
  };
  
  // Validate a single email field
  const validateEmail = (email: string): string | undefined => {
    if (!email) return 'Email is required';
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase()) ? undefined : 'Please enter a valid email address';
  };
  
  // Handle next step action
  const handleNextStep = () => {
    // Validate first step fields
    if (currentStep === 1) {
      const stepErrors: FormErrors = {};
      if (!formData.name) stepErrors.name = 'Name is required';
      if (!formData.email) stepErrors.email = 'Email is required';
      else if (!validateEmail(formData.email)) stepErrors.email = 'Please enter a valid email address';
      
      if (Object.keys(stepErrors).length > 0) {
        setErrors(stepErrors);
        
        // Mark all fields in this step as touched
        setTouchedFields(prev => ({
          ...prev,
          name: true,
          email: true,
          phone: true,
          company: true
        }));
        
        return;
      }
      
      // Advance to next step
      setCurrentStep(2);
      return;
    }
  };
  
  // Handle back button
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Client-side validation for all fields
    const validationResult = validateContact(formData);
    if (validationResult) {
      setErrors(validationResult);
      
      // Mark all fields as touched to show all errors
      setTouchedFields({
        name: true,
        email: true,
        phone: true,
        company: true,
        interest: true,
        message: true,
      });
      
      return;
    }
    
    setIsSubmitting(true);
    setSubmitResult(null);
    
    try {
      // Track form submission start
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'start_form_submission', {
          'event_category': 'engagement',
          'event_label': 'contact_form',
        });
      }
      
      // Get UTM parameters from URL if available
      const urlParams = new URLSearchParams(window.location.search);
      const utmSource = urlParams.get('utm_source');
      const utmMedium = urlParams.get('utm_medium');
      const utmCampaign = urlParams.get('utm_campaign');
      const utmTerm = urlParams.get('utm_term');
      const utmContent = urlParams.get('utm_content');
      
      // Add UTM parameters and referrer to form data
      const extendedFormData = {
        ...formData,
        utm_source: utmSource || undefined,
        utm_medium: utmMedium || undefined,
        utm_campaign: utmCampaign || undefined,
        utm_term: utmTerm || undefined,
        utm_content: utmContent || undefined,
        referrer: document.referrer || undefined
      };
      
      // Submit the form
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(extendedFormData),
      });
      
      const result = await response.json();
      
      if (response.ok) {
        // Success - clear form and advance to thank you step
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          interest: 'General Inquiry',
          message: '',
        });
        
        setSubmitResult({
          success: true,
          message: result.message || 'Thank you! Your message has been received.'
        });
        
        // Move to success step
        setCurrentStep(3);
        
        // Track successful form submission
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'form_submit_success', {
            'event_category': 'conversion',
            'event_label': 'contact_form',
            'value': 1
          });
        }
      } else {
        // API returned an error
        setSubmitResult({
          success: false,
          message: result.message || 'There was a problem submitting your form. Please try again.'
        });
        
        // Track form error
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'form_submit_error', {
            'event_category': 'error',
            'event_label': result.message || 'API Error',
          });
        }
      }
    } catch (error) {
      // Network or other error
      setSubmitResult({
        success: false,
        message: 'Unable to connect to the server. Please check your internet connection and try again.'
      });
      
      // Track form error
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'form_submit_error', {
          'event_category': 'error',
          'event_label': 'Network Error',
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Render progress bar
  const renderProgressBar = () => {
    return (
      <div className="mb-6">
        <div className="flex justify-between mb-1">
          <span className="text-sm text-gray-600 dark:text-gray-300">Form completion</span>
          <span className="text-sm font-medium text-primary">{progressPercentage}%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <motion.div 
            className="bg-primary h-2 rounded-full" 
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    );
  };

  // Render step indicators
  const renderStepIndicators = () => {
    return (
      <div className="flex items-center justify-between mb-8">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex flex-col items-center">
            <div 
              className={`w-8 h-8 flex items-center justify-center rounded-full border-2 transition-all ${
                currentStep === step 
                  ? 'border-primary bg-primary text-white' 
                  : currentStep > step
                    ? 'border-primary bg-primary/20 text-primary'
                    : 'border-gray-300 dark:border-gray-600 text-gray-400'
              }`}
            >
              {currentStep > step ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              ) : (
                step
              )}
            </div>
            <span className={`text-xs mt-1 ${
              currentStep === step 
                ? 'text-primary font-medium' 
                : 'text-gray-500 dark:text-gray-400'
            }`}>
              {step === 1 ? 'Basic Info' : step === 2 ? 'Details' : 'Complete'}
            </span>
          </div>
        ))}
        
        {/* Connecting lines */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-2/3 h-0.5 bg-gray-200 dark:bg-gray-700 z-0" style={{ top: '1rem' }}></div>
      </div>
    );
  };

  return (
    <>
      {/* Step indicators */}
      <div className="relative mb-6">
        {renderStepIndicators()}
      </div>
      
      {/* Progress bar */}
      {currentStep < 3 && renderProgressBar()}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-medium mb-4">Tell us about yourself</h3>
              
              {/* Name Field */}
              <div className="form-group">
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full p-3 pl-10 border rounded-md focus:ring-primary focus:border-primary ${
                      touchedFields.name && errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    } bg-white dark:bg-gray-800`}
                    placeholder="Your full name"
                    aria-required="true"
                  />
                  {touchedFields.name && errors.name && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                      </svg>
                    </div>
                  )}
                </div>
                {touchedFields.name && errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>
              
              {/* Email Field */}
              <div className="form-group">
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full p-3 pl-10 border rounded-md focus:ring-primary focus:border-primary ${
                      touchedFields.email && errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    } bg-white dark:bg-gray-800`}
                    placeholder="your.email@example.com"
                    aria-required="true"
                  />
                  {touchedFields.email && errors.email && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                      </svg>
                    </div>
                  )}
                </div>
                {touchedFields.email && errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
              
              {/* Phone Field */}
              <div className="form-group">
                <label htmlFor="phone" className="block text-sm font-medium mb-1">
                  Phone <span className="text-gray-500 font-normal">(optional)</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full p-3 pl-10 border rounded-md focus:ring-primary focus:border-primary ${
                      touchedFields.phone && errors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    } bg-white dark:bg-gray-800`}
                    placeholder="(555) 123-4567"
                  />
                </div>
                {touchedFields.phone && errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>
              
              {/* Company Field */}
              <div className="form-group">
                <label htmlFor="company" className="block text-sm font-medium mb-1">
                  Company <span className="text-gray-500 font-normal">(optional)</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                      <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className={`w-full p-3 pl-10 border rounded-md focus:ring-primary focus:border-primary ${
                      touchedFields.company && errors.company ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    } bg-white dark:bg-gray-800`}
                    placeholder="Your company name"
                  />
                </div>
                {touchedFields.company && errors.company && (
                  <p className="text-red-500 text-sm mt-1">{errors.company}</p>
                )}
              </div>
              
              {/* Next Button */}
              <div className="form-group pt-2">
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="w-full py-3 px-6 rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
                >
                  Continue
                </button>
              </div>
            </motion.div>
          )}
          
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-medium mb-4">Tell us how we can help</h3>
              
              {/* Interest Field */}
              <div className="form-group">
                <label htmlFor="interest" className="block text-sm font-medium mb-1">
                  How can we help you? <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                    </svg>
                  </div>
                  <select
                    id="interest"
                    name="interest"
                    value={formData.interest}
                    onChange={handleChange}
                    className={`w-full p-3 pl-10 border rounded-md focus:ring-primary focus:border-primary ${
                      touchedFields.interest && errors.interest ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    } bg-white dark:bg-gray-800`}
                    aria-required="true"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="CRM Management">CRM Management</option>
                    <option value="Business Intelligence">Business Intelligence</option>
                    <option value="Data Integration">Data Integration</option>
                    <option value="Customer Retention">Customer Retention</option>
                    <option value="Partnership Opportunity">Partnership Opportunity</option>
                  </select>
                </div>
                {touchedFields.interest && errors.interest && (
                  <p className="text-red-500 text-sm mt-1">{errors.interest}</p>
                )}
              </div>
              
              {/* Message Field */}
              <div className="form-group">
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className={`w-full p-3 border rounded-md focus:ring-primary focus:border-primary ${
                    touchedFields.message && errors.message ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  } bg-white dark:bg-gray-800`}
                  placeholder="Tell us about your project or inquiry..."
                  aria-required="true"
                ></textarea>
                {touchedFields.message && errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
                
                {/* Character counter */}
                <div className="flex justify-end mt-1">
                  <span className={`text-xs ${
                    formData.message.length > 20 ? 'text-gray-500' : 'text-red-500'
                  }`}>
                    {formData.message.length} characters
                    {formData.message.length < 20 && ' (min 20)'}
                  </span>
                </div>
              </div>
              
              {/* Navigation Buttons */}
              <div className="form-group pt-2 grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={handleBack}
                  className="py-3 px-6 rounded-md text-primary bg-white border border-primary hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
                >
                  Back
                </button>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`py-3 px-6 rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    'Submit'
                  )}
                </button>
              </div>
              
              {/* Form Error Message */}
              {submitResult && !submitResult.success && (
                <div className="p-4 rounded-md bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-400">
                  <p className="flex items-center">
                    <i className="fas fa-exclamation-circle mr-2"></i>
                    {submitResult.message}
                  </p>
                </div>
              )}
            </motion.div>
          )}
          
          {currentStep === 3 && submitResult && submitResult.success && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="py-8 text-center"
            >
              <div className="mb-6 inline-flex h-24 w-24 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 dark:text-green-400">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              
              <h3 className="text-2xl font-bold mb-4">Thank You!</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
                Your message has been received. We typically respond within 1-2 business days.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/"
                  className="inline-flex items-center justify-center px-6 py-3 border border-primary text-primary bg-white hover:bg-primary/5 rounded-md transition-colors"
                >
                  Back to Home
                </Link>
                <Link 
                  href="/services"
                  className="inline-flex items-center justify-center px-6 py-3 text-white bg-primary hover:bg-primary-dark rounded-md transition-colors"
                >
                  Explore Our Services
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </>
  );
}
