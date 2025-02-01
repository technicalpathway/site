'use client';

import { createContext, useContext, useState } from 'react';
import Login from '../components/authentication/Login';
import Register from '../components/authentication/Register';

const AuthModalContext = createContext();

export function AuthModalProvider({ children }) {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const openLogin = () => {
    setIsRegisterOpen(false); // Close register if open
    setIsLoginOpen(true);
  };

  const openRegister = () => {
    setIsLoginOpen(false); // Close login if open
    setIsRegisterOpen(true);
  };

  const closeLogin = () => setIsLoginOpen(false);
  const closeRegister = () => setIsRegisterOpen(false);

  return (
    <AuthModalContext.Provider value={{ openLogin, closeLogin, openRegister, closeRegister }}>
      {children}
      <Login isOpen={isLoginOpen} onClose={closeLogin} />
      <Register isOpen={isRegisterOpen} onClose={closeRegister} />
    </AuthModalContext.Provider>
  );
}

export function useAuthModal() {
  const context = useContext(AuthModalContext);
  if (context === undefined) {
    throw new Error('useAuthModal must be used within an AuthModalProvider');
  }
  return context;
} 