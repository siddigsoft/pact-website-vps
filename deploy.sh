#!/bin/bash
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Print section header
section() {
  echo -e "\n${YELLOW}==== $1 ====${NC}\n"
}

# Check if Docker is installed
check_docker() {
  section "Checking Docker installation"
  
  if ! command -v docker &> /dev/null; then
    echo -e "${RED}Docker is not installed. Please install Docker first.${NC}"
    exit 1
  fi
  
  echo -e "${GREEN}Docker is installed.${NC}"
  
  if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}Docker Compose is not installed. Please install Docker Compose first.${NC}"
    exit 1
  fi
  
  echo -e "${GREEN}Docker Compose is installed.${NC}"
}

# Setup environment file
setup_env() {
  section "Setting up environment file"
  
  if [ ! -f .env ]; then
    echo -e "${YELLOW}Creating .env file from .env.example${NC}"
    cp .env.example .env
    echo -e "${GREEN}.env file created. Please edit it with your specific configuration.${NC}"
    
    # Generate a random password for PostgreSQL
    PG_PASSWORD=$(openssl rand -base64 12 | tr -dc 'a-zA-Z0-9')
    sed -i "s/POSTGRES_PASSWORD=postgres/POSTGRES_PASSWORD=$PG_PASSWORD/" .env
    sed -i "s/postgres:postgres@postgres/postgres:$PG_PASSWORD@postgres/" .env
    
    # Generate JWT secret
    JWT_SECRET=$(openssl rand -base64 32 | tr -dc 'a-zA-Z0-9')
    sed -i "s/JWT_SECRET=dev-secret/JWT_SECRET=$JWT_SECRET/" .env
    
    echo -e "${GREEN}Generated random PostgreSQL password and JWT secret.${NC}"
  else
    echo -e "${GREEN}.env file already exists.${NC}"
  fi
}

# Check if SSL certificates are available
check_ssl() {
  section "Checking SSL certificates"
  
  if [ ! -d "nginx/ssl" ]; then
    mkdir -p nginx/ssl
    echo -e "${YELLOW}Created nginx/ssl directory.${NC}"
  fi
  
  if [ ! -f "nginx/ssl/fullchain.pem" ] || [ ! -f "nginx/ssl/privkey.pem" ]; then
    echo -e "${YELLOW}SSL certificates not found in nginx/ssl/fullchain.pem and nginx/ssl/privkey.pem.${NC}"
    echo -e "${YELLOW}For production deployment, you'll need to add SSL certificates.${NC}"
    echo -e "${YELLOW}You can use Let's Encrypt to obtain free SSL certificates.${NC}"
  else
    echo -e "${GREEN}SSL certificates found.${NC}"
  fi
}

# Create necessary directories
create_directories() {
  section "Creating necessary directories"
  
  # Create uploads directory for images if it doesn't exist
  if [ ! -d "uploads" ]; then
    mkdir -p uploads/{services,blog,projects}
    echo -e "${GREEN}Created uploads directories for services, blog, and projects.${NC}"
  else
    echo -e "${GREEN}Uploads directories already exist.${NC}"
  fi
  
  # Try to set permissions, but don't fail if we can't
  echo -e "${YELLOW}Attempting to set directory permissions...${NC}"
  
  if command -v sudo >/dev/null 2>&1; then
    # Try with sudo first
    if sudo -n true 2>/dev/null; then
      sudo chmod -R 755 uploads 2>/dev/null && \
      echo -e "${GREEN}Successfully set permissions for uploads directory.${NC}" || \
      echo -e "${YELLOW}Could not set permissions with sudo. You may need to manually set permissions.${NC}"
    else
      echo -e "${YELLOW}Sudo requires password. Skipping permission changes.${NC}"
      echo -e "${YELLOW}You may need to manually run: sudo chmod -R 755 uploads${NC}"
    fi
  else
    # Try without sudo as fallback
    chmod -R 755 uploads 2>/dev/null && \
    echo -e "${GREEN}Successfully set permissions for uploads directory.${NC}" || \
    echo -e "${YELLOW}Could not set permissions. You may need to manually run: sudo chmod -R 755 uploads${NC}"
  fi
}

# Update database schema
update_schema() {
  section "Updating database schema"
  
  local compose_file=$1
  local postgres_container=$(docker-compose -f $compose_file ps -q postgres)
  
  if [ -z "$postgres_container" ]; then
    echo -e "${RED}Postgres container not found. Make sure the containers are running.${NC}"
    exit 1
  fi
  
  echo -e "${YELLOW}Applying database schema updates...${NC}"
  
  # SQL commands to update schema
  local sql_commands="
    -- Ensure project_content table exists
    CREATE TABLE IF NOT EXISTS project_content (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      organization TEXT NOT NULL,
      category TEXT,
      bg_image TEXT,
      icon TEXT,
      duration TEXT,
      location TEXT,
      services JSONB DEFAULT '[]'::jsonb,
      order_index INTEGER DEFAULT 0,
      updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
      updated_by INTEGER REFERENCES users(id),
      image TEXT,
      status TEXT DEFAULT 'completed'
    );

    -- Update existing columns if needed
    DO \$\$
    BEGIN
      -- Add status column if it doesn't exist
      IF NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_name = 'project_content'
        AND column_name = 'status'
      ) THEN
        ALTER TABLE project_content ADD COLUMN status TEXT DEFAULT 'completed';
      END IF;

      -- Add services column if it doesn't exist
      IF NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_name = 'project_content'
        AND column_name = 'services'
      ) THEN
        ALTER TABLE project_content ADD COLUMN services JSONB DEFAULT '[]'::jsonb;
      END IF;

      -- Add icon column if it doesn't exist
      IF NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_name = 'project_content'
        AND column_name = 'icon'
      ) THEN
        ALTER TABLE project_content ADD COLUMN icon TEXT;
      END IF;

      -- Add duration column if it doesn't exist
      IF NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_name = 'project_content'
        AND column_name = 'duration'
      ) THEN
        ALTER TABLE project_content ADD COLUMN duration TEXT;
      END IF;

      -- Add location column if it doesn't exist
      IF NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_name = 'project_content'
        AND column_name = 'location'
      ) THEN
        ALTER TABLE project_content ADD COLUMN location TEXT;
      END IF;

      -- Add image column if it doesn't exist
      IF NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_name = 'project_content'
        AND column_name = 'image'
      ) THEN
        ALTER TABLE project_content ADD COLUMN image TEXT;
      END IF;

      -- Make sure description is TEXT type
      IF EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'project_content' 
        AND column_name = 'description' 
        AND data_type = 'jsonb'
      ) THEN
        ALTER TABLE project_content ALTER COLUMN description TYPE text USING description::text;
      END IF;
    END
    \$\$;
  "
  
  # Execute SQL commands in the postgres container
  docker exec $postgres_container psql -U postgres -d pactconsultancy -c "$sql_commands"
  
  if [ $? -eq 0 ]; then
    echo -e "${GREEN}Database schema updated successfully.${NC}"
  else
    echo -e "${RED}Failed to update database schema.${NC}"
    exit 1
  fi
}

# Run database migrations
run_migrations() {
  section "Running database migrations"
  
  echo -e "${YELLOW}Waiting for database to be ready...${NC}"
  sleep 10  # Give PostgreSQL time to initialize
  
  echo -e "${YELLOW}Running database migrations...${NC}"
  # Get the container ID of the app container
  local app_container=$(docker-compose -f $1 ps -q app)
  
  if [ -z "$app_container" ]; then
    echo -e "${RED}App container not found. Make sure the containers are running.${NC}"
    exit 1
  fi
  
  # Update schema first
  update_schema $1
  
  # Run migrations inside the app container - use yes to automatically accept all prompts
  yes | docker exec $app_container npm run db:push
  
  if [ $? -eq 0 ]; then
    echo -e "${GREEN}Database migrations completed successfully.${NC}"
  else
    echo -e "${RED}Database migrations failed.${NC}"
    exit 1
  fi
}

# Build and start containers
build_and_start() {
  section "Building and starting containers"
  
  local compose_file=$1
  
  echo -e "${YELLOW}Building Docker images...${NC}"
  docker-compose -f $compose_file build
  
  echo -e "${YELLOW}Starting containers...${NC}"
  docker-compose -f $compose_file up -d
  
  echo -e "${GREEN}Containers are up and running.${NC}"
  
  # Run migrations after containers are up
  run_migrations $compose_file
}

# Create default admin user
create_admin_user() {
  section "Creating default admin user"
  
  local compose_file=$1
  local app_container=$(docker-compose -f $compose_file ps -q app)
  
  if [ -z "$app_container" ]; then
    echo -e "${RED}App container not found. Make sure the containers are running.${NC}"
    exit 1
  fi
  
  # Check if admin user exists using the API endpoint
  echo -e "${YELLOW}Checking for existing admin user...${NC}"
  local response=$(docker exec $app_container curl -s -o /dev/null -w "%{http_code}" http://localhost:5000/api/auth/check-admin)
  
  if [ "$response" = "200" ]; then
    echo -e "${GREEN}Admin user already exists.${NC}"
  else
    echo -e "${YELLOW}Creating default admin user...${NC}"
    # Generate a random password for admin
    local ADMIN_PASSWORD=$(openssl rand -base64 12 | tr -dc 'a-zA-Z0-9')
    
    local create_response=$(docker exec $app_container curl -s -X POST \
      -H "Content-Type: application/json" \
      -d "{\"username\":\"admin\",\"password\":\"$ADMIN_PASSWORD\",\"role\":\"admin\"}" \
      http://localhost:5000/api/auth/register)
    
    if [ $? -eq 0 ]; then
      echo -e "${GREEN}Default admin user created successfully.${NC}"
      echo -e "${YELLOW}Username: admin${NC}"
      echo -e "${YELLOW}Password: $ADMIN_PASSWORD${NC}"
      echo -e "${YELLOW}Please change this password after first login!${NC}"
    else
      echo -e "${RED}Failed to create default admin user.${NC}"
      echo -e "${RED}Response: $create_response${NC}"
    fi
  fi
}

# Main script
main() {
  # Parse arguments
  local env="dev"
  
  while getopts "e:" opt; do
    case $opt in
      e) env=$OPTARG ;;
      *) echo "Usage: $0 [-e env]" >&2
         exit 1 ;;
    esac
  done
  
  # Check Docker installation
  check_docker
  
  # Setup environment file
  setup_env
  
  # Create necessary directories
  create_directories
  
  # Choose compose file based on environment
  if [ "$env" == "prod" ]; then
    compose_file="docker-compose.prod.yml"
    check_ssl
  else
    compose_file="docker-compose.yml"
  fi
  
  # Build and start containers
  build_and_start $compose_file
  
  # Create default admin user
  create_admin_user $compose_file
  
  section "Deployment Complete"
  
  if [ "$env" == "prod" ]; then
    echo -e "${GREEN}Production environment deployed with Docker Compose.${NC}"
    echo -e "${YELLOW}Make sure to set up proper DNS records for your domain.${NC}"
  else
    echo -e "${GREEN}Development environment deployed with Docker Compose.${NC}"
    echo -e "${YELLOW}Access the application at http://localhost:5000${NC}"
  fi
  
  echo -e "\n${YELLOW}To view logs:${NC}"
  echo -e "docker-compose -f $compose_file logs -f"
  
  echo -e "\n${YELLOW}To stop the application:${NC}"
  echo -e "docker-compose -f $compose_file down"
}

# Run the main function
main "$@"