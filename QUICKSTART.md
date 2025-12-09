# 🚀 Quick Start Guide - PACT Consultancy Local Development

## Cloned from VPS: http://138.68.104.122:5000

---

## ✅ Prerequisites Checklist

- [ ] Docker Desktop installed and **RUNNING** ⚠️ 
- [ ] Node.js v18+ installed
- [ ] Terminal/Command line access

---

## 🎯 Option 1: Quick Start with Docker (Easiest)

### Step 1: Start Docker Desktop
**IMPORTANT:** Make sure Docker Desktop is running before proceeding!

### Step 2: Run the setup script
```bash
./setup-local.sh
```

This will:
- Create your `.env` file
- Install dependencies
- Start the application in Docker
- Set up the database

### Step 3: Access the application
- **Frontend:** http://localhost:5000
- **Admin Panel:** http://localhost:5000/admin

Use your VPS admin credentials to log in.

---

## 🛠️ Option 2: Manual Setup

### Step 1: Copy environment file
```bash
cp .env.local .env
```

### Step 2: Install dependencies
```bash
npm install
```

### Step 3: Start with Docker Compose
```bash
docker-compose up --build
```

Wait for the containers to start, then access:
- **Frontend:** http://localhost:5000
- **Admin Panel:** http://localhost:5000/admin

---

## 📊 Restoring Production Database (Optional)

If you want the exact production data:

### Step 1: Extract the database backup
```bash
tar -xjf pact_postgres-data.tar.bz2
```

### Step 2: Stop containers
```bash
docker-compose down -v
```

### Step 3: Start fresh database
```bash
docker-compose up -d postgres
```

### Step 4: Wait for database to be ready (about 10 seconds)
```bash
sleep 10
```

### Step 5: Copy data to container
```bash
docker cp ./var/lib/postgresql/data/. pact_postgres_1:/var/lib/postgresql/data/
docker-compose restart postgres
```

### Step 6: Start the app
```bash
docker-compose up -d
```

---

## 🔧 Useful Commands

### View logs
```bash
docker-compose logs -f
```

### Stop everything
```bash
docker-compose down
```

### Restart
```bash
docker-compose restart
```

### Clean start (removes all data)
```bash
docker-compose down -v
docker-compose up --build
```

### Check running containers
```bash
docker ps
```

---

## 🆘 Troubleshooting

### "Cannot connect to Docker daemon"
**Solution:** Start Docker Desktop and wait for it to fully start.

### Port 5000 already in use
**Solution:** 
1. Stop other services using port 5000, OR
2. Change the port in `.env` and `docker-compose.yml`

### Database connection errors
**Solution:**
```bash
docker-compose down -v
docker-compose up --build
```

### Can't access admin panel
**Solution:**
- Make sure you're using the correct admin credentials from VPS
- Check that the app container is running: `docker ps`
- Check logs: `docker-compose logs app`

### Missing images/uploads
**Solution:** Download them from VPS:
```bash
rsync -avz -e ssh root@138.68.104.122:/root/pact/uploads/ ./uploads/
```

---

## 📁 Project Structure

```
pact-local/
├── client/              # React frontend
├── server/              # Express backend
├── uploads/             # Uploaded files
├── docker-compose.yml   # Docker configuration
├── .env                 # Local environment variables
├── .env.local           # Template for local dev
└── LOCAL_SETUP.md       # Detailed documentation
```

---

## 🔐 Admin Credentials

Use the same credentials from the VPS:
- URL: http://localhost:5000/admin
- Username: [Your VPS admin username]
- Password: [Your VPS admin password]

---

## 📚 More Information

For detailed documentation, see [LOCAL_SETUP.md](LOCAL_SETUP.md)

---

## 💡 Quick Development Workflow

1. Start Docker Desktop
2. Run `./setup-local.sh` (first time only)
3. Make your changes to code
4. Changes auto-reload (hot-reload enabled)
5. Test at http://localhost:5000
6. Stop with `docker-compose down` when done

---

## 🌐 Production Info

- **VPS IP:** 138.68.104.122
- **Production URL:** http://138.68.104.122:5000
- **Cloned on:** December 9, 2025
- **Database Backup:** pact_postgres-data.tar.bz2 (included)

---

## ⚡ Next Steps

1. ✅ **Start Docker Desktop** ← Do this first!
2. ✅ Run `./setup-local.sh`
3. ✅ Open http://localhost:5000
4. ✅ Start coding!

---

**Need help?** Check [LOCAL_SETUP.md](LOCAL_SETUP.md) for troubleshooting and advanced options.
