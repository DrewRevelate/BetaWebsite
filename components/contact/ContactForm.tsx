'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface FormField {
  id: string;
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  options?: string[];
  validation?: RegExp;
  errorMessage?: string;
}

interface ContactFormProps {
  formFields?: FormField[];
  formId?: string;
  submitButtonText?: string;
  successMessage?: string;
  className?: string;
  onSuccess?: (data: any) => void;
}

const defaultFormFields: FormField[] = [
  {
    id: 'name',
    name: 'name',
    label: 'Full Name',
    type: 'text',
    placeholder: 'Enter your full name',
    required: true,
    validation: /^[a-zA-Z\s]{2,50}$/,
    errorMessage: 'Please enter a valid name (2-50 characters).'
  },
  {
    id: 'email',
    name: 'email',
    label: 'Email Address',
    type: 'email',
    placeholder: 'Enter your email address',
    required: true,
    validation: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    errorMessage: 'Please enter a valid email address.'
  },
  {
    id: 'company',
    name: 'company',
    label: 'Company',
    type: 'text',
    placeholder: 'Enter your company name',
    required: true
  },
  {
    id: 'phone',
    name: 'phone',
    label: 'Phone Number',
    type: 'tel',
    placeholder: 'Enter your phone number',
    required: false,
    validation: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
    errorMessage: 'Please enter a valid phone number.'
  },
  {
    id: 'service',
    name: 'service',
    label: 'Service Interest',
    type: 'select',
    required: true,
    options: [
      'Select a service',
      'Data Integration',
      'Business Intelligence',
      'CRM Management',
      'Custom Analytics',
      'Data Strategy Consulting',
      'Other'
    ]
  },
  {
    id: 'message',
    name: 'message',
    label: 'Message',
    type: 'textarea',
    placeholder: 'Tell us about your project or requirements',
    required: true
  }
];

export function ContactForm({
  formFields = defaultFormFields,
  formId = 'contact-form',
  submitButtonText = 'Send Message',
  successMessage = 'Thank you for reaching out! We\'ll be in touch with you shortly.',
  className = '',
  onSuccess
}: ContactFormProps) {
  // Form state
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});
  
  // Refs for analytics and interaction tracking
  const interactionStartTime = useRef<number>(0);
  const formSubmitTime = useRef<number>(0);
  const interactionCount = useRef<number>(0);
  const formRef = useRef<HTMLFormElement>(null);
  
  // Initialize form data state
  useEffect(() => {
    const initialData: Record<string, string> = {};
    formFields.forEach(field => {
      initialData[field.id] = field.type === 'select' && field.options ? field.options[0] : '';
    });
    setFormData(initialData);
  }, [formFields]);
  
  // Start tracking form interactions
  useEffect(() => {
    interactionStartTime.current = performance.now();
    
    // Track when form comes into view
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'form_impression', {
        event_category: 'engagement',
        event_label: 'contact_form_viewed',
        non_interaction: true
      });
    }
    
    return () => {
      // Track abandonment if not submitted
      if (!submitted && interactionCount.current > 0) {
        const interactionDuration = performance.now() - interactionStartTime.current;
        
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'form_abandonment', {
            event_category: 'engagement',
            event_label: 'contact_form_abandoned',
            value: Math.round(interactionDuration / 1000), // in seconds
            interaction_count: interactionCount.current
          });
        }
      }
    };
  }, [submitted]);
  
  // Track field interactions
  const handleFieldInteraction = (fieldId: string) => {
    interactionCount.current += 1;
    
    // Track first interaction with form
    if (interactionCount.current === 1 && typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'form_interaction', {
        event_category: 'engagement',
        event_label: 'contact_form_first_interaction',
        field_id: fieldId
      });
    }
  };
  
  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Mark field as touched
    if (!touchedFields[name]) {
      setTouchedFields(prev => ({ ...prev, [name]: true }));
      handleFieldInteraction(name);
    }
    
    // Clear error when user starts typing again
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  // Handle blur events for validation
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    validateField(name, value);
  };
  
  // Validate a specific field
  const validateField = (name: string, value: string) => {
    const field = formFields.find(f => f.id === name);
    
    if (!field) return true;
    
    // Check if required field is empty
    if (field.required && !value) {
      setErrors(prev => ({ ...prev, [name]: `${field.label} is required.` }));
      return false;
    }
    
    // Skip validation if field is empty and not required
    if (!field.required && !value) {
      return true;
    }
    
    // Check against validation pattern
    if (field.validation && !field.validation.test(value)) {
      setErrors(prev => ({ ...prev, [name]: field.errorMessage || `Invalid ${field.label}.` }));
      return false;
    }
    
    // Clear error if validation passes
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
    
    return true;
  };
  
  // Validate entire form
  const validateForm = () => {
    let isValid = true;
    const newErrors: Record<string, string> = {};
    
    formFields.forEach(field => {
      const value = formData[field.id] || '';
      
      // Required field validation
      if (field.required && !value) {
        newErrors[field.id] = `${field.label} is required.`;
        isValid = false;
        return;
      }
      
      // Pattern validation (only if field has a value)
      if (value && field.validation && !field.validation.test(value)) {
        newErrors[field.id] = field.errorMessage || `Invalid ${field.label}.`;
        isValid = false;
      }
      
      // Select validation (must be different from default)
      if (field.type === 'select' && field.required && field.options && value === field.options[0]) {
        newErrors[field.id] = `Please select a ${field.label.toLowerCase()}.`;
        isValid = false;
      }
    });
    
    setErrors(newErrors);
    return isValid;
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formSubmitTime.current = performance.now();
    
    // Track form submission attempt
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'form_submit_attempt', {
        event_category: 'engagement',
        event_label: 'contact_form',
        interaction_count: interactionCount.current
      });
    }
    
    // Validate the form
    if (!validateForm()) {
      // Track validation errors
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'form_validation_error', {
          event_category: 'engagement',
          event_label: 'contact_form',
          error_count: Object.keys(errors).length
        });
      }
      
      // Scroll to first error
      const firstErrorField = formRef.current?.querySelector('[aria-invalid="true"]');
      if (firstErrorField) {
        (firstErrorField as HTMLElement).focus();
      }
      
      return;
    }
    
    setSubmitting(true);
    setFormError('');
    
    try {
      // Here you would typically submit to your API
      // For example: await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) })
      
      // Simulating an API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Track successful submission
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'generate_lead', {
          event_category: 'conversion',
          event_label: 'contact_form_submission',
          value: Math.round((performance.now() - interactionStartTime.current) / 1000), // total interaction time in seconds
          form_completion_time: Math.round((performance.now() - formSubmitTime.current) / 1000) // submission time in seconds
        });
      }
      
      // Handle success
      setSubmitted(true);
      if (onSuccess) {
        onSuccess(formData);
      }
      
    } catch (error) {
      // Handle error
      console.error('Form submission error:', error);
      setFormError('There was a problem submitting your form. Please try again.');
      
      // Track submission error
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'form_submission_error', {
          event_category: 'error',
          event_label: 'contact_form',
          error_message: 'API submission failed'
        });
      }
    } finally {
      setSubmitting(false);
    }
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4 }
    }
  };
  
  const successVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };
  
  return (
    <div className={`contact-form-container ${className}`}>
      {submitted ? (
        <motion.div
          className="success-message bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-xl p-8 text-center"
          variants={successVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="success-icon mx-auto mb-6 w-16 h-16 bg-green-100 dark:bg-green-800/50 text-green-600 dark:text-green-300 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
            Message Sent Successfully!
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {successMessage}
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setFormData({});
              setTouchedFields({});
              setErrors({});
              
              // Reset tracking
              interactionStartTime.current = performance.now();
              interactionCount.current = 0;
            }}
            className="px-6 py-2 bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light rounded-lg hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors duration-300"
          >
            Send Another Message
          </button>
        </motion.div>
      ) : (
        <motion.form
          id={formId}
          ref={formRef}
          className="space-y-6"
          onSubmit={handleSubmit}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          noValidate
        >
          {/* Form fields */}
          {formFields.map(field => (
            <motion.div key={field.id} variants={itemVariants} className="form-field">
              <label 
                htmlFor={field.id} 
                className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
              >
                {field.label} {field.required && <span className="text-red-500">*</span>}
              </label>
              
              {field.type === 'textarea' ? (
                <textarea
                  id={field.id}
                  name={field.name}
                  value={formData[field.id] || ''}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder={field.placeholder}
                  required={field.required}
                  rows={5}
                  className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border ${
                    errors[field.id] ? 'border-red-400 dark:border-red-600' : 'border-gray-300 dark:border-gray-600'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-light`}
                  aria-invalid={!!errors[field.id]}
                  aria-describedby={errors[field.id] ? `${field.id}-error` : undefined}
                />
              ) : field.type === 'select' ? (
                <select
                  id={field.id}
                  name={field.name}
                  value={formData[field.id] || (field.options ? field.options[0] : '')}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required={field.required}
                  className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border ${
                    errors[field.id] ? 'border-red-400 dark:border-red-600' : 'border-gray-300 dark:border-gray-600'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-light`}
                  aria-invalid={!!errors[field.id]}
                  aria-describedby={errors[field.id] ? `${field.id}-error` : undefined}
                >
                  {field.options?.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </select>
              ) : (
                <input
                  id={field.id}
                  name={field.name}
                  type={field.type}
                  value={formData[field.id] || ''}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder={field.placeholder}
                  required={field.required}
                  className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border ${
                    errors[field.id] ? 'border-red-400 dark:border-red-600' : 'border-gray-300 dark:border-gray-600'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-light`}
                  aria-invalid={!!errors[field.id]}
                  aria-describedby={errors[field.id] ? `${field.id}-error` : undefined}
                />
              )}
              
              {/* Field error message */}
              {errors[field.id] && (
                <p 
                  id={`${field.id}-error`} 
                  className="mt-1 text-sm text-red-500 dark:text-red-400"
                >
                  {errors[field.id]}
                </p>
              )}
            </motion.div>
          ))}
          
          {/* Privacy agreement */}
          <motion.div variants={itemVariants} className="form-field">
            <div className="flex items-start space-x-2">
              <input
                id="privacy"
                name="privacy"
                type="checkbox"
                required
                className="mt-1 h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary dark:focus:ring-primary-light"
                onChange={() => {
                  handleFieldInteraction('privacy');
                }}
              />
              <label htmlFor="privacy" className="text-sm text-gray-600 dark:text-gray-400">
                I agree to the <a href="/privacy-policy" className="text-primary dark:text-primary-light hover:underline">Privacy Policy</a> and consent to having my data processed as outlined. <span className="text-red-500">*</span>
              </label>
            </div>
          </motion.div>
          
          {/* Form error message */}
          {formError && (
            <motion.div 
              variants={itemVariants}
              className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-4 rounded-lg"
            >
              {formError}
            </motion.div>
          )}
          
          {/* Submit button */}
          <motion.div variants={itemVariants} className="form-field">
            <button
              type="submit"
              disabled={submitting}
              className={`w-full py-3 px-6 rounded-lg font-semibold text-white ${
                submitting ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed' : 'bg-primary hover:bg-primary-dark dark:hover:bg-primary-light dark:hover:text-gray-800'
              } transition-colors duration-300 flex justify-center items-center`}
              aria-live="polite"
            >
              {submitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : submitButtonText}
            </button>
          </motion.div>
        </motion.form>
      )}
    </div>
  );
}

export default ContactForm;
