import React, { useRef, useEffect } from 'react';
import {
  Animated,
  TouchableWithoutFeedback,
  StyleSheet,
  View,
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

const PRIMARY_COLOR = '#6366F1';
const INACTIVE_TEXT_COLOR = '#94A3B8';

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
      <Animated.View style={{ transform: [{ scale }], flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {accessibilityState?.selected && (
          <Animated.View
            style={[
              styles.activeHighlight,
              {
                opacity: bgOpacity,
                backgroundColor: PRIMARY_COLOR,
                transform: [{ scale }],
              },
            ]}
          />
        )}
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
          tabBarStyle: {
            position: 'absolute',
            bottom: 16,
            left: 16,
            right: 16,
            backgroundColor: '#FFFFFF',
            borderRadius: 32,
            height: 64,
            borderTopWidth: 0,
            elevation: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 12,
            paddingBottom: 8,
            paddingTop: 6,
          },
          tabBarIcon: ({ focused, color }: TabBarIconProps) => (
            <Ionicons
              name={focused ? icon.focused : icon.unfocused}
              size={22}
              color={color}
              style={{ marginTop: 4 }}
            />
          ),
          tabBarLabel: ({ focused, color }) => (
            <Animated.Text
              style={{
                fontSize: focused ? 13 : 11,
                color,
                fontFamily: 'Inter-Medium',
                transform: [{ scale: focused ? 1 : 0.9 }],
              }}
            >
              {route.name.charAt(0).toUpperCase() + route.name.slice(1)}
            </Animated.Text>
          ),
          tabBarActiveTintColor: PRIMARY_COLOR,
          tabBarInactiveTintColor: INACTIVE_TEXT_COLOR,
          tabBarButton: (props: BottomTabBarButtonProps) => (
            <BouncyTabBarButton {...props} />
          ),
          headerShown: false,
        };
      }}
    >
      <Tabs.Screen name="learn" options={{ title: 'Learn' }} />
      <Tabs.Screen name="practice" options={{ title: 'Practice' }} />
      <Tabs.Screen name="dashboard" options={{ title: 'Dashboard' }} />
      <Tabs.Screen name="courses" options={{ title: 'Courses' }} />
      <Tabs.Screen name="settings" options={{ title: 'Settings' }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  activeHighlight: {
    position: 'absolute',
    width: 48,
    height: 48,
    borderRadius: 24,
    top: 8,
    alignSelf: 'center',
  },
});
