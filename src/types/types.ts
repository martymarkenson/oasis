export interface VacationAuction {
  id: string;
  title: string;
  location: string;
  currentBid: number;
  marketValue: number;
  endDate: Date;
  imageUrl: string;
  description: string;
  startingBid: number;
  numberOfBids: number;
  mainImage: {
    url: string;
  };
} 