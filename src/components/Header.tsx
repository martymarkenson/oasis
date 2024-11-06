import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import MobileNav from './MobileNav';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Semi-transparent overlay behind header when menu is open */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[998]" 
             onClick={() => setIsMenuOpen(false)} />
      )}

      <header 
        className={`fixed w-full top-0 z-[999] transition-all duration-300
          ${isMenuOpen 
            ? 'bg-white shadow-none'
            : scrolled 
              ? 'bg-white/50 backdrop-blur-lg border-b border-white/20'
              : 'bg-white/50 backdrop-blur-xl'}`}
      >
        {/* Gradient border effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-white/20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <a href="/" className="relative group">
              <span className="font-bold text-2xl tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                TravelTrades
              </span>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-500 
                            transition-all duration-300 group-hover:w-full"></div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:block">
              <ul className="flex items-center gap-8">
                <li>
                  <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">
                    How it Works
                  </a>
                </li>
                {['Blog', 'About', 'Contact'].map((item) => (
                  <li key={item}>
                    <a 
                      href={`/${item.toLowerCase()}`}
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-600" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <MobileNav isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      </header>
    </>
  );
};

export default Header;