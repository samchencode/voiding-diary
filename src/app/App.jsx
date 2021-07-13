import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import StatusBar from '../features/status-bar';
import AppLoading from 'expo-app-loading';
import { useAppIcons, useAppFonts} from './fonts';
import Router from './Router';

function App() {

  const fontsLoaded = useAppFonts();
  const iconsLoaded = useAppIcons();
  if(!fontsLoaded || !iconsLoaded) return <AppLoading />

  return (
    <View style={styles.container}>
      <StatusBar />
      <Router />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
