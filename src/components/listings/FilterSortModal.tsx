/**
 * FilterSortModal
 * Modal for sorting and filtering listings
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
import * as Haptics from 'expo-haptics';
import {
  ArrowDown,
  ArrowUp,
  Calendar,
  DollarCircle,
  Eye,
  MessageText1,
  TickCircle,
} from 'iconsax-react-native';
import { theme } from '../../theme';

interface FilterSortModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (sortBy: string, sortOrder: 'asc' | 'desc') => void;
  currentSort: string;
  currentOrder: 'asc' | 'desc';
}

const SORT_OPTIONS = [
  { id: 'date', label: 'Date Posted', icon: Calendar },
  { id: 'price', label: 'Price', icon: DollarCircle },
  { id: 'views', label: 'Views', icon: Eye },
  { id: 'messages', label: 'Messages', icon: MessageText1 },
];

export const FilterSortModal: React.FC<FilterSortModalProps> = ({
  visible,
  onClose,
  onApply,
  currentSort,
  currentOrder,
}) => {
  const [selectedSort, setSelectedSort] = useState(currentSort);
  const [selectedOrder, setSelectedOrder] = useState<'asc' | 'desc'>(currentOrder);

  const handleApply = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onApply(selectedSort, selectedOrder);
    onClose();
  };

  const handleReset = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedSort('date');
    setSelectedOrder('desc');
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
            <Text style={styles.title}>Sort & Filter</Text>
          </View>

          <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
            {/* Sort By */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Sort By</Text>
              {SORT_OPTIONS.map((option) => {
                const Icon = option.icon;
                const isSelected = selectedSort === option.id;

                return (
                  <TouchableOpacity
                    key={option.id}
                    style={[
                      styles.optionButton,
                      isSelected && styles.optionButtonSelected,
                    ]}
                    onPress={() => {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                      setSelectedSort(option.id);
                    }}
                    activeOpacity={0.7}
                  >
                    <View style={styles.optionLeft}>
                      <View style={[
                        styles.optionIconContainer,
                        isSelected && styles.optionIconContainerSelected,
                      ]}>
                        <Icon
                          size={20}
                          color={isSelected ? theme.colors.primary.start : theme.colors.text.secondary}
                          variant="Bold"
                        />
                      </View>
                      <Text style={[
                        styles.optionText,
                        isSelected && styles.optionTextSelected,
                      ]}>
                        {option.label}
                      </Text>
                    </View>
                    {isSelected && (
                      <TickCircle size={20} color={theme.colors.primary.start} variant="Bold" />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Sort Order */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Order</Text>
              <View style={styles.orderButtons}>
                <TouchableOpacity
                  style={[
                    styles.orderButton,
                    selectedOrder === 'desc' && styles.orderButtonSelected,
                  ]}
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    setSelectedOrder('desc');
                  }}
                  activeOpacity={0.7}
                >
                  <ArrowDown
                    size={20}
                    color={selectedOrder === 'desc' ? '#FFFFFF' : theme.colors.text.secondary}
                    variant="Bold"
                  />
                  <Text style={[
                    styles.orderButtonText,
                    selectedOrder === 'desc' && styles.orderButtonTextSelected,
                  ]}>
                    {selectedSort === 'date' ? 'Newest First' : 'Highest First'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.orderButton,
                    selectedOrder === 'asc' && styles.orderButtonSelected,
                  ]}
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    setSelectedOrder('asc');
                  }}
                  activeOpacity={0.7}
                >
                  <ArrowUp
                    size={20}
                    color={selectedOrder === 'asc' ? '#FFFFFF' : theme.colors.text.secondary}
                    variant="Bold"
                  />
                  <Text style={[
                    styles.orderButtonText,
                    selectedOrder === 'asc' && styles.orderButtonTextSelected,
                  ]}>
                    {selectedSort === 'date' ? 'Oldest First' : 'Lowest First'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>

          {/* Actions */}
          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.resetButton}
              onPress={handleReset}
              activeOpacity={0.7}
            >
              <Text style={styles.resetText}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.applyButton}
              onPress={handleApply}
              activeOpacity={0.7}
            >
              <Text style={styles.applyText}>Apply</Text>
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
    maxHeight: '70%',
  },
  header: {
    alignItems: 'center',
    paddingTop: theme.spacing.sm,
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
  },
  scrollContent: {
    flex: 1,
  },
  section: {
    padding: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.ui.border,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.sm,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  optionButtonSelected: {
    borderColor: theme.colors.primary.start,
    backgroundColor: theme.colors.primary.start + '10',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  optionIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.background.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionIconContainerSelected: {
    backgroundColor: theme.colors.primary.start + '20',
  },
  optionText: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text.secondary,
  },
  optionTextSelected: {
    color: theme.colors.primary.start,
    fontWeight: theme.typography.fontWeight.bold,
  },
  orderButtons: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  orderButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.xs,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.md,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  orderButtonSelected: {
    backgroundColor: theme.colors.primary.start,
    borderColor: theme.colors.primary.start,
  },
  orderButtonText: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text.secondary,
  },
  orderButtonTextSelected: {
    color: '#FFFFFF',
    fontWeight: theme.typography.fontWeight.bold,
  },
  actions: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    padding: theme.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: theme.colors.ui.border,
  },
  resetButton: {
    flex: 1,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.background.secondary,
    alignItems: 'center',
  },
  resetText: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
  },
  applyButton: {
    flex: 2,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.primary.start,
    alignItems: 'center',
  },
  applyText: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.bold,
    color: '#FFFFFF',
  },
});
