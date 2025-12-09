# PACT Consultancy Website

A professional consultancy website built with React, TypeScript, Express, and PostgreSQL.

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Development Setup](#development-setup)
- [Docker Deployment](#docker-deployment)
  - [Development Environment](#development-environment)
  - [Production Environment](#production-environment)
- [Database Management](#database-management)
- [SSL Configuration](#ssl-configuration)
- [Maintenance](#maintenance)
- [Troubleshooting](#troubleshooting)

## Features

- Responsive, mobile-first design
- Content Management System (CMS) for easy content updates
- Modern page-builder with drag-and-drop functionality
- Project showcase with interactive slider
- Team member profiles
- Blog/news section
- Contact form
- Admin dashboard for content editing

## Technology Stack

- **Frontend**: React, TypeScript, TailwindCSS, ShadCN UI
- **Backend**: Express.js, Node.js
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Passport.js
- **Deployment**: Docker, Docker Compose, Nginx

## Development Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/pact-consultancy.git
   cd pact-consultancy
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.example .env
   # Edit .env with your specific settings
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. **Access the application**:
   - Frontend: http://localhost:5173 (or the port shown in console)
   - API: http://localhost:5000

## Docker Deployment

The project includes Docker and Docker Compose configurations for both development and production environments.

### Prerequisites

- Docker and Docker Compose installed on your server
- Domain name (for production deployment)
- SSL certificates (for production deployment)

### Development Environment

1. **Make the deployment script executable**:
   ```bash
   chmod +x deploy.sh
   ```

2. **Run the deployment script**:
   ```bash
   ./deploy.sh
   ```

   This script will:
   - Check for Docker and Docker Compose installation
   - Set up the .env file (if it doesn't exist)
   - Build and start the Docker containers
   - Configure the database automatically

3. **Access the application at http://localhost:5000**

### Production Environment

1. **Set up your domain and DNS**:
   - Create DNS A records pointing to your server's IP address

2. **Configure SSL certificates**:
   - Obtain SSL certificates (e.g., using Let's Encrypt)
   - Place the certificates in the `nginx/ssl` directory:
     - `nginx/ssl/fullchain.pem`
     - `nginx/ssl/privkey.pem`

3. **Configure the environment**:
   - Update `.env` file with production settings
   - Update `nginx/nginx.conf` with your domain name

4. **Run the deployment script with production flag**:
   ```bash
   chmod +x deploy.sh
   ./deploy.sh -e prod
   ```

   This will:
   - Check for Docker and Docker Compose installation
   - Set up the .env file (if it doesn't exist)
   - Verify SSL certificate presence
   - Build and start the Docker containers in production mode
   - Configure the database automatically with the defined schema

5. **Access your website at https://yourdomain.com**

## Database Management

### Initial Setup

The database schema is managed using Drizzle ORM. When you first deploy with Docker, the database will be automatically set up with the schema defined in your application code.

### Migrations

To run database migrations:

1. **Pull the latest schema changes**:
   ```bash
   npm run db:pull
   ```

2. **Make schema changes** in `shared/schema.ts`

3. **Push the changes to the database**:
   ```bash
   npm run db:push
   ```

### Database Backup

#### Manual Backup and Restore

1. **Back up the PostgreSQL database**:
   ```bash
   docker exec -t pact-consultancy-postgres-1 pg_dumpall -c -U postgres > backup.sql
   ```

2. **Restore from backup**:
   ```bash
   cat backup.sql | docker exec -i pact-consultancy-postgres-1 psql -U postgres
   ```

#### Automated Backup System

To set up automated daily backups:

1. **Create a backup script**:
   ```bash
   mkdir -p /path/to/backup/directory
   
   cat > /path/to/backup-script.sh << 'EOF'
   #!/bin/bash
   
   # Configuration
   BACKUP_DIR="/path/to/backup/directory"
   CONTAINER_NAME="pact-consultancy-postgres-1"
   POSTGRES_USER="postgres"
   TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
   
   # Create backup file
   docker exec -t $CONTAINER_NAME pg_dumpall -c -U $POSTGRES_USER > $BACKUP_DIR/backup_$TIMESTAMP.sql
   
   # Compress the backup
   gzip $BACKUP_DIR/backup_$TIMESTAMP.sql
   
   # Remove backups older than 30 days
   find $BACKUP_DIR -name "backup_*.sql.gz" -type f -mtime +30 -delete
   
   echo "Backup completed: $BACKUP_DIR/backup_$TIMESTAMP.sql.gz"
   EOF
   
   chmod +x /path/to/backup-script.sh
   ```

2. **Schedule with cron**:
   ```bash
   crontab -e
   ```
   
   Add this line to run the backup every day at 2 AM:
   ```
   0 2 * * * /path/to/backup-script.sh >> /path/to/backup/directory/backup.log 2>&1
   ```

## SSL Configuration

SSL certificates are required for production deployment. The project uses Nginx for SSL termination and as a reverse proxy.

### Obtaining SSL Certificates with Let's Encrypt

1. **Install Certbot**:
   ```bash
   sudo apt-get update
   sudo apt-get install certbot
   ```

2. **Obtain certificates**:
   ```bash
   sudo certbot certonly --standalone -d yourdomain.com -d www.yourdomain.com
   ```

3. **Copy certificates to project**:
   ```bash
   sudo cp /etc/letsencrypt/live/yourdomain.com/fullchain.pem nginx/ssl/
   sudo cp /etc/letsencrypt/live/yourdomain.com/privkey.pem nginx/ssl/
   ```

4. **Setup auto-renewal**:
   ```bash
   sudo crontab -e
   ```
   Add:
   ```
   0 0 * * * certbot renew --quiet && cp /etc/letsencrypt/live/yourdomain.com/fullchain.pem /path/to/your/project/nginx/ssl/ && cp /etc/letsencrypt/live/yourdomain.com/privkey.pem /path/to/your/project/nginx/ssl/ && docker-compose -f docker-compose.prod.yml restart nginx
   ```

## Maintenance

### Updating the Application

1. **Pull the latest changes**:
   ```bash
   git pull origin main
   ```

2. **Rebuild and restart containers**:
   ```bash
   docker-compose -f docker-compose.prod.yml down
   docker-compose -f docker-compose.prod.yml build
   docker-compose -f docker-compose.prod.yml up -d
   ```

### Viewing Logs

```bash
# View all container logs
docker-compose -f docker-compose.prod.yml logs

# Follow logs in real-time
docker-compose -f docker-compose.prod.yml logs -f

# View logs for a specific service
docker-compose -f docker-compose.prod.yml logs app
```

## Troubleshooting

### Common Issues

**Issue**: Container fails to start
**Solution**: Check logs with `docker-compose logs` and ensure your environment variables are properly set.

**Issue**: Database connection errors
**Solution**: Verify database configuration in `.env` file and ensure the PostgreSQL container is running.

**Issue**: Nginx SSL errors
**Solution**: Check that SSL certificates exist and have proper permissions. Certificate paths should match those in nginx.conf.

**Issue**: Application not accessible
**Solution**: Check firewall settings to ensure ports 80 and 443 are open:
```bash
sudo ufw status
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
```

### Getting Help

If you encounter issues not covered here, please open an issue in the GitHub repository or contact the maintainers for support.

---

*© 2024 PACT Consultancy. All rights reserved.*