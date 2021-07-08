import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

function HomeScreen() {
  return (
    <View>
      <View>
        <Text>0:00</Text>
        <Text>Until Void</Text>
      </View>
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
