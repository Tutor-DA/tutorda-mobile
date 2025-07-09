import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
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
  Zap,
  Brain,
  Users,
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/constants/useTheme';

const { width } = Dimensions.get('window');

type PracticeType = {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  color: [string, string];
  duration: string;
  questions: number;
  difficulty: string;
  isDaily?: boolean;
};

export default function PracticeScreen() {
  const theme = useTheme();
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

  const filteredQuizzes = practiceTypes.filter(
    (quiz) =>
      selectedDifficulty === 'All' || quiz.difficulty === selectedDifficulty
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return theme.colors.success;
      case 'Intermediate':
        return theme.colors.accent;
      case 'Advanced':
        return theme.colors.error;
      default:
        return theme.colors.text.secondary;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView contentContainerStyle={{ padding: theme.spacing.md }}>
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
        >
          <Text
            style={{
              fontSize: theme.typography.fontSize['2xl'],
              fontFamily: theme.typography.fontFamily.headingBold,
              color: theme.colors.text.primary,
              marginBottom: theme.spacing.lg,
              textAlign: 'center',
            }}
          >
            Practice Modes
          </Text>

          {filteredQuizzes.map((quiz) => {
            const Icon = quiz.icon;
            return (
              <TouchableOpacity
                key={quiz.id}
                onPress={() => router.push(`/quiz/${quiz.id}`)}
                style={{ marginBottom: theme.spacing.lg }}
              >
                <LinearGradient
                  colors={quiz.color}
                  style={{
                    borderRadius: theme.borderRadius.lg,
                    padding: theme.spacing.lg,
                  }}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon
                      color={theme.colors.white}
                      size={32}
                      style={{ marginRight: theme.spacing.md }}
                    />
                    <View>
                      <Text
                        style={{
                          fontFamily: theme.fonts.headingBold,
                          fontSize: theme.typography.fontSize.lg,
                          color: theme.colors.white,
                        }}
                      >
                        {quiz.title}
                      </Text>
                      <Text
                        style={{
                          fontFamily: theme.fonts.regular,
                          color: theme.colors.white,
                        }}
                      >
                        {quiz.description}
                      </Text>
                    </View>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            );
          })}
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}
