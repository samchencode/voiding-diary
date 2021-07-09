import React from 'react';
import { View } from 'react-native';
import Svg, { Rect } from 'react-native-svg';
import { useTheme } from 'react-native-paper';

function IntakeChart() {

  const { colors } = useTheme();

  return(
    <View style={{
      margin: 10,
      width: 200,
      backgroundColor: colors.light,
      shadowColor: colors.dark,
      shadowOpacity: 0.25,
      shadowRadius: 5,
      elevation: 5,
    }}>
      <Svg width={100} height={100} viewBox='0 0 100 100'>
        <Rect x={0} y={0} height={100} width={100} fill="black" />
      </Svg>
    </View>
  )
}

export default IntakeChart;