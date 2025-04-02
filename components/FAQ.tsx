'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
}

export default function FAQ({ items }: FAQProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="bg-white dark:bg-dark rounded-lg shadow-md overflow-hidden">
          <button
            className="w-full text-left p-4 flex justify-between items-center font-semibold"
            onClick={() => toggleFAQ(index)}
            aria-expanded={activeIndex === index}
          >
            {item.question}
            <i className={`fas fa-chevron-down transition-transform ${activeIndex === index ? 'rotate-180' : ''}`}></i>
          </button>
          
          <div 
            className={`overflow-hidden transition-all duration-300 ${activeIndex === index ? 'max-h-96 p-4 pt-0' : 'max-h-0'}`}
          >
            <p className="text-gray-600 dark:text-gray-300">
              {item.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
