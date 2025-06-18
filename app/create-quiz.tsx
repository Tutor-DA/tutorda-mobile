import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import {
  ArrowLeft,
  Save,
  Plus,
  Settings,
  Eye,
  Trash2,
  Move,
  Clock,
  Users,
  BookOpen,
} from 'lucide-react-native';
import { theme } from '@/constants/theme';
import { QuestionEditor } from '@/components/QuestionEditor';
import { VoiceInput } from '@/components/VoiceInput';
import { Question, Quiz } from '@/constants/types';

export default function CreateQuiz() {
  const [quiz, setQuiz] = useState<Partial<Quiz>>({
    title: '',
    description: '',
    courseId: '',
    duration: 30,
    difficulty: 'medium',
    status: 'draft',
  });

  const [questions, setQuestions] = useState<Question[]>([]);
  const [showQuestionEditor, setShowQuestionEditor] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<
    Question | undefined
  >();
  const [showSettings, setShowSettings] = useState(false);

  const courses = [
    { id: 'algebra-101', name: 'Algebra Basics' },
    { id: 'geometry-101', name: 'Geometry Fundamentals' },
    { id: 'calculus-101', name: 'Calculus I' },
    { id: 'stats-101', name: 'Statistics' },
  ];

  const difficulties = ['easy', 'medium', 'hard'];

  const handleSaveQuestion = (question: Question) => {
    if (editingQuestion) {
      setQuestions(questions.map((q) => (q.id === question.id ? question : q)));
    } else {
      setQuestions([...questions, question]);
    }
    setShowQuestionEditor(false);
    setEditingQuestion(undefined);
  };

  const handleEditQuestion = (question: Question) => {
    setEditingQuestion(question);
    setShowQuestionEditor(true);
  };

  const handleDeleteQuestion = (questionId: string) => {
    Alert.alert(
      'Delete Question',
      'Are you sure you want to delete this question?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () =>
            setQuestions(questions.filter((q) => q.id !== questionId)),
        },
      ],
    );
  };

  const handleSaveQuiz = () => {
    if (!quiz.title?.trim()) {
      Alert.alert('Error', 'Please enter a quiz title');
      return;
    }

    if (!quiz.courseId) {
      Alert.alert('Error', 'Please select a course');
      return;
    }

    if (questions.length === 0) {
      Alert.alert('Error', 'Please add at least one question');
      return;
    }

    // Save quiz logic here
    Alert.alert('Success', 'Quiz saved successfully!', [
      { text: 'OK', onPress: () => router.back() },
    ]);
  };

  const handlePublishQuiz = () => {
    if (questions.length < 5) {
      Alert.alert('Error', 'Quiz must have at least 5 questions to publish');
      return;
    }

    setQuiz({ ...quiz, status: 'published' });
    handleSaveQuiz();
  };

  const getTotalPoints = () => {
    return questions.reduce((total, question) => total + question.points, 0);
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
        <Text style={styles.headerTitle}>Create Quiz</Text>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => setShowSettings(true)}
        >
          <Settings size={24} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Quiz Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quiz Information</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Title</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter quiz title..."
              value={quiz.title}
              onChangeText={(text) => setQuiz({ ...quiz, title: text })}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Description</Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              placeholder="Enter quiz description..."
              value={quiz.description}
              onChangeText={(text) => setQuiz({ ...quiz, description: text })}
              multiline
              numberOfLines={3}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Course</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.courseOptions}>
                {courses.map((course) => (
                  <TouchableOpacity
                    key={course.id}
                    style={[
                      styles.courseOption,
                      quiz.courseId === course.id && styles.courseOptionActive,
                    ]}
                    onPress={() => setQuiz({ ...quiz, courseId: course.id })}
                  >
                    <Text
                      style={[
                        styles.courseOptionText,
                        quiz.courseId === course.id &&
                          styles.courseOptionTextActive,
                      ]}
                    >
                      {course.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Voice Input for Description */}
          <VoiceInput
            placeholder="Tap to record quiz description"
            onTranscript={(text) => setQuiz({ ...quiz, description: text })}
          />
        </View>

        {/* Quiz Stats */}
        <View style={styles.statsSection}>
          <View style={styles.statCard}>
            <BookOpen size={20} color={theme.colors.primary} />
            <Text style={styles.statValue}>{questions.length}</Text>
            <Text style={styles.statLabel}>Questions</Text>
          </View>
          <View style={styles.statCard}>
            <Clock size={20} color={theme.colors.secondary} />
            <Text style={styles.statValue}>{quiz.duration}</Text>
            <Text style={styles.statLabel}>Minutes</Text>
          </View>
          <View style={styles.statCard}>
            <Users size={20} color={theme.colors.accent} />
            <Text style={styles.statValue}>{getTotalPoints()}</Text>
            <Text style={styles.statLabel}>Points</Text>
          </View>
        </View>

        {/* Questions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Questions</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setShowQuestionEditor(true)}
            >
              <Plus size={20} color={theme.colors.text.inverse} />
              <Text style={styles.addButtonText}>Add Question</Text>
            </TouchableOpacity>
          </View>

          {questions.length > 0 ? (
            questions.map((question, index) => (
              <View key={question.id} style={styles.questionCard}>
                <View style={styles.questionHeader}>
                  <View style={styles.questionNumber}>
                    <Text style={styles.questionNumberText}>{index + 1}</Text>
                  </View>
                  <View style={styles.questionInfo}>
                    <Text style={styles.questionTitle} numberOfLines={2}>
                      {question.content}
                    </Text>
                    <View style={styles.questionMeta}>
                      <Text style={styles.questionType}>
                        {question.type.replace('-', ' ')}
                      </Text>
                      <Text style={styles.questionPoints}>
                        {question.points} pts
                      </Text>
                      <Text
                        style={[
                          styles.questionDifficulty,
                          {
                            color:
                              question.difficulty === 'easy'
                                ? theme.colors.secondary
                                : question.difficulty === 'medium'
                                  ? theme.colors.accent
                                  : theme.colors.error,
                          },
                        ]}
                      >
                        {question.difficulty}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.questionActions}>
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() => handleEditQuestion(question)}
                    >
                      <Eye size={16} color={theme.colors.text.secondary} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() => handleDeleteQuestion(question.id)}
                    >
                      <Trash2 size={16} color={theme.colors.error} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.emptyQuestions}>
              <BookOpen size={48} color={theme.colors.text.light} />
              <Text style={styles.emptyQuestionsTitle}>No questions yet</Text>
              <Text style={styles.emptyQuestionsText}>
                Add your first question to get started
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveQuiz}>
          <Save size={20} color={theme.colors.text.inverse} />
          <Text style={styles.saveButtonText}>Save Draft</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.publishButton}
          onPress={handlePublishQuiz}
        >
          <Text style={styles.publishButtonText}>Publish Quiz</Text>
        </TouchableOpacity>
      </View>

      {/* Question Editor Modal */}
      <Modal
        visible={showQuestionEditor}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <QuestionEditor
          question={editingQuestion}
          onSave={handleSaveQuestion}
          onCancel={() => {
            setShowQuestionEditor(false);
            setEditingQuestion(undefined);
          }}
        />
      </Modal>

      {/* Settings Modal */}
      <Modal
        visible={showSettings}
        transparent
        animationType="fade"
        onRequestClose={() => setShowSettings(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowSettings(false)}
        >
          <View style={styles.settingsModal}>
            <Text style={styles.modalTitle}>Quiz Settings</Text>

            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>Duration (minutes)</Text>
              <View style={styles.durationOptions}>
                {[15, 30, 45, 60].map((duration) => (
                  <TouchableOpacity
                    key={duration}
                    style={[
                      styles.durationOption,
                      quiz.duration === duration && styles.durationOptionActive,
                    ]}
                    onPress={() => setQuiz({ ...quiz, duration })}
                  >
                    <Text
                      style={[
                        styles.durationOptionText,
                        quiz.duration === duration &&
                          styles.durationOptionTextActive,
                      ]}
                    >
                      {duration}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>Difficulty</Text>
              <View style={styles.difficultyOptions}>
                {difficulties.map((difficulty) => (
                  <TouchableOpacity
                    key={difficulty}
                    style={[
                      styles.difficultyOption,
                      quiz.difficulty === difficulty &&
                        styles.difficultyOptionActive,
                    ]}
                    onPress={() =>
                      setQuiz({
                        ...quiz,
                        difficulty: difficulty as Quiz['difficulty'],
                      })
                    }
                  >
                    <Text
                      style={[
                        styles.difficultyOptionText,
                        quiz.difficulty === difficulty &&
                          styles.difficultyOptionTextActive,
                      ]}
                    >
                      {difficulty}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <TouchableOpacity
              style={styles.closeSettingsButton}
              onPress={() => setShowSettings(false)}
            >
              <Text style={styles.closeSettingsButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
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
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  backButton: {
    padding: theme.spacing.sm,
  },
  headerTitle: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
  },
  settingsButton: {
    padding: theme.spacing.sm,
  },
  content: {
    flex: 1,
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
  inputGroup: {
    marginBottom: theme.spacing.lg,
  },
  inputLabel: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  textInput: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text.primary,
    backgroundColor: theme.colors.surface,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  courseOptions: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  courseOption: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.surface,
    borderWidth: 2,
    borderColor: theme.colors.border,
  },
  courseOptionActive: {
    borderColor: theme.colors.primary,
    backgroundColor: `${theme.colors.primary}10`,
  },
  courseOptionText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
    fontWeight: '500',
  },
  courseOptionTextActive: {
    color: theme.colors.primary,
  },
  statsSection: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  statCard: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
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
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    gap: theme.spacing.sm,
  },
  addButtonText: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '600',
    color: theme.colors.text.inverse,
  },
  questionCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    ...theme.shadows.sm,
  },
  questionHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  questionNumber: {
    width: 32,
    height: 32,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  questionNumberText: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: 'bold',
    color: theme.colors.text.inverse,
  },
  questionInfo: {
    flex: 1,
    marginRight: theme.spacing.md,
  },
  questionTitle: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  questionMeta: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  questionType: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
    textTransform: 'capitalize',
  },
  questionPoints: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.primary,
    fontWeight: '600',
  },
  questionDifficulty: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  questionActions: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  actionButton: {
    padding: theme.spacing.sm,
  },
  emptyQuestions: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xxxl,
  },
  emptyQuestionsTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.sm,
  },
  emptyQuestionsText: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
  bottomActions: {
    flexDirection: 'row',
    padding: theme.spacing.xl,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    gap: theme.spacing.md,
  },
  saveButton: {
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
  saveButtonText: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  publishButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
  },
  publishButtonText: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600',
    color: theme.colors.text.inverse,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  settingsModal: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.xl,
    width: '100%',
    maxWidth: 400,
    ...theme.shadows.lg,
  },
  modalTitle: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xl,
    textAlign: 'center',
  },
  settingItem: {
    marginBottom: theme.spacing.xl,
  },
  settingLabel: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },
  durationOptions: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  durationOption: {
    flex: 1,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.surface,
    borderWidth: 2,
    borderColor: theme.colors.border,
    alignItems: 'center',
  },
  durationOptionActive: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primary,
  },
  durationOptionText: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  durationOptionTextActive: {
    color: theme.colors.text.inverse,
  },
  difficultyOptions: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  difficultyOption: {
    flex: 1,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.surface,
    borderWidth: 2,
    borderColor: theme.colors.border,
    alignItems: 'center',
  },
  difficultyOptionActive: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primary,
  },
  difficultyOptionText: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600',
    color: theme.colors.text.primary,
    textTransform: 'capitalize',
  },
  difficultyOptionTextActive: {
    color: theme.colors.text.inverse,
  },
  closeSettingsButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
    marginTop: theme.spacing.lg,
  },
  closeSettingsButtonText: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600',
    color: theme.colors.text.inverse,
  },
});
