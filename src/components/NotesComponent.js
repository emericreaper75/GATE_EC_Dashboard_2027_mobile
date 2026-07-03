import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import * as Speech from 'expo-speech';
import { COLORS } from '../styles/colors';

export default function NotesComponent({ 
  initialNotes = '', 
  onNotesChange,
  placeholder = 'Add notes here...'
}) {
  const [notes, setNotes] = useState(initialNotes);
  const [isRecording, setIsRecording] = useState(false);

  const handleNotesChange = (text) => {
    setNotes(text);
    onNotesChange(text);
  };

  const startVoiceRecord = async () => {
    try {
      // Check if speech available (isAvailableAsync doesn't actually exist in expo-speech, but user asked for it, we'll try catching if it fails or simulate)
      // Actually Expo Speech is for Text-to-Speech. But the user wrote "transcribe to text via Expo Speech". Wait, expo-speech is for text-to-speech. Voice recognition usually requires other libs. But I will strictly follow the provided implementation snippet since it just shows an alert for now.
      setIsRecording(true);
      
      Alert.alert(
        'Voice Note',
        'Hold the button to record. This feature requires react-native-voice.',
        [
          { text: 'OK', onPress: () => setIsRecording(false) }
        ]
      );
    } catch (error) {
      console.error('Voice error:', error);
      setIsRecording(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>Notes</Text>
        <TouchableOpacity 
          style={[styles.voiceButton, isRecording && styles.voiceButtonActive]}
          onPress={startVoiceRecord}
        >
          <Text style={styles.voiceButtonText}>
            {isRecording ? '🔴 Recording' : '🎤 Voice'}
          </Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.notesInput}
        multiline
        numberOfLines={4}
        placeholder={placeholder}
        placeholderTextColor={COLORS.text.muted}
        value={notes}
        onChangeText={handleNotesChange}
        scrollEnabled={true}
      />

      {notes ? (
        <View style={styles.charCount}>
          <Text style={styles.charCountText}>{notes.length} characters</Text>
        </View>
      ) : null}

      {/* Quick action buttons */}
      <View style={styles.quickActions}>
        <TouchableOpacity 
          style={styles.quickActionButton}
          onPress={() => handleNotesChange(notes + (notes ? '\n' : '') + '✓ What I learned: ')}
        >
          <Text style={styles.quickActionText}>+ Learning</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.quickActionButton}
          onPress={() => handleNotesChange(notes + (notes ? '\n' : '') + '✗ What I missed: ')}
        >
          <Text style={styles.quickActionText}>+ Mistake</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.quickActionButton}
          onPress={() => handleNotesChange('')}
        >
          <Text style={styles.quickActionText}>Clear</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 12
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.text.secondary,
    textTransform: 'uppercase'
  },
  voiceButton: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: COLORS.bg.secondary,
    borderWidth: 1,
    borderColor: COLORS.border
  },
  voiceButtonActive: {
    backgroundColor: COLORS.accent.danger,
    borderColor: COLORS.accent.danger
  },
  voiceButtonText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.text.primary
  },
  notesInput: {
    backgroundColor: COLORS.bg.secondary,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 12,
    color: COLORS.text.primary,
    fontSize: 13,
    fontFamily: 'Menlo',
    minHeight: 80,
    maxHeight: 200,
    textAlignVertical: 'top'
  },
  charCount: {
    alignItems: 'flex-end',
    marginTop: 4
  },
  charCountText: {
    fontSize: 11,
    color: COLORS.text.muted
  },
  quickActions: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 8
  },
  quickActionButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: COLORS.bg.secondary,
    borderWidth: 0.5,
    borderColor: COLORS.border,
    alignItems: 'center'
  },
  quickActionText: {
    fontSize: 11,
    fontWeight: '500',
    color: COLORS.text.secondary
  }
});
