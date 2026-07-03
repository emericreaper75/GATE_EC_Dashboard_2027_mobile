import React, { useRef, useEffect } from 'react';
import { View, Animated, StyleSheet, InteractionManager } from 'react-native';
import { COLORS } from '../styles/colors';
import { RADIUS } from '../styles/spacing';

export function ProgressBar({ value = 0, color, height = 6, style }) {
  const animWidth = useRef(new Animated.Value(0)).current;

  const clampedValue = Math.min(100, Math.max(0, value));
  const barColor = color || (
    clampedValue >= 75 ? COLORS.accent.success :
    clampedValue >= 50 ? COLORS.accent.warning :
    COLORS.accent.danger
  );

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      Animated.timing(animWidth, {
        toValue: clampedValue,
        duration: 500,
        useNativeDriver: false,
      }).start();
    });
  }, [clampedValue]);

  return (
    <View style={[styles.track, { height }, style]}>
      <Animated.View
        style={[
          styles.bar,
          {
            height,
            backgroundColor: barColor,
            width: animWidth.interpolate({
              inputRange: [0, 100],
              outputRange: ['0%', '100%'],
            }),
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: '100%',
    backgroundColor: COLORS.bg.elevated,
    borderRadius: RADIUS.full,
    overflow: 'hidden',
  },
  bar: {
    borderRadius: RADIUS.full,
  },
});
