# Use official Bun image
FROM oven/bun:1

# Set working directory
WORKDIR /app

# Set environment to development(optional)
ENV NODE_ENV=development
ENV NEXT_TELEMETRY_DISABLED=1

# Copy dependency files
COPY package.json bun.lockb* ./

# Install dependencies
RUN bun install

# Copy source code
COPY . .

# Expose Next.js dev port
EXPOSE 3000

# Run Next.js in development mode
CMD ["bun", "run", "dev"]
