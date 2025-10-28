/**
 * ListingsScreen
 * Manage user's listings - view, edit, archive, delete
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as Haptics from 'expo-haptics';
import { ArchiveBox, InfoCircle } from 'iconsax-react-native';
import { 
  ListingActionsModal, 
  MarkAsSoldModal, 
  ConfirmDialog, 
  ListingInsightsModal, 
  PromoteListingModal, 
  FilterSortModal,
  ListingsList,
  ListingsFilters,
  ListingsToolbar,
} from '../../components/listings';
import { Listing } from '../../services';
import { MainTabParamList } from '../../types';
import { theme } from '../../theme';

type NavigationProp = NativeStackNavigationProp<MainTabParamList>;

// Mock data for user's listings
const MOCK_LISTINGS: Listing[] = [
  {
    id: '1',
    title: 'iPhone 13 Pro Max 256GB',
    price: 899,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80',
    status: 'active',
    views: 124,
    saves: 8,
    messages: 3,
    postedDate: '2 days ago',
    location: 'San Francisco, CA',
    userId: 'user1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Vintage Camera',
    price: 180,
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&q=80',
    status: 'active',
    views: 89,
    saves: 5,
    messages: 2,
    postedDate: '5 days ago',
    location: 'Los Angeles, CA',
    userId: 'user1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Mountain Bike',
    price: 450,
    image: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=400&q=80',
    status: 'sold',
    views: 156,
    saves: 12,
    messages: 8,
    postedDate: '1 week ago',
    soldPrice: 420,
    location: 'San Diego, CA',
    userId: 'user1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Gaming Chair',
    price: 175,
    image: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=400&q=80',
    status: 'active',
    views: 45,
    saves: 3,
    messages: 1,
    postedDate: '3 days ago',
    location: 'San Jose, CA',
    userId: 'user1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'Wooden Dresser',
    price: 150,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80',
    status: 'archived',
    views: 67,
    saves: 4,
    messages: 2,
    postedDate: '2 weeks ago',
    location: 'Oakland, CA',
    userId: 'user1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

type ListingStatus = 'all' | 'active' | 'sold' | 'archived';

export const ListingsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [selectedTab, setSelectedTab] = useState<ListingStatus>('all');
  const [refreshing, setRefreshing] = useState(false);
  const [selectedListing, setSelectedListing] = useState<typeof MOCK_LISTINGS[0] | null>(null);
  const [showActionsModal, setShowActionsModal] = useState(false);
  const [showMarkSoldModal, setShowMarkSoldModal] = useState(false);
  const [showArchiveDialog, setShowArchiveDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showInsightsModal, setShowInsightsModal] = useState(false);
  const [showPromoteModal, setShowPromoteModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [multiSelectMode, setMultiSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  // Filter and sort listings
  const filteredListings = MOCK_LISTINGS
    .filter(listing => {
      // Filter by tab
      if (selectedTab !== 'all' && listing.status !== selectedTab) return false;
      
      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          listing.title.toLowerCase().includes(query) ||
          listing.price.toString().includes(query)
        );
      }
      
      return true;
    })
    .sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'price':
          comparison = a.price - b.price;
          break;
        case 'views':
          comparison = a.views - b.views;
          break;
        case 'messages':
          comparison = a.messages - b.messages;
          break;
        case 'date':
        default:
          // Mock date sorting (in real app, use actual dates)
          comparison = parseInt(a.id) - parseInt(b.id);
          break;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  // Calculate stats
  const stats = {
    active: MOCK_LISTINGS.filter(l => l.status === 'active').length,
    sold: MOCK_LISTINGS.filter(l => l.status === 'sold').length,
    archived: MOCK_LISTINGS.filter(l => l.status === 'archived').length,
    totalEarnings: MOCK_LISTINGS.filter(l => l.status === 'sold')
      .reduce((sum, l) => sum + (l.soldPrice || l.price), 0),
    totalViews: MOCK_LISTINGS.reduce((sum, l) => sum + l.views, 0),
  };

  // Action handlers
  const handleOpenActions = (listing: typeof MOCK_LISTINGS[0]) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedListing(listing);
    setShowActionsModal(true);
  };

  const handleEdit = () => {
    Alert.alert(
      'Edit Listing',
      `Edit "${selectedListing?.title}"\n\nThis will open the edit screen where you can update photos, price, description, and all other details.`,
      [{ text: 'OK' }]
    );
    // TODO: Navigate to edit screen with listing data
  };

  const handleMarkSold = (listing?: typeof MOCK_LISTINGS[0]) => {
    if (listing) {
      setSelectedListing(listing);
    }
    setShowMarkSoldModal(true);
  };

  const handleConfirmMarkSold = (soldPrice: number, soldOn: 'offerup' | 'elsewhere') => {
    console.log('Marked as sold:', {
      listing: selectedListing?.title,
      soldPrice,
      soldOn,
    });
    Alert.alert(
      'Success!',
      `"${selectedListing?.title}" marked as sold for $${soldPrice.toLocaleString()}`,
      [{ text: 'OK' }]
    );
  };

  const handleArchive = (listing?: typeof MOCK_LISTINGS[0]) => {
    if (listing) {
      setSelectedListing(listing);
    }
    setShowArchiveDialog(true);
  };

  const handleConfirmArchive = () => {
    console.log('Archived:', selectedListing?.title);
    Alert.alert('Archived', `"${selectedListing?.title}" has been archived`, [
      {
        text: 'Undo',
        onPress: () => console.log('Undo archive'),
      },
      { text: 'OK' },
    ]);
  };

  const handleDuplicate = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    console.log('Duplicating:', selectedListing?.title);
    Alert.alert(
      'Duplicate Listing',
      `Create a copy of "${selectedListing?.title}"? You can edit it before posting.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Duplicate',
          onPress: () => {
            Alert.alert('Success', 'Listing duplicated! Opening editor...');
            // TODO: Navigate to edit screen with duplicated data
          },
        },
      ]
    );
  };

  const handleViewInsights = () => {
    setShowInsightsModal(true);
  };

  const handlePromote = () => {
    setShowPromoteModal(true);
  };

  const handleConfirmPromote = (tier: 'basic' | 'premium' | 'ultimate', duration: number) => {
    console.log('Promoting:', {
      listing: selectedListing?.title,
      tier,
      duration,
    });
    Alert.alert(
      'Success!',
      `"${selectedListing?.title}" is now promoted with ${tier} plan for ${duration} days!`,
      [{ text: 'OK' }]
    );
  };

  const handleApplyFilter = (newSortBy: string, newSortOrder: 'asc' | 'desc') => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  };

  const handleBulkArchive = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Alert.alert(
      'Archive Items',
      `Archive ${selectedIds.length} selected items?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Archive',
          onPress: () => {
            console.log('Bulk archive:', selectedIds);
            exitMultiSelect();
            Alert.alert('Success', `${selectedIds.length} items archived`);
          },
        },
      ]
    );
  };

  const handleBulkDelete = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    Alert.alert(
      'Delete Items',
      `Are you sure you want to delete ${selectedIds.length} selected items? This cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            console.log('Bulk delete:', selectedIds);
            exitMultiSelect();
            Alert.alert('Deleted', `${selectedIds.length} items deleted`);
          },
        },
      ]
    );
  };

  const handleDelete = (listing?: typeof MOCK_LISTINGS[0]) => {
    if (listing) {
      setSelectedListing(listing);
    }
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    console.log('Deleted:', selectedListing?.title);
    Alert.alert('Deleted', `"${selectedListing?.title}" has been deleted`, [
      {
        text: 'Undo',
        onPress: () => console.log('Undo delete'),
        style: 'cancel',
      },
      { text: 'OK' },
    ]);
  };

  const handleLongPress = (listing: typeof MOCK_LISTINGS[0]) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setMultiSelectMode(true);
    setSelectedIds([listing.id]);
  };

  const toggleSelection = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const exitMultiSelect = () => {
    setMultiSelectMode(false);
    setSelectedIds([]);
  };


  const renderEmptyState = () => {
    const emptyStates = {
      all: {
        title: 'No listings yet',
        message: 'Start selling! Create your first listing',
      },
      active: {
        title: 'No active listings',
        message: 'All your items are either sold or archived',
      },
      sold: {
        title: 'No sold items',
        message: 'Your sold items will appear here',
      },
      archived: {
        title: 'No archived listings',
        message: 'Archive old listings to keep your feed clean',
      },
    };

    const state = emptyStates[selectedTab];

    return (
      <View style={styles.emptyState}>
        <Text style={styles.emptyTitle}>{state.title}</Text>
        <Text style={styles.emptyMessage}>{state.message}</Text>
        {selectedTab === 'all' && (
          <Text style={styles.emptyHint}>
            Tap the + button below to create your first listing
          </Text>
        )}
      </View>
    );
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
          <View style={styles.header}>
            <Text style={styles.headerTitle}>My Listings</Text>
          </View>

          {/* Stats Summary */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>${stats.totalEarnings.toLocaleString()}</Text>
              <Text style={styles.statLabel}>Earned</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stats.sold}</Text>
              <Text style={styles.statLabel}>Sold</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stats.totalViews}</Text>
              <Text style={styles.statLabel}>Views</Text>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>

      {/* Filters Component */}
      <ListingsFilters
        searchQuery={searchQuery}
        selectedTab={selectedTab}
        stats={{
          all: MOCK_LISTINGS.length,
          active: stats.active,
          sold: stats.sold,
          archived: stats.archived,
        }}
        onSearchChange={setSearchQuery}
        onTabChange={setSelectedTab}
        onFilterPress={() => setShowFilterModal(true)}
      />

      {/* Multi-select Toolbar Component */}
      {multiSelectMode && (
        <ListingsToolbar
          selectedCount={selectedIds.length}
          onCancel={exitMultiSelect}
          onBulkArchive={handleBulkArchive}
          onBulkDelete={handleBulkDelete}
        />
      )}

      {/* Listings List Component */}
      {filteredListings.length > 0 ? (
        <ListingsList
          listings={filteredListings}
          refreshing={refreshing}
          multiSelectMode={multiSelectMode}
          selectedIds={selectedIds}
          onRefresh={onRefresh}
          onListingPress={handleOpenActions}
          onLongPress={handleLongPress}
          onToggleSelection={toggleSelection}
          onEdit={handleEdit}
          onArchive={handleArchive}
          onDelete={handleDelete}
        />
      ) : (
        <ScrollView
          style={styles.listingsContainer}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={theme.colors.primary.start}
              colors={[theme.colors.primary.start]}
            />
          }
        >
          {renderEmptyState()}
        </ScrollView>
      )}

      {/* Actions Modal */}
      {selectedListing && (
        <>
          <ListingActionsModal
            visible={showActionsModal}
            onClose={() => setShowActionsModal(false)}
            onEdit={handleEdit}
            onMarkSold={() => handleMarkSold()}
            onArchive={() => handleArchive()}
            onDuplicate={handleDuplicate}
            onViewInsights={handleViewInsights}
            onPromote={handlePromote}
            onDelete={() => handleDelete()}
            listingTitle={selectedListing.title}
          />

          {/* Mark as Sold Modal */}
          <MarkAsSoldModal
            visible={showMarkSoldModal}
            onClose={() => setShowMarkSoldModal(false)}
            onConfirm={handleConfirmMarkSold}
            listingTitle={selectedListing.title}
            originalPrice={selectedListing.price}
          />

          {/* Archive Confirmation */}
          <ConfirmDialog
            visible={showArchiveDialog}
            onClose={() => setShowArchiveDialog(false)}
            onConfirm={handleConfirmArchive}
            title="Archive Listing"
            message={`Archive "${selectedListing.title}"? You can restore it later from the Archived tab.`}
            confirmText="Archive"
            icon={<ArchiveBox size={48} color="#6B7280" variant="Bold" />}
          />

          {/* Delete Confirmation */}
          <ConfirmDialog
            visible={showDeleteDialog}
            onClose={() => setShowDeleteDialog(false)}
            onConfirm={handleConfirmDelete}
            title="Delete Listing"
            message={`Are you sure you want to delete "${selectedListing.title}"? This action cannot be undone.`}
            confirmText="Delete"
            destructive
            icon={<InfoCircle size={48} color="#EF4444" variant="Bold" />}
          />

          {/* Listing Insights Modal */}
          <ListingInsightsModal
            visible={showInsightsModal}
            onClose={() => setShowInsightsModal(false)}
            listing={{
              title: selectedListing.title,
              views: selectedListing.views,
              saves: selectedListing.saves,
              messages: selectedListing.messages,
              postedDate: selectedListing.postedDate,
            }}
          />

          {/* Promote Listing Modal */}
          <PromoteListingModal
            visible={showPromoteModal}
            onClose={() => setShowPromoteModal(false)}
            onConfirm={handleConfirmPromote}
            listingTitle={selectedListing.title}
          />
        </>
      )}

      {/* Filter/Sort Modal */}
      <FilterSortModal
        visible={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        onApply={handleApplyFilter}
        currentSort={sortBy}
        currentOrder={sortOrder}
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
    paddingBottom: theme.spacing.lg,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    backgroundColor: theme.colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.ui.border,
    gap: theme.spacing.sm,
  },
  searchBarWrapper: {
    flex: 1,
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.md,
  },
  headerTitle: {
    fontSize: theme.typography.fontSize.xxl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.white,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    marginHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    paddingVertical: theme.spacing.md,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.white,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.white,
    opacity: 0.8,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  tabsContainer: {
    backgroundColor: theme.colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.ui.border,
    paddingVertical: theme.spacing.sm,
  },
  tab: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    marginHorizontal: theme.spacing.xs,
    borderRadius: theme.borderRadius.md,
  },
  tabActive: {
    backgroundColor: theme.colors.primary.start,
  },
  tabText: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text.secondary,
  },
  tabTextActive: {
    color: theme.colors.text.white,
  },
  listingsContainer: {
    flex: 1,
    paddingHorizontal: theme.spacing.md,
  },
  listingCard: {
    flexDirection: 'row',
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.lg,
    marginTop: theme.spacing.md,
    padding: theme.spacing.sm,
    ...theme.shadows.sm,
  },
  listingImage: {
    width: 80,
    height: 80,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.background.tertiary,
  },
  listingInfo: {
    flex: 1,
    marginLeft: theme.spacing.sm,
  },
  listingHeader: {
    marginBottom: theme.spacing.xs,
  },
  listingTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  listingTitle: {
    flex: 1,
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
    marginRight: theme.spacing.xs,
  },
  moreButton: {
    padding: 4,
  },
  priceStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  listingPrice: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    marginRight: theme.spacing.sm,
  },
  statusBadge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.sm,
  },
  statusText: {
    fontSize: theme.typography.fontSize.xs,
    fontWeight: theme.typography.fontWeight.semibold,
  },
  metricsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  metric: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  metricText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.tertiary,
    marginLeft: 4,
  },
  postedDate: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.text.tertiary,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.xxl * 2,
  },
  emptyTitle: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  emptyMessage: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  emptyHint: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.tertiary,
    marginTop: theme.spacing.md,
    textAlign: 'center',
  },
  // Multi-select styles
  listingCardSelected: {
    borderWidth: 2,
    borderColor: theme.colors.primary.start,
  },
  checkbox: {
    position: 'absolute',
    top: theme.spacing.sm,
    left: theme.spacing.sm,
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: theme.colors.ui.border,
    backgroundColor: theme.colors.background.primary,
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: theme.colors.primary.start,
    borderColor: theme.colors.primary.start,
  },
  multiSelectToolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    backgroundColor: theme.colors.background.secondary,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.ui.border,
  },
  toolbarCancel: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.primary.start,
    fontWeight: theme.typography.fontWeight.semibold,
  },
  toolbarTitle: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
  },
  toolbarActions: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  toolbarButton: {
    padding: theme.spacing.xs,
  },
  // Swipe actions styles
  rowBack: {
    alignItems: 'center',
    backgroundColor: theme.colors.background.primary,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: theme.spacing.md,
    marginTop: theme.spacing.md,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: theme.spacing.md,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: '#3B82F6',
    right: 150,
  },
  backRightBtnCenter: {
    backgroundColor: '#6B7280',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: '#EF4444',
    right: 0,
    borderTopRightRadius: theme.borderRadius.lg,
    borderBottomRightRadius: theme.borderRadius.lg,
  },
  backTextWhite: {
    color: '#FFFFFF',
    fontSize: theme.typography.fontSize.xs,
    fontWeight: theme.typography.fontWeight.semibold,
    marginTop: 4,
  },
  listingsContent: {
    paddingBottom: theme.spacing.lg,
  },
});
