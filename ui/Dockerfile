# Frontend (React/Vite) Dockerfile - multi-stage: build + serve
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json yarn.lock* ./
RUN yarn install --frozen-lockfile

# Copy source
COPY . .

# Build (VITE_GRAPHQL_URI defaults to /graphql for same-origin)
ARG VITE_GRAPHQL_URI=/graphql
ENV VITE_GRAPHQL_URI=$VITE_GRAPHQL_URI
RUN yarn build

# Production: serve with nginx
FROM nginx:alpine

# Copy built assets
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx config (proxies /graphql to api service)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
