interface ScrapedAuction {
  currentBid: number;
  totalBids: number;
}

export class ScrapingService {
  static async scrapeAuctionData(auctionLink: string): Promise<ScrapedAuction> {
    console.log('🔍 Starting auction scrape for:', auctionLink);
    try {
      const response = await fetch('/api/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ auctionLink }),
      });

      console.log('📡 Response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ Scraping error:', errorData);
        throw new Error(`Failed to fetch auction data: ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();
      console.log('✅ Scraped data:', data);
      return data;
    } catch (error) {
      console.error('❌ Error in scraping service:', error);
      return { currentBid: 0, totalBids: 0 };
    }
  }
} 