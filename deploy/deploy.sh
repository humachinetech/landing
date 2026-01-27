#!/bin/bash
# Deploy landing app — run ON the EC2 instance from the repo root.
# Usage: cd /var/www/landing && ./deploy/deploy.sh
set -e

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
echo "Deploying from $ROOT"

# Backend
echo "Building backend..."
cd "$ROOT/backend"
yarn install
yarn build

# PM2: run from backend dir so process cwd is backend/ and .env is found
if pm2 describe landing-backend &>/dev/null; then
  pm2 restart landing-backend --update-env
else
  (cd "$ROOT/backend" && pm2 start dist/main.js --name landing-backend)
fi
cd "$ROOT"

# Frontend
echo "Building frontend..."
cd "$ROOT/frontend"
export VITE_GRAPHQL_URI="${VITE_GRAPHQL_URI:-/graphql}"
yarn install
yarn build
cd "$ROOT"

echo "Deploy done. Backend: pm2 status. Reload nginx: sudo systemctl reload nginx"
