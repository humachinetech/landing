# GitHub Actions → EC2 Auto-Deploy

Push to `main` deploys to EC2 automatically.

---

## 1️⃣ Prepare EC2 (one-time)

### Install tools

```bash
sudo apt update -y
sudo apt install -y git nodejs npm nginx
sudo npm install -g yarn pm2
# Node 18+ recommended — use nvm if needed:
# curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash && nvm install 18
```

### Clone repo (path is fixed for Actions)

```bash
sudo mkdir -p /var/www/landing
sudo chown $USER:$USER /var/www/landing
cd /var/www/landing
git clone https://github.com/humachinetech/landing.git .
```

⚠️ **Repo path must stay `/var/www/landing`** — the workflow and nginx config depend on it.

### One-time app setup

```bash
cp env.example backend/.env
# Edit backend/.env: MYSQL_* (host, port 3306, user, password, database), CORS_ORIGIN=http://<EC2_PUBLIC_IP>
chmod +x deploy/setup-ec2.sh deploy/deploy.sh
./deploy/setup-ec2.sh
```

---

## 2️⃣ Create SSH key for GitHub Actions

On your **local machine** (or EC2):

```bash
ssh-keygen -t rsa -b 4096 -f github_ec2_key -N ""
```

You get:

- `github_ec2_key` → **private key** (for GitHub secret)
- `github_ec2_key.pub` → **public key** (for EC2)

---

## 3️⃣ Add public key to EC2

On EC2 (or copy `github_ec2_key.pub` to the server):

```bash
# Append the public key (paste contents of github_ec2_key.pub, or on EC2:
echo "paste_full_line_from_github_ec2_key_pub" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

Or from your machine:

```bash
ssh-copy-id -i github_ec2_key.pub ubuntu@<EC2_PUBLIC_IP>
```

---

## 4️⃣ Add secrets in GitHub

**GitHub → Repo → Settings → Secrets and variables → Actions**

Create:

| Name     | Value |
|----------|--------|
| `EC2_HOST` | Public IP of EC2 (e.g. `13.48.x.x`) |
| `EC2_USER` | `ubuntu` (or your SSH user) |
| `EC2_KEY`  | **Full content** of `github_ec2_key` (private key) |

⚠️ Paste the private key exactly, including `-----BEGIN RSA PRIVATE KEY-----` and `-----END RSA PRIVATE KEY-----`.

---

## 5️⃣ Workflow (already in repo)

`.github/workflows/deploy.yml` runs on every push to `main`:

1. SSH to EC2
2. `cd /var/www/landing`
3. `git pull origin main`
4. `./deploy/deploy.sh` (build backend + frontend, restart PM2)

No Docker: same nginx + PM2 setup as manual deploy.

---

## 6️⃣ Push → auto deploy

```bash
git add .
git commit -m "enable GitHub Actions deploy"
git push origin main
```

Then: **GitHub → Actions** and watch the “Deploy to EC2” run.

---

## 7️⃣ Test

Change something (e.g. copy or a label), push, and refresh `http://<EC2_PUBLIC_IP>` to see the update.

---

## Summary

| Step | What |
|------|------|
| EC2 | Clone to `/var/www/landing`, run `./deploy/setup-ec2.sh` once |
| Keys | `ssh-keygen -f github_ec2_key` |
| EC2 | Add `github_ec2_key.pub` to `~/.ssh/authorized_keys` |
| GitHub | Secrets: `EC2_HOST`, `EC2_USER`, `EC2_KEY` |
| Push | Every push to `main` runs the workflow and `./deploy/deploy.sh` on EC2 |
