# 🎯 PACT Consultancy Website

Full-stack web application for PACT Consultancy - a professional consulting firm showcasing services, projects, team members, and client portfolio.

**Live Site:** http://138.68.104.122:5000  
**Cloned:** December 9, 2025

---

## 🚀 Quick Start - Run Locally in 5 Minutes

### Prerequisites
- **Docker Desktop** installed and running ([Download here](https://www.docker.com/products/docker-desktop))
- **Git** installed
- **macOS/Linux** (Windows users: use WSL2)

### Installation Steps

1. **Clone this repository:**
   ```bash
   git clone https://github.com/Ssemaganda-George/pact-website-vps.git
   cd pact-website-vps
   ```

2. **Create environment file:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your database URL:
   ```env
   DATABASE_URL=postgresql://neondb_owner:npg_aTqvez1r0bkA@ep-holy-sea-ahwpuzyd-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require
   PORT=5000
   NODE_ENV=development
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Start with Docker:**
   ```bash
   docker-compose up -d
   ```
   
   Or run without Docker:
   ```bash
   npm run dev
   ```

5. **Access the website:**
   - **Homepage:** http://localhost:5000
   - **Admin Panel:** http://localhost:5000/admin
   - **Login:** username: `admin`, password: `admin123`

That's it! 🎉 The website is now running on your machine.

---

## � What's Inside

```
pact-website-vps/
├── client/              # React frontend
│   ├── src/
│   │   ├── components/  # UI components
│   │   ├── pages/       # Page components
│   │   ├── api/         # API client functions
│   │   └── context/     # React context providers
│   └── public/          # Static assets
├── server/              # Express backend
│   ├── routes.ts        # API routes
│   ├── db.ts           # Database connection
│   └── migrations/      # SQL migrations
├── uploads/             # User uploaded images
├── docker-compose.yml   # Docker configuration
├── Dockerfile          # Container definition
└── .env                # Environment variables (create from .env.example)
```

---

## 🛠️ Development Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install all dependencies |
| `npm run dev` | Start development server (port 5000) |
| `docker-compose up -d` | Start with Docker (recommended) |
| `docker-compose down` | Stop Docker containers |
| `docker-compose logs -f` | View Docker logs |
| `npm run build` | Build for production |

---

## 🔧 Troubleshooting

### Port 5000 already in use (macOS)
macOS AirPlay uses port 5000 by default. To fix:
1. Go to **System Settings** → **General** → **AirDrop & Handoff**
2. Turn off **AirPlay Receiver**
3. Restart the app

### Docker not starting
1. Make sure Docker Desktop is running
2. Check Docker status: `docker ps`
3. Restart Docker Desktop if needed

### Database connection errors
1. Check your `.env` file has the correct `DATABASE_URL`
2. Make sure you copied from `.env.example`
3. Verify the Neon database is accessible

### White screen or errors
1. Clear browser cache
2. Check Docker logs: `docker-compose logs -f`
3. Restart containers: `docker-compose restart`

---

## 🏗️ Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **Radix UI** - Component primitives
- **React Query** - Data fetching

### Backend
- **Node.js 20** - Runtime
- **Express** - Web framework
- **TypeScript** - Type safety
- **Drizzle ORM** - Database toolkit

### Database
- **PostgreSQL 15** - Relational database
- **Neon** - Cloud database hosting

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Render** - Production hosting (coming soon)

---

## 📚 Admin Panel Features

Access at http://localhost:5000/admin

- ✅ Content Management (Services, Projects, Team, Blog)
- ✅ Client Portfolio Management
- ✅ Hero Slider Editor
- ✅ About Page Editor
- ✅ Contact Form Messages
- ✅ Location Management
- ✅ Statistics Dashboard

**Default Admin Login:**
- Username: `admin`
- Password: `admin123`

⚠️ **Change these credentials in production!**

---

## 🚢 Deployment

### Deploy to Render (Free Hosting)

1. **Push to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Go to [Render Dashboard](https://dashboard.render.com)**

3. **Create New Web Service:**
   - Connect your GitHub repository
   - Runtime: **Docker**
   - Plan: **Free**

4. **Add Environment Variables:**
   ```
   DATABASE_URL=postgresql://neondb_owner:npg_aTqvez1r0bkA@ep-holy-sea-ahwpuzyd-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require
   NODE_ENV=production
   PORT=5000
   SESSION_SECRET=your-random-secret-here
   JWT_SECRET=your-jwt-secret-here
   ```

5. **Deploy!** Render will automatically build and deploy your app.

See [DEPLOY_TO_RENDER.md](DEPLOY_TO_RENDER.md) for detailed deployment instructions.

---

## 🤝 Contributing

This is a private project for PACT Consultancy. If you have access and want to contribute:

1. Create a new branch: `git checkout -b feature/your-feature`
2. Make your changes
3. Commit: `git commit -m "Add your feature"`
4. Push: `git push origin feature/your-feature`
5. Create a Pull Request

---

## 📄 License

Private & Confidential - PACT Consultancy © 2025

---

## 💬 Support

Need help? Contact the development team or check:
- [QUICKSTART.md](QUICKSTART.md) - Quick setup guide
- [LOCAL_SETUP.md](LOCAL_SETUP.md) - Detailed setup docs
- [DEPLOY_TO_RENDER.md](DEPLOY_TO_RENDER.md) - Deployment guide

---

**Made with ❤️ for PACT Consultancy**
