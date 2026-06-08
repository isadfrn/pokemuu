#!/bin/bash
# Script de setup inicial da VPS — rode UMA vez como root ou sudo
# Uso: bash vps-setup.sh
set -e

echo "=== 1. Docker ==="
apt-get update -y
apt-get install -y ca-certificates curl gnupg lsb-release
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
chmod a+r /etc/apt/keyrings/docker.gpg
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  tee /etc/apt/sources.list.d/docker.list > /dev/null
apt-get update -y
apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin
systemctl enable --now docker

echo "=== 2. Diretório dos cards ==="
mkdir -p /var/www/pokemuu-cards

echo "=== 3. Chave SSH para o GitHub Actions ==="
ssh-keygen -t ed25519 -C "github-actions-pokemuu" -f ~/.ssh/github_actions -N ""
cat ~/.ssh/github_actions.pub >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
echo ""
echo "⬇️  Copie a CHAVE PRIVADA abaixo e adicione como Secret VPS_SSH_KEY no GitHub:"
echo "------------------------------------------------------------"
cat ~/.ssh/github_actions
echo "------------------------------------------------------------"

echo "=== 4. Certbot (SSL Let's Encrypt) ==="
apt-get install -y certbot python3-certbot-nginx

echo ""
echo "✅ Setup concluído. Próximos passos:"
echo "   1. Envie os cards: scp -r public/cards/* user@IP:/var/www/pokemuu-cards/"
echo "   2. Copie o Nginx: scp infra/nginx/pokemuu.com.conf user@IP:/etc/nginx/sites-available/pokemuu.com"
echo "   3. Na VPS: ln -s /etc/nginx/sites-available/pokemuu.com /etc/nginx/sites-enabled/"
echo "   4. Na VPS: nginx -t && systemctl reload nginx"
echo "   5. Na VPS: certbot --nginx -d pokemuu.com -d www.pokemuu.com"
echo "   6. Secrets no GitHub: VPS_HOST, VPS_USER, VPS_SSH_KEY, GHCR_TOKEN"
echo "   7. git push origin main → primeiro deploy automático"
