import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { router } from 'expo-router';

export default function DashboardScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Dashboard</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Your Progress</Text>
        <Text>Completed: 8 / 10 courses</Text>
        <Text>Quizzes passed: 15</Text>
        <Text>Achievements: 5 badges</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Recent Activity</Text>
        <Text>- Completed "Integration Basics" quiz</Text>
        <Text>- Viewed "Differentiation Lecture 3"</Text>
        <Text>- Earned "Math Master" badge</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="View All Courses"
          onPress={() => router.push('/courses')}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Go to Profile" onPress={() => router.push('/profile')} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Back to Home" onPress={() => router.replace('/home')} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    width: '90%',
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  buttonContainer: {
    marginVertical: 8,
    width: '80%',
  },
});
