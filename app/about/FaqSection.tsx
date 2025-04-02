'use client';

import { useState } from 'react';

const faqs = [
  {
    question: "How did Revelate Operations get started?",
    answer: "Revelate Operations was founded by Drew Lambert and Melanie Tummino, who saw a critical gap in how businesses were utilizing their data. With complementary expertise in Salesforce implementation and data analytics, they joined forces to create a consultancy that helps companies transform their data into strategic assets that drive growth and operational excellence.",
    icon: "fa-history"
  },
  {
    question: "What makes Revelate Operations different from other consultancies?",
    answer: "Our unique strength lies in our dual expertise in both technical implementation and strategic business analysis. We don't just configure systems; we align technology with business processes and strategic objectives. Our approach focuses on tangible results, knowledge transfer, and long-term partnership rather than creating dependencies on our services.",
    icon: "fa-fingerprint"
  },
  {
    question: "What industries do you work with?",
    answer: "While we specialize in SaaS and technology companies, our methodologies and solutions can be applied across various industries. We've successfully worked with clients in healthcare, financial services, professional services, manufacturing, and non-profit sectors. Our approach is adaptable to any organization looking to better leverage their data for growth.",
    icon: "fa-industry"
  },
  {
    question: "How long does a typical engagement last?",
    answer: "The length of our engagements varies based on the scope and complexity of the project. Initial implementations or transformations typically range from 2-6 months, while ongoing strategic partnerships can extend for years. We focus on delivering quick wins within the first 30 days while working toward more comprehensive long-term solutions.",
    icon: "fa-clock"
  },
  {
    question: "Do you work with small businesses or only enterprise clients?",
    answer: "We work with businesses of all sizes, from startups to enterprise organizations. Our solutions are scalable and can be tailored to fit your specific needs and budget. We believe that companies at any stage can benefit from data-driven operations and thoughtful technology implementation.",
    icon: "fa-building"
  },
  {
    question: "How do you measure success in your projects?",
    answer: "We establish clear, measurable KPIs at the beginning of every engagement. These typically include metrics like revenue growth, process efficiency improvements, user adoption rates, reduction in manual effort, and return on investment. We regularly report on these metrics throughout our engagement to ensure we're delivering tangible value.",
    icon: "fa-chart-bar"
  }
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const handleToggle = (index: number) => {
    setOpenIndex(index === openIndex ? -1 : index);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
          >
            <button
              onClick={() => handleToggle(index)}
              className="w-full px-6 py-4 text-left flex items-center justify-between focus:outline-none"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 mr-4 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary">
                  <i className={`fas ${faq.icon}`}></i>
                </div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                  {faq.question}
                </h3>
              </div>
              <div className={`transform transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                <i className="fas fa-chevron-down text-gray-500 dark:text-gray-400"></i>
              </div>
            </button>
            
            <div 
              className={`px-6 pb-4 overflow-hidden transition-all duration-300 ${
                openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="prose dark:prose-invert max-w-none pt-2 border-t border-gray-100 dark:border-gray-700">
                <p>{faq.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqSection;
