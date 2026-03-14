import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Globe, Github } from 'lucide-react';
import { FiMap, FiSearch, FiCalendar, FiFileText, FiAlertCircle, FiHome, FiUsers, FiMessageSquare } from 'react-icons/fi';
import { Footer } from './ui/footer';
import { ShuffleGrid } from './ui/shuffle-grid';

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
  { href: 'https://gaurav-khandelwal.vercel.app/', label: 'Portfolio', icon: <Globe className="h-4 w-4" /> },
  { href: 'https://github.com/Gaurav-205', label: 'GitHub', icon: <Github className="h-4 w-4" /> },
];

const Home = () => {
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features-section');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-white font-sans pt-[72px]">

      {/* Hero with Map */}
      <div className="min-h-[calc(100vh-72px)] w-full flex items-center overflow-hidden py-8 md:py-0">
        <section className="w-full h-full px-4 sm:px-6 md:px-8 grid grid-cols-1 md:grid-cols-2 items-center gap-6 md:gap-10 max-w-6xl mx-auto">
          {/* Left: text */}
          <div className="text-center md:text-left">
            <span className="inline-flex items-center gap-2 mb-4 md:mb-5 px-3 py-1.5 rounded-lg bg-gray-50 border-2 border-gray-200 text-xs font-semibold text-[#00C6A7] uppercase tracking-widest">
              Your campus, simplified
            </span>
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-black leading-tight mb-4 md:mb-5"
              style={{ letterSpacing: "-0.02em" }}
            >
              Welcome to KampusKart
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-500 mb-6 md:mb-8 max-w-md mx-auto md:mx-0 leading-relaxed">
              Your all-in-one campus companion for navigation, events, news, lost &amp; found, complaints, and more.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center md:justify-start">
              <Link
                to="/campus-map"
                className="min-h-touch px-6 sm:px-8 py-3 rounded-lg font-bold text-white bg-[#181818] hover:bg-[#00C6A7] transition-colors duration-200 text-sm sm:text-base text-center"
              >
                Explore Full Map
              </Link>
              <button
                onClick={scrollToFeatures}
                className="min-h-touch px-6 sm:px-8 py-3 rounded-lg font-bold text-gray-700 bg-white border-2 border-gray-200 hover:bg-gray-50 transition-colors duration-200 text-sm sm:text-base"
              >
                View Features
              </button>
            </div>
          </div>

          {/* Right: shuffle grid — hidden on mobile */}
          <div className="hidden md:flex items-center justify-center h-full py-8">
            <div className="w-full h-full max-h-[520px]">
              <ShuffleGrid />
            </div>
          </div>
        </section>
      </div>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="border-t-2 border-gray-200" />
      </div>

      {/* Features */}
      <section id="features-section" className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-12 md:py-16">
        <div className="mb-8 md:mb-10 text-center md:text-left">
          <span className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-lg bg-gray-50 border-2 border-gray-200 text-xs font-semibold text-[#00C6A7] uppercase tracking-widest">
            Everything you need
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-black mb-3" style={{ letterSpacing: '-0.01em' }}>
            Features
          </h2>
          <p className="text-sm sm:text-base text-gray-500">All your campus tools in one place.</p>
        </div>

        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {features.map((feature) => (
            <Link
              to={feature.link}
              key={feature.name}
              className="bg-white rounded-lg border-2 border-gray-200 p-4 sm:p-5 md:p-6 flex flex-col items-start transition-all duration-200 hover:border-gray-300 hover:shadow-md group min-h-touch"
            >
              <div className={`mb-3 md:mb-4 w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-lg text-white ${feature.iconBg}`}>
                {feature.icon}
              </div>
              <h3 className="text-sm sm:text-base font-extrabold text-black mb-1 group-hover:text-[#00C6A7] transition-colors duration-200">
                {feature.name}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">{feature.description}</p>
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
