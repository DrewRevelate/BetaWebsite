import { NextRequest, NextResponse } from 'next/server';
import { connectDb } from '@/lib/db';
import { validateSubscription } from '@/lib/validation';

interface SubscriptionFormData {
  email: string;
  name?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const data = await request.json() as SubscriptionFormData;
    
    // Get UTM parameters and referrer
    const {
      email,
      name,
      utm_source,
      utm_medium,
      utm_campaign
    } = data;
    
    // Capture client information
    const ipAddress = request.headers.get('x-forwarded-for') || '';
    
    // Validate email
    const validationError = validateSubscription(data);
    if (validationError) {
      return NextResponse.json({
        success: false,
        message: validationError
      }, { status: 400 });
    }
    
    // Connect to the database
    const db = await connectDb();
    
    // Check if email is already subscribed
    const checkQuery = 'SELECT id FROM subscribers WHERE email = $1';
    const checkResult = await db.query<{ id: number }>(checkQuery, [email.toLowerCase().trim()]);
    
    if (checkResult.rows.length > 0) {
      return NextResponse.json({
        success: true,
        message: 'You are already subscribed to our newsletter!'
      }, { status: 200 });
    }
    
    // Insert new subscriber
    const query = `
      INSERT INTO subscribers 
        (email, name, utm_source, utm_medium, utm_campaign, ip_address)
      VALUES 
        ($1, $2, $3, $4, $5, $6)
      RETURNING id
    `;
    
    const values = [
      email.toLowerCase().trim(),
      name || '',
      utm_source || null,
      utm_medium || null,
      utm_campaign || null,
      ipAddress
    ];
    
    await db.query<{ id: number }>(query, values);
    
    return NextResponse.json({
      success: true,
      message: 'Thank you for subscribing to our newsletter!'
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error adding subscriber:', error);
    
    return NextResponse.json({
      success: false,
      message: 'There was a problem with your subscription. Please try again.',
      error: process.env.NODE_ENV === 'production' ? 'Server error' : error.message
    }, { status: 500 });
  }
}
