import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS } from '../styles/colors';
import { RADIUS, SPACING } from '../styles/spacing';

export function Card({ children, style, accentColor, ...props }) {
  return (
    <View
      style={[
        styles.card,
        accentColor && { borderLeftWidth: 3, borderLeftColor: accentColor },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}

export function CardHeader({ children, style, ...props }) {
  return (
    <View style={[styles.header, style]} {...props}>
      {children}
    </View>
  );
}

export function CardContent({ children, style, ...props }) {
  return (
    <View style={[styles.content, style]} {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.bg.secondary,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  header: {
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.bg.elevated,
  },
  content: {
    padding: SPACING.base,
  },
});
