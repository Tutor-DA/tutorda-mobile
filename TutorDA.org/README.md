<<<<<<< HEAD
# TutorDA.org - Math Learning App

A comprehensive React Native application built with Expo for interactive math learning and practice.

## 🚀 Features

- **Interactive Learning**: Structured lessons with step-by-step guidance
- **Practice Quizzes**: Timed quizzes with immediate feedback
- **Achievement System**: Gamified learning with badges and streaks
- **Progress Tracking**: Detailed analytics and performance metrics
- **Offline Support**: Learn even without internet connection
- **Responsive Design**: Optimized for both mobile and web platforms

## 📱 Screenshots

_Screenshots will be added here_

## 🛠 Tech Stack

- **Framework**: React Native with Expo SDK 53
- **Navigation**: Expo Router v4.1
- **Language**: TypeScript
- **Styling**: StyleSheet (React Native)
- **Icons**: Lucide React Native
- **Fonts**: Google Fonts (Inter, Poppins)
- **Gradients**: Expo Linear Gradient
- **Animations**: React Native Reanimated v3

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18.18.2 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/tutorda-math-app.git
cd tutorda-math-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```env
EXPO_PUBLIC_API_URL=https://api.tutorda.org
EXPO_PUBLIC_API_KEY=your_api_key_here
EXPO_PUBLIC_APP_ENV=development
```

### 4. Start the development server

```bash
npm run dev
```

### 5. Open the app

- **Web**: Open [http://localhost:3000](http://localhost:3000) in your browser
- **Mobile**: Use the Expo Go app to scan the QR code
- **iOS Simulator**: Press `i` in the terminal
- **Android Emulator**: Press `a` in the terminal

## 📁 Project Structure

```
tutorda-math-app/
├── app/                    # App routes (Expo Router)
│   ├── (tabs)/            # Tab navigation screens
│   ├── lesson/            # Lesson screens
│   ├── quiz/              # Quiz screens
│   ├── learn.tsx          # Learn page
│   ├── practice.tsx       # Practice page
│   ├── achievements.tsx   # Achievements page
│   ├── profile.tsx        # Profile page
│   ├── settings.tsx       # Settings page
│   ├── account.tsx        # Account details page
│   ├── notifications.tsx  # Notifications page
│   └── _layout.tsx        # Root layout
├── components/            # Reusable components
│   ├── ErrorBoundary.tsx
│   ├── LoadingSpinner.tsx
│   ├── LessonProgress.tsx
│   ├── QuestionCard.tsx
│   ├── ScreenLayout.tsx
│   ├── XPProgressBar.tsx
│   ├── LessonCard.tsx
│   ├── AnimatedTabIcon.tsx
│   └── TabBarBadge.tsx
├── hooks/                 # Custom React hooks
│   ├── useFrameworkReady.ts
│   ├── useOfflineSupport.ts
│   └── useTabPreloader.ts
├── services/              # API and data services
│   ├── api.ts
│   └── mockData.ts
├── types/                 # TypeScript type definitions
│   ├── index.ts
│   └── env.d.ts
├── constants/             # Theme and constants
│   └── theme.ts
├── utils/                 # Utility functions
│   └── accessibility.ts
├── assets/                # Static assets
└── package.json
```

## 🎯 Key Features

### Learning System

- **Structured Lessons**: Progressive learning with clear objectives
- **Interactive Content**: Engaging explanations with examples
- **Progress Tracking**: Real-time progress monitoring
- **XP System**: Gamified experience points and leveling

### Assessment System

- **Timed Quizzes**: Various difficulty levels and time constraints
- **Instant Feedback**: Immediate results with explanations
- **Performance Analytics**: Detailed score tracking and improvement suggestions

### Gamification

- **Achievement System**: Unlock badges and rewards
- **Streak Tracking**: Maintain daily learning streaks
- **Leaderboards**: Compete with other learners
- **XP Progress**: Visual progress tracking with animated bars

### User Experience

- **Responsive Design**: Works seamlessly on all devices
- **Mobile-First**: Optimized for mobile with responsive breakpoints
- **Smooth Animations**: Enhanced with React Native Reanimated
- **Accessibility**: Screen reader and keyboard navigation support

## 🔧 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Start development server for web
npm run dev:web

# Start development server with tunnel
npm run dev:tunnel

# Build for web
npm run build:web

# Run linting
npm run lint

# Run on Android
npm run android

# Run on iOS
npm run ios
```

### Code Style

This project follows strict TypeScript and React Native best practices:

- **TypeScript**: Strict mode enabled with comprehensive type definitions
- **ESLint**: Code quality and consistency enforcement
- **Prettier**: Automatic code formatting
- **Component Structure**: Functional components with hooks
- **Error Handling**: Comprehensive error boundaries and loading states

### Testing

```bash
# Run unit tests
npm test

# Run tests in watch mode
npm test -- --watch

# Generate coverage report
npm test -- --coverage
```

## 📱 Mobile Development

### Expo Go Preview

1. Install Expo Go on your mobile device
2. Run `npm run dev`
3. Scan the QR code with Expo Go (Android) or Camera app (iOS)

### Emulator Setup

**Android Emulator:**

```bash
# Install Android Studio and set up AVD
npm run android
```

**iOS Simulator (macOS only):**

```bash
# Install Xcode
npm run ios
```

### Recommended Device Sizes for Testing

- **iPhone SE (375x667)** - Small screen testing
- **iPhone 14 (390x844)** - Standard iPhone
- **iPhone 14 Pro Max (428x926)** - Large iPhone
- **iPad (768x1024)** - Tablet testing
- **Pixel 4 (353x745)** - Android testing

### Metro Cache Clearing

If you encounter issues:

```bash
# Clear Metro cache
npx expo start --clear

# Clear npm cache
npm cache clean --force

# Reset project
rm -rf node_modules package-lock.json
npm install
```

## 🌐 Deployment

### Web Deployment

```bash
# Build for production
npm run build:web

# Deploy to your hosting provider
# (Netlify, Vercel, etc.)
```

### Mobile Deployment

```bash
# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android

# Submit to app stores
eas submit
```

## 📚 API Documentation

The app uses a RESTful API for data management. Key endpoints include:

- `GET /api/user` - Get user profile
- `PUT /api/user` - Update user information
- `GET /api/lessons` - Get available lessons
- `GET /api/quizzes` - Get quiz data
- `POST /api/progress` - Update learning progress

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Write comprehensive tests for new features
- Update documentation for API changes
- Ensure responsive design compatibility
- Test on both iOS and Android platforms

## 🐛 Troubleshooting

### Common Issues

**Metro bundler issues:**

```bash
npx expo start --clear
```

**Font loading problems:**

```bash
npx expo install expo-font @expo-google-fonts/inter @expo-google-fonts/poppins
```

**TypeScript errors:**

```bash
npx tsc --noEmit
```

### Platform-Specific Issues

**Web platform:**

- Ensure web-compatible APIs are used
- Check for platform-specific code with `Platform.select()`

**Mobile platforms:**

- Verify permissions in app.json
- Test on physical devices for accurate performance

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Development Team**: TutorDA.org
- **Design**: UI/UX Team
- **Product Management**: Product Team

## 📞 Support

For support and questions:

- **Email**: support@tutorda.org
- **Documentation**: [docs.tutorda.org](https://docs.tutorda.org)
- **Issues**: [GitHub Issues](https://github.com/your-username/tutorda-math-app/issues)

## 🔄 Changelog

### v1.0.0 (2024-01-15)

- Updated to Expo SDK 53
- Enhanced React Native Reanimated v3 animations
- Improved accessibility features
- Mobile-optimized responsive design
- Centralized theme system
- Core learning features
- Quiz system implementation
- User profile management
- Achievement system

---

**Built with ❤️ by the TutorDA.org team**
=======
# tutorda-mobile
>>>>>>> 9a35400e18c102612219b739405a63b6192d4d6e
