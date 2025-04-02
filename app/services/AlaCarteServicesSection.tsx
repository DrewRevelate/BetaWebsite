'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';

interface ServiceOption {
  id: string;
  title: string;
  description: string;
  icon: string;
  examples: string[];
  color: string;
}

const serviceOptions: ServiceOption[] = [
  {
    id: 'assessment',
    title: 'RevOps Assessment',
    description: 'A comprehensive analysis of your current revenue operations with actionable recommendations.',
    icon: 'search',
    color: '#4361ee',
    examples: [
      'Revenue systems and processes audit',
      'Gap analysis and prioritized recommendations',
      'ROI projections for recommended improvements',
      'Implementation roadmap and timeline'
    ]
  },
  {
    id: 'implementation',
    title: 'System Implementation',
    description: 'Expert setup and configuration of your CRM and other revenue tools.',
    icon: 'cogs',
    color: '#4895ef',
    examples: [
      'Salesforce implementation and customization',
      'Marketing automation platform configuration',
      'Customer success tool setup',
      'User training and adoption planning'
    ]
  },
  {
    id: 'integration',
    title: 'Integration Services',
    description: 'Connect your critical systems for seamless data flow and reporting.',
    icon: 'link',
    color: '#3a56d4',
    examples: [
      'CRM and marketing automation integration',
      'Custom API development',
      'Data migration and cleaning',
      'Workflow automation across platforms'
    ]
  },
  {
    id: 'reporting',
    title: 'Analytics & Reporting',
    description: 'Transform your data into actionable insights with custom dashboards.',
    icon: 'chart-bar',
    color: '#7209b7',
    examples: [
      'Custom KPI dashboard development',
      'Pipeline analytics and forecasting',
      'Marketing attribution modeling',
      'Customer health score development'
    ]
  },
  {
    id: 'optimization',
    title: 'Process Optimization',
    description: 'Streamline your revenue operations for efficiency and growth.',
    icon: 'tachometer-alt',
    color: '#9d4edd',
    examples: [
      'Sales process refinement',
      'Lead routing and qualification',
      'Opportunity management workflows',
      'Customer onboarding sequence design'
    ]
  },
  {
    id: 'training',
    title: 'Training & Enablement',
    description: 'Ensure your team can effectively use your revenue tools.',
    icon: 'users-cog',
    color: '#f72585',
    examples: [
      'Role-specific CRM training',
      'Admin enablement and certification',
      'Custom documentation development',
      'Ongoing enablement programs'
    ]
  }
];

export default function AlaCarteServicesSection() {
  const [activeOption, setActiveOption] = useState<string | null>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [inView, setInView] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  
  // Monitor when section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          controls.start("visible");
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => observer.disconnect();
  }, [controls]);
  
  const handleToggle = (id: string) => {
    setActiveOption(id);
    setIsDetailsModalOpen(true);
  };
  
  const closeDetailsModal = () => {
    setIsDetailsModalOpen(false);
  };
  
  const toggleServiceSelection = (id: string) => {
    setSelectedServices(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    );
  };
  
  // Handle escape key press to close modal
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isDetailsModalOpen) {
        closeDetailsModal();
      }
    };
    
    window.addEventListener('keydown', handleEscapeKey);
    return () => window.removeEventListener('keydown', handleEscapeKey);
  }, [isDetailsModalOpen]);
  
  // Handle clicks outside the modal to close it
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isDetailsModalOpen && modalRef.current && !modalRef.current.contains(e.target as Node)) {
        closeDetailsModal();
      }
    };
    
    window.addEventListener('mousedown', handleClickOutside);
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, [isDetailsModalOpen]);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section 
      ref={sectionRef} 
      id="a-la-carte" 
      className="py-12 md:py-16 relative overflow-hidden"
      aria-labelledby="a-la-carte-title"
    >
      {/* Distinctive background with diagonal stripes and enhanced visual interest */}
      <div className="absolute inset-0 bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-950 z-0">
        <div className="absolute inset-0 opacity-20" 
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 20px,
              rgba(99, 102, 241, 0.05) 20px,
              rgba(99, 102, 241, 0.05) 40px
            )`
          }}>
        </div>
        <div className="absolute inset-0 opacity-30" 
          style={{
            backgroundImage: `radial-gradient(
              circle at 100% 100%,
              rgba(167, 139, 250, 0.2) 0%,
              transparent 50%
            )`
          }}>
        </div>
        <div className="absolute inset-0 opacity-30" 
          style={{
            backgroundImage: `radial-gradient(
              circle at 0% 0%,
              rgba(79, 70, 229, 0.2) 0%,
              transparent 50%
            )`
          }}>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced header with stronger visual presence */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 md:mb-12"
        >
          <div className="inline-block mb-3">
            <div className="relative inline-flex items-center px-4 py-2 rounded-full">
              <div className="absolute inset-0 bg-indigo-100/80 dark:bg-white/5 backdrop-blur-md rounded-full border border-indigo-200 dark:border-white/10"></div>
              <span className="text-sm font-semibold tracking-wide text-indigo-800 dark:text-white uppercase relative z-10">Design Your Own Solution</span>
            </div>
          </div>
          
          <h2 id="a-la-carte-title" className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight text-gray-900 dark:text-white">
            <span className="relative">
              A La Carte Services
              <motion.div 
                className="absolute -bottom-2 left-0 h-1 bg-indigo-500"
                initial={{ width: 0, opacity: 0 }}
                animate={inView ? { width: '100%', opacity: 1 } : { width: 0, opacity: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              ></motion.div>
            </span>
          </h2>
          
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-700 dark:text-gray-100 leading-relaxed">
            Mix and match exactly what you need. No more, no less.
          </p>
        </motion.div>

        {/* Interactive service builder with visual metaphor */}
        <div className="max-w-5xl mx-auto mb-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7 }}
            className="bg-white dark:bg-gray-900/30 backdrop-blur-md rounded-xl overflow-hidden border border-gray-200 dark:border-gray-600/30 shadow-lg"
          >
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-center md:items-start mb-8 md:mb-10 gap-6">
                <div className="md:w-1/3 text-center md:text-left">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-indigo-600 text-white mb-4">
                    <i className="fas fa-puzzle-piece text-xl"></i>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 text-gray-900 dark:text-white">Build Your Perfect Solution</h3>
                  <p className="text-gray-700 dark:text-gray-200 text-base">
                    Select the exact services you need from our menu. No unnecessary components.
                  </p>
                </div>
                
                <div className="md:w-2/3 bg-gray-50 dark:bg-gray-800/70 rounded-lg p-5 border border-gray-200 dark:border-gray-600/40">
                  <h4 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">Why Choose A La Carte?</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      { text: 'Pay only for what you need', icon: 'hand-holding-usd' },
                      { text: 'Start small and scale as you grow', icon: 'seedling' },
                      { text: 'Tailor solutions to your requirements', icon: 'puzzle-piece' },
                      { text: 'Adapt services as your business evolves', icon: 'sync' }
                    ].map((item, index) => (
                      <motion.div 
                        key={index}
                        className="flex items-center bg-gray-100 dark:bg-gray-700/40 rounded-lg p-2.5"
                        initial={{ opacity: 0, x: -10 }}
                        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                        transition={{ duration: 0.4, delay: 0.2 + (index * 0.1) }}
                      >
                        <div className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center mr-2.5 bg-indigo-500/30 dark:bg-indigo-500/40 text-white">
                          <i className={`fas fa-${item.icon} text-sm`}></i>
                        </div>
                        <p className="text-gray-800 dark:text-gray-100 text-sm">{item.text}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Service blocks - presented as modular building blocks */}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white text-center">
                  Select Your Services
                  <span className="block text-base font-normal text-gray-600 dark:text-gray-300 mt-1">
                    Choose any combination for your custom solution
                  </span>
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {serviceOptions.map((service, index) => (
                    <div
                      key={service.id}
                      className={`
                        relative overflow-hidden rounded-lg cursor-pointer transition-all duration-300
                        ${selectedServices.includes(service.id) 
                          ? 'ring-1 ring-offset-1 ring-offset-gray-900 shadow-lg -translate-y-1' 
                          : 'hover:-translate-y-1 hover:shadow-md'}
                      `}
                      style={{ 
                        boxShadow: selectedServices.includes(service.id) 
                          ? `0 10px 20px -5px ${service.color}40`
                          : '',
                        opacity: inView ? 1 : 0,
                        transform: inView ? 'translateY(0)' : 'translateY(20px)',
                        transition: `all 0.4s ease-out ${index * 0.1}s`
                      }}
                      onClick={() => toggleServiceSelection(service.id)}
                    >
                      <div className={`
                        h-full backdrop-blur-sm transition-all duration-300 relative
                        ${selectedServices.includes(service.id) 
                          ? 'border shadow-md'
                          : 'border shadow-sm'}
                        ${index % 3 === 0 
                          ? `${selectedServices.includes(service.id) 
                              ? 'bg-indigo-50 dark:bg-gray-700/90 border-indigo-300 dark:border-gray-500' 
                              : 'bg-indigo-50/90 dark:bg-gray-700/80 border-indigo-200 dark:border-gray-600/50'}`
                          : index % 3 === 1
                          ? `${selectedServices.includes(service.id)
                              ? 'bg-blue-50 dark:bg-gray-800/90 border-blue-300 dark:border-gray-500'
                              : 'bg-blue-50/90 dark:bg-gray-800/80 border-blue-200 dark:border-gray-600/50'}`
                          : `${selectedServices.includes(service.id)
                              ? 'bg-purple-50 dark:bg-gray-900/90 border-purple-300 dark:border-gray-500'
                              : 'bg-purple-50/90 dark:bg-gray-900/80 border-purple-200 dark:border-gray-600/50'}`
                        }
                      `}>
                        {/* Selected indicator */}
                        {selectedServices.includes(service.id) && (
                          <div className="absolute top-0 right-0 left-0 py-1 px-3 flex items-center justify-center z-20 shadow-sm bg-indigo-600 dark:bg-indigo-700">
                            <span className="text-xs font-medium text-white uppercase">Selected</span>
                          </div>
                        )}
                        
                        <div className={`p-4 ${selectedServices.includes(service.id) ? 'pt-7' : ''} relative z-10 h-full flex flex-col`}>
                          <div className="mb-4 flex">
                            {/* Service icon */}
                            <div 
                              className="w-10 h-10 rounded-lg flex items-center justify-center shadow-sm mr-3"
                              style={{
                                background: service.color
                              }}
                            >
                              <i className={`fas fa-${service.icon} text-sm text-white`}></i>
                            </div>
                            
                            <div>
                              <h3 className="text-lg font-bold mb-0.5 text-gray-900 dark:text-white">
                                {service.title}
                              </h3>
                              <p className="text-gray-700 dark:text-gray-200 text-xs">
                                {service.description}
                              </p>
                            </div>
                          </div>
                          
                          {/* Features preview */}
                          <div className="mt-auto">
                            <div className="text-gray-700 dark:text-gray-200 text-xs font-medium mb-1">Top features:</div>
                            <div className="space-y-1">
                              {service.examples.slice(0, 2).map((example, idx) => (
                                <div key={idx} className="flex items-center">
                                  <div className="w-3 h-3 rounded-full flex items-center justify-center mr-1.5 bg-indigo-400/30 text-white">
                                    <i className="fas fa-check text-[0.6rem]"></i>
                                  </div>
                                  <p className="text-gray-600 dark:text-gray-200 text-xs">{example}</p>
                                </div>
                              ))}
                              {service.examples.length > 2 && (
                                <p className="text-gray-500 dark:text-gray-400 text-xs ml-4.5">
                                  +{service.examples.length - 2} more
                                </p>
                              )}
                            </div>
                          </div>
                          
                          {/* Enhanced details button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggle(service.id);
                            }}
                            className="mt-3 px-2 py-1 rounded-md bg-indigo-600/70 hover:bg-indigo-600/90 text-xs font-medium text-white transition-all duration-300 flex items-center gap-1 shadow-sm w-fit"
                            aria-expanded={activeOption === service.id && isDetailsModalOpen}
                            aria-controls={`details-modal-${service.id}`}
                          >
                            <i className="fas fa-info-circle text-[0.65rem]"></i>
                            <span>View details</span>
                          </button>
                        </div>
                        
                        {/* Bottom accent line */}
                        <div 
                          className="absolute bottom-0 left-0 h-1 transition-all duration-300"
                          style={{
                            background: service.color,
                            width: selectedServices.includes(service.id) ? '100%' : '30%',
                            opacity: selectedServices.includes(service.id) ? '1' : '0.7'
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Your custom solution summary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/80 dark:to-gray-900/90 rounded-lg p-4 border border-gray-200 dark:border-gray-600/50 shadow-md"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-0.5">Your Custom Solution</h3>
                    <p className="text-gray-700 dark:text-gray-200 text-sm">
                      {selectedServices.length > 0 
                        ? `${selectedServices.length} service${selectedServices.length > 1 ? 's' : ''} selected` 
                        : 'No services selected yet'}
                    </p>
                  </div>
                  
                  <div className="mt-3 sm:mt-0">
                    {selectedServices.length > 0 ? (
                      <Link 
                        href={`/contact?services=${selectedServices.join(',')}`}
                        className="inline-flex items-center bg-indigo-600 hover:bg-indigo-500 text-white py-2 px-4 rounded-lg font-medium transition-all duration-300 text-sm shadow-md"
                      >
                        <span>Get Custom Quote</span>
                        <i className="fas fa-arrow-right ml-1.5 text-sm"></i>
                      </Link>
                    ) : (
                      <button 
                        className="inline-flex items-center bg-gray-200 text-gray-500 dark:bg-gray-700/70 dark:text-gray-300 py-2 px-4 rounded-lg font-medium cursor-not-allowed text-sm"
                        disabled
                      >
                        <span>Select Services First</span>
                      </button>
                    )}
                  </div>
                </div>
                
                {selectedServices.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {selectedServices.map(id => {
                      const service = serviceOptions.find(opt => opt.id === id);
                      return service ? (
                        <div 
                          key={id} 
                          className="flex items-center bg-indigo-100/90 dark:bg-gray-700/80 rounded-md px-2 py-1 border border-indigo-300 dark:border-gray-500/60 shadow-sm"
                        >
                          <div 
                            className="w-4 h-4 rounded-sm flex items-center justify-center mr-1.5"
                            style={{ background: service.color }}
                          >
                            <i className={`fas fa-${service.icon} text-[0.6rem] text-white`}></i>
                          </div>
                          <span className="text-gray-900 dark:text-white text-xs font-medium mr-1.5">{service.title}</span>
                          <button 
                            onClick={() => toggleServiceSelection(id)}
                            className="text-gray-600 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white transition-colors"
                            aria-label={`Remove ${service.title}`}
                          >
                            <i className="fas fa-times-circle text-xs"></i>
                          </button>
                        </div>
                      ) : null;
                    })}
                  </div>
                ) : (
                  <div className="flex items-center justify-center py-6 bg-gray-100 dark:bg-gray-900/40 rounded-lg border border-dashed border-gray-300 dark:border-gray-700/50 shadow-inner">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-gray-200 dark:bg-gray-800/60 rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                        <i className="fas fa-puzzle-piece text-gray-500 dark:text-gray-200 text-lg"></i>
                      </div>
                      <p className="text-gray-700 dark:text-gray-100 mb-1 text-sm">Select services above to build your custom solution</p>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        </div>
        
        {/* Enhanced CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative rounded-xl overflow-hidden transform transition-transform duration-300 hover:-translate-y-1">
            {/* Animated background */}
            <div className="absolute inset-0">
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-600"
                animate={{
                  backgroundPosition: ['0% center', '100% center', '0% center'],
                  transition: { duration: 10, repeat: Infinity, ease: "linear" }
                }}
                style={{ backgroundSize: '200% 100%' }}
              ></motion.div>
              
              {/* Mesh pattern overlay */}
              <div className="absolute inset-0 opacity-20" style={{ 
                backgroundImage: `radial-gradient(circle at 20px 20px, rgba(255, 255, 255, 0.3) 1px, transparent 0)`, 
                backgroundSize: '20px 20px' 
              }}></div>
            </div>
            
            {/* Content */}
            <div className="relative p-6 md:p-8">
              <div className="grid md:grid-cols-2 gap-6 items-center">
                <div className="text-white">
                  <h3 className="text-2xl md:text-3xl font-bold mb-3">
                    Not Sure Where to Start?
                  </h3>
                  
                  <p className="text-lg text-white/90 mb-4 leading-relaxed">
                    Our experts will help you identify which services will deliver the most value.
                  </p>
                  
                  <div className="space-y-2 mb-5">
                    {[
                      'Free 30-minute strategy session',
                      'No-obligation consultation',
                      'Clear implementation roadmap'
                    ].map((item, i) => (
                      <div key={i} className="flex items-center">
                        <div className="mr-2 bg-white/20 rounded-full w-5 h-5 flex items-center justify-center">
                          <i className="fas fa-check text-xs"></i>
                        </div>
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Link 
                    href="/contact?source=alacarte-advice" 
                    className="inline-flex items-center group relative overflow-hidden bg-white text-indigo-600 hover:bg-indigo-50 py-2.5 px-5 rounded-lg font-medium text-sm shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <span className="relative z-10 flex items-center">
                      <span>Schedule Free Consultation</span>
                      <i className="fas fa-arrow-right ml-1.5 group-hover:translate-x-1 transition-transform"></i>
                    </span>
                  </Link>
                </div>
                
                {/* Right visual - abstract puzzle */}
                <div className="hidden md:block relative h-48">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      {/* Puzzle piece visual metaphor */}
                      <motion.div
                        className="absolute w-32 h-32 bg-white/10 rounded-xl border border-white/20 backdrop-blur-sm"
                        style={{ transform: 'rotate(15deg)', top: '-40px', left: '20px' }}
                        animate={{ rotate: [15, 10, 15], y: [0, -5, 0] }}
                        transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
                      >
                        <div className="absolute inset-0 flex items-center justify-center">
                          <i className="fas fa-search text-white/60 text-xl"></i>
                        </div>
                      </motion.div>
                      
                      <motion.div
                        className="absolute w-32 h-32 bg-white/10 rounded-xl border border-white/20 backdrop-blur-sm"
                        style={{ transform: 'rotate(-10deg)', top: '20px', left: '-20px' }}
                        animate={{ rotate: [-10, -5, -10], y: [0, 5, 0] }}
                        transition={{ duration: 7, repeat: Infinity, repeatType: "reverse" }}
                      >
                        <div className="absolute inset-0 flex items-center justify-center">
                          <i className="fas fa-cogs text-white/60 text-xl"></i>
                        </div>
                      </motion.div>
                      
                      {/* Central connecting element */}
                      <motion.div
                        className="relative z-10 w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-lg"
                        animate={{ 
                          boxShadow: [
                            "0 0 15px 0 rgba(255, 255, 255, 0.3)",
                            "0 0 30px 0 rgba(255, 255, 255, 0.5)",
                            "0 0 15px 0 rgba(255, 255, 255, 0.3)"
                          ]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        <i className="fas fa-handshake text-indigo-600 text-2xl"></i>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* New Service Details Modal */}
      <AnimatePresence>
        {isDetailsModalOpen && activeOption && (
          <>
            {/* Modal Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
              onClick={closeDetailsModal}
              aria-hidden="true"
            />
            
            {/* Modal Container - Fixed full screen positioning */}
            <div className="fixed inset-0 flex items-center justify-center z-50 px-4 py-6">
              {/* Modal Content */}
              <motion.div
                ref={modalRef}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ 
                  type: "spring", 
                  damping: 25, 
                  stiffness: 350,
                  duration: 0.3 
                }}
                className="w-full max-w-xl max-h-[90vh] overflow-hidden"
                role="dialog"
                aria-modal="true"
                aria-labelledby="service-details-title"
              >
              {(() => {
                const service = serviceOptions.find(s => s.id === activeOption);
                if (!service) return null;
                
                return (
                  <div className="rounded-xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-900 dark:to-black border border-gray-600/50 shadow-2xl">
                    {/* Decorative header with gradient */}
                    <div 
                      className="h-1.5"
                      style={{ 
                        background: service.color 
                      }}
                    />
                    
                    <div className="p-4 sm:p-5">
                      {/* Header section */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                          <div 
                            className="w-10 h-10 rounded-lg flex items-center justify-center mr-3 shadow-md"
                            style={{
                              background: service.color
                            }}
                          >
                            <i className={`fas fa-${service.icon} text-sm text-white`}></i>
                          </div>
                          
                          <div>
                            <h2 id="service-details-title" className="text-xl font-bold text-white">{service.title}</h2>
                            <p className="text-gray-300 text-sm">{service.description}</p>
                          </div>
                        </div>
                        
                        <button 
                          onClick={closeDetailsModal}
                          className="bg-gray-700/70 hover:bg-gray-600/80 rounded-full w-7 h-7 flex items-center justify-center border border-gray-500/40 text-gray-300 hover:text-white transition-colors"
                          aria-label="Close dialog"
                        >
                          <i className="fas fa-times text-sm"></i>
                        </button>
                      </div>
                      
                      {/* Content area with scrolling */}
                      <div className="mb-4 max-h-[40vh] sm:max-h-[45vh] overflow-y-auto custom-scrollbar pr-2 -mr-2">
                        <div className="bg-gray-700/40 rounded-lg p-4 mb-4 border border-gray-600/40 shadow-sm">
                          <h3 className="text-base font-semibold text-white mb-3 flex items-center">
                            <i className="fas fa-clipboard-list mr-2 text-gray-300"></i>
                            Service Components
                          </h3>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {service.examples.map((example, idx) => (
                              <motion.div 
                                key={idx}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1, duration: 0.3 }}
                                className="flex items-start bg-gray-600/40 rounded-lg p-2.5 border border-gray-500/30 hover:border-gray-500/50 transition-colors shadow-sm"
                              >
                                <div 
                                  className="flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center mr-2 mt-0.5"
                                  style={{ 
                                    background: `${service.color}40`,
                                    color: 'white' 
                                  }}
                                >
                                  <i className="fas fa-check text-xs"></i>
                                </div>
                                <div>
                                  <p className="text-white text-sm">{example}</p>
                                  <p className="text-gray-400 text-xs mt-0.5">
                                    {/* Dynamic benefit text based on service type */}
                                    {service.id === 'assessment' && 'Identifies key improvement areas'}
                                    {service.id === 'implementation' && 'Increases operational efficiency'}
                                    {service.id === 'integration' && 'Streamlines data flow'}
                                    {service.id === 'reporting' && 'Enhances decision making'}
                                    {service.id === 'optimization' && 'Accelerates revenue growth'}
                                    {service.id === 'training' && 'Improves team productivity'}
                                  </p>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Additional Information Section */}
                        <div className="rounded-lg border border-dashed border-gray-500/50 bg-gray-700/30 p-4 shadow-sm">
                          <h3 className="text-base font-semibold text-white mb-3 flex items-center">
                            <i className="fas fa-star mr-2 text-gray-300"></i>
                            Why Choose This Service
                          </h3>
                          
                          <div className="grid grid-cols-1 gap-2.5">
                            {/* Service-specific benefits */}
                            {(() => {
                              const benefits = {
                                assessment: [
                                  { text: 'Gain clarity on your current RevOps maturity', icon: 'search' },
                                  { text: 'Identify high-impact improvement opportunities', icon: 'bullseye' },
                                  { text: 'Establish a data-driven improvement roadmap', icon: 'map' }
                                ],
                                implementation: [
                                  { text: 'Expert system configuration tailored to your business', icon: 'tools' },
                                  { text: 'Minimize disruption during implementation', icon: 'shield-alt' },
                                  { text: 'Accelerate time-to-value for your tech investment', icon: 'tachometer-alt' }
                                ],
                                integration: [
                                  { text: 'Eliminate data silos between key systems', icon: 'random' },
                                  { text: 'Create seamless workflows across departments', icon: 'project-diagram' },
                                  { text: 'Ensure data consistency and accuracy', icon: 'check-double' }
                                ],
                                reporting: [
                                  { text: 'Transform raw data into actionable insights', icon: 'chart-line' },
                                  { text: 'Make better decisions with real-time metrics', icon: 'brain' },
                                  { text: 'Identify trends before they impact your business', icon: 'binoculars' }
                                ],
                                optimization: [
                                  { text: 'Eliminate bottlenecks in your revenue process', icon: 'filter' },
                                  { text: 'Increase conversion rates at critical funnel stages', icon: 'funnel-dollar' },
                                  { text: 'Maximize team productivity and effectiveness', icon: 'users-cog' }
                                ],
                                training: [
                                  { text: 'Maximize ROI from your technology investments', icon: 'graduation-cap' },
                                  { text: 'Increase user adoption and confidence', icon: 'hand-holding-heart' },
                                  { text: 'Enable self-sufficiency and continuous learning', icon: 'book-reader' }
                                ]
                              };
                              
                              return benefits[service.id as keyof typeof benefits]?.map((benefit, idx) => (
                                <motion.div 
                                  key={idx}
                                  initial={{ opacity: 0, x: -5 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.3 + (idx * 0.1), duration: 0.3 }}
                                  className="flex items-center bg-gray-600/40 rounded-lg p-2.5 shadow-sm"
                                >
                                  <div className="w-6 h-6 rounded-full flex items-center justify-center mr-2 bg-gray-500/60 text-white">
                                    <i className={`fas fa-${benefit.icon} text-xs`}></i>
                                  </div>
                                  <p className="text-gray-100 text-sm">{benefit.text}</p>
                                </motion.div>
                              ));
                            })()}
                          </div>
                        </div>
                      </div>
                      
                      {/* Action buttons at the bottom */}
                      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 pt-3 border-t border-gray-600/50">
                        <button
                          onClick={closeDetailsModal}
                          className="text-gray-300 hover:text-white transition-colors flex items-center text-sm"
                        >
                          <i className="fas fa-arrow-left mr-1.5"></i>
                          <span>Back</span>
                        </button>
                        
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              toggleServiceSelection(service.id);
                              closeDetailsModal();
                            }}
                            className={`
                              px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300
                              ${selectedServices.includes(service.id)
                                ? 'bg-gray-600 text-white hover:bg-gray-500 border border-gray-500'
                                : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-md'}
                            `}
                          >
                            {selectedServices.includes(service.id) ? (
                              <>
                                <i className="fas fa-times-circle mr-1"></i>
                                <span>Remove</span>
                              </>
                            ) : (
                              <>
                                <i className="fas fa-plus mr-1"></i>
                                <span>Add to Solution</span>
                              </>
                            )}
                          </button>
                          
                          <Link 
                            href={`/contact?service=${service.id}`}
                            className="flex items-center justify-center px-3 py-1.5 bg-white text-indigo-600 hover:bg-gray-100 rounded-lg shadow-md font-medium transition-all duration-300 text-xs"
                            onClick={closeDetailsModal}
                          >
                            <i className="fas fa-envelope mr-1"></i>
                            <span>Inquire</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}