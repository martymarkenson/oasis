import { NextApiRequest, NextApiResponse } from 'next';
import puppeteer from 'puppeteer-core';
import chrome from 'chrome-aws-lambda';

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
    const options = process.env.NODE_ENV === 'production'
      ? {
          args: chrome.args,
          executablePath: await chrome.executablePath,
          headless: chrome.headless
        }
      : {
          args: ['--no-sandbox', '--disable-setuid-sandbox'],
          executablePath: process.platform === 'win32'
            ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
            : process.platform === 'linux'
            ? '/usr/bin/google-chrome'
            : '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
        };

    const browser = await puppeteer.launch(options);
    
    console.log('🌐 Browser launched successfully');
    const page = await browser.newPage();
    
    // Add more verbose logging
    console.log('📄 Navigating to:', auctionLink);
    await page.goto(auctionLink, {
      waitUntil: 'networkidle0',
      timeout: 30000
    });
    console.log('✅ Page loaded successfully');

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
    console.error('❌ Detailed error:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    return res.status(500).json({ 
      error: 'Failed to scrape auction data', 
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
} 