import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useTheme, Text } from 'react-native-paper';
import TimerView from './TimerView';
import IntakeChart from './IntakeChart';

function HomeScreen() {
  const { colors } = useTheme();

  return (
    <ScrollView contentContainerStyle={{
      backgroundColor: colors.bg,
      flex: 1,
    }}>
      <TimerView />
      <IntakeChart />
      <View>
        <View>
          <Text>+Intake</Text>
        </View>
        <View>
          <Text>+Void</Text>
        </View>
      </View>
      <View>
        <Text>History</Text>
        <View>
          <Text>Tea 12oz 7:30am</Text>
        </View>
      </View>
    </ScrollView>
  );
}

export default HomeScreen;
