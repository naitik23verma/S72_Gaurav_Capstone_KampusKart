# KampusKart Backend

Backend server for KampusKart - MIT ADT University's campus portal. Built with Node.js, Express, and MongoDB.

## Features

- RESTful API with Express.js
- MongoDB database with Mongoose ODM
- JWT authentication with Passport.js
- Google OAuth 2.0 integration
- Real-time chat with Socket.IO
- Image uploads with Cloudinary
- Email notifications with Nodemailer
- Scheduled tasks with node-cron
- Rate limiting and security middleware
- Comprehensive error handling

## Tech Stack

- **Runtime**: Node.js (v16+)
- **Framework**: Express.js (v5.x)
- **Database**: MongoDB (v4.4+)
- **ODM**: Mongoose (v8.x)
- **Authentication**: JWT, Passport.js, Google OAuth 2.0
- **Real-time**: Socket.IO (v4.x)
- **Image Storage**: Cloudinary
- **Email**: Nodemailer
- **Validation**: Express Validator
- **Testing**: Jest, Supertest

## Getting Started

### Prerequisites

- Node.js (v16.0.0 or higher)
- npm (v7.0.0 or higher)
- MongoDB (v4.4 or higher) or MongoDB Atlas account

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env` file (see Environment Variables section)

3. Start the server:
   ```bash
   # Development mode with auto-reload
   npm run dev

   # Production mode
   npm start
   ```

## Environment Variables

Create a `.env` file in the backend directory with the following variables:

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
ADMIN_EMAILS=admin@example.com
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

See `.env.example` in the root directory for a complete template.

## Available Scripts

```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
npm test           # Run tests with Jest
npm run lint       # Run ESLint
npm run seed       # Seed database with sample data
```

## API Documentation

### Base URL
- Development: `http://localhost:5000/api`
- Production: `https://s72-gaurav-capstone.onrender.com/api`

### Authentication

All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

### Main Endpoints

| Category | Endpoint | Description |
|----------|----------|-------------|
| Auth | `/api/auth/*` | Authentication & authorization |
| Users | `/api/user/*` | User management |
| Profile | `/api/profile/*` | User profile operations |
| News | `/api/news/*` | Campus news |
| Events | `/api/events/*` | Campus events |
| Lost & Found | `/api/lostfound/*` | Lost & found items |
| Complaints | `/api/complaints/*` | Complaint management |
| Facilities | `/api/facilities/*` | Campus facilities |
| Clubs | `/api/clubs/*` | Club recruitment |
| Chat | `/api/chat/*` | Global chat messages |

See the main [README.md](../README.md) for detailed API documentation.

## Database Models

### User
- Authentication and profile information
- Role-based access control (user/admin)
- Password hashing with bcrypt

### News
- Campus news articles
- Category classification
- Admin management

### Event
- Campus events with dates
- Category and location information
- Registration tracking

### LostFoundItem
- Lost and found item reports
- Image uploads
- Status tracking (resolved/unresolved)

### Complaint
- Student complaints
- Priority levels
- Status tracking (pending/in progress/resolved)

### Facility
- Campus facility information
- Operating hours
- Contact details

### ClubRecruitment
- Club information
- Recruitment postings
- Application deadlines

### Chat
- Global chat messages
- Reactions and replies
- File attachments

## Real-time Features

The server uses Socket.IO for real-time communication:

- **Global Chat**: Real-time messaging with reactions and replies
- **Typing Indicators**: Show when users are typing
- **Online Status**: Track user presence
- **Message Notifications**: Instant message delivery

### Socket Events

```javascript
// Client -> Server
socket.emit('join_chat', { userId, username })
socket.emit('send_message', { message, userId, username })
socket.emit('typing', { userId, username })

// Server -> Client
socket.on('receive_message', (message) => {})
socket.on('user_typing', (data) => {})
socket.on('user_joined', (data) => {})
```

## Security Features

- JWT token authentication
- Password hashing with bcrypt (10 rounds)
- Rate limiting on all endpoints
- CORS configuration with whitelist
- Input validation and sanitization
- XSS protection
- SQL injection prevention
- Secure HTTP headers (Helmet.js)
- Environment variable encryption

## Testing

Run the test suite:
```bash
npm test
```

Run tests with coverage:
```bash
npm test -- --coverage
```

Test files are located in the `tests/` directory:
- `tests/middleware/` - Middleware tests
- `tests/models/` - Model tests
- `tests/routes/` - Route tests
- `tests/utils/` - Utility tests

## Scheduled Tasks

The server runs scheduled tasks using node-cron:

- **Keep-Alive**: Pings the server every 14 minutes to prevent Render free tier sleep
- **Cleanup**: Removes old unresolved lost & found items after 90 days

Tasks are defined in the `cron/` directory.

## Error Handling

The server implements comprehensive error handling:

- Centralized error middleware
- Consistent error response format
- Detailed error logging
- User-friendly error messages
- Stack traces in development mode only

## Deployment

### Render Deployment

1. Connect your GitHub repository to Render
2. Select the backend directory
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Add environment variables from `.env.example`

### Environment Configuration

Ensure all required environment variables are set in your hosting platform:
- MongoDB connection string (use MongoDB Atlas for production)
- JWT secret (generate a secure random string)
- Cloudinary credentials (for image uploads)
- Google OAuth credentials (for Google login)
- Email service credentials (for password reset)

### Health Check

The server provides a health check endpoint:
```bash
GET /api/health
```

Returns:
```json
{
  "status": "ok",
  "timestamp": "2024-03-14T12:00:00.000Z"
}
```

## Project Structure

```
backend/
├── config/              # Configuration files
│   ├── cloudinary.js    # Cloudinary setup
│   └── passport.js      # Passport.js configuration
├── cron/                # Scheduled tasks
│   ├── keepAlive.js     # Keep-alive service
│   └── deleteItems.js   # Cleanup tasks
├── middleware/          # Express middleware
│   ├── authMiddleware.js # Authentication
│   └── validation.js    # Input validation
├── models/              # Mongoose models
│   ├── User.js
│   ├── News.js
│   ├── Event.js
│   └── ...
├── routes/              # API routes
│   ├── auth.js
│   ├── user.js
│   └── ...
├── scripts/             # Utility scripts
│   └── seedData.js      # Database seeding
├── tests/               # Test files
├── utils/               # Utility functions
│   └── emailUtils.js    # Email utilities
├── .env                 # Environment variables (not in git)
├── .env.example         # Environment template
├── package.json         # Dependencies
├── server.js            # Main server file
└── README.md            # This file
```

## Contributing

Please read the main [CONTRIBUTING.md](../CONTRIBUTING.md) for details on our development process and how to submit pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

## Support

For issues and questions:
- Open an issue on [GitHub](https://github.com/Gaurav-205/KampusKart/issues)
- Contact: gauravkhandelwal205@gmail.com
