import { NextRequest, NextResponse } from 'next/server';
import { connectDb } from '@/lib/db';
import { validateContact, detectSpam } from '@/lib/validation';

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  interest: string;
  message: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  referrer?: string;
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const data = await request.json() as ContactFormData;
    
    // Get UTM parameters and referrer
    const {
      name,
      email,
      phone,
      company,
      interest,
      message,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_term,
      utm_content,
      referrer
    } = data;
    
    // Capture client information
    const ipAddress = request.headers.get('x-forwarded-for') || '';
    const userAgent = request.headers.get('user-agent') || '';
    
    // Validate input
    const validationError = validateContact(data);
    if (validationError) {
      return NextResponse.json({
        success: false,
        message: 'Validation error',
        error: validationError
      }, { status: 400 });
    }
    
    // Spam detection
    if (detectSpam(message)) {
      // Log potential spam but don't tell the user
      console.warn('Potential spam detected', { email, ip: ipAddress });
      
      // Pretend it succeeded to avoid giving feedback to spammers
      return NextResponse.json({
        success: true,
        message: 'Thank you! Your message has been received.',
        contactId: Date.now() // Fake ID
      }, { status: 201 });
    }
    
    // Connect to the database
    const db = await connectDb();
    
    // Enhanced database query with UTM tracking
    const query = `
      INSERT INTO contacts 
        (name, email, phone, company, interest, message, 
         utm_source, utm_medium, utm_campaign, utm_term, utm_content, 
         referrer, ip_address, user_agent, created_at) 
      VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, NOW())
      RETURNING id
    `;
    
    const values = [
      name, 
      email.toLowerCase().trim(), 
      phone || '', 
      company || '', 
      interest, 
      message,
      utm_source || null,
      utm_medium || null,
      utm_campaign || null,
      utm_term || null,
      utm_content || null,
      referrer || request.headers.get('referer') || null,
      ipAddress,
      userAgent
    ];
    
    const result = await db.query<{ id: number }>(query, values);
    
    // Success response
    return NextResponse.json({
      success: true,
      message: 'Thank you! Your message has been received.',
      contactId: result.rows[0].id
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error saving contact:', error);
    
    return NextResponse.json({
      success: false,
      message: 'There was a problem submitting your form. Please try again.',
      error: process.env.NODE_ENV === 'production' ? 'Server error' : error.message
    }, { status: 500 });
  }
}
