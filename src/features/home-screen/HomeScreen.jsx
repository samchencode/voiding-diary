import React from 'react';
import { View, ScrollView } from 'react-native';
import { useTheme, Text } from 'react-native-paper';
import TimerView from './TimerView';
import IntakeChart from './IntakeChart';
import LoggerButtonGroup from './LoggerButtonGroup';

function HomeScreen() {
  const { colors } = useTheme();

  return (
    <ScrollView
      contentContainerStyle={{
        backgroundColor: colors.bg,
        flex: 1,
      }}
    >
      <TimerView />
      <View
        style={{
          marginLeft: 16,
          marginRight: 16,
        }}
      >
        <LoggerButtonGroup />
        <IntakeChart style={{ marginTop: 16 }} />
        <View>
          <Text>History</Text>
          <View>
            <Text>Tea 12oz 7:30am</Text>
          </View>
        </View>
        <View>
          <Text>History</Text>
          <View>
            <Text>Tea 12oz 7:30am</Text>
          </View>
        </View>
        <View>
          <Text>History</Text>
          <View>
            <Text>Tea 12oz 7:30am</Text>
          </View>
        </View>
        <View>
          <Text>History</Text>
          <View>
            <Text>Tea 12oz 7:30am</Text>
          </View>
        </View>
        <View>
          <Text>History</Text>
          <View>
            <Text>Tea 12oz 7:30am</Text>
          </View>
        </View>
        <View>
          <Text>History</Text>
          <View>
            <Text>Tea 12oz 7:30am</Text>
          </View>
        </View>
        <View>
          <Text>History</Text>
          <View>
            <Text>Tea 12oz 7:30am</Text>
          </View>
        </View>
        <View>
          <Text>History</Text>
          <View>
            <Text>Tea 12oz 7:30am</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default HomeScreen;
