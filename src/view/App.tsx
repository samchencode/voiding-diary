import React from 'react';
import type { Type as Router } from '@/view/Router';

export function factory(Router: Router) {
  return function App() {
    return <Router />;
  };
}

export type Type = ReturnType<typeof factory>;
