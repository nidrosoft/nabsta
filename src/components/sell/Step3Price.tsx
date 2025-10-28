/**
 * NewStep3Price Component
 * Simplified pricing screen with firm on price toggle
 */

import React from 'react';
import { View, Text, StyleSheet, TextInput, Switch, TouchableOpacity, ScrollView } from 'react-native';
import { DollarCircle } from 'iconsax-react-native';
import { ListingFormData } from '../../types/listing';
import { theme } from '../../theme';

interface NewStep3PriceProps {
  formData: ListingFormData;
  onUpdate: (data: Partial<ListingFormData>) => void;
}

export const NewStep3Price: React.FC<NewStep3PriceProps> = ({ formData, onUpdate }) => {
  const handlePriceChange = (text: string) => {
    const cleaned = text.replace(/[^0-9.]/g, '');
    onUpdate({ price: cleaned, isFree: false });
  };

  const handleFreeToggle = () => {
    const newIsFree = !formData.isFree;
    onUpdate({ isFree: newIsFree, price: newIsFree ? '0' : '' });
  };

  const incrementQuantity = () => {
    onUpdate({ quantity: (formData.quantity || 1) + 1 });
  };

  const decrementQuantity = () => {
    if ((formData.quantity || 1) > 1) {
      onUpdate({ quantity: (formData.quantity || 1) - 1 });
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Price Section */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Price *</Text>
        <View style={styles.priceRow}>
          <View style={styles.priceInputContainer}>
            <Text style={styles.currencySymbol}>$</Text>
            <TextInput
              style={styles.priceInput}
              value={formData.isFree ? '0.00' : formData.price}
              onChangeText={handlePriceChange}
              keyboardType="decimal-pad"
              placeholder="0.00"
              placeholderTextColor={theme.colors.text.tertiary}
              maxLength={10}
              editable={!formData.isFree}
            />
          </View>
          <TouchableOpacity
            style={[styles.freeButton, formData.isFree && styles.freeButtonActive]}
            onPress={handleFreeToggle}
            activeOpacity={0.7}
          >
            <Text style={[styles.freeButtonText, formData.isFree && styles.freeButtonTextActive]}>
              Free
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Open to Offers */}
      <View style={styles.toggleSection}>
        <View style={styles.toggleContent}>
          <Text style={styles.toggleLabel}>Open to offers</Text>
          <Text style={styles.toggleDescription}>Buyers can send you price offers</Text>
        </View>
        <Switch
          value={formData.isNegotiable}
          onValueChange={(value) => onUpdate({ isNegotiable: value })}
          trackColor={{ false: theme.colors.ui.border, true: theme.colors.primary.start }}
          thumbColor={theme.colors.background.primary}
        />
      </View>

      {/* Shipping Info */}
      <View style={styles.infoCard}>
        <View style={styles.infoIconContainer}>
          <DollarCircle size={24} color={theme.colors.primary.start} variant="Bold" />
        </View>
        <View style={styles.infoContent}>
          <Text style={styles.infoTitle}>Local selling with shipping option</Text>
          <Text style={styles.infoDescription}>
            Items are sold locally by default. Buyers can request shipping and pay for it separately.
          </Text>
        </View>
      </View>

      {/* Quantity */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Quantity</Text>
        <Text style={styles.quantityHint}>How many of this item do you have?</Text>
        <View style={styles.quantityControl}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={decrementQuantity}
            activeOpacity={0.7}
          >
            <Text style={styles.quantityButtonText}>−</Text>
          </TouchableOpacity>
          <Text style={styles.quantityValue}>{formData.quantity || 1}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={incrementQuantity}
            activeOpacity={0.7}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.md,
  },
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionLabel: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  priceRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  priceInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.ui.border,
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
  },
  currencySymbol: {
    fontSize: 32,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    marginRight: theme.spacing.xs,
  },
  priceInput: {
    flex: 1,
    fontSize: 32,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
  },
  freeButton: {
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 80,
  },
  freeButtonActive: {
    backgroundColor: theme.colors.primary.start,
  },
  freeButtonText: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.secondary,
  },
  freeButtonTextActive: {
    color: theme.colors.text.white,
  },
  toggleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  toggleContent: {
    flex: 1,
    marginRight: theme.spacing.md,
  },
  toggleLabel: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
    marginBottom: 2,
  },
  toggleDescription: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.tertiary,
  },
  infoCard: {
    flexDirection: 'row',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.xl,
  },
  infoIconContainer: {
    marginRight: theme.spacing.md,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  infoDescription: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
    lineHeight: 18,
  },
  quantityHint: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.tertiary,
    marginBottom: theme.spacing.md,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.xl,
  },
  quantityButton: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 24,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
  },
  quantityValue: {
    fontSize: 24,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    minWidth: 40,
    textAlign: 'center',
  },
});
