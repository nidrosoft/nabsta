/**
 * ListingsToolbar Component
 * Multi-select toolbar with bulk actions
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Archive, Trash } from 'iconsax-react-native';
import { theme } from '../../theme';

interface ListingsToolbarProps {
  selectedCount: number;
  onCancel: () => void;
  onBulkArchive: () => void;
  onBulkDelete: () => void;
}

export const ListingsToolbar: React.FC<ListingsToolbarProps> = ({
  selectedCount,
  onCancel,
  onBulkArchive,
  onBulkDelete,
}) => {
  return (
    <View style={styles.toolbar}>
      <TouchableOpacity onPress={onCancel}>
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>
      <Text style={styles.title}>{selectedCount} selected</Text>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={onBulkArchive}>
          <Archive size={20} color={theme.colors.text.primary} variant="Bold" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={onBulkDelete}>
          <Trash size={20} color="#EF4444" variant="Bold" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    backgroundColor: theme.colors.background.secondary,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.ui.border,
  },
  cancelText: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.primary.start,
    fontWeight: theme.typography.fontWeight.semibold,
  },
  title: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
  },
  actions: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  actionButton: {
    padding: theme.spacing.xs,
  },
});
