/**
 * Terms of Service Configuration
 * This file contains all the data for the Terms of Service page
 * Separating content from presentation for better maintainability
 */

export interface TermsSection {
  id: string;
  title: string;
  content: string;
}

export interface TermsOfServiceData {
  lastUpdated: string;
  sections: TermsSection[];
}

/**
 * Get the Terms of Service data
 * @returns Terms of Service data object
 */
export function getTermsOfServiceData(): TermsOfServiceData {
  return {
    lastUpdated: 'March 22, 2025',
    sections: [
      {
        id: 'introduction',
        title: 'Introduction',
        content: `
          <p>
            Welcome to Revelate Operations ("we," "our," or "us"). These Terms of Service ("Terms") govern your access to and use of the Revelate Operations website, products, and services (collectively, the "Services").
          </p>
          <p>
            Please read these Terms carefully before using our Services. By accessing or using our Services, you agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, you must not access or use our Services.
          </p>
          <p>
            Our Services are not directed to individuals under the age of 18. If you are under 18, you may not use our Services.
          </p>
        `
      },
      {
        id: 'acceptance',
        title: 'Acceptance of Terms',
        content: `
          <p>
            By accessing or using our Services, you represent and warrant that you have the legal capacity and authority to enter into a binding agreement to adhere to these Terms. If you are using the Services on behalf of an organization or entity, you represent and warrant that you have the authority to bind that organization or entity to these Terms.
          </p>
          <p>
            These Terms constitute a legally binding agreement between you and Revelate Operations regarding your use of the Services. Your continued use of our Services following the posting of revised Terms means that you accept and agree to the changes.
          </p>
        `
      },
      {
        id: 'services',
        title: 'Services Description',
        content: `
          <p>
            Revelate Operations provides data-driven SaaS consulting services, including but not limited to data analytics, process optimization, and strategic consulting. Our Services may include:
          </p>
          <ul>
            <li>Consulting services related to SaaS implementation and optimization</li>
            <li>Data analytics and business intelligence solutions</li>
            <li>Process automation and workflow optimization</li>
            <li>Strategic planning and technical advisory services</li>
            <li>Educational content and resources</li>
            <li>Software tools and platforms (where applicable)</li>
          </ul>
          <p>
            We reserve the right to modify, suspend, or discontinue any aspect of our Services at any time, including the availability of any features, database, or content. We may also impose limits on certain features and services or restrict your access to parts or all of the Services without notice or liability.
          </p>
        `
      },
      {
        id: 'user-accounts',
        title: 'User Accounts',
        content: `
          <p>
            Some portions of our Services may require you to create an account. When you create an account, you agree to:
          </p>
          <ul>
            <li>Provide accurate, current, and complete information</li>
            <li>Maintain and promptly update your account information</li>
            <li>Maintain the security of your account credentials</li>
            <li>Accept responsibility for all activities that occur under your account</li>
            <li>Notify us immediately of any unauthorized use of your account</li>
          </ul>
          <p>
            We reserve the right to disable any user account at any time in our sole discretion, including if we believe that you have violated or acted inconsistently with these Terms.
          </p>
        `
      },
      {
        id: 'user-obligations',
        title: 'User Obligations',
        content: `
          <p>
            When using our Services, you agree not to:
          </p>
          <ul>
            <li>Violate any applicable laws, regulations, or third-party rights</li>
            <li>Use the Services for any illegal or unauthorized purpose</li>
            <li>Attempt to access any other user's account or private information</li>
            <li>Interfere with or disrupt the Services or servers or networks connected to the Services</li>
            <li>Circumvent, disable, or otherwise interfere with security-related features of the Services</li>
            <li>Use any robot, spider, crawler, scraper, or other automated means to access the Services</li>
            <li>Introduce any viruses, trojan horses, worms, logic bombs, or other harmful material</li>
            <li>Collect or harvest any personally identifiable information from the Services</li>
            <li>Use the Services in any way that could damage, disable, overburden, or impair the Services</li>
            <li>Post, upload, or distribute any content that is unlawful, defamatory, obscene, harmful, threatening, abusive, or invasive of another's privacy</li>
          </ul>
        `
      },
      {
        id: 'intellectual-property',
        title: 'Intellectual Property',
        content: `
          <p>
            The Services and their entire contents, features, and functionality (including but not limited to all information, software, text, displays, images, video, and audio, and the design, selection, and arrangement thereof) are owned by Revelate Operations, its licensors, or other providers of such material and are protected by copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
          </p>
          
          <h3 class="text-xl font-semibold mt-6 mb-3">Our Intellectual Property</h3>
          <p>
            Unless otherwise indicated, all logos, service marks, trade names, and trademarks displayed on the Services are our property or the property of our licensors. You may not use our trademarks, logos, or service marks without our prior written consent.
          </p>
          
          <h3 class="text-xl font-semibold mt-6 mb-3">License to Use the Services</h3>
          <p>
            Subject to these Terms, we grant you a limited, non-exclusive, non-transferable, non-sublicensable license to access and use the Services solely for your personal or internal business purposes. You may not:
          </p>
          <ul>
            <li>Reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our Services</li>
            <li>Use any illustrations, photographs, video or audio sequences, or any graphics separately from the accompanying text</li>
            <li>Delete or alter any copyright, trademark, or other proprietary rights notices from copies of materials from this site</li>
            <li>Access or use for any commercial purposes any part of the Services or any services or materials available through the Services</li>
          </ul>
          
          <h3 class="text-xl font-semibold mt-6 mb-3">Your Content</h3>
          <p>
            Any content you post, upload, share, store, or otherwise provide through the Services is your "User Content." You retain all rights to your User Content, and you are responsible for your User Content. By providing User Content to us, you grant us a worldwide, non-exclusive, royalty-free, sublicensable, and transferable license to use, reproduce, distribute, prepare derivative works of, display, and perform your User Content in connection with the Services.
          </p>
        `
      },
      {
        id: 'third-party-services',
        title: 'Third-Party Services',
        content: `
          <p>
            The Services may contain links to third-party websites or services that are not owned or controlled by Revelate Operations. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services. You further acknowledge and agree that we shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods, or services available on or through any such websites or services.
          </p>
          <p>
            We strongly advise you to read the terms and conditions and privacy policies of any third-party websites or services that you visit or use.
          </p>
        `
      },
      {
        id: 'payment-terms',
        title: 'Payment Terms',
        content: `
          <p>
            Some of our Services may require payment of fees. If you choose to use paid Services, you agree to pay all applicable fees as they become due. Unless otherwise noted:
          </p>
          <ul>
            <li>All fees are quoted in U.S. dollars</li>
            <li>Payments are due upon receipt of invoice</li>
            <li>Fees are non-refundable except as required by law or as explicitly stated in these Terms</li>
            <li>We reserve the right to change our fees at any time with prior notice</li>
          </ul>
          
          <p>
            You are responsible for providing complete and accurate billing and contact information. We may suspend or terminate your access to paid Services if your payment is late or your provided payment method cannot be processed.
          </p>
        `
      },
      {
        id: 'disclaimers',
        title: 'Disclaimers',
        content: `
          <p>
            THE SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.
          </p>
          <p>
            WE DO NOT WARRANT THAT (I) THE SERVICES WILL MEET YOUR SPECIFIC REQUIREMENTS, (II) THE SERVICES WILL BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE, (III) THE RESULTS THAT MAY BE OBTAINED FROM THE USE OF THE SERVICES WILL BE ACCURATE OR RELIABLE, OR (IV) THE QUALITY OF ANY PRODUCTS, SERVICES, INFORMATION, OR OTHER MATERIAL PURCHASED OR OBTAINED BY YOU THROUGH THE SERVICES WILL MEET YOUR EXPECTATIONS.
          </p>
          <p>
            ANY MATERIAL DOWNLOADED OR OTHERWISE OBTAINED THROUGH THE USE OF THE SERVICES IS ACCESSED AT YOUR OWN DISCRETION AND RISK, AND YOU WILL BE SOLELY RESPONSIBLE FOR ANY DAMAGE TO YOUR COMPUTER SYSTEM OR LOSS OF DATA THAT RESULTS FROM THE DOWNLOAD OF ANY SUCH MATERIAL.
          </p>
          <p>
            NO ADVICE OR INFORMATION, WHETHER ORAL OR WRITTEN, OBTAINED BY YOU FROM US OR THROUGH OR FROM THE SERVICES SHALL CREATE ANY WARRANTY NOT EXPRESSLY STATED IN THESE TERMS.
          </p>
        `
      },
      {
        id: 'limitation-liability',
        title: 'Limitation of Liability',
        content: `
          <p>
            IN NO EVENT SHALL REVELATE OPERATIONS, ITS OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, VENDORS, OR SUPPLIERS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM (I) YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICES; (II) ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE SERVICES; (III) ANY CONTENT OBTAINED FROM THE SERVICES; AND (IV) UNAUTHORIZED ACCESS, USE OR ALTERATION OF YOUR TRANSMISSIONS OR CONTENT, WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE) OR ANY OTHER LEGAL THEORY, WHETHER OR NOT WE HAVE BEEN INFORMED OF THE POSSIBILITY OF SUCH DAMAGE, AND EVEN IF A REMEDY SET FORTH HEREIN IS FOUND TO HAVE FAILED OF ITS ESSENTIAL PURPOSE.
          </p>
          <p>
            SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF CERTAIN WARRANTIES OR THE LIMITATION OR EXCLUSION OF LIABILITY FOR INCIDENTAL OR CONSEQUENTIAL DAMAGES. ACCORDINGLY, SOME OF THE ABOVE LIMITATIONS MAY NOT APPLY TO YOU.
          </p>
        `
      },
      {
        id: 'indemnification',
        title: 'Indemnification',
        content: `
          <p>
            You agree to defend, indemnify, and hold harmless Revelate Operations, its officers, directors, employees, and agents, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees) arising from:
          </p>
          <ul>
            <li>Your use of and access to the Services</li>
            <li>Your violation of any term of these Terms</li>
            <li>Your violation of any third-party right, including without limitation any copyright, property, or privacy right</li>
            <li>Any claim that your User Content caused damage to a third party</li>
          </ul>
          <p>
            This defense and indemnification obligation will survive these Terms and your use of the Services.
          </p>
        `
      },
      {
        id: 'termination',
        title: 'Termination',
        content: `
          <p>
            We may terminate or suspend your access to the Services immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of these Terms.
          </p>
          <p>
            If you wish to terminate your account, you may simply discontinue using the Services or, if applicable, contact us to request account deletion.
          </p>
          <p>
            All provisions of these Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
          </p>
        `
      },
      {
        id: 'governing-law',
        title: 'Governing Law',
        content: `
          <p>
            These Terms shall be governed and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law provisions.
          </p>
          <p>
            Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.
          </p>
        `
      },
      {
        id: 'changes',
        title: 'Changes to Terms',
        content: `
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
          </p>
          <p>
            By continuing to access or use our Services after any revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use the Services.
          </p>
        `
      },
      {
        id: 'contact-us',
        title: 'Contact Us',
        content: `
          <p>
            If you have any questions about these Terms, please contact us at:
          </p>
          <div class="mt-4">
            <p><strong>Revelate Operations</strong></p>
            <p>Email: <a href="mailto:legal@revelateops.com" class="text-primary hover:underline">legal@revelateops.com</a></p>
            <p>Address: 123 Data Drive, Suite 200, San Francisco, CA 94105</p>
            <p>Phone: (555) 123-4567</p>
          </div>
        `
      }
    ]
  };
}
