/// <reference types="vite/client" />
import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { GoogleMap, useLoadScript, InfoWindow, Marker, Libraries } from '@react-google-maps/api';
import { FiSearch } from 'react-icons/fi';
import debounce from 'lodash/debounce';

// Define libraries as a proper static constant with correct type
const GOOGLE_MAPS_LIBRARIES: Libraries = ["places"];

// Memoize map options to prevent unnecessary re-renders
const MAP_OPTIONS = {
  disableDefaultUI: false,
  zoomControl: true,
  streetViewControl: true,
  scaleControl: true,
  mapTypeControl: true,
  fullscreenControl: true,
  mapId: '7b1615000ef5c43e3005d9c9'
} as const;

// Memoize map container style
const MAP_CONTAINER_STYLE = {
  width: '100%',
  height: '100%',
} as const;

// Move useLoadScript outside component and memoize it
const useGoogleMaps = () => {
  return useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: GOOGLE_MAPS_LIBRARIES
  });
};

interface CampusMapProps {}

interface Location {
  id: number;
  name: string;
  lat: number;
  lng: number;
  description?: string;
  category?: string;
  placeId?: string;
}

const CampusMap: React.FC<CampusMapProps> = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [infoWindowPosition, setInfoWindowPosition] = useState<google.maps.LatLng | null>(null);
  const [hasRequestedLocation, setHasRequestedLocation] = useState(false);
  const animationInProgress = useRef(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const zoomChangeListenerRef = useRef<google.maps.MapsEventListener | null>(null);

  const { isLoaded, loadError } = useGoogleMaps();

  // Lock page scrolling while the map page is mounted to ensure a single-frame view
  useEffect(() => {
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;
    };
  }, []);

  // Memoize locations array to prevent unnecessary re-renders
  const locations = useMemo(() => [
    {
      id: 1,
      name: "MIT-ADT Entrance",
      lat: 18.490173753843422,
      lng: 74.0254303116109,
      description: "Main entrance of MIT-ADT University",
      category: "Entrance",
      // placeId retained in data for future use, but not used in UI or logic
    },
    {
      id: 2,
      name: "MANET ADMIN, Vice President Office, Vice Chancellor Office, Registrar Office, School of Law",
      lat: 18.490946453598095,
      lng: 74.02419055616282,
      description: "Administrative block housing key offices and School of Law",
      category: "Administration",
      // placeId retained in data for future use, but not used in UI or logic
    },
    {
      id: 3,
      name: "Cricket Ground",
      lat: 18.490748499095503,
      lng: 74.02836838570158,
      description: "Main cricket ground for sports activities",
      category: "Sports",
      // placeId retained in data for future use, but not used in UI or logic
    },
    {
      id: 4,
      name: "Sports Complex",
      lat: 18.491807509791,
      lng: 74.0284366873852,
      description: "Multi-sport facility with indoor and outdoor sports",
      category: "Sports",
      // placeId retained in data for future use, but not used in UI or logic
    },
    {
      id: 5,
      name: "World Peace Dome",
      lat: 18.49262365645109,
      lng: 74.02565779888813,
      description: "Iconic dome structure for major events and ceremonies",
      category: "Landmark",
      // placeId retained in data for future use, but not used in UI or logic
    },
    {
      id: 6,
      name: "School of Education & Research",
      lat: 18.493802098401595,
      lng: 74.02568599386356,
      description: "Dedicated to education and research programs",
      category: "Academic",
      // placeId retained in data for future use, but not used in UI or logic
    },
    {
      id: 7,
      name: "School of Humanities, School of Vedic Sciences",
      lat: 18.493614169153485,
      lng: 74.02490749767114,
      description: "Houses humanities and Vedic studies departments",
      category: "Academic",
      // placeId retained in data for future use, but not used in UI or logic
    },
    {
      id: 8,
      name: "School of Vishwashanti Sangeetkala Academy",
      lat: 18.494201447370067,
      lng: 74.02342835489087,
      description: "Center for performing arts and music education",
      category: "Arts",
      // placeId retained in data for future use, but not used in UI or logic
    },
    {
      id: 9,
      name: "Account Department, Guest House",
      lat: 18.493397060315154,
      lng: 74.02325704813967,
      description: "Financial services and guest accommodation",
      category: "Administration",
      // placeId retained in data for future use, but not used in UI or logic
    },
    {
      id: 10,
      name: "Raj Bungalow",
      lat: 18.493343843257275,
      lng: 74.02357135415613,
      description: "Heritage building and official residence",
      category: "Landmark",
      // placeId retained in data for future use, but not used in UI or logic
    },
    {
      id: 11,
      name: "School of Food Technology, MANET Hostel",
      lat: 18.491843937146296,
      lng: 74.02292535777815,
      description: "Food technology studies and student accommodation",
      category: "Academic",
      // placeId retained in data for future use, but not used in UI or logic
    },
    {
      id: 12,
      name: "School of Architecture",
      lat: 18.494528998144798,
      lng: 74.02184922136568,
      description: "Architecture and design education center",
      category: "Academic",
      // placeId retained in data for future use, but not used in UI or logic
    },
    {
      id: 13,
      name: "School of Film & Theatre, School of Bioengineering Sciences & Research, School of Corporate Innovation & Leadership, Atal Incubation Center (AIC), School of Indian Civil Services",
      lat: 18.495302450375288,
      lng: 74.02196302037389,
      description: "Multi-disciplinary complex for various schools and research centers",
      category: "Academic",
      // placeId retained in data for future use, but not used in UI or logic
    },
    {
      id: 14,
      name: "Institute of Design",
      lat: 18.49468368348241,
      lng: 74.021723522408,
      description: "Design education and research institute",
      category: "Academic",
      // placeId retained in data for future use, but not used in UI or logic
    },
    {
      id: 15,
      name: "School of Fine Arts & Applied Arts, Urmilatai Karad Auditorium",
      lat: 18.495094204174062,
      lng: 74.02049618226005,
      description: "Arts education and performance venue",
      category: "Arts",
      // placeId retained in data for future use, but not used in UI or logic
    },
    {
      id: 16,
      name: "IT Building, School of Computing, School of Engineering & Sciences, School of Holistic Development, College of Management (MITCOM), CRIEYA",
      lat: 18.493930153250627,
      lng: 74.01912736815999,
      description: "Technology and management education complex",
      category: "Academic",
      // placeId retained in data for future use, but not used in UI or logic
    },
    {
      id: 17,
      name: "Tuck Shop",
      lat: 18.493523886263336,
      lng: 74.02291451273722,
      description: "Tuck Shop – Quick bites, chill vibes, heart of MIT ADT.",
      category: "Landmark",
      // placeId retained in data for future use, but not used in UI or logic
    },
    {
      id: 18,
      name: "MANET Canteen",
      lat: 18.491564033859877,
      lng: 74.02410194039003,
      description: "MANET Canteen – Grab-and-go meals for busy campus days.",
      category: "Landmark",
      // placeId retained in data for future use, but not used in UI or logic
    }
  ], []);

  // Set Raj Bungalow as the default map center
  const universityLocation = useMemo(() => ({
    lat: 18.493343843257275,
    lng: 74.02357135415613
  }), []);

  // Add state for map center and zoom
  const [mapCenter, setMapCenter] = useState(universityLocation);
  const [mapZoom, setMapZoom] = useState(16);

  // Debounced search handler
  const debouncedSetSearchQuery = useMemo(
    () => {
      const debouncedFn = debounce((value: string) => {
        setSearchQuery(value);
      }, 300);
      return debouncedFn;
    },
    []
  );

  // Memoize filtered locations
  const filteredLocations = useMemo(() => {
    return locations.filter(location =>
      location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [locations, searchQuery]);

  // Handle search input change
  const handleSearchInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    debouncedSetSearchQuery(e.target.value);
    // setIsPanelOpen(true); // Panel logic is changing
  }, [debouncedSetSearchQuery]);

  // Handle search focus
  const handleSearchFocus = useCallback(() => {
    setIsSearchFocused(true);
  }, []);

  // Handle search blur
  const handleSearchBlur = useCallback(() => {
    // Delay to allow click on list items before setting focused to false
    setTimeout(() => {
      setIsSearchFocused(false);
    }, 200);
  }, []);

  // Optimize marker click handler
  const handleMarkerClick = useCallback((location: Location) => {
    // InfoWindow open handler
    setSelectedLocation(location);
    setInfoWindowPosition(new google.maps.LatLng(location.lat, location.lng));
  }, []);

  // Optimize location click handler
  const handleLocationClick = useCallback((location: Location) => {
    if (!mapRef) return;
    if (animationInProgress.current) return; // Prevent overlapping animations
    animationInProgress.current = true;

    const currentZoom = mapRef.getZoom() || 15;
    const targetZoom = 18;
    const zoomSteps = 10;
    const zoomInterval = 50;

    let currentStep = 0;
    const zoomIntervalId = setInterval(() => {
      if (currentStep >= zoomSteps) {
        clearInterval(zoomIntervalId);
        setTimeout(() => {
          handleMarkerClick(location);
          setMapCenter({ lat: location.lat, lng: location.lng });
          setMapZoom(targetZoom);
          animationInProgress.current = false;
        }, 100);
        return;
      }
      const progress = currentStep / zoomSteps;
      const newZoom = currentZoom + (targetZoom - currentZoom) * progress;
      mapRef.setZoom(newZoom);
      mapRef.panTo({ lat: location.lat, lng: location.lng });
      currentStep++;
    }, zoomInterval);
  }, [mapRef, handleMarkerClick]);

  // Optimize map click handler
  const handleMapClick = useCallback(() => {
    setInfoWindowPosition(null);
    setSelectedLocation(null);
  }, []);

  // Optimize map load handler
  const onMapLoad = useCallback((map: google.maps.Map) => {
    setMapRef(map);
    
    // Add zoom change listener to close InfoWindow on zoom
    if (zoomChangeListenerRef.current) {
      google.maps.event.removeListener(zoomChangeListenerRef.current);
    }
    
    zoomChangeListenerRef.current = google.maps.event.addListener(map, 'zoom_changed', () => {
      // Close InfoWindow when zoom changes
      setInfoWindowPosition(null);
      setSelectedLocation(null);
    });
  }, []);

  // Optimize recenter handler
  const handleRecenter = useCallback(() => {
    if (!hasRequestedLocation) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
            const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            };
            setUserLocation(newLocation);
            setHasRequestedLocation(true);
            if (mapRef) {
              mapRef.panTo(newLocation);
              mapRef.setZoom(17);
            }
        },
        (error) => {
          console.warn('Geolocation error:', error);
        }
      );
    }
    } else if (mapRef && userLocation) {
      mapRef.panTo(userLocation);
      mapRef.setZoom(17);
    }
  }, [hasRequestedLocation, mapRef, userLocation]);

  // Panel is always open on desktop, hidden on mobile
  const isPanelOpen = window.innerWidth >= 768;


  // Cleanup debounced function and zoom listener on unmount
  useEffect(() => {
    const fn = debouncedSetSearchQuery;
    return () => {
      if (fn && typeof (fn as any).cancel === 'function') {
        (fn as any).cancel();
      }
      // Cleanup zoom change listener
      if (zoomChangeListenerRef.current) {
        google.maps.event.removeListener(zoomChangeListenerRef.current);
        zoomChangeListenerRef.current = null;
      }
    };
  }, [debouncedSetSearchQuery]);

  if (loadError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Map Loading Error</h3>
          <p className="text-gray-600 mb-4">Unable to load the campus map. Please check your internet connection and try again.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-2 bg-[#00C6A7] text-white rounded-lg font-semibold hover:bg-[#009e87] transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!isLoaded || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00C6A7] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading campus map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex flex-col bg-gray-100 relative overflow-hidden overscroll-none" style={{ height: '100dvh' }}>
      {/* Mobile Header - Only visible on mobile */}
      <div className="md:hidden p-3 bg-white shadow-sm border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-800 text-center">Campus Map</h1>
      </div>
      
      {/* Desktop Header - Only visible on desktop */}
      <div className="hidden md:block p-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Campus Map</h1>
      </div>
      
      {/* Main flex container for map and panel */}
      <div className="flex flex-col md:flex-row flex-1 min-h-0">
        {/* Map Container - Full width on mobile, 2/3 on desktop */}
        <div className="w-full md:w-2/3 h-full relative">
          <div className="bg-white shadow-lg overflow-hidden h-full relative">
            {/* Mobile Search Bar and Dropdown - Visible on mobile only, positioned over map */}
            <div className="md:hidden absolute top-2 left-3 right-3 z-10">
              <form
                className="relative w-full flex border border-gray-300 overflow-hidden shadow-lg focus-within:ring-2 focus-within:ring-[#00C6A7] focus-within:border-[#00C6A7] transition-all duration-300 rounded-full bg-white box-border"
                onSubmit={e => { e.preventDefault(); setSearchQuery(searchInput); }}
              >
                <div className="relative flex items-center flex-1">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search campus locations..."
                    className="block w-full pl-10 pr-4 py-2.5 bg-white text-black outline-none text-base border-none rounded-l-full"
                    value={searchInput}
                    onChange={handleSearchInputChange}
                    onFocus={handleSearchFocus}
                    onBlur={handleSearchBlur}
                    aria-label="Search locations"
                    onClick={() => setIsSearchFocused(true)}
                  />
                </div>
                <button
                  type="submit"
                  aria-label="Search"
                  className="px-4 py-2.5 bg-[#00C6A7] text-white font-semibold hover:bg-[#009e87] transition-all duration-300 ease-in-out rounded-r-full flex items-center justify-center"
                >
                  <FiSearch className="h-4 w-4" />
                </button>
              </form>

              {/* Mobile Locations Dropdown */}
              {isSearchFocused && filteredLocations.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 shadow-xl rounded-lg mt-1 max-h-48 overflow-y-auto z-20">
                  <ul className="space-y-1 p-2">
                    {filteredLocations.map((location) => (
                      <li
                        key={location.id}
                        className={`border-b border-gray-100 text-gray-800 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors duration-150 ${
                          selectedLocation?.id === location.id ? 'bg-[#00C6A7]/10 border-[#00C6A7]/30' : ''
                        }`}
                        onClick={() => {
                          handleLocationClick(location);
                          setIsSearchFocused(false);
                        }}
                      >
                        <div className="flex items-start gap-2">
                          <div className="flex-1 min-w-0">
                            <span className="font-semibold text-sm block truncate">{location.id}. {location.name}</span>
                            <p className="text-xs text-gray-600 mt-1 line-clamp-1">{location.description}</p>
                          </div>
                          <span className="text-xs bg-gray-100 px-2 py-1 rounded-full flex-shrink-0 whitespace-nowrap">
                            {location.category}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <GoogleMap
              mapContainerStyle={MAP_CONTAINER_STYLE}
              center={animationInProgress.current ? undefined : mapCenter}
              zoom={animationInProgress.current ? undefined : mapZoom}
              options={{
                ...MAP_OPTIONS,
                // Adjust controls for mobile and desktop
                zoomControl: true,
                mapTypeControl: window.innerWidth >= 768,
                streetViewControl: window.innerWidth >= 768,
                fullscreenControl: window.innerWidth >= 768,
              }}
              onClick={handleMapClick}
              onLoad={onMapLoad}
            >
              {/* Markers for all filtered locations */}
              {isLoaded && filteredLocations.map(location => (
                <Marker
                  key={location.id}
                  position={{ lat: location.lat, lng: location.lng }}
                  title={location.name}
                  onClick={() => handleMarkerClick(location)}
                  animation={google.maps.Animation.DROP}
                />
              ))}
              {/* Marker for user location */}
              {isLoaded && userLocation && (
                <Marker
                  position={userLocation}
                  icon={'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'}
                  title="Your Location"
                  animation={google.maps.Animation.BOUNCE}
                />
              )}
              {/* InfoWindow for location details */}
              {selectedLocation && infoWindowPosition && (
                <InfoWindow
                  position={infoWindowPosition}
                  onCloseClick={() => {
                    setInfoWindowPosition(null);
                    setSelectedLocation(null);
                  }}
                  options={{
                    pixelOffset: new window.google.maps.Size(0, -50),
                    maxWidth: window.innerWidth < 768 ? 280 : 380,
                    disableAutoPan: false
                  }}
                >
                  <div 
                    className="p-0 max-w-xs bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200/50" 
                    style={{ 
                      margin: 0, 
                      padding: 0,
                      overflow: 'hidden',
                      overflowY: 'hidden',
                      overflowX: 'hidden'
                    }}
                  >
                    {/* Header Section with Gradient */}
                    <div className="bg-gradient-to-r from-[#00C6A7] to-[#009e87] p-3 relative" style={{ margin: 0, paddingTop: '12px', paddingBottom: '12px' }}>
                      {/* Close Button */}
                      <button
                        onClick={() => {
                          setInfoWindowPosition(null);
                          setSelectedLocation(null);
                        }}
                        className="absolute top-1.5 right-1.5 p-1.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all duration-200 flex-shrink-0 group"
                        aria-label="Close"
                        title="Close"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white group-hover:rotate-90 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                      
                      <div className="pr-8">
                        <h3 className="font-black text-base text-white mb-1.5 line-clamp-2 leading-tight">{selectedLocation.name}</h3>
                        <span className="inline-flex items-center px-2.5 py-0.5 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold rounded-full border border-white/30">
                          {selectedLocation.category}
                        </span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-3 space-y-3" style={{ overflow: 'hidden', overflowY: 'hidden', overflowX: 'hidden' }}>
                    {/* Description Section */}
                      <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 p-3 rounded-xl border border-gray-200/50">
                        <div className="flex items-start gap-2 mb-1.5">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#00C6A7] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <h4 className="text-xs font-bold text-gray-900">About this location</h4>
                        </div>
                        <p className="text-xs text-gray-700 leading-relaxed line-clamp-3 pl-6">{selectedLocation.description}</p>
                    </div>

                    {/* Location Details Section */}
                      <div className="flex items-center gap-2 px-2 py-1.5 bg-gray-50 rounded-lg border border-gray-200/50">
                        <div className="flex items-center justify-center w-8 h-8 bg-[#00C6A7]/10 rounded-lg">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#00C6A7]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                        <span className="text-sm font-medium text-gray-700">Location ID: <span className="text-[#00C6A7] font-bold">{selectedLocation.id}</span></span>
                    </div>

                      {/* Action Button */}
                      <button
                        className="w-full px-3 py-2.5 bg-gradient-to-r from-[#00C6A7] to-[#009e87] text-white rounded-xl hover:from-[#009e87] hover:to-[#008a75] transition-all duration-200 flex items-center justify-center gap-2 font-bold text-xs shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
                        onClick={() => {
                          const url = `https://www.google.com/maps/dir/?api=1&destination=${selectedLocation.lat},${selectedLocation.lng}`;
                          window.open(url, '_blank');
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        Get Directions
                      </button>
                    </div>
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
            {/* Recenter Button - Optimized for mobile */}
            <button
              onClick={handleRecenter}
              className="absolute bottom-3 left-3 z-10 bg-white border border-gray-300 shadow-lg rounded-full p-2.5 flex items-center justify-center hover:bg-blue-50 transition-all duration-200"
              title="Re-center map on your location"
              style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={2} fill="none" />
                <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth={2} fill="none" />
                <line x1="12" y1="2" x2="12" y2="6" stroke="currentColor" strokeWidth={2} />
                <line x1="12" y1="18" x2="12" y2="22" stroke="currentColor" strokeWidth={2} />
                <line x1="2" y1="12" x2="6" y2="12" stroke="currentColor" strokeWidth={2} />
                <line x1="18" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth={2} />
              </svg>
            </button>
          </div>
        </div>

        {/* Locations List Panel Container - Full width on mobile, 1/3 on desktop */}
        {/* Added hidden class for mobile, removed mobile toggle button */}
        <div className={`hidden md:flex w-full md:w-1/3 flex-col md:h-full relative transition-all duration-300 ease-in-out md:opacity-100 md:h-full`}>
          {/* Toggle Panel Button - Mobile Only, positioned at the top center */}
          {/* Removed this button as the panel is now hidden on mobile */}

          {/* Inner container with padding, shadow, and overflow for list */}
          {/* Added pt-4 to prevent button overlap */}
          {/* Adjusted opacity and height based on panel state */}
          {/* Removed mobile specific height/opacity classes */}
          <div className={`bg-white shadow-lg p-3 md:p-4 md:flex-grow transition-all duration-300 ease-in-out opacity-100 h-full overflow-y-auto`}>
            <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-3 md:mb-4">Campus Locations</h2>
            {/* Desktop Search Bar - Visible on desktop only */}
            <form className="hidden md:flex relative mb-6 w-full border border-gray-300 overflow-hidden shadow-sm focus-within:ring-1 focus-within:ring-black focus-within:border-black transition-all duration-300 rounded-full" onSubmit={e => { e.preventDefault(); setSearchQuery(searchInput); }}>
              <div className="relative flex items-center flex-1">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search locations..."
                  className="block w-full pl-10 pr-4 py-2 bg-white text-black outline-none text-lg border-none rounded-l-full"
                  value={searchInput}
                  onChange={handleSearchInputChange}
                  onFocus={handleSearchFocus}
                  onBlur={handleSearchBlur}
                  aria-label="Search locations"
                />
              </div>
              <button
                type="submit"
                aria-label="Search"
                className="px-6 py-2 bg-[#00C6A7] text-white font-semibold hover:bg-[#009e87] transition-colors duration-150 rounded-r-full"
              >
                Search
              </button>
            </form>
            {/* Locations List - Always in panel on desktop, hidden on mobile */}
            <div className="hidden md:block transition-all duration-300 ease-in-out opacity-100">
              <ul className="space-y-2">
                {filteredLocations.map((location) => (
                  <li
                    key={location.id}
                    className={`mb-2 pb-2 border-b border-gray-200 text-gray-800 cursor-pointer hover:bg-gray-100 p-2 rounded transition-colors duration-150 ${
                      selectedLocation?.id === location.id ? 'bg-blue-100' : ''
                    }`}
                    onClick={() => {
                      handleLocationClick(location);
                      // On desktop, clicking a list item doesn't close the panel
                    }}
                  >
                    <div className="flex flex-wrap items-start gap-2">
                      <div className="flex-1 min-w-0">
                        <span className="font-semibold text-sm md:text-base block truncate">{location.id}. {location.name}</span>
                        <p className="text-xs md:text-sm text-gray-600 mt-1 line-clamp-2">{location.description}</p>
                      </div>
                      <span className="text-xs bg-gray-200 px-2 py-1 rounded-full flex-shrink-0 whitespace-nowrap">
                        {location.category}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { CampusMap };
export default CampusMap;