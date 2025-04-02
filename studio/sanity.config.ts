/**
 * Sanity Studio configuration
 * This is used for the embedded Sanity Studio in the Next.js project
 */
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'
import { media } from 'sanity-plugin-media'
import { colorInput } from '@sanity/color-input'

// Define the actions that should be available for singleton documents
const singletonActions = new Set(['publish', 'discardChanges', 'restore'])

// Define the singleton document types
const singletonTypes = new Set(['home', 'about', 'contact', 'siteSettings'])

export default defineConfig({
  name: 'revelate-operations',
  title: 'Revelate Operations CMS',
  
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  
  plugins: [
    deskTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Singleton items (pages with only one instance)
            ...Array.from(singletonTypes).map((type) =>
              S.listItem()
                .title(type.charAt(0).toUpperCase() + type.slice(1))
                .id(type)
                .child(
                  S.document()
                    .schemaType(type)
                    .documentId(type)
                )
            ),
            
            // Regular document types
            S.divider(),
            
            // Services section
            S.listItem()
              .title('Services')
              .child(
                S.documentTypeList('service')
                  .title('Services')
              ),
              
            // Case Studies section
            S.listItem()
              .title('Case Studies')
              .child(
                S.documentTypeList('caseStudy')
                  .title('Case Studies')
              ),
              
            // Blog section
            S.listItem()
              .title('Blog')
              .child(
                S.list()
                  .title('Blog')
                  .items([
                    S.listItem()
                      .title('Posts')
                      .child(S.documentTypeList('post').title('Posts')),
                    S.listItem()
                      .title('Categories')
                      .child(S.documentTypeList('category').title('Categories')),
                    S.listItem()
                      .title('Authors')
                      .child(S.documentTypeList('author').title('Authors')),
                  ])
              ),
              
            // Team section
            S.listItem()
              .title('Team')
              .child(
                S.documentTypeList('teamMember')
                  .title('Team Members')
              ),
          ]),
    }),
    visionTool(),
    media(),
    colorInput(),
  ],

  schema: {
    types: schemaTypes,
    // Filter out singleton types from the global "New document" menu
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },

  document: {
    // For singleton types, filter out actions that are not explicitly included
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },
})
