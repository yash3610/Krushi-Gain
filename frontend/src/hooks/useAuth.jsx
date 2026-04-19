import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getProfile } from '../services/authService';

const AuthContext = createContext(null);

const getStoredToken = () => localStorage.getItem('token') || localStorage.getItem('fpm_token');

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = getStoredToken();
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const data = await getProfile();
        setUser(data);
      } catch {
        localStorage.removeItem('token');
        localStorage.removeItem('fpm_token');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const login = (authToken, loggedInUser) => {
    localStorage.setItem('token', authToken);
    localStorage.setItem('fpm_token', authToken);
    setUser(loggedInUser);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('fpm_token');
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, loading, isAuthenticated: Boolean(user), login, logout, setUser }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
