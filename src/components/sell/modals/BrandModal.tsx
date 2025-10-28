/**
 * BrandModal - Bottom sheet for entering brand name
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { CloseCircle } from 'iconsax-react-native';
import { theme } from '../../../theme';

interface BrandModalProps {
  visible: boolean;
  currentBrand?: string;
  onUpdate: (brand: string) => void;
  onClose: () => void;
}

export const BrandModal: React.FC<BrandModalProps> = ({ visible, currentBrand, onUpdate, onClose }) => {
  const [brand, setBrand] = useState(currentBrand || '');

  useEffect(() => { setBrand(currentBrand || ''); }, [currentBrand]);

  const handleDone = () => { onUpdate(brand); onClose(); };
  const handleClear = () => { setBrand(''); };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardView}>
          <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
            <View style={styles.header}>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <CloseCircle size={24} color={theme.colors.primary.start} variant="Bold" />
              </TouchableOpacity>
              <Text style={styles.title}>Brand</Text>
              <TouchableOpacity onPress={handleClear}><Text style={styles.clearText}>Clear</Text></TouchableOpacity>
            </View>
            <View style={styles.content}>
              <TextInput style={styles.input} placeholder="Enter brand name" placeholderTextColor={theme.colors.text.tertiary} value={brand} onChangeText={setBrand} autoFocus maxLength={50} />
            </View>
            <View style={styles.footer}>
              <TouchableOpacity style={styles.doneButton} onPress={handleDone} activeOpacity={0.7}>
                <Text style={styles.doneButtonText}>Done</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </KeyboardAvoidingView>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'flex-end' },
  keyboardView: { justifyContent: 'flex-end' },
  modalContent: { backgroundColor: theme.colors.background.primary, borderTopLeftRadius: theme.borderRadius.xl, borderTopRightRadius: theme.borderRadius.xl },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: theme.spacing.md, paddingVertical: theme.spacing.md, borderBottomWidth: 1, borderBottomColor: theme.colors.ui.border },
  closeButton: { padding: theme.spacing.xs },
  title: { fontSize: theme.typography.fontSize.xl, fontWeight: theme.typography.fontWeight.bold, color: theme.colors.text.primary },
  clearText: { fontSize: theme.typography.fontSize.md, color: theme.colors.primary.start, fontWeight: theme.typography.fontWeight.semibold },
  content: { padding: theme.spacing.md },
  input: { borderWidth: 2, borderColor: theme.colors.primary.start, borderRadius: theme.borderRadius.md, paddingHorizontal: theme.spacing.md, paddingVertical: theme.spacing.sm, fontSize: theme.typography.fontSize.md, color: theme.colors.text.primary },
  footer: { padding: theme.spacing.md, borderTopWidth: 1, borderTopColor: theme.colors.ui.border },
  doneButton: { backgroundColor: theme.colors.background.secondary, paddingVertical: theme.spacing.md, borderRadius: theme.borderRadius.lg, alignItems: 'center' },
  doneButtonText: { fontSize: theme.typography.fontSize.md, fontWeight: theme.typography.fontWeight.semibold, color: theme.colors.text.secondary },
});
