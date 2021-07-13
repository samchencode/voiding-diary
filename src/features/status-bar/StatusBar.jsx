import React from 'react';
import { View } from 'react-native';
import { StatusBar as StatusBarControl } from 'expo-status-bar';
import Constants from 'expo-constants';

function StatusBar(props) {
  const { color, statusBarStyle, elevated } = props;

  return (
    <>
      <View
        style={{
          backgroundColor: color,
          height: Constants.statusBarHeight,
          ...(elevated && {elevation: 5})
        }}
      />
      <StatusBarControl style={statusBarStyle} />
    </>
  );
}

export default StatusBar;
