import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { useStore } from '../store';
import { Card, CardHeader, CardContent } from '../components/Card';
import { ProgressBar } from '../components/ProgressBar';
import { Badge } from '../components/Badge';
import { MasterySlider } from '../components/MasterySlider';
import { Button } from '../components/Button';
import { COLORS } from '../styles/colors';
import { SPACING } from '../styles/spacing';
import { TYPOGRAPHY } from '../styles/typography';
import { SUBJECTS } from '../utils/constants';
import { masteryColor, masteryLabel, pct } from '../utils/helpers';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default React.memo(function SubjectTrackerScreen() {
  const { mastery, updateMastery } = useStore();
  const [expanded, setExpanded] = useState(null);
  const [showWeak, setShowWeak] = useState(false);
  const [sortBy, setSortBy] = useState('name');

  const getAvg = useCallback((sub) => {
    const topics = mastery.filter((m) => m.subject === sub);
    if (!topics.length) return 0;
    return Math.round(topics.reduce((a, m) => a + m.mastery, 0) / topics.length);
  }, [mastery]);

  const sorted = useMemo(() => [...SUBJECTS].sort((a, b) =>
    sortBy === 'mastery' ? getAvg(b) - getAvg(a) : a.localeCompare(b)
  ), [sortBy, getAvg]);

  const handleSortBy = useCallback((s) => setSortBy(s), []);
  const toggleShowWeak = useCallback(() => setShowWeak((prev) => !prev), []);
  const handleToggleExpand = useCallback((subject) => setExpanded((prev) => prev === subject ? null : subject), []);

  const handleUpdateMastery = useCallback((id, val) => {
    updateMastery(id, {
      mastery: val,
      lastUpdated: new Date().toISOString().split('T')[0],
    });
  }, [updateMastery]);

  const renderSubject = useCallback(({ item: subject }) => {
    const avg = getAvg(subject);
    const topics = mastery.filter((m) => m.subject === subject);
    const filtered = showWeak ? topics.filter((t) => t.mastery < 60) : topics;
    if (showWeak && filtered.length === 0) return null;
    const isExpanded = expanded === subject;

    return (
      <View style={styles.subjectCard}>
        <TouchableOpacity
          style={[styles.subjectHeader, isExpanded && styles.subjectHeaderExpanded]}
          onPress={() => handleToggleExpand(subject)}
          activeOpacity={0.8}
        >
          <View style={styles.subjectLeft}>
            <MaterialCommunityIcons
              name={isExpanded ? 'chevron-up' : 'chevron-down'}
              size={18} color={COLORS.text.muted}
            />
            <Text style={styles.subjectName}>{subject}</Text>
          </View>
          <View style={styles.subjectRight}>
            <ProgressBar value={avg} height={5} style={{ width: 80, marginRight: SPACING.sm }} />
            <Text style={[styles.subjectPct, { color: masteryColor(avg) }]}>{pct(avg)}</Text>
          </View>
        </TouchableOpacity>

        {isExpanded && (
          <View style={styles.topicList}>
            {filtered.map((topic) => (
              <View key={topic.id} style={styles.topicRow}>
                <View style={styles.topicInfo}>
                  <Text style={styles.topicName}>{topic.topic}</Text>
                  <Text style={styles.topicMeta}>
                    {masteryLabel(topic.mastery)} · Last: {topic.lastUpdated || 'Never'}
                  </Text>
                </View>
                <View style={{ flex: 1, maxWidth: 160 }}>
                  <MasterySlider
                    value={topic.mastery}
                    onSlidingComplete={(val) => handleUpdateMastery(topic.id, val)}
                  />
                </View>
              </View>
            ))}
          </View>
        )}
      </View>
    );
  }, [getAvg, mastery, showWeak, expanded, handleToggleExpand, handleUpdateMastery]);

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
        keyExtractor={(item) => item}
        renderItem={renderSubject}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={50}
        removeClippedSubviews={true}
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
  subjectCard: { backgroundColor: COLORS.bg.secondary, borderRadius: 10, borderWidth: 1, borderColor: COLORS.border, marginBottom: SPACING.sm, overflow: 'hidden' },
  subjectHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: SPACING.md },
  subjectHeaderExpanded: { borderBottomWidth: 1, borderBottomColor: COLORS.border, backgroundColor: COLORS.bg.elevated },
  subjectLeft: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm, flex: 1 },
  subjectName: { fontSize: TYPOGRAPHY.sizes.md, fontWeight: TYPOGRAPHY.weights.semibold, color: COLORS.text.primary, flex: 1 },
  subjectRight: { flexDirection: 'row', alignItems: 'center' },
  subjectPct: { fontSize: TYPOGRAPHY.sizes.sm, fontWeight: TYPOGRAPHY.weights.bold, width: 40, textAlign: 'right' },
  topicList: { padding: SPACING.md },
  topicRow: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md, paddingVertical: SPACING.sm, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  topicInfo: { flex: 1 },
  topicName: { fontSize: TYPOGRAPHY.sizes.sm, color: COLORS.text.primary, fontWeight: TYPOGRAPHY.weights.medium },
  topicMeta: { fontSize: TYPOGRAPHY.sizes.xs, color: COLORS.text.muted, marginTop: 2 },
});
