import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {
  Clock,
  FileText,
  ChartBar as BarChart3,
  Play,
} from 'lucide-react-native';
import { theme } from '@/constants/theme';
import { Quiz } from '@/constants/types';

interface QuizCardProps {
  quiz: Quiz;
  onPress?: () => void;
  onEdit?: () => void;
}

export function QuizCard({ quiz, onPress, onEdit }: QuizCardProps) {
  const getDifficultyColor = () => {
    switch (quiz.difficulty) {
      case 'easy':
        return theme.colors.secondary;
      case 'medium':
        return theme.colors.accent;
      case 'hard':
        return theme.colors.error;
      default:
        return theme.colors.text.secondary;
    }
  };

  const getStatusColor = () => {
    switch (quiz.status) {
      case 'published':
        return theme.colors.secondary;
      case 'draft':
        return theme.colors.accent;
      case 'archived':
        return theme.colors.text.light;
      default:
        return theme.colors.text.secondary;
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {quiz.title}
          </Text>
          <Text style={styles.description} numberOfLines={2}>
            {quiz.description}
          </Text>
        </View>
        <View style={styles.badges}>
          <View
            style={[styles.badge, { backgroundColor: getDifficultyColor() }]}
          >
            <Text style={styles.badgeText}>{quiz.difficulty}</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: getStatusColor() }]}>
            <Text style={styles.badgeText}>{quiz.status}</Text>
          </View>
        </View>
      </View>

      <View style={styles.stats}>
        <View style={styles.statItem}>
          <FileText size={16} color={theme.colors.text.secondary} />
          <Text style={styles.statText}>{quiz.questionCount} questions</Text>
        </View>
        <View style={styles.statItem}>
          <Clock size={16} color={theme.colors.text.secondary} />
          <Text style={styles.statText}>{quiz.duration} min</Text>
        </View>
        {quiz.attempts !== undefined && (
          <View style={styles.statItem}>
            <BarChart3 size={16} color={theme.colors.text.secondary} />
            <Text style={styles.statText}>{quiz.attempts} attempts</Text>
          </View>
        )}
      </View>

      {quiz.avgScore !== undefined && (
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreLabel}>Average Score:</Text>
          <Text style={styles.scoreValue}>{quiz.avgScore}%</Text>
        </View>
      )}

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={onEdit}>
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.primaryAction]}
          onPress={onPress}
        >
          <Play size={16} color={theme.colors.text.inverse} />
          <Text
            style={[styles.actionText, { color: theme.colors.text.inverse }]}
          >
            View
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    ...theme.shadows.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.md,
  },
  titleContainer: {
    flex: 1,
    marginRight: theme.spacing.md,
  },
  title: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  description: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
    lineHeight:
      theme.typography.lineHeight.base * theme.typography.fontSize.sm,
  },
  badges: {
    gap: theme.spacing.xs,
  },
  badge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.md,
  },
  badgeText: {
    color: theme.colors.text.inverse,
    fontSize: theme.typography.fontSize.xs,
    fontWeight: '600',
    textTransform: 'capitalize',
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
  },
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceLight,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.md,
  },
  scoreLabel: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
  },
  scoreValue: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  actions: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.surfaceLight,
    gap: theme.spacing.xs,
  },
  primaryAction: {
    backgroundColor: theme.colors.primary,
  },
  actionText: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
});
