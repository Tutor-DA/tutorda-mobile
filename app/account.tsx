/**
 * Account details page - User account information and security settings
 */

import React, { useState, useEffect } from 'react';
import { Edit } from 'lucide-react-native';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Alert,
} from 'react-native';
import * as LucideIcons from 'lucide-react-native';
import { router } from 'expo-router';
import { User } from '@/types';
import { mockApi } from '@/services/mockData';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorBoundary } from '@/components/ErrorBoundary';

interface EditableField {
  key: keyof User;
  label: string;
  value: string;
  type: 'text' | 'email' | 'password';
  editable: boolean;
}

/**
 * Account details page component
 * Manages user account information and security settings
 */
export default function AccountPage() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);

  /**
   * Load user data on component mount
   */
  useEffect(() => {
    loadUserData();
  }, []);

  /**
   * Fetch user data from API
   */
  const loadUserData = async () => {
    try {
      setIsLoading(true);
      const userData = await mockApi.getUser();
      setUser(userData);
      // Initialize edit values
      setEditValues({
        name: userData.name,
        email: userData.email,
      });
    } catch (err) {
      console.error('Error loading user data:', err);
      Alert.alert('Error', 'Failed to load account information');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Start editing a field
   */
  const startEditing = (fieldKey: string) => {
    setEditingField(fieldKey);
  };

  /**
   * Cancel editing
   */
  const cancelEditing = () => {
    if (!user) return;

    // Reset edit values to original
    setEditValues({
      name: user.name,
      email: user.email,
    });
    setEditingField(null);
  };

  /**
   * Save field changes
   */
  const saveField = async (fieldKey: string) => {
    if (!user) return;

    try {
      setIsSaving(true);
      const updatedUser = await mockApi.updateUser({
        ...user,
        [fieldKey]: editValues[fieldKey],
      });
      setUser(updatedUser);
      setEditingField(null);
      Alert.alert('Success', 'Account information updated successfully');
    } catch (err) {
      console.error('Error updating user:', err);
      Alert.alert('Error', 'Failed to update account information');
    } finally {
      setIsSaving(false);
    }
  };

  /**
   * Handle password change
   */
  const handlePasswordChange = () => {
    Alert.alert(
      'Change Password',
      'You will receive an email with instructions to change your password.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Send Email',
          onPress: () => {
            // TODO: Implement password change email
            Alert.alert(
              'Email Sent',
              'Check your email for password reset instructions',
            );
          },
        },
      ],
    );
  };

  /**
   * Handle two-factor authentication setup
   */
  const handleTwoFactorAuth = () => {
    Alert.alert(
      'Two-Factor Authentication',
      'This feature will be available soon to enhance your account security.',
      [{ text: 'OK' }],
    );
  };

  if (isLoading) {
    return <LoadingSpinner fullscreen message="Loading account..." />;
  }

  if (!user) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load account information</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadUserData}>
          <Text style={styles.retryText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const accountFields: EditableField[] = [
    {
      key: 'name',
      label: 'Full Name',
      value: editValues.name || user.name,
      type: 'text',
      editable: true,
    },
    {
      key: 'email',
      label: 'Email Address',
      value: editValues.email || user.email,
      type: 'email',
      editable: true,
    },
    {
      key: 'joinDate',
      label: 'Member Since',
      value: user.joinDate,
      type: 'text',
      editable: false,
    },
  ];

  return (
    <ErrorBoundary>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <LucideIcons.ArrowLeft size={24} color="#111827" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Account Details</Text>

          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Account Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Account Information</Text>

            <View style={styles.fieldsContainer}>
              {accountFields.map((field) => (
                <View key={field.key} style={styles.fieldContainer}>
                  <View style={styles.fieldHeader}>
                    <Text style={styles.fieldLabel}>{field.label}</Text>
                    {field.editable && editingField !== field.key && (
                      <TouchableOpacity
                        style={styles.editButton}
                        onPress={() => startEditing(field.key)}
                      >
                        <Edit size={16} color="#6366F1" />
                      </TouchableOpacity>
                    )}
                  </View>

                  {editingField === field.key ? (
                    <View style={styles.editContainer}>
                      <TextInput
                        style={styles.textInput}
                        value={field.value}
                        onChangeText={(text) =>
                          setEditValues((prev) => ({
                            ...prev,
                            [field.key]: text,
                          }))
                        }
                        keyboardType={
                          field.type === 'email' ? 'email-address' : 'default'
                        }
                        autoCapitalize={
                          field.type === 'email' ? 'none' : 'words'
                        }
                        autoCorrect={false}
                        placeholder={field.label}
                      />
                      <View style={styles.editActions}>
                        <TouchableOpacity
                          style={styles.cancelButton}
                          onPress={cancelEditing}
                        >
                          <LucideIcons.X size={16} color="#6B7280" />
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.saveButton}
                          onPress={() => saveField(field.key)}
                          disabled={isSaving}
                        >
                          <LucideIcons.Save size={16} color="#FFF" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  ) : (
                    <Text style={styles.fieldValue}>{field.value}</Text>
                  )}
                </View>
              ))}
            </View>
          </View>

          {/* Security Settings */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Security</Text>

            <View style={styles.securityContainer}>
              <TouchableOpacity
                style={styles.securityItem}
                onPress={handlePasswordChange}
              >
                <View style={styles.securityLeft}>
                  <View style={styles.securityIcon}>
                    <LucideIcons.Key size={20} color="#6366F1" />
                  </View>
                  <View>
                    <Text style={styles.securityLabel}>Password</Text>
                    <Text style={styles.securityDescription}>
                      Change your account password
                    </Text>
                  </View>
                </View>
                <Text style={styles.arrow}>›</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.securityItem}
                onPress={handleTwoFactorAuth}
              >
                <View style={styles.securityLeft}>
                  <View style={styles.securityIcon}>
                    <LucideIcons.Shield size={20} color="#6366F1" />
                  </View>
                  <View>
                    <Text style={styles.securityLabel}>
                      Two-Factor Authentication
                    </Text>
                    <Text style={styles.securityDescription}>
                      Add an extra layer of security
                    </Text>
                  </View>
                </View>
                <Text style={styles.arrow}>›</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Account Statistics */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Account Statistics</Text>

            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <LucideIcons.User size={20} color="#6366F1" />
                <Text style={styles.statLabel}>Account Level</Text>
                <Text style={styles.statValue}>Level {user.level}</Text>
              </View>

              <View style={styles.statItem}>
                <LucideIcons.Calendar size={20} color="#10B981" />
                <Text style={styles.statLabel}>Current Streak</Text>
                <Text style={styles.statValue}>{user.streak} days</Text>
              </View>

              <View style={styles.statItem}>
                <LucideIcons.Mail size={20} color="#F59E0B" />
                <Text style={styles.statLabel}>Total XP</Text>
                <Text style={styles.statValue}>{user.xp} XP</Text>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Loading Overlay */}
        {isSaving && (
          <View style={styles.loadingOverlay}>
            <LoadingSpinner message="Saving changes..." />
          </View>
        )}
      </SafeAreaView>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#111827',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#111827',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  fieldsContainer: {
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  fieldHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  fieldLabel: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#374151',
  },
  editButton: {
    padding: 4,
  },
  fieldValue: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#111827',
  },
  editContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#111827',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  editActions: {
    flexDirection: 'row',
    gap: 8,
  },
  cancelButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#F3F4F6',
  },
  saveButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#6366F1',
  },
  securityContainer: {
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  securityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  securityLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  securityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  securityLabel: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 2,
  },
  securityDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  arrow: {
    fontSize: 20,
    color: '#9CA3AF',
  },
  statsContainer: {
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  statLabel: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#374151',
    marginLeft: 12,
    flex: 1,
  },
  statValue: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#EF4444',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#6366F1',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFF',
  },
});
