'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Database, Workflow, BarChart, RefreshCw } from 'lucide-react';
import { useTheme } from '@/components/theme/ThemeProvider';

// Mapping of process steps to icons, colors, and metrics
const processIcons = [
  <Database className="h-6 w-6" key="database" />,
  <Workflow className="h-6 w-6" key="workflow" />,
  <BarChart className="h-6 w-6" key="barchart" />,
  <RefreshCw className="h-6 w-6" key="refreshcw" />
];

const processColors = [
  {
    color: 'from-blue-500 to-blue-600 dark:from-blue-500 dark:to-blue-600',
    bgLight: 'bg-blue-50',
    bgDark: 'dark:bg-blue-900/20'
  },
  {
    color: 'from-indigo-500 to-indigo-600 dark:from-indigo-500 dark:to-indigo-600',
    bgLight: 'bg-indigo-50',
    bgDark: 'dark:bg-indigo-900/20'
  },
  {
    color: 'from-violet-500 to-violet-600 dark:from-violet-500 dark:to-violet-600',
    bgLight: 'bg-violet-50',
    bgDark: 'dark:bg-violet-900/20'
  },
  {
    color: 'from-fuchsia-500 to-fuchsia-600 dark:from-fuchsia-500 dark:to-fuchsia-600',
    bgLight: 'bg-fuchsia-50',
    bgDark: 'dark:bg-fuchsia-900/20'
  }
];

const processMetrics = [
  {
    metric: '85%',
    metricLabel: 'Increased Data Utilization',
    metricDescription: 'Up from industry average of 35%'
  },
  {
    metric: '4-6',
    metricLabel: 'Week Implementation',
    metricDescription: '60% faster than traditional approaches'
  },
  {
    metric: '3x',
    metricLabel: 'Faster Decision Making',
    metricDescription: 'With real-time data access and insights'
  },
  {
    metric: '3-6',
    metricLabel: 'Month ROI Timeline',
    metricDescription: 'For most client implementations'
  }
];

interface ProcessSectionProps {
  processSteps: Array<{
    title: string;
    description: string;
  }>;
}

export default function ProcessSection({ processSteps }: ProcessSectionProps) {
  const { theme } = useTheme();
  const isLightTheme = theme === 'light';
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: delay,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };
  
  return (
    <section className={`py-24 ${isLightTheme ? 'bg-gray-50' : 'bg-[#141927]'}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className={`text-3xl font-bold mb-4 ${isLightTheme ? 'text-gray-800' : 'text-white'}`}
          >
            Our Data Transformation Process
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className={`text-lg ${isLightTheme ? 'text-gray-700' : 'text-gray-300'}`}
          >
            A proven methodology that delivers measurable results through strategic data integration and analytics
          </motion.p>
        </div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 gap-8"
        >
          {processSteps.map((step, index) => {
            const colorObj = processColors[index % processColors.length];
            const metricObj = processMetrics[index % processMetrics.length];
            const delay = 0.1 + (index * 0.1);
            
            return (
              <motion.div
                key={index}
                custom={delay}
                variants={itemVariants}
                className={`relative overflow-hidden rounded-2xl shadow-lg ${isLightTheme ? 'bg-white border border-gray-200' : 'bg-[#1a2033] border border-gray-800'}`}
              >
                {/* Colored top accent bar */}
                <div className={`h-2 w-full bg-gradient-to-r ${colorObj.color}`}></div>
                
                <div className="p-8">
                  {/* Icon and title row */}
                  <div className="flex items-center mb-4">
                    <div className={`p-3 rounded-xl mr-4 ${isLightTheme ? `${colorObj.bgLight} shadow-sm` : colorObj.bgDark}`}>
                      <div className={`${isLightTheme ? `text-${colorObj.color.split('-')[1].split(' ')[0]}` : `bg-gradient-to-br ${colorObj.color} bg-clip-text text-transparent`}`}>
                        {processIcons[index % processIcons.length]}
                      </div>
                    </div>
                    <h3 className={`text-xl font-bold ${isLightTheme ? 'text-gray-800' : 'text-white'}`}>
                      {step.title}
                    </h3>
                  </div>
                  
                  {/* Description */}
                  <p className={`mb-6 ${isLightTheme ? 'text-gray-700 text-base leading-relaxed' : 'text-gray-300'}`}>
                    {step.description}
                  </p>
                  
                  {/* Metric highlight */}
                  <div className={`flex items-center p-5 rounded-xl ${isLightTheme ? `${colorObj.bgLight} border border-${colorObj.color.split('-')[1].split(' ')[0]}/20` : colorObj.bgDark}`}>
                    <div className="mr-4">
                      <div className={`text-2xl font-bold ${isLightTheme ? `text-${colorObj.color.split('-')[1].split(' ')[0]}` : `bg-gradient-to-r ${colorObj.color} bg-clip-text text-transparent`}`}>
                        {metricObj.metric}
                      </div>
                      <div className={`text-sm font-medium ${isLightTheme ? 'text-gray-800' : 'text-gray-200'}`}>
                        {metricObj.metricLabel}
                      </div>
                    </div>
                    <div className={`text-sm ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`}>
                      {metricObj.metricDescription}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <a 
            href="/approach" 
            className={`inline-flex items-center px-6 py-3 rounded-lg font-medium
              ${isLightTheme 
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700' 
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700'} 
              shadow-md hover:shadow-lg transition-all`}
          >
            Learn more about our methodology
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
