/**
 * API route for disabling Sanity preview mode
 */
import { NextResponse } from 'next/server'
import { draftMode } from 'next/headers'

export async function GET(request: Request) {
  // Exit draft mode
  draftMode().disable()

  // Redirect to the homepage
  return NextResponse.redirect(new URL('/', request.url))
}
