'use client';
import { Fragment, useState, useEffect } from 'react';
import Link from 'next/link';
import { useAppContext } from '@/context/appcontext';
import { motion } from 'framer-motion';
import { Menu, Transition } from '@headlessui/react';

function MobileNavLink({ href, children, onClick }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block w-full p-2 text-base text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors duration-200"
    >
      {children}
    </Link>
  );
}

export default function Navbar() {
  const { isLoggedIn, userType, userInfo, logout } = useAppContext();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleLogout = () => {
    logout();
    closeMobileMenu();
  };

  return (
    <motion.header 
      className={`fixed top-0 inset-x-0 z-50 ${isScrolled ? 'bg-white/90 backdrop-blur-sm shadow-md py-3' : 'bg-transparent py-5'}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 50, damping: 20 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="relative flex items-center justify-between">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600">
                Grow-Together
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {isLoggedIn && (
              <>
                {userType === 'business' && (
                  <Link href="/browse-partner" className="text-gray-600 hover:text-orange-600 transition-colors">
                    Browse Partners
                  </Link>
                )}
                {userType === 'partner' && (
                  <Link href="/browse-business" className="text-gray-600 hover:text-orange-600 transition-colors">
                    Browse Businesses
                  </Link>
                )}
                <Link href="/chat" className="text-gray-600 hover:text-orange-600 transition-colors">
                  Messages
                </Link>
              </>
            )}
            <Link href="/#how-it-works" className="text-gray-600 hover:text-orange-600 transition-colors">
              How It Works
            </Link>
            <Link href="/#services" className="text-gray-600 hover:text-orange-600 transition-colors">
              Services
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-orange-600 transition-colors">
              Contact
            </Link>
          </div>

          {/* User Menu / Auth Buttons */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {isLoggedIn ? (
              <Menu as="div" className="relative">
                <Menu.Button className="flex items-center space-x-2 bg-orange-600 px-4 py-2 rounded-lg text-white transition-colors">
                  <span className="text-sm font-medium">{userInfo?.name}</span>
                  <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{userInfo?.name}</p>
                      <p className="text-xs text-gray-500">{userInfo?.email}</p>
                    </div>
                    {userType === 'business' && (
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href={`/businessForm/${userInfo?.id}`}
                            className={`${active ? 'bg-gray-50 text-orange-600' : 'text-gray-700'} block px-4 py-2 text-sm`}
                          >
                            Business Profile
                          </Link>
                        )}
                      </Menu.Item>
                    )}
                    {userType === 'partner' && (
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href={`/partnerForm/${userInfo?.id}`}
                            className={`${active ? 'bg-gray-50 text-orange-600' : 'text-gray-700'} block px-4 py-2 text-sm`}
                          >
                            Partner Profile
                          </Link>
                        )}
                      </Menu.Item>
                    )}
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={handleLogout}
                          className={`${active ? 'bg-gray-50 text-orange-600' : 'text-gray-700'} block w-full text-left px-4 py-2 text-sm`}
                        >
                          Sign Out
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-600 hover:text-orange-600 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/join"
                  className="bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-lg px-4 py-2 hover:shadow-lg transition-all duration-300"
                >
                  Join Now
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden rounded-lg p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 transition-colors"
          >
            <svg
              className={`h-6 w-6 transition-transform duration-200 ${isMobileMenuOpen ? 'transform rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </nav>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden fixed inset-x-0 top-[57px] bg-white/95 backdrop-blur-sm shadow-lg transition-all duration-200 ease-in-out transform ${
            isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
          }`}
        >
          <div className="px-4 pt-2 pb-3 space-y-1">
            {isLoggedIn && (
              <>
                <div className="px-3 py-2 border-b border-gray-200 mb-2">
                  <p className="text-sm font-medium text-gray-900">{userInfo?.name}</p>
                  <p className="text-xs text-gray-500">{userInfo?.email}</p>
                </div>
                {userType === 'business' && (
                  <>
                    <MobileNavLink href="/browse-partner" onClick={closeMobileMenu}>Browse Partners</MobileNavLink>
                    <MobileNavLink href={`/businessForm/${userInfo?.id}`} onClick={closeMobileMenu}>Business Profile</MobileNavLink>
                  </>
                )}
                {userType === 'partner' && (
                  <>
                    <MobileNavLink href="/browse-business" onClick={closeMobileMenu}>Browse Businesses</MobileNavLink>
                    <MobileNavLink href={`/partnerForm/${userInfo?.id}`} onClick={closeMobileMenu}>Partner Profile</MobileNavLink>
                  </>
                )}
                <MobileNavLink href="/chat" onClick={closeMobileMenu}>Messages</MobileNavLink>
              </>
            )}
            <MobileNavLink href="/#how-it-works" onClick={closeMobileMenu}>How It Works</MobileNavLink>
            <MobileNavLink href="/#services" onClick={closeMobileMenu}>Services</MobileNavLink>
            <MobileNavLink href="/#contact" onClick={closeMobileMenu}>Contact</MobileNavLink>
            
            <div className="border-t border-gray-200 my-3 pt-3">
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="w-full text-left text-white bg-gradient-to-r from-orange-600 to-amber-600 rounded-lg font-medium py-2 px-4 hover:shadow-lg transition-all duration-300"
                >
                  Sign Out
                </button>
              ) : (
                <div className="space-y-2">
                  <MobileNavLink href="/login" onClick={closeMobileMenu}>Sign In</MobileNavLink>
                  <Link
                    href="/join"
                    onClick={closeMobileMenu}
                    className="block w-full text-center text-white bg-gradient-to-r from-orange-600 to-amber-600 rounded-lg font-medium py-2 px-4 hover:shadow-lg transition-all duration-300"
                  >
                    Join Now
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}