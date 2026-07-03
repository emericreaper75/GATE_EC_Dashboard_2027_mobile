import React, { useCallback } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDashboardStats } from '../hooks/useDashboardStats';
import { Card, CardHeader, CardContent } from '../components/Card';
import { ProgressBar } from '../components/ProgressBar';
import { Badge } from '../components/Badge';
import { COLORS } from '../styles/colors';
import { SPACING } from '../styles/spacing';
import { TYPOGRAPHY } from '../styles/typography';
import { masteryColor, pct } from '../utils/helpers';

const FEATURE_CARDS = [
  { id: 1, title: '📝 Error Journal', subtitle: 'Learn from mistakes', route: 'ErrorJournal' },
  { id: 2, title: '📊 PYQ Log', subtitle: 'Track accuracy & stats', route: 'PYQLog' },
  { id: 3, title: '🧠 Formula Review', subtitle: 'Flashcard practice', route: 'FormulaSheet' },
  { id: 4, title: '📈 Mock Analyzer', subtitle: 'Track performance', route: 'MockAnalyzer' },
  { id: 5, title: '📖 Weekly Review', subtitle: 'Sunday reflection', route: 'WeeklyReview' },
  { id: 6, title: '🗺 Strategic Plan', subtitle: '7-month roadmap', route: 'StrategyPlan' }
];

export default React.memo(function DashboardScreen() {
  const stats = useDashboardStats();
  const nav = useNavigation();

  const handleCardPress = useCallback((route) => {
    nav.navigate('HomeStack', { screen: route });
  }, [nav]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* ── Countdown Banner ──────────────────────────────────────── */}
      <Card accentColor={COLORS.accent.primary} style={styles.countdownCard}>
        <View style={styles.countdownInner}>
          <View>
            <Text style={styles.countdownLabel}>TIME REMAINING</Text>
            <Text style={styles.countdownDays}>{stats.daysToGate}</Text>
            <Text style={styles.countdownUnit}>DAYS TO GATE 2027</Text>
          </View>
          <View style={styles.phaseBlock}>
            <Text style={styles.countdownLabel}>CURRENT PHASE</Text>
            <Text style={styles.phaseName}>{stats.phaseName}</Text>
            <Text style={styles.phaseDays}>{stats.daysInCurrentPhase} days left</Text>
          </View>
        </View>

        {/* Phase progress bars */}
        <View style={styles.phaseBars}>
          <View style={styles.phaseBarRow}>
            <Text style={styles.phaseBarLabel}>Phase 1</Text>
            <ProgressBar value={stats.phase1Progress} color={COLORS.accent.primary} height={4} style={styles.phaseBar} />
            <Text style={styles.phaseBarPct}>{pct(stats.phase1Progress)}</Text>
          </View>
          {!stats.isPhase1 && (
            <View style={styles.phaseBarRow}>
              <Text style={styles.phaseBarLabel}>Phase 2</Text>
              <ProgressBar value={stats.phase2Progress} color={COLORS.accent.danger} height={4} style={styles.phaseBar} />
              <Text style={styles.phaseBarPct}>{pct(stats.phase2Progress)}</Text>
            </View>
          )}
          <View style={styles.pyqRate}>
            <Text style={styles.pyqRateLabel}>PYQ RUN RATE REQUIRED:</Text>
            <Text style={styles.pyqRateValue}>{stats.pyqsPerDayTarget} PYQs/day</Text>
          </View>
        </View>
      </Card>

      {/* ── Snapshot Grid ─────────────────────────────────────────── */}
      <View style={styles.statsGrid}>
        <StatTile label="Tasks Today" value={`${stats.todaysCompletedTasks}/${stats.todaysTasks.length}`} color={COLORS.accent.success} />
        <StatTile label="Subjects" value={stats.subjectsStudiedToday} color={COLORS.accent.primary} />
        <StatTile label="Weak Topics" value={stats.weakTopicsCount} color={COLORS.accent.danger} />
        <StatTile label="Errors/Wk" value={stats.errorsThisWeek} color={COLORS.accent.warning} />
      </View>

      {/* ── Subject Mastery ───────────────────────────────────────── */}
      <Card style={styles.section}>
        <CardHeader>
          <Text style={styles.sectionTitle}>📊 SUBJECT MASTERY INDEX</Text>
        </CardHeader>
        <CardContent>
          {stats.masteryAverages.map(({ subject, average }) => (
            <View key={subject} style={styles.masteryRow}>
              <View style={styles.masteryLabels}>
                <Text style={styles.masterySubject} numberOfLines={1}>{subject}</Text>
                <Text style={[styles.masteryPct, { color: masteryColor(average) }]}>{average}%</Text>
              </View>
              <ProgressBar value={average} height={5} style={styles.masteryBar} />
            </View>
          ))}
        </CardContent>
      </Card>

      {/* ── Feature Cards Grid ──────────────────────────────────────── */}
      <Text style={styles.sectionTitle}>Quick Access</Text>
      <View style={styles.cardsGrid}>
        {FEATURE_CARDS.map(card => (
          <TouchableOpacity
            key={card.id}
            style={styles.featureCard}
            onPress={() => handleCardPress(card.route)}
            activeOpacity={0.7}
          >
            <Text style={styles.cardTitle}>{card.title}</Text>
            <Text style={styles.cardSubtitle}>{card.subtitle}</Text>
            <Text style={styles.cardArrow}>→</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ── Motivation ────────────────────────────────────────────── */}
      <View style={styles.motivationCard}>
        <Text style={styles.motivationText}>
          "Today's work moves the needle on the 20% that matters"
        </Text>
      </View>

      {/* ── Recent Activity ───────────────────────────────────────── */}
      {stats.recentActivities.length > 0 && (
        <Card style={styles.section}>
          <CardHeader>
            <Text style={styles.sectionTitle}>⏱ RECENT ACTIVITY</Text>
          </CardHeader>
          <CardContent>
            {stats.recentActivities.map((act, i) => (
              <View key={act.id} style={[styles.actRow, i > 0 && styles.actBorder]}>
                <View style={styles.actDot} />
                <View style={styles.actText}>
                  <Text style={styles.actLabel}>{act.text}</Text>
                  <Text style={styles.actMeta}>{act.time} · {act.type}</Text>
                </View>
              </View>
            ))}
          </CardContent>
        </Card>
      )}
    </ScrollView>
  );
});

const StatTile = React.memo(function StatTile({ label, value, color }) {
  return (
    <View style={styles.statTile}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={[styles.statValue, { color }]}>{value ?? 0}</Text>
    </View>
  );
});



const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg.primary },
  content: { padding: SPACING.base, paddingBottom: 120 },

  // Countdown
  countdownCard: { marginBottom: SPACING.base },
  countdownInner: { flexDirection: 'row', justifyContent: 'space-between', padding: SPACING.base },
  countdownLabel: { fontSize: TYPOGRAPHY.sizes.xs, color: COLORS.text.muted, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 2 },
  countdownDays: { fontSize: 52, fontWeight: TYPOGRAPHY.weights.extrabold, color: COLORS.accent.primary, lineHeight: 56 },
  countdownUnit: { fontSize: TYPOGRAPHY.sizes.xs, color: COLORS.text.secondary, textTransform: 'uppercase', letterSpacing: 0.5 },
  phaseBlock: { alignItems: 'flex-end' },
  phaseName: { fontSize: TYPOGRAPHY.sizes.base, fontWeight: TYPOGRAPHY.weights.bold, color: COLORS.text.primary, textAlign: 'right', marginTop: 2 },
  phaseDays: { fontSize: TYPOGRAPHY.sizes.xs, color: COLORS.accent.warning, textTransform: 'uppercase', marginTop: 2 },

  // Phase bars
  phaseBars: { paddingHorizontal: SPACING.base, paddingBottom: SPACING.base, gap: SPACING.xs },
  phaseBarRow: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm },
  phaseBarLabel: { fontSize: TYPOGRAPHY.sizes.xs, color: COLORS.text.secondary, width: 52 },
  phaseBar: { flex: 1 },
  phaseBarPct: { fontSize: TYPOGRAPHY.sizes.xs, color: COLORS.text.secondary, width: 34, textAlign: 'right' },
  pyqRate: { flexDirection: 'row', justifyContent: 'space-between', paddingTop: SPACING.sm, borderTopWidth: 1, borderTopColor: COLORS.border, marginTop: SPACING.xs },
  pyqRateLabel: { fontSize: TYPOGRAPHY.sizes.xs, color: COLORS.text.secondary, textTransform: 'uppercase' },
  pyqRateValue: { fontSize: TYPOGRAPHY.sizes.xs, color: COLORS.accent.primary, fontWeight: TYPOGRAPHY.weights.bold },

  // Stats
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm, marginBottom: SPACING.base },
  statTile: { flex: 1, minWidth: '45%', backgroundColor: COLORS.bg.secondary, borderRadius: 10, borderWidth: 1, borderColor: COLORS.border, padding: SPACING.md, alignItems: 'center' },
  statLabel: { fontSize: TYPOGRAPHY.sizes.xs, color: COLORS.text.muted, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 },
  statValue: { fontSize: TYPOGRAPHY.sizes['2xl'], fontWeight: TYPOGRAPHY.weights.bold },

  // Mastery
  section: { marginBottom: SPACING.base },
  sectionTitle: { fontSize: TYPOGRAPHY.sizes.sm, fontWeight: TYPOGRAPHY.weights.bold, color: COLORS.text.primary, textTransform: 'uppercase', letterSpacing: 0.5 },
  masteryRow: { marginBottom: SPACING.sm },
  masteryLabels: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  masterySubject: { fontSize: TYPOGRAPHY.sizes.sm, color: COLORS.text.primary, flex: 1, marginRight: 8 },
  masteryPct: { fontSize: TYPOGRAPHY.sizes.sm, fontWeight: TYPOGRAPHY.weights.semibold },
  masteryBar: { marginTop: 0 },

  // Quick actions / Cards
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 24
  },
  featureCard: {
    width: '48%',
    backgroundColor: COLORS.bg.secondary,
    borderRadius: 10,
    padding: 14,
    borderWidth: 0.5,
    borderColor: COLORS.border,
    minHeight: 100,
    justifyContent: 'space-between'
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text.primary
  },
  cardSubtitle: {
    fontSize: 11,
    color: COLORS.text.secondary,
    marginTop: 4
  },
  cardArrow: {
    fontSize: 16,
    color: COLORS.accent.primary,
    marginTop: 8,
    fontWeight: '700'
  },
  motivationCard: {
    backgroundColor: COLORS.bg.secondary,
    borderRadius: 10,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.accent.success,
    marginBottom: 20
  },
  motivationText: {
    fontSize: 13,
    fontStyle: 'italic',
    color: COLORS.text.secondary,
    lineHeight: 20
  },

  // Activity
  actRow: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: SPACING.xs, gap: SPACING.sm },
  actBorder: { borderTopWidth: 1, borderTopColor: COLORS.border },
  actDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: COLORS.accent.primary, marginTop: 5 },
  actText: { flex: 1 },
  actLabel: { fontSize: TYPOGRAPHY.sizes.sm, color: COLORS.text.primary },
  actMeta: { fontSize: TYPOGRAPHY.sizes.xs, color: COLORS.text.muted, marginTop: 1 },
});
