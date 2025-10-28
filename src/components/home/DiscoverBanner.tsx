/**
 * DiscoverBanner Component
 * Banner for local events discovery
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../../theme';

interface DiscoverBannerProps {
  onPress: () => void;
}

export const DiscoverBanner: React.FC<DiscoverBannerProps> = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[theme.colors.category.forSale, '#0EA472']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Discover what's{'\n'}happening nearby</Text>
            <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.8}>
              <Text style={styles.buttonText}>Explore local events</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.illustrationContainer}>
            <Text style={styles.illustration}>🏙️</Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: theme.spacing.md,
    marginVertical: theme.spacing.lg,
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
    ...theme.shadows.md,
  },
  gradient: {
    borderRadius: theme.borderRadius.xl,
  },
  content: {
    flexDirection: 'row',
    padding: theme.spacing.lg,
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.white,
    marginBottom: theme.spacing.md,
    lineHeight: theme.typography.fontSize.xl * 1.3,
  },
  button: {
    backgroundColor: theme.colors.text.white,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.xl,
    alignSelf: 'flex-start',
  },
  buttonText: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.category.forSale,
  },
  illustrationContainer: {
    marginLeft: theme.spacing.md,
  },
  illustration: {
    fontSize: 80,
  },
});
