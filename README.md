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
- [Contributing](#-contributing)

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

   Create `.env` files in both `frontend` and `backend` directories. You can use the `.env.example` files as templates:
   
   **Frontend** (`frontend/.env`):
   ```env
   VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   ```
   
   **Backend** (`backend/.env`):
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_minimum_32_characters
   NODE_ENV=development
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

2. Start the production server:
   ```bash
   cd backend
   npm start
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
├── frontend/          # React frontend application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── contexts/       # React contexts
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API services
│   │   └── utils/          # Utility functions
│   ├── public/        # Static assets
│   └── dist/          # Production build output
├── backend/           # Node.js backend server
│   ├── config/        # Configuration files
│   ├── cron/          # Scheduled tasks
│   ├── middleware/    # Express middleware
│   ├── models/        # Mongoose models
│   ├── routes/        # API routes
│   ├── scripts/       # Utility scripts
│   ├── tests/         # Test files
│   └── utils/         # Utility functions
└── .github/           # GitHub Actions workflows
```

## 🔒 Security

- All sensitive data is stored in environment variables
- JWT tokens are used for authentication
- API routes are protected with authentication middleware
- Rate limiting is implemented to prevent abuse
- Input validation is performed on all user inputs

## 🚀 Deployment

The project is configured for deployment on:
- **Frontend**: Netlify
- **Backend**: Render

GitHub Actions workflows are set up for CI/CD. See `.github/workflows/` for details.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📞 Support

For support:
1. Check the [documentation](docs/)
2. Search through [existing issues](https://github.com/yourusername/KampusKart/issues)
3. Create a new issue if needed

## 👥 Authors

- **KampusKart Team** - *Initial work*

## 🙏 Acknowledgments

- MIT ADT University for providing the platform
- All contributors who have helped improve this project



