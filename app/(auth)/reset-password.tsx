import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Animated } from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/firebaseConfig';
import { router } from 'expo-router';
import InputField from '@/components/InputField';
import PrimaryButton from '@/components/PrimaryButton';
import { theme } from '@/constants/theme';

export default function ResetPasswordScreen() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const handleResetPassword = async () => {
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
      Alert.alert('Success', 'A password reset email has been sent!');
      router.replace('/auth/login');  // ✅ updated to /login
    } catch (err: any) {
      console.error('Reset password error:', err);
      setError(err.message || 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Text style={styles.title}>Reset Password</Text>

      <InputField
        placeholder="Enter your email"
        value={email}
        onChangeText={(val) => {
          setEmail(val);
          setError(null);
        }}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {error && <Text style={styles.error}>{error}</Text>}

      <PrimaryButton
        title={loading ? 'Sending...' : 'Send Reset Email'}
        onPress={handleResetPassword}
        disabled={loading}
      />

      <PrimaryButton
        title="Back to Login"
        onPress={() => router.replace('/auth/login')}
        variant="text"
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing?.xl || 24,
    justifyContent: 'center',
    backgroundColor: theme.colors?.background || '#FFFFFF',
  },
  title: {
    fontSize: theme.typography?.fontSize?.['2xl'] || 24,
    fontFamily: theme.typography?.fontFamily?.headingBold || 'System',
    color: theme.colors?.text?.primary || '#000000',
    textAlign: 'center',
    marginBottom: theme.spacing?.xl || 24,
  },
  error: {
    color: theme.colors?.error || 'red',
    textAlign: 'center',
    marginBottom: theme.spacing?.sm || 8,
  },
});
