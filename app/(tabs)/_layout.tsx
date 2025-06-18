import React, { useRef, useEffect } from 'react';
import {
  Animated,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
} from 'react-native';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/constants/theme';

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

function BouncyTabBarButton({ children, onPress, accessibilityState }: any) {
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
            { opacity: bgOpacity, backgroundColor: theme.colors.primary },
          ]}
        />
        {children}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

export default function TabsLayout() {
  const iconMap: Record<string, { focused: IoniconName; unfocused: IoniconName }> = {
    learn: { focused: 'book', unfocused: 'book-outline' },
    practice: { focused: 'pencil', unfocused: 'pencil-outline' },
    courses: { focused: 'school', unfocused: 'school-outline' },
    dashboard: { focused: 'grid', unfocused: 'grid-outline' },
    settings: { focused: 'settings', unfocused: 'settings-outline' },
  };

  return (
    <Tabs
      screenOptions={({ route }) => {
        const icon = iconMap[route.name] || {
          focused: 'ellipse',
          unfocused: 'ellipse-outline',
        };
        return {
          tabBarIcon: ({ focused, size }) => (
            <Ionicons
              name={focused ? icon.focused : icon.unfocused}
              size={size}
              color={focused ? theme.colors.primary : theme.colors.text.light}
            />
          ),
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.text.light,
          tabBarButton: (props) => <BouncyTabBarButton {...props} />,
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
    borderRadius: 24,
  },
});
