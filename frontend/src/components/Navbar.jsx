'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedButton from './animations/AnimatedButton';
import { useAppContext } from '@/context/appcontext';

const NavLink = ({ href, children }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link 
        href={href}
        className="relative text-gray-600 hover:text-orange-600 transition-colors py-2 block"
      >
        {children}
        <motion.span 
          className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 rounded-full"
          initial={{ width: 0, opacity: 0 }}
          whileHover={{ width: '100%', opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      </Link>
    </motion.div>
  );
};

const MobileNavLink = ({ href, children, onClick }) => {
  return (
    <motion.div
      whileHover={{ x: 5 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link
        href={href}
        className="block py-3 text-gray-600 hover:text-orange-600 transition-colors"
        onClick={onClick}
      >
        {children}
      </Link>
    </motion.div>
  );
};

export default function Navbar() {
  const { isLoggedIn, userType, logout } = useAppContext();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.header 
      className={`fixed top-0 inset-x-0 z-50 ${isScrolled ? 'bg-white/90 backdrop-blur-sm shadow-md py-3' : 'bg-transparent py-5'}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600">
              Grow-Together
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink href="/#how-it-works">How It Works</NavLink>
            <NavLink href="/#services">Services</NavLink>
            <NavLink href="/#results">Success Stories</NavLink>
            <NavLink href="/#contact">Contact</NavLink>
            
            {isLoggedIn ? (
              <motion.button
                onClick={logout}
                className="text-white bg-orange-600 rounded-lg font-medium hover:text-orange-700 transition-colors py-2 px-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Logout
              </motion.button>
            ) : (
              <>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    href="/login" 
                    className="text-orange-600 font-medium hover:text-orange-700 transition-colors py-2 px-4"
                  >
                    Sign In
                  </Link>
                </motion.div>
                <AnimatedButton href="/join" variant="primary">
                  Join the Network
                </AnimatedButton>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <motion.button 
            type="button" 
            className="md:hidden rounded-lg p-2 text-gray-600 hover:text-orange-600 focus:outline-none" 
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="md:hidden bg-white shadow-lg rounded-b-lg mx-4 overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="px-4 py-3 space-y-1">
              <MobileNavLink href="/#how-it-works" onClick={closeMobileMenu}>How It Works</MobileNavLink>
              <MobileNavLink href="/#services" onClick={closeMobileMenu}>Services</MobileNavLink>
              <MobileNavLink href="/#results" onClick={closeMobileMenu}>Success Stories</MobileNavLink>
              <MobileNavLink href="/#contact" onClick={closeMobileMenu}>Contact</MobileNavLink>
              <div className="border-t border-gray-200 my-3 pt-3 flex flex-col space-y-3">
                {isLoggedIn ? (
                  <button
                    onClick={() => { logout(); closeMobileMenu(); }}
                    className="text-orange-600 font-medium hover:text-orange-700 transition-colors py-2 px-4 text-left"
                  >
                    Logout
                  </button>
                ) : (
                  <>
                    <MobileNavLink href="/login" onClick={closeMobileMenu}>Sign In</MobileNavLink>
                    <AnimatedButton href="/join" onClick={closeMobileMenu} className="w-full">
                      Join the Network
                    </AnimatedButton>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}