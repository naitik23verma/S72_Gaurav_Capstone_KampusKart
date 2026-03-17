<div align="center">
  <img src="frontend/public/Logo.png" alt="KampusKart Logo" width="100" />

  # KampusKart

  All-in-one campus portal for MIT ADT University

  [![Live Demo](https://img.shields.io/badge/Live%20Demo-kampuskart.netlify.app-00C7B7?style=flat-square&logo=netlify&logoColor=white)](https://kampuskart.netlify.app)
  [![CI](https://github.com/kalviumcommunity/S72_Gaurav_Capstone_KampusKart/actions/workflows/ci.yml/badge.svg)](https://github.com/kalviumcommunity/S72_Gaurav_Capstone_KampusKart/actions/)
  [![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)
  [![Node](https://img.shields.io/badge/Node.js-%3E%3D16-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org)

</div>

---

## Overview

KampusKart is a full-stack campus management portal. Students and faculty can navigate the campus, stay updated on news and events, report lost items, submit complaints, and chat in real time — all in one place.

---

## Features

| Module | Description |
|--------|-------------|
| Campus Map | Google Maps integration with facility markers and search |
| News & Events | Rich media posts with admin management |
| Lost & Found | Report and search items with image uploads |
| Complaints | Submit, track, and resolve complaints with priority levels |
| Facilities | Directory with hours, contacts, and categories |
| Clubs | Recruitment listings with application deadlines |
| Global Chat | Real-time messaging with reactions, replies, and typing indicators |
| Auth | Email/password + Google OAuth, JWT sessions, password reset via OTP |

---

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| Frontend | React 18, TypeScript, Vite, Tailwind CSS, Material UI, Socket.IO, Framer Motion |
| Backend | Node.js, Express 5, MongoDB, Mongoose, JWT, Passport, Socket.IO, Cloudinary, Nodemailer |
| Infrastructure | Netlify, Render, MongoDB Atlas, GitHub Actions |

---

## Local Setup

### Prerequisites

- Node.js >= 16
- MongoDB (local or [Atlas](https://www.mongodb.com/cloud/atlas))

### 1. Clone and install

```bash
git clone https://github.com/Gaurav-205/KampusKart.git
cd KampusKart

cd frontend && npm install
cd ../backend && npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env
cp backend/.env.example backend/.env
```

Fill in `backend/.env`:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/kampuskart
JWT_SECRET=your_jwt_secret_minimum_32_characters
FRONTEND_URL=http://localhost:5173
BACKEND_URL=http://localhost:5000

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Fill in `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

### 3. Run

```bash
# Terminal 1 — backend
cd backend && npm run dev

# Terminal 2 — frontend
cd frontend && npm run dev
```

App runs at `http://localhost:5173`, API at `http://localhost:5000`.

---

## Project Structure

```
KampusKart/
├── frontend/               # React + TypeScript (Vite)
│   └── src/
│       ├── components/     # Feature and UI components
│       ├── contexts/       # Auth context
│       ├── hooks/          # Custom hooks
│       └── utils/
├── backend/                # Node.js + Express
│   ├── config/             # Passport, Cloudinary setup
│   ├── cron/               # Scheduled jobs
│   ├── middleware/         # Auth, validation
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API route handlers
│   └── utils/
└── .github/
    └── workflows/          # CI, CD, keep-alive pipelines
```

---

## CI/CD

| Workflow | Trigger | What it does |
|----------|---------|--------------|
| `ci.yml` | Push / PR to `main`, `develop` | Lint, build, test, security audit |
| `cd.yml` | Push to `main` | Deploy frontend to Netlify, trigger Render deploy |
| `keep-alive.yml` | Every 14 minutes | Ping backend to prevent Render cold starts |

### Required GitHub Secrets

| Secret | Description |
|--------|-------------|
| `VITE_GOOGLE_MAPS_API_KEY` | Google Maps API key for frontend build |
| `NETLIFY_AUTH_TOKEN` | Netlify personal access token |
| `NETLIFY_SITE_ID` | Netlify site ID |
| `RENDER_API_KEY` | Render API key |
| `RENDER_SERVICE_ID` | Render backend service ID |
| `BACKEND_URL` | Full backend URL for keep-alive ping |

---

## Google OAuth Setup

1. Create a project in [Google Cloud Console](https://console.cloud.google.com)
2. Enable the Google+ API
3. Create OAuth 2.0 credentials (Web application)
4. Add authorized redirect URIs:
   - Development: `http://localhost:5000/api/auth/google/callback`
   - Production: `https://your-backend.onrender.com/api/auth/google/callback`
5. Set `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, and `BACKEND_URL` in `backend/.env`

---

## Screenshots

| Campus Map | Global Chat | Lost & Found |
|:---:|:---:|:---:|
| ![Map](frontend/public/images/1.jpg) | ![Chat](frontend/public/images/3.jpg) | ![LostFound](frontend/public/images/4.jpg) |

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines. For questions, use [GitHub Discussions](https://github.com/Gaurav-205/KampusKart/discussions).

---

## License

MIT — see [LICENSE](LICENSE)

---

<div align="center">
  Made by <a href="https://github.com/Gaurav-205">Gaurav Khandelwal</a>
</div>
