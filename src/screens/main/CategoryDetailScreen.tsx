/**
 * CategoryDetailScreen
 * Shows category details with subcategories and listings
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { BackIcon, ComingSoonBanner } from '../../components/common';
import { CategoryType } from '../../types';
import { getCategoryById } from '../../constants/categories';
import { theme } from '../../theme';

interface CategoryDetailScreenProps {
  category: CategoryType;
  onBack: () => void;
}

export const CategoryDetailScreen: React.FC<CategoryDetailScreenProps> = ({
  category,
  onBack,
}) => {
  const categoryData = getCategoryById(category);

  if (!categoryData) {
    return null;
  }

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
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={onBack}
              activeOpacity={0.7}
            >
              <BackIcon size={32} color={theme.colors.text.white} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{categoryData.name}</Text>
            <View style={styles.placeholder} />
          </View>
        </SafeAreaView>
      </LinearGradient>

      {categoryData.isComingSoon ? (
        <ComingSoonBanner />
      ) : (
        <>
          {/* Horizontal Scrollable Subcategories */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.subcategoriesScroll}
            contentContainerStyle={styles.subcategoriesContent}
          >
            {categoryData.subCategories.map((subCat) => (
              <TouchableOpacity 
                key={subCat.id} 
                style={styles.pill}
                activeOpacity={0.7}
              >
                <Text style={styles.pillText}>{subCat.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Feed */}
          <ScrollView style={styles.content}>
            <View style={styles.feedContainer}>
              <Text style={styles.sectionTitle}>Listings</Text>
              {/* Listings grid will go here */}
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  gradientHeader: {
    // Gradient stops at header bottom
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
    marginRight: theme.spacing.sm,
  },
  headerTitle: {
    flex: 1,
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.white,
    textAlign: 'center',
  },
  placeholder: {
    width: 48, // Adjusted for larger back button (32 + padding)
  },
  subcategoriesScroll: {
    maxHeight: 60,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.ui.border,
  },
  subcategoriesContent: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    gap: theme.spacing.sm,
  },
  pill: {
    backgroundColor: theme.colors.background.tertiary,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
    marginRight: theme.spacing.sm,
  },
  pillText: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
  },
  content: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },
  feedContainer: {
    padding: theme.spacing.lg,
  },
});
