import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { useStore } from '../store';
import { Modal } from '../components/Modal';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { EmptyState } from '../components/EmptyState';
import { COLORS } from '../styles/colors';
import { SPACING } from '../styles/spacing';
import { TYPOGRAPHY } from '../styles/typography';
import { SUBJECTS } from '../utils/constants';
import { formatDate } from '../utils/helpers';

export default function WeeklyReviewScreen() {
  const { weeklyReviews, addWeeklyReview, deleteWeeklyReview } = useStore();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    weekRange: '', pyqsSolved: '', mocksTaken: '',
    accuracy: '', bestMockScore: '', wentWell: '', toFix: '', priorities: '',
  });

  const handleAdd = () => {
    if (!form.weekRange.trim()) return;
    addWeeklyReview({
      weekRange: form.weekRange,
      pyqsSolved: parseInt(form.pyqsSolved) || 0,
      mocksTaken: parseInt(form.mocksTaken) || 0,
      accuracy: parseFloat(form.accuracy) || 0,
      bestMockScore: parseFloat(form.bestMockScore) || 0,
      subjectsCovered: [],
      topicsMastered: [],
      formulaSheetsReviewed: [],
      wentWell: form.wentWell,
      toFix: form.toFix,
      priorities: form.priorities.split(',').map((s) => s.trim()).filter(Boolean),
    });
    setForm({ weekRange: '', pyqsSolved: '', mocksTaken: '', accuracy: '', bestMockScore: '', wentWell: '', toFix: '', priorities: '' });
    setShowModal(false);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={[...weeklyReviews].reverse()}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<EmptyState icon="📅" title="No weekly reviews" subtitle="Tap + to add your first review" />}
        renderItem={({ item }) => (
          <View style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <Text style={styles.reviewWeek}>{item.weekRange}</Text>
              <TouchableOpacity onPress={() => deleteWeeklyReview(item.id)}>
                <Text style={styles.deleteBtn}>✕</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.reviewStats}>
              <StatItem label="PYQs" value={item.pyqsSolved} />
              <StatItem label="Mocks" value={item.mocksTaken} />
              <StatItem label="Accuracy" value={`${item.accuracy}%`} color={item.accuracy >= 70 ? COLORS.accent.success : COLORS.accent.warning} />
              <StatItem label="Best Mock" value={item.bestMockScore} color={COLORS.accent.primary} />
            </View>
            {item.wentWell ? <ReviewDetail label="✅ Went Well" text={item.wentWell} color={COLORS.accent.success} /> : null}
            {item.toFix ? <ReviewDetail label="🔧 To Fix" text={item.toFix} color={COLORS.accent.danger} /> : null}
            {item.priorities?.length > 0 ? (
              <ReviewDetail label="🎯 Next Week" text={item.priorities.join(', ')} color={COLORS.accent.warning} />
            ) : null}
          </View>
        )}
      />

      <TouchableOpacity style={styles.fab} onPress={() => setShowModal(true)}>
        <Text style={styles.fabText}>＋</Text>
      </TouchableOpacity>

      <Modal visible={showModal} onClose={() => setShowModal(false)} title="Add Weekly Review">
        <Input label="Week Range" value={form.weekRange} onChangeText={(v) => setForm({ ...form, weekRange: v })} placeholder="e.g. Jun 30 – Jul 6, 2026" autoFocus />
        <View style={styles.rowFields}>
          <View style={{ flex: 1, marginRight: SPACING.sm }}>
            <Input label="PYQs Solved" value={form.pyqsSolved} onChangeText={(v) => setForm({ ...form, pyqsSolved: v })} keyboardType="numeric" />
          </View>
          <View style={{ flex: 1 }}>
            <Input label="Mocks Taken" value={form.mocksTaken} onChangeText={(v) => setForm({ ...form, mocksTaken: v })} keyboardType="numeric" />
          </View>
        </View>
        <View style={styles.rowFields}>
          <View style={{ flex: 1, marginRight: SPACING.sm }}>
            <Input label="Accuracy (%)" value={form.accuracy} onChangeText={(v) => setForm({ ...form, accuracy: v })} keyboardType="decimal-pad" />
          </View>
          <View style={{ flex: 1 }}>
            <Input label="Best Mock Score" value={form.bestMockScore} onChangeText={(v) => setForm({ ...form, bestMockScore: v })} keyboardType="decimal-pad" />
          </View>
        </View>
        <Input label="What went well?" value={form.wentWell} onChangeText={(v) => setForm({ ...form, wentWell: v })} multiline />
        <Input label="What to fix?" value={form.toFix} onChangeText={(v) => setForm({ ...form, toFix: v })} multiline />
        <Input label="Next week priorities (comma-separated)" value={form.priorities} onChangeText={(v) => setForm({ ...form, priorities: v })} placeholder="Networks, Mock, Formula review" />
        <Button title="Save Review" onPress={handleAdd} style={{ marginTop: SPACING.sm }} />
      </Modal>
    </View>
  );
}

function StatItem({ label, value, color }) {
  return (
    <View style={styles.statItem}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={[styles.statVal, color && { color }]}>{value}</Text>
    </View>
  );
}

function ReviewDetail({ label, text, color }) {
  return (
    <View style={styles.reviewDetail}>
      <Text style={[styles.detailLabel, { color }]}>{label}</Text>
      <Text style={styles.detailText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg.primary },
  list: { padding: SPACING.base, paddingBottom: 100 },
  reviewCard: { backgroundColor: COLORS.bg.secondary, borderRadius: 10, borderWidth: 1, borderColor: COLORS.border, padding: SPACING.md, marginBottom: SPACING.sm },
  reviewHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: SPACING.md },
  reviewWeek: { fontSize: TYPOGRAPHY.sizes.md, fontWeight: TYPOGRAPHY.weights.bold, color: COLORS.accent.primary },
  reviewStats: { flexDirection: 'row', gap: SPACING.xs, marginBottom: SPACING.md, paddingBottom: SPACING.md, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  statItem: { flex: 1, alignItems: 'center' },
  statLabel: { fontSize: TYPOGRAPHY.sizes.xs, color: COLORS.text.muted, textTransform: 'uppercase' },
  statVal: { fontSize: TYPOGRAPHY.sizes.xl, fontWeight: TYPOGRAPHY.weights.bold, color: COLORS.text.primary, marginTop: 2 },
  reviewDetail: { marginBottom: SPACING.sm },
  detailLabel: { fontSize: TYPOGRAPHY.sizes.xs, fontWeight: TYPOGRAPHY.weights.semibold, textTransform: 'uppercase', marginBottom: 2 },
  detailText: { fontSize: TYPOGRAPHY.sizes.sm, color: COLORS.text.secondary },
  deleteBtn: { color: COLORS.text.muted, fontSize: 14 },
  fab: { position: 'absolute', bottom: 24, right: 24, width: 56, height: 56, borderRadius: 28, backgroundColor: COLORS.accent.primary, justifyContent: 'center', alignItems: 'center', elevation: 8 },
  fabText: { fontSize: 28, color: COLORS.text.primary, lineHeight: 32 },
  rowFields: { flexDirection: 'row' },
});
