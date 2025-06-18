import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { ChevronLeft, Home } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ColorValue } from 'react-native';

export default function QuizResultsScreen() {
  // You can get params or load from state/store/context in a real app
  // const { attempts } = useLocalSearchParams();

  // Dummy stats for illustration
  const correctAnswers = 4;
  const totalQuestions = 5;
  const scorePercent = Math.round((correctAnswers / totalQuestions) * 100);

 const getResultGradient = (): [ColorValue, ColorValue] => {
  if (scorePercent >= 80) return ['#10B981', '#34D399'];
  if (scorePercent >= 50) return ['#F59E0B', '#FBBF24'];
  return ['#EF4444', '#F87171'];
};

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ChevronLeft size={24} color="#111827" />
          <Text style={styles.backText}>Back to Quiz</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Quiz Results</Text>

        <LinearGradient
          colors={getResultGradient()}
          style={styles.resultBox}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.scoreText}>{scorePercent}%</Text>
          <Text style={styles.scoreSubText}>
            {correctAnswers} out of {totalQuestions} correct
          </Text>
        </LinearGradient>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.replace('/quiz/1')}
          >
            <Text style={styles.actionText}>Restart Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.secondaryButton]}
            onPress={() => router.replace('/home')}
          >
            <Home size={18} color="#6366F1" />
            <Text style={[styles.actionText, { color: '#6366F1' }]}>Go Home</Text>
          </TouchableOpacity>
        </View>

        {/* Add detailed breakdown, badges, or sharing options here */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  scroll: { padding: 24, alignItems: 'center' },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  backText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 24,
  },
  resultBox: {
    width: '100%',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 32,
  },
  scoreText: {
    fontSize: 48,
    fontWeight: '700',
    color: '#FFF',
  },
  scoreSubText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFF',
    marginTop: 8,
  },
  actions: {
    width: '100%',
  },
  actionButton: {
    backgroundColor: '#6366F1',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  actionText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#EEF2FF',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
});
