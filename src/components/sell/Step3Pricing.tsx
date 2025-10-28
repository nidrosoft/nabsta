/**
 * Step3Pricing Component
 * Price, Negotiable, and Quantity
 */

import React from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { DollarCircle } from 'iconsax-react-native';
import { ListingFormData } from '../../types/listing';
import { theme } from '../../theme';

interface Step3PricingProps {
  formData: ListingFormData;
  onUpdate: (data: Partial<ListingFormData>) => void;
}

export const Step3Pricing: React.FC<Step3PricingProps> = ({ formData, onUpdate }) => {
  const handleQuantityChange = (increment: boolean) => {
    const newQuantity = increment 
      ? formData.quantity + 1 
      : Math.max(1, formData.quantity - 1);
    onUpdate({ quantity: newQuantity });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        {/* Price */}
        <View style={styles.section}>
          <Text style={styles.label}>Price *</Text>
          <View style={styles.priceContainer}>
            <View style={styles.priceInputContainer}>
              <Text style={styles.currencySymbol}>$</Text>
              <TextInput
                style={styles.priceInput}
                value={formData.price}
                onChangeText={(text) => {
                  // Only allow numbers and decimal
                  const cleaned = text.replace(/[^0-9.]/g, '');
                  onUpdate({ price: cleaned });
                }}
                placeholder="0.00"
                placeholderTextColor={theme.colors.text.secondary}
                keyboardType="decimal-pad"
                editable={!formData.isFree}
              />
            </View>
            
            <TouchableOpacity
              style={styles.freeButton}
              onPress={() => onUpdate({ isFree: !formData.isFree, price: formData.isFree ? '' : '0' })}
              activeOpacity={0.7}
            >
              <Text style={[styles.freeButtonText, formData.isFree && styles.freeButtonTextActive]}>
                Free
              </Text>
            </TouchableOpacity>
          </View>
          
          {!formData.isFree && formData.price && (
            <Text style={styles.helper}>
              Suggested price range for this category: $50 - $500
            </Text>
          )}
        </View>

        {/* Negotiable */}
        <View style={styles.section}>
          <View style={styles.toggleRow}>
            <View style={styles.toggleInfo}>
              <Text style={styles.toggleLabel}>Open to offers</Text>
              <Text style={styles.toggleDescription}>
                Buyers can send you price offers
              </Text>
            </View>
            <Switch
              value={formData.isNegotiable}
              onValueChange={(value) => onUpdate({ isNegotiable: value })}
              trackColor={{ false: '#D1D5DB', true: theme.colors.primary.start }}
              thumbColor={theme.colors.background.primary}
            />
          </View>
        </View>

        {/* Shipping Note */}
        <View style={styles.infoCard}>
          <DollarCircle size={24} color={theme.colors.primary.start} variant="Bold" />
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>Local selling with shipping option</Text>
            <Text style={styles.infoText}>
              Items are sold locally by default. Buyers can request shipping and pay for it separately.
            </Text>
          </View>
        </View>

        {/* Quantity */}
        <View style={styles.section}>
          <Text style={styles.label}>Quantity</Text>
          <Text style={styles.helper}>How many of this item do you have?</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => handleQuantityChange(false)}
              activeOpacity={0.7}
            >
              <Text style={styles.quantityButtonText}>−</Text>
            </TouchableOpacity>
            <View style={styles.quantityDisplay}>
              <Text style={styles.quantityText}>{formData.quantity}</Text>
            </View>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => handleQuantityChange(true)}
              activeOpacity={0.7}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  helper: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
    marginTop: theme.spacing.xs,
  },
  priceContainer: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  priceInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background.primary,
    borderWidth: 1,
    borderColor: theme.colors.ui.border,
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: theme.spacing.md,
  },
  currencySymbol: {
    fontSize: theme.typography.fontSize.xxl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    marginRight: theme.spacing.xs,
  },
  priceInput: {
    flex: 1,
    fontSize: theme.typography.fontSize.xxl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    padding: theme.spacing.md,
  },
  freeButton: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    backgroundColor: '#F3F4F6',
    borderRadius: theme.borderRadius.lg,
    justifyContent: 'center',
  },
  freeButtonText: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.secondary,
  },
  freeButtonTextActive: {
    color: theme.colors.primary.start,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.md,
    backgroundColor: '#F9FAFB',
    borderRadius: theme.borderRadius.lg,
  },
  toggleInfo: {
    flex: 1,
    marginRight: theme.spacing.md,
  },
  toggleLabel: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  toggleDescription: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
  },
  infoCard: {
    flexDirection: 'row',
    padding: theme.spacing.md,
    backgroundColor: '#EFF6FF',
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.xl,
  },
  infoContent: {
    flex: 1,
    marginLeft: theme.spacing.md,
  },
  infoTitle: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  infoText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  quantityButton: {
    width: 48,
    height: 48,
    backgroundColor: theme.colors.background.primary,
    borderWidth: 1,
    borderColor: theme.colors.ui.border,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButtonText: {
    fontSize: theme.typography.fontSize.xxl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
  },
  quantityDisplay: {
    flex: 1,
    height: 48,
    backgroundColor: '#F9FAFB',
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
  },
});
