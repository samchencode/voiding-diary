import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'react-native-paper';

const Tab = createBottomTabNavigator();

function Nav(props) {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: colors.primary,
        inactiveTintColor: colors.gray,
        labelStyle: styles.label
      }}
      style={{ backgroundColor: colors.bg }}
      {...props}
    />
  );
}

const Screen = Tab.Screen;

const styles = StyleSheet.create({
  label: {
    fontSize: 12,
    fontFamily: 'Roboto_400Regular'
  }
})

export default Tab;
export { Nav, Screen };
