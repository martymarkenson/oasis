"use client";

import { useState } from 'react';
import { Calendar, TrendingUp, DollarSign } from 'lucide-react';
import Image from 'next/image';

const upcomingAuctions = [
  {
    id: 1,
    title: "Swiss Alps Chalet",
    imageUrl: "/images/auctions/unico.jpg",
    startingBid: 2500,
    marketPrice: 5000,
    discount: 50,
    charity: "Alpine Conservation Fund",
    estimatedDiscount: 50
  },
  {
    id: 2,
    title: "Greek Island Villa",
    imageUrl: "/images/auctions/tierra.jpg",
    startingBid: 1800,
    marketPrice: 3000,
    discount: 40,
    charity: "Mediterranean Marine Protection",
    estimatedDiscount: 40
  },
  {
    id: 3,
    title: "African Safari Lodge",
    imageUrl: "/images/auctions/chateau.jpg",
    startingBid: 3500,
    marketPrice: 5385,
    discount: 35,
    charity: "Wildlife Conservation Trust",
    estimatedDiscount: 35
  }
];

export default function ComingThisMonth() {
  return (
    <div className="container mx-auto px-4 py-8 border-t">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="text-blue-500" size={20} />
        <h2 className="text-xl font-bold text-black">Coming This Month</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {upcomingAuctions.map((auction, index) => (
          <div 
            key={auction.id} 
            className="group bg-white/70 backdrop-blur-md rounded-xl shadow-lg 
                     hover:shadow-xl transition-all duration-300 relative overflow-hidden
                     transform hover:scale-[1.02] hover:-translate-y-1
                     origin-center"
          >
            <div className="relative aspect-video overflow-hidden rounded-t-xl">
              <Image 
                src={auction.imageUrl}
                alt={auction.title}
                fill
                className="object-cover transition-transform duration-[2000ms] 
                         ease-[cubic-bezier(0.23,0.96,0.23,0.98)]
                         group-hover:scale-105
                         origin-center"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />
            </div>

            <div className="p-4 space-y-4">
              <div className="space-y-1">
                <h3 className="text-xl font-bold tracking-tight text-black">{auction.title}</h3>
                <span className="text-sm text-gray-500">
                  Supporting <span className="text-blue-600 font-medium">{auction.charity}</span>
                </span>
              </div>

              <div className="bg-green-50 p-3 rounded-xl border border-green-100">
                <div className="flex justify-between items-center px-2">
                  <div className="text-left">
                    <span className="font-medium text-green-600 text-lg">Savings</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-green-600 text-lg">${(auction.marketPrice - auction.startingBid).toLocaleString()} ({auction.discount}%)</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-600">
                  <TrendingUp className="w-4 h-4 text-blue-500" />
                  <span className="font-medium">Starting Bid</span>
                </div>
                <span className="font-bold text-black">${auction.startingBid.toLocaleString()}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-600">
                  <DollarSign className="w-4 h-4 text-blue-500" />
                  <span className="font-medium">Market Value</span>
                </div>
                <span className="font-bold text-black">${auction.marketPrice.toLocaleString()}</span>
              </div>
            </div>

            <div className="p-4 border-t border-gray-100">
              <button className="w-full px-6 py-3 rounded-xl font-medium 
                       relative overflow-hidden
                       transition-all duration-300 
                       hover:shadow-lg hover:scale-[1.02]
                       group/btn"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-800 to-blue-600
                              opacity-0 group-hover/btn:opacity-60
                              bg-[length:200%_100%]
                              group-hover/btn:animate-smoothFlow
                              transition-opacity duration-150" 
                />
                <span className="relative text-white font-bold">
                  Get Notified
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}