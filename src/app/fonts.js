import { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import {
  useFonts,
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';
import { MaterialCommunityIcons } from '@expo/vector-icons';

function useAppFonts() {
  const [fontsLoaded] = useFonts({
    Roboto_300Light,
    Roboto_400Regular,
    Roboto_700Bold,
  });

  return fontsLoaded;
}

function useAppIcons() {
  const [ready, setReady] = useState(false);
  const fonts = [MaterialCommunityIcons.font];

  useEffect(() => {
    const loadFonts = fonts.map((f) => Font.loadAsync(f));
    Promise.all(loadFonts).then(() => setReady(true));
  }, []);

  return ready;
}

export { useAppFonts, useAppIcons };
