# 🎓 KampusKart - MIT ADT University Campus Portal

<div align="center">

![KampusKart Logo](frontend/public/Logo.png)

[![Live Demo](https://img.shields.io/badge/demo-live-success?style=for-the-badge)](https://kampuskart.netlify.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen?style=for-the-badge&logo=node.js)](https://nodejs.org)
[![React](https://img.shields.io/badge/react-19.1.0-blue?style=for-the-badge&logo=react)](https://reactjs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-4.4+-green?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)

**Your all-in-one campus companion for navigation, events, news, lost & found, and more.**

[Live Demo](https://kampuskart.netlify.app/) · [Report Bug](https://github.com/Gaurav-205/KampusKart/issues) · [Request Feature](https://github.com/Gaurav-205/KampusKart/issues)

</div>

---

## 📋 Table of Contents

- [About](#-about-the-project)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Installation](#-installation)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)
- [Acknowledgments](#-acknowledgments)

---

## 🎯 About The Project

KampusKart is a comprehensive campus management portal designed specifically for MIT ADT University. It provides students, faculty, and visitors with seamless access to essential campus information and services through an intuitive, modern interface.

### Why KampusKart?

- 🗺️ **Navigate with Ease** - Interactive campus map with real-time facility information
- 📢 **Stay Updated** - Never miss important campus news and events
- 🔍 **Lost & Found** - Efficient system to report and find lost items
- 💬 **Connect** - Real-time global chat for campus community
- 🎓 **Clubs & Activities** - Discover and join campus clubs
- 📝 **Voice Your Concerns** - Submit and track complaints efficiently


---

## ✨ Features

### 🗺️ Interactive Campus Map
- **Google Maps Integration** with custom markers and info windows
- **Real-time Facility Locations** with detailed information
- **Search Functionality** to quickly find locations
- **Directions** to any campus location
- **Category Filtering** (Academic, Sports, Administration, etc.)

### 📰 News & Events
- **Latest Campus News** with rich media support
- **Event Calendar** with date filtering
- **Category-based Organization** (Academic, Cultural, Sports, etc.)
- **Search & Filter** capabilities
- **Admin Management** for posting and editing

### 🔍 Lost & Found
- **Report Lost/Found Items** with image uploads
- **Advanced Search** with filters (type, status, date)
- **Contact System** for item recovery
- **Status Tracking** (resolved/unresolved)
- **Admin Moderation** capabilities

### 📝 Complaints System
- **Submit Complaints** with image evidence
- **Category Classification** (Infrastructure, Facilities, etc.)
- **Status Tracking** (Pending, In Progress, Resolved)
- **Priority Levels** (Low, Medium, High, Critical)
- **Admin Response System**

### 🏢 Facilities Directory
- **Comprehensive Facility Listings** (Library, Labs, Sports, etc.)
- **Operating Hours** and contact information
- **Facility Descriptions** and amenities
- **Icon-based Categories** for easy identification
- **Search & Filter** functionality

### 🎓 Clubs & Recruitment
- **Club Information** with detailed descriptions
- **Recruitment Postings** with application deadlines
- **Application Forms** integration
- **Contact Information** for club coordinators
- **Status Indicators** (Open/Closed)

### 💬 Global Chat
- **Real-time Messaging** with Socket.IO
- **Message Reactions** (emoji support)
- **Reply to Messages** (threaded conversations)
- **File Attachments** (images, documents)
- **Typing Indicators** and online status
- **Message Editing & Deletion**
- **Emoji Picker** integration

### 👤 User Profile
- **Profile Management** with image uploads
- **Profile Completion Tracking** with progress bar
- **Personal Information** management
- **Account Settings**

### 🔐 Authentication
- **Email/Password Authentication** with JWT
- **Google OAuth 2.0** integration
- **Password Reset** with OTP verification
- **Secure Session Management**
- **Role-based Access Control** (User/Admin)


---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| ![React](https://img.shields.io/badge/React-19.1.0-61DAFB?logo=react) | UI Framework |
| ![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript) | Type Safety |
| ![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite) | Build Tool |
| ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css) | Styling |
| ![Material-UI](https://img.shields.io/badge/MUI-7.x-007FFF?logo=mui) | Component Library |
| ![React Router](https://img.shields.io/badge/React_Router-7.x-CA4245?logo=react-router) | Routing |
| ![Socket.IO](https://img.shields.io/badge/Socket.IO-4.x-010101?logo=socket.io) | Real-time Communication |
| ![Axios](https://img.shields.io/badge/Axios-1.x-5A29E4?logo=axios) | HTTP Client |
| ![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.x-0055FF?logo=framer) | Animations |

### Backend
| Technology | Purpose |
|------------|---------|
| ![Node.js](https://img.shields.io/badge/Node.js-16+-339933?logo=node.js) | Runtime |
| ![Express](https://img.shields.io/badge/Express-5.x-000000?logo=express) | Web Framework |
| ![MongoDB](https://img.shields.io/badge/MongoDB-4.4+-47A248?logo=mongodb) | Database |
| ![Mongoose](https://img.shields.io/badge/Mongoose-8.x-880000?logo=mongoose) | ODM |
| ![JWT](https://img.shields.io/badge/JWT-9.x-000000?logo=json-web-tokens) | Authentication |
| ![Passport](https://img.shields.io/badge/Passport-0.6-34E27A?logo=passport) | Auth Middleware |
| ![Socket.IO](https://img.shields.io/badge/Socket.IO-4.x-010101?logo=socket.io) | WebSockets |
| ![Cloudinary](https://img.shields.io/badge/Cloudinary-2.x-3448C5?logo=cloudinary) | Image Management |
| ![Nodemailer](https://img.shields.io/badge/Nodemailer-7.x-0078D4?logo=gmail) | Email Service |

### DevOps & Tools
| Technology | Purpose |
|------------|---------|
| ![Git](https://img.shields.io/badge/Git-F05032?logo=git&logoColor=white) | Version Control |
| ![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github) | Code Hosting |
| ![Netlify](https://img.shields.io/badge/Netlify-00C7B7?logo=netlify&logoColor=white) | Frontend Hosting |
| ![Render](https://img.shields.io/badge/Render-46E3B7?logo=render&logoColor=white) | Backend Hosting |
| ![ESLint](https://img.shields.io/badge/ESLint-4B32C3?logo=eslint) | Code Linting |


---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16.0.0 or higher) - [Download](https://nodejs.org/)
- **npm** (v7.0.0 or higher) - Comes with Node.js
- **MongoDB** (v4.4 or higher) - [Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Git** - [Download](https://git-scm.com/downloads)

### Quick Start

```bash
# Clone the repository
git clone https://github.com/Gaurav-205/KampusKart.git
cd KampusKart

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install

# Set up environment variables (see below)

# Start backend server
cd backend
npm run dev

# Start frontend (in a new terminal)
cd frontend
npm run dev
```

Visit `http://localhost:3000` to see the application running!


---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Gaurav-205/KampusKart.git
cd KampusKart
```

### 2. Frontend Setup

```bash
cd frontend
npm install
```

Create `frontend/.env`:
```env
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

### 3. Backend Setup

```bash
cd backend
npm install
```

Create `backend/.env`:
```env
# Required
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/kampuskart
JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters

# Optional (for full functionality)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_specific_password
FRONTEND_URL=http://localhost:3000
ADMIN_EMAILS=admin@example.com,admin2@example.com
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

### 4. Database Setup

**Option A: Local MongoDB**
```bash
# Start MongoDB service
mongod
```

**Option B: MongoDB Atlas (Recommended)**
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get connection string and add to `MONGODB_URI` in `.env`


---

## 📖 Usage

### Development Mode

**Start Backend Server:**
```bash
cd backend
npm run dev
```
Server runs on `http://localhost:5000`

**Start Frontend:**
```bash
cd frontend
npm run dev
```
Application runs on `http://localhost:3000`

### Production Build

**Build Frontend:**
```bash
cd frontend
npm run build
```
Output in `frontend/dist/`

**Preview Production Build:**
```bash
npm run preview
```

**Start Production Server:**
```bash
cd backend
npm start
```

### Available Scripts

#### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

#### Backend
```bash
npm run dev          # Start with nodemon (auto-reload)
npm start            # Start production server
npm test             # Run tests
npm run lint         # Run ESLint
```


---

## 📚 API Documentation

### Base URL
- **Development**: `http://localhost:5000/api`
- **Production**: `https://s72-gaurav-capstone.onrender.com/api`

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/signup` | Register new user | No |
| POST | `/auth/login` | Login user | No |
| POST | `/auth/forgot-password` | Request password reset | No |
| POST | `/auth/reset-password` | Reset password with OTP | No |
| GET | `/auth/google` | Google OAuth login | No |
| GET | `/auth/google/callback` | Google OAuth callback | No |

### User Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/user/me` | Get current user | Yes |
| GET | `/profile` | Get user profile | Yes |
| PUT | `/profile` | Update user profile | Yes |

### Campus Map Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/locations` | Get all locations | No |
| GET | `/locations/:id` | Get location by ID | No |

### News Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/news` | Get all news | No |
| POST | `/news` | Create news (Admin) | Yes |
| PUT | `/news/:id` | Update news (Admin) | Yes |
| DELETE | `/news/:id` | Delete news (Admin) | Yes |

### Events Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/events` | Get all events | No |
| POST | `/events` | Create event (Admin) | Yes |
| PUT | `/events/:id` | Update event (Admin) | Yes |
| DELETE | `/events/:id` | Delete event (Admin) | Yes |

### Lost & Found Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/lostfound` | Get all items | Yes |
| POST | `/lostfound` | Create item | Yes |
| PUT | `/lostfound/:id` | Update item | Yes |
| DELETE | `/lostfound/:id` | Delete item | Yes |
| PATCH | `/lostfound/:id/resolve` | Mark as resolved | Yes |

### Complaints Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/complaints` | Get all complaints | Yes |
| POST | `/complaints` | Create complaint | Yes |
| PUT | `/complaints/:id` | Update complaint | Yes |
| DELETE | `/complaints/:id` | Delete complaint | Yes |

### Facilities Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/facilities` | Get all facilities | No |
| POST | `/facilities` | Create facility (Admin) | Yes |
| PUT | `/facilities/:id` | Update facility (Admin) | Yes |
| DELETE | `/facilities/:id` | Delete facility (Admin) | Yes |

### Clubs Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/clubs` | Get all clubs | No |
| POST | `/clubs` | Create club (Admin) | Yes |
| PUT | `/clubs/:id` | Update club (Admin) | Yes |
| DELETE | `/clubs/:id` | Delete club (Admin) | Yes |

### Chat Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/chat` | Get all messages | Yes |
| POST | `/chat` | Send message | Yes |
| PUT | `/chat/:id` | Edit message | Yes |
| DELETE | `/chat/:id` | Delete message | Yes |
| POST | `/chat/:id/react` | Add reaction | Yes |

### Response Format

**Success Response:**
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error information"
}
```


---

## 🚀 Deployment

### Frontend Deployment (Netlify)

1. **Build the project:**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy to Netlify:**
   - Connect your GitHub repository to Netlify
   - Set build command: `npm run build`
   - Set publish directory: `dist`
   - Add environment variables in Netlify dashboard

3. **Environment Variables:**
   ```
   VITE_GOOGLE_MAPS_API_KEY=your_api_key
   ```

### Backend Deployment (Render)

1. **Connect Repository:**
   - Link your GitHub repository to Render
   - Select the backend directory

2. **Configuration:**
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment: Node

3. **Environment Variables:**
   Add all required variables from `backend/.env.example`

### Database (MongoDB Atlas)

1. Create a MongoDB Atlas account
2. Create a new cluster
3. Whitelist Render's IP addresses
4. Get connection string
5. Add to `MONGODB_URI` in Render environment variables

### Post-Deployment

1. **Test all endpoints:**
   ```bash
   curl https://your-backend-url.onrender.com/api/health
   ```

2. **Verify frontend:**
   Visit your Netlify URL and test all features

3. **Monitor logs:**
   - Netlify: Check deploy logs
   - Render: Check service logs


---

## 📁 Project Structure

```
KampusKart/
├── frontend/                           # React frontend application
│   ├── public/                         # Static assets
│   │   ├── Logo.png                    # Application logo
│   │   └── images/                     # Image assets
│   ├── src/
│   │   ├── components/                 # React components
│   │   │   ├── common/                 # Reusable components
│   │   │   ├── Chat/                   # Chat components
│   │   │   ├── ui/                     # UI primitives (shadcn)
│   │   │   ├── CampusMap.tsx           # Campus map component
│   │   │   ├── Events.tsx              # Events component
│   │   │   ├── News.tsx                # News component
│   │   │   ├── LostFound.tsx           # Lost & Found component
│   │   │   ├── Complaints.tsx          # Complaints component
│   │   │   ├── Facilities.tsx          # Facilities component
│   │   │   ├── ClubsRecruitment.tsx    # Clubs component
│   │   │   └── Profile.tsx             # User profile
│   │   ├── contexts/                   # React contexts
│   │   ├── hooks/                      # Custom React hooks
│   │   ├── utils/                      # Utility functions
│   │   ├── App.tsx                     # Main App component
│   │   └── main.tsx                    # Entry point
│   ├── .env                            # Environment variables
│   ├── package.json                    # Dependencies
│   ├── vite.config.ts                  # Vite configuration
│   └── tailwind.config.js              # Tailwind configuration
│
├── backend/                            # Node.js backend server
│   ├── config/                         # Configuration files
│   │   ├── cloudinary.js               # Cloudinary setup
│   │   └── passport.js                 # Passport.js configuration
│   ├── cron/                           # Scheduled tasks
│   ├── middleware/                     # Express middleware
│   ├── models/                         # Mongoose models
│   ├── routes/                         # API routes
│   ├── scripts/                        # Utility scripts
│   ├── tests/                          # Test files
│   ├── utils/                          # Utility functions
│   ├── .env                            # Environment variables
│   ├── package.json                    # Dependencies
│   └── server.js                       # Main server file
│
├── .github/                            # GitHub configuration
│   └── workflows/                      # GitHub Actions
│       ├── ci.yml                      # Continuous Integration
│       └── cd.yml                      # Continuous Deployment
│
├── .gitignore                          # Git ignore rules
├── README.md                           # This file
├── CONTRIBUTING.md                     # Contribution guidelines
├── CODE_OF_CONDUCT.md                  # Code of conduct
├── SECURITY.md                         # Security policy
├── DEPLOYMENT_CHECKLIST.md             # Deployment guide
└── LICENSE                             # MIT License
```

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details on:

- Code of Conduct
- Development process
- Submitting pull requests
- Coding standards
- Testing requirements

Quick start for contributors:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Contact

Gaurav Khandelwal - [@Gaurav-205](https://github.com/Gaurav-205)

Project Link: [https://github.com/Gaurav-205/KampusKart](https://github.com/Gaurav-205/KampusKart)

Live Demo: [https://kampuskart.netlify.app/](https://kampuskart.netlify.app/)

Portfolio: [https://gaurav-khandelwal.vercel.app/](https://gaurav-khandelwal.vercel.app/)

---

## 🙏 Acknowledgments

- [MIT ADT University](https://mituniversity.ac.in/) for the inspiration
- [React](https://reactjs.org/) for the amazing frontend framework
- [Express](https://expressjs.com/) for the robust backend framework
- [MongoDB](https://www.mongodb.com/) for the flexible database
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Google Maps API](https://developers.google.com/maps) for mapping capabilities
- [Cloudinary](https://cloudinary.com/) for image management
- [Netlify](https://www.netlify.com/) for frontend hosting
- [Render](https://render.com/) for backend hosting

---

<div align="center">

Made with ❤️ by [Gaurav Khandelwal](https://gaurav-khandelwal.vercel.app/)

⭐ Star this repository if you find it helpful!

</div>