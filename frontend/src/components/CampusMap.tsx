/// <reference types="vite/client" />
import React, { useState, useEffect, useCallback } from 'react';
import { GoogleMap, useLoadScript, InfoWindow, Libraries } from '@react-google-maps/api';
import { MapSkeleton } from './common/SkeletonLoader';
import { FeatureModal } from './common/FeatureModal';
import { useSearchSuggestions } from '../hooks/useSearchSuggestions';
import { FiTarget, FiMaximize2, FiNavigation } from 'react-icons/fi';

// Import from feature directory
import {
  useMap,
  Location,
  MAP_OPTIONS,
  MAP_CONTAINER_STYLE,
  CAMPUS_LOCATIONS,
  UNIVERSITY_CENTER,
  MapSidebar,
  MapInfoWindow
} from '../features/map';

const GOOGLE_MAPS_LIBRARIES: Libraries = ["places", "marker"] as Libraries;
const rawMapId = (import.meta.env.VITE_GOOGLE_MAPS_MAP_ID as string | undefined)?.trim() || '';

const CampusMap: React.FC = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
    libraries: GOOGLE_MAPS_LIBRARIES,
  });

  const {
    mapRef,
    setMapRef,
    selectedLocation,
    setSelectedLocation,
    infoWindowPosition,
    setInfoWindowPosition,
    userLocation,
    animationNotice,
    filters,
    setFilters,
    filteredLocations,
    handleMarkerClick,
    navigateToLocation,
    recenterToUser,
  } = useMap();

  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [pendingDirections, setPendingDirections] = useState<Location | null>(null);

  // Search Suggestions logic
  const buildSuggestions = useCallback((loc: Location, query: string): string[] => {
    const suggestions: string[] = [];
    const normalizedQuery = query.toLowerCase();
    if (loc.name.toLowerCase().includes(normalizedQuery)) suggestions.push(loc.name);
    if (loc.category?.toLowerCase().includes(normalizedQuery)) suggestions.push(loc.category);
    return suggestions;
  }, []);

  const {
    showSuggestions,
    setShowSuggestions,
    filteredSuggestions,
    searchRef,
  } = useSearchSuggestions<Location>({
    searchInput: filters.search,
    items: CAMPUS_LOCATIONS,
    buildSuggestions,
  });

  // Responsive panel
  useEffect(() => {
    const handleResize = () => setIsPanelOpen(window.innerWidth >= 768);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Lock scroll
  useEffect(() => {
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = 'auto';
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleDirections = (loc: Location) => {
    setPendingDirections(loc);
  };

  const confirmDirections = () => {
    if (pendingDirections) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${pendingDirections.lat},${pendingDirections.lng}`;
      window.open(url, '_blank');
      setPendingDirections(null);
    }
  };

  if (loadError) {
    return (
      <div className="h-screen flex flex-col items-center justify-center p-8 text-center bg-white">
        <h3 className="text-2xl font-black text-gray-900 mb-4">Map Loading Failed</h3>
        <p className="text-gray-500 mb-8 max-w-md">We couldn't load the campus map. Please check your connection or API key.</p>
        <button onClick={() => window.location.reload()} className="px-8 py-3 bg-[#181818] text-white rounded-xl font-bold hover:bg-[#00C6A7] transition-all">Retry Loading</button>
      </div>
    );
  }

  if (!isLoaded) return <MapSkeleton />;

  return (
    <div className="h-screen w-full flex flex-col pt-[72px] bg-white overflow-hidden">
      <div className="flex-1 flex flex-col md:flex-row min-h-0 relative">
        
        {/* Map Container */}
        <div className="flex-1 relative h-full">
          {animationNotice && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 px-4 py-2 bg-[#181818] text-white text-xs font-bold rounded-full shadow-2xl animate-pulse">
              {animationNotice}
            </div>
          )}

          <GoogleMap
            mapContainerStyle={MAP_CONTAINER_STYLE}
            center={UNIVERSITY_CENTER}
            zoom={16}
            onLoad={setMapRef}
            options={{
              ...MAP_OPTIONS,
              mapId: rawMapId,
            }}
            onClick={() => {
              setSelectedLocation(null);
              setInfoWindowPosition(null);
            }}
          >
            {/* Markers (Simplified for now, using standard markers via components or directly) */}
            {filteredLocations.map(loc => (
              <React.Fragment key={loc.id}>
                <InfoWindow
                  position={{ lat: loc.lat, lng: loc.lng }}
                  options={{ pixelOffset: new google.maps.Size(0, -40) }}
                >
                  <div 
                    onClick={() => handleMarkerClick(loc)}
                    className="cursor-pointer p-1"
                  >
                    <div className={`w-3 h-3 rounded-full border-2 border-white shadow-md ${
                      selectedLocation?.id === loc.id ? 'bg-[#00C6A7] scale-125' : 'bg-[#181818]'
                    }`} />
                  </div>
                </InfoWindow>
              </React.Fragment>
            ))}

            {selectedLocation && infoWindowPosition && (
              <InfoWindow
                position={infoWindowPosition}
                onCloseClick={() => {
                  setSelectedLocation(null);
                  setInfoWindowPosition(null);
                }}
                options={{ pixelOffset: new google.maps.Size(0, -50) }}
              >
                <MapInfoWindow
                  location={selectedLocation}
                  onClose={() => {
                    setSelectedLocation(null);
                    setInfoWindowPosition(null);
                  }}
                  onGetDirections={handleDirections}
                />
              </InfoWindow>
            )}

            {userLocation && (
              <InfoWindow position={userLocation}>
                <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-xl animate-bounce" />
              </InfoWindow>
            )}
          </GoogleMap>

          {/* Map Controls */}
          <div className="absolute right-4 bottom-24 flex flex-col gap-3">
            <button
              onClick={recenterToUser}
              className="p-4 bg-white text-gray-900 rounded-2xl shadow-2xl border-2 border-gray-100 hover:text-[#00C6A7] transition-all"
              title="Find my location"
            >
              <FiTarget className="w-6 h-6" />
            </button>
            <button
              onClick={() => setIsPanelOpen(!isPanelOpen)}
              className="md:hidden p-4 bg-white text-gray-900 rounded-2xl shadow-2xl border-2 border-gray-100 hover:text-[#00C6A7] transition-all"
            >
              <FiMaximize2 className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Sidebar */}
        {isPanelOpen && (
          <MapSidebar
            locations={filteredLocations}
            onLocationSelect={navigateToLocation}
            selectedLocationId={selectedLocation?.id}
            searchInput={filters.search}
            onSearchChange={(val) => setFilters(f => ({ ...f, search: val }))}
            suggestions={filteredSuggestions}
            showSuggestions={showSuggestions}
            setShowSuggestions={setShowSuggestions}
            searchRef={searchRef as any}
          />
        )}
      </div>

      {/* Directions Modal */}
      <FeatureModal
        isOpen={!!pendingDirections}
        onClose={() => setPendingDirections(null)}
        title="Open in Google Maps?"
      >
        <div className="p-6 text-center">
          <div className="w-20 h-20 bg-teal-50 text-[#00C6A7] rounded-full flex items-center justify-center mx-auto mb-6">
            <FiNavigation className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-black text-gray-900 mb-2">Navigate to Location</h3>
          <p className="text-gray-500 mb-8">This will open Google Maps in a new tab to provide step-by-step directions.</p>
          <div className="flex gap-4">
            <button
              onClick={() => setPendingDirections(null)}
              className="flex-1 px-6 py-4 border-2 border-gray-100 rounded-2xl font-bold text-gray-400 hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={confirmDirections}
              className="flex-1 px-6 py-4 bg-[#181818] text-white rounded-2xl font-bold hover:bg-[#00C6A7] transition-all shadow-xl"
            >
              Open Maps
            </button>
          </div>
        </div>
      </FeatureModal>
    </div>
  );
};

export default CampusMap;
