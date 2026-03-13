import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { SimpleHeader } from '../components/ui/simple-header';

const KampusKartNavbar: React.FC = () => {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Menu structure - same for both authenticated and unauthenticated
  const menuItems = [
    {
      label: "Home",
      href: token && user ? "/home" : "/",
    },
    {
      label: "Features",
      href: "#",
      items: [
        {
          label: "Lost & Found",
          href: token && user ? "/lostfound" : "/login",
        },
        {
          label: "Complaints",
          href: token && user ? "/complaints" : "/login",
        },
        {
          label: "Events",
          href: token && user ? "/events" : "/login",
        },
        {
          label: "Clubs",
          href: token && user ? "/clubs-recruitment" : "/login",
        },
        {
          label: "News",
          href: token && user ? "/news" : "/login",
        },
        {
          label: "Facilities",
          href: token && user ? "/facilities" : "/login",
        },
      ],
    },
    {
      label: "Campus",
      href: "#",
      items: [
        {
          label: "Campus Map",
          href: token && user ? "/campus-map" : "/login",
        },
        {
          label: "Chat",
          href: token && user ? "/chat" : "/login",
        },
        {
          label: "Profile",
          href: token && user ? "/profile" : "/login",
        },
      ],
    },
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
    <SimpleHeader
      logo={{
        url: logoUrl,
        src: "/Logo.png",
        alt: "KampusKart Logo",
        title: "KampusKart",
      }}
      menu={menuItems}
      auth={authConfig}
    />
  );
};

export default KampusKartNavbar;

