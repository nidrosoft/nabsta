/**
 * Step5Review Component
 * Review and Publish
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Edit2, Star1, Flash } from 'iconsax-react-native';
import { ListingFormData, LISTING_CATEGORIES, CONDITION_OPTIONS } from '../../types/listing';
import { theme } from '../../theme';

interface Step5ReviewProps {
  formData: ListingFormData;
  onEdit: (step: number) => void;
  onUpdate: (data: Partial<ListingFormData>) => void;
}

export const Step5Review: React.FC<Step5ReviewProps> = ({ formData, onEdit, onUpdate }) => {
  const category = LISTING_CATEGORIES.find(c => c.id === formData.category);
  const condition = CONDITION_OPTIONS.find(c => c.value === formData.condition);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        {/* Preview Card */}
        <View style={styles.previewCard}>
          <Text style={styles.previewTitle}>Preview</Text>
          {formData.photos[0] && (
            <Image source={{ uri: formData.photos[0] }} style={styles.previewImage} />
          )}
          <Text style={styles.itemTitle}>{formData.title || 'No title'}</Text>
          <View style={styles.previewRow}>
            <Text style={styles.price}>
              {formData.isFree ? 'Free' : `$${formData.price || '0'}`}
            </Text>
            <Text style={styles.location}>
              {formData.location.city}, {formData.location.state}
            </Text>
          </View>
          {condition && (
            <View style={styles.conditionBadge}>
              <Text style={styles.conditionText}>{condition.label}</Text>
            </View>
          )}
        </View>

        {/* Edit Sections */}
        <TouchableOpacity style={styles.editSection} onPress={() => onEdit(1)}>
          <View style={styles.editContent}>
            <Text style={styles.editTitle}>Category & Details</Text>
            <Text style={styles.editText}>
              {category?.name} • {condition?.label}
            </Text>
          </View>
          <Edit2 size={20} color={theme.colors.text.secondary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.editSection} onPress={() => onEdit(2)}>
          <View style={styles.editContent}>
            <Text style={styles.editTitle}>Photos & Description</Text>
            <Text style={styles.editText}>
              {formData.photos.length} photos • {formData.description.length} characters
            </Text>
          </View>
          <Edit2 size={20} color={theme.colors.text.secondary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.editSection} onPress={() => onEdit(3)}>
          <View style={styles.editContent}>
            <Text style={styles.editTitle}>Pricing</Text>
            <Text style={styles.editText}>
              ${formData.price} • Qty: {formData.quantity}
              {formData.isNegotiable && ' • Negotiable'}
            </Text>
          </View>
          <Edit2 size={20} color={theme.colors.text.secondary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.editSection} onPress={() => onEdit(4)}>
          <View style={styles.editContent}>
            <Text style={styles.editTitle}>Location & Contact</Text>
            <Text style={styles.editText}>
              {formData.location.city}, {formData.location.state}
            </Text>
          </View>
          <Edit2 size={20} color={theme.colors.text.secondary} />
        </TouchableOpacity>

        {/* Premium Options */}
        <View style={styles.premiumSection}>
          <Text style={styles.sectionTitle}>Boost Your Listing</Text>
          
          <View style={styles.premiumCard}>
            <View style={styles.premiumHeader}>
              <Star1 size={24} color="#8B5CF6" variant="Bold" />
              <View style={styles.premiumInfo}>
                <Text style={styles.premiumTitle}>Featured Listing</Text>
                <Text style={styles.premiumDescription}>
                  Appear at the top of search results
                </Text>
              </View>
              <Switch
                value={formData.promoteOptions.featured}
                onValueChange={(value) => onUpdate({
                  promoteOptions: { ...formData.promoteOptions, featured: value }
                })}
                trackColor={{ false: '#D1D5DB', true: '#8B5CF6' }}
              />
            </View>
            <Text style={styles.premiumPrice}>$4.99 for 7 days</Text>
          </View>

          <View style={styles.premiumCard}>
            <View style={styles.premiumHeader}>
              <Flash size={24} color="#F59E0B" variant="Bold" />
              <View style={styles.premiumInfo}>
                <Text style={styles.premiumTitle}>Boost Visibility</Text>
                <Text style={styles.premiumDescription}>
                  3x more views for your listing
                </Text>
              </View>
              <Switch
                value={formData.promoteOptions.boosted}
                onValueChange={(value) => onUpdate({
                  promoteOptions: { ...formData.promoteOptions, boosted: value }
                })}
                trackColor={{ false: '#D1D5DB', true: '#F59E0B' }}
              />
            </View>
            <Text style={styles.premiumPrice}>$2.99 for 7 days</Text>
          </View>
        </View>

        {/* Terms */}
        <TouchableOpacity
          style={styles.termsRow}
          onPress={() => onUpdate({ agreedToTerms: !formData.agreedToTerms })}
          activeOpacity={0.7}
        >
          <View style={[styles.checkbox, formData.agreedToTerms && styles.checkboxChecked]}>
            {formData.agreedToTerms && <Text style={styles.checkboxText}>✓</Text>}
          </View>
          <Text style={styles.termsText}>
            I agree to NABSTA's{' '}
            <Text style={styles.termsLink}>Terms of Service</Text>
          </Text>
        </TouchableOpacity>
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
  previewCard: {
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
    ...theme.shadows.md,
  },
  previewTitle: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.md,
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: '#F3F4F6',
    marginBottom: theme.spacing.md,
  },
  itemTitle: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  previewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  price: {
    fontSize: theme.typography.fontSize.xxl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary.start,
  },
  location: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.text.secondary,
  },
  conditionBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    backgroundColor: '#F0F9FF',
    borderRadius: theme.borderRadius.sm,
  },
  conditionText: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.primary.start,
  },
  editSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.md,
    backgroundColor: '#F9FAFB',
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.sm,
  },
  editContent: {
    flex: 1,
  },
  editTitle: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  editText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
  },
  premiumSection: {
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },
  premiumCard: {
    padding: theme.spacing.md,
    backgroundColor: '#F9FAFB',
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.sm,
  },
  premiumHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  premiumInfo: {
    flex: 1,
    marginLeft: theme.spacing.md,
  },
  premiumTitle: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  premiumDescription: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
  },
  premiumPrice: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing.lg,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: theme.colors.ui.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  checkboxChecked: {
    backgroundColor: theme.colors.primary.start,
    borderColor: theme.colors.primary.start,
  },
  checkboxText: {
    color: theme.colors.text.white,
    fontSize: 14,
    fontWeight: theme.typography.fontWeight.bold,
  },
  termsText: {
    flex: 1,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
  },
  termsLink: {
    color: theme.colors.primary.start,
    fontWeight: theme.typography.fontWeight.semibold,
  },
});
