import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import {
  BookOpen,
  Users,
  Award,
  ClipboardList,
  FileText,
  PlusCircle,
} from 'lucide-react-native';
import { theme } from '@/constants/theme';

const { width } = Dimensions.get('window');

export default function TeacherEntryScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Welcome, Teacher!</Text>
        <Text style={styles.subtitle}>
          Manage your classes, assignments, quizzes, and track student progress.
        </Text>

        <Image
          source={{ uri: 'https://images.pexels.com/photos/521234/pexels-photo-521234.jpeg?auto=compress&cs=tinysrgb&w=800' }}
          style={styles.image}
        />

        <View style={styles.features}>
          <View style={styles.featureCard}>
            <Users size={32} color={theme.colors.primary} />
            <Text style={styles.featureText}>Manage Students</Text>
          </View>
          <View style={styles.featureCard}>
            <BookOpen size={32} color={theme.colors.secondary} />
            <Text style={styles.featureText}>Create Courses</Text>
          </View>
          <View style={styles.featureCard}>
            <ClipboardList size={32} color={theme.colors.accent} />
            <Text style={styles.featureText}>Assignments</Text>
          </View>
          <View style={styles.featureCard}>
            <FileText size={32} color={theme.colors.error} />
            <Text style={styles.featureText}>Quizzes</Text>
          </View>
          <View style={styles.featureCard}>
            <Award size={32} color={theme.colors.purple} />
            <Text style={styles.featureText}>Achievements</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.startButton}
          onPress={() => router.push('./teachers/app/index')}
        >
          <PlusCircle size={20} color={theme.colors.text.inverse} />
          <Text style={styles.startButtonText}>Enter Teacher Dashboard</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    padding: theme.spacing.xl,
    alignItems: 'center',
  },
  title: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  image: {
    width: width * 0.8,
    height: width * 0.5,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.xl,
  },
  features: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.xl,
  },
  featureCard: {
    width: (width - theme.spacing.xl * 2 - theme.spacing.md * 2) / 2,
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
    ...theme.shadows.sm,
  },
  featureText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.primary,
    marginTop: theme.spacing.sm,
    textAlign: 'center',
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.xl,
    borderRadius: theme.borderRadius.lg,
    gap: theme.spacing.sm,
  },
  startButtonText: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600',
    color: theme.colors.text.inverse,
  },
});
