/**
 * ListingCard Component
 * Card for displaying individual listings in feed
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../../theme';

interface Listing {
  id: string;
  title: string;
  price: number;
  image: string;
  location: string;
}

interface ListingCardProps {
  listing: Listing;
  onPress?: () => void;
  index?: number;
}

export const ListingCard: React.FC<ListingCardProps> = ({
  listing,
  onPress,
  index = 0,
}) => {
  const { image } = listing;
  
  // Varied heights for natural masonry look (optimized for 3 columns)
  const heights = [160, 220, 180, 250, 140, 200, 240, 170, 210, 190, 230, 150, 260, 175, 195];
  const height = heights[index % heights.length];
  
  return (
    <TouchableOpacity
      style={[styles.container, { height }]}
      onPress={onPress}
      activeOpacity={0.95}
    >
      <Image
        source={{ uri: image }}
        style={styles.image}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 0, // Straight corners
    overflow: 'hidden',
    backgroundColor: theme.colors.background.tertiary,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
