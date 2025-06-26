import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import {
  ArrowLeft,
  Calendar,
  Trophy,
  Zap,
  Target,
  Clock,
  Star,
  Gift,
  Flame,
  Award,
  TrendingUp,
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '@/constants/theme';

const { width } = Dimensions.get('window');

interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  xpReward: number;
  timeLimit: number;
  category: string;
  isCompleted: boolean;
  completedAt?: string;
  streak: number;
}

interface WeeklyGoal {
  id: string;
  title: string;
  description: string;
  progress: number;
  target: number;
  reward: string;
  xpReward: number;
}

export default function DailyChallengeScreen() {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.9));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const todayChallenge: DailyChallenge = {
    id: '1',
    title: 'Quadratic Master',
    description: 'Solve 5 quadratic equations in under 10 minutes',
    difficulty: 'medium',
    xpReward: 150,
    timeLimit: 600, // 10 minutes
    category: 'Algebra',
    isCompleted: false,
    streak: 7,
  };

  const weeklyGoals: WeeklyGoal[] = [
    {
      id: '1',
      title: 'Study Streak',
      description: 'Complete daily challenges for 7 days',
      progress: 5,
      target: 7,
      reward: 'Golden Calculator Badge',
      xpReward: 500,
    },
    {
      id: '2',
      title: 'Quiz Champion',
      description: 'Score 90%+ on 10 quizzes',
      progress: 7,
      target: 10,
      reward: 'Quiz Master Title',
      xpReward: 300,
    },
    {
      id: '3',
      title: 'Speed Demon',
      description: 'Complete 15 challenges under time limit',
      progress: 12,
      target: 15,
      reward: 'Lightning Badge',
      xpReward: 400,
    },
  ];

  const recentRewards = [
    { id: '1', title: 'Week Warrior', icon: '🔥', earnedAt: '2 hours ago' },
    { id: '2', title: 'Perfect Score', icon: '⭐', earnedAt: 'Yesterday' },
    { id: '3', title: 'Speed Runner', icon: '⚡', earnedAt: '2 days ago' },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
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

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color={theme.colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Daily Challenge</Text>
          <View style={styles.streakBadge}>
            <Flame size={16} color={theme.colors.accent} />
            <Text style={styles.streakText}>{todayChallenge.streak}</Text>
          </View>
        </View>

        {/* Today's Challenge */}
        <Animated.View
          style={[
            styles.challengeCard,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <LinearGradient
            colors={['#6366F1', '#8B5CF6', '#EC4899']}
            style={styles.challengeGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.challengeHeader}>
              <View style={styles.challengeInfo}>
                <Text style={styles.challengeTitle}>
                  {todayChallenge.title}
                </Text>
                <Text style={styles.challengeDescription}>
                  {todayChallenge.description}
                </Text>
                <View style={styles.challengeMeta}>
                  <View style={styles.metaItem}>
                    <Clock size={16} color="rgba(255, 255, 255, 0.8)" />
                    <Text style={styles.metaText}>
                      {formatTime(todayChallenge.timeLimit)}
                    </Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Star size={16} color="rgba(255, 255, 255, 0.8)" />
                    <Text style={styles.metaText}>
                      {todayChallenge.xpReward} XP
                    </Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Target size={16} color="rgba(255, 255, 255, 0.8)" />
                    <Text style={styles.metaText}>
                      {todayChallenge.category}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.challengeIcon}>
                <Trophy size={32} color={theme.colors.text.inverse} />
              </View>
            </View>

            <View
              style={[
                styles.difficultyBadge,
                {
                  backgroundColor: getDifficultyColor(
                    todayChallenge.difficulty,
                  ),
                },
              ]}
            >
              <Text style={styles.difficultyText}>
                {todayChallenge.difficulty.toUpperCase()}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.startChallengeButton}
              onPress={() => router.push(`/quiz/daily-${todayChallenge.id}`)}
            >
              <Text style={styles.startChallengeText}>Start Challenge</Text>
              <Zap size={20} color={theme.colors.text.inverse} />
            </TouchableOpacity>
          </LinearGradient>
        </Animated.View>

        {/* Weekly Goals */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Weekly Goals</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          {weeklyGoals.map((goal) => (
            <View key={goal.id} style={styles.goalCard}>
              <View style={styles.goalHeader}>
                <View style={styles.goalInfo}>
                  <Text style={styles.goalTitle}>{goal.title}</Text>
                  <Text style={styles.goalDescription}>{goal.description}</Text>
                </View>
                <View style={styles.goalReward}>
                  <Gift size={20} color={theme.colors.accent} />
                  <Text style={styles.goalXP}>{goal.xpReward} XP</Text>
                </View>
              </View>

              <View style={styles.progressContainer}>
                <View style={styles.progressInfo}>
                  <Text style={styles.progressText}>
                    {goal.progress} / {goal.target}
                  </Text>
                  <Text style={styles.progressPercentage}>
                    {Math.round((goal.progress / goal.target) * 100)}%
                  </Text>
                </View>
                <View style={styles.progressBar}>
                  <LinearGradient
                    colors={[theme.colors.primary, theme.colors.secondary]}
                    style={[
                      styles.progressFill,
                      { width: `${(goal.progress / goal.target) * 100}%` },
                    ]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  />
                </View>
              </View>

              <View style={styles.rewardContainer}>
                <Award size={16} color={theme.colors.accent} />
                <Text style={styles.rewardText}>{goal.reward}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Recent Rewards */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Rewards</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.rewardsContainer}>
              {recentRewards.map((reward) => (
                <View key={reward.id} style={styles.rewardCard}>
                  <Text style={styles.rewardIcon}>{reward.icon}</Text>
                  <Text style={styles.rewardTitle}>{reward.title}</Text>
                  <Text style={styles.rewardTime}>{reward.earnedAt}</Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Challenge History */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Challenge History</Text>
          <View style={styles.historyGrid}>
            {Array.from({ length: 7 }, (_, i) => {
              const isCompleted = i < 5;
              const isToday = i === 6;
              return (
                <View
                  key={i}
                  style={[
                    styles.historyDay,
                    isCompleted && styles.historyDayCompleted,
                    isToday && styles.historyDayToday,
                  ]}
                >
                  <Text
                    style={[
                      styles.historyDayText,
                      isCompleted && styles.historyDayTextCompleted,
                      isToday && styles.historyDayTextToday,
                    ]}
                  >
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                  </Text>
                  {isCompleted && (
                    <View style={styles.completedIndicator}>
                      <Trophy size={12} color={theme.colors.text.inverse} />
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        </View>

        {/* Leaderboard Preview */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Weekly Leaderboard</Text>
            <TouchableOpacity onPress={() => router.push('/leaderboard')}>
              <Text style={styles.viewAllText}>View Full</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.leaderboardPreview}>
            {[
              {
                rank: 1,
                name: 'Sarah Chen',
                xp: 2450,
                avatar:
                  'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
              },
              {
                rank: 2,
                name: 'You',
                xp: 2380,
                avatar:
                  'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
              },
              {
                rank: 3,
                name: 'Mike Johnson',
                xp: 2290,
                avatar:
                  'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
              },
            ].map((player) => (
              <View key={player.rank} style={styles.leaderboardItem}>
                <View style={styles.rankContainer}>
                  <Text
                    style={[
                      styles.rankText,
                      player.rank === 1 && styles.firstPlace,
                      player.rank === 2 && styles.secondPlace,
                      player.rank === 3 && styles.thirdPlace,
                    ]}
                  >
                    {player.rank}
                  </Text>
                </View>
                <Image
                  source={{ uri: player.avatar }}
                  style={styles.playerAvatar}
                />
                <View style={styles.playerInfo}>
                  <Text
                    style={[
                      styles.playerName,
                      player.name === 'You' && styles.currentPlayer,
                    ]}
                  >
                    {player.name}
                  </Text>
                  <View style={styles.playerXP}>
                    <TrendingUp size={14} color={theme.colors.secondary} />
                    <Text style={styles.playerXPText}>{player.xp} XP</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.lg,
  },
  backButton: {
    padding: theme.spacing.sm,
  },
  headerTitle: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${theme.colors.accent}15`,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
    gap: theme.spacing.xs,
  },
  streakText: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: 'bold',
    color: theme.colors.accent,
  },
  challengeCard: {
    marginHorizontal: theme.spacing.xl,
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
    marginBottom: theme.spacing.xl,
    ...theme.shadows.lg,
  },
  challengeGradient: {
    padding: theme.spacing.xl,
  },
  challengeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.lg,
  },
  challengeInfo: {
    flex: 1,
    marginRight: theme.spacing.lg,
  },
  challengeTitle: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: 'bold',
    color: theme.colors.text.inverse,
    marginBottom: theme.spacing.sm,
  },
  challengeDescription: {
    fontSize: theme.typography.fontSize.base,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: theme.spacing.lg,
    lineHeight:
      theme.typography.lineHeight.base * theme.typography.fontSize.base,
  },
  challengeMeta: {
    flexDirection: 'row',
    gap: theme.spacing.lg,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  metaText: {
    fontSize: theme.typography.fontSize.sm,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
  },
  challengeIcon: {
    width: 64,
    height: 64,
    borderRadius: theme.borderRadius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  difficultyBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.lg,
  },
  difficultyText: {
    fontSize: theme.typography.fontSize.xs,
    fontWeight: 'bold',
    color: theme.colors.text.inverse,
    letterSpacing: 0.5,
  },
  startChallengeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    gap: theme.spacing.sm,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  startChallengeText: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: 'bold',
    color: theme.colors.text.inverse,
  },
  section: {
    paddingHorizontal: theme.spacing.xl,
    marginBottom: theme.spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
  },
  viewAllText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.primary,
    fontWeight: '600',
  },
  goalCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    ...theme.shadows.sm,
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.md,
  },
  goalInfo: {
    flex: 1,
    marginRight: theme.spacing.md,
  },
  goalTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  goalDescription: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
    lineHeight:
      theme.typography.lineHeight.base * theme.typography.fontSize.sm,
  },
  goalReward: {
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  goalXP: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: 'bold',
    color: theme.colors.accent,
  },
  progressContainer: {
    marginBottom: theme.spacing.md,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  progressText: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  progressPercentage: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  progressBar: {
    height: 8,
    backgroundColor: theme.colors.borderLight,
    borderRadius: theme.borderRadius.full,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: theme.borderRadius.full,
  },
  rewardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  rewardText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.accent,
    fontWeight: '600',
  },
  rewardsContainer: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  rewardCard: {
    width: 120,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    alignItems: 'center',
    ...theme.shadows.sm,
  },
  rewardIcon: {
    fontSize: 32,
    marginBottom: theme.spacing.sm,
  },
  rewardTitle: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.xs,
  },
  rewardTime: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
  historyGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    ...theme.shadows.sm,
  },
  historyDay: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  historyDayCompleted: {
    backgroundColor: theme.colors.secondary,
  },
  historyDayToday: {
    backgroundColor: theme.colors.primary,
    borderWidth: 2,
    borderColor: theme.colors.accent,
  },
  historyDayText: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: 'bold',
    color: theme.colors.text.secondary,
  },
  historyDayTextCompleted: {
    color: theme.colors.text.inverse,
  },
  historyDayTextToday: {
    color: theme.colors.text.inverse,
  },
  completedIndicator: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 20,
    height: 20,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leaderboardPreview: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    ...theme.shadows.sm,
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderLight,
  },
  rankContainer: {
    width: 32,
    height: 32,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  rankText: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
  },
  firstPlace: {
    color: '#FFD700',
  },
  secondPlace: {
    color: '#C0C0C0',
  },
  thirdPlace: {
    color: '#CD7F32',
  },
  playerAvatar: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.full,
    marginRight: theme.spacing.md,
  },
  playerInfo: {
    flex: 1,
  },
  playerName: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  currentPlayer: {
    color: theme.colors.primary,
  },
  playerXP: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  playerXPText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.secondary,
    fontWeight: '500',
  },
});
