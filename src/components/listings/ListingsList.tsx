/**
 * ListingsList Component
 * Renders the swipeable list of listings
 */

import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, RefreshControl } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import * as Haptics from 'expo-haptics';
import { Eye, Heart, MessageText1, More, Edit2, Trash, Archive, TickCircle } from 'iconsax-react-native';
import { Listing } from '../../services';
import { theme } from '../../theme';

interface ListingsListProps {
  listings: Listing[];
  refreshing: boolean;
  multiSelectMode: boolean;
  selectedIds: string[];
  onRefresh: () => void;
  onListingPress: (listing: Listing) => void;
  onLongPress: (listing: Listing) => void;
  onToggleSelection: (id: string) => void;
  onEdit: (listing: Listing) => void;
  onArchive: (listing: Listing) => void;
  onDelete: (listing: Listing) => void;
}

export const ListingsList: React.FC<ListingsListProps> = ({
  listings,
  refreshing,
  multiSelectMode,
  selectedIds,
  onRefresh,
  onListingPress,
  onLongPress,
  onToggleSelection,
  onEdit,
  onArchive,
  onDelete,
}) => {
  const getStatusBadge = (status: string) => {
    const badges = {
      active: { text: 'Active', color: '#10B981' },
      sold: { text: 'Sold', color: '#3B82F6' },
      archived: { text: 'Archived', color: theme.colors.text.tertiary },
    };
    return badges[status as keyof typeof badges] || badges.active;
  };

  const renderListingCard = (listing: Listing) => {
    const badge = getStatusBadge(listing.status);
    const isSelected = selectedIds.includes(listing.id);

    return (
      <TouchableOpacity
        style={[styles.listingCard, isSelected && styles.listingCardSelected]}
        activeOpacity={0.7}
        onPress={() => (multiSelectMode ? onToggleSelection(listing.id) : onListingPress(listing))}
        onLongPress={() => onLongPress(listing)}
      >
        {multiSelectMode && (
          <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
            {isSelected && <TickCircle size={20} color="#FFFFFF" variant="Bold" />}
          </View>
        )}

        <Image source={{ uri: listing.image }} style={styles.listingImage} />

        <View style={styles.listingInfo}>
          <View style={styles.listingHeader}>
            <View style={styles.listingTitleRow}>
              <Text style={styles.listingTitle} numberOfLines={1}>
                {listing.title}
              </Text>
              {!multiSelectMode && (
                <TouchableOpacity style={styles.moreButton} onPress={() => onListingPress(listing)}>
                  <More size={20} color={theme.colors.text.secondary} />
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.priceStatusRow}>
              <Text style={styles.listingPrice}>${listing.price.toLocaleString()}</Text>
              <View style={[styles.statusBadge, { backgroundColor: badge.color + '20' }]}>
                <Text style={[styles.statusText, { color: badge.color }]}>{badge.text}</Text>
              </View>
            </View>
          </View>

          <View style={styles.metricsRow}>
            <View style={styles.metric}>
              <Eye size={16} color={theme.colors.text.tertiary} variant="Bold" />
              <Text style={styles.metricText}>{listing.views}</Text>
            </View>
            <View style={styles.metric}>
              <Heart size={16} color={theme.colors.text.tertiary} variant="Bold" />
              <Text style={styles.metricText}>{listing.saves}</Text>
            </View>
            <View style={styles.metric}>
              <MessageText1 size={16} color={theme.colors.text.tertiary} variant="Bold" />
              <Text style={styles.metricText}>{listing.messages}</Text>
            </View>
          </View>

          <Text style={styles.postedDate}>Posted {listing.postedDate}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderHiddenItem = (listing: Listing) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          onEdit(listing);
        }}
      >
        <Edit2 size={20} color="#FFFFFF" variant="Bold" />
        <Text style={styles.backTextWhite}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnCenter]}
        onPress={() => onArchive(listing)}
      >
        <Archive size={20} color="#FFFFFF" variant="Bold" />
        <Text style={styles.backTextWhite}>Archive</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => onDelete(listing)}
      >
        <Trash size={20} color="#FFFFFF" variant="Bold" />
        <Text style={styles.backTextWhite}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SwipeListView
      data={listings}
      renderItem={({ item }) => renderListingCard(item)}
      renderHiddenItem={({ item }) => renderHiddenItem(item)}
      rightOpenValue={-225}
      disableRightSwipe
      closeOnRowPress
      closeOnScroll
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={theme.colors.primary.start}
          colors={[theme.colors.primary.start]}
        />
      }
      style={styles.list}
      contentContainerStyle={styles.listContent}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    paddingHorizontal: theme.spacing.md,
  },
  listContent: {
    paddingBottom: theme.spacing.lg,
  },
  listingCard: {
    flexDirection: 'row',
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.lg,
    marginTop: theme.spacing.md,
    padding: theme.spacing.sm,
    ...theme.shadows.sm,
  },
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
  // Swipe actions
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
});
