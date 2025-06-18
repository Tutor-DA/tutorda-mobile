import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CircleCheck as CheckCircle, Circle, Lock } from 'lucide-react-native';
import { theme } from '@/constants/theme';

interface LessonStep {
  id: string;
  title: string;
  isCompleted: boolean;
  isLocked: boolean;
  isCurrent?: boolean;
}

interface LessonProgressProps {
  steps: LessonStep[];
  onStepPress: (stepId: string) => void;
}

export default function LessonProgress({
  steps,
  onStepPress,
}: LessonProgressProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lesson Progress</Text>

      <View style={styles.stepsContainer}>
        {steps.map((step, index) => (
          <View key={step.id} style={styles.stepWrapper}>
            <TouchableOpacity
              style={styles.step}
              onPress={() => !step.isLocked && onStepPress(step.id)}
              disabled={step.isLocked}
            >
              <View style={styles.stepContent}>
                <View style={styles.stepIcon}>
                  {step.isLocked ? (
                    <Lock size={16} color={theme.colors.text.light} />
                  ) : step.isCompleted ? (
                    <CheckCircle size={16} color={theme.colors.secondary} />
                  ) : step.isCurrent ? (
                    <LinearGradient
                      colors={[theme.colors.primary, theme.colors.purple]}
                      style={styles.currentStepIcon}
                    >
                      <Circle size={12} color={theme.colors.text.inverse} />
                    </LinearGradient>
                  ) : (
                    <Circle size={16} color={theme.colors.text.light} />
                  )}
                </View>

                <View style={styles.stepInfo}>
                  <Text
                    style={[
                      styles.stepTitle,
                      step.isLocked && styles.lockedText,
                      step.isCurrent && styles.currentText,
                      step.isCompleted && styles.completedText,
                    ]}
                  >
                    {step.title}
                  </Text>

                  <Text
                    style={[
                      styles.stepStatus,
                      step.isLocked && styles.lockedText,
                    ]}
                  >
                    {step.isLocked
                      ? 'Locked'
                      : step.isCompleted
                        ? 'Completed'
                        : step.isCurrent
                          ? 'In Progress'
                          : 'Not Started'}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            {index < steps.length - 1 && (
              <View
                style={[
                  styles.connector,
                  step.isCompleted && styles.completedConnector,
                ]}
              />
            )}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.xl,
    margin: theme.spacing.xl,
    ...theme.shadows.sm,
  },
  title: {
    fontSize: theme.typography.fontSize.lg,
    fontFamily: theme.typography.fontFamily.semiBold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xl,
  },
  stepsContainer: {
    gap: 0,
  },
  stepWrapper: {
    position: 'relative',
  },
  step: {
    paddingVertical: theme.spacing.md,
  },
  stepContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepIcon: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.lg,
  },
  currentStepIcon: {
    width: 20,
    height: 20,
    borderRadius: theme.borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepInfo: {
    flex: 1,
  },
  stepTitle: {
    fontSize: theme.typography.fontSize.base,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  stepStatus: {
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.text.secondary,
  },
  lockedText: {
    color: theme.colors.text.light,
  },
  currentText: {
    color: theme.colors.primary,
  },
  completedText: {
    color: theme.colors.secondary,
  },
  connector: {
    position: 'absolute',
    left: 15,
    top: 44,
    width: 2,
    height: 24,
    backgroundColor: theme.colors.borderLight,
  },
  completedConnector: {
    backgroundColor: theme.colors.secondary,
  },
});
