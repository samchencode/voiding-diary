import React from 'react';
import { View } from 'react-native';
import { StatusBar as StatusBarControl } from 'expo-status-bar';
import Constants from 'expo-constants';

function StatusBar(props) {
  const { color, statusBarStyle } = props;

  return (
    <>
      <View
        style={{
          backgroundColor: color,
          height: Constants.statusBarHeight,
        }}
      />
      <StatusBarControl style={statusBarStyle} />
    </>
  );
}

export default StatusBar;
