# Deploy to AWS EC2

Deploy the landing app (React + NestJS + GraphQL + MySQL) to EC2.

**Auto-deploy on push:** see [DEPLOY-AUTOMATION.md](./DEPLOY-AUTOMATION.md) for GitHub Actions (push to `main` → deploy via SSH).

---

## This instance (eu-north-1)

- **Region:** eu-north-1 (Stockholm)
- **Instance ID:** `i-07e45185a63d7d1c2`
- **Console:** [EC2 Instance Details](https://eu-north-1.console.aws.amazon.com/ec2/home?region=eu-north-1#InstanceDetails:instanceId=i-07e45185a63d7d1c2)

In the console, note the **Public IPv4 address**. You need it for SSH, `CORS_ORIGIN`, and for opening the app in a browser.

---

## Security group (required)

In EC2 → Security groups → inbound rules, allow:

| Type   | Port | Source     |
|--------|------|------------|
| SSH    | 22   | Your IP    |
| HTTP   | 80   | 0.0.0.0/0  |

---

## One-time setup on EC2

SSH in, then run these steps **in order**.

### 1. Prereqs (Node, yarn, nginx, MySQL)

```bash
# Node 18+ (e.g. nvm)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 18
nvm use 18

# Yarn and PM2
npm install -g yarn pm2

# Nginx (Ubuntu)
sudo apt-get update && sudo apt-get install -y nginx

# MySQL on port 3306: local install, RDS, or remote; set MYSQL_* in backend/.env
```

### 2. Clone repo

```bash
sudo mkdir -p /var/www/landing
sudo chown $USER:$USER /var/www/landing
cd /var/www/landing
git clone https://github.com/humachinetech/landing.git .
# Or: git clone git@github.com:humachinetech/landing.git .
```

### 3. Backend env

```bash
cp env.example backend/.env
nano backend/.env   # or vim
```

Set at least:

- `MYSQL_HOST`, `MYSQL_PORT` (3306), `MYSQL_USER`, `MYSQL_PASSWORD`, `MYSQL_DATABASE`
- `CORS_ORIGIN` — `http://<PUBLIC_IP>` (the EC2 Public IPv4, no trailing slash)

Save and exit.

### 4. Run one-time setup script

```bash
cd /var/www/landing
chmod +x deploy/setup-ec2.sh deploy/deploy.sh
./deploy/setup-ec2.sh
```

This configures nginx, builds backend + frontend, and starts the backend with PM2. If you had not created `backend/.env` before, it will tell you to create it and then run `./deploy/deploy.sh`.

### 5. Verify

```bash
pm2 status                    # landing-backend should be “online”
curl -s http://127.0.0.1:4000/graphql -H "Content-Type: application/json" -d '{"query":"{ __typename }"}'  # should return {"data":{"__typename":"Query"}}
curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1/   # should be 200
```

Then open **http://\<PUBLIC_IP\>** in a browser. You should see the landing page; the “Get Started” form talks to `/graphql` via nginx.

---

## Deploying updates

On your machine:

```bash
git add -A && git commit -m "Your message" && git push
```

On EC2:

```bash
cd /var/www/landing
git pull
./deploy/deploy.sh
```

Or in one go from your machine (replace key and IP):

```bash
ssh -i your-key.pem ubuntu@<PUBLIC_IP> "cd /var/www/landing && git pull && ./deploy/deploy.sh"
```

---

## Environment variables

| Variable         | Where     | Description |
|------------------|-----------|-------------|
| `PORT`           | Backend   | Default 4000. Nginx proxies `/graphql` to this. |
| `CORS_ORIGIN`    | Backend   | Allowed origin, e.g. `http://<ec2-ip>` or `https://yourdomain.com`. Must match the URL in the browser. |
| `MYSQL_HOST`     | Backend   | MySQL host (default `localhost`). |
| `MYSQL_PORT`     | Backend   | MySQL port (default `3306`). |
| `MYSQL_USER`     | Backend   | MySQL user. |
| `MYSQL_PASSWORD` | Backend   | MySQL password. |
| `MYSQL_DATABASE` | Backend   | MySQL database (e.g. `landing`). |
| `VITE_GRAPHQL_URI` | Frontend (build) | Use `/graphql` when frontend and API are on the same host (typical for EC2). |

---

## Troubleshooting

- **502 Bad Gateway**  
  Backend not running or wrong port.  
  - `pm2 status` — `landing-backend` should be online.  
  - `pm2 logs landing-backend` — look for bind/port errors.  
  - Backend `.env`: `PORT=4000` (or whatever nginx proxies to).

- **GraphQL / CORS errors in browser**  
  `CORS_ORIGIN` must match the origin (scheme + host, no port if 80/443).  
  - If you use `http://13.48.x.x`, set `CORS_ORIGIN=http://13.48.x.x`.  
  - No trailing slash.

- **Blank or broken page**  
  - Frontend must be built with `VITE_GRAPHQL_URI=/graphql` (deploy script does this).  
  - Nginx `root` must be `/var/www/landing/frontend/dist`.  
  - `ls /var/www/landing/frontend/dist` should show `index.html` and assets.

- **“Cannot GET /graphql”**  
  Nginx is not proxying. Check:  
  - `/etc/nginx/sites-enabled/landing` exists and has `location /graphql { proxy_pass http://127.0.0.1:4000; ... }`.  
  - `sudo nginx -t && sudo systemctl reload nginx`.

- **Default nginx page instead of app**  
  Disable default site:  
  - `sudo rm -f /etc/nginx/sites-enabled/default && sudo systemctl reload nginx`.

- **Backend exits or “EADDRINUSE”**  
  - `pm2 delete landing-backend`  
  - Ensure nothing else uses port 4000: `sudo lsof -i :4000`  
  - Start again: `cd /var/www/landing && ./deploy/deploy.sh`.

- **MySQL connection refused / ECONNREFUSED**  
  - MySQL must be reachable on port 3306 (local or RDS).  
  - Check `MYSQL_HOST`, `MYSQL_PORT`, `MYSQL_USER`, `MYSQL_PASSWORD`, `MYSQL_DATABASE` in `backend/.env`.  
  - If MySQL is on another host, open port 3306 in that host’s security group for the EC2 IP.
