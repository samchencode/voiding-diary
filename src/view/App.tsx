import React from 'react';
import type { Type as HomeScreen } from '@/view/home-screen';

function ComponentFactory(HomeScreen: HomeScreen) {
  return function App() {
    return <HomeScreen />;
  };
}

type Type = ReturnType<typeof ComponentFactory>;

export default ComponentFactory;
export type { Type };
