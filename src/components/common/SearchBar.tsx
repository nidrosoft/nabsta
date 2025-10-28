/**
 * SearchBar Component
 * Search input with location display
 */

import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import { theme } from '../../theme';

export interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  location?: string;
  onLocationPress?: () => void;
  searchIcon?: React.ReactNode;
  locationIcon?: React.ReactNode;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search',
  value,
  onChangeText,
  location,
  onLocationPress,
  searchIcon,
  locationIcon,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        {searchIcon && <View style={styles.searchIcon}>{searchIcon}</View>}
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor={theme.colors.text.tertiary}
        />
      </View>
      
      {location && (
        <TouchableOpacity
          style={styles.locationContainer}
          onPress={onLocationPress}
          activeOpacity={0.7}
        >
          {locationIcon && <View style={styles.locationIcon}>{locationIcon}</View>}
          <Text style={styles.locationText}>{location}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.xl,
    paddingHorizontal: theme.spacing.md,
    height: 48,
    ...theme.shadows.sm,
  },
  searchIcon: {
    marginRight: theme.spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.text.primary,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  locationIcon: {
    // No margin needed with gap
  },
  locationText: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.white,
  },
});
