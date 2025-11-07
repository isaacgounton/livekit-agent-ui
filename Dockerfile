# syntax=docker/dockerfile:1

ARG NODE_VERSION=22
FROM node:${NODE_VERSION}-bookworm-slim AS base

# Install pnpm
RUN npm install -g pnpm

# Create a non-privileged user
ARG UID=10001
RUN adduser \
    --disabled-password \
    --gecos "" \
    --home "/app" \
    --shell "/sbin/nologin" \
    --uid "${UID}" \
    appuser

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy application files
COPY . .

# Change ownership
RUN chown -R appuser:appuser /app

# Switch to non-privileged user
USER appuser

# Build the Next.js application
RUN pnpm run build

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["pnpm", "start"]
