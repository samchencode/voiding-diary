import React, { useCallback } from 'react';
import { Button } from '@/view/components';
import { container } from '@/di';
import { theme } from '@/view/theme';

type TestProps = {
  title: string;
  action: (...args: never[]) => unknown;
};

function DebugAction({ title, action }: TestProps) {
  const handleAction = useCallback(() => {
    // @ts-expect-error the other two params of `.invoke` are optional
    container.invoke(action);
  }, [action]);

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
