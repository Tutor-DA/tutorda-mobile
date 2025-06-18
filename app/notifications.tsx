/**
 * Notifications page - Notification settings and preferences
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Calendar } from 'lucide-react-native';
import {
  ArrowLeft,
  Bell,
  BellOff,
  Mail,
  Smartphone,
  Clock,
  Trophy,
  BookOpen,
  TrendingUp,
  Settings,
} from 'lucide-react-native';
import { router } from 'expo-router';
import { User, NotificationSettings } from '@/types';
import { mockApi } from '@/services/mockData';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorBoundary } from '@/components/ErrorBoundary';

interface NotificationCategory {
  title: string;
  description: string;
  icon: any;
  settings: NotificationSetting[];
}

interface NotificationSetting {
  key: keyof NotificationSettings;
  label: string;
  description: string;
  icon: any;
  value: boolean;
}

/**
 * Notifications page component
 * Manages notification preferences and settings
 */
export default function NotificationsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

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
    } catch (err) {
      console.error('Error loading user data:', err);
      Alert.alert('Error', 'Failed to load notification settings');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Update notification preferences
   */
  const updateNotificationSetting = async (
    key: keyof NotificationSettings,
    value: boolean,
  ) => {
    if (!user) return;

    try {
      setIsSaving(true);
      const updatedUser = await mockApi.updateUser({
        ...user,
        preferences: {
          ...user.preferences,
          notifications: {
            ...user.preferences.notifications,
            [key]: value,
          },
        },
      });
      setUser(updatedUser);
    } catch (err) {
      console.error('Error updating notification setting:', err);
      Alert.alert('Error', 'Failed to save notification settings');
    } finally {
      setIsSaving(false);
    }
  };

  /**
   * Toggle all notifications
   */
  const toggleAllNotifications = async (enabled: boolean) => {
    if (!user) return;

    try {
      setIsSaving(true);
      const updatedUser = await mockApi.updateUser({
        ...user,
        preferences: {
          ...user.preferences,
          notifications: {
            push: enabled,
            email: enabled,
            studyReminders: enabled,
            achievementAlerts: enabled,
            weeklyProgress: enabled,
          },
        },
      });
      setUser(updatedUser);
    } catch (err) {
      console.error('Error updating all notifications:', err);
      Alert.alert('Error', 'Failed to save notification settings');
    } finally {
      setIsSaving(false);
    }
  };

  /**
   * Handle notification test
   */
  const handleTestNotification = () => {
    Alert.alert(
      'Test Notification',
      'A test notification has been sent to your device.',
      [{ text: 'OK' }],
    );
  };

  if (isLoading) {
    return <LoadingSpinner fullscreen message="Loading notifications..." />;
  }

  if (!user) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          Failed to load notification settings
        </Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadUserData}>
          <Text style={styles.retryText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const notifications = user.preferences.notifications;
  const allNotificationsEnabled = Object.values(notifications).every(Boolean);
  const anyNotificationEnabled = Object.values(notifications).some(Boolean);

  const notificationCategories: NotificationCategory[] = [
    {
      title: 'Delivery Methods',
      description: 'Choose how you want to receive notifications',
      icon: Bell,
      settings: [
        {
          key: 'push',
          label: 'Push Notifications',
          description: 'Receive notifications on your device',
          icon: Smartphone,
          value: notifications.push,
        },
        {
          key: 'email',
          label: 'Email Notifications',
          description: 'Receive notifications via email',
          icon: Mail,
          value: notifications.email,
        },
      ],
    },
    {
      title: 'Learning Notifications',
      description: 'Stay on track with your learning goals',
      icon: BookOpen,
      settings: [
        {
          key: 'studyReminders',
          label: 'Study Reminders',
          description: 'Daily reminders to keep your streak going',
          icon: Clock,
          value: notifications.studyReminders,
        },
        {
          key: 'achievementAlerts',
          label: 'Achievement Alerts',
          description: 'Get notified when you unlock achievements',
          icon: Trophy,
          value: notifications.achievementAlerts,
        },
        {
          key: 'weeklyProgress',
          label: 'Weekly Progress',
          description: 'Weekly summary of your learning progress',
          icon: TrendingUp,
          value: notifications.weeklyProgress,
        },
      ],
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
            <ArrowLeft size={24} color="#111827" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Notifications</Text>

          <TouchableOpacity
            style={styles.testButton}
            onPress={handleTestNotification}
          >
            <Settings size={20} color="#6366F1" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Master Toggle */}
          <View style={styles.masterToggleContainer}>
            <View style={styles.masterToggleContent}>
              <View style={styles.masterToggleLeft}>
                {anyNotificationEnabled ? (
                  <Bell size={24} color="#6366F1" />
                ) : (
                  <BellOff size={24} color="#9CA3AF" />
                )}
                <View style={styles.masterToggleText}>
                  <Text style={styles.masterToggleTitle}>
                    {allNotificationsEnabled
                      ? 'All Notifications'
                      : anyNotificationEnabled
                        ? 'Some Notifications'
                        : 'No Notifications'}
                  </Text>
                  <Text style={styles.masterToggleDescription}>
                    {allNotificationsEnabled
                      ? 'All notification types are enabled'
                      : anyNotificationEnabled
                        ? 'Some notification types are enabled'
                        : 'All notifications are disabled'}
                  </Text>
                </View>
              </View>

              <Switch
                value={allNotificationsEnabled}
                onValueChange={toggleAllNotifications}
                trackColor={{ false: '#E5E7EB', true: '#6366F1' }}
                thumbColor={allNotificationsEnabled ? '#FFF' : '#FFF'}
                disabled={isSaving}
              />
            </View>
          </View>

          {/* Notification Categories */}
          {notificationCategories.map((category, categoryIndex) => (
            <View key={categoryIndex} style={styles.section}>
              <View style={styles.categoryHeader}>
                <category.icon size={20} color="#6366F1" />
                <View style={styles.categoryHeaderText}>
                  <Text style={styles.categoryTitle}>{category.title}</Text>
                  <Text style={styles.categoryDescription}>
                    {category.description}
                  </Text>
                </View>
              </View>

              <View style={styles.settingsGroup}>
                {category.settings.map((setting, settingIndex) => (
                  <View
                    key={settingIndex}
                    style={[
                      styles.settingItem,
                      settingIndex === category.settings.length - 1 &&
                        styles.lastSettingItem,
                    ]}
                  >
                    <View style={styles.settingLeft}>
                      <View style={styles.settingIcon}>
                        <setting.icon size={18} color="#6B7280" />
                      </View>
                      <View style={styles.settingText}>
                        <Text style={styles.settingLabel}>{setting.label}</Text>
                        <Text style={styles.settingDescription}>
                          {setting.description}
                        </Text>
                      </View>
                    </View>

                    <Switch
                      value={setting.value}
                      onValueChange={(value) =>
                        updateNotificationSetting(setting.key, value)
                      }
                      trackColor={{ false: '#E5E7EB', true: '#6366F1' }}
                      thumbColor={setting.value ? '#FFF' : '#FFF'}
                      disabled={isSaving}
                    />
                  </View>
                ))}
              </View>
            </View>
          ))}

          {/* Notification Schedule */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Notification Schedule</Text>
            <View style={styles.scheduleContainer}>
              <TouchableOpacity style={styles.scheduleItem}>
                <View style={styles.scheduleLeft}>
                  <Clock size={20} color="#6366F1" />
                  <View>
                    <Text style={styles.scheduleLabel}>Quiet Hours</Text>
                    <Text style={styles.scheduleDescription}>
                      No notifications during these hours
                    </Text>
                  </View>
                </View>
                <Text style={styles.scheduleValue}>10 PM - 8 AM</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.scheduleItem}>
                <View style={styles.scheduleLeft}>
                  <Calendar size={20} color="#6366F1" />
                  <View>
                    <Text style={styles.scheduleLabel}>
                      Study Reminder Time
                    </Text>
                    <Text style={styles.scheduleDescription}>
                      When to send daily study reminders
                    </Text>
                  </View>
                </View>
                <Text style={styles.scheduleValue}>6:00 PM</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Help Section */}
          <View style={styles.helpSection}>
            <Text style={styles.helpTitle}>Need Help?</Text>
            <Text style={styles.helpText}>
              If you're not receiving notifications, check your device settings
              to ensure notifications are enabled for TutorDA.org.
            </Text>
            <TouchableOpacity style={styles.helpButton}>
              <Text style={styles.helpButtonText}>Open Device Settings</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Loading Overlay */}
        {isSaving && (
          <View style={styles.loadingOverlay}>
            <LoadingSpinner message="Saving settings..." />
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
  testButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  masterToggleContainer: {
    backgroundColor: '#FFF',
    margin: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  masterToggleContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  masterToggleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  masterToggleText: {
    marginLeft: 16,
    flex: 1,
  },
  masterToggleTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#111827',
    marginBottom: 4,
  },
  masterToggleDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  section: {
    marginBottom: 24,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  categoryHeaderText: {
    marginLeft: 12,
    flex: 1,
  },
  categoryTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#111827',
    marginBottom: 2,
  },
  categoryDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#111827',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  settingsGroup: {
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  lastSettingItem: {
    borderBottomWidth: 0,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingText: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  scheduleContainer: {
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  scheduleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  scheduleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  scheduleLabel: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 2,
    marginLeft: 12,
  },
  scheduleDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginLeft: 12,
  },
  scheduleValue: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#6366F1',
  },
  helpSection: {
    backgroundColor: '#FEF3C7',
    margin: 20,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  helpTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#92400E',
    marginBottom: 8,
  },
  helpText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#92400E',
    lineHeight: 20,
    marginBottom: 16,
  },
  helpButton: {
    backgroundColor: '#F59E0B',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  helpButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FFF',
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
