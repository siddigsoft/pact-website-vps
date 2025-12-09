#!/bin/bash

# PACT Consultancy - Database Restore Script
# This script restores the production database backup to your local environment

echo "=========================================="
echo "PACT Database Restore Utility"
echo "=========================================="
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running!"
    echo "Please start Docker Desktop first."
    exit 1
fi

# Check if backup file exists
if [ ! -f "pact_postgres-data.tar.bz2" ]; then
    echo "❌ Database backup file not found!"
    echo "Expected: pact_postgres-data.tar.bz2"
    exit 1
fi

echo "⚠️  WARNING: This will replace your local database with production data!"
echo ""
read -p "Are you sure you want to continue? (yes/no): " confirm

if [ "$confirm" != "yes" ]; then
    echo "Restore cancelled."
    exit 0
fi

echo ""
echo "Step 1: Extracting backup..."
tar -xjf pact_postgres-data.tar.bz2

if [ ! -d "var/lib/postgresql/data" ]; then
    echo "❌ Failed to extract backup data"
    exit 1
fi

echo "✓ Backup extracted"

echo ""
echo "Step 2: Stopping existing containers..."
docker-compose down -v

echo "✓ Containers stopped"

echo ""
echo "Step 3: Starting fresh database..."
docker-compose up -d postgres

echo "✓ Waiting for PostgreSQL to initialize (15 seconds)..."
sleep 15

echo ""
echo "Step 4: Finding container name..."
CONTAINER_NAME=$(docker ps --filter "name=postgres" --format "{{.Names}}" | head -1)

if [ -z "$CONTAINER_NAME" ]; then
    echo "❌ Could not find PostgreSQL container"
    exit 1
fi

echo "✓ Found container: $CONTAINER_NAME"

echo ""
echo "Step 5: Copying data to container..."
docker cp ./var/lib/postgresql/data/. $CONTAINER_NAME:/var/lib/postgresql/data/

echo "✓ Data copied"

echo ""
echo "Step 6: Restarting PostgreSQL..."
docker-compose restart postgres

echo "✓ Waiting for PostgreSQL to start (10 seconds)..."
sleep 10

echo ""
echo "Step 7: Starting application..."
docker-compose up -d

echo ""
echo "=========================================="
echo "✓ Database Restore Complete!"
echo "=========================================="
echo ""
echo "Your local database now has the production data."
echo ""
echo "Access the application at:"
echo "  http://localhost:5000"
echo ""
echo "Cleaning up extracted files..."
rm -rf var/

echo "✓ Done!"
