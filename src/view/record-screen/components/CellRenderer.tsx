import React from 'react';
import { View } from 'react-native';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function CellRenderer(props: any) {
  const { style, index } = props;
  // allows rows closer to the top layer/stack above lower rows.
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <View {...props} style={[style, { zIndex: -index }]} />;
}
