/**
 * Button Component
 * Apple-inspired button with gradient support and loading states
 */

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../../theme';

export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
  textStyle,
  icon,
}) => {
  const isDisabled = disabled || loading;

  const renderContent = () => (
    <View style={styles.contentContainer}>
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' ? theme.colors.text.white : theme.colors.primary.start}
          style={styles.loader}
        />
      ) : (
        <>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
          <Text
            style={[
              styles.text,
              styles[`text_${size}`],
              styles[`text_${variant}`],
              isDisabled && styles.text_disabled,
              textStyle,
            ]}
          >
            {title}
          </Text>
        </>
      )}
    </View>
  );

  if (variant === 'primary') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={isDisabled}
        activeOpacity={0.8}
        style={[
          styles.button,
          styles[`button_${size}`],
          fullWidth && styles.button_fullWidth,
          isDisabled && styles.button_disabled,
          style,
        ]}
      >
        <LinearGradient
          colors={theme.colors.primary.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.gradient, styles[`gradient_${size}`]]}
        >
          {renderContent()}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.7}
      style={[
        styles.button,
        styles[`button_${size}`],
        styles[`button_${variant}`],
        fullWidth && styles.button_fullWidth,
        isDisabled && styles.button_disabled,
        style,
      ]}
    >
      {renderContent()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    overflow: 'hidden',
  },
  button_small: {
    height: 36,
    borderRadius: theme.borderRadius.md,
  },
  button_medium: {
    height: 48,
    borderRadius: theme.borderRadius.lg,
  },
  button_large: {
    height: 56,
    borderRadius: theme.borderRadius.lg,
  },
  button_fullWidth: {
    width: '100%',
  },
  button_secondary: {
    backgroundColor: theme.colors.background.tertiary,
  },
  button_outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: theme.colors.primary.start,
  },
  button_text: {
    backgroundColor: 'transparent',
  },
  button_disabled: {
    opacity: 0.5,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradient_small: {
    borderRadius: theme.borderRadius.md,
  },
  gradient_medium: {
    borderRadius: theme.borderRadius.lg,
  },
  gradient_large: {
    borderRadius: theme.borderRadius.lg,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginRight: theme.spacing.sm,
  },
  text: {
    fontWeight: theme.typography.fontWeight.semibold,
    textAlign: 'center',
  },
  text_small: {
    fontSize: theme.typography.fontSize.sm,
  },
  text_medium: {
    fontSize: theme.typography.fontSize.md,
  },
  text_large: {
    fontSize: theme.typography.fontSize.lg,
  },
  text_primary: {
    color: theme.colors.text.white,
  },
  text_secondary: {
    color: theme.colors.text.primary,
  },
  text_outline: {
    color: theme.colors.primary.start,
  },
  text_text: {
    color: theme.colors.primary.start,
  },
  text_disabled: {
    opacity: 0.6,
  },
  loader: {
    marginHorizontal: theme.spacing.sm,
  },
});
