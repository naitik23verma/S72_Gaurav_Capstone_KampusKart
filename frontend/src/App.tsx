import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';
import Login from './components/Login';
import Signup from './components/Signup';
import Landing from './components/Landing';
import ForgotPassword from './components/ForgotPassword';
import Home from './components/Home';
import LostFound from './components/LostFound';
import Profile from './components/Profile';
import Complaints from './components/Complaints';
import CampusMap from './components/CampusMap';
import Events from './components/Events';
import News from './components/News';
import Facilities from './components/Facilities';
import ChatWindow from './components/Chat/ChatWindow';
import ClubsRecruitment from './components/ClubsRecruitment';
import KampusKartNavbar from './components/KampusKartNavbar';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';

// Protected Route component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token } = useAuth();
  if (!token) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

// Google Callback component
const GoogleCallback: React.FC = () => {
  const { handleGoogleCallback } = useAuth();
  const location = useLocation();
  const [done, setDone] = React.useState(false);

  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    if (token) {
      handleGoogleCallback(token)
        .catch(() => {})
        .finally(() => setDone(true));
    } else {
      setDone(true);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!done) return null;
  return <Navigate to="/home" />;
};

// Layout wrapper that shows navbar on all pages except login/signup
const AppLayout: React.FC = () => {
  const location = useLocation();
  const hideNavbarRoutes = ['/login', '/signup', '/forgot-password'];
  const showNavbar = !hideNavbarRoutes.some(route => location.pathname === route || location.pathname.startsWith(`${route}/`));

  return (
    <div className="flex flex-col min-h-screen">
      {showNavbar && <KampusKartNavbar />}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<RootRedirect />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/auth/google/callback" element={<GoogleCallback />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <ChatWindow />
              </ProtectedRoute>
            }
          />
          <Route
            path="/lostfound"
            element={
              <ProtectedRoute>
                <LostFound />
              </ProtectedRoute>
            }
          />
          <Route
            path="/complaints"
            element={
              <ProtectedRoute>
                <Complaints />
              </ProtectedRoute>
            }
          />
          <Route
            path="/campus-map"
            element={
              <ProtectedRoute>
                <CampusMap />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/:userId"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/events"
            element={
              <ProtectedRoute>
                <Events />
              </ProtectedRoute>
            }
          />
          <Route
            path="/news"
            element={
              <ProtectedRoute>
                <News />
              </ProtectedRoute>
            }
          />
          <Route
            path="/facilities"
            element={
              <ProtectedRoute>
                <Facilities />
              </ProtectedRoute>
            }
          />
          <Route
            path="/clubs-recruitment"
            element={
              <ProtectedRoute>
                <ClubsRecruitment />
              </ProtectedRoute>
            }
          />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
        </Routes>
      </div>
    </div>
  );
};

// Root redirect component
const RootRedirect: React.FC = () => {
  const { token } = useAuth();
  if (token) {
    return <Navigate to="/home" />;
  }
  return <Landing />;
};

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <AppLayout />
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;
