/* eslint-disable react/jsx-no-bind */
import React, { useMemo } from 'react';
import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import type {
  BottomTabHeaderProps,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { StackScreenProps } from '@react-navigation/stack';
import { createStackNavigator } from '@react-navigation/stack';
import type { Type as HomeScreen } from '@/view/home-screen';
import type { Type as GoalScreen } from '@/view/goal-screen';
import type { Type as RecordScreen } from '@/view/record-screen';
import type { Type as TestScreen } from '@/view/test-screen';
import type { Type as AboutUsModal } from '@/view/about-us-modal';
import type { Type as AttributionsModal } from '@/view/attributions-modal';
import type { Type as NoGoalModal } from '@/view/no-goal-modal';
import type { Type as EditRecordModal } from '@/view/edit-record-modal';
import type { Type as RecordIntakeModal } from '@/view/record-intake-modal';
import type { Type as ConfirmDeleteModal } from '@/view/confirm-delete-modal';
import type { Type as TopBar } from '@/view/top-bar';
import { makeIcon } from '@/view/router/makeIcon';
import { theme } from '@/view/theme';
import type { Environment } from '@/env';

const GoalIcon = makeIcon('bullseye');
const HomeIcon = makeIcon('home');
const RecordIcon = makeIcon('archive');
const TestIcon = makeIcon('wrench');

type AppNavigationParams = {
  Home: undefined;
  Goal: undefined;
  Record: undefined;
  Test: undefined;
};

type RootNavigationParams = {
  App: NavigatorScreenParams<AppNavigationParams>;
  AboutUsModal: undefined;
  AttributionsModal: undefined;
  NoGoalModal: undefined;
  EditRecordModal: { recordId: string };
  RecordIntakeModal: undefined;
  ConfirmDeleteModal: { recordId: string };
};

const Tab = createBottomTabNavigator<AppNavigationParams>();
const Stack = createStackNavigator<RootNavigationParams>();

function factory(
  HomeScreen: HomeScreen,
  GoalScreen: GoalScreen,
  RecordScreen: RecordScreen,
  AboutUsModal: AboutUsModal,
  AttributionsModal: AttributionsModal,
  NoGoalModal: NoGoalModal,
  EditRecordModal: EditRecordModal,
  RecordIntakeModal: RecordIntakeModal,
  ConfirmDeleteModal: ConfirmDeleteModal,
  TestScreen: TestScreen,
  TopBar: TopBar,
  environment: Environment
) {
  function makeHeader(props: BottomTabHeaderProps) {
    return (
      <TopBar
        navigation={props.navigation}
        route={props.route}
        options={props.options}
        layout={props.layout}
      />
    );
  }

  function AppNavigation() {
    const isDevMode = useMemo(() => environment.mode === 'development', []);

    return (
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          header: makeHeader,
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.gray,
        }}
      >
        <Tab.Screen
          name="Goal"
          component={GoalScreen}
          options={{
            tabBarLabel: 'My Goals',
            tabBarIcon: GoalIcon,
            headerTintColor: theme.colors.dark,
          }}
        />
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: HomeIcon,
            headerTintColor: theme.colors.light,
          }}
        />
        <Tab.Screen
          name="Record"
          component={RecordScreen}
          options={{
            tabBarLabel: 'My Records',
            tabBarIcon: RecordIcon,
            headerTintColor: theme.colors.dark,
          }}
        />
        {isDevMode && (
          <Tab.Screen
            name="Test"
            component={TestScreen}
            options={{
              tabBarLabel: 'Testing',
              tabBarIcon: TestIcon,
              headerTintColor: theme.colors.dark,
            }}
          />
        )}
      </Tab.Navigator>
    );
  }

  function RootNavigation() {
    return (
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="App"
      >
        <Stack.Screen
          name="AboutUsModal"
          component={AboutUsModal}
          options={{ presentation: 'transparentModal' }}
        />
        <Stack.Screen
          name="NoGoalModal"
          component={NoGoalModal}
          options={{ presentation: 'transparentModal' }}
        />
        <Stack.Screen
          name="AttributionsModal"
          component={AttributionsModal}
          options={{ presentation: 'transparentModal' }}
        />
        <Stack.Screen
          name="EditRecordModal"
          component={EditRecordModal}
          options={{ presentation: 'transparentModal' }}
        />
        <Stack.Screen
          name="RecordIntakeModal"
          component={RecordIntakeModal}
          options={{ presentation: 'transparentModal' }}
        />
        <Stack.Screen
          name="ConfirmDeleteModal"
          component={ConfirmDeleteModal}
          options={{ presentation: 'transparentModal' }}
        />
        <Stack.Screen name="App" component={AppNavigation} />
      </Stack.Navigator>
    );
  }

  return function Router() {
    return (
      <NavigationContainer>
        <RootNavigation />
      </NavigationContainer>
    );
  };
}

export { factory };
export type Type = ReturnType<typeof factory>;
export type AppNavigationProps<T extends keyof AppNavigationParams> =
  CompositeScreenProps<
    BottomTabScreenProps<AppNavigationParams, T>,
    StackScreenProps<RootNavigationParams>
  >;
export type RootNavigationProps<T extends keyof RootNavigationParams> =
  CompositeScreenProps<
    StackScreenProps<RootNavigationParams, T>,
    BottomTabScreenProps<AppNavigationParams>
  >;
