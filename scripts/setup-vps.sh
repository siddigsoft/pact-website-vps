#!/bin/bash

# Exit on error
set -e

echo "Starting VPS Setup..."

# Update system
echo "Updating system packages..."
apt-get update && apt-get upgrade -y

# Install Docker if not installed
if ! command -v docker &> /dev/null; then
    echo "Installing Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    rm get-docker.sh
else
    echo "Docker is already installed."
fi

# Install Docker Compose if not installed
if ! command -v docker-compose &> /dev/null; then
    echo "Installing Docker Compose..."
    curl -L "https://github.com/docker/compose/releases/download/v2.24.5/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
else
    echo "Docker Compose is already installed."
fi

# Install Certbot
if ! command -v certbot &> /dev/null; then
    echo "Installing Certbot..."
    apt-get install -y certbot
else
    echo "Certbot is already installed."
fi

# Create project directory
mkdir -p /root/pact-website-vps
cd /root/pact-website-vps

echo "Setup complete! Next steps:"
echo "1. Run 'certbot certonly --standalone -d pactorg.com -d www.pactorg.com -d pactorg1.com -d www.pactorg1.com' to generate certificates."
echo "2. Ensure your DNS records point to this server IP."
echo "3. Deploy the application using GitHub Actions or manual docker-compose up."
