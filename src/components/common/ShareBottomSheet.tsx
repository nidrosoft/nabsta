/**
 * ShareBottomSheet Component
 * Bottom sheet for sharing listing
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Pressable, Share as RNShare } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Copy, Whatsapp, Sms, Facebook, Instagram, CloseCircle } from 'iconsax-react-native';
import { ShareIcon } from './ShareIcon';
import { theme } from '../../theme';
import * as Clipboard from 'expo-clipboard';

interface ShareBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  listingUrl: string;
  listingTitle: string;
}

export const ShareBottomSheet: React.FC<ShareBottomSheetProps> = ({
  visible,
  onClose,
  listingUrl,
  listingTitle,
}) => {
  const handleCopyLink = async () => {
    await Clipboard.setStringAsync(listingUrl);
    // TODO: Show toast notification
    console.log('Link copied!');
  };

  const handleShare = async () => {
    try {
      await RNShare.share({
        message: `Check out this listing: ${listingTitle}\n${listingUrl}`,
        url: listingUrl,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(`Check out this listing: ${listingTitle}\n${listingUrl}`);
    // TODO: Open WhatsApp with deep link
    console.log('Share to WhatsApp:', message);
  };

  const handleSMS = () => {
    // TODO: Open SMS with message
    console.log('Share via SMS');
  };

  const handleFacebook = () => {
    // TODO: Share to Facebook
    console.log('Share to Facebook');
  };

  const handleInstagram = () => {
    // TODO: Share to Instagram
    console.log('Share to Instagram');
  };

  const shareOptions = [
    { id: 'copy', icon: Copy, label: 'Copy Link', onPress: handleCopyLink, color: '#6B7280' },
    { id: 'share', icon: ShareIcon, label: 'Share', onPress: handleShare, color: theme.colors.primary.start },
    { id: 'whatsapp', icon: Whatsapp, label: 'WhatsApp', onPress: handleWhatsApp, color: '#25D366' },
    { id: 'sms', icon: Sms, label: 'SMS', onPress: handleSMS, color: '#3B82F6' },
    { id: 'facebook', icon: Facebook, label: 'Facebook', onPress: handleFacebook, color: '#1877F2' },
    { id: 'instagram', icon: Instagram, label: 'Instagram', onPress: handleInstagram, color: '#E4405F' },
  ];

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.bottomSheet} onPress={(e) => e.stopPropagation()}>
          <SafeAreaView edges={['bottom']}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>Share Listing</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <CloseCircle size={28} color={theme.colors.text.secondary} />
              </TouchableOpacity>
            </View>

            {/* Share Options */}
            <View style={styles.optionsContainer}>
              {shareOptions.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  style={styles.optionButton}
                  onPress={option.onPress}
                  activeOpacity={0.7}
                >
                  <View style={[styles.iconContainer, { backgroundColor: `${option.color}15` }]}>
                    {option.id === 'share' ? (
                      <ShareIcon size={24} color={option.color} />
                    ) : (
                      <option.icon size={24} color={option.color} variant="Bold" />
                    )}
                  </View>
                  <Text style={styles.optionLabel}>{option.label}</Text>
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
    ...theme.shadows.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xl,
    marginBottom: theme.spacing.lg,
  },
  title: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
  },
  closeButton: {
    padding: theme.spacing.xs,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
    gap: theme.spacing.lg,
  },
  optionButton: {
    alignItems: 'center',
    width: '28%',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.sm,
  },
  optionLabel: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text.primary,
    textAlign: 'center',
  },
});
