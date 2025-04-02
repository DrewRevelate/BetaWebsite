'use client';

import { useEffect, useRef } from 'react';

export default function MissionSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Animate skill bars when in view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const skillBars = entry.target.querySelectorAll('.skill-bar');
          skillBars.forEach((bar: Element) => {
            const barElement = bar as HTMLElement;
            const width = barElement.getAttribute('data-width') || '0%';
            barElement.style.width = width;
          });
        }
      });
    }, { threshold: 0.2 });
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    // Animation for elements entering viewport
    const animateElements = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      
      const elementObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            elementObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      
      elements.forEach(element => {
        elementObserver.observe(element);
      });
    };
    
    animateElements();
    
    return () => {
      observer.disconnect();
    }
  }, []);
  
  return (
    <section ref={sectionRef} className="py-20 bg-gray-50 dark:bg-gray-800 overflow-hidden relative" id="mission">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-full opacity-5 dark:opacity-10 grid-bg"></div>
        <div className="absolute -bottom-40 -right-20 w-96 h-96 bg-teal-500/5 dark:bg-teal-500/10 rounded-full filter blur-3xl"></div>
        <div className="absolute -top-40 -left-20 w-80 h-80 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 mb-4 bg-slate-800/10 dark:bg-white/10 backdrop-blur-sm px-4 py-2 rounded-md border border-slate-200/50 dark:border-slate-700/50 shadow-sm">
            <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
            <span className="text-sm font-medium tracking-wider uppercase text-teal-600 dark:text-teal-400">Our Mission</span>
          </div>
          
          <h2 className="text-4xl font-bold mb-6 text-slate-800 dark:text-white">Driving Strategic Growth Through Data Intelligence</h2>
          
          <p className="text-lg text-slate-600 dark:text-slate-300">
            We empower organizations to transform raw data into actionable insights that drive measurable business outcomes and sustainable competitive advantage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="mission-card bg-white dark:bg-slate-800 rounded-lg shadow-md p-8 animate-on-scroll">
            <div className="mb-6">
              <div className="w-14 h-14 bg-teal-500/10 dark:bg-teal-500/20 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-white">Data-Driven Strategy</h3>
              <p className="text-slate-600 dark:text-slate-300">
                We believe in strategic decision-making powered by comprehensive data analysis. Our approach eliminates guesswork and enables confident leadership choices.
              </p>
            </div>
            
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-500 dark:text-slate-400">Analytics</span>
                  <span className="text-teal-600 dark:text-teal-400 font-medium">92%</span>
                </div>
                <div className="w-full h-1.5 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-teal-500 rounded-full skill-bar" data-width="92%" style={{ width: '0%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-500 dark:text-slate-400">Implementation</span>
                  <span className="text-teal-600 dark:text-teal-400 font-medium">88%</span>
                </div>
                <div className="w-full h-1.5 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-teal-500 rounded-full skill-bar" data-width="88%" style={{ width: '0%' }}></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mission-card bg-white dark:bg-slate-800 rounded-lg shadow-md p-8 animate-on-scroll delay-100">
            <div className="mb-6">
              <div className="w-14 h-14 bg-blue-500/10 dark:bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-white">Strategic Partnership</h3>
              <p className="text-slate-600 dark:text-slate-300">
                We form true partnerships with our clients, integrating with your team to deliver solutions that align perfectly with your business objectives.
              </p>
            </div>
            
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-500 dark:text-slate-400">Collaboration</span>
                  <span className="text-blue-600 dark:text-blue-400 font-medium">95%</span>
                </div>
                <div className="w-full h-1.5 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full skill-bar" data-width="95%" style={{ width: '0%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-500 dark:text-slate-400">Client Success</span>
                  <span className="text-blue-600 dark:text-blue-400 font-medium">91%</span>
                </div>
                <div className="w-full h-1.5 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full skill-bar" data-width="91%" style={{ width: '0%' }}></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mission-card bg-white dark:bg-slate-800 rounded-lg shadow-md p-8 animate-on-scroll delay-200">
            <div className="mb-6">
              <div className="w-14 h-14 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-white">Innovative Execution</h3>
              <p className="text-slate-600 dark:text-slate-300">
                We constantly explore cutting-edge methodologies and technologies to ensure you stay ahead of the competition in your industry.
              </p>
            </div>
            
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-500 dark:text-slate-400">Innovation</span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-medium">94%</span>
                </div>
                <div className="w-full h-1.5 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full skill-bar" data-width="94%" style={{ width: '0%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-500 dark:text-slate-400">Technical Depth</span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-medium">90%</span>
                </div>
                <div className="w-full h-1.5 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full skill-bar" data-width="90%" style={{ width: '0%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Data Transformation Visualization */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 md:p-8 animate-on-scroll">
          <div className="md:flex items-center gap-8">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h3 className="text-2xl font-bold mb-4 text-slate-800 dark:text-white">How We Transform Your Data</h3>
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                Our proven methodology converts raw business data into actionable intelligence through a systematic process that ensures accuracy, relevance, and strategic alignment.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 rounded-full bg-teal-500/20 dark:bg-teal-500/30 flex items-center justify-center">
                      <span className="text-teal-600 dark:text-teal-400 text-sm font-bold">1</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-slate-800 dark:text-white">Data Collection & Integration</h4>
                    <p className="text-slate-600 dark:text-slate-300">Consolidate data from all relevant sources into a unified framework.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 dark:bg-blue-500/30 flex items-center justify-center">
                      <span className="text-blue-600 dark:text-blue-400 text-sm font-bold">2</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-slate-800 dark:text-white">Advanced Analytics</h4>
                    <p className="text-slate-600 dark:text-slate-300">Apply sophisticated analytics models to identify patterns and opportunities.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 rounded-full bg-indigo-500/20 dark:bg-indigo-500/30 flex items-center justify-center">
                      <span className="text-indigo-600 dark:text-indigo-400 text-sm font-bold">3</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-slate-800 dark:text-white">Strategic Implementation</h4>
                    <p className="text-slate-600 dark:text-slate-300">Transform insights into actionable strategies aligned with business goals.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 rounded-full bg-slate-500/20 dark:bg-slate-500/30 flex items-center justify-center">
                      <span className="text-slate-600 dark:text-slate-400 text-sm font-bold">4</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-slate-800 dark:text-white">Continuous Optimization</h4>
                    <p className="text-slate-600 dark:text-slate-300">Refine and adapt with ongoing performance monitoring and enhancement.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <div className="aspect-[4/3] relative bg-slate-100 dark:bg-slate-700 rounded-lg overflow-hidden">
                {/* Data Flow Visualization */}
                <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
                  {/* Nodes */}
                  <g className="data-nodes">
                    {/* Source Systems */}
                    <g transform="translate(50, 50)">
                      <rect x="-30" y="-20" width="60" height="40" rx="5" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" />
                      <text x="0" y="5" fontSize="12" textAnchor="middle" fill="#334155">Source</text>
                    </g>
                    
                    <g transform="translate(50, 150)">
                      <rect x="-30" y="-20" width="60" height="40" rx="5" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" />
                      <text x="0" y="5" fontSize="12" textAnchor="middle" fill="#334155">Data</text>
                    </g>
                    
                    <g transform="translate(50, 250)">
                      <rect x="-30" y="-20" width="60" height="40" rx="5" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" />
                      <text x="0" y="5" fontSize="12" textAnchor="middle" fill="#334155">APIs</text>
                    </g>
                    
                    {/* Integration */}
                    <g transform="translate(170, 150)">
                      <rect x="-40" y="-30" width="80" height="60" rx="5" fill="#bae6fd" stroke="#0ea5e9" strokeWidth="1.5" />
                      <text x="0" y="5" fontSize="12" textAnchor="middle" fill="#0c4a6e">Integration</text>
                    </g>
                    
                    {/* Analytics */}
                    <g transform="translate(290, 100)">
                      <rect x="-40" y="-30" width="80" height="60" rx="5" fill="#c7d2fe" stroke="#6366f1" strokeWidth="1.5" />
                      <text x="0" y="5" fontSize="12" textAnchor="middle" fill="#3730a3">Analytics</text>
                    </g>
                    
                    {/* Insights */}
                    <g transform="translate(290, 200)">
                      <rect x="-40" y="-30" width="80" height="60" rx="5" fill="#99f6e4" stroke="#14b8a6" strokeWidth="1.5" />
                      <text x="0" y="5" fontSize="12" textAnchor="middle" fill="#134e4a">Insights</text>
                    </g>
                    
                    {/* Action */}
                    <g transform="translate(350, 150)">
                      <rect x="-30" y="-20" width="60" height="40" rx="5" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
                      <text x="0" y="5" fontSize="10" textAnchor="middle" fill="#78350f">Action</text>
                    </g>
                  </g>
                  
                  {/* Connections */}
                  <g className="data-connections">
                    <path d="M80,50 Q120,50 130,80 Q140,110 170,120" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 2" className="data-flow-path" />
                    <path d="M80,150 L130,150" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 2" className="data-flow-path" />
                    <path d="M80,250 Q120,250 130,220 Q140,190 170,180" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 2" className="data-flow-path" />
                    
                    <path d="M210,130 L250,100" fill="none" stroke="#0ea5e9" strokeWidth="1.5" className="data-flow-path" />
                    <path d="M210,170 L250,200" fill="none" stroke="#0ea5e9" strokeWidth="1.5" className="data-flow-path" />
                    
                    <path d="M330,100 Q340,120 340,150" fill="none" stroke="#6366f1" strokeWidth="1.5" className="data-flow-path" />
                    <path d="M330,200 Q340,180 340,150" fill="none" stroke="#14b8a6" strokeWidth="1.5" className="data-flow-path" />
                  </g>
                  
                  {/* Moving data particles */}
                  <circle cx="80" cy="50" r="2" fill="#0ea5e9">
                    <animateMotion path="M0,0 Q40,0 50,30 Q60,60 90,70" dur="3s" repeatCount="indefinite" />
                  </circle>
                  
                  <circle cx="80" cy="150" r="2" fill="#0ea5e9">
                    <animateMotion path="M0,0 L50,0" dur="2s" repeatCount="indefinite" />
                  </circle>
                  
                  <circle cx="80" cy="250" r="2" fill="#0ea5e9">
                    <animateMotion path="M0,0 Q40,0 50,-30 Q60,-60 90,-70" dur="2.5s" repeatCount="indefinite" />
                  </circle>
                  
                  <circle cx="210" cy="130" r="2" fill="#6366f1">
                    <animateMotion path="M0,0 L40,-30" dur="1.5s" repeatCount="indefinite" />
                  </circle>
                  
                  <circle cx="210" cy="170" r="2" fill="#14b8a6">
                    <animateMotion path="M0,0 L40,30" dur="1.8s" repeatCount="indefinite" />
                  </circle>
                  
                  <circle cx="330" cy="100" r="2" fill="#f59e0b">
                    <animateMotion path="M0,0 Q10,20 10,50" dur="1.2s" repeatCount="indefinite" />
                  </circle>
                  
                  <circle cx="330" cy="200" r="2" fill="#f59e0b">
                    <animateMotion path="M0,0 Q10,-20 10,-50" dur="1.4s" repeatCount="indefinite" />
                  </circle>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
