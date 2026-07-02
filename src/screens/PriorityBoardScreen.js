import React, { useState } from 'react';
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
import { SUBJECTS, PRIORITY_LEVELS, PRIORITY_BOARD_STATUSES } from '../utils/constants';

const STATUS_COLORS = {
  '⚡ Daily Drill': COLORS.accent.danger,
  '📌 This Week': COLORS.accent.warning,
  '🎯 On Deck': COLORS.accent.primary,
  '✅ Done': COLORS.accent.success,
};

export default function PriorityBoardScreen() {
  const { priorityBoard, addPriorityCard, updatePriorityCard, deletePriorityCard } = useStore();
  const [showModal, setShowModal] = useState(false);
  const [editCard, setEditCard] = useState(null);
  const [form, setForm] = useState({ title: '', subject: 'Networks', marksAtStake: '5', priorityLevel: 'P1', status: '⚡ Daily Drill' });

  const grouped = PRIORITY_BOARD_STATUSES.reduce((acc, s) => {
    acc[s] = priorityBoard.filter((c) => c.status === s);
    return acc;
  }, {});

  const openAdd = () => {
    setEditCard(null);
    setForm({ title: '', subject: 'Networks', marksAtStake: '5', priorityLevel: 'P1', status: '⚡ Daily Drill' });
    setShowModal(true);
  };

  const openEdit = (card) => {
    setEditCard(card);
    setForm({ title: card.title, subject: card.subject, marksAtStake: String(card.marksAtStake), priorityLevel: card.priorityLevel, status: card.status });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!form.title.trim()) return;
    const data = { ...form, marksAtStake: parseInt(form.marksAtStake) || 5 };
    if (editCard) updatePriorityCard(editCard.id, data);
    else addPriorityCard(data);
    setShowModal(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {PRIORITY_BOARD_STATUSES.map((status) => (
          <View key={status} style={styles.column}>
            <View style={[styles.colHeader, { borderLeftColor: STATUS_COLORS[status] }]}>
              <Text style={styles.colTitle}>{status}</Text>
              <Badge label={String(grouped[status].length)} variant="muted" />
            </View>
            {grouped[status].length === 0 ? (
              <Text style={styles.emptyCol}>No cards</Text>
            ) : (
              grouped[status].map((card) => (
                <TouchableOpacity key={card.id} style={styles.card} onPress={() => openEdit(card)} activeOpacity={0.8}>
                  <Text style={styles.cardTitle} numberOfLines={2}>{card.title}</Text>
                  <View style={styles.cardMeta}>
                    <SubjectBadge subject={card.subject} />
                    <Text style={styles.marksText}>⚡ {card.marksAtStake} marks</Text>
                    <Badge label={card.priorityLevel} variant={card.priorityLevel === 'P1' ? 'danger' : card.priorityLevel === 'P2' ? 'warning' : 'muted'} />
                  </View>
                  <TouchableOpacity style={styles.deleteBtn} onPress={() => deletePriorityCard(card.id)}>
                    <Text style={styles.deleteTxt}>✕</Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              ))
            )}
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.fab} onPress={openAdd} activeOpacity={0.85}>
        <Text style={styles.fabText}>＋</Text>
      </TouchableOpacity>

      <Modal visible={showModal} onClose={() => setShowModal(false)} title={editCard ? 'Edit Card' : 'Add Priority Card'}>
        <Input label="Title" value={form.title} onChangeText={(v) => setForm({ ...form, title: v })} placeholder="e.g. Z-transform ROC" autoFocus />

        <Text style={styles.pickerLabel}>Subject</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: SPACING.md }}>
          {SUBJECTS.map((s) => (
            <TouchableOpacity key={s} onPress={() => setForm({ ...form, subject: s })}
              style={[styles.chip, form.subject === s && styles.chipActive]}>
              <Text style={[styles.chipText, form.subject === s && styles.chipTextActive]}>{s}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.pickerLabel}>Column</Text>
        {PRIORITY_BOARD_STATUSES.map((s) => (
          <TouchableOpacity key={s} onPress={() => setForm({ ...form, status: s })}
            style={[styles.statusBtn, form.status === s && { borderColor: STATUS_COLORS[s] }]}>
            <Text style={[styles.statusTxt, form.status === s && { color: STATUS_COLORS[s] }]}>{s}</Text>
          </TouchableOpacity>
        ))}

        <Input label="Marks at Stake" value={form.marksAtStake} onChangeText={(v) => setForm({ ...form, marksAtStake: v })} keyboardType="numeric" />
        <Button title={editCard ? 'Save Changes' : 'Add Card'} onPress={handleSave} style={{ marginTop: SPACING.sm }} />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg.primary },
  content: { padding: SPACING.base, paddingBottom: 100 },
  column: { marginBottom: SPACING.lg },
  colHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderLeftWidth: 3, paddingLeft: SPACING.sm, marginBottom: SPACING.sm },
  colTitle: { fontSize: TYPOGRAPHY.sizes.md, fontWeight: TYPOGRAPHY.weights.bold, color: COLORS.text.primary },
  emptyCol: { fontSize: TYPOGRAPHY.sizes.sm, color: COLORS.text.muted, fontStyle: 'italic', paddingLeft: SPACING.sm },
  card: { backgroundColor: COLORS.bg.secondary, borderRadius: 10, borderWidth: 1, borderColor: COLORS.border, padding: SPACING.md, marginBottom: SPACING.sm },
  cardTitle: { fontSize: TYPOGRAPHY.sizes.base, color: COLORS.text.primary, fontWeight: TYPOGRAPHY.weights.medium, marginBottom: SPACING.sm },
  cardMeta: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: SPACING.xs },
  marksText: { fontSize: TYPOGRAPHY.sizes.xs, color: COLORS.text.muted },
  deleteBtn: { position: 'absolute', top: SPACING.md, right: SPACING.md },
  deleteTxt: { color: COLORS.text.muted, fontSize: 14 },
  fab: { position: 'absolute', bottom: 24, right: 24, width: 56, height: 56, borderRadius: 28, backgroundColor: COLORS.accent.primary, justifyContent: 'center', alignItems: 'center', elevation: 8 },
  fabText: { fontSize: 28, color: COLORS.text.primary, lineHeight: 32 },
  pickerLabel: { fontSize: TYPOGRAPHY.sizes.xs, color: COLORS.text.secondary, marginBottom: SPACING.xs, textTransform: 'uppercase', letterSpacing: 0.5 },
  chip: { paddingHorizontal: SPACING.md, paddingVertical: SPACING.xs, borderRadius: 99, backgroundColor: COLORS.bg.secondary, borderWidth: 1, borderColor: COLORS.border, marginRight: SPACING.xs },
  chipActive: { backgroundColor: COLORS.accent.primary, borderColor: COLORS.accent.primary },
  chipText: { fontSize: TYPOGRAPHY.sizes.xs, color: COLORS.text.secondary },
  chipTextActive: { color: COLORS.text.primary, fontWeight: TYPOGRAPHY.weights.semibold },
  statusBtn: { padding: SPACING.md, borderRadius: 8, borderWidth: 1, borderColor: COLORS.border, marginBottom: SPACING.xs },
  statusTxt: { fontSize: TYPOGRAPHY.sizes.sm, color: COLORS.text.secondary },
});
