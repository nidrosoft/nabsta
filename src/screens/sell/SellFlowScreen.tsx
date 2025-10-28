/**
 * SellFlowScreen
 * Main container for the selling flow
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft2 } from 'iconsax-react-native';
import {
  ProgressBar,
  Step1Category,
  Step2Photos,
  Step3Pricing,
  Step4Location,
  Step5Review,
  SuccessModal,
} from '../../components/sell';
import { BackIcon } from '../../components/common';
import { ListingFormData } from '../../types/listing';
import { theme } from '../../theme';

interface SellFlowScreenProps {
  onClose: () => void;
  onPublish?: () => void;
}

const INITIAL_FORM_DATA: ListingFormData = {
  category: '',
  title: '',
  condition: null,
  isBusiness: false,
  photos: [],
  description: '',
  brand: '',
  price: '',
  isFree: false,
  isNegotiable: false,
  quantity: 1,
  location: {
    city: '',
    state: '',
    zipCode: '',
  },
  contactMethods: ['app'],
  phoneNumber: '',
  agreedToTerms: false,
  promoteOptions: {
    featured: false,
    boosted: false,
  },
};

export const SellFlowScreen: React.FC<SellFlowScreenProps> = ({ onClose, onPublish }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ListingFormData>(INITIAL_FORM_DATA);
  const [showSuccess, setShowSuccess] = useState(false);

  const totalSteps = 5;

  const updateFormData = (data: Partial<ListingFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.category && formData.title && formData.condition);
      case 2:
        return formData.photos.length >= 1 && formData.description.length >= 10;
      case 3:
        return formData.isFree || (formData.price && parseFloat(formData.price) > 0);
      case 4:
        return !!(formData.location.city && formData.location.state);
      case 5:
        return formData.agreedToTerms;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (!validateStep(currentStep)) {
      Alert.alert('Incomplete', 'Please fill in all required fields');
      return;
    }
    
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      handleSaveDraft();
    }
  };

  const handleStepPress = (step: number) => {
    if (step <= currentStep) {
      setCurrentStep(step);
    }
  };

  const handleSaveDraft = () => {
    Alert.alert(
      'Save Draft',
      'Do you want to save this listing as a draft?',
      [
        { text: 'Discard', onPress: onClose, style: 'destructive' },
        { text: 'Save Draft', onPress: () => {
          // TODO: Save to AsyncStorage
          console.log('Draft saved:', formData);
          onClose();
        }},
      ]
    );
  };

  const handlePublish = async () => {
    if (!validateStep(5)) {
      Alert.alert('Error', 'Please agree to the terms of service');
      return;
    }

    // TODO: API call to publish listing
    console.log('Publishing listing:', formData);
    
    // Show success modal with celebration
    setShowSuccess(true);
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    onPublish?.();
    onClose();
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1Category formData={formData} onUpdate={updateFormData} />;
      case 2:
        return <Step2Photos formData={formData} onUpdate={updateFormData} />;
      case 3:
        return <Step3Pricing formData={formData} onUpdate={updateFormData} />;
      case 4:
        return <Step4Location formData={formData} onUpdate={updateFormData} />;
      case 5:
        return (
          <Step5Review
            formData={formData}
            onEdit={setCurrentStep}
            onUpdate={updateFormData}
          />
        );
      default:
        return null;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return 'Category & Title';
      case 2: return 'Photos & Description';
      case 3: return 'Pricing';
      case 4: return 'Location';
      case 5: return 'Review & Publish';
      default: return '';
    }
  };

  const isStepValid = validateStep(currentStep);
  const isLastStep = currentStep === totalSteps;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={theme.colors.primary.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientHeader}
      >
        <SafeAreaView edges={['top']}>
          <View style={styles.header}>
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
              <BackIcon size={32} color={theme.colors.text.white} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{getStepTitle()}</Text>
            <TouchableOpacity onPress={handleSaveDraft} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
          
          <ProgressBar
            currentStep={currentStep}
            totalSteps={totalSteps}
            onStepPress={handleStepPress}
          />
        </SafeAreaView>
      </LinearGradient>

      <View style={styles.content}>
        {renderStep()}
      </View>

      <SafeAreaView edges={['bottom']} style={styles.footer}>
        <TouchableOpacity
          style={[styles.nextButton, !isStepValid && styles.nextButtonDisabled]}
          onPress={isLastStep ? handlePublish : handleNext}
          disabled={!isStepValid}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={isStepValid ? theme.colors.primary.gradient : ['#D1D5DB', '#D1D5DB']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.nextButtonGradient}
          >
            <Text style={styles.nextButtonText}>
              {isLastStep ? 'Publish Listing' : 'Next'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </SafeAreaView>

      <SuccessModal visible={showSuccess} onClose={handleSuccessClose} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  gradientHeader: {
    // Gradient header
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
  },
  backButton: {
    padding: theme.spacing.xs,
  },
  headerTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.white,
    flex: 1,
    textAlign: 'center',
  },
  saveButton: {
    padding: theme.spacing.xs,
  },
  saveButtonText: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.white,
  },
  content: {
    flex: 1,
  },
  footer: {
    padding: theme.spacing.xl,
    backgroundColor: theme.colors.background.primary,
    borderTopWidth: 1,
    borderTopColor: theme.colors.ui.border,
  },
  nextButton: {
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
    ...theme.shadows.lg,
  },
  nextButtonDisabled: {
    opacity: 0.5,
  },
  nextButtonGradient: {
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButtonText: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.white,
  },
});
