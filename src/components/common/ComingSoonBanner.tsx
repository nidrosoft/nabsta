/**
 * ComingSoonBanner Component
 * Display banner for features not yet available
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';

export interface ComingSoonBannerProps {
  message?: string;
}

export const ComingSoonBanner: React.FC<ComingSoonBannerProps> = ({
  message = 'Coming Soon',
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>🚀</Text>
      <Text style={styles.title}>{message}</Text>
      <Text style={styles.subtitle}>
        We're working hard to bring you this feature
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  emoji: {
    fontSize: 64,
    marginBottom: theme.spacing.md,
  },
  title: {
    fontSize: theme.typography.fontSize.xxl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
});
