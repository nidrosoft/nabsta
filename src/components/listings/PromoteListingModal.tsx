/**
 * PromoteListingModal
 * Modal for promoting/boosting a listing with pricing tiers
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { Flash, Star1, Crown, TickCircle } from 'iconsax-react-native';
import { theme } from '../../theme';

interface PromoteListingModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (tier: 'basic' | 'premium' | 'ultimate', duration: number) => void;
  listingTitle: string;
}

const TIERS = [
  {
    id: 'basic',
    name: 'Basic Boost',
    icon: Flash,
    color: '#3B82F6',
    price: 4.99,
    features: [
      'Featured for 3 days',
      'Top of search results',
      '2x more views',
      'Highlighted badge',
    ],
    popular: false,
  },
  {
    id: 'premium',
    name: 'Premium Boost',
    icon: Star1,
    color: '#F59E0B',
    price: 9.99,
    features: [
      'Featured for 7 days',
      'Top of search & category',
      '5x more views',
      'Premium badge',
      'Email notifications',
    ],
    popular: true,
  },
  {
    id: 'ultimate',
    name: 'Ultimate Boost',
    icon: Crown,
    color: '#8B5CF6',
    price: 19.99,
    features: [
      'Featured for 14 days',
      'Homepage placement',
      '10x more views',
      'Ultimate badge',
      'Priority support',
      'Social media share',
    ],
    popular: false,
  },
];

export const PromoteListingModal: React.FC<PromoteListingModalProps> = ({
  visible,
  onClose,
  onConfirm,
  listingTitle,
}) => {
  const [selectedTier, setSelectedTier] = useState<'basic' | 'premium' | 'ultimate'>('premium');

  const handleConfirm = () => {
    const tier = TIERS.find(t => t.id === selectedTier);
    const duration = tier?.id === 'basic' ? 3 : tier?.id === 'premium' ? 7 : 14;
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    onConfirm(selectedTier, duration);
    onClose();
  };

  const TierCard = ({ tier }: { tier: typeof TIERS[0] }) => {
    const isSelected = selectedTier === tier.id;
    const Icon = tier.icon;

    return (
      <TouchableOpacity
        style={[
          styles.tierCard,
          isSelected && styles.tierCardSelected,
        ]}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          setSelectedTier(tier.id as any);
        }}
        activeOpacity={0.7}
      >
        {tier.popular && (
          <View style={styles.popularBadge}>
            <Text style={styles.popularText}>MOST POPULAR</Text>
          </View>
        )}

        <View style={[styles.tierIconContainer, { backgroundColor: tier.color + '20' }]}>
          <Icon size={32} color={tier.color} variant="Bold" />
        </View>

        <Text style={styles.tierName}>{tier.name}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.priceSymbol}>$</Text>
          <Text style={styles.priceAmount}>{tier.price}</Text>
        </View>

        <View style={styles.featuresContainer}>
          {tier.features.map((feature, index) => (
            <View key={index} style={styles.featureRow}>
              <TickCircle size={16} color={tier.color} variant="Bold" />
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>

        {isSelected && (
          <View style={styles.selectedIndicator}>
            <TickCircle size={24} color="#FFFFFF" variant="Bold" />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.handle} />
            <Text style={styles.title}>Promote Your Listing</Text>
            <Text style={styles.subtitle} numberOfLines={2}>
              {listingTitle}
            </Text>
          </View>

          {/* Tiers */}
          <ScrollView
            style={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.tiersContainer}
          >
            {TIERS.map((tier) => (
              <TierCard key={tier.id} tier={tier} />
            ))}

            {/* Info */}
            <View style={styles.infoBox}>
              <Text style={styles.infoText}>
                💡 Promoted listings get significantly more views and sell faster. Choose the plan that works best for you!
              </Text>
            </View>
          </ScrollView>

          {/* Actions */}
          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={onClose}
              activeOpacity={0.7}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleConfirm}
              activeOpacity={0.7}
            >
              <LinearGradient
                colors={theme.colors.primary.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.confirmGradient}
              >
                <Text style={styles.confirmText}>
                  Promote for ${TIERS.find(t => t.id === selectedTier)?.price}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: theme.colors.background.primary,
    borderTopLeftRadius: theme.borderRadius.xl,
    borderTopRightRadius: theme.borderRadius.xl,
    maxHeight: '90%',
  },
  header: {
    alignItems: 'center',
    paddingTop: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.ui.border,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: theme.colors.ui.border,
    borderRadius: 2,
    marginBottom: theme.spacing.sm,
  },
  title: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
  scrollContent: {
    flex: 1,
  },
  tiersContainer: {
    padding: theme.spacing.md,
    gap: theme.spacing.md,
  },
  tierCard: {
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    borderWidth: 2,
    borderColor: 'transparent',
    position: 'relative',
  },
  tierCardSelected: {
    borderColor: theme.colors.primary.start,
    backgroundColor: theme.colors.primary.start + '10',
  },
  popularBadge: {
    position: 'absolute',
    top: -1,
    right: -1,
    backgroundColor: '#F59E0B',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderTopRightRadius: theme.borderRadius.lg,
    borderBottomLeftRadius: theme.borderRadius.md,
  },
  popularText: {
    fontSize: theme.typography.fontSize.xs,
    fontWeight: theme.typography.fontWeight.bold,
    color: '#FFFFFF',
  },
  tierIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  tierName: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.md,
  },
  priceSymbol: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    marginTop: 4,
  },
  priceAmount: {
    fontSize: theme.typography.fontSize.xxl * 1.5,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
  },
  featuresContainer: {
    gap: theme.spacing.sm,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  featureText: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.text.secondary,
    flex: 1,
  },
  selectedIndicator: {
    position: 'absolute',
    top: theme.spacing.md,
    right: theme.spacing.md,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.primary.start,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoBox: {
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginTop: theme.spacing.sm,
  },
  infoText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
    lineHeight: 20,
  },
  actions: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    padding: theme.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: theme.colors.ui.border,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.background.secondary,
    alignItems: 'center',
  },
  cancelText: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
  },
  confirmButton: {
    flex: 2,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
  },
  confirmGradient: {
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
  },
  confirmText: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.bold,
    color: '#FFFFFF',
  },
});
