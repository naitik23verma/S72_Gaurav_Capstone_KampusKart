import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../config/api';

/**
 * Item Form Page
 * Create or edit lost/found items
 */

const ItemForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'other',
    type: 'lost',
    location: '',
    lastSeenDate: '',
    contactInfo: '',
    imageURL: ''
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const categories = [
    'wallet', 'keys', 'phone', 'documents', 'electronics',
    'clothing', 'books', 'bags', 'other'
  ];

  useEffect(() => {
    if (isEditMode) {
      fetchItem();
    }
  }, [id]);

  const fetchItem = async () => {
    try {
      const response = await api.get(`/lost-found/${id}`);
      const item = response.data.data;

      // Check if user is owner
      if (item.createdBy._id !== user._id) {
        setError('You can only edit your own items');
        setTimeout(() => navigate('/items'), 2000);
        return;
      }

      setFormData({
        title: item.title,
        description: item.description,
        category: item.category,
        type: item.type,
        location: item.location || '',
        lastSeenDate: item.lastSeenDate ? item.lastSeenDate.split('T')[0] : '',
        contactInfo: item.contactInfo || '',
        imageURL: item.imageURL || ''
      });

      if (item.imageURL) {
        setImagePreview(item.imageURL);
      }
    } catch (err) {
      setError('Failed to load item');
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image must be less than 5MB');
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file');
        return;
      }

      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setError('');
    }
  };

  const uploadImage = async () => {
    if (!imageFile) return formData.imageURL;

    setUploading(true);
    const uploadFormData = new FormData();
    uploadFormData.append('image', imageFile);

    try {
      const response = await api.post('/upload', uploadFormData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data.data.url;
    } catch (err) {
      throw new Error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Upload image if new file selected
      let imageURL = formData.imageURL;
      if (imageFile) {
        imageURL = await uploadImage();
      }

      const submitData = {
        ...formData,
        imageURL,
        lastSeenDate: formData.lastSeenDate || undefined
      };

      if (isEditMode) {
        await api.put(`/lost-found/${id}`, submitData);
        navigate(`/items/${id}`);
      } else {
        const response = await api.post('/lost-found', submitData);
        navigate(`/items/${response.data.data._id}`);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save item');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="error-container">
        <div className="error-message">Please login to post items</div>
        <Link to="/login" className="btn btn-primary">
          Login
        </Link>
      </div>
    );
  }

  return (
    <div className="form-page">
      <div className="form-header">
        <Link to="/items" className="back-link">
          ← Back to Items
        </Link>
        <h1>{isEditMode ? 'Edit Item' : 'Post New Item'}</h1>
      </div>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="item-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="type">Type *</label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="lost">Lost</option>
              <option value="found">Found</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="category">Category *</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., Black leather wallet"
            minLength={5}
            maxLength={100}
            required
          />
          <small>{formData.title.length}/100 characters</small>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Provide detailed description..."
            minLength={10}
            maxLength={500}
            rows={4}
            required
          />
          <small>{formData.description.length}/500 characters</small>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g., Library 2nd floor"
              maxLength={100}
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastSeenDate">Last Seen Date</label>
            <input
              type="date"
              id="lastSeenDate"
              name="lastSeenDate"
              value={formData.lastSeenDate}
              onChange={handleChange}
              max={new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="contactInfo">Contact Information</label>
          <input
            type="text"
            id="contactInfo"
            name="contactInfo"
            value={formData.contactInfo}
            onChange={handleChange}
            placeholder="e.g., Email or phone number"
            maxLength={100}
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
          />
          <small>Max 5MB. Formats: JPEG, PNG, GIF, WebP</small>
          
          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Preview" />
            </div>
          )}
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading || uploading}
          >
            {loading ? 'Saving...' : uploading ? 'Uploading...' : isEditMode ? 'Update Item' : 'Post Item'}
          </button>
          <Link to="/items" className="btn btn-secondary">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ItemForm;
