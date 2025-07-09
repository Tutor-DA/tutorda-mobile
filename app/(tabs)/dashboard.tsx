import React from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { useTheme } from '@/constants/useTheme';

export default function DashboardScreen() {
  const theme = useTheme();

  return (
    <ScrollView
      contentContainerStyle={{
        padding: theme.spacing.lg,
        backgroundColor: theme.colors.background,
        flexGrow: 1,
        alignItems: 'center',
      }}
    >
      <Text
        style={{
          fontSize: theme.typography.fontSize['2xl'],
          fontFamily: theme.fonts.headingBold,
          color: theme.colors.text.primary,
          marginBottom: theme.spacing.xl,
        }}
      >
        🎯 Dashboard
      </Text>

      {/* Progress Card */}
      <View
        style={{
          width: '100%',
          backgroundColor: theme.colors.surface,
          padding: theme.spacing.lg,
          borderRadius: theme.borderRadius.lg,
          marginBottom: theme.spacing.lg,
          ...theme.shadows.md,
        }}
      >
        <Text
          style={{
            fontFamily: theme.fonts.headingSemiBold,
            fontSize: theme.typography.fontSize.lg,
            color: theme.colors.text.primary,
            marginBottom: theme.spacing.sm,
          }}
        >
          Your Progress
        </Text>
        <Text style={{ color: theme.colors.text.secondary }}>
          • Completed: 8 / 10 courses
        </Text>
        <Text style={{ color: theme.colors.text.secondary }}>
          • Quizzes passed: 15
        </Text>
        <Text style={{ color: theme.colors.text.secondary }}>
          • Achievements: 5 badges
        </Text>
      </View>

      {/* Activity Card */}
      <View
        style={{
          width: '100%',
          backgroundColor: theme.colors.surface,
          padding: theme.spacing.lg,
          borderRadius: theme.borderRadius.lg,
          marginBottom: theme.spacing.xl,
          ...theme.shadows.md,
        }}
      >
        <Text
          style={{
            fontFamily: theme.fonts.headingSemiBold,
            fontSize: theme.typography.fontSize.lg,
            color: theme.colors.text.primary,
            marginBottom: theme.spacing.sm,
          }}
        >
          Recent Activity
        </Text>
        <Text style={{ color: theme.colors.text.secondary }}>
          • Completed “Integration Basics” quiz
        </Text>
        <Text style={{ color: theme.colors.text.secondary }}>
          • Viewed “Differentiation Lecture 3”
        </Text>
        <Text style={{ color: theme.colors.text.secondary }}>
          • Earned “Math Master” badge
        </Text>
      </View>

      {/* Navigation Buttons */}
      <View style={{ width: '60%', gap: theme.spacing.md }}>
        <Button
          title="📚 View All Courses"
          color={theme.colors.primary}
          onPress={() => router.push('/courses')}
        />
        <Button
          title="👤 Go to Profile"
          color={theme.colors.secondary}
          onPress={() => router.push('/profile')}
        />
        <Button
          title="🏠 Back to Home"
          color={theme.colors.accent}
          onPress={() => router.replace('/home')}
        />
      </View>
    </ScrollView>
  );
}
