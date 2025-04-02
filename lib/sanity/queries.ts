/**
 * Common Sanity GROQ queries for Revelate Operations website
 * This file contains reusable queries for fetching content from Sanity
 */

// Home page content
export const homePageQuery = `
  *[_type == "home"][0] {
    title,
    heroHeading,
    heroSubheading,
    heroImage,
    "featuredServices": featuredServices[] -> {
      _id,
      title,
      slug,
      description,
      icon
    },
    "testimonials": testimonials[] -> {
      _id,
      quote,
      author,
      role,
      company,
      image
    },
    "stats": stats[] {
      value,
      label,
      description
    },
    seo
  }
`

// Services list
export const servicesListQuery = `
  *[_type == "service"] | order(order asc) {
    _id,
    title,
    slug,
    description,
    icon,
    mainImage
  }
`

// Single service
export const serviceBySlugQuery = `
  *[_type == "service" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    mainImage,
    content,
    benefits,
    "relatedCaseStudies": relatedCaseStudies[] -> {
      _id,
      title,
      slug,
      client,
      excerpt,
      mainImage
    },
    "process": process[] {
      title,
      description,
      icon
    },
    seo
  }
`

// Case studies list
export const caseStudiesListQuery = `
  *[_type == "caseStudy"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    client,
    excerpt,
    mainImage,
    publishedAt,
    "services": services[] -> {
      _id,
      title,
      slug
    }
  }
`

// Single case study
export const caseStudyBySlugQuery = `
  *[_type == "caseStudy" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    client,
    excerpt,
    mainImage,
    results,
    challenge,
    solution,
    content,
    "services": services[] -> {
      _id,
      title,
      slug
    },
    publishedAt,
    seo
  }
`

// Blog posts list
export const blogPostsListQuery = `
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    "categories": categories[] -> {
      _id,
      title,
      slug
    },
    "author": author -> {
      name,
      image,
      bio
    }
  }
`

// Single blog post
export const blogPostBySlugQuery = `
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    content,
    publishedAt,
    "categories": categories[] -> {
      _id,
      title,
      slug
    },
    "author": author -> {
      name,
      image,
      bio
    },
    "relatedPosts": *[_type == "post" && slug.current != $slug && count(categories[@._ref in ^.^.categories[]._ref]) > 0] | order(publishedAt desc) [0...3] {
      _id,
      title,
      slug,
      mainImage,
      publishedAt
    },
    seo
  }
`

// Team members
export const teamMembersQuery = `
  *[_type == "teamMember"] | order(order asc) {
    _id,
    name,
    role,
    image,
    bio,
    socialLinks
  }
`
