import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Navbar1 } from '../components/ui/shadcnblocks-com-navbar1';

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
      title: "Home",
      url: token && user ? "/home" : "/",
    },
    {
      title: "Features",
      url: "#",
      items: [
        {
          title: "Lost & Found",
          description: "Report or find lost items on campus",
          url: token && user ? "/lostfound" : "/login",
        },
        {
          title: "Complaints",
          description: "Submit and track campus complaints",
          url: token && user ? "/complaints" : "/login",
        },
        {
          title: "Events",
          description: "Discover and join campus events",
          url: token && user ? "/events" : "/login",
        },
        {
          title: "Clubs Recruitment",
          description: "Join student clubs and organizations",
          url: token && user ? "/clubs-recruitment" : "/login",
        },
        {
          title: "News",
          description: "Stay updated with campus news",
          url: token && user ? "/news" : "/login",
        },
        {
          title: "Facilities",
          description: "Explore campus facilities",
          url: token && user ? "/facilities" : "/login",
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
          url: token && user ? "/campus-map" : "/login",
        },
        {
          title: "Chat",
          description: "Connect with students and staff",
          url: token && user ? "/chat" : "/login",
        },
      ],
    },
  ];

  const mobileExtraLinks = token && user ? [
    { name: "Chat", url: "/chat" },
  ] : [];

  const authConfig = token && user ? {
    login: { 
      text: "Profile", 
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

