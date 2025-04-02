/**
 * API route for enabling Sanity preview mode
 * Used for real-time content previews from Sanity Studio
 */
import { NextResponse } from 'next/server'
import { draftMode } from 'next/headers'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug')
  const documentType = searchParams.get('type')

  // Check the secret and document type
  if (!secret || secret !== process.env.SANITY_PREVIEW_SECRET) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 })
  }

  // Enable draft mode
  draftMode().enable()

  // Determine redirect URL based on document type
  let redirectUrl = '/'
  
  if (documentType && slug) {
    switch (documentType) {
      case 'post':
        redirectUrl = `/blog/${slug}`
        break
      case 'service':
        redirectUrl = `/services/${slug}`
        break
      case 'caseStudy':
        redirectUrl = `/case-studies/${slug}`
        break
      case 'home':
        redirectUrl = '/'
        break
      case 'about':
        redirectUrl = '/about'
        break
      case 'contact':
        redirectUrl = '/contact'
        break
      default:
        redirectUrl = '/'
    }
  }

  // Redirect to the path based on the documentType and slug
  return NextResponse.redirect(new URL(redirectUrl, request.url))
}
