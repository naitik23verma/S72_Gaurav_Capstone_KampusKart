import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Navbar1 } from '../components/ui/shadcnblocks-com-navbar1';

const KampusKartNavbar: React.FC = () => {
  const { user, token, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = token && user ? [
    {
      title: "Home",
      url: "/home",
    },
    {
      title: "Features",
      url: "#",
      items: [
        {
          title: "Lost & Found",
          description: "Report or find lost items on campus",
          url: "/lostfound",
        },
        {
          title: "Complaints",
          description: "Submit and track campus complaints",
          url: "/complaints",
        },
        {
          title: "Events",
          description: "Discover and join campus events",
          url: "/events",
        },
        {
          title: "Clubs Recruitment",
          description: "Join student clubs and organizations",
          url: "/clubs-recruitment",
        },
        {
          title: "News",
          description: "Stay updated with campus news",
          url: "/news",
        },
        {
          title: "Facilities",
          description: "Explore campus facilities",
          url: "/facilities",
        },
      ],
    },
    {
      title: "Campus",
      url: "#",
      items: [
        {
          title: "Campus Map",
          description: "Navigate the campus with interactive map",
          url: "/campus-map",
        },
        {
          title: "Chat",
          description: "Connect with students and staff",
          url: "/chat",
        },
        {
          title: "Profile",
          description: "Manage your account and settings",
          url: "/profile",
        },
      ],
    },
  ] : [
    {
      title: "Home",
      url: "/",
    },
    {
      title: "Features",
      url: "#",
      items: [
        {
          title: "Lost & Found",
          description: "Report or find lost items on campus",
          url: "/lostfound",
        },
        {
          title: "Campus Map",
          description: "Navigate the campus with interactive map",
          url: "/campus-map",
        },
        {
          title: "Events",
          description: "Discover and join campus events",
          url: "/events",
        },
        {
          title: "News",
          description: "Stay updated with campus news",
          url: "/news",
        },
      ],
    },
  ];

  const mobileExtraLinks = token && user ? [
    { name: "Profile", url: "/profile" },
    { name: "Settings", url: "/profile" },
    { name: "Help", url: "/help" },
    { name: "About", url: "/about" },
  ] : [
    { name: "About", url: "/about" },
    { name: "Help", url: "/help" },
    { name: "Contact", url: "/contact" },
    { name: "Terms", url: "/terms" },
  ];

  const authConfig = token && user ? {
    login: { 
      text: user.name || "Profile", 
      url: "/profile" 
    },
    signup: { 
      text: "Logout", 
      url: "#",
      onClick: handleLogout
    },
  } : {
    login: { 
      text: "Log in", 
      url: "/login" 
    },
    signup: { 
      text: "Sign up", 
      url: "/signup" 
    },
  };

  // Logo navigation: Home page if authenticated, Landing page if not
  const logoUrl = token && user ? "/home" : "/";

  return (
    <Navbar1
      logo={{
        url: logoUrl,
        src: "/Logo.png",
        alt: "KampusKart Logo",
        title: "KampusKart",
      }}
      menu={menuItems}
      mobileExtraLinks={mobileExtraLinks}
      auth={authConfig}
    />
  );
};

export default KampusKartNavbar;

