export const config = {
  app: {
    name: 'MathEdu Pro',
    version: '1.0.0',
    description: 'Comprehensive Mathematics Education Platform',
  },
  api: {
    baseUrl: process.env.EXPO_PUBLIC_API_URL || 'https://api.mathedu.com',
    timeout: 10000,
  },
  features: {
    voiceInput: true,
    latexSupport: true,
    offlineMode: true,
    analytics: true,
  },
  limits: {
    maxQuizDuration: 180, // minutes
    maxQuestionsPerQuiz: 50,
    maxStudentsPerCourse: 100,
    maxCoursesPerTeacher: 20,
  },
  xp: {
    quizCompletion: 10,
    perfectScore: 25,
    dailyStreak: 5,
    courseCompletion: 100,
  },
} as const;
