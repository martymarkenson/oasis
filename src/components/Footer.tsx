"use client";

import { useState } from 'react';
import { ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    await new Promise(resolve => setTimeout(resolve, 1500));
    setStatus('success');
    setTimeout(() => {
      setEmail('');
      setStatus('idle');
    }, 2000);
  };

  return (
<footer className="bg-gradient-to-br from-blue-600 via-blue-600 to-indigo-700 relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -right-1/4 top-0 w-1/2 h-1/2 bg-blue-400 rounded-full blur-[128px] opacity-10" />
            <div className="absolute -left-1/4 bottom-0 w-1/2 h-1/2 bg-indigo-400 rounded-full blur-[128px] opacity-10" />
          </div>

          <div className="container mx-auto px-6 py-16 relative">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
              {/* Company Info */}
              <div className="md:col-span-4 space-y-6">
                <div>
                  <div className="font-bold text-2xl text-white mb-4">BidTreat.com</div>
                  <p className="text-sm text-blue-100 leading-relaxed">
                    Luxury travel auctions that make a difference in local communities.
                    Join us in discovering extraordinary destinations while supporting meaningful causes.
                  </p>
                </div>
                
                {/* Social Media Links */}
                <div className="flex gap-4">
                  {[
                    { platform: 'twitter', path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
                    { platform: 'linkedin', path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
                    { platform: 'instagram', path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" },
                    { platform: 'tiktok', path: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" }
                  ].map(({ platform, path }) => (
                    <a
                      key={platform}
                      href={`https://${platform}.com/traveltrades`}
                      className="group"
                    >
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center
                                    transition-all duration-300 hover:bg-white hover:shadow-lg
                                    hover:scale-110 hover:-translate-y-0.5">
                        <svg 
                          className="w-5 h-5 fill-current text-blue-100 transition-colors duration-300
                                 group-hover:text-blue-600"
                          viewBox="0 0 24 24" 
                          aria-hidden="true"
                        >
                          <path d={path} />
                        </svg>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Resources */}
              <div className="md:col-span-5">
                <div className="font-semibold text-lg text-white mb-6">Resources</div>
                <div className="grid grid-cols-2 gap-12">
                  <div>
                    <ul className="space-y-4">
                      {['Travel Deals', 'About', 'Contact'].map((item) => (
                        <li key={item}>
                          <a 
                            href={item === 'Travel Deals' ? '/' : `/${item.toLowerCase()}`}
                            className="text-blue-100 hover:text-white transition-all duration-300
                                   flex items-center group"
                          >
                            {item}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <ul className="space-y-4">
                      {['Blog', 'Terms'].map((item) => (
                        <li key={item}>
                          <a 
                            href={`/${item.toLowerCase()}`}
                            className="text-blue-100 hover:text-white transition-all duration-300
                                   flex items-center group"
                          >
                            {item}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Subscribe Section */}
              <div className="md:col-span-3">
                <div className="font-semibold text-lg text-white mb-6">Never Miss a Deal</div>
                <form onSubmit={handleSubscribe} className="space-y-3">
                  <div className="relative group">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-blue-300/20 
                               text-white placeholder:text-blue-200 text-sm
                               transition-all duration-300
                               focus:outline-none focus:ring-2 focus:ring-white/20 focus:bg-white/15"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={status !== 'idle'}
                    className="w-full relative group flex items-center justify-center
                             px-4 py-3 rounded-xl bg-white text-blue-600 
                             transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                  >
                    <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-white via-blue-50 to-white 
                                   opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span className="relative font-medium text-sm flex items-center gap-2">
                      {status === 'loading' ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : status === 'success' ? (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          Subscribed!
                        </>
                      ) : (
                        <>
                          Get Alerts
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                        </>
                      )}
                    </span>
                  </button>
                </form>
              </div>
            </div>

            {/* Copyright */}
            <div className="mt-16 pt-8 border-t border-blue-400/20 text-center">
              <p className="text-sm text-blue-100">
                © 2024 BidTreat.com. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
  );
};

export default Footer;