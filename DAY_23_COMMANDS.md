# Day 23 Commands - Docker Containerization

## 🚀 Quick Start Commands

```bash
# Navigate to project root
cd S72_Gaurav_Capstone_KampusKart

# Copy environment file
cp .env.docker.example .env.docker

# Edit environment variables (required)
# Change JWT_SECRET, MongoDB passwords, and add Cloudinary/OAuth credentials

# Start all services in production mode
docker-compose up -d

# View logs
docker-compose logs -f

# Check service status
docker-compose ps

# Access the application
# Frontend: http://localhost:3000
# Backend: http://localhost:5000
# MongoDB: localhost:27017
```

---

## 🐳 Docker Installation

### Windows
```bash
# Download Docker Desktop from docker.com
# Install and restart
# Verify installation
docker --version
docker-compose --version
```

### Mac
```bash
# Using Homebrew
brew install --cask docker

# Or download Docker Desktop from docker.com
# Verify installation
docker --version
docker-compose --version
```

### Linux (Ubuntu/Debian)
```bash
# Update package index
sudo apt-get update

# Install Docker
sudo apt-get install docker.io docker-compose

# Add user to docker group
sudo usermod -aG docker $USER

# Verify installation
docker --version
docker-compose --version
```

---

## 🏗️ Build Commands

```bash
# Build all images
docker-compose build

# Build specific service
docker-compose build backend
docker-compose build frontend

# Build without cache (clean build)
docker-compose build --no-cache

# Build with specific target
docker-compose build --build-arg BUILD_TARGET=development

# Build in parallel
docker-compose build --parallel

# Pull latest base images before building
docker-compose build --pull
```

---

## 🚀 Start/Stop Commands

### Production Mode
```bash
# Start all services (detached)
docker-compose up -d

# Start with build
docker-compose up -d --build

# Start specific services
docker-compose up -d backend mongodb

# Stop all services
docker-compose down

# Stop and remove volumes
docker-compose down -v

# Stop and remove images
docker-compose down --rmi all
```

### Development Mode
```bash
# Start with hot-reload
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up

# Start in background
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d

# With Mongo Express (database admin UI)
docker-compose --profile debug up

# Stop development services
docker-compose -f docker-compose.yml -f docker-compose.dev.yml down
```

---

## 📊 Monitoring Commands

### View Logs
```bash
# All services
docker-compose logs

# Follow logs (real-time)
docker-compose logs -f

# Specific service
docker-compose logs backend
docker-compose logs -f frontend

# Last 100 lines
docker-compose logs --tail=100

# Since specific time
docker-compose logs --since 30m backend
docker-compose logs --since 2026-01-17T10:00:00

# Timestamps
docker-compose logs -t
```

### Service Status
```bash
# List running containers
docker-compose ps

# Detailed status
docker-compose ps -a

# Check health status
docker inspect kampuskart-backend --format='{{.State.Health.Status}}'

# View resource usage
docker stats

# Specific container stats
docker stats kampuskart-backend
```

---

## 🔧 Management Commands

### Execute Commands in Containers
```bash
# Run command in backend
docker-compose exec backend npm run seed
docker-compose exec backend npm test

# Run command in frontend
docker-compose exec frontend npm test

# Access MongoDB shell
docker-compose exec mongodb mongosh -u admin -p password123

# Access container shell
docker-compose exec backend sh
docker-compose exec frontend sh

# Run as root (for debugging)
docker-compose exec -u root backend sh
```

### Restart Services
```bash
# Restart all services
docker-compose restart

# Restart specific service
docker-compose restart backend

# Restart with rebuild
docker-compose up -d --build backend
```

### Scale Services
```bash
# Scale backend to 3 instances
docker-compose up -d --scale backend=3

# Note: Requires load balancer configuration
```

---

## 🧹 Cleanup Commands

### Remove Containers
```bash
# Stop and remove containers
docker-compose down

# Remove containers and volumes
docker-compose down -v

# Remove containers, volumes, and images
docker-compose down -v --rmi all

# Force remove
docker-compose down -v --remove-orphans
```

### Docker System Cleanup
```bash
# Remove unused containers
docker container prune

# Remove unused images
docker image prune

# Remove unused volumes
docker volume prune

# Remove unused networks
docker network prune

# Remove everything unused
docker system prune -a

# Remove everything including volumes
docker system prune -a --volumes

# Check disk usage
docker system df
```

---

## 🔍 Debugging Commands

### Inspect Containers
```bash
# Inspect container
docker inspect kampuskart-backend

# View container logs
docker logs kampuskart-backend

# View last 50 lines
docker logs --tail=50 kampuskart-backend

# Follow logs
docker logs -f kampuskart-backend

# View container processes
docker top kampuskart-backend

# View container changes
docker diff kampuskart-backend
```

### Network Debugging
```bash
# List networks
docker network ls

# Inspect network
docker network inspect kampuskart_kampuskart-network

# Test connectivity
docker-compose exec backend ping mongodb
docker-compose exec backend curl http://frontend:80

# View network ports
docker-compose port backend 5000
```

### Volume Debugging
```bash
# List volumes
docker volume ls

# Inspect volume
docker volume inspect kampuskart_mongodb_data

# View volume contents
docker run --rm -v kampuskart_mongodb_data:/data alpine ls -la /data
```

---

## 🧪 Testing Commands

### Health Checks
```bash
# Backend health
curl http://localhost:5000/api/health

# Frontend health
curl http://localhost:3000/health

# MongoDB health
docker-compose exec mongodb mongosh --eval "db.adminCommand('ping')"

# Check all health statuses
docker-compose ps
```

### Run Tests
```bash
# Backend tests (when implemented)
docker-compose exec backend npm test

# Frontend tests
docker-compose exec frontend npm test

# Run with coverage
docker-compose exec frontend npm run test:coverage

# Seed database
docker-compose exec backend npm run seed
```

---

## 📦 Image Management

### List Images
```bash
# List all images
docker images

# List KampusKart images
docker images | grep kampuskart

# List with size
docker images --format "table {{.Repository}}\t{{.Tag}}\t{{.Size}}"
```

### Tag and Push Images
```bash
# Tag images
docker tag kampuskart-backend:latest yourusername/kampuskart-backend:v1.0
docker tag kampuskart-frontend:latest yourusername/kampuskart-frontend:v1.0

# Login to Docker Hub
docker login

# Push images
docker push yourusername/kampuskart-backend:v1.0
docker push yourusername/kampuskart-frontend:v1.0

# Pull images
docker pull yourusername/kampuskart-backend:v1.0
```

### Remove Images
```bash
# Remove specific image
docker rmi kampuskart-backend:latest

# Remove all KampusKart images
docker images | grep kampuskart | awk '{print $3}' | xargs docker rmi

# Force remove
docker rmi -f kampuskart-backend:latest
```

---

## 🔐 Security Commands

### Scan Images
```bash
# Scan for vulnerabilities (requires Docker Scout)
docker scout cves kampuskart-backend:latest

# View image history
docker history kampuskart-backend:latest

# Check for secrets
docker run --rm -v /var/run/docker.sock:/var/run/docker.sock aquasec/trivy image kampuskart-backend:latest
```

### User and Permissions
```bash
# Check running user
docker-compose exec backend whoami

# View file permissions
docker-compose exec backend ls -la /app

# Fix permissions (if needed)
docker-compose exec -u root backend chown -R nodejs:nodejs /app
```

---

## 📊 Performance Commands

### Resource Monitoring
```bash
# Real-time stats
docker stats

# Specific container
docker stats kampuskart-backend

# Format output
docker stats --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}"

# No streaming (one-time)
docker stats --no-stream
```

### Limit Resources
```bash
# Start with resource limits
docker-compose up -d --scale backend=1 --memory=512m --cpus=1

# Update running container
docker update --memory=512m --cpus=1 kampuskart-backend
```

---

## 🌐 Network Commands

### Create Custom Network
```bash
# Create network
docker network create kampuskart-custom

# Connect container to network
docker network connect kampuskart-custom kampuskart-backend

# Disconnect from network
docker network disconnect kampuskart-custom kampuskart-backend
```

---

## 📝 Environment Commands

### View Environment Variables
```bash
# View all env vars in container
docker-compose exec backend env

# View specific env var
docker-compose exec backend printenv MONGODB_URI

# Set env var temporarily
docker-compose exec -e DEBUG=true backend npm start
```

---

## 🔄 Backup and Restore

### Backup MongoDB
```bash
# Backup database
docker-compose exec mongodb mongodump --out=/data/backup

# Copy backup to host
docker cp kampuskart-mongodb:/data/backup ./mongodb-backup

# Backup volume
docker run --rm -v kampuskart_mongodb_data:/data -v $(pwd):/backup alpine tar czf /backup/mongodb-backup.tar.gz /data
```

### Restore MongoDB
```bash
# Copy backup to container
docker cp ./mongodb-backup kampuskart-mongodb:/data/restore

# Restore database
docker-compose exec mongodb mongorestore /data/restore

# Restore from volume backup
docker run --rm -v kampuskart_mongodb_data:/data -v $(pwd):/backup alpine tar xzf /backup/mongodb-backup.tar.gz -C /
```

---

## 🚢 Deployment Commands

### Production Deployment
```bash
# On production server
cd /app/kampuskart

# Pull latest code
git pull origin main

# Copy environment file
cp .env.docker.example .env.docker
nano .env.docker  # Edit with production values

# Build and start
docker-compose build
docker-compose up -d

# Verify deployment
docker-compose ps
curl http://localhost:5000/api/health

# View logs
docker-compose logs -f
```

### Update Deployment
```bash
# Pull latest changes
git pull origin main

# Rebuild and restart
docker-compose up -d --build

# Or rebuild specific service
docker-compose up -d --build backend
```

---

## 🔄 Git Commands for Day 23

```bash
# Create and switch to day-23 branch
git checkout -b day-23-docker-containerization

# Stage all changes
git add .

# Commit with descriptive message
git commit -m "Day 23: Docker containerization with multi-stage builds

- Created multi-stage Dockerfiles for backend and frontend
- Set up Docker Compose orchestration with 4 services
- Configured development and production environments
- Added health checks for all services
- Implemented security best practices (non-root users)
- Optimized images with .dockerignore files
- Created Nginx configuration for frontend
- Added comprehensive Docker documentation
- Concept Point: Docker Containerization (1.0)

Services:
- MongoDB (mongo:7.0) with persistent volumes
- Backend (Node.js 20 Alpine) with health checks
- Frontend (Nginx Alpine) with security headers
- Mongo Express (optional debug profile)

Features:
- Multi-stage builds (60-90% size reduction)
- Hot-reload for development
- Health monitoring
- Volume persistence
- Network isolation

Cumulative Progress: 8.5/14 points (60.7%)"

# Push to remote
git push origin day-23-docker-containerization

# Create pull request
gh pr create --title "Day 23: Docker Containerization with Multi-Stage Builds" --body "See docs/PR_SUMMARY_DAY_23.md for complete details. All services tested and working."
```

---

## ✅ Verification Checklist

```bash
# 1. Check Docker installation
docker --version
docker-compose --version

# 2. Build images
docker-compose build

# 3. Start services
docker-compose up -d

# 4. Check status
docker-compose ps

# 5. Verify health
curl http://localhost:5000/api/health
curl http://localhost:3000/health

# 6. View logs
docker-compose logs

# 7. Test connectivity
docker-compose exec backend ping mongodb

# 8. Stop services
docker-compose down
```

---

## 🎯 Success Criteria

- ✅ Docker and Docker Compose installed
- ✅ All images build successfully
- ✅ All services start without errors
- ✅ Health checks passing
- ✅ Frontend accessible at localhost:3000
- ✅ Backend API responding at localhost:5000
- ✅ MongoDB connected
- ✅ Development mode works with hot-reload
- ✅ Production mode optimized
- ✅ Documentation complete

---

**Day 23 Complete**: Docker Containerization ✅  
**Services**: 4 (MongoDB, Backend, Frontend, Mongo Express)  
**Concept Points**: 1.0 earned  
**Cumulative Progress**: 8.5/14 points (60.7%)
