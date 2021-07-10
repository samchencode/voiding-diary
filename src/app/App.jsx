import StatusBar from '../features/status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import AppLoading from 'expo-app-loading';
import useFonts from './fonts';
import HomeScreen from '../features/home-screen';

function App() {

  const fontsLoaded = useFonts();
  if(!fontsLoaded) return <AppLoading />

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
