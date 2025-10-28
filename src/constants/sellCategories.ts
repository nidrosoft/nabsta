/**
 * Sell Flow Categories and Subcategories
 * Comprehensive category structure for listing items
 */

export interface Subcategory {
  id: string;
  name: string;
}

export interface Category {
  id: string;
  name: string;
  subcategories: Subcategory[];
}

export const SELL_CATEGORIES: Category[] = [
  {
    id: 'electronics',
    name: 'Electronics & Media',
    subcategories: [
      { id: 'computers', name: 'Computers & Laptops' },
      { id: 'phones', name: 'Cell Phones & Accessories' },
      { id: 'tablets', name: 'Tablets & E-readers' },
      { id: 'cameras', name: 'Cameras & Photography' },
      { id: 'audio', name: 'Audio & Headphones' },
      { id: 'tv', name: 'TVs & Video' },
      { id: 'gaming', name: 'Video Games & Consoles' },
      { id: 'wearables', name: 'Smart Watches & Wearables' },
      { id: 'components', name: 'Computer Components' },
      { id: 'networking', name: 'Networking Equipment' },
      { id: 'other-electronics', name: 'Other - Electronics' },
    ],
  },
  {
    id: 'home-garden',
    name: 'Home & Garden',
    subcategories: [
      { id: 'furniture', name: 'Furniture' },
      { id: 'household', name: 'Household Items' },
      { id: 'appliances', name: 'Appliances' },
      { id: 'kitchen-dining', name: 'Kitchen & Dining' },
      { id: 'bathroom', name: 'Bathroom' },
      { id: 'tools-machinery', name: 'Tools & Machinery' },
      { id: 'home-improvement', name: 'Home Improvement' },
      { id: 'garden-decoration', name: 'Garden Decoration' },
      { id: 'plants-seeds', name: 'Plants & Seeds' },
      { id: 'feeders-birdhouses', name: 'Feeders & Birdhouses' },
      { id: 'patio-furniture', name: 'Patio Furniture' },
      { id: 'fire-pits', name: 'Fire Pits & Wood' },
      { id: 'grills', name: 'Grills & Accessories' },
      { id: 'outdoor-lighting', name: 'Outdoor Lighting' },
      { id: 'hammocks-swings', name: 'Hammocks & Swings' },
      { id: 'gardening-tools', name: 'Gardening Tools' },
      { id: 'watering-hoses', name: 'Watering & Hoses' },
      { id: 'lawn-mowers', name: 'Lawn Mowers' },
      { id: 'home-decor', name: 'Home Decor' },
      { id: 'other-home', name: 'Other - Home & Garden' },
    ],
  },
  {
    id: 'clothing',
    name: 'Clothing, Shoes, & Accessories',
    subcategories: [
      { id: 'mens-clothing', name: "Men's Clothing" },
      { id: 'womens-clothing', name: "Women's Clothing" },
      { id: 'mens-shoes', name: "Men's Shoes" },
      { id: 'womens-shoes', name: "Women's Shoes" },
      { id: 'bags-luggage', name: 'Bags & Luggage' },
      { id: 'jewelry', name: 'Jewelry' },
      { id: 'watches', name: 'Watches' },
      { id: 'accessories', name: 'Accessories' },
      { id: 'costumes', name: 'Costumes' },
      { id: 'other-clothing', name: 'Other - Clothing' },
    ],
  },
  {
    id: 'baby-kids',
    name: 'Baby & Kids',
    subcategories: [
      { id: 'baby-clothing', name: 'Baby Clothing' },
      { id: 'kids-clothing', name: 'Kids Clothing' },
      { id: 'baby-gear', name: 'Baby Gear' },
      { id: 'strollers', name: 'Strollers & Car Seats' },
      { id: 'toys', name: 'Toys' },
      { id: 'books', name: 'Books & Learning' },
      { id: 'nursery', name: 'Nursery & Decor' },
      { id: 'feeding', name: 'Feeding & High Chairs' },
      { id: 'diapering', name: 'Diapering & Potty' },
      { id: 'other-baby', name: 'Other - Baby & Kids' },
    ],
  },
  {
    id: 'vehicles',
    name: 'Vehicles',
    subcategories: [
      { id: 'cars', name: 'Cars' },
      { id: 'trucks', name: 'Trucks' },
      { id: 'suvs', name: 'SUVs' },
      { id: 'motorcycles', name: 'Motorcycles' },
      { id: 'boats', name: 'Boats' },
      { id: 'rvs', name: 'RVs & Campers' },
      { id: 'atvs', name: 'ATVs & UTVs' },
      { id: 'trailers', name: 'Trailers' },
      { id: 'auto-parts', name: 'Auto Parts & Accessories' },
      { id: 'other-vehicles', name: 'Other - Vehicles' },
    ],
  },
  {
    id: 'toys-games',
    name: 'Toys, Games, & Hobbies',
    subcategories: [
      { id: 'action-figures', name: 'Action Figures & Collectibles' },
      { id: 'board-games', name: 'Board Games & Puzzles' },
      { id: 'building-toys', name: 'Building Toys' },
      { id: 'dolls', name: 'Dolls & Accessories' },
      { id: 'outdoor-toys', name: 'Outdoor Toys' },
      { id: 'rc-toys', name: 'RC & Drones' },
      { id: 'arts-crafts', name: 'Arts & Crafts' },
      { id: 'musical-instruments', name: 'Musical Instruments' },
      { id: 'hobby-supplies', name: 'Hobby Supplies' },
      { id: 'other-toys', name: 'Other - Toys & Hobbies' },
    ],
  },
  {
    id: 'sports-outdoors',
    name: 'Sports & Outdoors',
    subcategories: [
      { id: 'exercise-fitness', name: 'Exercise & Fitness' },
      { id: 'bikes', name: 'Bicycles' },
      { id: 'camping', name: 'Camping & Hiking' },
      { id: 'fishing', name: 'Fishing' },
      { id: 'hunting', name: 'Hunting' },
      { id: 'water-sports', name: 'Water Sports' },
      { id: 'winter-sports', name: 'Winter Sports' },
      { id: 'team-sports', name: 'Team Sports' },
      { id: 'golf', name: 'Golf' },
      { id: 'other-sports', name: 'Other - Sports' },
    ],
  },
  {
    id: 'collectibles-art',
    name: 'Collectibles & Art',
    subcategories: [
      { id: 'antiques', name: 'Antiques' },
      { id: 'art', name: 'Art & Paintings' },
      { id: 'coins', name: 'Coins & Currency' },
      { id: 'stamps', name: 'Stamps' },
      { id: 'sports-memorabilia', name: 'Sports Memorabilia' },
      { id: 'vintage', name: 'Vintage Items' },
      { id: 'other-collectibles', name: 'Other - Collectibles' },
    ],
  },
  {
    id: 'pet-supplies',
    name: 'Pet Supplies',
    subcategories: [
      { id: 'dog-supplies', name: 'Dog Supplies' },
      { id: 'cat-supplies', name: 'Cat Supplies' },
      { id: 'bird-supplies', name: 'Bird Supplies' },
      { id: 'fish-aquarium', name: 'Fish & Aquarium' },
      { id: 'small-pets', name: 'Small Pet Supplies' },
      { id: 'reptile-supplies', name: 'Reptile Supplies' },
      { id: 'pet-furniture', name: 'Pet Furniture' },
      { id: 'other-pet', name: 'Other - Pet Supplies' },
    ],
  },
  {
    id: 'health-beauty',
    name: 'Health & Beauty',
    subcategories: [
      { id: 'skincare', name: 'Skincare' },
      { id: 'makeup', name: 'Makeup' },
      { id: 'hair-care', name: 'Hair Care' },
      { id: 'fragrances', name: 'Fragrances' },
      { id: 'bath-body', name: 'Bath & Body' },
      { id: 'health-wellness', name: 'Health & Wellness' },
      { id: 'vitamins', name: 'Vitamins & Supplements' },
      { id: 'other-beauty', name: 'Other - Health & Beauty' },
    ],
  },
  {
    id: 'wedding',
    name: 'Wedding',
    subcategories: [
      { id: 'wedding-dresses', name: 'Wedding Dresses' },
      { id: 'bridesmaid-dresses', name: 'Bridesmaid Dresses' },
      { id: 'wedding-decor', name: 'Wedding Decor' },
      { id: 'invitations', name: 'Invitations & Stationery' },
      { id: 'wedding-accessories', name: 'Wedding Accessories' },
      { id: 'other-wedding', name: 'Other - Wedding' },
    ],
  },
  {
    id: 'business-equipment',
    name: 'Business Equipment',
    subcategories: [
      { id: 'office-furniture', name: 'Office Furniture' },
      { id: 'office-supplies', name: 'Office Supplies' },
      { id: 'printers-scanners', name: 'Printers & Scanners' },
      { id: 'pos-systems', name: 'POS Systems' },
      { id: 'industrial-equipment', name: 'Industrial Equipment' },
      { id: 'restaurant-equipment', name: 'Restaurant Equipment' },
      { id: 'other-business', name: 'Other - Business Equipment' },
    ],
  },
  {
    id: 'tickets',
    name: 'Tickets',
    subcategories: [
      { id: 'concert-tickets', name: 'Concert Tickets' },
      { id: 'sports-tickets', name: 'Sports Tickets' },
      { id: 'theater-tickets', name: 'Theater Tickets' },
      { id: 'event-tickets', name: 'Event Tickets' },
      { id: 'travel-vouchers', name: 'Travel Vouchers' },
      { id: 'other-tickets', name: 'Other - Tickets' },
    ],
  },
  {
    id: 'general',
    name: 'General',
    subcategories: [
      { id: 'free-stuff', name: 'Free Stuff' },
      { id: 'other', name: 'Other' },
    ],
  },
];

export const CONDITION_OPTIONS = [
  { id: 'new', name: 'New' },
  { id: 'reconditioned', name: 'Reconditioned/Certified' },
  { id: 'open-box', name: 'Open box (never used)' },
  { id: 'used-normal', name: 'Used (normal wear)' },
  { id: 'for-parts', name: 'For parts' },
  { id: 'other', name: 'Other (see description)' },
];

export const MATERIAL_OPTIONS = [
  { id: 'metal', name: 'Metal' },
  { id: 'plastic', name: 'Plastic' },
  { id: 'wood', name: 'Wood' },
  { id: 'aluminum', name: 'Aluminum' },
  { id: 'stone', name: 'Stone' },
  { id: 'iron', name: 'Iron' },
  { id: 'ceramic', name: 'Ceramic' },
  { id: 'brick', name: 'Brick' },
  { id: 'concrete', name: 'Concrete' },
  { id: 'bamboo', name: 'Bamboo' },
  { id: 'glass', name: 'Glass' },
  { id: 'fabric', name: 'Fabric' },
  { id: 'leather', name: 'Leather' },
  { id: 'rubber', name: 'Rubber' },
];

export const FEATURE_OPTIONS = [
  { id: 'custom-handmade', name: 'Custom & Handmade' },
  { id: 'frost-protected', name: 'Frost-protected' },
  { id: 'solar-powered', name: 'Solar-powered' },
  { id: 'weatherproof', name: 'Weatherproof' },
  { id: 'eco-friendly', name: 'Eco-friendly' },
  { id: 'energy-efficient', name: 'Energy-efficient' },
  { id: 'wireless', name: 'Wireless' },
  { id: 'bluetooth', name: 'Bluetooth' },
  { id: 'smart-home', name: 'Smart Home Compatible' },
  { id: 'portable', name: 'Portable' },
];
