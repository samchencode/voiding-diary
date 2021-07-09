import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import TimerView from './TimerView';

function HomeScreen() {

  return (
    <View>
      <TimerView />
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
    </View>
  );
}

export default HomeScreen;
