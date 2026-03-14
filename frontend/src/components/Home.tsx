import React, { useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Twitter, Github } from 'lucide-react';
import { FiMap, FiSearch, FiCalendar, FiFileText, FiAlertCircle, FiHome, FiUsers, FiMessageSquare } from 'react-icons/fi';
import { GoogleMap, useLoadScript, Marker, InfoWindow, Libraries } from '@react-google-maps/api';
import { Footer } from './ui/footer';
import { MapSkeleton } from './common/SkeletonLoader';

const GOOGLE_MAPS_LIBRARIES: Libraries = ["places"];

const MAP_OPTIONS = {
  disableDefaultUI: false,
  zoomControl: true,
  streetViewControl: false,
  scaleControl: false,
  mapTypeControl: false,
  fullscreenControl: true,
  mapId: '7b1615000ef5c43e3005d9c9'
} as const;

const MAP_CONTAINER_STYLE = {
  width: '100%',
  height: '100%',
} as const;

const useGoogleMaps = () => {
  return useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: GOOGLE_MAPS_LIBRARIES
  });
};

interface Location {
  id: number;
  name: string;
  lat: number;
  lng: number;
  description?: string;
  category?: string;
}

const features = [
  { name: 'Campus Map',        description: 'Explore the campus and find locations easily.',          icon: <FiMap className="w-7 h-7" />,           link: '/campus-map',        iconBg: 'bg-[#181818]' },
  { name: 'Lost & Found',      description: 'Report or find lost items on campus.',                   icon: <FiSearch className="w-7 h-7" />,        link: '/lostfound',         iconBg: 'bg-[#F05A25]' },
  { name: 'Events',            description: 'Stay updated with campus events.',                       icon: <FiCalendar className="w-7 h-7" />,      link: '/events',            iconBg: 'bg-[#00C6A7]' },
  { name: 'News',              description: 'Read the latest campus news.',                           icon: <FiFileText className="w-7 h-7" />,      link: '/news',              iconBg: 'bg-[#181818]' },
  { name: 'Complaints',        description: 'Raise and track campus complaints.',                     icon: <FiAlertCircle className="w-7 h-7" />,   link: '/complaints',        iconBg: 'bg-[#F05A25]' },
  { name: 'Facilities',        description: 'Discover campus facilities and services.',               icon: <FiHome className="w-7 h-7" />,          link: '/facilities',        iconBg: 'bg-[#00C6A7]' },
  { name: 'Global Chat',       description: 'Chat with other campus members in real-time.',           icon: <FiMessageSquare className="w-7 h-7" />, link: '/chat',              iconBg: 'bg-[#181818]' },
  { name: 'Clubs Recruitment', description: 'Apply to join campus clubs and societies.',              icon: <FiUsers className="w-7 h-7" />,         link: '/clubs-recruitment', iconBg: 'bg-[#F05A25]' },
];

const socialLinks = [
  { href: 'https://www.instagram.com/gaurav_khandelwal_/', label: 'Instagram', icon: <Instagram className="h-4 w-4" /> },
  { href: 'https://www.linkedin.com/in/gaurav-khandelwal-17a127358/', label: 'LinkedIn', icon: <Linkedin className="h-4 w-4" /> },
  { href: 'https://x.com/xXxGauravxXx', label: 'Twitter', icon: <Twitter className="h-4 w-4" /> },
  { href: 'https://github.com/Gaurav-205', label: 'GitHub', icon: <Github className="h-4 w-4" /> },
];

const Home = () => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const { isLoaded, loadError } = useGoogleMaps();

  const locations = useMemo(() => [
    { id: 1, name: "MIT-ADT Entrance", lat: 18.490173753843422, lng: 74.0254303116109, description: "Main entrance of MIT-ADT University", category: "Entrance" },
    { id: 2, name: "Admin Block", lat: 18.490946453598095, lng: 74.02419055616282, description: "Administrative offices", category: "Administration" },
    { id: 3, name: "Cricket Ground", lat: 18.490748499095503, lng: 74.02836838570158, description: "Main cricket ground", category: "Sports" },
    { id: 4, name: "Library", lat: 18.491234, lng: 74.024567, description: "Central library", category: "Academic" },
  ], []);

  const center = useMemo(() => ({ lat: 18.490173753843422, lng: 74.0254303116109 }), []);

  const onMapLoad = useCallback((map: google.maps.Map) => {
    const bounds = new google.maps.LatLngBounds();
    locations.forEach(loc => bounds.extend({ lat: loc.lat, lng: loc.lng }));
    map.fitBounds(bounds);
  }, [locations]);

  return (
    <div className="bg-white font-sans pt-[72px]">

      {/* Hero with Map */}
      <div className="h-[calc(100vh-72px)] w-full flex items-center overflow-hidden">
        <section className="w-full h-full px-4 sm:px-8 grid grid-cols-1 md:grid-cols-2 items-center gap-10 max-w-6xl mx-auto">
          {/* Left: text */}
          <div>
            <span className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-lg bg-gray-50 border-2 border-gray-200 text-xs font-semibold text-[#00C6A7] uppercase tracking-widest">
              Your campus, simplified
            </span>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-black leading-tight mb-5"
              style={{ letterSpacing: "-0.02em" }}
            >
              Welcome to KampusKart
            </h1>
            <p className="text-base md:text-lg text-gray-500 mb-8 max-w-md leading-relaxed">
              Your all-in-one campus companion for navigation, events, news, lost &amp; found, complaints, and more.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/campus-map"
                className="px-8 py-3 rounded-lg font-bold text-white bg-[#181818] hover:bg-[#00C6A7] transition-colors duration-200 text-sm"
              >
                Explore Full Map
              </Link>
              <Link
                to="/features"
                className="px-8 py-3 rounded-lg font-bold text-gray-700 bg-white border-2 border-gray-200 hover:bg-gray-50 transition-colors duration-200 text-sm"
              >
                View Features
              </Link>
            </div>
          </div>

          {/* Right: map — hidden on mobile */}
          <div className="hidden md:block h-full py-8">
            <div className="w-full h-full max-h-[520px] rounded-lg border-2 border-gray-200 overflow-hidden">
              {loadError && (
                <div className="w-full h-full flex items-center justify-center bg-gray-50">
                  <p className="text-sm text-red-500">Error loading map</p>
                </div>
              )}
              {!isLoaded && !loadError && <MapSkeleton />}
              {isLoaded && !loadError && (
                <GoogleMap
                  mapContainerStyle={MAP_CONTAINER_STYLE}
                  center={center}
                  zoom={16}
                  options={MAP_OPTIONS}
                  onLoad={onMapLoad}
                >
                  {locations.map((location) => (
                    <Marker
                      key={location.id}
                      position={{ lat: location.lat, lng: location.lng }}
                      onClick={() => setSelectedLocation(location)}
                      title={location.name}
                    />
                  ))}
                  {selectedLocation && (
                    <InfoWindow
                      position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
                      onCloseClick={() => setSelectedLocation(null)}
                    >
                      <div className="p-2 max-w-xs">
                        <h3 className="font-bold text-sm text-black mb-1">{selectedLocation.name}</h3>
                        {selectedLocation.description && (
                          <p className="text-xs text-gray-600 mb-2">{selectedLocation.description}</p>
                        )}
                        {selectedLocation.category && (
                          <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded">
                            {selectedLocation.category}
                          </span>
                        )}
                      </div>
                    </InfoWindow>
                  )}
                </GoogleMap>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="border-t-2 border-gray-200" />
      </div>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 py-16">
        <div className="mb-10">
          <span className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-lg bg-gray-50 border-2 border-gray-200 text-xs font-semibold text-[#00C6A7] uppercase tracking-widest">
            Everything you need
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-black mb-3" style={{ letterSpacing: '-0.01em' }}>
            Features
          </h2>
          <p className="text-base text-gray-500">All your campus tools in one place.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {features.map((feature) => (
            <Link
              to={feature.link}
              key={feature.name}
              className="bg-white rounded-lg border-2 border-gray-200 p-6 flex flex-col items-start transition-colors duration-200 hover:border-gray-300 group"
            >
              <div className={`mb-4 w-11 h-11 flex items-center justify-center rounded-lg text-white ${feature.iconBg}`}>
                {feature.icon}
              </div>
              <h3 className="text-base font-extrabold text-black mb-1 group-hover:text-[#00C6A7] transition-colors duration-200">
                {feature.name}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
            </Link>
          ))}
        </div>
      </section>

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

export default Home;
