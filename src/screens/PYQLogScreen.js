import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useStore } from '../store';
import BottomSheet from '../components/BottomSheet';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { EmptyState } from '../components/EmptyState';
import { SubjectBadge } from '../components/SubjectBadge';
import { COLORS } from '../styles/colors';
import { SPACING } from '../styles/spacing';
import { TYPOGRAPHY } from '../styles/typography';
import { SUBJECTS, MARKS_TYPES, QUESTION_TYPES, PYQ_RESULTS, ERROR_TYPES } from '../utils/constants';
import { getTodayStr, formatDate } from '../utils/helpers';
import { useNavigation } from '@react-navigation/native';
import NotesComponent from '../components/NotesComponent';
import { searchNotes } from '../utils/notesSearch';

const RESULT_VARIANT = { 'Correct ✅': 'success', 'Wrong ❌': 'danger', 'Skipped ⏭️': 'warning' };

export default React.memo(function PYQLogScreen() {
  const { pyqs, addPYQ, deletePYQ, addMistake } = useStore();
  const nav = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const [filterSub, setFilterSub] = useState('All');
  const [filterResult, setFilterResult] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [form, setForm] = useState({
    subject: 'Networks', topic: '', year: '2024',
    marksType: '1-mark', questionType: 'MCQ',
    result: 'Correct ✅', timeTaken: '2', notes: '',
  });

  const today = getTodayStr();

  const filtered = useMemo(() => {
    const resultList = pyqs.filter((l) => {
      if (filterSub !== 'All' && l.subject !== filterSub) return false;
      if (filterResult !== 'All' && l.result !== filterResult) return false;
      return true;
    }).reverse();
    return searchNotes(resultList, searchQuery);
  }, [pyqs, filterSub, filterResult, searchQuery]);

  // Stats
  const { total, correct, accuracy, todayCount } = useMemo(() => {
    const t = pyqs.length;
    const c = pyqs.filter((l) => l.correct || l.result === 'Correct ✅').length;
    const acc = t > 0 ? Math.round((c / t) * 100) : 0;
    const tc = pyqs.filter((l) => l.date === today).length;
    return { total: t, correct: c, accuracy: acc, todayCount: tc };
  }, [pyqs, today]);

  const handleAdd = useCallback(() => {
    if (!form.topic.trim()) return;
    const pyqId = Date.now().toString(); // simple ID gen
    const isCorrect = form.result === 'Correct ✅';
    
    addPYQ({ 
      ...form, 
      id: pyqId,
      date: today, 
      timeTaken: parseFloat(form.timeTaken) || 2,
      correct: isCorrect,
      solved: true
    });
    
    if (!isCorrect) {
      addMistake({
        subject: form.subject,
        topic: form.topic,
        pyqId: pyqId,
        mistakeCategory: 'Concept Gap',
        reason: form.notes || 'Incorrect in PYQ',
        correction: '',
        resolved: false,
        date: today
      });
    }

    setForm({ subject: 'Networks', topic: '', year: '2024', marksType: '1-mark', questionType: 'MCQ', result: 'Correct ✅', timeTaken: '2', notes: '' });
    setShowModal(false);
  }, [form, addPYQ, addMistake, today]);

  const handleDelete = useCallback((id) => {
    deletePYQ(id);
  }, [deletePYQ]);

  const handleNavigateMock = useCallback(() => nav.navigate('MockAnalyzer'), [nav]);

  const renderItem = useCallback(({ item }) => (
    <View style={styles.logRow}>
      <View style={styles.logBody}>
        <Text style={styles.logTopic} numberOfLines={2}>{item.topic}</Text>
        <View style={styles.logMeta}>
          <SubjectBadge subject={item.subject} />
          <Text style={styles.logDetail}>{item.year} · {item.marksType} · {item.questionType}</Text>
        </View>
        <View style={styles.logMeta}>
          <Badge label={item.result} variant={RESULT_VARIANT[item.result] || 'muted'} />
          <Text style={styles.logDetail}>{item.timeTaken}min · {formatDate(item.date)}</Text>
        </View>
        {item.notes ? (
          <Text style={styles.notesPreview} numberOfLines={1}>
            {item.notes.substring(0, 60)}{item.notes.length > 60 ? '...' : ''}
          </Text>
        ) : null}
      </View>
      <TouchableOpacity onPress={() => handleDelete(item.id)} hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
        <Text style={styles.deleteBtn}>✕</Text>
      </TouchableOpacity>
    </View>
  ), [handleDelete]);

  return (
    <View style={styles.container}>
      {/* Stats row */}
      <View style={styles.statsRow}>
        <StatChip label="Total" value={total} />
        <StatChip label="Today" value={todayCount} color={COLORS.accent.primary} />
        <StatChip label="Accuracy" value={`${accuracy}%`} color={accuracy >= 70 ? COLORS.accent.success : COLORS.accent.danger} />
        <TouchableOpacity style={[styles.statChip, { backgroundColor: 'rgba(59,130,246,0.15)' }]} onPress={handleNavigateMock}>
          <Text style={[styles.statVal, { color: COLORS.accent.primary }]}>Mock ›</Text>
        </TouchableOpacity>
      </View>

      {/* Filters & Search */}
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterBar} contentContainerStyle={styles.filterContent}>
          {['All', ...SUBJECTS].map((s) => (
            <TouchableOpacity key={s} onPress={() => setFilterSub(s)} style={[styles.chip, filterSub === s && styles.chipActive]}>
              <Text style={[styles.chipText, filterSub === s && styles.chipTextActive]}>{s}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={styles.searchContainer}>
          <Input 
            placeholder="Search notes and topics..." 
            value={searchQuery} 
            onChangeText={setSearchQuery} 
            style={styles.searchInput}
          />
        </View>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={50}
        removeClippedSubviews={true}
        ListEmptyComponent={<EmptyState icon="📝" title="No PYQs logged yet" subtitle="Tap + to log your first question" />}
        renderItem={renderItem}
      />

      <TouchableOpacity style={styles.fab} onPress={() => setShowModal(true)}>
        <Text style={styles.fabText}>＋</Text>
      </TouchableOpacity>

      <BottomSheet visible={showModal} onClose={() => setShowModal(false)} title="Log PYQ">
        <Input label="Topic / Question" value={form.topic} onChangeText={(v) => setForm({ ...form, topic: v })} placeholder="e.g. Z-transform ROC question" multiline numberOfLines={2} autoFocus />

        <Text style={styles.label}>Subject</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chips}>
          {SUBJECTS.map((s) => (
            <TouchableOpacity key={s} onPress={() => setForm({ ...form, subject: s })} style={[styles.chip, form.subject === s && styles.chipActive]}>
              <Text style={[styles.chipText, form.subject === s && styles.chipTextActive]}>{s}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.rowFields}>
          <View style={{ flex: 1, marginRight: SPACING.sm }}>
            <Input label="Year" value={form.year} onChangeText={(v) => setForm({ ...form, year: v })} keyboardType="numeric" />
          </View>
          <View style={{ flex: 1 }}>
            <Input label="Time (min)" value={form.timeTaken} onChangeText={(v) => setForm({ ...form, timeTaken: v })} keyboardType="decimal-pad" />
          </View>
        </View>

        <Text style={styles.label}>Marks Type</Text>
        <View style={styles.toggleRow}>
          {MARKS_TYPES.map((t) => (
            <TouchableOpacity key={t} onPress={() => setForm({ ...form, marksType: t })} style={[styles.toggleBtn, form.marksType === t && styles.toggleBtnActive]}>
              <Text style={[styles.toggleTxt, form.marksType === t && styles.toggleTxtActive]}>{t}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Result</Text>
        <View style={styles.toggleRow}>
          {PYQ_RESULTS.map((r) => (
            <TouchableOpacity key={r} onPress={() => setForm({ ...form, result: r })} style={[styles.toggleBtn, form.result === r && styles.toggleBtnActive]}>
              <Text style={[styles.toggleTxt, form.result === r && styles.toggleTxtActive]}>{r}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <NotesComponent
          initialNotes={form.notes || ''}
          onNotesChange={(text) => setForm({ ...form, notes: text })}
          placeholder="What went wrong? Why did you miss this?"
        />
        
        <Button title="Log PYQ" onPress={handleAdd} style={{ marginTop: SPACING.sm }} />
      </BottomSheet>
    </View>
  );
});

const StatChip = React.memo(function StatChip({ label, value, color }) {
  return (
    <View style={styles.statChip}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={[styles.statVal, color && { color }]}>{value}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg.primary },
  statsRow: { flexDirection: 'row', gap: SPACING.xs, padding: SPACING.base, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  statChip: { flex: 1, backgroundColor: COLORS.bg.secondary, borderRadius: 8, padding: SPACING.sm, alignItems: 'center', borderWidth: 1, borderColor: COLORS.border },
  statLabel: { fontSize: TYPOGRAPHY.sizes.xs, color: COLORS.text.muted, textTransform: 'uppercase' },
  statVal: { fontSize: TYPOGRAPHY.sizes.md, fontWeight: TYPOGRAPHY.weights.bold, color: COLORS.text.primary, marginTop: 2 },
  filterBar: { borderBottomWidth: 1, borderBottomColor: COLORS.border, maxHeight: 46 },
  filterContent: { paddingHorizontal: SPACING.base, paddingVertical: SPACING.sm, gap: SPACING.xs },
  list: { padding: SPACING.base, paddingBottom: 100 },
  logRow: { flexDirection: 'row', backgroundColor: COLORS.bg.secondary, borderRadius: 10, borderWidth: 1, borderColor: COLORS.border, padding: SPACING.md, marginBottom: SPACING.sm },
  logBody: { flex: 1 },
  logTopic: { fontSize: TYPOGRAPHY.sizes.base, color: COLORS.text.primary, fontWeight: TYPOGRAPHY.weights.medium, marginBottom: SPACING.xs },
  logMeta: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: SPACING.xs, marginBottom: 4 },
  logDetail: { fontSize: TYPOGRAPHY.sizes.xs, color: COLORS.text.muted },
  notesPreview: { fontSize: 11, color: COLORS.text.muted, fontStyle: 'italic', marginTop: 2 },
  searchContainer: { paddingHorizontal: SPACING.base, paddingBottom: SPACING.sm, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  searchInput: { marginBottom: 0 },
  deleteBtn: { color: COLORS.text.muted, fontSize: 14, marginLeft: SPACING.sm },
  fab: { position: 'absolute', bottom: 24, right: 24, width: 56, height: 56, borderRadius: 28, backgroundColor: COLORS.accent.primary, justifyContent: 'center', alignItems: 'center', elevation: 8 },
  fabText: { fontSize: 28, color: COLORS.text.primary, lineHeight: 32 },
  label: { fontSize: TYPOGRAPHY.sizes.xs, color: COLORS.text.secondary, marginBottom: SPACING.xs, textTransform: 'uppercase', letterSpacing: 0.5 },
  chips: { marginBottom: SPACING.md },
  chip: { paddingHorizontal: SPACING.md, paddingVertical: SPACING.xs, borderRadius: 99, backgroundColor: COLORS.bg.secondary, borderWidth: 1, borderColor: COLORS.border, marginRight: SPACING.xs },
  chipActive: { backgroundColor: COLORS.accent.primary, borderColor: COLORS.accent.primary },
  chipText: { fontSize: TYPOGRAPHY.sizes.xs, color: COLORS.text.secondary },
  chipTextActive: { color: COLORS.text.primary, fontWeight: TYPOGRAPHY.weights.semibold },
  rowFields: { flexDirection: 'row' },
  toggleRow: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.xs, marginBottom: SPACING.md },
  toggleBtn: { paddingHorizontal: SPACING.md, paddingVertical: SPACING.xs, borderRadius: 8, borderWidth: 1, borderColor: COLORS.border, backgroundColor: COLORS.bg.secondary },
  toggleBtnActive: { backgroundColor: COLORS.accent.primary, borderColor: COLORS.accent.primary },
  toggleTxt: { fontSize: TYPOGRAPHY.sizes.xs, color: COLORS.text.secondary },
  toggleTxtActive: { color: COLORS.text.primary, fontWeight: TYPOGRAPHY.weights.semibold },
});
