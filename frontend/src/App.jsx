import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import MobileMenu from './components/MobileMenu';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Items from './pages/Items';
import ItemDetail from './pages/ItemDetail';
import ItemForm from './pages/ItemForm';
import './App.css';

/**
 * Navigation Component
 */
const Navigation = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          KampusKart
        </Link>
        
        <div className="nav-menu">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/items" className="nav-link">Items</Link>
          
          {isAuthenticated ? (
            <>
              <span className="nav-user">Hello, {user?.name}</span>
              <button onClick={logout} className="btn btn-sm">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="btn btn-sm btn-primary">
                Register
              </Link>
            </>
          )}
          
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
};

/**
 * Main App Component
 */
function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navigation />
          
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/items" element={<Items />} />
              <Route path="/items/new" element={<ItemForm />} />
              <Route path="/items/:id" element={<ItemDetail />} />
              <Route path="/items/:id/edit" element={<ItemForm />} />
            </Routes>
          </main>

          <footer className="footer">
            <p>&copy; 2026 KampusKart. All rights reserved.</p>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
