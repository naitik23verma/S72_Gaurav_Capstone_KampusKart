import React, { useEffect, useRef, useState } from 'react';

const CampusMapSimple: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initMap = () => {
      if (mapRef.current && window.google) {
        const map = new window.google.maps.Map(mapRef.current, {
          center: { lat: 18.493343843257275, lng: 74.02357135415613 },
          zoom: 16,
        });
        
        // Add a marker
        new window.google.maps.Marker({
          position: { lat: 18.493343843257275, lng: 74.02357135415613 },
          map: map,
          title: 'Raj Bungalow',
        });
      }
    };

    // Check if Google Maps is already loaded
    if (window.google && window.google.maps) {
      console.log('Google Maps already loaded!');
      setLoading(false);
      initMap();
      return;
    }

    // Check if script is already being loaded
    const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
    if (existingScript) {
      console.log('Google Maps script already exists, waiting for load...');
      const checkGoogleMaps = setInterval(() => {
        if (window.google && window.google.maps) {
          clearInterval(checkGoogleMaps);
          setLoading(false);
          initMap();
        }
      }, 100);
      return () => clearInterval(checkGoogleMaps);
    }

    // Load Google Maps script
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places,marker`;
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      console.log('Google Maps loaded!');
      setLoading(false);
      initMap();
    };
    
    script.onerror = () => {
      console.error('Failed to load Google Maps');
      setError('Failed to load Google Maps');
      setLoading(false);
    };
    
    document.head.appendChild(script);
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center p-8">
          <h3 className="text-xl font-bold text-red-600 mb-2">Error Loading Map</h3>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-white pt-[72px]">
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
};

export default CampusMapSimple;
