/**
 * PhoneVerificationScreen
 * OTP code verification
 */

import React, { useState, useRef } from 'react';
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

interface PhoneVerificationScreenProps {
  onBack: () => void;
  onVerify: (code: string) => void;
  phoneNumber: string;
}

export const PhoneVerificationScreen: React.FC<PhoneVerificationScreenProps> = ({
  onBack,
  onVerify,
  phoneNumber,
}) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const handleCodeChange = (text: string, index: number) => {
    // Only allow numbers
    if (text && !/^\d+$/.test(text)) return;

    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // Auto-focus next input
    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all digits are entered
    if (index === 5 && text) {
      const fullCode = newCode.join('');
      if (fullCode.length === 6) {
        handleVerify(fullCode);
      }
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = (verificationCode?: string) => {
    const fullCode = verificationCode || code.join('');
    if (fullCode.length === 6) {
      onVerify(fullCode);
    }
  };

  const handleResend = () => {
    // Reset code
    setCode(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
    // TODO: Implement resend logic
    console.log('Resend code');
  };

  const isComplete = code.every(digit => digit !== '');

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
              <Text style={styles.title}>Enter verification code</Text>
              <Text style={styles.subtitle}>
                We sent a code to {phoneNumber}
              </Text>
            </View>

            <View style={styles.codeContainer}>
              {code.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={ref => {
                    inputRefs.current[index] = ref;
                  }}
                  style={[
                    styles.codeInput,
                    digit && styles.codeInputFilled,
                  ]}
                  value={digit}
                  onChangeText={text => handleCodeChange(text, index)}
                  onKeyPress={e => handleKeyPress(e, index)}
                  keyboardType="number-pad"
                  maxLength={1}
                  selectTextOnFocus
                  autoFocus={index === 0}
                />
              ))}
            </View>

            <TouchableOpacity
              style={[styles.submitButton, !isComplete && styles.submitButtonDisabled]}
              onPress={() => handleVerify()}
              disabled={!isComplete}
              activeOpacity={0.8}
            >
              <Text style={styles.submitButtonText}>Verify</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.resendButton} onPress={handleResend}>
              <Text style={styles.resendText}>
                Didn't receive a code? <Text style={styles.resendLink}>Resend</Text>
              </Text>
            </TouchableOpacity>
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
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.xxl,
  },
  codeInput: {
    width: 50,
    height: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: theme.borderRadius.lg,
    fontSize: theme.typography.fontSize.xxl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.white,
    textAlign: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  codeInputFilled: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderColor: 'rgba(255, 255, 255, 0.5)',
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
  resendButton: {
    marginTop: theme.spacing.lg,
    alignItems: 'center',
  },
  resendText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.white,
    opacity: 0.9,
  },
  resendLink: {
    fontWeight: theme.typography.fontWeight.bold,
    textDecorationLine: 'underline',
  },
});
