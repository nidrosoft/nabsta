/**
 * Step2Photos Component
 * Photos, Description, and Brand
 */

import React from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Camera, Gallery, CloseCircle } from 'iconsax-react-native';
import { ListingFormData } from '../../types/listing';
import { theme } from '../../theme';

interface Step2PhotosProps {
  formData: ListingFormData;
  onUpdate: (data: Partial<ListingFormData>) => void;
}

export const Step2Photos: React.FC<Step2PhotosProps> = ({ formData, onUpdate }) => {
  const maxPhotos = 10;
  const canAddMore = formData.photos.length < maxPhotos;

  const handleCamera = async () => {
    if (!canAddMore) {
      Alert.alert('Limit Reached', `You can only add up to ${maxPhotos} photos`);
      return;
    }

    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Camera permission is required to take photos');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      const newPhotos = [...formData.photos, result.assets[0].uri];
      onUpdate({ photos: newPhotos });
    }
  };

  const handleGallery = async () => {
    if (!canAddMore) {
      Alert.alert('Limit Reached', `You can only add up to ${maxPhotos} photos`);
      return;
    }

    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Gallery permission is required to select photos');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false, // Disable editing to allow multiple selection
      quality: 0.8,
      allowsMultipleSelection: true,
      selectionLimit: maxPhotos - formData.photos.length,
    });

    if (!result.canceled && result.assets.length > 0) {
      const newUris = result.assets.map(asset => asset.uri);
      const newPhotos = [...formData.photos, ...newUris].slice(0, maxPhotos);
      onUpdate({ photos: newPhotos });
    }
  };

  const handleRemovePhoto = (index: number) => {
    const newPhotos = formData.photos.filter((_, i) => i !== index);
    onUpdate({ photos: newPhotos });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        {/* Photos */}
        <View style={styles.section}>
          <Text style={styles.label}>Photos * ({formData.photos.length}/{maxPhotos})</Text>
          <Text style={styles.helper}>Add at least 3 photos for better visibility</Text>
          
          <View style={styles.photoGrid}>
            {formData.photos.map((photo, index) => (
              <View key={index} style={styles.photoContainer}>
                <Image source={{ uri: photo }} style={styles.photo} />
                {index === 0 && (
                  <View style={styles.coverBadge}>
                    <Text style={styles.coverText}>Cover</Text>
                  </View>
                )}
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => handleRemovePhoto(index)}
                >
                  <CloseCircle size={24} color="#EF4444" variant="Bold" />
                </TouchableOpacity>
              </View>
            ))}
            
            {canAddMore && (
              <>
                <TouchableOpacity
                  style={styles.addPhotoButton}
                  onPress={handleCamera}
                  activeOpacity={0.7}
                >
                  <Camera size={32} color={theme.colors.text.secondary} />
                  <Text style={styles.addPhotoText}>Camera</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={styles.addPhotoButton}
                  onPress={handleGallery}
                  activeOpacity={0.7}
                >
                  <Gallery size={32} color={theme.colors.text.secondary} />
                  <Text style={styles.addPhotoText}>Gallery</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.label}>Description *</Text>
          <TextInput
            style={styles.textArea}
            value={formData.description}
            onChangeText={(text) => onUpdate({ description: text })}
            placeholder="Describe your item's features, condition, and any flaws..."
            placeholderTextColor={theme.colors.text.secondary}
            multiline
            numberOfLines={6}
            maxLength={1000}
            textAlignVertical="top"
          />
          <Text style={styles.charCount}>{formData.description.length}/1000</Text>
          
          <View style={styles.promptsContainer}>
            <Text style={styles.promptsTitle}>Suggested prompts:</Text>
            <Text style={styles.prompt}>• What makes this item special?</Text>
            <Text style={styles.prompt}>• Are there any defects?</Text>
            <Text style={styles.prompt}>• Why are you selling?</Text>
          </View>
        </View>

        {/* Brand */}
        <View style={styles.section}>
          <Text style={styles.label}>Brand (Optional)</Text>
          <TextInput
            style={styles.input}
            value={formData.brand}
            onChangeText={(text) => onUpdate({ brand: text })}
            placeholder="e.g., Apple, Samsung, Nike"
            placeholderTextColor={theme.colors.text.secondary}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  content: {
    padding: theme.spacing.xl,
  },
  section: {
    marginBottom: theme.spacing.xl,
  },
  label: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  helper: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.md,
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  photoContainer: {
    width: '31%',
    aspectRatio: 1,
    position: 'relative',
  },
  photo: {
    width: '100%',
    height: '100%',
    borderRadius: theme.borderRadius.lg,
    backgroundColor: '#F3F4F6',
  },
  coverBadge: {
    position: 'absolute',
    top: theme.spacing.xs,
    left: theme.spacing.xs,
    backgroundColor: theme.colors.primary.start,
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.sm,
  },
  coverText: {
    fontSize: 10,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.white,
  },
  removeButton: {
    position: 'absolute',
    top: theme.spacing.xs,
    right: theme.spacing.xs,
    backgroundColor: theme.colors.background.primary,
    borderRadius: 12,
  },
  addPhotoButton: {
    width: '31%',
    aspectRatio: 1,
    backgroundColor: '#F9FAFB',
    borderRadius: theme.borderRadius.lg,
    borderWidth: 2,
    borderColor: theme.colors.ui.border,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPhotoText: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.text.secondary,
    marginTop: theme.spacing.xs,
  },
  input: {
    backgroundColor: theme.colors.background.primary,
    borderWidth: 1,
    borderColor: theme.colors.ui.border,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.text.primary,
  },
  textArea: {
    backgroundColor: theme.colors.background.primary,
    borderWidth: 1,
    borderColor: theme.colors.ui.border,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.text.primary,
    minHeight: 120,
  },
  charCount: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.text.secondary,
    textAlign: 'right',
    marginTop: theme.spacing.xs,
  },
  promptsContainer: {
    marginTop: theme.spacing.md,
    padding: theme.spacing.md,
    backgroundColor: '#F9FAFB',
    borderRadius: theme.borderRadius.lg,
  },
  promptsTitle: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  prompt: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
    marginTop: theme.spacing.xs,
  },
});
