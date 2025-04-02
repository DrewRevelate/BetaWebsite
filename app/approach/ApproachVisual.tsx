'use client';

import { motion } from 'framer-motion';

// Modern visual representation of our methodology
const ApproachVisual = () => {
  const methodologySteps = [
    { 
      number: '1',
      title: 'Discovery', 
      description: 'Comprehensive Analysis',
      details: 'In-depth assessment of your current revenue operations processes, systems, and team structure.',
      icon: 'search',
      gradient: 'from-blue-500 to-blue-600',
      iconColor: 'text-blue-600 dark:text-blue-300'
    },
    { 
      number: '2',
      title: 'Strategy', 
      description: 'Transformation Blueprint',
      details: 'Data-driven roadmap with prioritized initiatives aligned to your business objectives.',
      icon: 'lightbulb',
      gradient: 'from-cyan-500 to-cyan-600',
      iconColor: 'text-cyan-600 dark:text-cyan-300'
    },
    { 
      number: '3',
      title: 'Implementation', 
      description: 'Systematic Execution',
      details: 'Expert delivery of solutions with minimal disruption and maximum adoption.',
      icon: 'cogs',
      gradient: 'from-indigo-500 to-indigo-600',
      iconColor: 'text-indigo-600 dark:text-indigo-300'
    },
    { 
      number: '4',
      title: 'Optimization', 
      description: 'Continuous Improvement',
      details: 'Ongoing refinement to scale performance and drive sustainable growth.',
      icon: 'chart-line',
      gradient: 'from-violet-500 to-violet-600',
      iconColor: 'text-violet-600 dark:text-violet-300'
    }
  ];

  return (
    <div className="relative w-full max-w-6xl mx-auto px-4 lg:p-0">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8 relative">
        {/* Floating background elements */}
        <div className="absolute -top-8 -right-8 w-24 h-24 bg-blue-100/50 dark:bg-blue-900/20 rounded-full blur-xl"></div>
        <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-indigo-100/50 dark:bg-indigo-900/20 rounded-full blur-xl"></div>
        
        <div className="mb-6 border-b border-gray-100 dark:border-gray-700 pb-5">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Business Transformation Framework</h3>
          <p className="text-gray-600 dark:text-gray-300 mt-2">Our proven approach to operational excellence</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {methodologySteps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: {
                  delay: index * 0.1 + 0.2,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1]
                }
              }}
              className="relative bg-gray-50 dark:bg-gray-900 rounded-xl p-5 border border-gray-100 dark:border-gray-800 shadow-sm"
            >
              {/* Step number indicator */}
              <div className="flex items-center mb-4">
                <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-sm`}>
                  <span className="text-white font-semibold">{step.number}</span>
                </div>
                <div className="h-px flex-grow ml-3 bg-gray-200 dark:bg-gray-700"></div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 mt-1">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-sm`}>
                    <i className={`fas fa-${step.icon} text-white`}></i>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-lg">{step.title}</h4>
                  <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{step.description}</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mt-2 leading-relaxed">{step.details}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Key metrics with refined styling */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
          <div className="text-center py-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-100 dark:border-gray-800">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">94%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Client Satisfaction</div>
          </div>
          <div className="text-center py-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-100 dark:border-gray-800">
            <div className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">-40%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Implementation Time</div>
          </div>
          <div className="text-center py-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-100 dark:border-gray-800">
            <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">+65%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Team Adoption</div>
          </div>
          <div className="text-center py-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-100 dark:border-gray-800">
            <div className="text-2xl font-bold text-violet-600 dark:text-violet-400">5.3x</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Average ROI</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApproachVisual;