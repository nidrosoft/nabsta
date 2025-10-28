/**
 * Category definitions and configurations
 */

import { Category } from '../types';
import { colors } from '../theme';

export const CATEGORIES: Category[] = [
  {
    id: 'forSale',
    name: 'For sale',
    icon: 'tag',
    color: colors.category.forSale,
    isComingSoon: false,
    subCategories: [
      { id: 'cars', name: 'Cars & Vehicles', parentCategory: 'forSale' },
      { id: 'electronics', name: 'Electronics', parentCategory: 'forSale' },
      { id: 'furniture', name: 'Furniture', parentCategory: 'forSale' },
      { id: 'clothing', name: 'Clothing & Shoes', parentCategory: 'forSale' },
      { id: 'home', name: 'Home & Garden', parentCategory: 'forSale' },
      { id: 'sports', name: 'Sports & Outdoors', parentCategory: 'forSale' },
      { id: 'toys', name: 'Toys & Games', parentCategory: 'forSale' },
      { id: 'books', name: 'Books & Media', parentCategory: 'forSale' },
      { id: 'pets', name: 'Pet Supplies', parentCategory: 'forSale' },
      { id: 'other', name: 'Other', parentCategory: 'forSale' },
    ],
  },
  {
    id: 'jobs',
    name: 'Jobs',
    icon: 'briefcase',
    color: colors.category.jobs,
    isComingSoon: true,
    subCategories: [
      { id: 'tech', name: 'Technology', parentCategory: 'jobs' },
      { id: 'healthcare', name: 'Healthcare', parentCategory: 'jobs' },
      { id: 'retail', name: 'Retail', parentCategory: 'jobs' },
      { id: 'hospitality', name: 'Hospitality', parentCategory: 'jobs' },
      { id: 'construction', name: 'Construction', parentCategory: 'jobs' },
      { id: 'education', name: 'Education', parentCategory: 'jobs' },
      { id: 'finance', name: 'Finance', parentCategory: 'jobs' },
      { id: 'creative', name: 'Creative', parentCategory: 'jobs' },
    ],
  },
  {
    id: 'rentals',
    name: 'Rentals',
    icon: 'home',
    color: colors.category.rentals,
    isComingSoon: true,
    subCategories: [
      { id: 'apartments', name: 'Apartments', parentCategory: 'rentals' },
      { id: 'houses', name: 'Houses', parentCategory: 'rentals' },
      { id: 'rooms', name: 'Rooms', parentCategory: 'rentals' },
      { id: 'commercial', name: 'Commercial', parentCategory: 'rentals' },
      { id: 'vacation', name: 'Vacation Rentals', parentCategory: 'rentals' },
    ],
  },
  {
    id: 'coupons',
    name: 'Coupons',
    icon: 'ticket',
    color: colors.category.coupons,
    isComingSoon: true,
    subCategories: [
      { id: 'food', name: 'Food & Dining', parentCategory: 'coupons' },
      { id: 'shopping', name: 'Shopping', parentCategory: 'coupons' },
      { id: 'entertainment', name: 'Entertainment', parentCategory: 'coupons' },
      { id: 'travel', name: 'Travel', parentCategory: 'coupons' },
      { id: 'services', name: 'Services', parentCategory: 'coupons' },
    ],
  },
  {
    id: 'services',
    name: 'Services',
    icon: 'tool',
    color: colors.category.services,
    isComingSoon: true,
    subCategories: [
      { id: 'cleaning', name: 'Cleaning', parentCategory: 'services' },
      { id: 'moving', name: 'Moving', parentCategory: 'services' },
      { id: 'repair', name: 'Repair & Maintenance', parentCategory: 'services' },
      { id: 'tutoring', name: 'Tutoring', parentCategory: 'services' },
      { id: 'beauty', name: 'Beauty & Wellness', parentCategory: 'services' },
      { id: 'photography', name: 'Photography', parentCategory: 'services' },
    ],
  },
  {
    id: 'news',
    name: 'News',
    icon: 'newspaper',
    color: colors.category.news,
    isComingSoon: true,
    subCategories: [
      { id: 'local', name: 'Local News', parentCategory: 'news' },
      { id: 'events', name: 'Events', parentCategory: 'news' },
      { id: 'community', name: 'Community', parentCategory: 'news' },
      { id: 'announcements', name: 'Announcements', parentCategory: 'news' },
    ],
  },
];

export const getCategoryById = (id: string): Category | undefined => {
  return CATEGORIES.find(cat => cat.id === id);
};

export const getSubCategoriesByParent = (parentId: string) => {
  const category = getCategoryById(parentId);
  return category?.subCategories || [];
};
