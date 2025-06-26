import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TrendingUp, BookOpen, Award, Target } from 'lucide-react-native';

const mockProgressData = {
  subjects: [
    {
      name: 'Mathematics',
      progress: 78,
      color: '#6366F1',
    },
    {
      name: 'Science',
      progress: 65,
      color: '#10B981',
    },
    {
      name: 'Language',
      progress: 92,
      color: '#F59E0B',
    },
    {
      name: 'History',
      progress: 54,
      color: '#EF4444',
    },
  ],
  overallStats: {
    totalQuizzes: 45,
    averageScore: 82,
    completionRate: 88,
  },
};

export default function ProgressPage() {
  const ProgressBar = ({ progress, color }: { progress: number; color: string }) => (
    <View style={styles.progressBarContainer}>
      <View style={styles.progressBarTrack}>
        <View 
          style={[
            styles.progressBarFill, 
            { width: `${progress}%`, backgroundColor: color }
          ]} 
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Progress Report</Text>
          <Text style={styles.headerSubtitle}>Track your learning journey</Text>
        </View>

        {/* Overall Statistics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Overall Statistics</Text>
          
          <View style={styles.statsGrid}>
            <View style={styles.overallStatCard}>
              <BookOpen size={28} color="#6366F1" strokeWidth={2} />
              <Text style={styles.overallStatNumber}>
                {mockProgressData.overallStats.totalQuizzes}
              </Text>
              <Text style={styles.overallStatLabel}>Total Quizzes</Text>
              <Text style={styles.overallStatSubtext}>Completed</Text>
            </View>
            
            <View style={styles.overallStatCard}>
              <Target size={28} color="#10B981" strokeWidth={2} />
              <Text style={styles.overallStatNumber}>
                {mockProgressData.overallStats.averageScore}%
              </Text>
              <Text style={styles.overallStatLabel}>Average Score</Text>
              <Text style={styles.overallStatSubtext}>Across all subjects</Text>
            </View>
            
            <View style={styles.overallStatCard}>
              <Award size={28} color="#F59E0B" strokeWidth={2} />
              <Text style={styles.overallStatNumber}>
                {mockProgressData.overallStats.completionRate}%
              </Text>
              <Text style={styles.overallStatLabel}>Completion Rate</Text>
              <Text style={styles.overallStatSubtext}>This semester</Text>
            </View>
          </View>
        </View>

        {/* Subject Progress */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Subject Progress</Text>
          
          {mockProgressData.subjects.map((subject, index) => (
            <View key={index} style={styles.subjectCard}>
              <View style={styles.subjectHeader}>
                <Text style={styles.subjectName}>{subject.name}</Text>
                <Text style={[styles.subjectProgress, { color: subject.color }]}>
                  {subject.progress}%
                </Text>
              </View>
              
              <ProgressBar progress={subject.progress} color={subject.color} />
              
              <View style={styles.subjectDetails}>
                <Text style={styles.subjectDetailText}>
                  {subject.progress >= 80 ? 'Excellent progress!' : 
                   subject.progress >= 60 ? 'Good progress' : 'Needs improvement'}
                </Text>
                <Text style={styles.subjectDetailSubtext}>
                  {100 - subject.progress}% remaining to complete
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Charts Placeholder */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Performance Charts</Text>
          
          <View style={styles.chartPlaceholder}>
            <TrendingUp size={48} color="#9CA3AF" strokeWidth={1.5} />
            <Text style={styles.chartPlaceholderText}>Charts Coming Soon</Text>
            <Text style={styles.chartPlaceholderSubtext}>
              Detailed analytics and performance charts will be available here
            </Text>
          </View>
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
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  section: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
  },
  statsGrid: {
    gap: 16,
  },
  overallStatCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 16,
  },
  overallStatNumber: {
    fontSize: 36,
    fontWeight: '700',
    color: '#1F2937',
    marginTop: 12,
    marginBottom: 8,
  },
  overallStatLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  overallStatSubtext: {
    fontSize: 14,
    color: '#6B7280',
  },
  subjectCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  subjectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  subjectName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  subjectProgress: {
    fontSize: 18,
    fontWeight: '700',
  },
  progressBarContainer: {
    marginBottom: 16,
  },
  progressBarTrack: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  subjectDetails: {
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 16,
  },
  subjectDetailText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  subjectDetailSubtext: {
    fontSize: 14,
    color: '#6B7280',
  },
  chartPlaceholder: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 40,
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
  chartPlaceholderText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6B7280',
    marginTop: 16,
    marginBottom: 8,
  },
  chartPlaceholderSubtext: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 20,
  },
});