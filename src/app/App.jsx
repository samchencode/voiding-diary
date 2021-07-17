import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useAppIcons, useAppFonts } from './fonts';
import Router from './Router';
import Timer from '../features/timer';

function App() {
  useEffect(() => {
    const timer = new Timer();
    timer.setOnTick(({ dt, timeRemaining }) =>
    console.log('tick', dt, 'secs', timeRemaining.getSeconds())
    );
    timer.setOnEnd(() => console.log('end!'))
    timer.start({ milliseconds: 60000 });
  }, []);

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
