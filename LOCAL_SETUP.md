# PACT Consultancy - Local Development Setup

This is a clone of the production VPS running at http://138.68.104.122:5000/admin

## Prerequisites

- Node.js (v18 or higher)
- Docker and Docker Compose
- Git (optional)

## Quick Start

### Option 1: Run with Docker Compose (Recommended)

1. **Copy the environment file:**
   ```bash
   cp .env.local .env
   ```

2. **Start the application with Docker:**
   ```bash
   docker-compose up --build
   ```

   The application will be available at:
   - Frontend: http://localhost:5000
   - Admin Panel: http://localhost:5000/admin
   - Database: localhost:5432

### Option 2: Run Locally (Without Docker)

1. **Start PostgreSQL database:**
   ```bash
   # Option A: Using Docker for just the database
   docker run -d \
     --name pact-postgres \
     -e POSTGRES_USER=postgres \
     -e POSTGRES_PASSWORD=postgres \
     -e POSTGRES_DB=pactconsultancy \
     -p 5432:5432 \
     postgres:15-alpine

   # Option B: Use a locally installed PostgreSQL
   # Make sure PostgreSQL is running and create a database named 'pactconsultancy'
   ```

2. **Copy the environment file:**
   ```bash
   cp .env.local .env
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Run database migrations:**
   ```bash
   npm run db:push
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```

   The application will be available at:
   - Frontend: http://localhost:5000
   - Admin Panel: http://localhost:5000/admin

## Restoring Production Database

If you want to restore the production database backup:

1. **Extract the database backup:**
   ```bash
   tar -xjf pact_postgres-data.tar.bz2
   ```

2. **Stop the running database container:**
   ```bash
   docker-compose down
   ```

3. **Start a fresh PostgreSQL container:**
   ```bash
   docker-compose up -d postgres
   ```

4. **Copy the data into the container:**
   ```bash
   docker cp ./var/lib/postgresql/data/. pact_postgres_1:/var/lib/postgresql/data/
   docker-compose restart postgres
   ```

   Or use pg_restore if you have a SQL dump:
   ```bash
   # If you have a .sql file
   docker exec -i pact_postgres_1 psql -U postgres -d pactconsultancy < backup.sql
   ```

## Admin Panel Access

Based on the VPS configuration, you can access the admin panel at:
- URL: http://localhost:5000/admin
- Use your existing admin credentials from the VPS

## Project Structure

```
.
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── api/           # API client functions
│   │   └── ...
├── server/                # Backend Express application
│   ├── routes.ts          # API routes
│   ├── db.ts              # Database configuration
│   └── migrations/        # Database migrations
├── shared/                # Shared types and schemas
├── uploads/               # Uploaded files
├── docker-compose.yml     # Docker configuration
├── Dockerfile             # Docker image definition
└── package.json           # Project dependencies
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run db:push` - Push database schema changes
- `npm run check` - Type check

## Technologies Used

- **Frontend:** React, TypeScript, Vite, TailwindCSS, Radix UI
- **Backend:** Express, Node.js, TypeScript
- **Database:** PostgreSQL 15
- **ORM:** Drizzle ORM
- **Containerization:** Docker

## Environment Variables

Key environment variables (see `.env.local`):

- `NODE_ENV` - Environment (development/production)
- `PORT` - Server port (default: 5000)
- `DATABASE_URL` - PostgreSQL connection string
- `SESSION_SECRET` - Session encryption key
- `JWT_SECRET` - JWT token secret
- `VITE_API_URL` - API endpoint for frontend

## Troubleshooting

### Database Connection Issues

If you can't connect to the database:
- Check if PostgreSQL is running: `docker ps`
- Verify the DATABASE_URL in `.env`
- Check container logs: `docker logs pact_postgres_1`

### Port Already in Use

If port 5000 is already in use:
- Change the PORT in `.env`
- Update the port mapping in `docker-compose.yml`

### Missing Uploads/Images

The uploads directory was excluded from the sync. If you need the production uploads:
```bash
rsync -avz -e ssh root@138.68.104.122:/root/pact/uploads/ ./uploads/
```

## Production Info

- **VPS IP:** 138.68.104.122
- **Production URL:** http://138.68.104.122:5000
- **Admin Panel:** http://138.68.104.122:5000/admin
- **Database:** PostgreSQL 15-alpine running in Docker

## Notes

- The `.env` file from VPS contains production credentials
- `.env.local` is configured for local development
- Never commit `.env` files to version control
- The VPS uses Docker Compose in production mode
