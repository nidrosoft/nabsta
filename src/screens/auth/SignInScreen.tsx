/**
 * SignInScreen
 * User sign in with multiple options
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Google, Facebook, Call } from 'iconsax-react-native';
import { BackIcon } from '../../components/common';
import { theme } from '../../theme';

interface SignInScreenProps {
  onBack: () => void;
  onPhoneAuth: () => void;
  onGoogleAuth: () => void;
  onFacebookAuth: () => void;
}

export const SignInScreen: React.FC<SignInScreenProps> = ({
  onBack,
  onPhoneAuth,
  onGoogleAuth,
  onFacebookAuth,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    try {
      await onGoogleAuth();
    } finally {
      setIsLoading(false);
    }
  };

  const handleFacebookAuth = async () => {
    setIsLoading(true);
    try {
      await onFacebookAuth();
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneAuth = () => {
    onPhoneAuth();
  };

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
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* Back Button */}
            <TouchableOpacity style={styles.backButton} onPress={onBack}>
              <BackIcon size={32} color={theme.colors.text.white} />
            </TouchableOpacity>

            {/* Auth Options */}
            <View style={styles.authContainer}>
              <Text style={styles.welcomeText}>Welcome Back!</Text>
              <Text style={styles.subtitle}>
                Sign in to continue
              </Text>

              <View style={styles.buttonContainer}>
                {/* Google Button */}
                <TouchableOpacity
                  style={styles.authButton}
                  onPress={handleGoogleAuth}
                  disabled={isLoading}
                  activeOpacity={0.8}
                >
                  <Google size={24} color="#DB4437" variant="Bold" />
                  <Text style={styles.authButtonText}>Continue with Google</Text>
                </TouchableOpacity>

                {/* Separator */}
                <View style={styles.separatorContainer}>
                  <View style={styles.separatorLine} />
                  <Text style={styles.separatorText}>or</Text>
                  <View style={styles.separatorLine} />
                </View>

                {/* Facebook Button */}
                <TouchableOpacity
                  style={styles.authButton}
                  onPress={handleFacebookAuth}
                  disabled={isLoading}
                  activeOpacity={0.8}
                >
                  <Facebook size={24} color="#1877F2" variant="Bold" />
                  <Text style={styles.authButtonText}>Continue with Facebook</Text>
                </TouchableOpacity>

                {/* Phone Button */}
                <TouchableOpacity
                  style={styles.phoneButton}
                  onPress={handlePhoneAuth}
                  disabled={isLoading}
                  activeOpacity={0.8}
                >
                  <Call size={24} color={theme.colors.text.white} variant="Bold" />
                  <Text style={styles.phoneButtonText}>Continue with Phone</Text>
                </TouchableOpacity>
                <Text style={styles.helperText}>Fast & easy. No password to remember.</Text>
              </View>

              {/* Terms */}
              <View style={styles.termsContainer}>
                <Text style={styles.termsText}>
                  By continuing, you agree to our{' '}
                  <Text style={styles.termsLink}>Terms of Service</Text>
                  {' '}and{' '}
                  <Text style={styles.termsLink}>Privacy Policy</Text>
                </Text>
              </View>
            </View>
          </ScrollView>
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
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.xl,
  },
  backButton: {
    position: 'absolute',
    top: theme.spacing.md,
    left: theme.spacing.md,
    padding: theme.spacing.xs,
    zIndex: 10,
  },
  authContainer: {
    width: '100%',
    paddingVertical: theme.spacing.xxl,
  },
  welcomeText: {
    fontSize: theme.typography.fontSize.xxxl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.white,
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.text.white,
    marginBottom: theme.spacing.xxl,
    textAlign: 'center',
    opacity: 0.9,
  },
  buttonContainer: {
    gap: theme.spacing.md,
  },
  authButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background.primary,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.xl,
    gap: theme.spacing.md,
    ...theme.shadows.md,
  },
  authButtonText: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
  },
  phoneButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.xl,
    gap: theme.spacing.md,
    ...theme.shadows.md,
  },
  phoneButtonText: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.white,
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: theme.spacing.sm,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.text.white,
    opacity: 0.3,
  },
  separatorText: {
    color: theme.colors.text.white,
    paddingHorizontal: theme.spacing.md,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
  },
  helperText: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.text.white,
    textAlign: 'center',
    marginTop: theme.spacing.xs,
    opacity: 0.9,
  },
  termsContainer: {
    marginTop: theme.spacing.xl,
    paddingHorizontal: theme.spacing.md,
  },
  termsText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.white,
    textAlign: 'center',
    lineHeight: 20,
    opacity: 0.8,
  },
  termsLink: {
    fontWeight: theme.typography.fontWeight.bold,
    textDecorationLine: 'underline',
  },
});
