"use client";

import { useState, useRef } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { VacationAuction } from '../types/types';
import EmailPopup from './EmailPopup';
import Image from 'next/image';
import { TrendingUp, DollarSign } from 'lucide-react';
import Link from 'next/link';
import { Timer, Users } from 'lucide-react';
import { useScrollZoom } from '@/hooks/useScrollZoom';

interface AuctionCardProps {
  auction: {
    id: string;
    title: string;
    mainImage: {
      url: string;
    };
    marketValue: number;
    currentBid: number;
    endDate: Date;
    charity: string;
    auctionLink: string;
    totalBids: number;
  };
}

export default function AuctionCard({ auction }: AuctionCardProps) {
  const endDate = new Date(auction.endDate);
  const timeRemaining = isNaN(endDate.getTime()) ? "Invalid date" : formatDistanceToNow(endDate, { addSuffix: true });
  const [isEmailPopupOpen, setIsEmailPopupOpen] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);
  const { scale, translateY, blur } = useScrollZoom(imageRef, 1.15);

  const handlePlaceBid = () => {
    setIsEmailPopupOpen(true);
  };

  const handleMouseLeave = () => {
    setIsEmailPopupOpen(false);
  };

  return (      
    <>
      <div 
        key={auction.id} 
        className="group bg-white/70 backdrop-blur-md rounded-xl shadow-lg 
                   hover:shadow-xl transition-all duration-700 relative overflow-hidden
                   transform hover:scale-[1.02] hover:-translate-y-1
                   origin-center flex flex-col h-full"
      >
        <div 
          ref={imageRef} 
          className="relative aspect-[16/9] overflow-hidden rounded-t-xl image-hover"
        >
          <Image 
            src={auction.mainImage.url}
            alt={auction.title}
            fill
            className="object-cover origin-center will-change-transform"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{
              transform: `scale(${scale}) translateY(${translateY}px)`,
              filter: `blur(${blur}px)`,
              transition: 'all 1200ms cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />
        </div>

        <div className="p-4 space-y-3 flex-1 flex flex-col">
          <div className="space-y-1">
            <h3 className="text-xl font-bold tracking-tight text-black line-clamp-2">{auction.title}</h3>
            <span className="text-sm text-gray-500">
              Supporting <span className="text-blue-600 font-medium">{auction.charity}</span>
            </span>
          </div>

          <div className="space-y-3 flex-1">
            <div className="bg-green-50 p-3 rounded-xl border border-green-100">
              <div className="flex justify-between items-center px-2">
                <div className="text-left">
                  <span className="font-medium text-green-600">Savings</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-green-600">
                    ${(auction.marketValue - (auction.currentBid || 0)).toLocaleString()} (10%)
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-600">
                <TrendingUp className="w-4 h-4 text-blue-500" />
                <span className="font-medium">Current Bid</span>
              </div>
              <span className="font-bold text-black">${auction.currentBid?.toLocaleString() || 0}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-600">
                <DollarSign className="w-4 h-4 text-blue-500" />
                <span className="font-medium">Market Value</span>
              </div>
              <span className="font-bold text-black">
                ${auction.marketValue ? auction.marketValue.toLocaleString() : 'N/A'}
              </span>
            </div>

            <div className="flex items-center justify-between text-gray-600">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-500" />
                <span className="font-medium">Total Bids</span>
              </div>
              <span className="font-medium">{auction.totalBids}</span>
            </div>

            <div className="flex items-center justify-between text-gray-600">
              <div className="flex items-center gap-2">
                <Timer className="w-4 h-4 text-blue-500" />
                <span>Time Remaining</span>
              </div>
              <span className="font-medium text-right">{timeRemaining}</span>
            </div>
          </div>
        </div>

        <div className="p-3 border-t border-gray-100 mt-auto">
          <button 
            onClick={handlePlaceBid}
            className="w-full px-4 py-2 rounded-xl font-medium 
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
              Learn More
            </span>
          </button>
        </div>
      </div>

      <EmailPopup 
        isOpen={isEmailPopupOpen}
        onClose={() => setIsEmailPopupOpen(false)}
        auction={auction}
      />
    </>
  );
}