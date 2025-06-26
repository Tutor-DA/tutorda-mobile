import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, BookOpen, Users, Star, Clock } from 'lucide-react-native';

const mockCourseData: Record<string, any> = {
  '1': {
    title: 'Algebra Fundamentals',
    description:
      'Master the basics of algebraic expressions, equations, and problem-solving techniques.',
    students: 45,
    rating: 4.8,
    duration: '10 hours',
    thumbnail:
      'https://images.pexels.com/photos/6238050/pexels-photo-6238050.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2',
  },
  '2': {
    title: 'Geometry Essentials',
    description:
      'Explore shapes, angles, and spatial relationships in this comprehensive geometry course.',
    students: 32,
    rating: 4.6,
    duration: '8 hours',
    thumbnail:
      'https://images.pexels.com/photos/5428833/pexels-photo-5428833.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2',
  },
};

export default function CourseDetailScreen() {
  const { id } = useLocalSearchParams();
  const course = mockCourseData[id as string];

  if (!course) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Course not found.</Text>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient colors={['#6366F1', '#8B5CF6']} style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backIcon}>
          <ArrowLeft size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{course.title}</Text>
      </LinearGradient>

      <Image source={{ uri: course.thumbnail }} style={styles.thumbnail} />

      <View style={styles.content}>
        <Text style={styles.title}>{course.title}</Text>
        <Text style={styles.description}>{course.description}</Text>

        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Users size={16} color="#6B7280" />
            <Text style={styles.statText}>{course.students} students</Text>
          </View>
          <View style={styles.stat}>
            <Star size={16} color="#F59E0B" />
            <Text style={styles.statText}>{course.rating} rating</Text>
          </View>
          <View style={styles.stat}>
            <Clock size={16} color="#6B7280" />
            <Text style={styles.statText}>{course.duration}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.enrollButton}>
          <Text style={styles.enrollText}>Enroll Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    paddingTop: 48,
    paddingBottom: 24,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  backIcon: {
    position: 'absolute',
    left: 20,
    top: 48,
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  thumbnail: {
    width: '100%',
    height: 200,
    marginBottom: 16,
  },
  content: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
    lineHeight: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 12,
    color: '#6B7280',
  },
  enrollButton: {
    backgroundColor: '#6366F1',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  enrollText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#EF4444',
    marginBottom: 12,
  },
  backButton: {
    backgroundColor: '#6366F1',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#FFF',
    fontWeight: '600',
  },
});
