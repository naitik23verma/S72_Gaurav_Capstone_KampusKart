import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './MobileMenu.css';

/**
 * Mobile Menu Component
 * Hamburger menu for mobile navigation
 */

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMenu();
  };

  return (
    <>
      <button
        className="mobile-menu-toggle"
        onClick={toggleMenu}
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        {isOpen ? '✕' : '☰'}
      </button>

      {isOpen && (
        <div className="mobile-menu-overlay" onClick={closeMenu}>
          <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-menu-header">
              <h2>Menu</h2>
              <button
                className="mobile-menu-close"
                onClick={closeMenu}
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            <nav className="mobile-menu-nav">
              {isAuthenticated && user && (
                <div className="mobile-menu-user">
                  <div className="mobile-user-info">
                    <span className="mobile-user-name">{user.name}</span>
                    <span className="mobile-user-role">{user.role}</span>
                  </div>
                </div>
              )}

              <Link to="/" className="mobile-menu-link" onClick={closeMenu}>
                🏠 Home
              </Link>
              <Link to="/items" className="mobile-menu-link" onClick={closeMenu}>
                📦 Items
              </Link>

              {isAuthenticated ? (
                <>
                  <Link to="/items/new" className="mobile-menu-link" onClick={closeMenu}>
                    ➕ Post Item
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="mobile-menu-link mobile-menu-logout"
                  >
                    🚪 Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="mobile-menu-link" onClick={closeMenu}>
                    🔐 Login
                  </Link>
                  <Link to="/register" className="mobile-menu-link mobile-menu-register" onClick={closeMenu}>
                    📝 Register
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileMenu;
