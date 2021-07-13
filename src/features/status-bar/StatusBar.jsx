import React from 'react';
import { View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { StatusBar as StatusBarControl } from 'expo-status-bar';
import Constants from 'expo-constants';

function StatusBar(props) {
  const { color, statusBarStyle, elevated } = props;

  const isFocused = useIsFocused();

  return (
    <>
      <View
        style={{
          backgroundColor: color,
          height: Constants.statusBarHeight,
          ...(elevated && {elevation: 5})
        }}
      />
      {isFocused ? <StatusBarControl style={statusBarStyle} /> : null}
    </>
  );
}

export default StatusBar;
