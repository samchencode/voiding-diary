import StatusBar from '../features/status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import HomeScreen from '../features/home-screen';
import Constants from 'expo-constants';
import { useTheme } from 'react-native-paper';

function App() {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <StatusBar />
      <HomeScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
