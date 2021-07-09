import React from 'react';
import { View } from 'react-native';
import { StatusBar as StatusBarControl } from 'expo-status-bar';
import { useTheme } from 'react-native-paper';
import Constants from 'expo-constants';

function StatusBar() {
  const { colors } = useTheme();

  return (
    <>
      <View
        style={{
          backgroundColor: colors.primary,
          height: Constants.statusBarHeight,
          elevation: 5,
        }}
      />
      <StatusBarControl style="light" />
    </>
  );
}

export default StatusBar;
