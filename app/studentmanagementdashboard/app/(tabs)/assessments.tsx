import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, FileText, Clock, Users, CircleCheck as CheckCircle, CircleAlert as AlertCircle, ChartBar as BarChart3, Calendar, Filter, Star, TrendingUp } from 'lucide-react-native';

const theme = {
  colors: {
    primary: '#4A90E2',
    secondary: '#10B981',
    accent: '#F59E0B',
    background: '#F8FAFC',
    surface: '#FFFFFF',
    text: '#1E293B',
    textSecondary: '#64748B',
    border: '#E2E8F0',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
  },
  shadows: {
    sm: {
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
    },
    md: {
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
  },
};

const mockAssessments = [
  {
    id: 1,
    title: 'Midterm Mathematics Exam',
    type: 'exam',
    class: 'Advanced Mathematics',
    dueDate: '2023-12-20T14:00:00',
    duration: 120,
    totalPoints: 100,
    submissions: 28,
    totalStudents: 30,
    avgScore: 85.5,
    status: 'active',
    questions: 25,
    graded: 15,
    pending: 13,
  },
  {
    id: 2,
    title: 'Biology Lab Report',
    type: 'assignment',
    class: 'Biology Fundamentals',
    dueDate: '2023-12-18T23:59:00',
    duration: null,
    totalPoints: 50,
    submissions: 22,
    totalStudents: 25,
    avgScore: 42.3,
    status: 'active',
    questions: null,
    graded: 20,
    pending: 2,
  },
  {
    id: 3,
    title: 'Literature Essay Analysis',
    type: 'essay',
    class: 'English Literature',
    dueDate: '2023-12-15T23:59:00',
    duration: null,
    totalPoints: 75,
    submissions: 20,
    totalStudents: 22,
    avgScore: 68.2,
    status: 'completed',
    questions: null,
    graded: 20,
    pending: 0,
  },
  {
    id: 4,
    title: 'Physics Quiz - Chapter 5',
    type: 'quiz',
    class: 'Physics Laboratory',
    dueDate: '2023-12-16T15:30:00',
    duration: 45,
    totalPoints: 30,
    submissions: 16,
    totalStudents: 18,
    avgScore: 24.8,
    status: 'active',
    questions: 15,
    graded: 10,
    pending: 6,
  },
  {
    id: 5,
    title: 'Programming Project',
    type: 'project',
    class: 'Computer Science',
    dueDate: '2023-12-25T23:59:00',
    duration: null,
    totalPoints: 200,
    submissions: 28,
    totalStudents: 30,
    avgScore: 165.4,
    status: 'active',
    questions: null,
    graded: 25,
    pending: 3,
  },
];

const assessmentTypes = [
  { id: 'all', name: 'All', icon: FileText },
  { id: 'exam', name: 'Exams', icon: FileText },
  { id: 'quiz', name: 'Quizzes', icon: CheckCircle },
  { id: 'assignment', name: 'Assignments', icon: FileText },
  { id: 'project', name: 'Projects', icon: Star },
];

export default function Assessments() {
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return theme.colors.primary;
      case 'completed': return theme.colors.success;
      case 'overdue': return theme.colors.error;
      default: return theme.colors.textSecondary;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'exam': return theme.colors.error;
      case 'quiz': return theme.colors.primary;
      case 'assignment': return theme.colors.secondary;
      case 'project': return theme.colors.accent;
      case 'essay': return theme.colors.secondary;
      default: return theme.colors.textSecondary;
    }
  };

  const formatDueDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Due Today';
    if (diffDays === 1) return 'Due Tomorrow';
    if (diffDays > 0) return `Due in ${diffDays} days`;
    return `Overdue by ${Math.abs(diffDays)} days`;
  };

  const filteredAssessments = mockAssessments.filter(assessment => {
    const typeMatch = selectedType === 'all' || assessment.type === selectedType;
    const statusMatch = selectedStatus === 'all' || assessment.status === selectedStatus;
    return typeMatch && statusMatch;
  });

  const AssessmentCard = ({ assessment }) => (
    <TouchableOpacity style={styles.assessmentCard}>
      <View style={styles.assessmentHeader}>
        <View style={styles.assessmentTitleRow}>
          <View style={[styles.typeChip, { backgroundColor: getTypeColor(assessment.type) + '15' }]}>
            <Text style={[styles.typeText, { color: getTypeColor(assessment.type) }]}>
              {assessment.type.toUpperCase()}
            </Text>
          </View>
          <View style={[styles.statusDot, { backgroundColor: getStatusColor(assessment.status) }]} />
        </View>
        <Text style={styles.assessmentTitle}>{assessment.title}</Text>
        <Text style={styles.assessmentClass}>{assessment.class}</Text>
      </View>

      <View style={styles.assessmentMeta}>
        <View style={styles.metaRow}>
          <Calendar size={14} color={theme.colors.textSecondary} />
          <Text style={styles.metaText}>{formatDueDate(assessment.dueDate)}</Text>
        </View>
        {assessment.duration && (
          <View style={styles.metaRow}>
            <Clock size={14} color={theme.colors.textSecondary} />
            <Text style={styles.metaText}>{assessment.duration} minutes</Text>
          </View>
        )}
        <View style={styles.metaRow}>
          <Users size={14} color={theme.colors.textSecondary} />
          <Text style={styles.metaText}>
            {assessment.submissions}/{assessment.totalStudents} submitted
          </Text>
        </View>
      </View>

      <View style={styles.progressSection}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>Submission Progress</Text>
          <Text style={styles.progressPercent}>
            {Math.round((assessment.submissions / assessment.totalStudents) * 100)}%
          </Text>
        </View>
        <View style={styles.progressBar}>
          <View style={[
            styles.progressFill,
            { 
              width: `${(assessment.submissions / assessment.totalStudents) * 100}%`,
              backgroundColor: theme.colors.primary
            }
          ]} />
        </View>
      </View>

      <View style={styles.assessmentStats}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Avg Score</Text>
          <Text style={styles.statValue}>
            {Math.round((assessment.avgScore / assessment.totalPoints) * 100)}%
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Graded</Text>
          <Text style={styles.statValue}>{assessment.graded}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Pending</Text>
          <Text style={[styles.statValue, { color: assessment.pending > 0 ? theme.colors.warning : theme.colors.success }]}>
            {assessment.pending}
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Points</Text>
          <Text style={styles.statValue}>{assessment.totalPoints}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Assessments</Text>
          <Text style={styles.headerSubtitle}>{filteredAssessments.length} assessments</Text>
        </View>
        <TouchableOpacity style={styles.addButton}>
          <Plus size={20} color={theme.colors.surface} />
        </TouchableOpacity>
      </View>

      {/* Quick Stats */}
      <View style={styles.quickStats}>
        <View style={styles.quickStatItem}>
          <FileText size={20} color={theme.colors.primary} />
          <Text style={styles.quickStatNumber}>{mockAssessments.length}</Text>
          <Text style={styles.quickStatLabel}>Total</Text>
        </View>
        <View style={styles.quickStatItem}>
          <Clock size={20} color={theme.colors.warning} />
          <Text style={styles.quickStatNumber}>
            {mockAssessments.filter(a => a.status === 'active').length}
          </Text>
          <Text style={styles.quickStatLabel}>Active</Text>
        </View>
        <View style={styles.quickStatItem}>
          <CheckCircle size={20} color={theme.colors.success} />
          <Text style={styles.quickStatNumber}>
            {mockAssessments.filter(a => a.status === 'completed').length}
          </Text>
          <Text style={styles.quickStatLabel}>Completed</Text>
        </View>
        <View style={styles.quickStatItem}>
          <TrendingUp size={20} color={theme.colors.secondary} />
          <Text style={styles.quickStatNumber}>
            {Math.round(mockAssessments.reduce((sum, a) => sum + (a.avgScore / a.totalPoints * 100), 0) / mockAssessments.length)}%
          </Text>
          <Text style={styles.quickStatLabel}>Avg Score</Text>
        </View>
      </View>

      {/* Type Filter */}
      <View style={styles.typeFilter}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {assessmentTypes.map((type) => (
            <TouchableOpacity
              key={type.id}
              style={[
                styles.typeButton,
                selectedType === type.id && styles.typeButtonActive
              ]}
              onPress={() => setSelectedType(type.id)}
            >
              <type.icon 
                size={16} 
                color={selectedType === type.id ? theme.colors.surface : theme.colors.textSecondary} 
              />
              <Text style={[
                styles.typeButtonText,
                selectedType === type.id && styles.typeButtonTextActive
              ]}>
                {type.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Status Filter */}
      <View style={styles.statusFilter}>
        {['all', 'active', 'completed'].map((status) => (
          <TouchableOpacity
            key={status}
            style={[
              styles.statusButton,
              selectedStatus === status && styles.statusButtonActive
            ]}
            onPress={() => setSelectedStatus(status)}
          >
            <Text style={[
              styles.statusButtonText,
              selectedStatus === status && styles.statusButtonTextActive
            ]}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Assessments List */}
      <FlatList
        data={filteredAssessments}
        renderItem={({ item }) => <AssessmentCard assessment={item} />}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.lg,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  headerSubtitle: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  addButton: {
    backgroundColor: theme.colors.primary,
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.md,
  },
  quickStats: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  quickStatItem: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    alignItems: 'center',
    marginRight: theme.spacing.sm,
    ...theme.shadows.sm,
  },
  quickStatNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginTop: theme.spacing.sm,
  },
  quickStatLabel: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  typeFilter: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  typeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    marginRight: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  typeButtonActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  typeButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.textSecondary,
    marginLeft: theme.spacing.xs,
  },
  typeButtonTextActive: {
    color: theme.colors.surface,
  },
  statusFilter: {
    flexDirection: 'row',
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.xs,
    ...theme.shadows.sm,
  },
  statusButton: {
    flex: 1,
    paddingVertical: theme.spacing.sm,
    alignItems: 'center',
    borderRadius: theme.borderRadius.sm,
  },
  statusButtonActive: {
    backgroundColor: theme.colors.primary,
  },
  statusButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.textSecondary,
  },
  statusButtonTextActive: {
    color: theme.colors.surface,
  },
  listContainer: {
    paddingHorizontal: theme.spacing.lg,
  },
  assessmentCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    ...theme.shadows.sm,
  },
  assessmentHeader: {
    marginBottom: theme.spacing.md,
  },
  assessmentTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  typeChip: {
    borderRadius: theme.borderRadius.sm,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
  },
  typeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  assessmentTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  assessmentClass: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  assessmentMeta: {
    marginBottom: theme.spacing.md,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  metaText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginLeft: theme.spacing.sm,
  },
  progressSection: {
    marginBottom: theme.spacing.md,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  progressLabel: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  progressPercent: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text,
  },
  progressBar: {
    height: 6,
    backgroundColor: theme.colors.border,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  assessmentStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text,
  },
});