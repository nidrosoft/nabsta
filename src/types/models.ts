/**
 * Data model type definitions
 */

import { CategoryType } from './navigation';

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
  location?: Location;
  createdAt: Date;
  // Seller stats
  sellerStats?: SellerStats;
  // Buyer stats
  buyerStats?: BuyerStats;
}

export interface SellerStats {
  totalSales: number;
  rating: number;
  reviewCount: number;
  responseRate: number;
  responseTime: string; // e.g., "within 1 hour"
}

export interface BuyerStats {
  totalPurchases: number;
  rating: number;
  reviewCount: number;
}

export interface Location {
  city: string;
  state: string;
  country: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  category: CategoryType;
  subCategory: string;
  images: string[];
  location: Location;
  seller: User;
  createdAt: Date;
  updatedAt: Date;
  status: 'active' | 'sold' | 'pending' | 'archived';
  views: number;
  favorites: number;
}

export interface JobListing extends Omit<Listing, 'price'> {
  salary?: {
    min: number;
    max: number;
    type: 'hourly' | 'annual';
  };
  jobType: 'full-time' | 'part-time' | 'contract' | 'internship';
  company: string;
}

export interface RentalListing extends Listing {
  rentalType: 'apartment' | 'house' | 'room' | 'commercial';
  bedrooms?: number;
  bathrooms?: number;
  squareFeet?: number;
  availableFrom: Date;
}

export interface Conversation {
  id: string;
  listing: Listing;
  participants: User[];
  lastMessage: Message;
  unreadCount: number;
  type: 'buying' | 'selling';
}

export interface Message {
  id: string;
  conversationId: string;
  sender: User;
  content: string;
  createdAt: Date;
  read: boolean;
}

export interface Category {
  id: CategoryType;
  name: string;
  icon: string;
  color: string;
  subCategories: SubCategory[];
  isComingSoon: boolean;
}

export interface SubCategory {
  id: string;
  name: string;
  icon?: string;
  parentCategory: CategoryType;
}
