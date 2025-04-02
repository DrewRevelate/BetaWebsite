# Sanity Studio for Revelate Operations

This is the Sanity Studio for managing content on the Revelate Operations website.

## Getting Started

The Studio is integrated directly into the Next.js website and can be accessed at `/studio` when the site is running.

### Running Locally

1. Start the Next.js development server:
   ```
   npm run dev
   ```

2. Access Studio at: http://localhost:3000/studio

## Content Structure

The Sanity Studio is configured with the following document types:

### Pages
- Home
- About
- Contact
- Services (multiple)
- Case Studies (multiple)
- Blog Posts (multiple)

### Content Types
- Team Members
- Categories
- Authors
- Site Settings

## Content Modeling

Each document type has a specific schema that defines what fields are available for editing. For example:

- **Services** have fields for title, description, icon, process steps, and related case studies
- **Case Studies** have fields for client, challenge, solution, results, and related services
- **Blog Posts** have fields for content, author, categories, and related posts

## Preview Mode

The CMS includes a preview mode that allows you to see draft content before it's published. When viewing content in the Studio, click the "Preview" button to see how it will look on the live site.

## Customization

To customize the Studio:

1. Edit schema files in `/studio/schemas/`
2. Modify the desk structure in `/studio/sanity.config.ts`
3. Add custom input components as needed

## Documentation

For more information on using Sanity, refer to the [official documentation](https://www.sanity.io/docs).
