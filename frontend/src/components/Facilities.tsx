import React, { useState, useEffect, useMemo } from 'react';
import { FiMapPin, FiSearch, FiEdit2, FiTag, FiCalendar, FiUser, FiTrash2, FiCheckCircle } from 'react-icons/fi';
import { MdSchool, MdRestaurant, MdLocalLaundryService, MdHotel, MdLibraryBooks, MdFastfood, MdLocalCafe, MdRoomService, MdBed, MdApartment } from 'react-icons/md';
import { useAuth } from '../contexts/AuthContext';
import { API_BASE } from '../config';
import { FeatureModal } from './common/FeatureModal';
import { ImageUpload, ImageFile } from './common/ImageUpload';
import { validateMultipleRequired } from '../utils/formValidation';
import { PageSkeleton } from './common/SkeletonLoader';
import { Footer } from './ui/footer';
import { socialLinks } from '../utils/socialLinks';
import { useSearchSuggestions } from '../hooks/useSearchSuggestions';

interface Facility {
  _id: string;
  name: string;
  description: string;
  location: string;
  type: 'Academic' | 'Food' | 'Service' | 'Accommodation';
  icon: string;
  images?: { url: string; public_id?: string }[];
  createdAt?: string;
  createdBy?: {
    _id: string;
    name?: string;
    email?: string;
  };
}

const Facilities = () => {
  const { token, user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newFacility, setNewFacility] = useState({
    name: '',
    description: '',
    location: '',
    type: 'Academic',
    icon: 'MdSchool',
  });
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [facilityImages, setFacilityImages] = useState<ImageFile[]>([]);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFacility, setEditFacility] = useState<Facility | null>(null);
  const [editFacilityImages, setEditFacilityImages] = useState<ImageFile[]>([]);

  const iconOptions = [
    { 
      value: 'MdSchool', 
      label: 'Academic - School', 
      icon: <MdSchool className="w-10 h-10" />,
      gradient: 'from-blue-500 to-indigo-600',
      color: 'text-blue-600'
    },
    { 
      value: 'MdLibraryBooks', 
      label: 'Academic - Library', 
      icon: <MdLibraryBooks className="w-10 h-10" />,
      gradient: 'from-purple-500 to-pink-600',
      color: 'text-purple-600'
    },
    { 
      value: 'MdRestaurant', 
      label: 'Food - Restaurant', 
      icon: <MdRestaurant className="w-10 h-10" />,
      gradient: 'from-orange-500 to-red-600',
      color: 'text-orange-600'
    },
    { 
      value: 'MdFastfood', 
      label: 'Food - Fast Food', 
      icon: <MdFastfood className="w-10 h-10" />,
      gradient: 'from-yellow-500 to-orange-600',
      color: 'text-yellow-600'
    },
    { 
      value: 'MdLocalCafe', 
      label: 'Food - Cafe', 
      icon: <MdLocalCafe className="w-10 h-10" />,
      gradient: 'from-amber-500 to-orange-600',
      color: 'text-amber-600'
    },
    { 
      value: 'MdLocalLaundryService', 
      label: 'Service - Laundry', 
      icon: <MdLocalLaundryService className="w-10 h-10" />,
      gradient: 'from-cyan-500 to-blue-600',
      color: 'text-cyan-600'
    },
    { 
      value: 'MdRoomService', 
      label: 'Service - Room Service', 
      icon: <MdRoomService className="w-10 h-10" />,
      gradient: 'from-teal-500 to-green-600',
      color: 'text-teal-600'
    },
    { 
      value: 'MdHotel', 
      label: 'Accommodation - Hotel', 
      icon: <MdHotel className="w-10 h-10" />,
      gradient: 'from-emerald-500 to-teal-600',
      color: 'text-emerald-600'
    },
    { 
      value: 'MdBed', 
      label: 'Accommodation - Hostel', 
      icon: <MdBed className="w-10 h-10" />,
      gradient: 'from-green-500 to-emerald-600',
      color: 'text-green-600'
    },
    { 
      value: 'MdApartment', 
      label: 'Accommodation - Apartment', 
      icon: <MdApartment className="w-10 h-10" />,
      gradient: 'from-lime-500 to-green-600',
      color: 'text-lime-600'
    },
  ];
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [addLoading, setAddLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Auto-hide success message after 3 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const buildFacilitySuggestions = useCallback((facility: Facility, normalizedQuery: string): string[] => {
    const suggestions: string[] = [];
    if (facility?.name?.toLowerCase().includes(normalizedQuery)) {
      suggestions.push(facility.name);
    }
    if (facility?.type?.toLowerCase().includes(normalizedQuery)) {
      suggestions.push(facility.type);
    }
    if (facility?.location?.toLowerCase().includes(normalizedQuery)) {
      suggestions.push(facility.location);
    }
    return suggestions;
  }, []);

  const {
    showSuggestions,
    setShowSuggestions,
    filteredSuggestions,
    searchRef,
    markSuggestionSelection,
  } = useSearchSuggestions<Facility>({
    searchInput,
    items: facilities,
    buildSuggestions: buildFacilitySuggestions,
  });

  const filteredFacilities = useMemo(() => {
    if (!Array.isArray(facilities)) return [];
    return facilities.filter(facility =>
      facility &&
      (filterType === 'All' || facility?.type === filterType) &&
      ((facility.name?.toLowerCase()?.includes(searchQuery.toLowerCase()) ?? false) || 
       (facility.description?.toLowerCase()?.includes(searchQuery.toLowerCase()) ?? false))
    );
  }, [facilities, filterType, searchQuery]);

  useEffect(() => {
    const fetchFacilities = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${API_BASE}/api/facilities`);
        if (!res.ok) {
          throw new Error('Failed to fetch facilities');
        }
        const data = await res.json();
        if (Array.isArray(data)) {
          setFacilities(data);
        } else {
          setFacilities([]);
        }
      } catch (err) {
        setError('Failed to load facilities');
        setFacilities([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFacilities();
  }, []);

  const closeAddModal = () => {
    setIsModalOpen(false);
    setNewFacility({ name: '', description: '', location: '', type: 'Academic', icon: 'MdSchool' });
    setFacilityImages([]);
    setFormError(null);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditFacility(null);
    setFormError(null);
  };

  if (isLoading) {
    return <PageSkeleton contentType="cards" itemCount={6} filterCount={1} showAddButton={user?.isAdmin} />;
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        
        {/* Success Message Banner */}
        {successMessage && (
          <div className="mb-6 rounded-lg bg-green-50 border-2 border-green-200 p-4 flex items-center gap-3">
            <FiCheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
            <p className="text-sm font-medium text-green-800">{successMessage}</p>
          </div>
        )}
        
        {/* Top Bar: Heading + Add Button */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <h1 className="text-h2 font-extrabold text-black">Campus Facilities</h1>
          {user?.isAdmin && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[#181818] text-white font-bold text-lg hover:bg-[#00C6A7] active:bg-[#181818] transition-colors duration-200"
            >
              + Add Facility
            </button>
          )}
        </div>
        {/* Filter/Search Row */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 gap-4">
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <div className="relative">
              <select
                value={filterType}
                onChange={e => setFilterType((e.target.value as string) || 'All')}
                className="appearance-none w-full sm:w-auto px-5 py-3 pr-10 rounded-lg bg-white text-gray-700 font-semibold border-2 border-gray-200 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00C6A7] focus:border-transparent transition-all duration-200 cursor-pointer"
              >
                <option value="All">All Types</option>
                <option value="Academic">Academic</option>
                <option value="Food">Food</option>
                <option value="Service">Service</option>
                <option value="Accommodation">Accommodation</option>
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
                placeholder="Search facilities..."
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
              <div className="absolute z-50 w-full mt-2 bg-white border-2 border-gray-200 rounded-lg max-h-60 overflow-auto">
                {filteredSuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      markSuggestionSelection();
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {filteredFacilities.map(facility => (
            <div
              key={facility._id}
              className="bg-white rounded-lg border-2 border-gray-200 overflow-hidden cursor-pointer hover:border-gray-300 transition-colors duration-200"
              onClick={() => setSelectedFacility(facility)}
            >
              {/* Image Section with Overlay */}
              <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                {facility.images && facility.images.length > 0 ? (
                  <>
                    <img
                      src={facility.images[0].url}
                      alt={facility?.name || 'Facility'}
                      className="object-cover w-full h-full"
                    />
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-50">
                    <div className="flex flex-col items-center justify-center">
                      {(() => {
                        const iconOption = iconOptions.find(opt => opt.value === facility?.icon);
                        return (
                          <div className={`p-4 rounded-lg bg-[#181818]`}>
                            <div className="text-white">
                              {iconOption?.icon || <MdSchool className="w-16 h-16" />}
                            </div>
                          </div>
                        );
                      })()}
                      <span className="text-sm font-medium text-gray-500 mt-4">No Image</span>
                    </div>
                  </div>
                )}
                {/* Type Badge */}
                {facility?.type && (
                  <div className="absolute top-4 left-4">
                    <span className="text-xs px-3 py-1.5 rounded-lg font-medium bg-white/90 text-gray-800 flex items-center gap-1">
                      <FiTag className="w-3 h-3" />
                      {facility.type}
                    </span>
                  </div>
                )}
                {/* Location Badge */}
                {facility?.location && (
                  <div className="absolute top-4 right-4">
                    <span className="text-xs px-3 py-1.5 rounded-lg font-medium bg-white/90 text-gray-800 flex items-center gap-1">
                      <FiMapPin className="w-3 h-3" />
                      {facility.location}
                    </span>
                  </div>
                )}
              </div>

              {/* Content Section */}
              <div className="p-4 sm:p-5 md:p-6">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 line-clamp-2">{facility?.name || 'Facility'}</h2>
                <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-3">{facility?.description || ''}</p>

                {/* Meta Info Row */}
                <div className="space-y-3 pt-4 border-t-2 border-gray-200">
                  {facility.createdAt && (
                    <div className="flex items-center text-sm text-gray-500">
                      <FiCalendar className="mr-2 flex-shrink-0" />
                      <span>{new Date(facility.createdAt).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</span>
                    </div>
                  )}
                  {facility.createdBy && (
                    <div className="flex items-center text-sm text-gray-500">
                      <FiUser className="mr-2 flex-shrink-0" />
                      <span className="truncate">Posted by {facility.createdBy?.name || facility.createdBy?.email || 'User'}</span>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                {user?.isAdmin && (
                  <div className="flex flex-col sm:flex-row gap-2 mt-4 pt-4 border-t-2 border-gray-200">
                    <button
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        if (!facility) return;
                        setEditFacility({ ...facility }); 
                        setEditFacilityImages((facility.images || []).map(img => ({ ...img, previewUrl: img.url })));
                        setIsEditModalOpen(true); 
                      }}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 sm:py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors duration-200 text-sm sm:text-base min-w-0"
                    >
                      <FiEdit2 className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">Edit</span>
                    </button>
                    <button
                      onClick={async (e) => {
                        e.stopPropagation();
                        if (!facility) return;
                        if (!window.confirm('Are you sure you want to delete this facility?')) return;
                        try {
                          const res = await fetch(`${API_BASE}/api/facilities/${facility._id}`, {
                            method: 'DELETE',
                            headers: { 'Authorization': `Bearer ${token}` },
                          });
                          if (!res.ok) throw new Error('Failed to delete facility');
                          setFacilities(facilities.filter(f => f._id !== facility._id));
                          setSuccessMessage('Facility deleted successfully!');
                        } catch (err) {
                          setError('Failed to delete facility');
                        }
                      }}
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
          {filteredFacilities.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-16 px-4">
              <svg className="w-24 h-24 mb-4 text-gray-200" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <rect x="16" y="32" width="64" height="52" rx="4" fill="white" stroke="#E5E7EB" strokeWidth="3" />
                <path d="M8 36L48 12l40 24" stroke="#E5E7EB" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="36" y="60" width="24" height="24" rx="2" fill="#F3F4F6" stroke="#E5E7EB" strokeWidth="2" />
                <rect x="24" y="44" width="12" height="12" rx="2" fill="#E5E7EB" />
                <rect x="60" y="44" width="12" height="12" rx="2" fill="#E5E7EB" />
                <circle cx="72" cy="72" r="16" fill="#F3F4F6" stroke="#E5E7EB" strokeWidth="2" />
                <path d="M66 72h12M72 66v12" stroke="#9CA3AF" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
              <p className="text-gray-500 font-semibold text-lg mb-1">
                {searchQuery || filterType !== 'All' ? 'No facilities match your filters' : 'No facilities yet'}
              </p>
              <p className="text-gray-400 text-sm mb-4">
                {searchQuery || filterType !== 'All' ? 'Try adjusting your search or type filter.' : 'Campus facilities will appear here once added.'}
              </p>
              {(searchQuery || filterType !== 'All') && (
                <button
                  onClick={() => { setSearchInput(''); setSearchQuery(''); setFilterType('All'); }}
                  className="px-5 py-2 rounded-lg bg-[#181818] text-white text-sm font-semibold hover:bg-[#00C6A7] transition-colors duration-200"
                >
                  Clear filters
                </button>
              )}
            </div>
          )}
        </div>

        {/* Add Facility Modal */}
        <FeatureModal
          isOpen={isModalOpen}
          onClose={closeAddModal}
          title="Add New Facility"
          error={formError}
        >
              <form onSubmit={async e => {
                e.preventDefault();
                setAddLoading(true);
                setFormError(null);
                if (!token) return;
                // Validate required fields
                const validation = validateMultipleRequired([
                  { value: newFacility.name, name: 'Name' },
                  { value: newFacility.description, name: 'Description' },
                  { value: newFacility.location, name: 'Location' },
                ]);
                
                if (!validation.isValid) {
                  setFormError(validation.error || null);
                  setAddLoading(false);
                  return;
                }
                const formData = new FormData();
                formData.append('name', newFacility.name);
                formData.append('description', newFacility.description);
                formData.append('location', newFacility.location);
                formData.append('type', newFacility.type);
                formData.append('icon', newFacility.icon);
                facilityImages.forEach(img => { if (img.file) formData.append('images', img.file); });
                try {
                  const res = await fetch(`${API_BASE}/api/facilities`, {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${token}` },
                    body: formData,
                  });
                  if (!res.ok) throw new Error('Failed to add facility');
                  const saved = await res.json();
                  setFacilities([saved, ...facilities]);
                  setNewFacility({ name: '', description: '', location: '', type: 'Academic', icon: 'MdSchool' });
                  setFacilityImages([]);
                  setIsModalOpen(false);
                  setSuccessMessage('Facility added successfully!');
                } catch (err: any) {
                  setFormError(err.message || 'Failed to add facility');
                } finally {
                  setAddLoading(false);
                }
              }} className="space-y-8">
                <div className="border-2 border-gray-200 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-bold mb-4 text-gray-900 flex items-center gap-2">Facility Details <MdSchool className="text-gray-400" /></h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input
                        type="text"
                        value={newFacility.name}
                        onChange={e => setNewFacility({ ...newFacility, name: e.target.value })}
                        className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00C6A7] focus:border-transparent bg-white text-gray-700 text-base"
                        required
                        placeholder="e.g. Main Library"
                      />
                      <p className="text-xs text-gray-500 mt-1">Enter the facility name.</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                      <input
                        type="text"
                        value={newFacility.location}
                        onChange={e => setNewFacility({ ...newFacility, location: e.target.value })}
                        className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00C6A7] focus:border-transparent bg-white text-gray-700 text-base"
                        required
                        placeholder="e.g. Central Block"
                      />
                      <p className="text-xs text-gray-500 mt-1">Where is this facility located?</p>
                    </div>
                  </div>
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={newFacility.description}
                      onChange={e => setNewFacility({ ...newFacility, description: e.target.value })}
                      className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00C6A7] focus:border-transparent bg-white text-gray-700 text-base resize-none"
                      rows={3}
                      required
                      placeholder="Describe the facility, features, etc."
                    />
                    <p className="text-xs text-gray-500 mt-1">Describe the facility and its features.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                      <select
                        value={newFacility.type}
                        onChange={e => setNewFacility({ ...newFacility, type: e.target.value })}
                        className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00C6A7] focus:border-transparent bg-white text-gray-700 text-base"
                        required
                      >
                        <option value="Academic">Academic</option>
                        <option value="Food">Food</option>
                        <option value="Service">Service</option>
                        <option value="Accommodation">Accommodation</option>
                      </select>
                      <p className="text-xs text-gray-500 mt-1">Select the facility type.</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
                      <select
                        value={newFacility.icon}
                        onChange={e => setNewFacility({ ...newFacility, icon: e.target.value })}
                        className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00C6A7] focus:border-transparent bg-white text-gray-700 text-base"
                        required
                      >
                        {iconOptions.map(opt => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                      <div className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 gap-2 mt-3">
                        {iconOptions.map(opt => (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => setNewFacility({ ...newFacility, icon: opt.value })}
                            className={`p-3 rounded-lg border-2 transition-colors duration-200 ${
                              newFacility.icon === opt.value 
                                ? 'border-[#00C6A7] bg-[#00C6A7]' 
                                : 'border-gray-200 bg-white hover:border-gray-300'
                            }`}
                          >
                            <div className={newFacility.icon === opt.value ? 'text-white' : opt.color}>
                              {opt.icon}
                            </div>
                          </button>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500 mt-2">Choose an icon that best represents this facility.</p>
                    </div>
                  </div>
                </div>
                {/* Images Section */}
                <ImageUpload
                  images={facilityImages}
                  onImagesChange={setFacilityImages}
                  maxImages={5}
                  id="facility-image-upload"
                />
                <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={closeAddModal}
                    className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-700 bg-white border-2 border-gray-200 hover:bg-gray-50 active:bg-gray-100"
                    disabled={addLoading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={`px-4 py-2 rounded-lg text-sm font-semibold text-white bg-[#181818] hover:bg-[#00C6A7] active:bg-[#181818] transition-colors duration-200 ${addLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={addLoading}
                  >
                    {addLoading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Adding...
                      </span>
                    ) : (
                      'Add Facility'
                    )}
                  </button>
                </div>
              </form>
        </FeatureModal>

        {/* Edit Facility Modal */}
        <FeatureModal
          isOpen={isEditModalOpen && !!editFacility}
          onClose={closeEditModal}
          title="Edit Facility"
          error={formError}
        >
              <form onSubmit={async e => {
                e.preventDefault();
                setEditLoading(true);
                setFormError(null);
                if (!token) return;
                if (!editFacility?.name?.trim()) { setFormError('Name is required'); setEditLoading(false); return; }
                if (!editFacility?.description?.trim()) { setFormError('Description is required'); setEditLoading(false); return; }
                if (!editFacility?.location?.trim()) { setFormError('Location is required'); setEditLoading(false); return; }
                const formData = new FormData();
                formData.append('name', editFacility?.name || '');
                formData.append('description', editFacility?.description || '');
                formData.append('location', editFacility?.location || '');
                formData.append('type', editFacility?.type || 'Academic');
                formData.append('icon', editFacility?.icon || 'MdSchool');
                // Keep images
                const keepPublicIds = editFacilityImages.filter(img => img.public_id).map(img => img.public_id);
                formData.append('keepImages', JSON.stringify(keepPublicIds));
                // New images
                editFacilityImages.forEach(img => { if (img.file) formData.append('images', img.file); });
                try {
                  if (!editFacility?._id) {
                    setFormError('Facility ID is missing');
                    setEditLoading(false);
                    return;
                  }
                  const res = await fetch(`${API_BASE}/api/facilities/${editFacility._id}`, {
                    method: 'PUT',
                    headers: { 'Authorization': `Bearer ${token}` },
                    body: formData,
                  });
                  if (!res.ok) throw new Error('Failed to update facility');
                  const updated = await res.json();
                  setFacilities(facilities.map(f => f._id === updated._id ? updated : f));
                  setIsEditModalOpen(false);
                  setSuccessMessage('Facility updated successfully!');
                } catch (err: any) {
                  setFormError(err.message || 'Failed to update facility');
                } finally {
                  setEditLoading(false);
                }
              }} className="space-y-8">
                <div className="border-2 border-gray-200 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-bold mb-4 text-gray-900 flex items-center gap-2">Facility Details <MdSchool className="text-gray-400" /></h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input
                        type="text"
                        value={editFacility?.name || ''}
                        onChange={e => setEditFacility(editFacility ? { ...editFacility, name: e.target.value } : null)}
                        className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00C6A7] focus:border-transparent bg-white text-gray-700 text-base"
                        required
                        placeholder="e.g. Main Library"
                      />
                      <p className="text-xs text-gray-500 mt-1">Enter the facility name.</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                      <input
                        type="text"
                        value={editFacility?.location || ''}
                        onChange={e => setEditFacility(editFacility ? { ...editFacility, location: e.target.value } : null)}
                        className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00C6A7] focus:border-transparent bg-white text-gray-700 text-base"
                        required
                        placeholder="e.g. Central Block"
                      />
                      <p className="text-xs text-gray-500 mt-1">Where is this facility located?</p>
                    </div>
                  </div>
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={editFacility?.description || ''}
                      onChange={e => setEditFacility(editFacility ? { ...editFacility, description: e.target.value } : null)}
                      className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00C6A7] focus:border-transparent bg-white text-gray-700 text-base resize-none"
                      rows={3}
                      required
                      placeholder="Describe the facility, features, etc."
                    />
                    <p className="text-xs text-gray-500 mt-1">Describe the facility and its features.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                      <select
                        value={editFacility?.type || 'Academic'}
                        onChange={e => setEditFacility(editFacility ? { ...editFacility, type: e.target.value as Facility['type'] } : null)}
                        className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00C6A7] focus:border-transparent bg-white text-gray-700 text-base"
                        required
                      >
                        <option value="Academic">Academic</option>
                        <option value="Food">Food</option>
                        <option value="Service">Service</option>
                        <option value="Accommodation">Accommodation</option>
                      </select>
                      <p className="text-xs text-gray-500 mt-1">Select the facility type.</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
                      <select
                        value={editFacility?.icon || 'MdSchool'}
                        onChange={e => setEditFacility(editFacility ? { ...editFacility, icon: e.target.value } : null)}
                        className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00C6A7] focus:border-transparent bg-white text-gray-700 text-base"
                        required
                      >
                        {iconOptions.map(opt => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                      <div className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 gap-2 mt-3">
                        {iconOptions.map(opt => (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => setEditFacility(editFacility ? { ...editFacility, icon: opt.value } : null)}
                            className={`p-3 rounded-lg border-2 transition-colors duration-200 ${
                              editFacility?.icon === opt.value 
                                ? 'border-[#00C6A7] bg-[#00C6A7]' 
                                : 'border-gray-200 bg-white hover:border-gray-300'
                            }`}
                          >
                            <div className={editFacility?.icon === opt.value ? 'text-white' : opt.color}>
                              {opt.icon}
                            </div>
                          </button>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500 mt-2">Choose an icon that best represents this facility.</p>
                    </div>
                  </div>
                </div>
                {/* Images Section */}
                <ImageUpload
                  images={editFacilityImages}
                  onImagesChange={setEditFacilityImages}
                  maxImages={5}
                  id="edit-facility-image-upload"
                />
                <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={closeEditModal}
                    className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-700 bg-white border-2 border-gray-200 hover:bg-gray-50 active:bg-gray-100"
                    disabled={editLoading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={`px-4 py-2 rounded-lg text-sm font-semibold text-white bg-[#181818] hover:bg-[#00C6A7] active:bg-[#181818] transition-colors duration-200 ${editLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={editLoading}
                  >
                    {editLoading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Saving...
                      </span>
                    ) : (
                      'Save Changes'
                    )}
                  </button>
                </div>
              </form>
        </FeatureModal>

        {/* Facility Details Modal */}
        {selectedFacility && (
          <div
            className="fixed inset-0 bg-black/60 flex items-end sm:items-center justify-center z-[9999] p-0 sm:p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="facility-details-title"
            onClick={() => setSelectedFacility(null)}
          >
            <div className="bg-white rounded-t-xl sm:rounded-xl border-2 border-gray-200 p-4 sm:p-6 md:p-8 max-w-3xl w-full mx-auto max-h-[95vh] sm:max-h-[90vh] md:max-h-[85vh] overflow-y-auto relative" onClick={(e) => e.stopPropagation()}>
              {/* Close Button */}
              <button
                onClick={() => setSelectedFacility(null)}
                aria-label="Close"
                className="absolute top-6 right-6 z-10 bg-[#181818] hover:bg-[#00C6A7] active:bg-[#181818] text-white rounded-lg p-2.5 transition-all duration-200 flex items-center justify-center w-10 h-10"
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="flex items-center gap-3 mb-4">
                {iconOptions.find(opt => opt.value === selectedFacility?.icon)?.icon}
                <h2 id="facility-details-title" className="text-2xl font-bold text-gray-900 pr-8">{selectedFacility?.name || 'Facility'}</h2>
              </div>
              {/* Images Gallery */}
              {selectedFacility.images && selectedFacility.images.length > 0 && (
                <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedFacility.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img.url}
                      alt={`Facility image ${idx + 1}`}
                      className="w-full h-64 object-cover rounded-lg cursor-zoom-in transition-colors duration-200"
                      onClick={() => setZoomedImage(img.url)}
                    />
                  ))}
                </div>
              )}
              {/* Details Section */}
              <div className="space-y-6 text-gray-700">
                {/* Description */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Description</h4>
                  <p className="text-gray-700 whitespace-pre-wrap">{selectedFacility?.description || 'No description available'}</p>
                </div>
                {/* Meta Info - Location, Date, Posted By */}
                <div className="space-y-3 pt-4 border-t-2 border-gray-200">
                  {selectedFacility.location && (
                    <div className="flex items-center text-sm text-gray-500">
                      <FiMapPin className="w-5 h-5 mr-2 flex-shrink-0"/>
                      <span>{selectedFacility.location}</span>
                    </div>
                  )}
                  {selectedFacility.createdAt && (
                    <div className="flex items-center text-sm text-gray-500">
                      <FiCalendar className="w-5 h-5 mr-2 flex-shrink-0"/>
                      <span>{new Date(selectedFacility.createdAt).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</span>
                    </div>
                  )}
                  {selectedFacility.createdBy && selectedFacility.createdAt && (
                    <div className="flex items-center text-sm text-gray-500">
                      <FiUser className="w-5 h-5 mr-2 text-gray-500" />
                      <span className="truncate">Posted by {selectedFacility.createdBy?.name || selectedFacility.createdBy?.email || 'User'} on {new Date(selectedFacility.createdAt).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</span>
                    </div>
                  )}
                </div>
              </div>
              {/* Owner/Admin Actions */}
              {user?.isAdmin && (
                <div className="flex gap-2 pt-6">
                  <button
                    onClick={() => {
                      if (!selectedFacility) return;
                      setEditFacility({ ...selectedFacility });
                      setEditFacilityImages((selectedFacility.images || []).map(img => ({ ...img, previewUrl: img.url })));
                      setIsEditModalOpen(true);
                      setSelectedFacility(null);
                    }}
                    className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-700 bg-white border-2 border-gray-200 hover:bg-gray-50 active:bg-gray-100 flex items-center"
                  ><span className="truncate">Edit</span></button>
                  <button
                    onClick={async () => {
                      if (!selectedFacility) return;
                      if (!window.confirm('Are you sure you want to delete this facility?')) return;
                      try {
                        const res = await fetch(`${API_BASE}/api/facilities/${selectedFacility._id}`, {
                          method: 'DELETE',
                          headers: { 'Authorization': `Bearer ${token}` },
                        });
                        if (!res.ok) throw new Error('Failed to delete facility');
                        setFacilities(facilities.filter(f => f._id !== selectedFacility._id));
                        setSelectedFacility(null);
                        setSuccessMessage('Facility deleted successfully!');
                      } catch (err) {
                        setError('Failed to delete facility');
                      }
                    }}
                    className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-[#F05A25] hover:bg-red-600 active:bg-[#F05A25] flex items-center"
                  ><span className="truncate">Delete</span></button>
                </div>
              )}
            </div>
          </div>
        )}
        {/* Zoomed Image Modal */}
        {zoomedImage && selectedFacility && selectedFacility.images && selectedFacility.images.length > 0 && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[10000] p-4" onClick={() => setZoomedImage(null)}>
            {/* Image */}
            <img 
              src={zoomedImage} 
              alt="Zoomed"
              className="max-h-[90vh] max-w-full lg:max-w-[80vw] rounded-lg object-contain"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image
            />
            
            {/* Navigation Buttons */}
            {selectedFacility.images.length > 1 && (
              <>
                {/* Previous Button */}
                <button
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 rounded-lg p-3 text-white hover:bg-gray-700 transition-colors duration-200 z-50"
                  onClick={(e) => {
                    e.stopPropagation();
                    const currentIndex = selectedFacility.images!.findIndex(img => img.url === zoomedImage);
                    const prevIndex = (currentIndex - 1 + selectedFacility.images!.length) % selectedFacility.images!.length;
                    setZoomedImage(selectedFacility.images![prevIndex].url);
                  }}
                  aria-label="Previous image"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                </button>
                {/* Next Button */}
                <button
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 rounded-lg p-3 text-white hover:bg-gray-700 transition-colors duration-200 z-50"
                  onClick={(e) => {
                    e.stopPropagation();
                    const currentIndex = selectedFacility.images!.findIndex(img => img.url === zoomedImage);
                    const nextIndex = (currentIndex + 1) % selectedFacility.images!.length;
                    setZoomedImage(selectedFacility.images![nextIndex].url);
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
              className="absolute top-4 right-4 bg-gray-800 rounded-lg p-2 text-white hover:bg-gray-700 transition-colors duration-200 z-50"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        logo={<img src="/Logo.webp" alt="KampusKart Logo" className="h-7 w-7" />}
        brandName="KampusKart"
        socialLinks={socialLinks}
        mainLinks={[
          { href: '/news', label: 'News' },
          { href: '/events', label: 'Events' },
          { href: '/lostfound', label: 'Lost & Found' },
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

export default Facilities; 



