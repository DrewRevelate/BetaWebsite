/**
 * Schema exports for Sanity Studio
 */

// Document schemas
import home from './documents/home'
import service from './documents/service'
import caseStudy from './documents/caseStudy'
import post from './documents/post'
import category from './documents/category'
import author from './documents/author'
import teamMember from './documents/teamMember'
import about from './documents/about'
import contact from './documents/contact'
import siteSettings from './documents/siteSettings'

// Object schemas
import blockContent from './objects/blockContent'
import seo from './objects/seo'
import testimonial from './objects/testimonial'
import process from './objects/process'
import benefit from './objects/benefit'
import stat from './objects/stat'
import featuredItem from './objects/featuredItem'
import socialLink from './objects/socialLink'

// Export all schemas
export const schemaTypes = [
  // Document schemas
  home,
  service,
  caseStudy,
  post,
  category,
  author,
  teamMember,
  about,
  contact,
  siteSettings,
  
  // Object schemas
  blockContent,
  seo,
  testimonial,
  process,
  benefit,
  stat,
  featuredItem,
  socialLink,
]
