/**
 * PhoneAuthScreen
 * Phone number input for authentication
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { BackIcon } from '../../components/common';
import { theme } from '../../theme';

interface PhoneAuthScreenProps {
  onBack: () => void;
  onSubmit: (phoneNumber: string) => void;
}

export const PhoneAuthScreen: React.FC<PhoneAuthScreenProps> = ({
  onBack,
  onSubmit,
}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+1');

  const handleSubmit = () => {
    if (phoneNumber.length >= 10) {
      onSubmit(`${countryCode}${phoneNumber}`);
    }
  };

  const formatPhoneNumber = (text: string) => {
    // Remove all non-numeric characters
    const cleaned = text.replace(/\D/g, '');
    
    // Format as (XXX) XXX-XXXX
    if (cleaned.length <= 3) {
      return cleaned;
    } else if (cleaned.length <= 6) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
    } else {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
    }
  };

  const handlePhoneChange = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length <= 10) {
      setPhoneNumber(cleaned);
    }
  };

  const isValid = phoneNumber.length === 10;

  return (
    <LinearGradient
      colors={theme.colors.primary.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          {/* Back Button */}
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <BackIcon size={32} color={theme.colors.text.white} />
          </TouchableOpacity>

          <View style={styles.content}>
            <View style={styles.header}>
              <Text style={styles.title}>Enter your phone number</Text>
              <Text style={styles.subtitle}>
                We'll send you a verification code
              </Text>
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.phoneInputRow}>
                <View style={styles.countryCodeContainer}>
                  <Text style={styles.countryCode}>{countryCode}</Text>
                </View>
                <TextInput
                  style={styles.phoneInput}
                  value={formatPhoneNumber(phoneNumber)}
                  onChangeText={handlePhoneChange}
                  placeholder="(555) 123-4567"
                  placeholderTextColor="rgba(255, 255, 255, 0.5)"
                  keyboardType="phone-pad"
                  maxLength={14} // Formatted length
                  autoFocus
                />
              </View>
            </View>

            <TouchableOpacity
              style={[styles.submitButton, !isValid && styles.submitButtonDisabled]}
              onPress={handleSubmit}
              disabled={!isValid}
              activeOpacity={0.8}
            >
              <Text style={styles.submitButtonText}>Continue</Text>
            </TouchableOpacity>

            <Text style={styles.helperText}>
              Standard message and data rates may apply
            </Text>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: theme.spacing.md,
    left: theme.spacing.md,
    padding: theme.spacing.xs,
    zIndex: 10,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.xl,
    justifyContent: 'center',
  },
  header: {
    marginBottom: theme.spacing.xxl,
  },
  title: {
    fontSize: theme.typography.fontSize.xxxl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.white,
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.text.white,
    textAlign: 'center',
    opacity: 0.9,
  },
  inputContainer: {
    marginBottom: theme.spacing.xl,
  },
  phoneInputRow: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  countryCodeContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.xl,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countryCode: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.white,
  },
  phoneInput: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.xl,
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.white,
  },
  submitButton: {
    backgroundColor: '#000000',
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.xl,
    alignItems: 'center',
    ...theme.shadows.lg,
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitButtonText: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.white,
  },
  helperText: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.text.white,
    textAlign: 'center',
    marginTop: theme.spacing.md,
    opacity: 0.7,
  },
});
