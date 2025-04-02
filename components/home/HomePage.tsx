'use client';

import HomeHero from '../theme/heroes/examples/HomeHero';
import FeaturesSection from './FeaturesSection';
import ProcessSection from './ProcessSection';
import ResultsSection from './ResultsSection';
import CTASection from './CTASection';
import { useTheme } from '@/components/theme/ThemeProvider';

interface HomePageProps {
  serviceData: Array<{
    title: string;
    description: string;
    icon: string;
    link: string;
  }>;
  expertisePoints: Array<{
    title: string;
    description: string;
  }>;
  processSteps: Array<{
    title: string;
    description: string;
  }>;
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
  testimonials: Array<any>;
}

export default function HomePage({
  serviceData,
  expertisePoints,
  processSteps,
  resultCards,
  testimonials
}: HomePageProps) {
  const { theme } = useTheme();
  
  return (
    <div className={`${theme === 'dark' ? 'bg-[#141927]' : 'bg-white'}`}>
      <HomeHero />
      <FeaturesSection serviceData={serviceData} expertisePoints={expertisePoints} />
      <ProcessSection processSteps={processSteps} />
      <ResultsSection resultCards={resultCards} />
      <CTASection />
    </div>
  );
}
