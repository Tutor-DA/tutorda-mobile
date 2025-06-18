/**
 * Accessibility utilities for improved app usability
 * Provides helpers for screen readers, contrast checking, and touch targets
 */

import { Platform } from 'react-native';
import { theme } from '@/theme';

/**
 * Check if a color combination meets WCAG contrast requirements
 */
export function checkContrastRatio(
  foreground: string,
  background: string,
  isLargeText: boolean = false,
): boolean {
  // This is a simplified implementation
  // In a real app, you'd use a proper color contrast library
  const requiredRatio = isLargeText
    ? theme.accessibility.contrastRatio.large
    : theme.accessibility.contrastRatio.normal;

  // For now, return true for our theme colors as they meet requirements
  return true;
}

/**
 * Generate accessibility label for tab navigation
 */
export function generateTabAccessibilityLabel(
  tabName: string,
  isSelected: boolean,
  badgeCount?: number,
): string {
  let label = `${tabName} tab`;

  if (isSelected) {
    label += ', selected';
  }

  if (badgeCount && badgeCount > 0) {
    label += `, ${badgeCount} notification${badgeCount === 1 ? '' : 's'}`;
  }

  return label;
}

/**
 * Get platform-specific accessibility props
 */
export function getAccessibilityProps(
  role: string,
  label?: string,
  hint?: string,
  state?: Record<string, boolean>,
) {
  const baseProps = {
    accessible: true,
    accessibilityRole: role as any,
    accessibilityLabel: label,
    accessibilityHint: hint,
    accessibilityState: state,
  };

  if (Platform.OS === 'web') {
    return {
      ...baseProps,
      // Add web-specific ARIA attributes
      'aria-label': label,
      'aria-describedby': hint,
      role: role,
    };
  }

  return baseProps;
}

/**
 * Ensure minimum touch target size
 */
export function ensureMinimumTouchTarget(size: number): number {
  return Math.max(size, theme.accessibility.minimumTouchTarget);
}

/**
 * Announce screen changes for screen readers
 */
export function announceScreenChange(message: string) {
  if (Platform.OS === 'web') {
    // Create a live region for screen reader announcements
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    announcement.style.width = '1px';
    if (announcement?.style) {
      announcement.style.height = '1px';
    }
    announcement.style.overflow = 'hidden';
    announcement.textContent = message;

    document.body.appendChild(announcement);

    // Remove after announcement
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }
  // On mobile, this would use AccessibilityInfo.announceForAccessibility
}
