import React from 'react';
import AppLoading from 'expo-app-loading';
import type { Type as Router } from '@/view/router';
import { useAppFonts } from '@/view/app/useAppFonts';

export function factory(Router: Router) {
  return function App() {
    const fontsLoaded = useAppFonts();
    if (!fontsLoaded) return <AppLoading />;
    return <Router />;
  };
}

export type Type = ReturnType<typeof factory>;
