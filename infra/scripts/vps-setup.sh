#!/bin/bash
# Script de setup inicial da VPS — rode UMA vez como root ou sudo
# Uso: bash vps-setup.sh
set -e

echo "=== 1. Node.js via nvm ==="
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm install 22
nvm use 22
node --version

echo "=== 2. PM2 ==="
npm install -g pm2
pm2 startup       # imprime um comando — execute-o como root
mkdir -p /var/log/pm2

echo "=== 3. Diretório da aplicação ==="
mkdir -p /var/www/pokemuu
mkdir -p /var/www/pokemuu-cards   # onde as imagens dos cards ficam permanentemente

echo "=== 4. Subir os cards para a VPS (rode do seu computador local) ==="
echo "Exemplo:"
echo "  scp -r C:/Users/isadfrn/Downloads/pokemu-online/cards/* user@SEU_IP:/var/www/pokemuu-cards/"
echo ""
echo "  OU via rsync (incremental, mais rápido para updates):"
echo "  rsync -avz --progress cards/ user@SEU_IP:/var/www/pokemuu-cards/"

echo "=== 5. Chave SSH para o GitHub Actions ==="
ssh-keygen -t ed25519 -C "github-actions-pokemuu" -f ~/.ssh/github_actions -N ""
cat ~/.ssh/github_actions.pub >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
echo ""
echo "⬇️  Copie a CHAVE PRIVADA abaixo e adicione como Secret VPS_SSH_KEY no GitHub:"
echo "------------------------------------------------------------"
cat ~/.ssh/github_actions
echo "------------------------------------------------------------"

echo "=== 6. Certbot (SSL Let's Encrypt) ==="
apt-get install -y certbot python3-certbot-nginx
# Execute depois que o nginx estiver configurado:
# certbot --nginx -d pokemuu.com -d www.pokemuu.com

echo ""
echo "✅ Setup concluído. Próximos passos:"
echo "   1. Adicione os Secrets no GitHub (VPS_HOST, VPS_USER, VPS_SSH_KEY)"
echo "   2. Copie nginx/pokemuu.com.conf para /etc/nginx/sites-available/"
echo "   3. ln -s /etc/nginx/sites-available/pokemuu.com.conf /etc/nginx/sites-enabled/"
echo "   4. nginx -t && systemctl reload nginx"
echo "   5. certbot --nginx -d pokemuu.com -d www.pokemuu.com"
echo "   6. Faça git push → o workflow dispara automaticamente"
