import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import MainNavigator from './src/navigation/MainNavigator';
import { useStore } from './src/store';
import { COLORS } from './src/styles/colors';
import { TYPOGRAPHY } from './src/styles/typography';

export default function App() {
  const { initializeData, settings } = useStore();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const bootstrap = async () => {
      try {
        // Give Zustand persist time to rehydrate from AsyncStorage
        await new Promise((resolve) => setTimeout(resolve, 150));
        setReady(true);
      } catch (e) {
        console.error('Bootstrap error:', e);
        setReady(true);
      }
    };
    bootstrap();
  }, []);

  useEffect(() => {
    if (ready && !settings.firstLaunchDone) {
      initializeData();
    }
  }, [ready, settings.firstLaunchDone]);

  if (!ready) {
    return (
      <View style={styles.splash}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.bg.primary} />
        <Text style={styles.splashTitle}>GATE EC 2027</Text>
        <Text style={styles.splashSub}>Loading your dashboard...</Text>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bg.elevated} />
      <NavigationContainer
        theme={{
          dark: true,
          colors: {
            primary: COLORS.accent.primary,
            background: COLORS.bg.primary,
            card: COLORS.bg.elevated,
            text: COLORS.text.primary,
            border: COLORS.border,
            notification: COLORS.accent.danger,
          },
        }}
      >
        <MainNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    backgroundColor: COLORS.bg.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  splashTitle: {
    fontSize: 32,
    fontWeight: TYPOGRAPHY.weights.extrabold,
    color: COLORS.accent.primary,
    letterSpacing: -1,
  },
  splashSub: {
    fontSize: 14,
    color: COLORS.text.muted,
    marginTop: 8,
  },
});
