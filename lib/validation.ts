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

interface SubscriptionFormData {
  email: string;
  name?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  interest?: string;
  message?: string;
}

// Validate contact form input
export function validateContact(data: ContactFormData): FormErrors | null {
  const errors: FormErrors = {};
  const { name, email, message, interest } = data;
  
  // Check required fields
  if (!name || !name.trim()) {
    errors.name = 'Name is required';
  }
  
  if (!email || !email.trim()) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  if (!interest || !interest.trim()) {
    errors.interest = 'Please select an area of interest';
  }
  
  if (!message || !message.trim()) {
    errors.message = 'Message is required';
  }
  
  return Object.keys(errors).length ? errors : null; // Return null if no errors
}

// Validate subscription form input
export function validateSubscription(data: SubscriptionFormData): string | null {
  const { email } = data;
  
  if (!email || !email.trim()) {
    return 'Email is required';
  }
  
  if (!isValidEmail(email)) {
    return 'Please enter a valid email address';
  }
  
  return null; // No validation errors
}

// Validate email format
export function isValidEmail(email: string): boolean {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email.toLowerCase());
}

// Detect spam in messages
export function detectSpam(message: string): boolean {
  if (!message) return false;
  
  // Convert to lowercase for case-insensitive matching
  const lowerMessage = message.toLowerCase();
  
  // Check for common spam patterns
  const spamKeywords = [
    'viagra', 'casino', 'lottery', 'bitcoin', 'investment opportunity',
    'crypto', 'million dollar', 'MLM', 'multi-level', 'earn from home',
    'suspicious link', 'prize', 'winner', 'free money'
  ];
  
  // Check if message contains spam keywords
  for (const keyword of spamKeywords) {
    if (lowerMessage.includes(keyword)) {
      return true;
    }
  }
  
  // Check for excessive URLs (more than 3)
  const urlCount = (message.match(/https?:\/\//g) || []).length;
  if (urlCount > 3) {
    return true;
  }
  
  // Very short message with a link is suspicious
  if (message.length < 20 && message.includes('http')) {
    return true;
  }
  
  return false;
}
