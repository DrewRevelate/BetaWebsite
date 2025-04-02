/**
 * Sanity configuration for Revelate Operations website
 * This file sets up the Sanity client and provides utility functions
 */

import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

// Configuration for Sanity client
export const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  apiVersion: '2024-03-28',
  useCdn: process.env.NODE_ENV === 'production',
}

// Error handling if projectId is missing in non-development environments
if (!config.projectId && process.env.NODE_ENV !== 'development') {
  console.error('NEXT_PUBLIC_SANITY_PROJECT_ID is not set in environment variables')
}

// Set up the client for fetching data
export const sanityClient = createClient(config)

// Helper function for generating image URLs
const builder = imageUrlBuilder(sanityClient)
export const urlFor = (source: SanityImageSource) => builder.image(source)

// For preview mode (optional)
export const previewClient = createClient({
  ...config,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

// Get client (either preview or regular)
export const getClient = (preview: boolean = false) => (preview ? previewClient : sanityClient)
