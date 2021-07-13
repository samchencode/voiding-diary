import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

function TabBarIcon(props) {
  const { focused, color, size, icon } = props;

  return <MaterialCommunityIcons name={icon} color={color} size={size} />;
}

export default TabBarIcon;