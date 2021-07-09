import React from 'react';
import { Card, Text } from 'react-native-paper';
import Svg, { Rect } from 'react-native-svg';

function IntakeChart() {
  return(
    <Card style={{ margin: 10}}>
      <Svg width={100} height={100} viewBox='0 0 100 100'>
        <Rect x={0} y={0} height={100} width={100} fill="black" />
      </Svg>
      <Card.Title title="Hi"/>
    </Card>
  )
}

export default IntakeChart;