import React, { ReactNode } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '@/constants/theme';

interface ScreenLayoutProps {
  children: ReactNode;
  scrollable?: boolean;
  keyboardAware?: boolean;
  backgroundColor?: string;
  style?: ViewStyle;
  padded?: boolean;
  testID?: string;
}

export function ScreenLayout({
  children,
  scrollable = false,
  keyboardAware = false,
  backgroundColor = theme.colors.background,
  style,
  padded = false,
  testID,
}: ScreenLayoutProps) {
  const tabBarHeight = theme.tabBar?.height ?? 48;
  const horizontalPadding = theme.layout?.horizontalPadding ?? 20;

  const containerStyle = [
    styles.container,
    { backgroundColor },
    padded && { paddingHorizontal: horizontalPadding },
    style,
  ];

  const content = scrollable ? (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={[
        styles.scrollContent,
        { paddingBottom: tabBarHeight + 20 },
      ]}
      showsVerticalScrollIndicator={false}
      bounces
      keyboardShouldPersistTaps="handled"
    >
      {children}
    </ScrollView>
  ) : (
    <View style={styles.content}>{children}</View>
  );

  if (keyboardAware) {
    return (
      <SafeAreaView style={containerStyle} testID={testID}>
        <KeyboardAvoidingView
          style={styles.keyboardView}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'android' ? 20 : 0}
        >
          {content}
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={containerStyle} testID={testID}>
      {content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
  },
});
