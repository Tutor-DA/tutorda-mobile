import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, SafeAreaView } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebaseConfig';
import { router } from 'expo-router';
import PrimaryButton from '@/components/PrimaryButton';
import { theme } from '@/constants/theme';

export default function HomeScreen() {
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      router.replace('/(auth)/login');
    } catch (err) {
      console.error('Sign-out error', err);
      Alert.alert('Error', 'Failed to sign out. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <SafeAreaView style={{ flex: 0, backgroundColor: theme.colors?.background || '#FFFFFF' }} />

      <View style={styles.container}>
        <Text style={styles.title}>Welcome to TutorDA Math App!</Text>
        <View style={styles.buttonGroup}>
          <PrimaryButton
            title="Go to Dashboard"
            onPress={() => router.push('/(tabs)/dashboard')}
            accessibilityLabel="Navigate to dashboard"
          />
          <View style={styles.spacer} />
          <PrimaryButton
            title="View Profile"
            onPress={() => router.push('/(tabs)/profile')}
            accessibilityLabel="Navigate to profile"
          />
          <View style={styles.spacer} />
          <PrimaryButton
            title="Browse Courses"
            onPress={() => router.push('/(tabs)/courses')}
            accessibilityLabel="Navigate to courses"
          />
          <View style={styles.spacer} />
          <PrimaryButton
            title="Logout"
            onPress={handleSignOut}
            variant="danger"
            loading={loading}
            disabled={loading}
            accessibilityLabel="Log out of your account"
          />
        </View>
      </View>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing?.xl || 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors?.background || '#FFFFFF',
  },
  title: {
    fontSize: theme.typography?.fontSize?.['2xl'] || 24,
    fontFamily: theme.typography?.fontFamily?.headingBold || 'System',
    marginBottom: theme.spacing?.xl || 24,
    textAlign: 'center',
    color: theme.colors?.text?.primary || '#000000',
  },
  buttonGroup: {
    width: '100%',
    maxWidth: 400,
  },
  spacer: {
    height: theme.spacing?.md || 12,
  },
});
