import React, { useEffect, useState } from 'react';
import { Slot, useRouter } from 'expo-router';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { app } from '@/firebaseConfig';
import { theme } from '@/constants/theme';

export default function AuthLayout() {
  const router = useRouter();
  const auth = getAuth(app);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    console.log('👀 RootLayout mounted');
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (!user) {
      router.replace('/(auth)/login');
    } else {
      // delay to avoid conflict with routing
      setTimeout(() => setCheckingAuth(false), 100);
    }
  });

  return unsubscribe;
}, []);


  if (checkingAuth) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color="#999" />
      </View>
    );
  }

  return <Slot />;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
});
