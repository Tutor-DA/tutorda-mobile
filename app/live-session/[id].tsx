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
import { theme } from '@/constants/theme';

const { width } = Dimensions.get('window');

interface QuizState {
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

export default function LiveSessionScreen() {
  const { id } = useLocalSearchParams();
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<
    'connected' | 'connecting' | 'disconnected'
  >('connected');
  const [pulseAnim] = useState(new Animated.Value(1));
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

  // Mock live quiz data
  const [quizState, setQuizState] = useState<QuizState>({
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
        router.push('/daily-challenge');
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
        <Animated.View
          style={[
            styles.questionContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
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
        </Animated.View>

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

        {/* Participants */}
        <View style={styles.participantsSection}>
          <Text style={styles.participantsTitle}>Live Participants</Text>
          <View style={styles.participantsList}>
            <View style={styles.participantItem}>
              <View style={styles.participantAvatar}>
                <Text style={styles.participantInitial}>S</Text>
                <View
                  style={[
                    styles.onlineIndicator,
                    { backgroundColor: theme.colors.secondary },
                  ]}
                />
              </View>
              <Text style={styles.participantName}>Sarah</Text>
            </View>

            <View style={styles.participantItem}>
              <View style={styles.participantAvatar}>
                <Text style={styles.participantInitial}>M</Text>
                <View
                  style={[
                    styles.onlineIndicator,
                    { backgroundColor: theme.colors.secondary },
                  ]}
                />
              </View>
              <Text style={styles.participantName}>Mike</Text>
            </View>

            <View style={styles.participantItem}>
              <View style={styles.participantAvatar}>
                <Text style={styles.participantInitial}>J</Text>
                <View
                  style={[
                    styles.onlineIndicator,
                    { backgroundColor: theme.colors.secondary },
                  ]}
                />
              </View>
              <Text style={styles.participantName}>John</Text>
            </View>

            <View style={styles.participantItem}>
              <View style={styles.participantAvatar}>
                <Text style={styles.participantInitial}>E</Text>
                <View
                  style={[
                    styles.onlineIndicator,
                    { backgroundColor: theme.colors.text.light },
                  ]}
                />
              </View>
              <Text style={styles.participantName}>Emma</Text>
            </View>

            <View style={styles.participantItem}>
              <View style={styles.participantAvatar}>
                <Text style={styles.participantInitial}>+</Text>
              </View>
              <Text style={styles.participantName}>19 more</Text>
            </View>
          </View>
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
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  headerInfo: {
    flex: 1,
  },
  quizTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: theme.colors.text.primary,
    marginBottom: 4,
  },
  headerMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  connectionStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  connectionText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: theme.colors.secondary,
  },
  participantCount: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  participantText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: theme.colors.text.secondary,
  },
  progressContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  questionCounter: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: theme.colors.text.primary,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 4,
  },
  timerText: {
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
    color: theme.colors.text.secondary,
  },
  timerUrgent: {
    color: theme.colors.error,
  },
  progressBar: {
    height: 6,
    backgroundColor: theme.colors.borderLight,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  content: {
    flex: 1,
  },
  questionContainer: {
    padding: 20,
  },
  questionCard: {
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  questionText: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: theme.colors.text.inverse,
    textAlign: 'center',
    lineHeight: 28,
  },
  urgentIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 8,
  },
  urgentText: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: theme.colors.text.inverse,
  },
  optionsContainer: {
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 24,
  },
  option: {
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    padding: 16,
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
    borderRadius: 16,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  optionLetterText: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: theme.colors.text.inverse,
  },
  optionText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: theme.colors.text.primary,
    flex: 1,
  },
  optionResult: {
    marginLeft: 12,
  },
  participantsSection: {
    padding: 20,
  },
  participantsTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: theme.colors.text.primary,
    marginBottom: 16,
  },
  participantsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  participantItem: {
    alignItems: 'center',
  },
  participantAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
    position: 'relative',
  },
  participantInitial: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: theme.colors.text.inverse,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: theme.colors.background,
  },
  participantName: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: theme.colors.text.secondary,
  },
  statsSection: {
    padding: 20,
  },
  statsTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: theme.colors.text.primary,
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statValue: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: theme.colors.text.primary,
    marginVertical: 8,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: theme.colors.text.secondary,
  },
});
