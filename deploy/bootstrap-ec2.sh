#!/bin/bash
# Run this ONCE on a fresh EC2 (e.g. ubuntu). Does NOT need the repo yet — paste or download and run.
# Usage: curl -sSL <raw-url> | bash   OR   paste these commands in order.

set -e

echo "=== 1. Install git, nginx ==="
sudo apt-get update -y
sudo apt-get install -y git nginx curl

echo "=== 2. Install Node 18 (NodeSource) ==="
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

echo "=== 3. Install yarn and PM2 globally ==="
sudo npm install -g yarn pm2

echo "=== 4. Create app dir and clone repo ==="
sudo mkdir -p /var/www/landing
sudo chown "$USER:$USER" /var/www/landing
cd /var/www/landing
if [ ! -d .git ]; then
  git clone https://github.com/humachinetech/landing.git .
else
  echo "   (already cloned, skipping)"
fi

echo "=== 5. Backend .env ==="
if [ ! -f backend/.env ]; then
  cp env.example backend/.env
  echo "   Created backend/.env"
  echo ""
  echo "   ⚠️  Edit it now: nano backend/.env"
  echo "   Set: MYSQL_HOST, MYSQL_PORT=3306, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE, CORS_ORIGIN=http://<THIS-SERVER-PUBLIC-IP>"
  echo ""
  echo "   Then run: cd /var/www/landing && chmod +x deploy/setup-ec2.sh deploy/deploy.sh && ./deploy/setup-ec2.sh"
else
  echo "   backend/.env already exists."
  echo "   Run: cd /var/www/landing && ./deploy/setup-ec2.sh"
fi

echo ""
echo "Done. Next: edit backend/.env, then run  ./deploy/setup-ec2.sh"
