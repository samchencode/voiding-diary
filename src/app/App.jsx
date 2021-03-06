import React from 'react';
import { StyleSheet, View } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useAppIcons, useAppFonts } from './fonts';
import Router from './Router';

function App() {

  const fontsLoaded = useAppFonts();
  const iconsLoaded = useAppIcons();
  if (!fontsLoaded || !iconsLoaded) return <AppLoading />;

  return (
    <View style={styles.container}>
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
