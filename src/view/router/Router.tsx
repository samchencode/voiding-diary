import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { Type as HomeScreen } from '@/view/home-screen';
import type { Type as GoalScreen } from '@/view/goal-screen';
import type { Type as RecordScreen } from '@/view/record-screen';
import { makeIcon } from '@/view/router/makeIcon';

const Tab = createBottomTabNavigator();

const GoalIcon = makeIcon('bullseye');
const HomeIcon = makeIcon('home');
const RecordIcon = makeIcon('archive');

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
            options={{
              tabBarLabel: 'My Goals',
              tabBarIcon: GoalIcon,
            }}
          />
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarLabel: 'Home',
              tabBarIcon: HomeIcon,
            }}
          />
          <Tab.Screen
            name="Record"
            component={RecordScreen}
            options={{
              tabBarLabel: 'My Records',
              tabBarIcon: RecordIcon,
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  };
}

export type Type = ReturnType<typeof factory>;
