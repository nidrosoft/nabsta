/**
 * Screen Transitions
 * Smooth animated transitions for screen navigation
 */

import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

/**
 * Smooth slide transition from right to left
 * Used for forward navigation (e.g., Home -> Category Detail)
 */
export const slideFromRightTransition: NativeStackNavigationOptions = {
  animation: 'slide_from_right',
  gestureEnabled: true,
  fullScreenGestureEnabled: true,
};

/**
 * Smooth fade transition
 * Used for tab navigation
 */
export const fadeTransition: NativeStackNavigationOptions = {
  animation: 'fade',
  gestureEnabled: false,
};

/**
 * Modal slide up transition
 * Used for modal-style screens
 */
export const modalSlideTransition: NativeStackNavigationOptions = {
  animation: 'slide_from_bottom',
  presentation: 'modal',
  gestureEnabled: true,
  fullScreenGestureEnabled: true,
};

/**
 * Simple slide transition
 * Smooth and native feeling
 */
export const simpleSlideTransition: NativeStackNavigationOptions = {
  animation: 'simple_push',
  gestureEnabled: true,
  fullScreenGestureEnabled: true,
};

/**
 * Default screen options with smooth transitions
 */
export const defaultScreenOptions: NativeStackNavigationOptions = {
  headerShown: false,
  animation: 'slide_from_right',
  gestureEnabled: true,
  fullScreenGestureEnabled: true,
};
