import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../config/api';

/**
 * Profile Page
 * User profile with their posted items
 */

const Profile = () => {
  const { user } = useAuth();
  const [myItems, setMyItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    if (user) {
      fetchMyItems();
    }
  }, [user]);

  const fetchMyItems = async () => {
    try {
      const response = await api.get(`/lost-found/user/${user._id}`);
      setMyItems(response.data.data || []);
    } catch (err) {
      setError('Failed to load your items');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="profile-page">
        <div className="error-container">
          <div className="error-message">Please login to view your profile</div>
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>
        </div>
      </div>
    );
  }

  // Filter items by tab
  const filteredItems = myItems.filter(item => {
    if (activeTab === 'all') return true;
    if (activeTab === 'lost') return item.type === 'lost';
    if (activeTab === 'found') return item.type === 'found';
    if (activeTab === 'open') return item.status === 'open';
    if (activeTab === 'resolved') return item.status === 'resolved';
    return true;
  });

  // Calculate statistics
  const stats = {
    total: myItems.length,
    lost: myItems.filter(item => item.type === 'lost').length,
    found: myItems.filter(item => item.type === 'found').length,
    open: myItems.filter(item => item.status === 'open').length,
    resolved: myItems.filter(item => item.status === 'resolved').length,
  };

  return (
    <div className="profile-page">
      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-info">
          {user.avatar && (
            <img src={user.avatar} alt={user.name} className="profile-avatar" />
          )}
          {!user.avatar && (
            <div className="profile-avatar-placeholder">
              {user.name.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="profile-details">
            <h1>{user.name}</h1>
            <p className="profile-email">{user.email}</p>
            <span className="profile-role">{user.role}</span>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <div className="stat-content">
            <div className="stat-value">{stats.total}</div>
            <div className="stat-label">Total Items</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🔍</div>
          <div className="stat-content">
            <div className="stat-value">{stats.lost}</div>
            <div className="stat-label">Lost Items</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <div className="stat-value">{stats.found}</div>
            <div className="stat-label">Found Items</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🟢</div>
          <div className="stat-content">
            <div className="stat-value">{stats.open}</div>
            <div className="stat-label">Open</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🎉</div>
          <div className="stat-content">
            <div className="stat-value">{stats.resolved}</div>
            <div className="stat-label">Resolved</div>
          </div>
        </div>
      </div>

      {/* My Items Section */}
      <div className="my-items-section">
        <div className="section-header">
          <h2>My Items</h2>
          <Link to="/items/new" className="btn btn-primary">
            Post New Item
          </Link>
        </div>

        {/* Tabs */}
        <div className="tabs">
          <button
            className={`tab ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All ({stats.total})
          </button>
          <button
            className={`tab ${activeTab === 'lost' ? 'active' : ''}`}
            onClick={() => setActiveTab('lost')}
          >
            Lost ({stats.lost})
          </button>
          <button
            className={`tab ${activeTab === 'found' ? 'active' : ''}`}
            onClick={() => setActiveTab('found')}
          >
            Found ({stats.found})
          </button>
          <button
            className={`tab ${activeTab === 'open' ? 'active' : ''}`}
            onClick={() => setActiveTab('open')}
          >
            Open ({stats.open})
          </button>
          <button
            className={`tab ${activeTab === 'resolved' ? 'active' : ''}`}
            onClick={() => setActiveTab('resolved')}
          >
            Resolved ({stats.resolved})
          </button>
        </div>

        {/* Items List */}
        {loading ? (
          <div className="loading">Loading your items...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : filteredItems.length === 0 ? (
          <div className="empty-state">
            <p>
              {activeTab === 'all' 
                ? "You haven't posted any items yet."
                : `No ${activeTab} items.`}
            </p>
            <Link to="/items/new" className="btn btn-primary">
              Post Your First Item
            </Link>
          </div>
        ) : (
          <div className="my-items-list">
            {filteredItems.map((item) => (
              <div key={item._id} className="my-item-card">
                {item.imageURL && (
                  <img src={item.imageURL} alt={item.title} className="my-item-image" />
                )}
                {!item.imageURL && (
                  <div className="my-item-image-placeholder">
                    {item.category === 'phone' && '📱'}
                    {item.category === 'wallet' && '👛'}
                    {item.category === 'keys' && '🔑'}
                    {item.category === 'documents' && '📄'}
                    {item.category === 'electronics' && '💻'}
                    {item.category === 'clothing' && '👕'}
                    {item.category === 'books' && '📚'}
                    {item.category === 'bags' && '🎒'}
                    {item.category === 'other' && '📦'}
                  </div>
                )}
                
                <div className="my-item-content">
                  <div className="my-item-header">
                    <h3>{item.title}</h3>
                    <div className="my-item-badges">
                      <span className={`item-badge ${item.type}`}>{item.type}</span>
                      <span className={`status-badge ${item.status}`}>{item.status}</span>
                    </div>
                  </div>
                  
                  <p className="my-item-description">{item.description}</p>
                  
                  <div className="my-item-meta">
                    <span className="meta-item">
                      <strong>Category:</strong> {item.category}
                    </span>
                    {item.location && (
                      <span className="meta-item">
                        <strong>Location:</strong> {item.location}
                      </span>
                    )}
                    <span className="meta-item">
                      <strong>Posted:</strong> {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="my-item-actions">
                    <Link to={`/items/${item._id}`} className="btn btn-sm">
                      View Details
                    </Link>
                    <Link to={`/items/${item._id}/edit`} className="btn btn-secondary btn-sm">
                      Edit
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
