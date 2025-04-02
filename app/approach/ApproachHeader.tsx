'use client';

import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import HeroSystem from '@/components/theme/heroes/HeroSystem';
import ApproachVisual from './ApproachVisual';

export default function ApproachHeader() {
  return (
    <HeroSystem 
      tagline="Our Methodology"
      title={
        <>
          The Science of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500">Business Transformation</span>
        </>
      }
      description="Our structured methodology transforms business challenges into strategic advantages through a proven, systematic approach to operational excellence."
      primaryCTA={{
        text: "Schedule a Methodology Session",
        href: "/contact",
        variant: "primary",
        icon: <ArrowRight className="ml-2 h-4 w-4" />
      }}
      secondaryCTA={{
        text: "Explore Our Process",
        href: "#process",
        variant: "outline"
      }}
      layout="split"
      theme="brand"
      animation="reveal"
      background="geometric"
      badge="pill"
      divider="slope"
      pageContext="service"
      purpose="conversion"
      visualComponent={<ApproachVisual />}
      accessibilityLabels={{
        regionLabel: "Business transformation methodology overview",
      }}
      className="bg-white dark:bg-gray-950 overflow-hidden py-6 sm:py-8 md:py-12"
      metrics={[
        {
          label: "Phases",
          value: "4",
          color: "primary"
        },
        {
          label: "Success Rate",
          value: "94%",
          color: "info"
        },
        {
          label: "Avg. ROI",
          value: "5.3x",
          color: "success"
        }
      ]}
    />
  );
}