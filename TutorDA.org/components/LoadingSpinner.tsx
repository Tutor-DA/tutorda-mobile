/**
 * Reusable loading spinner component
 */

import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

interface LoadingSpinnerProps {
  /** Loading message to display */
  message?: string;
  /** Size of the spinner */
  size?: 'small' | 'large';
  /** Color of the spinner */
  color?: string;
  /** Whether to show the spinner in fullscreen */
  fullscreen?: boolean;
}

/**
 * LoadingSpinner component for displaying loading states
 *
 * @param props - Component props
 * @returns JSX element
 */
export function LoadingSpinner({
  message = 'Loading...',
  size = 'large',
  color = '#6366F1',
  fullscreen = false,
}: LoadingSpinnerProps) {
  const containerStyle = fullscreen
    ? styles.fullscreenContainer
    : styles.container;

  return (
    <View style={containerStyle}>
      <ActivityIndicator size={size} color={color} />
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  fullscreenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9FAFB',
  },
  message: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginTop: 12,
    textAlign: 'center',
  },
});
