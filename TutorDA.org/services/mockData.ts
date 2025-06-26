/**
 * Mock data service for development and testing
 */

import { User, Achievement, Lesson, Quiz } from '@/types';

export const mockUser: User = {
  id: '1',
  name: 'Alex Johnson',
  email: 'alex.johnson@email.com',
  avatar:
    'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
  level: 12,
  xp: 2450,
  joinDate: 'January 2024',
  streak: 7,
  completedLessons: 45,
  averageScore: 87,
  preferences: {
    notifications: {
      push: true,
      email: true,
      studyReminders: true,
      achievementAlerts: true,
      weeklyProgress: false,
    },
    theme: 'auto',
    language: 'English',
    soundEnabled: true,
    hapticFeedback: true,
  },
};

export const mockAchievements: Achievement[] = [
  {
    id: '1',
    title: 'First Steps',
    description: 'Complete your first lesson',
    icon: '🎯',
    category: 'Learning',
    points: 50,
    isUnlocked: true,
    unlockedDate: '2024-01-15',
    rarity: 'Common',
    progress: 100,
  },
  {
    id: '2',
    title: 'Week Warrior',
    description: 'Maintain a 7-day learning streak',
    icon: '🔥',
    category: 'Streaks',
    points: 200,
    isUnlocked: true,
    unlockedDate: '2024-01-20',
    rarity: 'Rare',
    progress: 100,
  },
];

export const mockLessons: Lesson[] = [
  {
    id: '1',
    title: 'Introduction to Algebra',
    description:
      'Learn the fundamentals of algebraic expressions and equations',
    category: 'Algebra',
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
    category: 'Algebra',
    difficulty: 'Intermediate',
    duration: '25 min',
    progress: 75,
    rating: 4.9,
    students: 980,
    isLocked: false,
    thumbnail:
      'https://images.pexels.com/photos/6238050/pexels-photo-6238050.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2',
  },
];

/**
 * Simulates API delay for realistic testing
 */
export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Mock API functions
 */
export const mockApi = {
  async getUser(): Promise<User> {
    await delay(1000);
    return mockUser;
  },

  async updateUser(updates: Partial<User>): Promise<User> {
    await delay(800);
    return { ...mockUser, ...updates };
  },

  async getAchievements(): Promise<Achievement[]> {
    await delay(1200);
    return mockAchievements;
  },

  async getLessons(): Promise<Lesson[]> {
    await delay(1000);
    return mockLessons;
  },
};
