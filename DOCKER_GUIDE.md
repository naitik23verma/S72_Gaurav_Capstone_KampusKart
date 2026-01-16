# KampusKart Docker Guide

## 📦 Overview

This guide covers Docker containerization for the KampusKart application, including backend API, frontend, and MongoDB database.

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Docker Network                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Frontend   │  │   Backend    │  │   MongoDB    │  │
│  │   (Nginx)    │──│   (Node.js)  │──│   (Mongo)    │  │
│  │   Port: 80   │  │  Port: 5000  │  │ Port: 27017  │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
│         │                                      │         │
│         └──────────────────────────────────────┘         │
│              Mongo Express (Optional)                    │
│                   Port: 8081                             │
└─────────────────────────────────────────────────────────┘
```

---

## 🚀 Quick Start

### Prerequisites
- Docker Desktop installed (Windows/Mac) or Docker Engine (Linux)
- Docker Compose v2.0+
- 4GB+ RAM available
- 10GB+ disk space

### 1. Clone and Setup
```bash
cd S72_Gaurav_Capstone_KampusKart

# Copy environment file
cp .env.docker.example .env.docker

# Edit .env.docker with your values
# At minimum, change JWT_SECRET and MongoDB passwords
```

### 2. Production Mode
```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Access the application
# Frontend: http://localhost:3000
# Backend: http://localhost:5000
# MongoDB: localhost:27017
```

### 3. Development Mode
```bash
# Start with hot-reload enabled
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up

# With Mongo Express admin UI
docker-compose -f docker-compose.yml -f docker-compose.dev.yml --profile debug up
```

---

## 📋 Services

### 1. MongoDB (Database)
- **Image**: mongo:7.0
- **Port**: 27017
- **Volumes**: Persistent data storage
- **Health Check**: Automatic ping test

### 2. Backend (Node.js API)
- **Base Image**: node:20-alpine
- **Port**: 5000
- **Features**:
  - Multi-stage build (dev/prod)
  - Non-root user for security
  - Health check endpoint
  - Hot-reload in dev mode

### 3. Frontend (React + Nginx)
- **Base Image**: node:20-alpine (build), nginx:alpine (serve)
- **Port**: 80 (production), 5173 (development)
- **Features**:
  - Optimized production build
  - Nginx with gzip compression
  - SPA routing support
  - Security headers

### 4. Mongo Express (Optional)
- **Image**: mongo-express:latest
- **Port**: 8081
- **Purpose**: Database admin UI
- **Profile**: debug (disabled by default)

---

## 🛠️ Docker Commands

### Basic Operations
```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# Restart a specific service
docker-compose restart backend

# View logs
docker-compose logs -f backend

# View all container status
docker-compose ps

# Execute command in container
docker-compose exec backend npm run seed
```

### Build Commands
```bash
# Build all images
docker-compose build

# Build specific service
docker-compose build backend

# Build without cache
docker-compose build --no-cache

# Pull latest images
docker-compose pull
```

### Development Commands
```bash
# Start in development mode
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up

# Start with Mongo Express
docker-compose --profile debug up

# Rebuild and start
docker-compose up --build

# View real-time logs
docker-compose logs -f --tail=100
```

### Cleanup Commands
```bash
# Stop and remove containers
docker-compose down

# Remove containers and volumes
docker-compose down -v

# Remove containers, volumes, and images
docker-compose down -v --rmi all

# Prune unused Docker resources
docker system prune -a
```

---

## 🔧 Configuration

### Environment Variables

**Required Variables** (`.env.docker`):
```bash
# Security
JWT_SECRET=your-secret-key-here
MONGO_ROOT_PASSWORD=secure-password

# Cloudinary (for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**Optional Variables**:
```bash
# Build target
BUILD_TARGET=production  # or development

# Node environment
NODE_ENV=production      # or development

# Custom ports
BACKEND_PORT=5000
FRONTEND_PORT=3000
```

### Multi-Stage Builds

**Backend Dockerfile Stages**:
1. **base**: Production dependencies only
2. **development**: All dependencies + nodemon
3. **production**: Optimized with non-root user

**Frontend Dockerfile Stages**:
1. **build**: Compile React app
2. **development**: Vite dev server
3. **production**: Nginx serving static files

---

## 📊 Health Checks

### Backend Health Check
```bash
# Manual check
curl http://localhost:5000/api/health

# Docker health status
docker-compose ps backend
```

### Frontend Health Check
```bash
# Manual check
curl http://localhost:3000/health

# Docker health status
docker-compose ps frontend
```

### MongoDB Health Check
```bash
# Docker health status
docker-compose ps mongodb

# Connect to MongoDB
docker-compose exec mongodb mongosh -u admin -p password123
```

---

## 🔍 Troubleshooting

### Issue: Port Already in Use
```bash
# Find process using port
netstat -ano | findstr :5000  # Windows
lsof -i :5000                 # Mac/Linux

# Change port in docker-compose.yml
ports:
  - "5001:5000"  # Map to different host port
```

### Issue: Container Won't Start
```bash
# Check logs
docker-compose logs backend

# Check container status
docker-compose ps

# Restart service
docker-compose restart backend
```

### Issue: Database Connection Failed
```bash
# Verify MongoDB is running
docker-compose ps mongodb

# Check MongoDB logs
docker-compose logs mongodb

# Verify connection string
docker-compose exec backend env | grep MONGODB_URI
```

### Issue: Build Fails
```bash
# Clear Docker cache
docker-compose build --no-cache

# Remove old images
docker image prune -a

# Check disk space
docker system df
```

### Issue: Volume Permission Errors
```bash
# On Linux, fix permissions
sudo chown -R $USER:$USER ./

# Or run with sudo
sudo docker-compose up
```

---

## 🔐 Security Best Practices

### 1. Use Non-Root Users
```dockerfile
# Already implemented in Dockerfiles
USER nodejs  # Backend
USER nginx-user  # Frontend
```

### 2. Secure Environment Variables
```bash
# Never commit .env.docker
echo ".env.docker" >> .gitignore

# Use Docker secrets in production
docker secret create jwt_secret ./jwt_secret.txt
```

### 3. Limit Container Resources
```yaml
# Add to docker-compose.yml
services:
  backend:
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 512M
```

### 4. Regular Updates
```bash
# Update base images
docker-compose pull
docker-compose up -d --build
```

---

## 📈 Performance Optimization

### 1. Multi-Stage Builds
- Reduces final image size by 60-70%
- Separates build and runtime dependencies

### 2. Layer Caching
```dockerfile
# Copy package.json first for better caching
COPY package*.json ./
RUN npm ci
COPY . .
```

### 3. .dockerignore
- Excludes unnecessary files
- Speeds up build context transfer

### 4. Production Optimizations
- Gzip compression (Nginx)
- Static asset caching
- Minified JavaScript bundles

---

## 🚢 Deployment

### Deploy to Production Server

```bash
# 1. Copy files to server
scp -r . user@server:/app/kampuskart

# 2. SSH into server
ssh user@server

# 3. Navigate to app directory
cd /app/kampuskart

# 4. Set environment variables
cp .env.docker.example .env.docker
nano .env.docker

# 5. Start services
docker-compose up -d

# 6. Verify deployment
docker-compose ps
curl http://localhost:5000/api/health
```

### Using Docker Hub

```bash
# 1. Build images
docker-compose build

# 2. Tag images
docker tag kampuskart-backend:latest yourusername/kampuskart-backend:v1.0
docker tag kampuskart-frontend:latest yourusername/kampuskart-frontend:v1.0

# 3. Push to Docker Hub
docker push yourusername/kampuskart-backend:v1.0
docker push yourusername/kampuskart-frontend:v1.0

# 4. Pull on production server
docker pull yourusername/kampuskart-backend:v1.0
docker pull yourusername/kampuskart-frontend:v1.0
```

---

## 📊 Monitoring

### View Resource Usage
```bash
# Real-time stats
docker stats

# Specific container
docker stats kampuskart-backend

# Disk usage
docker system df
```

### View Logs
```bash
# All services
docker-compose logs

# Specific service with tail
docker-compose logs -f --tail=50 backend

# Since specific time
docker-compose logs --since 30m backend
```

---

## 🧪 Testing in Docker

### Run Tests
```bash
# Backend tests (when implemented)
docker-compose exec backend npm test

# Frontend tests
docker-compose exec frontend npm test

# Run seed data
docker-compose exec backend npm run seed
```

---

## 📁 File Structure

```
S72_Gaurav_Capstone_KampusKart/
├── docker-compose.yml           # Main compose file
├── docker-compose.dev.yml       # Development overrides
├── .env.docker.example          # Environment template
├── DOCKER_GUIDE.md             # This file
├── backend/
│   ├── Dockerfile              # Backend container config
│   └── .dockerignore           # Exclude files
└── frontend/
    ├── Dockerfile              # Frontend container config
    ├── nginx.conf              # Nginx configuration
    └── .dockerignore           # Exclude files
```

---

## 🎯 Common Workflows

### Daily Development
```bash
# Start services
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up

# Make code changes (auto-reload enabled)

# View logs
docker-compose logs -f backend

# Stop services
docker-compose down
```

### Testing Changes
```bash
# Rebuild after dependency changes
docker-compose up --build

# Run tests
docker-compose exec backend npm test
docker-compose exec frontend npm test

# Seed database
docker-compose exec backend npm run seed
```

### Production Deployment
```bash
# Build production images
docker-compose build

# Start in production mode
docker-compose up -d

# Verify health
curl http://localhost:5000/api/health
curl http://localhost:3000/health

# Monitor logs
docker-compose logs -f
```

---

## 📚 Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Node.js Docker Best Practices](https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md)
- [Nginx Docker Documentation](https://hub.docker.com/_/nginx)

---

## ✅ Checklist

- [ ] Docker Desktop installed
- [ ] .env.docker configured
- [ ] All services start successfully
- [ ] Health checks passing
- [ ] Frontend accessible at localhost:3000
- [ ] Backend API responding at localhost:5000
- [ ] MongoDB connected
- [ ] Logs show no errors

---

**Last Updated**: January 17, 2026  
**Version**: 1.0.0  
**Status**: ✅ Production Ready
