import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Switch } from 'react-native';
import { useStore } from '../store';
import { Modal } from '../components/Modal';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { EmptyState } from '../components/EmptyState';
import { COLORS } from '../styles/colors';
import { SPACING } from '../styles/spacing';
import { TYPOGRAPHY } from '../styles/typography';
import { REPEAT_OPTIONS } from '../utils/constants';
import { formatTime } from '../utils/helpers';

export default function ReminderScreen() {
  const { reminders, addReminder, updateReminder, deleteReminder } = useStore();
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({ title: '', message: '', time: '08:00', repeat: 'daily' });

  const openAdd = () => {
    setEditItem(null);
    setForm({ title: '', message: '', time: '08:00', repeat: 'daily' });
    setShowModal(true);
  };

  const openEdit = (r) => {
    setEditItem(r);
    setForm({ title: r.title, message: r.message, time: r.time, repeat: r.repeat });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!form.title.trim()) return;
    if (editItem) updateReminder(editItem.id, form);
    else addReminder({ ...form, active: true });
    setShowModal(false);
  };

  const REPEAT_VARIANT = { daily: 'primary', weekly: 'warning', 'one-time': 'muted' };

  return (
    <View style={styles.container}>
      <FlatList
        data={reminders}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<EmptyState icon="🔔" title="No reminders set" subtitle="Tap + to add a reminder" />}
        renderItem={({ item }) => (
          <TouchableOpacity style={[styles.reminderRow, !item.active && styles.reminderInactive]} onPress={() => openEdit(item)} activeOpacity={0.8}>
            <View style={styles.reminderLeft}>
              <Text style={styles.reminderTime}>{formatTime(item.time)}</Text>
              <Badge label={item.repeat} variant={REPEAT_VARIANT[item.repeat] || 'muted'} style={styles.repeatBadge} />
            </View>
            <View style={styles.reminderBody}>
              <Text style={[styles.reminderTitle, !item.active && styles.mutedText]}>{item.title}</Text>
              {item.message ? <Text style={styles.reminderMsg} numberOfLines={1}>{item.message}</Text> : null}
            </View>
            <View style={styles.reminderRight}>
              <Switch
                value={item.active}
                onValueChange={(v) => updateReminder(item.id, { active: v })}
                trackColor={{ false: COLORS.border, true: COLORS.accent.primary }}
                thumbColor={COLORS.text.primary}
              />
              <TouchableOpacity onPress={() => deleteReminder(item.id)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                <Text style={styles.deleteBtn}>✕</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity style={styles.fab} onPress={openAdd}>
        <Text style={styles.fabText}>＋</Text>
      </TouchableOpacity>

      <Modal visible={showModal} onClose={() => setShowModal(false)} title={editItem ? 'Edit Reminder' : 'Add Reminder'}>
        <Input label="Title" value={form.title} onChangeText={(v) => setForm({ ...form, title: v })} placeholder="e.g. Morning Formula Review" autoFocus />
        <Input label="Message" value={form.message} onChangeText={(v) => setForm({ ...form, message: v })} placeholder="Optional reminder message..." multiline />
        <Input label="Time (HH:MM)" value={form.time} onChangeText={(v) => setForm({ ...form, time: v })} placeholder="08:00" keyboardType="numbers-and-punctuation" />

        <Text style={styles.label}>Repeat</Text>
        <View style={styles.toggleRow}>
          {REPEAT_OPTIONS.map((r) => (
            <TouchableOpacity key={r} onPress={() => setForm({ ...form, repeat: r })} style={[styles.toggleBtn, form.repeat === r && styles.toggleBtnActive]}>
              <Text style={[styles.toggleTxt, form.repeat === r && styles.toggleTxtActive]}>{r}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Button title={editItem ? 'Save Changes' : 'Add Reminder'} onPress={handleSave} style={{ marginTop: SPACING.sm }} />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg.primary },
  list: { padding: SPACING.base, paddingBottom: 100 },
  reminderRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.bg.secondary, borderRadius: 10, borderWidth: 1, borderColor: COLORS.border, padding: SPACING.md, marginBottom: SPACING.sm, gap: SPACING.md },
  reminderInactive: { opacity: 0.5 },
  reminderLeft: { alignItems: 'center', width: 70 },
  reminderTime: { fontSize: TYPOGRAPHY.sizes.md, fontWeight: TYPOGRAPHY.weights.bold, color: COLORS.accent.primary },
  repeatBadge: { marginTop: 4 },
  reminderBody: { flex: 1 },
  reminderTitle: { fontSize: TYPOGRAPHY.sizes.base, fontWeight: TYPOGRAPHY.weights.semibold, color: COLORS.text.primary },
  reminderMsg: { fontSize: TYPOGRAPHY.sizes.sm, color: COLORS.text.secondary, marginTop: 2 },
  mutedText: { color: COLORS.text.muted },
  reminderRight: { flexDirection: 'column', alignItems: 'center', gap: SPACING.xs },
  deleteBtn: { color: COLORS.text.muted, fontSize: 14 },
  fab: { position: 'absolute', bottom: 24, right: 24, width: 56, height: 56, borderRadius: 28, backgroundColor: COLORS.accent.primary, justifyContent: 'center', alignItems: 'center', elevation: 8 },
  fabText: { fontSize: 28, color: COLORS.text.primary, lineHeight: 32 },
  label: { fontSize: TYPOGRAPHY.sizes.xs, color: COLORS.text.secondary, marginBottom: SPACING.xs, textTransform: 'uppercase', letterSpacing: 0.5 },
  toggleRow: { flexDirection: 'row', gap: SPACING.xs, marginBottom: SPACING.md },
  toggleBtn: { flex: 1, paddingVertical: SPACING.md, borderRadius: 8, borderWidth: 1, borderColor: COLORS.border, backgroundColor: COLORS.bg.secondary, alignItems: 'center' },
  toggleBtnActive: { backgroundColor: COLORS.accent.primary, borderColor: COLORS.accent.primary },
  toggleTxt: { fontSize: TYPOGRAPHY.sizes.sm, color: COLORS.text.secondary },
  toggleTxtActive: { color: COLORS.text.primary, fontWeight: TYPOGRAPHY.weights.semibold },
});
