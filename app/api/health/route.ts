import { NextResponse } from 'next/server';
import { connectDb } from '@/lib/db';

export async function GET() {
  try {
    // Connect to the database
    const db = await connectDb();
    
    // Check database connection
    const dbResult = await db.query('SELECT NOW()');
    
    return NextResponse.json({
      success: true,
      status: 'healthy',
      timestamp: dbResult.rows[0].now,
      environment: process.env.NODE_ENV || 'development'
    }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      status: 'unhealthy',
      error: process.env.NODE_ENV === 'production' ? 'Database connection error' : error.message
    }, { status: 500 });
  }
}
