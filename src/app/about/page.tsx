import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-white to-slate-50 relative overflow-hidden pb-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-1/4 -top-1/4 w-1/2 h-1/2 bg-blue-100 rounded-full blur-3xl opacity-30" />
          <div className="absolute -left-1/4 -bottom-1/4 w-1/2 h-1/2 bg-purple-100 rounded-full blur-3xl opacity-30" />
        </div>

        <div className="container mx-auto px-4 py-25 relative mt-20">
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
                      src="/images/avatars/founder.jpg"   
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

      <Footer />
    </div>
  );
} 