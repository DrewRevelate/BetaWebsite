'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function TeamSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const teamCards = entry.target.querySelectorAll('.team-card');
          teamCards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add('animated');
            }, index * 150);
          });
        }
      });
    }, { threshold: 0.1 });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden" id="team">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-full opacity-5 dark:opacity-10" style={{ backgroundImage: 'url("/images/patterns/grid-pattern.svg")', backgroundSize: '40px' }}></div>
        <div className="absolute -top-40 -right-20 w-96 h-96 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-40 -left-20 w-80 h-80 bg-teal-500/5 dark:bg-teal-500/10 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 mb-4 bg-slate-800/10 dark:bg-white/10 backdrop-blur-sm px-4 py-2 rounded-md border border-slate-200/50 dark:border-slate-700/50 shadow-sm">
            <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
            <span className="text-sm font-medium tracking-wider uppercase text-indigo-600 dark:text-indigo-400">Leadership Team</span>
          </div>
          
          <h2 className="text-4xl font-bold mb-6 text-slate-800 dark:text-white">Meet the Experts Behind Your Success</h2>
          
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Our team brings decades of experience in data analytics, SaaS operations, and strategic business consulting to drive exceptional results for our clients.
          </p>
        </div>

        <div className="space-y-12">
          {/* Drew Lambert */}
          <div className="team-card bg-white/80 dark:bg-slate-800/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-slate-200/50 dark:border-slate-700/50 hover:shadow-xl transition-all duration-300 opacity-0 transform translate-y-8">
            <div className="md:flex">
              <div className="md:w-1/3 relative">
                <div className="h-80 md:h-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 relative overflow-hidden">
                  {/* Profile Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-teal-500/10 z-0"></div>
                  
                  {/* Profile Image Placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-48 h-48 bg-slate-200 dark:bg-slate-600 rounded-full border-8 border-white/20 dark:border-slate-700/30 shadow-inner overflow-hidden">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-full h-full text-slate-400 dark:text-slate-300 p-4">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Technical Background Pattern */}
                  <div className="absolute inset-0">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="opacity-10">
                      <defs>
                        <pattern id="smallGrid" width="8" height="8" patternUnits="userSpaceOnUse">
                          <path d="M 8 0 L 0 0 0 8" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                        </pattern>
                        <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
                          <rect width="80" height="80" fill="url(#smallGrid)"/>
                          <path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" strokeWidth="1"/>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                  </div>
                  
                  {/* Social Links */}
                  <div className="absolute bottom-4 left-4 flex space-x-2 z-10">
                    <a 
                      href="https://www.linkedin.com/in/drewblambert/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-teal-700"
                      aria-label="LinkedIn"
                    >
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="md:w-2/3 p-6 md:p-8">
                <div className="flex flex-col h-full">
                  <div>
                    <div className="inline-flex items-center bg-teal-500/10 dark:bg-teal-500/20 px-3 py-1 rounded-full mb-3">
                      <div className="w-2 h-2 bg-teal-500 rounded-full mr-2"></div>
                      <span className="text-xs font-medium text-teal-600 dark:text-teal-400">Co-Founder</span>
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-1 text-slate-800 dark:text-white">Drew Lambert</h3>
                    <p className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-indigo-500 text-lg font-semibold mb-4">SaaS & Salesforce Expert</p>
                    
                    <div className="prose dark:prose-invert mb-6">
                      <p>Drew brings a depth of expertise in Salesforce architecture and SaaS operations that transcends mere technical proficiency. With a strategic mindset, he transforms complex technical challenges into business growth opportunities.</p>
                      
                      <p>Throughout his career, Drew has contributed to over 150 company tech stacks and accumulated more than 300 Trailhead badges, demonstrating an exceptional ability to adapt to and enhance diverse business environments.</p>
                    </div>
                  </div>
                  
                  <div className="mt-auto">
                    <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-3">Areas of Expertise</h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1.5 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 text-slate-700 dark:text-slate-300 rounded-md text-sm font-medium border border-slate-200 dark:border-slate-600 shadow-sm">Salesforce Architecture</span>
                      <span className="px-3 py-1.5 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 text-slate-700 dark:text-slate-300 rounded-md text-sm font-medium border border-slate-200 dark:border-slate-600 shadow-sm">CRM Optimization</span>
                      <span className="px-3 py-1.5 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 text-slate-700 dark:text-slate-300 rounded-md text-sm font-medium border border-slate-200 dark:border-slate-600 shadow-sm">Sales Enablement</span>
                      <span className="px-3 py-1.5 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 text-slate-700 dark:text-slate-300 rounded-md text-sm font-medium border border-slate-200 dark:border-slate-600 shadow-sm">Revenue Operations</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Melanie Tummino */}
          <div className="team-card bg-white/80 dark:bg-slate-800/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-slate-200/50 dark:border-slate-700/50 hover:shadow-xl transition-all duration-300 opacity-0 transform translate-y-8">
            <div className="md:flex">
              <div className="md:w-1/3 relative">
                <div className="h-80 md:h-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 relative overflow-hidden">
                  {/* Profile Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/10 z-0"></div>
                  
                  {/* Profile Image Placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-48 h-48 bg-slate-200 dark:bg-slate-600 rounded-full border-8 border-white/20 dark:border-slate-700/30 shadow-inner overflow-hidden">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-full h-full text-slate-400 dark:text-slate-300 p-4">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Data Visualization Background */}
                  <div className="absolute inset-0">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="opacity-10">
                      <g>
                        {/* Grid Lines */}
                        <line x1="0" y1="100" x2="400" y2="100" stroke="currentColor" strokeWidth="0.5" />
                        <line x1="0" y1="200" x2="400" y2="200" stroke="currentColor" strokeWidth="0.5" />
                        <line x1="0" y1="300" x2="400" y2="300" stroke="currentColor" strokeWidth="0.5" />
                        <line x1="100" y1="0" x2="100" y2="400" stroke="currentColor" strokeWidth="0.5" />
                        <line x1="200" y1="0" x2="200" y2="400" stroke="currentColor" strokeWidth="0.5" />
                        <line x1="300" y1="0" x2="300" y2="400" stroke="currentColor" strokeWidth="0.5" />
                        
                        {/* Data Points */}
                        <circle cx="50" cy="320" r="3" fill="currentColor" opacity="0.5" />
                        <circle cx="100" cy="280" r="3" fill="currentColor" opacity="0.5" />
                        <circle cx="150" cy="220" r="3" fill="currentColor" opacity="0.5" />
                        <circle cx="200" cy="270" r="3" fill="currentColor" opacity="0.5" />
                        <circle cx="250" cy="170" r="3" fill="currentColor" opacity="0.5" />
                        <circle cx="300" cy="150" r="3" fill="currentColor" opacity="0.5" />
                        <circle cx="350" cy="100" r="3" fill="currentColor" opacity="0.5" />
                        
                        {/* Trend Line */}
                        <polyline 
                          points="50,320 100,280 150,220 200,270 250,170 300,150 350,100" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="1.5" 
                          opacity="0.7"
                          strokeDasharray="1,1"
                        />
                      </g>
                    </svg>
                  </div>
                  
                  {/* Social Links */}
                  <div className="absolute bottom-4 left-4 flex space-x-2 z-10">
                    <a 
                      href="https://www.linkedin.com/in/melanietummino/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-blue-700"
                      aria-label="LinkedIn"
                    >
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="md:w-2/3 p-6 md:p-8">
                <div className="flex flex-col h-full">
                  <div>
                    <div className="inline-flex items-center bg-blue-500/10 dark:bg-blue-500/20 px-3 py-1 rounded-full mb-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                      <span className="text-xs font-medium text-blue-600 dark:text-blue-400">Co-Founder</span>
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-1 text-slate-800 dark:text-white">Melanie Tummino</h3>
                    <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500 text-lg font-semibold mb-4">Data Analytics Specialist</p>
                    
                    <div className="prose dark:prose-invert mb-6">
                      <p>Melanie brings a strategic analytical mindset and a proven track record of converting complex data into actionable business insights. Her expertise in data architecture and visualization enables comprehensive solutions to multifaceted business challenges.</p>
                      
                      <p>With over six years of hands-on experience across the data spectrum, Melanie excels at drawing meaningful insights from disparate data sources, creating powerful analytics frameworks that drive growth and strengthen operational fundamentals.</p>
                    </div>
                  </div>
                  
                  <div className="mt-auto">
                    <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-3">Areas of Expertise</h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1.5 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 text-slate-700 dark:text-slate-300 rounded-md text-sm font-medium border border-slate-200 dark:border-slate-600 shadow-sm">Data Analytics</span>
                      <span className="px-3 py-1.5 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 text-slate-700 dark:text-slate-300 rounded-md text-sm font-medium border border-slate-200 dark:border-slate-600 shadow-sm">Business Intelligence</span>
                      <span className="px-3 py-1.5 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 text-slate-700 dark:text-slate-300 rounded-md text-sm font-medium border border-slate-200 dark:border-slate-600 shadow-sm">Dashboard Development</span>
                      <span className="px-3 py-1.5 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 text-slate-700 dark:text-slate-300 rounded-md text-sm font-medium border border-slate-200 dark:border-slate-600 shadow-sm">Data Strategy</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-16">
          <p className="text-lg mb-4 text-slate-600 dark:text-slate-300">Interested in joining our team?</p>
          <Link 
            href="/contact" 
            className="btn bg-indigo-600 text-white hover:bg-indigo-700 py-3 px-6 rounded-md font-medium transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px] inline-flex items-center"
          >
            <span>Contact Us</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
