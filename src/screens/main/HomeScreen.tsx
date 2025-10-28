/**
 * HomeScreen
 * Main home screen with categories and for sale feed
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { SearchNormal1, Location, Setting4 } from 'iconsax-react-native';
import { SearchBar, ComingSoonBanner } from '../../components/common';
import { CategoryGrid, DiscoverBanner, ListingCard } from '../../components/home';
import { CategoryType } from '../../types';
import { theme } from '../../theme';

// Mock data for listings - 20 items with various images
const MOCK_LISTINGS = [
  {
    id: '1',
    title: 'Lawn Mower',
    price: 250,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
    location: 'Seattle, WA',
  },
  {
    id: '2',
    title: 'Vintage Camera',
    price: 180,
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&q=80',
    location: 'Seattle, WA',
  },
  {
    id: '3',
    title: 'Google Doorbell',
    price: 120,
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=400&q=80',
    location: 'Bellevue, WA',
  },
  {
    id: '4',
    title: 'Outdoor Storage Shed',
    price: 350,
    image: 'https://picsum.photos/400/300?random=4',
    location: 'Redmond, WA',
  },
  {
    id: '5',
    title: 'Queen Bed Frame',
    price: 200,
    image: 'https://picsum.photos/400/300?random=5',
    location: 'Seattle, WA',
  },
  {
    id: '6',
    title: 'Wooden Dresser',
    price: 150,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80',
    location: 'Tacoma, WA',
  },
  {
    id: '7',
    title: 'Mountain Bike',
    price: 450,
    image: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=400&q=80',
    location: 'Seattle, WA',
  },
  {
    id: '8',
    title: 'Coffee Table',
    price: 95,
    image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=400&q=80',
    location: 'Bellevue, WA',
  },
  {
    id: '9',
    title: 'Gaming Chair',
    price: 175,
    image: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=400&q=80',
    location: 'Redmond, WA',
  },
  {
    id: '10',
    title: 'Bookshelf',
    price: 85,
    image: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=400&q=80',
    location: 'Seattle, WA',
  },
  {
    id: '11',
    title: 'Electric Guitar',
    price: 320,
    image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&q=80',
    location: 'Tacoma, WA',
  },
  {
    id: '12',
    title: 'Desk Lamp',
    price: 45,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&q=80',
    location: 'Seattle, WA',
  },
  {
    id: '13',
    title: 'Running Shoes',
    price: 65,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80',
    location: 'Bellevue, WA',
  },
  {
    id: '14',
    title: 'Backpack',
    price: 55,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80',
    location: 'Redmond, WA',
  },
  {
    id: '15',
    title: 'Potted Plant',
    price: 25,
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&q=80',
    location: 'Seattle, WA',
  },
  {
    id: '16',
    title: 'Wall Art',
    price: 110,
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=400&q=80',
    location: 'Tacoma, WA',
  },
  {
    id: '17',
    title: 'Yoga Mat',
    price: 30,
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&q=80',
    location: 'Seattle, WA',
  },
  {
    id: '18',
    title: 'Headphones',
    price: 140,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80',
    location: 'Bellevue, WA',
  },
  {
    id: '19',
    title: 'Skateboard',
    price: 90,
    image: 'https://images.unsplash.com/photo-1547447134-cd3f5c716030?w=400&q=80',
    location: 'Redmond, WA',
  },
  {
    id: '20',
    title: 'Watch',
    price: 220,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80',
    location: 'Seattle, WA',
  },
  {
    id: '21',
    title: 'Sunglasses',
    price: 85,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&q=80',
    location: 'Bellevue, WA',
  },
  {
    id: '22',
    title: 'Keyboard',
    price: 125,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80',
    location: 'Redmond, WA',
  },
  {
    id: '23',
    title: 'Sneakers',
    price: 95,
    image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&q=80',
    location: 'Seattle, WA',
  },
  {
    id: '24',
    title: 'Jacket',
    price: 160,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80',
    location: 'Tacoma, WA',
  },
  {
    id: '25',
    title: 'Hat',
    price: 35,
    image: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=400&q=80',
    location: 'Seattle, WA',
  },
  {
    id: '26',
    title: 'Tablet',
    price: 380,
    image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400&q=80',
    location: 'Bellevue, WA',
  },
  {
    id: '27',
    title: 'Speaker',
    price: 145,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&q=80',
    location: 'Redmond, WA',
  },
  {
    id: '28',
    title: 'Rug',
    price: 75,
    image: 'https://images.unsplash.com/photo-1600166898405-da9535204843?w=400&q=80',
    location: 'Seattle, WA',
  },
  {
    id: '29',
    title: 'Mirror',
    price: 65,
    image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=400&q=80',
    location: 'Tacoma, WA',
  },
  {
    id: '30',
    title: 'Candle Set',
    price: 45,
    image: 'https://images.unsplash.com/photo-1602874801006-e7d7a9e4f9b8?w=400&q=80',
    location: 'Seattle, WA',
  },
];

interface HomeScreenProps {
  onCategoryPress: (category: CategoryType) => void;
  onListingPress?: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onCategoryPress, onListingPress }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    // TODO: Fetch fresh data from API
    await new Promise(resolve => setTimeout(resolve, 1500));
    setRefreshing(false);
  };
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null);

  const handleCategoryPress = (category: CategoryType) => {
    setSelectedCategory(category);
    onCategoryPress(category);
  };

  const handleLocalEventsPress = () => {
    // TODO: Navigate to local events
    console.log('Navigate to local events');
  };

  const handleListingPress = (listingId: string) => {
    // TODO: Navigate to listing detail
    console.log('Navigate to listing:', listingId);
  };

  const handleFilterPress = () => {
    // TODO: Open filter modal
    console.log('Open filter');
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={theme.colors.primary.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientHeader}
      >
        <SafeAreaView edges={['top']}>
          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <SearchBar
              placeholder="Search OfferUp"
              value={searchQuery}
              onChangeText={setSearchQuery}
              location="Seattle"
              searchIcon={<SearchNormal1 size={20} color={theme.colors.text.tertiary} />}
              locationIcon={<Location size={18} color={theme.colors.text.white} variant="Bold" />}
            />
          </View>
        </SafeAreaView>
      </LinearGradient>

      {/* Category Grid - Positioned above gradient */}
      <View style={styles.categorySection}>
        <CategoryGrid onCategoryPress={handleCategoryPress} />
      </View>

      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.colors.primary.start}
            colors={[theme.colors.primary.start]}
          />
        }
      >
        {/* Discover Banner */}
        <DiscoverBanner onPress={handleLocalEventsPress} />

        {/* For Sale Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>For sale</Text>
            <TouchableOpacity onPress={handleFilterPress} activeOpacity={0.7}>
              <Setting4 size={24} color={theme.colors.text.primary} />
            </TouchableOpacity>
          </View>

          {/* Listings Grid - 2 column with minimal spacing */}
          <View style={styles.listingsGrid}>
            {MOCK_LISTINGS.map((listing, index) => (
              <View key={listing.id} style={styles.listingItem}>
                <ListingCard 
                  listing={listing} 
                  onPress={onListingPress}
                  index={index}
                />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  gradientHeader: {
    paddingBottom: 60, // Increased by 20% more (was 50, now 60)
  },
  searchContainer: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.sm,
  },
  categorySection: {
    position: 'absolute',
    top: 135, // Pushed down 50% more (was 90, now 135)
    left: 0,
    right: 0,
    zIndex: 10, // Layer above gradient
    paddingHorizontal: theme.spacing.md,
  },
  scrollView: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
    marginTop: 160, // Add space for absolutely positioned categories
  },
  section: {
    marginTop: theme.spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.xxl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
  },
  listingsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -2, // Minimal negative margin
  },
  listingItem: {
    width: '33.33%', // 3 columns
    padding: 2, // Minimal spacing (4px total between items)
  },
});
