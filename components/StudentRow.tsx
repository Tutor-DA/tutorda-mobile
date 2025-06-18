import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { TrendingUp, Award, Calendar } from 'lucide-react-native';
import { theme } from '@/constants/theme';
import { Student } from '@/constants/types';

interface StudentRowProps {
  student: Student;
  onPress?: () => void;
}

export function StudentRow({ student, onPress }: StudentRowProps) {
  const getXPColor = (xp: number) => {
    if (xp >= 1000) return theme.colors.secondary;
    if (xp >= 500) return theme.colors.accent;
    return theme.colors.primary;
  };

  const formatLastActive = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60),
    );

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.avatarContainer}>
        {student.avatar ? (
          <Image source={{ uri: student.avatar }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>
              {student.name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .toUpperCase()}
            </Text>
          </View>
        )}
        <View
          style={[
            styles.levelBadge,
            { backgroundColor: getXPColor(student.xp) },
          ]}
        >
          <Text style={styles.levelText}>{student.level}</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{student.name}</Text>
          <Text style={styles.email}>{student.email}</Text>
        </View>

        <View style={styles.stats}>
          <View style={styles.statItem}>
            <TrendingUp size={14} color={theme.colors.secondary} />
            <Text style={styles.statText}>{student.xp} XP</Text>
          </View>
          <View style={styles.statItem}>
            <Award size={14} color={theme.colors.accent} />
            <Text style={styles.statText}>{student.streak} day streak</Text>
          </View>
          <View style={styles.statItem}>
            <Calendar size={14} color={theme.colors.text.light} />
            <Text style={styles.statText}>
              {formatLastActive(student.lastActive)}
            </Text>
          </View>
        </View>

        <View style={styles.performance}>
          <View style={styles.performanceItem}>
            <Text style={styles.performanceLabel}>Quizzes</Text>
            <Text style={styles.performanceValue}>{student.totalQuizzes}</Text>
          </View>
          <View style={styles.performanceItem}>
            <Text style={styles.performanceLabel}>Avg Score</Text>
            <Text
              style={[
                styles.performanceValue,
                { color: getXPColor(student.avgScore) },
              ]}
            >
              {student.avgScore}%
            </Text>
          </View>
          <View style={styles.performanceItem}>
            <Text style={styles.performanceLabel}>Courses</Text>
            <Text style={styles.performanceValue}>
              {student.coursesEnrolled.length}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    ...theme.shadows.sm,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: theme.spacing.lg,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: theme.borderRadius.full,
  },
  avatarPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: theme.colors.text.inverse,
    fontSize: theme.typography.fontSize.lg,
    fontWeight: 'bold',
  },
  levelBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 24,
    height: 24,
    borderRadius: theme.borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: theme.colors.background,
  },
  levelText: {
    color: theme.colors.text.inverse,
    fontSize: theme.typography.fontSize.xs,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  header: {
    marginBottom: theme.spacing.sm,
  },
  name: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
  },
  email: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
    marginTop: theme.spacing.xs,
  },
  stats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  statText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
    fontWeight: '500',
  },
  performance: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surfaceLight,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
  },
  performanceItem: {
    flex: 1,
    alignItems: 'center',
  },
  performanceLabel: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.text.light,
    marginBottom: theme.spacing.xs,
  },
  performanceValue: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
  },
});
