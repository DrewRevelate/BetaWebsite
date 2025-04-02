'use client';

import { useState, useCallback, useEffect, useRef, lazy, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/ui/theme-toggle';

// Lazy load the modal component for better performance
const LoginModal = lazy(() => import('./LoginModal'));

// Navigation links without dropdown submenus
const navLinks = [
  { href: '/services', label: 'Services' },
  { href: '/approach', label: 'Approach' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

// Navigation component
export default function Navigation() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  
  // Check if link is active
  const isActive = useCallback((path: string) => {
    if (path === '/' && pathname !== '/') return false;
    return pathname === path || pathname.startsWith(`${path}/`);
  }, [pathname]);
  
  // Handle scroll for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Toggle mobile menu
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => {
      const newState = !prev;
      if (newState) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
      return newState;
    });
  }, []);
  
  // Close mobile menu
  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = '';
  }, []);
  
  // Modal handlers
  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);
  
  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <>
      {/* Skip to content link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-white dark:bg-gray-800 text-primary dark:text-primary-light px-4 py-2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        Skip to content
      </a>
      
      {/* Desktop Navigation */}
      <header 
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          isScrolled 
            ? "bg-white/95 dark:bg-gray-900/95 shadow-md dark:shadow-gray-800/30 backdrop-blur-md border-b border-gray-100 dark:border-gray-800" 
            : "bg-transparent"
        )}
        role="banner"
        aria-label="Main navigation"
      >
        <div className="container mx-auto px-4 flex items-center justify-between h-20">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md transition-all pr-4"
            aria-label="Revelate Operations Home"
          >
            <div className="w-12 h-12 relative mr-3 rounded-full overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center p-1 shadow-inner">
              <Image 
                src="/images/revelate-spiral-logo.png" 
                alt="Revelate Logo" 
                fill
                sizes="48px"
                className="object-contain scale-[0.85]"
                priority
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-gray-900 dark:text-white tracking-tight">REVELATE</span>
              <span className="text-xs text-gray-600 dark:text-gray-300 font-medium tracking-wide">OPERATIONS</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2">
            <nav className="flex space-x-1 items-center" role="navigation">
              {navLinks.map((item) => (
                <div 
                  key={item.href} 
                  className="relative"
                >
                  <Link 
                    href={item.href} 
                    className={cn(
                      "px-3 py-2 rounded-md font-medium text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary-light transition-colors",
                      isActive(item.href) && "text-primary dark:text-primary-light"
                    )}
                    aria-current={isActive(item.href) ? "page" : undefined}
                  >
                    {item.label}
                    {isActive(item.href) && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary dark:bg-primary-light rounded-full transform origin-left"></span>
                    )}
                  </Link>
                </div>
              ))}
              
              {/* CTA Buttons */}
              <div className="flex items-center space-x-3 ml-6">
                {/* Assessment Link */}
                <Link 
                  id="assessment-cta"
                  href="/contact?source=nav&service=assessment"
                  className="text-primary dark:text-white hover:text-primary-dark dark:hover:text-primary-light text-sm font-medium border border-primary/30 dark:border-primary-light/30 px-3 py-1.5 rounded-full transition-colors hover:bg-primary/5 dark:hover:bg-primary-light/5"
                >
                  Free Assessment
                </Link>
                
                {/* Client Portal Button */}
                <button
                  onClick={openModal}
                  className="text-white bg-primary hover:bg-primary-dark px-4 py-2 rounded-full font-medium transition-all hover:shadow-md hover:-translate-y-0.5"
                >
                  Client Portal
                </button>
              </div>
              
              {/* Theme Toggle */}
              <div className="ml-2">
                <ThemeToggle />
              </div>
            </nav>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2" 
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`block w-5 h-0.5 bg-gray-700 dark:bg-gray-200 rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1' : 'mb-1.5'}`}></span>
              <span className={`block w-5 h-0.5 bg-gray-700 dark:bg-gray-200 rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-5 h-0.5 bg-gray-700 dark:bg-gray-200 rounded-full transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1' : 'mt-1.5'}`}></span>
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Menu - Enhanced */}
      <AnimatePresence mode="wait">
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
            className="md:hidden fixed inset-0 z-40 content-visibility-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Semi-transparent overlay */}
            <motion.div 
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={closeMobileMenu}
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            ></motion.div>
            
            {/* Menu Panel */}
            <motion.div 
              className="absolute right-0 top-0 h-full w-full sm:w-80 bg-gradient-to-br from-primary to-primary-dark overflow-y-auto"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              <div className="p-6 flex flex-col h-full">
                {/* Close button */}
                <button
                  className="absolute top-4 right-4 p-2 text-white/80 hover:text-white rounded-full hover:bg-white/10 transition-colors"
                  onClick={closeMobileMenu}
                  aria-label="Close mobile menu"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
                
                {/* Logo */}
                <div className="flex items-center mb-10 mt-4">
                  <div className="w-12 h-12 relative mr-3 bg-white/10 rounded-full p-2">
                    <Image 
                      src="/images/revelate-spiral-logo.png" 
                      alt="Revelate Logo" 
                      fill
                      sizes="48px"
                      className="object-contain"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-xl text-white">REVELATE</span>
                    <span className="text-xs text-white/90">OPERATIONS</span>
                  </div>
                </div>
                
                {/* Assessment link */}
                <div className="bg-white/10 rounded-lg p-4 mb-6 border border-white/10">
                  <div className="text-white font-bold mb-1">Free Data Assessment</div>
                  <p className="text-white/80 text-sm mb-3">
                    Get a complimentary review of your data infrastructure.
                  </p>
                  <Link
                    href="/contact?source=mobile-menu&service=assessment"
                    className="w-full bg-white text-primary font-bold py-2 rounded-lg flex items-center justify-center shadow-lg"
                    onClick={closeMobileMenu}
                  >
                    Book Now
                  </Link>
                </div>
                
                {/* Mobile menu links */}
                <nav className="space-y-1 mb-6">
                  {navLinks.map((item, idx) => (
                    <motion.div 
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + (idx * 0.05) }}
                    >
                      <Link 
                        href={item.href} 
                        className={`block text-white text-lg font-medium p-3 rounded-lg hover:bg-white/10 ${
                          isActive(item.href) ? "bg-white/20" : ""
                        }`}
                        onClick={closeMobileMenu}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                </nav>
                
                {/* Client portal button */}
                <div className="mt-auto mb-6">
                  <button
                    onClick={() => {
                      closeMobileMenu();
                      openModal();
                    }}
                    className="w-full bg-white text-primary font-bold py-3 px-4 rounded-lg flex items-center justify-center shadow-lg"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                      <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                    Client Portal
                  </button>
                </div>
                
                {/* Mobile theme toggle */}
                <div className="border-t border-white/10 pt-4 flex justify-center">
                  <div className="bg-white/10 p-2 rounded-lg">
                    <ThemeToggle />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Login Modal - Lazy loaded */}
      {isModalOpen && (
        <Suspense fallback={
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl">
              <div className="animate-pulse h-8 w-40 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
              <div className="animate-pulse h-20 w-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        }>
          <LoginModal isOpen={isModalOpen} onClose={closeModal} />
        </Suspense>
      )}
    </>
  );
}