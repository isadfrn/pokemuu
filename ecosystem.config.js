module.exports = {
  apps: [
    {
      name: 'pokemuu',
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      cwd: '/var/www/pokemuu',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      out_file: '/var/log/pm2/pokemuu-out.log',
      error_file: '/var/log/pm2/pokemuu-error.log',
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
    },
  ],
}
