import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { BookOpen, Users, TrendingUp } from 'lucide-react-native';
import { theme } from '@/constants/theme';
import { Course } from '@/constants/types';

interface CourseCardProps {
  course: Course;
  onPress?: () => void;
}

export function CourseCard({ course, onPress }: CourseCardProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: course.color }]}>
        <BookOpen size={18} color={theme.colors.text.inverse} />
        <View style={styles.progressBadge}>
          <Text style={styles.progressText}>{course.progress || 0}%</Text>
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View>
          <Text style={styles.title} numberOfLines={1}>
            {course.title}
          </Text>
          <Text style={styles.description} numberOfLines={2}>
            {course.description}
          </Text>
        </View>

        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Users size={12} color={theme.colors.text.secondary} />
            <Text style={styles.statText}>{course.studentCount}</Text>
          </View>
          <View style={styles.statItem}>
            <TrendingUp size={12} color={theme.colors.text.secondary} />
            <Text style={styles.statText}>{course.avgXP} XP</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    padding: theme.spacing.sm,
    ...theme.shadows.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.sm,
    minHeight: 40,
  },
  progressBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.md,
  },
  progressText: {
    color: theme.colors.text.inverse,
    fontSize: theme.typography.fontSize.xs,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.sm,
    paddingBottom: theme.spacing.sm,
  },
  title: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  description: {
    fontSize: theme.typography.fontSize.xs,
    lineHeight: theme.typography.fontSize.xs * 1.4,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.sm,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.text.secondary,
    fontWeight: '500',
    marginLeft: theme.spacing.xs,
  },
});
