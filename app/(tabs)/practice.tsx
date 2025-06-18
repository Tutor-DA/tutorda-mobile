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
  Target,
  Clock,
  Trophy,
  Zap,
  Brain,
  Users,
  Award,
  Star,
  ChevronRight,
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '@/constants/theme';

const { width } = Dimensions.get('window');

// Types
type PracticeType = {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  color: [string, string]; // Gradient colors as tuple
  duration: string;
  questions: number;
  difficulty: string;
  isDaily?: boolean;
};

export default function PracticeScreen() {
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
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

  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const practiceTypes: PracticeType[] = [
    {
      id: 1,
      title: 'Quick Quiz',
      description: 'Test your knowledge with 10 random questions',
      icon: Zap,
      color: ['#F59E0B', '#D97706'],
      duration: '5 min',
      questions: 10,
      difficulty: 'Mixed',
    },
    {
      id: 2,
      title: 'Daily Challenge',
      description: "Complete today's special challenge",
      icon: Target,
      color: ['#10B981', '#059669'],
      duration: '15 min',
      questions: 20,
      difficulty: 'Intermediate',
      isDaily: true,
    },
    {
      id: 3,
      title: 'Live Session',
      description: 'Join a live quiz with other students',
      icon: Users,
      color: ['#6366F1', '#4F46E5'],
      duration: '20 min',
      questions: 15,
      difficulty: 'Mixed',
    },
    {
      id: 4,
      title: 'Brain Teaser',
      description: 'Challenging problems to test your limits',
      icon: Brain,
      color: ['#8B5CF6', '#7C3AED'],
      duration: '20 min',
      questions: 15,
      difficulty: 'Advanced',
    },
  ];

  const recentScores = [
    { subject: 'Algebra', score: 85, maxScore: 100, date: '2 hours ago' },
    { subject: 'Geometry', score: 92, maxScore: 100, date: 'Yesterday' },
    { subject: 'Calculus', score: 78, maxScore: 100, date: '2 days ago' },
  ];

  const topicQuizzes = [
    {
      id: 1,
      title: 'Linear Equations',
      subject: 'Algebra',
      difficulty: 'Beginner',
      questions: 15,
      duration: '12 min',
      rating: 4.8,
      attempts: 1250,
      bestScore: 88,
      thumbnail:
        'https://images.pexels.com/photos/6238050/pexels-photo-6238050.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2',
    },
    {
      id: 2,
      title: 'Quadratic Functions',
      subject: 'Algebra',
      difficulty: 'Intermediate',
      questions: 20,
      duration: '18 min',
      rating: 4.6,
      attempts: 890,
      bestScore: 0,
      thumbnail:
        'https://images.pexels.com/photos/3862130/pexels-photo-3862130.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2',
    },
    {
      id: 3,
      title: 'Circle Geometry',
      subject: 'Geometry',
      difficulty: 'Intermediate',
      questions: 18,
      duration: '15 min',
      rating: 4.9,
      attempts: 1100,
      bestScore: 95,
      thumbnail:
        'https://images.pexels.com/photos/5428833/pexels-photo-5428833.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2',
    },
    {
      id: 4,
      title: 'Derivatives',
      subject: 'Calculus',
      difficulty: 'Advanced',
      questions: 25,
      duration: '30 min',
      rating: 4.7,
      attempts: 650,
      bestScore: 0,
      thumbnail:
        'https://images.pexels.com/photos/8636603/pexels-photo-8636603.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2',
    },
  ];

  const filteredQuizzes = topicQuizzes.filter(
    (quiz) =>
      selectedDifficulty === 'All' || quiz.difficulty === selectedDifficulty
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return theme.colors.secondary;
      case 'Intermediate':
        return theme.colors.accent;
      case 'Advanced':
        return theme.colors.error;
      default:
        return theme.colors.text.secondary;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* (Your existing UI code as-is, unchanged) */}
        {/* The important change is in practiceTypes color type */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  // (keep your existing styles as-is)
});
