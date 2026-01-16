import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../config/api';

/**
 * Item Detail Page
 * Display full details of a lost/found item
 */

const ItemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchItem();
  }, [id]);

  const fetchItem = async () => {
    try {
      const response = await api.get(`/lost-found/${id}`);
      setItem(response.data.data);
    } catch (err) {
      setError('Failed to load item details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this item?')) {
      return;
    }

    setDeleting(true);
    try {
      await api.delete(`/lost-found/${id}`);
      navigate('/items');
    } catch (err) {
      setError('Failed to delete item');
      console.error(err);
      setDeleting(false);
    }
  };

  const handleStatusUpdate = async (newStatus) => {
    try {
      const response = await api.put(`/lost-found/${id}`, { status: newStatus });
      setItem(response.data.data);
    } catch (err) {
      setError('Failed to update status');
      console.error(err);
    }
  };

  if (loading) {
    return <div className="loading">Loading item details...</div>;
  }

  if (error && !item) {
    return (
      <div className="error-container">
        <div className="error-message">{error}</div>
        <Link to="/items" className="btn btn-primary">
          Back to Items
        </Link>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="error-container">
        <div className="error-message">Item not found</div>
        <Link to="/items" className="btn btn-primary">
          Back to Items
        </Link>
      </div>
    );
  }

  const isOwner = user && item.createdBy._id === user._id;

  return (
    <div className="item-detail-page">
      <div className="detail-header">
        <Link to="/items" className="back-link">
          ← Back to Items
        </Link>
        {isOwner && (
          <div className="owner-actions">
            <Link to={`/items/${id}/edit`} className="btn btn-secondary btn-sm">
              Edit
            </Link>
            <button
              onClick={handleDelete}
              className="btn btn-danger btn-sm"
              disabled={deleting}
            >
              {deleting ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        )}
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="detail-container">
        <div className="detail-main">
          {item.imageURL && (
            <div className="detail-image-container">
              <img src={item.imageURL} alt={item.title} className="detail-image" />
            </div>
          )}

          <div className="detail-content">
            <div className="detail-badges">
              <span className={`item-badge ${item.type}`}>{item.type}</span>
              <span className={`status-badge ${item.status}`}>{item.status}</span>
            </div>

            <h1 className="detail-title">{item.title}</h1>

            <div className="detail-meta">
              <div className="meta-item">
                <span className="meta-label">Category:</span>
                <span className="meta-value">{item.category}</span>
              </div>
              {item.location && (
                <div className="meta-item">
                  <span className="meta-label">Location:</span>
                  <span className="meta-value">📍 {item.location}</span>
                </div>
              )}
              {item.lastSeenDate && (
                <div className="meta-item">
                  <span className="meta-label">Last Seen:</span>
                  <span className="meta-value">
                    {new Date(item.lastSeenDate).toLocaleDateString()}
                  </span>
                </div>
              )}
              <div className="meta-item">
                <span className="meta-label">Posted:</span>
                <span className="meta-value">
                  {new Date(item.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="detail-description">
              <h2>Description</h2>
              <p>{item.description}</p>
            </div>

            {item.contactInfo && (
              <div className="detail-contact">
                <h2>Contact Information</h2>
                <p>{item.contactInfo}</p>
              </div>
            )}

            {isOwner && item.status === 'open' && (
              <div className="status-actions">
                <h3>Mark as Resolved</h3>
                <p>Have you found the item or returned it to the owner?</p>
                <button
                  onClick={() => handleStatusUpdate('resolved')}
                  className="btn btn-secondary"
                >
                  Mark as Resolved
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="detail-sidebar">
          <div className="sidebar-card">
            <h3>Posted By</h3>
            <div className="user-info">
              {item.createdBy.avatar && (
                <img
                  src={item.createdBy.avatar}
                  alt={item.createdBy.name}
                  className="user-avatar"
                />
              )}
              <div>
                <p className="user-name">{item.createdBy.name}</p>
                <p className="user-role">{item.createdBy.role}</p>
              </div>
            </div>
          </div>

          {!isOwner && (
            <div className="sidebar-card">
              <h3>Contact Owner</h3>
              <p>
                If you have information about this item, please contact the owner.
              </p>
              {item.contactInfo && (
                <p className="contact-info">{item.contactInfo}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
