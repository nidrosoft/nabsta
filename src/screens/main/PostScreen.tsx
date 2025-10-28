/**
 * PostScreen
 * Screen for creating listings with bottom sheet
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ListingTypeBottomSheet } from '../../components/common';
import { theme } from '../../theme';

interface PostScreenProps {
  onNavigateToSellFlow?: () => void;
}

export const PostScreen: React.FC<PostScreenProps> = ({ onNavigateToSellFlow }) => {
  const [showBottomSheet, setShowBottomSheet] = useState(false);

  // Show bottom sheet when screen is focused
  useEffect(() => {
    setShowBottomSheet(true);
  }, []);

  const handleSelectListingType = (type: string) => {
    console.log('Selected listing type:', type);
    
    if (type === 'sell') {
      // Navigate to selling flow
      if (onNavigateToSellFlow) {
        onNavigateToSellFlow();
      }
    } else {
      // TODO: Handle other listing types
      console.log('Other listing types coming soon');
    }
  };

  const handleCloseBottomSheet = () => {
    setShowBottomSheet(false);
    // TODO: Navigate back to previous screen
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={theme.colors.primary.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientHeader}
      >
        <SafeAreaView edges={['top']}>
          <View style={styles.header}>
            <Text style={styles.title}>Create Listing</Text>
          </View>
        </SafeAreaView>
      </LinearGradient>

      <View style={styles.content}>
        <Text style={styles.instructionText}>
          Tap the + button to create a new listing
        </Text>
      </View>

      <ListingTypeBottomSheet
        visible={showBottomSheet}
        onClose={handleCloseBottomSheet}
        onSelectType={handleSelectListingType}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  gradientHeader: {
    // Gradient stops at header bottom
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.md,
  },
  title: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.white,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.xl,
  },
  instructionText: {
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
});
