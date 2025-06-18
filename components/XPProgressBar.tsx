import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TrendingUp } from 'lucide-react-native';
import { theme } from '@/constants/theme';

interface XPProgressBarProps {
  currentXP: number;
  targetXP: number;
  level: number;
  showLevel?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export function XPProgressBar({
  currentXP,
  targetXP,
  level,
  showLevel = true,
  size = 'medium',
}: XPProgressBarProps) {
  const progress = Math.min((currentXP / targetXP) * 100, 100);

  const getBarHeight = () => {
    switch (size) {
      case 'small':
        return 6;
      case 'medium':
        return 8;
      case 'large':
        return 12;
      default:
        return 8;
    }
  };

  const getFontSize = () => {
    switch (size) {
      case 'small':
        return theme.typography.fontSize.xs;
      case 'medium':
        return theme.typography.fontSize.sm;
      case 'large':
        return theme.typography.fontSize.base;
      default:
        return theme.typography.fontSize.sm;
    }
  };

  return (
    <View style={styles.container}>
      {showLevel && (
        <View style={styles.header}>
          <View style={styles.levelContainer}>
            <TrendingUp size={16} color={theme.colors.primary} />
            <Text style={[styles.levelText, { fontSize: getFontSize() }]}>
              Level {level}
            </Text>
          </View>
          <Text style={[styles.xpText, { fontSize: getFontSize() }]}>
            {currentXP} / {targetXP} XP
          </Text>
        </View>
      )}

      <View style={[styles.progressBar, { height: getBarHeight() }]}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${progress}%`,
              height: getBarHeight(),
            },
          ]}
        />
      </View>

      {!showLevel && (
        <View style={styles.footer}>
          <Text style={[styles.progressText, { fontSize: getFontSize() }]}>
            {Math.round(progress)}% to next level
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  levelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  levelText: {
    fontWeight: 'bold',
    color: theme.colors.text.primary,
  },
  xpText: {
    color: theme.colors.text.secondary,
    fontWeight: '500',
  },
  progressBar: {
    backgroundColor: theme.colors.borderLight,
    borderRadius: theme.borderRadius.full,
    overflow: 'hidden',
  },
  progressFill: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.full,
  },
  footer: {
    alignItems: 'center',
    marginTop: theme.spacing.sm,
  },
  progressText: {
    color: theme.colors.text.secondary,
    fontWeight: '500',
  },
});
