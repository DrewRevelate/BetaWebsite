-- Database initialization script for Revelate Operations
-- This script runs automatically when the PostgreSQL container starts

-- Create contacts table with enhanced fields for marketing attribution
CREATE TABLE IF NOT EXISTS contacts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  company VARCHAR(255),
  interest VARCHAR(50),
  message TEXT,
  utm_source VARCHAR(100),
  utm_medium VARCHAR(100),
  utm_campaign VARCHAR(100),
  utm_term VARCHAR(100),
  utm_content VARCHAR(100),
  referrer VARCHAR(255),
  ip_address VARCHAR(50),
  user_agent TEXT,
  status VARCHAR(50) DEFAULT 'new',
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP
);

-- Add indexes for contacts table
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at);
CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);

-- Create subscribers table for newsletter
CREATE TABLE IF NOT EXISTS subscribers (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  subscribed_at TIMESTAMP NOT NULL DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true,
  utm_source VARCHAR(100),
  utm_medium VARCHAR(100),
  utm_campaign VARCHAR(100),
  ip_address VARCHAR(50),
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Add index for subscribers
CREATE UNIQUE INDEX IF NOT EXISTS idx_subscribers_email ON subscribers(email);

-- Add sample data for local development (not used in production)
DO $$
BEGIN
  IF current_database() = 'revelate' AND 
     (SELECT COUNT(*) FROM contacts) = 0 AND
     (SELECT current_setting('postgres.environment', true)) <> 'production' THEN
    
    -- Insert sample contacts for development
    INSERT INTO contacts 
      (name, email, phone, company, interest, message, status, created_at) 
    VALUES 
      ('John Test', 'john@example.com', '555-123-4567', 'Test Company', 'general', 'This is a test message', 'new', NOW() - INTERVAL '2 days'),
      ('Jane Sample', 'jane@example.com', '555-987-6543', 'Sample Inc', 'services', 'I would like to learn more about your services', 'contacted', NOW() - INTERVAL '1 day');
      
    -- Insert sample subscribers for development
    INSERT INTO subscribers 
      (email, name, subscribed_at, is_active, created_at) 
    VALUES 
      ('newsletter@example.com', 'Newsletter User', NOW() - INTERVAL '1 month', true, NOW() - INTERVAL '1 month'),
      ('test@example.com', 'Test Subscriber', NOW() - INTERVAL '1 week', true, NOW() - INTERVAL '1 week');
  END IF;
END
$$;
