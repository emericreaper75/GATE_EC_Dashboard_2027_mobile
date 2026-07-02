import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { COLORS } from '../styles/colors';
import { RADIUS, SPACING } from '../styles/spacing';
import { TYPOGRAPHY } from '../styles/typography';

export function Button({ title, onPress, variant = 'primary', size = 'md', disabled, loading, icon, style, textStyle }) {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.75}
      style={[
        styles.base,
        styles[variant],
        styles[`size_${size}`],
        isDisabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={variant === 'primary' ? COLORS.text.primary : COLORS.accent.primary} />
      ) : (
        <>
          {icon}
          <Text style={[styles.text, styles[`text_${variant}`], textStyle]}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: RADIUS.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  primary: {
    backgroundColor: COLORS.accent.primary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  danger: {
    backgroundColor: COLORS.accent.danger,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  success: {
    backgroundColor: COLORS.accent.success,
  },
  size_sm: { paddingVertical: SPACING.xs, paddingHorizontal: SPACING.md, minHeight: 36 },
  size_md: { paddingVertical: SPACING.md, paddingHorizontal: SPACING.base, minHeight: 44 },
  size_lg: { paddingVertical: SPACING.base, paddingHorizontal: SPACING.xl, minHeight: 52 },
  disabled: { opacity: 0.45 },
  text: {
    fontSize: TYPOGRAPHY.sizes.base,
    fontWeight: TYPOGRAPHY.weights.semibold,
  },
  text_primary: { color: COLORS.text.primary },
  text_outline: { color: COLORS.text.secondary },
  text_danger: { color: COLORS.text.primary },
  text_ghost: { color: COLORS.accent.primary },
  text_success: { color: COLORS.text.primary },
});
