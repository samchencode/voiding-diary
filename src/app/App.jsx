import StatusBar from '../features/status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useAppIcons, useAppFonts} from './fonts';
import HomeScreen from '../features/home-screen';
import HistoryScreen from '../features/history-screen';
import GoalScreen from '../features/goal-screen';

function App() {

  const fontsLoaded = useAppFonts();
  const iconsLoaded = useAppIcons();
  if(!fontsLoaded || !iconsLoaded) return <AppLoading />

  return (
    <View style={styles.container}>
      <StatusBar />
      <GoalScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
