import { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import {
  useFonts,
  Roboto_100Thin,
  Roboto_100Thin_Italic,
  Roboto_300Light,
  Roboto_300Light_Italic,
  Roboto_400Regular,
  Roboto_400Regular_Italic,
  Roboto_500Medium,
  Roboto_500Medium_Italic,
  Roboto_700Bold,
  Roboto_700Bold_Italic,
  Roboto_900Black,
  Roboto_900Black_Italic,
} from '@expo-google-fonts/roboto';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

function useAppFonts() {
  const [fontsLoaded] = useFonts({
    Roboto_100Thin,
    Roboto_100Thin_Italic,
    Roboto_300Light,
    Roboto_300Light_Italic,
    Roboto_400Regular,
    Roboto_400Regular_Italic,
    Roboto_500Medium,
    Roboto_500Medium_Italic,
    Roboto_700Bold,
    Roboto_700Bold_Italic,
    Roboto_900Black,
    Roboto_900Black_Italic,
  });

  return fontsLoaded;
}

function useAppIcons() {
  const [ready, setReady] = useState(false);
  const fonts = [Ionicons.font, MaterialCommunityIcons.font];

  useEffect(() => {
    const loadFonts = fonts.map((f) => Font.loadAsync(f));
    Promise.all(loadFonts).then(() => setReady(true));
  }, []);

  return ready;
}

export { useAppFonts, useAppIcons };
