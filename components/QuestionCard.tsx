import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  CircleCheck as CheckCircle,
  Circle as XCircle,
} from 'lucide-react-native';

interface Option {
  id: string;
  text: string;
  isCorrect?: boolean;
}

interface QuestionCardProps {
  question: string;
  options: Option[];
  selectedOption?: string;
  showAnswer?: boolean;
  onSelectOption: (optionId: string) => void;
  questionNumber: number;
  totalQuestions: number;
}

export default function QuestionCard({
  question,
  options,
  selectedOption,
  showAnswer,
  onSelectOption,
  questionNumber,
  totalQuestions,
}: QuestionCardProps) {
  const getOptionStyle = (option: Option) => {
    if (!showAnswer) {
      return selectedOption === option.id
        ? styles.selectedOption
        : styles.option;
    }

    if (option.isCorrect) {
      return styles.correctOption;
    }

    if (selectedOption === option.id && !option.isCorrect) {
      return styles.incorrectOption;
    }

    return styles.option;
  };

  const getOptionIcon = (option: Option) => {
    if (!showAnswer) return null;

    if (option.isCorrect) {
      return <CheckCircle size={20} color="#10B981" />;
    }

    if (selectedOption === option.id && !option.isCorrect) {
      return <XCircle size={20} color="#EF4444" />;
    }

    return null;
  };

  return (
    <View style={styles.container}>
      {/* Progress Header */}
      <View style={styles.progressHeader}>
        <Text style={styles.questionCounter}>
          Question {questionNumber} of {totalQuestions}
        </Text>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${(questionNumber / totalQuestions) * 100}%` },
            ]}
          />
        </View>
      </View>

      {/* Question */}
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{question}</Text>
      </View>

      {/* Options */}
      <View style={styles.optionsContainer}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={option.id}
            style={getOptionStyle(option)}
            onPress={() => !showAnswer && onSelectOption(option.id)}
            disabled={showAnswer}
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
              {getOptionIcon(option)}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 24,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  progressHeader: {
    marginBottom: 24,
  },
  questionCounter: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginBottom: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6366F1',
    borderRadius: 2,
  },
  questionContainer: {
    marginBottom: 32,
  },
  questionText: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#111827',
    lineHeight: 28,
  },
  optionsContainer: {
    gap: 12,
  },
  option: {
    backgroundColor: '#F9FAFB',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    padding: 16,
  },
  selectedOption: {
    backgroundColor: '#EEF2FF',
    borderWidth: 2,
    borderColor: '#6366F1',
    borderRadius: 16,
    padding: 16,
  },
  correctOption: {
    backgroundColor: '#ECFDF5',
    borderWidth: 2,
    borderColor: '#10B981',
    borderRadius: 16,
    padding: 16,
  },
  incorrectOption: {
    backgroundColor: '#FEF2F2',
    borderWidth: 2,
    borderColor: '#EF4444',
    borderRadius: 16,
    padding: 16,
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
    backgroundColor: '#6366F1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  optionLetterText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FFF',
  },
  optionText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#111827',
    flex: 1,
    lineHeight: 22,
  },
});
