# syntax=docker/dockerfile:1

# Stage 1: Dependencies
FROM node:22.13.1-slim AS deps
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies with caching
RUN --mount=type=cache,target=/root/.npm npm ci

# Stage 2: Build
FROM node:22.13.1-slim AS builder
WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set environment variables for build
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

# Build the application
RUN npm run build

# Stage 3: Production runtime
FROM node:22.13.1-slim AS runner
WORKDIR /app

# Set environment variables
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
ENV PORT 3000

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy only necessary files from build stage
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to non-root user
USER nextjs

# Expose the application port
EXPOSE 3000

# Copy health check script
COPY --from=builder --chown=nextjs:nodejs /app/scripts/docker-healthcheck.js ./scripts/docker-healthcheck.js
RUN chmod +x ./scripts/docker-healthcheck.js

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=20s --retries=3 \
  CMD node ./scripts/docker-healthcheck.js

# Copy entrypoint script
COPY --from=builder --chown=nextjs:nodejs /app/scripts/docker-entrypoint.sh ./scripts/docker-entrypoint.sh
RUN chmod +x ./scripts/docker-entrypoint.sh

# Use entrypoint script
ENTRYPOINT ["/app/scripts/docker-entrypoint.sh"]

# Run the application
CMD ["node", "server.js"]