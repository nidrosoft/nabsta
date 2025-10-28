/**
 * Central theme export
 * Combines all theme tokens for easy access
 */

import { colors } from './colors';
import { spacing } from './spacing';
import { typography } from './typography';
import { shadows } from './shadows';
import { borderRadius } from './borderRadius';

export const theme = {
  colors,
  spacing,
  typography,
  shadows,
  borderRadius,
};

export type Theme = typeof theme;

// Re-export individual modules
export { colors } from './colors';
export { spacing } from './spacing';
export { typography } from './typography';
export { shadows } from './shadows';
export { borderRadius } from './borderRadius';
