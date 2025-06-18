import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Mic, MicOff, Volume2 } from 'lucide-react-native';
import { theme } from '@/constants/theme';

interface VoiceInputProps {
  onTranscript?: (text: string) => void;
  onPlayback?: (text: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function VoiceInput({
  onTranscript,
  onPlayback,
  placeholder = 'Tap to speak',
  disabled = false,
}: VoiceInputProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [transcript, setTranscript] = useState('');

  const startRecording = () => {
    if (Platform.OS === 'web') {
      // Web implementation would use Web Speech API
      console.log('Voice recording not available on web platform');
      return;
    }

    setIsRecording(true);
    // Native implementation would use expo-speech or react-native-voice
    // For now, simulate recording
    setTimeout(() => {
      const mockTranscript = 'This is a mock voice transcript';
      setTranscript(mockTranscript);
      setIsRecording(false);
      onTranscript?.(mockTranscript);
    }, 2000);
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  const playText = (text: string) => {
    if (Platform.OS === 'web') {
      // Web Speech Synthesis API
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.onstart = () => setIsPlaying(true);
        utterance.onend = () => setIsPlaying(false);
        speechSynthesis.speak(utterance);
      }
    } else {
      // Native implementation would use expo-speech
      setIsPlaying(true);
      setTimeout(() => setIsPlaying(false), 2000);
    }
    onPlayback?.(text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TouchableOpacity
          style={[
            styles.micButton,
            isRecording && styles.micButtonActive,
            disabled && styles.micButtonDisabled,
          ]}
          onPress={isRecording ? stopRecording : startRecording}
          disabled={disabled}
        >
          {isRecording ? (
            <MicOff size={24} color={theme.colors.text.inverse} />
          ) : (
            <Mic
              size={24}
              color={
                disabled ? theme.colors.text.light : theme.colors.text.inverse
              }
            />
          )}
        </TouchableOpacity>

        <View style={styles.textContainer}>
          <Text
            style={[
              styles.transcriptText,
              !transcript && styles.placeholderText,
            ]}
          >
            {transcript || placeholder}
          </Text>
          {isRecording && (
            <View style={styles.recordingIndicator}>
              <View style={styles.recordingDot} />
              <Text style={styles.recordingText}>Recording...</Text>
            </View>
          )}
        </View>

        {transcript && (
          <TouchableOpacity
            style={[styles.playButton, isPlaying && styles.playButtonActive]}
            onPress={() => playText(transcript)}
          >
            <Volume2 size={20} color={theme.colors.primary} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: theme.spacing.md,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    gap: theme.spacing.md,
  },
  micButton: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  micButtonActive: {
    backgroundColor: theme.colors.error,
  },
  micButtonDisabled: {
    backgroundColor: theme.colors.text.light,
  },
  textContainer: {
    flex: 1,
  },
  transcriptText: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text.primary,
    lineHeight:
      theme.typography.lineHeight.base * theme.typography.fontSize.base,
  },
  placeholderText: {
    color: theme.colors.text.light,
    fontStyle: 'italic',
  },
  recordingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing.sm,
    gap: theme.spacing.sm,
  },
  recordingDot: {
    width: 8,
    height: 8,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.error,
  },
  recordingText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.error,
    fontWeight: '500',
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.full,
    backgroundColor: `${theme.colors.primary}15`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButtonActive: {
    backgroundColor: theme.colors.primary,
  },
});
