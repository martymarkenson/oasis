import { NextApiRequest, NextApiResponse } from 'next';
import puppeteer from 'puppeteer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { auctionLink } = req.body;
  console.log('🔍 Scraping auction:', auctionLink);

  if (!auctionLink) {
    return res.status(400).json({ error: 'Auction link is required' });
  }

  try {
    const browser = await puppeteer.launch({ 
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.goto(auctionLink);

    // Use evaluate to run JavaScript in the context of the page
    const data = await page.evaluate(() => {
      // Find the bid amount using a more general selector and then filter for USD
      const priceElements = Array.from(document.querySelectorAll('dl dd'));
      const bidElement = priceElements.find(el => el.textContent?.includes('USD'));
      const currentBidText = bidElement?.textContent?.trim() || '0';
      
      // Find total bids
      const bidHistoryElement = document.querySelector('a[href*="bidhistory"]');
      const totalBidsText = bidHistoryElement?.textContent?.trim() || '0';

      console.log('Raw bid text:', currentBidText);
      console.log('Raw total bids text:', totalBidsText);

      return {
        currentBidText,
        totalBidsText
      };
    });

    // Process the extracted data
    const currentBid = parseFloat(data.currentBidText.replace(/[^0-9.]/g, '')) || 0;
    const totalBids = parseInt(data.totalBidsText.replace(/[^0-9]/g, '')) || 0;

    console.log('💰 Scraped data:', { currentBid, totalBids });

    await browser.close();
    return res.status(200).json({ currentBid, totalBids });
  } catch (error) {
    console.error('❌ Error scraping auction data:', error);
    return res.status(500).json({ 
      error: 'Failed to scrape auction data', 
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
} 