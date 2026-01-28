# Backend (NestJS) Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json yarn.lock* ./
RUN yarn install --frozen-lockfile

# Copy source
COPY . .

# Build
RUN yarn build

# Production image
FROM node:18-alpine

WORKDIR /app

# Copy package files and install production deps only
COPY package.json yarn.lock* ./
RUN yarn install --frozen-lockfile --production

# Copy built app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.bin ./node_modules/.bin

# Expose port
EXPOSE 4000

# Start
CMD ["node", "dist/main"]
