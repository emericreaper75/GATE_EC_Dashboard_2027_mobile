import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { useStore } from '../store';
import { ProgressBar } from '../components/ProgressBar';
import SubjectMasteryModal from '../components/SubjectMasteryModal';
import { COLORS } from '../styles/colors';
import { SPACING } from '../styles/spacing';
import { TYPOGRAPHY } from '../styles/typography';
import { SUBJECTS } from '../utils/constants';
import { masteryColor, pct } from '../utils/helpers';

/**
 * Calculate average mastery for a subject.
 * Defensive: returns 0 for invalid inputs, clamps value to [0, 100].
 */
const calculateSubjectAverage = (subject, masteryArray) => {
  if (!masteryArray || !Array.isArray(masteryArray)) return 0;
  if (!subject || typeof subject !== 'string') return 0;
  
  const topics = masteryArray.filter((m) => m.subject === subject);
  if (!topics.length) return 0;
  
  const sum = topics.reduce((acc, m) => {
    const val = m.mastery ?? 0;
    // Defensive guard: ensure mastery is within bounds
    if (typeof val !== 'number' || val < 0 || val > 100) {
      return acc + Math.max(0, Math.min(100, val || 0));
    }
    return acc + val;
  }, 0);
  
  const avg = Math.round(sum / topics.length);
  // Final bounds check
  const finalAvg = Math.max(0, Math.min(100, avg));
  
  return finalAvg;
};

/**
 * Memoized subject card component.
 * Prevents unnecessary re-renders and eliminates closure issues.
 */
const SubjectCard = React.memo(function SubjectCard({ 
  subject, 
  average, 
  showWeak, 
  masteryData,
  onPress 
}) {
  // Calculate topics dynamically but only when needed (within render)
  const topics = masteryData.filter((m) => m.subject === subject);
  const filtered = showWeak ? topics.filter((t) => t.mastery < 60) : topics;
  
  // Skip rendering if filter hides this card
  if (showWeak && filtered.length === 0) return null;
  
  // Defensive: verify and clamp average value
  const displayAvg = Math.max(0, Math.min(100, average ?? 0));

  const color = masteryColor(displayAvg);

  return (
    <TouchableOpacity 
      style={styles.subjectCard}
      onPress={() => onPress(subject)}
      activeOpacity={0.7}
    >
      <View style={styles.subjectHeader}>
        <Text style={styles.subjectName}>{subject}</Text>
        <Text style={[styles.subjectScore, { color }]}>
          {pct(displayAvg)}
        </Text>
      </View>
      
      <View style={styles.masteryBar}>
        <View 
          style={[
            styles.masteryBarFill,
            { width: `${displayAvg}%`, backgroundColor: color }
          ]}
        />
      </View>
      
      <Text style={styles.tapHint}>Tap to adjust topics</Text>
    </TouchableOpacity>
  );
});

export default React.memo(function SubjectTrackerScreen() {
  const { topics } = useStore();
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [sortBy, setSortBy] = useState('name');
  const [showWeak, setShowWeak] = useState(false);

  // Memoize average calculations with stable dependencies
  const subjectAverages = useMemo(() => {
    const averages = {};
    SUBJECTS.forEach((subject) => {
      averages[subject] = calculateSubjectAverage(subject, topics);
    });
    return averages;
  }, [topics]);

  // Sort subjects based on averages or name
  const sorted = useMemo(() => {
    const sorted = [...SUBJECTS];
    if (sortBy === 'mastery') {
      sorted.sort((a, b) => (subjectAverages[b] ?? 0) - (subjectAverages[a] ?? 0));
    } else {
      sorted.sort((a, b) => a.localeCompare(b));
    }
    return sorted;
  }, [sortBy, subjectAverages]);

  const handleSortBy = useCallback((s) => setSortBy(s), []);
  const toggleShowWeak = useCallback(() => setShowWeak((prev) => !prev), []);

  const handleSubjectTap = useCallback((subject) => {
    setSelectedSubject(subject);
    setShowModal(true);
  }, []);

  const renderSubject = useCallback(({ item: subject }) => {
    // Defensive: verify subject is valid
    if (!subject || typeof subject !== 'string') {
      return null;
    }
    
    const average = subjectAverages[subject] ?? 0;
    
    return (
      <SubjectCard
        subject={subject}
        average={average}
        showWeak={showWeak}
        masteryData={topics}
        onPress={handleSubjectTap}
      />
    );
  }, [subjectAverages, showWeak, topics, handleSubjectTap]);

  return (
    <View style={styles.container}>
      {/* Controls */}
      <View style={styles.controls}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {['name', 'mastery'].map((s) => (
            <TouchableOpacity key={s} onPress={() => handleSortBy(s)} style={[styles.chip, sortBy === s && styles.chipActive]}>
              <Text style={[styles.chipText, sortBy === s && styles.chipTextActive]}>Sort: {s}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity onPress={toggleShowWeak} style={[styles.chip, showWeak && styles.chipDanger]}>
            <Text style={[styles.chipText, showWeak && styles.chipTextDanger]}>⚠ Weak only</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <FlatList
        data={sorted}
        keyExtractor={(item, index) => `subject_${index}_${item}`}
        renderItem={renderSubject}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        // Optimize rendering
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={50}
      />

      {/* Modal for mastery adjustment */}
      <SubjectMasteryModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        subject={selectedSubject}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg.primary },
  controls: { paddingHorizontal: SPACING.base, paddingVertical: SPACING.sm, backgroundColor: COLORS.bg.elevated, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  chip: { paddingHorizontal: SPACING.md, paddingVertical: SPACING.xs, borderRadius: 99, backgroundColor: COLORS.bg.secondary, borderWidth: 1, borderColor: COLORS.border, marginRight: SPACING.xs },
  chipActive: { backgroundColor: COLORS.accent.primary, borderColor: COLORS.accent.primary },
  chipDanger: { backgroundColor: 'rgba(239,68,68,0.15)', borderColor: COLORS.accent.danger },
  chipText: { fontSize: TYPOGRAPHY.sizes.xs, color: COLORS.text.secondary },
  chipTextActive: { color: COLORS.text.primary, fontWeight: TYPOGRAPHY.weights.semibold },
  chipTextDanger: { color: COLORS.accent.danger, fontWeight: TYPOGRAPHY.weights.semibold },
  content: { padding: SPACING.base, paddingBottom: 120 },
  subjectCard: {
    backgroundColor: COLORS.bg.secondary,
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    borderWidth: 0.5,
    borderColor: COLORS.border
  },
  subjectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  subjectName: {
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.text.primary,
    flex: 1
  },
  subjectScore: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.bold,
    minWidth: 40,
    textAlign: 'right'
  },
  masteryBar: {
    height: 6,
    backgroundColor: COLORS.border,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 6
  },
  masteryBarFill: {
    height: '100%',
    borderRadius: 3
  },
  tapHint: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.text.muted,
    fontStyle: 'italic'
  }
});
