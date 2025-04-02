'use client';

import { FC, useState, memo } from 'react';

export const NewsletterSection: FC = memo(function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateEmail = (email: string): boolean => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Validate email
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    // Validate consent
    if (!consent) {
      setError('Please agree to receive marketing communications');
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Simulate API call - in a real app, you would call your API here
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Success!
      setIsSubmitted(true);
      setIsSubmitting(false);
    } catch (err) {
      setError('There was an error submitting your request. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-gray-50 dark:bg-gray-800 rounded-lg p-8 md:p-10 shadow-md">
          {isSubmitted ? (
            <div className="newsletter-success bg-green-50 dark:bg-green-900/20 p-6 rounded-md text-center">
              <i className="fas fa-check-circle text-green-500 dark:text-green-400 text-4xl mb-4" aria-hidden="true"></i>
              <h3 className="text-xl font-bold mb-2">Thank You!</h3>
              <p className="text-gray-600 dark:text-gray-300">You've been successfully subscribed to our newsletter.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-0">
                  Get the latest insights on data analytics, CRM management, and revenue operations delivered to your inbox monthly.
                </p>
              </div>
              <div>
                <form 
                  onSubmit={handleSubmit}
                  className="space-y-4"
                  aria-label="Newsletter signup form"
                >
                  <div>
                    <label htmlFor="email" className="sr-only">Email Address</label>
                    <input 
                      type="email" 
                      id="email"
                      name="email" 
                      placeholder="Your Email Address" 
                      required 
                      className={`w-full px-4 py-3 rounded-md border ${error ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'} focus:border-[var(--primary)] focus:ring focus:ring-[var(--primary)]/10 outline-none transition-all dark:bg-gray-700 dark:text-white`}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      aria-describedby={error ? "newsletter-error" : undefined}
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="flex items-start gap-2">
                    <input 
                      type="checkbox" 
                      id="newsletter-consent" 
                      name="newsletter-consent" 
                      required 
                      className="mt-1"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      disabled={isSubmitting}
                    />
                    <label htmlFor="newsletter-consent" className="text-sm text-gray-600 dark:text-gray-300">
                      I agree to receive marketing communications from Revelate Operations
                    </label>
                  </div>
                  
                  {error && (
                    <div id="newsletter-error" className="text-red-500 dark:text-red-400 text-sm">
                      {error}
                    </div>
                  )}
                  
                  <button 
                    type="submit" 
                    className="w-full px-6 py-3 bg-[var(--primary)] text-white font-semibold rounded-md shadow hover:bg-[var(--primary-dark)] transition focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <i className="fas fa-spinner fa-spin mr-2" aria-hidden="true"></i>
                        Subscribing...
                      </>
                    ) : (
                      'Subscribe'
                    )}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
});
