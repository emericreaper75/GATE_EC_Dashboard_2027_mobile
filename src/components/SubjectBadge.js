import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../styles/colors';
import { RADIUS, SPACING } from '../styles/spacing';
import { TYPOGRAPHY } from '../styles/typography';

export function SubjectBadge({ subject, style }) {
  const color = COLORS.subject[subject] || COLORS.text.muted;
  return (
    <View style={[styles.badge, { backgroundColor: `${color}20`, borderColor: `${color}40` }, style]}>
      <Text style={[styles.text, { color }]}>{subject}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.semibold,
  },
});
