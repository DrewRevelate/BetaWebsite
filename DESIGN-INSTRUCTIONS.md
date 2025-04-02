# Revelate Operations - Design System Instructions

## Introduction

This document provides practical instructions for maintaining and extending the minimalist professional design system implemented across the Revelate Operations website. Follow these guidelines to ensure consistency and quality in all design updates.

## Core Components

### HeroSystem Component

The `HeroSystem` component in `/components/theme/heroes/HeroSystem.tsx` is the foundation of our page headers. When using this component:

- Use the centered layout (`layout="centered"`) for main landing pages
- Implement appropriate theme based on context (`theme={isLightTheme ? "custom" : "dark"}`)
- Keep titles concise and impactful
- Use the rotating benefit component for dynamic value propositions
- Maintain proper vertical spacing between hero elements
- Avoid adding unnecessary visual elements

Example implementation:
```tsx
<HeroSystem 
  title={<>Transform Raw Data Into<br/><RotatingBenefit /></>}
  description="Clear, concise value proposition"
  layout="centered"
  theme={isLightTheme ? "custom" : "dark"}
  animation="fade"
  background="none"
  badge="none"
  metrics={[]} // Use additionalContent instead for custom metrics
  additionalContent={<EnhancedMetrics />}
/>
```

### Process Cards

When creating process or feature cards:

- Maintain the 2x2 grid layout for balanced design
- Use subtle color coding through top borders
- Keep descriptions concise (2-3 sentences maximum)
- Ensure consistent card heights
- Include relevant metrics that provide context
- Use adequate spacing between sections (mb-6 for general spacing)

Example card structure:
```tsx
<div className="relative overflow-hidden rounded-2xl shadow-lg bg-white dark:bg-[#1a2033] border border-gray-200 dark:border-gray-800">
  {/* Color accent bar */}
  <div className="h-2 w-full bg-gradient-to-r from-blue-500 to-blue-600"></div>
  
  <div className="p-8">
    {/* Title with icon */}
    <div className="flex items-center mb-4">
      <h3 className="text-xl font-bold text-gray-800 dark:text-white">
        Process Title
      </h3>
    </div>
    
    {/* Description with adequate spacing */}
    <p className="mb-6 text-gray-700 dark:text-gray-300 text-base leading-relaxed">
      Concise description of the process or feature.
    </p>
    
    {/* Metric highlight */}
    <div className="flex items-center p-5 rounded-xl bg-blue-50 dark:bg-blue-900/20">
      <div className="mr-4">
        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          85%
        </div>
        <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
          Metric Label
        </div>
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-400">
        Context for the metric
      </div>
    </div>
  </div>
</div>
```

### Results/Stats Cards

For displaying statistics and results:

- Use clean, minimal stat cards
- Implement consistent spacing between cards
- Use color coding that matches the overall theme
- Keep metrics prominent with supporting text minimal
- Arrange in grid layouts (4 columns for desktop, 2 for tablet)

### Button Styling

Follow these guidelines for buttons:

- Primary CTA: Blue gradient background with white text
- Secondary CTA: Transparent with border in mobile/dark modes
- Use rounded corners (rounded-lg for cards, rounded-full for standalone buttons)
- Include hover states with subtle animations
- Maintain consistent button sizes across the site

## Theme Toggle Integration

The site supports both light and dark themes:

- Always check current theme with `const { theme } = useTheme()`
- Use conditional styling: `${isLightTheme ? 'light-class' : 'dark-class'}`
- Test all components in both themes before deployment
- Ensure adequate contrast in both themes
- Use theme-aware color variables instead of hardcoded colors when possible

## Best Practices

1. **Spacing Consistency**
   - Use multiples of 4px for all spacing (16px, 24px, 32px, etc.)
   - Maintain consistent margins between sections (py-24 for sections)
   - Use adequate whitespace around text content

2. **Typography Hierarchy**
   - Main headings: text-3xl (30px) font-bold
   - Section titles: text-2xl (24px) font-bold
   - Card headings: text-xl (20px) font-bold
   - Body text: text-base (16px)
   - Secondary/supporting text: text-sm (14px)

3. **Color Application**
   - Use brand colors primarily for accents and CTAs
   - Maintain neutral backgrounds for content areas
   - Implement subtle color transitions with gradients
   - Ensure all text meets WCAG AA contrast requirements (4.5:1)

4. **Performance Considerations**
   - Implement conditional rendering for complex animations
   - Use CSS transitions instead of JavaScript animations when possible
   - Respect user motion preferences with `prefers-reduced-motion`
   - Optimize component rendering with proper React patterns

5. **Accessibility**
   - Provide appropriate ARIA labels for interactive elements
   - Ensure proper heading hierarchy (h1, h2, h3)
   - Support keyboard navigation for all interactive elements
   - Include alt text for all visual elements

## Implementation Flow

When implementing new sections or pages:

1. Start with the appropriate HeroSystem configuration
2. Build section components following the card and layout patterns
3. Ensure responsive behavior works across all breakpoints
4. Test in both light and dark themes
5. Validate accessibility with automated tools
6. Check for visual consistency with existing sections

By following these guidelines, we maintain the minimalist professional aesthetic that defines the Revelate Operations brand while ensuring a cohesive user experience throughout the site.
