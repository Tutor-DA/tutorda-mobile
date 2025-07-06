import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { theme } from '@/constants/theme';
import { router } from 'expo-router';
import { getAuth, signOut } from 'firebase/auth';

export default function SettingsScreen() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const confirmLogout = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Log Out', style: 'destructive', onPress: handleLogout },
      ],
      { cancelable: true }
    );
  };

  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      Alert.alert('Logged out', 'You have been successfully logged out.');
      router.replace('/app/(auth)/login');
    } catch (err) {
      console.error('Logout error:', err);
      Alert.alert('Error', 'Something went wrong during logout.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      {/* Dark mode toggle */}
      <View style={styles.optionRow}>
        <Text style={styles.optionText}>Dark Mode</Text>
        <Switch
          value={isDarkMode}
          onValueChange={setIsDarkMode}
          trackColor={{ false: '#E5E7EB', true: theme.colors.primary }}
          thumbColor={isDarkMode ? theme.colors.primaryDark : '#f4f3f4'}
        />
      </View>

      {/* Notifications toggle */}
      <View style={styles.optionRow}>
        <Text style={styles.optionText}>Enable Notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
          trackColor={{ false: '#E5E7EB', true: theme.colors.primary }}
          thumbColor={
            notificationsEnabled ? theme.colors.primaryDark : '#f4f3f4'
          }
        />
      </View>

      {/* Language picker */}
      <View style={styles.optionRow}>
        <Text style={styles.optionText}>Language</Text>
        {Platform.OS === 'android' ? (
          <Picker
            selectedValue={selectedLanguage}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedLanguage(itemValue)}
          >
            <Picker.Item label="English" value="en" />
            <Picker.Item label="Arabic" value="ar" />
            <Picker.Item label="French" value="fr" />
          </Picker>
        ) : (
          <View style={styles.pickerPlaceholder}>
            <Text style={styles.optionText}>
              {selectedLanguage.toUpperCase()}
            </Text>
          </View>
        )}
      </View>

      {/* Navigation buttons */}
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => router.push('/dashboard')}
      >
        <Text style={styles.navButtonText}>Go to Dashboard</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => router.push('/home')}
      >
        <Text style={styles.navButtonText}>Go to Home</Text>
      </TouchableOpacity>

      <View style={styles.spacer} />

      {/* Floating Logout button */}
      <TouchableOpacity style={styles.logoutButton} onPress={confirmLogout}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>

      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    color: theme.colors.text.primary,
    marginBottom: 20,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingVertical: 8,
  },
  optionText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: theme.colors.text.primary,
  },
  picker: {
    width: 150,
    color: theme.colors.text.primary,
  },
  pickerPlaceholder: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: theme.colors.surfaceLight,
    borderRadius: 8,
  },
  navButton: {
    marginTop: 16,
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  navButtonText: {
    color: theme.colors.text.inverse,
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  spacer: {
    flex: 1,
  },
  logoutButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.error,
    backgroundColor: theme.colors.surfaceLight,
  },
  logoutButtonText: {
    color: theme.colors.error,
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
});
