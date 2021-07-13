import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Nav, Screen, TabBarIcon } from '../features/bottom-tab-nav';
import HomeScreen from '../features/home-screen';
import HistoryScreen from '../features/history-screen';
import GoalScreen from '../features/goal-screen';
import EditEntryModal from '../features/edit-entry-modal';

const Stack = createStackNavigator();

function HomeTabScreen() {
  return (
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
  );
}

function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="HomeTab"
        mode="modal"
      >
        <Stack.Screen name="HomeTab" component={HomeTabScreen} />
        <Stack.Screen
          name="EditModal"
          component={EditEntryModal}
          options={{
            cardStyle: { backgroundColor: 'transparent' },
            cardStyleInterpolator: ({ current: { progress } }) => ({
              containerStyle: {
                opacity: progress.interpolate({
                  inputRange: [0, 0.5, 0.9, 1],
                  outputRange: [0, 0.25, 0.7, 1],
                }),
              },
              overlayStyle: {
                opacity: progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 0.5],
                  extrapolate: 'clamp',
                }),
              },
            }),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Router;
