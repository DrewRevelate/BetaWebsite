/**
 * API route for content revalidation
 * Used for automatic revalidation when content is published in Sanity
 */
import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json()
    
    // Check for webhook secret
    const secret = request.headers.get('authorization')?.split(' ')[1]
    if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
      return NextResponse.json(
        { message: 'Invalid secret', success: false },
        { status: 401 }
      )
    }
    
    // Get document type and ID from payload
    const { _type, slug } = payload
    
    // Determine which paths to revalidate based on document type
    let paths = ['/']
    
    if (_type === 'post') {
      paths.push('/blog', `/blog/${slug?.current}`)
    } else if (_type === 'service') {
      paths.push('/services', `/services/${slug?.current}`)
    } else if (_type === 'caseStudy') {
      paths.push('/case-studies', `/case-studies/${slug?.current}`)
    } else if (_type === 'home') {
      paths.push('/')
    } else if (_type === 'about') {
      paths.push('/about')
    } else if (_type === 'contact') {
      paths.push('/contact')
    } else if (_type === 'teamMember') {
      paths.push('/about')
    } else if (_type === 'category') {
      paths.push('/blog')
    } else if (_type === 'author') {
      paths.push('/blog')
    } else if (_type === 'siteSettings') {
      // Revalidate all pages for site settings changes
      paths = ['/', '/about', '/contact', '/services', '/case-studies', '/blog']
    }
    
    // Revalidate paths
    for (const path of paths) {
      revalidatePath(path)
    }
    
    return NextResponse.json({
      revalidated: true,
      message: `Revalidated paths: ${paths.join(', ')}`,
      now: Date.now()
    })
  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json(
      { message: 'Error revalidating', success: false },
      { status: 500 }
    )
  }
}
