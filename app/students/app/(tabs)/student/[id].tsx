import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { ArrowLeft, MessageCircle, Award, Zap, Flame, Target, CircleCheck as CheckCircle, Circle as XCircle } from 'lucide-react-native';

const mockStudentData = {
  name: 'Alex Thompson',
  email: 'alex.thompson@university.edu',
  avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
  xp: 2450,
  level: 12,
  streak: 15,
  averageScore: 87,
  recentQuizzes: [
    {
      id: '1',
      name: 'Calculus Midterm',
      date: '2024-01-15',
      score: 92,
      passed: true,
    },
    {
      id: '2',
      name: 'Physics Lab Report',
      date: '2024-01-12',
      score: 88,
      passed: true,
    },
    {
      id: '3',
      name: 'Chemistry Quiz 3',
      date: '2024-01-10',
      score: 76,
      passed: true,
    },
    {
      id: '4',
      name: 'History Essay',
      date: '2024-01-08',
      score: 94,
      passed: true,
    },
    {
      id: '5',
      name: 'Programming Assignment',
      date: '2024-01-05',
      score: 89,
      passed: true,
    },
  ],
};

export default function StudentProfile() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <ArrowLeft size={24} color="#1F2937" strokeWidth={2} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Student Profile</Text>
        </View>

        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Image source={{ uri: mockStudentData.avatar }} style={styles.largeAvatar} />
          <Text style={styles.studentName}>{mockStudentData.name}</Text>
          <Text style={styles.studentEmail}>{mockStudentData.email}</Text>
          
          <TouchableOpacity 
            style={styles.messageButton}
            onPress={() => router.push('/student/message')}
            activeOpacity={0.8}
          >
            <MessageCircle size={18} color="#FFFFFF" strokeWidth={2} />
            <Text style={styles.messageButtonText}>Send Message</Text>
          </TouchableOpacity>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Zap size={28} color="#F59E0B" strokeWidth={2} />
            <Text style={styles.statNumber}>{mockStudentData.xp.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Experience Points</Text>
          </View>
          <View style={styles.statCard}>
            <Award size={28} color="#6366F1" strokeWidth={2} />
            <Text style={styles.statNumber}>{mockStudentData.level}</Text>
            <Text style={styles.statLabel}>Current Level</Text>
          </View>
          <View style={styles.statCard}>
            <Flame size={28} color="#EF4444" strokeWidth={2} />
            <Text style={styles.statNumber}>{mockStudentData.streak}</Text>
            <Text style={styles.statLabel}>Active Streak</Text>
          </View>
          <View style={styles.statCard}>
            <Target size={28} color="#10B981" strokeWidth={2} />
            <Text style={styles.statNumber}>{mockStudentData.averageScore}%</Text>
            <Text style={styles.statLabel}>Average Score</Text>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          
          {mockStudentData.recentQuizzes.map((quiz) => (
            <View key={quiz.id} style={styles.activityCard}>
              <View style={styles.activityIcon}>
                {quiz.passed ? (
                  <CheckCircle size={20} color="#10B981" strokeWidth={2} />
                ) : (
                  <XCircle size={20} color="#EF4444" strokeWidth={2} />
                )}
              </View>
              <View style={styles.activityInfo}>
                <Text style={styles.activityName}>{quiz.name}</Text>
                <Text style={styles.activityDate}>{formatDate(quiz.date)}</Text>
              </View>
              <View style={styles.scoreContainer}>
                <Text style={[
                  styles.scoreText,
                  { color: quiz.passed ? '#10B981' : '#EF4444' }
                ]}>
                  {quiz.score}%
                </Text>
                <Text style={[
                  styles.statusText,
                  { color: quiz.passed ? '#10B981' : '#EF4444' }
                ]}>
                  {quiz.passed ? 'Passed' : 'Failed'}
                </Text>
              </View>
            </View>
          ))}
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  profileSection: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  largeAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  studentName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  studentEmail: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 24,
  },
  messageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6366F1',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  messageButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 24,
    paddingVertical: 24,
    gap: 16,
  },
  statCard: {
    width: '47%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
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
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    fontWeight: '500',
  },
  section: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
  },
  activityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  activityIcon: {
    marginRight: 12,
  },
  activityInfo: {
    flex: 1,
  },
  activityName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  activityDate: {
    fontSize: 14,
    color: '#6B7280',
  },
  scoreContainer: {
    alignItems: 'flex-end',
  },
  scoreText: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 2,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
});