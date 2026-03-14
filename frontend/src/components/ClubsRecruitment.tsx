import React, { useState, useEffect, useMemo, useRef } from 'react';
import { FiPlus, FiCalendar, FiSearch, FiFileText, FiMail, FiUser, FiPhone, FiCheckCircle, FiExternalLink } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import { API_BASE } from '../config';
import { FeatureModal } from './common/FeatureModal';
import { ImageUpload, ImageFile } from './common/ImageUpload';
import { validateMultipleRequired, validateEmail, validatePhone, validateUrl } from '../utils/formValidation';
import { PageSkeleton } from './common/SkeletonLoader';

interface ClubRecruitment {
  _id: string;
  title: string;
  description: string;
  clubName: string;
  startDate: string;
  endDate: string;
  formUrl: string;
  image?: { public_id?: string; url?: string };
  contactInfo?: {
    name?: string;
    email?: string;
    phone?: string;
  };
  status: 'Open' | 'Closed';
}

interface ClubRecruitmentDetailsProps {
  recruitment: ClubRecruitment;
  onClose: () => void;
  onEdit?: (recruitment: ClubRecruitment) => void;
  onDelete?: (id: string) => void;
  isAdmin?: boolean;
}

const ClubRecruitmentDetails: React.FC<ClubRecruitmentDetailsProps> = ({ recruitment, onClose, onEdit, onDelete, isAdmin }) => {
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  const handleImageClick = (imageUrl: string) => {
    setZoomedImage(imageUrl);
  };

  const closeZoomedImageModal = () => {
    setZoomedImage(null);
  };

  const renderStatus = (status: ClubRecruitment['status']) => {
    const bgColorClass = status === 'Open' ? 'bg-green-100' : 'bg-gray-100';
    const textColorClass = status === 'Open' ? 'text-green-800' : 'text-gray-800';
    return (
      <span className={`text-xs px-3 py-1.5 rounded-lg font-medium shadow-sm ${bgColorClass} ${textColorClass}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-4 sm:p-6 md:p-8 max-w-3xl w-full mx-auto max-h-[90vh] md:max-h-[85vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-6 right-6 z-10 bg-[#181818] hover:bg-[#00C6A7] text-white rounded-lg p-2.5 transition-all duration-200 shadow-lg flex items-center justify-center w-10 h-10"
        >
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="pr-12">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3">{recruitment.title}</h2>
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="text-sm px-3 py-1.5 bg-[#00C6A7] text-white rounded-lg font-semibold shadow-sm">
              {recruitment.clubName}
            </span>
            {renderStatus(recruitment.status)}
          </div>
        </div>

        {recruitment.image?.url && (
          <div className="mb-6">
            <img
              src={recruitment.image.url}
              alt={recruitment.title}
              className="w-full h-64 object-cover rounded-lg shadow-md cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => handleImageClick(recruitment.image!.url!)}
            />
          </div>
        )}

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
              <FiFileText className="text-[#00C6A7]" />
              Description
            </h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{recruitment.description}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                <FiCalendar className="text-[#00C6A7]" />
                Start Date
              </h4>
              <p className="text-gray-700">{new Date(recruitment.startDate).toLocaleDateString()}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                <FiCalendar className="text-[#00C6A7]" />
                End Date
              </h4>
              <p className="text-gray-700">{new Date(recruitment.endDate).toLocaleDateString()}</p>
            </div>
          </div>

          {recruitment.contactInfo && (recruitment.contactInfo.name || recruitment.contactInfo.email || recruitment.contactInfo.phone) && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Contact Information</h3>
              <div className="space-y-2">
                {recruitment.contactInfo.name && (
                  <p className="text-gray-700 flex items-center gap-2">
                    <FiUser className="text-[#00C6A7]" />
                    <span className="font-medium">Name:</span> {recruitment.contactInfo.name}
                  </p>
                )}
                {recruitment.contactInfo.email && (
                  <p className="text-gray-700 flex items-center gap-2">
                    <FiMail className="text-[#00C6A7]" />
                    <span className="font-medium">Email:</span> {recruitment.contactInfo.email}
                  </p>
                )}
                {recruitment.contactInfo.phone && (
                  <p className="text-gray-700 flex items-center gap-2">
                    <FiPhone className="text-[#00C6A7]" />
                    <span className="font-medium">Phone:</span> {recruitment.contactInfo.phone}
                  </p>
                )}
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <a
              href={recruitment.formUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-6 py-3 bg-[#00C6A7] text-white rounded-lg font-bold hover:bg-[#009e87] transition-colors flex items-center justify-center gap-2"
            >
              <FiExternalLink />
              Apply Now
            </a>
            {isAdmin && onEdit && (
              <button
                onClick={() => onEdit(recruitment)}
                className="px-6 py-3 bg-[#181818] text-white rounded-lg font-bold hover:bg-gray-700 transition-colors"
              >
                Edit
              </button>
            )}
            {isAdmin && onDelete && (
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to delete this recruitment?')) {
                    onDelete(recruitment._id);
                  }
                }}
                className="px-6 py-3 bg-[#F05A25] text-white rounded-lg font-bold hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            )}
          </div>
        </div>

        {zoomedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-[60] p-4" onClick={closeZoomedImageModal}>
            <button
              onClick={closeZoomedImageModal}
              className="absolute top-4 right-4 bg-white text-gray-900 rounded-lg p-2 hover:bg-gray-100 transition-colors"
              aria-label="Close zoomed image"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img
              src={zoomedImage}
              alt="Zoomed view"
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </div>
    </div>
  );
};

const ClubsRecruitment: React.FC = () => {
  const { user } = useAuth();
  const [recruitments, setRecruitments] = useState<ClubRecruitment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecruitment, setSelectedRecruitment] = useState<ClubRecruitment | null>(null);
  const [editingRecruitment, setEditingRecruitment] = useState<ClubRecruitment | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Open' | 'Closed'>('All');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const isSelectingSuggestion = useRef(false);

  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    fetchRecruitments();
  }, []);

  // Generate autocomplete suggestions
  useEffect(() => {
    if (isSelectingSuggestion.current) {
      isSelectingSuggestion.current = false;
      return;
    }
    if (searchInput.trim().length > 0) {
      const suggestions = new Set<string>();
      recruitments.forEach(recruitment => {
        if (recruitment.title.toLowerCase().includes(searchInput.toLowerCase())) {
          suggestions.add(recruitment.title);
        }
        if (recruitment.clubName.toLowerCase().includes(searchInput.toLowerCase())) {
          suggestions.add(recruitment.clubName);
        }
        if (recruitment.description.toLowerCase().includes(searchInput.toLowerCase())) {
          const words = recruitment.description.split(' ').filter(word => 
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
  }, [searchInput, recruitments]);

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

  const fetchRecruitments = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/api/clubs`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch recruitments');
      const data = await response.json();
      setRecruitments(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const filteredRecruitments = useMemo(() => {
    return recruitments.filter(recruitment => {
      const matchesSearch = recruitment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          recruitment.clubName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          recruitment.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'All' || recruitment.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [recruitments, searchQuery, statusFilter]);

  const handleSubmit = async (formData: any) => {
    try {
      const url = editingRecruitment
        ? `${API_BASE}/api/clubs/${editingRecruitment._id}`
        : `${API_BASE}/api/clubs`;
      
      const method = editingRecruitment ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Failed to save recruitment');
      
      await fetchRecruitments();
      setIsModalOpen(false);
      setEditingRecruitment(null);
    } catch (err) {
      throw err;
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`${API_BASE}/api/clubs/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) throw new Error('Failed to delete recruitment');
      
      await fetchRecruitments();
      setSelectedRecruitment(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const formFields = [
    { name: 'title', label: 'Title', type: 'text', required: true, icon: FiFileText },
    { name: 'clubName', label: 'Club Name', type: 'text', required: true, icon: FiUser },
    { name: 'description', label: 'Description', type: 'textarea', required: true, icon: FiFileText },
    { name: 'startDate', label: 'Start Date', type: 'date', required: true, icon: FiCalendar },
    { name: 'endDate', label: 'End Date', type: 'date', required: true, icon: FiCalendar },
    { name: 'formUrl', label: 'Application Form URL', type: 'url', required: true, icon: FiExternalLink },
    { name: 'status', label: 'Status', type: 'select', required: true, icon: FiCheckCircle, options: ['Open', 'Closed'] },
    { name: 'contactInfo.name', label: 'Contact Name', type: 'text', icon: FiUser },
    { name: 'contactInfo.email', label: 'Contact Email', type: 'email', icon: FiMail },
    { name: 'contactInfo.phone', label: 'Contact Phone', type: 'tel', icon: FiPhone },
  ];

  if (loading) return <PageSkeleton />;

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchRecruitments}
            className="px-6 py-2 bg-[#00C6A7] text-white rounded-lg font-semibold hover:bg-[#009e87] transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900">Club Recruitment</h1>
          {isAdmin && (
            <button
              onClick={() => {
                setEditingRecruitment(null);
                setIsModalOpen(true);
              }}
              className="w-full sm:w-auto px-6 py-3 bg-[#00C6A7] text-white rounded-lg font-bold hover:bg-[#009e87] transition-colors flex items-center justify-center gap-2 shadow-lg"
            >
              <FiPlus className="text-xl" />
              Add Recruitment
            </button>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative" ref={searchRef}>
              <div className="relative">
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  type="text"
                  placeholder="Search recruitments..."
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
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#00C6A7] focus:border-transparent transition-all"
                />
              </div>
              
              {showSuggestions && filteredSuggestions.length > 0 && (
                <div className="absolute z-50 w-full mt-2 bg-white border-2 border-gray-200 rounded-lg shadow-xl max-h-60 overflow-auto">
                  {filteredSuggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        isSelectingSuggestion.current = true;
                        setSearchInput(suggestion);
                        setSearchQuery(suggestion);
                        setTimeout(() => setShowSuggestions(false), 0);
                      }}
                      className="px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 flex items-center gap-2"
                    >
                      <FiSearch className="text-gray-400 text-sm" />
                      <span className="text-sm font-medium text-gray-700">{suggestion}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => {
                setSearchQuery(searchInput);
                setShowSuggestions(false);
              }}
              className="px-8 py-3 bg-[#181818] text-white rounded-lg font-bold hover:bg-[#00C6A7] transition-colors flex items-center justify-center gap-2"
            >
              <FiSearch />
              Search
            </button>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'All' | 'Open' | 'Closed')}
              className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#00C6A7] focus:border-transparent transition-all font-medium"
            >
              <option value="All">All Status</option>
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        </div>

        {filteredRecruitments.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No recruitments found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecruitments.map((recruitment) => (
              <div
                key={recruitment._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => setSelectedRecruitment(recruitment)}
              >
                {recruitment.image?.url && (
                  <img
                    src={recruitment.image.url}
                    alt={recruitment.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs px-3 py-1.5 bg-[#00C6A7] text-white rounded-lg font-semibold">
                      {recruitment.clubName}
                    </span>
                    <span className={`text-xs px-3 py-1.5 rounded-lg font-medium ${
                      recruitment.status === 'Open' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {recruitment.status}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{recruitment.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{recruitment.description}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <FiCalendar className="text-[#00C6A7]" />
                    <span>{new Date(recruitment.startDate).toLocaleDateString()} - {new Date(recruitment.endDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedRecruitment && (
          <ClubRecruitmentDetails
            recruitment={selectedRecruitment}
            onClose={() => setSelectedRecruitment(null)}
            onEdit={(recruitment) => {
              setEditingRecruitment(recruitment);
              setSelectedRecruitment(null);
              setIsModalOpen(true);
            }}
            onDelete={handleDelete}
            isAdmin={isAdmin}
          />
        )}

        {isModalOpen && (
          <FeatureModal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setEditingRecruitment(null);
            }}
            onSubmit={handleSubmit}
            title={editingRecruitment ? 'Edit Recruitment' : 'Add Recruitment'}
            fields={formFields}
            initialData={editingRecruitment || undefined}
            showImageUpload={true}
          />
        )}
      </div>
    </div>
  );
};

export default ClubsRecruitment;
