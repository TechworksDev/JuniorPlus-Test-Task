# Multi-stage build for Node.js + TypeScript backend

# Stage 1: Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including devDependencies for TypeScript compilation)
RUN npm ci

# Copy source code
COPY . .

# Compile TypeScript to JavaScript
RUN npm run build

# Stage 2: Runtime stage
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (including sequelize-cli for migrations)
RUN npm ci

# Copy compiled JavaScript from builder stage
COPY --from=builder /app/dist ./dist

# Copy migration files and config
COPY src/migrations ./src/migrations
COPY src/config ./src/config
COPY .sequelizerc ./

# Copy migration startup script
COPY migrate-and-start.sh ./
RUN chmod +x migrate-and-start.sh

# Create logs directory
RUN mkdir -p logs

# Expose backend port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start the application with migrations
CMD ["./migrate-and-start.sh"]
