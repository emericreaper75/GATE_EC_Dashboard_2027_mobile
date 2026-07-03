import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useStore } from '../store';
import BottomSheet from './BottomSheet';
import { MasterySlider } from './MasterySlider';
import { COLORS } from '../styles/colors';
import { SPACING } from '../styles/spacing';
import { TYPOGRAPHY } from '../styles/typography';
import { masteryColor, pct } from '../utils/helpers';
import NotesComponent from './NotesComponent';

export default function SubjectMasteryModal({ visible, onClose, subject }) {
  const { topics, updateTopic, notes, addNote, updateNote } = useStore();
  
  // Local state for topics so we get smooth live updates
  const [localTopics, setLocalTopics] = useState({});
  const [overall, setOverall] = useState(0);
  const [subjectNotes, setSubjectNotes] = useState('');
  const [noteId, setNoteId] = useState(null);

  // When modal opens or global mastery changes, sync local state
  useEffect(() => {
    if (!visible || !subject) return;
    const subjectTopics = topics.filter(t => t.subject === subject) || [];
    const topicsMap = {};
    subjectTopics.forEach(t => {
      topicsMap[t.id] = t;
    });
    setLocalTopics(topicsMap);

    const existingNote = notes.find(n => n.type === 'SubjectNote' && n.subject === subject);
    if (existingNote) {
      setSubjectNotes(existingNote.content || '');
      setNoteId(existingNote.id);
    } else {
      setSubjectNotes('');
      setNoteId(null);
    }
  }, [visible, subject, topics, notes]);

  // Recalculate overall when localTopics changes
  useEffect(() => {
    const values = Object.values(localTopics).map(t => t.mastery);
    const avg = values.length ? Math.round(values.reduce((a,b) => a+b, 0) / values.length) : 0;
    setOverall(avg);
  }, [localTopics]);

  const handleLiveChange = (id, value) => {
    setLocalTopics(prev => ({
      ...prev,
      [id]: { ...prev[id], mastery: value }
    }));
  };

  const handleSaveChange = (id, value) => {
    updateTopic(id, {
      mastery: value,
      lastUpdated: new Date().toISOString().split('T')[0],
    });
  };

  const handleClose = () => {
    if (subjectNotes.trim() !== '') {
      if (noteId) {
        updateNote(noteId, { content: subjectNotes, lastUpdated: new Date().toISOString() });
      } else {
        addNote({ type: 'SubjectNote', subject: subject, content: subjectNotes, date: new Date().toISOString() });
      }
    } else if (noteId && subjectNotes.trim() === '') {
      updateNote(noteId, { content: '', lastUpdated: new Date().toISOString() });
    }
    onClose();
  };

  if (!visible) return null;

  return (
    <BottomSheet
      visible={visible}
      onClose={handleClose}
      title={`${subject} Mastery`}
    >
      {/* Overall Score */}
      <View style={styles.overallCard}>
        <Text style={styles.overallLabel}>Overall Mastery</Text>
        <View style={styles.overallScoreRow}>
          <Text style={[styles.overallScore, { color: masteryColor(overall) }]}>
            {pct(overall)}
          </Text>
          <View style={styles.overallBar}>
            <View 
              style={[
                styles.overallBarFill,
                { 
                  width: `${overall}%`,
                  backgroundColor: masteryColor(overall)
                }
              ]}
            />
          </View>
        </View>
      </View>

      {/* Topics List with Sliders */}
      <Text style={styles.topicsTitle}>Topics</Text>
      
      <ScrollView 
        style={styles.topicsContainer}
        showsVerticalScrollIndicator={false}
      >
        {Object.values(localTopics).map((topic) => (
          <View key={topic.id} style={styles.topicSliderContainer}>
            <View style={styles.topicHeader}>
              <Text style={styles.topicName}>{topic.topic}</Text>
              <Text style={[styles.topicScore, { color: masteryColor(topic.mastery) }]}>
                {pct(topic.mastery)}
              </Text>
            </View>
            
            <MasterySlider
              value={topic.mastery}
              onValueChange={(val) => handleLiveChange(topic.id, val)}
              onSlidingComplete={(val) => handleSaveChange(topic.id, val)}
            />
          </View>
        ))}
        
        <View style={styles.notesSection}>
          <Text style={styles.notesTitle}>Study Notes</Text>
          <NotesComponent
            initialNotes={subjectNotes}
            onNotesChange={setSubjectNotes}
            placeholder="Topic-specific tips, weak areas, revision points..."
          />
        </View>

        {/* Padding for scrolling past bottom */}
        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Action Buttons */}
      <TouchableOpacity 
        style={styles.saveButton}
        onPress={handleClose}
      >
        <Text style={styles.saveButtonText}>Done</Text>
      </TouchableOpacity>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  overallCard: {
    backgroundColor: COLORS.bg.secondary,
    borderRadius: 10,
    padding: 14,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.accent.primary
  },
  overallLabel: {
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.text.secondary,
    marginBottom: 8
  },
  overallScoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  overallScore: {
    fontSize: TYPOGRAPHY.sizes.xl,
    fontWeight: TYPOGRAPHY.weights.bold,
    minWidth: 50
  },
  overallBar: {
    flex: 1,
    height: 8,
    backgroundColor: COLORS.border,
    borderRadius: 4,
    overflow: 'hidden'
  },
  overallBarFill: {
    height: '100%',
    borderRadius: 4
  },
  topicsTitle: {
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.text.primary,
    marginBottom: 12
  },
  topicsContainer: {
    maxHeight: 400,
    marginBottom: 16
  },
  topicSliderContainer: {
    backgroundColor: COLORS.bg.secondary,
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    borderWidth: 0.5,
    borderColor: COLORS.border
  },
  topicHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  topicName: {
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.text.primary,
    flex: 1
  },
  topicScore: {
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.bold,
    minWidth: 35,
    textAlign: 'right'
  },
  saveButton: {
    backgroundColor: COLORS.accent.primary,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginBottom: 8
  },
  saveButtonText: {
    color: COLORS.text.primary,
    fontWeight: TYPOGRAPHY.weights.semibold,
    fontSize: TYPOGRAPHY.sizes.md
  },
  notesSection: {
    marginTop: SPACING.md,
    marginBottom: SPACING.lg
  },
  notesTitle: {
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.text.primary,
    marginBottom: SPACING.xs
  }
});
