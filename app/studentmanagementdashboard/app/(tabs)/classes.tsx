import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, FlatList, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Users, BookOpen, Clock, Calendar, MapPin, MoveVertical as MoreVertical, TrendingUp, Award, CircleAlert as AlertCircle } from 'lucide-react-native';

const { width } = Dimensions.get('window');

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

const mockClasses = [
  {
    id: 1,
    name: 'Advanced Mathematics',
    teacher: 'Dr. Sarah Johnson',
    students: 28,
    maxStudents: 30,
    schedule: 'Mon, Wed, Fri - 9:00 AM',
    room: 'Room 201',
    semester: 'Fall 2023',
    progress: 75,
    avgGrade: 'B+',
    subjects: ['Calculus', 'Statistics', 'Geometry'],
    nextClass: '2023-12-15T09:00:00',
    status: 'active',
    color: '#4A90E2',
  },
  {
    id: 2,
    name: 'Biology Fundamentals',
    teacher: 'Prof. Michael Chen',
    students: 25,
    maxStudents: 28,
    schedule: 'Tue, Thu - 2:00 PM',
    room: 'Lab 103',
    semester: 'Fall 2023',
    progress: 60,
    avgGrade: 'A-',
    subjects: ['Cell Biology', 'Genetics', 'Ecology'],
    nextClass: '2023-12-14T14:00:00',
    status: 'active',
    color: '#10B981',
  },
  {
    id: 3,
    name: 'English Literature',
    teacher: 'Ms. Emma Williams',
    students: 22,
    maxStudents: 25,
    schedule: 'Mon, Wed, Fri - 11:00 AM',
    room: 'Room 305',
    semester: 'Fall 2023',
    progress: 85,
    avgGrade: 'A',
    subjects: ['Poetry', 'Drama', 'Novel Analysis'],
    nextClass: '2023-12-15T11:00:00',
    status: 'active',
    color: '#F59E0B',
  },
  {
    id: 4,
    name: 'Physics Laboratory',
    teacher: 'Dr. David Rodriguez',
    students: 18,
    maxStudents: 20,
    schedule: 'Tue, Thu - 10:00 AM',
    room: 'Lab 201',
    semester: 'Fall 2023',
    progress: 45,
    avgGrade: 'B',
    subjects: ['Mechanics', 'Thermodynamics', 'Optics'],
    nextClass: '2023-12-14T10:00:00',
    status: 'needs_attention',
    color: '#EF4444',
  },
  {
    id: 5,
    name: 'Computer Science',
    teacher: 'Prof. Lisa Anderson',
    students: 30,
    maxStudents: 30,
    schedule: 'Mon, Wed, Fri - 1:00 PM',
    room: 'Computer Lab',
    semester: 'Fall 2023',
    progress: 70,
    avgGrade: 'A-',
    subjects: ['Programming', 'Algorithms', 'Data Structures'],
    nextClass: '2023-12-15T13:00:00',
    status: 'active',
    color: '#8B5CF6',
  },
];

export default function Classes() {
  const [selectedView, setSelectedView] = useState('grid');

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return theme.colors.success;
      case 'needs_attention': return theme.colors.warning;
      case 'completed': return theme.colors.textSecondary;
      default: return theme.colors.primary;
    }
  };

  const getGradeColor = (grade) => {
    if (grade.includes('A')) return theme.colors.success;
    if (grade.includes('B')) return theme.colors.accent;
    return theme.colors.error;
  };

  const formatNextClass = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return `Tomorrow at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      return date.toLocaleDateString([], { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  const ClassCard = ({ classItem }) => (
    <TouchableOpacity style={styles.classCard}>
      <View style={styles.classHeader}>
        <View style={[styles.classColorBar, { backgroundColor: classItem.color }]} />
        <View style={styles.classHeaderContent}>
          <View style={styles.classTitle}>
            <Text style={styles.className}>{classItem.name}</Text>
            <TouchableOpacity style={styles.moreButton}>
              <MoreVertical size={16} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          </View>
          <Text style={styles.teacherName}>{classItem.teacher}</Text>
        </View>
      </View>

      <View style={styles.classStats}>
        <View style={styles.statRow}>
          <View style={styles.statItem}>
            <Users size={16} color={theme.colors.textSecondary} />
            <Text style={styles.statText}>{classItem.students}/{classItem.maxStudents}</Text>
          </View>
          <View style={styles.statItem}>
            <MapPin size={16} color={theme.colors.textSecondary} />
            <Text style={styles.statText}>{classItem.room}</Text>
          </View>
        </View>
        <View style={styles.statRow}>
          <View style={styles.statItem}>
            <Clock size={16} color={theme.colors.textSecondary} />
            <Text style={styles.statText}>{classItem.schedule}</Text>
          </View>
        </View>
      </View>

      <View style={styles.progressSection}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>Progress</Text>
          <Text style={styles.progressPercent}>{classItem.progress}%</Text>
        </View>
        <View style={styles.progressBar}>
          <View style={[
            styles.progressFill,
            { width: `${classItem.progress}%`, backgroundColor: classItem.color }
          ]} />
        </View>
      </View>

      <View style={styles.classFooter}>
        <View style={styles.gradeSection}>
          <Text style={styles.gradeLabel}>Avg Grade</Text>
          <View style={[styles.gradeChip, { backgroundColor: getGradeColor(classItem.avgGrade) + '15' }]}>
            <Text style={[styles.gradeText, { color: getGradeColor(classItem.avgGrade) }]}>
              {classItem.avgGrade}
            </Text>
          </View>
        </View>
        <View style={styles.nextClassSection}>
          <Text style={styles.nextClassLabel}>Next Class</Text>
          <Text style={styles.nextClassTime}>{formatNextClass(classItem.nextClass)}</Text>
        </View>
      </View>

      {classItem.status === 'needs_attention' && (
        <View style={styles.alertBanner}>
          <AlertCircle size={14} color={theme.colors.warning} />
          <Text style={styles.alertText}>Needs Attention</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Classes</Text>
          <Text style={styles.headerSubtitle}>{mockClasses.length} active classes</Text>
        </View>
        <TouchableOpacity style={styles.addButton}>
          <Plus size={20} color={theme.colors.surface} />
        </TouchableOpacity>
      </View>

      {/* Quick Stats */}
      <View style={styles.quickStats}>
        <View style={styles.quickStatItem}>
          <BookOpen size={20} color={theme.colors.primary} />
          <Text style={styles.quickStatNumber}>{mockClasses.length}</Text>
          <Text style={styles.quickStatLabel}>Classes</Text>
        </View>
        <View style={styles.quickStatItem}>
          <Users size={20} color={theme.colors.secondary} />
          <Text style={styles.quickStatNumber}>
            {mockClasses.reduce((sum, cls) => sum + cls.students, 0)}
          </Text>
          <Text style={styles.quickStatLabel}>Students</Text>
        </View>
        <View style={styles.quickStatItem}>
          <TrendingUp size={20} color={theme.colors.accent} />
          <Text style={styles.quickStatNumber}>
            {Math.round(mockClasses.reduce((sum, cls) => sum + cls.progress, 0) / mockClasses.length)}%
          </Text>
          <Text style={styles.quickStatLabel}>Avg Progress</Text>
        </View>
        <View style={styles.quickStatItem}>
          <Award size={20} color={theme.colors.success} />
          <Text style={styles.quickStatNumber}>
            {mockClasses.filter(cls => cls.avgGrade.includes('A')).length}
          </Text>
          <Text style={styles.quickStatLabel}>A-Grade</Text>
        </View>
      </View>

      {/* View Toggle */}
      <View style={styles.viewToggle}>
        <TouchableOpacity
          style={[styles.toggleButton, selectedView === 'grid' && styles.toggleButtonActive]}
          onPress={() => setSelectedView('grid')}
        >
          <Text style={[
            styles.toggleButtonText,
            selectedView === 'grid' && styles.toggleButtonTextActive
          ]}>
            Grid View
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, selectedView === 'list' && styles.toggleButtonActive]}
          onPress={() => setSelectedView('list')}
        >
          <Text style={[
            styles.toggleButtonText,
            selectedView === 'list' && styles.toggleButtonTextActive
          ]}>
            List View
          </Text>
        </TouchableOpacity>
      </View>

      {/* Classes Grid/List */}
      <FlatList
        data={mockClasses}
        renderItem={({ item }) => <ClassCard classItem={item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={selectedView === 'grid' ? 1 : 1}
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
  viewToggle: {
    flexDirection: 'row',
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.xs,
    ...theme.shadows.sm,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: theme.spacing.sm,
    alignItems: 'center',
    borderRadius: theme.borderRadius.sm,
  },
  toggleButtonActive: {
    backgroundColor: theme.colors.primary,
  },
  toggleButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.textSecondary,
  },
  toggleButtonTextActive: {
    color: theme.colors.surface,
  },
  listContainer: {
    paddingHorizontal: theme.spacing.lg,
  },
  classCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.md,
    overflow: 'hidden',
    ...theme.shadows.sm,
  },
  classHeader: {
    flexDirection: 'row',
  },
  classColorBar: {
    width: 4,
  },
  classHeaderContent: {
    flex: 1,
    padding: theme.spacing.md,
  },
  classTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  className: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
    flex: 1,
  },
  moreButton: {
    padding: theme.spacing.xs,
  },
  teacherName: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  classStats: {
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },
  statRow: {
    flexDirection: 'row',
    marginBottom: theme.spacing.xs,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: theme.spacing.lg,
  },
  statText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginLeft: theme.spacing.xs,
  },
  progressSection: {
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.md,
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
  classFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.md,
    paddingTop: theme.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  gradeSection: {
    alignItems: 'center',
  },
  gradeLabel: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  gradeChip: {
    borderRadius: theme.borderRadius.sm,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
  },
  gradeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  nextClassSection: {
    alignItems: 'flex-end',
  },
  nextClassLabel: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  nextClassTime: {
    fontSize: 12,
    fontWeight: '500',
    color: theme.colors.text,
  },
  alertBanner: {
    backgroundColor: theme.colors.warning + '15',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  alertText: {
    fontSize: 12,
    color: theme.colors.warning,
    fontWeight: '600',
    marginLeft: theme.spacing.xs,
  },
});