import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Users, Clock, Play, X, CheckCircle } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const participants = [
  { id: '1', name: 'Alice', status: 'joined' },
  { id: '2', name: 'Bob', status: 'joined' },
  { id: '3', name: 'Charlie', status: 'joined' },
];

export default function ActiveLiveQuizScreen() {
  const handleEndQuiz = () => {
    // Add logic to end the quiz and notify participants
    router.replace('/practice'); // Navigate back to practice or dashboard
  };

  const handleStartQuiz = () => {
    // Add logic to start the quiz
    alert('Quiz started!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Live Quiz: Algebra Challenge</Text>

      <View style={styles.quizInfo}>
        <View style={styles.infoItem}>
          <Users size={16} color="#6B7280" />
          <Text style={styles.infoText}>
            {participants.length} participants
          </Text>
        </View>
        <View style={styles.infoItem}>
          <Clock size={16} color="#6B7280" />
          <Text style={styles.infoText}>Duration: 15 min</Text>
        </View>
      </View>

      <Text style={styles.subHeader}>Participants</Text>
      <FlatList
        data={participants}
        keyExtractor={(item) => item.id}
        style={styles.participantList}
        renderItem={({ item }) => (
          <View style={styles.participantItem}>
            <Text style={styles.participantName}>{item.name}</Text>
            <CheckCircle size={16} color="#10B981" />
          </View>
        )}
      />

      <View style={styles.buttonRow}>
        <TouchableOpacity onPress={handleStartQuiz} style={styles.flexButton}>
          <LinearGradient
            colors={['#10B981', '#059669']}
            style={styles.button}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Play size={18} color="#FFF" />
            <Text style={styles.buttonText}>Start Quiz</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleEndQuiz} style={styles.flexButton}>
          <LinearGradient
            colors={['#EF4444', '#DC2626']}
            style={styles.button}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <X size={18} color="#FFF" />
            <Text style={styles.buttonText}>End Quiz</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },
  quizInfo: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  infoText: {
    fontSize: 12,
    color: '#6B7280',
  },
  subHeader: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  participantList: {
    marginBottom: 24,
  },
  participantItem: {
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  participantName: {
    fontSize: 14,
    color: '#111827',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  flexButton: {
    flex: 1,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 6,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFF',
  },
});
