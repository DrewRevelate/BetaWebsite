import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';

// Import the unified AboutClientComponent
const AboutClientComponent = dynamic(() => import('./AboutClientComponent'), { ssr: false });
const AboutHeader = dynamic(() => import('./AboutHeader'), { ssr: false });

// Import client components dynamically for direct rendering in the page
// Note: Keeping the import for TestimonialsSlider but not rendering it
const TestimonialsSlider = dynamic(() => import('@/components/TestimonialsSlider'), { ssr: false });
const DynamicFAQSection = dynamic(() => import('./FaqSection'), { ssr: false });
const StatCounter = dynamic(() => import('./StatCounter'), { ssr: false });

export const metadata: Metadata = {
  title: 'About Us | Revelate Operations - SaaS & Data Experts',
  description: 'Meet the Revelate Operations team - data and SaaS experts helping companies leverage their data to drive growth and operational excellence. Led by Drew Lambert and Melanie Tummino.',
  keywords: 'Revelate Operations, revenue operations, RevOps, SaaS consulting, data integration, Salesforce expertise, business intelligence, Drew Lambert, Melanie Tummino, data analytics, team',
  openGraph: {
    title: 'About Revelate Operations | Meet Our Team of Data & SaaS Experts',
    description: 'Meet the passionate experts behind Revelate Operations who transform business data into strategic insights and actionable growth strategies. Learn about our mission, philosophy, and expertise.',
    url: 'https://revelateops.com/about',
    type: 'website',
    images: [
      {
        url: 'https://revelateops.com/images/about-team-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Revelate Operations Team',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Revelate Operations | Meet Our Team of Data & SaaS Experts',
    description: 'Meet the passionate experts behind Revelate Operations who transform business data into strategic insights and actionable growth strategies.',
    images: ['https://revelateops.com/images/about-team-og.jpg'],
  },
  alternates: {
    canonical: 'https://revelateops.com/about',
  },
};

const AboutPage = () => {
  return (
    <>
      {/* Include the client component to handle all interactive functionality */}
      <AboutClientComponent />
      
      {/* Hero Section */}
      <AboutHeader />
      
      {/* Our Mission Section */}
      <section className="py-20 relative overflow-hidden" id="mission">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-white dark:from-dark-light/50 dark:to-dark z-0"></div>
        
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/30 dark:bg-blue-900/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl z-0"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-100/30 dark:bg-indigo-900/10 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl z-0"></div>
        
        {/* Mesh Grid Background */}
        <div className="absolute inset-0 z-0 opacity-10" style={{ 
          backgroundImage: `radial-gradient(circle at 20px 20px, rgba(59, 85, 227, 0.1) 1px, transparent 0)`, 
          backgroundSize: '40px 40px' 
        }}></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 animate-on-scroll">
            <div className="inline-flex items-center space-x-2 mb-3 bg-blue-100/50 dark:bg-blue-900/30 backdrop-blur-md px-3 py-1.5 rounded-full">
              <div className="w-1.5 h-1.5 bg-blue-500 dark:bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium tracking-wide text-blue-700 dark:text-blue-300 uppercase">Our Mission</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary dark:from-primary-light dark:to-secondary">Elevating Revenue Operations</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto leading-relaxed">
              To enable organizations to achieve operational excellence through aligned systems, data-driven insights, and optimized processes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Core Mission Card 1 */}
            <div className="mission-card group animate-on-scroll">
              <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 transform perspective-1000 hover:rotate-y-5 hover:-rotate-x-2 hover:translate-y-[-8px] h-full flex flex-col">
                {/* Floating geometric accent */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/10 rounded-xl rotate-12 z-0 transition-transform duration-700 group-hover:rotate-45 group-hover:scale-110"></div>
                
                <div className="relative z-10">
                  <div className="w-20 h-20 mx-auto bg-primary/10 dark:bg-primary/20 rounded-2xl rotate-[10deg] flex items-center justify-center mb-8 transform transition-transform duration-500 group-hover:rotate-[25deg] group-hover:scale-110 shadow-lg">
                    <i className="fas fa-chart-bar text-primary dark:text-primary-light text-3xl"></i>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-center">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-dark dark:from-primary-light dark:to-primary">Data-Driven Excellence</span>
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-8 text-center">
                    We transform complex data into clear insights that drive strategic decision-making and measurable business outcomes.
                  </p>
                  
                  <div className="mt-auto">
                    <div className="bg-primary/5 dark:bg-primary/10 rounded-xl p-5">
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                          <span className="text-primary dark:text-primary-light font-bold">1</span>
                        </div>
                        <span className="text-primary dark:text-primary-light font-medium">Our Approach:</span>
                      </div>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <div className="flex-shrink-0 w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mr-3 mt-0.5">
                            <i className="fas fa-check text-primary dark:text-primary-light text-xs"></i>
                          </div>
                          <span>Advanced data analytics tailored to your business objectives</span>
                        </li>
                        <li className="flex items-start">
                          <div className="flex-shrink-0 w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mr-3 mt-0.5">
                            <i className="fas fa-check text-primary dark:text-primary-light text-xs"></i>
                          </div>
                          <span>KPI-driven roadmaps aligned with executive priorities</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Core Mission Card 2 */}
            <div className="mission-card group animate-on-scroll delay-100">
              <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 transform perspective-1000 hover:rotate-y-5 hover:rotate-x-2 hover:translate-y-[-8px] h-full flex flex-col">
                {/* Floating geometric accent */}
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-indigo-500/10 rounded-full z-0 transition-transform duration-700 group-hover:scale-110"></div>
                
                <div className="relative z-10">
                  <div className="w-20 h-20 mx-auto bg-indigo-500/10 dark:bg-indigo-500/20 rounded-2xl rotate-[-10deg] flex items-center justify-center mb-8 transform transition-transform duration-500 group-hover:rotate-[-25deg] group-hover:scale-110 shadow-lg">
                    <i className="fas fa-handshake text-indigo-600 dark:text-indigo-400 text-3xl"></i>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-center">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-400">Strategic Partnership</span>
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-8 text-center">
                    We work alongside your team as collaborative advisors invested in your long-term success, not just as service providers.
                  </p>
                  
                  <div className="mt-auto">
                    <div className="bg-indigo-600/5 dark:bg-indigo-600/10 rounded-xl p-5">
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center mr-3">
                          <span className="text-indigo-600 dark:text-indigo-400 font-bold">2</span>
                        </div>
                        <span className="text-indigo-600 dark:text-indigo-400 font-medium">Our Approach:</span>
                      </div>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <div className="flex-shrink-0 w-6 h-6 bg-indigo-500/20 rounded-full flex items-center justify-center mr-3 mt-0.5">
                            <i className="fas fa-check text-indigo-600 dark:text-indigo-400 text-xs"></i>
                          </div>
                          <span>Knowledge transfer to build internal capabilities</span>
                        </li>
                        <li className="flex items-start">
                          <div className="flex-shrink-0 w-6 h-6 bg-indigo-500/20 rounded-full flex items-center justify-center mr-3 mt-0.5">
                            <i className="fas fa-check text-indigo-600 dark:text-indigo-400 text-xs"></i>
                          </div>
                          <span>Shared accountability for business outcomes</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Core Mission Card 3 */}
            <div className="mission-card group animate-on-scroll delay-200">
              <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 transform perspective-1000 hover:rotate-y-5 hover:rotate-x-2 hover:translate-y-[-8px] h-full flex flex-col">
                {/* Floating geometric accent */}
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-secondary/10 rounded-xl rotate-45 z-0 transition-transform duration-700 group-hover:rotate-90 group-hover:scale-110"></div>
                
                <div className="relative z-10">
                  <div className="w-20 h-20 mx-auto bg-secondary/10 dark:bg-secondary/20 rounded-2xl rotate-[10deg] flex items-center justify-center mb-8 transform transition-transform duration-500 group-hover:rotate-[25deg] group-hover:scale-110 shadow-lg">
                    <i className="fas fa-rocket text-secondary dark:text-secondary text-3xl"></i>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-center">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-purple-500 dark:from-secondary dark:to-purple-400">Measurable Results</span>
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-8 text-center">
                    We deliver solutions with quantifiable business impact, focusing on sustainable results that continue to drive value long-term.
                  </p>
                  
                  <div className="mt-auto">
                    <div className="bg-secondary/5 dark:bg-secondary/10 rounded-xl p-5">
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center mr-3">
                          <span className="text-secondary dark:text-secondary font-bold">3</span>
                        </div>
                        <span className="text-secondary dark:text-secondary font-medium">Our Approach:</span>
                      </div>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <div className="flex-shrink-0 w-6 h-6 bg-secondary/20 rounded-full flex items-center justify-center mr-3 mt-0.5">
                            <i className="fas fa-check text-secondary dark:text-secondary text-xs"></i>
                          </div>
                          <span>ROI-focused implementation strategy</span>
                        </li>
                        <li className="flex items-start">
                          <div className="flex-shrink-0 w-6 h-6 bg-secondary/20 rounded-full flex items-center justify-center mr-3 mt-0.5">
                            <i className="fas fa-check text-secondary dark:text-secondary text-xs"></i>
                          </div>
                          <span>Continuous optimization to maximize value</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Vision Statement */}
          <div className="max-w-4xl mx-auto mt-20 text-center animate-on-scroll">
            <div className="inline-flex items-center space-x-2 mb-3 bg-indigo-100/50 dark:bg-indigo-900/30 backdrop-blur-md px-3 py-1.5 rounded-full">
              <div className="w-1.5 h-1.5 bg-indigo-500 dark:bg-indigo-400 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium tracking-wide text-indigo-700 dark:text-indigo-300 uppercase">Our Vision</span>
            </div>
            
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              A world where businesses can fully leverage their operational data to make <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-400 dark:to-indigo-500">confident decisions</span>, drive <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-secondary dark:from-indigo-500 dark:to-secondary">sustainable growth</span>, and deliver <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-pink-500 dark:from-secondary dark:to-pink-400">exceptional customer experiences</span>.
            </h3>
            
            <div className="flex justify-center mt-8">
              <a href="/approach" className="inline-flex items-center bg-white dark:bg-gray-800 text-primary dark:text-primary-light px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 dark:border-gray-700 group">
                <span>Learn About Our Approach</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-24 relative overflow-hidden" id="team">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 z-0"></div>
        
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
          <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll">
            <div className="inline-flex items-center space-x-2 mb-3 bg-indigo-100/50 dark:bg-indigo-900/30 backdrop-blur-md px-3 py-1.5 rounded-full">
              <div className="w-1.5 h-1.5 bg-indigo-500 dark:bg-indigo-400 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium tracking-wide text-indigo-700 dark:text-indigo-300 uppercase">Leadership & Expertise</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary dark:from-primary-light dark:to-secondary">Leadership Team</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mb-6"></div>
            
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Meet the experts behind Revelate Operations who transform business challenges into growth opportunities through data-driven insights and precision technology integration.
            </p>
          </div>
          
          <div className="space-y-16 max-w-6xl mx-auto">
            {/* Drew Lambert - Enhanced card */}
            <div className="bg-white/90 dark:bg-gray-800/90 rounded-xl shadow-xl overflow-hidden animate-on-scroll hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 backdrop-blur-sm transform perspective-1000 hover:translate-y-[-5px]">
              <div className="md:flex">
                <div className="md:w-1/3 relative">
                  <div className="h-80 md:h-full bg-gradient-to-b from-primary/5 via-blue-500/5 to-white dark:from-primary/20 dark:via-blue-900/20 dark:to-gray-800 relative overflow-hidden">
                    {/* Design elements */}
                    <div className="absolute top-0 left-0 w-full h-full">
                      <div className="absolute top-[15%] right-[-10%] w-40 h-40 bg-primary/10 rounded-full blur-xl"></div>
                      <div className="absolute bottom-[20%] left-[-15%] w-60 h-60 bg-blue-500/10 rounded-full blur-xl"></div>
                    </div>
                    
                    {/* Profile Image Container */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative w-64 h-64 flex items-center justify-center group">
                        <div className="absolute w-full h-full rounded-full bg-gradient-to-r from-primary/20 to-primary-dark/20 dark:from-primary/30 dark:to-primary-dark/30 animate-spin-slow"></div>
                        <div className="absolute w-[95%] h-[95%] rounded-full bg-white dark:bg-gray-800 flex items-center justify-center">
                          <div className="relative w-56 h-56 bg-white dark:bg-gray-700 rounded-full overflow-hidden border-8 border-white/50 dark:border-gray-800/50 shadow-inner flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-32 h-32 text-gray-300 dark:text-gray-500">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-6 left-6 flex space-x-3 z-20">
                    <a 
                      href="https://www.linkedin.com/in/drewblambert/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center text-white shadow-lg transition-all duration-300 hover:bg-primary-dark hover:scale-110"
                      aria-label="LinkedIn"
                    >
                      <i className="fab fa-linkedin-in text-lg"></i>
                    </a>
                    
                    <a 
                      href="mailto:drew@revelateops.com" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-12 h-12 rounded-full bg-blue-500/90 flex items-center justify-center text-white shadow-lg transition-all duration-300 hover:bg-blue-600 hover:scale-110"
                      aria-label="Email"
                    >
                      <i className="fas fa-envelope text-lg"></i>
                    </a>
                  </div>
                </div>
                
                <div className="md:w-2/3 p-8 md:p-10">
                  <div className="inline-flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-primary/10 to-blue-500/10 dark:from-primary/20 dark:to-blue-500/20 rounded-full mb-3">
                    <div className="w-1.5 h-1.5 bg-primary dark:bg-primary-light rounded-full"></div>
                    <span className="text-xs font-medium text-primary dark:text-primary-light">Co-Founder</span>
                  </div>
                  
                  <h3 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Drew Lambert</h3>
                  <p className="text-primary dark:text-primary-light text-xl font-semibold mb-6">SaaS & Salesforce Expert</p>
                  
                  <div className="prose dark:prose-invert mb-8 leading-relaxed">
                    <p>Drew embodies the true spirit of a Salesforce professional. His expertise in Salesforce architecture transcends mere technical skills; it is a craft he approaches with genuine passion and dedication.</p>
                    
                    <p>His journey began in college and has deepened over the years. Today, Drew holds an impressive record of over 300 Trailhead badges and more than 20 super badges, a testament to his commitment to mastering Salesforce.</p>
                    
                    <p>Over the course of his career, Drew has contributed his skills to more than 150 company tech stacks, demonstrating an exceptional ability to adapt to and enhance diverse business environments.</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <span className="px-4 py-2 bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light rounded-full text-sm font-medium">Salesforce Architecture</span>
                    <span className="px-4 py-2 bg-blue-500/10 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">CRM Optimization</span>
                    <span className="px-4 py-2 bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium">Sales Enablement</span>
                    <span className="px-4 py-2 bg-sky-500/10 dark:bg-sky-500/20 text-sky-700 dark:text-sky-300 rounded-full text-sm font-medium">Revenue Operations</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Melanie Tummino - Enhanced card */}
            <div className="bg-white/90 dark:bg-gray-800/90 rounded-xl shadow-xl overflow-hidden animate-on-scroll hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 backdrop-blur-sm transform perspective-1000 hover:translate-y-[-5px]">
              <div className="md:flex">
                <div className="md:w-1/3 md:order-2 relative">
                  <div className="h-80 md:h-full bg-gradient-to-b from-secondary/5 via-purple-500/5 to-white dark:from-secondary/20 dark:via-purple-900/20 dark:to-gray-800 relative overflow-hidden">
                    {/* Design elements */}
                    <div className="absolute top-0 left-0 w-full h-full">
                      <div className="absolute top-[15%] left-[-10%] w-40 h-40 bg-secondary/10 rounded-full blur-xl"></div>
                      <div className="absolute bottom-[20%] right-[-15%] w-60 h-60 bg-purple-500/10 rounded-full blur-xl"></div>
                    </div>
                    
                    {/* Profile Image Container */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative w-64 h-64 flex items-center justify-center group">
                        <div className="absolute w-full h-full rounded-full bg-gradient-to-r from-secondary/20 to-purple-600/20 dark:from-secondary/30 dark:to-purple-600/30 animate-spin-slow"></div>
                        <div className="absolute w-[95%] h-[95%] rounded-full bg-white dark:bg-gray-800 flex items-center justify-center">
                          <div className="relative w-56 h-56 bg-white dark:bg-gray-700 rounded-full overflow-hidden border-8 border-white/50 dark:border-gray-800/50 shadow-inner flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-32 h-32 text-gray-300 dark:text-gray-500">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-6 right-6 flex space-x-3 z-20">
                    <a 
                      href="https://www.linkedin.com/in/melanietummino/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-12 h-12 rounded-full bg-secondary/90 flex items-center justify-center text-white shadow-lg transition-all duration-300 hover:bg-secondary hover:scale-110"
                      aria-label="LinkedIn"
                    >
                      <i className="fab fa-linkedin-in text-lg"></i>
                    </a>
                    
                    <a 
                      href="mailto:melanie@revelateops.com" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-12 h-12 rounded-full bg-purple-500/90 flex items-center justify-center text-white shadow-lg transition-all duration-300 hover:bg-purple-600 hover:scale-110"
                      aria-label="Email"
                    >
                      <i className="fas fa-envelope text-lg"></i>
                    </a>
                  </div>
                </div>
                
                <div className="md:w-2/3 md:order-1 p-8 md:p-10">
                  <div className="inline-flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-secondary/10 to-purple-500/10 dark:from-secondary/20 dark:to-purple-500/20 rounded-full mb-3">
                    <div className="w-1.5 h-1.5 bg-secondary dark:bg-secondary rounded-full"></div>
                    <span className="text-xs font-medium text-secondary dark:text-secondary">Co-Founder</span>
                  </div>
                  
                  <h3 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Melanie Tummino</h3>
                  <p className="text-secondary dark:text-secondary text-xl font-semibold mb-6">Data Analytics Specialist</p>
                  
                  <div className="prose dark:prose-invert mb-8 leading-relaxed">
                    <p>Melanie is a data enthusiast with a proven track record of translating complex data insights into actionable business strategies and insightful dashboards. Her expertise lies in fostering cross-functional collaboration, bridging the gap between analytics and business objectives.</p>
                    
                    <p>With over six years of hands-on experience, Melanie has worn many hats across the data spectrum, from data architecture and engineering to data science, data warehousing, and ultimately, data analytics.</p>
                    
                    <p>A data whiz in the truest sense, Melanie enjoys drawing insights from every facet of an organization, using data to create powerhouse analytics that drive growth and reinforce core business operations.</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <span className="px-4 py-2 bg-secondary/10 dark:bg-secondary/20 text-secondary dark:text-secondary rounded-full text-sm font-medium">Data Analytics</span>
                    <span className="px-4 py-2 bg-purple-500/10 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">Business Intelligence</span>
                    <span className="px-4 py-2 bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium">Dashboard Development</span>
                    <span className="px-4 py-2 bg-pink-500/10 dark:bg-pink-500/20 text-pink-700 dark:text-pink-300 rounded-full text-sm font-medium">Data Strategy</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Enhanced CTA section */}
          <div className="relative mt-24 max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 rounded-2xl p-10 shadow-lg border border-white/50 dark:border-gray-700/50 backdrop-blur-sm">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Interested in joining our team?</h3>
                <p className="text-lg mb-8 text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
                  We're always looking for passionate experts who share our vision of transforming how businesses leverage their data to drive growth and operational excellence.
                </p>
                <Link 
                  href="/contact" 
                  className="inline-flex items-center bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <span>Join Our Team</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-20 h-20 bg-primary/10 rounded-full blur-xl"></div>
              <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-secondary/10 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Philosophy Section */}
      <section id="philosophy" className="py-24 relative overflow-hidden">
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
          <div className="text-center mb-16 animate-on-scroll">
            <div className="inline-flex items-center space-x-2 mb-3 bg-blue-100/50 dark:bg-blue-900/30 backdrop-blur-md px-3 py-1.5 rounded-full">
              <div className="w-1.5 h-1.5 bg-blue-500 dark:bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium tracking-wide text-blue-700 dark:text-blue-300 uppercase">Our Core Beliefs</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary dark:from-primary-light dark:to-secondary">The Revelate Operations Philosophy</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mb-6"></div>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto leading-relaxed">
              We transform complex revenue operations challenges into strategic advantages through a precision-focused, results-driven approach.
            </p>
          </div>
          
          {/* Main philosophy content - modern card design */}
          <div className="max-w-4xl mx-auto mb-20">
            <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl p-8 md:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/3 translate-x-1/3 blur-xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full translate-y-1/3 -translate-x-1/3 blur-xl"></div>
              
              {/* Quote mark */}
              <div className="absolute top-6 left-6 text-8xl text-primary/10 dark:text-primary/20 leading-none font-serif">"</div>
              
              <div className="relative prose dark:prose-invert max-w-none">
                <p className="text-2xl font-medium mb-6 text-gray-900 dark:text-white leading-relaxed">
                  Revelate Operations represents the quintessence of expertise, experience, and a refreshingly humble approach to data and analytics.
                </p>
                
                <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
                  Leveraging state-of-the-art tools and delivering invaluable insights, we equip our clients with the necessary resources to excel in a dynamic business landscape. Our success stems from an acute ability to foresee industry trends and adapt to evolving market conditions.
                </p>
                
                <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
                  This pursuit of knowledge, combined with an awareness of market dynamics, cements our position as leaders in operational excellence. Revelate Operations, led by Drew and Melanie, champions a philosophy of humility and empathy.
                </p>
                
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  This ethos is the heart of our approach, inspiring businesses to aim for excellence through collaboration, innovation, and strategic success. With Revelate Operations, you're not just extracting data; you're unlocking a reservoir of strategic wealth, guiding your business towards unprecedented success.
                </p>
              </div>
              
              {/* Signature element */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary dark:from-primary-light dark:to-secondary flex items-center justify-center text-white font-bold text-xl shadow-lg">R</div>
                <div className="ml-4">
                  <p className="font-bold text-gray-900 dark:text-white">Revelate Operations</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Transforming Data into Strategic Advantages</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Philosophy Cards - using modern 3D hover effect */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {/* Partnership Approach Card */}
            <div className="philosophy-card group animate-on-scroll">
              <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 transform perspective-1000 hover:rotate-y-5 hover:-rotate-x-2 hover:translate-y-[-8px] h-full flex flex-col">
                {/* Floating geometric accent */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/10 rounded-xl rotate-12 z-0 transition-transform duration-700 group-hover:rotate-45 group-hover:scale-110"></div>
                
                <div className="relative z-10">
                  <div className="w-20 h-20 mx-auto bg-primary/10 dark:bg-primary/20 rounded-2xl rotate-[10deg] flex items-center justify-center mb-8 transform transition-transform duration-500 group-hover:rotate-[25deg] group-hover:scale-110 shadow-lg">
                    <i className="fas fa-handshake text-primary dark:text-primary-light text-3xl"></i>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-center">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-dark dark:from-primary-light dark:to-primary">Partnership Approach</span>
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-8 text-center">
                    We work alongside your team as true partners, ensuring knowledge transfer and sustainable success.
                  </p>
                  
                  <div className="mt-auto">
                    <div className="bg-primary/5 dark:bg-primary/10 rounded-xl p-5">
                      <div className="text-primary dark:text-primary-light font-medium mb-3">Our Promise:</div>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        Building relationships that empower your team to succeed long after our engagement ends
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Results-Focused Card */}
            <div className="philosophy-card group animate-on-scroll delay-100">
              <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 transform perspective-1000 hover:rotate-y-5 hover:rotate-x-2 hover:translate-y-[-8px] h-full flex flex-col">
                {/* Floating geometric accent */}
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-blue-500/10 rounded-full z-0 transition-transform duration-700 group-hover:scale-110"></div>
                
                <div className="relative z-10">
                  <div className="w-20 h-20 mx-auto bg-blue-500/10 dark:bg-blue-500/20 rounded-2xl rotate-[-10deg] flex items-center justify-center mb-8 transform transition-transform duration-500 group-hover:rotate-[-25deg] group-hover:scale-110 shadow-lg">
                    <i className="fas fa-bullseye text-blue-600 dark:text-blue-400 text-3xl"></i>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-center">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">Results-Focused</span>
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-8 text-center">
                    We measure our success by the tangible outcomes we help our clients achieve.
                  </p>
                  
                  <div className="mt-auto">
                    <div className="bg-blue-500/5 dark:bg-blue-500/10 rounded-xl p-5">
                      <div className="text-blue-600 dark:text-blue-400 font-medium mb-3">Our Promise:</div>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        Delivering measurable ROI through data-driven strategies and implementations
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Continuous Learning Card */}
            <div className="philosophy-card group animate-on-scroll delay-200">
              <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 transform perspective-1000 hover:rotate-y-5 hover:rotate-x-2 hover:translate-y-[-8px] h-full flex flex-col">
                {/* Floating geometric accent */}
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-indigo-500/10 rounded-xl rotate-45 z-0 transition-transform duration-700 group-hover:rotate-90 group-hover:scale-110"></div>
                
                <div className="relative z-10">
                  <div className="w-20 h-20 mx-auto bg-indigo-500/10 dark:bg-indigo-500/20 rounded-2xl rotate-[10deg] flex items-center justify-center mb-8 transform transition-transform duration-500 group-hover:rotate-[25deg] group-hover:scale-110 shadow-lg">
                    <i className="fas fa-graduation-cap text-indigo-600 dark:text-indigo-400 text-3xl"></i>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-center">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-400">Continuous Learning</span>
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-8 text-center">
                    We're committed to staying at the forefront of industry developments and technological advancements.
                  </p>
                  
                  <div className="mt-auto">
                    <div className="bg-indigo-500/5 dark:bg-indigo-500/10 rounded-xl p-5">
                      <div className="text-indigo-600 dark:text-indigo-400 font-medium mb-3">Our Promise:</div>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        Bringing cutting-edge expertise and innovative solutions to every client engagement
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Adaptable Solutions Card */}
            <div className="philosophy-card group animate-on-scroll delay-300">
              <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 transform perspective-1000 hover:rotate-y-5 hover:rotate-x-2 hover:translate-y-[-8px] h-full flex flex-col">
                {/* Floating geometric accent */}
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-secondary/10 rounded-full z-0 transition-transform duration-700 group-hover:scale-110"></div>
                
                <div className="relative z-10">
                  <div className="w-20 h-20 mx-auto bg-secondary/10 dark:bg-secondary/20 rounded-2xl rotate-[-10deg] flex items-center justify-center mb-8 transform transition-transform duration-500 group-hover:rotate-[-25deg] group-hover:scale-110 shadow-lg">
                    <i className="fas fa-cog text-secondary dark:text-secondary text-3xl"></i>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-center">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-purple-500 dark:from-secondary dark:to-purple-400">Adaptable Solutions</span>
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-8 text-center">
                    We tailor our approach to each client's unique needs, challenges, and objectives.
                  </p>
                  
                  <div className="mt-auto">
                    <div className="bg-secondary/5 dark:bg-secondary/10 rounded-xl p-5">
                      <div className="text-secondary dark:text-secondary font-medium mb-3">Our Promise:</div>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        Creating customized strategies that address your specific business challenges
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section - Modern Design */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800" id="faq">
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
          <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll">
            <div className="inline-flex items-center space-x-2 mb-3 bg-indigo-100/50 dark:bg-indigo-900/30 backdrop-blur-md px-3 py-1.5 rounded-full">
              <div className="w-1.5 h-1.5 bg-indigo-500 dark:bg-indigo-400 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium tracking-wide text-indigo-700 dark:text-indigo-300 uppercase">Common Questions</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary dark:from-primary-light dark:to-secondary">Frequently Asked Questions</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mb-6"></div>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto leading-relaxed">
              Get answers to common questions about our company and our approach to helping businesses transform their data into strategic advantages.
            </p>
          </div>
          
          {/* Client-side FAQ component wrapped in a modern card */}
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/3 translate-x-1/3 blur-xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full translate-y-1/3 -translate-x-1/3 blur-xl"></div>
              
              {/* Question mark icon */}
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center shadow-lg">
                <i className="fas fa-question text-primary/60 dark:text-primary-light/60 text-2xl"></i>
              </div>
              
              <div className="relative pt-6">
                <DynamicFAQSection />
              </div>
            </div>
          </div>
          
          {/* Enhanced CTA section */}
          <div className="mt-20 text-center animate-on-scroll">
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl py-10 px-6 max-w-3xl mx-auto shadow-lg border border-gray-100 dark:border-gray-700">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Still have questions?</h3>
              <p className="text-lg mb-8 text-gray-700 dark:text-gray-300">
                We're here to help! Reach out to our team for answers to your specific questions about how we can help your business.
              </p>
              <Link 
                href="/contact" 
                className="inline-flex items-center bg-gradient-to-r from-primary to-primary-dark dark:from-primary-light dark:to-primary text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-105"
              >
                <span>Get in Touch</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section - Modern 3D Card Design */}
      <section className="py-24 relative overflow-hidden">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 z-0"></div>
        
        {/* Ambient background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-5 z-0">
            <div className="absolute w-full h-full" style={{ backgroundImage: 'url("/images/patterns/grid-pattern.svg")', backgroundSize: '30px' }}></div>
          </div>
          
          {/* Large gradient orbs */}
          <div className="absolute top-20 right-[15%] w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float-slow"></div>
          <div className="absolute bottom-40 left-[10%] w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '2.5s' }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll">
            <div className="inline-flex items-center space-x-2 mb-3 bg-primary-light/10 dark:bg-primary-light/20 backdrop-blur-md px-3 py-1.5 rounded-full">
              <div className="w-1.5 h-1.5 bg-primary-light dark:bg-primary-light rounded-full animate-pulse"></div>
              <span className="text-xs font-medium tracking-wide text-primary-light dark:text-primary-light uppercase">By the Numbers</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary dark:from-primary-light dark:to-secondary">Our Impact in Numbers</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mb-6"></div>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto leading-relaxed">
              Delivering measurable results that drive business growth and operational excellence
            </p>
          </div>
          
          {/* Modern 3D card for StatCounter */}
          <div className="max-w-5xl mx-auto perspective-1000 animate-on-scroll">
            <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-10 shadow-xl border border-white/20 dark:border-white/5 transform hover:rotate-x-1 hover:scale-[1.01] transition-all duration-700 overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 rounded-full -translate-y-1/3 translate-x-1/3 blur-xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-br from-secondary/5 to-accent/5 dark:from-secondary/10 dark:to-accent/10 rounded-full translate-y-1/3 -translate-x-1/3 blur-xl"></div>
              
              <div className="relative z-10">
                <StatCounter />
              </div>
              
              {/* Bottom pattern */}
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-secondary to-accent"></div>
            </div>
          </div>
          
          {/* Additional context for stats */}
          <div className="max-w-3xl mx-auto mt-12 text-center">
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Our metrics reflect our commitment to delivering exceptional results for our clients. 
              Each number represents real business impact and transformation we've helped achieve.
            </p>
          </div>
        </div>
      </section>
      
      {/* Call to Action - Modern Gradient Design */}
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
                  Let's start a conversation about how Revelate Operations can help you unlock the full potential of your data and drive business growth.
                </p>
                
                <div className="flex flex-wrap gap-6 justify-center mt-8">
                  {/* Primary CTA Button with 3D effect */}
                  <div className="group perspective-500 hover:perspective-1000 transition-all duration-500">
                    <div className="relative transform group-hover:-rotate-y-12 transition-all duration-500">
                      <div className="absolute inset-0 bg-secondary rounded-xl transform translate-z-[-10px] scale-[0.98] opacity-80 group-hover:translate-z-[-20px] group-hover:scale-[0.96] transition-all duration-500"></div>
                      <Link 
                        href="/contact" 
                        className="relative bg-white text-primary hover:bg-gray-100 py-4 px-8 rounded-xl font-bold text-lg shadow-lg hover:shadow-2xl hover:scale-[1.03] transition-all duration-500 flex items-center justify-center z-10"
                      >
                        <span className="flex items-center">
                          <span>Schedule a Consultation</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </span>
                      </Link>
                    </div>
                  </div>
                  
                  {/* Secondary CTA Button with different 3D effect */}
                  <div className="group perspective-500 hover:perspective-1000 transition-all duration-500">
                    <div className="relative transform group-hover:rotate-y-12 transition-all duration-500">
                      <div className="absolute inset-0 bg-primary rounded-xl transform translate-z-[-10px] scale-[0.98] opacity-50 group-hover:translate-z-[-20px] group-hover:scale-[0.96] transition-all duration-500"></div>
                      <Link 
                        href="/services" 
                        className="relative bg-transparent border-2 border-white text-white hover:bg-white/10 py-4 px-8 rounded-xl font-bold text-lg shadow-lg hover:shadow-2xl hover:scale-[1.03] transition-all duration-500 flex items-center justify-center z-10"
                      >
                        <span className="flex items-center">
                          <span>Explore Our Services</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
                
                {/* Service Highlights */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                  <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 shadow-lg hover:shadow-xl hover:translate-y-[-5px] transition-all duration-300">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-5">
                      <i className="fas fa-chart-line text-white text-2xl"></i>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white">Data Analytics</h3>
                    <p className="text-white/80 text-sm">
                      Transform raw data into actionable insights for strategic business growth
                    </p>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 shadow-lg hover:shadow-xl hover:translate-y-[-5px] transition-all duration-300">
                    <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-5">
                      <i className="fas fa-cogs text-white text-2xl"></i>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white">CRM Optimization</h3>
                    <p className="text-white/80 text-sm">
                      Enhance your Salesforce and CRM systems for maximum efficiency and effectiveness
                    </p>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 shadow-lg hover:shadow-xl hover:translate-y-[-5px] transition-all duration-300">
                    <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-5">
                      <i className="fas fa-handshake text-white text-2xl"></i>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white">Strategic Advisory</h3>
                    <p className="text-white/80 text-sm">
                      Expert guidance to align technology with your specific business goals and challenges
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Social proof */}
          <div className="max-w-4xl mx-auto mt-12 text-center animate-on-scroll delay-200">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl py-4 px-6 inline-block">
              <p className="text-white/80 text-sm">
                <span className="font-medium">Trusted by businesses</span> for transforming complex data challenges into strategic advantages
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
