export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'student' | 'teacher';
  xp?: number;
  level?: number;
  streak?: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  studentCount: number;
  avgXP: number;
  color: string;
  progress?: number;
  teacherId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  courseId: string;
  questionCount: number;
  duration: number; // in minutes
  difficulty: 'easy' | 'medium' | 'hard';
  status: 'draft' | 'published' | 'archived';
  createdAt: string;
  updatedAt: string;
  attempts?: number;
  avgScore?: number;
}

export interface Question {
  id: string;
  type:
    | 'multiple-choice'
    | 'true-false'
    | 'fill-blank'
    | 'essay'
    | 'math-expression';
  content: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
  points: number;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
}

export interface Student {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  xp: number;
  level: number;
  streak: number;
  coursesEnrolled: string[];
  lastActive: string;
  totalQuizzes: number;
  avgScore: number;
}

export interface QuizAttempt {
  id: string;
  studentId: string;
  quizId: string;
  score: number;
  totalPoints: number;
  timeSpent: number; // in seconds
  completedAt: string;
  answers: Record<string, any>;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  type: 'xp' | 'streak' | 'quiz' | 'course';
  requirement: number;
  points: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  courses: string[];
  estimatedDuration: number; // in hours
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  prerequisites: string[];
}
