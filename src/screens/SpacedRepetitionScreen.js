import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useStore } from '../store';
import { Badge } from '../components/Badge';
import { EmptyState } from '../components/EmptyState';
import { SubjectBadge } from '../components/SubjectBadge';
import { COLORS } from '../styles/colors';
import { SPACING } from '../styles/spacing';
import { TYPOGRAPHY } from '../styles/typography';
import { formatDate } from '../utils/helpers';

export default function SpacedRepetitionScreen() {
  const { formulas, mastery, updateFormula, updateMastery } = useStore();
  const [tab, setTab] = useState('formulas');

  const today = new Date().toISOString().split('T')[0];

  const dueFormulas = formulas.filter(
    (f) => f.srs && f.srs.nextReviewDate <= today
  );

  const dueMastery = mastery.filter(
    (m) => m.srs && m.srs.nextReviewDate <= today
  );

  const markFormulaReviewed = (f) => {
    const nextDate = new Date();
    const interval = (f.srs?.interval || 1) * 2;
    nextDate.setDate(nextDate.getDate() + interval);
    updateFormula(f.id, {
      lastReviewed: today,
      srs: { ...f.srs, interval, nextReviewDate: nextDate.toISOString().split('T')[0] },
    });
  };

  const markMasteryReviewed = (m) => {
    const nextDate = new Date();
    const interval = (m.srs?.interval || 1) * 2;
    nextDate.setDate(nextDate.getDate() + interval);
    updateMastery(m.id, {
      lastUpdated: today,
      srs: { ...m.srs, interval, nextReviewDate: nextDate.toISOString().split('T')[0] },
    });
  };

  const data = tab === 'formulas' ? dueFormulas : dueMastery;

  return (
    <View style={styles.container}>
      <View style={styles.tabRow}>
        {['formulas', 'topics'].map((t) => (
          <TouchableOpacity key={t} onPress={() => setTab(t)} style={[styles.tabBtn, tab === t && styles.tabBtnActive]}>
            <Text style={[styles.tabTxt, tab === t && styles.tabTxtActive]}>
              {t === 'formulas' ? `📐 Formulas (${dueFormulas.length})` : `📚 Topics (${dueMastery.length})`}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <EmptyState
            icon="✅"
            title="All caught up!"
            subtitle="No items due for review today. Come back tomorrow."
          />
        }
        renderItem={({ item }) => (
          <View style={styles.reviewCard}>
            <View style={styles.cardTop}>
              <SubjectBadge subject={item.subject} />
              {item.srs?.nextReviewDate ? (
                <Text style={styles.dueDate}>Due: {formatDate(item.srs.nextReviewDate)}</Text>
              ) : null}
            </View>
            <Text style={styles.itemName}>{item.name || item.topic}</Text>
            {item.content ? (
              <Text style={styles.itemContent} numberOfLines={3}>{item.content}</Text>
            ) : null}
            {item.notes ? (
              <Text style={styles.itemContent} numberOfLines={2}>{item.notes}</Text>
            ) : null}
            <View style={styles.cardActions}>
              <Text style={styles.intervalText}>Interval: {item.srs?.interval || 1} day(s)</Text>
              <TouchableOpacity
                style={styles.reviewBtn}
                onPress={() => tab === 'formulas' ? markFormulaReviewed(item) : markMasteryReviewed(item)}
              >
                <Text style={styles.reviewBtnTxt}>✓ Mark Reviewed</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg.primary },
  tabRow: { flexDirection: 'row', gap: SPACING.sm, padding: SPACING.base, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  tabBtn: { flex: 1, paddingVertical: SPACING.md, borderRadius: 8, backgroundColor: COLORS.bg.secondary, borderWidth: 1, borderColor: COLORS.border, alignItems: 'center' },
  tabBtnActive: { backgroundColor: COLORS.accent.primary, borderColor: COLORS.accent.primary },
  tabTxt: { fontSize: TYPOGRAPHY.sizes.sm, color: COLORS.text.secondary, fontWeight: TYPOGRAPHY.weights.medium },
  tabTxtActive: { color: COLORS.text.primary, fontWeight: TYPOGRAPHY.weights.bold },
  list: { padding: SPACING.base, paddingBottom: 120 },
  reviewCard: { backgroundColor: COLORS.bg.secondary, borderRadius: 10, borderWidth: 1, borderColor: COLORS.border, padding: SPACING.md, marginBottom: SPACING.sm, borderLeftWidth: 3, borderLeftColor: COLORS.accent.purple },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.sm },
  dueDate: { fontSize: TYPOGRAPHY.sizes.xs, color: COLORS.accent.warning },
  itemName: { fontSize: TYPOGRAPHY.sizes.md, fontWeight: TYPOGRAPHY.weights.bold, color: COLORS.text.primary, marginBottom: SPACING.xs },
  itemContent: { fontSize: TYPOGRAPHY.sizes.sm, color: COLORS.text.secondary, lineHeight: 20, marginBottom: SPACING.sm },
  cardActions: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: SPACING.sm, borderTopWidth: 1, borderTopColor: COLORS.border },
  intervalText: { fontSize: TYPOGRAPHY.sizes.xs, color: COLORS.text.muted },
  reviewBtn: { backgroundColor: COLORS.accent.success, paddingHorizontal: SPACING.md, paddingVertical: SPACING.xs, borderRadius: 8 },
  reviewBtnTxt: { fontSize: TYPOGRAPHY.sizes.sm, color: COLORS.text.primary, fontWeight: TYPOGRAPHY.weights.semibold },
});
