import { Pool, PoolClient, QueryResult, QueryResultRow } from 'pg';

// Define Database interface
interface Database {
  query: <T extends QueryResultRow = any>(text: string, params?: any[]) => Promise<QueryResult<T>>;
  connect: () => Promise<PoolClient>;
}

// Define connection interface for tracking
interface Connection {
  isConnected: boolean;
}

// Singleton connection object
const connection: Connection = {
  isConnected: false
};

// Create pool variables
let pool: Pool;

// Get the database connection
const getPool = (): Pool => {
  if (!pool) {
    // Get the database connection details from environment variables
    const dbUrl = process.env.DATABASE_URL;
    
    // Check if we're in a Docker environment
    const isDocker = process.env.IS_DOCKER === 'true';
    
    // Configure database connection
    let poolConfig: any;
    
    if (dbUrl) {
      // Use connection string if provided
      poolConfig = {
        connectionString: dbUrl,
        ssl: process.env.NODE_ENV === 'production' && !isDocker
          ? { rejectUnauthorized: false } // SSL for external production DBs
          : false,
      };
    } else {
      // Use individual connection parameters
      poolConfig = {
        host: process.env.DB_HOST || (isDocker ? 'db' : 'localhost'),
        port: parseInt(process.env.DB_PORT || '5432'),
        database: process.env.DB_NAME || 'revelate',
        user: process.env.DB_USER || 'user',
        password: process.env.DB_PASSWORD || 'password',
        ssl: process.env.DB_SSL === 'true',
      };
    }
    
    // Add common configuration
    poolConfig = {
      ...poolConfig,
      max: parseInt(process.env.DB_MAX_CONNECTIONS || (process.env.NODE_ENV === 'production' ? '20' : '10')),
      idleTimeoutMillis: parseInt(process.env.DB_IDLE_TIMEOUT || '30000'),
      connectionTimeoutMillis: parseInt(process.env.DB_CONNECT_TIMEOUT || '5000'), // Increased for containerized environments
    };
    
    // Initialize the pool
    pool = new Pool(poolConfig);

    // Monitor the connection pool events
    pool.on('error', (err) => {
      console.error('Unexpected error on idle client', err);
    });
  }

  return pool;
};

// Enhanced query helper with better error handling and performance tracking
const query = async <T extends QueryResultRow = any>(text: string, params?: any[]): Promise<QueryResult<T>> => {
  const client = await getPool().connect();
  try {
    const start = Date.now();
    const res = await client.query<T>(text, params);
    const duration = Date.now() - start;
    
    // Log query performance in development
    if (process.env.NODE_ENV !== 'production') {
      console.log('Executed query', { 
        text, 
        duration, 
        rows: res.rowCount,
        // Only log params in development for security
        params: process.env.NODE_ENV === 'development' ? params : '[REDACTED]'
      });
    }
    
    // Flag slow queries for optimization
    if (duration > 500) {
      console.warn(`⚠️ Slow query detected [${duration}ms]: ${text.substring(0, 100)}...`);
    }
    
    return res;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  } finally {
    // Return client to pool
    client.release();
  }
};

// Connect to the database with retry mechanism for containerized environments
const connectDb = async (retries = 5, retryDelay = 5000): Promise<Database> => {
  try {
    // If already connected, return the existing connection
    if (connection.isConnected) {
      return {
        query: query,
        connect: () => getPool().connect(),
      };
    }

    // Try to connect with retries (helpful for containerized environments)
    let lastError: any;
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        // Make a test query to check connection
        const testPool = getPool();
        const testClient = await testPool.connect();
        try {
          await testClient.query('SELECT NOW()');
          
          // Set connection to true
          connection.isConnected = true;
          
          console.log(`Database connected successfully${attempt > 1 ? ` after ${attempt} attempts` : ''}`);
          
          return {
            query: query,
            connect: () => getPool().connect(),
          };
        } finally {
          testClient.release();
        }
      } catch (error) {
        lastError = error;
        if (attempt < retries) {
          console.warn(`Database connection attempt ${attempt} failed, retrying in ${retryDelay/1000}s...`);
          await new Promise(resolve => setTimeout(resolve, retryDelay));
        }
      }
    }
    
    // If we get here, all retries failed
    console.error('Database connection failed after multiple attempts:', lastError);
    throw lastError;
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
};

// Initialize database with tables and indexes
const initDb = async (): Promise<{ success: boolean; error?: any }> => {
  try {
    const db = await connectDb();
    
    // Create contacts table with enhanced fields for marketing attribution
    await db.query(`
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
    
    // Add indexes for better query performance
    await db.query(`
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
    
    // Create subscribers table for newsletter
    await db.query(`
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
    await db.query(`
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
    
    console.log('✅ Database tables and indexes created successfully');
    return { success: true };
  } catch (error) {
    console.error('Error initializing database:', error);
    return { success: false, error };
  }
};

export { connectDb, query, initDb };
