import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-03-21',
  useCdn: process.env.NODE_ENV === 'production'
}

export const client = createClient(config)

// Helper function for image URLs
const builder = imageUrlBuilder(client)
export const urlFor = (source: any) => builder.image(source)

// Define the Listing type
export type Listing = {
  _id: string;
  title: string;
  description: string;
  price: number;
  images: any[];
  location: string;
  createdAt: string;
  // Add any other fields you need
}

// Function to fetch all listings
export async function getListings(): Promise<Listing[]> {
  return client.fetch(`
    *[_type == "listing"] | order(createdAt desc) {
      _id,
      title,
      description,
      price,
      images,
      location,
      createdAt
    }
  `)
}

// Function to fetch a single listing by ID
export async function getListingById(id: string): Promise<Listing> {
  return client.fetch(`
    *[_type == "listing" && _id == $id][0] {
      _id,
      title,
      description,
      price,
      images,
      location,
      createdAt
    }
  `, { id })
} 