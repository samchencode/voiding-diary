import React from 'react';
import type { ColorValue } from 'react-native';
import { View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import type { StatusBarStyle } from 'expo-status-bar';
import { StatusBar as StatusBarControl } from 'expo-status-bar';
import Constants from 'expo-constants';

type StatusBarProps = {
  color: ColorValue;
  statusBarStyle: StatusBarStyle;
  elevated?: boolean;
  hasPadding?: boolean;
};

function StatusBar({
  color,
  statusBarStyle,
  elevated,
  hasPadding,
}: StatusBarProps) {
  const isFocused = useIsFocused();

  return (
    <>
      {hasPadding && (
        <View
          style={{
            backgroundColor: color,
            height: Constants.statusBarHeight,
            ...(elevated && { elevation: 1, zIndex: 1 }),
          }}
        />
      )}
      {isFocused ? <StatusBarControl style={statusBarStyle} /> : null}
    </>
  );
}

StatusBar.defaultProps = {
  elevated: false,
  hasPadding: true,
};

export { StatusBar };
