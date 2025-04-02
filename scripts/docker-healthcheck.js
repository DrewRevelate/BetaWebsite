#!/usr/bin/env node

/**
 * Docker Healthcheck Script
 * 
 * This script checks if the Next.js application is running properly
 * by making a request to the /api/health endpoint.
 * 
 * Usage in Dockerfile:
 * HEALTHCHECK --interval=30s --timeout=10s --start-period=20s --retries=3 \
 *   CMD node /app/scripts/docker-healthcheck.js
 */

const https = require('https');
const http = require('http');

// Health check configuration
const PORT = process.env.PORT || 3000;
const HOST = process.env.HEALTHCHECK_HOST || 'localhost';
const PATH = process.env.HEALTHCHECK_PATH || '/api/health';
const TIMEOUT = process.env.HEALTHCHECK_TIMEOUT ? parseInt(process.env.HEALTHCHECK_TIMEOUT) : 5000;
const USE_HTTPS = process.env.HEALTHCHECK_HTTPS === 'true';

// Request options
const options = {
  host: HOST,
  port: PORT,
  path: PATH,
  timeout: TIMEOUT,
};

// Choose protocol based on config
const protocol = USE_HTTPS ? https : http;

// Create request
const req = protocol.request(options, (res) => {
  console.log(`HEALTHCHECK STATUS: ${res.statusCode}`);
  
  // Any 2xx status code is considered healthy
  if (res.statusCode >= 200 && res.statusCode < 300) {
    process.exit(0); // Success
  } else {
    process.exit(1); // Failure
  }
});

// Handle request error
req.on('error', (error) => {
  console.error('HEALTHCHECK ERROR:', error.message);
  process.exit(1); // Failure
});

// Handle timeout
req.on('timeout', () => {
  console.error(`HEALTHCHECK TIMEOUT: Did not receive response within ${TIMEOUT}ms`);
  req.destroy();
  process.exit(1); // Failure
});

// End request
req.end();
