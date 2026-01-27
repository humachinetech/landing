// PM2 config for backend on EC2
// Usage: pm2 start ecosystem.config.cjs

module.exports = {
  apps: [
    {
      name: 'landing-backend',
      cwd: './backend',
      script: 'dist/main.js',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
      },
      env_file: '.env',
      error_file: '/var/log/pm2/landing-backend-error.log',
      out_file: '/var/log/pm2/landing-backend-out.log',
      merge_logs: true,
    },
  ],
};
