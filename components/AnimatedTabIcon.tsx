/**
 * Animated tab icon component with smooth scaling animation
 * Provides visual feedback when tabs are selected/deselected
 */

import React, { useEffect } from 'react';
import { ViewStyle, Platform } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
} from 'react-native-reanimated';
import { LucideProps } from 'lucide-react-native';

interface AnimatedTabIconProps {
  /** The Lucide icon component to render */
  IconComponent: React.ComponentType<Partial<LucideProps>>;
  /** Whether the tab is currently focused */
  focused: boolean;
  /** Icon color */
  color: string;
  /** Base icon size */
  size: number;
  /** Additional styles */
  style?: ViewStyle;
  /** Test ID for testing */
  testID?: string;
}

/**
 * AnimatedTabIcon component with smooth scaling animation
 * Scales from 1.0 to 1.1 when focused with spring animation
 */
export function AnimatedTabIcon({
  IconComponent,
  focused,
  color,
  size,
  style,
  testID,
}: AnimatedTabIconProps) {
  // Shared value for animation
  const scale = useSharedValue(focused ? 1.1 : 1.0);

  // Update scale when focused state changes
  useEffect(() => {
    scale.value = withSpring(focused ? 1.1 : 1.0, {
      damping: 15,
      stiffness: 150,
      mass: 1,
    });
  }, [focused, scale]);

  // Animated style with scale transformation
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  // Interpolate size for smoother icon scaling
  const animatedIconStyle = useAnimatedStyle(() => {
    const iconSize = interpolate(scale.value, [1.0, 1.1], [size, size * 1.1]);
    return {
      width: iconSize,
      height: iconSize,
    };
  });

  // Accessibility + icon props
  const iconProps = {
    size,
    color,
    strokeWidth: 2.5,
    ...(Platform.OS === 'web'
      ? { 'aria-hidden': true }
      : {
          accessibilityElementsHidden: true,
          importantForAccessibility: 'no' as const,
        }),
  };

  return (
    <Animated.View
      style={[animatedStyle, style]}
      testID={testID}
      accessibilityRole="button"
      accessibilityState={{ selected: focused }}
    >
      <Animated.View style={animatedIconStyle}>
        <IconComponent {...iconProps} />
      </Animated.View>
    </Animated.View>
  );
}
