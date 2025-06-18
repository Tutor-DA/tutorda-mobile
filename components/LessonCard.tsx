/**
 * Lesson Card component for displaying individual lessons
 * Shows lesson info, progress, and lock status
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ViewStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Lock,
  Star,
  Clock,
  CircleCheck as CheckCircle,
  Play,
  BookOpen,
} from 'lucide-react-native';
import { theme } from '@/constants/theme';

interface LessonCardProps {
  /** Lesson ID */
  id: string;
  /** Lesson title */
  title: string;
  /** Lesson description */
  description?: string;
  /** Subject category */
  subject: string;
  /** Difficulty level */
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  /** Estimated completion time */
  duration: string;
  /** Progress percentage (0-100) */
  progress: number;
  /** Lesson rating */
  rating?: number;
  /** Number of students */
  students?: number;
  /** Whether lesson is locked */
  isLocked: boolean;
  /** Lesson thumbnail URL */
  thumbnail?: string;
  /** XP required to unlock */
  xpRequired?: number;
  /** Callback when lesson is pressed */
  onPress: () => void;
  /** Additional styles */
  style?: ViewStyle;
  /** Test ID for testing */
  testID?: string;
}

/**
 * LessonCard component for displaying lesson information
 * Supports locked/unlocked states with progress tracking
 */
export function LessonCard({
  id,
  title,
  description,
  subject,
  difficulty,
  duration,
  progress,
  rating,
  students,
  isLocked,
  thumbnail,
  xpRequired,
  onPress,
  style,
  testID,
}: LessonCardProps) {
  const getDifficultyColor = () => {
    switch (difficulty) {
      case 'Beginner':
        return theme.colors.success;
      case 'Intermediate':
        return theme.colors.warning;
      case 'Advanced':
        return theme.colors.error;
      default:
        return theme.colors.text.secondary;
    }
  };

  const getProgressIcon = () => {
    if (isLocked) return <Lock size={16} color={theme.colors.text.light} />;
    if (progress === 100)
      return <CheckCircle size={16} color={theme.colors.success} />;
    if (progress > 0) return <Play size={16} color={theme.colors.info} />;
    return <BookOpen size={16} color={theme.colors.text.secondary} />;
  };

  const cardStyle = [styles.card, isLocked && styles.lockedCard, style];

  return (
    <TouchableOpacity
      style={cardStyle}
      onPress={onPress}
      disabled={isLocked}
      testID={testID}
      accessibilityRole="button"
      accessibilityLabel={`${title} lesson, ${difficulty} difficulty, ${progress}% complete${isLocked ? ', locked' : ''}`}
      accessibilityHint={
        isLocked ? `Requires ${xpRequired} XP to unlock` : 'Tap to start lesson'
      }
    >
      {/* Thumbnail */}
      {thumbnail && (
        <Image source={{ uri: thumbnail }} style={styles.thumbnail} />
      )}

      {/* Content */}
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={[styles.title, isLocked && styles.lockedText]}>
              {title}
            </Text>
            <View style={styles.meta}>
              {getProgressIcon()}
              <Text style={[styles.subject, isLocked && styles.lockedText]}>
                {subject}
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.difficultyBadge,
              { backgroundColor: getDifficultyColor() },
            ]}
          >
            <Text style={styles.difficultyText}>{difficulty}</Text>
          </View>
        </View>

        {/* Description */}
        {description && (
          <Text style={[styles.description, isLocked && styles.lockedText]}>
            {description}
          </Text>
        )}

        {/* Stats */}
        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Clock
              size={14}
              color={
                isLocked ? theme.colors.text.light : theme.colors.text.secondary
              }
            />
            <Text style={[styles.statText, isLocked && styles.lockedText]}>
              {duration}
            </Text>
          </View>

          {rating && (
            <View style={styles.statItem}>
              <Star
                size={14}
                color={
                  isLocked ? theme.colors.text.light : theme.colors.warning
                }
              />
              <Text style={[styles.statText, isLocked && styles.lockedText]}>
                {rating}
              </Text>
            </View>
          )}

          {students && (
            <View style={styles.statItem}>
              <Text style={[styles.statText, isLocked && styles.lockedText]}>
                {students.toLocaleString()} students
              </Text>
            </View>
          )}
        </View>

        {/* Progress Bar */}
        {progress > 0 && !isLocked && (
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <LinearGradient
                colors={[theme.colors.info, theme.colors.purple]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.progressFill, { width: `${progress}%` }]}
              />
            </View>
            <Text style={styles.progressText}>{progress}% complete</Text>
          </View>
        )}

        {/* Lock Info */}
        {isLocked && xpRequired && (
          <View style={styles.lockInfo}>
            <Lock size={14} color={theme.colors.text.light} />
            <Text style={styles.lockText}>
              Requires {xpRequired} XP to unlock
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    ...theme.shadows.md,
  },
  lockedCard: {
    opacity: 0.6,
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: theme.borderRadius.md,
    marginRight: theme.spacing.lg,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.sm,
  },
  titleContainer: {
    flex: 1,
    marginRight: theme.spacing.md,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: 4,
    lineHeight: 22,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subject: {
    fontSize: 12,
    fontWeight: '500',
    color: theme.colors.text.secondary,
    marginLeft: 6,
  },
  difficultyBadge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.md,
  },
  difficultyText: {
    fontSize: 10,
    fontWeight: '600',
    color: theme.colors.white,
  },
  description: {
    fontSize: 14,
    fontWeight: 'normal',
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.md,
    lineHeight: 20,
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: theme.spacing.lg,
  },
  statText: {
    fontSize: 12,
    fontWeight: 'normal',
    color: theme.colors.text.secondary,
    marginLeft: 4,
  },
  progressContainer: {
    marginTop: theme.spacing.sm,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 10,
    fontWeight: '500',
    color: theme.colors.info,
  },
  lockInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing.sm,
  },
  lockText: {
    fontSize: 12,
    fontWeight: '500',
    color: theme.colors.text.light,
    marginLeft: 4,
  },
  lockedText: {
    color: theme.colors.text.light,
  },
});
