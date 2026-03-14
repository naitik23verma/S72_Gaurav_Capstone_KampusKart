# KampusKart Frontend

Frontend application for KampusKart - MIT ADT University's campus portal. Built with React, TypeScript, and modern web technologies.

## Features

- Interactive campus map with Google Maps integration
- Real-time global chat with Socket.IO
- News and events management
- Lost & found portal with image uploads
- Complaints system with status tracking
- Facilities directory
- Clubs and recruitment information
- User profile management
- Authentication with JWT and Google OAuth 2.0
- Responsive design for all devices
- Toast notifications
- Loading skeletons for better UX

## Tech Stack

- **Framework**: React 18.3 with TypeScript
- **Build Tool**: Vite 6.x
- **Styling**: Tailwind CSS 3.4
- **UI Components**: Material-UI 7.x, shadcn/ui
- **Routing**: React Router 7.x
- **State Management**: React Context API
- **Real-time**: Socket.IO Client 4.x
- **HTTP Client**: Axios
- **Animations**: Framer Motion 12.x
- **Maps**: Google Maps API
- **Forms**: React Hook Form
- **Date Handling**: date-fns

## Getting Started

### Prerequisites

- Node.js (v16.0.0 or higher)
- npm (v7.0.0 or higher)

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env` file:
   ```env
   VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   Application will be available at `http://localhost:3000`

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## Environment Variables

Create a `.env` file in the frontend directory:

```env
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

See `.env.example` in the root directory for more details.

## Project Structure

```
frontend/
├── public/                  # Static assets
│   ├── Logo.png            # Application logo
│   └── images/             # Image assets
├── src/
│   ├── components/         # React components
│   │   ├── common/         # Reusable components
│   │   ├── Chat/           # Chat components
│   │   ├── ui/             # UI primitives (shadcn)
│   │   ├── CampusMap.tsx   # Campus map
│   │   ├── Events.tsx      # Events
│   │   ├── News.tsx        # News
│   │   ├── LostFound.tsx   # Lost & Found
│   │   ├── Complaints.tsx  # Complaints
│   │   ├── Facilities.tsx  # Facilities
│   │   └── Profile.tsx     # User profile
│   ├── contexts/           # React contexts
│   │   └── AuthContext.tsx # Authentication
│   ├── hooks/              # Custom React hooks
│   ├── utils/              # Utility functions
│   ├── App.tsx             # Main App component
│   └── main.tsx            # Entry point
├── .env                    # Environment variables
├── package.json            # Dependencies
├── vite.config.ts          # Vite configuration
├── tailwind.config.js      # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── netlify.toml            # Netlify configuration
```

## Key Components

### Authentication
- Login with email/password or Google OAuth
- JWT token management
- Protected routes
- Password reset with OTP

### Campus Map
- Google Maps integration
- Custom markers for facilities
- Info windows with facility details
- Search functionality

### Real-time Chat
- Socket.IO integration
- Message reactions and replies
- File attachments
- Typing indicators
- Emoji picker

### Lost & Found
- Report lost/found items
- Image uploads with Cloudinary
- Search and filter
- Contact system

### Complaints
- Submit complaints with images
- Category classification
- Status tracking
- Priority levels

## Design System

### Colors
- Primary Black: `#181818`
- Primary Teal: `#00C6A7`
- Hover Teal: `#009e87`
- Accent Orange: `#F05A25`
- Border: `#e5e7eb`
- Card BG: `#f9fafb`

### Components
- All buttons: `rounded-lg`
- All borders: `border-2`
- Border color: `border-gray-200`
- Transitions: `transition-colors duration-200`

## Development Guidelines

- Use TypeScript for type safety
- Follow React best practices
- Use Tailwind CSS for styling
- Implement responsive design
- Write clean, documented code
- Follow ESLint rules
- Use custom hooks for reusable logic
- Implement proper error handling
- Add loading states for async operations

## Building for Production

1. Build the project:
   ```bash
   npm run build
   ```

2. Output will be in the `dist/` directory

3. Preview the build:
   ```bash
   npm run preview
   ```

## Deployment

### Netlify Deployment

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables:
   ```
   VITE_GOOGLE_MAPS_API_KEY=your_api_key
   ```

The `netlify.toml` file is already configured with:
- Redirects for SPA routing
- Build settings
- Headers for security

## Contributing

Please read the main [CONTRIBUTING.md](../CONTRIBUTING.md) for details on our development process and how to submit pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

## Support

For issues and questions:
- Open an issue on [GitHub](https://github.com/Gaurav-205/KampusKart/issues)
- Contact: gauravkhandelwal205@gmail.com
