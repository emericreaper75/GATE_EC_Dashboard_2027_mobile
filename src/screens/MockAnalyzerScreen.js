import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { useStore } from '../store';
import { Modal } from '../components/Modal';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { EmptyState } from '../components/EmptyState';
import { COLORS } from '../styles/colors';
import { SPACING } from '../styles/spacing';
import { TYPOGRAPHY } from '../styles/typography';
import { SUBJECTS } from '../utils/constants';
import { getTodayStr, formatDate } from '../utils/helpers';

export default React.memo(function MockAnalyzerScreen() {
  const { mocks, addMock, deleteMock } = useStore();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    type: 'Full', source: '', overallScore: '', totalAttempted: '',
    correct: '', wrong: '', unattempted: '', timeTaken: '180', notes: '',
  });

  const today = getTodayStr();

  const { avgScore, best } = useMemo(() => {
    const avg = mocks.length > 0
      ? Math.round(mocks.reduce((a, m) => a + m.overallScore, 0) / mocks.length)
      : 0;
    const bst = mocks.length > 0 ? Math.max(...mocks.map((m) => m.overallScore)) : 0;
    return { avgScore: avg, best: bst };
  }, [mocks]);

  const reversedMocks = useMemo(() => [...mocks].reverse(), [mocks]);

  const handleAdd = useCallback(() => {
    if (!form.overallScore) return;
    addMock({
      date: today,
      type: form.type,
      source: form.source,
      overallScore: parseFloat(form.overallScore) || 0,
      totalAttempted: parseInt(form.totalAttempted) || 0,
      correct: parseInt(form.correct) || 0,
      wrong: parseInt(form.wrong) || 0,
      unattempted: parseInt(form.unattempted) || 0,
      timeTaken: parseInt(form.timeTaken) || 180,
      notes: form.notes,
      subjects: {},
      errorTypes: { concept: 0, formula: 0, time: 0, silly: 0 },
    });
    setForm({ type: 'Full', source: '', overallScore: '', totalAttempted: '', correct: '', wrong: '', unattempted: '', timeTaken: '180', notes: '' });
    setShowModal(false);
  }, [form, addMock, today]);

  const handleDelete = useCallback((id) => {
    deleteMock(id);
  }, [deleteMock]);

  const renderItem = useCallback(({ item }) => {
    const accuracy = item.totalAttempted > 0 ? Math.round((item.correct / item.totalAttempted) * 100) : 0;
    return (
      <View style={styles.mockCard}>
        <View style={styles.mockTop}>
          <View>
            <Text style={styles.mockScore}>{item.overallScore}</Text>
            <Text style={styles.mockScoreLabel}>/ 100</Text>
          </View>
          <View style={styles.mockInfo}>
            <Text style={styles.mockType}>{item.type} Mock</Text>
            {item.source ? <Text style={styles.mockSource}>{item.source}</Text> : null}
            <Text style={styles.mockDate}>{formatDate(item.date)}</Text>
          </View>
          <TouchableOpacity onPress={() => handleDelete(item.id)}>
            <Text style={styles.deleteBtn}>✕</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.mockStats}>
          <MiniStat label="Correct" value={item.correct} color={COLORS.accent.success} />
          <MiniStat label="Wrong" value={item.wrong} color={COLORS.accent.danger} />
          <MiniStat label="Skip" value={item.unattempted} color={COLORS.text.muted} />
          <MiniStat label="Accuracy" value={`${accuracy}%`} color={COLORS.accent.primary} />
        </View>
        {item.notes ? <Text style={styles.mockNotes}>{item.notes}</Text> : null}
      </View>
    );
  }, [handleDelete]);

  return (
    <View style={styles.container}>
      {/* Stats */}
      <View style={styles.statsRow}>
        <StatBox label="Tests Done" value={mocks.length} />
        <StatBox label="Avg Score" value={avgScore} color={avgScore >= 60 ? COLORS.accent.success : COLORS.accent.warning} />
        <StatBox label="Best Score" value={best} color={COLORS.accent.primary} />
      </View>

      <FlatList
        data={reversedMocks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={50}
        removeClippedSubviews={true}
        ListEmptyComponent={<EmptyState icon="🧪" title="No mock exams logged" subtitle="Tap + to add your first mock" />}
        renderItem={renderItem}
      />

      <TouchableOpacity style={styles.fab} onPress={() => setShowModal(true)}>
        <Text style={styles.fabText}>＋</Text>
      </TouchableOpacity>

      <Modal visible={showModal} onClose={() => setShowModal(false)} title="Add Mock Result">
        <Text style={styles.label}>Test Type</Text>
        <View style={styles.toggleRow}>
          {['Full', 'Subject', 'Sectional'].map((t) => (
            <TouchableOpacity key={t} onPress={() => setForm({ ...form, type: t })} style={[styles.toggleBtn, form.type === t && styles.toggleBtnActive]}>
              <Text style={[styles.toggleTxt, form.type === t && styles.toggleTxtActive]}>{t}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Input label="Source (optional)" value={form.source} onChangeText={(v) => setForm({ ...form, source: v })} placeholder="e.g. MADE Easy 2024" />

        <View style={styles.rowFields}>
          <View style={{ flex: 1, marginRight: SPACING.sm }}>
            <Input label="Score (/100)" value={form.overallScore} onChangeText={(v) => setForm({ ...form, overallScore: v })} keyboardType="decimal-pad" />
          </View>
          <View style={{ flex: 1 }}>
            <Input label="Time (min)" value={form.timeTaken} onChangeText={(v) => setForm({ ...form, timeTaken: v })} keyboardType="numeric" />
          </View>
        </View>

        <View style={styles.rowFields}>
          <View style={{ flex: 1, marginRight: SPACING.sm }}>
            <Input label="Correct" value={form.correct} onChangeText={(v) => setForm({ ...form, correct: v })} keyboardType="numeric" />
          </View>
          <View style={{ flex: 1, marginRight: SPACING.sm }}>
            <Input label="Wrong" value={form.wrong} onChangeText={(v) => setForm({ ...form, wrong: v })} keyboardType="numeric" />
          </View>
          <View style={{ flex: 1 }}>
            <Input label="Skipped" value={form.unattempted} onChangeText={(v) => setForm({ ...form, unattempted: v })} keyboardType="numeric" />
          </View>
        </View>

        <Input label="Notes" value={form.notes} onChangeText={(v) => setForm({ ...form, notes: v })} placeholder="Observations, weak areas..." multiline />
        <Button title="Save Mock" onPress={handleAdd} style={{ marginTop: SPACING.sm }} />
      </Modal>
    </View>
  );
});

const StatBox = React.memo(function StatBox({ label, value, color }) {
  return (
    <View style={styles.statBox}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={[styles.statVal, color && { color }]}>{value}</Text>
    </View>
  );
});

const MiniStat = React.memo(function MiniStat({ label, value, color }) {
  return (
    <View style={styles.miniStat}>
      <Text style={styles.miniLabel}>{label}</Text>
      <Text style={[styles.miniVal, { color }]}>{value}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg.primary },
  statsRow: { flexDirection: 'row', gap: SPACING.sm, padding: SPACING.base, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  statBox: { flex: 1, backgroundColor: COLORS.bg.secondary, borderRadius: 8, padding: SPACING.md, alignItems: 'center', borderWidth: 1, borderColor: COLORS.border },
  statLabel: { fontSize: TYPOGRAPHY.sizes.xs, color: COLORS.text.muted, textTransform: 'uppercase' },
  statVal: { fontSize: TYPOGRAPHY.sizes['2xl'], fontWeight: TYPOGRAPHY.weights.bold, color: COLORS.text.primary, marginTop: 2 },
  list: { padding: SPACING.base, paddingBottom: 100 },
  mockCard: { backgroundColor: COLORS.bg.secondary, borderRadius: 10, borderWidth: 1, borderColor: COLORS.border, padding: SPACING.md, marginBottom: SPACING.sm },
  mockTop: { flexDirection: 'row', alignItems: 'flex-start', gap: SPACING.md, marginBottom: SPACING.sm },
  mockScore: { fontSize: 36, fontWeight: TYPOGRAPHY.weights.extrabold, color: COLORS.accent.primary },
  mockScoreLabel: { fontSize: TYPOGRAPHY.sizes.xs, color: COLORS.text.muted },
  mockInfo: { flex: 1 },
  mockType: { fontSize: TYPOGRAPHY.sizes.base, fontWeight: TYPOGRAPHY.weights.bold, color: COLORS.text.primary },
  mockSource: { fontSize: TYPOGRAPHY.sizes.sm, color: COLORS.text.secondary, marginTop: 2 },
  mockDate: { fontSize: TYPOGRAPHY.sizes.xs, color: COLORS.text.muted, marginTop: 2 },
  deleteBtn: { color: COLORS.text.muted, fontSize: 14 },
  mockStats: { flexDirection: 'row', gap: SPACING.sm, paddingTop: SPACING.sm, borderTopWidth: 1, borderTopColor: COLORS.border },
  miniStat: { flex: 1, alignItems: 'center' },
  miniLabel: { fontSize: TYPOGRAPHY.sizes.xs, color: COLORS.text.muted },
  miniVal: { fontSize: TYPOGRAPHY.sizes.md, fontWeight: TYPOGRAPHY.weights.bold, marginTop: 2 },
  mockNotes: { fontSize: TYPOGRAPHY.sizes.xs, color: COLORS.text.muted, fontStyle: 'italic', marginTop: SPACING.sm },
  fab: { position: 'absolute', bottom: 24, right: 24, width: 56, height: 56, borderRadius: 28, backgroundColor: COLORS.accent.primary, justifyContent: 'center', alignItems: 'center', elevation: 8 },
  fabText: { fontSize: 28, color: COLORS.text.primary, lineHeight: 32 },
  label: { fontSize: TYPOGRAPHY.sizes.xs, color: COLORS.text.secondary, marginBottom: SPACING.xs, textTransform: 'uppercase', letterSpacing: 0.5 },
  toggleRow: { flexDirection: 'row', gap: SPACING.xs, marginBottom: SPACING.md },
  toggleBtn: { flex: 1, paddingVertical: SPACING.md, borderRadius: 8, borderWidth: 1, borderColor: COLORS.border, backgroundColor: COLORS.bg.secondary, alignItems: 'center' },
  toggleBtnActive: { backgroundColor: COLORS.accent.primary, borderColor: COLORS.accent.primary },
  toggleTxt: { fontSize: TYPOGRAPHY.sizes.sm, color: COLORS.text.secondary },
  toggleTxtActive: { color: COLORS.text.primary, fontWeight: TYPOGRAPHY.weights.semibold },
  rowFields: { flexDirection: 'row' },
});
