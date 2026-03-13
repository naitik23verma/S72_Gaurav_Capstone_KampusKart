import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { SimpleHeader } from './ui/simple-header';

const KampusKartNavbar: React.FC = () => {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Menu links - same for both authenticated and unauthenticated
  const links = [
    {
      label: "Home",
      href: token && user ? "/home" : "/",
    },
    {
      label: "Features",
      href: token && user ? "/home#features" : "/#features",
    },
    {
      label: "Campus Map",
      href: token && user ? "/campus-map" : "/login",
    },
    {
      label: "Lost & Found",
      href: token && user ? "/lostfound" : "/login",
    },
    {
      label: "Events",
      href: token && user ? "/events" : "/login",
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
      links={links}
      auth={authConfig}
    />
  );
};

export default KampusKartNavbar;

