import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { API_BASE, isProduction } from '../config';
import { AppSkeleton } from '../components/common/AppSkeleton';

interface User {
  _id: string;
  id: string;
  email: string;
  name: string;
  phone?: string;
  major?: string;
  yearOfStudy?: string;
  profilePicture?: { url: string; public_id: string };
  gender?: string;
  dateOfBirth?: string;
  program?: string;
  isAdmin?: boolean;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string, remember?: boolean) => Promise<void>;
  signup: (email: string, password: string, name: string, remember?: boolean) => Promise<void>;
  loginWithGoogle: () => void;
  handleGoogleCallback: (token: string) => void;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
  loading: boolean;
  refreshToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [initializing, setInitializing] = useState(true);
  const refreshTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tokenRef = useRef<string | null>(null);
  const isRefreshingRef = useRef<boolean>(false); // Prevent concurrent refreshes

  // On mount, check both storages for a valid token
  useEffect(() => {
    const now = Date.now();
    const localToken = localStorage.getItem('token');
    const expiry = localStorage.getItem('token_expiry');
    let persistedToken = null;

    if (localToken && expiry && now < Number(expiry)) {
      persistedToken = localToken;
    } else {
      // Clear potentially expired or invalid token from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('token_expiry');
    }

    // If no valid token from localStorage, check sessionStorage
    if (!persistedToken) {
    const sessionToken = sessionStorage.getItem('token');
    if (sessionToken) {
        persistedToken = sessionToken;
      }
    }

    setToken(persistedToken);
    setInitializing(false);
  }, []);

  useEffect(() => {
    tokenRef.current = token;
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchProfile().catch(err => {
        console.error('Failed to fetch profile:', err);
        // If profile fetch fails, clear the token to prevent infinite loops
        if (err.response?.status === 401) {
          logout();
        }
      });
      // Set up token refresh
      setupTokenRefresh();
    } else {
      setUser(null);
      // Clear any existing refresh timeout
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
        refreshTimeoutRef.current = null;
      }
    }
  }, [token]);

  const setupTokenRefresh = () => {
    // Clear any existing refresh timeout
    if (refreshTimeoutRef.current) {
      clearTimeout(refreshTimeoutRef.current);
    }

    // Token expires in 24 hours, refresh 1 hour before expiry (23 hours)
    // This gives plenty of time for the refresh to complete
    const refreshTime = 23 * 60 * 60 * 1000; // 23 hours in milliseconds
    
    const timeout = setTimeout(() => {
      refreshToken();
    }, refreshTime);

    refreshTimeoutRef.current = timeout;
  };

  const refreshToken = async () => {
    // Prevent concurrent refresh attempts
    if (isRefreshingRef.current) {
      console.log('Token refresh already in progress, skipping...');
      return;
    }

    try {
      isRefreshingRef.current = true;
      const currentToken = tokenRef.current;
      
      if (!currentToken) {
        console.log('No token available for refresh');
        return;
      }
      
      console.log('Refreshing authentication token...');
      const response = await axios.post(`${API_BASE}/api/auth/refresh`, {}, {
        headers: { Authorization: `Bearer ${currentToken}` }
      });
      
      const { token: newToken } = response.data;
      setToken(newToken);
      
      // Update storage
      const expiry = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
      localStorage.setItem('token', newToken);
      localStorage.setItem('token_expiry', expiry.toString());
      
      console.log('Token refreshed successfully');
    } catch (error) {
      console.error('Token refresh failed:', error);
      // Only logout if the error is authentication-related
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        logout();
      }
    } finally {
      isRefreshingRef.current = false;
    }
  };

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`${API_BASE}/api/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data);
    } catch (error) {
      setUser(null);
      if (axios.isAxiosError(error) && error.response?.status === 401) {
         logout();
      }
    }
  };

  const login = async (email: string, password: string, remember?: boolean) => {
    try {
      // Frontend validation
      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      // Email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('Invalid email format');
      }

      // Password validation
      if (password.length < 8) {
        throw new Error('Password must be at least 8 characters long');
      }

      // Add retry logic for server wakeup scenarios
      let lastError;
      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          const response = await axios.post(`${API_BASE}/api/auth/login`, {
            email: email.toLowerCase(),
            password
          });
          const { token, user } = response.data;
          setToken(token);
          setUser(user);
          // Persist token based on remember preference
          const expiry = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
          if (remember === false) {
            sessionStorage.setItem('token', token);
            localStorage.removeItem('token');
            localStorage.removeItem('token_expiry');
          } else {
            localStorage.setItem('token', token);
            localStorage.setItem('token_expiry', expiry.toString());
            sessionStorage.removeItem('token');
          }
          return; // Success, exit the retry loop
        } catch (error) {
          lastError = error;
          if (attempt < 3) {
            await new Promise(resolve => setTimeout(resolve, attempt * 1000));
          }
        }
      }
      
      // If all retries failed, throw the last error
      throw lastError;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data?.message) {
          throw new Error(error.response.data.message);
        }
        if (error.response?.data?.details) {
          const details = error.response.data.details;
          const errorMessages = Object.entries(details)
            .filter(([_, value]) => value !== null)
            .map(([key, value]) => `${key}: ${value}`)
            .join(', ');
          throw new Error(errorMessages);
        }
        if (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK') {
          throw new Error('Server is starting up. Please try again in a few seconds.');
        }
      }
      throw error;
    }
  };

  const signup = async (email: string, password: string, name: string, remember?: boolean) => {
    try {
      // Frontend validation
      if (!email || !password || !name) {
        throw new Error('All fields are required');
      }

      // Email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('Invalid email format');
      }

      // Password strength validation
      if (password.length < 8) {
        throw new Error('Password must be at least 8 characters long');
      }

      if (!/[A-Z]/.test(password)) {
        throw new Error('Password must contain at least one uppercase letter');
      }

      if (!/[a-z]/.test(password)) {
        throw new Error('Password must contain at least one lowercase letter');
      }

      if (!/[0-9]/.test(password)) {
        throw new Error('Password must contain at least one number');
      }

      if (!/[!@#$%^&*]/.test(password)) {
        throw new Error('Password must contain at least one special character (!@#$%^&*)');
      }

      // Name validation
      if (name.trim().length < 2) {
        throw new Error('Name must be at least 2 characters long');
      }
      
      // Add retry logic for server wakeup scenarios
      let lastError;
      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          const response = await axios.post(`${API_BASE}/api/auth/signup`, {
            email: email.toLowerCase(),
            password,
            name: name.trim()
          });

          const { token, user } = response.data;
          setToken(token);
          setUser(user);
          
          // Persist token based on remember preference
          const expiry = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
          if (remember === false) {
            sessionStorage.setItem('token', token);
            localStorage.removeItem('token');
            localStorage.removeItem('token_expiry');
          } else {
            localStorage.setItem('token', token);
            localStorage.setItem('token_expiry', expiry.toString());
            sessionStorage.removeItem('token');
          }
          return; // Success, exit the retry loop
        } catch (error) {
          lastError = error;
          if (attempt < 3) {
            await new Promise(resolve => setTimeout(resolve, attempt * 1000));
          }
        }
      }
      
      // If all retries failed, throw the last error
      throw lastError;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data?.message) {
          throw new Error(error.response.data.message);
        }
        if (error.response?.data?.details) {
          const details = error.response.data.details;
          const errorMessages = Object.entries(details)
            .filter(([_, value]) => value !== null)
            .map(([key, value]) => `${key}: ${value}`)
            .join(', ');
          throw new Error(errorMessages);
        }
        if (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK') {
          throw new Error('Server is starting up. Please try again in a few seconds.');
        }
      }
      throw error;
    }
  };

  // Remove token from both storages on logout
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('token_expiry');
    sessionStorage.removeItem('token');
    setToken(null);
    setUser(null);
    if (refreshTimeoutRef.current) {
      clearTimeout(refreshTimeoutRef.current);
      refreshTimeoutRef.current = null;
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    try {
      const formData = new FormData();
      for (const key in data) {
          if (data[key as keyof Partial<User>] !== undefined) {
              if (key === 'dateOfBirth') {
                   formData.append(key, data[key] === null ? '' : data[key] as string);
              } else if (key === 'profilePicture' && data[key]) {
                   formData.append(key, data[key] as Blob);
          } else {
                formData.append(key, String(data[key]));
              }
          }
      }

      const response = await axios.put(`${API_BASE}/api/profile`, formData, {
        headers: { 
            Authorization: `Bearer ${token}`,
        }
      });
      setUser(response.data);
    } catch (error) {
      throw error;
    }
  };

  const loginWithGoogle = () => {
    const backendUrl = isProduction
      ? 'https://s72-gaurav-capstone.onrender.com'
      : 'http://localhost:5000';
    
    // Add a small delay to ensure the server wakeup loader has time to show
    setTimeout(() => {
      window.location.href = `${backendUrl}/api/auth/google`;
    }, 100);
  };

  const handleGoogleCallback = async (token: string) => {
    setToken(token);
    try {
      const response = await axios.get(`${API_BASE}/api/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data);
      // Always save token to localStorage with expiry for persistent login
      const expiry = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
      localStorage.setItem('token', token);
      localStorage.setItem('token_expiry', expiry.toString());
      sessionStorage.removeItem('token');
      return response.data;
    } catch (error) {
      setUser(null);
      logout();
      throw error;
    }
  };

  // Only render children after token check is complete
  if (initializing) {
    return <AppSkeleton />;
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      login, 
      signup, 
      loginWithGoogle,
      handleGoogleCallback,
      logout, 
      updateProfile,
      loading: initializing,
      refreshToken
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 