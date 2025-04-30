'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('user-token');
    const type = localStorage.getItem('user-type');
    setIsLoggedIn(!!token && (type === 'business' || type === 'partner'));
    setUserType(type);
  }, []);

  const logout = () => {
    localStorage.removeItem('user-token');
    localStorage.removeItem('user-type');
    setIsLoggedIn(false);
    setUserType(null);
    router.push('/login');
  };

  return (
    <AppContext.Provider value={{ isLoggedIn, userType, logout }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);