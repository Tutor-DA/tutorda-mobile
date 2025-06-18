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
import { router, useLocalSearchParams } from 'expo-router';
import {
  ArrowLeft,
  Trophy,
  Medal,
  Award,
  TrendingUp,
  Target,
  Clock,
  Users,
  Share,
  RotateCcw,
  Chrome as Home,
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '@/constants/theme';

const { width } = Dimensions.get('window');

interface QuizResult {
  id: string;
  title: string;
  totalQuestions: number;
  correctAnswers: number;
  score: number;
  timeSpent: number;
  rank: number;
  totalParticipants: number;
  xpEarned: number;
  achievements: string[];
}

interface ParticipantResult {
  id: string;
  name: string;
  avatar: string;
  score: number;
  correctAnswers: number;
  timeSpent: number;
  rank: number;
  isCurrentUser?: boolean;
}

export default function LiveQuizResultsScreen() {
  const { id } = useLocalSearchParams();
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));

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

  const quizResult: QuizResult = {
    id: id as string,
    title: 'Algebra Challenge Live',
    totalQuestions: 10,
    correctAnswers: 8,
    score: 850,
    timeSpent: 420, // 7 minutes
    rank: 2,
    totalParticipants: 24,
    xpEarned: 150,
    achievements: ['Speed Demon', 'Accuracy Master'],
  };

  const participantResults: ParticipantResult[] = [
    {
      id: '1',
      name: 'Sarah Chen',
      avatar:
        'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      score: 920,
      correctAnswers: 9,
      timeSpent: 380,
      rank: 1,
    },
    {
      id: '2',
      name: 'You',
      avatar:
        'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      score: 850,
      correctAnswers: 8,
      timeSpent: 420,
      rank: 2,
      isCurrentUser: true,
    },
    {
      id: '3',
      name: 'Mike Johnson',
      avatar:
        'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      score: 780,
      correctAnswers: 7,
      timeSpent: 450,
      rank: 3,
    },
    {
      id: '4',
      name: 'Emma Davis',
      avatar:
        'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      score: 720,
      correctAnswers: 6,
      timeSpent: 480,
      rank: 4,
    },
    {
      id: '5',
      name: 'David Wilson',
      avatar:
        'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      score: 680,
      correctAnswers: 6,
      timeSpent: 520,
      rank: 5,
    },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy size={32} color="#FFD700" />;
      case 2:
        return <Medal size={32} color="#C0C0C0" />;
      case 3:
        return <Award size={32} color="#CD7F32" />;
      default:
        return null;
    }
  };

  const getRankColor = (rank: number): [string, string] => {
  switch (rank) {
    case 1:
      return ['#FFD700', '#FFA500'];
    case 2:
      return ['#C0C0C0', '#A0A0A0'];
    case 3:
      return ['#CD7F32', '#B8860B'];
    default:
      return [theme.colors.primary, theme.colors.secondary];
  }
};


  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getPerformanceMessage = () => {
    const percentage =
      (quizResult.correctAnswers / quizResult.totalQuestions) * 100;
    if (percentage >= 90) return 'Outstanding performance! 🌟';
    if (percentage >= 80) return 'Great job! Keep it up! 🎉';
    if (percentage >= 70) return 'Good work! Room for improvement 👍';
    return "Keep practicing! You'll get better 💪";
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
          <Text style={styles.headerTitle}>Quiz Results</Text>
          <TouchableOpacity style={styles.shareButton}>
            <Share size={24} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Results Card */}
        <Animated.View
          style={[
            styles.resultsCard,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <LinearGradient
            colors={getRankColor(quizResult.rank)}
            style={styles.resultsGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.resultsHeader}>
              <View style={styles.rankIconContainer}>
                {getRankIcon(quizResult.rank)}
              </View>
              <Text style={styles.rankText}>
                #{quizResult.rank} of {quizResult.totalParticipants}
              </Text>
              <Text style={styles.quizTitle}>{quizResult.title}</Text>
              <Text style={styles.performanceMessage}>
                {getPerformanceMessage()}
              </Text>
            </View>

            <View style={styles.scoreContainer}>
              <Text style={styles.scoreValue}>{quizResult.score}</Text>
              <Text style={styles.scoreLabel}>Total Score</Text>
              <View style={styles.xpEarned}>
                <Text style={styles.xpText}>+{quizResult.xpEarned} XP</Text>
              </View>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Target size={24} color={theme.colors.secondary} />
            <Text style={styles.statValue}>
              {quizResult.correctAnswers}/{quizResult.totalQuestions}
            </Text>
            <Text style={styles.statLabel}>Correct</Text>
          </View>

          <View style={styles.statCard}>
            <Clock size={24} color={theme.colors.accent} />
            <Text style={styles.statValue}>
              {formatTime(quizResult.timeSpent)}
            </Text>
            <Text style={styles.statLabel}>Time</Text>
          </View>

          <View style={styles.statCard}>
            <TrendingUp size={24} color={theme.colors.primary} />
            <Text style={styles.statValue}>
              {Math.round(
                (quizResult.correctAnswers / quizResult.totalQuestions) * 100,
              )}
              %
            </Text>
            <Text style={styles.statLabel}>Accuracy</Text>
          </View>
        </View>

        {/* Achievements */}
        {quizResult.achievements.length > 0 && (
          <View style={styles.achievementsSection}>
            <Text style={styles.sectionTitle}>New Achievements</Text>
            <View style={styles.achievementsList}>
              {quizResult.achievements.map((achievement, index) => (
                <View key={index} style={styles.achievementCard}>
                  <Award size={20} color={theme.colors.accent} />
                  <Text style={styles.achievementText}>{achievement}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Leaderboard */}
        <View style={styles.leaderboardSection}>
          <Text style={styles.sectionTitle}>Final Leaderboard</Text>
          {participantResults.map((participant) => (
            <View
              key={participant.id}
              style={[
                styles.participantCard,
                participant.isCurrentUser && styles.currentUserCard,
              ]}
            >
              <View style={styles.participantRank}>
                <Text
                  style={[
                    styles.rankNumber,
                    participant.rank <= 3 && styles.topRank,
                  ]}
                >
                  {participant.rank}
                </Text>
              </View>

              <Image
                source={{ uri: participant.avatar }}
                style={styles.participantAvatar}
              />

              <View style={styles.participantInfo}>
                <Text
                  style={[
                    styles.participantName,
                    participant.isCurrentUser && styles.currentUserName,
                  ]}
                >
                  {participant.name}
                </Text>
                <View style={styles.participantStats}>
                  <Text style={styles.participantScore}>
                    {participant.score} pts
                  </Text>
                  <Text style={styles.participantAccuracy}>
                    {participant.correctAnswers}/{quizResult.totalQuestions}{' '}
                    correct
                  </Text>
                  <Text style={styles.participantTime}>
                    {formatTime(participant.timeSpent)}
                  </Text>
                </View>
              </View>

              {participant.rank <= 3 && (
                <View style={styles.medalContainer}>
                  {getRankIcon(participant.rank)}
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => router.push('/live-quiz/new')}
          >
            <RotateCcw size={20} color={theme.colors.primary} />
            <Text style={styles.secondaryButtonText}>Play Again</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => router.push('/(tabs)')}
          >
            <LinearGradient
              colors={[theme.colors.primary, theme.colors.secondary]}
              style={styles.primaryButtonGradient}
            >
              <Home size={20} color={theme.colors.text.inverse} />
              <Text style={styles.primaryButtonText}>Home</Text>
            </LinearGradient>
          </TouchableOpacity>
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
  shareButton: {
    padding: theme.spacing.sm,
  },
  resultsCard: {
    marginHorizontal: theme.spacing.xl,
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
    marginBottom: theme.spacing.xl,
    ...theme.shadows.lg,
  },
  resultsGradient: {
    padding: theme.spacing.xl,
    alignItems: 'center',
  },
  resultsHeader: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  rankIconContainer: {
    marginBottom: theme.spacing.lg,
  },
  rankText: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: 'bold',
    color: theme.colors.text.inverse,
    marginBottom: theme.spacing.sm,
  },
  quizTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  performanceMessage: {
    fontSize: theme.typography.fontSize.base,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  scoreContainer: {
    alignItems: 'center',
  },
  scoreValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: theme.colors.text.inverse,
    marginBottom: theme.spacing.xs,
  },
  scoreLabel: {
    fontSize: theme.typography.fontSize.base,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: theme.spacing.md,
  },
  xpEarned: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
  },
  xpText: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: 'bold',
    color: theme.colors.text.inverse,
  },
  statsGrid: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.xl,
    marginBottom: theme.spacing.xl,
    gap: theme.spacing.md,
  },
  statCard: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    alignItems: 'center',
    ...theme.shadows.sm,
  },
  statValue: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    marginVertical: theme.spacing.sm,
  },
  statLabel: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
  },
  achievementsSection: {
    paddingHorizontal: theme.spacing.xl,
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.lg,
  },
  achievementsList: {
    gap: theme.spacing.md,
  },
  achievementCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${theme.colors.accent}10`,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: `${theme.colors.accent}30`,
    gap: theme.spacing.md,
  },
  achievementText: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600',
    color: theme.colors.accent,
  },
  leaderboardSection: {
    paddingHorizontal: theme.spacing.xl,
    marginBottom: theme.spacing.xl,
  },
  participantCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    ...theme.shadows.sm,
  },
  currentUserCard: {
    borderWidth: 2,
    borderColor: theme.colors.primary,
    backgroundColor: `${theme.colors.primary}05`,
  },
  participantRank: {
    width: 40,
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  rankNumber: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
  },
  topRank: {
    color: theme.colors.accent,
  },
  participantAvatar: {
    width: 50,
    height: 50,
    borderRadius: theme.borderRadius.full,
    marginRight: theme.spacing.lg,
  },
  participantInfo: {
    flex: 1,
  },
  participantName: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  currentUserName: {
    color: theme.colors.primary,
  },
  participantStats: {
    flexDirection: 'row',
    gap: theme.spacing.lg,
  },
  participantScore: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '600',
    color: theme.colors.secondary,
  },
  participantAccuracy: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
  },
  participantTime: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
  },
  medalContainer: {
    marginLeft: theme.spacing.md,
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
    gap: theme.spacing.md,
  },
  secondaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.surface,
    paddingVertical: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 2,
    borderColor: theme.colors.border,
    gap: theme.spacing.sm,
  },
  secondaryButtonText: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600',
    color: theme.colors.primary,
  },
  primaryButton: {
    flex: 1,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
  },
  primaryButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  primaryButtonText: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600',
    color: theme.colors.text.inverse,
  },
});
