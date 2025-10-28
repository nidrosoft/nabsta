/**
 * SellFlowScreen
 * Main container for the selling flow
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, CloseSquare } from 'iconsax-react-native';
import {
  ProgressBar,
  Step1Post,
  Step2Details,
  Step3Price,
  Step4Location,
  Step5Review,
  SuccessModal,
  CategoryModal,
  SubcategoryModal,
  ConditionModal,
  MaterialModal,
  FeaturesModal,
  BrandModal,
} from '../../components/sell';
import { BackIcon } from '../../components/common';
import { ListingFormData } from '../../types/listing';
import { theme } from '../../theme';

interface SellFlowScreenProps {
  onClose: () => void;
  onPublish?: () => void;
}

const INITIAL_FORM_DATA: ListingFormData = {
  photos: [],
  title: '',
  description: '',
  category: '',
  subcategory: '',
  condition: '',
  materials: [],
  features: [],
  brand: '',
  isBusiness: false,
  price: '',
  isFree: false,
  isNegotiable: false,
  isFirmOnPrice: false,
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
  
  // Modal states
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showSubcategoryModal, setShowSubcategoryModal] = useState(false);
  const [showConditionModal, setShowConditionModal] = useState(false);
  const [showMaterialModal, setShowMaterialModal] = useState(false);
  const [showFeaturesModal, setShowFeaturesModal] = useState(false);
  const [showBrandModal, setShowBrandModal] = useState(false);

  const totalSteps = 5;

  const updateFormData = (data: Partial<ListingFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return formData.photos.length >= 1 && formData.title.length >= 3;
      case 2:
        return !!(formData.category && formData.condition);
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
        return <Step1Post formData={formData} onUpdate={updateFormData} />;
      case 2:
        return (
          <Step2Details
            formData={formData}
            onUpdate={updateFormData}
            onOpenCategoryModal={() => setShowCategoryModal(true)}
            onOpenSubcategoryModal={() => setShowSubcategoryModal(true)}
            onOpenConditionModal={() => setShowConditionModal(true)}
            onOpenMaterialModal={() => setShowMaterialModal(true)}
            onOpenFeaturesModal={() => setShowFeaturesModal(true)}
            onOpenBrandModal={() => setShowBrandModal(true)}
          />
        );
      case 3:
        return <Step3Price formData={formData} onUpdate={updateFormData} />;
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
      case 1: return 'Post an Item';
      case 2: return 'Details';
      case 3: return 'Price';
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
            <TouchableOpacity onPress={handleBack} style={styles.iconButton} activeOpacity={0.7}>
              <View style={styles.iconContainer}>
                <ArrowLeft size={22} color={theme.colors.text.primary} variant="Linear" />
              </View>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{getStepTitle()}</Text>
            <TouchableOpacity onPress={onClose} style={styles.iconButton} activeOpacity={0.7}>
              <View style={styles.iconContainer}>
                <CloseSquare size={22} color={theme.colors.text.primary} variant="Linear" />
              </View>
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
      
      {/* Modals */}
      <CategoryModal
        visible={showCategoryModal}
        selectedCategory={formData.category}
        onSelect={(categoryId) => {
          updateFormData({ category: categoryId, subcategory: '' });
        }}
        onClose={() => setShowCategoryModal(false)}
      />
      
      <SubcategoryModal
        visible={showSubcategoryModal}
        categoryId={formData.category}
        selectedSubcategory={formData.subcategory}
        onSelect={(subcategoryId) => updateFormData({ subcategory: subcategoryId })}
        onClear={() => updateFormData({ subcategory: '' })}
        onClose={() => setShowSubcategoryModal(false)}
      />
      
      <ConditionModal
        visible={showConditionModal}
        selectedCondition={formData.condition}
        onSelect={(conditionId) => updateFormData({ condition: conditionId })}
        onClose={() => setShowConditionModal(false)}
      />
      
      <MaterialModal
        visible={showMaterialModal}
        selectedMaterials={formData.materials || []}
        onUpdate={(materials) => updateFormData({ materials })}
        onClose={() => setShowMaterialModal(false)}
      />
      
      <FeaturesModal
        visible={showFeaturesModal}
        selectedFeatures={formData.features || []}
        onUpdate={(features) => updateFormData({ features })}
        onClose={() => setShowFeaturesModal(false)}
      />
      
      <BrandModal
        visible={showBrandModal}
        currentBrand={formData.brand}
        onUpdate={(brand) => updateFormData({ brand })}
        onClose={() => setShowBrandModal(false)}
      />
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
  iconButton: {
    padding: theme.spacing.xs,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.background.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.white,
    flex: 1,
    textAlign: 'center',
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
