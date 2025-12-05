# 🧭 KampusKart – MIT ADT University Campus Portal

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen)](https://nodejs.org)
[![React Version](https://img.shields.io/badge/react-19.1.0-blue)](https://reactjs.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

KampusKart is a comprehensive campus portal for MIT ADT University, providing students, faculty, and visitors with easy access to essential campus information and services. Built with modern web technologies, it offers an intuitive interface for navigating campus life.

## 🌐 Live Demo

- **Frontend**: [https://kampuskart.netlify.app/](https://kampuskart.netlify.app/)
- **Backend API**: [https://s72-gaurav-capstone.onrender.com](https://s72-gaurav-capstone.onrender.com)

## 📋 Table of Contents
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Installation](#-installation)
- [Usage](#-usage)
- [Testing](#-testing)
- [Project Structure](#-project-structure)
- [Security](#-security)
- [Deployment](#-deployment)
- [CI/CD](#cicd)
- [Contributing](#-contributing)
- [License](#-license)

## 🚀 Features

### 🗺️ Interactive Campus Map
- Real-time facility locations and details
- Google Maps integration with custom markers
- Operating hours and facility information

### 🚌 Campus Navigation
- Interactive shuttle tracking
- Route visualization
- Real-time updates

### 🍽️ Dining Services
- Mess and canteen menus
- Operating hours
- Facility ratings and reviews

### 🏢 Campus Facilities
- Hostel information and rules
- Library and lab schedules
- Academic zone details

### 📢 Campus Updates
- News and events feed
- Department-specific announcements
- Event calendar integration

### 📬 Feedback System
- Grievance submission
- Improvement suggestions
- Admin response tracking

### 🎒 Lost & Found
- Item reporting system
- Search functionality
- Anonymous contact system

### 💬 Global Chat
- Real-time messaging
- Message reactions and replies
- File attachments
- Typing indicators
- Online user status

### 🎓 Clubs & Recruitment
- Club information and applications
- Recruitment postings
- Application tracking

### 👤 User Profile
- Profile management
- Profile completion tracking
- Image uploads

## ⚙️ Tech Stack

### Frontend
- **React 19** - Modern UI framework
- **Vite** - Next-generation build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Material-UI** - Component library
- **React Router** - Client-side routing
- **Google Maps API** - Map integration
- **Socket.IO Client** - Real-time updates
- **Emoji Mart** - Emoji picker integration

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Passport.js** - Authentication middleware
- **Socket.IO** - Real-time communication
- **Nodemailer** - Email functionality
- **Cloudinary** - Image management
- **Node-cron** - Scheduled tasks

### Development Tools
- **ESLint** - Code linting
- **Jest** - Testing framework
- **Nodemon** - Development server
- **Git** - Version control
- **GitHub Actions** - CI/CD pipelines

## 🛠️ Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm (v7 or higher)
- MongoDB (v4.4 or higher)
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/KampusKart.git
   cd KampusKart
   ```

2. Frontend Setup:
   ```bash
   cd frontend
   npm install
   ```

3. Backend Setup:
   ```bash
   cd ../backend
   npm install
   ```

4. Environment Configuration:

   Create `.env` files in both `frontend` and `backend` directories.
   
   **Frontend** (`frontend/.env`):
   ```env
   VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   ```
   
   **Backend** (`backend/.env`):
   ```env
   # Required
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_minimum_32_characters
   NODE_ENV=development
   
   # Optional (for full functionality)
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   GOOGLE_CLIENT_ID=your_client_id
   GOOGLE_CLIENT_SECRET=your_client_secret
   FRONTEND_URL=http://localhost:3000
   EMAIL_SERVICE=gmail
   EMAIL_USER=your_email
   EMAIL_PASS=your_app_specific_password
   GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   ```
   
   **Note**: The backend will run with only critical variables (`JWT_SECRET`, `MONGODB_URI`) in production. Optional variables enable additional features.

## 📖 Usage

### Development

1. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```

2. Start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

### Production Build

1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```
   The production build will be in the `frontend/dist` directory.

2. Preview the production build:
   ```bash
   npm run preview
   ```

3. Start the production server:
   ```bash
   cd backend
   npm start
   ```

### Linting

Run linting for both frontend and backend:
```bash
# Frontend
cd frontend
npm run lint

# Backend
cd backend
npm run lint
```

## 🧪 Testing

Run tests for the backend:
```bash
cd backend
npm test
```

## 📁 Project Structure

```
KampusKart/
├── frontend/                    # React frontend application
│   ├── src/
│   │   ├── components/          # React components
│   │   │   ├── common/          # Reusable components (FeatureModal, SkeletonLoader, etc.)
│   │   │   ├── Chat/            # Chat components
│   │   │   └── ui/              # UI primitives (shadcn)
│   │   ├── contexts/            # React contexts (Auth, Theme)
│   │   ├── hooks/               # Custom React hooks
│   │   ├── services/            # API services
│   │   ├── utils/               # Utility functions
│   │   ├── theme/               # Theme configuration
│   │   └── config.js            # Frontend configuration
│   ├── public/                  # Static assets
│   ├── dist/                   # Production build output
│   ├── netlify.toml            # Netlify configuration
│   └── vite.config.ts          # Vite configuration
├── backend/                     # Node.js backend server
│   ├── config/                  # Configuration files
│   │   ├── cloudinary.js        # Cloudinary setup
│   │   └── passport.js          # Passport.js configuration
│   ├── cron/                    # Scheduled tasks
│   │   ├── keepAlive.js         # Keep-alive service
│   │   └── deleteItems.js       # Cleanup tasks
│   ├── middleware/              # Express middleware
│   │   ├── auth.js              # Authentication
│   │   └── validation.js        # Input validation
│   ├── models/                  # Mongoose models
│   ├── routes/                  # API routes
│   ├── scripts/                 # Utility scripts
│   ├── tests/                   # Test files
│   ├── utils/                   # Utility functions
│   ├── server.js                # Main server file
│   └── Procfile                 # Render deployment config
└── .github/
    └── workflows/               # GitHub Actions workflows
        ├── ci.yml               # Continuous Integration
        └── cd.yml               # Continuous Deployment
```

## 🔒 Security

- All sensitive data is stored in environment variables
- JWT tokens are used for authentication
- API routes are protected with authentication middleware
- Rate limiting is implemented to prevent abuse
- Input validation is performed on all user inputs
- CORS is configured for allowed origins only
- Password hashing using bcrypt
- Secure file upload handling
- XSS protection
- SQL injection prevention (MongoDB with parameterized queries)

## 🚀 Deployment

The project is configured for deployment on:
- **Frontend**: Netlify ([https://kampuskart.netlify.app/](https://kampuskart.netlify.app/))
- **Backend**: Render ([https://s72-gaurav-capstone.onrender.com](https://s72-gaurav-capstone.onrender.com))

### Automatic Deployment (CI/CD)

The project uses GitHub Actions for automated CI/CD:

- **CI Workflow** (`.github/workflows/ci.yml`): Runs on every push/PR
  - Frontend: Linting and production build
  - Backend: Linting and tests
  
- **CD Workflow** (`.github/workflows/cd.yml`): Runs on push to `main`/`master`
  - Frontend: Automatic deployment to Netlify
  - Backend: Automatic deployment to Render

### Manual Deployment

#### Frontend (Netlify)
1. Build the frontend: `cd frontend && npm run build`
2. Deploy the `dist` folder to Netlify
3. Configure environment variables in Netlify dashboard:
   - `VITE_GOOGLE_MAPS_API_KEY`

#### Backend (Render)
1. Connect your GitHub repository to Render
2. Configure environment variables in Render dashboard
3. Set build command: `npm install`
4. Set start command: `npm start`
5. The server will automatically deploy on push to main branch

### Required Environment Variables for Production

**Frontend (Netlify):**
- `VITE_GOOGLE_MAPS_API_KEY` - Google Maps API key

**Backend (Render):**
- `JWT_SECRET` - JWT secret key (required)
- `MONGODB_URI` - MongoDB connection string (required)
- `CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name (optional)
- `CLOUDINARY_API_KEY` - Cloudinary API key (optional)
- `CLOUDINARY_API_SECRET` - Cloudinary API secret (optional)
- `GOOGLE_CLIENT_ID` - Google OAuth client ID (optional)
- `GOOGLE_CLIENT_SECRET` - Google OAuth client secret (optional)
- `EMAIL_USER` - Email service user (optional)
- `EMAIL_PASS` - Email service password (optional)

## 🔄 CI/CD

### GitHub Actions Workflows

The project includes automated CI/CD pipelines:

#### Continuous Integration (CI)
- **Triggers**: Push and Pull Requests to `main`, `master`, or `develop`
- **Frontend Job**:
  - Installs dependencies
  - Runs ESLint
  - Builds production bundle
- **Backend Job**:
  - Installs dependencies
  - Runs ESLint
  - Runs tests

#### Continuous Deployment (CD)
- **Triggers**: Push to `main` or `master` branches
- **Frontend Deployment**:
  - Builds production bundle
  - Deploys to Netlify
- **Backend Deployment**:
  - Triggers Render deployment

### Required GitHub Secrets

For workflows to function, configure these secrets in GitHub Settings:

- `VITE_GOOGLE_MAPS_API_KEY` - Google Maps API key
- `NETLIFY_AUTH_TOKEN` - Netlify authentication token
- `NETLIFY_SITE_ID` - Netlify site ID
- `RENDER_SERVICE_ID` - Render service ID
- `RENDER_API_KEY` - Render API key

### 24/7 Uptime

The backend includes a keep-alive service to prevent Render from spinning down the server on free tier. This ensures the API remains available 24/7.

## ✨ Recent Improvements

- ✅ Skeleton loaders for all pages (improved loading UX)
- ✅ Enhanced error handling across all components
- ✅ Improved null safety and type checking
- ✅ Production-ready CI/CD workflows
- ✅ Optimized build configuration
- ✅ Better environment variable handling
- ✅ Enhanced chat UI with modern design
- ✅ Comprehensive form validation
- ✅ Reusable component library

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all linting passes
- Test locally before submitting PR

## 📞 Support

For support:
1. Check the [documentation](docs/)
2. Search through [existing issues](https://github.com/yourusername/KampusKart/issues)
3. Create a new issue if needed


