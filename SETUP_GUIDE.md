# VPS Setup Guide

Follow these steps to set up your VPS for `pactorg.com` and `pactorg1.com`.

## 1. SSH into your VPS

Open your terminal and run:
```bash
ssh root@138.68.104.122
```
Enter your password when prompted.

## 2. Run the Setup Script

Copy and paste the following commands into your VPS terminal to install Docker, Docker Compose, and Certbot:

```bash
# Update system
apt-get update && apt-get upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
rm get-docker.sh

# Install Docker Compose
curl -L "https://github.com/docker/compose/releases/download/v2.24.5/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Install Certbot
apt-get install -y certbot

# Create project directory
mkdir -p /root/pact-website-vps
```

## 3. Generate SSL Certificates

Run Certbot to generate SSL certificates for your domains. Make sure your DNS records for `pactorg.com`, `www.pactorg.com`, `pactorg1.com`, and `www.pactorg1.com` are pointing to `138.68.104.122`.

```bash
# Stop any running web servers on port 80
docker stop nginx || true

# Generate certificates
certbot certonly --standalone -d pactorg.com -d www.pactorg.com -d pactorg1.com -d www.pactorg1.com
```

This will generate certificates in `/etc/letsencrypt/live/pactorg.com/`.

## 4. Deploy the Application

Now that the VPS is ready, you can deploy the application.

1.  **Commit and Push**: Commit the changes I made to your repository (`docker-compose.yml`, `nginx/nginx.conf`, etc.) and push them to GitHub.
    ```bash
    git add .
    git commit -m "Setup VPS configuration with Nginx and SSL"
    git push origin main
    ```

2.  **GitHub Actions**: The push will trigger the GitHub Actions workflow defined in `.github/workflows/deploy.yml`. This workflow will:
    *   Build the Docker image.
    *   SSH into your VPS.
    *   Pull the latest code (including `docker-compose.yml`).
    *   Start the application and Nginx using Docker Compose.

## 5. Verify

Visit https://pactorg.com or https://pactorg1.com in your browser.

## Troubleshooting

If something goes wrong, you can check the logs on the VPS:

```bash
cd /root/pact-website-vps
docker-compose logs -f
```
