import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { theme } from '@/constants/theme';

type Variant = 'primary' | 'secondary' | 'danger' | 'text';

export default function PrimaryButton({
  title,
  onPress,
  loading = false,
  disabled = false,
  variant = 'primary',
  accessibilityLabel,
}: {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: Variant;
  accessibilityLabel?: string;
}) {
  const getButtonColor = () => {
    switch (variant) {
      case 'secondary':
        return theme.colors.secondary;
      case 'danger':
        return theme.colors.error;
      case 'text':
        return 'transparent';
      default:
        return theme.colors.primary;
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case 'text':
        return theme.colors.primary; // text button uses primary color for text
      default:
        return theme.colors.text.inverse;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: getButtonColor() },
        variant === 'text' && styles.textButton,
        disabled && styles.disabled,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      accessibilityLabel={accessibilityLabel}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <Text style={[styles.text, { color: getTextColor() }]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.md,
  },
  text: {
    fontSize: theme.typography.fontSize.base,
    fontFamily: theme.typography.fontFamily.semiBold,
  },
  textButton: {
    elevation: 0,
    shadowOpacity: 0,
    paddingVertical: theme.spacing.md,  // text buttons usually smaller padding
  },
  disabled: {
    backgroundColor: theme.colors.borderLight,
  },
});
// This component is a reusable button with different styles based on the variant prop.
// It supports loading state, disabled state, and accessibility labels for better usability.
// The button can be used in various parts of the app where a primary action is needed.
// The styles are defined using StyleSheet.create for better performance.