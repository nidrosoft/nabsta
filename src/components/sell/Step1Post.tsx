/**
 * NewStep1Post Component
 * Combined: Photos + Title + Description
 */

import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Camera, Gallery, CloseCircle } from 'iconsax-react-native';
import { ListingFormData } from '../../types/listing';
import { theme } from '../../theme';

interface NewStep1PostProps {
  formData: ListingFormData;
  onUpdate: (data: Partial<ListingFormData>) => void;
}

export const NewStep1Post: React.FC<NewStep1PostProps> = ({ formData, onUpdate }) => {
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
      allowsEditing: false,
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
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}
    >
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Photo Buttons */}
      <View style={styles.photoButtonsContainer}>
        <TouchableOpacity
          style={styles.photoButton}
          onPress={handleCamera}
          activeOpacity={0.7}
        >
          <Camera size={24} color={theme.colors.primary.start} variant="Bold" />
          <Text style={styles.photoButtonText}>Take photo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.photoButton}
          onPress={handleGallery}
          activeOpacity={0.7}
        >
          <Gallery size={24} color={theme.colors.primary.start} variant="Bold" />
          <Text style={styles.photoButtonText}>Select photo</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.hint}>Add your cover photo first.</Text>

      {/* Photo Grid */}
      {formData.photos.length > 0 && (
        <View style={styles.photoGrid}>
          {formData.photos.map((uri, index) => (
            <View key={index} style={styles.photoItem}>
              <Image source={{ uri }} style={styles.photo} />
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemovePhoto(index)}
                activeOpacity={0.7}
              >
                <CloseCircle size={24} color="#EF4444" variant="Bold" />
              </TouchableOpacity>
              {index === 0 && (
                <View style={styles.coverBadge}>
                  <Text style={styles.coverBadgeText}>Cover</Text>
                </View>
              )}
            </View>
          ))}
        </View>
      )}

      {/* Title */}
      <View style={styles.section}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Test"
          placeholderTextColor={theme.colors.text.tertiary}
          value={formData.title}
          onChangeText={(text) => onUpdate({ title: text })}
          maxLength={80}
        />
        <Text style={styles.helperText}>
          For example: Brand, model, color, and size.
        </Text>
      </View>

      {/* Description */}
      <View style={styles.section}>
        <Text style={styles.label}>Description (optional)</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Test"
          placeholderTextColor={theme.colors.text.tertiary}
          value={formData.description}
          onChangeText={(text) => onUpdate({ description: text })}
          multiline
          numberOfLines={6}
          textAlignVertical="top"
          maxLength={1000}
        />
        
        {/* Suggested Prompts */}
        <View style={styles.suggestedPrompts}>
          <Text style={styles.promptsTitle}>Suggested prompts:</Text>
          <Text style={styles.promptItem}>• What makes this item special?</Text>
          <Text style={styles.promptItem}>• Are there any defects?</Text>
          <Text style={styles.promptItem}>• Why are you selling?</Text>
        </View>
      </View>
    </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.md,
  },
  photoButtonsContainer: {
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.xs,
  },
  photoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 2,
    borderColor: theme.colors.primary.start,
    backgroundColor: theme.colors.background.primary,
  },
  photoButtonText: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.primary.start,
  },
  hint: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.lg,
  },
  photoItem: {
    width: '31%',
    aspectRatio: 1,
    position: 'relative',
  },
  photo: {
    width: '100%',
    height: '100%',
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.background.tertiary,
  },
  removeButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: theme.colors.background.primary,
    borderRadius: 12,
  },
  coverBadge: {
    position: 'absolute',
    bottom: 4,
    left: 4,
    backgroundColor: theme.colors.primary.start,
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.sm,
  },
  coverBadgeText: {
    fontSize: theme.typography.fontSize.xs,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.white,
  },
  section: {
    marginBottom: theme.spacing.lg,
  },
  label: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.ui.border,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.text.primary,
    backgroundColor: theme.colors.background.primary,
  },
  textArea: {
    minHeight: 120,
    paddingTop: theme.spacing.sm,
  },
  helperText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.tertiary,
    marginTop: theme.spacing.xs,
  },
  suggestedPrompts: {
    marginTop: theme.spacing.md,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.md,
  },
  promptsTitle: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xs,
  },
  promptItem: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.tertiary,
    marginTop: 2,
  },
});
