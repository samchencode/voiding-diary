import { useContext, useEffect } from 'react';
import type { ReactNode } from 'react';
import { PortalContext } from '@/view/portal/PortalContext';

type PortalProps = {
  children: ReactNode | ReactNode[];
  id: string;
};

function Portal({ children, id }: PortalProps) {
  const { setPortal } = useContext(PortalContext);

  useEffect(() => {
    setPortal(id, children);
    return () => setPortal(id, null);
  }, [children, id, setPortal]);

  return null;
}

export { Portal };
