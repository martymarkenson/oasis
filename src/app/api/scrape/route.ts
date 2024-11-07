import { NextResponse } from 'next/server';
import { BrowserService } from '@/services/browserService';

export const maxDuration = 30;

export async function POST(request: Request) {
  console.log('🟢 API Route: Starting request');
  
  try {
    const body = await request.json();
    console.log('📥 Received request body:', body);
    
    const { url } = body;
    if (!url) {
      console.log('❌ No URL provided');
      throw new Error('URL is required');
    }
    
    console.log('🌐 Starting scrape for URL:', url);
    const browserService = BrowserService.getInstance();
    
    const data = await browserService.scrapeData(url, {
      currentBid: {
        selector: 'dt:has-text("Current Leading Bid:") + dd',
        transform: (value: string) => {
          console.log('💰 Raw current bid:', value);
          return parseFloat(value.replace(/[^0-9.]/g, '')) || 0;
        }
      },
      totalBids: {
        selector: 'dd a[href*="bidhistory"]',
        transform: (value: string) => {
          console.log('🔢 Raw total bids:', value);
          return parseInt(value.replace(/[^0-9]/g, '')) || 0;
        }
      },
      auctionLink: {
        selector: 'meta[property="og:url"]',
        attribute: 'content'
      }
    });

    console.log('✅ Scrape completed successfully:', data);

    return NextResponse.json({
      success: true,
      data,
      _debug: {
        url,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error: unknown) {
    console.error('Detailed error:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        url,
        timestamp: new Date().toISOString()
    });
    
    return NextResponse.json({ 
        success: false,
        error: 'Failed to scrape data',
        _debug: {
            errorMessage: error instanceof Error ? error.message : 'Unknown error',
            errorStack: error instanceof Error ? error.stack : undefined,
            url,
            timestamp: new Date().toISOString()
        }
    }, { 
        status: 500 
    });
  }
} 