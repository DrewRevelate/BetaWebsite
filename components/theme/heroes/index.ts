// Export all hero components for easy imports
export { default as HeroSystem } from './HeroSystem';
export { default as BaseHero } from './BaseHero';

// Export example implementations
import HomeHero from './examples/HomeHero';
import ServiceHero from './examples/ServiceHero';
import AboutHero from './examples/AboutHero';
import BlogHero from './examples/BlogHero';

export const Examples = {
  HomeHero,
  ServiceHero,
  AboutHero,
  BlogHero
};

// Export types
export type {
  HeroLayout,
  HeroTheme,
  AnimationStyle,
  DividerStyle,
  TagBadgeStyle,
  BackgroundStyle,
  PageContext,
  Metric,
  CTAButton,
  HeroSystemProps
} from './HeroSystem';
