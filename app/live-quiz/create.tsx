import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function CreateLiveQuizScreen() {
  const [title, setTitle] = useState('');
  const [questionCount, setQuestionCount] = useState('');

  const handleCreate = () => {
    if (!title || !questionCount) {
      Alert.alert('Missing Info', 'Please fill out all fields.');
      return;
    }

    // You can add logic to create a live quiz in your backend here.
    Alert.alert(
      'Live Quiz Created',
      `Title: ${title}, Questions: ${questionCount}`,
    );
    router.push('/live-quiz/active'); // Navigate to active live quiz
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Create Live Quiz</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Quiz Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter quiz title"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Number of Questions</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter number of questions"
          value={questionCount}
          onChangeText={setQuestionCount}
          keyboardType="numeric"
        />

        <TouchableOpacity onPress={handleCreate}>
          <LinearGradient
            colors={['#6366F1', '#8B5CF6']}
            style={styles.button}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.buttonText}>Create Quiz</Text>
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 24,
  },
  form: {
    gap: 16,
  },
  label: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  button: {
    marginTop: 24,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
