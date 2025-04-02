/**
 * SEO metadata schema
 * Used across pages for SEO and social sharing optimization
 */
export default {
  name: 'seo',
  title: 'SEO & Social Sharing',
  type: 'object',
  fields: [
    {
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Title used for search engines and browser tabs (50–60 characters)',
      validation: (Rule) => Rule.max(60).warning('Longer titles may be truncated by search engines'),
    },
    {
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Description for search engines (150-160 characters)',
      validation: (Rule) => Rule.max(160).warning('Longer descriptions may be truncated by search engines'),
    },
    {
      name: 'openGraphImage',
      title: 'Open Graph Image',
      type: 'image',
      description: 'Image for social media sharing (1200×630 pixels recommended)',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility',
        },
      ],
    },
    {
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
      description: 'Optional: Set if this content is a duplicate of another page',
    },
    {
      name: 'noIndex',
      title: 'No Index',
      type: 'boolean',
      description: 'Hide this page from search engines',
      initialValue: false,
    },
  ],
}
