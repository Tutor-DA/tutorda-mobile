import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Trophy,
  Star,
  Target,
  Zap,
  Award,
  Calendar,
  TrendingUp,
  BookOpen,
  Clock,
  Medal,
} from 'lucide-react-native';
import { ColorValue } from 'react-native';

export default function AchievementsScreen() {
  const [selectedTab, setSelectedTab] = useState('All');

  const tabs = ['All', 'Recent', 'Learning', 'Streaks', 'Challenges'];

  const userStats = {
    totalAchievements: 24,
    totalPoints: 3450,
    currentStreak: 7,
    longestStreak: 15,
    level: 12,
    rank: 'Gold Scholar',
  };

  const achievements = [
    {
      id: 1,
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
      id: 2,
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
    {
      id: 3,
      title: 'Algebra Master',
      description: 'Complete all algebra lessons with 90%+ score',
      icon: '🧮',
      category: 'Learning',
      points: 500,
      isUnlocked: true,
      unlockedDate: '2024-01-25',
      rarity: 'Epic',
      progress: 100,
    },
    {
      id: 4,
      title: 'Speed Demon',
      description: 'Complete 10 quizzes in under 5 minutes each',
      icon: '⚡',
      category: 'Challenges',
      points: 300,
      isUnlocked: true,
      unlockedDate: '2024-01-28',
      rarity: 'Rare',
      progress: 100,
    },
    {
      id: 5,
      title: 'Perfect Score',
      description: 'Get 100% on any quiz',
      icon: '⭐',
      category: 'Challenges',
      points: 150,
      isUnlocked: true,
      unlockedDate: '2024-01-30',
      rarity: 'Uncommon',
      progress: 100,
    },
    {
      id: 6,
      title: 'Geometry Guru',
      description: 'Master all geometry concepts',
      icon: '📐',
      category: 'Learning',
      points: 400,
      isUnlocked: false,
      progress: 75,
      requirement: 'Complete 15/20 geometry lessons',
    },
    {
      id: 7,
      title: 'Marathon Learner',
      description: 'Study for 30 days straight',
      icon: '🏃',
      category: 'Streaks',
      points: 1000,
      isUnlocked: false,
      progress: 23,
      requirement: '7/30 days completed',
    },
    {
      id: 8,
      title: 'Quiz Champion',
      description: 'Complete 100 practice quizzes',
      icon: '🏆',
      category: 'Challenges',
      points: 750,
      isUnlocked: false,
      progress: 45,
      requirement: '45/100 quizzes completed',
    },
  ];

  const filteredAchievements = achievements.filter((achievement) => {
    if (selectedTab === 'All') return true;
    if (selectedTab === 'Recent')
      return (
        achievement.isUnlocked &&
        new Date(achievement.unlockedDate || '') >
          new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      );
    return achievement.category === selectedTab;
  });

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common':
        return '#6B7280';
      case 'Uncommon':
        return '#10B981';
      case 'Rare':
        return '#3B82F6';
      case 'Epic':
        return '#8B5CF6';
      case 'Legendary':
        return '#F59E0B';
      default:
        return '#6B7280';
    }
  };

  const getRarityGradient = (rarity: string): [ColorValue, ColorValue] => {
  switch (rarity) {
    case 'Common':
      return ['#6B7280', '#4B5563'];
    case 'Uncommon':
      return ['#10B981', '#059669'];
    case 'Rare':
      return ['#3B82F6', '#2563EB'];
    case 'Epic':
      return ['#8B5CF6', '#7C3AED'];
    case 'Legendary':
      return ['#F59E0B', '#D97706'];
    default:
      return ['#6B7280', '#4B5563'];
  }
};

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Achievements</Text>
        <Text style={styles.headerSubtitle}>
          Track your learning milestones
        </Text>
      </View>

      {/* Stats Overview */}
      <LinearGradient
        colors={['#6366F1', '#8B5CF6']}
        style={styles.statsCard}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.statsHeader}>
          <View>
            <Text style={styles.rankText}>{userStats.rank}</Text>
            <Text style={styles.levelText}>Level {userStats.level}</Text>
          </View>
          <View style={styles.trophyIcon}>
            <Trophy size={32} color="#FFF" />
          </View>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Award size={20} color="#FFF" />
            <Text style={styles.statValue}>{userStats.totalAchievements}</Text>
            <Text style={styles.statLabel}>Achievements</Text>
          </View>
          <View style={styles.statItem}>
            <Star size={20} color="#FFF" />
            <Text style={styles.statValue}>{userStats.totalPoints}</Text>
            <Text style={styles.statLabel}>Points</Text>
          </View>
          <View style={styles.statItem}>
            <Zap size={20} color="#FFF" />
            <Text style={styles.statValue}>{userStats.currentStreak}</Text>
            <Text style={styles.statLabel}>Current Streak</Text>
          </View>
          <View style={styles.statItem}>
            <TrendingUp size={20} color="#FFF" />
            <Text style={styles.statValue}>{userStats.longestStreak}</Text>
            <Text style={styles.statLabel}>Best Streak</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Category Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabsContainer}
        contentContainerStyle={styles.tabsContent}
      >
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, selectedTab === tab && styles.tabActive]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === tab && styles.tabTextActive,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Achievements List */}
      <View style={styles.achievementsList}>
        {filteredAchievements.map((achievement) => (
          <View key={achievement.id} style={styles.achievementCard}>
            {achievement.isUnlocked ? (
              <LinearGradient
                colors={getRarityGradient(achievement.rarity || 'Common')}
                style={styles.achievementIcon}
              >
                <Text style={styles.achievementEmoji}>{achievement.icon}</Text>
              </LinearGradient>
            ) : (
              <View style={[styles.achievementIcon, styles.lockedIcon]}>
                <Text style={styles.lockedEmoji}>{achievement.icon}</Text>
              </View>
            )}

            <View style={styles.achievementContent}>
              <View style={styles.achievementHeader}>
                <Text
                  style={[
                    styles.achievementTitle,
                    !achievement.isUnlocked && styles.lockedText,
                  ]}
                >
                  {achievement.title}
                </Text>
                {achievement.isUnlocked && achievement.rarity && (
                  <View
                    style={[
                      styles.rarityBadge,
                      { backgroundColor: getRarityColor(achievement.rarity) },
                    ]}
                  >
                    <Text style={styles.rarityText}>{achievement.rarity}</Text>
                  </View>
                )}
              </View>

              <Text
                style={[
                  styles.achievementDescription,
                  !achievement.isUnlocked && styles.lockedText,
                ]}
              >
                {achievement.description}
              </Text>

              {achievement.isUnlocked ? (
                <View style={styles.achievementMeta}>
                  <View style={styles.metaItem}>
                    <Star size={14} color="#F59E0B" />
                    <Text style={styles.metaText}>
                      {achievement.points} points
                    </Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Calendar size={14} color="#6B7280" />
                    <Text style={styles.metaText}>
                      {new Date(
                        achievement.unlockedDate || '',
                      ).toLocaleDateString()}
                    </Text>
                  </View>
                </View>
              ) : (
                <View style={styles.progressContainer}>
                  <View style={styles.progressHeader}>
                    <Text style={styles.progressText}>
                      {achievement.progress}% Complete
                    </Text>
                    <Text style={styles.requirementText}>
                      {achievement.requirement}
                    </Text>
                  </View>
                  <View style={styles.progressBar}>
                    <View
                      style={[
                        styles.progressFill,
                        { width: `${achievement.progress}%` },
                      ]}
                    />
                  </View>
                </View>
              )}
            </View>

            {achievement.isUnlocked && (
              <View style={styles.unlockedBadge}>
                <Medal size={16} color="#10B981" />
              </View>
            )}
          </View>
        ))}
      </View>

      {/* Upcoming Achievements Preview */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Coming Soon</Text>
        <Text style={styles.sectionSubtitle}>
          Keep learning to unlock these achievements
        </Text>

        <View style={styles.upcomingGrid}>
          <View style={styles.upcomingCard}>
            <Text style={styles.upcomingEmoji}>🎓</Text>
            <Text style={styles.upcomingTitle}>Scholar</Text>
            <Text style={styles.upcomingDescription}>Complete 50 lessons</Text>
          </View>

          <View style={styles.upcomingCard}>
            <Text style={styles.upcomingEmoji}>🚀</Text>
            <Text style={styles.upcomingTitle}>Rocket Learner</Text>
            <Text style={styles.upcomingDescription}>Reach level 20</Text>
          </View>
        </View>
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
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
  },
  headerSubtitle: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#6B7280',
    marginTop: 4,
  },
  statsCard: {
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
  },
  statsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  rankText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  levelText: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#E0E7FF',
    marginTop: 4,
  },
  trophyIcon: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 12,
    borderRadius: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: 'normal',
    color: '#E0E7FF',
    marginTop: 4,
  },
  tabsContainer: {
    marginBottom: 24,
  },
  tabsContent: {
    paddingHorizontal: 20,
  },
  tab: {
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  tabActive: {
    backgroundColor: '#6366F1',
    borderColor: '#6366F1',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  tabTextActive: {
    color: '#FFF',
  },
  achievementsList: {
    paddingHorizontal: 20,
  },
  achievementCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  achievementIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  lockedIcon: {
    backgroundColor: '#E5E7EB',
  },
  achievementEmoji: {
    fontSize: 24,
  },
  lockedEmoji: {
    fontSize: 24,
    opacity: 0.5,
  },
  achievementContent: {
    flex: 1,
  },
  achievementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
  },
  lockedText: {
    color: '#9CA3AF',
  },
  rarityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  rarityText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFF',
  },
  achievementDescription: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#6B7280',
    marginBottom: 8,
    lineHeight: 20,
  },
  achievementMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  metaText: {
    fontSize: 12,
    fontWeight: 'normal',
    color: '#6B7280',
    marginLeft: 4,
  },
  progressContainer: {
    marginTop: 4,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6366F1',
  },
  requirementText: {
    fontSize: 10,
    fontWeight: 'normal',
    color: '#9CA3AF',
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6366F1',
    borderRadius: 2,
  },
  unlockedBadge: {
    marginLeft: 12,
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 32,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#6B7280',
    marginBottom: 16,
  },
  upcomingGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  upcomingCard: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
  },
  upcomingEmoji: {
    fontSize: 32,
    marginBottom: 8,
    opacity: 0.5,
  },
  upcomingTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#9CA3AF',
    marginBottom: 4,
  },
  upcomingDescription: {
    fontSize: 12,
    fontWeight: 'normal',
    color: '#9CA3AF',
    textAlign: 'center',
  },
});
