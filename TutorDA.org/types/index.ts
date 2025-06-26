/**
 * Common type definitions for the TutorDA Math App
 */

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  level: number;
  xp: number;
  joinDate: string;
  streak: number;
  completedLessons: number;
  averageScore: number;
  preferences: UserPreferences;
}

export interface UserPreferences {
  notifications: NotificationSettings;
  theme: 'light' | 'dark' | 'auto';
  language: string;
  soundEnabled: boolean;
  hapticFeedback: boolean;
}

export interface NotificationSettings {
  push: boolean;
  email: boolean;
  studyReminders: boolean;
  achievementAlerts: boolean;
  weeklyProgress: boolean;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  points: number;
  isUnlocked: boolean;
  unlockedDate?: string;
  rarity?: string;
  progress?: number;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  progress: number;
  rating: number;
  students: number;
  isLocked: boolean;
  thumbnail: string;
}

export interface Quiz {
  id: string;
  title: string;
  subject: string;
  totalQuestions: number;
  timeLimit: number;
  questions: Question[];
}

export interface Question {
  id: string;
  question: string;
  options: QuestionOption[];
}

export interface QuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
}
