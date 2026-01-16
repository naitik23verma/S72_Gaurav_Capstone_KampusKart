import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../config/api';

/**
 * Items Page
 * Display all lost & found items
 */

const Items = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await api.get('/lost-found');
      setItems(response.data.data || []);
    } catch (err) {
      setError('Failed to load items');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading items...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="items-page">
      <div className="page-header">
        <h1>Lost & Found Items</h1>
        <Link to="/items/create" className="btn btn-primary">
          Report Item
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="empty-state">
          <p>No items found. Be the first to report an item!</p>
        </div>
      ) : (
        <div className="items-grid">
          {items.map((item) => (
            <div key={item._id} className="item-card">
              {item.imageURL && (
                <img src={item.imageURL} alt={item.title} className="item-image" />
              )}
              <div className="item-content">
                <span className={`item-badge ${item.type}`}>{item.type}</span>
                <h3>{item.title}</h3>
                <p className="item-description">{item.description}</p>
                <div className="item-meta">
                  <span className="category">{item.category}</span>
                  <span className="status">{item.status}</span>
                </div>
                {item.location && (
                  <p className="item-location">📍 {item.location}</p>
                )}
                <Link to={`/items/${item._id}`} className="btn btn-sm">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Items;
