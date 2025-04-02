# Revelate Operations - Theme & Brand Guidelines

## Overview

This document outlines the minimalist professional theme and brand guidelines for the Revelate Operations website. These guidelines ensure a consistent, clean, and purpose-driven design across the entire site.

## Core Design Principles

- **Minimalist Aesthetic**: Clean, uncluttered design with focused content
- **Purpose-Driven Layout**: Every element serves a clear purpose
- **Professional Tone**: Sophisticated color palette with strong visual hierarchy
- **Clarity First**: Content is easily readable with appropriate spacing
- **Consistent Branding**: Unified design language across all sections

## Color Palette

### Dark Theme
- **Background**: #141927 (deep navy blue)
- **Card Background**: #1a2033 (slightly lighter navy)
- **Primary**: Blue (#3b82f6 to #2563eb gradient)
- **Secondary**: Indigo (#6366f1 to #4f46e5 gradient)
- **Text**: White (#ffffff) for headings, light gray (#e5e7eb) for body text

### Light Theme
- **Background**: White (#ffffff) to Light Gray (#f9fafb) gradient
- **Card Background**: White (#ffffff)
- **Primary**: Blue (#2563eb)
- **Secondary**: Indigo (#4f46e5)
- **Text**: Dark Gray (#1f2937) for headings, Medium Gray (#4b5563) for body text

## Typography

- **Headings**: Inter, Bold, with appropriate sizing hierarchy:
  - H1: 3rem/48px (Hero title)
  - H2: 2.25rem/36px (Section titles)
  - H3: 1.5rem/24px (Card headings)
- **Body Text**: Inter, Regular, 1rem/16px
- **Metrics**: Inter, Bold, 3.75rem/60px
- **Buttons**: Inter, Medium, 1rem/16px

## Component Guidelines

### Hero Section
- Clean, centered layout with focused headline
- Animated rotating value proposition text
- Prominent metrics with animated counters
- Clear, high-contrast call-to-action buttons
- No visual clutter or excessive decoration

### Process/Cards
- Consistent card height and width
- Subtle top border accents for categorization
- Adequate white space around content
- Clear visual hierarchy with distinct headings
- Metrics integrated within context

### Results Section
- Clean stat cards with minimalist design
- Industry expertise presented in organized grid
- Subtle background gradients for depth
- Consistent spacing between elements

### Call-to-Action Section
- Clean, focused messaging
- High-contrast buttons
- Simple, gradient background
- Adequate spacing around content

## Animation Guidelines

- Subtle, purpose-driven animations only
- Reduced motion option supported
- Animation durations between 300-800ms
- Easing functions for natural movement
- No animations that distract from content

## Accessibility Standards

- Color contrast ratio of at least 4.5:1 for text
- Focus states clearly visible
- All interactive elements accessible via keyboard
- Proper semantic HTML structure
- Screen reader-friendly content with appropriate ARIA attributes

## Implementation Notes

These guidelines are implemented through the `HeroSystem` component and related section components, with support for both light and dark themes using the existing theme toggle mechanism.

Always maintain adequate whitespace, consistent padding/margins, and proper alignment across all sections to preserve the minimalist professional aesthetic.
