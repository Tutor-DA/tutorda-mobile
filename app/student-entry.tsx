import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { BookOpen, Trophy, Zap, TrendingUp, Award } from 'lucide-react-native';
import { theme } from '@/constants/theme';

const { width } = Dimensions.get('window');

export default function StudentEntryScreen() {
  const features = [
    {
      icon: <BookOpen size={32} color={theme.colors.primary} />,
      title: 'Interactive Lessons',
      description: 'Learn math topics with engaging, step-by-step lessons.',
    },
    {
      icon: <Trophy size={32} color={theme.colors.secondary} />,
      title: 'Achievements & Badges',
      description: 'Earn rewards as you progress and hit milestones.',
    },
    {
      icon: <Zap size={32} color={theme.colors.accent} />,
      title: 'Daily Streaks',
      description: 'Stay motivated with streak tracking and daily goals.',
    },
    {
      icon: <TrendingUp size={32} color={theme.colors.error} />,
      title: 'Track Progress',
      description: 'View quiz results and monitor your improvement.',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.welcomeTitle}>Welcome to MathEdu!</Text>
        <Text style={styles.welcomeSubtitle}>
          Your personalized learning journey starts here.
        </Text>

        <Image
          source={{ uri: 'https://images.pexels.com/photos/414519/pexels-photo-414519.jpeg?auto=compress&cs=tinysrgb&w=600' }}
          style={styles.bannerImage}
        />

        <View style={styles.featuresList}>
          {features.map((feature, index) => (
            <View key={index} style={styles.featureCard}>
              {feature.icon}
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDescription}>{feature.description}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={styles.startButton}
          onPress={() => router.replace('/student-dashboard')}
        >
          <Award size={20} color={theme.colors.text.inverse} />
          <Text style={styles.startButtonText}>Go to Dashboard</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    padding: theme.spacing.xl,
    alignItems: 'center',
  },
  welcomeTitle: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  welcomeSubtitle: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  bannerImage: {
    width: width - theme.spacing.xl * 2,
    height: 180,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.xl,
  },
  featuresList: {
    width: '100%',
    gap: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
  },
  featureCard: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    ...theme.shadows.sm,
  },
  featureTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginTop: theme.spacing.sm,
  },
  featureDescription: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    marginTop: theme.spacing.xs,
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
    borderRadius: theme.borderRadius.full,
    gap: theme.spacing.sm,
  },
  startButtonText: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600',
    color: theme.colors.text.inverse,
  },
});
