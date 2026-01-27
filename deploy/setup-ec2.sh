#!/bin/bash
# One-time EC2 setup — run as the app user (e.g. ubuntu) ON the instance.
# Prereqs: Node 18+, yarn, MongoDB reachable, nginx, git.
# Usage: ./deploy/setup-ec2.sh

set -e

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "1. Backend .env"
if [ ! -f backend/.env ]; then
  cp env.example backend/.env
  echo "   Created backend/.env — edit it: set MYSQL_* (port 3306) and CORS_ORIGIN (e.g. http://<ec2-public-ip>)"
  echo "   Then run: ./deploy/deploy.sh"
  echo ""
fi

echo "2. Nginx (so port 80 is ready)"
sudo cp "$ROOT/deploy/nginx.conf" /etc/nginx/sites-available/landing
sudo ln -sf /etc/nginx/sites-available/landing /etc/nginx/sites-enabled/landing
sudo rm -f /etc/nginx/sites-enabled/default 2>/dev/null || true
sudo nginx -t && sudo systemctl reload nginx
echo "   Nginx serving /var/www/landing/frontend/dist and proxying /graphql -> :4000"
echo ""

if [ -f backend/.env ]; then
  echo "3. Backend build and PM2"
  cd "$ROOT/backend"
  yarn install
  yarn build
  pm2 delete landing-backend 2>/dev/null || true
  (cd "$ROOT/backend" && pm2 start dist/main.js --name landing-backend)
  pm2 save
  pm2 startup 2>/dev/null | tail -1 | sudo bash 2>/dev/null || true
  cd "$ROOT"

  echo "4. Frontend build"
  cd "$ROOT/frontend"
  VITE_GRAPHQL_URI=/graphql yarn install
  VITE_GRAPHQL_URI=/graphql yarn build
  cd "$ROOT"

  echo "Setup done. Open http://<ec2-public-ip> in a browser."
else
  echo "Skipped backend/frontend (no backend/.env). Edit backend/.env and run ./deploy/deploy.sh"
fi
