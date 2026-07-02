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
import { SUBJECTS } from '../utils/constants';
import { getTodayStr, formatDate } from '../utils/helpers';

export default function LearningNotesScreen() {
  const { notes, addNote, updateNote, deleteNote } = useStore();
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [filterSub, setFilterSub] = useState('All');
  const [form, setForm] = useState({ title: '', content: '', subject: 'Networks', topic: '', tags: '' });

  const today = getTodayStr();

  const filtered = notes.filter((n) => filterSub === 'All' || n.subject === filterSub).reverse();

  const openAdd = () => {
    setEditItem(null);
    setForm({ title: '', content: '', subject: 'Networks', topic: '', tags: '' });
    setShowModal(true);
  };

  const openEdit = (n) => {
    setEditItem(n);
    setForm({ title: n.title, content: n.content, subject: n.subject, topic: n.topic, tags: (n.tags || []).join(', ') });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!form.title.trim()) return;
    const data = { ...form, tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean), date: today };
    if (editItem) updateNote(editItem.id, data);
    else addNote(data);
    setShowModal(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterBar} contentContainerStyle={styles.filterContent}>
        {['All', ...SUBJECTS].map((s) => (
          <TouchableOpacity key={s} onPress={() => setFilterSub(s)} style={[styles.chip, filterSub === s && styles.chipActive]}>
            <Text style={[styles.chipText, filterSub === s && styles.chipTextActive]}>{s}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<EmptyState icon="📓" title="No notes yet" subtitle="Tap + to add a learning note" />}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.noteCard} onPress={() => openEdit(item)} activeOpacity={0.85}>
            <View style={styles.noteTop}>
              <Text style={styles.noteTitle} numberOfLines={1}>{item.title}</Text>
              <TouchableOpacity onPress={() => deleteNote(item.id)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                <Text style={styles.deleteBtn}>✕</Text>
              </TouchableOpacity>
            </View>
            {item.topic ? <Text style={styles.noteTopic}>{item.topic}</Text> : null}
            <Text style={styles.noteContent} numberOfLines={4}>{item.content}</Text>
            <View style={styles.noteMeta}>
              <SubjectBadge subject={item.subject} />
              {(item.tags || []).slice(0, 2).map((tag) => (
                <Badge key={tag} label={`#${tag}`} variant="muted" style={{ marginLeft: SPACING.xs }} />
              ))}
              <Text style={styles.noteDate}>{formatDate(item.date)}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity style={styles.fab} onPress={openAdd}>
        <Text style={styles.fabText}>＋</Text>
      </TouchableOpacity>

      <Modal visible={showModal} onClose={() => setShowModal(false)} title={editItem ? 'Edit Note' : 'New Note'}>
        <Input label="Title" value={form.title} onChangeText={(v) => setForm({ ...form, title: v })} placeholder="Note title" autoFocus />

        <Text style={styles.label}>Subject</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: SPACING.md }}>
          {SUBJECTS.map((s) => (
            <TouchableOpacity key={s} onPress={() => setForm({ ...form, subject: s })} style={[styles.chip, form.subject === s && styles.chipActive]}>
              <Text style={[styles.chipText, form.subject === s && styles.chipTextActive]}>{s}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Input label="Topic" value={form.topic} onChangeText={(v) => setForm({ ...form, topic: v })} placeholder="Subtopic or chapter" />
        <Input label="Content" value={form.content} onChangeText={(v) => setForm({ ...form, content: v })} placeholder="Write your note here..." multiline numberOfLines={6} />
        <Input label="Tags (comma-separated)" value={form.tags} onChangeText={(v) => setForm({ ...form, tags: v })} placeholder="e.g. important, formula, exam" />
        <Button title={editItem ? 'Save Changes' : 'Add Note'} onPress={handleSave} style={{ marginTop: SPACING.sm }} />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg.primary },
  filterBar: { maxHeight: 46, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  filterContent: { paddingHorizontal: SPACING.base, paddingVertical: SPACING.sm, gap: SPACING.xs },
  list: { padding: SPACING.base, paddingBottom: 100 },
  noteCard: { backgroundColor: COLORS.bg.secondary, borderRadius: 10, borderWidth: 1, borderColor: COLORS.border, padding: SPACING.md, marginBottom: SPACING.sm },
  noteTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 },
  noteTitle: { fontSize: TYPOGRAPHY.sizes.md, fontWeight: TYPOGRAPHY.weights.bold, color: COLORS.text.primary, flex: 1, marginRight: SPACING.sm },
  noteTopic: { fontSize: TYPOGRAPHY.sizes.sm, color: COLORS.accent.primary, marginBottom: SPACING.xs },
  noteContent: { fontSize: TYPOGRAPHY.sizes.sm, color: COLORS.text.secondary, lineHeight: 20, marginBottom: SPACING.sm },
  noteMeta: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: SPACING.xs },
  noteDate: { fontSize: TYPOGRAPHY.sizes.xs, color: COLORS.text.muted, marginLeft: 'auto' },
  deleteBtn: { color: COLORS.text.muted, fontSize: 14 },
  fab: { position: 'absolute', bottom: 24, right: 24, width: 56, height: 56, borderRadius: 28, backgroundColor: COLORS.accent.purple, justifyContent: 'center', alignItems: 'center', elevation: 8 },
  fabText: { fontSize: 28, color: COLORS.text.primary, lineHeight: 32 },
  label: { fontSize: TYPOGRAPHY.sizes.xs, color: COLORS.text.secondary, marginBottom: SPACING.xs, textTransform: 'uppercase', letterSpacing: 0.5 },
  chip: { paddingHorizontal: SPACING.md, paddingVertical: SPACING.xs, borderRadius: 99, backgroundColor: COLORS.bg.secondary, borderWidth: 1, borderColor: COLORS.border, marginRight: SPACING.xs },
  chipActive: { backgroundColor: COLORS.accent.primary, borderColor: COLORS.accent.primary },
  chipText: { fontSize: TYPOGRAPHY.sizes.xs, color: COLORS.text.secondary },
  chipTextActive: { color: COLORS.text.primary, fontWeight: TYPOGRAPHY.weights.semibold },
});
