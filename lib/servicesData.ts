/**
 * Services data with pricing tiers and features
 */

export interface Feature {
  name: string;
  included: boolean;
  details?: string;
}

export interface PricingTier {
  id: string;
  name: string;
  description: string;
  price: string;
  features: Feature[];
  popularChoice?: boolean;
  ctaText: string;
  ctaLink: string;
}

export interface ComparisonFeature {
  name: string;
  traditional: string;
  revelate: string;
  highlight?: boolean;
}

export interface ServiceDetail {
  id: string;
  title: string;
  description: string;
  benefits: string[];
  features: string[];
  icon: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  company: string;
  position: string;
  service: string;
  image?: string;
}

export const comparisonFeatures: ComparisonFeature[] = [
  {
    name: 'Strategy Alignment',
    traditional: 'One-size-fits-all approach with minimal customization',
    revelate: 'Custom strategy aligned with your specific business goals and challenges',
    highlight: true
  },
  {
    name: 'Implementation Approach',
    traditional: 'Rigid methodology focused on completing tasks',
    revelate: 'Agile, iterative approach with continuous improvement cycles'
  },
  {
    name: 'Technology Utilization',
    traditional: 'System implementation with standard configurations',
    revelate: 'Deep integration with existing tech stack and custom solutions'
  },
  {
    name: 'User Adoption',
    traditional: 'Basic training with limited follow-up',
    revelate: 'Comprehensive change management and ongoing user enablement',
    highlight: true
  },
  {
    name: 'Time to Value',
    traditional: '6+ months before seeing tangible results',
    revelate: 'Quick wins within 30 days while building toward long-term transformation'
  },
  {
    name: 'Data Integration',
    traditional: 'Siloed data with minimal cross-system visibility',
    revelate: 'Seamless data flow across your entire technology ecosystem'
  },
  {
    name: 'Reporting & Analytics',
    traditional: 'Standard reports with limited customization',
    revelate: 'Custom dashboards and predictive analytics tailored to your KPIs',
    highlight: true
  },
  {
    name: 'Ongoing Support',
    traditional: 'Limited support after implementation',
    revelate: 'Strategic partnership with continuous optimization and guidance'
  }
];

export const pricingTiers: PricingTier[] = [
  {
    id: 'quick-start',
    name: 'Quick Start',
    description: 'Get up and running quickly with essential implementation and basic configuration',
    price: 'Starting at $15,000',
    features: [
      { name: 'Initial System Setup', included: true },
      { name: 'Basic Configuration', included: true },
      { name: 'Core Feature Implementation', included: true },
      { name: 'User Training', included: true },
      { name: 'Standard Reporting', included: true },
      { name: 'Custom Development', included: false },
      { name: 'Advanced Analytics', included: false },
      { name: 'Strategic Consulting', included: false },
      { name: 'Change Management', included: false }
    ],
    ctaText: 'Schedule Consultation',
    ctaLink: '/contact'
  },
  {
    id: 'business-transform',
    name: 'Business Transformation',
    description: 'Comprehensive implementation with customization and strategic guidance',
    price: 'Starting at $35,000',
    features: [
      { name: 'Initial System Setup', included: true },
      { name: 'Advanced Configuration', included: true },
      { name: 'Full Feature Implementation', included: true },
      { name: 'Comprehensive Training', included: true },
      { name: 'Custom Reporting', included: true },
      { name: 'Custom Development', included: true },
      { name: 'Advanced Analytics', included: true },
      { name: 'Strategic Consulting', included: false },
      { name: 'Change Management', included: false }
    ],
    popularChoice: true,
    ctaText: 'Schedule Consultation',
    ctaLink: '/contact'
  },
  {
    id: 'enterprise',
    name: 'Enterprise Solution',
    description: 'End-to-end transformation with strategic partnership and advanced customization',
    price: 'Starting at $75,000',
    features: [
      { name: 'Initial System Setup', included: true },
      { name: 'Enterprise Configuration', included: true },
      { name: 'Full Feature Implementation', included: true },
      { name: 'Executive & Team Training', included: true },
      { name: 'Advanced Custom Reporting', included: true },
      { name: 'Extensive Custom Development', included: true },
      { name: 'Predictive Analytics', included: true },
      { name: 'Strategic Consulting', included: true },
      { name: 'Change Management', included: true }
    ],
    ctaText: 'Schedule Consultation',
    ctaLink: '/contact'
  }
];

export const serviceDetails: ServiceDetail[] = [
  {
    id: 'crm',
    title: 'CRM Management',
    description: 'Transform your customer relationship management with expert Salesforce implementation, optimization, and ongoing support.',
    benefits: [
      'Increase user adoption and data accuracy',
      'Streamline sales processes and reduce administrative burden',
      'Gain comprehensive visibility into your pipeline and customer journey',
      'Integrate your CRM with your entire tech stack for seamless data flow',
      'Enable data-driven decisions with custom dashboards and reports'
    ],
    features: [
      'Implementation and configuration for specific business needs',
      'Custom object and automation development',
      'Integration with existing systems',
      'User training and change management',
      'Ongoing optimization and support'
    ],
    icon: 'fas fa-database'
  },
  {
    id: 'bi',
    title: 'Business Intelligence',
    description: 'Convert your raw data into actionable insights with custom dashboards, predictive analytics, and comprehensive reporting solutions.',
    benefits: [
      'Transform complex data into clear, actionable visualizations',
      'Enable real-time decision making with live dashboards',
      'Uncover hidden patterns and opportunities in your data',
      'Democratize data access across your organization',
      'Drive strategic initiatives with accurate forecasting'
    ],
    features: [
      'Custom dashboard development',
      'ETL process design and implementation',
      'Data modeling and architecture',
      'Predictive analytics and forecasting',
      'Self-service analytics training'
    ],
    icon: 'fas fa-chart-line'
  },
  {
    id: 'integration',
    title: 'Data Integration',
    description: 'Eliminate data silos by seamlessly connecting your entire tech stack, ensuring consistent information flow across your business.',
    benefits: [
      'Create a single source of truth for all business data',
      'Eliminate manual data entry and reduce errors',
      'Enable cross-functional visibility and collaboration',
      'Automate processes across multiple systems',
      'Enhance data quality and governance'
    ],
    features: [
      'API integration development',
      'Middleware implementation',
      'ETL pipeline creation',
      'Data quality assurance',
      'Integration architecture design'
    ],
    icon: 'fas fa-sync-alt'
  },
  {
    id: 'retention',
    title: 'Customer Retention',
    description: 'Implement data-driven strategies to increase loyalty, reduce churn, and maximize customer lifetime value.',
    benefits: [
      'Identify at-risk customers before they churn',
      'Increase renewal rates and upsell opportunities',
      'Build stronger, more profitable customer relationships',
      'Create personalized customer experiences at scale',
      'Measure and optimize customer success initiatives'
    ],
    features: [
      'Customer health scoring implementation',
      'Predictive churn modeling',
      'Automated engagement workflows',
      'Customer journey mapping',
      'Success metric definition and tracking'
    ],
    icon: 'fas fa-users'
  }
];

// Empty testimonials array - do not add testimonials without explicit client permission
export const testimonials: Testimonial[] = []; // NOTE: No testimonials should be added without explicit client permission
