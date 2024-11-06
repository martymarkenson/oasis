export const mockAuctions: VacationAuction[] = [
  {
    id: '1',
    title: 'Luxury Week in Maldives',
    description: '7 nights at an overwater villa with all-inclusive dining and spa treatments',
    imageUrl: 'https://source.unsplash.com/featured/?maldives,resort',
    currentBid: 3200,
    startingBid: 2000,
    marketValue: 5500,
    endDate: new Date('2024-04-15'),
    location: 'Maldives',
    numberOfBids: 15,
    totalBids: 15
  },
  {
    id: '2',
    title: 'Swiss Alps Ski Retreat',
    description: '5 nights in a premium chalet with ski passes and equipment rental',
    imageUrl: 'https://source.unsplash.com/featured/?swiss,alps',
    currentBid: 2800,
    startingBid: 1500,
    marketValue: 4200,
    endDate: new Date('2024-04-20'),
    location: 'Zermatt, Switzerland',
    numberOfBids: 12,
    totalBids: 12
  },
  {
    id: '3',
    title: 'Tuscan Villa Getaway',
    description: '6 nights in a historic villa with wine tasting tours and cooking classes',
    imageUrl: 'https://source.unsplash.com/featured/?tuscany,villa',
    currentBid: 4100,
    startingBid: 3000,
    marketValue: 6000,
    endDate: new Date('2024-04-18'),
    location: 'Tuscany, Italy',
    numberOfBids: 21,
    totalBids: 21
  },
  {
    id: '4',
    title: 'Bali Beach Resort',
    description: '8 nights in a private pool villa with daily yoga and surf lessons',
    imageUrl: 'https://source.unsplash.com/featured/?bali,resort',
    currentBid: 2600,
    startingBid: 1800,
    marketValue: 4000,
    endDate: new Date('2024-04-25'),
    location: 'Bali, Indonesia',
    numberOfBids: 9,
    totalBids: 9
  },
  {
    id: '5',
    title: 'African Safari Adventure',
    description: '5 days luxury safari with private guide and hot air balloon ride',
    imageUrl: 'https://source.unsplash.com/featured/?safari,africa',
    currentBid: 5200,
    startingBid: 4000,
    marketValue: 7000,
    endDate: new Date('2024-04-22'),
    location: 'Serengeti, Tanzania',
    numberOfBids: 18,
    totalBids: 18
  }
];

export interface VacationAuction {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  currentBid: number;
  startingBid: number;
  marketValue: number;
  endDate: Date;
  location: string;
  numberOfBids: number;
  totalBids?: number;
}
