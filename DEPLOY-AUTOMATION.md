# GitHub Actions → EC2 Auto-Deploy

Push to `main` deploys to EC2 automatically.

---

## 1️⃣ Prepare EC2 (one-time)

If you see **`/var/www/landing: No such file or directory`** or **`pm2: command not found`**, the EC2 is still blank. Do this **once** on the instance (SSH as `ubuntu` or your user):

### Option A — Bootstrap script (after cloning somewhere)

If you already have the repo (e.g. in your home dir), run from the repo root:

```bash
chmod +x deploy/bootstrap-ec2.sh
./deploy/bootstrap-ec2.sh
```

### Option B — Copy-paste on a fresh EC2 (no repo yet)

Run these blocks **in order** on the EC2 (e.g. in an SSH session):

**1. Install git, nginx, Node 18, yarn, PM2**

```bash
sudo apt-get update -y
sudo apt-get install -y git nginx curl
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm install -g yarn pm2
```

**2. Create app dir and clone repo**

```bash
sudo mkdir -p /var/www/landing
sudo chown $USER:$USER /var/www/landing
cd /var/www/landing
git clone https://github.com/humachinetech/landing.git .
```

**3. Create backend env and run setup**

```bash
cp env.example backend/.env
nano backend/.env   # set MYSQL_* (port 3306), CORS_ORIGIN=http://<EC2-PUBLIC-IP>
chmod +x deploy/setup-ec2.sh deploy/deploy.sh
./deploy/setup-ec2.sh
```

⚠️ **Repo path must stay `/var/www/landing`** — the workflow and nginx config depend on it.

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
