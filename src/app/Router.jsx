import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Nav, Screen, TabBarIcon } from '../features/bottom-tab-nav';
import HomeScreen from '../features/home-screen';
import HistoryScreen from '../features/history-screen';
import GoalScreen from '../features/goal-screen';

function Router() {
  return (
    <NavigationContainer>
      <Nav initialRouteName="Home">
        <Screen
          name="Goal"
          component={GoalScreen}
          options={{
            tabBarIcon: (props) => <TabBarIcon icon="bullseye" {...props} />,
          }}
        />
        <Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: (props) => <TabBarIcon icon="home" {...props} />,
          }}
        />
        <Screen
          name="History"
          component={HistoryScreen}
          options={{
            tabBarIcon: (props) => <TabBarIcon icon="script-text" {...props} />,
          }}
        />
      </Nav>
    </NavigationContainer>
  );
}

export default Router;
