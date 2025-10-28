/**
 * ConditionModal
 * Bottom sheet for selecting item condition
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
import { CONDITION_OPTIONS } from '../../../constants/sellCategories';
import { theme } from '../../../theme';

interface ConditionModalProps {
  visible: boolean;
  selectedCondition?: string;
  onSelect: (conditionId: string) => void;
  onClose: () => void;
}

export const ConditionModal: React.FC<ConditionModalProps> = ({
  visible,
  selectedCondition,
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
            <Text style={styles.title}>Condition</Text>
            <View style={styles.placeholder} />
          </View>

          {/* Condition List */}
          <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
            {CONDITION_OPTIONS.map((condition) => (
              <TouchableOpacity
                key={condition.id}
                style={styles.item}
                onPress={() => {
                  onSelect(condition.id);
                  onClose();
                }}
                activeOpacity={0.7}
              >
                <View style={styles.radio}>
                  {selectedCondition === condition.id && (
                    <View style={styles.radioSelected} />
                  )}
                </View>
                <Text style={styles.itemText}>{condition.name}</Text>
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
    maxHeight: '70%',
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
