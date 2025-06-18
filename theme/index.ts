/**
 * Centralized theme configuration for the TutorDA Math App
 * Contains colors, fonts, spacing, and platform-specific values
 */

import { Platform } from 'react-native';

export const theme = {
  colors: {
    primary: '#FF6B35',
    secondary: '#FFB366',
    white: '#FFFFFF',
    background: '#F9FAFB',
    text: {
      primary: '#111827',
      secondary: '#6B7280',
      light: '#9CA3AF',
    },
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#6366F1',
  },
  fonts: {
    regular: 'Inter-Regular',
    medium: 'Inter-Medium',
    semiBold: 'Inter-SemiBold',
    bold: 'Inter-Bold',
    headingRegular: 'Poppins-Regular',
    headingMedium: 'Poppins-Medium',
    headingSemiBold: 'Poppins-SemiBold',
    headingBold: 'Poppins-Bold',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    full: 9999,
  },
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 8,
    },
  },
  tabBar: {
    height: Platform.select({
      ios: 70,
      android: 75,
      web: 75,
    }),
    paddingTop: Platform.select({
      ios: 8,
      android: 12,
      web: 12,
    }),
    paddingBottom: Platform.select({
      ios: 8,
      android: 12,
      web: 12,
    }),
    fontSize: {
      tabLabel: 11,
    },
    iconSize: {
      default: 24,
      focused: 26,
    },
  },
  accessibility: {
    minimumTouchTarget: 44,
    contrastRatio: {
      normal: 4.5,
      large: 3.0,
    },
  },
} as const;

export type Theme = typeof theme;
