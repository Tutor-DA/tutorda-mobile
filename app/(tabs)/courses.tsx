import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import {
  Search,
  Filter,
  Plus,
  BookOpen,
  Users,
  TrendingUp,
  Clock,
  Star,
  Play,
  MoveHorizontal as MoreHorizontal,
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '@/constants/theme';
import { CourseCard } from '@/components/CourseCard';
import { Course } from '@/constants/types';
import { coursesStyles as styles } from '@/constants/coursesStyles';

const { width } = Dimensions.get('window');

export default function CoursesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All Courses' },
    { id: 'active', label: 'Active' },
    { id: 'completed', label: 'Completed' },
    { id: 'draft', label: 'Drafts' },
  ];

  const courses: Course[] = [
    {
      id: '1',
      title: 'Algebra Fundamentals',
      description:
        'Master the basics of algebraic expressions, equations, and problem-solving techniques',
      studentCount: 45,
      avgXP: 1250,
      color: '#6366F1',
      progress: 85,
      teacherId: 'teacher1',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-20',
    },
    {
      id: '2',
      title: 'Geometry Essentials',
      description:
        'Explore shapes, angles, and spatial relationships in this comprehensive geometry course',
      studentCount: 32,
      avgXP: 980,
      color: '#10B981',
      progress: 60,
      teacherId: 'teacher1',
      createdAt: '2024-01-10',
      updatedAt: '2024-01-18',
    },
    {
      id: '3',
      title: 'Calculus I',
      description:
        'Introduction to limits, derivatives, and the fundamental concepts of calculus',
      studentCount: 28,
      avgXP: 1450,
      color: '#F59E0B',
      progress: 40,
      teacherId: 'teacher1',
      createdAt: '2024-01-05',
      updatedAt: '2024-01-15',
    },
    {
      id: '4',
      title: 'Statistics & Probability',
      description:
        'Learn data analysis, probability theory, and statistical inference methods',
      studentCount: 38,
      avgXP: 1100,
      color: '#EF4444',
      progress: 75,
      teacherId: 'teacher1',
      createdAt: '2024-01-12',
      updatedAt: '2024-01-22',
    },
  ];
 
  const recentActivity = [
    {
      id: '1',
      type: 'new_enrollment',
      studentName: 'Sarah Chen',
      courseName: 'Algebra Fundamentals',
      time: '2 hours ago',
      avatar:
        'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=2',
    },
    {
      id: '2',
      type: 'quiz_completed',
      studentName: 'Mike Johnson',
      courseName: 'Geometry Essentials',
      score: 95,
      time: '4 hours ago',
      avatar:
        'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=2',
    },
    {
      id: '3',
      type: 'milestone_reached',
      studentName: 'Emma Davis',
      courseName: 'Statistics & Probability',
      milestone: '50% Complete',
      time: '6 hours ago',
      avatar:
        'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=2',
    },
  ];

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    // Add filter logic here based on selectedFilter
    return matchesSearch;
  });

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'new_enrollment':
        return <Users size={16} color={theme.colors.primary} />;
      case 'quiz_completed':
        return <Star size={16} color={theme.colors.secondary} />;
      case 'milestone_reached':
        return <TrendingUp size={16} color={theme.colors.accent} />;
      default:
        return <BookOpen size={16} color={theme.colors.text.secondary} />;
    }
  };

  const getActivityText = (activity: any) => {
    switch (activity.type) {
      case 'new_enrollment':
        return `${activity.studentName} enrolled in ${activity.courseName}`;
      case 'quiz_completed':
        return `${activity.studentName} scored ${activity.score}% in ${activity.courseName}`;
      case 'milestone_reached':
        return `${activity.studentName} reached ${activity.milestone} in ${activity.courseName}`;
      default:
        return 'Unknown activity';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>My Courses</Text>
            <Text style={styles.headerSubtitle}>
              Manage and track your teaching
            </Text>
          </View>
          <TouchableOpacity
            style={styles.createButton}
            onPress={() => router.push('/create-course')}
          >
            <Plus size={24} color={theme.colors.text.inverse} />
          </TouchableOpacity>
        </View>

        {/* Search and Filter */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={20} color={theme.colors.text.light} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search courses..."
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
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Course Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <BookOpen size={24} color={theme.colors.primary} />
              <Text style={styles.statValue}>{courses.length}</Text>
              <Text style={styles.statLabel}>Total Courses</Text>
            </View>
            <View style={styles.statCard}>
              <Users size={24} color={theme.colors.secondary} />
              <Text style={styles.statValue}>
                {courses.reduce((sum, course) => sum + course.studentCount, 0)}
              </Text>
              <Text style={styles.statLabel}>Total Students</Text>
            </View>
            <View style={styles.statCard}>
              <TrendingUp size={24} color={theme.colors.accent} />
              <Text style={styles.statValue}>
                {Math.round(
                  courses.reduce(
                    (sum, course) => sum + (course.progress || 0),
                    0,
                  ) / courses.length,
                )}
                %
              </Text>
              <Text style={styles.statLabel}>Avg Progress</Text>
            </View>
          </View>
        </View>

        {/* Courses Grid */}
        <View style={styles.coursesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Your Courses</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>Manage All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.coursesGrid}>
            {filteredCourses.map((course) => (
              <View key={course.id} style={styles.courseCardContainer}>
                <CourseCard
                  course={course}
                  onPress={() => router.push(`/course/${course.id}`)}
                />
              </View>
            ))}
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.activitySection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.activityList}>
            {recentActivity.map((activity) => (
              <View key={activity.id} style={styles.activityItem}>
                <Image
                  source={{ uri: activity.avatar }}
                  style={styles.activityAvatar}
                />
                <View style={styles.activityContent}>
                  <View style={styles.activityHeader}>
                    {getActivityIcon(activity.type)}
                    <Text style={styles.activityText}>
                      {getActivityText(activity)}
                    </Text>
                  </View>
                  <Text style={styles.activityTime}>{activity.time}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity
              style={styles.quickActionCard}
              onPress={() => router.push('/create-course')}
            >
              <LinearGradient
                colors={[theme.colors.primary, theme.colors.secondary]}
                style={styles.quickActionGradient}
              >
                <Plus size={24} color={theme.colors.text.inverse} />
                <Text style={styles.quickActionTitle}>New Course</Text>
                <Text style={styles.quickActionSubtitle}>
                  Create a new course
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickActionCard}
              onPress={() => router.push('/live-quiz/create')}
            >
              <LinearGradient
                colors={[theme.colors.secondary, theme.colors.accent]}
                style={styles.quickActionGradient}
              >
                <Play size={24} color={theme.colors.text.inverse} />
                <Text style={styles.quickActionTitle}>Live Quiz</Text>
                <Text style={styles.quickActionSubtitle}>
                  Start live session
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickActionCard}
              onPress={() => router.push('/daily-challenge')}
            >
              <LinearGradient
                colors={[theme.colors.accent, theme.colors.error]}
                style={styles.quickActionGradient}
              >
                <Star size={24} color={theme.colors.text.inverse} />
                <Text style={styles.quickActionTitle}>Challenge</Text>
                <Text style={styles.quickActionSubtitle}>Daily challenge</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickActionCard}
              onPress={() => router.push('/leaderboard')}
            >
              <LinearGradient
                colors={[theme.colors.error, theme.colors.primary]}
                style={styles.quickActionGradient}
              >
                <TrendingUp size={24} color={theme.colors.text.inverse} />
                <Text style={styles.quickActionTitle}>Leaderboard</Text>
                <Text style={styles.quickActionSubtitle}>View rankings</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
