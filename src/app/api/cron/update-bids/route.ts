import { NextResponse } from 'next/server';
import { listingService } from '@/services/listingService';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

interface Listing {
  id: string;
  auctionLink: string;
}

async function updateBidsForListing(listing: Listing) {
  try {
    const response = await fetch(listing.auctionLink, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const html = await response.text();
    
    const currentBidMatch = html.match(/Current\s+Leading\s+Bid:?\s*[$]?([0-9,]+(?:\.[0-9]{2})?)/i);
    const totalBidsMatch = html.match(/(\d+)\s*(?:total\s+)?bids?/i);
    
    if (!currentBidMatch) {
      console.warn(`Could not find current bid for listing ${listing.id}`);
      return;
    }

    const currentBid = parseFloat(currentBidMatch[1].replace(/,/g, ''));
    const totalBids = totalBidsMatch ? parseInt(totalBidsMatch[1]) : 0;

    // Update in Hygraph using the existing client
    const UPDATE_LISTING = `
      mutation UpdateListing($id: ID!, $currentBid: Float!, $totalBids: Int!) {
        updateListing(
          where: { id: $id }
          data: { 
            currentBid: $currentBid
            totalBids: $totalBids
          }
        ) {
          id
          currentBid
          totalBids
        }
      }
    `;

    await listingService.client.mutate({
      mutation: UPDATE_LISTING,
      variables: {
        id: listing.id,
        currentBid,
        totalBids
      }
    });

    console.log(`Updated listing ${listing.id}: $${currentBid}, ${totalBids} bids`);
  } catch (error) {
    console.error(`Failed to update listing ${listing.id}:`, error);
  }
}

export async function POST(request: Request) {
  try {
    // Verify the request is from Vercel Cron
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Get all active listings
    const listings = await listingService.getListings();
    
    // Update each listing
    await Promise.all(
      listings.map((listing: Listing) => updateBidsForListing(listing))
    );

    return NextResponse.json({ 
      success: true,
      message: `Updated ${listings.length} listings`
    });
  } catch (error) {
    console.error('Cron job failed:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to update bids' 
    }, { 
      status: 500 
    });
  }
} 