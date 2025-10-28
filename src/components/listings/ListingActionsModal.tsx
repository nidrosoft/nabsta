/**
 * ListingActionsModal
 * Bottom sheet with actions for a listing
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import {
  Edit2,
  Camera,
  DollarCircle,
  TickCircle,
  Archive,
  Copy,
  Chart,
  Flash,
  Trash,
} from 'iconsax-react-native';
import { theme } from '../../theme';

interface ListingActionsModalProps {
  visible: boolean;
  onClose: () => void;
  onEdit: () => void;
  onUpdatePhotos: () => void;
  onChangePrice: () => void;
  onMarkSold: () => void;
  onArchive: () => void;
  onDuplicate: () => void;
  onViewInsights: () => void;
  onPromote: () => void;
  onDelete: () => void;
  listingTitle: string;
}

export const ListingActionsModal: React.FC<ListingActionsModalProps> = ({
  visible,
  onClose,
  onEdit,
  onUpdatePhotos,
  onChangePrice,
  onMarkSold,
  onArchive,
  onDuplicate,
  onViewInsights,
  onPromote,
  onDelete,
  listingTitle,
}) => {
  const handleAction = (action: () => void) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    action();
    onClose();
  };

  const ActionButton = ({
    icon: Icon,
    label,
    onPress,
    color = theme.colors.text.primary,
    destructive = false,
  }: {
    icon: any;
    label: string;
    onPress: () => void;
    color?: string;
    destructive?: boolean;
  }) => (
    <TouchableOpacity
      style={styles.actionButton}
      onPress={() => handleAction(onPress)}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, destructive && styles.iconContainerDestructive]}>
        <Icon size={22} color={color} variant="Bold" />
      </View>
      <Text style={[styles.actionLabel, destructive && styles.actionLabelDestructive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

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
            <Text style={styles.title} numberOfLines={1}>
              {listingTitle}
            </Text>
          </View>

          {/* Actions */}
          <View style={styles.actionsContainer}>
            <ActionButton
              icon={Edit2}
              label="Edit listing"
              onPress={onEdit}
              color={theme.colors.primary.start}
            />
            <ActionButton
              icon={Camera}
              label="Update photos"
              onPress={onUpdatePhotos}
              color={theme.colors.primary.start}
            />
            <ActionButton
              icon={DollarCircle}
              label="Change price"
              onPress={onChangePrice}
              color={theme.colors.primary.start}
            />
            <ActionButton
              icon={TickCircle}
              label="Mark as sold"
              onPress={onMarkSold}
              color="#10B981"
            />
            <ActionButton
              icon={Archive}
              label="Archive"
              onPress={onArchive}
              color={theme.colors.text.secondary}
            />
            <ActionButton
              icon={Copy}
              label="Duplicate"
              onPress={onDuplicate}
              color={theme.colors.text.secondary}
            />
            <ActionButton
              icon={Chart}
              label="View insights"
              onPress={onViewInsights}
              color={theme.colors.text.secondary}
            />
            <ActionButton
              icon={Flash}
              label="Promote"
              onPress={onPromote}
              color="#F59E0B"
            />
            <ActionButton
              icon={Trash}
              label="Delete"
              onPress={onDelete}
              color="#EF4444"
              destructive
            />
          </View>

          {/* Cancel Button */}
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={onClose}
            activeOpacity={0.7}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
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
    paddingBottom: 34, // Safe area for home indicator
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
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
    paddingHorizontal: theme.spacing.lg,
  },
  actionsContainer: {
    paddingVertical: theme.spacing.sm,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  iconContainerDestructive: {
    backgroundColor: '#FEE2E2',
  },
  actionLabel: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text.primary,
  },
  actionLabelDestructive: {
    color: '#EF4444',
  },
  cancelButton: {
    marginHorizontal: theme.spacing.lg,
    marginTop: theme.spacing.sm,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
  },
  cancelText: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
  },
});
