import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Vibration } from 'react-native';
import { COLORS } from '../styles/colors';
import { SPACING } from '../styles/spacing';
import { TYPOGRAPHY } from '../styles/typography';

const SESSIONS = [
  { label: '25 min', seconds: 25 * 60 },
  { label: '45 min', seconds: 45 * 60 },
  { label: '60 min', seconds: 60 * 60 },
  { label: '90 min', seconds: 90 * 60 },
];

export default function FocusTimerScreen() {
  const [selected, setSelected] = useState(0);
  const [remaining, setRemaining] = useState(SESSIONS[0].seconds);
  const [running, setRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const interval = useRef(null);

  useEffect(() => {
    setRemaining(SESSIONS[selected].seconds);
    setRunning(false);
    clearInterval(interval.current);
  }, [selected]);

  useEffect(() => {
    if (running) {
      interval.current = setInterval(() => {
        setRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(interval.current);
            setRunning(false);
            setSessions((s) => s + 1);
            Vibration.vibrate([0, 400, 200, 400]);
            return SESSIONS[selected].seconds;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(interval.current);
    }
    return () => clearInterval(interval.current);
  }, [running, selected]);

  const total = SESSIONS[selected].seconds;
  const progress = 1 - remaining / total;
  const mins = String(Math.floor(remaining / 60)).padStart(2, '0');
  const secs = String(remaining % 60).padStart(2, '0');

  const circumference = 2 * Math.PI * 110;
  const dashOffset = circumference * (1 - progress);

  return (
    <View style={styles.container}>
      {/* Session selector */}
      <View style={styles.sessionRow}>
        {SESSIONS.map((s, i) => (
          <TouchableOpacity key={i} onPress={() => setSelected(i)} style={[styles.sessionBtn, selected === i && styles.sessionBtnActive]}>
            <Text style={[styles.sessionTxt, selected === i && styles.sessionTxtActive]}>{s.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Timer circle */}
      <View style={styles.timerContainer}>
        <View style={styles.outerRing}>
          <View style={styles.innerRing}>
            <Text style={styles.timerText}>{mins}:{secs}</Text>
            <Text style={styles.timerLabel}>{running ? 'FOCUS' : remaining === total ? 'READY' : 'PAUSED'}</Text>
          </View>
        </View>
        {/* Progress arc using a view trick */}
        <View style={[styles.progressArc, { transform: [{ rotate: `${progress * 360}deg` }] }]} />
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity style={styles.resetBtn} onPress={() => { setRunning(false); setRemaining(SESSIONS[selected].seconds); }}>
          <Text style={styles.resetTxt}>↺ Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.playBtn, running && styles.pauseBtn]} onPress={() => setRunning(!running)}>
          <Text style={styles.playTxt}>{running ? '⏸' : '▶'}</Text>
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statVal}>{sessions}</Text>
          <Text style={styles.statLabel}>Sessions Done</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statVal}>{sessions * Math.floor(SESSIONS[selected].seconds / 60)}</Text>
          <Text style={styles.statLabel}>Total Minutes</Text>
        </View>
      </View>

      {/* Motivational text */}
      <Text style={styles.motivational}>
        {sessions === 0 ? '🎯 Deep work beats smart work.' : sessions < 3 ? '🔥 Keep going!' : '⚡ You\'re on fire!'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg.primary, alignItems: 'center', paddingTop: SPACING.xl },
  sessionRow: { flexDirection: 'row', gap: SPACING.sm, marginBottom: SPACING['2xl'] },
  sessionBtn: { paddingHorizontal: SPACING.base, paddingVertical: SPACING.sm, borderRadius: 99, backgroundColor: COLORS.bg.secondary, borderWidth: 1, borderColor: COLORS.border },
  sessionBtnActive: { backgroundColor: COLORS.accent.primary, borderColor: COLORS.accent.primary },
  sessionTxt: { fontSize: TYPOGRAPHY.sizes.sm, color: COLORS.text.secondary, fontWeight: TYPOGRAPHY.weights.medium },
  sessionTxtActive: { color: COLORS.text.primary, fontWeight: TYPOGRAPHY.weights.bold },
  timerContainer: { width: 260, height: 260, alignItems: 'center', justifyContent: 'center', marginBottom: SPACING['2xl'] },
  outerRing: { width: 240, height: 240, borderRadius: 120, borderWidth: 3, borderColor: COLORS.accent.primary, alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.bg.secondary },
  innerRing: { alignItems: 'center' },
  timerText: { fontSize: 56, fontWeight: TYPOGRAPHY.weights.extrabold, color: COLORS.text.primary, letterSpacing: -2, fontVariant: ['tabular-nums'] },
  timerLabel: { fontSize: TYPOGRAPHY.sizes.xs, color: COLORS.text.muted, letterSpacing: 3, textTransform: 'uppercase', marginTop: 4 },
  progressArc: { position: 'absolute', width: 0, height: 0 },
  controls: { flexDirection: 'row', alignItems: 'center', gap: SPACING.xl, marginBottom: SPACING['2xl'] },
  resetBtn: { padding: SPACING.md },
  resetTxt: { fontSize: TYPOGRAPHY.sizes.base, color: COLORS.text.secondary },
  playBtn: { width: 72, height: 72, borderRadius: 36, backgroundColor: COLORS.accent.primary, justifyContent: 'center', alignItems: 'center', elevation: 6, shadowColor: COLORS.accent.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.5, shadowRadius: 8 },
  pauseBtn: { backgroundColor: COLORS.accent.warning },
  playTxt: { fontSize: 30, color: COLORS.text.primary },
  statsRow: { flexDirection: 'row', gap: SPACING.xl, marginBottom: SPACING.lg },
  statBox: { alignItems: 'center' },
  statVal: { fontSize: TYPOGRAPHY.sizes['2xl'], fontWeight: TYPOGRAPHY.weights.bold, color: COLORS.accent.primary },
  statLabel: { fontSize: TYPOGRAPHY.sizes.xs, color: COLORS.text.muted, marginTop: 2 },
  motivational: { fontSize: TYPOGRAPHY.sizes.base, color: COLORS.text.secondary, textAlign: 'center', fontStyle: 'italic' },
});
