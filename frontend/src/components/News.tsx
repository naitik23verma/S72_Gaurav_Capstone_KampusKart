import React, { useState, useEffect, useRef, useMemo } from 'react';
import { FiPlus, FiCalendar, FiFileText, FiSearch, FiInfo, FiTag, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import { API_BASE } from '../config';
import AIAutocomplete from './AIAutocomplete';
import { useAIAutocomplete } from '../hooks/useAIAutocomplete';
import { FeatureModal } from './common/FeatureModal';
import { ImageUpload, ImageFile } from './common/ImageUpload';
import { validateMultipleRequired } from '../utils/formValidation';
import { PageSkeleton } from './common/SkeletonLoader';

interface NewsItem {
  _id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  images?: { url: string }[];
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

  // AI Autocomplete hook
  const preExistingStrings = useMemo(() => {
    const pool: string[] = [];
    if (Array.isArray(news)) {
      news.forEach(n => {
        if (n && n.title) pool.push(n.title);
        if (n && n.description) pool.push(n.description);
        if (n && n.category) pool.push(n.category);
      });
    }
    return Array.from(new Set(pool.map(s => s?.trim()).filter(Boolean)));
  }, [news]);

  const {
    suggestions,
    isLoading: aiLoading,
    error: aiError,
    handleInputChange: handleAISearchInput,
    handleSuggestionSelect,
    clearSuggestions
  } = useAIAutocomplete({
    context: { section: 'news' },
    debounceMs: 300,
    preExistingStrings
  });

  useEffect(() => {
    fetchNews();
  }, []);

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

  const handleAddNews = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    try {
      const response = await fetch(`${API_BASE}/api/news`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newNews)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to add news');
      }

      const savedNews = await response.json();
      setNews([savedNews, ...news]);
      setIsModalOpen(false);
      setNewNews({
        title: '',
        description: '',
        date: '',
        category: 'Campus'
      });
    } catch (error) {
      console.error('Error adding news:', error);
      setError(error instanceof Error ? error.message : 'Failed to add news');
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
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to delete news');
    }
  };

  const handleSaveNews = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
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
      } else {
        setNews([savedNews, ...news]);
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
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-28">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <h1 className="text-h2 font-extrabold text-black">Campus News</h1>
          {user?.isAdmin && (
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[#181818] text-white font-bold text-lg shadow hover:bg-[#00C6A7] transition"
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
                onChange={e => setFilterCategory(e.target.value as 'all' | 'Announcements' | 'Campus News' | 'Events' | 'Achievements')}
                className="appearance-none w-full sm:w-auto px-5 py-3 pr-10 rounded-lg bg-white text-gray-700 font-semibold border-2 border-gray-200 shadow-sm hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00C6A7] focus:border-transparent transition-all duration-200 cursor-pointer"
              >
                <option value="All">All Categories</option>
                <option value="Campus">Campus</option>
                <option value="Food">Food</option>
                <option value="Academics">Academics</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
          {/* AI-Powered Search Bar */}
          <div className="relative w-full lg:w-[520px]">
            <AIAutocomplete
              value={searchInput}
              onChange={(value) => {
                setSearchInput(value);
                handleAISearchInput(value);
              }}
              onSelect={(suggestion) => {
                setSearchInput(suggestion.text);
                setSearchQuery(suggestion.text);
                handleSuggestionSelect(suggestion);
              }}
              placeholder="Search news"
              className="w-full"
              suggestions={suggestions}
              isLoading={aiLoading}
              disabled={false}
              showSubmitButton
              submitLabel="Search"
              onSubmit={() => setSearchQuery(searchInput)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map(item => (
            <div key={item._id} className="bg-white rounded-lg shadow-sm hover:shadow-lg active:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden group cursor-pointer">
              {/* Image Section with Overlay */}
              <div className="relative h-60 sm:h-80 overflow-hidden">
                {item.images && item.images.length > 0 ? (
                  <>
                    <img
                      src={item.images[0].url}
                      alt={item.title}
                      className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
                      onClick={() => setZoomedImage(item.images[0].url)}
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
                  <span className="text-xs px-3 py-1.5 rounded-lg font-medium shadow-sm bg-white/90 backdrop-blur-sm text-gray-800 flex items-center gap-1">
                    <FiTag className="w-3 h-3" />
                    {item.category}
                  </span>
                </div>
                {/* Date Badge */}
                <div className="absolute top-4 right-4">
                  <span className="text-xs px-3 py-1.5 rounded-lg font-medium shadow-sm bg-white/90 backdrop-blur-sm text-gray-800 flex items-center gap-1">
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
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{item.title}</h2>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{item.description}</p>

                {/* Action Buttons */}
                {user && user.isAdmin && (
                  <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => handleEditNews(item)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 sm:py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors duration-200 text-sm sm:text-base min-w-0"
                    >
                      <FiEdit2 className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">Edit</span>
                    </button>
                    <button
                      onClick={() => handleDeleteNews(item._id)}
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
                <div className="border-b pb-6 mb-6 bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-bold mb-4 text-gray-900 flex items-center gap-2">News Details <FiInfo className="text-gray-400" title="Fill in the details of your news item." /></h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">Title <FiTag className="inline text-gray-400" /></label>
                      <div className="relative">
                        <input
                          type="text"
                          value={newNews.title}
                          onChange={e => setNewNews({...newNews, title: e.target.value})}
                          className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00C6A7] focus:border-transparent bg-white text-gray-700 sm:text-sm"
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
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00C6A7] focus:border-transparent bg-white text-gray-700 sm:text-sm"
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
                        className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00C6A7] focus:border-transparent bg-white text-gray-700 sm:text-sm"
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
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00C6A7] focus:border-transparent bg-white text-gray-700 sm:text-sm"
                      required
                      aria-label="News Category"
                    >
                      <option value="Campus">Campus</option>
                      <option value="Food">Food</option>
                      <option value="Academics">Academics</option>
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
                    className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-[#181818] hover:bg-[#00C7A7] transition"
                  >
                    {editingNews ? 'Save Changes' : 'Add News'}
                  </button>
                </div>
              </form>
        </FeatureModal>

        {/* Zoomed Image Modal */}
        {zoomedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50" onClick={() => setZoomedImage(null)}>
            <img src={zoomedImage} alt="Zoomed" className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-2xl" />
          </div>
        )}
      </main>
    </div>
  );
};

export default News; 