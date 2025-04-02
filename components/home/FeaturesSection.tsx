'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, BarChart, Database, LineChart, Zap } from 'lucide-react';

// Map of icon names to Lucide components
const iconMap = {
  'fas fa-database': <Database className="h-6 w-6" />,
  'fas fa-chart-line': <LineChart className="h-6 w-6" />,
  'fas fa-sync-alt': <Zap className="h-6 w-6" />,
  'fas fa-users': <BarChart className="h-6 w-6" />,
};

// Color classes for different service types
const colorClasses = [
  "bg-blue-500/10 text-blue-500 dark:bg-blue-500/10 dark:text-blue-400",
  "bg-indigo-500/10 text-indigo-500 dark:bg-indigo-500/10 dark:text-indigo-400",
  "bg-violet-500/10 text-violet-500 dark:bg-violet-500/10 dark:text-violet-400",
  "bg-sky-500/10 text-sky-500 dark:bg-sky-500/10 dark:text-sky-400"
];

interface FeaturesSectionProps {
  serviceData: Array<{
    title: string;
    description: string;
    icon: string;
    link: string;
  }>;
  expertisePoints: Array<{
    title: string;
    description: string;
  }>;
}

export default function FeaturesSection({ serviceData, expertisePoints }: FeaturesSectionProps) {
  return (
    <section className="py-20 bg-gray-50 dark:bg-[#1a2033]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Data Solutions That Drive Growth</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Our comprehensive suite of data services helps SaaS companies transform fragmented information into strategic advantages.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {serviceData.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="bg-white dark:bg-[#212841] rounded-xl p-6 shadow-lg h-full"
            >
              <div className={`inline-flex items-center justify-center p-3 rounded-lg ${colorClasses[index % colorClasses.length]} mb-5`}>
                {iconMap[service.icon] || <Database className="h-6 w-6" />}
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{service.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{service.description}</p>
              <Link 
                href={service.link}
                className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors text-sm font-medium"
              >
                Learn more <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </motion.div>
          ))}
        </div>
        
        {/* Expertise Points Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Why Choose Revelate</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We combine technical expertise with business acumen to deliver solutions that create real impact.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {expertisePoints.map((point, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-[#212841] p-6 rounded-xl shadow-lg"
              >
                <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">{point.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{point.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
