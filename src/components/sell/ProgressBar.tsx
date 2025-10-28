/**
 * ProgressBar Component
 * Shows progress through the selling flow
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../../theme';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  onStepPress?: (step: number) => void;
}

const STEP_LABELS = ['Post', 'Details', 'Price', 'Location', 'Review'];

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps,
  onStepPress,
}) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: totalSteps }).map((_, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isCurrent = stepNumber === currentStep;
        const canNavigate = stepNumber <= currentStep;

        return (
          <View key={stepNumber} style={styles.stepWrapper}>
            <TouchableOpacity
              style={styles.stepContainer}
              onPress={() => canNavigate && onStepPress?.(stepNumber)}
              disabled={!canNavigate}
              activeOpacity={0.7}
            >
              {isCompleted || isCurrent ? (
                <View style={[styles.step, styles.stepActive]} />
              ) : (
                <View style={[styles.step, styles.stepInactive]} />
              )}
            </TouchableOpacity>
            <Text style={[styles.stepLabel, isCurrent && styles.stepLabelActive]}>
              {STEP_LABELS[index]}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.md,
    paddingBottom: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  stepWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  stepContainer: {
    width: '100%',
    marginBottom: theme.spacing.xs,
  },
  step: {
    height: 4,
    borderRadius: 2,
  },
  stepActive: {
    backgroundColor: theme.colors.text.white,
  },
  stepInactive: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  stepLabel: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: theme.typography.fontWeight.medium,
    textAlign: 'center',
  },
  stepLabelActive: {
    color: theme.colors.text.white,
    fontWeight: theme.typography.fontWeight.bold,
  },
});
