"use client";

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [status, setStatus] = useState('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setStatus('success');
    
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setStatus('idle');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <div className="bg-gradient-to-b from-white to-slate-50 relative overflow-hidden pb-20">
        {/* Background Effects - similar to about page */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-1/4 -top-1/4 w-1/2 h-1/2 bg-blue-100 rounded-full blur-3xl opacity-30" />
          <div className="absolute -left-1/4 -bottom-1/4 w-1/2 h-1/2 bg-purple-100 rounded-full blur-3xl opacity-30" />
        </div>

        <div className="container mx-auto px-4 py-24 relative">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <h1 className="text-4xl font-bold text-center mb-12">
              <span className="text-black">Get in </span>
              <span className="bg-gradient-to-r from-blue-600 to-purple-500 inline-block text-transparent bg-clip-text">
                Touch
              </span>
            </h1>
            
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Have questions about our auctions or want to learn more about how we support local communities? We'd love to hear from you.
            </p>

            {/* Contact Form */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-200 
                               focus:border-blue-400 focus:ring-4 focus:ring-blue-200 
                               transition-all duration-200"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-200 
                               focus:border-blue-400 focus:ring-4 focus:ring-blue-200 
                               transition-all duration-200"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-200 
                             focus:border-blue-400 focus:ring-4 focus:ring-blue-200 
                             transition-all duration-200"
                    placeholder="How can we help you?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status !== 'idle'}
                  className="w-full md:w-[500px] mx-auto px-8 py-3 rounded-xl font-medium relative overflow-hidden
                           transition-all duration-300 hover:shadow-lg hover:scale-[1.02]
                           disabled:opacity-50 disabled:cursor-not-allowed group block"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-800 to-blue-600
                                opacity-0 group-hover:opacity-60 transition-opacity duration-150
                                bg-[length:200%_100%] animate-smoothFlow" />
                  <span className="relative flex items-center justify-center gap-2 text-white">
                    {status === 'loading' ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : status === 'success' ? (
                      <>
                        <CheckCircle2 className="w-5 h-5" />
                        Sent Successfully
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
} 