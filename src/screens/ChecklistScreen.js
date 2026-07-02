import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useStore } from '../store';
import { Modal } from '../components/Modal';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { SubjectBadge } from '../components/SubjectBadge';
import { EmptyState } from '../components/EmptyState';
import { COLORS } from '../styles/colors';
import { SPACING } from '../styles/spacing';
import { TYPOGRAPHY } from '../styles/typography';
import { SUBJECTS, PRIORITY_LEVELS } from '../utils/constants';
import { getTodayStr } from '../utils/helpers';

export default function ChecklistScreen() {
  const { tasks, addTask, updateTask, deleteTask } = useStore();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: '', subject: 'Networks', priority: 'P1', estimatedMinutes: '30' });

  // Filter tasks for today
  const todayStr = getTodayStr();
  const todaysTasks = tasks.filter(t => t.date === todayStr);

  const openAdd = () => {
    setForm({ title: '', subject: 'Networks', priority: 'P1', estimatedMinutes: '30' });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!form.title.trim()) return;
    addTask({
      title: form.title,
      subject: form.subject,
      priority: form.priority,
      estimatedMinutes: parseInt(form.estimatedMinutes) || 30,
      completed: false,
      date: todayStr,
    });
    setShowModal(false);
  };

  const toggleTask = (task) => {
    updateTask(task.id, { completed: !task.completed });
  };

  const renderTask = ({ item }) => (
    <View style={[styles.taskCard, item.completed && styles.taskCardCompleted]}>
      <TouchableOpacity onPress={() => toggleTask(item)} style={styles.checkBtn}>
        <MaterialCommunityIcons 
          name={item.completed ? "check-circle" : "checkbox-blank-circle-outline"} 
          size={24} 
          color={item.completed ? COLORS.accent.success : COLORS.text.muted} 
        />
      </TouchableOpacity>
      
      <View style={styles.taskInfo}>
        <Text style={[styles.taskTitle, item.completed && styles.taskTitleCompleted]}>
          {item.title}
        </Text>
        <View style={styles.taskMeta}>
          <SubjectBadge subject={item.subject} />
          <Badge 
            label={item.priority} 
            variant={item.priority === 'P1' ? 'danger' : item.priority === 'P2' ? 'warning' : 'muted'} 
          />
          <Text style={styles.taskDuration}>⏱ {item.estimatedMinutes}m</Text>
        </View>
      </View>

      <TouchableOpacity onPress={() => deleteTask(item.id)} style={styles.deleteBtn}>
        <MaterialCommunityIcons name="trash-can-outline" size={20} color={COLORS.text.muted} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={todaysTasks}
        keyExtractor={(item) => item.id}
        renderItem={renderTask}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <EmptyState 
            icon="checkbox-marked-outline" 
            title="All caught up!" 
            description="No tasks for today. Take a break or add a new task." 
          />
        }
      />

      <TouchableOpacity style={styles.fab} onPress={openAdd} activeOpacity={0.85}>
        <Text style={styles.fabText}>＋</Text>
      </TouchableOpacity>

      <Modal visible={showModal} onClose={() => setShowModal(false)} title="Add Task">
        <Input 
          label="Title" 
          value={form.title} 
          onChangeText={(v) => setForm({ ...form, title: v })} 
          placeholder="e.g. Solve 10 PYQs" 
          autoFocus 
        />

        <Text style={styles.pickerLabel}>Subject</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipScroll}>
          {SUBJECTS.map((s) => (
            <TouchableOpacity 
              key={s} 
              onPress={() => setForm({ ...form, subject: s })}
              style={[styles.chip, form.subject === s && styles.chipActive]}
            >
              <Text style={[styles.chipText, form.subject === s && styles.chipTextActive]}>{s}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.pickerLabel}>Priority</Text>
        <View style={styles.priorityRow}>
          {PRIORITY_LEVELS.map((p) => (
            <TouchableOpacity 
              key={p} 
              onPress={() => setForm({ ...form, priority: p })}
              style={[styles.priorityBtn, form.priority === p && styles.priorityBtnActive]}
            >
              <Text style={[styles.priorityTxt, form.priority === p && styles.priorityTxtActive]}>{p}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Input 
          label="Estimated Minutes" 
          value={form.estimatedMinutes} 
          onChangeText={(v) => setForm({ ...form, estimatedMinutes: v })} 
          keyboardType="numeric" 
        />
        
        <Button title="Add Task" onPress={handleSave} style={{ marginTop: SPACING.sm }} />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg.primary },
  listContent: { padding: SPACING.base, paddingBottom: 100, flexGrow: 1 },
  
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.bg.secondary,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
  },
  taskCardCompleted: {
    opacity: 0.6,
  },
  checkBtn: {
    marginRight: SPACING.md,
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    fontSize: TYPOGRAPHY.sizes.base,
    color: COLORS.text.primary,
    fontWeight: TYPOGRAPHY.weights.medium,
    marginBottom: SPACING.xs,
  },
  taskTitleCompleted: {
    textDecorationLine: 'line-through',
    color: COLORS.text.muted,
  },
  taskMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: SPACING.xs,
  },
  taskDuration: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.text.muted,
  },
  deleteBtn: {
    padding: SPACING.xs,
    marginLeft: SPACING.sm,
  },

  fab: { 
    position: 'absolute', 
    bottom: 24, 
    right: 24, 
    width: 56, 
    height: 56, 
    borderRadius: 28, 
    backgroundColor: COLORS.accent.primary, 
    justifyContent: 'center', 
    alignItems: 'center', 
    elevation: 8 
  },
  fabText: { fontSize: 28, color: COLORS.text.primary, lineHeight: 32 },

  pickerLabel: { 
    fontSize: TYPOGRAPHY.sizes.xs, 
    color: COLORS.text.secondary, 
    marginBottom: SPACING.xs, 
    textTransform: 'uppercase', 
    letterSpacing: 0.5 
  },
  chipScroll: { marginBottom: SPACING.md },
  chip: { 
    paddingHorizontal: SPACING.md, 
    paddingVertical: SPACING.xs, 
    borderRadius: 99, 
    backgroundColor: COLORS.bg.secondary, 
    borderWidth: 1, 
    borderColor: COLORS.border, 
    marginRight: SPACING.xs 
  },
  chipActive: { backgroundColor: COLORS.accent.primary, borderColor: COLORS.accent.primary },
  chipText: { fontSize: TYPOGRAPHY.sizes.xs, color: COLORS.text.secondary },
  chipTextActive: { color: COLORS.text.primary, fontWeight: TYPOGRAPHY.weights.semibold },

  priorityRow: { flexDirection: 'row', gap: SPACING.xs, marginBottom: SPACING.md },
  priorityBtn: { flex: 1, padding: SPACING.md, borderRadius: 8, borderWidth: 1, borderColor: COLORS.border, alignItems: 'center' },
  priorityBtnActive: { borderColor: COLORS.accent.primary, backgroundColor: 'rgba(59,130,246,0.1)' },
  priorityTxt: { fontSize: TYPOGRAPHY.sizes.sm, color: COLORS.text.secondary },
  priorityTxtActive: { color: COLORS.accent.primary, fontWeight: TYPOGRAPHY.weights.bold },
});
