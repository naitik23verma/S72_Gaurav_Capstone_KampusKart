# KampusKart

A campus management portal for MIT ADT University. Students and faculty can navigate the campus, stay updated on news and events, report lost items, submit complaints, and chat in real time.

Live: [kampuskart.netlify.app](https://kampuskart.netlify.app)

---

## Tech Stack

**Frontend:** React 18, TypeScript, Vite, Tailwind CSS, Material UI, Socket.IO client, Framer Motion

**Backend:** Node.js, Express 5, MongoDB, Mongoose, JWT, Passport (Google OAuth), Socket.IO, Cloudinary, Nodemailer

**Infra:** Netlify (frontend), Render (backend), MongoDB Atlas

---

## Features

- Interactive campus map with Google Maps
- News and events with admin management
- Lost and found with image uploads
- Complaints system with status tracking
- Facilities directory
- Clubs and recruitment listings
- Real-time global chat with reactions and replies
- Google OAuth and email/password authentication
- Password reset via OTP email
- Role-based access (User / Admin)

---

## Local Setup

### Prerequisites

- Node.js >= 16
- MongoDB (local or Atlas)

### Clone and install

```bash
git clone https://github.com/Gaurav-205/KampusKart.git
cd KampusKart

cd frontend && npm install
cd ../backend && npm install
```

### Environment variables

Copy the examples and fill in your values:

```bash
cp .env.example .env
cp backend/.env.example backend/.env
```

Key variables for `backend/.env`:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/kampuskart
JWT_SECRET=your_jwt_secret_minimum_32_characters
FRONTEND_URL=http://localhost:5173

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Email (for password reset)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Cloudinary (for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Key variables for `frontend/.env`:

```env
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
VITE_API_URL=http://localhost:5000
```

### Run

```bash
# Terminal 1 — backend
cd backend && npm run dev

# Terminal 2 — frontend
cd frontend && npm run dev
```

Frontend: `http://localhost:5173`  
Backend: `http://localhost:5000`

---

## Project Structure

```
KampusKart/
├── frontend/          # React + TypeScript (Vite)
│   └── src/
│       ├── components/
│       ├── contexts/
│       ├── hooks/
│       └── utils/
├── backend/           # Node.js + Express
│   ├── config/
│   ├── cron/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── utils/
└── .github/
    └── workflows/     # CI and CD pipelines
```

---

## CI/CD

GitHub Actions handles linting, testing, and deployment automatically.

### Required GitHub Secrets

| Secret | Description |
|--------|-------------|
| `VITE_GOOGLE_MAPS_API_KEY` | Google Maps API key for frontend build |
| `NETLIFY_AUTH_TOKEN` | Netlify personal access token |
| `NETLIFY_SITE_ID` | Netlify site ID |
| `RENDER_API_KEY` | Render API key |
| `RENDER_SERVICE_ID` | Render service ID for backend |
| `BACKEND_URL` | Full backend URL (used by keep-alive ping) |

### Workflows

- `ci.yml` — runs on every push/PR: lint, build, test, security audit
- `cd.yml` — runs on push to `main`: deploys frontend to Netlify, triggers Render deploy
- `keep-alive.yml` — pings the backend every 14 minutes to prevent Render cold starts

---

## Google OAuth Setup

1. Create a project in [Google Cloud Console](https://console.cloud.google.com)
2. Enable the Google+ API / People API
3. Create OAuth 2.0 credentials
4. Add authorized redirect URI: `http://localhost:5000/api/auth/google/callback` (dev) and your production backend URL + `/api/auth/google/callback`
5. Set `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in `backend/.env`
6. Set `BACKEND_URL` in `backend/.env` for production callback resolution

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## License

MIT — see [LICENSE](LICENSE)
