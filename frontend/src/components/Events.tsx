import React, { useState, useEffect, useCallback } from 'react';
import { FiCalendar, FiMapPin, FiSearch, FiFileText, FiTag, FiMail, FiInfo, FiClock, FiUser, FiPhone, FiCheckCircle, FiEdit2, FiTrash2, FiX } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import { API_BASE } from '../config';
import { FeatureModal } from './common/FeatureModal';
import { ImageUpload, ImageFile } from './common/ImageUpload';
import { validateEmail, validatePhone, validateUrl } from '../utils/formValidation';
import { PageSkeleton } from './common/SkeletonLoader';
import { Footer } from './ui/footer';
import { socialLinks } from '../utils/socialLinks';
import { useSearchSuggestions } from '../hooks/useSearchSuggestions';

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  status: 'Upcoming' | 'Ongoing' | 'Completed' | 'Cancelled';
  registerUrl?: string;
  image?: { public_id?: string; url?: string };
  operatingHours?: string;
  contactInfo?: {
    name?: string;
    email?: string;
    phone?: string;
  };
  mapLocation?: {
    building?: string;
    floor?: string;
    room?: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
}

interface EventDetailsProps {
  event: Event;
  onClose: () => void;
  onEdit?: (event: Event) => void;
  onDelete?: (id: string) => void;
  isAdmin?: boolean;
}

const EventDetails: React.FC<EventDetailsProps> = ({ event, onClose, onEdit, onDelete, isAdmin }) => {
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  const handleImageClick = (imageUrl: string) => {
    setZoomedImage(imageUrl);
  };

  const closeZoomedImageModal = () => {
    setZoomedImage(null);
  };

  const renderStatus = (status: Event['status']) => {
    let bgColorClass;
    let textColorClass;
    switch (status) {
      case 'Upcoming':
        bgColorClass = 'bg-blue-100';
        textColorClass = 'text-blue-800';
        break;
      case 'Ongoing':
        bgColorClass = 'bg-green-100';
        textColorClass = 'text-green-800';
        break;
      case 'Completed':
        bgColorClass = 'bg-gray-100';
        textColorClass = 'text-gray-800';
        break;
      case 'Cancelled':
        bgColorClass = 'bg-red-100';
        textColorClass = 'text-red-800';
        break;
      default:
        bgColorClass = 'bg-gray-100';
        textColorClass = 'text-gray-800';
    }
    return (
      <span className={`text-xs px-3 py-1.5 rounded-lg font-medium ${bgColorClass} ${textColorClass}`}>
        {status}
      </span>
    );
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 flex items-end sm:items-center justify-center z-[9999] p-0 sm:p-4"
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === 'Escape') onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="event-details-title"
      tabIndex={-1}
    >
      <div 
        className="bg-white rounded-t-xl sm:rounded-xl border-2 border-gray-200 p-4 sm:p-6 md:p-8 max-w-3xl w-full mx-auto max-h-[95vh] sm:max-h-[90vh] md:max-h-[85vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
                  <button
            onClick={onClose}
            aria-label="Close dialog"
            className="absolute top-6 right-6 z-10 bg-[#181818] hover:bg-[#00C6A7] active:bg-[#181818] text-white rounded-lg p-2.5 transition-all duration-200 flex items-center justify-center w-10 h-10"
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

        {/* Title */}
        <h2 id="event-details-title" className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 pr-12 sm:pr-14">{event.title}</h2>

        {/* Content: Image and Details side-by-side */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Image or Placeholder */}
          {event.image?.url ? (
            <div 
              className="relative group mb-6 md:mb-0 rounded-lg overflow-hidden border-2 border-gray-200 w-full md:w-1/2 lg:w-1/2 h-48 sm:h-64 md:h-80 flex-shrink-0 mx-auto md:mx-0 max-w-xl cursor-pointer"
              onClick={() => handleImageClick(event.image?.url || '')}
            >
              <img 
                src={event.image.url} 
                alt={event.title} 
                className="block w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-full md:w-1/2 lg:w-1/2 h-48 sm:h-64 md:h-80 bg-gray-100 rounded-lg mb-6 md:mb-0 flex flex-col items-center justify-center text-gray-400 flex-shrink-0 mx-auto md:mx-0 max-w-xl">
              <FiCalendar className="w-16 h-16 mb-2" />
              <span className="text-sm font-medium">No Image Available</span>
            </div>
          )}

          {/* Details Section */}
          <div className="space-y-6 text-gray-700 flex-grow">
            {/* Status Badges */}
            <div className="flex flex-wrap items-center gap-3">
              {renderStatus(event.status)}
            </div>

            {/* Description */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Description</h4>
              <p className="text-gray-700 whitespace-pre-wrap text-sm">{event.description}</p>
            </div>

            {/* Meta Info */}
            <div className="space-y-3 pt-4 border-t-2 border-gray-200">
              <div className="flex items-center text-sm text-gray-500">
                <FiCalendar className="w-5 h-5 mr-2 flex-shrink-0 text-gray-500" />
                <span className="font-medium text-gray-900">
                  {new Date(event.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
              {event.location && (
                <div className="flex items-center text-sm text-gray-500">
                  <FiMapPin className="w-5 h-5 mr-2 flex-shrink-0 text-gray-500" />
                  <span className="truncate">{event.location}</span>
                </div>
              )}
              {event.operatingHours && (
                <div className="flex items-center text-sm text-gray-500">
                  <FiClock className="w-5 h-5 mr-2 flex-shrink-0 text-gray-500" />
                  <span>{event.operatingHours}</span>
                </div>
              )}
              {event.contactInfo?.name && (
                <div className="flex items-center text-sm text-gray-500">
                  <FiUser className="w-5 h-5 mr-2 flex-shrink-0 text-gray-500" />
                  <span>{event.contactInfo.name}</span>
                </div>
              )}
              {event.contactInfo?.email && (
                <div className="flex items-center text-sm text-gray-500">
                  <FiMail className="w-5 h-5 mr-2 flex-shrink-0 text-gray-500" />
                  <a href={`mailto:${event.contactInfo.email}`} className="text-[#00C6A7] hover:underline">{event.contactInfo.email}</a>
                </div>
              )}
              {event.contactInfo?.phone && (
                <div className="flex items-center text-sm text-gray-500">
                  <FiPhone className="w-5 h-5 mr-2 flex-shrink-0 text-gray-500" />
                  <a href={`tel:${event.contactInfo.phone}`} className="text-[#00C6A7] hover:underline">{event.contactInfo.phone}</a>
                </div>
              )}
              {event.mapLocation?.building && (
                <div className="flex items-center text-sm text-gray-500">
                  <FiMapPin className="w-5 h-5 mr-2 flex-shrink-0 text-gray-500" />
                  <span>{event.mapLocation.building}{event.mapLocation.floor ? `, Floor ${event.mapLocation.floor}` : ''}{event.mapLocation.room ? `, Room ${event.mapLocation.room}` : ''}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          {event.registerUrl && (
            <a
              href={event.registerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full text-center px-6 py-3 rounded-lg font-bold text-white bg-[#00C6A7] hover:bg-[#009e87] active:bg-[#00C6A7] transition mb-4"
            >
              Register Now
            </a>
          )}

          {isAdmin && (
            <div className="flex gap-3">
              <button
                onClick={() => onEdit?.(event)}
                className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-700 bg-white border-2 border-gray-200 hover:bg-gray-50 active:bg-gray-100 flex items-center"
                aria-label="Edit event"
              >
                <FiEdit2 className="mr-1" /> Edit Event
              </button>
              <button
                onClick={() => onDelete?.(event._id)}
                className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-[#F05A25] hover:bg-[#d44d1e] active:bg-[#F05A25] flex items-center"
                aria-label="Delete event"
              >
                <FiTrash2 className="mr-1" /> Delete Event
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Zoomed Image Modal */}
      {zoomedImage && (
        <div 
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-[10000] p-4" 
          onClick={closeZoomedImageModal}
          onKeyDown={(e) => {
            if (e.key === 'Escape') closeZoomedImageModal();
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          tabIndex={-1}
        >
          <img 
            src={zoomedImage} 
            alt="Zoomed" 
            className="max-h-[90vh] max-w-full lg:max-w-[80vw] rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          
          {/* Close Button */}
          <button
            onClick={closeZoomedImageModal}
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
    </div>
  );
};

const Events = () => {
  const { user, token } = useAuth();
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [events, setEvents] = useState<Event[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    location: '' as string | undefined,
    status: 'Upcoming' as Event['status'],
    registerUrl: '',
    images: [] as ImageFile[],
    operatingHours: '',
    contactInfo: {
      name: undefined as string | undefined,
      email: undefined as string | undefined,
      phone: undefined as string | undefined,
    },
    mapLocation: {
      building: undefined as string | undefined,
      floor: undefined as string | undefined,
      room: undefined as string | undefined,
      coordinates: undefined as { lat: number; lng: number } | undefined
    }
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedEventForDetails, setSelectedEventForDetails] = useState<Event | null>(null);
  const [pendingDeleteEventId, setPendingDeleteEventId] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{[key: string]: string}>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const buildEventSuggestions = useCallback((event: Event, normalizedQuery: string): string[] => {
    const suggestions: string[] = [];
    if (event?.title?.toLowerCase().includes(normalizedQuery)) {
      suggestions.push(event.title);
    }
    if (event?.location?.toLowerCase().includes(normalizedQuery)) {
      suggestions.push(event.location);
    }
    return suggestions;
  }, []);

  const {
    showSuggestions,
    setShowSuggestions,
    filteredSuggestions,
    searchRef,
    markSuggestionSelection,
  } = useSearchSuggestions<Event>({
    searchInput,
    items: events,
    buildSuggestions: buildEventSuggestions,
  });

  // Auto-hide success message after 3 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(null), 5000);
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
        if (value.trim().length > 1000) return 'Description must be less than 1000 characters';
        return null;
      
      case 'location':
        if (!value.trim()) return 'Location is required';
        if (value.trim().length < 3) return 'Location must be at least 3 characters';
        if (value.trim().length > 200) return 'Location must be less than 200 characters';
        return null;
      
      case 'date':
        if (!value) return 'Date is required';
        return null;
      
      case 'contactEmail':
        if (value.trim()) {
          const emailValidation = validateEmail(value);
          if (!emailValidation.isValid) return emailValidation.error || 'Invalid email format';
        }
        return null;
      
      case 'contactPhone':
        if (value.trim()) {
          const phoneValidation = validatePhone(value);
          if (!phoneValidation.isValid) return phoneValidation.error || 'Invalid phone format';
        }
        return null;
      
      case 'registerUrl':
        if (value.trim()) {
          const urlValidation = validateUrl(value);
          if (!urlValidation.isValid) return urlValidation.error || 'Invalid URL format';
        }
        return null;
      
      default:
        return null;
    }
  };

  const renderStatus = (status: Event['status']) => {
    let bgColorClass;
    let textColorClass;
    switch (status) {
      case 'Upcoming':
        bgColorClass = 'bg-blue-100';
        textColorClass = 'text-blue-800';
        break;
      case 'Ongoing':
        bgColorClass = 'bg-green-100';
        textColorClass = 'text-green-800';
        break;
      case 'Completed':
        bgColorClass = 'bg-gray-100';
        textColorClass = 'text-gray-800';
        break;
      case 'Cancelled':
        bgColorClass = 'bg-red-100';
        textColorClass = 'text-red-800';
        break;
      default:
        bgColorClass = 'bg-gray-100';
        textColorClass = 'text-gray-800';
    }
    return (
      <span className={`text-xs px-3 py-1.5 rounded-lg font-medium ${bgColorClass} ${textColorClass}`}>
        {status}
      </span>
    );
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE}/api/events`);
      if (!response.ok) throw new Error('Failed to fetch events');
      const data = await response.json();
      if (Array.isArray(data)) {
        setEvents(data);
      } else {
        setEvents([]);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      setError('Failed to load events');
      setEvents([]);
    } finally {
      setIsLoading(false);
    }
  };


  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
    setNewEvent({
      title: event.title,
      description: event.description,
      date: event.date.split('T')[0],
      location: event.location || '',
      status: event.status,
      registerUrl: event.registerUrl || '',
      images: event.image?.url ? [{ url: event.image.url, public_id: event.image.public_id, previewUrl: event.image.url }] : [],
      operatingHours: event.operatingHours || '',
      contactInfo: {
        name: event.contactInfo?.name ?? undefined,
        email: event.contactInfo?.email ?? undefined,
        phone: event.contactInfo?.phone ?? undefined
      },
      mapLocation: {
        building: event.mapLocation?.building ?? undefined,
        floor: event.mapLocation?.floor ?? undefined,
        room: event.mapLocation?.room ?? undefined,
        coordinates: event.mapLocation?.coordinates ?? undefined
      }
    });
    setIsModalOpen(true);
  };

  const handleDeleteEvent = async (id: string) => {
    if (!token) return;
    try {
      const response = await fetch(`${API_BASE}/api/events/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to delete event');
      }
      setEvents(prevEvents => prevEvents.filter(e => e._id !== id));
      setSelectedEventForDetails(null);
      setSuccessMessage('Event deleted successfully!');
      setPendingDeleteEventId(null);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to delete event');
    }
  };

  const requestDeleteEvent = (id: string) => {
    setPendingDeleteEventId(id);
  };

  const handleSaveEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    
    setIsSubmitting(true);
    setError(null);
    setFieldErrors({});

    // Validate all fields
    const errors: {[key: string]: string} = {};
    const titleError = validateField('title', newEvent.title);
    const descError = validateField('description', newEvent.description);
    const locationError = validateField('location', newEvent.location || '');
    const dateError = validateField('date', newEvent.date);
    const emailError = newEvent.contactInfo.email ? validateField('contactEmail', newEvent.contactInfo.email) : null;
    const phoneError = newEvent.contactInfo.phone ? validateField('contactPhone', newEvent.contactInfo.phone) : null;
    const urlError = newEvent.registerUrl ? validateField('registerUrl', newEvent.registerUrl) : null;

    if (titleError) errors.title = titleError;
    if (descError) errors.description = descError;
    if (locationError) errors.location = locationError;
    if (dateError) errors.date = dateError;
    if (emailError) errors.contactEmail = emailError;
    if (phoneError) errors.contactPhone = phoneError;
    if (urlError) errors.registerUrl = urlError;

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setError('Please fix the errors below');
      setIsSubmitting(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', newEvent.title.trim());
      formData.append('description', newEvent.description.trim());
      formData.append('date', newEvent.date);
      formData.append('location', newEvent.location?.trim() || '');
      formData.append('status', newEvent.status);
      formData.append('registerUrl', newEvent.registerUrl.trim());
      formData.append('operatingHours', newEvent.operatingHours.trim());
      formData.append('contactInfo', JSON.stringify(newEvent.contactInfo));
      formData.append('mapLocation', JSON.stringify(newEvent.mapLocation || { building: undefined, floor: undefined, room: undefined, coordinates: undefined }));
      if (newEvent.images.length > 0 && newEvent.images[0].file) {
        formData.append('image', newEvent.images[0].file);
      }
      // When editing and image was removed, signal backend to clear it
      if (editingEvent && newEvent.images.length === 0) {
        formData.append('removeImage', 'true');
      }
      const method = editingEvent ? 'PUT' : 'POST';
      const url = editingEvent ? `${API_BASE}/api/events/${editingEvent._id}` : `${API_BASE}/api/events`;
      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        // Handle validation errors from backend
        if (data.details && Array.isArray(data.details)) {
          const backendErrors: {[key: string]: string} = {};
          data.details.forEach((err: any) => {
            backendErrors[err.field] = err.message;
          });
          setFieldErrors(backendErrors);
          setError(data.message || 'Validation failed');
        } else {
          throw new Error(data.message || 'Failed to save event');
        }
        setIsSubmitting(false);
        return;
      }
      
      if (editingEvent) {
        setEvents(events.map(e => e._id === data._id ? data : e));
        setSuccessMessage('Event updated successfully!');
      } else {
        setEvents([data, ...events]);
        setSuccessMessage('Event added successfully!');
      }
      closeEventModal();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to save event. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };


  const openEventDetailsModal = (event: Event) => {
    setSelectedEventForDetails(event);
  };

  const closeEventDetailsModal = () => {
    setSelectedEventForDetails(null);
  };

  const closeEventModal = () => {
    setIsModalOpen(false);
    setEditingEvent(null);
    setNewEvent({ 
      title: '', 
      description: '', 
      date: '', 
      location: '', 
      status: 'Upcoming', 
      registerUrl: '', 
      images: [],
      operatingHours: '',
      contactInfo: { name: undefined, email: undefined, phone: undefined },
      mapLocation: { building: undefined, floor: undefined, room: undefined, coordinates: undefined }
    });
    setError(null);
    setFieldErrors({});
  };

  const filteredEvents = events.filter(event =>
    event &&
    (filterStatus === 'All' || event.status === filterStatus) &&
    ((event.title?.toLowerCase()?.includes(searchQuery.toLowerCase()) ?? false) || 
     (event.description?.toLowerCase()?.includes(searchQuery.toLowerCase()) ?? false))
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
            className="mb-6 bg-green-50 border-2 border-green-200 rounded-lg p-4 flex items-center gap-3 animate-fade-in"
            role="alert"
            aria-live="polite"
          >
            <FiCheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
            <p className="text-green-800 font-medium flex-1">{successMessage}</p>
            <button
              type="button"
              onClick={() => setSuccessMessage(null)}
              className="p-1 rounded-md text-green-700 hover:bg-green-100"
              aria-label="Dismiss success message"
            >
              <FiX className="w-4 h-4" />
            </button>
          </div>
        )}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <h1 className="text-h2 font-extrabold text-black">Campus Events</h1>
          {user?.isAdmin && (
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[#181818] text-white font-bold text-lg hover:bg-[#00C6A7] active:bg-[#181818] transition-colors duration-200"
              aria-label="Add new event"
            >
              + Add New Event
            </button>
          )}
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 gap-4">
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <div className="relative">
              <select 
                value={filterStatus} 
                onChange={e => setFilterStatus(e.target.value)}
                className="appearance-none w-full sm:w-auto px-5 py-3 pr-10 rounded-lg bg-white text-gray-700 font-semibold border-2 border-gray-200 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00C6A7] focus:border-transparent transition-all duration-200 cursor-pointer"
                aria-label="Filter by event status"
              >
              <option value="All">All Statuses</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
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
                placeholder="Search events..."
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {filteredEvents.map(event => (
            <div 
              key={event._id} 
              className="bg-white rounded-lg border-2 border-gray-200 overflow-hidden cursor-pointer hover:border-gray-300 transition-colors duration-200"
              onClick={() => openEventDetailsModal(event)}
            >
              {/* Image Section with Overlay */}
              <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                {event.image?.url ? (
                  <>
                    <img 
                      src={event.image.url} 
                      alt={event.title} 
                      className="w-full h-full object-cover" 
                    />
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-50">
                    <div className="absolute bottom-2 right-2 px-2 py-1 rounded-md bg-black/60 text-white text-xs font-semibold">
                      Tap to zoom
                    </div>
                    <div className="flex flex-col items-center justify-center text-gray-300">
                      <FiCalendar className="w-16 h-16" />
                      <span className="text-xs mt-2">No Image Available</span>
                    </div>
                  </div>
                )}
                {/* Status Badge */}
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 max-w-[calc(100%-1rem)]">
                  {renderStatus(event.status)}
                </div>
              </div>

              {/* Content Section */}
              <div className="p-4 sm:p-5 md:p-6">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 line-clamp-2">{event.title}</h2>
                <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3">{event.description}</p>

                {/* Meta Info Row */}
                <div className="space-y-3 pt-4 border-t-2 border-gray-200">
                  <div className="flex items-center text-sm text-gray-500">
                    <FiCalendar className="mr-2 flex-shrink-0" />
                    <span>{new Date(event.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <FiMapPin className="mr-2 flex-shrink-0" />
                    <span className="truncate">{event.location}</span>
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-4 pt-4 border-t-2 border-gray-200">
                  <button
                    className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                      event.registerUrl 
                        ? 'bg-[#00C6A7] text-white hover:bg-[#009e87] active:bg-[#00C6A7]' 
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                    disabled={!event.registerUrl}
                    onClick={(e) => { 
                      e.stopPropagation();
                      if (event.registerUrl) window.open(event.registerUrl, '_blank'); 
                    }}
                    aria-label={event.registerUrl ? 'Register now' : 'Registration closed'}
                    title={!event.registerUrl ? 'No registration link available' : undefined}
                  >
                    {event.registerUrl ? 'Register Now' : 'Registration Closed'}
                  </button>
                </div>
              </div>
            </div>
          ))}
          {filteredEvents.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-16 px-4">
              <svg className="w-24 h-24 mb-4 text-gray-200" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <rect x="12" y="20" width="72" height="64" rx="8" fill="currentColor" />
                <rect x="12" y="20" width="72" height="64" rx="8" fill="white" stroke="#E5E7EB" strokeWidth="3" />
                <rect x="24" y="8" width="8" height="20" rx="4" fill="#D1D5DB" />
                <rect x="64" y="8" width="8" height="20" rx="4" fill="#D1D5DB" />
                <rect x="20" y="44" width="56" height="4" rx="2" fill="#E5E7EB" />
                <rect x="20" y="56" width="40" height="4" rx="2" fill="#E5E7EB" />
                <rect x="20" y="68" width="24" height="4" rx="2" fill="#E5E7EB" />
                <circle cx="72" cy="72" r="16" fill="#F3F4F6" stroke="#E5E7EB" strokeWidth="2" />
                <path d="M66 72h12M72 66v12" stroke="#9CA3AF" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
              <p className="text-gray-500 font-semibold text-lg mb-1">
                {searchQuery || filterStatus !== 'All' ? 'No events match your filters' : 'No events yet'}
              </p>
              <p className="text-gray-400 text-sm mb-4">
                {searchQuery || filterStatus !== 'All' ? 'Try adjusting your search or filter.' : 'Check back soon for upcoming campus events.'}
              </p>
              {(searchQuery || filterStatus !== 'All') && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchInput('');
                    setSearchQuery('');
                    setFilterStatus('All');
                  }}
                  className="px-5 py-2 rounded-lg bg-[#181818] text-white text-sm font-semibold hover:bg-[#00C6A7] transition-colors duration-200"
                >
                  Clear filters
                </button>
              )}
            </div>
          )}
        </div>

        {/* Add/Edit Event Modal */}
        <FeatureModal
          isOpen={isModalOpen}
          onClose={closeEventModal}
          title={editingEvent ? 'Edit Event' : 'Add New Event'}
          error={error}
        >
              <form onSubmit={(e) => { handleSaveEvent(e).catch(console.error); }} className="space-y-8">
                {/* Event Details Section */}
                <div className="border-2 border-gray-200 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-bold mb-4 text-gray-900 flex items-center gap-2">Event Details <FiInfo className="text-gray-400" title="Fill in the details of your event." /></h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">Title <FiTag className="inline text-gray-400" /></label>
                      <div className="relative">
                        <input
                          type="text"
                          value={newEvent.title}
                          onChange={e => { setNewEvent({...newEvent, title: e.target.value}); if (fieldErrors.title) setFieldErrors(prev => ({...prev, title: ''})); }}
                          className={`w-full pl-10 pr-3 py-2.5 border-2 ${fieldErrors.title ? 'border-red-400' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00C6A7] focus:border-transparent bg-white text-gray-700 text-base`}
                          placeholder="Enter event title (e.g., Annual Tech Symposium 2024)"
                          required
                          aria-label="Event Title"
                        />
                        <FiTag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      </div>
                      {fieldErrors.title && <p className="text-xs text-red-500 mt-1">{fieldErrors.title}</p>}
                      <p className="text-xs text-gray-500 mt-1">Give a short, descriptive title for the event.</p>
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
                          value={newEvent.date}
                          onChange={e => { setNewEvent({...newEvent, date: e.target.value}); if (fieldErrors.date) setFieldErrors(prev => ({...prev, date: ''})); }}
                          className={`w-full pl-10 pr-3 py-2.5 border-2 ${fieldErrors.date ? 'border-red-400' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00C6A7] focus:border-transparent bg-white text-gray-700 text-base cursor-pointer`}
                          required
                          aria-label="Event Date"
                        />
                      </div>
                      {fieldErrors.date && <p className="text-xs text-red-500 mt-1">{fieldErrors.date}</p>}
                      <p className="text-xs text-gray-500 mt-1">When will the event take place?</p>
                    </div>
                  </div>
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">Description <FiFileText className="inline text-gray-400" /></label>
                    <div className="relative">
                      <textarea
                        value={newEvent.description}
                        onChange={e => { setNewEvent({...newEvent, description: e.target.value}); if (fieldErrors.description) setFieldErrors(prev => ({...prev, description: ''})); }}
                        className={`w-full pl-10 pr-3 py-2.5 border-2 ${fieldErrors.description ? 'border-red-400' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00C6A7] focus:border-transparent bg-white text-gray-700 text-base resize-none`}
                        rows={4}
                        placeholder="Provide a detailed description of the event. Include key highlights, agenda, target audience, and any special requirements."
                        required
                        aria-label="Event Description"
                      ></textarea>
                      <FiFileText className="absolute left-3 top-3 text-gray-400" />
                    </div>
                    {fieldErrors.description && <p className="text-xs text-red-500 mt-1">{fieldErrors.description}</p>}
                    <p className="text-xs text-gray-500 mt-1">Provide details to help users understand the event.</p>
                  </div>
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">Location <FiMapPin className="inline text-gray-400" /></label>
                      <div className="relative">
                        <input
                          type="text"
                          value={newEvent.location}
                          onChange={e => { setNewEvent({...newEvent, location: e.target.value}); if (fieldErrors.location) setFieldErrors(prev => ({...prev, location: ''})); }}
                          className={`w-full pl-10 pr-3 py-2.5 border-2 ${fieldErrors.location ? 'border-red-400' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00C6A7] focus:border-transparent bg-white text-gray-700 text-base`}
                          placeholder="Enter venue details (e.g., Main Auditorium, Block A, Floor 3)"
                          required
                          aria-label="Event Location"
                        />
                        <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      </div>
                      {fieldErrors.location && <p className="text-xs text-red-500 mt-1">{fieldErrors.location}</p>}
                      <p className="text-xs text-gray-500 mt-1">Where will the event be held?</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">Status <FiTag className="inline text-gray-400" /></label>
                      <select
                        value={newEvent.status}
                        onChange={e => setNewEvent({...newEvent, status: e.target.value as Event['status']})}
                        className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00C6A7] focus:border-transparent bg-white text-gray-700 text-base"
                        required
                        aria-label="Event Status"
                      >
                        <option value="Upcoming">Upcoming</option>
                        <option value="Ongoing">Ongoing</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                      <p className="text-xs text-gray-500 mt-1">Select the current status of the event.</p>
                    </div>
                  </div>
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">Register URL (optional) <FiMail className="inline text-gray-400" /></label>
                    <div className="relative">
                      <input
                        type="url"
                        value={newEvent.registerUrl}
                        onChange={e => setNewEvent({...newEvent, registerUrl: e.target.value})}
                        className="w-full pl-10 pr-3 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00C6A7] focus:border-transparent bg-white text-gray-700 text-base"
                        placeholder="https://forms.google.com/..."
                        aria-label="Register URL"
                      />
                      <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Add a registration link if available.</p>
                  </div>
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">Operating Hours <FiCalendar className="inline text-gray-400" /></label>
                    <div className="relative">
                      <input
                        type="text"
                        value={newEvent.operatingHours}
                        onChange={e => setNewEvent({...newEvent, operatingHours: e.target.value})}
                        className="w-full pl-10 pr-3 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00C6A7] focus:border-transparent bg-white text-gray-700 text-base"
                        placeholder="e.g., 9:00 AM - 5:00 PM"
                        aria-label="Operating Hours"
                      />
                      <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Specify the event's operating hours.</p>
                  </div>
                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Contact Information</h4>
                    <div className="space-y-4">
                      <div className="relative">
                        <input
                          type="text"
                          value={newEvent.contactInfo.name ?? ''}
                          onChange={e => setNewEvent({...newEvent, contactInfo: {...newEvent.contactInfo, name: e.target.value}})}
                          className="w-full pl-10 pr-3 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00C6A7] focus:border-transparent bg-white text-gray-700 text-base"
                          placeholder="Contact Person Name"
                          aria-label="Contact Name"
                        />
                      </div>
                      <div className="relative">
                        <input
                          type="email"
                          value={newEvent.contactInfo.email ?? ''}
                          onChange={e => setNewEvent({...newEvent, contactInfo: {...newEvent.contactInfo, email: e.target.value}})}
                          className="w-full pl-10 pr-3 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00C6A7] focus:border-transparent bg-white text-gray-700 text-base"
                          placeholder="contact@example.com"
                          aria-label="Contact Email"
                        />
                      </div>
                      <div className="relative">
                        <input
                          type="tel"
                          value={newEvent.contactInfo.phone ?? ''}
                          onChange={e => setNewEvent({...newEvent, contactInfo: {...newEvent.contactInfo, phone: e.target.value}})}
                          className="w-full pl-10 pr-3 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00C6A7] focus:border-transparent bg-white text-gray-700 text-base"
                          placeholder="+1 (555) 123-4567"
                          aria-label="Contact Phone"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Map Location</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="relative">
                        <input
                          type="text"
                          value={newEvent.mapLocation.building ?? ''}
                          onChange={e => setNewEvent({...newEvent, mapLocation: {...newEvent.mapLocation, building: e.target.value}})}
                          className="w-full pl-10 pr-3 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00C6A7] focus:border-transparent bg-white text-gray-700 text-base"
                          placeholder="Building Name"
                          aria-label="Building"
                        />
                      </div>
                      <div className="relative">
                        <input
                          type="text"
                          value={newEvent.mapLocation.floor ?? ''}
                          onChange={e => setNewEvent({...newEvent, mapLocation: {...newEvent.mapLocation, floor: e.target.value}})}
                          className="w-full pl-10 pr-3 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00C6A7] focus:border-transparent bg-white text-gray-700 text-base"
                          placeholder="Floor"
                          aria-label="Floor"
                        />
                      </div>
                      <div className="relative">
                        <input
                          type="text"
                          value={newEvent.mapLocation.room ?? ''}
                          onChange={e => setNewEvent({...newEvent, mapLocation: {...newEvent.mapLocation, room: e.target.value}})}
                          className="w-full pl-10 pr-3 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00C6A7] focus:border-transparent bg-white text-gray-700 text-base"
                          placeholder="Room Number"
                          aria-label="Room"
                        />
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Add detailed location information to help attendees find the venue.</p>
                  </div>
                </div>
                {/* Images Section */}
                <ImageUpload
                  images={newEvent.images}
                  onImagesChange={(images) => setNewEvent({ ...newEvent, images })}
                  maxImages={1}
                  single={true}
                  id="event-image-upload"
                  label="Image"
                  helpText="PNG, JPG, GIF up to 5MB. Recommended size: 1200x800px. Add a high-quality image that represents your event."
                />
                <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={closeEventModal}
                    className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-700 bg-white border-2 border-gray-200 hover:bg-gray-50 active:bg-gray-100"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold text-white bg-[#181818] hover:bg-[#00C6A7] active:bg-[#181818] transition-colors duration-200 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {editingEvent ? 'Saving...' : 'Adding...'}
                      </span>
                    ) : (
                      editingEvent ? 'Save Changes' : 'Add Event'
                    )}
                  </button>
                </div>
              </form>
        </FeatureModal>

        {/* Event Details Modal */}
        {selectedEventForDetails && (
          <EventDetails
            event={selectedEventForDetails}
            onClose={closeEventDetailsModal}
            onEdit={handleEditEvent}
            onDelete={requestDeleteEvent}
            isAdmin={user?.isAdmin}
          />
        )}

        <FeatureModal
          isOpen={!!pendingDeleteEventId}
          onClose={() => setPendingDeleteEventId(null)}
          title="Delete Event"
          error={null}
        >
          <p className="text-sm text-gray-600 mb-6">Are you sure you want to delete this event? This action cannot be undone.</p>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setPendingDeleteEventId(null)}
              className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-700 bg-white border-2 border-gray-200 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => pendingDeleteEventId && handleDeleteEvent(pendingDeleteEventId)}
              className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-[#F05A25] hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </FeatureModal>
      </main>

      {/* Footer */}
      <Footer
        logo={<img src="/Logo.webp" alt="KampusKart Logo" className="h-7 w-7" />}
        brandName="KampusKart"
        socialLinks={socialLinks}
        mainLinks={[
          { href: '/news', label: 'News' },
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

export default Events; 




