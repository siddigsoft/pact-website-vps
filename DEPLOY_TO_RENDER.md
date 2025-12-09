# 🚀 Deploy to Render Guide

This guide will help you deploy your PACT Consultancy website to Render.

---

## ✅ Prerequisites

- [x] GitHub account
- [x] Render account (free tier is fine)
- [x] Neon database (you already have this!)
- [x] Code is working locally

---

## 📋 Step-by-Step Deployment

### STEP 1: Initialize Git Repository

```bash
cd "/Users/sgeorge/Desktop/PACT CONSULTANCY/Pact website lovable/Pact website vps/vps/pact-local"

# Initialize git
git init

# Add all files (except those in .gitignore)
git add .

# Make first commit
git commit -m "Initial commit - PACT Consultancy website"
```

### STEP 2: Create GitHub Repository

1. Go to https://github.com/new
2. Create a new repository (name it something like `pact-consultancy`)
3. **Do NOT** initialize with README, .gitignore, or license (we already have these)
4. Click "Create repository"

### STEP 3: Push Code to GitHub

```bash
# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/pact-consultancy.git

# Push your code
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

### STEP 4: Deploy on Render

#### Option A: Using Render Dashboard (Recommended)

1. **Go to Render Dashboard**
   - Visit https://dashboard.render.com/
   - Sign up or log in

2. **Create New Web Service**
   - Click "New +" button
   - Select "Web Service"
   - Connect your GitHub account if not already connected
   - Select your `pact-consultancy` repository

3. **Configure the Service**
   
   **Name:** `pact-consultancy` (or your preferred name)
   
   **Region:** Oregon (US West) or closest to you
   
   **Branch:** `main`
   
   **Runtime:** `Docker`
   
   **Instance Type:** `Free`

4. **Set Environment Variables**
   
   Click "Advanced" and add these environment variables:
   
   ```
   NODE_ENV = production
   PORT = 5000
   DATABASE_URL = postgresql://neondb_owner:npg_aTqvez1r0bkA@ep-holy-sea-ahwpuzyd-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require
   SESSION_SECRET = [generate a random string, like: your-super-secret-session-key-123456]
   JWT_SECRET = [generate another random string, like: your-jwt-secret-key-789012]
   ```
   
   **Important:** Generate secure random strings for SESSION_SECRET and JWT_SECRET!

5. **Deploy!**
   - Click "Create Web Service"
   - Render will automatically:
     - Pull your code from GitHub
     - Build the Docker image
     - Deploy your application
     - Assign you a URL like: `https://pact-consultancy.onrender.com`

#### Option B: Using render.yaml (Automatic)

If you want automatic deployment:

1. The `render.yaml` file is already in your repository
2. Go to https://dashboard.render.com/select-repo?type=blueprint
3. Select your repository
4. Render will read the `render.yaml` and configure everything automatically
5. You'll still need to add the `DATABASE_URL` manually in the dashboard

---

## 🔐 Important Security Notes

### Update .gitignore

Make sure these files are NOT committed to Git:

```
node_modules/
dist/
.env
*.tar.bz2
*.log
.DS_Store
```

These are already in your `.gitignore` ✓

### Environment Variables

**NEVER commit these to Git:**
- DATABASE_URL (with password)
- SESSION_SECRET
- JWT_SECRET

These should only be set in Render's environment variables dashboard.

---

## 🎯 After Deployment

### 1. Check Your Deployment

Once deployed, Render will give you a URL like:
```
https://pact-consultancy.onrender.com
```

Visit this URL to see your live website!

### 2. Admin Panel Access

Access your admin panel at:
```
https://pact-consultancy.onrender.com/admin
```

Use the same credentials you use for your Neon database.

### 3. Custom Domain (Optional)

To use your own domain:
1. Go to your Render service settings
2. Click "Custom Domain"
3. Add your domain (e.g., `pactconsultancy.com`)
4. Follow DNS setup instructions

---

## 🔄 Updating Your Site

After deployment, whenever you want to update your site:

```bash
# Make your changes to the code

# Commit changes
git add .
git commit -m "Description of changes"

# Push to GitHub
git push origin main
```

Render will **automatically detect the push** and redeploy! 🎉

---

## 🐛 Troubleshooting

### Build Fails

**Check the build logs** in Render dashboard:
- Look for error messages
- Common issues: missing dependencies, wrong Node version

### Database Connection Issues

- Verify DATABASE_URL is correct in environment variables
- Make sure Neon database is accessible
- Check if Neon has IP restrictions

### Application Won't Start

Check logs in Render dashboard:
```bash
# In Render dashboard, go to "Logs" tab
```

Common issues:
- Wrong PORT environment variable
- Database migration failed
- Missing environment variables

### Free Tier Limitations

Render free tier:
- Spins down after 15 minutes of inactivity
- First request after spin-down takes ~30 seconds
- 750 hours per month (enough for one service)

---

## 💡 Pro Tips

### 1. Keep Database Backup

Your Neon database is already your primary database. Always keep backups!

### 2. Monitor Logs

Render provides real-time logs in the dashboard. Check them regularly.

### 3. Set Up Alerts

Configure email alerts in Render for deployment failures.

### 4. Use Staging Environment

Consider creating a separate branch (e.g., `staging`) for testing before deploying to main.

---

## 📊 Cost Estimation

**Free Tier (What you'll use):**
- Web Service: FREE (with limitations)
- Database: FREE on Neon (5GB storage)
- Total: $0/month

**Paid Options (if needed later):**
- Render Starter Plan: $7/month (no spin-down)
- Render Standard: $25/month (more resources)

---

## ✅ Checklist Before Deploying

- [ ] Code works locally
- [ ] All sensitive data removed from code
- [ ] .env file is in .gitignore
- [ ] GitHub repository created
- [ ] Code pushed to GitHub
- [ ] Render account created
- [ ] DATABASE_URL ready
- [ ] SESSION_SECRET generated
- [ ] JWT_SECRET generated

---

## 🎉 Summary

**What happens when you deploy:**

1. You push code to GitHub
2. Render detects the push
3. Render builds Docker image
4. Render runs database migrations
5. Render starts your application
6. Your site is live at `https://your-app.onrender.com`!

**Time to deploy:** ~5-10 minutes for first deployment

---

## 📞 Need Help?

- **Render Docs:** https://render.com/docs
- **Render Discord:** https://render.com/discord
- **Neon Docs:** https://neon.tech/docs

---

## 🚀 Ready to Deploy?

Run these commands now:

```bash
cd "/Users/sgeorge/Desktop/PACT CONSULTANCY/Pact website lovable/Pact website vps/vps/pact-local"
git init
git add .
git commit -m "Initial commit"
```

Then create your GitHub repository and follow STEP 3!

Good luck! 🎉
