/**
 * Step1Category Component
 * Category, Title, and Condition selection
 */

import React from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { ListingFormData, LISTING_CATEGORIES, CONDITION_OPTIONS, ListingCondition } from '../../types/listing';
import { BusinessDetailsSection } from './BusinessDetailsSection';
import { theme } from '../../theme';

interface Step1CategoryProps {
  formData: ListingFormData;
  onUpdate: (data: Partial<ListingFormData>) => void;
}

export const Step1Category: React.FC<Step1CategoryProps> = ({ formData, onUpdate }) => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        {/* Category Selection */}
        <View style={styles.section}>
          <Text style={styles.label}>Category *</Text>
          <View style={styles.categoryGrid}>
            {LISTING_CATEGORIES.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryCard,
                  formData.category === category.id && styles.categoryCardSelected,
                ]}
                onPress={() => onUpdate({ category: category.id })}
                activeOpacity={0.7}
              >
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text style={styles.categoryName}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Title */}
        <View style={styles.section}>
          <Text style={styles.label}>Title *</Text>
          <TextInput
            style={styles.input}
            value={formData.title}
            onChangeText={(text) => onUpdate({ title: text })}
            placeholder="e.g., iPhone 13 Pro Max 256GB"
            placeholderTextColor={theme.colors.text.secondary}
            maxLength={80}
          />
          <Text style={styles.charCount}>{formData.title.length}/80</Text>
        </View>

        {/* Seller Type */}
        <View style={styles.section}>
          <Text style={styles.label}>Listing As *</Text>
          <View style={styles.sellerTypeContainer}>
            <TouchableOpacity
              style={[
                styles.sellerTypeCard,
                !formData.isBusiness && styles.sellerTypeCardSelected,
              ]}
              onPress={() => onUpdate({ isBusiness: false })}
              activeOpacity={0.7}
            >
              <Text style={styles.sellerTypeLabel}>Individual Seller</Text>
              <Text style={styles.sellerTypeDescription}>Selling personal items</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.sellerTypeCard,
                formData.isBusiness && styles.sellerTypeCardSelected,
              ]}
              onPress={() => onUpdate({ isBusiness: true })}
              activeOpacity={0.7}
            >
              <Text style={styles.sellerTypeLabel}>Business</Text>
              <Text style={styles.sellerTypeDescription}>Selling as a business</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Condition */}
        <View style={styles.section}>
          <Text style={styles.label}>Condition *</Text>
          {CONDITION_OPTIONS.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.conditionCard,
                formData.condition === option.value && styles.conditionCardSelected,
              ]}
              onPress={() => onUpdate({ condition: option.value as ListingCondition })}
              activeOpacity={0.7}
            >
              <View style={styles.conditionContent}>
                <Text style={styles.conditionLabel}>{option.label}</Text>
                <Text style={styles.conditionDescription}>{option.description}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Business Details - Show only if business is selected */}
        {formData.isBusiness && (
          <BusinessDetailsSection formData={formData} onUpdate={onUpdate} />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  content: {
    padding: theme.spacing.xl,
  },
  section: {
    marginBottom: theme.spacing.xl,
  },
  label: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  categoryCard: {
    width: '31%',
    aspectRatio: 1,
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 2,
    borderColor: theme.colors.ui.border,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.sm,
  },
  categoryCardSelected: {
    borderColor: theme.colors.primary.start,
    backgroundColor: '#F0F9FF',
  },
  categoryIcon: {
    fontSize: 32,
    marginBottom: theme.spacing.xs,
  },
  categoryName: {
    fontSize: theme.typography.fontSize.xs,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text.primary,
    textAlign: 'center',
  },
  input: {
    backgroundColor: theme.colors.background.primary,
    borderWidth: 1,
    borderColor: theme.colors.ui.border,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.text.primary,
  },
  charCount: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.text.secondary,
    textAlign: 'right',
    marginTop: theme.spacing.xs,
  },
  sellerTypeContainer: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  sellerTypeCard: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 2,
    borderColor: theme.colors.ui.border,
    padding: theme.spacing.md,
  },
  sellerTypeCardSelected: {
    borderColor: theme.colors.primary.start,
    backgroundColor: '#F0F9FF',
  },
  sellerTypeLabel: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  sellerTypeDescription: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
  },
  conditionCard: {
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 2,
    borderColor: theme.colors.ui.border,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  conditionCardSelected: {
    borderColor: theme.colors.primary.start,
    backgroundColor: '#F0F9FF',
  },
  conditionContent: {
    flex: 1,
  },
  conditionLabel: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  conditionDescription: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
  },
});
