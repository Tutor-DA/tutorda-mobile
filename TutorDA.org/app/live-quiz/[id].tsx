import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import {
  ArrowLeft,
  Users,
  Clock,
  Zap,
  Trophy,
  Target,
  CircleCheck as CheckCircle,
  X,
  Wifi,
  WifiOff,
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MathView from 'react-native-math-view';
import { theme } from '@/constants/theme';

const { width } = Dimensions.get('window');

interface LiveQuizState {
  id: string;
  title: string;
  currentQuestion: number;
  totalQuestions: number;
  timeLeft: number;
  participants: number;
  isActive: boolean;
  question: {
    id: string;
    content: string;
    options: Array<{
      id: string;
      text: string;
      isCorrect: boolean;
    }>;
  };
}

interface Participant {
  id: string;
  name: string;
  avatar: string;
  score: number;
  isOnline: boolean;
}

export default function LiveQuizScreen() {
  const { id } = useLocalSearchParams();
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<
    'connected' | 'connecting' | 'disconnected'
  >('connected');
  const [pulseAnim] = useState(new Animated.Value(1));

  // Mock live quiz data
  const [quizState, setQuizState] = useState<LiveQuizState>({
    id: id as string,
    title: 'Algebra Challenge Live',
    currentQuestion: 3,
    totalQuestions: 10,
    timeLeft: 25,
    participants: 24,
    isActive: true,
    question: {
      id: 'q3',
      content: 'Solve for x: 2x + 5 = 13',
      options: [
        { id: 'a', text: 'x = 3', isCorrect: false },
        { id: 'b', text: 'x = 4', isCorrect: true },
        { id: 'c', text: 'x = 5', isCorrect: false },
        { id: 'd', text: 'x = 6', isCorrect: false },
      ],
    },
  });

  const participants: Participant[] = [
    {
      id: '1',
      name: 'Sarah Chen',
      avatar:
        'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=2',
      score: 280,
      isOnline: true,
    },
    {
      id: '2',
      name: 'Mike Johnson',
      avatar:
        'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=2',
      score: 260,
      isOnline: true,
    },
    {
      id: '3',
      name: 'Emma Davis',
      avatar:
        'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=2',
      score: 240,
      isOnline: false,
    },
  ];

  // Pulse animation for connection status
  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    );
    pulse.start();
    return () => pulse.stop();
  }, []);

  // Timer countdown
  useEffect(() => {
    if (quizState.timeLeft > 0 && quizState.isActive && !hasAnswered) {
      const timer = setTimeout(() => {
        setQuizState((prev) => ({ ...prev, timeLeft: prev.timeLeft - 1 }));
      }, 1000);
      return () => clearTimeout(timer);
    } else if (quizState.timeLeft === 0 && !hasAnswered) {
      handleTimeUp();
    }
  }, [quizState.timeLeft, hasAnswered]);

  const handleAnswerSelect = (optionId: string) => {
    if (hasAnswered || !quizState.isActive) return;

    setSelectedAnswer(optionId);
    setHasAnswered(true);
    setShowResults(true);

    // Simulate sending answer to server
    setTimeout(() => {
      // Move to next question or show final results
      if (quizState.currentQuestion < quizState.totalQuestions) {
        setQuizState((prev) => ({
          ...prev,
          currentQuestion: prev.currentQuestion + 1,
          timeLeft: 30, // Reset timer for next question
          question: {
            id: `q${prev.currentQuestion + 1}`,
            content: 'What is the derivative of x^2?',
            options: [
              { id: 'a', text: '2x', isCorrect: true },
              { id: 'b', text: 'x', isCorrect: false },
              { id: 'c', text: '2', isCorrect: false },
              { id: 'd', text: 'x^2', isCorrect: false },
            ],
          },
        }));
        setSelectedAnswer(null);
        setHasAnswered(false);
        setShowResults(false);
      } else {
        // Quiz completed
        router.push(`/live-quiz-results/${id}`);
      }
    }, 3000);
  };

  const handleTimeUp = () => {
    setHasAnswered(true);
    setShowResults(true);
  };

  const getOptionStyle = (option: any) => {
    if (!showResults) {
      return selectedAnswer === option.id
        ? styles.selectedOption
        : styles.option;
    }

    if (option.isCorrect) {
      return styles.correctOption;
    }

    if (selectedAnswer === option.id && !option.isCorrect) {
      return styles.incorrectOption;
    }

    return styles.option;
  };

  const getConnectionIcon = () => {
    switch (connectionStatus) {
      case 'connected':
        return <Wifi size={16} color={theme.colors.secondary} />;
      case 'connecting':
        return <Wifi size={16} color={theme.colors.accent} />;
      case 'disconnected':
        return <WifiOff size={16} color={theme.colors.error} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={theme.colors.text.primary} />
        </TouchableOpacity>

        <View style={styles.headerInfo}>
          <Text style={styles.quizTitle}>{quizState.title}</Text>
          <View style={styles.headerMeta}>
            <View style={styles.connectionStatus}>
              {getConnectionIcon()}
              <Text style={styles.connectionText}>
                {connectionStatus === 'connected'
                  ? 'Live'
                  : connectionStatus === 'connecting'
                    ? 'Connecting...'
                    : 'Disconnected'}
              </Text>
            </View>
            <View style={styles.participantCount}>
              <Users size={16} color={theme.colors.text.secondary} />
              <Text style={styles.participantText}>
                {quizState.participants}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressInfo}>
          <Text style={styles.questionCounter}>
            Question {quizState.currentQuestion} of {quizState.totalQuestions}
          </Text>
          <View style={styles.timerContainer}>
            <Clock
              size={16}
              color={
                quizState.timeLeft <= 10
                  ? theme.colors.error
                  : theme.colors.text.secondary
              }
            />
            <Text
              style={[
                styles.timerText,
                quizState.timeLeft <= 10 && styles.timerUrgent,
              ]}
            >
              {quizState.timeLeft}s
            </Text>
          </View>
        </View>
        <View style={styles.progressBar}>
          <LinearGradient
            colors={[theme.colors.primary, theme.colors.secondary]}
            style={[
              styles.progressFill,
              {
                width: `${(quizState.currentQuestion / quizState.totalQuestions) * 100}%`,
              },
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          />
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Question */}
        <View style={styles.questionContainer}>
          <LinearGradient
            colors={['#6366F1', '#8B5CF6']}
            style={styles.questionCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.questionText}>
              {quizState.question.content}
            </Text>
            {quizState.timeLeft <= 10 && !hasAnswered && (
              <Animated.View
                style={[
                  styles.urgentIndicator,
                  { transform: [{ scale: pulseAnim }] },
                ]}
              >
                <Zap size={20} color={theme.colors.accent} />
                <Text style={styles.urgentText}>Time running out!</Text>
              </Animated.View>
            )}
          </LinearGradient>
        </View>

        {/* Options */}
        <View style={styles.optionsContainer}>
          {quizState.question.options.map((option, index) => (
            <TouchableOpacity
              key={option.id}
              style={getOptionStyle(option)}
              onPress={() => handleAnswerSelect(option.id)}
              disabled={hasAnswered}
            >
              <View style={styles.optionContent}>
                <View style={styles.optionLeft}>
                  <View style={styles.optionLetter}>
                    <Text style={styles.optionLetterText}>
                      {String.fromCharCode(65 + index)}
                    </Text>
                  </View>
                  <Text style={styles.optionText}>{option.text}</Text>
                </View>

                {showResults && (
                  <View style={styles.optionResult}>
                    {option.isCorrect ? (
                      <CheckCircle size={24} color={theme.colors.secondary} />
                    ) : selectedAnswer === option.id ? (
                      <X size={24} color={theme.colors.error} />
                    ) : null}
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Live Participants */}
        <View style={styles.participantsSection}>
          <Text style={styles.participantsTitle}>Live Participants</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.participantsList}>
              {participants.map((participant) => (
                <View key={participant.id} style={styles.participantCard}>
                  <View style={styles.participantAvatar}>
                    <img
                      src={participant.avatar}
                      style={styles.avatarImage}
                      alt={participant.name}
                    />
                    <View
                      style={[
                        styles.onlineIndicator,
                        {
                          backgroundColor: participant.isOnline
                            ? theme.colors.secondary
                            : theme.colors.text.light,
                        },
                      ]}
                    />
                  </View>
                  <Text style={styles.participantName}>{participant.name}</Text>
                  <View style={styles.participantScore}>
                    <Trophy size={12} color={theme.colors.accent} />
                    <Text style={styles.scoreText}>{participant.score}</Text>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Real-time Stats */}
        {showResults && (
          <View style={styles.statsSection}>
            <Text style={styles.statsTitle}>Live Results</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <Target size={24} color={theme.colors.primary} />
                <Text style={styles.statValue}>67%</Text>
                <Text style={styles.statLabel}>Correct</Text>
              </View>
              <View style={styles.statCard}>
                <Clock size={24} color={theme.colors.secondary} />
                <Text style={styles.statValue}>12s</Text>
                <Text style={styles.statLabel}>Avg Time</Text>
              </View>
              <View style={styles.statCard}>
                <Users size={24} color={theme.colors.accent} />
                <Text style={styles.statValue}>{quizState.participants}</Text>
                <Text style={styles.statLabel}>Answered</Text>
              </View>
            </View>
          </View>
        )}
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
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  backButton: {
    padding: theme.spacing.sm,
    marginRight: theme.spacing.md,
  },
  headerInfo: {
    flex: 1,
  },
  quizTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  headerMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.lg,
  },
  connectionStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  connectionText: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '600',
    color: theme.colors.secondary,
  },
  participantCount: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  participantText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
  },
  progressContainer: {
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  questionCounter: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.lg,
    gap: theme.spacing.xs,
  },
  timerText: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: 'bold',
    color: theme.colors.text.secondary,
  },
  timerUrgent: {
    color: theme.colors.error,
  },
  progressBar: {
    height: 6,
    backgroundColor: theme.colors.borderLight,
    borderRadius: theme.borderRadius.full,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: theme.borderRadius.full,
  },
  content: {
    flex: 1,
  },
  questionContainer: {
    padding: theme.spacing.xl,
  },
  questionCard: {
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.xl,
    ...theme.shadows.lg,
  },
  questionText: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: 'bold',
    color: theme.colors.text.inverse,
    textAlign: 'center',
    lineHeight:
      theme.typography.lineHeight.base * theme.typography.fontSize.xl,
  },
  urgentIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing.lg,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    gap: theme.spacing.sm,
  },
  urgentText: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: 'bold',
    color: theme.colors.text.inverse,
  },
  optionsContainer: {
    paddingHorizontal: theme.spacing.xl,
    gap: theme.spacing.md,
  },
  option: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    borderWidth: 2,
    borderColor: theme.colors.border,
  },
  selectedOption: {
    backgroundColor: `${theme.colors.primary}10`,
    borderColor: theme.colors.primary,
  },
  correctOption: {
    backgroundColor: `${theme.colors.secondary}10`,
    borderColor: theme.colors.secondary,
  },
  incorrectOption: {
    backgroundColor: `${theme.colors.error}10`,
    borderColor: theme.colors.error,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionLetter: {
    width: 32,
    height: 32,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  optionLetterText: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: 'bold',
    color: theme.colors.text.inverse,
  },
  optionText: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text.primary,
    flex: 1,
  },
  optionResult: {
    marginLeft: theme.spacing.md,
  },
  participantsSection: {
    padding: theme.spacing.xl,
  },
  participantsTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.lg,
  },
  participantsList: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  participantCard: {
    width: 80,
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    ...theme.shadows.sm,
  },
  participantAvatar: {
    position: 'relative',
    marginBottom: theme.spacing.sm,
  },
  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: theme.colors.surface,
  },
  participantName: {
    fontSize: theme.typography.fontSize.xs,
    fontWeight: '600',
    color: theme.colors.text.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.xs,
  },
  participantScore: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  scoreText: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.accent,
    fontWeight: 'bold',
  },
  statsSection: {
    paddingHorizontal: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },
  statsTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.lg,
  },
  statsGrid: {
    flexDirection: 'row',
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
});
