#!/usr/bin/env bash
#
# Re-deploy after pushing changes to GitHub. Run on the EC2 instance:
#
#   bash deploy/deploy.sh
#
# Pulls latest, rebuilds the frontend and restarts the Node server + nginx.
set -euo pipefail

APP_DIR="/var/www/portfolio"
cd "${APP_DIR}"

echo "==> Pulling latest from GitHub"
git pull --ff-only

echo "==> Installing dependencies"
npm ci

echo "==> Building frontend"
npm run build

echo "==> Restarting Node server"
pm2 restart portfolio --update-env

echo "==> Reloading nginx (picks up any nginx/ config changes)"
sudo cp nginx/portfolio.conf /etc/nginx/sites-available/portfolio
sudo nginx -t && sudo systemctl reload nginx

echo "==> Deploy complete"
pm2 status
