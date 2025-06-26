/**
 * Tab bar badge component for displaying notifications
 * Supports different badge types and animations
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { theme } from '@/constants/theme';

interface TabBarBadgeProps {
  /** Badge count to display */
  count?: number;
  /** Whether to show a dot badge (no count) */
  showDot?: boolean;
  /** Badge color */
  color?: string;
  /** Maximum count to display before showing "99+" */
  maxCount?: number;
  /** Test ID for testing */
  testID?: string;
}

/**
 * TabBarBadge component for displaying notification badges on tabs
 * Supports both count badges and dot indicators
 */
export function TabBarBadge({
  count = 0,
  showDot = false,
  color = theme.colors.error,
  maxCount = 99,
  testID,
}: TabBarBadgeProps) {
  const scale = useSharedValue(1);

  // Don't render if no count and not showing dot
  if (!showDot && count <= 0) {
    return null;
  }

  // Animate badge appearance
  React.useEffect(() => {
    if (count > 0 || showDot) {
      scale.value = withSequence(
        withSpring(1.2, { damping: 10, stiffness: 200 }),
        withSpring(1.0, { damping: 15, stiffness: 150 }),
      );
    }
  }, [count, showDot, scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  // Format count display
  const displayCount = count > maxCount ? `${maxCount}+` : count.toString();

  return (
    <Animated.View
      style={[
        styles.badge,
        { backgroundColor: color },
        showDot && styles.dotBadge,
        animatedStyle,
      ]}
      testID={testID}
      accessibilityRole="text"
      accessibilityLabel={
        showDot
          ? 'New notification'
          : `${count} notification${count === 1 ? '' : 's'}`
      }
    >
      {!showDot && (
        <Text style={styles.badgeText} numberOfLines={1}>
          {displayCount}
        </Text>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: -6,
    right: -6,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: theme.colors.error,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    borderWidth: 2,
    borderColor: theme.colors.white,
  },
  dotBadge: {
    width: 12,
    height: 12,
    borderRadius: 6,
    minWidth: 12,
    top: -4,
    right: -4,
  },
  badgeText: {
    color: theme.colors.white,
    fontSize: 10,
    fontFamily: theme.fonts.bold,
    lineHeight: 12,
    textAlign: 'center',
  },
});
