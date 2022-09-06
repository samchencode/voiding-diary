import React from 'react';
import type { Type as HomeScreen } from '@/view/home-screen';

export function factory(HomeScreen: HomeScreen) {
  return function App() {
    return <HomeScreen />;
  };
}

export type Type = ReturnType<typeof factory>;
