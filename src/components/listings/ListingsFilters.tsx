/**
 * ListingsFilters Component
 * Search bar, filter button, and status tabs
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Setting4 } from 'iconsax-react-native';
import { SearchBar } from '../common';
import { theme } from '../../theme';

interface ListingsFiltersProps {
  searchQuery: string;
  selectedTab: 'all' | 'active' | 'sold' | 'archived';
  stats: {
    all: number;
    active: number;
    sold: number;
    archived: number;
  };
  onSearchChange: (query: string) => void;
  onTabChange: (tab: 'all' | 'active' | 'sold' | 'archived') => void;
  onFilterPress: () => void;
}

export const ListingsFilters: React.FC<ListingsFiltersProps> = ({
  searchQuery,
  selectedTab,
  stats,
  onSearchChange,
  onTabChange,
  onFilterPress,
}) => {
  return (
    <>
      {/* Search and Filter */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBarWrapper}>
          <SearchBar
            value={searchQuery}
            onChangeText={onSearchChange}
            placeholder="Search your listings..."
          />
        </View>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={onFilterPress}
          activeOpacity={0.7}
        >
          <Setting4 size={20} color={theme.colors.text.primary} variant="Bold" />
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      <View style={styles.tabsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'all' && styles.tabActive]}
            onPress={() => onTabChange('all')}
          >
            <Text style={[styles.tabText, selectedTab === 'all' && styles.tabTextActive]}>
              All ({stats.all})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'active' && styles.tabActive]}
            onPress={() => onTabChange('active')}
          >
            <Text style={[styles.tabText, selectedTab === 'active' && styles.tabTextActive]}>
              Active ({stats.active})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'sold' && styles.tabActive]}
            onPress={() => onTabChange('sold')}
          >
            <Text style={[styles.tabText, selectedTab === 'sold' && styles.tabTextActive]}>
              Sold ({stats.sold})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'archived' && styles.tabActive]}
            onPress={() => onTabChange('archived')}
          >
            <Text style={[styles.tabText, selectedTab === 'archived' && styles.tabTextActive]}>
              Archived ({stats.archived})
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
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
});
