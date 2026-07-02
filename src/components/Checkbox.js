import React from 'react';
import { TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { COLORS } from '../styles/colors';
import { RADIUS } from '../styles/spacing';

export function Checkbox({ checked, onPress, size = 24 }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.box,
        { width: size, height: size, borderRadius: size * 0.25 },
        checked && styles.checked,
      ]}
      activeOpacity={0.7}
    >
      {checked && (
        <Animated.Text style={[styles.check, { fontSize: size * 0.6 }]}>✓</Animated.Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  box: {
    borderWidth: 1.5,
    borderColor: COLORS.border,
    backgroundColor: COLORS.bg.input,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checked: {
    backgroundColor: COLORS.accent.primary,
    borderColor: COLORS.accent.primary,
  },
  check: {
    color: COLORS.text.primary,
    fontWeight: '700',
    lineHeight: undefined,
  },
});
