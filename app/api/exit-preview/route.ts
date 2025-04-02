/**
 * API route for exiting preview mode
 * Used to disable draft mode when previewing content
 */
import { NextResponse } from 'next/server'
import { draftMode } from 'next/headers'

export async function GET(request: Request) {
  draftMode().disable()
  return NextResponse.redirect(new URL('/', request.url))
}
