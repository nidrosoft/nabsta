/**
 * AuthScreen
 * Combined sign-in and sign-up screen with social auth options
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
import { theme } from '../../theme';

interface AuthScreenProps {
  onAuthComplete: () => void;
  onSignIn?: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onAuthComplete, onSignIn }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    // TODO: Implement Google authentication
    setTimeout(() => {
      setIsLoading(false);
      onAuthComplete();
    }, 1500);
  };

  const handleFacebookAuth = async () => {
    setIsLoading(true);
    // TODO: Implement Facebook authentication
    setTimeout(() => {
      setIsLoading(false);
      onAuthComplete();
    }, 1500);
  };

  const handlePhoneAuth = async () => {
    setIsLoading(true);
    // TODO: Implement Phone authentication
    setTimeout(() => {
      setIsLoading(false);
      onAuthComplete();
    }, 1500);
  };

  return (
    <LinearGradient
      colors={theme.colors.primary.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradientContainer}
    >
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.logo}>NABSTA</Text>
              <Text style={styles.tagline}>Your Local Marketplace</Text>
            </View>

            {/* Auth Options */}
            <View style={styles.authContainer}>
              <Text style={styles.welcomeText}>Welcome!</Text>
              <Text style={styles.subtitle}>
                Sign up to start buying and selling
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

              {/* Sign In Link */}
              <View style={styles.signInContainer}>
                <Text style={styles.signInText}>Already have an account? </Text>
                <TouchableOpacity onPress={onSignIn}>
                  <Text style={styles.signInLink}>Sign In</Text>
                </TouchableOpacity>
              </View>

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
  gradientContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: theme.spacing.xl,
  },
  header: {
    paddingVertical: theme.spacing.xxxl,
    paddingHorizontal: theme.spacing.xl,
    alignItems: 'center',
    marginBottom: theme.spacing.xxxl,
  },
  logo: {
    fontSize: 56,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.white,
    letterSpacing: 2,
    marginBottom: theme.spacing.sm,
  },
  tagline: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text.white,
    opacity: 0.95,
  },
  authContainer: {
    paddingHorizontal: theme.spacing.xl,
  },
  welcomeText: {
    fontSize: theme.typography.fontSize.xxxl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.white,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.text.white,
    opacity: 0.9,
    marginBottom: theme.spacing.xxl,
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
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: theme.spacing.lg,
  },
  signInText: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.text.white,
    opacity: 0.9,
  },
  signInLink: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.text.white,
    fontWeight: theme.typography.fontWeight.bold,
    textDecorationLine: 'underline',
  },
  termsContainer: {
    paddingTop: theme.spacing.lg,
  },
  termsText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.white,
    opacity: 0.8,
    textAlign: 'center',
    lineHeight: theme.typography.fontSize.sm * theme.typography.lineHeight.relaxed,
  },
  termsLink: {
    color: theme.colors.text.white,
    fontWeight: theme.typography.fontWeight.bold,
    opacity: 1,
  },
});
