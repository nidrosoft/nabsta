/**
 * ListingTypeBottomSheet
 * Bottom sheet for selecting listing type
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
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Shop, 
  Briefcase, 
  Home3, 
  Car, 
  Setting4,
  CloseCircle,
} from 'iconsax-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../../theme';

interface ListingTypeBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  onSelectType: (type: string) => void;
}

interface ListingTypeOption {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

export const ListingTypeBottomSheet: React.FC<ListingTypeBottomSheetProps> = ({
  visible,
  onClose,
  onSelectType,
}) => {
  const listingTypes: ListingTypeOption[] = [
    {
      id: 'sell',
      title: 'Sell an item',
      description: 'List something you want to sell',
      icon: <Shop size={28} color="#10B981" variant="Bold" />,
      color: '#D1FAE5',
    },
    {
      id: 'service',
      title: 'Offer a service',
      description: 'Provide a service to others',
      icon: <Briefcase size={28} color="#3B82F6" variant="Bold" />,
      color: '#DBEAFE',
    },
    {
      id: 'rent',
      title: 'Rent property',
      description: 'List a property for rent',
      icon: <Home3 size={28} color="#F59E0B" variant="Bold" />,
      color: '#FEF3C7',
    },
    {
      id: 'vehicle',
      title: 'Sell a vehicle',
      description: 'List a car, bike, or other vehicle',
      icon: <Car size={28} color="#8B5CF6" variant="Bold" />,
      color: '#EDE9FE',
    },
    {
      id: 'job',
      title: 'Post a job',
      description: 'Hire someone for a job',
      icon: <Setting4 size={28} color="#EF4444" variant="Bold" />,
      color: '#FEE2E2',
    },
  ];

  const isComingSoon = (id: string) => id !== 'sell';

  const handleSelectType = (type: string) => {
    onSelectType(type);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.bottomSheet} onPress={(e) => e.stopPropagation()}>
          <SafeAreaView edges={['bottom']}>
            {/* Header */}
            <View style={styles.header}>
              <View>
                <Text style={styles.title}>Create a listing</Text>
                <Text style={styles.subtitle}>What would you like to list?</Text>
              </View>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <CloseCircle size={28} color={theme.colors.text.secondary} />
              </TouchableOpacity>
            </View>

            {/* Listing Type Options */}
            <View style={styles.optionsContainer}>
              {listingTypes.map((type) => (
                <TouchableOpacity
                  key={type.id}
                  style={styles.optionCard}
                  onPress={() => handleSelectType(type.id)}
                  activeOpacity={0.7}
                  disabled={isComingSoon(type.id)}
                >
                  <View style={[styles.iconContainer, { backgroundColor: type.color }]}>
                    {type.icon}
                  </View>
                  <View style={styles.optionText}>
                    <View style={styles.titleRow}>
                      <Text style={styles.optionTitle}>{type.title}</Text>
                      {isComingSoon(type.id) && (
                        <LinearGradient
                          colors={theme.colors.primary.gradient}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 1 }}
                          style={styles.comingSoonBadge}
                        >
                          <Text style={styles.comingSoonText}>Coming Soon</Text>
                        </LinearGradient>
                      )}
                    </View>
                    <Text style={styles.optionDescription}>{type.description}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </SafeAreaView>
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
  bottomSheet: {
    backgroundColor: theme.colors.background.primary,
    borderTopLeftRadius: theme.borderRadius.xxl,
    borderTopRightRadius: theme.borderRadius.xxl,
    paddingTop: theme.spacing.lg,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: theme.spacing.xl,
    paddingBottom: theme.spacing.lg,
  },
  title: {
    fontSize: theme.typography.fontSize.xxl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.text.secondary,
  },
  closeButton: {
    padding: theme.spacing.xs,
  },
  optionsContainer: {
    paddingHorizontal: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background.primary,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.ui.border,
    ...theme.shadows.sm,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  optionText: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  optionTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
    marginRight: theme.spacing.sm,
  },
  comingSoonBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.sm,
    ...theme.shadows.sm,
  },
  comingSoonText: {
    fontSize: 10,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.white,
  },
  optionDescription: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
  },
});
