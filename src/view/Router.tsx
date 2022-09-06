import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { Type as HomeScreen } from '@/view/home-screen';
import type { Type as GoalScreen } from '@/view/goal-screen';
import type { Type as RecordScreen } from '@/view/record-screen';

const Tab = createBottomTabNavigator();

export function factory(
  HomeScreen: HomeScreen,
  GoalScreen: GoalScreen,
  RecordScreen: RecordScreen
) {
  return function Router() {
    return (
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={{ headerShown: false }}
        >
          <Tab.Screen
            name="Goal"
            component={GoalScreen}
            options={{ tabBarLabel: 'My Goals' }}
          />
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{ tabBarLabel: 'Home' }}
          />
          <Tab.Screen
            name="Record"
            component={RecordScreen}
            options={{ tabBarLabel: 'My Records' }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  };
}

export type Type = ReturnType<typeof factory>;
