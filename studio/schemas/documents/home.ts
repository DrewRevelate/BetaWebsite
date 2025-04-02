/**
 * Home page schema
 * Singleton document type for the website's home page
 */
export default {
  name: 'home',
  title: 'Home Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Page title for internal reference',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'heroHeading',
      title: 'Hero Heading',
      type: 'string',
      description: 'Main heading in the hero section',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'heroSubheading',
      title: 'Hero Subheading',
      type: 'text',
      rows: 3,
      description: 'Secondary text in the hero section',
    },
    {
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Alternative text for accessibility',
          validation: (Rule) => Rule.required(),
        },
      ],
    },
    {
      name: 'featuredServices',
      title: 'Featured Services',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'service' } }],
      validation: (Rule) => Rule.max(4),
    },
    {
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [{ type: 'testimonial' }],
    },
    {
      name: 'stats',
      title: 'Statistics',
      type: 'array',
      of: [{ type: 'stat' }],
      validation: (Rule) => Rule.max(4),
    },
    {
      name: 'ctaTitle',
      title: 'CTA Title',
      type: 'string',
      description: 'Title for the call-to-action section',
    },
    {
      name: 'ctaText',
      title: 'CTA Text',
      type: 'text',
      rows: 3,
      description: 'Text for the call-to-action section',
    },
    {
      name: 'ctaButtonText',
      title: 'CTA Button Text',
      type: 'string',
    },
    {
      name: 'ctaButtonLink',
      title: 'CTA Button Link',
      type: 'string',
    },
    {
      name: 'seo',
      title: 'SEO & Social',
      type: 'seo',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'heroHeading',
      media: 'heroImage',
    },
  },
}
