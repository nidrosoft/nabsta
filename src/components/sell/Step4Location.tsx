/**
 * Step4Location Component
 * Location and Contact Methods
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import * as ExpoLocation from 'expo-location';
import { Location, Sms, Call, MessageText } from 'iconsax-react-native';
import { ListingFormData, ContactMethod } from '../../types/listing';
import { theme } from '../../theme';

interface Step4LocationProps {
  formData: ListingFormData;
  onUpdate: (data: Partial<ListingFormData>) => void;
}

export const Step4Location: React.FC<Step4LocationProps> = ({ formData, onUpdate }) => {
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  const handleDetectLocation = async () => {
    setIsLoadingLocation(true);
    try {
      const { status } = await ExpoLocation.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'Location permission is required to detect your location');
        setIsLoadingLocation(false);
        return;
      }

      const location = await ExpoLocation.getCurrentPositionAsync({});
      const [address] = await ExpoLocation.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (address) {
        onUpdate({
          location: {
            city: address.city || '',
            state: address.region || '',
            zipCode: address.postalCode || '',
          },
        });
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to detect location. Please enter manually.');
    } finally {
      setIsLoadingLocation(false);
    }
  };

  const toggleContactMethod = (method: ContactMethod) => {
    if (method === 'app') return; // App messaging always enabled
    
    const methods = formData.contactMethods.includes(method)
      ? formData.contactMethods.filter(m => m !== method)
      : [...formData.contactMethods, method];
    onUpdate({ contactMethods: methods });
  };

  const needsPhone = formData.contactMethods.includes('phone') || formData.contactMethods.includes('text');

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        {/* Location */}
        <View style={styles.section}>
          <Text style={styles.label}>Location *</Text>
          
          <TouchableOpacity 
            style={styles.detectButton} 
            onPress={handleDetectLocation}
            disabled={isLoadingLocation}
            activeOpacity={0.7}
          >
            {isLoadingLocation ? (
              <ActivityIndicator color={theme.colors.primary.start} />
            ) : (
              <Location size={20} color={theme.colors.primary.start} variant="Bold" />
            )}
            <Text style={styles.detectButtonText}>
              {isLoadingLocation ? 'Detecting...' : 'Use current location'}
            </Text>
          </TouchableOpacity>

          <Text style={styles.orText}>or enter manually</Text>

          <TextInput
            style={styles.input}
            value={formData.location.city}
            onChangeText={(text) => onUpdate({ 
              location: { ...formData.location, city: text }
            })}
            placeholder="City *"
            placeholderTextColor={theme.colors.text.secondary}
          />

          <TextInput
            style={styles.input}
            value={formData.location.state}
            onChangeText={(text) => onUpdate({ 
              location: { ...formData.location, state: text }
            })}
            placeholder="State/Province *"
            placeholderTextColor={theme.colors.text.secondary}
          />

          <TextInput
            style={styles.input}
            value={formData.location.zipCode}
            onChangeText={(text) => onUpdate({ 
              location: { ...formData.location, zipCode: text }
            })}
            placeholder="ZIP/Postal Code (Optional)"
            placeholderTextColor={theme.colors.text.secondary}
            keyboardType="number-pad"
          />

          <View style={styles.privacyNote}>
            <Text style={styles.privacyText}>
              🔒 Exact address shared only after agreement
            </Text>
          </View>
        </View>

        {/* Contact Methods */}
        <View style={styles.section}>
          <Text style={styles.label}>Preferred Contact Methods *</Text>
          
          <TouchableOpacity
            style={[styles.contactCard, styles.contactCardDisabled]}
            disabled
          >
            <MessageText size={24} color={theme.colors.primary.start} variant="Bold" />
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>In-app messaging</Text>
              <Text style={styles.contactDescription}>Always enabled</Text>
            </View>
            <View style={styles.checkmark}>
              <Text style={styles.checkmarkText}>✓</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.contactCard,
              formData.contactMethods.includes('phone') && styles.contactCardSelected,
            ]}
            onPress={() => toggleContactMethod('phone')}
            activeOpacity={0.7}
          >
            <Call size={24} color={theme.colors.text.primary} variant="Bold" />
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>Phone calls</Text>
              <Text style={styles.contactDescription}>Buyers can call you</Text>
            </View>
            {formData.contactMethods.includes('phone') && (
              <View style={styles.checkmark}>
                <Text style={styles.checkmarkText}>✓</Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.contactCard,
              formData.contactMethods.includes('text') && styles.contactCardSelected,
            ]}
            onPress={() => toggleContactMethod('text')}
            activeOpacity={0.7}
          >
            <Sms size={24} color={theme.colors.text.primary} variant="Bold" />
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>Text messages</Text>
              <Text style={styles.contactDescription}>Buyers can text you</Text>
            </View>
            {formData.contactMethods.includes('text') && (
              <View style={styles.checkmark}>
                <Text style={styles.checkmarkText}>✓</Text>
              </View>
            )}
          </TouchableOpacity>

          {needsPhone && (
            <TextInput
              style={styles.input}
              value={formData.phoneNumber}
              onChangeText={(text) => onUpdate({ phoneNumber: text })}
              placeholder="Phone number *"
              placeholderTextColor={theme.colors.text.secondary}
              keyboardType="phone-pad"
            />
          )}
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
    marginBottom: theme.spacing.md,
  },
  detectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.md,
    backgroundColor: '#EFF6FF',
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.md,
  },
  detectButtonText: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.primary.start,
    marginLeft: theme.spacing.sm,
  },
  orText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  input: {
    backgroundColor: theme.colors.background.primary,
    borderWidth: 1,
    borderColor: theme.colors.ui.border,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  privacyNote: {
    padding: theme.spacing.md,
    backgroundColor: '#F9FAFB',
    borderRadius: theme.borderRadius.lg,
    marginTop: theme.spacing.sm,
  },
  privacyText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background.primary,
    borderWidth: 2,
    borderColor: theme.colors.ui.border,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.sm,
  },
  contactCardSelected: {
    borderColor: theme.colors.primary.start,
    backgroundColor: '#F0F9FF',
  },
  contactCardDisabled: {
    borderColor: theme.colors.primary.start,
    backgroundColor: '#F0F9FF',
    opacity: 0.7,
  },
  contactInfo: {
    flex: 1,
    marginLeft: theme.spacing.md,
  },
  contactLabel: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  contactDescription: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: theme.colors.primary.start,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkText: {
    color: theme.colors.text.white,
    fontSize: 14,
    fontWeight: theme.typography.fontWeight.bold,
  },
});
