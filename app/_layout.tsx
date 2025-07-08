import React, { useEffect, useState } from 'react';
import { Slot, router, usePathname } from 'expo-router';
import { auth } from '@/firebaseConfig';
import { onAuthStateChanged, User } from 'firebase/auth';
import { View, ActivityIndicator, Text } from 'react-native';
import { useFonts, Inter_400Regular } from '@expo-google-fonts/inter';

export default function RootLayout() {
  const [authLoading, setAuthLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [fontsLoaded, fontsError] = useFonts({ Inter_400Regular });
  const pathname = usePathname();

  useEffect(() => {
    console.log('👀 RootLayout mounted');
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      console.log('🔐 Firebase user:', firebaseUser);
      setUser(firebaseUser);
      setAuthLoading(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!authLoading && fontsLoaded) {
      // Navigate only if not already on the correct page
      if (!user && !pathname.startsWith('/(auth)')) {
        router.replace('/(auth)/login');
      } else if (user && pathname.startsWith('/(auth)')) {
        router.replace('/home');
      }
    }
  }, [authLoading, fontsLoaded, user, pathname]);

  if (fontsError) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Failed to load fonts.</Text>
      </View>
    );
  }

  if (!fontsLoaded || authLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#6366F1" />
        <Text style={{ fontFamily: 'Inter_400Regular' }}>Loading app...</Text>
      </View>
    );
  }

  return <Slot />;
}
