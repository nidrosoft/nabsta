/**
 * CategoryGrid Component
 * Grid display of main categories
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Tag, Briefcase, Home3, TicketDiscount, Setting2, DocumentText } from 'iconsax-react-native';
import { CategoryCard } from '../common';
import { CATEGORIES } from '../../constants/categories';
import { CategoryType } from '../../types';
import { theme } from '../../theme';

interface CategoryGridProps {
  onCategoryPress: (category: CategoryType) => void;
}

// Icon mapping with Iconsax icons
const getCategoryIcon = (categoryId: CategoryType): React.ReactNode => {
  const iconMap: Record<CategoryType, React.ReactNode> = {
    forSale: <Tag size={24} color={theme.colors.category.forSale} variant="Bold" />,
    jobs: <Briefcase size={24} color={theme.colors.category.jobs} variant="Bold" />,
    rentals: <Home3 size={24} color={theme.colors.category.rentals} variant="Bold" />,
    coupons: <TicketDiscount size={24} color={theme.colors.category.coupons} variant="Bold" />,
    services: <Setting2 size={24} color={theme.colors.category.services} variant="Bold" />,
    news: <DocumentText size={24} color={theme.colors.category.news} variant="Bold" />,
  };
  return iconMap[categoryId];
};

const CategoryGrid: React.FC<CategoryGridProps> = ({ onCategoryPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {CATEGORIES.map((category) => (
          <View key={category.id} style={styles.categoryItem}>
            <CategoryCard
              title={category.name}
              icon={getCategoryIcon(category.id)}
              onPress={() => onCategoryPress(category.id)}
              disabled={false}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

export { CategoryGrid };

const styles = StyleSheet.create({
  container: {
    // No horizontal padding - parent handles it
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
    justifyContent: 'space-between', // Distribute cards evenly
  },
  categoryItem: {
    width: '31.5%', // 3 columns taking full width
  },
});
