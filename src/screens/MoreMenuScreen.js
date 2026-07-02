import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useStore } from '../store';
import { COLORS } from '../styles/colors';
import { SPACING } from '../styles/spacing';
import { TYPOGRAPHY } from '../styles/typography';

const MENU_ITEMS = [
  { icon: 'alert-circle-outline',    label: 'Error Journal',      screen: 'ErrorJournal',      color: COLORS.accent.danger,   desc: 'Log & fix your mistakes' },
  { icon: 'lightning-bolt',          label: 'Formula Sheets',     screen: 'FormulaSheet',      color: COLORS.accent.warning,  desc: 'Combat formula cards' },
  { icon: 'notebook-outline',        label: 'Learning Notes',     screen: 'LearningNotes',     color: COLORS.accent.purple,   desc: 'Concept notes per subject' },
  { icon: 'calendar-check-outline',  label: 'Weekly Review',      screen: 'WeeklyReview',      color: COLORS.accent.primary,  desc: 'Weekly performance log' },
  { icon: 'bell-outline',            label: 'Reminders',          screen: 'Reminders',         color: COLORS.accent.success,  desc: 'Study schedule alerts' },
  { icon: 'brain',                   label: 'Recall Queue',       screen: 'SpacedRepetition',  color: '#A855F7',              desc: 'Spaced repetition review' },
  { icon: 'timer-outline',           label: 'Focus Timer',        screen: 'FocusTimer',        color: '#06B6D4',              desc: 'Pomodoro / deep work' },
  { icon: 'map-marker-path',         label: 'Strategy Plan',      screen: 'StrategyPlan',      color: '#F97316',              desc: '7-month phase milestones' },
  { icon: 'cog-outline',             label: 'Settings',           screen: 'Settings',          color: COLORS.text.muted,      desc: 'Export, backup, reset' },
];

export default function MoreMenuScreen() {
  const navigation = useNavigation();
  const { formulas, errors, notes, reminders } = useStore();

  const counts = {
    ErrorJournal: errors.filter((e) => e.status === 'Pending').length,
    FormulaSheet: formulas.filter((f) => f.confidence === 'Shaky').length,
    LearningNotes: notes.length,
    Reminders: reminders.filter((r) => r.active).length,
    SpacedRepetition: (() => {
      const today = new Date().toISOString().split('T')[0];
      return formulas.filter((f) => f.srs && f.srs.nextReviewDate <= today).length;
    })(),
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <Text style={styles.greeting}>MORE TOOLS</Text>
      <Text style={styles.subGreeting}>All your study tools in one place</Text>

      <View style={styles.grid}>
        {MENU_ITEMS.map((item) => {
          const count = counts[item.screen];
          return (
            <TouchableOpacity
              key={item.screen}
              style={styles.menuItem}
              onPress={() => navigation.navigate(item.screen)}
              activeOpacity={0.75}
            >
              <View style={[styles.iconWrap, { backgroundColor: `${item.color}18` }]}>
                <MaterialCommunityIcons name={item.icon} size={26} color={item.color} />
                {count > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{count > 99 ? '99+' : count}</Text>
                  </View>
                )}
              </View>
              <Text style={styles.menuLabel}>{item.label}</Text>
              <Text style={styles.menuDesc} numberOfLines={1}>{item.desc}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg.primary },
  content: { padding: SPACING.base, paddingBottom: 120 },
  greeting: { fontSize: TYPOGRAPHY.sizes.xs, color: COLORS.text.muted, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 4 },
  subGreeting: { fontSize: TYPOGRAPHY.sizes.md, fontWeight: TYPOGRAPHY.weights.semibold, color: COLORS.text.secondary, marginBottom: SPACING.xl },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm },
  menuItem: {
    width: '47%',
    backgroundColor: COLORS.bg.secondary,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.base,
    alignItems: 'flex-start',
  },
  iconWrap: { width: 48, height: 48, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: SPACING.sm, position: 'relative' },
  badge: { position: 'absolute', top: -4, right: -4, backgroundColor: COLORS.accent.danger, borderRadius: 10, minWidth: 18, height: 18, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 4 },
  badgeText: { fontSize: 9, color: COLORS.text.primary, fontWeight: TYPOGRAPHY.weights.bold },
  menuLabel: { fontSize: TYPOGRAPHY.sizes.base, fontWeight: TYPOGRAPHY.weights.bold, color: COLORS.text.primary, marginBottom: 2 },
  menuDesc: { fontSize: TYPOGRAPHY.sizes.xs, color: COLORS.text.muted },
});
