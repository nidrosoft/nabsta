/**
 * SubcategoryModal
 * Bottom sheet for selecting subcategory with radio buttons
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from 'react-native';
import { CloseCircle } from 'iconsax-react-native';
import { SELL_CATEGORIES, Subcategory } from '../../../constants/sellCategories';
import { theme } from '../../../theme';

interface SubcategoryModalProps {
  visible: boolean;
  categoryId: string;
  selectedSubcategory?: string;
  onSelect: (subcategoryId: string) => void;
  onClear: () => void;
  onClose: () => void;
}

export const SubcategoryModal: React.FC<SubcategoryModalProps> = ({
  visible,
  categoryId,
  selectedSubcategory,
  onSelect,
  onClear,
  onClose,
}) => {
  const category = SELL_CATEGORIES.find(c => c.id === categoryId);
  const subcategories = category?.subcategories || [];

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
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <CloseCircle size={24} color={theme.colors.primary.start} variant="Bold" />
            </TouchableOpacity>
            <Text style={styles.title}>Sub-category</Text>
            <TouchableOpacity onPress={onClear}>
              <Text style={styles.clearText}>Clear</Text>
            </TouchableOpacity>
          </View>

          {/* Subcategory List */}
          <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
            {subcategories.map((subcategory) => (
              <TouchableOpacity
                key={subcategory.id}
                style={styles.item}
                onPress={() => {
                  onSelect(subcategory.id);
                  onClose();
                }}
                activeOpacity={0.7}
              >
                <View style={styles.radio}>
                  {selectedSubcategory === subcategory.id && (
                    <View style={styles.radioSelected} />
                  )}
                </View>
                <Text style={styles.itemText}>{subcategory.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
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
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.ui.border,
  },
  closeButton: {
    padding: theme.spacing.xs,
  },
  title: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
  },
  clearText: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.primary.start,
    fontWeight: theme.typography.fontWeight.semibold,
  },
  list: {
    padding: theme.spacing.md,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    gap: theme.spacing.md,
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: theme.colors.ui.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: theme.colors.primary.start,
  },
  itemText: {
    flex: 1,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.text.primary,
  },
});
