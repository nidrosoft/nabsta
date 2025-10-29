/**
 * ForSaleFeedScreen
 * Shows all items for sale with category filter pills and search
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Heart, Location, SearchNormal1 } from 'iconsax-react-native';
import { theme } from '../../theme';

interface ForSaleFeedScreenProps {
  onBack: () => void;
}

const CATEGORIES = [
  'All',
  'Cars & Vehicles',
  'Electronics',
  'Furniture',
  'Clothing & Shoes',
  'Home & Garden',
  'Sports & Outdoors',
  'Toys & Games',
  'Books & Media',
  'Pet Supplies',
  'Other',
];

const MOCK_ITEMS = [
  {
    id: '1',
    title: 'iPhone 13 Pro Max 256GB',
    price: 899,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80',
    location: 'San Francisco, CA',
    category: 'Electronics',
    isFeatured: true,
  },
  {
    id: '2',
    title: 'Modern Leather Sofa',
    price: 450,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80',
    location: 'Oakland, CA',
    category: 'Furniture',
    isFeatured: false,
  },
  {
    id: '3',
    title: 'Mountain Bike - Trek',
    price: 650,
    image: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=400&q=80',
    location: 'Berkeley, CA',
    category: 'Sports',
    isFeatured: true,
  },
  {
    id: '4',
    title: 'Vintage Camera Canon AE-1',
    price: 200,
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&q=80',
    location: 'San Jose, CA',
    category: 'Electronics',
    isFeatured: false,
  },
  {
    id: '5',
    title: 'Wooden Dining Table Set',
    price: 350,
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=400&q=80',
    location: 'Palo Alto, CA',
    category: 'Furniture',
    isFeatured: false,
  },
  {
    id: '6',
    title: 'Gaming Laptop - ASUS ROG',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&q=80',
    location: 'San Francisco, CA',
    category: 'Electronics',
    isFeatured: true,
  },
];

export const ForSaleFeedScreen: React.FC<ForSaleFeedScreenProps> = ({ onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = selectedCategory === 'All' 
    ? MOCK_ITEMS 
    : MOCK_ITEMS.filter(item => item.category === selectedCategory);

  const renderCategoryPill = (category: string) => {
    const isSelected = category === selectedCategory;
    return (
      <TouchableOpacity
        key={category}
        style={[styles.categoryPill, isSelected && styles.categoryPillSelected]}
        onPress={() => setSelectedCategory(category)}
        activeOpacity={0.7}
      >
        <Text style={[styles.categoryPillText, isSelected && styles.categoryPillTextSelected]}>
          {category}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item }: { item: typeof MOCK_ITEMS[0] }) => (
    <TouchableOpacity style={styles.itemCard} activeOpacity={0.9}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <TouchableOpacity style={styles.favoriteButton} activeOpacity={0.7}>
        <Heart size={20} color={theme.colors.text.white} variant="Bold" />
      </TouchableOpacity>
      {item.isFeatured && (
        <View style={styles.featuredBadge}>
          <Text style={styles.featuredText}>Featured</Text>
        </View>
      )}
      <View style={styles.itemInfo}>
        <Text style={styles.itemPrice}>${item.price.toLocaleString()}</Text>
        <Text style={styles.itemTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <View style={styles.locationRow}>
          <Location size={14} color={theme.colors.text.tertiary} variant="Bold" />
          <Text style={styles.locationText}>{item.location}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={theme.colors.primary.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientHeader}
      >
        <SafeAreaView edges={['top']}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.7}>
              <View style={styles.iconContainer}>
                <ArrowLeft size={20} color={theme.colors.text.primary} variant="Linear" />
              </View>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>For Sale</Text>
            <View style={styles.placeholder} />
          </View>
        </SafeAreaView>
      </LinearGradient>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <SearchNormal1 size={20} color={theme.colors.text.tertiary} variant="Linear" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for sale items..."
            placeholderTextColor={theme.colors.text.tertiary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Category Pills */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContent}
      >
        {CATEGORIES.map(renderCategoryPill)}
      </ScrollView>

      {/* Items List */}
      <FlatList
        data={filteredItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  gradientHeader: {
    paddingBottom: theme.spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
  },
  backButton: {
    padding: theme.spacing.xs,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.background.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.white,
  },
  placeholder: {
    width: 48,
  },
  searchContainer: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    backgroundColor: theme.colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.ui.border,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    gap: theme.spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.text.primary,
    padding: 0,
  },
  categoriesContainer: {
    maxHeight: 60,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.ui.border,
  },
  categoriesContent: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    gap: theme.spacing.sm,
  },
  categoryPill: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.background.secondary,
    marginRight: theme.spacing.sm,
  },
  categoryPillSelected: {
    backgroundColor: theme.colors.primary.start,
  },
  categoryPillText: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.secondary,
  },
  categoryPillTextSelected: {
    color: theme.colors.text.white,
  },
  listContent: {
    padding: theme.spacing.md,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md,
  },
  itemCard: {
    width: '48%',
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    ...theme.shadows.sm,
  },
  itemImage: {
    width: '100%',
    height: 160,
    backgroundColor: theme.colors.background.tertiary,
  },
  favoriteButton: {
    position: 'absolute',
    top: theme.spacing.sm,
    right: theme.spacing.sm,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  featuredBadge: {
    position: 'absolute',
    top: theme.spacing.sm,
    left: theme.spacing.sm,
    backgroundColor: theme.colors.primary.start,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.sm,
  },
  featuredText: {
    fontSize: theme.typography.fontSize.xs,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.white,
  },
  itemInfo: {
    padding: theme.spacing.sm,
  },
  itemPrice: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    marginBottom: 4,
  },
  itemTitle: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xs,
    lineHeight: 18,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.text.tertiary,
  },
});
