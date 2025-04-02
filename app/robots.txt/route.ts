import { NextResponse } from 'next/server';

export function GET() {
  return NextResponse.json(
    {
      robots: `
User-agent: *
Allow: /
Disallow: /case-studies/

Sitemap: https://revelateops.com/sitemap.xml
      `,
    },
    {
      headers: {
        'Content-Type': 'text/plain',
      },
    }
  );
}
