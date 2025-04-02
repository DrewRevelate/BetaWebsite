/**
 * Database setup script for Revelate Operations website
 * Run with: npm run setup-db
 */

require('dotenv').config({ path: '.env.local' });
const { Pool } = require('pg');

// Get the database URL
const dbUrl = process.env.DATABASE_URL;

// Check if database URL is set
if (!dbUrl) {
  console.error('❌ DATABASE_URL is not defined in environment variables');
  process.exit(1);
}

// Create a connection pool
const pool = new Pool({
  connectionString: dbUrl,
  ssl: process.env.NODE_ENV === 'production' ? {
    rejectUnauthorized: false // Required for Heroku PostgreSQL
  } : false,
});

// Initialize database tables and indexes
async function initDb() {
  const client = await pool.connect();
  try {
    console.log('🔄 Setting up database...');
    
    // Create contacts table
    await client.query(`
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
      )
    `);
    
    // Add indexes for contacts
    await client.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_indexes 
          WHERE tablename = 'contacts' AND indexname = 'idx_contacts_email'
        ) THEN
          CREATE INDEX idx_contacts_email ON contacts(email);
        END IF;
        
        IF NOT EXISTS (
          SELECT 1 FROM pg_indexes 
          WHERE tablename = 'contacts' AND indexname = 'idx_contacts_created_at'
        ) THEN
          CREATE INDEX idx_contacts_created_at ON contacts(created_at);
        END IF;
        
        IF NOT EXISTS (
          SELECT 1 FROM pg_indexes 
          WHERE tablename = 'contacts' AND indexname = 'idx_contacts_status'
        ) THEN
          CREATE INDEX idx_contacts_status ON contacts(status);
        END IF;
      END
      $$;
    `);
    
    // Create subscribers table
    await client.query(`
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
      )
    `);
    
    // Add index for subscribers
    await client.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_indexes 
          WHERE tablename = 'subscribers' AND indexname = 'idx_subscribers_email'
        ) THEN
          CREATE UNIQUE INDEX idx_subscribers_email ON subscribers(email);
        END IF;
      END
      $$;
    `);
    
    console.log('✅ Database setup complete! Tables and indexes created successfully.');
  } catch (error) {
    console.error('❌ Database setup error:', error);
  } finally {
    client.release();
    pool.end();
  }
}

// Run the initialization
initDb();
