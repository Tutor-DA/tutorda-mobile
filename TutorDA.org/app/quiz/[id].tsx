import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Clock, ChevronRight } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { KaTeXRenderer } from '@/components/KaTeXRenderer';

// --- Types ---
type QuizOption = {
  id: string;
  text: string;
  isCorrect: boolean;
};

type QuizQuestion = {
  question: string;
  hint?: string;
  explanation: string;
  options: QuizOption[];
};

type Attempt = {
  question: string;
  selected: string | null;
  isCorrect?: boolean;
};

export default function QuizScreen() {
  const { id } = useLocalSearchParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [timeLeft, setTimeLeft] = useState(300);

  const originalQuiz: QuizQuestion[] = [
    {
      question: '\\text{What is the standard form of a quadratic equation?}',
      hint: '\\text{Recall the general shape of a quadratic equation.}',
      explanation: '\\text{The standard form is } ax^2 + bx + c = 0.',
      options: [
        { id: 'a', text: 'ax + b = 0', isCorrect: false },
        { id: 'b', text: 'ax^2 + bx + c = 0', isCorrect: true },
        { id: 'c', text: 'ax^3 + bx^2 + cx + d = 0', isCorrect: false },
        { id: 'd', text: 'ax^2 + b = 0', isCorrect: false },
      ],
    },
    {
      question: '\\text{Which method can be used to solve } x^2 - 5x + 6 = 0?',
      hint: '\\text{Think of the different techniques to solve quadratics.}',
      explanation:
        '\\text{This equation can be solved by all three methods: factoring, completing the square, and the quadratic formula.}',
      options: [
        { id: 'a', text: '\\text{Factoring}', isCorrect: true },
        { id: 'b', text: '\\text{Quadratic formula}', isCorrect: true },
        { id: 'c', text: '\\text{Completing the square}', isCorrect: true },
        { id: 'd', text: '\\text{All of the above}', isCorrect: true },
      ],
    },
    {
      question: '\\text{What are the solutions } to x^2 - 4 = 0?',
      hint: '\\text{Use square root property.}',
      explanation: 'x^2 = 4 \\text{ gives } x = \\pm 2.',
      options: [
        { id: 'a', text: 'x = 2', isCorrect: false },
        { id: 'b', text: 'x = -2', isCorrect: false },
        { id: 'c', text: 'x = \\pm 2', isCorrect: true },
        { id: 'd', text: 'x = 4', isCorrect: false },
      ],
    },
    {
      question: '\\text{Evaluate }\\int_0^1 x^2 \\,dx',
      hint: '\\text{Use the power rule for integration.}',
      explanation:
        '\\text{Using } \\int x^n dx = \\frac{x^{n+1}}{n+1}, we get \\int_0^1 x^2 dx = \\frac{1^3}{3} - \\frac{0^3}{3} = \\frac{1}{3}',
      options: [
        { id: 'a', text: '\\frac{1}{3}', isCorrect: true },
        { id: 'b', text: '\\frac{1}{2}', isCorrect: false },
        { id: 'c', text: '1', isCorrect: false },
        { id: 'd', text: '0', isCorrect: false },
      ],
    },
    {
      question: 'What is the limit: \\lim_{x \\to 0} \\frac{\\sin x}{x}?',
      hint: 'Famous standard limit result.',
      explanation: 'The limit is 1.',
      options: [
        { id: 'a', text: '1', isCorrect: true },
        { id: 'b', text: '0', isCorrect: false },
        { id: 'c', text: '\\infty', isCorrect: false },
        { id: 'd', text: '\\frac{1}{2}', isCorrect: false },
      ],
    },
  ];

  function shuffleOptions(quiz: QuizQuestion[]): QuizQuestion[] {
    return quiz.map((q) => ({
      ...q,
      options: [...q.options].sort(() => Math.random() - 0.5),
    }));
  }

  const [quiz] = useState<QuizQuestion[]>(shuffleOptions(originalQuiz));
  const currentQuestion = quiz[currentIndex];

  useEffect(() => {
    if (timeLeft > 0 && !showAnswer) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, showAnswer]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleOptionPress = (id: string) => {
    setSelected(id);
    setShowAnswer(true);
  };

  const handleNext = () => {
    const isCorrect = currentQuestion.options.find(
      (o) => o.id === selected,
    )?.isCorrect;
    setAttempts((prev) => [
      ...prev,
      { question: currentQuestion.question, selected, isCorrect },
    ]);
    setSelected(null);
    setShowAnswer(false);

    if (currentIndex < quiz.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      router.push('/quiz/quiz-results');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Quiz</Text>
        <View style={styles.timerContainer}>
          <Clock size={16} color={timeLeft < 60 ? '#EF4444' : '#6B7280'} />
          <Text style={[styles.timerText, timeLeft < 60 && styles.timerWarning]}>
            {formatTime(timeLeft)}
          </Text>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <Text style={styles.questionCounter}>
          Question {currentIndex + 1} of {quiz.length}
        </Text>
        <View style={styles.progressBar}>
          <LinearGradient
            colors={['#6366F1', '#8B5CF6']}
            style={[
              styles.progressFill,
              { width: `${((currentIndex + 1) / quiz.length) * 100}%` },
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          />
        </View>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.questionCard}>
          <KaTeXRenderer
            latex={currentQuestion.question}
            displayMode={true}
            fontSize={18}
            height={80}
          />
          {currentQuestion.hint && (
            <View style={styles.hintContainer}>
              <Text style={styles.hintText}>💡 Hint: {currentQuestion.hint}</Text>
            </View>
          )}
          {currentQuestion.options.map((option, index) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.option,
                selected === option.id && styles.selectedOption,
                showAnswer && option.isCorrect && styles.correctOption,
                showAnswer &&
                  selected === option.id &&
                  !option.isCorrect &&
                  styles.incorrectOption,
              ]}
              onPress={() => !showAnswer && handleOptionPress(option.id)}
              disabled={showAnswer}
            >
              <View style={styles.optionContent}>
                <View style={styles.optionLetter}>
                  <Text style={styles.optionLetterText}>
                    {String.fromCharCode(65 + index)}
                  </Text>
                </View>
                <View style={styles.optionTextContainer}>
                  <KaTeXRenderer
                    latex={option.text}
                    displayMode={false}
                    fontSize={16}
                    height={40}
                  />
                </View>
              </View>
            </TouchableOpacity>
          ))}
          {showAnswer && (
            <View style={styles.explanationContainer}>
              <Text style={styles.explanationTitle}>
                {currentQuestion.options.find((o) => o.id === selected)?.isCorrect
                  ? '✅ Correct!'
                  : '❌ Incorrect'}
              </Text>
              <KaTeXRenderer
                latex={currentQuestion.explanation}
                displayMode={true}
                fontSize={16}
                height={80}
              />
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        {showAnswer ? (
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>
              {currentIndex < quiz.length - 1 ? 'Next Question' : 'See Results'}
            </Text>
            <ChevronRight size={20} color="#FFF" />
          </TouchableOpacity>
        ) : (
          <Text style={styles.footerText}>Select an answer to continue</Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: { padding: 8 },
  headerTitle: { fontSize: 18, fontWeight: '600', color: '#111827' },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    padding: 6,
    borderRadius: 12,
  },
  timerText: { fontSize: 14, color: '#6B7280', marginLeft: 6 },
  timerWarning: { color: '#EF4444' },
  progressContainer: { padding: 16 },
  questionCounter: { fontSize: 14, color: '#6B7280', marginBottom: 6 },
  progressBar: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: { height: '100%', borderRadius: 3 },
  content: { flex: 1 },
  questionCard: {
    backgroundColor: '#FFF',
    margin: 16,
    borderRadius: 12,
    padding: 16,
  },
  hintContainer: {
    backgroundColor: '#EEF2FF',
    padding: 12,
    borderRadius: 8,
    marginVertical: 12,
  },
  hintText: { fontSize: 14, color: '#6366F1' },
  option: {
    backgroundColor: '#F9FAFB',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 16,
    marginVertical: 6,
  },
  selectedOption: { borderColor: '#6366F1', backgroundColor: '#EEF2FF' },
  correctOption: { borderColor: '#10B981', backgroundColor: '#ECFDF5' },
  incorrectOption: { borderColor: '#EF4444', backgroundColor: '#FEF2F2' },
  optionContent: { flexDirection: 'row', alignItems: 'center' },
  optionLetter: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#6366F1',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  optionLetterText: { color: '#FFF', fontWeight: '600' },
  explanationContainer: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  explanationTitle: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  footer: { padding: 16, borderTopWidth: 1, borderTopColor: '#E5E7EB' },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6366F1',
    padding: 14,
    borderRadius: 12,
  },
  nextButtonText: { color: '#FFF', fontWeight: '600', fontSize: 16 },
  footerText: { textAlign: 'center', color: '#6B7280', fontSize: 14 },
  optionTextContainer: {
    flex: 1,
  },
});
