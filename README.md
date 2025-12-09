# 🎯 PACT Consultancy - Local Development Clone

This repository is a complete clone of the production VPS running at **http://138.68.104.122:5000**

**Cloned:** December 9, 2025  
**Source:** VPS at 138.68.104.122 (Digital Ocean)

---

## 📖 Documentation

Choose your guide based on your needs:

### 🚀 [QUICKSTART.md](QUICKSTART.md) ← **START HERE**
Quick setup guide to get running in minutes

### 📚 [LOCAL_SETUP.md](LOCAL_SETUP.md)
Detailed setup documentation with all options

### 📄 [README.original.md](README.original.md)
Original VPS documentation

---

## ⚡ Super Quick Start

1. **Start Docker Desktop** (Important!)

2. **Run the setup script:**
   ```bash
   ./setup-local.sh
   ```

3. **Access the app:**
   - Frontend: http://localhost:5000
   - Admin: http://localhost:5000/admin

That's it! 🎉

---

## 📁 What's Included

✅ Complete source code  
✅ All dependencies (package.json)  
✅ Docker configuration  
✅ Database backup (6.5 MB compressed)  
✅ Uploaded files (images, assets)  
✅ Environment templates  
✅ Setup scripts  

---

## 🛠️ Available Scripts

| Script | Purpose |
|--------|---------|
| ./setup-local.sh | Complete setup (first time) |
| ./restore-db.sh | Restore production database |
| docker-compose up | Start application |
| docker-compose down | Stop application |
| npm run dev | Development mode (without Docker) |

---

## 🏗️ Tech Stack

- **Frontend:** React + TypeScript + Vite + TailwindCSS
- **Backend:** Express + Node.js + TypeScript
- **Database:** PostgreSQL 15
- **ORM:** Drizzle ORM
- **UI Components:** Radix UI
- **Deployment:** Docker + Docker Compose

---

**Ready to start?** 👉 Check out [QUICKSTART.md](QUICKSTART.md)!
