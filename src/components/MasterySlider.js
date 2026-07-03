import React, { useState, useEffect, useRef } from 'react';
import { View, Text, PanResponder, StyleSheet } from 'react-native';
import { COLORS } from '../styles/colors';
import { SPACING } from '../styles/spacing';
import { TYPOGRAPHY } from '../styles/typography';
import { masteryColor } from '../utils/helpers';

export const MasterySlider = React.memo(function MasterySlider({ value = 0, onSlidingComplete, label }) {
  const [trackWidth, setTrackWidth] = useState(1);
  const [localValue, setLocalValue] = useState(value);
  const isDragging = useRef(false);

  useEffect(() => {
    if (!isDragging.current) {
      setLocalValue(value);
    }
  }, [value]);

  const clampedValue = Math.min(100, Math.max(0, localValue));
  const color = masteryColor(clampedValue);

  const panResponder = useRef(PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: (e) => {
      isDragging.current = true;
      const { locationX } = e.nativeEvent;
      const newVal = Math.round((locationX / trackWidth) * 100);
      setLocalValue(Math.min(100, Math.max(0, newVal)));
    },
    onPanResponderMove: (e) => {
      const { locationX } = e.nativeEvent;
      const newVal = Math.round((locationX / trackWidth) * 100);
      setLocalValue(Math.min(100, Math.max(0, newVal)));
    },
    onPanResponderRelease: () => {
      isDragging.current = false;
      if (onSlidingComplete) {
        onSlidingComplete(localValue);
      }
    },
    onPanResponderTerminate: () => {
      isDragging.current = false;
      if (onSlidingComplete) {
        onSlidingComplete(localValue);
      }
    }
  })).current;

  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        {label ? <Text style={styles.label}>{label}</Text> : null}
        <Text style={[styles.value, { color }]}>{clampedValue}%</Text>
      </View>
      <View
        style={styles.track}
        onLayout={(e) => setTrackWidth(e.nativeEvent.layout.width)}
        {...panResponder.panHandlers}
      >
        <View style={[styles.fill, { width: `${clampedValue}%`, backgroundColor: color }]} />
        <View style={[styles.thumb, { left: `${clampedValue}%`, backgroundColor: color, marginLeft: -8 }]} />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: { width: '100%', paddingVertical: SPACING.xs },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.xs,
  },
  label: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.text.secondary,
  },
  value: {
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  track: {
    height: 6,
    backgroundColor: COLORS.bg.elevated,
    borderRadius: 3,
    overflow: 'visible',
    position: 'relative',
  },
  fill: {
    height: 6,
    borderRadius: 3,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  thumb: {
    width: 16,
    height: 16,
    borderRadius: 8,
    position: 'absolute',
    top: -5,
    borderWidth: 2,
    borderColor: COLORS.bg.primary,
  },
});
