import React from 'react';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';

function Card(props) {
  const { colors } = useTheme();

  return (
    <View
      {...props}
      style={[
        {
          backgroundColor: colors.light,
          shadowColor: colors.dark,
          shadowOpacity: 0.25,
          shadowRadius: 5,
          elevation: 5,
          borderRadius: 16,
        },
        props.style,
      ]}
    >
      {props.children}
    </View>
  );
}

export default Card;
