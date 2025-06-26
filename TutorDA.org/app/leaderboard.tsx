import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import {
  ArrowLeft,
  Trophy,
  Medal,
  Award,
  TrendingUp,
  Calendar,
  Users,
  Crown,
  Zap,
  Target,
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '@/constants/theme';

const { width } = Dimensions.get('window');

interface LeaderboardPlayer {
  id: string;
  name: string;
  avatar: string;
  xp: number;
  level: number;
  streak: number;
  rank: number;
  change: number; // Position change from last week
  badges: string[];
  isCurrentUser?: boolean;
}

export default function LeaderboardScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState('weekly');
  const [selectedCategory, setSelectedCategory] = useState('overall');

  const periods = [
    { id: 'daily', label: 'Today' },
    { id: 'weekly', label: 'This Week' },
    { id: 'monthly', label: 'This Month' },
    { id: 'alltime', label: 'All Time' },
  ];

  const categories = [
    { id: 'overall', label: 'Overall', icon: Trophy },
    { id: 'algebra', label: 'Algebra', icon: Target },
    { id: 'geometry', label: 'Geometry', icon: Award },
    { id: 'calculus', label: 'Calculus', icon: TrendingUp },
  ];

  const leaderboardData: LeaderboardPlayer[] = [
    {
      id: '1',
      name: 'Sarah Chen',
      avatar:
        'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      xp: 3450,
      level: 15,
      streak: 12,
      rank: 1,
      change: 0,
      badges: ['🏆', '🔥', '⚡'],
    },
    {
      id: '2',
      name: 'Alex Johnson',
      avatar:
        'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      xp: 3380,
      level: 14,
      streak: 8,
      rank: 2,
      change: 1,
      badges: ['🎯', '⭐', '🧮'],
      isCurrentUser: true,
    },
    {
      id: '3',
      name: 'Mike Johnson',
      avatar:
        'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      xp: 3290,
      level: 14,
      streak: 15,
      rank: 3,
      change: -1,
      badges: ['🔥', '📐', '💯'],
    },
    {
      id: '4',
      name: 'Emma Davis',
      avatar:
        'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      xp: 3150,
      level: 13,
      streak: 6,
      rank: 4,
      change: 2,
      badges: ['⚡', '🎓', '🌟'],
    },
    {
      id: '5',
      name: 'David Wilson',
      avatar:
        'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      xp: 3050,
      level: 13,
      streak: 4,
      rank: 5,
      change: -2,
      badges: ['🎯', '📊', '🏅'],
    },
  ];

  const topThree = leaderboardData.slice(0, 3);
  const restOfLeaderboard = leaderboardData.slice(3);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown size={24} color="#FFD700" />;
      case 2:
        return <Medal size={24} color="#C0C0C0" />;
      case 3:
        return <Award size={24} color="#CD7F32" />;
      default:
        return null;
    }
  };

const getRankColor = (rank: number): readonly [string, string] => {
  switch (rank) {
    case 1:
      return ['#FFD700', '#FFA500'] as const;
    case 2:
      return ['#C0C0C0', '#A0A0A0'] as const;
    case 3:
      return ['#CD7F32', '#B8860B'] as const;
    default:
      return [theme.colors.surface, theme.colors.borderLight] as const;
  }
};

  const getChangeIndicator = (change: number) => {
    if (change > 0) {
      return (
        <View style={[styles.changeIndicator, styles.changeUp]}>
          <Text style={styles.changeText}>+{change}</Text>
        </View>
      );
    } else if (change < 0) {
      return (
        <View style={[styles.changeIndicator, styles.changeDown]}>
          <Text style={styles.changeText}>{change}</Text>
        </View>
      );
    }
    return (
      <View style={[styles.changeIndicator, styles.changeNone]}>
        <Text style={styles.changeText}>-</Text>
      </View>
    );
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
        <Text style={styles.headerTitle}>Leaderboard</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Period Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
        contentContainerStyle={styles.filterContent}
      >
        {periods.map((period) => (
          <TouchableOpacity
            key={period.id}
            style={[
              styles.filterChip,
              selectedPeriod === period.id && styles.filterChipActive,
            ]}
            onPress={() => setSelectedPeriod(period.id)}
          >
            <Text
              style={[
                styles.filterText,
                selectedPeriod === period.id && styles.filterTextActive,
              ]}
            >
              {period.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Category Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryContainer}
        contentContainerStyle={styles.categoryContent}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryChip,
              selectedCategory === category.id && styles.categoryChipActive,
            ]}
            onPress={() => setSelectedCategory(category.id)}
          >
            <category.icon
              size={16}
              color={
                selectedCategory === category.id
                  ? theme.colors.text.inverse
                  : theme.colors.text.secondary
              }
            />
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category.id && styles.categoryTextActive,
              ]}
            >
              {category.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Top 3 Podium */}
        <View style={styles.podiumContainer}>
          <Text style={styles.podiumTitle}>Top Performers</Text>
          <View style={styles.podium}>
            {/* Second Place */}
            <View style={[styles.podiumPosition, styles.secondPlace]}>
              <LinearGradient
                colors={getRankColor(2)}
                style={styles.podiumCard}
              >
                <Image
                  source={{ uri: topThree[1]?.avatar }}
                  style={styles.podiumAvatar}
                />
                <View style={styles.podiumRank}>{getRankIcon(2)}</View>
                <Text style={styles.podiumName}>{topThree[1]?.name}</Text>
                <Text style={styles.podiumXP}>{topThree[1]?.xp} XP</Text>
                <View style={styles.podiumBadges}>
                  {topThree[1]?.badges.slice(0, 2).map((badge, index) => (
                    <Text key={index} style={styles.podiumBadge}>
                      {badge}
                    </Text>
                  ))}
                </View>
              </LinearGradient>
            </View>

            {/* First Place */}
            <View style={[styles.podiumPosition, styles.firstPlace]}>
              <LinearGradient
                colors={getRankColor(1)}
                style={styles.podiumCard}
              >
                <Image
                  source={{ uri: topThree[0]?.avatar }}
                  style={styles.podiumAvatar}
                />
                <View style={styles.podiumRank}>{getRankIcon(1)}</View>
                <Text style={styles.podiumName}>{topThree[0]?.name}</Text>
                <Text style={styles.podiumXP}>{topThree[0]?.xp} XP</Text>
                <View style={styles.podiumBadges}>
                  {topThree[0]?.badges.slice(0, 3).map((badge, index) => (
                    <Text key={index} style={styles.podiumBadge}>
                      {badge}
                    </Text>
                  ))}
                </View>
              </LinearGradient>
            </View>

            {/* Third Place */}
            <View style={[styles.podiumPosition, styles.thirdPlace]}>
              <LinearGradient
                colors={getRankColor(3)}
                style={styles.podiumCard}
              >
                <Image
                  source={{ uri: topThree[2]?.avatar }}
                  style={styles.podiumAvatar}
                />
                <View style={styles.podiumRank}>{getRankIcon(3)}</View>
                <Text style={styles.podiumName}>{topThree[2]?.name}</Text>
                <Text style={styles.podiumXP}>{topThree[2]?.xp} XP</Text>
                <View style={styles.podiumBadges}>
                  {topThree[2]?.badges.slice(0, 2).map((badge, index) => (
                    <Text key={index} style={styles.podiumBadge}>
                      {badge}
                    </Text>
                  ))}
                </View>
              </LinearGradient>
            </View>
          </View>
        </View>

        {/* Rest of Leaderboard */}
        <View style={styles.leaderboardList}>
          <Text style={styles.listTitle}>Rankings</Text>
          {restOfLeaderboard.map((player) => (
            <View
              key={player.id}
              style={[
                styles.playerCard,
                player.isCurrentUser && styles.currentUserCard,
              ]}
            >
              <View style={styles.playerRank}>
                <Text
                  style={[
                    styles.rankNumber,
                    player.isCurrentUser && styles.currentUserRank,
                  ]}
                >
                  {player.rank}
                </Text>
                {getChangeIndicator(player.change)}
              </View>

              <Image
                source={{ uri: player.avatar }}
                style={styles.playerAvatar}
              />

              <View style={styles.playerInfo}>
                <View style={styles.playerHeader}>
                  <Text
                    style={[
                      styles.playerName,
                      player.isCurrentUser && styles.currentUserName,
                    ]}
                  >
                    {player.name}
                    {player.isCurrentUser && ' (You)'}
                  </Text>
                  <View style={styles.playerLevel}>
                    <Text style={styles.levelText}>Lv.{player.level}</Text>
                  </View>
                </View>

                <View style={styles.playerStats}>
                  <View style={styles.statItem}>
                    <TrendingUp size={14} color={theme.colors.secondary} />
                    <Text style={styles.statText}>{player.xp} XP</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Zap size={14} color={theme.colors.accent} />
                    <Text style={styles.statText}>{player.streak} streak</Text>
                  </View>
                </View>

                <View style={styles.playerBadges}>
                  {player.badges.map((badge, index) => (
                    <Text key={index} style={styles.badgeEmoji}>
                      {badge}
                    </Text>
                  ))}
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Weekly Challenge Banner */}
        <View style={styles.challengeBanner}>
          <LinearGradient
            colors={[theme.colors.primary, theme.colors.secondary]}
            style={styles.bannerGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.bannerContent}>
              <View style={styles.bannerIcon}>
                <Trophy size={32} color={theme.colors.text.inverse} />
              </View>
              <View style={styles.bannerText}>
                <Text style={styles.bannerTitle}>Weekly Challenge</Text>
                <Text style={styles.bannerDescription}>
                  Climb the leaderboard and win exclusive rewards!
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.bannerButton}
              onPress={() => router.push('/daily-challenge')}
            >
              <Text style={styles.bannerButtonText}>Join Now</Text>
            </TouchableOpacity>
          </LinearGradient>
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
  },
  backButton: {
    padding: theme.spacing.sm,
  },
  headerTitle: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
  },
  placeholder: {
    width: 40,
  },
  filterContainer: {
    marginBottom: theme.spacing.md,
  },
  filterContent: {
    paddingHorizontal: theme.spacing.xl,
  },
  filterChip: {
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.full,
    marginRight: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  filterChipActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  filterText: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '600',
    color: theme.colors.text.secondary,
  },
  filterTextActive: {
    color: theme.colors.text.inverse,
  },
  categoryContainer: {
    marginBottom: theme.spacing.xl,
  },
  categoryContent: {
    paddingHorizontal: theme.spacing.xl,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.lg,
    marginRight: theme.spacing.md,
    gap: theme.spacing.xs,
  },
  categoryChipActive: {
    backgroundColor: theme.colors.primary,
  },
  categoryText: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '500',
    color: theme.colors.text.secondary,
  },
  categoryTextActive: {
    color: theme.colors.text.inverse,
  },
  content: {
    flex: 1,
  },
  podiumContainer: {
    paddingHorizontal: theme.spacing.xl,
    marginBottom: theme.spacing.xl,
  },
  podiumTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  podium: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: theme.spacing.md,
  },
  podiumPosition: {
    alignItems: 'center',
  },
  firstPlace: {
    marginBottom: 20,
  },
  secondPlace: {
    marginBottom: 10,
  },
  thirdPlace: {
    marginBottom: 0,
  },
  podiumCard: {
    width: (width - theme.spacing.xl * 2 - theme.spacing.md * 2) / 3,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.lg,
    alignItems: 'center',
    ...theme.shadows.lg,
  },
  podiumAvatar: {
    width: 60,
    height: 60,
    borderRadius: theme.borderRadius.full,
    marginBottom: theme.spacing.md,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  podiumRank: {
    position: 'absolute',
    top: -10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: theme.borderRadius.full,
    padding: theme.spacing.sm,
  },
  podiumName: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: 'bold',
    color: theme.colors.text.inverse,
    textAlign: 'center',
    marginBottom: theme.spacing.xs,
  },
  podiumXP: {
    fontSize: theme.typography.fontSize.xs,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: theme.spacing.sm,
  },
  podiumBadges: {
    flexDirection: 'row',
    gap: theme.spacing.xs,
  },
  podiumBadge: {
    fontSize: 16,
  },
  leaderboardList: {
    paddingHorizontal: theme.spacing.xl,
    marginBottom: theme.spacing.xl,
  },
  listTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.lg,
  },
  playerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    ...theme.shadows.sm,
  },
  currentUserCard: {
    borderWidth: 2,
    borderColor: theme.colors.primary,
    backgroundColor: `${theme.colors.primary}05`,
  },
  playerRank: {
    alignItems: 'center',
    marginRight: theme.spacing.lg,
    minWidth: 40,
  },
  rankNumber: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  currentUserRank: {
    color: theme.colors.primary,
  },
  changeIndicator: {
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.sm,
    minWidth: 20,
    alignItems: 'center',
  },
  changeUp: {
    backgroundColor: `${theme.colors.secondary}20`,
  },
  changeDown: {
    backgroundColor: `${theme.colors.error}20`,
  },
  changeNone: {
    backgroundColor: theme.colors.borderLight,
  },
  changeText: {
    fontSize: theme.typography.fontSize.xs,
    fontWeight: 'bold',
    color: theme.colors.text.secondary,
  },
  playerAvatar: {
    width: 50,
    height: 50,
    borderRadius: theme.borderRadius.full,
    marginRight: theme.spacing.lg,
  },
  playerInfo: {
    flex: 1,
  },
  playerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  playerName: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
  },
  currentUserName: {
    color: theme.colors.primary,
  },
  playerLevel: {
    backgroundColor: theme.colors.borderLight,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.md,
  },
  levelText: {
    fontSize: theme.typography.fontSize.xs,
    fontWeight: 'bold',
    color: theme.colors.text.secondary,
  },
  playerStats: {
    flexDirection: 'row',
    gap: theme.spacing.lg,
    marginBottom: theme.spacing.sm,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  statText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
    fontWeight: '500',
  },
  playerBadges: {
    flexDirection: 'row',
    gap: theme.spacing.xs,
  },
  badgeEmoji: {
    fontSize: 16,
  },
  challengeBanner: {
    marginHorizontal: theme.spacing.xl,
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
    marginBottom: theme.spacing.xl,
    ...theme.shadows.lg,
  },
  bannerGradient: {
    padding: theme.spacing.xl,
  },
  bannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  bannerIcon: {
    width: 60,
    height: 60,
    borderRadius: theme.borderRadius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.lg,
  },
  bannerText: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: 'bold',
    color: theme.colors.text.inverse,
    marginBottom: theme.spacing.xs,
  },
  bannerDescription: {
    fontSize: theme.typography.fontSize.base,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight:
      theme.typography.lineHeight.base * theme.typography.fontSize.base,
  },
  bannerButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  bannerButtonText: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: 'bold',
    color: theme.colors.text.inverse,
  },
});
