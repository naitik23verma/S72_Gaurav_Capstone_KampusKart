import React, { useState, useEffect, useRef } from 'react';
import { FiCalendar, FiFileText, FiSearch, FiInfo, FiTag, FiEdit2, FiTrash2, FiCheckCircle } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import { API_BASE } from '../config';
import { FeatureModal } from './common/FeatureModal';
import { ImageUpload, ImageFile } from './common/ImageUpload';
import { PageSkeleton } from './common/SkeletonLoader';
import { Footer } from './ui/footer';
import { socialLinks } from '../utils/socialLinks';

interface NewsItem {
  _id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  images?: { url: string; public_id?: string }[];
}

const News = () => {
  const { user, token } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState('All');
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [newNews, setNewNews] = useState({
    title: '',
    description: '',
    date: '',
    category: 'Campus'
  });
  const [error, setError] = useState<string | null>(null);
  const [newsImages, setNewsImages] = useState<ImageFile[]>([]);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const dragImage = useRef<number | null>(null);
  const dragOverImage = useRef<number | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const isSelectingSuggestion = useRef(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [selectedNewsForDetails, setSelectedNewsForDetails] = useState<NewsItem | null>(null);

  // Generate autocomplete suggestions from existing news
  useEffect(() => {
    if (isSelectingSuggestion.current) {
      isSelectingSuggestion.current = false;
      return;
    }
    if (searchInput.trim().length > 0) {
      const suggestions = new Set<string>();
      if (Array.isArray(news)) {
        news.forEach(item => {
          if (item && item.title && item.title.toLowerCase().includes(searchInput.toLowerCase())) {
            suggestions.add(item.title);
          }
          if (item && item.category && item.category.toLowerCase().includes(searchInput.toLowerCase())) {
            suggestions.add(item.category);
          }
          if (item && item.description && item.description.toLowerCase().includes(searchInput.toLowerCase())) {
            const words = item.description.split(' ').filter(word => 
              word.toLowerCase().includes(searchInput.toLowerCase()) && word.length > 3
            );
            words.forEach(word => suggestions.add(word));
          }
        });
      }
      setFilteredSuggestions(Array.from(suggestions).slice(0, 5));
      setShowSuggestions(true);
    } else {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchInput, news]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    fetchNews();
  }, []);

  // Auto-hide success message after 3 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const fetchNews = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE}/api/news`);
      if (!response.ok) throw new Error('Failed to fetch news');
      const data = await response.json();
      if (Array.isArray(data)) {
        setNews(data);
      } else {
        setNews([]);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
      setError('Failed to load news');
      setNews([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditNews = (item: NewsItem) => {
    setEditingNews(item);
    setNewNews({
      title: item.title,
      description: item.description,
      date: item.date.split('T')[0],
      category: item.category
    });
    setNewsImages((item.images || []).map(img => ({ previewUrl: img.url, url: img.url, public_id: img.public_id })));
    setIsModalOpen(true);
  };

  const handleDeleteNews = async (id: string) => {
    if (!token) return;
    if (!window.confirm('Are you sure you want to delete this news item?')) return;
    try {
      const response = await fetch(`${API_BASE}/api/news/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to delete news');
      }
      setNews(news.filter(n => n._id !== id));
      setSuccessMessage('News deleted successfully!');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to delete news');
    }
  };

  const handleSaveNews = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    if (!newNews.title.trim()) { setError('Title is required'); return; }
    if (!newNews.description.trim()) { setError('Description is required'); return; }
    if (!newNews.date) { setError('Date is required'); return; }
    try {
      const method = editingNews ? 'PUT' : 'POST';
      const url = editingNews ? `${API_BASE}/api/news/${editingNews._id}` : `${API_BASE}/api/news`;
      const formData = new FormData();
      formData.append('title', newNews.title);
      formData.append('description', newNews.description);
      formData.append('date', newNews.date);
      formData.append('category', newNews.category);
      newsImages.forEach((img) => {
        if (img.file) formData.append('images', img.file);
      });
      // When editing, tell the backend which existing images to keep
      if (editingNews) {
        const keepPublicIds = newsImages.filter(img => img.public_id).map(img => img.public_id);
        formData.append('keepImages', JSON.stringify(keepPublicIds));
      }
      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to save news');
      }
      const savedNews = await response.json();
      if (editingNews) {
        setNews(news.map(n => n._id === savedNews._id ? savedNews : n));
        setSuccessMessage('News updated successfully!');
      } else {
        setNews([savedNews, ...news]);
        setSuccessMessage('News added successfully!');
      }
      closeNewsModal();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to save news');
    }
  };

  const closeNewsModal = () => {
    setIsModalOpen(false);
    setEditingNews(null);
    setNewNews({
      title: '',
      description: '',
      date: '',
      category: 'Campus'
    });
    setNewsImages([]);
    setError(null);
  };

  const filteredNews = news.filter(item =>
    (filterCategory === 'All' || item.category === filterCategory) &&
    (item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
     item.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (isLoading) {
    return <PageSkeleton contentType="cards" itemCount={6} filterCount={1} showAddButton={user?.isAdmin} />;
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        
        {/* Success Message Banner */}
        {successMessage && (
          <div
            className="mb-6 rounded-lg bg-green-50 border-2 border-green-200 p-4 flex items-center gap-3"
            role="alert"
            aria-live="polite"
          >
            <FiCheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
            <p className="text-sm font-medium text-green-800">{successMessage}</p>
          </div>
        )}
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <h1 className="text-h2 font-extrabold text-black">Campus News</h1>
          {user?.isAdmin && (
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[#181818] text-white font-bold text-lg hover:bg-[#00C6A7] active:bg-[#181818] transition-colors duration-200"
            >
              + Add News
            </button>
          )}
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 gap-4">
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <div className="relative">
              <select
                value={filterCategory}
                onChange={e => setFilterCategory(e.target.value)}
                className="appearance-none w-full sm:w-auto px-5 py-3 pr-10 rounded-lg bg-white text-gray-700 font-semibold border-2 border-gray-200 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00C6A7] focus:border-transparent transition-all duration-200 cursor-pointer"
              >
                <option value="All">All Categories</option>
                <option value="Campus">Campus</option>
                <option value="Academic">Academic</option>
                <option value="Infrastructure">Infrastructure</option>
                <option value="Achievements">Achievements</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
          {/* Search Bar */}
          <div className="relative w-full sm:w-[380px] md:w-[440px] lg:w-[520px]" ref={searchRef}>
            <div className="relative w-full rounded-lg border-2 border-gray-200 bg-white hover:border-gray-300 focus-within:ring-2 focus-within:ring-[#00C6A7] focus-within:border-transparent transition-all duration-200 flex items-center">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setSearchQuery(searchInput);
                    setShowSuggestions(false);
                  } else if (e.key === 'Escape') {
                    setShowSuggestions(false);
                  }
                }}
                placeholder="Search news..."
                className="flex-1 pl-12 pr-3 py-3.5 bg-transparent text-gray-700 font-medium outline-none text-base border-none placeholder:text-gray-400 rounded-l-lg"
              />
              <button
                type="button"
                onClick={() => {
                  setSearchQuery(searchInput);
                  setShowSuggestions(false);
                }}
                className="px-6 py-3.5 bg-[#181818] text-white font-bold text-sm hover:bg-[#00C6A7] active:bg-[#181818] flex items-center justify-center gap-2 transition-all duration-200 border-l-2 border-gray-200 rounded-r-lg rounded-l-none"
                aria-label="Search"
              >
                <FiSearch className="w-4 h-4" />
                <span className="hidden sm:inline">Search</span>
              </button>
            </div>
            
            {/* Autocomplete Dropdown */}
            {showSuggestions && filteredSuggestions.length > 0 && (
              <div className="absolute z-[60] w-full mt-2 bg-white border-2 border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                {filteredSuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      isSelectingSuggestion.current = true;
                      setSearchInput(suggestion);
                      setSearchQuery(suggestion);
                      setShowSuggestions(false);
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    className="flex items-center px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors border-b-2 border-gray-200 last:border-b-0"
                  >
                    <FiSearch className="w-4 h-4 text-gray-400 mr-3 flex-shrink-0" />
                    <span className="text-sm font-medium text-gray-700">{suggestion}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {filteredNews.map(item => (
            <div key={item._id} className="bg-white rounded-lg border-2 border-gray-200 overflow-hidden cursor-pointer hover:border-gray-300 transition-colors duration-200" onClick={() => setSelectedNewsForDetails(item)}>
              {/* Image Section with Overlay */}
              <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                {item.images && item.images.length > 0 ? (
                  <>
                    <img
                      src={item.images[0].url}
                      alt={item.title}
                      className="object-cover w-full h-full"
                      onClick={(e) => { e.stopPropagation(); setZoomedImage(item.images[0].url); }}
                    />
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-50">
                    <span className="text-5xl text-gray-300">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-16 h-16">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-3A2.25 2.25 0 008.25 5.25V9m7.5 0v10.5A2.25 2.25 0 0113.5 21h-3a2.25 2.25 0 01-2.25-2.25V9m7.5 0H6.75m8.25 0H18m-12 0h2.25" />
                      </svg>
                    </span>
                  </div>
                )}
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="text-xs px-3 py-1.5 rounded-lg font-medium bg-white/90 text-gray-800 flex items-center gap-1">
                    <FiTag className="w-3 h-3" />
                    {item.category}
                  </span>
                </div>
                {/* Date Badge */}
                <div className="absolute top-4 right-4">
                  <span className="text-xs px-3 py-1.5 rounded-lg font-medium bg-white/90 text-gray-800 flex items-center gap-1">
                    <FiCalendar className="w-3 h-3" />
                    {new Date(item.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-4 sm:p-5 md:p-6">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 line-clamp-2">{item.title}</h2>
                <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-3">{item.description}</p>

                {/* Action Buttons */}
                {user && user.isAdmin && (
                  <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t-2 border-gray-200">
                    <button
                      onClick={(e) => { e.stopPropagation(); handleEditNews(item); }}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 sm:py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors duration-200 text-sm sm:text-base min-w-0"
                    >
                      <FiEdit2 className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">Edit</span>
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDeleteNews(item._id); }}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 sm:py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors duration-200 text-sm sm:text-base min-w-0"
                    >
                      <FiTrash2 className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">Delete</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
          {filteredNews.length === 0 && (
            <div className="col-span-full text-center text-gray-400 py-12">No news found.</div>
          )}
        </div>

        {/* Add/Edit News Modal */}
        <FeatureModal
          isOpen={isModalOpen}
          onClose={closeNewsModal}
          title={editingNews ? 'Edit News' : 'Add News'}
          error={error}
        >
              <form onSubmit={handleSaveNews} className="space-y-8">
                {/* News Details Section */}
                <div className="border-2 border-gray-200 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-bold mb-4 text-gray-900 flex items-center gap-2">News Details <FiInfo className="text-gray-400" title="Fill in the details of your news item." /></h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">Title <FiTag className="inline text-gray-400" /></label>
                      <div className="relative">
                        <input
                          type="text"
                          value={newNews.title}
                          onChange={e => setNewNews({...newNews, title: e.target.value})}
                          className="w-full pl-10 pr-3 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00C6A7] focus:border-transparent bg-white text-gray-700 text-sm"
                          placeholder="e.g. New Library Opening"
                          required
                          aria-label="News Title"
                        />
                        <FiTag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Give a short, descriptive title for the news item.</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">Date <FiCalendar className="inline text-gray-400" /></label>
                      <input
                        type="date"
                        value={newNews.date}
                        onChange={e => setNewNews({...newNews, date: e.target.value})}
                        className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00C6A7] focus:border-transparent bg-white text-gray-700 text-sm"
                        required
                        aria-label="News Date"
                      />
                      <p className="text-xs text-gray-500 mt-1">When is this news relevant?</p>
                    </div>
                  </div>
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">Description <FiFileText className="inline text-gray-400" /></label>
                    <div className="relative">
                      <textarea
                        value={newNews.description}
                        onChange={e => setNewNews({...newNews, description: e.target.value})}
                        className="w-full pl-10 pr-3 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00C6A7] focus:border-transparent bg-white text-gray-700 text-sm resize-none"
                        rows={4}
                        placeholder="Describe the news, any important details, etc."
                        required
                        aria-label="News Description"
                      ></textarea>
                      <FiFileText className="absolute left-3 top-3 text-gray-400" />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Provide details to help users understand the news.</p>
                  </div>
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">Category <FiTag className="inline text-gray-400" /></label>
                    <select
                      value={newNews.category}
                      onChange={e => setNewNews({...newNews, category: e.target.value})}
                      className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00C6A7] focus:border-transparent bg-white text-gray-700 text-sm"
                      required
                      aria-label="News Category"
                    >
                      <option value="Campus">Campus</option>
                      <option value="Academic">Academic</option>
                      <option value="Infrastructure">Infrastructure</option>
                      <option value="Achievements">Achievements</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-1">Select the category for this news item.</p>
                  </div>
                </div>
                {/* Images Section */}
                <ImageUpload
                  images={newsImages}
                  onImagesChange={setNewsImages}
                  maxImages={5}
                  id="news-image-upload"
                />
                <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={closeNewsModal}
                    className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-700 bg-white border-2 border-gray-200 hover:bg-gray-50 active:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-lg text-sm font-semibold text-white bg-[#181818] hover:bg-[#00C6A7] active:bg-[#181818] transition-colors duration-200"
                  >
                    {editingNews ? 'Save Changes' : 'Add News'}
                  </button>
                </div>
              </form>
        </FeatureModal>

        {/* News Details Modal */}
        {selectedNewsForDetails && (
          <div
            className="fixed inset-0 bg-black/60 flex items-end sm:items-center justify-center z-[9999] p-0 sm:p-4"
            role="dialog"
            aria-modal="true"
            aria-label="News details"
            onClick={() => setSelectedNewsForDetails(null)}
          >
            <div className="bg-white rounded-t-xl sm:rounded-xl border-2 border-gray-200 p-4 sm:p-6 md:p-8 max-w-3xl w-full mx-auto max-h-[95vh] sm:max-h-[90vh] overflow-y-auto relative" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setSelectedNewsForDetails(null)}
                aria-label="Close"
                className="absolute top-6 right-6 z-10 bg-[#181818] hover:bg-[#00C6A7] active:bg-[#181818] text-white rounded-lg p-2.5 transition-all duration-200 flex items-center justify-center w-10 h-10"
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 pr-12 sm:pr-14">{selectedNewsForDetails.title}</h2>
              {selectedNewsForDetails.images && selectedNewsForDetails.images.length > 0 && (
                <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedNewsForDetails.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img.url}
                      alt={`News image ${idx + 1}`}
                      className="w-full h-56 object-cover rounded-lg cursor-zoom-in"
                      onClick={() => setZoomedImage(img.url)}
                    />
                  ))}
                </div>
              )}
              <div className="space-y-4 text-gray-700">
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-3 py-1.5 rounded-lg font-medium bg-white border-2 border-gray-200 text-gray-800 flex items-center gap-1">
                    <FiTag className="w-3 h-3" />{selectedNewsForDetails.category}
                  </span>
                  <span className="text-xs px-3 py-1.5 rounded-lg font-medium bg-white border-2 border-gray-200 text-gray-800 flex items-center gap-1">
                    <FiCalendar className="w-3 h-3" />{new Date(selectedNewsForDetails.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Description</h4>
                  <p className="text-gray-700 whitespace-pre-wrap text-sm">{selectedNewsForDetails.description}</p>
                </div>
              </div>
              {user?.isAdmin && (
                <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => { setSelectedNewsForDetails(null); handleEditNews(selectedNewsForDetails); }}
                    className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-700 bg-white border-2 border-gray-200 hover:bg-gray-50 flex items-center gap-1"
                  >
                    <FiEdit2 className="w-4 h-4" /> Edit
                  </button>
                  <button
                    onClick={() => { setSelectedNewsForDetails(null); handleDeleteNews(selectedNewsForDetails._id); }}
                    className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-[#F05A25] hover:bg-red-600 flex items-center gap-1"
                  >
                    <FiTrash2 className="w-4 h-4" /> Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Zoomed Image Modal */}
        {zoomedImage && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[10000]" onClick={() => setZoomedImage(null)}>
            <img src={zoomedImage} alt="Zoomed" className="max-h-[90vh] max-w-[90vw] rounded-lg" onClick={(e) => e.stopPropagation()} />
            <button
              onClick={() => setZoomedImage(null)}
              aria-label="Close zoomed image"
              className="absolute top-4 right-4 bg-gray-800 rounded-lg p-2 text-white hover:bg-gray-700 transition-colors duration-200 z-50"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        logo={<img src="/Logo.png" alt="KampusKart Logo" className="h-7 w-7" />}
        brandName="KampusKart"
        socialLinks={socialLinks}
        mainLinks={[
          { href: '/events', label: 'Events' },
          { href: '/facilities', label: 'Facilities' },
          { href: '/clubs-recruitment', label: 'Clubs' },
          { href: '/campus-map', label: 'Map' },
        ]}
        legalLinks={[
          { href: '/privacy', label: 'Privacy' },
          { href: '/terms', label: 'Terms' },
        ]}
        copyright={{
          text: `© ${new Date().getFullYear()} KampusKart`,
          license: 'All rights reserved.',
        }}
      />
    </div>
  );
};

export default News; 


