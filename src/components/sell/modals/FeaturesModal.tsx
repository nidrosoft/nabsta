/**
 * FeaturesModal
 * Bottom sheet for selecting features (multi-select with checkboxes)
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Switch,
} from 'react-native';
import { CloseCircle, TickSquare } from 'iconsax-react-native';
import { FEATURE_OPTIONS } from '../../../constants/sellCategories';
import { theme } from '../../../theme';

interface FeaturesModalProps {
  visible: boolean;
  selectedFeatures: string[];
  onUpdate: (features: string[]) => void;
  onClose: () => void;
}

export const FeaturesModal: React.FC<FeaturesModalProps> = ({
  visible,
  selectedFeatures,
  onUpdate,
  onClose,
}) => {
  const [localSelected, setLocalSelected] = useState<string[]>(selectedFeatures);
  const [showOther, setShowOther] = useState(false);

  useEffect(() => {
    setLocalSelected(selectedFeatures);
  }, [selectedFeatures]);

  const toggleFeature = (featureId: string) => {
    setLocalSelected(prev =>
      prev.includes(featureId)
        ? prev.filter(id => id !== featureId)
        : [...prev, featureId]
    );
  };

  const handleDone = () => {
    onUpdate(localSelected);
    onClose();
  };

  const handleClear = () => {
    setLocalSelected([]);
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
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <CloseCircle size={24} color={theme.colors.primary.start} variant="Bold" />
            </TouchableOpacity>
            <Text style={styles.title}>Features</Text>
            <TouchableOpacity onPress={handleClear}>
              <Text style={styles.clearText}>Clear</Text>
            </TouchableOpacity>
          </View>

          {/* Features List */}
          <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
            {FEATURE_OPTIONS.map((feature) => (
              <TouchableOpacity
                key={feature.id}
                style={styles.item}
                onPress={() => toggleFeature(feature.id)}
                activeOpacity={0.7}
              >
                <View style={styles.checkbox}>
                  {localSelected.includes(feature.id) && (
                    <TickSquare size={24} color={theme.colors.primary.start} variant="Bold" />
                  )}
                  {!localSelected.includes(feature.id) && (
                    <View style={styles.checkboxEmpty} />
                  )}
                </View>
                <Text style={styles.itemText}>{feature.name}</Text>
              </TouchableOpacity>
            ))}

            {/* Other Toggle */}
            <View style={styles.otherRow}>
              <Text style={styles.itemText}>Other</Text>
              <Switch
                value={showOther}
                onValueChange={setShowOther}
                trackColor={{ false: theme.colors.ui.border, true: theme.colors.primary.start }}
                thumbColor={theme.colors.background.primary}
              />
            </View>
          </ScrollView>

          {/* Done Button */}
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.doneButton}
              onPress={handleDone}
              activeOpacity={0.7}
            >
              <Text style={styles.doneButtonText}>Done</Text>
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
  checkbox: {
    width: 24,
    height: 24,
  },
  checkboxEmpty: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: theme.colors.ui.border,
    borderRadius: 4,
  },
  itemText: {
    flex: 1,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.text.primary,
  },
  otherRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.ui.border,
    marginTop: theme.spacing.sm,
  },
  footer: {
    padding: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.ui.border,
  },
  doneButton: {
    backgroundColor: theme.colors.background.secondary,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
  },
  doneButtonText: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.secondary,
  },
});
