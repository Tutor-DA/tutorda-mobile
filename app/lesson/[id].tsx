// New screen version of LessonScreen.tsx (with LaTeX rendering)
// Replace your contentText Text with KaTeXRenderer blocks when it detects formulas

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ArrowLeft,
  BookOpen,
  Play,
  Pause,
  RotateCcw,
  CircleCheck as CheckCircle,
  ChevronRight,
} from 'lucide-react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { KaTeXRenderer } from '@/components/KaTeXRenderer';
import LessonProgress from '@/components/LessonProgress';

export default function LessonScreen() {
  const { id } = useLocalSearchParams();
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const lesson = {
    id: id,
    title: 'Quadratic Equations',
    subject: 'Algebra',
    difficulty: 'Intermediate',
    estimatedTime: '25 min',
    description:
      'Learn to solve quadratic equations using various methods including factoring, completing the square, and the quadratic formula.',
    steps: [
      {
        id: '1',
        title: 'Introduction to Quadratic Equations',
        isCompleted: true,
        isLocked: false,
      },
      {
        id: '2',
        title: 'Factoring Method',
        isCompleted: true,
        isLocked: false,
      },
      {
        id: '3',
        title: 'Completing the Square',
        isCompleted: false,
        isLocked: false,
        isCurrent: true,
      },
      {
        id: '4',
        title: 'Quadratic Formula',
        isCompleted: false,
        isLocked: false,
      },
      {
        id: '5',
        title: 'Practice Problems',
        isCompleted: false,
        isLocked: false,
      },
      { id: '6', title: 'Assessment', isCompleted: false, isLocked: true },
    ],
  };

  const currentStepData = {
    title: 'Completing the Square',
    content: [
      'Completing the square is a method used to solve quadratic equations by transforming them into a perfect square trinomial.',
      'Steps to Complete the Square:',
      'ax^2 + bx + c = 0',
      'ax^2 + bx = -c',
      'x^2 + (b/a)x = -c/a',
      'x^2 + (b/a)x + (b/2a)^2 = -c/a + (b/2a)^2',
      '(x + b/2a)^2 = -c/a + (b/2a)^2',
      'x + b/2a = \\pm\\sqrt{-c/a + (b/2a)^2}',
      'x = -b/2a \\pm \\sqrt{-c/a + (b/2a)^2}',
      'Example: Solve x^2 + 6x + 5 = 0',
      'x^2 + 6x = -5',
      'x^2 + 6x + 9 = -5 + 9',
      '(x + 3)^2 = 4',
      'x + 3 = \\pm 2',
      'x = -3 \\pm 2',
      'x = -1 or x = -5',
    ],
  };

  const handleStepPress = (stepId: string) => {
    const stepIndex = lesson.steps.findIndex((step) => step.id === stepId);
    if (stepIndex !== -1) setCurrentStep(stepIndex);
  };

  const handleNext = () => {
    if (currentStep < lesson.steps.length - 1) setCurrentStep(currentStep + 1);
    else router.push(`/quiz/${id}`);
  };

  const handlePrevious = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const isLatexFormula = (text: string) => {
    // Simple check for LaTeX-like content
    return /[\\^_{}]|\\frac|\\sqrt|\\pm/.test(text);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#111827" />
        </TouchableOpacity>

        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>{lesson.title}</Text>
          <Text style={styles.headerSubtitle}>
            {lesson.subject} • {lesson.difficulty}
          </Text>
        </View>

        <TouchableOpacity style={styles.menuButton}>
          <BookOpen size={24} color="#6366F1" />
        </TouchableOpacity>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${((currentStep + 1) / lesson.steps.length) * 100}%` },
            ]}
          />
        </View>
        <Text style={styles.progressText}>
          {currentStep + 1} of {lesson.steps.length}
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.contentCard}>
          <View style={styles.contentHeader}>
            <Text style={styles.contentTitle}>{currentStepData.title}</Text>
            <View style={styles.audioControls}>
              <TouchableOpacity
                style={styles.audioButton}
                onPress={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? (
                  <Pause size={16} color="#6366F1" />
                ) : (
                  <Play size={16} color="#6366F1" />
                )}
              </TouchableOpacity>
              <TouchableOpacity style={styles.audioButton}>
                <RotateCcw size={16} color="#6366F1" />
              </TouchableOpacity>
            </View>
          </View>

          {currentStepData.content.map((line, i) =>
            isLatexFormula(line) ? (
              <KaTeXRenderer key={i} latex={line} style={styles.mathContent} />
            ) : (
              <Text key={i} style={styles.contentText}>
                {line}
              </Text>
            ),
          )}
        </View>

        <LessonProgress
          steps={lesson.steps.map((step, index) => ({
            ...step,
            isCurrent: index === currentStep,
          }))}
          onStepPress={handleStepPress}
        />
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.navButton, styles.secondaryButton]}
          onPress={handlePrevious}
          disabled={currentStep === 0}
        >
          <Text
            style={[
              styles.navButtonText,
              styles.secondaryButtonText,
              currentStep === 0 && styles.disabledText,
            ]}
          >
            Previous
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={handleNext}>
          <LinearGradient
            colors={['#6366F1', '#8B5CF6']}
            style={styles.primaryButton}
          >
            <Text style={styles.primaryButtonText}>
              {currentStep === lesson.steps.length - 1 ? 'Take Quiz' : 'Next'}
            </Text>
            {currentStep === lesson.steps.length - 1 ? (
              <CheckCircle size={16} color="#FFF" />
            ) : (
              <ChevronRight size={16} color="#FFF" />
            )}
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 8,
  },
  headerInfo: {
    flex: 1,
    marginHorizontal: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#111827',
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  menuButton: {
    padding: 8,
  },
  progressContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6366F1',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  content: {
    flex: 1,
  },
  contentCard: {
    backgroundColor: '#FFF',
    margin: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  contentTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#111827',
  },
  audioControls: {
    flexDirection: 'row',
  },
  audioButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#374151',
    lineHeight: 24,
    marginBottom: 12,
  },
  mathContent: {
    marginVertical: 8,
  },
  footer: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  navButton: {
    flex: 1,
  },
  secondaryButton: {
    backgroundColor: '#F3F4F6',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  navButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  secondaryButtonText: {
    color: '#111827',
  },
  disabledText: {
    color: '#9CA3AF',
  },
  primaryButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
});
