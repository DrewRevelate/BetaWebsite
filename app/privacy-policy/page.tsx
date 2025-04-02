import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import privacyPolicySchema from './schema';
import Script from 'next/script';

// Import the client component
const PrivacyPolicyClientComponent = dynamic(() => import('./PrivacyPolicyClientComponent'), { ssr: false });

export const metadata: Metadata = {
  title: 'Privacy Policy | Revelate Operations',
  description: 'Learn about how Revelate Operations collects, uses, and protects your personal information. Our privacy policy outlines our commitment to your data security and privacy.',
  keywords: 'privacy policy, data protection, personal information, GDPR, CCPA, data security, Revelate Operations',
  openGraph: {
    title: 'Privacy Policy | Revelate Operations',
    description: 'Learn about how Revelate Operations collects, uses, and protects your personal information.',
    url: 'https://revelateops.com/privacy-policy',
    type: 'website',
  },
};

const PrivacyPolicyPage = () => {
  // Last updated date for the privacy policy
  const lastUpdated = 'March 22, 2025';
  
  return (
    <>
      {/* JSON-LD structured data for SEO */}
      <Script
        id="privacy-policy-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(privacyPolicySchema) }}
      />
      {/* Include the client component to handle all interactive functionality */}
      <PrivacyPolicyClientComponent />
      
      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-r from-primary to-primary-light text-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Privacy Policy
            </h1>
            <p className="text-xl opacity-90 mb-6">
              How we collect, use, and protect your information
            </p>
            <p className="text-sm opacity-75">
              Last Updated: {lastUpdated}
            </p>
          </div>
        </div>
        
        {/* Wave SVG */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full">
            <path d="M0,32L60,37.3C120,43,240,53,360,53.3C480,53,600,43,720,42.7C840,43,960,53,1080,53.3C1200,53,1320,43,1380,37.3L1440,32L1440,100L1380,100C1320,100,1200,100,1080,100C960,100,840,100,720,100C600,100,480,100,360,100C240,100,120,100,60,100L0,100Z" fill="#f8f9fa"></path>
          </svg>
        </div>
      </section>
      
      {/* Main Content Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Table of Contents Sidebar */}
            <div className="lg:w-1/4">
              <div className="sticky top-24 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-xl font-bold mb-4">Table of Contents</h2>
                <nav className="toc-nav">
                  <ul className="space-y-2">
                    <li>
                      <a href="#introduction" className="toc-link block text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">Introduction</a>
                    </li>
                    <li>
                      <a href="#information-collection" className="toc-link block text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">Information Collection</a>
                    </li>
                    <li>
                      <a href="#use-of-information" className="toc-link block text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">Use of Information</a>
                    </li>
                    <li>
                      <a href="#information-sharing" className="toc-link block text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">Information Sharing</a>
                    </li>
                    <li>
                      <a href="#data-security" className="toc-link block text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">Data Security</a>
                    </li>
                    <li>
                      <a href="#cookies" className="toc-link block text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">Cookies</a>
                    </li>
                    <li>
                      <a href="#user-rights" className="toc-link block text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">Your Rights</a>
                    </li>
                    <li>
                      <a href="#childrens-privacy" className="toc-link block text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">Children's Privacy</a>
                    </li>
                    <li>
                      <a href="#policy-changes" className="toc-link block text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">Changes to This Policy</a>
                    </li>
                    <li>
                      <a href="#contact-us" className="toc-link block text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">Contact Us</a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="lg:w-3/4">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 md:p-8">
                {/* Introduction Section */}
                <section id="introduction" className="policy-section mb-12 animate-on-scroll">
                  <h2 className="text-2xl font-bold mb-4 text-primary">Introduction</h2>
                  <div className="prose dark:prose-invert max-w-none">
                    <p>
                      At Revelate Operations ("we," "our," or "us"), we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
                    </p>
                    <p>
                      We take your privacy seriously and have implemented measures to ensure that your personal information is handled responsibly and in accordance with applicable data protection laws, including the General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA) where applicable.
                    </p>
                    <p>
                      By accessing or using our website and services, you acknowledge that you have read and understood this Privacy Policy. If you do not agree with our policies and practices, please do not use our services.
                    </p>
                  </div>
                </section>
                
                {/* Information Collection Section */}
                <section id="information-collection" className="policy-section mb-12 animate-on-scroll">
                  <h2 className="text-2xl font-bold mb-4 text-primary">Information Collection</h2>
                  <div className="prose dark:prose-invert max-w-none">
                    <p>
                      We collect information that you provide directly to us, information we obtain automatically when you use our services, and information from third-party sources.
                    </p>
                    
                    <h3 className="text-xl font-semibold mt-6 mb-3">Information You Provide</h3>
                    <p>
                      We may collect personal information that you provide when you:
                    </p>
                    <ul>
                      <li>Fill out forms on our website, including contact forms or newsletter sign-ups</li>
                      <li>Register for an account or create a profile</li>
                      <li>Subscribe to our communications</li>
                      <li>Request a consultation or services</li>
                      <li>Respond to surveys or questionnaires</li>
                      <li>Communicate with us via email, phone, or other methods</li>
                    </ul>
                    <p>
                      The types of personal information we may collect include:
                    </p>
                    <ul>
                      <li>Contact information (name, email address, phone number, company name, job title)</li>
                      <li>Demographic information</li>
                      <li>Payment information for services (processed through secure third-party payment processors)</li>
                      <li>Communications and correspondence with us</li>
                      <li>Other information you choose to provide</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold mt-6 mb-3">Information Collected Automatically</h3>
                    <p>
                      When you visit our website or use our services, we automatically collect certain information, including:
                    </p>
                    <ul>
                      <li>Log data (IP address, browser type, pages visited, time spent on pages, referring website)</li>
                      <li>Device information (device type, operating system)</li>
                      <li>Location information (country, region)</li>
                      <li>Usage information (interactions with our website, services, and emails)</li>
                      <li>Cookies and similar tracking technologies (as described in our Cookie section)</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold mt-6 mb-3">Information from Third Parties</h3>
                    <p>
                      We may receive information about you from third parties, including:
                    </p>
                    <ul>
                      <li>Business partners</li>
                      <li>Service providers</li>
                      <li>Marketing and analytics providers</li>
                      <li>Publicly available sources</li>
                    </ul>
                  </div>
                </section>
                
                {/* Use of Information Section */}
                <section id="use-of-information" className="policy-section mb-12 animate-on-scroll">
                  <h2 className="text-2xl font-bold mb-4 text-primary">Use of Information</h2>
                  <div className="prose dark:prose-invert max-w-none">
                    <p>
                      We use the information we collect for various business and commercial purposes, including to:
                    </p>
                    <ul>
                      <li>Provide, maintain, and improve our services</li>
                      <li>Process and complete transactions</li>
                      <li>Send administrative information, such as updates, security alerts, and support messages</li>
                      <li>Respond to your comments, questions, and requests</li>
                      <li>Communicate with you about products, services, offers, promotions, and events</li>
                      <li>Monitor and analyze trends, usage, and activities</li>
                      <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
                      <li>Personalize your experience and deliver content and features relevant to your interests</li>
                      <li>Facilitate contests, sweepstakes, and promotions and process and deliver entries and rewards</li>
                      <li>Carry out any other purpose described to you at the time the information was collected</li>
                    </ul>
                    
                    <p>
                      We may combine information collected through different sources for these purposes.
                    </p>
                  </div>
                </section>
                
                {/* Information Sharing Section */}
                <section id="information-sharing" className="policy-section mb-12 animate-on-scroll">
                  <h2 className="text-2xl font-bold mb-4 text-primary">Information Sharing</h2>
                  <div className="prose dark:prose-invert max-w-none">
                    <p>
                      We may share your information in the following circumstances:
                    </p>
                    
                    <h3 className="text-xl font-semibold mt-6 mb-3">With Service Providers</h3>
                    <p>
                      We share information with third-party vendors, consultants, and other service providers who need access to such information to carry out work on our behalf, such as:
                    </p>
                    <ul>
                      <li>Cloud hosting providers</li>
                      <li>Payment processors</li>
                      <li>Analytics providers</li>
                      <li>Email service providers</li>
                      <li>Customer relationship management systems</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold mt-6 mb-3">For Legal Reasons</h3>
                    <p>
                      We may disclose information if we believe in good faith that disclosure is necessary to:
                    </p>
                    <ul>
                      <li>Comply with applicable laws, regulations, legal processes, or governmental requests</li>
                      <li>Protect our rights, privacy, safety, or property</li>
                      <li>Protect the rights, privacy, safety, or property of our users or others</li>
                      <li>Detect, prevent, or address fraud, security, or technical issues</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold mt-6 mb-3">Business Transfers</h3>
                    <p>
                      We may share or transfer information in connection with a merger, acquisition, reorganization, sale of assets, bankruptcy, or similar business transaction.
                    </p>
                    
                    <h3 className="text-xl font-semibold mt-6 mb-3">With Your Consent</h3>
                    <p>
                      We may share information with third parties when you consent to such sharing.
                    </p>
                    
                    <h3 className="text-xl font-semibold mt-6 mb-3">Aggregated or De-identified Information</h3>
                    <p>
                      We may share aggregated or de-identified information that cannot reasonably be used to identify you.
                    </p>
                  </div>
                </section>
                
                {/* Data Security Section */}
                <section id="data-security" className="policy-section mb-12 animate-on-scroll">
                  <h2 className="text-2xl font-bold mb-4 text-primary">Data Security</h2>
                  <div className="prose dark:prose-invert max-w-none">
                    <p>
                      We implement appropriate technical and organizational security measures designed to protect the security of any personal information we process. These measures include:
                    </p>
                    <ul>
                      <li>Encryption of sensitive data</li>
                      <li>Regular security assessments</li>
                      <li>Secure infrastructure and networks</li>
                      <li>Limited access to personal information</li>
                      <li>Employee training on data security practices</li>
                    </ul>
                    <p>
                      However, please note that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
                    </p>
                    <p>
                      We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
                    </p>
                  </div>
                </section>
                
                {/* Cookies Section */}
                <section id="cookies" className="policy-section mb-12 animate-on-scroll">
                  <h2 className="text-2xl font-bold mb-4 text-primary">Cookies and Tracking Technologies</h2>
                  <div className="prose dark:prose-invert max-w-none">
                    <p>
                      We and our third-party service providers use cookies, web beacons, and other tracking technologies to collect information about your browsing activities on our website.
                    </p>
                    
                    <h3 className="text-xl font-semibold mt-6 mb-3">What Are Cookies?</h3>
                    <p>
                      Cookies are small data files stored on your device that help us improve our website and your experience, see which areas and features of our website are popular, and count visits.
                    </p>
                    
                    <h3 className="text-xl font-semibold mt-6 mb-3">Types of Cookies We Use</h3>
                    <ul>
                      <li><strong>Essential Cookies:</strong> Required for the website to function and cannot be switched off. They are usually set in response to actions you take, such as setting your privacy preferences, logging in, or filling in forms.</li>
                      <li><strong>Analytical/Performance Cookies:</strong> Allow us to recognize and count the number of visitors and see how visitors move around our website. This helps us improve how our website works.</li>
                      <li><strong>Functionality Cookies:</strong> Enable the website to provide enhanced functionality and personalization, such as remembering your preferences and settings.</li>
                      <li><strong>Targeting/Advertising Cookies:</strong> Used to deliver relevant advertisements and track the effectiveness of advertising campaigns.</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold mt-6 mb-3">Cookie Management</h3>
                    <p>
                      Most web browsers are set to accept cookies by default. You can usually choose to set your browser to remove or reject cookies. Instructions for managing cookies in popular browsers:
                    </p>
                    <ul>
                      <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Chrome</a></li>
                      <li><a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Mozilla Firefox</a></li>
                      <li><a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Safari</a></li>
                      <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Microsoft Edge</a></li>
                    </ul>
                    <p>
                      Please note that if you remove or reject cookies, this could affect the availability and functionality of our website.
                    </p>
                    
                    <h3 className="text-xl font-semibold mt-6 mb-3">Do Not Track</h3>
                    <p>
                      Some browsers have a "Do Not Track" feature that signals to websites that you do not want to have your online activities tracked. Our website currently does not respond to "Do Not Track" signals.
                    </p>
                  </div>
                </section>
                
                {/* User Rights Section */}
                <section id="user-rights" className="policy-section mb-12 animate-on-scroll">
                  <h2 className="text-2xl font-bold mb-4 text-primary">Your Rights</h2>
                  <div className="prose dark:prose-invert max-w-none">
                    <p>
                      Depending on your location, you may have certain rights regarding your personal information. These may include:
                    </p>
                    <ul>
                      <li><strong>Access:</strong> You have the right to request access to the personal information we hold about you.</li>
                      <li><strong>Correction:</strong> You have the right to request that we correct any information you believe is inaccurate or complete information you believe is incomplete.</li>
                      <li><strong>Deletion:</strong> You have the right to request that we delete your personal information, subject to certain exceptions.</li>
                      <li><strong>Restriction:</strong> You have the right to request that we restrict the processing of your personal information.</li>
                      <li><strong>Data Portability:</strong> You have the right to request that we transfer your personal information to another organization or directly to you.</li>
                      <li><strong>Objection:</strong> You have the right to object to our processing of your personal information.</li>
                      <li><strong>Withdraw Consent:</strong> If we rely on your consent to process your personal information, you have the right to withdraw that consent at any time.</li>
                    </ul>
                    
                    <p>
                      To exercise any of these rights, please contact us using the contact information provided below. We may need to verify your identity before responding to your request.
                    </p>
                    
                    <h3 className="text-xl font-semibold mt-6 mb-3">California Residents</h3>
                    <p>
                      If you are a California resident, you have specific rights under the California Consumer Privacy Act (CCPA) and the California Privacy Rights Act (CPRA). These include the right to know what personal information we collect, the right to delete personal information, and the right to opt out of the sale or sharing of personal information.
                    </p>
                    
                    <h3 className="text-xl font-semibold mt-6 mb-3">European Residents</h3>
                    <p>
                      If you are a resident of the European Economic Area (EEA), United Kingdom, or Switzerland, you have certain rights under the General Data Protection Regulation (GDPR) and applicable national data protection laws.
                    </p>
                    <p>
                      In addition to the rights mentioned above, you also have the right to lodge a complaint with a supervisory authority if you believe that our processing of your personal information violates applicable law.
                    </p>
                  </div>
                </section>
                
                {/* Children's Privacy Section */}
                <section id="childrens-privacy" className="policy-section mb-12 animate-on-scroll">
                  <h2 className="text-2xl font-bold mb-4 text-primary">Children's Privacy</h2>
                  <div className="prose dark:prose-invert max-w-none">
                    <p>
                      Our website and services are not directed to children under the age of 16. We do not knowingly collect personal information from children under 16. If you are a parent or guardian and you believe your child has provided us with personal information, please contact us. If we discover that a child under 16 has provided us with personal information, we will delete such information from our servers.
                    </p>
                  </div>
                </section>
                
                {/* Policy Changes Section */}
                <section id="policy-changes" className="policy-section mb-12 animate-on-scroll">
                  <h2 className="text-2xl font-bold mb-4 text-primary">Changes to This Privacy Policy</h2>
                  <div className="prose dark:prose-invert max-w-none">
                    <p>
                      We may update our Privacy Policy from time to time. The updated version will be effective as of the date stated at the top of this Privacy Policy. We will notify you of any material changes by posting the new Privacy Policy on this page and, where appropriate, sending you a notification or obtaining your consent.
                    </p>
                    <p>
                      We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your information.
                    </p>
                  </div>
                </section>
                
                {/* Contact Us Section */}
                <section id="contact-us" className="policy-section mb-6 animate-on-scroll">
                  <h2 className="text-2xl font-bold mb-4 text-primary">Contact Us</h2>
                  <div className="prose dark:prose-invert max-w-none">
                    <p>
                      If you have any questions or concerns about this Privacy Policy or our privacy practices, please contact us at:
                    </p>
                    <div className="mt-4">
                      <p><strong>Revelate Operations</strong></p>
                      <p>Email: <a href="mailto:privacy@revelateops.com" className="text-primary hover:underline">privacy@revelateops.com</a></p>
                      <p>Address: 123 Data Drive, Suite 200, San Francisco, CA 94105</p>
                      <p>Phone: (555) 123-4567</p>
                    </div>
                  </div>
                </section>
                
                {/* Print Button */}
                <div className="text-center mt-12">
                  <button 
                    onClick={() => window.print()} 
                    className="btn bg-primary text-white hover:bg-primary-dark px-6 py-3 rounded-md font-semibold transition inline-flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd" />
                    </svg>
                    Print Privacy Policy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Still Have Questions?</h2>
            <p className="text-lg mb-8 text-gray-700 dark:text-gray-300">
              If you have any questions about our privacy practices or need additional information, our team is here to help.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/contact" 
                className="btn bg-primary text-white hover:bg-primary-dark px-6 py-3 rounded-md font-semibold transition"
              >
                Contact Us
              </Link>
              <Link 
                href="/about" 
                className="btn border border-primary text-primary hover:bg-primary hover:text-white px-6 py-3 rounded-md font-semibold transition"
              >
                About Revelate Operations
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PrivacyPolicyPage;
