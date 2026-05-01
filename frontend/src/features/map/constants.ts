import { Location } from './types';

export const CAMPUS_LOCATIONS: Location[] = [
  {
    id: 1,
    name: "MIT-ADT Entrance",
    lat: 18.490173753843422,
    lng: 74.0254303116109,
    description: "Main entrance of MIT-ADT University",
    category: "Entrance",
  },
  {
    id: 2,
    name: "MANET ADMIN, Vice President Office, Vice Chancellor Office, Registrar Office, School of Law",
    lat: 18.490946453598095,
    lng: 74.02419055616282,
    description: "Administrative block housing key offices and School of Law",
    category: "Administration",
  },
  {
    id: 3,
    name: "Cricket Ground",
    lat: 18.490748499095503,
    lng: 74.02836838570158,
    description: "Main cricket ground for sports activities",
    category: "Sports",
  },
  {
    id: 4,
    name: "Sports Complex",
    lat: 18.491807509791,
    lng: 74.0284366873852,
    description: "Multi-sport facility with indoor and outdoor sports",
    category: "Sports",
  },
  {
    id: 5,
    name: "World Peace Dome",
    lat: 18.49262365645109,
    lng: 74.02565779888813,
    description: "Iconic dome structure for major events and ceremonies",
    category: "Landmark",
  },
  {
    id: 6,
    name: "School of Education & Research",
    lat: 18.493802098401595,
    lng: 74.02568599386356,
    description: "Dedicated to education and research programs",
    category: "Academic",
  },
  {
    id: 7,
    name: "School of Humanities, School of Vedic Sciences",
    lat: 18.493614169153485,
    lng: 74.02490749767114,
    description: "Houses humanities and Vedic studies departments",
    category: "Academic",
  },
  {
    id: 8,
    name: "School of Vishwashanti Sangeetkala Academy",
    lat: 18.494201447370067,
    lng: 74.02342835489087,
    description: "Center for performing arts and music education",
    category: "Arts",
  },
  {
    id: 9,
    name: "Account Department, Guest House",
    lat: 18.493397060315154,
    lng: 74.02325704813967,
    description: "Financial services and guest accommodation",
    category: "Administration",
  },
  {
    id: 10,
    name: "Raj Bungalow",
    lat: 18.493343843257275,
    lng: 74.02357135415613,
    description: "Heritage building and official residence",
    category: "Landmark",
  },
  {
    id: 11,
    name: "School of Food Technology, MANET Hostel",
    lat: 18.491843937146296,
    lng: 74.02292535777815,
    description: "Food technology studies and student accommodation",
    category: "Academic",
  },
  {
    id: 12,
    name: "School of Architecture",
    lat: 18.494528998144798,
    lng: 74.02184922136568,
    description: "Architecture and design education center",
    category: "Academic",
  },
  {
    id: 13,
    name: "School of Film & Theatre, School of Bioengineering Sciences & Research, School of Corporate Innovation & Leadership, Atal Incubation Center (AIC), School of Indian Civil Services",
    lat: 18.495302450375288,
    lng: 74.02196302037389,
    description: "Multi-disciplinary complex for various schools and research centers",
    category: "Academic",
  },
  {
    id: 14,
    name: "Institute of Design",
    lat: 18.49468368348241,
    lng: 74.021723522408,
    description: "Design education and research institute",
    category: "Academic",
  },
  {
    id: 15,
    name: "School of Fine Arts & Applied Arts, Urmilatai Karad Auditorium",
    lat: 18.495094204174062,
    lng: 74.02049618226005,
    description: "Arts education and performance venue",
    category: "Arts",
  },
  {
    id: 16,
    name: "IT Building, School of Computing, School of Engineering & Sciences, School of Holistic Development, College of Management (MITCOM), CRIEYA",
    lat: 18.493930153250627,
    lng: 74.01912736815999,
    description: "Technology and management education complex",
    category: "Academic",
  },
  {
    id: 17,
    name: "Tuck Shop",
    lat: 18.493523886263336,
    lng: 74.02291451273722,
    description: "Tuck Shop – Quick bites, chill vibes, heart of MIT ADT.",
    category: "Landmark",
  },
  {
    id: 18,
    name: "MANET Canteen",
    lat: 18.491564033859877,
    lng: 74.02410194039003,
    description: "MANET Canteen – Grab-and-go meals for busy campus days.",
    category: "Landmark",
  }
];

export const UNIVERSITY_CENTER = {
  lat: 18.493343843257275,
  lng: 74.02357135415613
};

export const MAP_OPTIONS = {
  disableDefaultUI: false,
  zoomControl: true,
  streetViewControl: true,
  scaleControl: true,
  mapTypeControl: true,
  fullscreenControl: true,
} as const;

export const MAP_CONTAINER_STYLE = {
  width: '100%',
  height: '100%',
} as const;
