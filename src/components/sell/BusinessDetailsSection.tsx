/**
 * BusinessDetailsSection Component
 * Additional fields for business listings
 */

import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { ArrowDown2, ArrowUp2 } from 'iconsax-react-native';
import { ListingFormData } from '../../types/listing';
import { theme } from '../../theme';

interface BusinessDetailsSectionProps {
  formData: ListingFormData;
  onUpdate: (data: Partial<ListingFormData>) => void;
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export const BusinessDetailsSection: React.FC<BusinessDetailsSectionProps> = ({ formData, onUpdate }) => {
  const [showHours, setShowHours] = React.useState(false);

  const updateBusinessHours = (day: string, value: string) => {
    onUpdate({
      businessHours: {
        ...formData.businessHours,
        [day.toLowerCase()]: value,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Business Information</Text>
      
      {/* Business Name */}
      <View style={styles.field}>
        <Text style={styles.label}>Business Name (Optional)</Text>
        <TextInput
          style={styles.input}
          value={formData.businessName || ''}
          onChangeText={(text) => onUpdate({ businessName: text })}
          placeholder="e.g., Tech Store Inc."
          placeholderTextColor={theme.colors.text.secondary}
        />
      </View>

      {/* Website */}
      <View style={styles.field}>
        <Text style={styles.label}>Website (Optional)</Text>
        <TextInput
          style={styles.input}
          value={formData.businessWebsite || ''}
          onChangeText={(text) => onUpdate({ businessWebsite: text })}
          placeholder="e.g., https://www.example.com"
          placeholderTextColor={theme.colors.text.secondary}
          keyboardType="url"
          autoCapitalize="none"
        />
      </View>

      {/* Business Hours */}
      <View style={styles.field}>
        <TouchableOpacity
          style={styles.hoursHeader}
          onPress={() => setShowHours(!showHours)}
          activeOpacity={0.7}
        >
          <Text style={styles.label}>Business Hours (Optional)</Text>
          {showHours ? (
            <ArrowUp2 size={20} color={theme.colors.text.primary} />
          ) : (
            <ArrowDown2 size={20} color={theme.colors.text.primary} />
          )}
        </TouchableOpacity>

        {showHours && (
          <View style={styles.hoursContainer}>
            {DAYS.map((day) => (
              <View key={day} style={styles.dayRow}>
                <Text style={styles.dayLabel}>{day}</Text>
                <TextInput
                  style={styles.hoursInput}
                  value={formData.businessHours?.[day.toLowerCase() as keyof typeof formData.businessHours] || ''}
                  onChangeText={(text) => updateBusinessHours(day, text)}
                  placeholder="e.g., 9:00 AM - 5:00 PM"
                  placeholderTextColor={theme.colors.text.secondary}
                />
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: theme.colors.ui.border,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.lg,
  },
  field: {
    marginBottom: theme.spacing.lg,
  },
  label: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  input: {
    backgroundColor: theme.colors.background.primary,
    borderWidth: 1,
    borderColor: theme.colors.ui.border,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.text.primary,
  },
  hoursHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hoursContainer: {
    marginTop: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  dayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  dayLabel: {
    width: 100,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text.primary,
  },
  hoursInput: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
    borderWidth: 1,
    borderColor: theme.colors.ui.border,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.sm,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.primary,
  },
});
