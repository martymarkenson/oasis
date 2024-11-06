import { Trophy, Timer, Share2 } from 'lucide-react';

interface Auction {
  imageUrl: string;
  title: string;
  yoloScore: number;
  currentBid: number;
  marketValue: number;
}

const auction: Auction = {
  imageUrl: "/placeholder.jpg",
  title: "Featured Item",
  yoloScore: 85,
  currentBid: 1000,
  marketValue: 1500,
};

export default function FeaturedAuction() {
  const savingsPercentage = Math.round(((auction.marketValue - auction.currentBid) / auction.marketValue) * 100);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center gap-2 mb-6">
        <Trophy className="text-yellow-500" size={24} />
        <h2 className="text-2xl font-bold text-black">Featured Deal of the Week</h2>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex gap-8">
          <div className="w-2/3">
            <div className="aspect-video bg-gray-200 rounded-lg mb-4">
              <img 
                src="/api/placeholder/800/450"
                alt="Maui Oceanfront Villa"
                className="rounded-lg w-full h-full object-cover"
              />
            </div>
            <h3 className="text-2xl font-bold mb-2 text-black">Maui Oceanfront Villa</h3>
            <div className="flex gap-4 mb-4">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                💎 YOLO Score: {auction.yoloScore}/100
              </span>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                <Timer size={14} /> 6d 20h left
              </span>
            </div>
          </div>
          
          <div className="w-1/3 bg-gray-50 p-4 rounded-lg text-black">
            <div className="mb-4">
              <div className="text-sm mb-1">Current Bid</div>
              <div className="text-2xl font-bold">${auction.currentBid.toLocaleString()}</div>
            </div>
            <div className="mb-4">
              <div className="text-sm mb-1">Market Value</div>
              <div className="text-2xl font-bold">${auction.marketValue.toLocaleString()}</div>
            </div>
            <div className="mb-4">
              <div className="text-sm mb-1">Potential Savings</div>
              <div className="text-2xl font-bold text-green-600">{savingsPercentage}% 📈</div>
            </div>
            <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mb-2">
              View Auction
            </button>
            <button className="w-full border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2 text-black">
              <Share2 size={16} /> Share Deal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
