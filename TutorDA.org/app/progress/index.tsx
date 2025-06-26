import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import ProgressChart from './components/ProgressChart';
import StatCard from './components/StatCard';
import BadgeCard from './components/BadgeCard';

export default function ProgressScreen() {
  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>
        Your Learning Progress
      </Text>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 16,
        }}
      >
        <StatCard title="Lessons" value="12" />
        <StatCard title="Quizzes" value="5" />
        <StatCard title="Score Avg." value="82%" />
      </View>

      <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 8 }}>
        Weekly Activity
      </Text>
      <ProgressChart />

      <Text style={{ fontSize: 18, fontWeight: '600', marginVertical: 12 }}>
        Achievements
      </Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
        <BadgeCard title="Starter" />
        <BadgeCard title="Quiz Champion" />
        <BadgeCard title="Fast Learner" />
      </View>

      <View
        style={{
          marginTop: 24,
          padding: 16,
          backgroundColor: '#E0F2FE',
          borderRadius: 8,
        }}
      >
        <Text style={{ fontSize: 16 }}>
          🎯 You're just 3 lessons away from unlocking the "Consistency Badge"!
          Keep it up!
        </Text>
      </View>
    </ScrollView>
  );
}
