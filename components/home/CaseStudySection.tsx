'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const caseStudies = [
  {
    title: 'SaaS Conversion Optimization',
    industry: 'Marketing Technology',
    metric: '47% Increase',
    metricLabel: 'in Customer Conversion',
    description: 'How we helped a leading MarTech company consolidate customer data and increase their conversion rates dramatically.',
    image: '/images/case-studies/case1.jpg',
    iconBg: 'from-blue-500 to-indigo-600',
    link: '/case-studies/saas-conversion'
  },
  {
    title: 'Enterprise Data Integration',
    industry: 'Financial Services',
    metric: '85% Reduction',
    metricLabel: 'in Reporting Time',
    description: 'Automating complex financial reporting processes to deliver near real-time insights for executive decision making.',
    image: '/images/case-studies/case2.jpg',
    iconBg: 'from-indigo-500 to-violet-600',
    link: '/case-studies/enterprise-data'
  }
];

export default function CaseStudySection() {
  return (
    <section className="py-24 bg-white dark:bg-[#141927]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Success Stories</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            See how we've helped companies like yours transform their data operations and achieve measurable growth.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {caseStudies.map((study, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-gray-50 dark:bg-[#1a2033] rounded-xl overflow-hidden shadow-lg flex flex-col h-full"
            >
              <div className="relative h-56">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-800/80 to-indigo-800/80 dark:from-blue-900/80 dark:to-indigo-900/80 mix-blend-multiply z-10"></div>
                <Image
                  src={study.image || '/images/placeholders/case-study.jpg'}
                  alt={study.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 p-6 flex flex-col justify-between z-20">
                  <div className="flex justify-between items-start">
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm text-white text-xs rounded-full">
                      {study.industry}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{study.title}</h3>
                  </div>
                </div>
              </div>
              
              <div className="p-6 flex-grow flex flex-col">
                <div className="mb-4 px-4 py-3 bg-blue-50 dark:bg-blue-500/10 rounded-lg">
                  <div className="text-sm text-blue-600 dark:text-blue-400">Success Metric</div>
                  <div className="text-xl font-bold text-gray-900 dark:text-white">{study.metric}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">{study.metricLabel}</div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">{study.description}</p>
                
                <Link 
                  href={study.link}
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors mt-auto"
                >
                  Read full case study <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <motion.a
            href="/case-studies"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-6 py-3 rounded-full bg-blue-50 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-500/30 transition-colors font-medium"
          >
            View all case studies <ArrowRight className="ml-2 h-4 w-4" />
          </motion.a>
        </div>
      </div>
    </section>
  );
}
