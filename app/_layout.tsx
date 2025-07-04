import React, { useEffect, useState } from 'react';
import { Slot, router } from 'expo-router';
import { auth } from '@/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { View, ActivityIndicator } from 'react-native';
import { useFonts } from 'expo-font';

export default function RootLayout() {
  const [loading, setLoading] = useState(true);

  // Load custom fonts
  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('@/assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('@/assets/fonts/Poppins-Bold.ttf'),
    'Poppins-SemiBold': require('@/assets/fonts/Poppins-SemiBold.ttf'),
    'Inter-Regular': require('@/assets/fonts/Inter-Regular.ttf'),
    'Inter-SemiBold': require('@/assets/fonts/Inter-SemiBold.ttf'),
    'Inter-Medium': require('@/assets/fonts/Inter-Medium.ttf'),
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace('/home');
      } else {
        router.replace('./auth/login');
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (!fontsLoaded || loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#6366F1" />
      </View>
    );
  }

  return <Slot />;
}
