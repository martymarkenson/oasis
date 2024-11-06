"use client";

import { useState } from 'react';
import { Calendar, TrendingUp, DollarSign } from 'lucide-react';
import Image from 'next/image';

export default function ComingThisMonth() {
  const [currentBid, setCurrentBid] = useState(0);

  return (
    <div className="container mx-auto px-4 py-8 border-t">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="text-blue-500" size={20} />
        <h2 className="text-xl font-bold text-black">Coming This Month</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Render auction items here if needed */}
        <div className="auction-item">
          <h3 className="text-lg font-semibold">Current Bid:</h3>
          <p className="text-xl font-bold">${currentBid}</p>
        </div>
      </div>
    </div>
  );
}