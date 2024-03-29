# Stage 1: Build stage
FROM node:20 as builder

# Create app directory
WORKDIR /app

COPY package*.json .
COPY prisma .

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Stage 2: Final stage
FROM oven/bun:1 as base

# Set working directory
WORKDIR /app

# Copy only the necessary artifacts from the builder stage
COPY --from=builder /app .

# Expose the necessary port
EXPOSE 8787

# Define the command to run your application
CMD ["bun", "dev"]
