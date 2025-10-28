/**
 * CategoryModal
 * Bottom sheet for selecting main category
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
import { SELL_CATEGORIES } from '../../../constants/sellCategories';
import { theme } from '../../../theme';

interface CategoryModalProps {
  visible: boolean;
  selectedCategory?: string;
  onSelect: (categoryId: string) => void;
  onClose: () => void;
}

export const CategoryModal: React.FC<CategoryModalProps> = ({
  visible,
  selectedCategory,
  onSelect,
  onClose,
}) => {
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
            <Text style={styles.title}>Category</Text>
            <View style={styles.placeholder} />
          </View>

          {/* Category List */}
          <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
            {SELL_CATEGORIES.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={styles.item}
                onPress={() => {
                  onSelect(category.id);
                  onClose();
                }}
                activeOpacity={0.7}
              >
                <Text style={styles.itemText}>{category.name}</Text>
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
  placeholder: {
    width: 40,
  },
  list: {
    padding: theme.spacing.md,
  },
  item: {
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.ui.border,
  },
  itemText: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.text.primary,
  },
});
