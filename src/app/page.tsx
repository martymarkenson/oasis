"use client";

import { useState, useEffect } from 'react';
import EndingSoon from "@/components/EndingSoon";
import ComingThisMonth from "@/components/ComingThisMonth";
import { Check, Mail, CheckCircle2, X, ArrowRight, Loader2, Menu, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import MobileNav from '@/components/MobileNav';
import Header from '@/components/Header';

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export default function Home() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const validateEmail = (email: string) => {
    if (!email) {
      setErrorMessage('Please enter your email address');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address');
      return false;
    }
    return true;
  };

  const handleSubscribe = async (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!validateEmail(email)) {
      setStatus('error');
      return;
    }

    setStatus('loading');
    
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe');
      }

      setStatus('success');
      // Reset after showing success
      setTimeout(() => {
        setEmail('');
        setStatus('idle');
      }, 3000);
    } catch (error) {
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <div className="pt-[60px]">
        <div className="bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute right-0 top-0 w-1/2 h-1/2 bg-blue-100 rounded-full blur-3xl opacity-30" />
            <div className="absolute left-0 bottom-0 w-1/2 h-1/2 bg-purple-100 rounded-full blur-3xl opacity-30" />
          </div>

          <div className="container mx-auto px-4 py-8 relative">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl font-bold mb-4 tracking-tight leading-tight">
                <span className="inline-block mb-2 text-black">Luxury Travel's</span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-purple-500 inline-block text-transparent bg-clip-text">
                  Best Kept Secret
                </span>
              </h1>

              <p className="text-xl text-gray-600 mb-6 leading-relaxed max-w-2xl mx-auto">
                Access exclusive <u>charity auctions</u> for up to 50% off premium stays.
                <br />
                Smart travelers save big while supporting local causes.
              </p>

              <div className="flex justify-center gap-6 mb-5 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Check size={16} className="text-green-500" />
                  50,000+ members
                </div>
                <div className="flex items-center gap-2">
                  <Check size={16} className="text-green-500" />
                  $2.5M+ in savings
                </div>
                <div className="flex items-center gap-2">
                  <Check size={16} className="text-green-500" />
                  100+ destinations
                </div>
              </div>

              <div className="max-w-md mx-auto mb-8">
                <div className="relative">
                  <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl relative overflow-hidden">
                    {/* Background Effects */}
                    <div className="absolute -right-1/4 -top-1/4 w-1/2 h-1/2 bg-blue-100 rounded-full blur-3xl opacity-20" />
                    <div className="absolute -left-1/4 -bottom-1/4 w-1/2 h-1/2 bg-purple-100 rounded-full blur-3xl opacity-20" />

                    {/* Content */}
                    <div className="relative">
                      <form onSubmit={handleSubscribe} className="space-y-6" autoComplete="on">
                        {/* Input Group */}
                        <div className="relative">
                          <label htmlFor="email" className="sr-only">Email</label>
                          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                            <Mail className={`w-5 h-5 ${status === 'error' ? 'text-red-400' : 'text-blue-400'}`} />
                          </div>
                          
                          <input
                            type="email"
                            name="email"
                            id="email"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                              if (status === 'error') setStatus('idle');
                            }}
                            placeholder="Enter your email address"
                            className={`w-full pl-12 pr-4 py-3 rounded-xl bg-white/50 border 
                              transition-all duration-200
                              ${status === 'error' 
                                ? 'border-red-200 focus:border-red-400 focus:ring-red-200' 
                                : 'border-gray-200 focus:border-blue-400 focus:ring-blue-200'}
                              focus:outline-none focus:ring-4 text-black`}
                            disabled={status === 'loading' || status === 'success'}
                            autoComplete="email"
                            data-form-type="email"
                            data-lpignore="true"
                          />

                          {/* Error Message */}
                          {status === 'error' && (
                            <div className="absolute left-0 -bottom-6 flex items-center gap-1 text-sm text-red-500">
                              <X className="w-4 h-4" />
                              {errorMessage}
                            </div>
                          )}
                        </div>

                        {/* Button */}
                        <button
                          type="submit"
                          disabled={status === 'loading' || status === 'success'}
                          className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl 
                            font-medium relative overflow-hidden
                            transition-all duration-300 
                            hover:shadow-lg hover:scale-[1.02]
                            group/btn
                            ${status === 'success' ? 'bg-green-500' : ''}`}
                        >
                          {/* Base gradient */}
                          {!status.includes('success') && (
                            <>
                              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600" />
                              
                              {/* Animated hover gradient */}
                              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-800 to-blue-600
                                opacity-0 group-hover/btn:opacity-60
                                bg-[length:200%_100%]
                                group-hover/btn:animate-smoothFlow
                                transition-opacity duration-150" 
                              />
                            </>
                          )}
                          
                          {/* Button content */}
                          <div className="relative flex items-center justify-center gap-2">
                            {status === 'loading' ? (
                              <Loader2 className="w-5 h-5 animate-spin" />
                            ) : status === 'success' ? (
                              <>
                                <CheckCircle2 className="w-5 h-5" />
                                Successfully Subscribed
                              </>
                            ) : (
                              <>
                                Get Travel Alerts
                                <ArrowRight className="w-5 h-5" />
                              </>
                            )}
                          </div>
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Proof Section */}
              <div className="mt-6 flex items-center justify-center gap-4 text-sm text-gray-600">
                <div className="flex -space-x-2">
                  {['/images/avatars/avatar-1.jpg',
                    '/images/avatars/avatar-2.jpg',
                    '/images/avatars/avatar-3.jpg',
                    '/images/avatars/avatar-4.jpg'].map((src, i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white relative">
                      <Image
                        src={src}
                        alt={`Recent member ${i + 1}`}
                        fill
                        className="rounded-full object-cover"
                        sizes="32px"
                      />
                    </div>
                  ))}
                </div>
                <p>
                  <span className="font-semibold text-gray-800">+45 travelers</span> joined this week
                </p>
              </div>
            </div>
          </div>
        </div>

        <EndingSoon />

        <footer className="bg-blue-600">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Links Section - Left Side */}
              <div className="grid grid-cols-3 gap-8">
                <div>
                  <div className="font-semibold text-white mb-4">TravelTrades</div>
                  <p className="text-sm text-blue-100">
                    Luxury travel auctions that make a difference in local communities.
                  </p>
                </div>
                <div>
                  <div className="font-semibold text-white mb-4">Company</div>
                  <ul className="space-y-2 text-sm text-blue-100">
                    <li><a href="/about" className="hover:text-white">About</a></li>
                    <li><a href="/blog" className="hover:text-white">Blog</a></li>
                    <li><a href="/contact" className="hover:text-white">Contact</a></li>
                  </ul>
                </div>
                <div>
                  <div className="font-semibold text-white mb-4">Resources</div>
                  <ul className="space-y-2 text-sm text-blue-100">
                    <li><a href="#how-it-works" className="hover:text-white">How it Works</a></li>
                    <li><a href="/faq" className="hover:text-white">FAQ</a></li>
                    <li><a href="/terms" className="hover:text-white">Terms of Service</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
