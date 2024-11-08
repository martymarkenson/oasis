import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

// Initialize Apollo Client
const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT,
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_HYGRAPH_AUTH_TOKEN}`,
  },
});

const GET_LISTINGS = gql`
query GetAllListings {
  listingsConnection {
    edges {
      node {
        id
        title
        mainImage {
          url
        }
        currentBid
        marketValue
        endDate
        location
        description
        charity
        totalBids
        createdAt
        updatedAt
        auctionLink
      }
    }
  }
}
`;



export async function getListings() {
  const { data } = await client.query({
    query: GET_LISTINGS,
    variables: {
      "first": 15,
      "skip": 0,
      "orderBy": "updatedAt_DESC",
      "schedule_first": 0,
      "schedule_where_operation": {
        "status": "PENDING"
      }
    },
  });
  return data.listingsConnection.edges.map((edge: { node: Listing }) => edge.node);
}


interface Listing {
  id: string;
  title: string;
  slug: string;
  mainImage: {
    id: string;
    fileName: string;
    url: string;
    width: number;
    height: number;
  };
  currentBid: number;
  startingBid: number;
  marketValue: number;
  endDate: string;
  location: string;
  description: string;
  category: string;
  charity: string;
  createdAt: string;
  updatedAt: string;
  documentInStages: {
    stage: string;
    publishedAt: string;
  }[];
}
export class ListingService {
  public client: any; // Replace 'any' with your actual GraphQL client type
  
  constructor(client: any) {
    this.client = client;
  }

  async getListing(slug: string) {
    const query = gql`
      query GetAllListings {
        listingsConnection {
          edges {
            node {
              id
              title
              slug
              mainImage {
                url
              }
              currentBid
              startingBid
              marketValue
              endDate
              location
              description
              charity
              createdAt
              updatedAt
            }
          }
        }
      }
    `;
    
    try {
      const { data } = await this.client.query({
        query: query,
        variables: { slug },
      });
      return data.listing;
    } catch (error) {
      console.error('Error fetching listing:', error);
      if (query.loc) {
        console.error('Query:', query.loc.source.body); // Log the query
      }
      console.error('Variables:', { slug }); // Log the variables
      return null;
    }
  }

  async getListings() {
    const { data } = await this.client.query({
      query: GET_LISTINGS,
      variables: {
        "first": 15,
        "skip": 0,
        "orderBy": "updatedAt_DESC",
        "schedule_first": 0,
        "schedule_where_operation": {
          "status": "PENDING"
        }
      },
    });
    return data.listingsConnection.edges.map((edge: { node: Listing }) => edge.node);
  }

  async updateListing(id: string, currentBid: number, totalBids: number) {
    const UPDATE_LISTING = gql`
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

    try {
      const { data } = await this.client.mutate({
        mutation: UPDATE_LISTING,
        variables: {
          id,
          currentBid,
          totalBids
        }
      });
      return data.updateListing;
    } catch (error) {
      console.error('Error updating listing:', error);
      throw error;
    }
  }
}

export const listingService = new ListingService(client);
