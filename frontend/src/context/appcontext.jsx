'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('user-token');
    const type = localStorage.getItem('user-type');
    
    if (token && (type === 'business' || type === 'partner')) {
      try {
        const decoded = jwtDecode(token);
        setUserInfo({
          name: decoded.fullName,
          email: decoded.email,
          id: decoded._id
        });
        setIsLoggedIn(true);
        setUserType(type);
      } catch (error) {
        console.error('Error decoding token:', error);
        logout();
      }
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('user-token');
    localStorage.removeItem('user-type');
    localStorage.removeItem('user-id');
    setIsLoggedIn(false);
    setUserType(null);
    setUserInfo(null);
    router.push('/login');
  };

  const updateUserInfo = (token) => {
    try {
      const decoded = jwtDecode(token);
      setUserInfo({
        name: decoded.fullName,
        email: decoded.email,
        id: decoded._id
      });
    } catch (error) {
      console.error('Error updating user info:', error);
    }
  };

  return (
    <AppContext.Provider value={{ isLoggedIn, userType, userInfo, logout, updateUserInfo }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);