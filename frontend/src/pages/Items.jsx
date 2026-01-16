import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import api from '../config/api';
import { ItemsGridSkeleton } from '../components/LoadingSkeleton';

/**
 * Items Page
 * Display all lost & found items with search and filters
 */

const Items = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const categories = [
    'all', 'wallet', 'keys', 'phone', 'documents', 
    'electronics', 'clothing', 'books', 'bags', 'other'
  ];

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

  // Filter items based on search and filters
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      // Search filter
      const matchesSearch = searchQuery === '' || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.location && item.location.toLowerCase().includes(searchQuery.toLowerCase()));

      // Category filter
      const matchesCategory = selectedCategory === 'all' || 
        item.category === selectedCategory;

      // Type filter
      const matchesType = selectedType === 'all' || 
        item.type === selectedType;

      // Status filter
      const matchesStatus = selectedStatus === 'all' || 
        item.status === selectedStatus;

      return matchesSearch && matchesCategory && matchesType && matchesStatus;
    });
  }, [items, searchQuery, selectedCategory, selectedType, selectedStatus]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedType('all');
    setSelectedStatus('all');
  };

  const hasActiveFilters = searchQuery !== '' || 
    selectedCategory !== 'all' || 
    selectedType !== 'all' || 
    selectedStatus !== 'all';

  if (loading) {
    return (
      <div className="items-page">
        <div className="page-header">
          <h1>Lost & Found Items</h1>
          <Link to="/items/new" className="btn btn-primary">
            Post Item
          </Link>
        </div>
        <ItemsGridSkeleton count={6} />
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="items-page">
      <div className="page-header">
        <h1>Lost & Found Items</h1>
        <Link to="/items/new" className="btn btn-primary">
          Post Item
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="filters-container">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by title, description, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>

        <div className="filters-row">
          <div className="filter-group">
            <label htmlFor="category-filter">Category</label>
            <select
              id="category-filter"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="filter-select"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="type-filter">Type</label>
            <select
              id="type-filter"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Types</option>
              <option value="lost">Lost</option>
              <option value="found">Found</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="status-filter">Status</label>
            <select
              id="status-filter"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Status</option>
              <option value="open">Open</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>

          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              className="btn btn-secondary btn-sm clear-filters-btn"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Results count */}
      <div className="results-info">
        <p>
          Showing {filteredItems.length} of {items.length} items
          {hasActiveFilters && ' (filtered)'}
        </p>
      </div>

      {/* Items grid */}
      {filteredItems.length === 0 ? (
        <div className="empty-state">
          {hasActiveFilters ? (
            <>
              <p>No items match your filters.</p>
              <button onClick={handleClearFilters} className="btn btn-primary">
                Clear Filters
              </button>
            </>
          ) : (
            <p>No items found. Be the first to report an item!</p>
          )}
        </div>
      ) : (
        <div className="items-grid">
          {filteredItems.map((item) => (
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
