import { createContext } from 'react';

type FocusContextValue = {
  readonly hasFocus: boolean;
  setHasFocus: (v: boolean) => void;
};

const FocusContext = createContext<FocusContextValue>({
  hasFocus: false,
  setHasFocus: () => {},
});

FocusContext.displayName = 'FocusContext';

export { FocusContext };
export type { FocusContextValue };
