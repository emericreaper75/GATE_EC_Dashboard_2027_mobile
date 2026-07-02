import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useStore } from '../store';
import { Card, CardHeader, CardContent } from '../components/Card';
import { Badge } from '../components/Badge';
import { ProgressBar } from '../components/ProgressBar';
import { Button } from '../components/Button';
import { COLORS } from '../styles/colors';
import { SPACING } from '../styles/spacing';
import { TYPOGRAPHY } from '../styles/typography';
import { formatDate, daysUntil } from '../utils/helpers';

const PHASE_COLORS = { 'Phase 1': COLORS.accent.primary, 'Phase 2': COLORS.accent.danger };
const STATUS_VARIANT = { Pending: 'muted', 'On track': 'success', 'At risk': 'warning', Done: 'success' };

export default function StrategyPlanScreen() {
  const { milestones, updateMilestone, addMilestone, deleteMilestone } = useStore();
  const [expandedPhase, setExpandedPhase] = useState('Phase 1');

  const phases = ['Phase 1', 'Phase 2'];

  const getPhaseStats = (phase) => {
    const items = milestones.filter((m) => m.phase === phase);
    const done = items.filter((m) => m.status === 'Done').length;
    return { total: items.length, done, pct: items.length > 0 ? Math.round((done / items.length) * 100) : 0 };
  };

  const cycleStatus = (m) => {
    const statuses = ['Pending', 'On track', 'At risk', 'Done'];
    const idx = statuses.indexOf(m.status);
    updateMilestone(m.id, { status: statuses[(idx + 1) % statuses.length] });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      {/* Phase summary */}
      {phases.map((phase) => {
        const stats = getPhaseStats(phase);
        const items = milestones.filter((m) => m.phase === phase);
        const isExpanded = expandedPhase === phase;

        return (
          <View key={phase} style={styles.phaseBlock}>
            <TouchableOpacity
              style={[styles.phaseHeader, { borderLeftColor: PHASE_COLORS[phase] }]}
              onPress={() => setExpandedPhase(isExpanded ? null : phase)}
              activeOpacity={0.8}
            >
              <View>
                <Text style={styles.phaseTitle}>{phase}</Text>
                <Text style={styles.phaseSubtitle}>
                  {phase === 'Phase 1' ? 'Jul 1 – Nov 30, 2026' : 'Dec 1, 2026 – Feb 7, 2027'}
                </Text>
              </View>
              <View style={styles.phaseRight}>
                <Text style={[styles.phasePct, { color: PHASE_COLORS[phase] }]}>{stats.done}/{stats.total}</Text>
                <ProgressBar value={stats.pct} color={PHASE_COLORS[phase]} height={4} style={{ width: 60, marginTop: 4 }} />
              </View>
            </TouchableOpacity>

            {isExpanded && items.map((milestone) => {
              const daysLeft = daysUntil(milestone.targetDate);
              const isOverdue = daysLeft === 0 && milestone.status !== 'Done';
              return (
                <TouchableOpacity
                  key={milestone.id}
                  style={[styles.milestoneRow, milestone.status === 'Done' && styles.milestoneRowDone]}
                  onPress={() => cycleStatus(milestone)}
                  activeOpacity={0.8}
                >
                  <View style={styles.milestoneLeft}>
                    <Text style={[styles.milestoneMark, milestone.status === 'Done' && styles.milestoneMarkDone]}>
                      {milestone.status === 'Done' ? '✓' : '○'}
                    </Text>
                  </View>
                  <View style={styles.milestoneBody}>
                    <Text style={[styles.milestoneTitle, milestone.status === 'Done' && styles.milestoneTitleDone]} numberOfLines={2}>
                      {milestone.title}
                    </Text>
                    <View style={styles.milestoneMeta}>
                      <Text style={[styles.milestoneDate, isOverdue && { color: COLORS.accent.danger }]}>
                        {formatDate(milestone.targetDate)}
                        {daysLeft > 0 && milestone.status !== 'Done' ? ` · ${daysLeft}d left` : ''}
                      </Text>
                      <Badge label={milestone.status} variant={STATUS_VARIANT[milestone.status] || 'muted'} />
                    </View>
                  </View>
                  <TouchableOpacity onPress={() => deleteMilestone(milestone.id)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                    <Text style={styles.deleteBtn}>✕</Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              );
            })}
          </View>
        );
      })}

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>💡 Tap any milestone to cycle its status: Pending → On track → At risk → Done</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg.primary },
  content: { padding: SPACING.base, paddingBottom: 120 },
  phaseBlock: { marginBottom: SPACING.lg },
  phaseHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderLeftWidth: 3, paddingLeft: SPACING.md, paddingVertical: SPACING.sm, marginBottom: SPACING.sm },
  phaseTitle: { fontSize: TYPOGRAPHY.sizes.lg, fontWeight: TYPOGRAPHY.weights.bold, color: COLORS.text.primary },
  phaseSubtitle: { fontSize: TYPOGRAPHY.sizes.xs, color: COLORS.text.muted, marginTop: 2 },
  phaseRight: { alignItems: 'flex-end' },
  phasePct: { fontSize: TYPOGRAPHY.sizes.md, fontWeight: TYPOGRAPHY.weights.bold },
  milestoneRow: { flexDirection: 'row', alignItems: 'flex-start', backgroundColor: COLORS.bg.secondary, borderRadius: 10, borderWidth: 1, borderColor: COLORS.border, padding: SPACING.md, marginBottom: SPACING.xs, gap: SPACING.sm },
  milestoneRowDone: { opacity: 0.55 },
  milestoneLeft: { paddingTop: 2 },
  milestoneMark: { fontSize: TYPOGRAPHY.sizes.lg, color: COLORS.text.muted },
  milestoneMarkDone: { color: COLORS.accent.success },
  milestoneBody: { flex: 1 },
  milestoneTitle: { fontSize: TYPOGRAPHY.sizes.sm, fontWeight: TYPOGRAPHY.weights.medium, color: COLORS.text.primary, marginBottom: SPACING.xs },
  milestoneTitleDone: { textDecorationLine: 'line-through', color: COLORS.text.muted },
  milestoneMeta: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm },
  milestoneDate: { fontSize: TYPOGRAPHY.sizes.xs, color: COLORS.text.muted },
  deleteBtn: { color: COLORS.text.muted, fontSize: 14, marginTop: 2 },
  infoBox: { backgroundColor: COLORS.bg.elevated, borderRadius: 8, padding: SPACING.md, borderWidth: 1, borderColor: COLORS.border },
  infoText: { fontSize: TYPOGRAPHY.sizes.xs, color: COLORS.text.muted, textAlign: 'center', lineHeight: 18 },
});
