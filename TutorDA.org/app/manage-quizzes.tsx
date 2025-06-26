import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import {
  ArrowLeft,
  Plus,
  Search,
  Filter,
  MoveVertical as MoreVertical,
  CreditCard as Edit,
  Trash2,
  Copy,
  Eye,
  Users,
  Clock,
  FileText,
  ChartBar as BarChart3,
} from 'lucide-react-native';
import { theme } from '@/constants/theme';
import { QuizCard } from '@/components/QuizCard';
import { Quiz } from '@/constants/types';

export default function ManageQuizzes() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [showActionModal, setShowActionModal] = useState(false);

  const filters = [
    { id: 'all', label: 'All Quizzes', count: 12 },
    { id: 'published', label: 'Published', count: 8 },
    { id: 'draft', label: 'Drafts', count: 3 },
    { id: 'archived', label: 'Archived', count: 1 },
  ];

  const quizzes: Quiz[] = [
    {
      id: '1',
      title: 'Linear Equations Fundamentals',
      description:
        'Test understanding of basic linear equation solving techniques',
      courseId: 'algebra-101',
      questionCount: 15,
      duration: 20,
      difficulty: 'easy',
      status: 'published',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-20',
      attempts: 45,
      avgScore: 87,
    },
    {
      id: '2',
      title: 'Quadratic Functions Deep Dive',
      description:
        'Advanced problems on quadratic functions and their applications',
      courseId: 'algebra-102',
      questionCount: 25,
      duration: 35,
      difficulty: 'hard',
      status: 'published',
      createdAt: '2024-01-10',
      updatedAt: '2024-01-18',
      attempts: 32,
      avgScore: 73,
    },
    {
      id: '3',
      title: 'Geometry Basics Assessment',
      description: 'Comprehensive test covering basic geometric principles',
      courseId: 'geometry-101',
      questionCount: 20,
      duration: 25,
      difficulty: 'medium',
      status: 'draft',
      createdAt: '2024-01-22',
      updatedAt: '2024-01-22',
    },
    {
      id: '4',
      title: 'Calculus Limits Introduction',
      description: 'Introduction to limits and continuity concepts',
      courseId: 'calculus-101',
      questionCount: 18,
      duration: 30,
      difficulty: 'medium',
      status: 'published',
      createdAt: '2024-01-08',
      updatedAt: '2024-01-15',
      attempts: 28,
      avgScore: 79,
    },
    {
      id: '5',
      title: 'Statistics Fundamentals',
      description: 'Basic statistical concepts and data analysis',
      courseId: 'stats-101',
      questionCount: 22,
      duration: 40,
      difficulty: 'easy',
      status: 'draft',
      createdAt: '2024-01-25',
      updatedAt: '2024-01-25',
    },
  ];

  const filteredQuizzes = quizzes.filter((quiz) => {
    const matchesSearch =
      quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quiz.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      selectedFilter === 'all' || quiz.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const handleQuizAction = (action: string, quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setShowActionModal(false);

    switch (action) {
      case 'edit':
        router.push(`/create-quiz?id=${quiz.id}`);
        break;
      case 'view':
        // Navigate to quiz preview
        break;
      case 'duplicate':
        // Duplicate quiz logic
        break;
      case 'delete':
        // Delete quiz logic
        break;
      default:
        break;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return theme.colors.secondary;
      case 'draft':
        return theme.colors.accent;
      case 'archived':
        return theme.colors.text.light;
      default:
        return theme.colors.text.secondary;
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
        <Text style={styles.headerTitle}>Manage Quizzes</Text>
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => router.push('/create-quiz')}
        >
          <Plus size={24} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Search and Filter */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color={theme.colors.text.light} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search quizzes..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={theme.colors.text.light}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterTabs}
        contentContainerStyle={styles.filterTabsContent}
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            style={[
              styles.filterTab,
              selectedFilter === filter.id && styles.filterTabActive,
            ]}
            onPress={() => setSelectedFilter(filter.id)}
          >
            <Text
              style={[
                styles.filterTabText,
                selectedFilter === filter.id && styles.filterTabTextActive,
              ]}
            >
              {filter.label}
            </Text>
            <View
              style={[
                styles.filterTabBadge,
                selectedFilter === filter.id && styles.filterTabBadgeActive,
              ]}
            >
              <Text
                style={[
                  styles.filterTabBadgeText,
                  selectedFilter === filter.id &&
                    styles.filterTabBadgeTextActive,
                ]}
              >
                {filter.count}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Quiz List */}
      <ScrollView style={styles.quizList} showsVerticalScrollIndicator={false}>
        {filteredQuizzes.length > 0 ? (
          filteredQuizzes.map((quiz) => (
            <View key={quiz.id} style={styles.quizCardContainer}>
              <QuizCard
                quiz={quiz}
                onPress={() => handleQuizAction('view', quiz)}
                onEdit={() => handleQuizAction('edit', quiz)}
              />
              <TouchableOpacity
                style={styles.moreButton}
                onPress={() => {
                  setSelectedQuiz(quiz);
                  setShowActionModal(true);
                }}
              >
                <MoreVertical size={20} color={theme.colors.text.secondary} />
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <FileText size={48} color={theme.colors.text.light} />
            <Text style={styles.emptyStateTitle}>No quizzes found</Text>
            <Text style={styles.emptyStateText}>
              {searchQuery
                ? 'Try adjusting your search terms'
                : 'Create your first quiz to get started'}
            </Text>
            {!searchQuery && (
              <TouchableOpacity
                style={styles.createQuizButton}
                onPress={() => router.push('/create-quiz')}
              >
                <Plus size={20} color={theme.colors.text.inverse} />
                <Text style={styles.createQuizButtonText}>Create Quiz</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </ScrollView>

      {/* Action Modal */}
      <Modal
        visible={showActionModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowActionModal(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowActionModal(false)}
        >
          <View style={styles.actionModal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Quiz Actions</Text>
              <Text style={styles.modalSubtitle}>{selectedQuiz?.title}</Text>
            </View>

            <View style={styles.actionList}>
              <TouchableOpacity
                style={styles.actionItem}
                onPress={() => handleQuizAction('view', selectedQuiz!)}
              >
                <Eye size={20} color={theme.colors.text.secondary} />
                <Text style={styles.actionText}>View Quiz</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionItem}
                onPress={() => handleQuizAction('edit', selectedQuiz!)}
              >
                <Edit size={20} color={theme.colors.text.secondary} />
                <Text style={styles.actionText}>Edit Quiz</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionItem}
                onPress={() => handleQuizAction('duplicate', selectedQuiz!)}
              >
                <Copy size={20} color={theme.colors.text.secondary} />
                <Text style={styles.actionText}>Duplicate</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionItem, styles.destructiveAction]}
                onPress={() => handleQuizAction('delete', selectedQuiz!)}
              >
                <Trash2 size={20} color={theme.colors.error} />
                <Text style={[styles.actionText, styles.destructiveText]}>
                  Delete Quiz
                </Text>
              </TouchableOpacity>
            </View>
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
  },
  backButton: {
    padding: theme.spacing.sm,
  },
  headerTitle: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
  },
  createButton: {
    padding: theme.spacing.sm,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.xl,
    marginBottom: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    gap: theme.spacing.md,
  },
  searchInput: {
    flex: 1,
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text.primary,
  },
  filterButton: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterTabs: {
    marginBottom: theme.spacing.lg,
  },
  filterTabsContent: {
    paddingHorizontal: theme.spacing.xl,
  },
  filterTab: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.full,
    marginRight: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  filterTabActive: {
    backgroundColor: theme.colors.primary,
  },
  filterTabText: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '600',
    color: theme.colors.text.secondary,
  },
  filterTabTextActive: {
    color: theme.colors.text.inverse,
  },
  filterTabBadge: {
    backgroundColor: theme.colors.borderLight,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.full,
    minWidth: 20,
    alignItems: 'center',
  },
  filterTabBadgeActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  filterTabBadgeText: {
    fontSize: theme.typography.fontSize.xs,
    fontWeight: 'bold',
    color: theme.colors.text.secondary,
  },
  filterTabBadgeTextActive: {
    color: theme.colors.text.inverse,
  },
  quizList: {
    flex: 1,
    paddingHorizontal: theme.spacing.xl,
  },
  quizCardContainer: {
    position: 'relative',
  },
  moreButton: {
    position: 'absolute',
    top: theme.spacing.lg,
    right: theme.spacing.lg,
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.md,
    ...theme.shadows.sm,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.xxxl * 2,
  },
  emptyStateTitle: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.sm,
  },
  emptyStateText: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  createQuizButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    gap: theme.spacing.sm,
  },
  createQuizButtonText: {
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
  actionModal: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.xl,
    width: '100%',
    maxWidth: 400,
    ...theme.shadows.lg,
  },
  modalHeader: {
    padding: theme.spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  modalTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
  },
  modalSubtitle: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
    marginTop: theme.spacing.xs,
  },
  actionList: {
    padding: theme.spacing.lg,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    gap: theme.spacing.lg,
  },
  destructiveAction: {
    backgroundColor: `${theme.colors.error}10`,
  },
  actionText: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text.primary,
    fontWeight: '500',
  },
  destructiveText: {
    color: theme.colors.error,
  },
});
