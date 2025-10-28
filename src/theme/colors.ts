/**
 * Color palette for NABSTA
 * Primary gradient inspired by Tinder's hot pink to orange
 */

export const colors = {
  // Primary gradient colors
  primary: {
    start: '#FF5D62', // Hot pink/coral
    end: '#FD3972',   // Deep pink
    gradient: ['#FF5D62', '#FD3972'] as const,
  },
  
  // Background colors
  background: {
    primary: '#FFFFFF',
    secondary: '#F8F9FA',
    tertiary: '#F1F3F5',
  },
  
  // Text colors
  text: {
    primary: '#000000',
    secondary: '#6C757D',
    tertiary: '#ADB5BD',
    white: '#FFFFFF',
  },
  
  // UI element colors
  ui: {
    border: '#E9ECEF',
    shadow: 'rgba(0, 0, 0, 0.08)',
    overlay: 'rgba(0, 0, 0, 0.5)',
    success: '#28A745',
    error: '#DC3545',
    warning: '#FFC107',
    info: '#17A2B8',
  },
  
  // Category colors (for visual distinction)
  category: {
    forSale: '#10B981',
    jobs: '#3B82F6',
    rentals: '#8B5CF6',
    coupons: '#F59E0B',
    services: '#EC4899',
    news: '#6366F1',
  },
};

export type Colors = typeof colors;
