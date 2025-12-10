#!/bin/bash

# PACT Consultancy - Local Setup Script
echo "=========================================="
echo "PACT Consultancy - Local Setup"
echo "=========================================="
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "✓ Creating .env file from env.example..."
    cp env.example .env
else
    echo "✓ .env file already exists"
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "✓ Installing npm dependencies..."
    npm install
else
    echo "✓ Node modules already installed"
fi

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo ""
    echo "❌ Docker is not running!"
    echo ""
    echo "Please start Docker Desktop and run this script again."
    echo ""
    echo "After starting Docker, you can run:"
    echo "  ./setup-local.sh"
    exit 1
fi

echo "✓ Docker is running"

# Start Docker Compose
echo ""
echo "Starting Docker containers..."
docker-compose up -d

echo ""
echo "=========================================="
echo "Setup Complete!"
echo "=========================================="
echo ""
echo "The application is starting..."
echo ""
echo "Access the application at:"
echo "  - Frontend: http://localhost:5000"
echo "  - Admin Panel: http://localhost:5000/admin"
echo ""
echo "To view logs:"
echo "  docker-compose logs -f"
echo ""
echo "To stop the application:"
echo "  docker-compose down"
echo ""
