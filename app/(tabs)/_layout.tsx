import React, { useRef, useEffect } from 'react';
import {
  Animated,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import type { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import type { RouteProp } from '@react-navigation/native';

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];
type TabBarIconProps = {
  focused: boolean;
  color: string;
  size: number;
};

const PRIMARY_COLOR = '#6366F1';       // Previously theme.colors.primary
const INACTIVE_TEXT_COLOR = '#94A3B8'; // Previously theme.colors.text.light

const iconMap: Record<string, { focused: IoniconName; unfocused: IoniconName }> = {
  learn: { focused: 'book', unfocused: 'book-outline' },
  practice: { focused: 'pencil', unfocused: 'pencil-outline' },
  courses: { focused: 'school', unfocused: 'school-outline' },
  dashboard: { focused: 'grid', unfocused: 'grid-outline' },
  settings: { focused: 'settings', unfocused: 'settings-outline' },
};

function BouncyTabBarButton({
  children,
  onPress,
  accessibilityState,
}: BottomTabBarButtonProps) {
  const scale = useRef(new Animated.Value(1)).current;
  const bgOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (accessibilityState?.selected) {
      Animated.parallel([
        Animated.sequence([
          Animated.spring(scale, {
            toValue: 1.2,
            friction: 3,
            useNativeDriver: true,
          }),
          Animated.spring(scale, {
            toValue: 1,
            friction: 3,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(bgOpacity, {
            toValue: 0.2,
            duration: 150,
            useNativeDriver: true,
          }),
          Animated.timing(bgOpacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ]),
      ]).start();
    }
  }, [accessibilityState?.selected]);

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Animated.View style={{ transform: [{ scale }] }}>
        <Animated.View
          style={[
            styles.bounceBackground,
            {
              opacity: bgOpacity,
              backgroundColor: PRIMARY_COLOR,
              borderRadius: 24,
            },
          ]}
        />
        {children}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({
        route,
      }: {
        route: RouteProp<Record<string, object | undefined>, string>;
      }) => {
        const icon = iconMap[route.name] || {
          focused: 'ellipse',
          unfocused: 'ellipse-outline',
        };

        return {
        tabBarIcon: ({ focused, size, color }: TabBarIconProps) => (
  <Ionicons
    name={focused ? icon.focused : icon.unfocused}
    size={size}
    color={color}
  />
),
          tabBarActiveTintColor: PRIMARY_COLOR,
          tabBarInactiveTintColor: INACTIVE_TEXT_COLOR,
          tabBarButton: (props: BottomTabBarButtonProps) => (
            <BouncyTabBarButton {...props} />
          ),
        };
      }}
    >
      <Tabs.Screen name="learn" options={{ title: 'Learn' }} />
      <Tabs.Screen name="practice" options={{ title: 'Practice' }} />
      <Tabs.Screen name="courses" options={{ title: 'Courses' }} />
      <Tabs.Screen name="dashboard" options={{ title: 'Dashboard' }} />
      <Tabs.Screen name="settings" options={{ title: 'Settings' }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  bounceBackground: {
    ...StyleSheet.absoluteFillObject,
  },
});
