// Use Vite's built-in mode detection — reliable across all deploy environments
const isProduction = import.meta.env.MODE === 'production';

// Environment validation
const requiredEnvVars = {
  VITE_GOOGLE_MAPS_API_KEY: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
};

const missingEnvVars = Object.entries(requiredEnvVars)
  .filter(([, value]) => !value)
  .map(([key]) => key);

if (missingEnvVars.length > 0 && !isProduction) {
  console.warn('⚠️ Missing environment variables:', missingEnvVars);
  console.warn('Please check your .env file and ensure all required variables are set.');
}

// Base API URL — override via VITE_API_URL env var, or fall back to defaults
const API_BASE = import.meta.env.VITE_API_URL || (
  isProduction
    ? 'https://s72-gaurav-capstone.onrender.com'
    : 'http://localhost:5000'
);

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || (
  isProduction
    ? 'https://s72-gaurav-capstone.onrender.com'
    : 'http://localhost:5000'
);

export { API_BASE, SOCKET_URL, isProduction };
