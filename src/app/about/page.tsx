import React from 'react';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header - reusing from home page */}
      <header className="bg-white/70 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="font-bold text-3xl text-black">
              <a href="/" className="hover:text-blue-600">TravelTrades</a>
            </div>
            <nav>
              <ul className="flex items-center gap-8">
                <li>
                  <a href="/#how-it-works" className="relative group text-lg text-gray-600 transition-colors duration-300 hover:text-black">
                    How it Works
                  </a>
                </li>
                <li>
                  <a href="/blog" className="relative group text-lg text-gray-600 transition-colors duration-300 hover:text-black">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="/about" className="relative group text-lg text-gray-600 transition-colors duration-300 hover:text-black">
                    About
                  </a>
                </li>
                <li>
                  <a href="/contact" className="relative group text-lg text-gray-600 transition-colors duration-300 hover:text-black">
                    Contact
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-white to-slate-50 relative overflow-hidden pb-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-1/4 -top-1/4 w-1/2 h-1/2 bg-blue-100 rounded-full blur-3xl opacity-30" />
          <div className="absolute -left-1/4 -bottom-1/4 w-1/2 h-1/2 bg-purple-100 rounded-full blur-3xl opacity-30" />
        </div>

        <div className="container mx-auto px-4 py-16 relative">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <h1 className="text-4xl font-bold text-center mb-2">
              <span className="text-black">About</span>{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-500 inline-block text-transparent bg-clip-text">
                TravelTrades
              </span>
            </h1>

            {/* Main Content */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-sm mb-12">
              <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed mb-12">
                <p className="mb-6">
                  I founded TravelTrades with a simple belief: luxury travel shouldn't be out of reach for those who are passionate about experiencing the world's most extraordinary places.
                </p>
                
                <p className="mb-6">
                  Throughout my career in the travel industry, I witnessed countless amazing properties operating below capacity, while enthusiastic travelers were priced out of these exceptional experiences. This observation led to a simple idea: what if we could create a marketplace that benefits both sides?
                </p>
                
                <p className="mb-6">
                  Today, TravelTrades has helped thousands of members save over $2.5M on luxury stays while ensuring our partner properties maintain their premium positioning. Even more importantly, every successful auction contributes to local community development projects at our destinations.
                </p>
                
                <p>
                  We're just getting started on our mission to make luxury travel more accessible while creating positive impact. I invite you to join us on this journey.
                </p>
              </div>

              {/* Founder Section */}
              <div className="flex items-center gap-8 border-t border-gray-100 pt-12">
                <div className="flex-shrink-0">
                  <div className="relative w-40 h-40">
                    <Image
                      src="/images/founder.jpg"
                      alt="Sarah Chen - Founder"
                      fill
                      className="rounded-xl object-cover"
                    />
                  </div>
                </div>
                <div>
                  <div className="mb-4 relative h-12 w-[180px]">
                    <Image
                      src="/images/signature.png"
                      alt="Sarah Chen's signature"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className="font-semibold text-gray-900">Sarah Chen</h3>
                  <p className="text-gray-600">Founder & CEO</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer - reusing from home page */}
      <footer className="bg-blue-600">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Links Section */}
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

          <div className="text-center text-sm text-blue-100 pt-8 mt-8 border-t border-blue-500">
            © 2024 TravelTrades. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
} 