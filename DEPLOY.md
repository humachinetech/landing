# Deploy to AWS EC2

This guide covers deploying the landing app (React frontend + NestJS backend) to AWS EC2.

## Prerequisites on EC2

- Ubuntu 22.04 (or similar)
- Node.js 18+ (e.g. via [nvm](https://github.com/nvm-sh/nvm))
- MongoDB (local or Atlas connection string in `.env`)
- Nginx
- PM2: `npm install -g pm2`

## One-time EC2 setup

### 1. Clone repo and install deps

```bash
sudo mkdir -p /var/www/landing
sudo chown $USER:$USER /var/www/landing
cd /var/www/landing
git clone <your-repo-url> .
# Or clone into a subdir and copy; adjust paths below accordingly
```

### 2. Backend environment

```bash
cd /var/www/landing/backend
cp ../../env.example .env
# Edit .env: set MONGODB_URI, CORS_ORIGIN (e.g. https://yourdomain.com or http://<ec2-public-ip>)
```

### 3. Nginx

```bash
sudo cp /var/www/landing/deploy/nginx.conf /etc/nginx/sites-available/landing
sudo ln -s /etc/nginx/sites-available/landing /etc/nginx/sites-enabled/
# Edit server_name if you use a domain
sudo nginx -t && sudo systemctl reload nginx
```

### 4. PM2 and backend

```bash
cd /var/www/landing/backend
yarn install
yarn build
pm2 start dist/main.js --name landing-backend
pm2 save
pm2 startup  # run the command it prints to start on boot
```

### 5. Frontend build (production API URL)

```bash
cd /var/www/landing/frontend
VITE_GRAPHQL_URI=/graphql yarn build
# Nginx serves from /var/www/landing/frontend/dist
```

## Deploying updates (push → deploy on EC2)

### From your machine: push changes

```bash
git add -A
git commit -m "Your message"
git push
```

### On EC2: pull and run deploy script

```bash
cd /var/www/landing
git pull
chmod +x deploy/deploy.sh
./deploy/deploy.sh
```

The script builds backend and frontend, restarts the backend with PM2, and leaves frontend assets in `frontend/dist` for Nginx to serve.

## Environment variables

| Variable | Where | Description |
|----------|--------|-------------|
| `PORT` | Backend | Server port (default 4000). Nginx proxies `/graphql` to this. |
| `CORS_ORIGIN` | Backend | Allowed origin (e.g. `https://yourdomain.com` or `http://<ec2-ip>`). |
| `MONGODB_URI` | Backend | MongoDB connection string. |
| `VITE_GRAPHQL_URI` | Frontend build | GraphQL endpoint. Use `/graphql` when frontend and API are same origin. |

## Optional: deploy from your machine via SSH

```bash
ssh -i your-key.pem ubuntu@<ec2-ip> "cd /var/www/landing && git pull && ./deploy/deploy.sh"
```

## Troubleshooting

- **502 Bad Gateway**: Backend not running or wrong port. Check `pm2 status` and `PORT` in backend `.env`.
- **GraphQL fails**: Ensure `CORS_ORIGIN` matches the origin the browser uses (scheme + host + port).
- **Blank page**: Confirm frontend was built with `VITE_GRAPHQL_URI=/graphql` and Nginx `root` points at `frontend/dist`.
