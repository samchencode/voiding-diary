import React, { useCallback } from 'react';
import { Button } from '@/view/components';
import { theme } from '@/view/theme';
import type { Injector } from 'didi';

type TestProps = {
  title: string;
  action: (...args: never[]) => unknown;
  container: Injector;
};

function DebugAction({ title, action, container }: TestProps) {
  const handleAction = useCallback(() => {
    // @ts-expect-error the other two params of `.invoke` are optional
    container.invoke(action);
  }, [action, container]);

  return (
    <Button
      title={title}
      onPress={handleAction}
      style={{ marginBottom: theme.spaces.lg }}
      backgroundColor={theme.colors.primary}
    />
  );
}

export { DebugAction };
