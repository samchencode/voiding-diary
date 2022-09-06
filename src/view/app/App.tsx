import React from 'react';
import type { Type as Router } from '@/view/router';

export function factory(Router: Router) {
  return function App() {
    return <Router />;
  };
}

export type Type = ReturnType<typeof factory>;
