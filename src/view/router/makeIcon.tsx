import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';

type TabBarIconProps = {
  color: string;
  size: number;
};

export function makeIcon(name: string) {
  return function TabBarIcon({ color, size }: TabBarIconProps) {
    return <Icon name={name} color={color} size={size} solid />;
  };
}
