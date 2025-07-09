import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Alert } from 'react-native';
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { getDoc, setDoc, doc } from 'firebase/firestore';
import { auth, db } from '@/firebaseConfig';
import { router } from 'expo-router';
import InputField from '@/components/InputField';
import PrimaryButton from '@/components/PrimaryButton';
import { theme } from '@/constants/theme';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    console.log('🟢 Login screen rendered');
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const handleLogin = async () => {
    if (!validateEmail(email)) {
      setError('Invalid email format');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const { uid } = userCredential.user;

      // Fetch role from Firestore users/{uid}
      const userDoc = await getDoc(doc(db, 'users', uid));
      const userData = userDoc.data();

let role = userData?.role;

if (!role) {
  console.warn('⚠️ User role not found. Defaulting to "student"');
  role = 'student';

  await setDoc(doc(db, 'users', uid), {
    ...userData,
    role: 'student',
  }, { merge: true });
}

if (role === 'student') {
  router.push('/student-entry');
} else if (role === 'teacher') {
  router.push('/teacher-entry');
} else {
  setError(`Unknown role: ${role}`);
}

    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert('Reset email sent', 'Check your inbox');
    } catch (err: any) {
      console.error('Reset password error:', err);
      Alert.alert('Error', err.message || 'Failed to send reset email');
    }
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Text style={styles.title}>Login</Text>
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
      {error && <Text style={styles.error}>{error}</Text>}

      <PrimaryButton
        title={loading ? 'Logging in...' : 'Login'}
        onPress={handleLogin}
        disabled={loading}
      />
      <PrimaryButton
        title="Forgot Password?"
        onPress={handleResetPassword}
        variant="text"
      />
      <PrimaryButton
        title="Go to Register"
        onPress={() => router.push('/auth/register')}
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
