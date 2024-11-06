"use client";

import { useEffect, useState } from 'react';
import { listingService } from '@/services/listingService';
import AuctionCard from './AuctionCard';
import { Timer } from 'lucide-react';

// Update interface to match your AuctionCard props
interface Auction {
  id: string;
  title: string;
  mainImage: {
    url: string;
  };
  marketValue: number;
  startingBid: number;
  endDate: Date;
  charity: string;
  totalBids?: number;
  currentBid?: number;
  auctionLink: string;
}

export default function EndingSoon() {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setIsLoading(true);
        const listings = await listingService.getListings();
        console.log('Fetched listings:', JSON.stringify(listings, null, 2));
        setAuctions(listings);
      } catch (err) {
        setError('Failed to fetch auctions');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchListings();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!auctions || auctions.length === 0) return <div>No auctions found</div>;

  return (
    <div className="container mx-auto px-4 py-8 border-t">
      <div className="flex items-center gap-2 mb-4">
        <Timer className="text-blue-500" size={20} />
        <h2 className="text-xl font-bold text-black">Ending Soon</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {auctions.map((auction) => (
          <AuctionCard 
            key={auction.id}
            auction={{
              id: auction.id,
              title: auction.title,
              mainImage: auction.mainImage,
              marketValue: auction.marketValue,
              currentBid: auction.currentBid || 0,
              totalBids: auction.totalBids || 0,
              endDate: new Date(auction.endDate),
              charity: auction.charity || 'Local Community Fund',
              auctionLink: auction.auctionLink,
            }}
          />
        ))}
      </div>
    </div>
  );
}
