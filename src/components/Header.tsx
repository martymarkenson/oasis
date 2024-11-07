"use client";

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import MobileNav from './MobileNav';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
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
        style={{ height: '60px' }}
      >
        {/* Gradient border effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-white/20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between py-4">
            <a
              href="/"
              className="relative group"
              onClick={(e) => {
                e.preventDefault();
                setIsAnimating(true);
                setTimeout(() => {
                  setIsAnimating(false);
                }, 600);
              }}
            >
              <div className="flex items-center">
                <div className="relative flex items-center">
                  <img src="/images/gavel2.png" alt="Gavel" className="w-10 h-10 mr-1" />
                </div>
                <div className="relative">
                  <span className="text-2xl md:text-3xl font-semibold text-blue-600">vacations</span>
                  <span className="text-2xl md:text-3xl font-semibold text-gray-900">forauction</span>
                  <span className="text-2xl md:text-2xl font-semibold text-gray-900">.com</span>
                  {/* Animated underline */}
                  <div
                    className={`absolute bottom-[-1px] left-[-1px] h-[2px] w-[1.8ch] bg-[#66767F]
                                transition-all duration-300 ease-in-out
                                ${isAnimating ? 'w-[32ch]' : 'group-hover:w-[32ch]'} rounded-full`}
                  />
                </div>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:block">
              <ul className="flex items-center gap-8">
                <li>
                  <a href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Travel Deals
                  </a>
                </li>
                <li>
                  <a href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="/blog" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Contact
                  </a>
                </li>
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