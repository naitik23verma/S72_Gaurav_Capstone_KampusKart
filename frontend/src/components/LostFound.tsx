import { useEffect, useState, useRef, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { FiSearch, FiMapPin, FiUser, FiCalendar, FiEdit2, FiTrash2, FiCheckCircle, FiInfo, FiTag, FiFileText, FiMail } from 'react-icons/fi';
import { Instagram, Linkedin, Globe, Github } from 'lucide-react';
import { API_BASE } from '../config';
import { FeatureModal } from './common/FeatureModal';
import { ImageUpload, ImageFile } from './common/ImageUpload';
import { validateEmail, validatePhone } from '../utils/formValidation';
import { PageSkeleton } from './common/SkeletonLoader';
import { Footer } from './ui/footer';

const socialLinks = [
  { href: 'https://www.instagram.com/gaurav_khandelwal_/', label: 'Instagram', icon: <Instagram className="h-4 w-4" /> },
  { href: 'https://www.linkedin.com/in/gaurav-khandelwal-17a127358/', label: 'LinkedIn', icon: <Linkedin className="h-4 w-4" /> },
  { href: 'https://gaurav-khandelwal.vercel.app/', label: 'Portfolio', icon: <Globe className="h-4 w-4" /> },
  { href: 'https://github.com/Gaurav-205', label: 'GitHub', icon: <Github className="h-4 w-4" /> },
];

interface LostFoundItem {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  type: 'lost' | 'found';
  title: string;
  description: string;
  location?: string;
  date: string;
  images: { public_id: string; url: string }[];
  resolved: boolean;
  contact?: string;
  createdAt: string;
  displayText?: string;
  formattedDate?: string;
  timeAgo?: string;
  userName?: string;
}

// Use ImageFile type from ImageUpload component

const LostFound = () => {
  const [items, setItems] = useState<LostFoundItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFiltering, setIsFiltering] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token, user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    type: 'lost',
    title: '',
    description: '',
    location: '',
    date: '',
    contact: '',
    images: [] as ImageFile[], // Use ImageFile type from ImageUpload component
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<LostFoundItem | null>(null);
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const itemsPerPage = 9; // Define how many items per page
  const [filterType, setFilterType] = useState<'all' | 'lost' | 'found'>('all');
  const [filterResolved, setFilterResolved] = useState<'all' | 'resolved' | 'unresolved'>('all');
  const [selectedItemForDetails, setSelectedItemForDetails] = useState<LostFoundItem | null>(null);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastItemRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetchingMore) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new window.IntersectionObserver(entries => {
        if (entries[0].isIntersecting && currentPage < totalPages) {
          setIsFetchingMore(true);
          setCurrentPage(prev => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    }, [isFetchingMore, currentPage, totalPages]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const isSelectingSuggestion = useRef(false);
  const [fieldErrors, setFieldErrors] = useState<{[key: string]: string}>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Generate autocomplete suggestions from existing items
  useEffect(() => {
    if (isSelectingSuggestion.current) {
      isSelectingSuggestion.current = false;
      return;
    }
    if (searchInput.trim().length > 0) {
      const suggestions = new Set<string>();
      items.forEach(item => {
        if (item.title.toLowerCase().includes(searchInput.toLowerCase())) {
          suggestions.add(item.title);
        }
        if (item.location && item.location.toLowerCase().includes(searchInput.toLowerCase())) {
          suggestions.add(item.location);
        }
        if (item.description.toLowerCase().includes(searchInput.toLowerCase())) {
          const words = item.description.split(' ').filter(word => 
            word.toLowerCase().includes(searchInput.toLowerCase()) && word.length > 3
          );
          words.forEach(word => suggestions.add(word));
        }
      });
      setFilteredSuggestions(Array.from(suggestions).slice(0, 5));
      setShowSuggestions(true);
    } else {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchInput, items]);

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

  // Auto-hide success message after 3 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  // Field validation functions
  const validateField = (fieldName: string, value: string): string | null => {
    switch (fieldName) {
      case 'title':
        if (!value.trim()) return 'Title is required';
        if (value.trim().length < 3) return 'Title must be at least 3 characters';
        if (value.trim().length > 100) return 'Title must be less than 100 characters';
        return null;
      
      case 'description':
        if (!value.trim()) return 'Description is required';
        if (value.trim().length < 10) return 'Description must be at least 10 characters';
        if (value.trim().length > 500) return 'Description must be less than 500 characters';
        return null;
      
      case 'location':
        // Location is optional, but if provided must be at least 3 characters
        if (value.trim() && value.trim().length < 3) return 'Location must be at least 3 characters';
        if (value.trim().length > 100) return 'Location must be less than 100 characters';
        return null;
      
      case 'date':
        if (!value) return 'Date is required';
        const selectedDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selectedDate > today) return 'Date cannot be in the future';
        return null;
      
      case 'contact':
        if (!value.trim()) return 'Contact information is required';
        // Check if it's email or phone
        if (value.includes('@')) {
          const emailValidation = validateEmail(value);
          if (!emailValidation.isValid) return emailValidation.error || 'Invalid email format';
        } else {
          const phoneValidation = validatePhone(value);
          if (!phoneValidation.isValid) return phoneValidation.error || 'Invalid phone format';
        }
        return null;
      
      default:
        return null;
    }
  };

  const handleFieldBlur = (fieldName: string, value: string) => {
    const error = validateField(fieldName, value);
    setFieldErrors(prev => ({
      ...prev,
      [fieldName]: error || ''
    }));
  };

  const openAddItemModal = () => {
    setEditingItem(null);
    setNewItem({
      type: 'lost',
      title: '',
      description: '',
      location: '',
      date: '',
      contact: '',
      images: [], // No images when adding
    });
    setFormError(null);
    setFieldErrors({});
    setIsModalOpen(true);
  };

  const openEditItemModal = (item: LostFoundItem) => {
    setEditingItem(item);
    const formattedDate = item.date ? new Date(item.date).toISOString().split('T')[0] : '';
    setNewItem({
      type: item?.type || 'lost',
      title: item?.title || '',
      description: item?.description || '',
      location: item?.location || '',
      date: formattedDate,
      contact: item?.contact || '',
      images: (item.images || []).map(img => ({
        existing: img,
        previewUrl: img.url,
        public_id: img.public_id,
        url: img.url,
      })),
    });
    setFormError(null);
    setFieldErrors({});
    setIsModalOpen(true);
  };

  const closeItemModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setNewItem({
      type: 'lost',
      title: '',
      description: '',
      location: '',
      date: '',
      contact: '',
      images: [],
    });
    setFormError(null);
    setFieldErrors({});
  };

  const fetchItems = async () => {
    try {
      // Only show full page loading on initial load, not when filtering
      if (currentPage === 1 && items.length === 0) {
        setLoading(true);
      } else if (currentPage === 1) {
        setIsFiltering(true);
      }
      setError(null);
      const url = new URL(`${API_BASE}/api/lostfound`);
      url.searchParams.append('page', currentPage.toString());
      url.searchParams.append('limit', itemsPerPage.toString());
      if (searchQuery) {
        url.searchParams.append('search', searchQuery);
      }
      if (filterType !== 'all') {
        url.searchParams.append('type', filterType);
      }
      if (filterResolved !== 'all') {
        url.searchParams.append('resolved', filterResolved === 'resolved' ? 'true' : 'false');
      }
      const response = await fetch(url.toString(), {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Error fetching items: ${response.statusText}`);
      }
      const data = await response.json();
      if (data && Array.isArray(data.items)) {
        if (currentPage === 1) {
          setItems(data.items);
        } else {
          setItems(prev => [...prev, ...data.items]);
        }
        if (data.totalPages !== undefined) {
          setTotalPages(data.totalPages);
        }
      } else {
        setItems([]);
        setTotalPages(1);
      }
    } catch (err: any) {
      console.error('Error fetching lost and found items:', err);
      setError(err.message || 'Failed to fetch lost and found items.');
    } finally {
      setLoading(false);
      setIsFiltering(false);
      setIsFetchingMore(false);
    }
  };

  // Reset currentPage when filters or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filterType, filterResolved, searchQuery]);

  useEffect(() => {
    if (token) {
      fetchItems();
    }
    // eslint-disable-next-line
  }, [token, searchQuery, currentPage, filterType, filterResolved]);

  const handleDeleteItem = async (id: string) => {
    if (!token) return;
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      const response = await fetch(`${API_BASE}/api/lostfound/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) {
        const error = await response.json();
        alert(error.message || 'Failed to delete item');
        return;
      }
      setItems(items.filter(i => i._id !== id));
      setSelectedItemForDetails(null);
      setSuccessMessage('Item deleted successfully!');
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to delete item');
    }
  };

  const handleMarkResolved = async (id: string) => {
    if (!token) return;
    try {
      const response = await fetch(`${API_BASE}/api/lostfound/${id}/resolve`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to mark as resolved');
      }
      await response.json();
      setItems(items.map(i => i._id === id ? { ...i, resolved: true } : i));
      setSelectedItemForDetails(prev => prev ? { ...prev, resolved: true } : prev);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to mark as resolved');
    }
  };

  const renderStatus = (type: 'lost' | 'found', resolved: boolean) => {
    return (
      <div className="flex gap-2">
        <span className={`text-xs px-3 py-1.5 rounded-lg font-medium ${
          type === 'lost' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
        }`}>
          {type === 'lost' ? 'Lost Item' : 'Found Item'}
        </span>
        <span className={`text-xs px-3 py-1.5 rounded-lg font-medium ${
          resolved ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
        }`}>
          {resolved ? 'Resolved' : 'Unresolved'}
        </span>
      </div>
    );
  };


  if (loading) {
    return <PageSkeleton contentType="cards4col" itemCount={8} filterCount={2} showAddButton={true} />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white font-sans">
        <div className="text-center">
          <p className="text-red-500">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-28">
        {/* Success Message Banner */}
        {successMessage && (
          <div className="mb-6 bg-green-50 border-2 border-green-200 rounded-lg p-4 flex items-center gap-3 animate-fade-in">
            <FiCheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
            <p className="text-green-800 font-medium">{successMessage}</p>
          </div>
        )}
        
        {/* Top Bar: Heading + Add Button */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <h1 className="text-h2 font-extrabold text-black">Lost and Found</h1>
          <button
            onClick={openAddItemModal}
            aria-label="Add New Item"
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[#181818] text-white font-bold text-lg hover:bg-[#00C6A7] transition-colors duration-200"
          >
            + Add New Item
          </button>
        </div>
        {/* Filter/Search Row */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 gap-4">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <div className="relative">
              <select
                value={filterType}
                onChange={e => setFilterType(e.target.value as 'all' | 'lost' | 'found')}
                className="appearance-none w-full sm:w-auto px-5 py-3 pr-10 rounded-lg bg-white text-gray-700 font-semibold border-2 border-gray-200 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00C6A7] focus:border-transparent transition-all duration-200 cursor-pointer"
              >
                <option value="all">All Types</option>
                <option value="lost">Lost Items</option>
                <option value="found">Found Items</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            <div className="relative">
              <select
                value={filterResolved}
                onChange={e => setFilterResolved(e.target.value as 'all' | 'resolved' | 'unresolved')}
                className="appearance-none w-full sm:w-auto px-5 py-3 pr-10 rounded-lg bg-white text-gray-700 font-semibold border-2 border-gray-200 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00C6A7] focus:border-transparent transition-all duration-200 cursor-pointer"
              >
                <option value="all">All Statuses</option>
                <option value="unresolved">Unresolved</option>
                <option value="resolved">Resolved</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
          {/* Search Bar */}
          <div className="relative w-full lg:w-[520px]" ref={searchRef}>
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
                placeholder="Search items..."
                className="flex-1 pl-12 pr-3 py-3.5 bg-transparent text-gray-700 font-medium outline-none text-base border-none placeholder:text-gray-400 rounded-l-lg"
              />
              <button
                type="button"
                onClick={() => {
                  setSearchQuery(searchInput);
                  setShowSuggestions(false);
                }}
                className="px-6 py-3.5 bg-[#181818] text-white font-bold text-sm hover:bg-[#00C6A7] flex items-center justify-center gap-2 transition-all duration-200 border-l-2 border-gray-200 rounded-r-lg rounded-l-none"
                aria-label="Search"
              >
                <FiSearch className="w-4 h-4" />
                <span className="hidden sm:inline">Search</span>
              </button>
            </div>
            
            {/* Autocomplete Dropdown */}
            {showSuggestions && filteredSuggestions.length > 0 && (
              <div className="absolute z-50 w-full mt-2 bg-white border-2 border-gray-200 rounded-lg max-h-60 overflow-auto">
                {filteredSuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      isSelectingSuggestion.current = true;
                      setSearchInput(suggestion);
                      setSearchQuery(suggestion);
                      setShowSuggestions(false);
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
        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isFiltering ? (
            // Show skeleton cards while filtering
            Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="bg-white rounded-lg border-2 border-gray-200 overflow-hidden animate-pulse">
                <div className="h-64 sm:h-80 bg-gray-200"></div>
                <div className="p-6 space-y-3">
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
            ))
          ) : items.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">No items found</p>
            </div>
          ) : (
            items.filter(item => item).map((item, idx) => (
            <div
              key={item._id}
              ref={idx === items.length - 1 ? lastItemRef : undefined}
              className="bg-white rounded-lg border-2 border-gray-200 overflow-hidden cursor-pointer hover:border-gray-300 transition-colors duration-200"
              onClick={() => setSelectedItemForDetails(item)}
            >
              {/* Image Section with Overlay */}
              <div className="relative h-64 sm:h-80 overflow-hidden">
                {item.images && item.images.length > 0 ? (
                  <>
                    <img
                      src={item.images[0].url}
                      alt={item?.title || 'Item'}
                      className="object-cover w-full h-full"
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
                {/* Status Badges - Now positioned over the image */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <span className={`text-xs px-3 py-1.5 rounded-lg font-medium ${
                    item.type === 'lost' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {item.type === 'lost' ? 'Lost Item' : 'Found Item'}
                  </span>
                  <span className={`text-xs px-3 py-1.5 rounded-lg font-medium ${
                    item.resolved ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {item.resolved ? 'Resolved' : 'Unresolved'}
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-4 sm:p-5 md:p-6">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 line-clamp-2">{item?.title || 'Item'}</h2>
                <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3">{item.description}</p>

                {/* Meta Info Row - Location, Date, User */}
                <div className="space-y-3 pt-4 border-t-2 border-gray-200">
                  {item.location && (
                    <div className="flex items-center text-sm text-gray-500">
                      <FiMapPin className="mr-2 flex-shrink-0" />
                      <span className="truncate">{item.location}</span>
                    </div>
                  )}
                  {item.date && (
                    <div className="flex items-center text-sm text-gray-500">
                      <FiCalendar className="mr-2 flex-shrink-0" />
                      <span>{new Date(item.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</span>
                    </div>
                  )}
                  {item.user?.name && (
                    <div className="flex items-center text-sm text-gray-500">
                      <FiUser className="mr-2 flex-shrink-0" />
                      <span className="truncate">Posted by {item.user.name}</span>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                {token && user && item.user && (
                  // Check if user can edit/delete this item
                  (user._id === item.user._id || 
                   user.id === item.user._id || 
                   user.isAdmin) && (
                    <div className="flex flex-col sm:flex-row gap-2 mt-4 pt-4 border-t-2 border-gray-200">
                      {!item.resolved && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMarkResolved(item._id);
                          }}
                          className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-3 py-2.5 sm:px-4 sm:py-2.5 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 active:bg-green-200 transition-colors duration-200 text-xs sm:text-sm min-w-0 min-h-touch"
                        >
                          <FiCheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                          <span className="truncate text-xs sm:text-sm">Resolve</span>
                        </button>
                      )}
                      {!item.resolved && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openEditItemModal(item);
                          }}
                          className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-3 py-2.5 sm:px-4 sm:py-2.5 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 active:bg-blue-200 transition-colors duration-200 text-xs sm:text-sm min-w-0 min-h-touch"
                        >
                          <FiEdit2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                          <span className="truncate text-xs sm:text-sm">Edit</span>
                        </button>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteItem(item._id);
                        }}
                        className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-3 py-2.5 sm:px-4 sm:py-2.5 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 active:bg-red-200 transition-colors duration-200 text-xs sm:text-sm min-w-0 min-h-touch"
                      >
                        <FiTrash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                        <span className="truncate text-xs sm:text-sm">Delete</span>
                      </button>
                    </div>
                  )
                )}
                
              </div>
            </div>
          ))
          )}
        </div>
        {isFetchingMore && (
          <div className="flex justify-center items-center mt-8">
            <svg className="animate-spin h-8 w-8 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        )}
        <FeatureModal
          isOpen={isModalOpen}
          onClose={closeItemModal}
          title={editingItem ? 'Edit Item' : 'Add New Item'}
          error={formError}
        >

              <form onSubmit={async (e) => {
                e.preventDefault();
                setLoading(true);
                setFormError(null);
                setFieldErrors({});

                // Validate all fields
                const errors: {[key: string]: string} = {};
                const titleError = validateField('title', newItem.title);
                const descError = validateField('description', newItem.description);
                const locationError = validateField('location', newItem.location);
                const dateError = validateField('date', newItem.date);
                const contactError = validateField('contact', newItem.contact);

                if (titleError) errors.title = titleError;
                if (descError) errors.description = descError;
                if (locationError) errors.location = locationError;
                if (dateError) errors.date = dateError;
                if (contactError) errors.contact = contactError;

                if (Object.keys(errors).length > 0) {
                  setFieldErrors(errors);
                  setFormError('Please fix the errors below');
                  setLoading(false);
                  return;
                }

                const formData = new FormData();
                formData.append('type', newItem.type);
                formData.append('title', newItem.title.trim());
                formData.append('description', newItem.description.trim());
                formData.append('location', newItem.location.trim());
                formData.append('date', newItem.date);
                formData.append('contact', newItem.contact.trim());
                newItem.images.forEach((image) => {
                  if (image.file) {
                    formData.append('images', image.file);
                  }
                });
                if (editingItem) {
                  const keepPublicIds = newItem.images.filter(img => img.public_id).map(img => img.public_id);
                  formData.append('keepImages', JSON.stringify(keepPublicIds));
                }

                try {
                  const response = await fetch(`${API_BASE}/api/lostfound${editingItem ? '/' + editingItem._id : ''}`, {
                    method: editingItem ? 'PUT' : 'POST',
                    headers: {
                      'Authorization': `Bearer ${token}`,
                    },
                    body: formData,
                  });

                  const data = await response.json();

                  if (response.ok) {
                    if (editingItem) {
                      setItems(items.map(i => i._id === editingItem._id ? data : i));
                      setSuccessMessage('Item updated successfully!');
                    } else {
                      setItems([data, ...items]);
                      setSuccessMessage('Item added successfully!');
                    }
                    closeItemModal();
                  } else {
                    // Handle validation errors from backend
                    if (data.details && Array.isArray(data.details)) {
                      const backendErrors: {[key: string]: string} = {};
                      data.details.forEach((err: any) => {
                        backendErrors[err.field] = err.message;
                      });
                      setFieldErrors(backendErrors);
                      setFormError(data.message || 'Validation failed');
                    } else {
                      setFormError(data.message || 'Failed to save item.');
                    }
                  }
                } catch (err: any) {
                  console.error('Error saving item:', err);
                  setFormError('An error occurred while saving the item. Please try again.');
                } finally {
                  setLoading(false);
                }
              }} className="space-y-8">
                {/* Item Details Section */}
                <div className="border-b pb-6 mb-6 bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-bold mb-4 text-gray-900 flex items-center gap-2">Item Details <FiInfo className="text-gray-400" title="Fill in the details of your lost or found item." /></h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">Type <FiTag className="inline text-gray-400" /></label>
                      <select
                        value={newItem.type}
                        onChange={(e) => setNewItem({...newItem, type: e.target.value as 'lost' | 'found'})}
                        className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00C6A7] focus:border-transparent bg-white text-gray-700 text-sm"
                        required
                        aria-label="Item Type"
                      >
                        <option value="lost">Lost Item</option>
                        <option value="found">Found Item</option>
                      </select>
                      <p className="text-xs text-gray-500 mt-1">Select whether you lost or found the item.</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                        Date <FiCalendar className="inline text-gray-400" />
                      </label>
                      <div className="relative cursor-pointer" onClick={(e) => {
                        const input = e.currentTarget.querySelector('input[type="date"]') as HTMLInputElement;
                        if (input) input.showPicker?.();
                      }}>
                        <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none z-10" />
                        <input
                          type="date"
                          value={newItem.date}
                          onChange={(e) => {
                            setNewItem({...newItem, date: e.target.value});
                            if (fieldErrors.date) {
                              setFieldErrors(prev => ({...prev, date: ''}));
                            }
                          }}
                          onBlur={(e) => handleFieldBlur('date', e.target.value)}
                          max={new Date().toISOString().split('T')[0]}
                          className={`w-full pl-10 pr-3 py-2.5 border ${fieldErrors.date ? 'border-red-400 focus:ring-red-400' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00C6A7] focus:border-transparent bg-white text-gray-700 sm:text-sm cursor-pointer [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer`}
                          required
                          aria-label="Item Date"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">When was the item lost or found?</p>
                      {fieldErrors.date && <p className="text-xs text-red-500 mt-1">{fieldErrors.date}</p>}
                    </div>
                  </div>
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">Title <FiTag className="inline text-gray-400" /></label>
                    <div className="relative">
                      <input
                        type="text"
                        value={newItem.title}
                        onChange={(e) => {
                          setNewItem({...newItem, title: e.target.value});
                          if (fieldErrors.title) {
                            setFieldErrors(prev => ({...prev, title: ''}));
                          }
                        }}
                        onBlur={(e) => handleFieldBlur('title', e.target.value)}
                        className={`w-full pl-10 pr-3 py-2.5 border ${fieldErrors.title ? 'border-red-400 focus:ring-red-400' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00C6A7] focus:border-transparent bg-white text-gray-700 sm:text-sm`}
                        placeholder="e.g. Black Wallet, Red Backpack"
                        required
                        aria-label="Item Title"
                      />
                      <FiTag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Give a short, descriptive title for the item.</p>
                    {fieldErrors.title && <p className="text-xs text-red-500 mt-1">{fieldErrors.title}</p>}
                  </div>
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">Description <FiFileText className="inline text-gray-400" /></label>
                    <div className="relative">
                      <textarea
                        value={newItem.description}
                        onChange={(e) => {
                          setNewItem({...newItem, description: e.target.value});
                          if (fieldErrors.description) {
                            setFieldErrors(prev => ({...prev, description: ''}));
                          }
                        }}
                        onBlur={(e) => handleFieldBlur('description', e.target.value)}
                        className={`w-full pl-10 pr-3 py-2.5 border ${fieldErrors.description ? 'border-red-400 focus:ring-red-400' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00C6A7] focus:border-transparent bg-white text-gray-700 sm:text-sm`}
                        rows={4}
                        placeholder="Describe the item, any unique features, etc."
                        required
                        aria-label="Item Description"
                      ></textarea>
                      <FiFileText className="absolute left-3 top-3 text-gray-400" />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Provide details to help identify the item.</p>
                    {fieldErrors.description && <p className="text-xs text-red-500 mt-1">{fieldErrors.description}</p>}
                  </div>
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">Location (Optional) <FiMapPin className="inline text-gray-400" /></label>
                    <div className="relative">
                      <input
                        type="text"
                        value={newItem.location}
                        onChange={(e) => {
                          setNewItem({...newItem, location: e.target.value});
                          if (fieldErrors.location) {
                            setFieldErrors(prev => ({...prev, location: ''}));
                          }
                        }}
                        onBlur={(e) => handleFieldBlur('location', e.target.value)}
                        className={`w-full pl-10 pr-3 py-2.5 border ${fieldErrors.location ? 'border-red-400 focus:ring-red-400' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00C6A7] focus:border-transparent bg-white text-gray-700 sm:text-sm`}
                        placeholder="Where was the item lost/found?"
                        aria-label="Item Location"
                      />
                      <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Be as specific as possible (e.g. Library, Canteen, Room 101).</p>
                    {fieldErrors.location && <p className="text-xs text-red-500 mt-1">{fieldErrors.location}</p>}
                  </div>
                </div>

                {/* Contact Section */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-bold mb-4 text-gray-900 flex items-center gap-2">Contact <FiInfo className="text-gray-400" title="Contact is linked to your account." /></h3>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">Contact Information <FiMail className="inline text-gray-400" /></label>
                  <div className="relative">
                    <input
                      type="text"
                      value={newItem.contact}
                      onChange={(e) => {
                        setNewItem({...newItem, contact: e.target.value});
                        if (fieldErrors.contact) {
                          setFieldErrors(prev => ({...prev, contact: ''}));
                        }
                      }}
                      onBlur={(e) => handleFieldBlur('contact', e.target.value)}
                      className={`w-full pl-10 pr-3 py-2.5 border ${fieldErrors.contact ? 'border-red-400 focus:ring-red-400' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00C6A7] focus:border-transparent bg-white text-gray-700 sm:text-sm`}
                      placeholder="Email or phone number"
                      required
                      aria-label="Contact Information"
                    />
                    <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">How can someone reach you if they have information?</p>
                  {fieldErrors.contact && <p className="text-xs text-red-500 mt-1">{fieldErrors.contact}</p>}
                </div>

                {/* Images Section */}
                <ImageUpload
                  images={newItem.images}
                  onImagesChange={(images) => setNewItem({ ...newItem, images })}
                  maxImages={5}
                  id="lostfound-image-upload"
                />

                <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={closeItemModal}
                    className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-700 bg-white border-2 border-gray-200 hover:bg-gray-50"
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold text-white bg-[#181818] hover:bg-[#00C6A7] transition-colors duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {loading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {editingItem ? 'Saving...' : 'Adding...'}
                      </span>
                    ) : (
                      editingItem ? 'Save Changes' : 'Add Item'
                    )}
                  </button>
                </div>
              </form>
        </FeatureModal>
      </main>

      {/* Item Details Modal */}
      {selectedItemForDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 safe-top safe-bottom">
          <div className="bg-white rounded-lg border-2 border-gray-200 p-4 sm:p-6 md:p-8 max-w-3xl w-full mx-auto max-h-[90vh] md:max-h-[85vh] overflow-y-auto relative">
            {/* Close Button */}
            <button
              onClick={() => setSelectedItemForDetails(null)}
              aria-label="Close"
              className="absolute top-6 right-6 z-10 bg-[#181818] hover:bg-[#00C6A7] text-white rounded-lg p-2.5 transition-all duration-200 flex items-center justify-center w-10 h-10"
            >
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 pr-12 sm:pr-14">{selectedItemForDetails.title}</h2>

            {/* Image Gallery with zoom */}
            {selectedItemForDetails.images && selectedItemForDetails.images.length > 0 && (
              <div className="mb-4 sm:mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {selectedItemForDetails.images.map((image) => (
                  <img
                    key={image.public_id || image.url}
                    src={image.url}
                    alt={`${selectedItemForDetails.title} image`}
                    className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-lg cursor-zoom-in hover:opacity-90 active:opacity-75 transition-opacity duration-200"
                    onClick={() => setZoomedImage(image.url)}
                  />
                ))}
              </div>
            )}

            {/* Details Section */}
            <div className="space-y-6 text-gray-700">
              {/* Status Badges */}
              <div className="flex flex-wrap items-center gap-3 mb-2">
                {renderStatus(selectedItemForDetails.type, selectedItemForDetails.resolved)}
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Description</h4>
                <p className="text-gray-700 whitespace-pre-wrap">{selectedItemForDetails.description}</p>
              </div>

              {/* Meta Info - Location, Date, Posted By */}
              <div className="space-y-3 pt-4 border-t-2 border-gray-200">
                {selectedItemForDetails.location && (
                  <div>
                    <div className="flex items-center text-sm text-gray-500">
                      <FiMapPin className="w-5 h-5 mr-2 text-gray-500"/>
                      <span>{selectedItemForDetails.location}</span>
                    </div>
                  </div>
                )}
                <div>
                  <div className="flex items-center text-sm text-gray-500">
                    <FiCalendar className="w-5 h-5 mr-2 text-gray-500"/>
                    <span>{new Date(selectedItemForDetails.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                </div>
                {selectedItemForDetails.user?.name && selectedItemForDetails.createdAt && (
                  <div className="flex items-center text-sm text-gray-500">
                    <FiUser className="w-5 h-5 mr-2 text-gray-500" />
                    <span className="truncate">Posted by {selectedItemForDetails.user.name} on {new Date(selectedItemForDetails.createdAt).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</span>
                  </div>
                )}
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Contact Information</p>
                <div className="flex items-center">
                  <FiMail className="w-5 h-5 mr-2 text-gray-500"/>
                  {selectedItemForDetails.contact && (selectedItemForDetails.contact.includes('@') ? (
                    <a href={`mailto:${selectedItemForDetails.contact}`} className="text-[#00C6A7] hover:underline">{selectedItemForDetails.contact}</a>
                  ) : (
                    <a href={`tel:${selectedItemForDetails.contact}`} className="text-[#00C6A7] hover:underline">{selectedItemForDetails.contact}</a>
                  ))}
                </div>
              </div>
            </div>

            {/* Owner/Admin Actions */}
            {(user && (user._id === selectedItemForDetails.user._id || user.isAdmin)) && (
              <div className="flex gap-3 mt-6">
                {!selectedItemForDetails.resolved && (
                  <button
                    onClick={() => { setSelectedItemForDetails(null); openEditItemModal(selectedItemForDetails); }}
                    className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-700 bg-white border-2 border-gray-200 hover:bg-gray-50 flex items-center"
                  >
                    <FiEdit2 className="mr-1" /> Edit
                  </button>
                )}
                <button
                  onClick={() => handleDeleteItem(selectedItemForDetails._id)}
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-[#F05A25] hover:bg-red-600 flex items-center"
                >
                  <FiTrash2 className="mr-1" /> Delete
                </button>
                {!selectedItemForDetails.resolved && (
                  <button
                    onClick={() => handleMarkResolved(selectedItemForDetails._id)}
                    className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-[#00C6A7] hover:bg-[#009e86] flex items-center"
                  >
                    <FiCheckCircle className="mr-1" /> Mark as Resolved
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Zoomed Image Modal */}
      {zoomedImage && selectedItemForDetails && selectedItemForDetails.images && selectedItemForDetails.images.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4" onClick={() => setZoomedImage(null)}>
          {/* Image */}
          <img 
            src={zoomedImage} 
            alt="Zoomed"
            className="max-h-[90vh] max-w-full lg:max-w-[80vw] rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image
          />
          
          {/* Navigation Buttons */}
          {selectedItemForDetails.images.length > 1 && (
            <>
              {/* Previous Button */}
              <button
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/30 rounded-lg p-3 text-white hover:bg-white/50 transition-colors duration-200 z-50"
                onClick={(e) => {
                  e.stopPropagation();
                  const currentIndex = selectedItemForDetails.images.findIndex(img => img.url === zoomedImage);
                  const prevIndex = (currentIndex - 1 + selectedItemForDetails.images.length) % selectedItemForDetails.images.length;
                  setZoomedImage(selectedItemForDetails.images[prevIndex].url);
                }}
                aria-label="Previous image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
              {/* Next Button */}
              <button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/30 rounded-lg p-3 text-white hover:bg-white/50 transition-colors duration-200 z-50"
                onClick={(e) => {
                  e.stopPropagation();
                  const currentIndex = selectedItemForDetails.images.findIndex(img => img.url === zoomedImage);
                  const nextIndex = (currentIndex + 1) % selectedItemForDetails.images.length;
                  setZoomedImage(selectedItemForDetails.images[nextIndex].url);
                }}
                aria-label="Next image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </>
          )}

          {/* Close Button */}
           <button
            onClick={() => setZoomedImage(null)}
            aria-label="Close zoomed image"
            className="absolute top-4 right-4 bg-white/30 rounded-lg p-2 text-white hover:bg-white/50 transition-colors duration-200 z-50"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

        </div>
      )}
    </div>

      {/* Footer */}
      <Footer
        logo={<img src="/Logo.png" alt="KampusKart Logo" className="h-7 w-7" />}
        brandName="KampusKart"
        socialLinks={socialLinks}
        mainLinks={[
          { href: '/news', label: 'News' },
          { href: '/events', label: 'Events' },
          { href: '/facilities', label: 'Facilities' },
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

export default LostFound; 


