import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Home Page
 * Landing page with welcome message and navigation
 */

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="home-page">
      <div className="hero">
        <h1>Welcome to KampusKart</h1>
        <p>Your campus community platform for lost & found items</p>
        
        {isAuthenticated ? (
          <div className="user-welcome">
            <h2>Hello, {user?.name}!</h2>
            <div className="action-buttons">
              <Link to="/items" className="btn btn-primary">
                Browse Items
              </Link>
              <Link to="/items/create" className="btn btn-secondary">
                Report Lost/Found Item
              </Link>
            </div>
          </div>
        ) : (
          <div className="auth-buttons">
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
            <Link to="/register" className="btn btn-secondary">
              Register
            </Link>
          </div>
        )}
      </div>

      <div className="features">
        <h2>Features</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>📦 Lost & Found</h3>
            <p>Report and find lost items on campus</p>
          </div>
          <div className="feature-card">
            <h3>🔍 Search & Filter</h3>
            <p>Easily search by category, location, and date</p>
          </div>
          <div className="feature-card">
            <h3>📸 Image Upload</h3>
            <p>Add photos to help identify items</p>
          </div>
          <div className="feature-card">
            <h3>🔐 Secure</h3>
            <p>JWT authentication and Google OAuth</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
