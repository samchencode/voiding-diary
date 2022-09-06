import React, { useCallback } from 'react';
import { View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import type { Type as Router } from '@/view/router';
import { useAppFonts } from '@/view/app/useAppFonts';

SplashScreen.preventAutoHideAsync();

export function factory(Router: Router) {
  return function App() {
    const fontsLoaded = useAppFonts();
    const appIsReady = fontsLoaded;

    const onLayoutRoot = useCallback(
      async () => appIsReady && (await SplashScreen.hideAsync()),
      [appIsReady]
    );

    if (!appIsReady) return null;
    return (
      <View onLayout={onLayoutRoot} style={{ flex: 1 }}>
        <Router />
      </View>
    );
  };
}

export type Type = ReturnType<typeof factory>;
