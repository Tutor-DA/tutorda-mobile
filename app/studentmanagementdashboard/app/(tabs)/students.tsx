import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Filter, Plus, User, Mail, Phone, Calendar, MoveVertical as MoreVertical, Star, BookOpen } from 'lucide-react-native';

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

const mockStudents = [
  {
    id: 1,
    name: 'Emma Johnson',
    email: 'emma.johnson@school.edu',
    phone: '+1 (555) 123-4567',
    class: 'Grade 10A',
    grade: 'A',
    attendance: 95,
    enrollmentDate: '2023-08-15',
    avatar: null,
    status: 'active',
    subjects: ['Math', 'Science', 'English', 'History'],
  },
  {
    id: 2,
    name: 'Michael Chen',
    email: 'michael.chen@school.edu',
    phone: '+1 (555) 234-5678',
    class: 'Grade 10B',
    grade: 'B+',
    attendance: 88,
    enrollmentDate: '2023-08-20',
    avatar: null,
    status: 'active',
    subjects: ['Math', 'Science', 'Art', 'PE'],
  },
  {
    id: 3,
    name: 'Sarah Williams',
    email: 'sarah.williams@school.edu',
    phone: '+1 (555) 345-6789',
    class: 'Grade 9A',
    grade: 'A-',
    attendance: 92,
    enrollmentDate: '2023-09-01',
    avatar: null,
    status: 'active',
    subjects: ['English', 'History', 'French', 'Biology'],
  },
  {
    id: 4,
    name: 'David Rodriguez',
    email: 'david.rodriguez@school.edu',
    phone: '+1 (555) 456-7890',
    class: 'Grade 11A',
    grade: 'B',
    attendance: 85,
    enrollmentDate: '2023-07-30',
    avatar: null,
    status: 'warning',
    subjects: ['Math', 'Physics', 'Chemistry', 'Computer Science'],
  },
  {
    id: 5,
    name: 'Lisa Anderson',
    email: 'lisa.anderson@school.edu',
    phone: '+1 (555) 567-8901',
    class: 'Grade 12A',
    grade: 'A+',
    attendance: 98,
    enrollmentDate: '2023-08-10',
    avatar: null,
    status: 'active',
    subjects: ['Advanced Math', 'Physics', 'Chemistry', 'Literature'],
  },
];

const filterOptions = ['All Students', 'Active', 'Needs Attention', 'Excellent Performance', 'New Enrollments'];

export default function Students() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All Students');
  const [showFilters, setShowFilters] = useState(false);

  const filteredStudents = mockStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.class.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = selectedFilter === 'All Students' || 
                         (selectedFilter === 'Active' && student.status === 'active') ||
                         (selectedFilter === 'Needs Attention' && student.status === 'warning') ||
                         (selectedFilter === 'Excellent Performance' && student.grade.includes('A')) ||
                         (selectedFilter === 'New Enrollments' && new Date(student.enrollmentDate) > new Date('2023-08-01'));
    
    return matchesSearch && matchesFilter;
  });

  const getGradeColor = (grade) => {
    if (grade.includes('A')) return theme.colors.success;
    if (grade.includes('B')) return theme.colors.accent;
    return theme.colors.error;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return theme.colors.success;
      case 'warning': return theme.colors.warning;
      default: return theme.colors.textSecondary;
    }
  };

  const StudentCard = ({ student }) => (
    <TouchableOpacity style={styles.studentCard}>
      <View style={styles.studentHeader}>
        <View style={styles.studentAvatar}>
          <User size={20} color={theme.colors.textSecondary} />
        </View>
        <View style={styles.studentInfo}>
          <Text style={styles.studentName}>{student.name}</Text>
          <Text style={styles.studentClass}>{student.class}</Text>
        </View>
        <View style={styles.studentActions}>
          <View style={[styles.gradeChip, { backgroundColor: getGradeColor(student.grade) + '15' }]}>
            <Text style={[styles.gradeText, { color: getGradeColor(student.grade) }]}>
              {student.grade}
            </Text>
          </View>
          <TouchableOpacity style={styles.moreButton}>
            <MoreVertical size={16} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.studentDetails}>
        <View style={styles.detailRow}>
          <Mail size={14} color={theme.colors.textSecondary} />
          <Text style={styles.detailText}>{student.email}</Text>
        </View>
        <View style={styles.detailRow}>
          <Phone size={14} color={theme.colors.textSecondary} />
          <Text style={styles.detailText}>{student.phone}</Text>
        </View>
        <View style={styles.detailRow}>
          <Calendar size={14} color={theme.colors.textSecondary} />
          <Text style={styles.detailText}>Enrolled: {student.enrollmentDate}</Text>
        </View>
      </View>
      
      <View style={styles.studentStats}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Attendance</Text>
          <Text style={[styles.statValue, { color: student.attendance >= 90 ? theme.colors.success : theme.colors.warning }]}>
            {student.attendance}%
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Subjects</Text>
          <Text style={styles.statValue}>{student.subjects.length}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Status</Text>
          <View style={[styles.statusDot, { backgroundColor: getStatusColor(student.status) }]} />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Students</Text>
          <Text style={styles.headerSubtitle}>{filteredStudents.length} students found</Text>
        </View>
        <TouchableOpacity style={styles.addButton}>
          <Plus size={20} color={theme.colors.surface} />
        </TouchableOpacity>
      </View>

      {/* Search and Filter */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Search size={20} color={theme.colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search students..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={theme.colors.textSecondary}
          />
        </View>
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => setShowFilters(!showFilters)}
        >
          <Filter size={20} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Filter Options */}
      {showFilters && (
        <View style={styles.filterContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {filterOptions.map((filter) => (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterChip,
                  selectedFilter === filter && styles.filterChipActive
                ]}
                onPress={() => setSelectedFilter(filter)}
              >
                <Text style={[
                  styles.filterChipText,
                  selectedFilter === filter && styles.filterChipTextActive
                ]}>
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Summary Stats */}
      <View style={styles.summaryStats}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryNumber}>{filteredStudents.length}</Text>
          <Text style={styles.summaryLabel}>Total</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryNumber}>
            {filteredStudents.filter(s => s.status === 'active').length}
          </Text>
          <Text style={styles.summaryLabel}>Active</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryNumber}>
            {filteredStudents.filter(s => s.grade.includes('A')).length}
          </Text>
          <Text style={styles.summaryLabel}>Excellent</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryNumber}>
            {Math.round(filteredStudents.reduce((sum, s) => sum + s.attendance, 0) / filteredStudents.length)}%
          </Text>
          <Text style={styles.summaryLabel}>Avg Attendance</Text>
        </View>
      </View>

      {/* Students List */}
      <FlatList
        data={filteredStudents}
        renderItem={({ item }) => <StudentCard student={item} />}
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
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    marginRight: theme.spacing.sm,
    ...theme.shadows.sm,
  },
  searchInput: {
    flex: 1,
    marginLeft: theme.spacing.sm,
    fontSize: 16,
    color: theme.colors.text,
  },
  filterButton: {
    backgroundColor: theme.colors.surface,
    width: 44,
    height: 44,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.sm,
  },
  filterContainer: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  filterChip: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    marginRight: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  filterChipActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.text,
  },
  filterChipTextActive: {
    color: theme.colors.surface,
  },
  summaryStats: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    marginHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.lg,
    ...theme.shadows.sm,
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  summaryLabel: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  listContainer: {
    paddingHorizontal: theme.spacing.lg,
  },
  studentCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    ...theme.shadows.sm,
  },
  studentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  studentAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  studentInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  studentClass: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  studentActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gradeChip: {
    borderRadius: theme.borderRadius.sm,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    marginRight: theme.spacing.sm,
  },
  gradeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  moreButton: {
    padding: theme.spacing.xs,
  },
  studentDetails: {
    marginBottom: theme.spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  detailText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginLeft: theme.spacing.sm,
  },
  studentStats: {
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
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});