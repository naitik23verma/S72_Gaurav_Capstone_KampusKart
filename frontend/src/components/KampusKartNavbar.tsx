import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Navbar1 } from '../components/ui/shadcnblocks-com-navbar1';
import { 
  Home, 
  Map, 
  MessageSquare, 
  Star, 
  Search, 
  FileText, 
  Calendar, 
  Users, 
  Building2, 
  HelpCircle,
  User,
  LogOut,
  Bell
} from 'lucide-react';

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
          icon: <Search className="size-5 shrink-0" />,
          url: "/lostfound",
        },
        {
          title: "Complaints",
          description: "Submit and track campus complaints",
          icon: <FileText className="size-5 shrink-0" />,
          url: "/complaints",
        },
        {
          title: "Events",
          description: "Discover and join campus events",
          icon: <Calendar className="size-5 shrink-0" />,
          url: "/events",
        },
        {
          title: "Clubs Recruitment",
          description: "Join student clubs and organizations",
          icon: <Users className="size-5 shrink-0" />,
          url: "/clubs-recruitment",
        },
        {
          title: "News",
          description: "Stay updated with campus news",
          icon: <FileText className="size-5 shrink-0" />,
          url: "/news",
        },
        {
          title: "Facilities",
          description: "Explore campus facilities",
          icon: <Building2 className="size-5 shrink-0" />,
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
          icon: <Map className="size-5 shrink-0" />,
          url: "/campus-map",
        },
        {
          title: "Chat",
          description: "Connect with students and staff",
          icon: <MessageSquare className="size-5 shrink-0" />,
          url: "/chat",
        },
        {
          title: "Profile",
          description: "Manage your account and settings",
          icon: <User className="size-5 shrink-0" />,
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
          icon: <Search className="size-5 shrink-0" />,
          url: "/lostfound",
        },
        {
          title: "Campus Map",
          description: "Navigate the campus with interactive map",
          icon: <Map className="size-5 shrink-0" />,
          url: "/campus-map",
        },
        {
          title: "Events",
          description: "Discover and join campus events",
          icon: <Calendar className="size-5 shrink-0" />,
          url: "/events",
        },
        {
          title: "News",
          description: "Stay updated with campus news",
          icon: <FileText className="size-5 shrink-0" />,
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

  return (
    <Navbar1
      logo={{
        url: token && user ? "/home" : "/",
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

