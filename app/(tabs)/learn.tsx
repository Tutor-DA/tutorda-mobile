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
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import {
  Search,
  Filter,
  BookOpen,
  Clock,
  Star,
  ChevronRight,
  Play,
  Lock,
  CircleCheck as CheckCircle,
  Brain,
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '@/constants/theme';

const { width } = Dimensions.get('window');

interface Lesson {
  id: string;
  title: string;
  description: string;
  subject: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  progress: number;
  rating: number;
  students: number;
  isLocked: boolean;
  xpRequired?: number;
  thumbnail: string;
}

export default function LearnScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [fadeAnim] = useState(new Animated.Value(1));

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [selectedCategory]);

  const categories = [
    'All',
    'Algebra',
    'Geometry',
    'Calculus',
    'Statistics',
    'Trigonometry',
  ];

  const lessons: Lesson[] = [
    {
      id: '1',
      title: 'Introduction to Algebra',
      description:
        'Learn the fundamentals of algebraic expressions and equations',
      subject: 'Algebra',
      difficulty: 'Beginner',
      duration: '15 min',
      progress: 100,
      rating: 4.8,
      students: 1250,
      isLocked: false,
      thumbnail:
        'https://images.pexels.com/photos/6238050/pexels-photo-6238050.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2',
    },
    {
      id: '2',
      title: 'Quadratic Equations',
      description: 'Master solving quadratic equations using various methods',
      subject: 'Algebra',
      difficulty: 'Intermediate',
      duration: '25 min',
      progress: 75,
      rating: 4.9,
      students: 980,
      isLocked: false,
      thumbnail:
        'https://images.pexels.com/photos/3862130/pexels-photo-3862130.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2',
    },
    {
      id: '3',
      title: 'Basic Geometry Shapes',
      description: 'Explore properties of triangles, circles, and polygons',
      subject: 'Geometry',
      difficulty: 'Beginner',
      duration: '20 min',
      progress: 0,
      rating: 4.7,
      students: 1450,
      isLocked: false,
      thumbnail:
        'https://images.pexels.com/photos/5428833/pexels-photo-5428833.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2',
    },
    {
      id: '4',
      title: 'Limits and Continuity',
      description: 'Introduction to calculus concepts and limit theory',
      subject: 'Calculus',
      difficulty: 'Advanced',
      duration: '35 min',
      progress: 0,
      rating: 4.6,
      students: 750,
      isLocked: true,
      xpRequired: 3500,
      thumbnail:
        'https://images.pexels.com/photos/8636603/pexels-photo-8636603.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2',
    },
    {
      id: '5',
      title: 'Trigonometric Functions',
      description: 'Understanding sine, cosine, and tangent functions',
      subject: 'Trigonometry',
      difficulty: 'Intermediate',
      duration: '30 min',
      progress: 0,
      rating: 4.8,
      students: 890,
      isLocked: false,
      thumbnail:
        'https://images.pexels.com/photos/5428826/pexels-photo-5428826.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2',
    },
    {
      id: '6',
      title: 'Statistical Analysis',
      description: 'Learn to analyze and interpret data sets',
      subject: 'Statistics',
      difficulty: 'Intermediate',
      duration: '40 min',
      progress: 0,
      rating: 4.5,
      students: 720,
      isLocked: false,
      thumbnail:
        'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2',
    },
  ];

  const filteredLessons = lessons.filter((lesson) => {
    const matchesSearch =
      lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || lesson.subject === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return theme.colors.secondary;
      case 'Intermediate':
        return theme.colors.accent;
      case 'Advanced':
        return theme.colors.error;
      default:
        return theme.colors.text.secondary;
    }
  };

  const getProgressIcon = (progress: number, isLocked: boolean) => {
    if (isLocked) return <Lock size={16} color="#9CA3AF" />;
    if (progress === 100) return <CheckCircle size={16} color="#10B981" />;
    if (progress > 0) return <Play size={16} color="#6366F1" />;
    return <BookOpen size={16} color="#6B7280" />;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Learn</Text>
        <Text style={styles.headerSubtitle}>
          Explore math concepts at your own pace
        </Text>
      </View>

      {/* Featured Learning Path */}
      <TouchableOpacity
        style={styles.featuredCard}
        onPress={() => router.push('/adaptive-path')}
      >
        <LinearGradient
          colors={['#6366F1', '#8B5CF6']}
          style={styles.featuredGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.featuredContent}>
            <View style={styles.featuredIcon}>
              <Brain size={32} color={theme.colors.text.inverse} />
            </View>
            <View style={styles.featuredInfo}>
              <Text style={styles.featuredTitle}>Adaptive Learning Path</Text>
              <Text style={styles.featuredDescription}>
                Personalized learning journey based on your performance
              </Text>
              <View style={styles.featuredButton}>
                <Text style={styles.featuredButtonText}>Explore</Text>
                <ChevronRight size={16} color={theme.colors.text.inverse} />
              </View>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#9CA3AF" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search lessons..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9CA3AF"
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#6366F1" />
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <View style={{ height: 72, marginBottom: 8 }}>
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.categoriesContent}
  >
    {categories.map((category) => (
      <TouchableOpacity
        key={category}
        style={[
          styles.categoryChip,
          selectedCategory === category && styles.categoryChipActive,
        ]}
        onPress={() => {
          fadeAnim.setValue(0);
          setSelectedCategory(category);
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }).start();
        }}
      >
        <Text
          style={[
            styles.categoryText,
            selectedCategory === category && styles.categoryTextActive,
          ]}
        >
          {category}
        </Text>
      </TouchableOpacity>
    ))}
  </ScrollView>
</View>

      {/* Lessons List */}
      <Animated.ScrollView
        style={[styles.lessonsContainer, { opacity: fadeAnim }]}
        showsVerticalScrollIndicator={false}
      >
        {filteredLessons.map((lesson) => (
          <TouchableOpacity
            key={lesson.id}
            style={[
              styles.lessonCard,
              lesson.isLocked && styles.lessonCardLocked,
            ]}
            onPress={() => {
              if (!lesson.isLocked) {
                router.push(`/lesson/${lesson.id}`);
              }
            }}
            disabled={lesson.isLocked}
          >
            <Image
              source={{ uri: lesson.thumbnail }}
              style={styles.lessonThumbnail}
            />

            <View style={styles.lessonContent}>
              <View style={styles.lessonHeader}>
                <View style={styles.lessonTitleContainer}>
                  <Text
                    style={[
                      styles.lessonTitle,
                      lesson.isLocked && styles.lockedText,
                    ]}
                  >
                    {lesson.title}
                  </Text>
                  <View style={styles.lessonMeta}>
                    {getProgressIcon(lesson.progress, lesson.isLocked)}
                    <Text
                      style={[
                        styles.lessonCategory,
                        lesson.isLocked && styles.lockedText,
                      ]}
                    >
                      {lesson.subject}
                    </Text>
                  </View>
                </View>

                <View
                  style={[
                    styles.difficultyBadge,
                    { backgroundColor: getDifficultyColor(lesson.difficulty) },
                    lesson.isLocked && styles.lockedBadge,
                  ]}
                >
                  <Text style={styles.difficultyText}>{lesson.difficulty}</Text>
                </View>
              </View>

              <Text
                style={[
                  styles.lessonDescription,
                  lesson.isLocked && styles.lockedText,
                ]}
              >
                {lesson.description}
              </Text>

              <View style={styles.lessonStats}>
                <View style={styles.statItem}>
                  <Clock
                    size={14}
                    color={lesson.isLocked ? '#9CA3AF' : '#6B7280'}
                  />
                  <Text
                    style={[
                      styles.statText,
                      lesson.isLocked && styles.lockedText,
                    ]}
                  >
                    {lesson.duration}
                  </Text>
                </View>

                <View style={styles.statItem}>
                  <Star
                    size={14}
                    color={lesson.isLocked ? '#9CA3AF' : '#F59E0B'}
                  />
                  <Text
                    style={[
                      styles.statText,
                      lesson.isLocked && styles.lockedText,
                    ]}
                  >
                    {lesson.rating}
                  </Text>
                </View>

                <View style={styles.statItem}>
                  <Text
                    style={[
                      styles.statText,
                      lesson.isLocked && styles.lockedText,
                    ]}
                  >
                    {lesson.students} students
                  </Text>
                </View>
              </View>

              {lesson.progress > 0 && !lesson.isLocked && (
                <View style={styles.progressContainer}>
                  <View style={styles.progressBar}>
                    <View
                      style={[
                        styles.progressFill,
                        { width: `${lesson.progress}%` },
                      ]}
                    />
                  </View>
                  <Text style={styles.progressText}>
                    {lesson.progress}% complete
                  </Text>
                </View>
              )}

              {lesson.isLocked && lesson.xpRequired && (
                <View style={styles.lockedContainer}>
                  <Lock size={14} color="#9CA3AF" />
                  <Text style={styles.lockedRequirement}>
                    Requires {lesson.xpRequired} XP to unlock
                  </Text>
                </View>
              )}
            </View>

            {!lesson.isLocked && <ChevronRight size={20} color="#9CA3AF" />}
          </TouchableOpacity>
        ))}
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    color: theme.colors.text.primary,
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: theme.colors.text.secondary,
    marginTop: 4,
  },
  featuredCard: {
    marginHorizontal: 20,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  featuredGradient: {
    padding: 20,
  },
  featuredContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featuredIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  featuredInfo: {
    flex: 1,
  },
  featuredTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: theme.colors.text.inverse,
    marginBottom: 4,
  },
  featuredDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 12,
    lineHeight: 20,
  },
  featuredButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  featuredButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: theme.colors.text.inverse,
    marginRight: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  searchBar: {
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#FFF',
  paddingHorizontal: 12, // reduce horizontal padding
  height: 44,            // set fixed height
  borderRadius: 10,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.05,
  shadowRadius: 3,
  elevation: 1,
},
  searchInput: {
  flex: 1,
  marginLeft: 8,
  fontSize: 15,
  fontFamily: 'Inter-Regular',
  color: '#111827',
  paddingVertical: 0, // optional: removes internal height padding
},
  filterButton: {
  width: 44,
  height: 44,
  backgroundColor: '#FFF',
  borderRadius: 10,
  alignItems: 'center',
  justifyContent: 'center',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.05,
  shadowRadius: 3,
  elevation: 1,
},
  categoriesContainer: {
  marginBottom: 0,
  paddingVertical: 0,
  height: undefined, // or remove if previously set
},
categoriesContent: {
  paddingHorizontal: 20,
  alignItems: 'center', // vertically center the square chips
},
 categoryChip: {
  width: 90,
  height: 60,
  borderRadius: 12, // make it square-ish with rounded corners
  backgroundColor: '#FFF',
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: 12,
  borderWidth: 1,
  borderColor: '#E5E7EB',
},

categoryChipActive: {
  backgroundColor: '#6366F1',
  borderColor: '#6366F1',
},

categoryText: {
  fontSize: 12,
  fontFamily: 'Inter-Medium',
  color: '#6B7280',
  textAlign: 'center',
},

categoryTextActive: {
  color: '#FFF',
},
  lessonsContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 0,
    marginTop: 0,
  },
  lessonCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  lessonCardLocked: {
    opacity: 0.6,
  },
  lessonThumbnail: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 16,
  },
  lessonContent: {
    flex: 1,
  },
  lessonHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  lessonTitleContainer: {
    flex: 1,
    marginRight: 12,
  },
  lessonTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#111827',
    marginBottom: 4,
  },
  lessonMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lessonCategory: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginLeft: 6,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  lockedBadge: {
    backgroundColor: '#9CA3AF',
  },
  difficultyText: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
    color: '#FFF',
  },
  lessonDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 12,
    lineHeight: 20,
  },
  lessonStats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  statText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginLeft: 4,
  },
  lockedText: {
    color: '#9CA3AF',
  },
  progressContainer: {
    marginTop: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6366F1',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 10,
    fontFamily: 'Inter-Medium',
    color: '#6366F1',
  },
  lockedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  lockedRequirement: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#9CA3AF',
    marginLeft: 6,
  },
});
