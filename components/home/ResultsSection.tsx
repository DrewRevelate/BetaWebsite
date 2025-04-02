'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/components/theme/ThemeProvider';
import { BarChart2, Users, Clock, TrendingUp, Award, Building } from 'lucide-react';

// Component for displaying statistics with animation
const StatCard = ({ icon, value, label, bgColor, color, delay }) => {
  const { theme } = useTheme();
  const isLightTheme = theme === 'light';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className={`relative overflow-hidden rounded-2xl ${isLightTheme ? 'bg-white border border-gray-100' : 'bg-[#1a2033] border border-gray-800'} shadow-md p-6`}
    >
      <div className={`absolute top-0 left-0 h-1 w-full ${bgColor}`}></div>
      <div className="flex items-center mb-4">
        <div className={`p-3 rounded-xl ${isLightTheme ? 'bg-gray-50' : 'bg-gray-800/50'}`}>
          <div className={`${color}`}>{icon}</div>
        </div>
      </div>
      <div className={`text-3xl font-bold mb-1 ${color}`}>{value}</div>
      <div className={`text-sm ${isLightTheme ? 'text-gray-600' : 'text-gray-300'}`}>{label}</div>
    </motion.div>
  );
};

// Component for displaying industry expertise
const IndustryCard = ({ industry, expertise, icon, color, delay }) => {
  const { theme } = useTheme();
  const isLightTheme = theme === 'light';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className={`flex items-start p-4 rounded-xl ${isLightTheme ? 'bg-white border border-gray-100' : 'bg-[#1a2033] border border-gray-800'} shadow-sm`}
    >
      <div className={`p-2 rounded-lg mr-4 ${isLightTheme ? 'bg-gray-50' : 'bg-gray-800/50'}`}>
        <div className={`${color}`}>{icon}</div>
      </div>
      <div>
        <h4 className={`font-bold mb-1 ${isLightTheme ? 'text-gray-900' : 'text-white'}`}>{industry}</h4>
        <p className={`text-sm ${isLightTheme ? 'text-gray-600' : 'text-gray-300'}`}>{expertise}</p>
      </div>
    </motion.div>
  );
};

interface ResultsSectionProps {
  resultCards: Array<{
    tag: string;
    title: string;
    client: string;
    description: string;
    metrics: Array<{
      value: string;
      label: string;
    }>;
    link: string;
  }>;
}

export default function ResultsSection({ resultCards }: ResultsSectionProps) {
  const { theme } = useTheme();
  const isLightTheme = theme === 'light';
  
  // Statistics data
  const stats = [
    {
      icon: <TrendingUp className="h-5 w-5" />,
      value: '40%',
      label: 'Average Revenue Growth',
      bgColor: 'bg-emerald-500',
      color: 'text-emerald-500 dark:text-emerald-400',
      delay: 0.1
    },
    {
      icon: <BarChart2 className="h-5 w-5" />,
      value: '85%',
      label: 'Increase in Data Utilization',
      bgColor: 'bg-blue-500',
      color: 'text-blue-500 dark:text-blue-400',
      delay: 0.2
    },
    {
      icon: <Clock className="h-5 w-5" />,
      value: '73%',
      label: 'Reduction in Reporting Time',
      bgColor: 'bg-indigo-500',
      color: 'text-indigo-500 dark:text-indigo-400',
      delay: 0.3
    },
    {
      icon: <Users className="h-5 w-5" />,
      value: '65%',
      label: 'Improved Customer Retention',
      bgColor: 'bg-violet-500',
      color: 'text-violet-500 dark:text-violet-400',
      delay: 0.4
    }
  ];
  
  // Industry expertise data
  const industries = [
    {
      industry: 'SaaS & Technology',
      expertise: 'Unifying product, customer, and revenue data for growth',
      icon: <Building className="h-5 w-5" />,
      color: 'text-blue-500 dark:text-blue-400',
      delay: 0.3
    },
    {
      industry: 'Financial Services',
      expertise: 'Regulatory compliance and real-time reporting',
      icon: <Building className="h-5 w-5" />,
      color: 'text-indigo-500 dark:text-indigo-400',
      delay: 0.4
    },
    {
      industry: 'E-commerce & Retail',
      expertise: 'Omnichannel data integration and customer insights',
      icon: <Building className="h-5 w-5" />,
      color: 'text-violet-500 dark:text-violet-400',
      delay: 0.5
    },
    {
      industry: 'Healthcare',
      expertise: 'Secure data environments and analytics solutions',
      icon: <Building className="h-5 w-5" />,
      color: 'text-emerald-500 dark:text-emerald-400',
      delay: 0.6
    }
  ];
  
  return (
    <section className={`py-24 ${isLightTheme ? 'bg-gray-50' : 'bg-[#161c2e]'}`}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full mb-4 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 dark:from-blue-500/20 dark:to-indigo-500/20">
            <Award className={`h-4 w-4 mr-2 ${isLightTheme ? 'text-blue-600' : 'text-blue-400'}`} />
            <span className={`text-sm font-medium ${isLightTheme ? 'text-blue-600' : 'text-blue-400'}`}>Proven Results</span>
          </div>
          
          <h2 className={`text-3xl font-bold mb-4 ${isLightTheme ? 'text-gray-900' : 'text-white'}`}>
            Delivering Measurable Business Impact
          </h2>
          
          <p className={`text-lg ${isLightTheme ? 'text-gray-600' : 'text-gray-300'}`}>
            Our data solutions drive significant improvements in revenue, efficiency, and customer satisfaction across multiple industries
          </p>
        </motion.div>
        
        {/* Key Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <StatCard 
              key={index} 
              icon={stat.icon} 
              value={stat.value} 
              label={stat.label}
              bgColor={stat.bgColor}
              color={stat.color}
              delay={stat.delay} 
            />
          ))}
        </div>
        
        {/* Results Cards Section */}
        {resultCards.length > 0 && (
          <div className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {resultCards.map((card, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + (index * 0.1) }}
                  viewport={{ once: true }}
                  className={`rounded-2xl overflow-hidden ${isLightTheme ? 'bg-white border border-gray-100' : 'bg-[#1a2033] border border-gray-800'} shadow-lg`}
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-medium mb-2">
                          {card.tag}
                        </div>
                        <h3 className={`text-xl font-bold ${isLightTheme ? 'text-gray-900' : 'text-white'}`}>
                          {card.title}
                        </h3>
                        <p className={`text-sm ${isLightTheme ? 'text-gray-600' : 'text-gray-400'} mb-2`}>
                          {card.client}
                        </p>
                      </div>
                    </div>
                    
                    <p className={`text-sm ${isLightTheme ? 'text-gray-700' : 'text-gray-300'} mb-6`}>
                      {card.description}
                    </p>
                    
                    <div className="flex gap-6 mb-4">
                      {card.metrics.map((metric, idx) => (
                        <div key={idx} className="text-center">
                          <div className={`text-2xl font-bold ${isLightTheme ? 'text-blue-600' : 'text-blue-400'}`}>
                            {metric.value}
                          </div>
                          <div className={`text-xs ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`}>
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <a 
                      href={card.link} 
                      className={`inline-flex items-center text-sm font-medium ${isLightTheme ? 'text-blue-600' : 'text-blue-400'} hover:underline`}
                    >
                      View Case Study <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Industry Expertise */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-500/5 to-indigo-500/5 dark:from-blue-500/10 dark:to-indigo-500/10 rounded-2xl p-8"
        >
          <div className="text-center mb-8">
            <h3 className={`text-2xl font-bold mb-2 ${isLightTheme ? 'text-gray-900' : 'text-white'}`}>
              Industry Expertise
            </h3>
            <p className={`${isLightTheme ? 'text-gray-600' : 'text-gray-300'}`}>
              Specialized solutions tailored to your industry challenges
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {industries.map((industry, index) => (
              <IndustryCard 
                key={index}
                industry={industry.industry}
                expertise={industry.expertise}
                icon={industry.icon}
                color={industry.color}
                delay={industry.delay}
              />
            ))}
          </div>
        </motion.div>
        
        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <a 
            href="/contact" 
            className={`inline-flex items-center px-6 py-3 rounded-lg font-medium
              ${isLightTheme 
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700' 
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700'} 
              shadow-md hover:shadow-lg transition-all`}
          >
            Schedule a Consultation
          </a>
        </motion.div>
      </div>
    </section>
  );
}
