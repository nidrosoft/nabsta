/**
 * NewStep2Details Component
 * Category, Subcategory, Condition, Material, Features, Brand
 */

import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
} from 'react-native';
import { ArrowDown2 } from 'iconsax-react-native';
import { ListingFormData } from '../../types/listing';
import { theme } from '../../theme';
import { 
  SELL_CATEGORIES, 
  CONDITION_OPTIONS,
  MATERIAL_OPTIONS,
  FEATURE_OPTIONS,
  Category,
  Subcategory,
} from '../../constants/sellCategories';

interface NewStep2DetailsProps {
  formData: ListingFormData;
  onUpdate: (data: Partial<ListingFormData>) => void;
  onOpenCategoryModal: () => void;
  onOpenSubcategoryModal: () => void;
  onOpenConditionModal: () => void;
  onOpenMaterialModal: () => void;
  onOpenFeaturesModal: () => void;
  onOpenBrandModal: () => void;
}

export const NewStep2Details: React.FC<NewStep2DetailsProps> = ({ 
  formData, 
  onUpdate,
  onOpenCategoryModal,
  onOpenSubcategoryModal,
  onOpenConditionModal,
  onOpenMaterialModal,
  onOpenFeaturesModal,
  onOpenBrandModal,
}) => {
  const selectedCategory = SELL_CATEGORIES.find(c => c.id === formData.category);
  const selectedSubcategory = selectedCategory?.subcategories.find(
    s => s.id === formData.subcategory
  );
  const selectedCondition = CONDITION_OPTIONS.find(c => c.id === formData.condition);

  const getCategoryDisplayText = () => {
    if (!selectedCategory) return '';
    if (!selectedSubcategory) return selectedCategory.name;
    return `${selectedCategory.name}, ${selectedSubcategory.name}`;
  };

  const getMaterialDisplayText = () => {
    if (!formData.materials || formData.materials.length === 0) return '';
    const selectedMaterials = MATERIAL_OPTIONS.filter(m => 
      formData.materials?.includes(m.id)
    );
    return selectedMaterials.map(m => m.name).join(', ');
  };

  const getFeaturesDisplayText = () => {
    if (!formData.features || formData.features.length === 0) return '';
    const selectedFeatures = FEATURE_OPTIONS.filter(f => 
      formData.features?.includes(f.id)
    );
    return selectedFeatures.map(f => f.name).join(', ');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Category (Required) */}
      <TouchableOpacity
        style={styles.field}
        onPress={onOpenCategoryModal}
        activeOpacity={0.7}
      >
        <View style={styles.fieldHeader}>
          <Text style={styles.fieldLabel}>
            Category <Text style={styles.required}>(required)</Text>
          </Text>
          <ArrowDown2 size={20} color={theme.colors.text.secondary} />
        </View>
        {formData.category ? (
          <Text style={styles.fieldValue}>{getCategoryDisplayText()}</Text>
        ) : (
          <Text style={styles.fieldPlaceholder}>Select category</Text>
        )}
      </TouchableOpacity>

      {/* Subcategory (Optional) - Only show if category is selected */}
      {formData.category && (
        <TouchableOpacity
          style={styles.field}
          onPress={onOpenSubcategoryModal}
          activeOpacity={0.7}
        >
          <View style={styles.fieldHeader}>
            <Text style={styles.fieldLabel}>
              Sub-category <Text style={styles.optional}>(optional)</Text>
            </Text>
            <ArrowDown2 size={20} color={theme.colors.text.secondary} />
          </View>
          {formData.subcategory && selectedSubcategory ? (
            <Text style={styles.fieldValue}>{selectedSubcategory.name}</Text>
          ) : (
            <Text style={styles.fieldPlaceholder}>Select sub-category</Text>
          )}
        </TouchableOpacity>
      )}

      {/* Condition (Required) */}
      <TouchableOpacity
        style={styles.field}
        onPress={onOpenConditionModal}
        activeOpacity={0.7}
      >
        <View style={styles.fieldHeader}>
          <Text style={styles.fieldLabel}>
            Condition <Text style={styles.required}>(required)</Text>
          </Text>
          <ArrowDown2 size={20} color={theme.colors.text.secondary} />
        </View>
        {formData.condition && selectedCondition ? (
          <Text style={styles.fieldValue}>{selectedCondition.name}</Text>
        ) : (
          <Text style={styles.fieldPlaceholder}>Select condition</Text>
        )}
      </TouchableOpacity>

      {/* Material (Optional) */}
      <TouchableOpacity
        style={styles.field}
        onPress={onOpenMaterialModal}
        activeOpacity={0.7}
      >
        <View style={styles.fieldHeader}>
          <Text style={styles.fieldLabel}>
            Material <Text style={styles.optional}>(optional)</Text>
          </Text>
          <ArrowDown2 size={20} color={theme.colors.text.secondary} />
        </View>
        {formData.materials && formData.materials.length > 0 ? (
          <Text style={styles.fieldValue} numberOfLines={2}>
            {getMaterialDisplayText()}
          </Text>
        ) : (
          <Text style={styles.fieldPlaceholder}>Select materials</Text>
        )}
      </TouchableOpacity>

      {/* Features (Optional) */}
      <TouchableOpacity
        style={styles.field}
        onPress={onOpenFeaturesModal}
        activeOpacity={0.7}
      >
        <View style={styles.fieldHeader}>
          <Text style={styles.fieldLabel}>
            Features <Text style={styles.optional}>(optional)</Text>
          </Text>
          <ArrowDown2 size={20} color={theme.colors.text.secondary} />
        </View>
        {formData.features && formData.features.length > 0 ? (
          <Text style={styles.fieldValue} numberOfLines={2}>
            {getFeaturesDisplayText()}
          </Text>
        ) : (
          <Text style={styles.fieldPlaceholder}>Select features</Text>
        )}
      </TouchableOpacity>

      {/* Brand (Optional) */}
      <TouchableOpacity
        style={styles.field}
        onPress={onOpenBrandModal}
        activeOpacity={0.7}
      >
        <View style={styles.fieldHeader}>
          <Text style={styles.fieldLabel}>
            Brand <Text style={styles.optional}>(optional)</Text>
          </Text>
          <ArrowDown2 size={20} color={theme.colors.text.secondary} />
        </View>
        {formData.brand ? (
          <Text style={styles.fieldValue}>{formData.brand}</Text>
        ) : (
          <Text style={styles.fieldPlaceholder}>Enter brand</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.md,
  },
  field: {
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.ui.border,
  },
  fieldHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  fieldLabel: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
  },
  required: {
    color: theme.colors.text.secondary,
  },
  optional: {
    color: theme.colors.text.tertiary,
  },
  fieldValue: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
  },
  fieldPlaceholder: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.text.tertiary,
  },
});
