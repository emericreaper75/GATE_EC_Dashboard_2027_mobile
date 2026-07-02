import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../styles/colors';
import { RADIUS, SPACING } from '../styles/spacing';
import { TYPOGRAPHY } from '../styles/typography';

const VARIANT_STYLES = {
  success: { bg: 'rgba(34,197,94,0.15)', text: COLORS.accent.success, border: 'rgba(34,197,94,0.3)' },
  warning: { bg: 'rgba(245,158,11,0.15)', text: COLORS.accent.warning, border: 'rgba(245,158,11,0.3)' },
  danger:  { bg: 'rgba(239,68,68,0.15)',  text: COLORS.accent.danger,  border: 'rgba(239,68,68,0.3)' },
  primary: { bg: 'rgba(59,130,246,0.15)', text: COLORS.accent.primary, border: 'rgba(59,130,246,0.3)' },
  purple:  { bg: 'rgba(168,85,247,0.15)', text: COLORS.accent.purple,  border: 'rgba(168,85,247,0.3)' },
  outline: { bg: 'transparent',           text: COLORS.text.secondary, border: COLORS.border },
  muted:   { bg: COLORS.bg.elevated,      text: COLORS.text.muted,     border: COLORS.border },
};

export function Badge({ label, variant = 'primary', style, textStyle }) {
  const v = VARIANT_STYLES[variant] || VARIANT_STYLES.primary;
  return (
    <View style={[styles.base, { backgroundColor: v.bg, borderColor: v.border }, style]}>
      <Text style={[styles.text, { color: v.text }, textStyle]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.semibold,
    letterSpacing: 0.3,
  },
});
