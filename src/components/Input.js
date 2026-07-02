import React from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../styles/colors';
import { RADIUS, SPACING } from '../styles/spacing';
import { TYPOGRAPHY } from '../styles/typography';

export function Input({ label, value, onChangeText, placeholder, multiline, numberOfLines, keyboardType, style, ...props }) {
  return (
    <View style={[styles.wrapper, style]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.text.muted}
        keyboardType={keyboardType || 'default'}
        multiline={multiline}
        numberOfLines={multiline ? (numberOfLines || 4) : 1}
        style={[
          styles.input,
          multiline && styles.multiline,
        ]}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.text.secondary,
    marginBottom: SPACING.xs,
    fontWeight: TYPOGRAPHY.weights.medium,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: COLORS.bg.input,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    color: COLORS.text.primary,
    fontSize: TYPOGRAPHY.sizes.base,
    minHeight: 44,
  },
  multiline: {
    textAlignVertical: 'top',
    minHeight: 100,
    paddingTop: SPACING.md,
  },
});
