/// <reference types="vite/client" />
import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { GoogleMap, useLoadScript, InfoWindow, Libraries } from '@react-google-maps/api';
import { MapSkeleton } from './common/SkeletonLoader';
import { FeatureModal } from './common/FeatureModal';
import { useSearchSuggestions } from '../hooks/useSearchSuggestions';

const rawMapId = (import.meta.env.VITE_GOOGLE_MAPS_MAP_ID as string | undefined)?.trim() || '';
const hasValidMapId = rawMapId.length > 0;

// Only request marker library when a mapId is configured for Advanced Markers.
const GOOGLE_MAPS_LIBRARIES: Libraries = (hasValidMapId ? ["places", "marker"] : ["places"]) as Libraries;

// Memoize map options to prevent unnecessary re-renders
const MAP_OPTIONS = {
  disableDefaultUI: false,
  zoomControl: true,
  streetViewControl: true,
  scaleControl: true,
  mapTypeControl: true,
  fullscreenControl: true,
} as const;

// Memoize map container style
const MAP_CONTAINER_STYLE = {
  width: '100%',
  height: '100%',
} as const;


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
  const [isLoading, setIsLoading] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [infoWindowPosition, setInfoWindowPosition] = useState<google.maps.LatLng | null>(null);
  const [hasRequestedLocation, setHasRequestedLocation] = useState(false);
  const animationInProgress = useRef(false);
  const zoomChangeListenerRef = useRef<google.maps.MapsEventListener | null>(null);
  const locationMarkerCleanupRef = useRef<Array<() => void>>([]);
  const userMarkerCleanupRef = useRef<(() => void) | null>(null);
  const [advancedMarkersAvailable, setAdvancedMarkersAvailable] = useState<boolean | null>(null);
  const [animationNotice, setAnimationNotice] = useState<string | null>(null);
  const [pendingDirectionsLocation, setPendingDirectionsLocation] = useState<Location | null>(null);
  const pendingLocationRef = useRef<Location | null>(null);
  const locationItemRefs = useRef<Record<number, HTMLLIElement | null>>({});

  // Use the useLoadScript hook instead of LoadScript component
  const { isLoaded, loadError: scriptLoadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
    libraries: GOOGLE_MAPS_LIBRARIES,
  });

  const [mapsReady, setMapsReady] = useState(false);

  // Update mapsReady when script loads
  useEffect(() => {
    if (isLoaded) {
      console.log('Google Maps script loaded successfully');
      if (!hasValidMapId) {
        console.warn('VITE_GOOGLE_MAPS_MAP_ID is not set. Falling back to classic markers.');
      }
      setMapsReady(true);
    }
  }, [isLoaded]);

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
  const universityLocation = {
    lat: 18.493343843257275,
    lng: 74.02357135415613
  };

  // Add state for map center and zoom
  const [mapCenter, setMapCenter] = useState(universityLocation);
  const [mapZoom, setMapZoom] = useState(16);
  const buildLocationSuggestions = useCallback((location: Location, normalizedQuery: string): string[] => {
    const suggestions: string[] = [];
    if (location?.name?.toLowerCase().includes(normalizedQuery)) {
      suggestions.push(location.name);
    }
    if (location?.category?.toLowerCase().includes(normalizedQuery)) {
      suggestions.push(location.category);
    }
    return suggestions;
  }, []);

  const {
    showSuggestions,
    setShowSuggestions,
    filteredSuggestions,
    searchRef,
    markSuggestionSelection,
  } = useSearchSuggestions<Location>({
    searchInput,
    items: locations,
    buildSuggestions: buildLocationSuggestions,
  });

  // Memoize filtered locations
  const filteredLocations = useMemo(() => {
    if (!Array.isArray(locations)) return [];
    return locations.filter(location =>
      location && (
        location.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        location.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        location.description?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [locations, searchQuery]);

  // Panel is always open on desktop, hidden on mobile — reactive to window resize
  const [isPanelOpen, setIsPanelOpen] = useState(() => typeof window !== 'undefined' && window.innerWidth >= 768);
  useEffect(() => {
    const handleResize = () => setIsPanelOpen(window.innerWidth >= 768);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
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
    if (animationInProgress.current) {
      pendingLocationRef.current = location;
      setAnimationNotice('Finishing current zoom, then moving to your latest selection...');
      return;
    }
    animationInProgress.current = true;
    setAnimationNotice(`Navigating to ${location.name}...`);

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
          setAnimationNotice(null);

          if (pendingLocationRef.current && pendingLocationRef.current.id !== location.id) {
            const queuedLocation = pendingLocationRef.current;
            pendingLocationRef.current = null;
            setTimeout(() => handleLocationClick(queuedLocation), 0);
          } else {
            pendingLocationRef.current = null;
          }
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

  useEffect(() => {
    if (!selectedLocation || !isPanelOpen || window.innerWidth < 768) return;
    const activeItem = locationItemRefs.current[selectedLocation.id];
    if (activeItem) {
      activeItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [selectedLocation, isPanelOpen]);

  // Optimize map click handler
  const handleMapClick = useCallback(() => {
    setInfoWindowPosition(null);
    setSelectedLocation(null);
  }, []);

  const onMapLoad = useCallback((map: google.maps.Map) => {
    setMapRef(map);
    setIsLoading(false);

    if (!hasValidMapId) {
      setAdvancedMarkersAvailable(false);
    } else {
    const capabilities = map.getMapCapabilities?.();
    const supportsAdvancedMarkers =
      !!window.google?.maps?.marker?.AdvancedMarkerElement &&
      capabilities?.isAdvancedMarkersAvailable === true;
    setAdvancedMarkersAvailable(supportsAdvancedMarkers);
    }
    
    // Add zoom change listener to close InfoWindow on zoom
    if (zoomChangeListenerRef.current) {
      google.maps.event.removeListener(zoomChangeListenerRef.current);
    }
    
    zoomChangeListenerRef.current = google.maps.event.addListener(map, 'zoom_changed', () => {
      // Only close InfoWindow on user-initiated zoom, not during programmatic animation
      if (!animationInProgress.current) {
        setInfoWindowPosition(null);
        setSelectedLocation(null);
      }
    });
  }, []);

  const onMapUnmount = useCallback(() => {
    if (zoomChangeListenerRef.current && window.google?.maps?.event) {
      window.google.maps.event.removeListener(zoomChangeListenerRef.current);
      zoomChangeListenerRef.current = null;
    }
    setMapRef(null);
  }, []);

  // Render campus location markers using AdvancedMarkerElement where available.
  useEffect(() => {
    if (!mapsReady || !mapRef || advancedMarkersAvailable !== true) return;

    // Clear previous markers/listeners.
    locationMarkerCleanupRef.current.forEach((cleanup) => cleanup());
    locationMarkerCleanupRef.current = [];

    filteredLocations.forEach((location) => {
      const marker = new window.google.maps.marker.AdvancedMarkerElement({
        map: mapRef,
        position: { lat: location.lat, lng: location.lng },
        title: location.name,
      });

      const clickHandler = () => handleMarkerClick(location);
      marker.addEventListener('gmp-click', clickHandler);
      locationMarkerCleanupRef.current.push(() => {
        marker.removeEventListener('gmp-click', clickHandler);
        marker.map = null;
      });
    });

    return () => {
      locationMarkerCleanupRef.current.forEach((cleanup) => cleanup());
      locationMarkerCleanupRef.current = [];
    };
  }, [mapsReady, mapRef, advancedMarkersAvailable, filteredLocations, handleMarkerClick]);

  // Render user location marker using AdvancedMarkerElement where available.
  useEffect(() => {
    if (!mapsReady || !mapRef || advancedMarkersAvailable !== true) return;

    if (userMarkerCleanupRef.current) {
      userMarkerCleanupRef.current();
      userMarkerCleanupRef.current = null;
    }

    if (!userLocation) return;

    const pin = new window.google.maps.marker.PinElement({
      background: '#2563eb',
      borderColor: '#1d4ed8',
      glyphColor: '#ffffff',
      scale: 1,
    });

    const marker = new window.google.maps.marker.AdvancedMarkerElement({
      map: mapRef,
      position: userLocation,
      title: 'Your Location',
      content: pin.element,
    });

    userMarkerCleanupRef.current = () => {
      marker.map = null;
    };

    return () => {
      if (userMarkerCleanupRef.current) {
        userMarkerCleanupRef.current();
        userMarkerCleanupRef.current = null;
      }
    };
  }, [mapsReady, mapRef, advancedMarkersAvailable, userLocation]);

  // Fallback marker rendering for environments where Advanced Markers are unavailable.
  useEffect(() => {
    if (!mapsReady || !mapRef || advancedMarkersAvailable !== false) return;

    locationMarkerCleanupRef.current.forEach((cleanup) => cleanup());
    locationMarkerCleanupRef.current = [];

    filteredLocations.forEach((location) => {
      const marker = new window.google.maps.Marker({
        map: mapRef,
        position: { lat: location.lat, lng: location.lng },
        title: location.name,
      });

      const clickListener = marker.addListener('click', () => handleMarkerClick(location));
      locationMarkerCleanupRef.current.push(() => {
        clickListener.remove();
        marker.setMap(null);
      });
    });

    if (userMarkerCleanupRef.current) {
      userMarkerCleanupRef.current();
      userMarkerCleanupRef.current = null;
    }

    if (userLocation) {
      const userMarker = new window.google.maps.Marker({
        map: mapRef,
        position: userLocation,
        title: 'Your Location',
        icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
      });

      userMarkerCleanupRef.current = () => {
        userMarker.setMap(null);
      };
    }

    return () => {
      locationMarkerCleanupRef.current.forEach((cleanup) => cleanup());
      locationMarkerCleanupRef.current = [];
      if (userMarkerCleanupRef.current) {
        userMarkerCleanupRef.current();
        userMarkerCleanupRef.current = null;
      }
    };
  }, [mapsReady, mapRef, advancedMarkersAvailable, filteredLocations, handleMarkerClick, userLocation]);

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

  // Cleanup zoom listener on unmount — only safe to call after Maps library is loaded
  useEffect(() => {
    return () => {
      locationMarkerCleanupRef.current.forEach((cleanup) => cleanup());
      locationMarkerCleanupRef.current = [];
      if (userMarkerCleanupRef.current) {
        userMarkerCleanupRef.current();
        userMarkerCleanupRef.current = null;
      }
      if (zoomChangeListenerRef.current && window.google?.maps?.event) {
        window.google.maps.event.removeListener(zoomChangeListenerRef.current);
        zoomChangeListenerRef.current = null;
      }
    };
  }, []);

  if (scriptLoadError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center p-8">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Map Loading Error
          </h3>
          <p className="text-gray-600 mb-4">
            Unable to load the campus map. Please check your internet connection and try again.
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-2 bg-[#00C6A7] text-white rounded-lg font-semibold hover:bg-[#009e87] active:bg-[#00C6A7] transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return <MapSkeleton />;
  }

  return (
    <div className="w-full h-screen flex flex-col bg-gray-100 relative overflow-hidden overscroll-none pt-[72px]" style={{ height: '100dvh' }}>
      {/* Main flex container for map and panel */}
      <div className="flex flex-col md:flex-row flex-1 min-h-0">
        {/* Map Container - Full width on mobile, 2/3 on desktop */}
        <div className="w-full md:w-2/3 h-full relative">
          <div className="bg-white overflow-hidden h-full relative">
            {/* Mobile Search Bar - Visible on mobile only, positioned over map */}
            <div className="md:hidden absolute top-3 left-3 right-3 z-10" ref={searchRef}>
              <form
                className="relative w-full rounded-lg border-2 border-gray-300 bg-white shadow-lg hover:border-[#00C6A7] focus-within:ring-2 focus-within:ring-[#00C6A7] focus-within:border-transparent transition-all duration-200 flex items-center"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSearchQuery(searchInput);
                  setShowSuggestions(false);
                }}
              >
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
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
                  placeholder="Search locations..."
                  enterKeyHint="search"
                  className="flex-1 pl-12 pr-3 py-3 bg-transparent text-gray-900 font-medium outline-none text-base border-none placeholder:text-gray-400 rounded-l-lg"
                />
                <button
                  type="submit"
                  onClick={() => {
                    setSearchQuery(searchInput);
                    setShowSuggestions(false);
                  }}
                  className="px-5 py-3 bg-[#181818] text-white font-bold text-sm hover:bg-[#00C6A7] active:bg-[#181818] flex items-center justify-center gap-2 transition-all duration-200 border-l-2 border-gray-300 rounded-r-lg rounded-l-none"
                  aria-label="Search"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span>Search</span>
                </button>
              </form>
              
              {/* Autocomplete Dropdown */}
              {showSuggestions && filteredSuggestions.length > 0 && (
                <div className="absolute z-50 w-full mt-2 bg-white border-2 border-gray-300 rounded-lg shadow-xl max-h-60 overflow-auto">
                  {filteredSuggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        markSuggestionSelection();
                        // Find and navigate to matching location if found
                        const matchingLocation = locations.find(loc =>
                          loc.name.toLowerCase().includes(suggestion.toLowerCase()) ||
                          loc.description?.toLowerCase().includes(suggestion.toLowerCase()) ||
                          loc.category?.toLowerCase().includes(suggestion.toLowerCase())
                        );
                        setSearchInput(suggestion);
                        setSearchQuery(suggestion);
                        setShowSuggestions(false);
                        // Pan to location without opening info window
                        if (matchingLocation && mapRef) {
                          mapRef.panTo({ lat: matchingLocation.lat, lng: matchingLocation.lng });
                          mapRef.setZoom(18);
                        }
                      }}
                      className="flex items-center px-4 py-3 cursor-pointer hover:bg-gray-50 active:bg-gray-100 transition-colors border-b-2 border-gray-200 last:border-b-0"
                    >
                      <svg className="w-4 h-4 text-gray-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <span className="text-sm font-medium text-gray-900">{suggestion}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {animationNotice && (
              <div className="absolute top-20 left-3 right-3 z-10 md:left-auto md:right-4 md:top-4 md:max-w-sm rounded-lg border-2 border-gray-300 bg-white/95 px-3 py-2 shadow-lg">
                <p className="text-xs font-semibold text-gray-700">{animationNotice}</p>
              </div>
            )}

            <GoogleMap
              mapContainerStyle={MAP_CONTAINER_STYLE}
              center={animationInProgress.current ? undefined : mapCenter}
              zoom={animationInProgress.current ? undefined : mapZoom}
              options={{
                ...MAP_OPTIONS,
                ...(hasValidMapId ? { mapId: rawMapId } : {}),
                // Adjust controls for mobile and desktop
                zoomControl: true,
                mapTypeControl: isPanelOpen,
                streetViewControl: isPanelOpen,
                fullscreenControl: isPanelOpen,
              }}
              onClick={handleMapClick}
              onLoad={onMapLoad}
              onUnmount={onMapUnmount}
            >
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
                    maxWidth: window.innerWidth < 640 ? 260 : isPanelOpen ? 400 : 300,
                    disableAutoPan: false
                  }}
                >
                  <div 
                    className="p-0 w-[min(92vw,360px)] max-w-sm bg-white rounded-lg overflow-hidden border-2 border-gray-200" 
                    style={{ 
                      margin: 0, 
                      padding: 0,
                      overflow: 'hidden'
                    }}
                  >
                    {/* Header Section */}
                    <div className="bg-white p-4 relative border-b-2 border-gray-200">
                      {/* Close Button */}
                      <button
                        onClick={() => {
                          setInfoWindowPosition(null);
                          setSelectedLocation(null);
                        }}
                        className="absolute top-2 right-2 z-10 bg-[#181818] hover:bg-[#00C6A7] active:bg-[#181818] text-white rounded-lg p-2 transition-all duration-200 flex items-center justify-center"
                        aria-label="Close"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                      
                      <div className="pr-14">
                        <h3
                          className="font-black text-lg text-gray-900 mb-2 leading-tight break-words line-clamp-2"
                          title={selectedLocation.name}
                        >
                          {selectedLocation.name}
                        </h3>
                        <span className="inline-flex items-center px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-semibold rounded-lg border-2 border-gray-200">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                          </svg>
                          {selectedLocation.category}
                        </span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-4 space-y-4 max-h-[48vh] overflow-y-auto">
                      {/* Description Section */}
                      <div className="bg-gray-50 p-3 rounded-lg border-2 border-gray-200">
                        <div className="flex items-start gap-2 mb-2">
                          <div className="flex items-center justify-center w-6 h-6 bg-gray-700 rounded-lg flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <h4 className="text-sm font-bold text-gray-900">About</h4>
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed break-words line-clamp-5" title={selectedLocation.description || ''}>
                          {selectedLocation.description || ''}
                        </p>
                      </div>

                      {/* Location ID Badge */}
                      <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg border-2 border-gray-200">
                        <div className="flex items-center justify-center w-8 h-8 bg-gray-700 rounded-lg">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <span className="text-sm font-semibold text-gray-700">Location ID: <span className="text-gray-900 font-bold">#{selectedLocation.id}</span></span>
                      </div>

                      {/* Action Button */}
                      <button
                        className="w-full px-4 py-3 bg-[#181818] text-white rounded-lg hover:bg-[#00C6A7] active:bg-[#181818] transition-colors duration-200 flex items-center justify-center gap-2 font-bold text-sm"
                        onClick={() => {
                          setPendingDirectionsLocation(selectedLocation);
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
              className="absolute bottom-4 left-4 z-10 bg-white border-2 border-gray-300 shadow-lg rounded-lg p-3 flex items-center justify-center hover:bg-gray-50 active:bg-gray-100 hover:border-[#00C6A7] transition-colors duration-200"
              title="Re-center map on your location"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#00C6A7]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={2} fill="none" />
                <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth={2} fill="none" />
                <line x1="12" y1="2" x2="12" y2="6" stroke="currentColor" strokeWidth={2} />
                <line x1="12" y1="18" x2="12" y2="22" stroke="currentColor" strokeWidth={2} />
                <line x1="2" y1="12" x2="6" y2="12" stroke="currentColor" strokeWidth={2} />
                <line x1="18" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth={2} />
              </svg>
            </button>
            {/* Locations List Toggle - Mobile Only */}
            {!isPanelOpen && (
              <button
                onClick={() => setIsPanelOpen(true)}
                className="md:hidden absolute bottom-4 right-4 z-10 bg-[#181818] hover:bg-[#00C6A7] active:bg-[#181818] text-white border-2 border-gray-300 shadow-lg rounded-lg px-4 py-3 flex items-center gap-2.5 text-base font-bold transition-colors duration-200"
                aria-label="Show locations list"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                Locations
              </button>
            )}
          </div>
        </div>

        {/* Locations List Panel Container - Full width on mobile (overlay), 1/3 on desktop (side) */}
        {/* On mobile: fixed overlay that sits below the navbar (top-[72px]), above everything else (z-40) */}
        {isPanelOpen && window.innerWidth < 768 && (
          <div
            className="fixed inset-0 top-[72px] bg-black/40 z-30 md:hidden"
            onClick={() => setIsPanelOpen(false)}
            aria-hidden="true"
          />
        )}
        <div className={`${isPanelOpen ? 'flex' : 'hidden'} md:flex fixed md:relative top-[72px] md:top-auto left-0 md:left-auto right-0 md:right-auto bottom-0 md:bottom-auto w-full md:w-1/3 flex-col md:h-full z-40 md:z-auto transition-all duration-300 ease-in-out`}>
          {/* Inner container with padding, shadow, and overflow for list */}
          <div className="bg-white p-3 md:p-4 flex-grow transition-all duration-300 ease-in-out opacity-100 h-full overflow-y-auto relative">
            {/* Mobile close button — inside the scrollable container, top-right corner */}
            <button
              className="md:hidden absolute top-4 right-4 z-10 bg-white border-2 border-gray-300 shadow-md rounded-lg p-2 text-gray-700 hover:bg-gray-50 active:bg-gray-100 hover:border-[#00C6A7] flex items-center justify-center transition-colors duration-200"
              onClick={() => setIsPanelOpen(false)}
              aria-label="Close locations panel"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 mb-4 md:mb-5 pr-12 md:pr-0">Campus Locations</h2>
            {/* Desktop Search Bar - Visible on desktop only */}
            <div className="hidden md:block mb-6 w-full relative">
              <form
                className="relative w-full rounded-lg border-2 border-gray-300 bg-white shadow-sm hover:border-[#00C6A7] focus-within:ring-2 focus-within:ring-[#00C6A7] focus-within:border-transparent transition-all duration-200 flex items-center"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSearchQuery(searchInput);
                  setShowSuggestions(false);
                }}
              >
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
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
                  placeholder="Search locations..."
                  className="flex-1 pl-12 pr-3 py-3.5 bg-transparent text-gray-900 font-medium outline-none text-base border-none placeholder:text-gray-400 rounded-l-lg"
                />
                <button
                  type="submit"
                  onClick={() => {
                    setSearchQuery(searchInput);
                    setShowSuggestions(false);
                  }}
                  className="px-6 py-3.5 bg-[#181818] text-white font-bold text-base hover:bg-[#00C6A7] active:bg-[#181818] flex items-center justify-center gap-2 transition-all duration-200 border-l-2 border-gray-300 rounded-r-lg rounded-l-none"
                  aria-label="Search"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span>Search</span>
                </button>
              </form>
              
              {/* Autocomplete Dropdown */}
              {showSuggestions && filteredSuggestions.length > 0 && (
                <div className="absolute z-50 w-full mt-2 bg-white border-2 border-gray-300 rounded-lg shadow-xl max-h-60 overflow-auto">
                  {filteredSuggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        markSuggestionSelection();
                        // Find and navigate to matching location if found
                        const matchingLocation = locations.find(loc =>
                          loc.name.toLowerCase().includes(suggestion.toLowerCase()) ||
                          loc.description?.toLowerCase().includes(suggestion.toLowerCase()) ||
                          loc.category?.toLowerCase().includes(suggestion.toLowerCase())
                        );
                        setSearchInput(suggestion);
                        setSearchQuery(suggestion);
                        setShowSuggestions(false);
                        // Pan to location without opening info window
                        if (matchingLocation && mapRef) {
                          mapRef.panTo({ lat: matchingLocation.lat, lng: matchingLocation.lng });
                          mapRef.setZoom(18);
                        }
                      }}
                      className="flex items-center px-4 py-3 cursor-pointer hover:bg-gray-50 active:bg-gray-100 transition-colors border-b-2 border-gray-200 last:border-b-0"
                    >
                      <svg className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <span className="text-base font-medium text-gray-900">{suggestion}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* Locations List - Always in panel on desktop, hidden on mobile */}
            <div className="block transition-all duration-300 ease-in-out opacity-100">
              <ul className="space-y-3">
                {filteredLocations.map((location) => (
                  <li
                    key={location.id}
                    ref={(element) => {
                      locationItemRefs.current[location.id] = element;
                    }}
                    role="button"
                    tabIndex={0}
                    className={`pb-3 border-b-2 border-gray-200 last:border-b-0 text-gray-800 cursor-pointer hover:bg-gray-50 active:bg-gray-100 p-3 rounded-lg transition-colors duration-150 ${
                      selectedLocation?.id === location.id ? 'bg-[#00C6A7]/10 border-[#00C6A7]' : ''
                    }`}
                    onClick={() => {
                      handleLocationClick(location);
                      // On mobile, close the panel so the map is visible
                      if (window.innerWidth < 768) {
                        setIsPanelOpen(false);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleLocationClick(location);
                        if (window.innerWidth < 768) {
                          setIsPanelOpen(false);
                        }
                      }
                    }}
                  >
                    <div className="flex flex-wrap items-start gap-2">
                      <div className="flex-1 min-w-0">
                        <span
                          className="font-bold text-base md:text-lg text-gray-900 block mb-1 line-clamp-2 break-words"
                          title={`${location.id}. ${location.name}`}
                        >
                          {location.id}. {location.name}
                        </span>
                        <p className="text-sm md:text-base text-gray-600 mt-1.5 line-clamp-2 leading-relaxed">{location.description}</p>
                      </div>
                      <span className="text-xs font-semibold bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full flex-shrink-0 whitespace-nowrap border-2 border-gray-300">
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

      <FeatureModal
        isOpen={!!pendingDirectionsLocation}
        onClose={() => setPendingDirectionsLocation(null)}
        title="Open External Maps"
        error={null}
        size="sm"
      >
        <p className="text-sm text-gray-700 mb-6">
          You are about to leave KampusKart and open Google Maps for directions to this location.
        </p>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => setPendingDirectionsLocation(null)}
            className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-700 bg-white border-2 border-gray-200 hover:bg-gray-50"
          >
            Stay Here
          </button>
          <button
            type="button"
            onClick={() => {
              if (!pendingDirectionsLocation) return;
              const url = `https://www.google.com/maps/dir/?api=1&destination=${pendingDirectionsLocation.lat},${pendingDirectionsLocation.lng}`;
              window.open(url, '_blank', 'noopener,noreferrer');
              setPendingDirectionsLocation(null);
            }}
            className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-[#181818] hover:bg-[#00C6A7]"
          >
            Open Google Maps
          </button>
        </div>
      </FeatureModal>
    </div>
  );
};

export { CampusMap };
export default CampusMap;
