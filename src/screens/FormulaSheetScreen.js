import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
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
import { SUBJECTS, FORMULA_CONFIDENCE } from '../utils/constants';
import { formatDate } from '../utils/helpers';

const CONFIDENCE_VARIANT = { Shaky: 'danger', Learning: 'warning', Confident: 'success' };

export default React.memo(function FormulaSheetScreen() {
  const { formulas, addFormula, updateFormula, deleteFormula, addRevision } = useStore();
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [filterSub, setFilterSub] = useState('All');
  const [filterConf, setFilterConf] = useState('All');
  const [form, setForm] = useState({ title: '', expression: '', subject: 'Networks', topic: '', confidence: 'Shaky' });

  const filtered = useMemo(() => formulas.filter((f) => {
    if (filterSub !== 'All' && f.subject !== filterSub) return false;
    if (filterConf !== 'All' && f.confidence !== filterConf) return false;
    return true;
  }), [formulas, filterSub, filterConf]);

  const openAdd = useCallback(() => {
    setEditItem(null);
    setForm({ title: '', expression: '', subject: 'Networks', topic: '', confidence: 'Shaky' });
    setShowModal(true);
  }, []);

  const openEdit = useCallback((f) => {
    setEditItem(f);
    setForm({ title: f.title, expression: f.expression, subject: f.subject, topic: f.topic, confidence: f.confidence });
    setShowModal(true);
  }, []);

  const handleSave = useCallback(() => {
    if (!form.title.trim()) return;
    const data = { ...form, lastReviewed: new Date().toISOString().split('T')[0] };
    if (editItem) {
      updateFormula(editItem.id, data);
    } else {
      const newId = Date.now().toString();
      addFormula({ ...data, id: newId });
      addRevision({
        entityType: 'Formula',
        entityId: newId,
        nextReview: new Date().toISOString(),
        interval: 1,
        easeFactor: 2.5,
        repetitions: 0
      });
    }
    setShowModal(false);
  }, [form, editItem, updateFormula, addFormula, addRevision]);

  const cycleConfidence = useCallback((f) => {
    const idx = FORMULA_CONFIDENCE.indexOf(f.confidence);
    const next = FORMULA_CONFIDENCE[(idx + 1) % FORMULA_CONFIDENCE.length];
    updateFormula(f.id, { confidence: next });
  }, [updateFormula]);

  const handleDelete = useCallback((id) => {
    deleteFormula(id);
  }, [deleteFormula]);

  const renderItem = useCallback(({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => openEdit(item)} activeOpacity={0.85}>
      <View style={styles.cardTop}>
        <Text style={styles.cardName} numberOfLines={1}>{item.title}</Text>
        <View style={styles.cardActions}>
          <TouchableOpacity onPress={() => cycleConfidence(item)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Badge label={item.confidence} variant={CONFIDENCE_VARIANT[item.confidence] || 'muted'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDelete(item.id)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Text style={styles.deleteBtn}>✕</Text>
          </TouchableOpacity>
        </View>
      </View>
      {item.topic ? <Text style={styles.cardTopic}>{item.topic}</Text> : null}
      <Text style={styles.cardContent} numberOfLines={3}>{item.expression}</Text>
      <View style={styles.cardBottom}>
        <SubjectBadge subject={item.subject} />
        <Text style={styles.cardDate}>Reviewed: {formatDate(item.lastReviewed)}</Text>
      </View>
    </TouchableOpacity>
  ), [openEdit, cycleConfidence, handleDelete]);

  return (
    <View style={styles.container}>
      {/* Filters */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterBar} contentContainerStyle={styles.filterContent}>
        {['All', ...SUBJECTS].map((s) => (
          <TouchableOpacity key={s} onPress={() => setFilterSub(s)} style={[styles.chip, filterSub === s && styles.chipActive]}>
            <Text style={[styles.chipText, filterSub === s && styles.chipTextActive]}>{s}</Text>
          </TouchableOpacity>
        ))}
        <View style={styles.divider} />
        {['All', ...FORMULA_CONFIDENCE].map((c) => (
          <TouchableOpacity key={c} onPress={() => setFilterConf(c)} style={[styles.chip, filterConf === c && styles.chipActive]}>
            <Text style={[styles.chipText, filterConf === c && styles.chipTextActive]}>{c}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={50}
        removeClippedSubviews={true}
        ListEmptyComponent={<EmptyState icon="⚡" title="No formulas yet" subtitle="Add your combat formulas" />}
        renderItem={renderItem}
      />

      <TouchableOpacity style={styles.fab} onPress={openAdd}>
        <Text style={styles.fabText}>＋</Text>
      </TouchableOpacity>

      <BottomSheet visible={showModal} onClose={() => setShowModal(false)} title={editItem ? 'Edit Formula' : 'Add Formula'}>
        <Input label="Formula Title" value={form.title} onChangeText={(v) => setForm({ ...form, title: v })} placeholder="e.g. Z-transform Definition" autoFocus />

        <Text style={styles.label}>Subject</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: SPACING.md }}>
          {SUBJECTS.map((s) => (
            <TouchableOpacity key={s} onPress={() => setForm({ ...form, subject: s })} style={[styles.chip, form.subject === s && styles.chipActive]}>
              <Text style={[styles.chipText, form.subject === s && styles.chipTextActive]}>{s}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Input label="Topic" value={form.topic} onChangeText={(v) => setForm({ ...form, topic: v })} placeholder="Subtopic" />

        <Input label="Expression" value={form.expression} onChangeText={(v) => setForm({ ...form, expression: v })} placeholder="X(z) = Σ x[n] z^(-n)" multiline numberOfLines={4} />

        <Text style={styles.label}>Confidence</Text>
        <View style={styles.toggleRow}>
          {FORMULA_CONFIDENCE.map((c) => (
            <TouchableOpacity key={c} onPress={() => setForm({ ...form, confidence: c })} style={[styles.toggleBtn, form.confidence === c && styles.toggleBtnActive]}>
              <Text style={[styles.toggleTxt, form.confidence === c && styles.toggleTxtActive]}>{c}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Button title={editItem ? 'Save Changes' : 'Add Formula'} onPress={handleSave} style={{ marginTop: SPACING.sm }} />
      </BottomSheet>
    </View>
  );
});

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg.primary },
  filterBar: { maxHeight: 46, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  filterContent: { paddingHorizontal: SPACING.base, paddingVertical: SPACING.sm, gap: SPACING.xs },
  divider: { width: 1, backgroundColor: COLORS.border, marginHorizontal: SPACING.xs },
  list: { padding: SPACING.base, paddingBottom: 100 },
  card: { backgroundColor: COLORS.bg.secondary, borderRadius: 10, borderWidth: 1, borderColor: COLORS.border, padding: SPACING.md, marginBottom: SPACING.sm },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: SPACING.xs },
  cardName: { fontSize: TYPOGRAPHY.sizes.md, fontWeight: TYPOGRAPHY.weights.bold, color: COLORS.text.primary, flex: 1, marginRight: SPACING.sm },
  cardActions: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm },
  cardTopic: { fontSize: TYPOGRAPHY.sizes.sm, color: COLORS.text.secondary, marginBottom: SPACING.xs },
  cardContent: { fontSize: TYPOGRAPHY.sizes.sm, color: COLORS.text.muted, marginBottom: SPACING.sm, lineHeight: 20 },
  cardBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardDate: { fontSize: TYPOGRAPHY.sizes.xs, color: COLORS.text.muted },
  deleteBtn: { color: COLORS.text.muted, fontSize: 14 },
  fab: { position: 'absolute', bottom: 24, right: 24, width: 56, height: 56, borderRadius: 28, backgroundColor: COLORS.accent.primary, justifyContent: 'center', alignItems: 'center', elevation: 8 },
  fabText: { fontSize: 28, color: COLORS.text.primary, lineHeight: 32 },
  label: { fontSize: TYPOGRAPHY.sizes.xs, color: COLORS.text.secondary, marginBottom: SPACING.xs, textTransform: 'uppercase', letterSpacing: 0.5 },
  chip: { paddingHorizontal: SPACING.md, paddingVertical: SPACING.xs, borderRadius: 99, backgroundColor: COLORS.bg.secondary, borderWidth: 1, borderColor: COLORS.border, marginRight: SPACING.xs },
  chipActive: { backgroundColor: COLORS.accent.primary, borderColor: COLORS.accent.primary },
  chipText: { fontSize: TYPOGRAPHY.sizes.xs, color: COLORS.text.secondary },
  chipTextActive: { color: COLORS.text.primary, fontWeight: TYPOGRAPHY.weights.semibold },
  toggleRow: { flexDirection: 'row', gap: SPACING.xs, marginBottom: SPACING.md },
  toggleBtn: { flex: 1, paddingVertical: SPACING.md, borderRadius: 8, borderWidth: 1, borderColor: COLORS.border, backgroundColor: COLORS.bg.secondary, alignItems: 'center' },
  toggleBtnActive: { backgroundColor: COLORS.accent.primary, borderColor: COLORS.accent.primary },
  toggleTxt: { fontSize: TYPOGRAPHY.sizes.sm, color: COLORS.text.secondary },
  toggleTxtActive: { color: COLORS.text.primary, fontWeight: TYPOGRAPHY.weights.semibold },
});
