import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  Plus,
  Trash2,
  Move,
  Type,
  CircleCheck as CheckCircle,
} from 'lucide-react-native';
import { theme } from '@/constants/theme';
import { Question } from '@/constants/types';

interface QuestionEditorProps {
  question?: Question;
  onSave: (question: Question) => void;
  onCancel: () => void;
}

export function QuestionEditor({
  question,
  onSave,
  onCancel,
}: QuestionEditorProps) {
  const [questionData, setQuestionData] = useState<Partial<Question>>(
    question || {
      type: 'multiple-choice',
      content: '',
      options: ['', '', '', ''],
      correctAnswer: '',
      explanation: '',
      points: 1,
      difficulty: 'medium',
      tags: [],
    },
  );

  const questionTypes = [
    { value: 'multiple-choice', label: 'Multiple Choice', icon: CheckCircle },
    { value: 'true-false', label: 'True/False', icon: CheckCircle },
    { value: 'fill-blank', label: 'Fill in the Blank', icon: Type },
    { value: 'essay', label: 'Essay', icon: Type },
    { value: 'math-expression', label: 'Math Expression', icon: Type },
  ];

  const difficulties = ['easy', 'medium', 'hard'];

  const handleSave = () => {
    if (!questionData.content?.trim()) return;

    const newQuestion: Question = {
      id: question?.id || Date.now().toString(),
      type: questionData.type as Question['type'],
      content: questionData.content,
      options: questionData.options || [],
      correctAnswer: questionData.correctAnswer || '',
      explanation: questionData.explanation || '',
      points: questionData.points || 1,
      difficulty: questionData.difficulty as Question['difficulty'],
      tags: questionData.tags || [],
    };

    onSave(newQuestion);
  };

  const addOption = () => {
    const options = [...(questionData.options || []), ''];
    setQuestionData({ ...questionData, options });
  };

  const removeOption = (index: number) => {
    const options = questionData.options?.filter((_, i) => i !== index) || [];
    setQuestionData({ ...questionData, options });
  };

  const updateOption = (index: number, value: string) => {
    const options = [...(questionData.options || [])];
    options[index] = value;
    setQuestionData({ ...questionData, options });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {question ? 'Edit Question' : 'Create Question'}
        </Text>
      </View>

      {/* Question Type */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Question Type</Text>
        <View style={styles.typeGrid}>
          {questionTypes.map((type) => (
            <TouchableOpacity
              key={type.value}
              style={[
                styles.typeCard,
                questionData.type === type.value && styles.typeCardActive,
              ]}
              onPress={() =>
                setQuestionData({
                  ...questionData,
                  type: type.value as Question['type'],
                })
              }
            >
              <type.icon
                size={20}
                color={
                  questionData.type === type.value
                    ? theme.colors.primary
                    : theme.colors.text.secondary
                }
              />
              <Text
                style={[
                  styles.typeLabel,
                  questionData.type === type.value && styles.typeLabelActive,
                ]}
              >
                {type.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Question Content */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Question</Text>
        <TextInput
          style={styles.textArea}
          placeholder="Enter your question here..."
          value={questionData.content}
          onChangeText={(text) =>
            setQuestionData({ ...questionData, content: text })
          }
          multiline
          numberOfLines={4}
        />
      </View>

      {/* Options (for multiple choice) */}
      {(questionData.type === 'multiple-choice' ||
        questionData.type === 'true-false') && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Answer Options</Text>
            {questionData.type === 'multiple-choice' && (
              <TouchableOpacity style={styles.addButton} onPress={addOption}>
                <Plus size={16} color={theme.colors.primary} />
                <Text style={styles.addButtonText}>Add Option</Text>
              </TouchableOpacity>
            )}
          </View>

          {questionData.type === 'true-false' ? (
            <View style={styles.optionsContainer}>
              {['True', 'False'].map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionCard,
                    questionData.correctAnswer === option &&
                      styles.optionCardCorrect,
                  ]}
                  onPress={() =>
                    setQuestionData({ ...questionData, correctAnswer: option })
                  }
                >
                  <Text style={styles.optionText}>{option}</Text>
                  {questionData.correctAnswer === option && (
                    <CheckCircle size={20} color={theme.colors.secondary} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <View style={styles.optionsContainer}>
              {questionData.options?.map((option, index) => (
                <View key={index} style={styles.optionRow}>
                  <TextInput
                    style={[
                      styles.optionInput,
                      questionData.correctAnswer === option &&
                        styles.optionInputCorrect,
                    ]}
                    placeholder={`Option ${index + 1}`}
                    value={option}
                    onChangeText={(text) => updateOption(index, text)}
                  />
                  <TouchableOpacity
                    style={styles.correctButton}
                    onPress={() =>
                      setQuestionData({
                        ...questionData,
                        correctAnswer: option,
                      })
                    }
                  >
                    <CheckCircle
                      size={20}
                      color={
                        questionData.correctAnswer === option
                          ? theme.colors.secondary
                          : theme.colors.text.light
                      }
                    />
                  </TouchableOpacity>
                  {(questionData.options?.length || 0) > 2 && (
                    <TouchableOpacity
                      style={styles.removeButton}
                      onPress={() => removeOption(index)}
                    >
                      <Trash2 size={16} color={theme.colors.error} />
                    </TouchableOpacity>
                  )}
                </View>
              ))}
            </View>
          )}
        </View>
      )}

      {/* Correct Answer (for other types) */}
      {questionData.type !== 'multiple-choice' &&
        questionData.type !== 'true-false' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Correct Answer</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter the correct answer..."
              value={questionData.correctAnswer as string}
              onChangeText={(text) =>
                setQuestionData({ ...questionData, correctAnswer: text })
              }
              multiline={questionData.type === 'essay'}
              numberOfLines={questionData.type === 'essay' ? 3 : 1}
            />
          </View>
        )}

      {/* Explanation */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Explanation (Optional)</Text>
        <TextInput
          style={styles.textArea}
          placeholder="Provide an explanation for the answer..."
          value={questionData.explanation}
          onChangeText={(text) =>
            setQuestionData({ ...questionData, explanation: text })
          }
          multiline
          numberOfLines={3}
        />
      </View>

      {/* Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>

        <View style={styles.settingsRow}>
          <Text style={styles.settingLabel}>Points</Text>
          <View style={styles.pointsContainer}>
            {[1, 2, 3, 5].map((points) => (
              <TouchableOpacity
                key={points}
                style={[
                  styles.pointsButton,
                  questionData.points === points && styles.pointsButtonActive,
                ]}
                onPress={() => setQuestionData({ ...questionData, points })}
              >
                <Text
                  style={[
                    styles.pointsText,
                    questionData.points === points && styles.pointsTextActive,
                  ]}
                >
                  {points}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.settingsRow}>
          <Text style={styles.settingLabel}>Difficulty</Text>
          <View style={styles.difficultyContainer}>
            {difficulties.map((difficulty) => (
              <TouchableOpacity
                key={difficulty}
                style={[
                  styles.difficultyButton,
                  questionData.difficulty === difficulty &&
                    styles.difficultyButtonActive,
                ]}
                onPress={() =>
                  setQuestionData({
                    ...questionData,
                    difficulty: difficulty as Question['difficulty'],
                  })
                }
              >
                <Text
                  style={[
                    styles.difficultyText,
                    questionData.difficulty === difficulty &&
                      styles.difficultyTextActive,
                  ]}
                >
                  {difficulty}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Question</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    padding: theme.spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  title: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: 'bold',
    color: theme.colors.text.primary,
  },
  section: {
    padding: theme.spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderLight,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
  },
  typeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.surface,
    borderWidth: 2,
    borderColor: theme.colors.border,
    gap: theme.spacing.sm,
  },
  typeCardActive: {
    borderColor: theme.colors.primary,
    backgroundColor: `${theme.colors.primary}10`,
  },
  typeLabel: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
    fontWeight: '500',
  },
  typeLabelActive: {
    color: theme.colors.primary,
  },
  textArea: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text.primary,
    backgroundColor: theme.colors.surface,
    textAlignVertical: 'top',
    minHeight: 100,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text.primary,
    backgroundColor: theme.colors.surface,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  addButtonText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.primary,
    fontWeight: '600',
  },
  optionsContainer: {
    gap: theme.spacing.md,
  },
  optionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.surface,
    borderWidth: 2,
    borderColor: theme.colors.border,
  },
  optionCardCorrect: {
    borderColor: theme.colors.secondary,
    backgroundColor: `${theme.colors.secondary}10`,
  },
  optionText: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text.primary,
    fontWeight: '500',
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  optionInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text.primary,
    backgroundColor: theme.colors.surface,
  },
  optionInputCorrect: {
    borderColor: theme.colors.secondary,
    backgroundColor: `${theme.colors.secondary}10`,
  },
  correctButton: {
    padding: theme.spacing.sm,
  },
  removeButton: {
    padding: theme.spacing.sm,
  },
  settingsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  settingLabel: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  pointsContainer: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  pointsButton: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.surface,
    borderWidth: 2,
    borderColor: theme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pointsButtonActive: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primary,
  },
  pointsText: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
  },
  pointsTextActive: {
    color: theme.colors.text.inverse,
  },
  difficultyContainer: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  difficultyButton: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.surface,
    borderWidth: 2,
    borderColor: theme.colors.border,
  },
  difficultyButtonActive: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primary,
  },
  difficultyText: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '600',
    color: theme.colors.text.primary,
    textTransform: 'capitalize',
  },
  difficultyTextActive: {
    color: theme.colors.text.inverse,
  },
  actions: {
    flexDirection: 'row',
    padding: theme.spacing.xl,
    gap: theme.spacing.lg,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.surface,
    borderWidth: 2,
    borderColor: theme.colors.border,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  saveButton: {
    flex: 1,
    paddingVertical: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600',
    color: theme.colors.text.inverse,
  },
});
