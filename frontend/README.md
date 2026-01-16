# KampusKart Frontend

React frontend for KampusKart campus community platform.

**Day**: 16 of 30  
**Status**: Deployed to Production  
**Framework**: React 18 + Vite  
**Deployment**: Netlify/Vercel

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- npm or yarn
- Backend API running (see backend/README.md)

### Installation

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your API URL
# VITE_API_URL=http://localhost:5000

# Start development server
npm run dev

# Open browser
http://localhost:5173
```

---

## 📁 Project Structure

```
frontend/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/          # Images, fonts, etc.
│   ├── components/      # Reusable components (coming soon)
│   ├── config/
│   │   └── api.js       # Axios configuration
│   ├── context/
│   │   └── AuthContext.jsx  # Authentication context
│   ├── pages/
│   │   ├── Home.jsx     # Landing page
│   │   ├── Login.jsx    # Login page
│   │   ├── Register.jsx # Registration page
│   │   └── Items.jsx    # Items list page
│   ├── App.css          # Main styles
│   ├── App.jsx          # Main app component
│   ├── index.css        # Global styles
│   └── main.jsx         # Entry point
├── .env.example         # Environment template
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── README.md
└── vite.config.js
```

---

## 🔧 Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **State Management**: Context API
- **Styling**: CSS (custom)

---

## 🔐 Environment Variables

Required variables in `.env`:

```env
VITE_API_URL=http://localhost:5000
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

**Production:**
```env
VITE_API_URL=https://kampuskart-backend.onrender.com
```

---

## 📝 Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

---

## 🎨 Features Implemented

### Day 14
- [x] Vite + React setup
- [x] React Router configuration
- [x] Axios API client with interceptors
- [x] Authentication context (login, register, logout)
- [x] Home page
- [x] Login page
- [x] Register page
- [x] Items list page
- [x] Navigation component
- [x] Basic responsive styling

---

## 🔌 API Integration

### Axios Configuration

The app uses a configured Axios instance (`src/config/api.js`) that:
- Sets base URL from environment variable
- Adds JWT token to all requests automatically
- Handles 401 errors (redirects to login)
- Provides consistent error handling

### Authentication Flow

1. User logs in/registers
2. JWT token received from backend
3. Token stored in localStorage
4. Token added to all API requests via interceptor
5. User data stored in AuthContext
6. Protected routes check authentication

---

## 🚀 Next Steps (Day 15+)

- Create item detail page
- Create item form (create/edit)
- Add image upload component
- Implement search and filters
- Add user profile page
- Implement Google OAuth button
- Add loading states
- Add error boundaries
- Improve responsive design

---

## 🎯 Pages

### Home (`/`)
- Landing page with welcome message
- Feature highlights
- Login/Register buttons (if not authenticated)
- Quick actions (if authenticated)

### Login (`/login`)
- Email and password form
- Error handling
- Redirect to home after login
- Link to register page

### Register (`/register`)
- Full name, email, password, role
- Password confirmation
- Error handling
- Redirect to home after registration
- Link to login page

### Items (`/items`)
- List all lost & found items
- Display item cards with image, title, description
- Filter by type (lost/found)
- Link to item details
- "Report Item" button

---

## 🎨 Styling

### Design System

**Colors:**
- Primary: `#4f46e5` (Indigo)
- Secondary: `#10b981` (Green)
- Danger: `#ef4444` (Red)
- Text: `#1f2937` (Gray 800)
- Background: `#f9fafb` (Gray 50)

**Typography:**
- Font: System fonts (San Francisco, Segoe UI, Roboto)
- Base size: 16px
- Line height: 1.6

**Spacing:**
- Base unit: 0.25rem (4px)
- Common: 0.5rem, 1rem, 1.5rem, 2rem

**Responsive Breakpoints:**
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

---

## 🐛 Troubleshooting

### Issue: "Cannot connect to API"
**Solution:**
- Verify backend is running
- Check VITE_API_URL in .env
- Check CORS configuration in backend

### Issue: "401 Unauthorized"
**Solution:**
- Clear localStorage
- Login again
- Check JWT token expiration

### Issue: "Module not found"
**Solution:**
- Run `npm install`
- Delete node_modules and reinstall
- Check import paths

---

## 🌐 Deployment

### Production URL
```
https://kampuskart.netlify.app
(or your custom domain)
```

### Quick Deploy

**Netlify:**
1. Connect GitHub repository
2. Set base directory: `frontend`
3. Build command: `npm run build`
4. Publish directory: `frontend/dist`
5. Add environment variables
6. Deploy!

**Vercel:**
1. Import GitHub repository
2. Set root directory: `frontend`
3. Framework: Vite
4. Add environment variables
5. Deploy!

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for complete instructions.

---

## 📚 Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [React Router Documentation](https://reactrouter.com/)
- [Axios Documentation](https://axios-http.com/)
- [Netlify Documentation](https://docs.netlify.com/)
- [Vercel Documentation](https://vercel.com/docs)

---

**Created**: Day 14 of 30-day sprint  
**Last Updated**: January 17, 2026
