import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Alert } from 'react-native';
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { auth } from '@/firebaseConfig';
import { router } from 'expo-router';
import InputField from '@/components/InputField';
import PrimaryButton from '@/components/PrimaryButton';
import { theme } from '@/constants/theme';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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

  const handleRegister = async () => {
    if (!validateEmail(email)) {
      setError('Please enter a valid email');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
      router.replace('/home');
    } catch (err: any) {
      console.error('Register error:', err);
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email to reset password');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert('Success', 'Password reset email sent!');
    } catch (err: any) {
      console.error('Reset password error:', err);
      Alert.alert('Error', err.message || 'Failed to send reset email');
    }
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Text style={styles.title}>Register</Text>

      <InputField
        placeholder="Email"
        value={email}
        onChangeText={(val) => {
          setEmail(val);
          setError(null);
        }}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <InputField
        placeholder="Password"
        value={password}
        onChangeText={(val) => {
          setPassword(val);
          setError(null);
        }}
        secureTextEntry
      />
      <InputField
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={(val) => {
          setConfirmPassword(val);
          setError(null);
        }}
        secureTextEntry
      />
      {error && <Text style={styles.error}>{error}</Text>}

      <PrimaryButton
        title={loading ? 'Registering...' : 'Register'}
        onPress={handleRegister}
        disabled={loading}
      />

      <PrimaryButton
        title="Forgot Password?"
        onPress={handleResetPassword}
        variant="text"
      />
      <PrimaryButton
        title="Back to Login"
        onPress={() => router.replace('./auth/login')}  // ✅ updated route
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
