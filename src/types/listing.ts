/**
 * Listing Types
 * Types for creating and managing listings
 */

export type ListingCondition = 'new' | 'like_new' | 'good' | 'fair' | 'poor';
export type ShippingOption = 'pickup' | 'meetup' | 'shipping';
export type ContactMethod = 'app' | 'phone' | 'text';

export interface ListingFormData {
  // Step 1: Post (Photos + Title + Description)
  photos: string[];
  title: string;
  description: string;
  
  // Step 2: Details
  category: string;
  subcategory?: string;
  condition: string;
  materials?: string[];
  features?: string[];
  brand?: string;
  isBusiness: boolean;
  
  // Business Details (if isBusiness is true)
  businessName?: string;
  businessWebsite?: string;
  businessHours?: {
    monday?: string;
    tuesday?: string;
    wednesday?: string;
    thursday?: string;
    friday?: string;
    saturday?: string;
    sunday?: string;
  };
  
  // Step 3: Pricing
  price: string;
  isFree: boolean;
  isNegotiable: boolean;
  isFirmOnPrice: boolean;
  quantity: number;
  
  // Step 4: Location
  location: {
    city: string;
    state: string;
    zipCode: string;
  };
  contactMethods: ContactMethod[];
  phoneNumber: string;
  
  // Step 5: Review
  agreedToTerms: boolean;
  promoteOptions: {
    featured: boolean;
    boosted: boolean;
  };
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export const LISTING_CATEGORIES: Category[] = [
  { id: 'electronics', name: 'Electronics', icon: '📱' },
  { id: 'furniture', name: 'Furniture', icon: '🛋️' },
  { id: 'clothing', name: 'Clothing', icon: '👕' },
  { id: 'sports', name: 'Sports & Outdoors', icon: '⚽' },
  { id: 'books', name: 'Books & Media', icon: '📚' },
  { id: 'home', name: 'Home & Garden', icon: '🏡' },
  { id: 'toys', name: 'Toys & Games', icon: '🎮' },
  { id: 'tools', name: 'Tools', icon: '🔧' },
  { id: 'automotive', name: 'Automotive', icon: '🚗' },
  { id: 'other', name: 'Other', icon: '📦' },
];

export const CONDITION_OPTIONS = [
  { value: 'new', label: 'New', description: 'Never used, in original packaging' },
  { value: 'like_new', label: 'Like New', description: 'Lightly used, excellent condition' },
  { value: 'good', label: 'Good', description: 'Used, normal wear and tear' },
  { value: 'fair', label: 'Fair', description: 'Heavily used, some damage' },
  { value: 'poor', label: 'Poor', description: 'Significant wear, may need repairs' },
] as const;
