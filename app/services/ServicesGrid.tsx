'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

type ServiceType = 'crm' | 'bi' | 'integration' | 'retention';

interface ServiceItem {
  id: ServiceType;
  icon: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  benefits: string[];
  cta: {
    text: string;
    link: string;
  };
}

const services: ServiceItem[] = [
  {
    id: 'crm',
    icon: 'database',
    title: 'Salesforce Implementation & Optimization',
    shortDescription: 'Transform your CRM from a data repository into a strategic revenue engine.',
    longDescription: 'Your CRM should be the central hub driving your entire revenue engine. Our implementation and optimization services ensure you get maximum value from your Salesforce investment through custom configurations, workflow automation, and adoption strategies tailored to your unique business needs.',
    benefits: [
      'Custom Salesforce implementation tailored to your sales process',
      'RevOps health assessment with clear optimization opportunities',
      'Intelligent workflow automation to eliminate repetitive tasks',
      'Role-specific training and adoption programs for your team'
    ],
    cta: {
      text: 'Schedule Your CRM Assessment',
      link: '/contact?service=crm'
    }
  },
  {
    id: 'bi',
    icon: 'chart-line',
    title: 'Revenue Analytics & Reporting',
    shortDescription: 'Transform disparate data into unified insights that drive strategic decisions.',
    longDescription: 'Stop drowning in scattered reports and start leveraging unified revenue intelligence. Our analytics solutions help you create real-time visualizations of your most critical metrics, develop advanced pipeline forecasting, and identify conversion bottlenecks at every stage of your funnel.',
    benefits: [
      'Custom revenue dashboards with intuitive, actionable formats',
      'Advanced pipeline analysis and accurate forecasting models',
      'Conversion rate optimization across your entire funnel',
      'Unified measurement framework aligning all revenue teams'
    ],
    cta: {
      text: 'Request a Revenue Intelligence Assessment',
      link: '/contact?service=bi'
    }
  },
  {
    id: 'integration',
    icon: 'sync-alt',
    title: 'Systems Integration & Automation',
    shortDescription: 'Create a unified technology ecosystem that eliminates data silos.',
    longDescription: 'Modern revenue teams rely on dozens of specialized tools. We ensure they work together seamlessly through end-to-end systems integration, custom API development, data quality management, and comprehensive process automation that spans your entire tech stack.',
    benefits: [
      'End-to-end integration of all revenue platforms and tools',
      'Custom API development for reliable system communication',
      'Data quality protocols to ensure accuracy across systems',
      'Multi-system workflow automation to eliminate manual tasks'
    ],
    cta: {
      text: 'Get Your Integration Assessment',
      link: '/contact?service=integration'
    }
  },
  {
    id: 'retention',
    icon: 'users',
    title: 'Customer Lifecycle Optimization',
    shortDescription: 'Maximize customer lifetime value with data-driven retention strategies.',
    longDescription: 'In SaaS, retention and expansion are far more profitable than acquisition. Our lifecycle optimization helps you develop predictive health scoring, implement automated engagement sequences, identify expansion opportunities, and create a unified view of customer experience across all touchpoints.',
    benefits: [
      'Predictive customer health scoring models',
      'Automated engagement sequences based on behavior',
      'Expansion opportunity identification frameworks',
      'Customer experience mapping across all touchpoints'
    ],
    cta: {
      text: 'Book a Retention Strategy Session',
      link: '/contact?service=retention'
    }
  }
];

export default function ServicesGrid() {
  const [activeService, setActiveService] = useState<ServiceType | null>(null);
  const [animationComplete, setAnimationComplete] = useState(false);
  const cardsRef = useRef<HTMLDivElement>(null);
  
  // Initialize with the first service on load
  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveService('crm');
      setAnimationComplete(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Card variants for framer-motion
  const cardVariants = {
    inactive: { scale: 0.95, opacity: 0.7, y: 0 },
    active: { scale: 1, opacity: 1, y: -10 },
    initial: { scale: 0.9, opacity: 0, y: 20 }
  };
  
  // Content variants for framer-motion
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };
  
  // Item variants for staggered animations
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };
  
  // Handle scroll to cards on small screens
  const scrollToCards = () => {
    if (cardsRef.current && window.innerWidth < 768) {
      cardsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative">
      {/* Background decorative elements - more subtle */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-blue-100/30 dark:bg-blue-900/15 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl z-0"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-100/30 dark:bg-indigo-900/15 rounded-full translate-y-1/2 -translate-x-1/3 blur-2xl z-0"></div>
      
      {/* Service Selection Cards - more compact */}
      <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12 relative z-10">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            className={`
              relative overflow-hidden rounded-2xl cursor-pointer transition-all group
              backdrop-blur-md
              ${activeService === service.id 
                ? 'shadow-xl' 
                : 'shadow-lg hover:shadow-xl'
              }
            `}
            style={{
              border: `2px solid ${
                activeService === service.id 
                  ? (service.id === 'crm' ? '#4361ee' : 
                    service.id === 'bi' ? '#4895ef' : 
                    service.id === 'integration' ? '#7209b7' : 
                    '#f72585')
                  : (service.id === 'crm' ? 'rgba(67, 97, 238, 0.3)' : 
                    service.id === 'bi' ? 'rgba(72, 149, 239, 0.3)' : 
                    service.id === 'integration' ? 'rgba(114, 9, 183, 0.3)' : 
                    'rgba(247, 37, 133, 0.3)')
              }`
            }}
            initial="initial"
            animate={activeService === service.id ? "active" : "inactive"}
            variants={cardVariants}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            onClick={() => {
              setActiveService(service.id);
              scrollToCards();
            }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            {/* Glass background effect */}
            <div 
              className="absolute inset-0 z-0 transition-opacity bg-white/70 dark:bg-gray-900/80"
            ></div>
            
            {/* Gradient Background overlay */}
            <div 
              className={`absolute inset-0 z-0 transition-opacity ${
                activeService === service.id ? 'opacity-40' : 'opacity-20 group-hover:opacity-30'
              }`}
              style={{
                background: `radial-gradient(circle at 50% 0%, 
                  ${service.id === 'crm' ? '#4361ee' : 
                   service.id === 'bi' ? '#4895ef' : 
                   service.id === 'integration' ? '#7209b7' : '#f72585'}, 
                  transparent 85%)`,
              }}
            ></div>
            
            <div className="p-6 relative z-10">
              {/* Service Icon with Animated Background */}
              <div className="mb-4 relative">
                <div 
                  className={`
                    w-16 h-16 rounded-full flex items-center justify-center
                    ${activeService === service.id 
                      ? 'bg-primary text-white' 
                      : 'bg-primary/10 text-primary dark:bg-primary/20'
                    }
                    transition-all group-hover:bg-primary group-hover:text-white
                    relative z-10
                  `}
                >
                  <i className={`fas fa-${service.icon} text-2xl`}></i>
                  
                  {/* Animated blob behind icon */}
                  <div 
                    className={`
                      absolute -inset-4 bg-primary/5 rounded-full blur-md z-0
                      transition-all duration-700 ease-in-out
                      ${activeService === service.id ? 'scale-150 animate-pulse-slow' : 'scale-0'}
                      group-hover:scale-150
                    `}
                  ></div>
                </div>
                
                {/* Active indicator dot */}
                {activeService === service.id && (
                  <motion.div 
                    className="absolute top-0 right-0 w-3 h-3 bg-primary rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  ></motion.div>
                )}
              </div>
              
              <h3 className={`
                text-xl font-bold mb-3 group-hover:text-primary transition-colors
                ${activeService === service.id ? 'text-primary' : 'text-gray-900 dark:text-white'}
              `}>
                {service.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-100 mb-4">
                {service.shortDescription}
              </p>
              
              <div className={`
                text-sm font-medium flex items-center transition-colors
                ${activeService === service.id ? 'text-primary' : 'text-gray-500 dark:text-gray-200'}
                group-hover:text-primary
              `}>
                <span>{activeService === service.id ? 'Currently Viewing' : 'View Details'}</span>
                <i className={`
                  fas fa-arrow-right ml-2 transition-transform
                  ${activeService === service.id ? 'translate-x-1' : ''}
                  group-hover:translate-x-1
                `}></i>
              </div>
            </div>
            
            {/* Bottom border accent - animates on hover/active */}
            <div 
              className={`
                absolute bottom-0 left-0 h-1 bg-gradient-to-r transition-all duration-300 ease-out
                from-primary to-primary-light
                ${activeService === service.id ? 'w-full' : 'w-0 group-hover:w-full'}
              `}
            ></div>
          </motion.div>
        ))}
      </div>
      
      {/* Service Detail Section */}
      <motion.div 
        className="relative rounded-2xl p-8 shadow-xl overflow-hidden mb-16 backdrop-blur-md bg-white/80 dark:bg-gradient-to-br dark:from-[#1a2033] dark:to-[#141927]"
        style={{
          background: `linear-gradient(145deg, 
            var(--tw-gradient-from), 
            var(--tw-gradient-to)
          )`,
          backdropFilter: 'blur(10px)',
          '--tw-gradient-from': 'rgba(255, 255, 255, 0.7)',
          '--tw-gradient-to': 'rgba(255, 255, 255, 0.5)',
          boxShadow: 'var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)',
          '--tw-shadow': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          border: activeService ? `2px solid ${
            activeService === 'crm' ? 'rgba(67, 97, 238, 0.3)' : 
            activeService === 'bi' ? 'rgba(72, 149, 239, 0.3)' : 
            activeService === 'integration' ? 'rgba(114, 9, 183, 0.3)' : 
            'rgba(247, 37, 133, 0.3)'
          }` : '2px solid rgba(100, 116, 139, 0.1)',
        }}
        key={activeService}
        initial="hidden"
        animate="visible"
        variants={contentVariants}
      >
        {/* Service-specific gradient overlay */}
        <div 
          className="absolute inset-0 z-0 opacity-20 dark:opacity-25"
          style={{
            background: activeService ? `linear-gradient(145deg, 
              ${activeService === 'crm' ? 'rgba(67, 97, 238, 0.25)' : 
              activeService === 'bi' ? 'rgba(72, 149, 239, 0.25)' : 
              activeService === 'integration' ? 'rgba(114, 9, 183, 0.25)' : 
              'rgba(247, 37, 133, 0.25)'}, 
              ${activeService === 'crm' ? 'rgba(67, 97, 238, 0.15)' : 
              activeService === 'bi' ? 'rgba(72, 149, 239, 0.15)' : 
              activeService === 'integration' ? 'rgba(114, 9, 183, 0.15)' : 
              'rgba(247, 37, 133, 0.15)'} 
              )` : 'transparent'
          }}
        ></div>
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full -translate-y-1/3 translate-x-1/3 blur-3xl dark:blur-[80px]" 
          style={{
            background: activeService === 'crm' ? 'rgba(67, 97, 238, 0.15)' : 
                       activeService === 'bi' ? 'rgba(72, 149, 239, 0.15)' : 
                       activeService === 'integration' ? 'rgba(114, 9, 183, 0.15)' : 
                       'rgba(247, 37, 133, 0.15)'
          }}
        ></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full translate-y-1/3 -translate-x-1/3 blur-3xl dark:blur-[80px]"
          style={{
            background: activeService === 'crm' ? 'rgba(58, 86, 212, 0.15)' : 
                       activeService === 'bi' ? 'rgba(63, 131, 210, 0.15)' : 
                       activeService === 'integration' ? 'rgba(99, 8, 159, 0.15)' : 
                       'rgba(214, 32, 115, 0.15)'
          }}
        ></div>
        
        {/* Mesh Grid Background */}
        <div className="absolute inset-0 z-0 opacity-20 dark:opacity-15" style={{ 
          backgroundImage: `radial-gradient(circle at 20px 20px, rgba(67, 97, 238, 0.15) 2px, transparent 0)`, 
          backgroundSize: '40px 40px' 
        }}></div>
        
        {activeService && (
          <div className="relative z-10">
            <motion.div variants={itemVariants} 
              className="inline-flex items-center space-x-2 mb-6 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm"
              style={{
                background: activeService === 'crm' ? 'rgba(67, 97, 238, 0.2)' : 
                           activeService === 'bi' ? 'rgba(72, 149, 239, 0.2)' : 
                           activeService === 'integration' ? 'rgba(114, 9, 183, 0.2)' : 
                           'rgba(247, 37, 133, 0.2)',
                borderLeft: activeService === 'crm' ? '2px solid rgba(67, 97, 238, 0.8)' : 
                           activeService === 'bi' ? '2px solid rgba(72, 149, 239, 0.8)' : 
                           activeService === 'integration' ? '2px solid rgba(114, 9, 183, 0.8)' : 
                           '2px solid rgba(247, 37, 133, 0.8)'
              }}
            >
              <div className="w-2 h-2 rounded-full animate-pulse"
                style={{
                  background: activeService === 'crm' ? '#4361ee' : 
                            activeService === 'bi' ? '#4895ef' : 
                            activeService === 'integration' ? '#7209b7' : 
                            '#f72585'
                }}
              ></div>
              <span 
                className="text-sm font-medium tracking-wide"
                style={{
                  color: activeService === 'crm' ? '#4361ee' : 
                        activeService === 'bi' ? '#4895ef' : 
                        activeService === 'integration' ? '#7209b7' : 
                        '#f72585'
                }}
              >
                {services.find(s => s.id === activeService)?.id.toUpperCase()}
              </span>
            </motion.div>
            
            <motion.h3 variants={itemVariants} className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              {services.find(s => s.id === activeService)?.title}
            </motion.h3>
            
            <motion.p variants={itemVariants} className="text-lg text-gray-700 dark:text-gray-200 mb-8 leading-relaxed">
              {services.find(s => s.id === activeService)?.longDescription}
            </motion.p>
            
            <motion.div variants={itemVariants}>
              <h4 
                className="text-xl font-semibold mb-4"
                style={{
                  color: activeService === 'crm' ? '#4361ee' : 
                        activeService === 'bi' ? '#4895ef' : 
                        activeService === 'integration' ? '#7209b7' : 
                        '#f72585'
                }}
              >Key Benefits</h4>
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-4 mb-8">
                {services.find(s => s.id === activeService)?.benefits.map((benefit, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-start"
                    variants={itemVariants}
                  >
                    <div 
                      className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-3 mt-0.5 shadow-sm"
                      style={{
                        background: activeService === 'crm' ? 'rgba(67, 97, 238, 0.15)' : 
                                   activeService === 'bi' ? 'rgba(72, 149, 239, 0.15)' : 
                                   activeService === 'integration' ? 'rgba(114, 9, 183, 0.15)' : 
                                   'rgba(247, 37, 133, 0.15)',
                      }}
                    >
                      <i 
                        className="fas fa-check text-sm"
                        style={{
                          color: activeService === 'crm' ? '#4361ee' : 
                                activeService === 'bi' ? '#4895ef' : 
                                activeService === 'integration' ? '#7209b7' : 
                                '#f72585'
                        }}
                      ></i>
                    </div>
                    <p className="text-gray-700 dark:text-gray-100">{benefit}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="flex justify-center">
              <Link 
                href={services.find(s => s.id === activeService)?.cta.link || '/contact'}
                className="btn relative overflow-hidden group text-white py-4 px-8 rounded-full font-medium transition-all duration-300 shadow-md hover:shadow-xl hover:translate-y-[-2px] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-dark"
                style={{
                  background: activeService === 'crm' ? '#4361ee' : 
                           activeService === 'bi' ? '#4895ef' : 
                           activeService === 'integration' ? '#7209b7' : 
                           '#f72585',
                  boxShadow: activeService === 'crm' ? '0 4px 16px -4px rgba(67, 97, 238, 0.6)' : 
                            activeService === 'bi' ? '0 4px 16px -4px rgba(72, 149, 239, 0.6)' : 
                            activeService === 'integration' ? '0 4px 16px -4px rgba(114, 9, 183, 0.6)' : 
                            '0 4px 16px -4px rgba(247, 37, 133, 0.6)',
                }}
              >
                <span className="relative z-10 flex items-center">
                  <span>{services.find(s => s.id === activeService)?.cta.text}</span>
                  <i className="fas fa-arrow-right ml-2 transition-transform group-hover:translate-x-1"></i>
                </span>
                <span 
                  className="absolute w-0 h-full left-0 top-0 transition-all duration-300 group-hover:w-full -z-0"
                  style={{
                    background: activeService === 'crm' ? '#3a56d4' : 
                             activeService === 'bi' ? '#3a75d4' : 
                             activeService === 'integration' ? '#6008a0' : 
                             '#d62073',
                  }}
                ></span>
              </Link>
            </motion.div>
          </div>
        )}
      </motion.div>
    </div>
  );
}