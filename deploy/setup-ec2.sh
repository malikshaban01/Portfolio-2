#!/usr/bin/env bash
#
# One-time EC2 instance bootstrap. Run as the default (ubuntu) user.
#
#   bash deploy/setup-ec2.sh
#
# Installs Node 20, nginx, PM2 and certbot, then clones the repo and starts
# the app. Safe to re-run — it skips steps that are already done.
set -euo pipefail

REPO_URL="https://github.com/malikshaban01/Portfolio-2.git"
APP_DIR="/var/www/portfolio"
SERVICE_USER="ubuntu"

echo "==> Updating apt and installing system packages"
sudo apt-get update -y
sudo apt-get install -y nginx git curl ufw

echo "==> Installing Node 20 (LTS) via NodeSource"
if ! command -v node >/dev/null 2>&1; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
  sudo apt-get install -y nodejs
fi
echo "    node: $(node -v)  npm: $(npm -v)"

echo "==> Installing PM2 globally"
if ! command -v pm2 >/dev/null 2>&1; then
  sudo npm install -g pm2
fi

echo "==> Configuring firewall (SSH, HTTP, HTTPS)"
sudo ufw allow OpenSSH || true
sudo ufw allow 'Nginx Full' || true
sudo ufw --force enable

echo "==> Deploying app to ${APP_DIR}"
if [ ! -d "${APP_DIR}/.git" ]; then
  sudo mkdir -p "${APP_DIR}"
  sudo chown -R "${SERVICE_USER}:${SERVICE_USER}" "${APP_DIR}"
  git clone "${REPO_URL}" "${APP_DIR}"
else
  git -C "${APP_DIR}" pull --ff-only
fi

echo "==> Installing dependencies and building the frontend"
cd "${APP_DIR}"
npm ci
npm run build

echo "==> Starting the Node server with PM2"
pm2 delete portfolio >/dev/null 2>&1 || true
pm2 start ecosystem.config.cjs
pm2 save

# Make PM2 survive reboots.
if [ ! -f /etc/systemd/system/pm2-ubuntu.service ]; then
  env PATH=$PATH:/usr/bin pm2 startup systemd -u "${SERVICE_USER}" --hp "/home/${SERVICE_USER}"
fi

echo "==> Linking nginx site"
sudo cp nginx/portfolio.conf /etc/nginx/sites-available/portfolio
sudo ln -sf /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/portfolio
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx
sudo systemctl enable nginx

echo ""
echo "==> Done. The site should be live at http://<your-EC2-public-IP>"
echo ""
echo "Next steps:"
echo "  1. Create /var/www/portfolio/.env with your Supabase keys (see .env.example)"
echo "  2. Run: pm2 restart portfolio"
echo "  3. Point your domain's A record at this instance, then run:"
echo "     sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com"
