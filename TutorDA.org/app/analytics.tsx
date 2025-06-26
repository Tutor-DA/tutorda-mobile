import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  TrendingUp,
  Users,
  BookOpen,
  Target,
  Clock,
  Award,
  Calendar,
  Download,
  Filter,
  ChartBar as BarChart3,
  ChartPie as PieChart,
  Activity,
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '@/constants/theme';

const { width } = Dimensions.get('window');

export default function AnalyticsScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [selectedMetric, setSelectedMetric] = useState('engagement');

  const periods = [
    { id: 'day', label: 'Today' },
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
    { id: 'quarter', label: 'Quarter' },
  ];

  const metrics = [
    { id: 'engagement', label: 'Engagement', icon: Activity },
    { id: 'performance', label: 'Performance', icon: TrendingUp },
    { id: 'progress', label: 'Progress', icon: Target },
    { id: 'time', label: 'Time Spent', icon: Clock },
  ];

  // Mock analytics data
  const overviewStats = {
    totalStudents: 247,
    activeStudents: 189,
    avgScore: 87,
    completionRate: 73,
    totalQuizzes: 156,
    avgTimeSpent: 45, // minutes
    streakAvg: 8.5,
    xpEarned: 45600,
  };

  const coursePerformance = [
    {
      name: 'Algebra Fundamentals',
      students: 45,
      avgScore: 92,
      completion: 85,
    },
    { name: 'Geometry Essentials', students: 32, avgScore: 88, completion: 78 },
    { name: 'Calculus I', students: 28, avgScore: 84, completion: 65 },
    { name: 'Statistics', students: 38, avgScore: 90, completion: 82 },
  ];

  const weeklyActivity = [
    { day: 'Mon', students: 45, quizzes: 12, avgScore: 85 },
    { day: 'Tue', students: 52, quizzes: 18, avgScore: 88 },
    { day: 'Wed', students: 48, quizzes: 15, avgScore: 87 },
    { day: 'Thu', students: 55, quizzes: 22, avgScore: 89 },
    { day: 'Fri', students: 42, quizzes: 14, avgScore: 86 },
    { day: 'Sat', students: 28, quizzes: 8, avgScore: 84 },
    { day: 'Sun', students: 35, quizzes: 10, avgScore: 83 },
  ];

  const topPerformingStudents = [
    { name: 'Sarah Chen', score: 96, improvement: '+5%' },
    { name: 'Mike Johnson', score: 94, improvement: '+3%' },
    { name: 'Emma Davis', score: 92, improvement: '+7%' },
    { name: 'David Wilson', score: 90, improvement: '+2%' },
    { name: 'Lisa Anderson', score: 89, improvement: '+4%' },
  ];

  const getMaxValue = (data: any[], key: string) => {
    return Math.max(...data.map((item) => item[key]));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Analytics</Text>
            <Text style={styles.headerSubtitle}>
              Track performance and insights
            </Text>
          </View>
          <TouchableOpacity style={styles.exportButton}>
            <Download size={24} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Period Filter */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterContainer}
          contentContainerStyle={styles.filterContent}
        >
          {periods.map((period) => (
            <TouchableOpacity
              key={period.id}
              style={[
                styles.filterChip,
                selectedPeriod === period.id && styles.filterChipActive,
              ]}
              onPress={() => setSelectedPeriod(period.id)}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedPeriod === period.id && styles.filterTextActive,
                ]}
              >
                {period.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Overview Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Users size={24} color={theme.colors.primary} />
              <Text style={styles.statValue}>
                {overviewStats.totalStudents}
              </Text>
              <Text style={styles.statLabel}>Total Students</Text>
              <Text style={styles.statChange}>+12 this week</Text>
            </View>

            <View style={styles.statCard}>
              <TrendingUp size={24} color={theme.colors.secondary} />
              <Text style={styles.statValue}>{overviewStats.avgScore}%</Text>
              <Text style={styles.statLabel}>Avg Score</Text>
              <Text style={styles.statChange}>+3% from last week</Text>
            </View>

            <View style={styles.statCard}>
              <Target size={24} color={theme.colors.accent} />
              <Text style={styles.statValue}>
                {overviewStats.completionRate}%
              </Text>
              <Text style={styles.statLabel}>Completion Rate</Text>
              <Text style={styles.statChange}>+5% from last week</Text>
            </View>

            <View style={styles.statCard}>
              <Clock size={24} color={theme.colors.error} />
              <Text style={styles.statValue}>
                {overviewStats.avgTimeSpent}m
              </Text>
              <Text style={styles.statLabel}>Avg Time</Text>
              <Text style={styles.statChange}>+8m from last week</Text>
            </View>
          </View>
        </View>

        {/* Metric Selector */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.metricContainer}
          contentContainerStyle={styles.metricContent}
        >
          {metrics.map((metric) => (
            <TouchableOpacity
              key={metric.id}
              style={[
                styles.metricChip,
                selectedMetric === metric.id && styles.metricChipActive,
              ]}
              onPress={() => setSelectedMetric(metric.id)}
            >
              <metric.icon
                size={16}
                color={
                  selectedMetric === metric.id
                    ? theme.colors.text.inverse
                    : theme.colors.text.secondary
                }
              />
              <Text
                style={[
                  styles.metricText,
                  selectedMetric === metric.id && styles.metricTextActive,
                ]}
              >
                {metric.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Weekly Activity Chart */}
        <View style={styles.chartSection}>
          <View style={styles.chartHeader}>
            <Text style={styles.chartTitle}>Weekly Activity</Text>
            <TouchableOpacity>
              <BarChart3 size={20} color={theme.colors.primary} />
            </TouchableOpacity>
          </View>

          <View style={styles.chartContainer}>
            <View style={styles.chart}>
              {weeklyActivity.map((day, index) => {
                const maxStudents = getMaxValue(weeklyActivity, 'students');
                const height = (day.students / maxStudents) * 120;

                return (
                  <View key={day.day} style={styles.chartBar}>
                    <View style={styles.barContainer}>
                      <LinearGradient
                        colors={[theme.colors.primary, theme.colors.secondary]}
                        style={[styles.bar, { height }]}
                      />
                    </View>
                    <Text style={styles.barLabel}>{day.day}</Text>
                    <Text style={styles.barValue}>{day.students}</Text>
                  </View>
                );
              })}
            </View>

            <View style={styles.chartLegend}>
              <View style={styles.legendItem}>
                <View
                  style={[
                    styles.legendDot,
                    { backgroundColor: theme.colors.primary },
                  ]}
                />
                <Text style={styles.legendText}>Active Students</Text>
              </View>
              <View style={styles.legendItem}>
                <View
                  style={[
                    styles.legendDot,
                    { backgroundColor: theme.colors.secondary },
                  ]}
                />
                <Text style={styles.legendText}>Quizzes Completed</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Course Performance */}
        <View style={styles.courseSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Course Performance</Text>
            <TouchableOpacity>
              <PieChart size={20} color={theme.colors.primary} />
            </TouchableOpacity>
          </View>

          {coursePerformance.map((course, index) => (
            <View key={index} style={styles.courseCard}>
              <View style={styles.courseHeader}>
                <Text style={styles.courseName}>{course.name}</Text>
                <Text style={styles.courseScore}>{course.avgScore}%</Text>
              </View>

              <View style={styles.courseStats}>
                <View style={styles.courseStat}>
                  <Users size={14} color={theme.colors.text.secondary} />
                  <Text style={styles.courseStatText}>
                    {course.students} students
                  </Text>
                </View>
                <View style={styles.courseStat}>
                  <Target size={14} color={theme.colors.text.secondary} />
                  <Text style={styles.courseStatText}>
                    {course.completion}% completion
                  </Text>
                </View>
              </View>

              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <LinearGradient
                    colors={[theme.colors.secondary, theme.colors.accent]}
                    style={[
                      styles.progressFill,
                      { width: `${course.completion}%` },
                    ]}
                  />
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Top Performers */}
        <View style={styles.performersSection}>
          <Text style={styles.sectionTitle}>Top Performers This Week</Text>

          {topPerformingStudents.map((student, index) => (
            <View key={index} style={styles.performerCard}>
              <View style={styles.performerRank}>
                <Text style={styles.rankNumber}>{index + 1}</Text>
              </View>

              <View style={styles.performerInfo}>
                <Text style={styles.performerName}>{student.name}</Text>
                <Text style={styles.performerScore}>
                  {student.score}% avg score
                </Text>
              </View>

              <View style={styles.performerImprovement}>
                <TrendingUp size={16} color={theme.colors.secondary} />

                <Text style={styles.improvementText}>
                  {student.improvement}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Engagement Insights */}
        <View style={styles.insightsSection}>
          <Text style={styles.sectionTitle}>Engagement Insights</Text>

          <View style={styles.insightCard}>
            <LinearGradient
              colors={[theme.colors.primary, theme.colors.secondary]}
              style={styles.insightGradient}
            >
              <View style={styles.insightIcon}>
                <Award size={24} color={theme.colors.text.inverse} />
              </View>
              <View style={styles.insightContent}>
                <Text style={styles.insightTitle}>Streak Challenge</Text>
                <Text style={styles.insightText}>
                  Students with 7+ day streaks have 35% higher scores on average
                </Text>
              </View>
            </LinearGradient>
          </View>

          <View style={styles.insightCard}>
            <LinearGradient
              colors={[theme.colors.secondary, theme.colors.accent]}
              style={styles.insightGradient}
            >
              <View style={styles.insightIcon}>
                <Clock size={24} color={theme.colors.text.inverse} />
              </View>
              <View style={styles.insightContent}>
                <Text style={styles.insightTitle}>Time Analysis</Text>
                <Text style={styles.insightText}>
                  Students spending 30+ minutes daily show 28% better retention
                </Text>
              </View>
            </LinearGradient>
          </View>

          <View style={styles.insightCard}>
            <LinearGradient
              colors={[theme.colors.accent, theme.colors.error]}
              style={styles.insightGradient}
            >
              <View style={styles.insightIcon}>
                <Calendar size={24} color={theme.colors.text.inverse} />
              </View>
              <View style={styles.insightContent}>
                <Text style={styles.insightTitle}>Weekly Pattern</Text>
                <Text style={styles.insightText}>
                  Tuesday and Thursday show highest engagement and quiz
                  completion
                </Text>
              </View>
            </LinearGradient>
          </View>
        </View>
      </ScrollView>
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
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.lg,
  },
  headerTitle: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: 'bold',
    color: theme.colors.text.primary,
  },
  headerSubtitle: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text.secondary,
    marginTop: theme.spacing.xs,
  },
  exportButton: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.sm,
  },
  filterContainer: {
    marginBottom: theme.spacing.lg,
  },
  filterContent: {
    paddingHorizontal: theme.spacing.xl,
  },
  filterChip: {
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.full,
    marginRight: theme.spacing.md,
  },
  filterChipActive: {
    backgroundColor: theme.colors.primary,
  },
  filterText: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '600',
    color: theme.colors.text.secondary,
  },
  filterTextActive: {
    color: theme.colors.text.inverse,
  },
  statsContainer: {
    paddingHorizontal: theme.spacing.xl,
    marginBottom: theme.spacing.xl,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
  },
  statCard: {
    width: (width - theme.spacing.xl * 2 - theme.spacing.md) / 2,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    alignItems: 'center',
    ...theme.shadows.sm,
    marginBottom: theme.spacing.md,
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
    textAlign: 'center',
    marginBottom: theme.spacing.xs,
  },
  statChange: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.secondary,
    fontWeight: '500',
  },
  metricContainer: {
    marginBottom: theme.spacing.xl,
  },
  metricContent: {
    paddingHorizontal: theme.spacing.xl,
  },
  metricChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    marginRight: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  metricChipActive: {
    backgroundColor: theme.colors.primary,
  },
  metricText: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '600',
    color: theme.colors.text.secondary,
  },
  metricTextActive: {
    color: theme.colors.text.inverse,
  },
  chartSection: {
    paddingHorizontal: theme.spacing.xl,
    marginBottom: theme.spacing.xl,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  chartTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
  },
  chartContainer: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    ...theme.shadows.sm,
  },
  chart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 150,
    marginBottom: theme.spacing.lg,
  },
  chartBar: {
    alignItems: 'center',
    width: (width - theme.spacing.xl * 2 - theme.spacing.lg * 2) / 7 - 5,
  },
  barContainer: {
    height: 120,
    justifyContent: 'flex-end',
    marginBottom: theme.spacing.sm,
  },
  bar: {
    width: 12,
    borderRadius: theme.borderRadius.full,
  },
  barLabel: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xs,
  },
  barValue: {
    fontSize: theme.typography.fontSize.xs,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
  },
  chartLegend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: theme.spacing.xl,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: theme.borderRadius.full,
  },
  legendText: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.text.secondary,
  },
  courseSection: {
    paddingHorizontal: theme.spacing.xl,
    marginBottom: theme.spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.lg,
  },
  courseCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    ...theme.shadows.sm,
  },
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  courseName: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
  },
  courseScore: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: 'bold',
    color: theme.colors.secondary,
  },
  courseStats: {
    flexDirection: 'row',
    gap: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  courseStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  courseStatText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
  },
  progressContainer: {
    height: 6,
    backgroundColor: theme.colors.borderLight,
    borderRadius: theme.borderRadius.full,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
  },
  progressFill: {
    height: '100%',
  },
  performersSection: {
    paddingHorizontal: theme.spacing.xl,
    marginBottom: theme.spacing.xl,
  },
  performerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    ...theme.shadows.sm,
  },
  performerRank: {
    width: 32,
    height: 32,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.lg,
  },
  rankNumber: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: 'bold',
    color: theme.colors.text.inverse,
  },
  performerInfo: {
    flex: 1,
  },
  performerName: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  performerScore: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
  },
  performerImprovement: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  improvementText: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: 'bold',
    color: theme.colors.secondary,
  },
  insightsSection: {
    paddingHorizontal: theme.spacing.xl,
    marginBottom: theme.spacing.xl,
  },
  insightCard: {
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    marginBottom: theme.spacing.md,
    ...theme.shadows.md,
  },
  insightGradient: {
    flexDirection: 'row',
    padding: theme.spacing.lg,
  },
  insightIcon: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.lg,
  },
  insightContent: {
    flex: 1,
  },
  insightTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: 'bold',
    color: theme.colors.text.inverse,
    marginBottom: theme.spacing.sm,
  },
  insightText: {
    fontSize: theme.typography.fontSize.base,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight:
      theme.typography.lineHeight.base * theme.typography.fontSize.base,
  },
});
