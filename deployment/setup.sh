#!/bin/bash

# Specify Node.js version
NODE_VERSION="20.9.0"

APP_NAME="api"
# Make sure you set up domain point this server
APP_DOMAIN="poppy-dev.online"
APP_PORT="3000"

EMAIL=poppy99.dev@gmail.com

# cd into the folder code
cd ../backend

# Check if .env file exists
if [ ! -f .env ]; then
    echo "Error: The .env file is missing. Please create it before building."
    exit 1
fi
echo "STEP: INSTALL NODE VERSION $NODE_VERSION."
# Install Node.js using nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
source ~/.nvm/nvm.sh
nvm install "$NODE_VERSION"
nvm use "$NODE_VERSION"

# Install pm2 globally
echo "STEP: INSTALL PM2 GLOBALLY."
npm install pm2 -g

# make sure created a .env file

# build code and run start with pm2
echo "STEP: INSTALL NODE_MODULE AND START APP."

npm ci &&\
npm run build &&\
pm2 start dist/main.js --name "$APP_NAME"

# Install Certbot and Nginx
echo "STEP: SETUP INSTALL NGINX AND CERTBOT"

sudo apt-get update
sudo apt-get install -y nginx
sudo snap install core
sudo snap refresh core

# Configure Nginx for your domain
sudo tee /etc/nginx/sites-available/$APP_DOMAIN <<EOF
server {
    listen 80;
    server_name $APP_DOMAIN;

    location / {
        proxy_pass http://localhost:$APP_PORT;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_cache_bypass \$http_upgrade;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOF

# Enable the Nginx site configuration
sudo ln -s /etc/nginx/sites-available/$APP_DOMAIN /etc/nginx/sites-enabled

# Test Nginx configuration
sudo nginx -t

# Reload Nginx to apply changes
sudo systemctl reload nginx

echo "STEP: SETUP HTTPS"
# Obtain SSL certificate using Certbot
sudo certbot --nginx -d $APP_DOMAIN --non-interactive --email $EMAIL --agree-tos --redirect
