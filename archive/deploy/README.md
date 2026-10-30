# Deploying to a single EC2 instance (free tier)

This repo is a Vite/React frontend plus Vercel-style API routes in `api/`.
On EC2, a small Express server (`server.js`) runs those API handlers and
serves the built frontend, with nginx in front for static files and HTTPS.

```
Internet ──> nginx (:80/:443) ──> Node/Express (:3000)
                  │                       │
                  │                       └── /api/* handlers (api/*.js)
                  └── static files (dist/assets, public/)
                          └── SPA fallback to index.html
```

## Files added for EC2

| File | Purpose |
| --- | --- |
| `server.js` | Express server: mounts `api/` handlers + serves `dist/` with SPA fallback |
| `ecosystem.config.cjs` | PM2 config: keeps the server alive, restarts on crash/reboot |
| `nginx/portfolio.conf` | nginx site: static caching + reverse proxy to `:3000` |
| `deploy/setup-ec2.sh` | One-time bootstrap: installs Node/nginx/PM2, clones, builds, starts |
| `deploy/deploy.sh` | Re-deploy after pushing to GitHub |
| `deploy/.env.production.example` | Template for the production env vars |

## 1. Launch the instance

1. EC2 console → **Launch instance**
2. **AMI**: Ubuntu Server 24.04 LTS (free-tier eligible)
3. **Type**: `t2.micro` (or `t3.micro` — both free tier)
4. **Key pair**: create one and download the `.pem`; you need it to SSH in
5. **Network settings** → allow:
   - **SSH (22)** — restrict to *My IP* if you can
   - **HTTP (80)**
   - **HTTPS (443)**
6. **Storage**: 8 GB gp3 is plenty
7. Launch, then wait for the status check to pass

## 2. SSH in

```bash
chmod 400 your-key.pem
ssh -i your-key.pem ubuntu@<your-EC2-public-IP>
```

## 3. Run the bootstrap

```bash
# from your home directory on the instance
curl -fsSL https://raw.githubusercontent.com/malikshaban01/Portfolio-2/main/deploy/setup-ec2.sh -o setup-ec2.sh
bash setup-ec2.sh
```

This installs Node 20, nginx, PM2 and ufw, clones the repo to
`/var/www/portfolio`, runs `npm ci && npm run build`, and starts everything.

> If you prefer to run the steps by hand, they are the same commands as in
> `deploy/setup-ec2.sh` — read through it first if you like.

## 4. Add your Supabase keys (required)

The site is live after step 3, but the API calls will fail until the keys are
set. Create `/var/www/portfolio/.env` from the template:

```bash
cd /var/www/portfolio
cp deploy/.env.production.example .env
nano .env
```

Fill in from your Supabase dashboard (**Project Settings → API**):

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` — **server-side only**, never commit this
- `FULLSTACK_PROJECT_REF` / `FULLSTACK_RESTORE_API_URL` — optional, only used
  by `api/db-wake.js` to auto-restore a paused Supabase project

The frontend also needs `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY`, which
are read **at build time** and baked into the bundle. Put them in the same
`.env`, then rebuild and restart:

```bash
npm run build
pm2 restart portfolio
```

Verify the API responds:

```bash
curl -i http://localhost:3000/api/projects
```

## 5. Optional: custom domain + HTTPS

Point your domain's A record at the instance's public IP, then:

```bash
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

Certbot rewrites the nginx config to serve HTTPS and auto-renews.

## Updating the site

After pushing to GitHub, on the instance:

```bash
cd /var/www/portfolio
bash deploy/deploy.sh
```

That pulls, rebuilds, and restarts the Node server and nginx.

## Common checks

```bash
pm2 status                       # is the app running?
pm2 logs portfolio --lines 50    # server errors
sudo systemctl status nginx      # reverse proxy
sudo nginx -t                   # validate nginx config
sudo tail -f /var/log/nginx/error.log
```

If the site loads but API calls 500, it is almost always missing or wrong
Supabase keys in `/var/www/portfolio/.env` — check `pm2 logs portfolio`.

## Notes

- **Free tier limits**: `t2.micro` gives 750 hours/month, which covers one
  instance running 24/7. Watch out for outbound data (100 GB/month) and, if
  you attach an EBS volume beyond 30 GB, the storage allowance.
- **Security**: the security group is your real firewall. Keep SSH restricted
  to your IP; HTTP/HTTPS open to anywhere.
- **Supabase stays external** — the database is not hosted on the EC2
  instance, so pausing your Supabase project takes the API down. The
  `FULLSTACK_*` vars exist to auto-restore it.
