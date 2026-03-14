import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Twitter, Github } from 'lucide-react';
import { FiMap, FiSearch, FiCalendar, FiFileText, FiAlertCircle, FiHome, FiUsers, FiMessageSquare } from 'react-icons/fi';
import { Footer } from './ui/footer';

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
  return (
    <div className="min-h-screen bg-white font-sans pt-28">

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 py-16 md:py-24 text-center">
        <span className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-lg bg-gray-50 border-2 border-gray-200 text-xs font-semibold text-[#00C6A7] uppercase tracking-widest">
          Your campus, simplified
        </span>
        <h1
          className="text-3xl md:text-5xl font-extrabold text-black mb-4 md:mb-6 leading-tight"
          style={{ letterSpacing: '-0.02em' }}
        >
          Welcome to KampusKart
        </h1>
        <p className="text-base md:text-xl text-gray-500 mb-8 max-w-2xl mx-auto leading-relaxed">
          Your all-in-one campus companion for navigation, events, news, lost &amp; found, complaints, and more.
        </p>
        <Link
          to="/campus-map"
          className="inline-block px-8 py-3 rounded-lg font-bold text-white bg-[#181818] hover:bg-[#00C6A7] transition-colors duration-200 text-sm"
        >
          Explore Campus Map
        </Link>
      </section>

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
