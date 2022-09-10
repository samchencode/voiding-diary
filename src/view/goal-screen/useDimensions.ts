import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import Constants from 'expo-constants';
import { useWindowDimensions } from 'react-native';

function useDimensions() {
  const { width, height } = useWindowDimensions();
  const tabBarHeight = useBottomTabBarHeight();
  const { statusBarHeight } = Constants;

  return {
    width,
    height,
    tabBarHeight,
    statusBarHeight,
  };
}

export { useDimensions };
