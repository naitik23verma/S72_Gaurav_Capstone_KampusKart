# 🎓 KampusKart

**A comprehensive campus marketplace and community platform for students**

KampusKart is a full-stack web application designed to solve everyday campus problems by providing a centralized platform for lost & found items, campus updates, and student community features.

---

## 🚀 Project Vision

KampusKart aims to create a seamless digital experience for campus life by:
- Helping students find lost items quickly through a dedicated Lost & Found system
- Enabling easy communication of campus updates and announcements
- Building a trusted community with secure authentication
- Providing a mobile-responsive interface accessible anywhere on campus

---

## 🛠️ Tech Stack

### Frontend
- **React** (Vite) - Fast, modern UI framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Tailwind CSS** - Utility-first styling
- **Deployment**: Netlify/Vercel

### Backend
- **Node.js** + **Express** - RESTful API server
- **MongoDB** + **Mongoose** - NoSQL database with ODM
- **JWT** - Secure authentication tokens
- **bcrypt** - Password hashing
- **Passport.js** - OAuth integration (Google)
- **Cloudinary** - Image upload and storage
- **Deployment**: Render.com

### Testing & DevOps
- **Jest** - Unit testing framework
- **Docker** - Containerization
- **GitHub Actions** - CI/CD (optional)

---

## 📁 Project Structure

```
KampusKart/
├── frontend/           # React application
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Page-level components
│   │   ├── services/   # API service layer
│   │   ├── contexts/   # React context providers
│   │   └── App.jsx     # Main app component
│   └── package.json
├── backend/            # Express API server
│   ├── models/         # Mongoose schemas
│   ├── controllers/    # Business logic
│   ├── routes/         # API endpoints
│   ├── middleware/     # Auth, validation, etc.
│   ├── config/         # Database, env config
│   └── server.js       # Entry point
├── designs/            # UI/UX design files
│   ├── low-fid/        # Wireframes
│   └── hi-fid/         # Figma mockups
├── docs/               # Documentation
│   └── PROJECT_PLAN.md
└── README.md           # This file
```

---

## 🏃 How to Run

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)
- Git

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with your backend API URL
npm run dev
```

### Using Docker
```bash
docker-compose up
```

---

## 🎯 Key Features

- ✅ **User Authentication**: Register/Login with JWT + Google OAuth
- ✅ **Lost & Found System**: Post, search, and manage lost items
- ✅ **Image Upload**: Cloudinary integration for item photos
- ✅ **Campus Updates**: Community feed for announcements
- ✅ **Responsive Design**: Mobile-first UI matching hi-fidelity designs
- ✅ **RESTful API**: Complete CRUD operations with proper validation
- ✅ **Secure**: Password hashing, JWT tokens, protected routes

---

## 📊 Development Progress

Track our progress on the [GitHub Projects Board](../../projects)

**Current Sprint**: Day 1-5 (Setup & Design)
**Completed Concepts**: 0/21
**Target Score**: 13-14 points

---

## 🤝 Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our PR process and coding standards.

---

## 📝 License

This project is built as part of the Kalvium Capstone Program.

---

## 👥 Team

**Developer**: Gaurav (S72)
**Mentor**: [Your Mentor Name]
**Cohort**: Kalvium Capstone 2026

---

## 🔗 Links

- **Live Frontend**: [Coming Soon]
- **Live Backend API**: [Coming Soon]
- **API Documentation**: [Bruno Collection](backend/.bruno/)
- **Design Files**: [Figma Link](designs/hi-fid/Figma-Link.md)

---

**Last Updated**: January 16, 2026