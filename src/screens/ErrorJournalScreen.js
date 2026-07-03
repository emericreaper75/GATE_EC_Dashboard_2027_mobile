import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { useStore } from '../store';
import { Modal } from '../components/Modal';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { EmptyState } from '../components/EmptyState';
import { SubjectBadge } from '../components/SubjectBadge';
import { COLORS } from '../styles/colors';
import { SPACING } from '../styles/spacing';
import { TYPOGRAPHY } from '../styles/typography';
import { SUBJECTS, ERROR_TYPES, ERROR_LOG_STATUSES } from '../utils/constants';
import { getTodayStr, formatDate } from '../utils/helpers';

const STATUS_VARIANT = { Pending: 'danger', 'Re-attempted': 'warning', Mastered: 'success' };

export default React.memo(function ErrorJournalScreen() {
  const { errors, addErrorLog, updateErrorLog, deleteErrorLog } = useStore();
  const [showModal, setShowModal] = useState(false);
  const [filterSub, setFilterSub] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [form, setForm] = useState({
    subject: 'Networks', topic: '', source: '',
    thought: '', correctAnswer: '', ruleViolated: '',
    errorType: 'Concept Gap', status: 'Pending',
  });

  const today = getTodayStr();

  const filtered = useMemo(() => errors.filter((e) => {
    if (filterSub !== 'All' && e.subject !== filterSub) return false;
    if (filterStatus !== 'All' && e.status !== filterStatus) return false;
    return true;
  }).reverse(), [errors, filterSub, filterStatus]);

  const handleAdd = useCallback(() => {
    if (!form.topic.trim()) return;
    addErrorLog({ ...form, date: today });
    setForm({ subject: 'Networks', topic: '', source: '', thought: '', correctAnswer: '', ruleViolated: '', errorType: 'Concept Gap', status: 'Pending' });
    setShowModal(false);
  }, [form, addErrorLog, today]);

  const cycleStatus = useCallback((e) => {
    const idx = ERROR_LOG_STATUSES.indexOf(e.status);
    const next = ERROR_LOG_STATUSES[(idx + 1) % ERROR_LOG_STATUSES.length];
    updateErrorLog(e.id, { status: next });
  }, [updateErrorLog]);

  const handleDelete = useCallback((id) => {
    deleteErrorLog(id);
  }, [deleteErrorLog]);

  const renderItem = useCallback(({ item }) => (
    <View style={styles.errorCard}>
      <View style={styles.errorTop}>
        <View style={styles.errorInfo}>
          <Text style={styles.errorTopic} numberOfLines={1}>{item.topic}</Text>
          <Text style={styles.errorSource}>{item.source} · {formatDate(item.date)}</Text>
        </View>
        <View style={styles.errorActions}>
          <TouchableOpacity onPress={() => cycleStatus(item)}>
            <Badge label={item.status} variant={STATUS_VARIANT[item.status] || 'muted'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDelete(item.id)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Text style={styles.deleteBtn}>✕</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.errorMeta}>
        <SubjectBadge subject={item.subject} />
        <Badge label={item.errorType} variant="outline" style={{ marginLeft: SPACING.xs }} />
      </View>
      {item.thought ? (
        <View style={styles.errorDetail}>
          <Text style={styles.detailLabel}>My thought:</Text>
          <Text style={styles.detailText}>{item.thought}</Text>
        </View>
      ) : null}
      {item.correctAnswer ? (
        <View style={styles.errorDetail}>
          <Text style={[styles.detailLabel, { color: COLORS.accent.success }]}>Correct:</Text>
          <Text style={styles.detailText}>{item.correctAnswer}</Text>
        </View>
      ) : null}
    </View>
  ), [cycleStatus, handleDelete]);

  return (
    <View style={styles.container}>
      {/* Status filters */}
      <View style={styles.filterBar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterContent}>
          {['All', ...ERROR_LOG_STATUSES].map((s) => (
            <TouchableOpacity key={s} onPress={() => setFilterStatus(s)} style={[styles.chip, filterStatus === s && styles.chipActive]}>
              <Text style={[styles.chipText, filterStatus === s && styles.chipTextActive]}>{s}</Text>
            </TouchableOpacity>
          ))}
          <View style={styles.divider} />
          {['All', ...SUBJECTS].map((s) => (
            <TouchableOpacity key={s} onPress={() => setFilterSub(s)} style={[styles.chip, filterSub === s && styles.chipActive]}>
              <Text style={[styles.chipText, filterSub === s && styles.chipTextActive]}>{s}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={50}
        removeClippedSubviews={true}
        ListEmptyComponent={<EmptyState icon="🧠" title="No errors logged" subtitle="Track your mistakes to master them" />}
        renderItem={renderItem}
      />

      <TouchableOpacity style={styles.fab} onPress={() => setShowModal(true)}>
        <Text style={styles.fabText}>＋</Text>
      </TouchableOpacity>

      <Modal visible={showModal} onClose={() => setShowModal(false)} title="Log Error">
        <Input label="Topic / Question" value={form.topic} onChangeText={(v) => setForm({ ...form, topic: v })} placeholder="What did you get wrong?" autoFocus />

        <Text style={styles.label}>Subject</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: SPACING.md }}>
          {SUBJECTS.map((s) => (
            <TouchableOpacity key={s} onPress={() => setForm({ ...form, subject: s })} style={[styles.chip, form.subject === s && styles.chipActive]}>
              <Text style={[styles.chipText, form.subject === s && styles.chipTextActive]}>{s}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Input label="Source" value={form.source} onChangeText={(v) => setForm({ ...form, source: v })} placeholder="e.g. PYQ 2022, Mock #3" />
        <Input label="What I thought" value={form.thought} onChangeText={(v) => setForm({ ...form, thought: v })} placeholder="My incorrect reasoning..." multiline />
        <Input label="Correct Answer / Logic" value={form.correctAnswer} onChangeText={(v) => setForm({ ...form, correctAnswer: v })} placeholder="The right approach..." multiline />
        <Input label="Rule Violated" value={form.ruleViolated} onChangeText={(v) => setForm({ ...form, ruleViolated: v })} placeholder="Which concept did I miss?" />

        <Text style={styles.label}>Error Type</Text>
        <View style={styles.toggleRow}>
          {ERROR_TYPES.map((t) => (
            <TouchableOpacity key={t} onPress={() => setForm({ ...form, errorType: t })} style={[styles.toggleBtn, form.errorType === t && styles.toggleBtnActive]}>
              <Text style={[styles.toggleTxt, form.errorType === t && styles.toggleTxtActive]}>{t}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Button title="Log Error" onPress={handleAdd} style={{ marginTop: SPACING.sm }} />
      </Modal>
    </View>
  );
});

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg.primary },
  filterBar: { maxHeight: 46, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  filterContent: { paddingHorizontal: SPACING.base, paddingVertical: SPACING.sm, gap: SPACING.xs },
  divider: { width: 1, backgroundColor: COLORS.border, marginHorizontal: SPACING.xs },
  list: { padding: SPACING.base, paddingBottom: 100 },
  errorCard: { backgroundColor: COLORS.bg.secondary, borderRadius: 10, borderWidth: 1, borderColor: COLORS.border, padding: SPACING.md, marginBottom: SPACING.sm, borderLeftWidth: 3, borderLeftColor: COLORS.accent.danger },
  errorTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: SPACING.xs },
  errorInfo: { flex: 1, marginRight: SPACING.sm },
  errorTopic: { fontSize: TYPOGRAPHY.sizes.base, fontWeight: TYPOGRAPHY.weights.semibold, color: COLORS.text.primary },
  errorSource: { fontSize: TYPOGRAPHY.sizes.xs, color: COLORS.text.muted, marginTop: 2 },
  errorActions: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm },
  errorMeta: { flexDirection: 'row', alignItems: 'center', marginBottom: SPACING.sm },
  errorDetail: { marginTop: SPACING.xs },
  detailLabel: { fontSize: TYPOGRAPHY.sizes.xs, color: COLORS.accent.danger, fontWeight: TYPOGRAPHY.weights.semibold, textTransform: 'uppercase', marginBottom: 2 },
  detailText: { fontSize: TYPOGRAPHY.sizes.sm, color: COLORS.text.secondary, lineHeight: 18 },
  deleteBtn: { color: COLORS.text.muted, fontSize: 14 },
  fab: { position: 'absolute', bottom: 24, right: 24, width: 56, height: 56, borderRadius: 28, backgroundColor: COLORS.accent.danger, justifyContent: 'center', alignItems: 'center', elevation: 8 },
  fabText: { fontSize: 28, color: COLORS.text.primary, lineHeight: 32 },
  label: { fontSize: TYPOGRAPHY.sizes.xs, color: COLORS.text.secondary, marginBottom: SPACING.xs, textTransform: 'uppercase', letterSpacing: 0.5 },
  chip: { paddingHorizontal: SPACING.md, paddingVertical: SPACING.xs, borderRadius: 99, backgroundColor: COLORS.bg.secondary, borderWidth: 1, borderColor: COLORS.border, marginRight: SPACING.xs },
  chipActive: { backgroundColor: COLORS.accent.primary, borderColor: COLORS.accent.primary },
  chipText: { fontSize: TYPOGRAPHY.sizes.xs, color: COLORS.text.secondary },
  chipTextActive: { color: COLORS.text.primary, fontWeight: TYPOGRAPHY.weights.semibold },
  toggleRow: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.xs, marginBottom: SPACING.md },
  toggleBtn: { paddingHorizontal: SPACING.md, paddingVertical: SPACING.xs, borderRadius: 8, borderWidth: 1, borderColor: COLORS.border, backgroundColor: COLORS.bg.secondary },
  toggleBtnActive: { backgroundColor: COLORS.accent.primary, borderColor: COLORS.accent.primary },
  toggleTxt: { fontSize: TYPOGRAPHY.sizes.xs, color: COLORS.text.secondary },
  toggleTxtActive: { color: COLORS.text.primary, fontWeight: TYPOGRAPHY.weights.semibold },
});
