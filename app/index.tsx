import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebaseConfig';
import { router } from 'expo-router';

export default function Index() {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('✅ Logged in → /home');
        router.replace('/home');
      } else {
        console.log('🔓 Not logged in → /auth/login');
        router.replace('/auth/login');
      }
    });

    return unsubscribe;
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Redirecting...</Text>
    </View>
  );
}
