// PM2 process config — keeps the Node server alive and restarts it on crash
// or reboot. Run with:  pm2 start ecosystem.config.cjs
module.exports = {
  apps: [
    {
      name: 'portfolio',
      script: 'server.js',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      max_restarts: 10,
      max_memory_restart: '450M',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
  ],
};
