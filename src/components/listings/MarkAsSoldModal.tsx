/**
 * MarkAsSoldModal
 * Modal for marking a listing as sold with final price
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
  TextInput,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { TickCircle, DollarCircle } from 'iconsax-react-native';
import { theme } from '../../theme';

interface MarkAsSoldModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (soldPrice: number, soldOn: 'offerup' | 'elsewhere') => void;
  listingTitle: string;
  originalPrice: number;
}

export const MarkAsSoldModal: React.FC<MarkAsSoldModalProps> = ({
  visible,
  onClose,
  onConfirm,
  listingTitle,
  originalPrice,
}) => {
  const [soldPrice, setSoldPrice] = useState(originalPrice.toString());
  const [soldOn, setSoldOn] = useState<'offerup' | 'elsewhere'>('offerup');

  const handleConfirm = () => {
    const price = parseFloat(soldPrice) || originalPrice;
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    onConfirm(price, soldOn);
    onClose();
  };

  const handleClose = () => {
    setSoldPrice(originalPrice.toString());
    setSoldOn('offerup');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <Pressable style={styles.overlay} onPress={handleClose}>
        <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <TickCircle size={48} color="#10B981" variant="Bold" />
            </View>
            <Text style={styles.title}>Mark as Sold</Text>
            <Text style={styles.subtitle} numberOfLines={2}>
              {listingTitle}
            </Text>
          </View>

          {/* Where was it sold? */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Where did you sell it?</Text>
            <View style={styles.optionsRow}>
              <TouchableOpacity
                style={[
                  styles.optionButton,
                  soldOn === 'offerup' && styles.optionButtonActive,
                ]}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  setSoldOn('offerup');
                }}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.optionText,
                    soldOn === 'offerup' && styles.optionTextActive,
                  ]}
                >
                  On OfferUp
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.optionButton,
                  soldOn === 'elsewhere' && styles.optionButtonActive,
                ]}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  setSoldOn('elsewhere');
                }}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.optionText,
                    soldOn === 'elsewhere' && styles.optionTextActive,
                  ]}
                >
                  Elsewhere
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Final sale price */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Final sale price</Text>
            <View style={styles.priceInputContainer}>
              <DollarCircle size={20} color={theme.colors.text.tertiary} variant="Bold" />
              <TextInput
                style={styles.priceInput}
                value={soldPrice}
                onChangeText={setSoldPrice}
                keyboardType="decimal-pad"
                placeholder={originalPrice.toString()}
                placeholderTextColor={theme.colors.text.tertiary}
              />
            </View>
            <Text style={styles.hint}>
              Original price: ${originalPrice.toLocaleString()}
            </Text>
          </View>

          {/* Actions */}
          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleClose}
              activeOpacity={0.7}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleConfirm}
              activeOpacity={0.7}
            >
              <Text style={styles.confirmText}>Mark as Sold</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.lg,
    width: '85%',
    maxWidth: 400,
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  iconContainer: {
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
  section: {
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  optionsRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  optionButton: {
    flex: 1,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    borderWidth: 2,
    borderColor: theme.colors.ui.border,
    backgroundColor: theme.colors.background.primary,
    alignItems: 'center',
  },
  optionButtonActive: {
    borderColor: theme.colors.primary.start,
    backgroundColor: theme.colors.primary.start + '10',
  },
  optionText: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text.secondary,
  },
  optionTextActive: {
    color: theme.colors.primary.start,
    fontWeight: theme.typography.fontWeight.bold,
  },
  priceInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.ui.border,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    backgroundColor: theme.colors.background.secondary,
  },
  priceInput: {
    flex: 1,
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    marginLeft: theme.spacing.sm,
  },
  hint: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.tertiary,
    marginTop: theme.spacing.xs,
  },
  actions: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
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
    flex: 1,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: '#10B981',
    alignItems: 'center',
  },
  confirmText: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.bold,
    color: '#FFFFFF',
  },
});
