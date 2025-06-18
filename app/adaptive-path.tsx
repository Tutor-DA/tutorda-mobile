import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import {
  ArrowLeft,
  Brain,
  Target,
  TrendingUp,
  BookOpen,
  CircleCheck as CheckCircle,
  Lock,
  Star,
  Clock,
  Zap,
  Award,
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '@/constants/theme';

const { width } = Dimensions.get('window');

interface LearningNode {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: string;
  xpReward: number;
  status: 'completed' | 'current' | 'locked' | 'available';
  prerequisites: string[];
  position: { x: number; y: number };
}

export default function AdaptivePathScreen() {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const learningNodes: LearningNode[] = [
    {
      id: '1',
      title: 'Basic Arithmetic',
      description: 'Master addition, subtraction, multiplication, and division',
      difficulty: 'Beginner',
      estimatedTime: '2 weeks',
      xpReward: 100,
      status: 'completed',
      prerequisites: [],
      position: { x: 0.5, y: 0.1 },
    },
    {
      id: '2',
      title: 'Fractions & Decimals',
      description: 'Understanding parts of a whole and decimal notation',
      difficulty: 'Beginner',
      estimatedTime: '1 week',
      xpReward: 150,
      status: 'completed',
      prerequisites: ['1'],
      position: { x: 0.2, y: 0.25 },
    },
    {
      id: '3',
      title: 'Introduction to Algebra',
      description: 'Variables, expressions, and basic equations',
      difficulty: 'Intermediate',
      estimatedTime: '3 weeks',
      xpReward: 200,
      status: 'current',
      prerequisites: ['1'],
      position: { x: 0.8, y: 0.25 },
    },
    {
      id: '4',
      title: 'Linear Equations',
      description: 'Solving equations with one variable',
      difficulty: 'Intermediate',
      estimatedTime: '2 weeks',
      xpReward: 180,
      status: 'available',
      prerequisites: ['3'],
      position: { x: 0.8, y: 0.4 },
    },
    {
      id: '5',
      title: 'Geometry Basics',
      description: 'Shapes, angles, and basic geometric principles',
      difficulty: 'Intermediate',
      estimatedTime: '2 weeks',
      xpReward: 170,
      status: 'available',
      prerequisites: ['2'],
      position: { x: 0.2, y: 0.4 },
    },
    {
      id: '6',
      title: 'Quadratic Equations',
      description: 'Solving second-degree polynomial equations',
      difficulty: 'Advanced',
      estimatedTime: '3 weeks',
      xpReward: 250,
      status: 'locked',
      prerequisites: ['4'],
      position: { x: 0.8, y: 0.55 },
    },
    {
      id: '7',
      title: 'Trigonometry',
      description: 'Sine, cosine, tangent, and their applications',
      difficulty: 'Advanced',
      estimatedTime: '4 weeks',
      xpReward: 300,
      status: 'locked',
      prerequisites: ['5'],
      position: { x: 0.2, y: 0.55 },
    },
    {
      id: '8',
      title: 'Calculus Fundamentals',
      description: 'Limits, derivatives, and basic integration',
      difficulty: 'Advanced',
      estimatedTime: '6 weeks',
      xpReward: 400,
      status: 'locked',
      prerequisites: ['6', '7'],
      position: { x: 0.5, y: 0.7 },
    },
  ];

  const getNodeColor = (status: string) => {
    switch (status) {
      case 'completed':
        return ['#10B981', '#059669'];
      case 'current':
        return ['#6366F1', '#4F46E5'];
      case 'available':
        return ['#F59E0B', '#D97706'];
      case 'locked':
        return ['#9CA3AF', '#6B7280'];
      default:
        return ['#9CA3AF', '#6B7280'];
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return CheckCircle;
      case 'current':
        return Target;
      case 'available':
        return BookOpen;
      case 'locked':
        return Lock;
      default:
        return Lock;
    }
  };

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

  const renderConnectionLines = () => {
    const lines = [];
    learningNodes.forEach((node) => {
      node.prerequisites.forEach((prereqId) => {
        const prereq = learningNodes.find((n) => n.id === prereqId);
        if (prereq) {
          const startX = prereq.position.x * (width - 80) + 40;
          const startY = prereq.position.y * 400 + 60;
          const endX = node.position.x * (width - 80) + 40;
          const endY = node.position.y * 400 + 60;

          lines.push(
            <View
              key={`${prereqId}-${node.id}`}
              style={[
                styles.connectionLine,
                {
                  left: startX,
                  top: startY,
                  width: Math.sqrt(
                    Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2),
                  ),
                  transform: [
                    {
                      rotate: `${Math.atan2(endY - startY, endX - startX)}rad`,
                    },
                  ],
                },
              ]}
            />,
          );
        }
      });
    });
    return lines;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={theme.colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Adaptive Learning Path</Text>
        <View style={styles.brainIcon}>
          <Brain size={24} color={theme.colors.primary} />
        </View>
      </View>

      {/* Progress Overview */}
      <Animated.View style={[styles.progressOverview, { opacity: fadeAnim }]}>
        <LinearGradient
          colors={['#6366F1', '#8B5CF6']}
          style={styles.progressGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.progressContent}>
            <View style={styles.progressStats}>
              <View style={styles.progressStat}>
                <Text style={styles.progressValue}>3/8</Text>
                <Text style={styles.progressLabel}>Completed</Text>
              </View>
              <View style={styles.progressStat}>
                <Text style={styles.progressValue}>650</Text>
                <Text style={styles.progressLabel}>XP Earned</Text>
              </View>
              <View style={styles.progressStat}>
                <Text style={styles.progressValue}>37%</Text>
                <Text style={styles.progressLabel}>Progress</Text>
              </View>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '37%' }]} />
            </View>
          </View>
        </LinearGradient>
      </Animated.View>

      {/* Learning Path Visualization */}
      <ScrollView
        style={styles.pathContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.pathVisualization}>
          {renderConnectionLines()}

          {learningNodes.map((node) => {
            const StatusIcon = getStatusIcon(node.status);
            return (
              <TouchableOpacity
                key={node.id}
                style={[
                  styles.learningNode,
                  {
                    left: node.position.x * (width - 80),
                    top: node.position.y * 400,
                  },
                  selectedNode === node.id && styles.selectedNode,
                ]}
                onPress={() =>
                  setSelectedNode(selectedNode === node.id ? null : node.id)
                }
                disabled={node.status === 'locked'}
              >
                <LinearGradient
                  colors={getNodeColor(node.status)}
                  style={styles.nodeGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <StatusIcon size={24} color={theme.colors.text.inverse} />
                </LinearGradient>

                <View
                  style={[
                    styles.difficultyBadge,
                    { backgroundColor: getDifficultyColor(node.difficulty) },
                  ]}
                >
                  <Text style={styles.difficultyText}>
                    {node.difficulty.charAt(0)}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Node Details */}
        {selectedNode && (
          <Animated.View style={[styles.nodeDetails, { opacity: fadeAnim }]}>
            {(() => {
              const node = learningNodes.find((n) => n.id === selectedNode);
              if (!node) return null;

              return (
                <View style={styles.detailsCard}>
                  <View style={styles.detailsHeader}>
                    <Text style={styles.detailsTitle}>{node.title}</Text>
                    <View
                      style={[
                        styles.statusBadge,
                        { backgroundColor: getNodeColor(node.status)[0] },
                      ]}
                    >
                      <Text style={styles.statusText}>{node.status}</Text>
                    </View>
                  </View>

                  <Text style={styles.detailsDescription}>
                    {node.description}
                  </Text>

                  <View style={styles.detailsStats}>
                    <View style={styles.detailsStat}>
                      <Clock size={16} color={theme.colors.text.secondary} />
                      <Text style={styles.detailsStatText}>
                        {node.estimatedTime}
                      </Text>
                    </View>
                    <View style={styles.detailsStat}>
                      <Star size={16} color={theme.colors.accent} />
                      <Text style={styles.detailsStatText}>
                        {node.xpReward} XP
                      </Text>
                    </View>
                    <View style={styles.detailsStat}>
                      <TrendingUp
                        size={16}
                        color={getDifficultyColor(node.difficulty)}
                      />
                      <Text style={styles.detailsStatText}>
                        {node.difficulty}
                      </Text>
                    </View>
                  </View>

                  {node.status !== 'locked' && (
                    <TouchableOpacity
                      style={styles.startButton}
                      onPress={() => router.push(`/lesson/${node.id}`)}
                    >
                      <LinearGradient
                        colors={getNodeColor(node.status)}
                        style={styles.startGradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                      >
                        <Text style={styles.startButtonText}>
                          {node.status === 'current'
                            ? 'Continue'
                            : node.status === 'completed'
                              ? 'Review'
                              : 'Start'}
                        </Text>
                        <Zap size={20} color={theme.colors.text.inverse} />
                      </LinearGradient>
                    </TouchableOpacity>
                  )}

                  {node.status === 'locked' && (
                    <View style={styles.lockedInfo}>
                      <Lock size={16} color={theme.colors.text.light} />
                      <Text style={styles.lockedText}>
                        Complete prerequisites to unlock
                      </Text>
                    </View>
                  )}
                </View>
              );
            })()}
          </Animated.View>
        )}

        {/* Recommendations */}
        <View style={styles.recommendationsSection}>
          <Text style={styles.recommendationsTitle}>AI Recommendations</Text>

          <View style={styles.recommendationCard}>
            <View style={styles.recommendationIcon}>
              <Brain size={24} color={theme.colors.primary} />
            </View>
            <View style={styles.recommendationContent}>
              <Text style={styles.recommendationText}>
                Based on your performance, focus on algebra fundamentals before
                moving to advanced topics.
              </Text>
              <Text style={styles.recommendationAction}>
                Spend 15 minutes daily on practice problems
              </Text>
            </View>
          </View>

          <View style={styles.recommendationCard}>
            <View style={styles.recommendationIcon}>
              <Award size={24} color={theme.colors.secondary} />
            </View>
            <View style={styles.recommendationContent}>
              <Text style={styles.recommendationText}>
                You're excelling at visual learning! Try the geometry path next.
              </Text>
              <Text style={styles.recommendationAction}>
                Unlock geometry basics for bonus XP
              </Text>
            </View>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  backButton: {
    padding: theme.spacing.sm,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: theme.colors.text.primary,
  },
  brainIcon: {
    padding: theme.spacing.sm,
  },
  progressOverview: {
    marginHorizontal: theme.spacing.xl,
    marginVertical: theme.spacing.lg,
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  progressGradient: {
    padding: theme.spacing.xl,
  },
  progressContent: {
    alignItems: 'center',
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: theme.spacing.lg,
  },
  progressStat: {
    alignItems: 'center',
  },
  progressValue: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: theme.colors.text.inverse,
  },
  progressLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.colors.text.inverse,
    borderRadius: 4,
  },
  pathContainer: {
    flex: 1,
  },
  pathVisualization: {
    height: 500,
    position: 'relative',
    marginHorizontal: theme.spacing.xl,
    marginVertical: theme.spacing.lg,
  },
  connectionLine: {
    position: 'absolute',
    height: 2,
    backgroundColor: theme.colors.border,
    transformOrigin: '0 50%',
  },
  learningNode: {
    position: 'absolute',
    width: 80,
    height: 80,
  },
  selectedNode: {
    transform: [{ scale: 1.1 }],
  },
  nodeGradient: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  difficultyBadge: {
    position: 'absolute',
    top: -4,
    right: 4,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: theme.colors.background,
  },
  difficultyText: {
    fontSize: 10,
    fontFamily: 'Inter-Bold',
    color: theme.colors.text.inverse,
  },
  nodeDetails: {
    marginHorizontal: theme.spacing.xl,
    marginVertical: theme.spacing.lg,
  },
  detailsCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  detailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  detailsTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: theme.colors.text.primary,
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.md,
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: theme.colors.text.inverse,
    textTransform: 'capitalize',
  },
  detailsDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.lg,
    lineHeight: 20,
  },
  detailsStats: {
    flexDirection: 'row',
    gap: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  detailsStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  detailsStatText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: theme.colors.text.secondary,
  },
  startButton: {
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
  },
  startGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  startButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: theme.colors.text.inverse,
  },
  lockedInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.surfaceLight,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    gap: theme.spacing.sm,
  },
  lockedText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: theme.colors.text.light,
  },
  recommendationsSection: {
    marginHorizontal: theme.spacing.xl,
    marginVertical: theme.spacing.xl,
  },
  recommendationsTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.lg,
  },
  recommendationCard: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  recommendationIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: `${theme.colors.primary}15`,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.lg,
  },
  recommendationContent: {
    flex: 1,
  },
  recommendationText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
    lineHeight: 20,
  },
  recommendationAction: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: theme.colors.primary,
  },
});
