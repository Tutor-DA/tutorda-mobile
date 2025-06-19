import { Platform } from 'react-native';

/**
 * Centralized theme configuration for the TutorDA Math App
 */
export const theme = {
  colors: {
  primary: '#FF6B35',
  primaryLight: '#FF9E70',
  primaryDark: '#CC552A',

  secondary: '#FFB366',
  secondaryLight: '#FFD8B3',
  secondaryDark: '#CC8F52',

  accent: '#F59E0B',
  accentLight: '#FBBF24',
  accentDark: '#D97706',

  background: '#F9FAFB',
  surface: '#FFFFFF',
  surfaceLight: '#F1F5F9',
  surfaceDark: '#E5E7EB',

  text: {
    primary: '#111827',
    secondary: '#6B7280',
    light: '#9CA3AF',
    inverse: '#FFFFFF',
  },

  border: '#E2E8F0',
  borderLight: '#F1F5F9',

  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',

  green: {
    light: '#ECFDF5',
    medium: '#A7F3D0',
    dark: '#34D399',
  },

  red: {
    light: '#FEF2F2',
    medium: '#FCA5A5',
    dark: '#F87171',
  },

  yellow: {
    light: '#FFFBEB',
    medium: '#FDE68A',
    dark: '#FBBF24',
  },

  blue: {
    light: '#EFF6FF',
    medium: '#BFDBFE',
    dark: '#60A5FA',
  },

  purple: '#8B5CF6',
  black: '#000000',
  white: '#FFFFFF',
  gray: {
    light: '#F3F4F6',
    medium: '#D1D5DB',
    dark: '#9CA3AF',
  },
  transparent: 'transparent',
  },
  gradients: {
    primary: ['#FF6B35', '#FF9E70'],
    secondary: ['#FFB366', '#FFD8B3'],
    accent: ['#F59E0B', '#FBBF24'],
    success: ['#10B981', '#34D399'],
    warning: ['#F59E0B', '#FDE68A'],
    error: ['#EF4444', '#FCA5A5'],
    info: ['#3B82F6', '#60A5FA'],
  },
  breakpoints: {
    xs: 0, // Extra small devices (phones)
    sm: 640, // Small devices (tablets)
    md: 768, // Medium devices (desktops)
    lg: 1024, // Large devices (large desktops)
    xl: 1280, // Extra large devices (extra large desktops)
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
  typography: {
    fontFamily: {
    regular: 'Inter-Regular',
    medium: 'Inter-Medium',
    semiBold: 'Inter-SemiBold',
    bold: 'Inter-Bold',
    headingRegular: 'Poppins-Regular',
    headingMedium: 'Poppins-Medium',
    headingSemiBold: 'Poppins-SemiBold',
    headingBold: 'Poppins-Bold',
  },
    fontSize: {
      xs: 10,
      sm: 12,
      base: 14,
      md: 16,
      lg: 18,
      xl: 24,
      '2xl': 28,
      '3xl': 30,
      '4xl': 36,
    },
    lineHeight: {
      xs: 16,
      sm: 20,
      base: 24,
      lg: 28,
      xl: 32,
      '2xl': 36,
      '3xl': 40,
      '4xl': 44,
    },
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
    xxl: 24,
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
  layout: {
    horizontalPadding: 20,
    verticalPadding: 16,
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
  buttons: {
    primary: {
      backgroundColor: '#6366F1',
      textColor: '#FFFFFF',
      borderRadius: 12,
      paddingVertical: 14,
      paddingHorizontal: 20,
    },
    secondary: {
      backgroundColor: '#10B981',
      textColor: '#FFFFFF',
      borderRadius: 12,
      paddingVertical: 14,
      paddingHorizontal: 20,
    },
    outline: {
      borderColor: '#6366F1',
      borderWidth: 1,
      textColor: '#6366F1',
      borderRadius: 12,
      paddingVertical: 14,
      paddingHorizontal: 20,
    },
  },
  inputs: {
    default: {
      backgroundColor: '#FFFFFF',
      borderColor: '#E2E8F0',
      borderWidth: 1,
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
      color: '#1E293B',
    },
  },
  modals: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadow: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.2,
      shadowRadius: 20,
      elevation: 10,
    },
  },
  
} as const;

export type Theme = typeof theme;
