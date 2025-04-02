'use client';

import { useState } from 'react';
import Link from 'next/link';

type ServiceLevel = 'standard' | 'professional' | 'enterprise';

interface ServiceFeature {
  name: string;
  description: string;
  availability: Record<ServiceLevel, boolean | string>;
}

const serviceFeatures: ServiceFeature[] = [
  {
    name: 'Initial RevOps Assessment',
    description: 'Comprehensive analysis of your current revenue operations',
    availability: {
      standard: true,
      professional: true,
      enterprise: true
    }
  },
  {
    name: 'Salesforce Implementation',
    description: 'Setup and configuration of Salesforce for your business',
    availability: {
      standard: 'Basic',
      professional: 'Advanced',
      enterprise: 'Enterprise-grade'
    }
  },
  {
    name: 'Custom Dashboards',
    description: 'Tailored analytics dashboards for revenue insights',
    availability: {
      standard: '2',
      professional: '5',
      enterprise: 'Unlimited'
    }
  },
  {
    name: 'System Integrations',
    description: 'Connect your essential business platforms',
    availability: {
      standard: '2',
      professional: '5',
      enterprise: 'Unlimited'
    }
  },
  {
    name: 'Workflow Automation',
    description: 'Automate repetitive tasks and key processes',
    availability: {
      standard: 'Basic',
      professional: 'Advanced',
      enterprise: 'Custom'
    }
  },
  {
    name: 'User Training',
    description: 'Training sessions for your team',
    availability: {
      standard: '1 session',
      professional: '3 sessions',
      enterprise: 'Unlimited'
    }
  },
  {
    name: 'Ongoing Support',
    description: 'Technical assistance and guidance',
    availability: {
      standard: 'Email only',
      professional: 'Email & phone',
      enterprise: 'Dedicated support'
    }
  },
  {
    name: 'Health Scoring Model',
    description: 'Customer health predictions for churn prevention',
    availability: {
      standard: false,
      professional: 'Basic',
      enterprise: 'Advanced'
    }
  },
  {
    name: 'Custom API Development',
    description: 'Build custom APIs for unique integrations',
    availability: {
      standard: false,
      professional: false,
      enterprise: true
    }
  }
];

const ServicesComparisonTable = () => {
  const [focusedLevel, setFocusedLevel] = useState<ServiceLevel | null>(null);
  
  const handleFocus = (level: ServiceLevel) => {
    setFocusedLevel(level);
  };
  
  const handleBlur = () => {
    setFocusedLevel(null);
  };
  
  return (
    <section className="py-20 bg-white dark:bg-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Choose Your RevOps Solution</h2>
          <p className="text-lg max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
            We offer flexible service packages to meet your specific needs and budget
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <div className="overflow-x-auto">
            <table className="w-full">
              {/* Table Header */}
              <thead>
                <tr>
                  <th className="text-left p-4 w-1/4"></th>
                  <th className="w-1/4">
                    <div 
                      className={`p-4 rounded-t-lg transition-all ${
                        focusedLevel === 'standard' 
                          ? 'bg-primary text-white scale-105' 
                          : 'bg-gray-100 dark:bg-gray-800'
                      }`}
                      onMouseEnter={() => handleFocus('standard')}
                      onMouseLeave={handleBlur}
                    >
                      <h3 className="text-xl font-bold mb-2">Standard</h3>
                      <p className="text-sm mb-4 opacity-80">For small businesses getting started with RevOps</p>
                      <div className="text-2xl font-bold mb-2">$2,500<span className="text-sm font-normal">/mo</span></div>
                      <Link 
                        href="/contact?plan=standard"
                        className="block w-full py-2 px-4 rounded-md text-center bg-primary text-white hover:bg-primary-dark transition-colors"
                      >
                        Get Started
                      </Link>
                    </div>
                  </th>
                  <th className="w-1/4">
                    <div 
                      className={`p-4 rounded-t-lg transition-all ${
                        focusedLevel === 'professional' 
                          ? 'bg-primary text-white scale-105' 
                          : 'bg-gray-100 dark:bg-gray-800'
                      }`}
                      onMouseEnter={() => handleFocus('professional')}
                      onMouseLeave={handleBlur}
                    >
                      <div className="absolute -top-3 left-0 right-0 text-center">
                        <span className="bg-secondary text-white text-xs py-1 px-3 rounded-full">
                          MOST POPULAR
                        </span>
                      </div>
                      <h3 className="text-xl font-bold mb-2">Professional</h3>
                      <p className="text-sm mb-4 opacity-80">For growing businesses with evolving needs</p>
                      <div className="text-2xl font-bold mb-2">$5,000<span className="text-sm font-normal">/mo</span></div>
                      <Link 
                        href="/contact?plan=professional"
                        className="block w-full py-2 px-4 rounded-md text-center bg-primary text-white hover:bg-primary-dark transition-colors"
                      >
                        Get Started
                      </Link>
                    </div>
                  </th>
                  <th className="w-1/4">
                    <div 
                      className={`p-4 rounded-t-lg transition-all ${
                        focusedLevel === 'enterprise' 
                          ? 'bg-primary text-white scale-105' 
                          : 'bg-gray-100 dark:bg-gray-800'
                      }`}
                      onMouseEnter={() => handleFocus('enterprise')}
                      onMouseLeave={handleBlur}
                    >
                      <h3 className="text-xl font-bold mb-2">Enterprise</h3>
                      <p className="text-sm mb-4 opacity-80">For complex operations requiring custom solutions</p>
                      <div className="text-2xl font-bold mb-2">Custom<span className="text-sm font-normal"> pricing</span></div>
                      <Link 
                        href="/contact?plan=enterprise"
                        className="block w-full py-2 px-4 rounded-md text-center bg-primary text-white hover:bg-primary-dark transition-colors"
                      >
                        Get Started
                      </Link>
                    </div>
                  </th>
                </tr>
              </thead>
              
              {/* Table Body */}
              <tbody>
                {serviceFeatures.map((feature, index) => (
                  <tr 
                    key={index}
                    className={index % 2 === 0 ? 'bg-white dark:bg-dark' : 'bg-gray-50 dark:bg-dark-light'}
                  >
                    <td className="p-4 font-medium border-b border-gray-200 dark:border-gray-700">
                      <div>
                        <div className="font-semibold">{feature.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{feature.description}</div>
                      </div>
                    </td>
                    
                    {(['standard', 'professional', 'enterprise'] as ServiceLevel[]).map((level) => (
                      <td 
                        key={level} 
                        className={`p-4 text-center border-b border-gray-200 dark:border-gray-700 ${
                          focusedLevel === level ? 'bg-primary/5' : ''
                        }`}
                      >
                        {typeof feature.availability[level] === 'boolean' ? (
                          feature.availability[level] ? (
                            <span className="text-green-500 text-2xl">
                              <i className="fas fa-check-circle"></i>
                            </span>
                          ) : (
                            <span className="text-red-500 text-2xl">
                              <i className="fas fa-times-circle"></i>
                            </span>
                          )
                        ) : (
                          <span>{feature.availability[level]}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-10 text-center">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Not sure which plan is right for you? Let's discuss your specific needs.
            </p>
            <Link 
              href="/contact" 
              className="inline-block py-3 px-8 rounded-md bg-primary text-white hover:bg-primary-dark transition-colors"
            >
              Book a Free Consultation
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesComparisonTable;
