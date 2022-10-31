import type { ReactNode } from 'react';
import React from 'react';

type PortalContextValue = {
  setPortal: (id: string, content: ReactNode) => void;
};

export const PortalContext = React.createContext<PortalContextValue>({
  setPortal: () => {},
});
