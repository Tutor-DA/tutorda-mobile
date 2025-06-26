import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { Search, Clock, CircleCheck as CheckCircle, CircleAlert as AlertCircle } from 'lucide-react-native';

const mockAssignments = [
  {
    id: '1',
    title: 'Calculus Problem Set 5',
    dueDate: '2024-01-20',
    status: 'pending',
    courseName: 'Advanced Mathematics',
  },
  {
    id: '2',
    title: 'Physics Lab Report - Momentum',
    dueDate: '2024-01-18',
    status: 'submitted',
    courseName: 'Physics Fundamentals',
  },
  {
    id: '3',
    title: 'Programming Project - Web App',
    dueDate: '2024-01-25',
    status: 'pending',
    courseName: 'Computer Science',
  },
  {
    id: '4',
    title: 'Literary Analysis Essay',
    dueDate: '2024-01-16',
    status: 'submitted',
    courseName: 'English Literature',
  },
  {
    id: '5',
    title: 'Chemistry Quiz 4',
    dueDate: '2024-01-22',
    status: 'pending',
    courseName: 'Chemistry Fundamentals',
  },
  {
    id: '6',
    title: 'History Research Paper',
    dueDate: '2024-01-30',
    status: 'pending',
    courseName: 'World History',
  },
];

export default function AssignmentsPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return 'Due tomorrow';
    if (diffDays > 0) return `Due in ${diffDays} days`;
    return `${Math.abs(diffDays)} days overdue`;
  };

  const isDueSoon = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && diffDays >= 0;
  };

  const filteredAssignments = mockAssignments.filter(assignment => {
    const matchesSearch = assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         assignment.courseName.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;
    
    switch (activeFilter) {
      case 'Due Soon':
        return isDueSoon(assignment.dueDate) && assignment.status === 'pending';
      case 'Submitted':
        return assignment.status === 'submitted';
      default:
        return true;
    }
  });

  const getStatusIcon = (status: string) => {
    if (status === 'submitted') {
      return <CheckCircle size={20} color="#10B981" strokeWidth={2} />;
    }
    return <Clock size={20} color="#F59E0B" strokeWidth={2} />;
  };

  const getStatusColor = (status: string) => {
    return status === 'submitted' ? '#10B981' : '#F59E0B';
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Search Header */}
      <View style={styles.searchHeader}>
        <View style={styles.searchBar}>
          <Search size={20} color="#6B7280" strokeWidth={2} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search assignments..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        
        {/* Filter Tabs */}
        <View style={styles.filterTabs}>
          {['All', 'Due Soon', 'Submitted'].map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterTab,
                activeFilter === filter && styles.activeFilterTab
              ]}
              onPress={() => setActiveFilter(filter)}
              activeOpacity={0.7}
            >
              <Text style={[
                styles.filterTabText,
                activeFilter === filter && styles.activeFilterTabText
              ]}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Assignments List */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.assignmentsList}>
          {filteredAssignments.map((assignment) => (
            <TouchableOpacity
              key={assignment.id}
              style={styles.assignmentCard}
              activeOpacity={0.7}
            >
              <View style={styles.assignmentIcon}>
                {getStatusIcon(assignment.status)}
              </View>
              
              <View style={styles.assignmentInfo}>
                <Text style={styles.assignmentTitle}>{assignment.title}</Text>
                <Text style={styles.courseName}>{assignment.courseName}</Text>
                <Text style={styles.dueDate}>{formatDate(assignment.dueDate)}</Text>
              </View>
              
              <View style={styles.statusContainer}>
                <View style={[
                  styles.statusBadge,
                  { backgroundColor: getStatusColor(assignment.status) + '20' }
                ]}>
                  <Text style={[
                    styles.statusText,
                    { color: getStatusColor(assignment.status) }
                  ]}>
                    {assignment.status === 'submitted' ? 'Submitted' : 'Pending'}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
          
          {filteredAssignments.length === 0 && (
            <View style={styles.emptyState}>
              <AlertCircle size={48} color="#9CA3AF" strokeWidth={1.5} />
              <Text style={styles.emptyStateText}>No assignments found</Text>
              <Text style={styles.emptyStateSubtext}>
                Try adjusting your search or filter criteria
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  searchHeader: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#1F2937',
  },
  filterTabs: {
    flexDirection: 'row',
    gap: 8,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  activeFilterTab: {
    backgroundColor: '#6366F1',
  },
  filterTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  activeFilterTabText: {
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  assignmentsList: {
    padding: 24,
  },
  assignmentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  assignmentIcon: {
    marginRight: 16,
  },
  assignmentInfo: {
    flex: 1,
  },
  assignmentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  courseName: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  dueDate: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  statusContainer: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6B7280',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});