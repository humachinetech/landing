#!/bin/bash
# Deploy landing app (run this ON the EC2 instance from the app root)
# Usage: cd /var/www/landing && ./deploy/deploy.sh
set -e

APP_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$APP_DIR"
echo "Deploying from $APP_DIR"

# Backend
cd backend
yarn install --frozen-lockfile
yarn build
cd ..
pm2 restart landing-backend --update-env 2>/dev/null || (cd backend && pm2 start dist/main.js --name landing-backend)

# Frontend (build with production API URL: same-origin /graphql)
cd frontend
VITE_GRAPHQL_URI="${VITE_GRAPHQL_URI:-/graphql}" yarn build
cd ..

echo "Deploy done. Restart nginx if needed: sudo systemctl reload nginx"
