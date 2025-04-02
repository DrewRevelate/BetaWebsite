import { NextRequest, NextResponse } from 'next/server';

/**
 * API endpoint to collect Core Web Vitals data
 * 
 * This endpoint receives Core Web Vitals metrics from the client
 * and can be configured to store them in a database or send them
 * to an analytics service. Currently, it just logs the data.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Log the vitals data for now
    // In production, you would store this in a database or analytics service
    console.log('[Web Vitals]', body);
    
    // Extract the user agent and IP for additional context
    const userAgent = request.headers.get('user-agent') || 'unknown';
    const forwardedFor = request.headers.get('x-forwarded-for');
    const ip = forwardedFor ? forwardedFor.split(',')[0] : 'unknown';
    
    // Validate and normalize the data
    const { metric, value, id } = body;
    
    if (!metric || value === undefined || !id) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Build the metrics report
    const report = {
      metric,
      value: typeof value === 'number' ? Math.round(value * 100) / 100 : value,
      id,
      timestamp: new Date().toISOString(),
      userAgent: userAgent.substring(0, 200),
      page: request.headers.get('referer') || 'unknown',
    };
    
    // In production, you would send this to your analytics or logging service
    // For example:
    // await saveToDatabase(report);
    // or
    // await sendToAnalyticsService(report);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Web Vitals] Error processing vitals:', error);
    return NextResponse.json(
      { error: 'Error processing vitals' },
      { status: 500 }
    );
  }
}

/**
 * Beacon API uses POST, but we'll accept GET requests for testing
 */
export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: 'Web Vitals API is running. Use POST to submit metrics.',
  });
}
