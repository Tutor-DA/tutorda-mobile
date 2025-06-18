import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import {
  BookOpen,
  Target,
  Trophy,
  Calendar,
  CreditCard as Edit,
  Shield,
  Bell,
  Moon,
  Volume2,
  Globe,
  Settings,
  CircleHelp as HelpCircle,
  ChevronRight,
  LogOut,
  Award,
  LucideIcon,
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme as appTheme } from '@/constants/theme';

const theme = {
  ...appTheme,
  colors: {
    ...appTheme.colors,
    text: {
      ...appTheme.colors.text,
      inverse: appTheme.colors.background || '#FFF',
    },
  },
};

type MenuItem = {
  icon: LucideIcon;
  label: string;
  onPress?: () => void;
  rightComponent?: React.ReactNode;
  rightText?: string;
};

type MenuSection = {
  title: string;
  items: MenuItem[];
};

export default function ProfileScreen() {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const user = {
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    avatar:
      'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
    level: 15,
    xp: 2450,
    targetXp: 3000,
    joinDate: 'January 2024',
    streak: 12,
    completedLessons: 45,
    averageScore: 87,
    achievements: 24,
  };

  const stats = useMemo(
    () => [
      {
        icon: BookOpen,
        label: 'Lessons',
        value: user.completedLessons,
        color: theme.colors.primary,
      },
      {
        icon: Target,
        label: 'Avg Score',
        value: `${user.averageScore}%`,
        color: theme.colors.secondary,
      },
      {
        icon: Trophy,
        label: 'Level',
        value: user.level,
        color: theme.colors.accent,
      },
      {
        icon: Calendar,
        label: 'Streak',
        value: `${user.streak} days`,
        color: theme.colors.error,
      },
    ],
    [user],
  );

  const menuSections: MenuSection[] = useMemo(
    () => [
      {
        title: 'Account',
        items: [
          {
            icon: Edit,
            label: 'Edit Profile',
            onPress: () => console.log('Edit Profile pressed'),
          },
          {
            icon: Shield,
            label: 'Account Details',
            onPress: () => console.log('Account Details pressed'),
          },
          {
            icon: Bell,
            label: 'Notifications',
            rightComponent: (
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: '#E5E7EB', true: '#6366F1' }}
                thumbColor="#FFF"
              />
            ),
          },
        ],
      },
      {
        title: 'Preferences',
        items: [
          {
            icon: Moon,
            label: 'Dark Mode',
            rightComponent: (
              <Switch
                value={darkModeEnabled}
                onValueChange={setDarkModeEnabled}
                trackColor={{ false: '#E5E7EB', true: '#6366F1' }}
                thumbColor="#FFF"
              />
            ),
          },
          {
            icon: Volume2,
            label: 'Sound Effects',
            rightComponent: (
              <Switch
                value={soundEnabled}
                onValueChange={setSoundEnabled}
                trackColor={{ false: '#E5E7EB', true: '#6366F1' }}
                thumbColor="#FFF"
              />
            ),
          },
          {
            icon: Globe,
            label: 'Language',
            onPress: () => console.log('Language pressed'),
            rightText: 'English',
          },
          {
            icon: Settings,
            label: 'More Settings',
            onPress: () => console.log('More Settings pressed'),
          },
        ],
      },
      {
        title: 'Support',
        items: [
          {
            icon: HelpCircle,
            label: 'Help & Support',
            onPress: () => console.log('Help & Support pressed'),
          },
        ],
      },
    ],
    [notificationsEnabled, darkModeEnabled, soundEnabled],
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Animated.View
          style={[
            styles.header,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}
        >
          <Text style={styles.headerTitle}>Profile</Text>
        </Animated.View>

        <Animated.View
          style={[
            styles.profileCard,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}
        >
          <LinearGradient
            colors={['#6366F1', '#8B5CF6']}
            style={styles.cardGradient}
          >
            <View style={styles.profileRow}>
              <Image source={{ uri: user.avatar }} style={styles.avatar} />
              <View style={styles.userInfo}>
                <Text style={styles.name}>{user.name}</Text>
                <Text style={styles.email}>{user.email}</Text>
                <Text style={styles.joinDate}>
                  Member since {user.joinDate}
                </Text>
              </View>
            </View>
            <View style={styles.levelBar}>
              <Text style={styles.levelText}>
                Level {user.level} • {user.xp}/{user.targetXp} XP
              </Text>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${(user.xp / user.targetXp) * 100}%` },
                  ]}
                />
              </View>
            </View>
          </LinearGradient>
        </Animated.View>

        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: stat.color }]}>
                <stat.icon size={20} color="#FFF" />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {menuSections.map((section, index) => (
          <View key={index} style={styles.menuSection}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.items.map((item, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.menuItem}
                onPress={item.onPress}
                disabled={!item.onPress}
              >
                <View style={styles.menuLeft}>
                  <item.icon size={20} color="#6B7280" />
                  <Text style={styles.menuLabel}>{item.label}</Text>
                </View>
                <View style={styles.menuRight}>
                  {item.rightText && (
                    <Text style={styles.rightText}>{item.rightText}</Text>
                  )}
                  {item.rightComponent}
                  {item.onPress && !item.rightComponent && (
                    <ChevronRight size={20} color="#9CA3AF" />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ))}

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => console.log('Sign out pressed')}
        >
          <LogOut size={20} color="#EF4444" />
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: { padding: 20 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#111827' },
  profileCard: { marginHorizontal: 20, marginBottom: 20, borderRadius: 16 },
  cardGradient: { borderRadius: 16, padding: 20 },
  profileRow: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 60, height: 60, borderRadius: 30, marginRight: 16 },
  userInfo: {},
  name: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  email: { color: '#E0E7FF', fontSize: 12 },
  joinDate: { color: '#E0E7FF', fontSize: 12 },
  levelBar: { marginTop: 12 },
  levelText: { color: '#FFF', marginBottom: 4 },
  progressBar: { backgroundColor: '#E5E7EB', height: 6, borderRadius: 3 },
  progressFill: { backgroundColor: '#FFF', height: 6, borderRadius: 3 },
  statsContainer: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
  statCard: { alignItems: 'center' },
  statIcon: { padding: 8, borderRadius: 8, marginBottom: 4 },
  statValue: { fontWeight: 'bold', fontSize: 16 },
  statLabel: { fontSize: 12, color: '#6B7280' },
  menuSection: { paddingHorizontal: 20, marginBottom: 12 },
  sectionTitle: { fontWeight: 'bold', fontSize: 14, color: '#6B7280', marginBottom: 8 },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  menuLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  menuLabel: { color: '#111827', fontSize: 14 },
  menuRight: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  rightText: { color: '#6B7280', fontSize: 12 },
  logoutButton: { flexDirection: 'row', alignItems: 'center', padding: 20, gap: 8 },
  logoutText: { color: '#EF4444', fontWeight: 'bold' },
});
