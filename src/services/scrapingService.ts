interface ScrapedAuction {
  currentBid: number;
  totalBids: number;
}

export class ScrapingService {
  static async scrapeAuctionData(auctionLink: string): Promise<ScrapedAuction> {
    try {
      const response = await fetch('/api/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ auctionLink }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch auction data');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching auction data:', error);
      return { currentBid: 0, totalBids: 0 };
    }
  }
} 