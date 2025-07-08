import React, { useEffect, useState } from 'react';
import { Slot, useRouter, usePathname } from 'expo-router';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { app } from '@/firebaseConfig';
import { theme } from '@/constants/theme';

export default function AuthLayout() {
  const router = useRouter();
  const pathname = usePathname(); // ✅ Track current path
  const auth = getAuth(app);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // ✅ Avoid redirect loop if already on login
      if (!user && pathname !== '/(auth)/login') {
        router.replace('/(auth)/login');
      } else {
        setTimeout(() => setCheckingAuth(false), 100);
      }
    });

    return unsubscribe;
  }, [pathname]);

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
    backgroundColor: theme.colors.background || '#fff',
  },
});
