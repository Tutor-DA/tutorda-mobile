// constants/useTheme.ts

import { useColorScheme } from 'react-native';
import { theme as baseTheme } from './theme';

export const useTheme = () => {
  const colorScheme = useColorScheme(); // 'light' | 'dark' | null
  const isDark = colorScheme === 'dark';

  // Override colors based on system preference
  const dynamicColors = {
    ...baseTheme.colors,
    background: isDark ? '#121212' : baseTheme.colors.background,
    surface: isDark ? '#1E1E1E' : baseTheme.colors.surface,
    surfaceLight: isDark ? '#222' : baseTheme.colors.surfaceLight,
    surfaceDark: isDark ? '#2A2A2A' : baseTheme.colors.surfaceDark,
    text: {
      ...baseTheme.colors.text,
      primary: isDark ? '#FFFFFF' : baseTheme.colors.text.primary,
      secondary: isDark ? '#AAAAAA' : baseTheme.colors.text.secondary,
      light: isDark ? '#888888' : baseTheme.colors.text.light,
      inverse: isDark ? '#000000' : '#FFFFFF',
    },
  };

  return {
    ...baseTheme,
    colors: dynamicColors,
    isDark,
  };
};
