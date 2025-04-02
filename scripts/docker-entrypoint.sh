#!/bin/sh
set -e

# Docker entrypoint script for Revelate Next.js application
echo "Starting Revelate Next.js application..."

# Set default environment variables if not provided
export NODE_ENV=${NODE_ENV:-production}
export PORT=${PORT:-3000}
export IS_DOCKER=true

# Database connection parameters (with defaults)
export DB_HOST=${DB_HOST:-db}
export DB_PORT=${DB_PORT:-5432}
export DB_NAME=${DB_NAME:-revelate}
export DB_USER=${DB_USER:-user}
export DB_PASSWORD=${DB_PASSWORD:-password}

# Wait for database to be ready if DB_HOST is specified and not localhost
if [ "$DB_HOST" != "localhost" ] && [ "$DB_HOST" != "127.0.0.1" ]; then
  echo "Waiting for database at $DB_HOST:$DB_PORT to be ready..."
  
  # Try to connect to PostgreSQL
  RETRIES=10
  until PGPASSWORD=$DB_PASSWORD psql -h "$DB_HOST" -U "$DB_USER" -d "$DB_NAME" -c "SELECT 1" > /dev/null 2>&1 || [ $RETRIES -eq 0 ]; do
    echo "Waiting for PostgreSQL to become available ($((RETRIES)) retries left)..."
    RETRIES=$((RETRIES-1))
    sleep 5
  done
  
  if [ $RETRIES -eq 0 ]; then
    echo "Error: Could not connect to PostgreSQL after multiple attempts"
    echo "The application will start anyway, but database connections may fail"
  else
    echo "PostgreSQL is ready!"
  fi
fi

# Print startup info
echo "Environment: $NODE_ENV"
echo "Database host: $DB_HOST"
echo "Starting server on port: $PORT"

# Execute the command passed to this script
exec "$@"
