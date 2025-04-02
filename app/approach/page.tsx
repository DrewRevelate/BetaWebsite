import Link from 'next/link';
import { CheckCircle, ArrowRight, TrendingUp, Shield, Zap } from 'lucide-react';
import type { Metadata } from 'next';
import PerformanceLayout from '@/components/PerformanceLayout';
import ApproachClientComponent from './ApproachClientComponent';

export const metadata: Metadata = {
  title: 'Our Business Transformation Methodology | Revelate Operations',
  description: 'Explore our proven 4-phase methodology that transforms complex business challenges into strategic advantages through data-driven insights and precision implementation.',
};

export default function ApproachPage() {
  return (
    <PerformanceLayout 
      enableWebVitals={true}
      enableMobileOptimization={true}
      primeCache={true}
      optimizeImages={true}
      pageName="approach"
      criticalPages={['/', '/services', '/approach', '/contact']}
    >
      {/* Approach Header & Main Section */}
      <ApproachClientComponent />

      {/* Philosophy Section */}
      <section id="philosophy" className="py-20 relative overflow-hidden">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-white dark:from-dark-light/50 dark:to-dark z-0"></div>
        
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/30 dark:bg-blue-900/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl z-0"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-100/30 dark:bg-indigo-900/10 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl z-0"></div>
        
        {/* Mesh Grid Background */}
        <div className="absolute inset-0 z-0 opacity-10" style={{ 
          backgroundImage: `radial-gradient(circle at 20px 20px, rgba(67, 97, 238, 0.1) 1px, transparent 0)`, 
          backgroundSize: '40px 40px' 
        }}></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-10">
            <div className="inline-flex items-center space-x-2 mb-3 bg-blue-100/50 dark:bg-blue-900/30 backdrop-blur-md px-3 py-1.5 rounded-full">
              <div className="w-1.5 h-1.5 bg-blue-500 dark:bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium tracking-wide text-blue-700 dark:text-blue-300 uppercase">Our Core Beliefs</span>
            </div>
            <h2 className="text-3xl font-bold mb-3">Our Philosophy</h2>
            <p className="text-base max-w-2xl mx-auto text-gray-600 dark:text-gray-200">
              We believe in building genuine partnerships with executives to transform how your business leverages data and operations for sustainable revenue growth.
            </p>
          </div>
          
          {/* Philosophy Cards */}
          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {/* Data-Driven Card */}
            <div className="philosophy-card group animate-on-scroll">
              <div className="relative bg-white/70 dark:bg-dark-light/90 backdrop-blur-md rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 dark:border-white/5 transform perspective-1000 hover:rotate-y-5 hover:-rotate-x-2 hover:translate-y-[-8px] h-full flex flex-col">
                {/* Floating geometric accent */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-500/10 rounded-xl rotate-12 z-0 transition-transform duration-700 group-hover:rotate-45 group-hover:scale-110"></div>
                
                <div className="relative z-10">
                  <div className="w-20 h-20 mx-auto bg-blue-500/10 dark:bg-blue-500/20 rounded-2xl rotate-[10deg] flex items-center justify-center mb-8 transform transition-transform duration-500 group-hover:rotate-[25deg] group-hover:scale-110 shadow-lg">
                    <i className="fas fa-lightbulb text-blue-500 text-3xl"></i>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-center">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-400">Data-Driven Decisions</span>
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-8 text-center">
                    We turn complex business data into clear insights that drive executive decision-making and measurable outcomes.
                  </p>
                  
                  <div className="mt-auto">
                    <div className="bg-blue-500/5 dark:bg-blue-500/10 rounded-xl p-5">
                      <div className="text-blue-500 font-medium mb-3">In practice:</div>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <div className="flex-shrink-0 w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center mr-3 mt-0.5">
                            <i className="fas fa-check text-blue-500 text-xs"></i>
                          </div>
                          <span>KPI-driven roadmaps aligned with executive priorities</span>
                        </li>
                        <li className="flex items-start">
                          <div className="flex-shrink-0 w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center mr-3 mt-0.5">
                            <i className="fas fa-check text-blue-500 text-xs"></i>
                          </div>
                          <span>Evidence-based process optimization</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Executive Partnership Card */}
            <div className="philosophy-card group animate-on-scroll delay-100">
              <div className="relative bg-white/70 dark:bg-dark-light/90 backdrop-blur-md rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 dark:border-white/5 transform perspective-1000 hover:rotate-y-5 hover:rotate-x-2 hover:translate-y-[-8px] h-full flex flex-col">
                {/* Floating geometric accent */}
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-indigo-600/10 rounded-full z-0 transition-transform duration-700 group-hover:scale-110"></div>
                
                <div className="relative z-10">
                  <div className="w-20 h-20 mx-auto bg-indigo-600/10 dark:bg-indigo-600/20 rounded-2xl rotate-[-10deg] flex items-center justify-center mb-8 transform transition-transform duration-500 group-hover:rotate-[-25deg] group-hover:scale-110 shadow-lg">
                    <i className="fas fa-handshake text-indigo-600 text-3xl"></i>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-center">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-400">Executive Partnership</span>
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-8 text-center">
                    We work side-by-side with your leadership team, taking ownership of outcomes and aligning with your vision.
                  </p>
                  
                  <div className="mt-auto">
                    <div className="bg-indigo-600/5 dark:bg-indigo-600/10 rounded-xl p-5">
                      <div className="text-indigo-600 font-medium mb-3">In practice:</div>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <div className="flex-shrink-0 w-6 h-6 bg-indigo-600/20 rounded-full flex items-center justify-center mr-3 mt-0.5">
                            <i className="fas fa-check text-indigo-600 text-xs"></i>
                          </div>
                          <span>Regular executive briefings with actionable insights</span>
                        </li>
                        <li className="flex items-start">
                          <div className="flex-shrink-0 w-6 h-6 bg-indigo-600/20 rounded-full flex items-center justify-center mr-3 mt-0.5">
                            <i className="fas fa-check text-indigo-600 text-xs"></i>
                          </div>
                          <span>Shared accountability for business outcomes</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Revenue Focus Card */}
            <div className="philosophy-card group animate-on-scroll delay-200">
              <div className="relative bg-white/70 dark:bg-dark-light/90 backdrop-blur-md rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 dark:border-white/5 transform perspective-1000 hover:rotate-y-5 hover:rotate-x-2 hover:translate-y-[-8px] h-full flex flex-col">
                {/* Floating geometric accent */}
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-400/10 rounded-xl rotate-45 z-0 transition-transform duration-700 group-hover:rotate-90 group-hover:scale-110"></div>
                
                <div className="relative z-10">
                  <div className="w-20 h-20 mx-auto bg-blue-400/15 dark:bg-blue-400/25 rounded-2xl rotate-[10deg] flex items-center justify-center mb-8 transform transition-transform duration-500 group-hover:rotate-[25deg] group-hover:scale-110 shadow-lg">
                    <i className="fas fa-chart-line text-blue-400 text-3xl"></i>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-center">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-400">Revenue Focus</span>
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-8 text-center">
                    We concentrate on initiatives that directly impact your top and bottom line, prioritizing quick wins and long-term growth.
                  </p>
                  
                  <div className="mt-auto">
                    <div className="bg-blue-400/5 dark:bg-blue-400/15 rounded-xl p-5">
                      <div className="text-blue-400 font-medium mb-3">In practice:</div>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <div className="flex-shrink-0 w-6 h-6 bg-blue-400/20 rounded-full flex items-center justify-center mr-3 mt-0.5">
                            <i className="fas fa-check text-blue-400 text-xs"></i>
                          </div>
                          <span>ROI-focused implementation strategy</span>
                        </li>
                        <li className="flex items-start">
                          <div className="flex-shrink-0 w-6 h-6 bg-blue-400/20 rounded-full flex items-center justify-center mr-3 mt-0.5">
                            <i className="fas fa-check text-blue-400 text-xs"></i>
                          </div>
                          <span>Revenue acceleration frameworks</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Process Section - Interactive Timeline */}
      <section id="process" className="py-24 relative overflow-hidden bg-gradient-to-br from-gray-50 to-white dark:from-dark-light dark:to-dark">
        {/* Ambient background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-5 z-0">
            <div className="absolute w-full h-full" style={{ backgroundImage: 'url("/images/patterns/grid-pattern.svg")', backgroundSize: '30px' }}></div>
          </div>
          
          {/* Large gradient orbs */}
          <div className="absolute top-20 left-[15%] w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float-slow"></div>
          <div className="absolute bottom-40 right-[10%] w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '2.5s' }}></div>
          
          {/* Small geometric shapes */}
          <div className="absolute bottom-1/4 left-[10%] w-20 h-20 bg-accent/10 rounded-full animate-float" style={{ animationDuration: '12s' }}></div>
          <div className="absolute top-1/3 right-[15%] w-16 h-16 bg-primary/10 rounded-xl rotate-12 animate-float" style={{ animationDuration: '9s', animationDelay: '1s' }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16 animate-on-scroll">
            <div className="inline-flex items-center space-x-2 mb-3 bg-indigo-100/50 dark:bg-indigo-900/30 backdrop-blur-md px-3 py-1.5 rounded-full">
              <div className="w-1.5 h-1.5 bg-indigo-500 dark:bg-indigo-400 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium tracking-wide text-indigo-700 dark:text-indigo-300 uppercase">Proven Process</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">How We Work With You</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto leading-relaxed">
              A structured approach that delivers predictable business outcomes while adapting to your unique challenges
            </p>
          </div>

          {/* Interactive Process Timeline - Modern Design */}
          <div className="max-w-6xl mx-auto relative">
            {/* Connecting Timeline Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600/30 via-indigo-500/30 to-violet-500/30 transform -translate-x-1/2 hidden md:block z-0"></div>
            
            {/* Process Step 1 - Discovery */}
            <div className="flex flex-col md:flex-row items-center mb-16 md:mb-24 animate-on-scroll">
              {/* 3D Process Number */}
              <div className="relative w-20 h-20 mb-8 md:mb-0 shrink-0 md:mr-10">
                <div className="absolute inset-0 bg-blue-600/20 rounded-xl transform rotate-[10deg] scale-[1.2] z-0"></div>
                <div className="absolute inset-0 bg-blue-600 rounded-xl flex items-center justify-center z-10 shadow-lg">
                  <span className="text-white text-3xl font-bold">1</span>
                </div>
              </div>
              
              {/* Content Card */}
              <div className="w-full md:w-[calc(50%-40px)] md:ml-auto md:mr-8 group animate-on-scroll">
                <div className="relative bg-white/80 dark:bg-dark/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 dark:border-white/5 transform perspective-1000 hover:translate-y-[-5px] hover:rotate-y-2">
                  {/* Floating accent element */}
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-primary/10 rounded-full transform -rotate-12 z-0 group-hover:rotate-12 transition-transform duration-700"></div>
                  
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">Discovery</h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-5 leading-relaxed">
                      We begin with a comprehensive assessment of your business goals, challenges, and operations to identify optimization opportunities that align with your strategic priorities.
                    </p>
                    
                    <div className="pt-5 border-t border-gray-100 dark:border-gray-700 grid grid-cols-2 gap-4">
                      <div className="bg-blue-600/5 dark:bg-blue-600/10 rounded-lg p-3">
                        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">TIMEFRAME</div>
                        <div className="text-blue-600 font-semibold">2-3 weeks</div>
                      </div>
                      <div className="bg-blue-600/5 dark:bg-blue-600/10 rounded-lg p-3">
                        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">DELIVERABLES</div>
                        <div className="text-gray-700 dark:text-gray-200 text-sm">Opportunity assessment, Value roadmap</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="hidden md:block w-20 shrink-0">
                {/* Spacer for right side of first step */}
              </div>
            </div>
            
            {/* Process Step 2 - Strategy */}
            <div className="flex flex-col md:flex-row items-center mb-16 md:mb-24 md:flex-row-reverse animate-on-scroll delay-100">
              {/* 3D Process Number */}
              <div className="relative w-20 h-20 mb-8 md:mb-0 shrink-0 md:ml-10">
                <div className="absolute inset-0 bg-cyan-500/20 rounded-xl transform -rotate-[10deg] scale-[1.2] z-0"></div>
                <div className="absolute inset-0 bg-cyan-500 rounded-xl flex items-center justify-center z-10 shadow-lg">
                  <span className="text-white text-3xl font-bold">2</span>
                </div>
              </div>
              
              {/* Content Card */}
              <div className="w-full md:w-[calc(50%-40px)] md:mr-auto md:ml-8 group animate-on-scroll">
                <div className="relative bg-white/80 dark:bg-dark/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 dark:border-white/5 transform perspective-1000 hover:translate-y-[-5px] hover:rotate-y-2">
                  {/* Floating accent element */}
                  <div className="absolute -top-4 -left-4 w-16 h-16 bg-primary-light/10 rounded-full transform rotate-12 z-0 group-hover:-rotate-12 transition-transform duration-700"></div>
                  
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-cyan-400">Strategy</h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-5 leading-relaxed">
                      We develop a comprehensive transformation roadmap that prioritizes quick wins and long-term value, with clear KPIs aligned to your business objectives.
                    </p>
                    
                    <div className="pt-5 border-t border-gray-100 dark:border-gray-700 grid grid-cols-2 gap-4">
                      <div className="bg-cyan-500/5 dark:bg-cyan-500/10 rounded-lg p-3">
                        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">TIMEFRAME</div>
                        <div className="text-cyan-500 font-semibold">2-4 weeks</div>
                      </div>
                      <div className="bg-cyan-500/5 dark:bg-cyan-500/10 rounded-lg p-3">
                        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">DELIVERABLES</div>
                        <div className="text-gray-700 dark:text-gray-200 text-sm">Executive roadmap, ROI forecast</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="hidden md:block w-20 shrink-0">
                {/* Spacer for left side of second step */}
              </div>
            </div>
            
            {/* Process Step 3 - Implementation */}
            <div className="flex flex-col md:flex-row items-center mb-16 md:mb-24 animate-on-scroll delay-200">
              {/* 3D Process Number */}
              <div className="relative w-20 h-20 mb-8 md:mb-0 shrink-0 md:mr-10">
                <div className="absolute inset-0 bg-indigo-500/20 rounded-xl transform rotate-[10deg] scale-[1.2] z-0"></div>
                <div className="absolute inset-0 bg-indigo-500 rounded-xl flex items-center justify-center z-10 shadow-lg">
                  <span className="text-white text-3xl font-bold">3</span>
                </div>
              </div>
              
              {/* Content Card */}
              <div className="w-full md:w-[calc(50%-40px)] md:ml-auto md:mr-8 group animate-on-scroll">
                <div className="relative bg-white/80 dark:bg-dark/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 dark:border-white/5 transform perspective-1000 hover:translate-y-[-5px] hover:rotate-y-2">
                  {/* Floating accent element */}
                  <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-secondary/10 rounded-full transform -rotate-12 z-0 group-hover:rotate-12 transition-transform duration-700"></div>
                  
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-indigo-400">Implementation</h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-5 leading-relaxed">
                      Our team executes the strategy with minimal business disruption, using agile methodologies to deliver tangible results quickly while adapting to new insights.
                    </p>
                    
                    <div className="pt-5 border-t border-gray-100 dark:border-gray-700 grid grid-cols-2 gap-4">
                      <div className="bg-indigo-500/5 dark:bg-indigo-500/10 rounded-lg p-3">
                        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">TIMEFRAME</div>
                        <div className="text-indigo-500 font-semibold">4-12 weeks</div>
                      </div>
                      <div className="bg-indigo-500/5 dark:bg-indigo-500/10 rounded-lg p-3">
                        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">DELIVERABLES</div>
                        <div className="text-gray-700 dark:text-gray-200 text-sm">Solution deployment, Change management</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="hidden md:block w-20 shrink-0">
                {/* Spacer for right side of third step */}
              </div>
            </div>
            
            {/* Process Step 4 - Optimization */}
            <div className="flex flex-col md:flex-row items-center md:flex-row-reverse animate-on-scroll delay-300">
              {/* 3D Process Number */}
              <div className="relative w-20 h-20 mb-8 md:mb-0 shrink-0 md:ml-10">
                <div className="absolute inset-0 bg-violet-500/20 rounded-xl transform -rotate-[10deg] scale-[1.2] z-0"></div>
                <div className="absolute inset-0 bg-violet-500 rounded-xl flex items-center justify-center z-10 shadow-lg">
                  <span className="text-white text-3xl font-bold">4</span>
                </div>
              </div>
              
              {/* Content Card */}
              <div className="w-full md:w-[calc(50%-40px)] md:mr-auto md:ml-8 group animate-on-scroll">
                <div className="relative bg-white/80 dark:bg-dark/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 dark:border-white/5 transform perspective-1000 hover:translate-y-[-5px] hover:rotate-y-2">
                  {/* Floating accent element */}
                  <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-accent/10 rounded-full transform rotate-12 z-0 group-hover:-rotate-12 transition-transform duration-700"></div>
                  
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-violet-400">Optimization</h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-5 leading-relaxed">
                      We continuously monitor performance against KPIs, refine the solution based on real-world usage, and identify new opportunities for business growth.
                    </p>
                    
                    <div className="pt-5 border-t border-gray-100 dark:border-gray-700 grid grid-cols-2 gap-4">
                      <div className="bg-violet-500/5 dark:bg-violet-500/10 rounded-lg p-3">
                        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">TIMEFRAME</div>
                        <div className="text-violet-500 font-semibold">Ongoing</div>
                      </div>
                      <div className="bg-violet-500/5 dark:bg-violet-500/10 rounded-lg p-3">
                        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">DELIVERABLES</div>
                        <div className="text-gray-700 dark:text-gray-200 text-sm">Performance reviews, Growth planning</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="hidden md:block w-20 shrink-0">
                {/* Spacer for left side of fourth step */}
              </div>
            </div>
          </div>
          
          {/* Results Statistics */}
          <div className="max-w-5xl mx-auto mt-24 bg-white/50 dark:bg-dark/50 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20 dark:border-white/5 animate-on-scroll">
            <div className="text-center mb-10">
              <h3 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Our Approach Delivers Results</h3>
              <p className="text-gray-600 dark:text-gray-300">Measurable outcomes from our proven methodology</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Statistic 1 */}
              <div className="text-center group">
                <div className="inline-flex flex-col items-center">
                  <div className="relative w-16 h-16 mb-4 group-hover:scale-110 transition-transform duration-300">
                    <div className="absolute inset-0 bg-primary/20 rounded-xl transform rotate-[10deg] scale-[1.2] group-hover:rotate-[25deg] transition-transform duration-500"></div>
                    <div className="absolute inset-0 bg-primary/10 dark:bg-primary/20 rounded-xl flex items-center justify-center z-10">
                      <i className="fas fa-chart-line text-primary text-2xl"></i>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-800 dark:text-white mb-1">
                    <span className="text-primary stat-counter" data-count="94">0</span>%
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 text-sm">Client satisfaction rating</div>
                </div>
              </div>
              
              {/* Statistic 2 */}
              <div className="text-center group">
                <div className="inline-flex flex-col items-center">
                  <div className="relative w-16 h-16 mb-4 group-hover:scale-110 transition-transform duration-300">
                    <div className="absolute inset-0 bg-primary-light/20 rounded-xl transform -rotate-[10deg] scale-[1.2] group-hover:-rotate-[25deg] transition-transform duration-500"></div>
                    <div className="absolute inset-0 bg-primary-light/10 dark:bg-primary-light/20 rounded-xl flex items-center justify-center z-10">
                      <i className="fas fa-tachometer-alt text-primary-light text-2xl"></i>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-800 dark:text-white mb-1">
                    <span className="text-primary-light stat-counter" data-count="32">0</span>%
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 text-sm">Average efficiency improvement</div>
                </div>
              </div>
              
              {/* Statistic 3 */}
              <div className="text-center group">
                <div className="inline-flex flex-col items-center">
                  <div className="relative w-16 h-16 mb-4 group-hover:scale-110 transition-transform duration-300">
                    <div className="absolute inset-0 bg-secondary/20 rounded-xl transform rotate-[10deg] scale-[1.2] group-hover:rotate-[25deg] transition-transform duration-500"></div>
                    <div className="absolute inset-0 bg-secondary/10 dark:bg-secondary/20 rounded-xl flex items-center justify-center z-10">
                      <i className="fas fa-calendar-check text-secondary text-2xl"></i>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-800 dark:text-white mb-1">
                    <span className="text-secondary stat-counter" data-count="90">0</span>%
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 text-sm">On-time delivery rate</div>
                </div>
              </div>
              
              {/* Statistic 4 */}
              <div className="text-center group">
                <div className="inline-flex flex-col items-center">
                  <div className="relative w-16 h-16 mb-4 group-hover:scale-110 transition-transform duration-300">
                    <div className="absolute inset-0 bg-blue-400/20 rounded-xl transform -rotate-[10deg] scale-[1.2] group-hover:-rotate-[25deg] transition-transform duration-500"></div>
                    <div className="absolute inset-0 bg-blue-400/10 dark:bg-blue-400/20 rounded-xl flex items-center justify-center z-10">
                      <i className="fas fa-dollar-sign text-blue-400 text-2xl"></i>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-800 dark:text-white mb-1">
                    <span className="text-blue-400 stat-counter" data-count="28">0</span>%
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 text-sm">Average revenue growth</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action - Modern Design */}
      <section className="relative py-24 overflow-hidden">
        {/* Background with Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/90 to-primary-dark overflow-hidden">
          {/* Animated gradient orbs */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-60">
            <div className="absolute top-[10%] right-[15%] w-[40rem] h-[40rem] rounded-full bg-primary/40 mix-blend-soft-light blur-[100px] animate-float-slow"></div>
            <div className="absolute bottom-[10%] left-[5%] w-[30rem] h-[30rem] rounded-full bg-secondary/30 mix-blend-soft-light blur-[80px] animate-float-slow" style={{ animationDelay: '2s' }}></div>
            <div className="absolute bottom-[30%] right-[20%] w-[25rem] h-[25rem] rounded-full bg-accent/30 mix-blend-soft-light blur-[60px] animate-float-slow" style={{ animationDelay: '4s' }}></div>
          </div>
          
          {/* Mesh grid overlay */}
          <div className="absolute inset-0 opacity-10 z-0" style={{ backgroundImage: 'url("/images/patterns/grid-pattern.svg")', backgroundSize: '40px' }}></div>
          
          {/* Floating geometric shapes */}
          <div className="absolute top-1/4 left-[5%] w-16 h-16 bg-white/10 backdrop-blur-sm rounded-lg rotate-12 animate-float" style={{ animationDuration: '18s' }}></div>
          <div className="absolute bottom-1/4 right-[10%] w-24 h-24 bg-white/10 backdrop-blur-sm rounded-full animate-float" style={{ animationDuration: '15s', animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 right-[20%] w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg -rotate-12 animate-float" style={{ animationDuration: '12s', animationDelay: '1s' }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Card Container */}
          <div className="max-w-5xl mx-auto perspective-1000 animate-on-scroll">
            <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-12 border border-white/20 shadow-2xl transform hover:rotate-x-1 hover:-rotate-y-1 transition-transform duration-700">
              {/* Inner content */}
              <div className="text-center text-white">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  Ready to Transform Your <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80">Business Operations?</span>
                </h2>
                <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto leading-relaxed">
                  Let's discuss how our approach can help you achieve your specific business objectives with measurable results.
                </p>
                
                <div className="flex flex-wrap gap-6 justify-center mt-12">
                  {/* Primary CTA Button with 3D effect */}
                  <div className="group perspective-500 hover:perspective-1000 transition-all duration-500">
                    <div className="relative transform group-hover:-rotate-y-12 transition-all duration-500">
                      <div className="absolute inset-0 bg-secondary rounded-xl transform translate-z-[-10px] scale-[0.98] opacity-80 group-hover:translate-z-[-20px] group-hover:scale-[0.96] transition-all duration-500"></div>
                      <Link 
                        href="/contact" 
                        className="relative bg-white text-primary hover:bg-gray-100 py-4 px-8 rounded-xl font-medium shadow-lg hover:shadow-2xl hover:scale-[1.03] transition-all duration-500 flex items-center justify-center z-10"
                      >
                        <span className="flex items-center">
                          <span className="font-bold text-lg">Schedule a Consultation</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Social proof */}
          <div className="max-w-4xl mx-auto mt-12 text-center animate-on-scroll delay-200">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl py-4 px-6 inline-block">
              <p className="text-white/80 text-sm">
                <span className="font-medium">Trusted approach</span> helping businesses transform their operations
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Back to Top Button */}
      <button 
        id="back-to-top" 
        className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-primary/80 text-white backdrop-blur-sm rounded-xl shadow-lg group flex items-center justify-center opacity-0 invisible transition-all duration-300 hover:scale-110 hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transform perspective-500" 
        aria-label="Back to top"
      >
        <div className="absolute inset-0 bg-primary/30 rounded-xl -z-10 blur-lg transform scale-90 group-hover:scale-125 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
        <i className="fas fa-arrow-up text-lg group-hover:animate-bounce"></i>
      </button>
    </PerformanceLayout>
  );
}